import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { ok, fail } from "../../shared/http/response.js";
import {
  pageDefinitions,
  pageDefinition,
  type CmsPageDefinition,
} from "./page-registry.js";
import {
  applyCollections,
  bannerSchema,
  collectionSchemas,
  cmsSections,
  parseComposition,
} from "./visual-model.js";
import projectAssets from "./asset-defaults.json" with { type: "json" };
import {
  contentFields,
  safeContentUrl,
  safeContentImage,
} from "./content-patch.js";
import { createHash, randomBytes } from "node:crypto";
import { env } from "../../config/environment.js";
import { programmeInput, programmeDefinition } from "./programme-manager.js";
import { siteSeoInput } from "./cms.routes.js";
import { programmeStateInput, programmeStateKey } from "./programme-lifecycle.js";
import { applyContentPatch } from "./content-patch.js";

const query = z.object({
  id: z.string().max(150),
  locale: z.enum(["vi", "en"]).default("vi"),
});
const input = query.extend({
  revision: z.string().nullable(),
  values: z.record(z.string(), z.string().max(20000)),
});
const keyFor = (id: string, locale: string, state: string) =>
  `cms.${state}.${locale}.${id}`;
async function allow(
  request: FastifyRequest,
  reply: FastifyReply,
  permission: string,
) {
  const user = await authenticateRequest(request);
  if (!user) {
    fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED");
    return null;
  }
  if (
    user.mustChangePassword ||
    (user.role.code !== "SUPER_ADMIN" && !user.permissions.includes(permission))
  ) {
    fail(reply, 403, "Bạn không có quyền thực hiện thao tác này.", "FORBIDDEN");
    return null;
  }
  return user;
}
const pageFor = pageDefinition;
async function seoPageFor(id: string, locale: string) {
  const page = await pageFor(id, locale);
  return page && !["shared", "messages"].includes(page.kind) ? page : undefined;
}
function editableFields(
  page: CmsPageDefinition,
  values: Record<string, string> = {},
) {
  return contentFields(applyCollections(page.defaults, values, page.id)).map(
    (field) => {
      if (page.id === "discover" && field.path.startsWith("media."))
        return { ...field, section: field.path.split(".")[1] };
      return field;
    },
  );
}
function validateValues(
  page: CmsPageDefinition,
  values: Record<string, string>,
) {
  const fields = new Map(
    contentFields(applyCollections(page.defaults, values, page.id)).map((f) => [
      f.path,
      f,
    ]),
  );
  if (JSON.stringify(values).length > 1_000_000) return false;
  for (const [key, raw] of Object.entries(values).filter(([key]) =>
    key.startsWith("$"),
  )) {
    try {
      if (key === "$layout") {
        const layout = parseComposition(page.id, raw);
        if (!layout) return false;
        for (const section of layout.added) {
          if (section.image && !safeContentImage(section.image)) return false;
          for (const item of section.items)
            if (
              (item.image && !safeContentImage(item.image)) ||
              (item.href && !safeContentUrl(item.href))
            )
              return false;
        }
      } else if (key === "$banner" && ["home", "discover"].includes(page.id)) {
        const banner = bannerSchema.parse(JSON.parse(raw));
        if (
          banner.kind === "image"
            ? !safeContentImage(banner.src)
            : !/^\/(?:api\/media|video)\/[\w/%.-]+\.(mp4|webm)$/i.test(
                banner.src,
              )
        )
          return false;
        if (banner.poster && !safeContentImage(banner.poster)) return false;
      } else if (key.startsWith("$list:")) {
        const schema = collectionSchemas(page.id)[key.slice(6)];
        if (!schema) return false;
        const items = schema.parse(JSON.parse(raw));
        for (const field of contentFields(items))
          if (
            field.type === "image"
              ? !safeContentImage(field.value)
              : field.type === "url" && !safeContentUrl(field.value)
          )
            return false;
      } else return false;
    } catch {
      return false;
    }
  }
  return Object.entries(values)
    .filter(([key]) => !key.startsWith("$"))
    .every(
      ([key, value]) =>
        fields.has(key) &&
        (fields.get(key)!.type === "image"
          ? safeContentImage(value)
          : fields.get(key)!.type === "text" || safeContentUrl(value)),
    );
}
export async function websiteRoutes(app: FastifyInstance) {
  app.get("/api/admin/website/seo", async (request, reply) => {
    if (!(await allow(request, reply, "website.view"))) return;
    const { id, locale } = query.parse(request.query);
    const page = await seoPageFor(id, locale);
    if (!page) return fail(reply, 404, "Không tìm thấy trang.", "NOT_FOUND");
    const [draft, live] = await Promise.all([
      prisma.siteContent.findUnique({
        where: { key: `cms.seo.draft.${locale}.${id}` },
      }),
      prisma.siteContent.findFirst({
        where: { section: "seo", locale, page: page.path, published: true },
      }),
    ]);
    reply.header("Cache-Control", "private, no-store");
    return ok(reply, {
      values: draft?.value ?? live?.value ?? {},
      revision: draft?.updatedAt.toISOString() ?? null,
      publishedAt: live?.updatedAt.toISOString() ?? null,
      path: page.path,
      origin: env.PUBLIC_APP_URL,
    });
  });
  app.put("/api/admin/website/seo", async (request, reply) => {
    const user = await allow(request, reply, "website.update");
    if (!user) return;
    const body = query
      .extend({ revision: z.string().nullable(), values: siteSeoInput })
      .parse(request.body);
    const page = await seoPageFor(body.id, body.locale);
    if (!page) return fail(reply, 404, "Không tìm thấy trang.", "NOT_FOUND");
    try {
      const row = await prisma.$transaction(
        async (tx) => {
          const key = `cms.seo.draft.${body.locale}.${body.id}`;
          const current = await tx.siteContent.findUnique({ where: { key } });
          if ((current?.updatedAt.toISOString() ?? null) !== body.revision)
            throw Error("CMS_CONFLICT");
          const data = {
            locale: body.locale,
            page: page.path,
            section: "cms-seo-draft",
            published: false,
            title: `SEO · ${page.title}`,
            value: body.values as Prisma.InputJsonValue,
            authorId: user.id,
          };
          return tx.siteContent.upsert({
            where: { key },
            create: { key, ...data },
            update: data,
          });
        },
        { isolationLevel: "Serializable" },
      );
      return ok(
        reply,
        { revision: row.updatedAt.toISOString() },
        "Đã lưu bản nháp SEO.",
      );
    } catch (error) {
      if (
        (error instanceof Error && error.message === "CMS_CONFLICT") ||
        (error instanceof Prisma.PrismaClientKnownRequestError &&
          ["P2034", "P2002"].includes(error.code))
      )
        return fail(
          reply,
          409,
          "SEO đã được sửa ở phiên khác. Hãy tải lại.",
          "CMS_CONFLICT",
        );
      throw error;
    }
  });
  app.post("/api/admin/website/seo/publish", async (request, reply) => {
    const user = await allow(request, reply, "website.publish");
    if (!user) return;
    const body = query.extend({ revision: z.string() }).parse(request.body);
    const page = await seoPageFor(body.id, body.locale);
    if (!page) return fail(reply, 404, "Không tìm thấy trang.", "NOT_FOUND");
    try {
      await prisma.$transaction(
        async (tx) => {
          const draft = await tx.siteContent.findUnique({
            where: { key: `cms.seo.draft.${body.locale}.${body.id}` },
          });
          if (!draft || draft.updatedAt.toISOString() !== body.revision)
            throw Error("CMS_CONFLICT");
          const values = siteSeoInput.parse(draft.value);
          const live = await tx.siteContent.findFirst({
            where: {
              section: "seo",
              page: page.path,
              locale: body.locale,
              published: true,
            },
          });
          const key =
            live?.key ?? `cms.seo.published.${body.locale}.${body.id}`;
          await tx.siteContent.updateMany({
            where: {
              section: "seo",
              page: page.path,
              locale: body.locale,
              published: true,
            },
            data: { published: false },
          });
          const data = {
            locale: body.locale,
            page: page.path,
            section: "seo",
            published: true,
            title: `SEO · ${page.title}`,
            value: values as Prisma.InputJsonValue,
            authorId: user.id,
          };
          await tx.siteContent.upsert({
            where: { key },
            create: { key, ...data },
            update: data,
          });
        },
        { isolationLevel: "Serializable" },
      );
      return ok(reply, {}, "Đã áp dụng cấu hình SEO.");
    } catch (error) {
      if (
        (error instanceof Error && error.message === "CMS_CONFLICT") ||
        (error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2034")
      )
        return fail(
          reply,
          409,
          "Bản nháp SEO đã thay đổi. Hãy tải lại.",
          "CMS_CONFLICT",
        );
      throw error;
    }
  });
  app.post("/api/admin/website/programmes", async (request, reply) => {
    const user = await allow(request, reply, "website.update");
    if (!user) return;
    const input = programmeInput.parse(request.body);
    if (!safeContentImage(input.bannerImage))
      return fail(reply, 400, "Ảnh ngành không hợp lệ.", "INVALID_IMAGE");
    const definition = programmeDefinition(input);
    if (await pageFor(definition.id, "vi"))
      return fail(
        reply,
        409,
        "Đường dẫn ngành đã tồn tại.",
        "DUPLICATE_PROGRAMME",
      );
    try {
      await prisma.$transaction(async (tx) => {
        await tx.siteContent.create({
          data: {
            key: `cms.programme.${input.id}`,
            locale: "vi",
            page: definition.path,
            section: "cms-programme",
            title: definition.title,
            published: false,
            authorId: user.id,
            value: definition as Prisma.InputJsonValue,
          },
        });
        await tx.siteContent.create({
          data: {
            key: keyFor(definition.id, "vi", "draft"),
            locale: "vi",
            page: definition.path,
            section: "cms-draft",
            title: definition.title,
            published: false,
            authorId: user.id,
            value: {},
          },
        });
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
        return fail(reply, 409, "Ngành đã tồn tại.", "DUPLICATE_PROGRAMME");
      throw error;
    }
    return ok(
      reply,
      { id: definition.id },
      "Đã tạo ngành ở trạng thái bản nháp.",
    );
  });
  app.post("/api/admin/website/programmes/state", async (request, reply) => {
    const user = await allow(request, reply, "website.publish");
    if (!user) return;
    const body = programmeStateInput.parse(request.body);
    const page = await pageFor(body.id, "vi");
    if (!page) return fail(reply, 404, "Không tìm thấy chuyên ngành.", "NOT_FOUND");
    const key = programmeStateKey(body.id);
    try {
      await prisma.$transaction(async (tx) => {
        const current = await tx.siteContent.findUnique({ where: { key } });
        if ((current?.updatedAt.toISOString() ?? null) !== body.revision) throw Error("CMS_CONFLICT");
        const data = { locale: "vi", page: page.path, section: "cms-programme-state", title: page.title,
          published: false, authorId: user.id, value: { status: body.action === "restore" ? "active" : body.action === "archive" ? "archived" : "hidden" } };
        await tx.siteContent.upsert({ where: { key }, create: { key, ...data }, update: data });
      }, { isolationLevel: "Serializable" });
      return ok(reply, {}, body.action === "restore" ? "Đã khôi phục trạng thái trước khi ẩn. Ngành nháp vẫn chưa công khai." : "Đã ẩn chuyên ngành khỏi website. Nội dung được giữ lại để khôi phục.");
    } catch (error) {
      if ((error instanceof Error && error.message === "CMS_CONFLICT") || (error instanceof Prisma.PrismaClientKnownRequestError && ["P2034", "P2002"].includes(error.code)))
        return fail(reply, 409, "Trạng thái đã thay đổi. Hãy tải lại danh sách.", "CMS_CONFLICT");
      throw error;
    }
  });
  app.get("/api/public/website/programmes", async (_request, reply) => {
    const rows = await prisma.siteContent.findMany({
      where: { section: "cms-programme", published: true },
    });
    const states = await prisma.siteContent.findMany({ where: { section: "cms-programme-state" } });
    const hiddenIds = states.filter((row) => ["hidden", "archived"].includes((row.value as { status?: string }).status ?? "")).map((row) => row.key.slice("cms.programme-state.programme:".length));
    return ok(reply, {
      hiddenIds,
      programmes: rows.filter((row) => !hiddenIds.includes((row.value as unknown as CmsPageDefinition).id.slice(10))).map(
        (row) => (row.value as unknown as CmsPageDefinition).defaults,
      ),
    });
  });
  app.patch("/api/admin/website/section", async (request, reply) => {
    const user = await allow(request, reply, "website.update");
    if (!user) return;
    const body = input
      .extend({ section: z.string().min(1).max(150) })
      .parse(request.body);
    const page = await pageFor(body.id, body.locale);
    if (!page) return fail(reply, 404, "Không tìm thấy trang.", "NOT_FOUND");
    const key = keyFor(body.id, body.locale, "draft");
    try {
      const saved = await prisma.$transaction(
        async (tx) => {
          const current = await tx.siteContent.findUnique({ where: { key } });
          if ((current?.updatedAt.toISOString() ?? null) !== body.revision)
            throw Error("CMS_CONFLICT");
          const published = current
            ? null
            : await tx.siteContent.findUnique({
                where: { key: keyFor(body.id, body.locale, "published") },
              });
          const values = {
            ...((current?.value ?? published?.value ?? {}) as Record<
              string,
              string
            >),
          };
          const collection = body.section.startsWith("list:")
            ? body.section.slice(5)
            : null;
          const allowed =
            body.section === "banner" && ["home", "discover"].includes(page.id)
              ? new Set(["$banner"])
              : collection && collectionSchemas(page.id)[collection]
                ? new Set([`$list:${collection}`])
                : body.section === "structure" &&
                    ([
                      "home",
                      "discover",
                      "research",
                      "student-success",
                      "catalogue",
                      "admissions",
                    ].includes(page.id) ||
                      page.id.startsWith("programme:"))
                  ? new Set(["$layout"])
                  : new Set(
                      editableFields(page, values)
                        .filter((field) => field.section === body.section)
                        .map((field) => field.path),
                    );
          if (
            !allowed.size ||
            Object.keys(body.values).some((path) => !allowed.has(path))
          )
            throw Error("INVALID_SECTION");
          for (const path of allowed) delete values[path];
          if (collection)
            for (const path of Object.keys(values))
              if (path.startsWith(`${collection}.`)) delete values[path];
          Object.assign(values, body.values);
          if (!validateValues(page, values)) throw Error("INVALID_SECTION");
          const data = {
            locale: body.locale,
            page: page.path,
            section: "cms-draft",
            title: page.title,
            value: values as Prisma.InputJsonValue,
            published: false,
            authorId: user.id,
          };
          return tx.siteContent.upsert({
            where: { key },
            create: { key, ...data },
            update: data,
          });
        },
        { isolationLevel: "Serializable" },
      );
      return ok(reply, {
        revision: saved.updatedAt.toISOString(),
        values: saved.value,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "INVALID_SECTION")
        return fail(
          reply,
          400,
          "Trường dữ liệu nằm ngoài khối được chọn.",
          "INVALID_SECTION",
        );
      if (
        (error instanceof Error && error.message === "CMS_CONFLICT") ||
        (error instanceof Prisma.PrismaClientKnownRequestError &&
          ["P2034", "P2002"].includes(error.code))
      )
        return fail(
          reply,
          409,
          "Bản nháp đã thay đổi. Hãy tải lại trước khi lưu.",
          "CMS_CONFLICT",
        );
      throw error;
    }
  });
  app.post(
    "/api/admin/website/editor-session",
    { config: { rateLimit: { max: 90, timeWindow: "1 minute" } } },
    async (request, reply) => {
      const user = await allow(request, reply, "website.update");
      if (!user) return;
      const body = query
        .extend({ values: z.record(z.string(), z.string().max(20000)) })
        .parse(request.body);
      const page = await pageFor(body.id, body.locale);
      if (!page || !validateValues(page, body.values))
        return fail(reply, 400, "Nội dung không hợp lệ.", "INVALID_CONTENT");
      const token = randomBytes(32).toString("hex");
      const channel = randomBytes(16).toString("hex");
      await prisma.siteContent.deleteMany({
        where: {
          section: "cms-preview",
          createdAt: { lt: new Date(Date.now() - 3600000) },
        },
      });
      await prisma.siteContent.create({
        data: {
          key: `cms.preview.${createHash("sha256").update(token).digest("hex")}`,
          locale: body.locale,
          page: page.path,
          section: "cms-preview",
          published: false,
          authorId: user.id,
          value: {
            id: body.id,
            expires: Date.now() + 600000,
            values: body.values,
            editor: true,
            channel,
          },
        },
      });
      return ok(reply, {
        channel,
        origin: new URL(env.PUBLIC_APP_URL).origin,
        url: `${env.PUBLIC_APP_URL}/${body.locale}${page.path === "/" ? "" : page.path}?cmsPreview=${token}`,
      });
    },
  );
  app.get("/api/admin/website/media", async (request, reply) => {
    if (!(await allow(request, reply, "media.view"))) return;
    const [records, uploads, news] = await Promise.all([
      prisma.siteContent.findMany({
        where: { section: { in: ["cms-draft", "cms-published"] } },
      }),
      prisma.siteContent.findMany({ where: { section: "cms-media" } }),
      prisma.newsPost.findMany({
        select: { title: true, coverImage: true, content: true },
      }),
    ]);
    const media = new Map<
      string,
      { url: string; title: string; source?: string; usages: string[] }
    >();
    const add = (url: string, title: string, usage?: string) => {
      if (!safeContentUrl(url) || !url) return;
      const entry = media.get(url) ?? { url, title, usages: [] };
      if (usage && !entry.usages.includes(usage)) entry.usages.push(usage);
      media.set(url, entry);
    };
    for (const asset of projectAssets) add(asset.url, asset.title);
    for (const page of await pageDefinitions()) {
      for (const field of contentFields(page.defaults).filter(
        (f) => f.type === "image",
      )) {
        // Source defaults can still be used in either locale or any unpublished page.
        add(field.value, page.title, `${page.title} (nội dung gốc)`);
        for (const row of records.filter((r) => r.page === page.path)) {
          const value = (row.value as Record<string, string>)[field.path];
          if (value)
            add(
              value,
              page.title,
              `${page.title} · ${row.locale} · ${row.published ? "xuất bản" : "nháp"}`,
            );
        }
      }
    }
    for (const post of news) {
      if (post.coverImage)
        add(post.coverImage, post.title, `Tin tức: ${post.title}`);
      for (const match of post.content.matchAll(
        /<img[^>]+src=["']([^"']+)["']/g,
      ))
        add(match[1], post.title, `Tin tức: ${post.title}`);
    }
    for (const row of uploads) {
      const value = row.value as {
        url: string;
        title: string;
        source?: string;
      };
      add(value.url, value.title);
      const entry = media.get(value.url);
      if (entry) {
        entry.source = value.source;
        entry.title = value.title;
      }
    }
    reply.header("Cache-Control", "private, no-store");
    return ok(reply, { media: [...media.values()] });
  });
  app.post("/api/admin/website/media", async (request, reply) => {
    const user = await allow(request, reply, "media.upload");
    if (!user) return;
    const body = z
      .object({
        url: z
          .string()
          .max(1000)
          .refine(
            safeContentImage,
            "Ảnh phải thuộc thư viện dự án, kho nội bộ hoặc nguồn ảnh được cho phép.",
          ),
        title: z.string().trim().min(1).max(250),
        source: z.string().max(1000).optional(),
      })
      .parse(request.body);
    if (body.source && !safeContentUrl(body.source))
      return fail(reply, 400, "Nguồn ảnh không hợp lệ.", "INVALID_SOURCE");
    const key = `cms.media.${createHash("sha256").update(body.url).digest("hex")}`;
    const data = {
      section: "cms-media",
      page: "/",
      locale: "vi",
      published: false,
      title: body.title,
      authorId: user.id,
      value: body as Prisma.InputJsonValue,
    };
    await prisma.siteContent.upsert({
      where: { key },
      create: { key, ...data },
      update: data,
    });
    return ok(reply, {}, "Đã ghi nhận ảnh trong thư viện.");
  });
  app.post(
    "/api/admin/website/preview",
    { config: { rateLimit: { max: 20, timeWindow: "1 minute" } } },
    async (request, reply) => {
      const user = await allow(request, reply, "website.view");
      if (!user) return;
      const body = query.parse(request.body);
      const page = await pageFor(body.id, body.locale);
      if (!page) return fail(reply, 404, "Không tìm thấy trang.", "NOT_FOUND");
      const draft = await prisma.siteContent.findUnique({
        where: { key: keyFor(body.id, body.locale, "draft") },
      });
      if (!draft)
        return fail(
          reply,
          400,
          "Hãy lưu bản nháp trước khi xem trước.",
          "NO_DRAFT",
        );
      const token = randomBytes(32).toString("hex");
      await prisma.siteContent.deleteMany({
        where: {
          section: "cms-preview",
          createdAt: { lt: new Date(Date.now() - 3600000) },
        },
      });
      await prisma.siteContent.create({
        data: {
          key: `cms.preview.${createHash("sha256").update(token).digest("hex")}`,
          locale: body.locale,
          page: page.path,
          section: "cms-preview",
          published: false,
          authorId: user.id,
          value: {
            id: body.id,
            expires: Date.now() + 600000,
            values: draft.value,
          } as Prisma.InputJsonValue,
        },
      });
      reply.header("Cache-Control", "private, no-store");
      return ok(reply, {
        url: `${env.PUBLIC_APP_URL}/${body.locale}${page.path === "/" ? "" : page.path}?cmsPreview=${token}`,
      });
    },
  );
  app.post(
    "/api/public/website/preview",
    { config: { rateLimit: { max: 300, timeWindow: "1 minute" } } },
    async (request, reply) => {
      const { token } = z
        .object({ token: z.string().regex(/^[a-f0-9]{64}$/) })
        .parse(request.body);
      const row = await prisma.siteContent.findUnique({
        where: {
          key: `cms.preview.${createHash("sha256").update(token).digest("hex")}`,
        },
        include: { author: { select: { status: true } } },
      });
      const value = row?.value as
        | {
            id?: string;
            expires?: number;
            values?: Record<string, string>;
            editor?: boolean;
            channel?: string;
          }
        | undefined;
      reply.header("Cache-Control", "private, no-store");
      if (
        !row ||
        row.author.status !== "ACTIVE" ||
        !value?.expires ||
        value.expires < Date.now()
      )
        return fail(
          reply,
          404,
          "Bản xem trước không còn hiệu lực.",
          "PREVIEW_EXPIRED",
        );
      const definition = value.id
        ? await pageFor(value.id, row.locale)
        : undefined;
      return ok(reply, {
        id: value.id,
        locale: row.locale,
        page: row.page,
        values: value.values,
        programme: definition?.id.startsWith("programme:")
          ? definition.defaults
          : undefined,
        editor:
          value.editor && definition
            ? {
                channel: value.channel,
                adminOrigin: new URL(env.ADMIN_APP_URL).origin,
                fields: editableFields(definition, value.values ?? {}).map(
                  (field) => ({
                    ...field,
                    value: value.values?.[field.path] ?? field.value,
                  }),
                ),
              }
            : undefined,
      });
    },
  );
  app.get("/api/admin/website/pages", async (request, reply) => {
    if (!(await allow(request, reply, "website.view"))) return;
    const rows = await prisma.siteContent.findMany({
      where: { section: { in: ["cms-draft", "cms-published"] } },
      select: { key: true, updatedAt: true, published: true, locale: true, value: true, author: { select: { fullName: true } } },
    });
    const programmeStates = await prisma.siteContent.findMany({ where: { section: "cms-programme-state" }, include: { author: { select: { fullName: true } } } });
    return ok(reply, {
      pages: (await pageDefinitions()).map((p) => {
        const latest = rows.filter((row) => row.locale === "vi" && [keyFor(p.id,"vi","draft"),keyFor(p.id,"vi","published")].includes(row.key)).sort((a,b) => b.updatedAt.getTime()-a.updatedAt.getTime())[0];
        const patch = (latest?.value ?? {}) as Record<string,string>;
        const resolved = applyContentPatch(applyCollections(p.defaults,patch,p.id),patch);
        return ({
        id: p.id,
        title: p.id.startsWith("programme:") ? String(resolved.title ?? "").trim() || p.title : p.title,
        path: p.path,
        kind: p.kind,
        locales: p.locales,
        programmeState: programmeStates.find((row) => row.key === programmeStateKey(p.id))?.value,
        stateRevision: programmeStates.find((row) => row.key === programmeStateKey(p.id))?.updatedAt.toISOString() ?? null,
        field: resolved.field,
        degree: resolved.degree,
        states: rows.filter((r) =>
          p.locales.some(
            (l) =>
              r.key === keyFor(p.id, l, r.published ? "published" : "draft"),
          ),
        ).map(({ value: _value, ...state }) => state),
      }); }),
    });
  });
  app.get("/api/admin/website/page", async (request, reply) => {
    if (!(await allow(request, reply, "website.view"))) return;
    const { id, locale } = query.parse(request.query);
    const page = await pageFor(id, locale);
    if (!page) return fail(reply, 404, "Không tìm thấy trang.", "NOT_FOUND");
    const [draft, published] = await Promise.all(
      ["draft", "published"].map((state) =>
        prisma.siteContent.findUnique({
          where: { key: keyFor(id, locale, state) },
        }),
      ),
    );
    reply.header("Cache-Control", "private, no-store");
    return ok(reply, {
      page: {
        id,
        title: page.title,
        path: page.path,
        fields: editableFields(
          page,
          (draft?.value ?? published?.value ?? {}) as Record<string, string>,
        ),
        sections: cmsSections(id),
        collections: Object.keys(collectionSchemas(id)),
        defaults: page.defaults,
        publicOrigin: env.PUBLIC_APP_URL,
      },
      values: draft?.value ?? published?.value ?? {},
      revision: draft?.updatedAt.toISOString() ?? null,
      publishedAt: published?.updatedAt ?? null,
    });
  });
  app.put("/api/admin/website/page", async (request, reply) => {
    const user = await allow(request, reply, "website.update");
    if (!user) return;
    const body = input.parse(request.body);
    const page = await pageFor(body.id, body.locale);
    if (!page || !validateValues(page, body.values))
      return fail(
        reply,
        400,
        "Nội dung hoặc đường dẫn không hợp lệ.",
        "INVALID_CONTENT",
      );
    const key = keyFor(body.id, body.locale, "draft");
    try {
      const row = await prisma.$transaction(
        async (tx) => {
          const current = await tx.siteContent.findUnique({ where: { key } });
          if ((current?.updatedAt.toISOString() ?? null) !== body.revision)
            throw new Error("CMS_CONFLICT");
          const data = {
            locale: body.locale,
            page: page.path,
            section: "cms-draft",
            title: page.title,
            value: body.values as Prisma.InputJsonValue,
            published: false,
            authorId: user.id,
          };
          return tx.siteContent.upsert({
            where: { key },
            create: { key, ...data },
            update: data,
          });
        },
        { isolationLevel: "Serializable" },
      );
      return ok(
        reply,
        { revision: row.updatedAt.toISOString() },
        "Đã lưu bản nháp.",
      );
    } catch (error) {
      if (
        (error instanceof Error && error.message === "CMS_CONFLICT") ||
        (error instanceof Prisma.PrismaClientKnownRequestError &&
          ["P2034", "P2002"].includes(error.code))
      )
        return fail(
          reply,
          409,
          "Trang đã được sửa ở phiên khác. Hãy tải lại trước khi lưu.",
          "CMS_CONFLICT",
        );
      throw error;
    }
  });
  app.post("/api/admin/website/publish", async (request, reply) => {
    const user = await allow(request, reply, "website.publish");
    if (!user) return;
    const body = query.extend({ revision: z.string() }).parse(request.body);
    const page = await pageFor(body.id, body.locale);
    if (!page) return fail(reply, 404, "Không tìm thấy trang.", "NOT_FOUND");
    try {
      await prisma.$transaction(
        async (tx) => {
          const draft = await tx.siteContent.findUnique({
            where: { key: keyFor(body.id, body.locale, "draft") },
          });
          if (!draft || draft.updatedAt.toISOString() !== body.revision)
            throw new Error("CMS_CONFLICT");
          if (body.id.startsWith("programme:")) {
            const state = await tx.siteContent.findUnique({ where: { key: programmeStateKey(body.id) } });
            if (["hidden", "archived"].includes((state?.value as { status?: string } | undefined)?.status ?? ""))
              throw Error("PROGRAMME_INVALID:Khôi phục chuyên ngành trong danh sách trước khi xuất bản.");
            const content = applyContentPatch(applyCollections(page.defaults, draft.value as Record<string, string>, page.id), draft.value as Record<string, string>);
            const hero = (content.pageContent as { hero?: { heroLead?: string; heroImage?: string } } | undefined)?.hero;
            if (!String(content.title ?? "").trim() || !String(content.summary ?? "").trim() || !String(hero?.heroLead ?? "").trim() || !safeContentImage(hero?.heroImage || String(content.bannerImage ?? "")))
              throw Error("PROGRAMME_INVALID:Cần có tên ngành, giới thiệu ngắn, mô tả banner và ảnh banner hợp lệ trước khi xuất bản.");
          }
          const key = keyFor(body.id, body.locale, "published");
          const data = {
            locale: body.locale,
            page: page.path,
            section: "cms-published",
            title: page.title,
            value: draft.value as Prisma.InputJsonValue,
            published: true,
            authorId: user.id,
          };
          await tx.siteContent.upsert({
            where: { key },
            create: { key, ...data },
            update: data,
          });
          if (body.id.startsWith("programme:"))
            await tx.siteContent.updateMany({
              where: {
                key: `cms.programme.${body.id.slice(10)}`,
                section: "cms-programme",
              },
              data: { published: true },
            });
        },
        { isolationLevel: "Serializable" },
      );
      return ok(reply, {}, "Đã xuất bản nội dung.");
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("PROGRAMME_INVALID:"))
        return fail(reply, 422, error.message.slice("PROGRAMME_INVALID:".length), "PROGRAMME_INVALID");
      if (
        (error instanceof Error && error.message === "CMS_CONFLICT") ||
        (error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2034")
      )
        return fail(
          reply,
          409,
          "Bản nháp đã thay đổi. Hãy tải lại và xem trước.",
          "CMS_CONFLICT",
        );
      throw error;
    }
  });
  app.delete("/api/admin/website/page", async (request, reply) => {
    if (!(await allow(request, reply, "website.update"))) return;
    const body = query.extend({ revision: z.string() }).parse(request.body);
    const removed = await prisma.siteContent.deleteMany({
      where: {
        key: keyFor(body.id, body.locale, "draft"),
        updatedAt: new Date(body.revision),
      },
    });
    if (!removed.count)
      return fail(
        reply,
        409,
        "Bản nháp đã thay đổi. Hãy tải lại.",
        "CMS_CONFLICT",
      );
    return ok(reply, {}, "Đã bỏ bản nháp, giữ nguyên bản đã xuất bản.");
  });
}
