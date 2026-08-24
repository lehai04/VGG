"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CreateAdminForm() {
  const router = useRouter(); const [loading, setLoading] = useState(false); const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage(""); const data = new FormData(event.currentTarget);
    try { const response = await fetch("/api/admin/users", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ fullName: data.get("fullName"), username: data.get("username"), email: data.get("email"), phone: data.get("phone"), roleCode: data.get("roleCode"), password: data.get("password"), confirmPassword: data.get("confirmPassword"), status: data.get("status"), mustChangePassword: data.get("mustChangePassword") === "on" }) }); const result = await response.json() as { message?: string }; if (!response.ok) return setMessage(result.message || "Không thể tạo tài khoản."); router.replace("/admin/users"); router.refresh(); }
    catch { setMessage("Không thể kết nối đến hệ thống."); } finally { setLoading(false); }
  }
  return <form className="form-grid" onSubmit={submit}><label className="field">Họ và tên *<input name="fullName" minLength={2} maxLength={120} required /></label><label className="field">Tên đăng nhập *<input name="username" minLength={3} maxLength={50} pattern="[A-Za-z0-9._-]+" required /></label><label className="field">Email<input name="email" type="email" maxLength={190} /></label><label className="field">Số điện thoại<input name="phone" type="tel" maxLength={30} /></label><label className="field">Vai trò *<select name="roleCode" required><option value="ADMIN_LEVEL_2">QTV Bậc 2</option><option value="ADMIN_LEVEL_3">QTV Bậc 3</option><option value="SUPER_ADMIN">QTV Bậc 1 – Super Admin</option></select></label><label className="field">Trạng thái<select name="status"><option value="ACTIVE">Hoạt động</option><option value="INACTIVE">Không hoạt động</option></select></label><label className="field">Mật khẩu tạm thời *<input name="password" type="password" minLength={10} autoComplete="new-password" required /></label><label className="field">Xác nhận mật khẩu *<input name="confirmPassword" type="password" minLength={10} autoComplete="new-password" required /></label><label className="check-field full"><input name="mustChangePassword" type="checkbox" defaultChecked /> Bắt buộc đổi mật khẩu khi đăng nhập lần đầu</label><p className="form-message full" role="alert">{message}</p><button className="primary-button full" disabled={loading}>{loading ? "ĐANG TẠO…" : "TẠO TÀI KHOẢN"}</button></form>;
}

