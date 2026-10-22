"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setLoading(false);
      return setMessage("Mật khẩu xác nhận không khớp.");
    }

    try {
      const response = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setIsSuccess(false);
        return setMessage(result.message || "Không thể đặt lại mật khẩu.");
      }
      setIsSuccess(true);
      setMessage(result.message || "Đặt lại mật khẩu thành công.");
    } catch {
      setIsSuccess(false);
      setMessage("Không thể kết nối đến hệ thống. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="form-stack">
        <div className="admin-alert" style={{ padding: "16px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b" }}>
          <strong>Mã khôi phục không hợp lệ</strong>
          <p style={{ margin: "8px 0 16px", fontSize: "0.9rem" }}>
            Đường dẫn đặt lại mật khẩu bị thiếu token hoặc không chính xác. Vui lòng thực hiện lại thao tác quên mật khẩu.
          </p>
          <Link href="/admin/forgot-password" className="primary-button" style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>
            YÊU CẦU LẠI MẬT KHẨU
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="form-stack">
        <div className="admin-alert admin-alert--success" style={{ padding: "16px", borderRadius: "8px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534" }}>
          <strong style={{ display: "block", marginBottom: "8px" }}>✓ Đặt lại mật khẩu thành công</strong>
          <p style={{ margin: "0 0 16px", fontSize: "0.9rem" }}>{message}</p>
          <Link href="/admin/login" className="primary-button" style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>
            ĐĂNG NHẬP NGAY
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="form-stack" onSubmit={submit}>
      <label className="field">
        Mật khẩu mới
        <div className="password-field">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            placeholder="Tối thiểu 8 ký tự, gồm chữ hoa, thường & số"
            required
            autoFocus
          />
          <button
            className="password-toggle"
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>
      </label>

      <label className="field">
        Xác nhận mật khẩu mới
        <input
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
          placeholder="Nhập lại mật khẩu mới"
          required
        />
      </label>

      {message && <p className="form-message" role="alert" aria-live="polite">{message}</p>}

      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? "ĐANG CẬP NHẬT…" : "ĐẶT LẠI MẬT KHẨU"}
      </button>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <Link href="/admin/login" style={{ color: "#71717a", fontSize: "0.85rem", textDecoration: "none" }}>
          ← Quay lại Đăng nhập
        </Link>
      </div>
    </form>
  );
}
