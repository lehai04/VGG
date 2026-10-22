import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { getCurrentAdmin } from "@/lib/auth/session";

export const metadata = { title: "Đặt lại mật khẩu" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin/dashboard");

  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <main className="auth-page">
      <section className="auth-brand" aria-label="VGG Administration">
        <div className="auth-brand__mark">VGG / ADMINISTRATION</div>
        <div className="auth-brand__copy">
          <span>VAN LANG GLOBAL GRADUATE</span>
          <h1>Bảo mật<br />tài khoản.</h1>
          <p>Thiết lập mật khẩu mới an toàn để truy cập hệ thống quản trị Viện Sau Đại học.</p>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <header className="auth-card__head">
            <span className="eyebrow">RESET PASSWORD</span>
            <h2>Đặt lại mật khẩu</h2>
            <p>Vui lòng tạo mật khẩu mới đáp ứng tiêu chuẩn an toàn của hệ thống.</p>
          </header>
          <ResetPasswordForm token={token} />
        </div>
      </section>
    </main>
  );
}
