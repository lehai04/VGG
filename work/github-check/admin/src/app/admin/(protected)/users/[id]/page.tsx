import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/authorization";
import { prisma } from "@/lib/db";
import { AdminUserActions } from "@/components/users/AdminUserActions";

export const metadata = { title: "Chi tiết nhân sự" };

export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const current = await requireAdmin();
  if (!current.permissionCodes.includes("admins.view")) redirect("/admin/dashboard");

  const admin = await prisma.admin.findUnique({
    where: { id: (await params).id },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      },
    },
  });

  if (!admin) notFound();

  const isSuperAdmin = current.role.level === 1 || current.permissionCodes.includes("admins.update");

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <span className="eyebrow">
            <Link href="/admin/users" style={{ color: "inherit", textDecoration: "none" }}>
              QUẢN LÝ NHÂN SỰ
            </Link>{" "}
            / {admin.username}
          </span>
          <h1>{admin.fullName}</h1>
          <p style={{ margin: "4px 0 0", color: "#71717a", fontSize: "0.9rem" }}>
            Hồ sơ tài khoản và phân quyền quản trị trong hệ thống VGG Platform.
          </p>
        </div>
        <Link href="/admin/users" className="secondary-button" style={{ alignSelf: "center" }}>
          ← Danh sách nhân sự
        </Link>
      </header>

      <AdminUserActions
        user={admin}
        currentAdminId={current.id}
        isSuperAdmin={isSuperAdmin}
      />
    </div>
  );
}
