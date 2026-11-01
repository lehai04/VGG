import { staffFor, sessionToken } from "./access.js";
import { restoredCmsRoutes } from "../cms/cms.routes.js";
import type { FastifyInstance, FastifyRequest } from "fastify";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { ConsultationStatus, type Prisma } from "@prisma/client";
import { prisma } from "../../shared/database/prisma.js";
import { env } from "../../config/environment.js";
import { fail, ok } from "../../shared/http/response.js";
import { dummyPasswordHash, tokenHash, verifyPassword } from "./password.js";

const prefix = "/api/admin";
const cookieName = "vgg_consultation_session";
const ttl = 8 * 60 * 60;
function cookie(token: string, age = ttl) {
  return `${cookieName}=${token}; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=${age}${env.NODE_ENV === "production" ? "; Secure" : ""}`;
}
const identity = (staff: {
  id: string;
  email: string;
  fullName: string;
  canUpdate: boolean;
  canManageContent: boolean;
}) => ({
  id: staff.id,
  email: staff.email,
  fullName: staff.fullName,
  canUpdate: staff.canUpdate,
  canManageContent: staff.canManageContent,
});
const paramsSchema = z.object({ id: z.string().min(1).max(100) });

export async function consultationAdminRoutes(app: FastifyInstance) {
  const checkLoginIp = app.createRateLimit({ max: 20, timeWindow: "15 minutes" });
  // Search terms contain personal data. Do not log routine admin request URLs.
  app.addHook("onRoute", (options) => {
    options.logLevel = "warn";
  });
  app.addHook("onRequest", async (request, reply) => {
    reply
      .header("Cache-Control", "no-store, private")
      .header("X-Robots-Tag", "noindex, nofollow");
    if (!["GET", "HEAD"].includes(request.method)) {
      // Exact configured origin, including login: protects against login CSRF too.
      if (
        request.headers.origin !== new URL(env.CMS_APP_URL).origin ||
        request.headers["x-vgg-admin"] !== "1"
      ) {
        return fail(reply, 403, "Nguồn yêu cầu không hợp lệ.", "CSRF_FAILED");
      }
    }
  });
  app.post(
    `${prefix}/login`,
    {
      bodyLimit: 16384,
      // Separate IP quota stops account rotation before parsing/password hashing.
      onRequest: async (request, reply) => {
        // Manual limiter does not suppress the independent per-account hook.
        const limit = await checkLoginIp(request);
        if (!limit.isAllowed && limit.isExceeded) {
          reply.header("Retry-After", limit.ttlInSeconds);
          return fail(reply, 429, "Thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.", "LOGIN_RATE_LIMITED");
        }
      },
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "15 minutes",
          hook: "preHandler",
          keyGenerator: (request: FastifyRequest) => {
            const email = (request.body as { email?: unknown } | null)?.email;
            return `consultation-login:${tokenHash(typeof email === "string" ? email.trim().toLowerCase() : request.ip)}`;
          },
        },
      },
    },
    async (request, reply) => {
      const input = z
        .object({
          email: z
            .email()
            .max(190)
            .transform((v) => v.toLowerCase()),
          password: z.string().min(1).max(256),
        })
        .strict()
        .parse(request.body);
      const staff = await prisma.consultationStaff.findUnique({
        where: { email: input.email },
      });
      const valid = await verifyPassword(
        input.password,
        staff?.passwordHash ?? dummyPasswordHash,
      );
      if (!staff || !valid || staff.disabled)
        return fail(
          reply,
          401,
          "Email hoặc mật khẩu không đúng.",
          "INVALID_CREDENTIALS",
        );
      const token = randomBytes(32).toString("hex");
      const previous = sessionToken(request);
      await prisma.$transaction(async (tx) => {
        await tx.consultationSession.deleteMany({
          where: {
            OR: [
              { expiresAt: { lte: new Date() } },
              ...(previous ? [{ tokenHash: tokenHash(previous) }] : []),
            ],
          },
        });
        await tx.consultationSession.create({
          data: {
            tokenHash: tokenHash(token),
            staffId: staff.id,
            expiresAt: new Date(Date.now() + ttl * 1000),
          },
        });
      });
      reply.header("Set-Cookie", cookie(token));
      return ok(reply, { user: identity(staff) });
    },
  );
  app.post(`${prefix}/logout`, async (request, reply) => {
    const token = sessionToken(request);
    if (token)
      await prisma.consultationSession.deleteMany({
        where: { tokenHash: tokenHash(token) },
      });
    reply.header("Set-Cookie", cookie("", 0));
    return ok(reply, {});
  });
  app.get(`${prefix}/me`, async (request, reply) => {
    const staff = await staffFor(request);
    return staff
      ? ok(reply, { user: identity(staff) })
      : fail(reply, 401, "Vui lòng đăng nhập.", "UNAUTHENTICATED");
  });
  app.get(`${prefix}/consultations`, async (request, reply) => {
    if (!(await staffFor(request)))
      return fail(reply, 401, "Vui lòng đăng nhập.", "UNAUTHENTICATED");
    const query = z
      .object({
        q: z.string().trim().max(120).default(""),
        status: z.enum(ConsultationStatus).optional(),
        page: z.coerce.number().int().min(1).max(100000).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
      })
      .parse(request.query);
    const where: Prisma.ConsultationWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.q
        ? {
            OR: ["fullName", "email", "phone", "programme"].map((field) => ({
              [field]: { contains: query.q, mode: "insensitive" },
            })),
          }
        : {}),
    };
    const [items, total, newCount] = await prisma.$transaction([
      prisma.consultation.findMany({
        where,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          programme: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.consultation.count({ where }),
      prisma.consultation.count({ where: { status: "NEW" } }),
    ]);
    return ok(reply, {
      items,
      total,
      newCount,
      page: query.page,
      totalPages: Math.ceil(total / query.limit),
    });
  });
  app.get(`${prefix}/consultations/:id`, async (request, reply) => {
    if (!(await staffFor(request)))
      return fail(reply, 401, "Vui lòng đăng nhập.", "UNAUTHENTICATED");
    const { id } = paramsSchema.parse(request.params);
    const item = await prisma.consultation.findUnique({
      where: { id },
      include: { history: { orderBy: { createdAt: "desc" }, take: 100 } },
    });
    return item
      ? ok(reply, { item })
      : fail(reply, 404, "Không tìm thấy yêu cầu.", "NOT_FOUND");
  });
  app.patch(`${prefix}/consultations/:id`, async (request, reply) => {
    const staff = await staffFor(request);
    if (!staff)
      return fail(reply, 401, "Vui lòng đăng nhập.", "UNAUTHENTICATED");
    if (!staff.canUpdate)
      return fail(reply, 403, "Tài khoản chỉ có quyền xem.", "FORBIDDEN");
    const { id } = paramsSchema.parse(request.params);
    const input = z
      .object({
        status: z.enum(ConsultationStatus),
        expectedUpdatedAt: z.iso.datetime(),
        note: z.string().trim().max(2000).default(""),
      })
      .strict()
      .parse(request.body);
    const result = await prisma.$transaction(async (tx) => {
      const current = await tx.consultation.findUnique({ where: { id } });
      if (!current) return "missing" as const;
      const updated = await tx.consultation.updateMany({
        where: { id, updatedAt: new Date(input.expectedUpdatedAt) },
        data: {
          status: input.status,
          updatedAt: new Date(
            Math.max(Date.now(), current.updatedAt.getTime() + 1),
          ),
        },
      });
      if (!updated.count) return "conflict" as const;
      await tx.consultationHistory.create({
        data: {
          consultationId: id,
          action: "staff_updated",
          oldStatus: current.status,
          newStatus: input.status,
          metadata: {
            actorId: staff.id,
            actorName: staff.fullName,
            note: input.note,
          },
        },
      });
      return "saved" as const;
    });
    if (result === "missing")
      return fail(reply, 404, "Không tìm thấy yêu cầu.", "NOT_FOUND");
    if (result === "conflict")
      return fail(
        reply,
        409,
        "Yêu cầu đã được người khác cập nhật. Hãy tải lại chi tiết trước khi lưu.",
        "VERSION_CONFLICT",
      );
    return ok(reply, {}, "Đã cập nhật yêu cầu tư vấn.");
  });
  await app.register(restoredCmsRoutes);
}
