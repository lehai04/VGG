import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { authenticateRequest, hashSessionToken, login, SESSION_COOKIE } from "./auth.service.js";
import { prisma } from "../../shared/database/prisma.js";
import { fail, ok } from "../../shared/http/response.js";

const loginSchema = z.object({ username: z.string().trim().min(3).max(50).regex(/^[a-zA-Z0-9._-]+$/).transform((value) => value.toLowerCase()), password: z.string().min(1).max(128), remember: z.boolean().default(false) });

export async function authRoutes(app: FastifyInstance) {
  app.post("/api/admin/auth/login", { config: { rateLimit: { max: 20, timeWindow: "15 minutes" } } }, async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) return fail(reply, 400, "Dữ liệu đăng nhập không hợp lệ.", "VALIDATION_ERROR");
    const result = await login(parsed.data.username, parsed.data.password, parsed.data.remember, { ipAddress: request.ip, userAgent: request.headers["user-agent"]?.slice(0, 500) || null });
    if (!result.ok) return fail(reply, result.status, result.error, "AUTH_FAILED");
    reply.setCookie(SESSION_COOKIE, result.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", expires: result.expiresAt });
    return ok(reply, { admin: { id: result.admin.id, username: result.admin.username, fullName: result.admin.fullName, role: result.admin.role.name }, redirectTo: result.admin.mustChangePassword ? "/admin/change-password" : "/admin/dashboard" });
  });

  app.get("/api/admin/auth/me", async (request, reply) => {
    const admin = await authenticateRequest(request);
    if (!admin) return fail(reply, 401, "Bạn chưa đăng nhập.", "UNAUTHENTICATED");
    return ok(reply, { id: admin.id, username: admin.username, fullName: admin.fullName, email: admin.email, phone: admin.phone, mustChangePassword: admin.mustChangePassword, role: { code: admin.role.code, name: admin.role.name }, permissions: admin.permissions });
  });

  app.post("/api/admin/auth/logout", async (request, reply) => {
    const token = request.cookies[SESSION_COOKIE];
    if (token) await prisma.session.deleteMany({ where: { tokenHash: hashSessionToken(token) } });
    reply.clearCookie(SESSION_COOKIE, { path: "/" });
    return ok(reply, null, "Đã đăng xuất.");
  });
}
