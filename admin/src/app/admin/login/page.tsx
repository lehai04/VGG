import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { getCurrentAdmin } from "@/lib/auth/session";

export const metadata = { title: "Đăng nhập" };

export default async function LoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect(admin.mustChangePassword ? "/admin/change-password" : "/admin/dashboard");
  return <main className="auth-page">
    <section className="auth-brand" aria-label="VGG Administration">
      <div className="auth-brand__mark">VGG / ADMINISTRATION</div>
      <div className="auth-brand__copy"><span>VAN LANG GLOBAL GRADUATE</span><h1>Quản trị<br />tập trung.</h1><p>Không gian quản lý nội dung và vận hành dành riêng cho đội ngũ VGG.</p></div>
    </section>
    <section className="auth-panel"><div className="auth-card"><header className="auth-card__head"><span className="eyebrow">SECURE ACCESS</span><h2>Đăng nhập</h2><p>Sử dụng tài khoản quản trị được cấp bởi Super Admin.</p></header><LoginForm /><p className="auth-note">Hệ thống không hỗ trợ tự đăng ký. Nếu gặp vấn đề với tài khoản, vui lòng liên hệ Super Admin.</p></div></section>
  </main>;
}

