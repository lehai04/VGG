import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { requestContext, isTrustedMutation } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { resetPasswordWithTokenSchema } from "@/lib/auth/schemas";

export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const context = requestContext(request);

  let input;
  try {
    input = resetPasswordWithTokenSchema.parse(await request.json());
  } catch (error) {
    return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400);
  }

  const tokenHash = createHash("sha256").update(input.token).digest("hex");
  const now = new Date();

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { admin: true },
  });

  if (!resetToken || resetToken.usedAt !== null || resetToken.expiresAt <= now) {
    return errorResponse("Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng gửi lại yêu cầu.", 400);
  }

  if (resetToken.admin.status !== "ACTIVE") {
    return errorResponse("Tài khoản hiện đang bị khóa hoặc không hoạt động.", 403);
  }

  const passwordHash = await hashPassword(input.password);

  await prisma.$transaction([
    prisma.admin.update({
      where: { id: resetToken.adminId },
      data: {
        passwordHash,
        mustChangePassword: false,
        passwordChangedAt: now,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: now },
    }),
    prisma.session.deleteMany({
      where: { adminId: resetToken.adminId },
    }),
    prisma.auditLog.create({
      data: {
        action: "PASSWORD_RESET",
        actorAdminId: resetToken.adminId,
        targetAdminId: resetToken.adminId,
        username: resetToken.admin.username,
        ...context,
        metadata: { requestType: "forgot_password_completed" },
      },
    }),
  ]);

  return NextResponse.json({
    success: true,
    message: "Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập ngay bằng mật khẩu mới.",
  });
}
