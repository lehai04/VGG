import { notFound, redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/session";
import { AccountProfileView } from "@/components/profile/AccountProfileView";

export const metadata = { title: "Tài khoản của tôi" };

export default async function SecurityPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <span className="eyebrow">ADMINISTRATION / ACCOUNT</span>
          <h1>Tài khoản của tôi</h1>
          <p style={{ margin: "6px 0 0", color: "#71717a", fontSize: "0.9rem" }}>
            Quản lý thông tin định danh, phân quyền nhân sự và thiết lập bảo mật mật khẩu.
          </p>
        </div>
      </header>
      <AccountProfileView admin={admin} />
    </div>
  );
}
