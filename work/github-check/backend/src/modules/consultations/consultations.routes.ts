import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { authenticateRequest } from "../auth/auth.service.js";
import { prisma } from "../../shared/database/prisma.js";
import { fail, ok } from "../../shared/http/response.js";

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

const adminStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTING", "COMPLETED"]),
});

export async function consultationRoutes(app: FastifyInstance) {
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
      return reply
        .code(201)
        .send({
          success: true,
          data: { id: consultation.id },
          message:
            "Cảm ơn bạn. Đội ngũ VGG sẽ liên hệ trong thời gian sớm nhất.",
        });
    },
  );

  app.get("/api/admin/consultations", async (request, reply) => {
    const admin = await authenticateRequest(request);
    if (!admin)
      return fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED");
    if (!admin.permissions.includes("consultations.view"))
      return fail(
        reply,
        403,
        "Bạn không có quyền xem lịch tư vấn.",
        "FORBIDDEN",
      );
    const consultations = await prisma.consultation.findMany({
      include: { assignedAdmin: { select: { id: true, fullName: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ok(reply, { consultations });
  });

  app.patch("/api/admin/consultations/:id/status", async (request, reply) => {
    const admin = await authenticateRequest(request);
    if (!admin)
      return fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED");
    if (!admin.permissions.includes("consultations.update"))
      return fail(
        reply,
        403,
        "Bạn không có quyền cập nhật lịch tư vấn.",
        "FORBIDDEN",
      );
    const { id } = z.object({ id: z.string().min(1) }).parse(request.params);
    const { status } = adminStatusSchema.parse(request.body);
    const current = await prisma.consultation.findUnique({
      where: { id },
      select: { status: true },
    });
    if (!current)
      return fail(
        reply,
        404,
        "Không tìm thấy yêu cầu tư vấn.",
        "CONSULTATION_NOT_FOUND",
      );
    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        status,
        history: {
          create: {
            action: "status_updated",
            oldStatus: current.status,
            newStatus: status,
            adminId: admin.id,
          },
        },
      },
    });
    await prisma.auditLog.create({
      data: {
        action: "CONSULTATION_UPDATED",
        actorAdminId: admin.id,
        targetType: "consultation",
        targetId: consultation.id,
        metadata: { oldStatus: current.status, newStatus: status },
      },
    });
    return ok(reply, { consultation }, "Đã cập nhật trạng thái tư vấn.");
  });
}
