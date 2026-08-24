import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
export const metadata = { title: "Bảo mật tài khoản" };
export default function SecurityPage() { return <div className="admin-page"><header className="admin-page__head"><div><span className="eyebrow">PROFILE / SECURITY</span><h1>Đổi mật khẩu</h1></div></header><section className="admin-card" style={{ maxWidth: 640 }}><ChangePasswordForm /></section></div>; }

