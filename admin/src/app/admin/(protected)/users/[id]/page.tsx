import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/authorization";
import { prisma } from "@/lib/db";
import { AdminUserActions } from "@/components/users/AdminUserActions";

export const metadata = { title: "Chi tiết quản trị viên" };
export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const current = await requireAdmin();
  if (!current.permissionCodes.includes("admins.view")) redirect("/admin/dashboard");
  const admin = await prisma.admin.findUnique({ where: { id: (await params).id }, include: { role: true } });
  if (!admin) notFound();
  return <div className="admin-page"><header className="admin-page__head"><div><span className="eyebrow">ADMIN USER / {admin.username}</span><h1>{admin.fullName}</h1></div></header><section className="admin-card"><p><strong>Email:</strong> {admin.email || "Chưa cập nhật"}</p><p><strong>Số điện thoại:</strong> {admin.phone || "Chưa cập nhật"}</p><p><strong>Vai trò:</strong> {admin.role.name}</p><AdminUserActions id={admin.id} status={admin.status} roleCode={admin.role.code} /></section></div>;
}
