"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: data.get("username"), password: data.get("password"), remember: data.get("remember") === "on" }),
      });
      const result = await response.json() as { message?: string; redirectTo?: string };
      if (!response.ok) return setMessage(result.message || "Không thể đăng nhập.");
      router.replace(result.redirectTo || "/admin/dashboard");
      router.refresh();
    } catch { setMessage("Không thể kết nối đến hệ thống. Vui lòng thử lại."); }
    finally { setLoading(false); }
  }

  return <form className="form-stack" onSubmit={submit}>
    <label className="field">
      Email VLU hoặc Tên đăng nhập
      <input
        name="username"
        autoComplete="username"
        minLength={3}
        maxLength={190}
        placeholder="ten.ho@vlu.edu.vn hoặc username"
        required
        autoFocus
      />
    </label>
    <label className="field">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Mật khẩu</span>
        <Link href="/admin/forgot-password" style={{ color: "#b91c1c", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
          Quên mật khẩu?
        </Link>
      </div>
      <div className="password-field">
        <input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" maxLength={128} required />
        <button className="password-toggle" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
          {showPassword ? "Ẩn" : "Hiện"}
        </button>
      </div>
    </label>
    <label className="check-field"><input name="remember" type="checkbox" /> Ghi nhớ đăng nhập</label>
    {message && <p className="form-message" role="alert" aria-live="polite">{message}</p>}
    <button className="primary-button" type="submit" disabled={loading}>{loading ? "ĐANG ĐĂNG NHẬP…" : "ĐĂNG NHẬP"}</button>
  </form>;
}

