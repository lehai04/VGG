import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { isTrustedMutation, requestContext } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { changePasswordSchema } from "@/lib/auth/schemas";
import { getCurrentAdmin } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const admin = await getCurrentAdmin();
  if (!admin) return errorResponse("Bạn chưa đăng nhập.", 401);
  let input;
  try {
    input = changePasswordSchema.parse(await request.json());
  } catch (error) {
    return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400);
  }
  if (!(await verifyPassword(admin.passwordHash, input.currentPassword)))
    return errorResponse("Mật khẩu hiện tại không chính xác.", 400);
  if (await verifyPassword(admin.passwordHash, input.newPassword))
    return errorResponse("Mật khẩu mới phải khác mật khẩu hiện tại.", 400);

  const passwordHash = await hashPassword(input.newPassword);
  await prisma.$transaction([
    prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash, mustChangePassword: false, passwordChangedAt: new Date() },
    }),
    prisma.session.deleteMany({ where: { adminId: admin.id, id: { not: admin.sessionId } } }),
  ]);
  await writeAudit({ action: "PASSWORD_CHANGED", actorAdminId: admin.id, targetAdminId: admin.id, username: admin.username, ...requestContext(request) });
  return NextResponse.json({ message: "Đổi mật khẩu thành công.", redirectTo: "/admin/dashboard" });
}

