"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validatePassword, validateConfirmPassword } from "@/lib/validation/rules";
import { ValidatedInput } from "@/components/common/ValidatedInput";
import { PasswordChecklistInput } from "@/components/common/PasswordChecklistInput";

export function ChangePasswordForm({ forced = false }: { forced?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forceTouched, setForceTouched] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setForceTouched(true);
    setMessage("");
    setSuccess(false);

    if (!currentPassword) {
      return setMessage("Vui lòng nhập mật khẩu hiện tại.");
    }

    const pRes = validatePassword(newPassword);
    if (!pRes.isValid) {
      return setMessage(pRes.message);
    }

    const cpRes = validateConfirmPassword(newPassword, confirmPassword);
    if (!cpRes.isValid) {
      return setMessage(cpRes.message);
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });
      const result = (await response.json()) as { message?: string; redirectTo?: string };
      setMessage(result.message || (response.ok ? "Đổi mật khẩu thành công." : "Không thể đổi mật khẩu."));
      setSuccess(response.ok);

      if (response.ok) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setForceTouched(false);
        if (forced) {
          router.replace(result.redirectTo || "/admin/dashboard");
          router.refresh();
        }
      }
    } catch {
      setMessage("Không thể kết nối đến hệ thống.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form-stack" onSubmit={submit}>
      <ValidatedInput
        label="Mật khẩu hiện tại"
        name="currentPassword"
        type="password"
        value={currentPassword}
        onChange={(val) => setCurrentPassword(val)}
        autoComplete="current-password"
        placeholder="Nhập mật khẩu hiện tại..."
        required
        forceTouched={forceTouched}
        validator={(val) =>
          val.length > 0
            ? { isValid: true, message: "" }
            : { isValid: false, message: "Vui lòng nhập mật khẩu hiện tại." }
        }
      />

      <PasswordChecklistInput
        label="Mật khẩu mới"
        name="newPassword"
        value={newPassword}
        onChange={(val) => setNewPassword(val)}
        placeholder="Nhập mật khẩu mới..."
        required
        forceTouched={forceTouched}
      />

      <ValidatedInput
        label="Xác nhận mật khẩu mới"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(val) => setConfirmPassword(val)}
        autoComplete="new-password"
        placeholder="Nhập lại mật khẩu mới..."
        required
        forceTouched={forceTouched}
        validator={(val) => validateConfirmPassword(newPassword, val)}
      />

      {message && (
        <p className={`form-message${success ? " success" : ""}`} role="status">
          {message}
        </p>
      )}

      <button className="primary-button" disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "ĐANG CẬP NHẬT…" : "ĐỔI MẬT KHẨU"}
      </button>
    </form>
  );
}
