import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requirePermission } from "@/lib/auth/authorization";
import { ROLE_CODES } from "@/lib/auth/constants";
import { isLastActiveSuperAdmin } from "@/lib/auth/roles";
import { isTrustedMutation, requestContext } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { updateRoleSchema } from "@/lib/auth/schemas";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const auth = await requirePermission("admins.change_role");
  if (!auth.ok) return errorResponse(auth.message, auth.status);
  let input;
  try { input = updateRoleSchema.parse(await request.json()); }
  catch (error) { return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400); }
  const id = (await params).id;
  const target = await prisma.admin.findUnique({ where: { id }, include: { role: true } });
  if (!target) return errorResponse("Không tìm thấy tài khoản.", 404);
  if (target.role.code === ROLE_CODES.SUPER_ADMIN && input.roleCode !== ROLE_CODES.SUPER_ADMIN && await isLastActiveSuperAdmin(id))
    return errorResponse("Không thể hạ quyền Super Admin hoạt động cuối cùng.", 409);
  const role = await prisma.role.findUnique({ where: { code: input.roleCode } });
  if (!role) return errorResponse("Vai trò không hợp lệ.", 400);
  await prisma.$transaction([
    prisma.admin.update({ where: { id }, data: { roleId: role.id } }),
    prisma.session.deleteMany({ where: { adminId: id } }),
  ]);
  await writeAudit({ action: "ROLE_CHANGED", actorAdminId: auth.admin.id, targetAdminId: id, username: target.username, ...requestContext(request), metadata: { from: target.role.code, to: role.code } });
  return NextResponse.json({ message: "Đã cập nhật vai trò và thu hồi các phiên đăng nhập cũ." });
}

