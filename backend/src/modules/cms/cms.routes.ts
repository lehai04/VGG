import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { fail, ok } from "../../shared/http/response.js";

const status = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
const slug = z.string().trim().min(2).max(190).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const newsCategory = z.enum(["GENERAL", "RESEARCH_PROJECT", "RESEARCH_PUBLICATION"]);
const newsInput = z.object({ slug, locale: z.enum(["vi", "en"]).default("vi"), category: newsCategory.default("GENERAL"), title: z.string().trim().min(2).max(250), excerpt: z.string().max(1000).optional().nullable(), content: z.string().min(1), coverImage: z.string().url().max(1000).optional().nullable(), status: status.default("DRAFT") });
const resourceInput = z.object({ slug, locale: z.enum(["vi", "en"]).default("vi"), title: z.string().trim().min(2).max(250), description: z.string().max(2000).optional().nullable(), category: z.string().max(120).optional().nullable(), fileUrl: z.string().url().max(1000), fileName: z.string().max(255).optional().nullable(), status: status.default("DRAFT") });
const siteInput = z.object({ key: z.string().trim().min(2).max(190), locale: z.enum(["vi", "en"]).default("vi"), section: z.string().trim().min(1).max(100), page: z.string().trim().min(1).max(190), title: z.string().max(250).optional().nullable(), value: z.record(z.string(), z.unknown()), published: z.boolean().default(false) });

async function guard(request: FastifyRequest, reply: FastifyReply, permission: string) {
  const admin = await authenticateRequest(request);
  if (!admin) { fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED"); return null; }
  if (!admin.permissions.includes(permission)) { fail(reply, 403, "Bạn không có quyền thực hiện thao tác này.", "FORBIDDEN"); return null; }
  return admin;
}

export async function cmsRoutes(app: FastifyInstance) {
  app.get("/api/public/news", async (request, reply) => { const query = z.object({ category: newsCategory.optional(), locale: z.enum(["vi", "en"]).optional() }).parse(request.query); return ok(reply, { posts: await prisma.newsPost.findMany({ where: { status: "PUBLISHED", ...(query.category ? { category: query.category } : {}), ...(query.locale ? { locale: query.locale } : {}) }, orderBy: { publishedAt: "desc" } }) }); });
  app.get("/api/public/resources", async (_request, reply) => ok(reply, { resources: await prisma.resourceFile.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" } }) }));
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
  app.post("/api/admin/news", async (request, reply) => { const admin = await guard(request, reply, "news.create"); if (!admin) return; const input = newsInput.parse(request.body); const post = await prisma.newsPost.create({ data: { ...input, authorId: admin.id, publishedAt: input.status === "PUBLISHED" ? new Date() : null } }); return reply.code(201).send({ success: true, data: { post }, message: "Đã lưu bài viết." }); });
  app.put("/api/admin/news/:id", async (request, reply) => { if (!await guard(request, reply, "news.update")) return; const { id } = z.object({ id: z.string() }).parse(request.params); const input = newsInput.parse(request.body); const post = await prisma.newsPost.update({ where: { id }, data: { ...input, publishedAt: input.status === "PUBLISHED" ? new Date() : null } }); return ok(reply, { post }, "Đã cập nhật bài viết."); });
  app.delete("/api/admin/news/:id", async (request, reply) => { if (!await guard(request, reply, "news.delete")) return; const { id } = z.object({ id: z.string() }).parse(request.params); await prisma.newsPost.update({ where: { id }, data: { status: "ARCHIVED" } }); return ok(reply, {}, "Đã lưu trữ bài viết."); });

  app.get("/api/admin/resources", async (request, reply) => { if (!await guard(request, reply, "resources.view")) return; return ok(reply, { resources: await prisma.resourceFile.findMany({ orderBy: { updatedAt: "desc" }, include: { author: { select: { fullName: true } } } }) }); });
  app.post("/api/admin/resources", async (request, reply) => { const admin = await guard(request, reply, "resources.create"); if (!admin) return; const input = resourceInput.parse(request.body); const resource = await prisma.resourceFile.create({ data: { ...input, authorId: admin.id, publishedAt: input.status === "PUBLISHED" ? new Date() : null } }); return reply.code(201).send({ success: true, data: { resource }, message: "Đã lưu tài nguyên." }); });
  app.delete("/api/admin/resources/:id", async (request, reply) => { if (!await guard(request, reply, "resources.delete")) return; const { id } = z.object({ id: z.string() }).parse(request.params); await prisma.resourceFile.update({ where: { id }, data: { status: "ARCHIVED" } }); return ok(reply, {}, "Đã lưu trữ tài nguyên."); });
  app.get("/api/admin/applications", async (request, reply) => { if (!await guard(request, reply, "applications.view")) return; return ok(reply, { applications: await prisma.application.findMany({ orderBy: { createdAt: "desc" }, take: 200 }) }); });

  app.get("/api/admin/site-content", async (request, reply) => { if (!await guard(request, reply, "website.view")) return; return ok(reply, { contents: await prisma.siteContent.findMany({ orderBy: [{ section: "asc" }, { page: "asc" }] }) }); });
  app.post("/api/admin/site-content", async (request, reply) => { const admin = await guard(request, reply, "website.update"); if (!admin) return; const input = siteInput.parse(request.body); const data = { ...input, value: input.value as Prisma.InputJsonValue, authorId: admin.id }; const content = await prisma.siteContent.upsert({ where: { key: input.key }, update: data, create: data }); return ok(reply, { content }, "Đã cập nhật cấu hình website."); });
}
