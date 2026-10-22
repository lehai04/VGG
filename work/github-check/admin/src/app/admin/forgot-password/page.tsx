import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { getCurrentAdmin } from "@/lib/auth/session";

export const metadata = { title: "Quên mật khẩu" };

export default async function ForgotPasswordPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin/dashboard");

  return (
    <main className="auth-page">
      <section className="auth-brand" aria-label="VGG Administration">
        <div className="auth-brand__mark">VGG / ADMINISTRATION</div>
        <div className="auth-brand__copy">
          <span>VAN LANG GLOBAL GRADUATE</span>
          <h1>Khôi phục<br />truy cập.</h1>
          <p>Hệ thống hỗ trợ cấp lại mật khẩu thông qua Email Văn Lang đã được đăng ký và phân quyền.</p>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <header className="auth-card__head">
            <span className="eyebrow">RECOVER ACCESS</span>
            <h2>Quên mật khẩu</h2>
            <p>Nhập email @vlu.edu.vn được chỉ định quản trị để nhận hướng dẫn đặt lại mật khẩu.</p>
          </header>
          <ForgotPasswordForm />
          <p className="auth-note">
            Nếu bạn không nhớ email đã đăng ký hoặc tài khoản bị khóa, vui lòng liên hệ trực tiếp Super Admin.
          </p>
        </div>
      </section>
    </main>
  );
}
