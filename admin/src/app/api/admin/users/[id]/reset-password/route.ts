import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requirePermission } from "@/lib/auth/authorization";
import { hashPassword } from "@/lib/auth/password";
import { isTrustedMutation, requestContext } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { resetPasswordSchema } from "@/lib/auth/schemas";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const auth = await requirePermission("admins.reset_password");
  if (!auth.ok) return errorResponse(auth.message, auth.status);
  let input;
  try { input = resetPasswordSchema.parse(await request.json()); }
  catch (error) { return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400); }
  const id = (await params).id;
  const target = await prisma.admin.findUnique({ where: { id } });
  if (!target) return errorResponse("Không tìm thấy tài khoản.", 404);
  await prisma.$transaction([
    prisma.admin.update({ where: { id }, data: { passwordHash: await hashPassword(input.password), mustChangePassword: true, passwordChangedAt: new Date() } }),
    prisma.session.deleteMany({ where: { adminId: id } }),
  ]);
  await writeAudit({ action: "PASSWORD_RESET", actorAdminId: auth.admin.id, targetAdminId: id, username: target.username, ...requestContext(request) });
  return NextResponse.json({ message: "Đã đặt mật khẩu tạm thời và thu hồi toàn bộ phiên đăng nhập." });
}

