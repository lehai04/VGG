import { errorResponse } from "@/lib/auth/responses";
import { getCurrentAdmin } from "@/lib/auth/session";
import { NextResponse } from "next/server";

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

