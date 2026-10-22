import { redirect } from "next/navigation";
import { getCurrentAdmin } from "./session";
import type { AdminPermission } from "./constants";

export async function requireAdmin(options?: { allowMustChangePassword?: boolean }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  if (admin.mustChangePassword && !options?.allowMustChangePassword) redirect("/admin/change-password");
  return admin;
}

export async function requirePermission(permission: AdminPermission) {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false as const, status: 401, message: "Bạn chưa đăng nhập." };
  if (admin.mustChangePassword)
    return { ok: false as const, status: 403, message: "Bạn phải đổi mật khẩu trước khi tiếp tục." };
  if (!admin.permissionCodes.includes(permission))
    return { ok: false as const, status: 403, message: "Bạn không có quyền thực hiện thao tác này." };
  return { ok: true as const, admin };
}

