import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "node:crypto";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requestContext, isTrustedMutation } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { forgotPasswordSchema } from "@/lib/auth/schemas";
import { allowForgotPasswordAttempt } from "@/lib/auth/login-rate-limit";
import { sendPasswordResetEmail } from "@/lib/auth/email";

export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const context = requestContext(request);

  let input;
  try {
    input = forgotPasswordSchema.parse(await request.json());
  } catch (error) {
    return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Email không hợp lệ.", 400);
  }

  const rateLimitKey = `${context.ipAddress || "unknown"}:${input.email.toLowerCase()}`;
  if (!allowForgotPasswordAttempt(rateLimitKey)) {
    return errorResponse("Quá nhiều yêu cầu khôi phục mật khẩu. Vui lòng thử lại sau 15 phút.", 429);
  }

  const admin = await prisma.admin.findFirst({
    where: {
      email: { equals: input.email, mode: "insensitive" },
      status: "ACTIVE",
    },
  });

  if (admin && admin.email) {
    const token = randomBytes(32).toString("base64url");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.passwordResetToken.deleteMany({
      where: { adminId: admin.id, usedAt: null },
    });

    await prisma.passwordResetToken.create({
      data: {
        tokenHash,
        adminId: admin.id,
        expiresAt,
      },
    });

    await writeAudit({
      action: "PASSWORD_RESET",
      actorAdminId: admin.id,
      targetAdminId: admin.id,
      username: admin.username,
      ...context,
      metadata: { requestType: "forgot_password_requested" },
    });

    const origin = request.nextUrl.origin;
    const resetUrl = `${origin}/admin/reset-password?token=${encodeURIComponent(token)}`;

    // Gửi email đặt lại mật khẩu trong background nếu SMTP được cấu hình
    void sendPasswordResetEmail({
      to: admin.email,
      adminName: admin.fullName || admin.username,
      resetUrl,
    });
  }

  // Luôn trả về phản hồi generic an toàn, TUYỆT ĐỐI không trả token hay resetUrl về trình duyệt
  return NextResponse.json({
    success: true,
    message: "Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.",
  });
}
