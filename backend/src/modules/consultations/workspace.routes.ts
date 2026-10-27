import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../shared/database/prisma.js";
import { authenticateRequest } from "../auth/auth.service.js";
import { fail, ok } from "../../shared/http/response.js";

async function allow(request: FastifyRequest, reply: FastifyReply, permission: string) {
  const user = await authenticateRequest(request);
  if (!user) { fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED"); return null; }
  if (user.mustChangePassword || (user.role.code !== "SUPER_ADMIN" && !user.permissions.includes(permission))) { fail(reply, 403, "Bạn không có quyền thực hiện thao tác này.", "FORBIDDEN"); return null; }
  return user;
}
const identity = z.object({ id: z.string().min(1).max(100) });
const followUpSchema = z.object({ outcome: z.enum(["UNDECIDED", "INTERESTED", "APPLIED", "NOT_INTERESTED"]).nullable(), nextContactAt: z.string().datetime().nullable() }).strict();
export async function consultationWorkspaceRoutes(app: FastifyInstance) {
  app.get("/api/admin/consultation-workspace", async (request, reply) => {
    if (!await allow(request, reply, "consultations.view")) return;
    const q = z.object({ due:z.enum(["","1"]).default(""), search: z.string().trim().max(190).default(""), status: z.enum(["ALL", "NEW", "RECEIVED", "CONTACTING", "CONSULTED", "COMPLETED", "UNREACHABLE", "CANCELLED"]).default("ALL"), page: z.coerce.number().int().min(1).max(100000).default(1), pageSize: z.coerce.number().int().min(1).max(100).default(25), assigned: z.string().max(100).default("") }).parse(request.query);
    const dueRows=q.due?await prisma.siteContent.findMany({where:{section:"cms-consultation-followup",value:{path:["nextContactAt"],lte:new Date().toISOString(),not:Prisma.JsonNull}},select:{page:true}}):null;
    const where: Prisma.ConsultationWhereInput = { ...(dueRows?{id:{in:dueRows.map(row=>row.page)},AND:[{status:{notIn:["CANCELLED","COMPLETED"]}}]}:{}), ...(q.status !== "ALL" ? { status: q.status } : {}), ...(q.assigned ? { assignedAdminId: q.assigned === "unassigned" ? null : q.assigned } : {}), ...(q.search ? { OR: ["fullName", "email", "phone", "programme"].map(key => ({ [key]: { contains: q.search, mode: "insensitive" } })) } : {}) };
    const [consultations, total] = await prisma.$transaction([prisma.consultation.findMany({ where, include: { assignedAdmin: { select: { id: true, fullName: true } } }, orderBy: [{ createdAt: "desc" }, { id: "asc" }], skip: (q.page - 1) * q.pageSize, take: q.pageSize }), prisma.consultation.count({ where })], { isolationLevel: "RepeatableRead" });
    reply.header("Cache-Control", "private, no-store");
    return ok(reply, { consultations, total, page: q.page, pageSize: q.pageSize });
  });
  app.get("/api/admin/consultation-workspace/assignees", async (request, reply) => {
    if (!await allow(request, reply, "consultations.assign")) return;
    const admins = await prisma.admin.findMany({ where: { status: "ACTIVE", OR: [{ role: { code: "SUPER_ADMIN" } }, { role: { permissions: { some: { permission: { code: "consultations.view" } } } } }] }, select: { id: true, fullName: true }, orderBy: { fullName: "asc" } });
    return ok(reply, { admins });
  });
  app.get("/api/admin/consultation-workspace/:id", async (request, reply) => {
    if (!await allow(request, reply, "consultations.view")) return;
    const { id } = identity.parse(request.params);
    const consultation = await prisma.consultation.findUnique({ where: { id }, include: { assignedAdmin: { select: { id: true, fullName: true } }, notes: { include: { admin: { select: { fullName: true } } }, orderBy: { createdAt: "desc" } }, history: { include: { admin: { select: { fullName: true } } }, orderBy: { createdAt: "desc" } } } });
    if (!consultation) return fail(reply, 404, "Không tìm thấy yêu cầu tư vấn.", "NOT_FOUND");
    reply.header("Cache-Control", "private, no-store");
    const followUp = await prisma.siteContent.findUnique({ where: { key: `cms.consultation.followup.${id}` } });
    return ok(reply, { consultation: { ...consultation, followUp: followUp?.value ?? { outcome: null, nextContactAt: null } } });
  });
  app.put("/api/admin/consultation-workspace/:id", async (request, reply) => {
    const user = await allow(request, reply, "consultations.update"); if (!user) return;
    const { id } = identity.parse(request.params);
    const body = z.object({ revision: z.string().datetime(), status: z.enum(["NEW", "RECEIVED", "CONTACTING", "CONSULTED", "COMPLETED", "UNREACHABLE", "CANCELLED"]), assignedAdminId: z.string().max(100).nullable().optional(), note: z.string().trim().max(5000).default(""), followUp: followUpSchema.optional() }).strict().parse(request.body);
    try {
      await prisma.$transaction(async tx => {
        const current = await tx.consultation.findUnique({ where: { id } });
        if (!current) throw Error("NOT_FOUND");
        if (current.updatedAt.toISOString() !== body.revision) throw Error("CONFLICT");
        const assigning = body.assignedAdminId !== undefined && body.assignedAdminId !== current.assignedAdminId;
        if (assigning && user.role.code !== "SUPER_ADMIN" && !user.permissions.includes("consultations.assign")) throw Error("FORBIDDEN");
        if (assigning && body.assignedAdminId) {
          const assignee = await tx.admin.findFirst({ where: { id: body.assignedAdminId, status: "ACTIVE", OR: [{ role: { code: "SUPER_ADMIN" } }, { role: { permissions: { some: { permission: { code: "consultations.view" } } } } }] } });
          if (!assignee) throw Error("INVALID_ASSIGNEE");
        }
        if (body.followUp) {
          const key = `cms.consultation.followup.${id}`;
          const data = { section: "cms-consultation-followup", page: id, locale: "vi", title: "Lịch liên hệ tư vấn", published: false, authorId: user.id, value: body.followUp };
          await tx.siteContent.upsert({ where: { key }, create: { key, ...data }, update: data });
          await tx.consultationHistory.create({ data: { consultationId: id, adminId: user.id, action: "followup_updated", metadata: body.followUp } });
        }
        await tx.consultation.update({ where: { id }, data: { status: body.status, ...(assigning ? { assignedAdminId: body.assignedAdminId } : {}), updatedAt: new Date(), ...(body.note ? { notes: { create: { adminId: user.id, content: body.note } } } : {}), history: { create: { action: "workspace_updated", adminId: user.id, oldStatus: current.status, newStatus: body.status, metadata: { oldAssignee: current.assignedAdminId, newAssignee: assigning ? body.assignedAdminId : current.assignedAdminId, noteAdded: !!body.note } } } } });
        await tx.auditLog.create({ data: { action: "CONSULTATION_UPDATED", actorAdminId: user.id, targetType: "consultation", targetId: id, metadata: { operation: "CMS_CONSULTATION_UPDATE", status: body.status, assignmentChanged: assigning, noteAdded: !!body.note } } });
      }, { isolationLevel: "Serializable" });
      return ok(reply, {}, "Đã lưu xử lý tư vấn.");
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      if (code === "NOT_FOUND") return fail(reply, 404, "Không tìm thấy yêu cầu tư vấn.", code);
      if (code === "FORBIDDEN") return fail(reply, 403, "Bạn không có quyền phân công.", code);
      if (code === "INVALID_ASSIGNEE") return fail(reply, 400, "Người phụ trách phải đang hoạt động và có quyền xem tư vấn.", code);
      if (code === "CONFLICT" || (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034")) return fail(reply, 409, "Hồ sơ đã được cập nhật ở phiên khác. Sao chép ghi chú rồi tải lại.", "CONFLICT");
      throw error;
    }
  });
}
