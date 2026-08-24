import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { requireAdmin } from "@/lib/auth/authorization";

export const metadata = { title: "Đổi mật khẩu lần đầu" };
export default async function ChangePasswordPage() {
  const admin = await requireAdmin({ allowMustChangePassword: true });
  return <main className="auth-page"><section className="auth-brand"><div className="auth-brand__mark">VGG / ADMINISTRATION</div><div className="auth-brand__copy"><span>FIRST SIGN-IN</span><h1>Bảo vệ<br />tài khoản.</h1><p>Mật khẩu tạm thời phải được thay đổi trước khi truy cập hệ thống quản trị.</p></div></section><section className="auth-panel"><div className="auth-card"><header className="auth-card__head"><span className="eyebrow">{admin.username}</span><h2>Đổi mật khẩu</h2><p>Tối thiểu 10 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.</p></header><ChangePasswordForm forced /></div></section></main>;
}

