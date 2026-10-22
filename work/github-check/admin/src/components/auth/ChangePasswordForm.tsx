"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ChangePasswordForm({ forced = false }: { forced?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage(""); setSuccess(false);
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/admin/auth/change-password", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ currentPassword: data.get("currentPassword"), newPassword: data.get("newPassword"), confirmPassword: data.get("confirmPassword") }) });
      const result = await response.json() as { message?: string; redirectTo?: string };
      setMessage(result.message || (response.ok ? "Đổi mật khẩu thành công." : "Không thể đổi mật khẩu."));
      setSuccess(response.ok);
      if (response.ok) { form.reset(); if (forced) { router.replace(result.redirectTo || "/admin/dashboard"); router.refresh(); } }
    } catch { setMessage("Không thể kết nối đến hệ thống."); }
    finally { setLoading(false); }
  }
  return <form className="form-stack" onSubmit={submit}><label className="field">Mật khẩu hiện tại<input type="password" name="currentPassword" autoComplete="current-password" required /></label><label className="field">Mật khẩu mới<input type="password" name="newPassword" autoComplete="new-password" minLength={10} required /></label><label className="field">Xác nhận mật khẩu mới<input type="password" name="confirmPassword" autoComplete="new-password" minLength={10} required /></label><p className={`form-message${success ? " success" : ""}`} role="status">{message}</p><button className="primary-button" disabled={loading}>{loading ? "ĐANG CẬP NHẬT…" : "ĐỔI MẬT KHẨU"}</button></form>;
}
