import { createHash, randomBytes } from "node:crypto";
import argon2 from "argon2";
import type { FastifyRequest } from "fastify";
import { prisma } from "../../shared/database/prisma.js";

export const SESSION_COOKIE = "vgg_admin_session";
const DUMMY_HASH = "$argon2id$v=19$m=65536,p=1,t=3$giqhPpGNqlt2LNmSrq0T2g$wIq3lTgIiLYDrmGc57Y3bleoCgm6oGq8NUkXT2dJTaE";
export const passwordOptions = { type: argon2.argon2id, memoryCost: 65536, timeCost: 3, parallelism: 1 } as const;

export const hashSessionToken = (token: string) => createHash("sha256").update(token).digest("hex");
export const hashPassword = (password: string) => argon2.hash(password, passwordOptions);
export const verifyPassword = (hash: string, password: string) => argon2.verify(hash, password);

type LoginResult =
  | { ok: false; error: string; status: number }
  | { ok: true; admin: { id: string; username: string; fullName: string; mustChangePassword: boolean; role: { name: string } }; token: string; expiresAt: Date };

export async function authenticateRequest(request: FastifyRequest) {
  const token = request.cookies[SESSION_COOKIE];
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: { admin: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
  });
  if (!session || session.expiresAt <= new Date() || session.admin.status !== "ACTIVE") return null;
  return { ...session.admin, sessionId: session.id, permissions: session.admin.role.permissions.map((item) => item.permission.code) };
}

export async function login(username: string, password: string, remember: boolean, context: { ipAddress: string | null; userAgent: string | null }): Promise<LoginResult> {
  const admin = await prisma.admin.findUnique({ where: { username }, include: { role: true } });
  const valid = await verifyPassword(admin?.passwordHash || DUMMY_HASH, password).catch(() => false);
  const now = new Date();
  if (admin?.lockedUntil && admin.lockedUntil > now) return { ok: false, error: "Tài khoản hiện đang tạm khóa.", status: 423 };
  if (!admin || !valid) {
    if (admin) {
      const failures = admin.failedLoginAttempts + 1;
      await prisma.admin.update({ where: { id: admin.id }, data: { failedLoginAttempts: failures >= 5 ? 0 : failures, lockedUntil: failures >= 5 ? new Date(Date.now() + 15 * 60_000) : null } });
    }
    await prisma.auditLog.create({ data: { action: "LOGIN_FAILED", targetAdminId: admin?.id, username, ...context } }).catch(() => undefined);
    return { ok: false, error: "Tên đăng nhập hoặc mật khẩu không chính xác.", status: 401 };
  }
  if (admin.status !== "ACTIVE") return { ok: false, error: "Tài khoản hiện không hoạt động.", status: 403 };
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + (remember ? 30 : 1) * 86_400_000);
  await prisma.$transaction([
    prisma.session.create({ data: { tokenHash: hashSessionToken(token), adminId: admin.id, expiresAt, ...context } }),
    prisma.admin.update({ where: { id: admin.id }, data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: now } }),
    prisma.auditLog.create({ data: { action: "LOGIN_SUCCESS", actorAdminId: admin.id, targetAdminId: admin.id, username, ...context } }),
  ]);
  return { ok: true, admin, token, expiresAt };
}
