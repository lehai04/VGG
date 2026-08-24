"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

async function send(url: string, method: string, body: object) {
  const response = await fetch(url, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const result = await response.json() as { message?: string };
  if (!response.ok) throw new Error(result.message || "Thao tác không thành công.");
  return result.message || "Cập nhật thành công.";
}

export function AdminUserActions({ id, status, roleCode }: { id: string; status: string; roleCode: string }) {
  const router = useRouter(); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  async function run(action: () => Promise<string>) { setLoading(true); setMessage(""); try { setMessage(await action()); router.refresh(); } catch (error) { setMessage(error instanceof Error ? error.message : "Thao tác không thành công."); } finally { setLoading(false); } }
  async function reset(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); await run(() => send(`/api/admin/users/${id}/reset-password`, "POST", { password: data.get("password"), confirmPassword: data.get("confirmPassword") })); }
  return <><p className="form-message" role="status">{message}</p><div className="user-actions"><section className="user-action"><h2>Trạng thái tài khoản</h2><p>{status === "ACTIVE" ? "Tài khoản đang hoạt động." : "Tài khoản đang bị vô hiệu hóa hoặc khóa."}</p><button className={`secondary-button${status === "ACTIVE" ? " danger-button" : ""}`} disabled={loading} onClick={() => run(() => send(`/api/admin/users/${id}/status`, "PATCH", { status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }))}>{status === "ACTIVE" ? "VÔ HIỆU HÓA" : "KÍCH HOẠT"}</button></section><section className="user-action"><h2>Vai trò</h2><label className="field">Cấp quản trị<select defaultValue={roleCode} disabled={loading} onChange={(event) => run(() => send(`/api/admin/users/${id}/role`, "PATCH", { roleCode: event.target.value }))}><option value="SUPER_ADMIN">QTV Bậc 1 – Super Admin</option><option value="ADMIN_LEVEL_2">QTV Bậc 2</option><option value="ADMIN_LEVEL_3">QTV Bậc 3</option></select></label></section><form className="user-action" onSubmit={reset}><h2>Reset mật khẩu</h2><label className="field">Mật khẩu tạm thời<input name="password" type="password" minLength={10} required /></label><label className="field">Xác nhận mật khẩu<input name="confirmPassword" type="password" minLength={10} required /></label><button className="secondary-button danger-button" disabled={loading}>RESET MẬT KHẨU</button></form></div></>;
}

