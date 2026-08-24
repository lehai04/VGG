import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/authorization";
import { prisma } from "@/lib/db";

export const metadata = { title: "Quản trị viên" };
export default async function AdminUsersPage() {
  const current = await requireAdmin();
  if (!current.permissionCodes.includes("admins.view")) redirect("/admin/dashboard");
  const admins = await prisma.admin.findMany({ include: { role: true }, orderBy: { createdAt: "desc" } });
  return <div className="admin-page"><header className="admin-page__head"><div><span className="eyebrow">SECURITY / ADMIN USERS</span><h1>Quản trị viên</h1></div>{current.permissionCodes.includes("admins.create") && <Link className="admin-link-button" href="/admin/users/create">THÊM TÀI KHOẢN</Link>}</header><section className="admin-card admin-table-wrap"><table className="admin-table"><thead><tr><th>Tài khoản</th><th>Vai trò</th><th>Trạng thái</th><th>Lần đăng nhập cuối</th></tr></thead><tbody>{admins.map((admin) => <tr key={admin.id}><td><Link href={`/admin/users/${admin.id}`}><strong>{admin.fullName}</strong><small>{admin.username}</small></Link></td><td>{admin.role.name}</td><td><span className={`status-pill${admin.status === "ACTIVE" ? "" : " inactive"}`}>{admin.status === "ACTIVE" ? "Hoạt động" : admin.status === "LOCKED" ? "Đã khóa" : "Không hoạt động"}</span></td><td>{admin.lastLoginAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(admin.lastLoginAt) : "Chưa đăng nhập"}</td></tr>)}</tbody></table></section></div>;
}
