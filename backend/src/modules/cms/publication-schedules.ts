import type { FastifyInstance } from "fastify";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { fail, ok } from "../../shared/http/response.js";
import { pageDefinition, type CmsPageDefinition } from "./page-registry.js";

type Publish = (tx: Prisma.TransactionClient, body: { id: string; locale: string; revision: string; preservePresentation: boolean }, authorId: string, page: CmsPageDefinition) => Promise<void>;
const target = z.object({ id: z.string().max(150), locale: z.enum(["vi", "en"]).default("vi") });
const scheduleSchema = target.extend({ revision: z.string(), dueAt: z.string().datetime(), status: z.enum(["PENDING", "PUBLISHED", "CANCELLED", "FAILED"]), error: z.string().optional() });
const scheduleKey = (id: string, locale: string) => `cms.schedule.${locale}.${id}`;

export async function runPublicationSchedules(publish: Publish) {
  // Filter and order by UTC ISO timestamps in PostgreSQL; no in-memory truncation of future jobs.
  const jobs = await prisma.siteContent.findMany({ where: { section: "cms-schedule", AND: [{ value: { path: ["status"], equals: "PENDING" } }, { value: { path: ["dueAt"], lte: new Date().toISOString() } }] }, orderBy: { updatedAt: "asc" }, take: 50 });
  for (const job of jobs) {
    const parsed = scheduleSchema.safeParse(job.value);
    if (!parsed.success) continue;
    const data = parsed.data;
    const page = await pageDefinition(data.id, data.locale);
    try {
      await prisma.$transaction(async tx => {
        // Transaction plus the row revision makes concurrent workers/cancellation idempotent.
        const current = await tx.siteContent.findUnique({ where: { key: job.key } });
        if (!current || current.updatedAt.getTime() !== job.updatedAt.getTime() || (current.value as { status?: string }).status !== "PENDING") return;
        if (!page) throw Error("SCHEDULE_INVALID:Trang không còn tồn tại.");
        const actor = job.authorId ? await tx.admin.findUnique({ where: { id: job.authorId }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
        if (!actor || actor.status !== "ACTIVE" || actor.mustChangePassword || (actor.role.code !== "SUPER_ADMIN" && !actor.role.permissions.some(item => item.permission.code === "website.publish"))) throw Error("SCHEDULE_INVALID:Tài khoản đặt lịch không còn quyền xuất bản.");
        await publish(tx, { ...data, preservePresentation: true }, actor.id, page);
        await tx.siteContent.update({ where: { key: job.key }, data: { value: { ...data, status: "PUBLISHED" } } });
      }, { isolationLevel: "Serializable" });
    } catch (error) {
      // Validation failure is actionable; transient database conflicts are retried on the next tick.
      const message = error instanceof Error ? error.message : "";
      if (message === "CMS_CONFLICT" || /^(PROGRAMME_INVALID|SCHEDULE_INVALID):/.test(message)) {
        await prisma.siteContent.updateMany({ where: { key: job.key, updatedAt: job.updatedAt }, data: { value: { ...data, status: "FAILED", error: message === "CMS_CONFLICT" ? "Bản nháp đã thay đổi sau khi đặt lịch. Duyệt lại rồi đặt lịch mới." : message.slice(message.indexOf(":") + 1) } } });
      } else if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034")) throw error;
    }
  }
}

export async function publicationSchedules(app: FastifyInstance, publish: Publish) {
  app.get("/api/admin/website/schedule", async (request, reply) => {
    const user = await authenticateRequest(request);
    if (!user) return fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED");
    if (user.mustChangePassword || (user.role.code !== "SUPER_ADMIN" && !user.permissions.includes("website.view"))) return fail(reply, 403, "Không có quyền xem lịch.", "FORBIDDEN");
    const body = target.parse(request.query);
    const row = await prisma.siteContent.findUnique({ where: { key: scheduleKey(body.id, body.locale) } });
    reply.header("Cache-Control", "private, no-store");
    return ok(reply, { schedule: row?.value ?? null, revision: row?.updatedAt.toISOString() ?? null });
  });
  app.put("/api/admin/website/schedule", async (request, reply) => {
    const user = await authenticateRequest(request);
    if (!user) return fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED");
    if (user.mustChangePassword || (user.role.code !== "SUPER_ADMIN" && !user.permissions.includes("website.publish"))) return fail(reply, 403, "Không có quyền đặt lịch.", "FORBIDDEN");
    const body = target.extend({ revision: z.string(), scheduleRevision: z.string().nullable(), dueAt: z.string().datetime().nullable() }).strict().parse(request.body);
    if (body.dueAt && (Date.parse(body.dueAt) < Date.now() + 60000 || Date.parse(body.dueAt) > Date.now() + 366 * 86400000)) return fail(reply, 400, "Chọn thời gian từ 1 phút đến 1 năm trong tương lai.", "INVALID_SCHEDULE");
    const page = await pageDefinition(body.id, body.locale);
    if (!page) return fail(reply, 404, "Không tìm thấy trang.", "NOT_FOUND");
    try {
      await prisma.$transaction(async tx => {
        const key = scheduleKey(body.id, body.locale);
        const current = await tx.siteContent.findUnique({ where: { key } });
        if ((current?.updatedAt.toISOString() ?? null) !== body.scheduleRevision) throw Error("CMS_CONFLICT");
        if (body.dueAt) {
          const draft = await tx.siteContent.findUnique({ where: { key: `cms.draft.${body.locale}.${body.id}` } });
          const review = await tx.siteContent.findUnique({ where: { key: `cms.workflow.${body.locale}.${body.id}` } });
          const decision = review?.value as { revision?: string; status?: string } | undefined;
          if (!draft || draft.updatedAt.toISOString() !== body.revision || decision?.revision !== body.revision || decision.status !== "APPROVED") throw Error("SCHEDULE_REVIEW");
        } else if (!current || (current.value as { status?: string }).status !== "PENDING") throw Error("CMS_CONFLICT");
        const value = { id: body.id, locale: body.locale, revision: body.revision, dueAt: body.dueAt ?? new Date().toISOString(), status: body.dueAt ? "PENDING" : "CANCELLED" };
        const data = { locale: body.locale, page: page.path, title: page.title, section: "cms-schedule", published: false, authorId: user.id, value };
        await tx.siteContent.upsert({ where: { key }, create: { key, ...data }, update: data });
        await tx.auditLog.create({ data: { action: "ACCOUNT_UPDATED", actorAdminId: user.id, targetType: "website", targetId: body.id, metadata: { operation: body.dueAt ? "CMS_SCHEDULE" : "CMS_SCHEDULE_CANCEL", locale: body.locale, revision: body.revision, dueAt: body.dueAt } } });
      }, { isolationLevel: "Serializable" });
      return ok(reply, {}, body.dueAt ? "Đã đặt lịch xuất bản." : "Đã hủy lịch.");
    } catch (error) {
      if (error instanceof Error && error.message === "SCHEDULE_REVIEW") return fail(reply, 422, "Cần duyệt đúng phiên bản hiện tại trước khi đặt lịch.", "SCHEDULE_REVIEW");
      if ((error instanceof Error && error.message === "CMS_CONFLICT") || (error instanceof Prisma.PrismaClientKnownRequestError && ["P2034", "P2002"].includes(error.code))) return fail(reply, 409, "Lịch hoặc bản nháp đã thay đổi. Hãy tải lại.", "CMS_CONFLICT");
      throw error;
    }
  });
  let pending: Promise<void> | undefined;
  let timer: ReturnType<typeof setInterval> | undefined;
  const tick = () => { if (!pending) pending = runPublicationSchedules(publish).catch(error => app.log.error(error, "CMS publication schedule failed; retrying next tick")).finally(() => { pending = undefined; }); };
  app.addHook("onReady", async () => { timer = setInterval(tick, 30000); timer.unref(); tick(); });
  app.addHook("onClose", async () => { clearInterval(timer); await pending; });
}
