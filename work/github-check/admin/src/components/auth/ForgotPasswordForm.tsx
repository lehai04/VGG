"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();

    try {
      const response = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setIsSuccess(false);
        return setMessage(result.message || "Không thể thực hiện yêu cầu lúc này. Vui lòng thử lại sau.");
      }
      setIsSuccess(true);
      setMessage(result.message || "Yêu cầu đã được tiếp nhận. Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu sẽ được gửi tới email tương ứng.");
    } catch {
      setIsSuccess(false);
      setMessage("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng hoặc thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-stack">
      {isSuccess ? (
        <div
          className="admin-alert admin-alert--success"
          style={{
            padding: "20px",
            borderRadius: "8px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#166534",
          }}
        >
          <strong style={{ display: "block", marginBottom: "8px", fontSize: "1rem" }}>
            ✓ Yêu cầu đã được tiếp nhận
          </strong>
          <p style={{ margin: "0 0 12px", fontSize: "0.9rem", lineHeight: 1.5 }}>
            {message}
          </p>
          <p style={{ margin: "0 0 16px", fontSize: "0.82rem", color: "#4b5563", lineHeight: 1.4 }}>
            Vui lòng kiểm tra hộp thư đến (bao gồm cả thư mục Spam/Thư rác). Nếu không nhận được email hoặc cần hỗ trợ khẩn cấp, vui lòng liên hệ trực tiếp <strong>Super Admin</strong> hoặc <strong>Bộ phận Quản trị Hệ thống IT</strong>.
          </p>
          <div style={{ marginTop: "16px" }}>
            <Link
              href="/admin/login"
              className="primary-button"
              style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}
            >
              QUAY LẠI ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      ) : (
        <form className="form-stack" onSubmit={submit}>
          <label className="field">
            Email Văn Lang (VLU)
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ten.ho@vlu.edu.vn"
              required
              autoFocus
            />
          </label>
          {message && <p className="form-message" role="alert" aria-live="polite">{message}</p>}
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "ĐANG XỬ LÝ…" : "GỬI YÊU CẦU ĐẶT LẠI MẬT KHẨU"}
          </button>
          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <Link href="/admin/login" style={{ color: "#71717a", fontSize: "0.85rem", textDecoration: "none" }}>
              ← Quay lại Đăng nhập
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
