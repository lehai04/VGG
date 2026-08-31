import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { LOCK_MINUTES, MAX_FAILED_LOGINS } from "@/lib/auth/constants";
import { allowLoginAttempt, clearLoginAttempts } from "@/lib/auth/login-rate-limit";
import { verifyPassword } from "@/lib/auth/password";
import { requestContext, isTrustedMutation } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { loginSchema } from "@/lib/auth/schemas";
import { createSession, setSessionCookie } from "@/lib/auth/session";

const INVALID_LOGIN = "Tên đăng nhập hoặc mật khẩu không chính xác.";
const DUMMY_HASH = "$argon2id$v=19$m=65536,p=1,t=3$giqhPpGNqlt2LNmSrq0T2g$wIq3lTgIiLYDrmGc57Y3bleoCgm6oGq8NUkXT2dJTaE";

export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const context = requestContext(request);
  const ipKey = context.ipAddress || "unknown";
  if (!allowLoginAttempt(ipKey)) return errorResponse("Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.", 429);

  let input;
  try {
    input = loginSchema.parse(await request.json());
  } catch (error) {
    return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400);
  }

  const admin = await prisma.admin.findFirst({
    where: {
      OR: [
        { username: input.username },
        { email: { equals: input.username, mode: "insensitive" } },
      ],
    },
    include: { role: true },
  });
  const passwordMatches = await verifyPassword(admin?.passwordHash || DUMMY_HASH, input.password).catch(() => false);
  const now = new Date();

  if (admin?.lockedUntil && admin.lockedUntil > now) {
    await writeAudit({ action: "LOGIN_FAILED", targetAdminId: admin.id, username: input.username, ...context, metadata: { reason: "temporary_lock" } });
    return errorResponse("Tài khoản hiện đang tạm khóa. Vui lòng thử lại sau hoặc liên hệ quản trị viên.", 423);
  }
  if (!admin || !passwordMatches) {
    if (admin) {
      const failed = admin.failedLoginAttempts + 1;
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          failedLoginAttempts: failed >= MAX_FAILED_LOGINS ? 0 : failed,
          lockedUntil: failed >= MAX_FAILED_LOGINS ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000) : null,
        },
      });
    }
    await writeAudit({ action: "LOGIN_FAILED", targetAdminId: admin?.id, username: input.username, ...context, metadata: { reason: "invalid_credentials" } });
    return errorResponse(INVALID_LOGIN, 401);
  }
  if (admin.status !== "ACTIVE") {
    await writeAudit({ action: "LOGIN_FAILED", targetAdminId: admin.id, username: input.username, ...context, metadata: { reason: admin.status.toLowerCase() } });
    return errorResponse("Tài khoản hiện không hoạt động. Vui lòng liên hệ quản trị viên.", 403);
  }

  const session = await createSession(admin.id, input.remember, context);
  await prisma.admin.update({
    where: { id: admin.id },
    data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: now },
  });
  clearLoginAttempts(ipKey);
  await writeAudit({ action: "LOGIN_SUCCESS", actorAdminId: admin.id, targetAdminId: admin.id, username: admin.username, ...context });
  const response = NextResponse.json({
    admin: { id: admin.id, username: admin.username, fullName: admin.fullName, role: admin.role.name },
    redirectTo: admin.mustChangePassword ? "/admin/change-password" : "/admin/dashboard",
  });
  setSessionCookie(response, session.token, session.expiresAt);
  return response;
}

