import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requirePermission } from "@/lib/auth/authorization";
import { isLastActiveSuperAdmin } from "@/lib/auth/roles";
import { isTrustedMutation, requestContext } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { updateStatusSchema } from "@/lib/auth/schemas";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const auth = await requirePermission("admins.disable");
  if (!auth.ok) return errorResponse(auth.message, auth.status);
  let input;
  try { input = updateStatusSchema.parse(await request.json()); }
  catch (error) { return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400); }
  const id = (await params).id;
  const target = await prisma.admin.findUnique({ where: { id } });
  if (!target) return errorResponse("Không tìm thấy tài khoản.", 404);
  if (input.status !== "ACTIVE" && await isLastActiveSuperAdmin(id))
    return errorResponse("Hệ thống phải luôn có ít nhất một Super Admin hoạt động.", 409);

  await prisma.$transaction([
    prisma.admin.update({ where: { id }, data: { status: input.status, lockedUntil: null, failedLoginAttempts: 0 } }),
    ...(input.status === "INACTIVE" ? [prisma.session.deleteMany({ where: { adminId: id } })] : []),
  ]);
  await writeAudit({ action: input.status === "ACTIVE" ? "ACCOUNT_ENABLED" : "ACCOUNT_DISABLED", actorAdminId: auth.admin.id, targetAdminId: id, username: target.username, ...requestContext(request) });
  return NextResponse.json({ message: input.status === "ACTIVE" ? "Đã kích hoạt tài khoản." : "Đã vô hiệu hóa tài khoản." });
}

