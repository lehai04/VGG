import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requestContext, isTrustedMutation } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { updateProfileSchema } from "@/lib/auth/schemas";
import { getCurrentAdmin } from "@/lib/auth/session";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return errorResponse("Bạn chưa đăng nhập.", 401);
  return NextResponse.json({
    id: admin.id,
    username: admin.username,
    fullName: admin.fullName,
    email: admin.email,
    phone: admin.phone,
    status: admin.status,
    mustChangePassword: admin.mustChangePassword,
    role: { code: admin.role.code, name: admin.role.name },
    permissions: admin.permissionCodes,
  });
}

export async function PATCH(request: NextRequest) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const current = await getCurrentAdmin();
  if (!current) return errorResponse("Bạn chưa đăng nhập.", 401);

  let input;
  try {
    input = updateProfileSchema.parse(await request.json());
  } catch (error) {
    return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400);
  }

  // Check username collision if changed
  if (input.username !== current.username) {
    const existingUsername = await prisma.admin.findUnique({ where: { username: input.username } });
    if (existingUsername && existingUsername.id !== current.id) {
      return errorResponse("Tên đăng nhập này đã được sử dụng bởi tài khoản khác.", 409);
    }
  }

  // Check email collision if changed
  const normalizedEmail = input.email ? input.email.trim().toLowerCase() : null;
  if (normalizedEmail && normalizedEmail !== current.email?.toLowerCase()) {
    const existingEmail = await prisma.admin.findFirst({
      where: {
        email: { equals: normalizedEmail, mode: "insensitive" },
        id: { not: current.id },
      },
    });
    if (existingEmail) {
      return errorResponse("Email này đã được sử dụng bởi tài khoản khác.", 409);
    }
  }

  const updatedAdmin = await prisma.admin.update({
    where: { id: current.id },
    data: {
      fullName: input.fullName,
      username: input.username,
      email: normalizedEmail,
      phone: input.phone?.trim() || null,
    },
    include: { role: true },
  });

  await writeAudit({
    action: "ACCOUNT_UPDATED",
    actorAdminId: current.id,
    targetAdminId: current.id,
    username: updatedAdmin.username,
    ...requestContext(request),
    metadata: {
      fieldUpdates: "self_profile_update",
      fullName: updatedAdmin.fullName,
      username: updatedAdmin.username,
      email: updatedAdmin.email,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Cập nhật thông tin tài khoản thành công.",
    admin: {
      id: updatedAdmin.id,
      username: updatedAdmin.username,
      fullName: updatedAdmin.fullName,
      email: updatedAdmin.email,
      phone: updatedAdmin.phone,
      role: updatedAdmin.role.name,
    },
  });
}
