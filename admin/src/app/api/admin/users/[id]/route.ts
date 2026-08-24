import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requirePermission } from "@/lib/auth/authorization";
import { isTrustedMutation, requestContext } from "@/lib/auth/request";
import { errorResponse, validationMessage } from "@/lib/auth/responses";
import { updateAdminSchema } from "@/lib/auth/schemas";

type Context = { params: Promise<{ id: string }> };
const select = { id: true, username: true, fullName: true, email: true, phone: true, status: true, mustChangePassword: true, lastLoginAt: true, createdAt: true, updatedAt: true, role: { select: { code: true, name: true, level: true } } } as const;

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
  try { input = updateAdminSchema.parse(await request.json()); }
  catch (error) { return errorResponse(error instanceof Error && "issues" in error ? validationMessage(error as never) : "Dữ liệu không hợp lệ.", 400); }
  const id = (await params).id;
  const exists = await prisma.admin.findUnique({ where: { id } });
  if (!exists) return errorResponse("Không tìm thấy tài khoản.", 404);
  const admin = await prisma.admin.update({
    where: { id },
    data: { ...input, email: input.email || null, phone: input.phone || null },
    select,
  });
  await writeAudit({ action: "ACCOUNT_UPDATED", actorAdminId: auth.admin.id, targetAdminId: id, username: admin.username, ...requestContext(request) });
  return NextResponse.json({ admin });
}

