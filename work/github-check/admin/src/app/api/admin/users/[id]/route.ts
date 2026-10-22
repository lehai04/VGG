import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requirePermission } from "@/lib/auth/authorization";
import { isTrustedMutation, requestContext } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { updateAdminSchema } from "@/lib/auth/schemas";

type Context = { params: Promise<{ id: string }> };

const select = {
  id: true,
  username: true,
  fullName: true,
  email: true,
  phone: true,
  status: true,
  mustChangePassword: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
  role: {
    select: {
      id: true,
      code: true,
      name: true,
      level: true,
      permissions: {
        select: {
          permission: {
            select: { code: true, description: true },
          },
        },
      },
    },
  },
} as const;

export async function GET(_request: NextRequest, { params }: Context) {
  const auth = await requirePermission("admins.view");
  if (!auth.ok) return errorResponse(auth.message, auth.status);
  const admin = await prisma.admin.findUnique({ where: { id: (await params).id }, select });
  return admin ? NextResponse.json({ admin }) : errorResponse("Không tìm thấy tài khoản.", 404);
}

export async function PATCH(request: NextRequest, { params }: Context) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const auth = await requirePermission("admins.update");
  if (!auth.ok) return errorResponse(auth.message, auth.status);

  let input;
  try {
    input = updateAdminSchema.parse(await request.json());
  } catch (error) {
    return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400);
  }

  const id = (await params).id;
  const existing = await prisma.admin.findUnique({
    where: { id },
    include: { role: true },
  });

  if (!existing) return errorResponse("Không tìm thấy tài khoản.", 404);

  // Check username collision
  if (input.username && input.username !== existing.username) {
    const userCollision = await prisma.admin.findUnique({ where: { username: input.username } });
    if (userCollision && userCollision.id !== id) {
      return errorResponse("Tên đăng nhập đã được sử dụng bởi tài khoản khác.", 409);
    }
  }

  // Check email collision
  const normalizedEmail = input.email !== undefined ? (input.email ? input.email.trim().toLowerCase() : null) : undefined;
  if (normalizedEmail && normalizedEmail !== existing.email?.toLowerCase()) {
    const emailCollision = await prisma.admin.findFirst({
      where: {
        email: { equals: normalizedEmail, mode: "insensitive" },
        id: { not: id },
      },
    });
    if (emailCollision) {
      return errorResponse("Email đã được sử dụng bởi tài khoản khác.", 409);
    }
  }

  let newRoleId: string | undefined;
  if (input.roleCode && input.roleCode !== existing.role.code) {
    if (!auth.admin.permissionCodes.includes("admins.change_role") && auth.admin.role.level !== 1) {
      return errorResponse("Bạn không có quyền thay đổi phân quyền nhân sự.", 403);
    }
    const roleRecord = await prisma.role.findUnique({ where: { code: input.roleCode } });
    if (!roleRecord) return errorResponse("Vai trò phân quyền không tồn tại.", 400);
    newRoleId = roleRecord.id;
  }

  const admin = await prisma.admin.update({
    where: { id },
    data: {
      fullName: input.fullName,
      username: input.username,
      email: normalizedEmail,
      phone: input.phone !== undefined ? (input.phone ? input.phone.trim() : null) : undefined,
      roleId: newRoleId,
    },
    select,
  });

  await writeAudit({
    action: "ACCOUNT_UPDATED",
    actorAdminId: auth.admin.id,
    targetAdminId: id,
    username: admin.username,
    ...requestContext(request),
    metadata: {
      fullName: admin.fullName,
      username: admin.username,
      email: admin.email,
      role: admin.role.name,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Cập nhật thông tin nhân sự thành công.",
    admin,
  });
}

export async function DELETE(request: NextRequest, { params }: Context) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const auth = await requirePermission("admins.delete");
  if (!auth.ok) return errorResponse(auth.message, auth.status);

  const id = (await params).id;

  // Prevent self-deletion
  if (id === auth.admin.id) {
    return errorResponse("Bạn không thể tự xóa tài khoản của chính mình.", 400);
  }

  const targetAdmin = await prisma.admin.findUnique({
    where: { id },
    include: { role: true },
  });

  if (!targetAdmin) return errorResponse("Không tìm thấy tài khoản.", 404);

  // If target is Super Admin, ensure there's at least one other active Super Admin remaining
  if (targetAdmin.role.level === 1) {
    const superAdminCount = await prisma.admin.count({
      where: { role: { level: 1 }, status: "ACTIVE", id: { not: id } },
    });
    if (superAdminCount === 0) {
      return errorResponse("Không thể xóa Super Admin duy nhất còn lại trong hệ thống.", 400);
    }
  }

  // Delete target admin
  await prisma.$transaction([
    prisma.session.deleteMany({ where: { adminId: id } }),
    prisma.passwordResetToken.deleteMany({ where: { adminId: id } }),
    prisma.admin.delete({ where: { id } }),
  ]);

  await writeAudit({
    action: "ACCOUNT_DELETED",
    actorAdminId: auth.admin.id,
    targetAdminId: null,
    username: targetAdmin.username,
    ...requestContext(request),
    metadata: {
      deletedUsername: targetAdmin.username,
      deletedFullName: targetAdmin.fullName,
      deletedEmail: targetAdmin.email,
      deletedRole: targetAdmin.role.name,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Đã xóa tài khoản nhân sự thành công.",
  });
}
