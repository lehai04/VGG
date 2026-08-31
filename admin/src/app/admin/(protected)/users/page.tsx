import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/authorization";
import { prisma } from "@/lib/db";

export const metadata = { title: "Quản lý Nhân sự" };

export default async function AdminUsersPage() {
  const current = await requireAdmin();
  if (!current.permissionCodes.includes("admins.view")) redirect("/admin/dashboard");

  const admins = await prisma.admin.findMany({
    include: { role: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <span className="eyebrow">HỆ THỐNG / QUẢN TRỊ NHÂN SỰ</span>
          <h1>Danh sách Nhân sự & Quản trị viên</h1>
          <p style={{ margin: "4px 0 0", color: "#71717a", fontSize: "0.9rem" }}>
            Quản lý tài khoản, phân quyền vai trò (Super Admin / QTV Cấp 2) và theo dõi hoạt động nhân sự.
          </p>
        </div>
        {current.permissionCodes.includes("admins.create") && (
          <Link
            className="primary-button"
            href="/admin/users/create"
            style={{
              alignSelf: "center",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 20px",
              minHeight: "44px",
              fontSize: "0.88rem",
              fontWeight: 700,
            }}
          >
            + Thêm nhân sự mới
          </Link>
        )}
      </header>

      <section className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nhân sự</th>
              <th>Email VLU</th>
              <th>Số điện thoại</th>
              <th>Vai trò phân quyền</th>
              <th>Trạng thái</th>
              <th>Đăng nhập cuối</th>
              <th style={{ textAlign: "right" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <Link href={`/admin/users/${admin.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <strong style={{ display: "block", color: "#18181b" }}>{admin.fullName}</strong>
                    <small style={{ color: "#71717a" }}>@{admin.username}</small>
                  </Link>
                </td>
                <td>
                  <span style={{ color: admin.email ? "#b91c1c" : "#a1a1aa", fontWeight: 500 }}>
                    {admin.email || "—"}
                  </span>
                </td>
                <td>{admin.phone || "—"}</td>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      background: admin.role.level === 1 ? "#fee2e2" : "#f4f4f5",
                      color: admin.role.level === 1 ? "#991b1b" : "#3f3f46",
                    }}
                  >
                    {admin.role.name}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-pill ${
                      admin.status === "ACTIVE" ? "" : "inactive"
                    }`}
                  >
                    {admin.status === "ACTIVE"
                      ? "Hoạt động"
                      : admin.status === "LOCKED"
                      ? "Đã khóa"
                      : "Tạm ngưng"}
                  </span>
                </td>
                <td>
                  {admin.lastLoginAt
                    ? new Intl.DateTimeFormat("vi-VN", {
                        dateStyle: "short",
                        timeStyle: "short",
                        timeZone: "Asia/Ho_Chi_Minh",
                      }).format(admin.lastLoginAt)
                    : "Chưa đăng nhập"}
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link
                    href={`/admin/users/${admin.id}`}
                    className="secondary-button"
                    style={{ padding: "4px 10px", fontSize: "0.8rem", textDecoration: "none" }}
                  >
                    Chi tiết →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
