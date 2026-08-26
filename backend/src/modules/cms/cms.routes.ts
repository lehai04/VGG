import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import sanitizeHtml from "sanitize-html";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { fail, ok } from "../../shared/http/response.js";

const status = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
const slug = z.string().trim().min(2).max(190).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const newsCategory = z.enum([
  "ADMISSIONS",
  "VAN_LANG_UNIVERSITY",
  "UNIVERSITY_EVENT",
  "VAN_LANG_LIFE",
  "INTERNATIONAL_COOPERATION",
  "RESEARCH_PROJECT",
  "RESEARCH_PUBLICATION",
]);
const imagePath = z.string().trim().max(1000).refine((value) => value.startsWith("/") || URL.canParse(value), "Ảnh phải là URL hoặc đường dẫn bắt đầu bằng /.");
const safeCssColor = [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s,.%]+\)$/i, /^hsla?\([\d\s,.%]+\)$/i, /^[a-z]+$/i];
const safeCssLength = [/^-?\d+(?:\.\d+)?(?:px|em|rem|%|pt)?$/i];
const cleanNewsHtml = (value: string) => sanitizeHtml(value, {
  allowedTags: ["p", "div", "span", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "sub", "sup", "font", "ul", "ol", "li", "blockquote", "a", "img", "figure", "figcaption", "table", "thead", "tbody", "tfoot", "tr", "th", "td"],
  allowedAttributes: {
    "*": ["style", "align"],
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
    font: ["color", "face", "size"],
    ol: ["start", "type"],
    ul: ["type"],
    li: ["value"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
  },
  allowedStyles: {
    "*": {
      color: safeCssColor,
      "background-color": safeCssColor,
      "font-family": [/^[\w\s,'"-]+$/],
      "font-size": safeCssLength,
      "font-weight": [/^(?:normal|bold|bolder|lighter|[1-9]00)$/],
      "font-style": [/^(?:normal|italic|oblique)$/],
      "text-decoration": [/^(?:none|underline|line-through|overline)(?:\s+(?:underline|line-through|overline))*$/],
      "text-align": [/^(?:left|right|center|justify|start|end)$/],
      "text-indent": safeCssLength,
      "line-height": [/^(?:normal|\d+(?:\.\d+)?(?:px|em|rem|%|pt)?)$/i],
      "letter-spacing": [/^(?:normal|-?\d+(?:\.\d+)?(?:px|em|rem|pt)?)$/i],
      "margin-left": safeCssLength,
      "margin-right": safeCssLength,
      "margin-top": safeCssLength,
      "margin-bottom": safeCssLength,
      "padding-left": safeCssLength,
      "padding-right": safeCssLength,
      "white-space": [/^(?:normal|nowrap|pre|pre-wrap|pre-line)$/],
    },
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: { a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }) },
}).trim();
const newsContent = z.string().transform(cleanNewsHtml).refine((value) => sanitizeHtml(value, { allowedTags: [] }).trim().length >= 20, "Nội dung phải có ít nhất 20 ký tự.");
const newsInput = z.object({ slug, locale: z.enum(["vi", "en"]).default("vi"), category: newsCategory.default("VAN_LANG_UNIVERSITY"), title: z.string().trim().min(2).max(250), authorName: z.string().trim().min(2).max(120), excerpt: z.string().trim().min(10).max(1000), content: newsContent, coverImage: imagePath.optional().nullable(), publishedAt: z.coerce.date().optional(), status: status.default("DRAFT") });
const resourceType = z.enum(["DIRECTIVE_DOCUMENT", "EXECUTION_DOCUMENT", "BROCHURE", "PDF_DOCUMENT"]);
const resourceDocumentType = z.enum(["REGULATION", "RULE", "PROCESS", "NOTICE", "GUIDELINE"]);
const allowedResourceFiles = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "image/jpeg", "image/png"]);
const resourceInput = z.object({
  locale: z.enum(["vi", "en"]).default("vi"),
  title: z.string().trim().min(2).max(250),
  description: z.string().trim().max(2000).optional().nullable(),
  categoryId: z.string().trim().min(1),
  resourceType,
  documentType: resourceDocumentType.optional().nullable(),
  documentNumber: z.string().trim().max(100).optional().nullable(),
  issueDate: z.coerce.date().optional().nullable(),
  issuingOrganization: z.string().trim().max(250).optional().nullable(),
  fileUrl: z.string().url().max(1000),
  fileName: z.string().trim().min(1).max(255),
  fileType: z.string().trim().refine((value) => allowedResourceFiles.has(value), "Định dạng file không được hỗ trợ."),
  fileSize: z.coerce.number().int().positive().max(50 * 1024 * 1024),
  status: status.default("PUBLISHED"),
}).superRefine((value, context) => {
  const isDocument = value.resourceType === "DIRECTIVE_DOCUMENT" || value.resourceType === "EXECUTION_DOCUMENT";
  if (isDocument && !value.documentNumber) context.addIssue({ code: "custom", path: ["documentNumber"], message: "Số văn bản là bắt buộc." });
  if (isDocument && !value.issueDate) context.addIssue({ code: "custom", path: ["issueDate"], message: "Ngày ban hành là bắt buộc." });
  if (isDocument && !value.issuingOrganization) context.addIssue({ code: "custom", path: ["issuingOrganization"], message: "Đơn vị ban hành là bắt buộc." });
  if (value.resourceType === "EXECUTION_DOCUMENT" && !value.documentType) context.addIssue({ code: "custom", path: ["documentType"], message: "Loại văn bản là bắt buộc." });
  if ((value.resourceType === "BROCHURE" || value.resourceType === "PDF_DOCUMENT") && value.fileType !== "application/pdf") context.addIssue({ code: "custom", path: ["fileType"], message: "Loại tài nguyên này chỉ chấp nhận file PDF." });
});
const resourceCategoryInput = z.object({ name: z.string().trim().min(1, "Tên danh mục không được để trống.").max(120) });
const siteInput = z.object({ key: z.string().trim().min(2).max(190), locale: z.enum(["vi", "en"]).default("vi"), section: z.string().trim().min(1).max(100), page: z.string().trim().min(1).max(190), title: z.string().max(250).optional().nullable(), value: z.record(z.string(), z.unknown()), published: z.boolean().default(false) });

