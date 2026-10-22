import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requirePermission } from "@/lib/auth/authorization";
import { hashPassword } from "@/lib/auth/password";
import { requestContext, isTrustedMutation } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { createAdminSchema } from "@/lib/auth/schemas";

const adminSelect = {
  id: true, username: true, fullName: true, email: true, phone: true, status: true,
  mustChangePassword: true, failedLoginAttempts: true, lockedUntil: true, lastLoginAt: true,
  passwordChangedAt: true, createdAt: true, updatedAt: true,
  role: { select: { code: true, name: true, level: true } },
} as const;

export async function GET() {
  const auth = await requirePermission("admins.view");
  if (!auth.ok) return errorResponse(auth.message, auth.status);
  const admins = await prisma.admin.findMany({ select: adminSelect, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ admins });
}

export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const auth = await requirePermission("admins.create");
  if (!auth.ok) return errorResponse(auth.message, auth.status);
  let input;
  try {
    input = createAdminSchema.parse(await request.json());
  } catch (error) {
    return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400);
  }
  const role = await prisma.role.findUnique({ where: { code: input.roleCode } });
  if (!role) return errorResponse("Vai trò không hợp lệ.", 400);
  const exists = await prisma.admin.findUnique({ where: { username: input.username } });
  if (exists) return errorResponse("Tên đăng nhập đã tồn tại.", 409);

  const admin = await prisma.admin.create({
    data: {
      username: input.username,
      passwordHash: await hashPassword(input.password),
      fullName: input.fullName,
      email: input.email || null,
      phone: input.phone || null,
      roleId: role.id,
      status: input.status,
      mustChangePassword: input.mustChangePassword,
      createdById: auth.admin.id,
    },
    select: adminSelect,
  });
  await writeAudit({ action: "ACCOUNT_CREATED", actorAdminId: auth.admin.id, targetAdminId: admin.id, username: admin.username, ...requestContext(request), metadata: { role: role.code } });
  return NextResponse.json({ admin }, { status: 201 });
}

