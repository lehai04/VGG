import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
import { fail, ok } from "../../shared/http/response.js";
import { mediaBucket, mediaStorage } from "../../shared/storage/minio.js";
type PublicPageDefinition = { id: string; defaults: Record<string, unknown> };
const slug = z.string().trim().min(2).max(190).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const newsCategory = z.enum(["ADMISSIONS", "VAN_LANG_UNIVERSITY", "UNIVERSITY_EVENT", "VAN_LANG_LIFE", "INTERNATIONAL_COOPERATION", "RESEARCH_PROJECT", "RESEARCH_PUBLICATION"]);
const resourceType = z.enum(["DIRECTIVE_DOCUMENT", "EXECUTION_DOCUMENT", "BROCHURE", "PDF_DOCUMENT"]);
const createSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(9).max(30),
  email: z.email().max(190),
  programme: z.string().trim().max(190).optional(),
  interestedField: z.string().trim().max(190).optional(),
  preferredDate: z.string().date().optional(),
  preferredTime: z.string().max(50).optional(),
  consultationMethod: z.string().max(50).optional(),
  message: z.string().max(3000).optional(),
  sourcePage: z.string().max(500).optional(),
  sourceComponent: z.string().max(120).optional(),
  website: z.string().max(0).optional(),
  consent: z.union([z.literal("yes"), z.literal(true)]),
});


export async function publicRoutes(app: FastifyInstance) {
  app.get("/api/public/media/*", async (request, reply) => {
    const key = (request.params as { "*": string })["*"] ?? "";
    if (!key || key.includes("..") || key.startsWith("/")) return fail(reply, 400, "Đường dẫn file không hợp lệ.", "INVALID_MEDIA_PATH");
    try {
      const stat = await mediaStorage.statObject(mediaBucket, key);
      const stream = await mediaStorage.getObject(mediaBucket, key);
      reply.header("Content-Type", String(stat.metaData["content-type"] ?? "application/octet-stream"));
      reply.header("Content-Length", stat.size);
      reply.header("Cache-Control", String(stat.metaData["cache-control"] ?? "public, max-age=300"));
      return reply.send(stream);
    } catch {
      return fail(reply, 404, "Không tìm thấy file.", "MEDIA_NOT_FOUND");
    }
  });
  app.get("/api/public/news", async (request, reply) => {
    const query = z.object({ category: newsCategory.optional(), q: z.string().trim().max(100).optional(), locale: z.enum(["vi", "en"]).default("vi"), limit: z.coerce.number().int().min(1).max(100).default(30), page: z.coerce.number().int().min(1).default(1) }).parse(request.query);
    const where = { status: "PUBLISHED" as const, locale: query.locale, ...(query.category ? { category: query.category } : {}), ...(query.q ? { OR: [{ title: { contains: query.q, mode: "insensitive" as const } }, { excerpt: { contains: query.q, mode: "insensitive" as const } }] } : {}) };
    const [posts, total] = await Promise.all([
      prisma.newsPost.findMany({ where, orderBy: { publishedAt: "desc" }, skip: (query.page - 1) * query.limit, take: query.limit, include: { author: { select: { fullName: true } } } }),
      prisma.newsPost.count({ where }),
    ]);
    return ok(reply, { posts, pagination: { page: query.page, limit: query.limit, total, totalPages: Math.ceil(total / query.limit) } });
  });
  app.get("/api/public/news/:slug", async (request, reply) => {
    const params = z.object({ slug }).parse(request.params);
    const post = await prisma.newsPost.findFirst({ where: { slug: params.slug, status: "PUBLISHED" }, include: { author: { select: { fullName: true } } } });
    if (!post) return fail(reply, 404, "Không tìm thấy bài viết.", "NEWS_NOT_FOUND");
    return ok(reply, { post });
  });
  app.get("/api/public/resources", async (_request, reply) => {
    const [resources, categories] = await Promise.all([
      prisma.resourceFile.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" }, include: { category: true } }),
      prisma.resourceCategory.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    ]);
    reply.header("Cache-Control", "no-store");
    return ok(reply, { resources, categories, resourceTypes: resourceType.options });
  });
  app.get("/api/public/site-content", async (request, reply) => { const query = z.object({ locale: z.enum(["vi", "en"]).default("vi") }).parse(request.query); reply.header('Cache-Control', 'no-store'); return ok(reply, { contents: await prisma.siteContent.findMany({ where: { locale: query.locale, published: true } }) }); });
  app.post("/api/public/visits", async (request, reply) => { const input = z.object({ path: z.string().max(500), locale: z.string().max(5).optional(), visitorId: z.string().max(100).optional() }).parse(request.body); await prisma.pageVisit.create({ data: input }); return reply.code(201).send({ success: true, data: {}, message: "" }); });

  app.post(
    "/api/public/consultations",
    { config: { rateLimit: { max: 5, timeWindow: "10 minutes" } } },
    async (request, reply) => {
      const parsed = createSchema.safeParse(request.body);
      if (!parsed.success)
        return fail(
          reply,
          400,
          parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ.",
          "VALIDATION_ERROR",
        );
      const input = parsed.data;
      const consultation = await prisma.consultation.create({
        data: {
          fullName: input.name,
          phone: input.phone,
          email: input.email.toLowerCase(),
          programme: input.programme,
          interestedField: input.interestedField,
          preferredDate: input.preferredDate
            ? new Date(input.preferredDate)
            : null,
          preferredTime: input.preferredTime,
          consultationMethod: input.consultationMethod,
          message: input.message,
          sourcePage: input.sourcePage,
          sourceComponent: input.sourceComponent,
          history: {
            create: {
              action: "created",
              metadata: {
                sourcePage: input.sourcePage || null,
                sourceComponent: input.sourceComponent || null,
              },
            },
          },
        },
      });
      await prisma.auditLog.create({
        data: {
          action: "CONSULTATION_CREATED",
          targetType: "consultation",
          targetId: consultation.id,
          ipAddress: request.ip,
        },
      });
      return reply.code(201).send({
        success: true,
        data: { id: consultation.id },
        message: "Cảm ơn bạn. Đội ngũ VGG sẽ liên hệ trong thời gian sớm nhất.",
      });
    },
  );

  app.get("/api/public/website/programmes", async (_request, reply) => {
    const rows = await prisma.siteContent.findMany({
      where: { section: "cms-programme", published: true },
    });
    const states = await prisma.siteContent.findMany({ where: { section: "cms-programme-state" } });
    const hiddenIds = states.filter((row) => ["hidden", "archived"].includes((row.value as { status?: string }).status ?? "")).map((row) => row.key.slice("cms.programme-state.programme:".length));
    return ok(reply, {
      hiddenIds,
      programmes: rows.filter((row) => !hiddenIds.includes((row.value as unknown as PublicPageDefinition).id.slice(10))).map(
        (row) => (row.value as unknown as PublicPageDefinition).defaults,
      ),
    });
  });
}