async function guard(request: FastifyRequest, reply: FastifyReply, permission: string) {
  const admin = await authenticateRequest(request);
  if (!admin) { fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED"); return null; }
  if (!admin.permissions.includes(permission)) { fail(reply, 403, "Bạn không có quyền thực hiện thao tác này.", "FORBIDDEN"); return null; }
  return admin;
}

async function availableNewsSlug(requested: string, excludeId?: string) {
  const base = requested.slice(0, 190).replace(/-+$/g, "") || "bai-viet";
  let candidate = base;
  let number = 2;
  while (await prisma.newsPost.findFirst({ where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) }, select: { id: true } })) {
    const suffix = `-${number++}`;
    candidate = `${base.slice(0, 190 - suffix.length).replace(/-+$/g, "")}${suffix}`;
  }
  return candidate;
}

function slugifyResourceTitle(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "tai-nguyen";
}

async function availableResourceSlug(title: string, excludeId?: string) {
  const base = slugifyResourceTitle(title).slice(0, 190).replace(/-+$/g, "");
  let candidate = base;
  let number = 2;
  while (await prisma.resourceFile.findFirst({ where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) }, select: { id: true } })) {
    const suffix = `-${number++}`;
    candidate = `${base.slice(0, 190 - suffix.length).replace(/-+$/g, "")}${suffix}`;
  }
  return candidate;
}

export async function cmsRoutes(app: FastifyInstance) {
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
  app.get("/api/public/resources", async (_request, reply) => ok(reply, { resources: await prisma.resourceFile.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" }, include: { category: true } }) }));
  app.get("/api/public/site-content", async (request, reply) => { const query = z.object({ locale: z.enum(["vi", "en"]).default("vi") }).parse(request.query); return ok(reply, { contents: await prisma.siteContent.findMany({ where: { locale: query.locale, published: true } }) }); });
  app.post("/api/public/visits", async (request, reply) => { const input = z.object({ path: z.string().max(500), locale: z.string().max(5).optional(), visitorId: z.string().max(100).optional() }).parse(request.body); await prisma.pageVisit.create({ data: input }); return reply.code(201).send({ success: true, data: {}, message: "" }); });

  app.get("/api/admin/dashboard", async (request, reply) => {
    if (!await guard(request, reply, "dashboard.view")) return;
    const since = new Date(Date.now() - 30 * 86_400_000);
    const [staff, visits, consultations, applications, visitSeries, consultationSeries, applicationSeries] = await Promise.all([
      prisma.admin.count({ where: { status: "ACTIVE" } }), prisma.pageVisit.count(), prisma.consultation.count(), prisma.application.count(),
      prisma.$queryRaw<Array<{ day: Date; count: bigint }>>`SELECT date_trunc('day', created_at) AS day, count(*)::bigint AS count FROM page_visits WHERE created_at >= ${since} GROUP BY 1 ORDER BY 1`,
      prisma.$queryRaw<Array<{ day: Date; count: bigint }>>`SELECT date_trunc('day', created_at) AS day, count(*)::bigint AS count FROM consultations WHERE created_at >= ${since} GROUP BY 1 ORDER BY 1`,
      prisma.$queryRaw<Array<{ day: Date; count: bigint }>>`SELECT date_trunc('day', created_at) AS day, count(*)::bigint AS count FROM applications WHERE created_at >= ${since} GROUP BY 1 ORDER BY 1`,
    ]);
    const serialize = (rows: Array<{ day: Date; count: bigint }>) => rows.map((row) => ({ date: row.day, count: Number(row.count) }));
    return ok(reply, { totals: { staff, visits, consultations, applications }, visitSeries: serialize(visitSeries), consultationSeries: serialize(consultationSeries), applicationSeries: serialize(applicationSeries), updatedAt: new Date() });
  });

  app.get("/api/admin/news", async (request, reply) => { if (!await guard(request, reply, "news.view")) return; return ok(reply, { posts: await prisma.newsPost.findMany({ orderBy: { updatedAt: "desc" }, include: { author: { select: { fullName: true } } } }) }); });
  app.get("/api/admin/news/:id", async (request, reply) => { if (!await guard(request, reply, "news.view")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const post = await prisma.newsPost.findUnique({ where: { id }, include: { author: { select: { fullName: true } } } }); if (!post) return fail(reply, 404, "Không tìm thấy bài viết.", "NEWS_NOT_FOUND"); return ok(reply, { post }); });
  app.post("/api/admin/news", async (request, reply) => { const admin = await guard(request, reply, "news.create"); if (!admin) return; const input = newsInput.parse(request.body); const uniqueSlug = await availableNewsSlug(input.slug); const post = await prisma.newsPost.create({ data: { ...input, slug: uniqueSlug, authorId: admin.id, publishedAt: input.status === "PUBLISHED" ? (input.publishedAt ?? new Date()) : null } }); return reply.code(201).send({ success: true, data: { post }, message: "Đã lưu bài viết." }); });
  app.put("/api/admin/news/:id", async (request, reply) => { if (!await guard(request, reply, "news.update")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const input = newsInput.parse(request.body); const current = await prisma.newsPost.findUnique({ where: { id }, select: { publishedAt: true } }); if (!current) return fail(reply, 404, "Không tìm thấy bài viết.", "NEWS_NOT_FOUND"); const uniqueSlug = await availableNewsSlug(input.slug, id); const post = await prisma.newsPost.update({ where: { id }, data: { ...input, slug: uniqueSlug, publishedAt: input.status === "PUBLISHED" ? (input.publishedAt ?? current.publishedAt ?? new Date()) : null } }); return ok(reply, { post }, "Đã cập nhật bài viết."); });
  app.delete("/api/admin/news/:id", async (request, reply) => { if (!await guard(request, reply, "news.delete")) return; const { id } = z.object({ id: z.string() }).parse(request.params); await prisma.newsPost.update({ where: { id }, data: { status: "ARCHIVED" } }); return ok(reply, {}, "Đã lưu trữ bài viết."); });

  app.get("/api/admin/resources", async (request, reply) => {
    if (!await guard(request, reply, "resources.view")) return;
    const query = z.object({ q: z.string().trim().max(100).optional(), categoryId: z.string().optional(), resourceType: resourceType.optional(), documentType: resourceDocumentType.optional(), page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(100) }).parse(request.query);
    const where = { ...(query.q ? { title: { contains: query.q, mode: "insensitive" as const } } : {}), ...(query.categoryId ? { categoryId: query.categoryId } : {}), ...(query.resourceType ? { resourceType: query.resourceType } : {}), ...(query.documentType ? { documentType: query.documentType } : {}) };
    const [resources, total] = await Promise.all([
      prisma.resourceFile.findMany({ where, orderBy: { createdAt: "desc" }, skip: (query.page - 1) * query.limit, take: query.limit, include: { category: true, author: { select: { fullName: true } } } }),
      prisma.resourceFile.count({ where }),
    ]);
    return ok(reply, { resources, pagination: { page: query.page, limit: query.limit, total, totalPages: Math.ceil(total / query.limit) } });
  });
  app.get("/api/admin/resources/:id", async (request, reply) => { if (!await guard(request, reply, "resources.view")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const resource = await prisma.resourceFile.findUnique({ where: { id }, include: { category: true, author: { select: { fullName: true } } } }); if (!resource) return fail(reply, 404, "Không tìm thấy tài nguyên.", "RESOURCE_NOT_FOUND"); return ok(reply, { resource }); });
  app.post("/api/admin/resources", async (request, reply) => { const admin = await guard(request, reply, "resources.create"); if (!admin) return; const input = resourceInput.parse(request.body); const category = await prisma.resourceCategory.findUnique({ where: { id: input.categoryId }, select: { id: true } }); if (!category) return fail(reply, 400, "Danh mục không tồn tại.", "RESOURCE_CATEGORY_NOT_FOUND"); const resourceSlug = await availableResourceSlug(input.title); const resource = await prisma.resourceFile.create({ data: { ...input, slug: resourceSlug, authorId: admin.id, publishedAt: input.status === "PUBLISHED" ? new Date() : null } }); return reply.code(201).send({ success: true, data: { resource }, message: "Đã thêm tài nguyên." }); });
  app.put("/api/admin/resources/:id", async (request, reply) => { if (!await guard(request, reply, "resources.update")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const input = resourceInput.parse(request.body); const current = await prisma.resourceFile.findUnique({ where: { id }, select: { id: true, publishedAt: true } }); if (!current) return fail(reply, 404, "Không tìm thấy tài nguyên.", "RESOURCE_NOT_FOUND"); const category = await prisma.resourceCategory.findUnique({ where: { id: input.categoryId }, select: { id: true } }); if (!category) return fail(reply, 400, "Danh mục không tồn tại.", "RESOURCE_CATEGORY_NOT_FOUND"); const resourceSlug = await availableResourceSlug(input.title, id); const resource = await prisma.resourceFile.update({ where: { id }, data: { ...input, slug: resourceSlug, publishedAt: input.status === "PUBLISHED" ? (current.publishedAt ?? new Date()) : null } }); return ok(reply, { resource }, "Đã cập nhật tài nguyên."); });
  app.delete("/api/admin/resources/:id", async (request, reply) => { if (!await guard(request, reply, "resources.delete")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const existing = await prisma.resourceFile.findUnique({ where: { id }, select: { id: true } }); if (!existing) return fail(reply, 404, "Không tìm thấy tài nguyên.", "RESOURCE_NOT_FOUND"); await prisma.resourceFile.delete({ where: { id } }); return ok(reply, {}, "Đã xóa tài nguyên."); });

  app.get("/api/admin/resource-categories", async (request, reply) => { if (!await guard(request, reply, "resources.view")) return; const categories = await prisma.resourceCategory.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { resources: true } } } }); return ok(reply, { categories }); });
  app.post("/api/admin/resource-categories", async (request, reply) => { if (!await guard(request, reply, "resources.create")) return; const input = resourceCategoryInput.parse(request.body); const duplicate = await prisma.resourceCategory.findFirst({ where: { name: { equals: input.name, mode: "insensitive" } }, select: { id: true } }); if (duplicate) return fail(reply, 409, "Tên danh mục đã tồn tại.", "RESOURCE_CATEGORY_DUPLICATE"); const category = await prisma.resourceCategory.create({ data: input }); return reply.code(201).send({ success: true, data: { category }, message: "Đã thêm danh mục." }); });
  app.put("/api/admin/resource-categories/:id", async (request, reply) => { if (!await guard(request, reply, "resources.update")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const input = resourceCategoryInput.parse(request.body); const duplicate = await prisma.resourceCategory.findFirst({ where: { name: { equals: input.name, mode: "insensitive" }, id: { not: id } }, select: { id: true } }); if (duplicate) return fail(reply, 409, "Tên danh mục đã tồn tại.", "RESOURCE_CATEGORY_DUPLICATE"); const existing = await prisma.resourceCategory.findUnique({ where: { id }, select: { id: true } }); if (!existing) return fail(reply, 404, "Không tìm thấy danh mục.", "RESOURCE_CATEGORY_NOT_FOUND"); const category = await prisma.resourceCategory.update({ where: { id }, data: input }); return ok(reply, { category }, "Đã cập nhật danh mục."); });
  app.delete("/api/admin/resource-categories/:id", async (request, reply) => { if (!await guard(request, reply, "resources.delete")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const category = await prisma.resourceCategory.findUnique({ where: { id }, include: { _count: { select: { resources: true } } } }); if (!category) return fail(reply, 404, "Không tìm thấy danh mục.", "RESOURCE_CATEGORY_NOT_FOUND"); if (category._count.resources > 0) return fail(reply, 409, "Không thể xóa danh mục vì hiện vẫn còn tài nguyên thuộc danh mục này.", "RESOURCE_CATEGORY_IN_USE"); await prisma.resourceCategory.delete({ where: { id } }); return ok(reply, {}, "Đã xóa danh mục."); });
  app.get("/api/admin/applications", async (request, reply) => { if (!await guard(request, reply, "applications.view")) return; return ok(reply, { applications: await prisma.application.findMany({ orderBy: { createdAt: "desc" }, take: 200 }) }); });

  app.get("/api/admin/site-content", async (request, reply) => { if (!await guard(request, reply, "website.view")) return; return ok(reply, { contents: await prisma.siteContent.findMany({ orderBy: [{ section: "asc" }, { page: "asc" }] }) }); });
  app.post("/api/admin/site-content", async (request, reply) => { const admin = await guard(request, reply, "website.update"); if (!admin) return; const input = siteInput.parse(request.body); const data = { ...input, value: input.value as Prisma.InputJsonValue, authorId: admin.id }; const content = await prisma.siteContent.upsert({ where: { key: input.key }, update: data, create: data }); return ok(reply, { content }, "Đã cập nhật cấu hình website."); });
}
