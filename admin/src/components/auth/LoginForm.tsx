"use client";

import { FormEvent, Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ValidatedInput } from "@/components/common/ValidatedInput";
import { validateUsername, validateGeneralEmail, ValidationResult } from "@/lib/validation/rules";

function validateLoginAccount(input: string): ValidationResult {
  const trimmed = (input || "").trim();
  if (!trimmed) return { isValid: false, message: "Vui lòng nhập email hoặc tên đăng nhập." };
  if (trimmed.includes("@")) {
    if (trimmed.endsWith("@vanlanguni.vn")) {
      return /^[a-z0-9]+\.[a-z0-9]+@vanlanguni\.vn$/i.test(trimmed)
        ? { isValid: true, message: "" }
        : { isValid: false, message: "Vui lòng nhập đúng định dạng: Email CTV phải là ten.mssv@vanlanguni.vn" };
    }
    if (trimmed.endsWith("@vlu.edu.vn")) {
      return /^[a-z0-9]+(\.[a-z0-9]+)+@vlu\.edu\.vn$/i.test(trimmed)
        ? { isValid: true, message: "" }
        : { isValid: false, message: "Vui lòng nhập đúng định dạng: Email QTV phải là ten.holot@vlu.edu.vn" };
    }
    return validateGeneralEmail(trimmed);
  }
  return validateUsername(trimmed);
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SsoUrlHandler({ onErrorMessage }: { onErrorMessage: (msg: string) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const email = searchParams.get("email");
    const details = searchParams.get("details");

    if (error === "unauthorized_email") {
      onErrorMessage(
        `Email "${email || "của bạn"}" chưa được phân quyền Quản trị viên trong hệ thống VGG. Vui lòng liên hệ Super Admin.`
      );
    } else if (error === "account_inactive") {
      onErrorMessage("Tài khoản Quản trị viên liên kết với email này hiện đang bị vô hiệu hóa.");
    } else if (error === "account_locked") {
      onErrorMessage("Tài khoản hiện đang bị tạm khóa. Vui lòng thử lại sau.");
    } else if (error === "sso_denied") {
      onErrorMessage(`Đăng nhập SSO bị từ chối hoặc bị hủy.${details ? ` (${details})` : ""}`);
    } else if (error === "sso_not_configured") {
      onErrorMessage("Hệ thống SSO chưa được cấu hình Client ID. Vui lòng thử chế độ Dev Test.");
    } else if (error === "sso_invalid_state") {
      onErrorMessage("Phiên xác thực SSO đã hết hạn. Vui lòng thử lại.");
    } else if (error) {
      onErrorMessage(details || "Không thể hoàn tất đăng nhập SSO. Vui lòng thử lại.");
    }
  }, [searchParams, onErrorMessage]);

  return null;
}

function SsoMockBox({ provider }: { provider: string }) {
  const [customEmail, setCustomEmail] = useState("");

  const sampleAccounts = [
    { label: "Super Admin Demo", email: "lephanminhhai004@gmail.com", role: "SUPER_ADMIN" },
    { label: "Nhân viên (Level 2)", email: "ha.nt@vlu.edu.vn", role: "ADMIN_LEVEL_2" },
    { label: "CTV Sinh viên (Level 3)", email: "ha.217480201@vanlanguni.edu.vn", role: "ADMIN_LEVEL_3" },
    { label: "Email chưa phân quyền", email: "sinhvien.la@vanlanguni.edu.vn", role: "UNAUTHORIZED" },
  ];

  return (
    <div className="sso-mock-card">
      <h4>
        <span>⚙️</span> Giả lập đăng nhập {provider === "microsoft" ? "Microsoft 365" : "Google"} (Dev Mode)
      </h4>
      <p>
        Hệ thống đang ở chế độ kiểm thử cục bộ. Chọn nhanh một tài khoản hoặc nhập email trường để thử luồng SSO:
      </p>

      <div className="sso-mock-quick-list">
        {sampleAccounts.map((acc) => (
          <a
            key={acc.email}
            href={`/api/admin/auth/sso/${provider}/callback?mock_email=${encodeURIComponent(acc.email)}`}
            className="sso-mock-quick-btn"
          >
            <div>
              <strong>{acc.label}</strong>
              <div style={{ color: "#64748b", fontSize: "var(--text-12)" }}>{acc.email}</div>
            </div>
            <span className="badge">{acc.role}</span>
          </a>
        ))}
      </div>

      <div style={{ display: "flex", gap: "6px" }}>
        <input
          type="email"
          placeholder="Nhập email bất kỳ..."
          value={customEmail}
          onChange={(e) => setCustomEmail(e.target.value)}
          style={{
            flex: 1,
            padding: "6px 10px",
            fontSize: "var(--text-12)",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
          }}
        />
        <a
          href={customEmail ? `/api/admin/auth/sso/${provider}/callback?mock_email=${encodeURIComponent(customEmail)}` : "#"}
          className="primary-button"
          style={{
            fontSize: "var(--text-12)",
            padding: "6px 12px",
            pointerEvents: customEmail ? "auto" : "none",
            opacity: customEmail ? 1 : 0.5,
          }}
        >
          Thử
        </a>
      </div>
    </div>
  );
}

function SsoMockContainer() {
  const searchParams = useSearchParams();
  const mockProvider = searchParams.get("sso_mock");
  if (!mockProvider) return null;
  return <SsoMockBox provider={mockProvider} />;
}

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [accountInput, setAccountInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [forceTouched, setForceTouched] = useState(false);

  const passwordValid = passwordInput.length >= 8;
  const passwordError = passwordTouched && !passwordValid && passwordInput.length > 0;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setForceTouched(true);
    setPasswordTouched(true);
    setMessage("");

    const accRes = validateLoginAccount(accountInput);
    if (!accRes.isValid) {
      return setMessage(accRes.message);
    }

    if (passwordInput.length < 8) {
      return setMessage("Vui lòng nhập mật khẩu tối thiểu 8 ký tự.");
    }

    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: accountInput.trim(),
          password: passwordInput,
          remember: data.get("remember") === "on",
        }),
      });
      const result = (await response.json()) as { message?: string; redirectTo?: string };
      if (!response.ok) return setMessage(result.message || "Không thể đăng nhập.");
      router.replace(result.redirectTo || "/admin/dashboard");
      router.refresh();
    } catch {
      setMessage("Không thể kết nối đến hệ thống. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Suspense fallback={null}>
        <SsoUrlHandler onErrorMessage={setMessage} />
        <SsoMockContainer />
      </Suspense>

      {/* VÙNG SINGLE SIGN-ON (SSO) */}
      <section className="sso-section" aria-label="Đăng nhập tài khoản trường">
        <div className="sso-button-group">
          <a
            href="/api/admin/auth/sso/microsoft"
            className="sso-button sso-button--microsoft"
            title="Đăng nhập nhanh với tài khoản Microsoft 365 của trường"
          >
            <MicrosoftIcon />
            <span>Đăng nhập bằng Microsoft Văn Lang</span>
          </a>

          <a
            href="/api/admin/auth/sso/google"
            className="sso-button sso-button--google"
            title="Đăng nhập nhanh với tài khoản Google Workspace"
          >
            <GoogleIcon />
            <span>Đăng nhập bằng Google</span>
          </a>
        </div>
      </section>

      {/* ĐƯỜNG PHÂN CÁCH */}
      <div className="auth-divider">
        <span>Hoặc đăng nhập bằng mật khẩu nội bộ</span>
      </div>

      {/* FORM ĐĂNG NHẬP MẬT KHẨU TRUYỀN THỐNG */}
      <form className="form-stack" onSubmit={submit}>
        <ValidatedInput
          label="Email hoặc Tên đăng nhập"
          name="username"
          value={accountInput}
          onChange={(val) => setAccountInput(val)}
          autoComplete="username"
          placeholder="ha.nt@vlu.edu.vn hoặc ha.mssv@vanlanguni.vn"
          required
          autoFocus
          forceTouched={forceTouched}
          validator={validateLoginAccount}
          hint="Nhân viên: @vlu.edu.vn | CTV Sinh viên: @vanlanguni.vn"
        />

        <div className="field" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ fontSize: "var(--text-14)", fontWeight: 600, color: "#1e293b" }}>
              Mật khẩu <span style={{ color: "#ef4444" }}>*</span>
            </span>
            <Link
              href="/admin/forgot-password"
              style={{ color: "#b91c1c", fontSize: "var(--text-14)", fontWeight: 600, textDecoration: "none" }}
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordTouched(true);
              }}
              onBlur={() => setPasswordTouched(true)}
              placeholder="Nhập mật khẩu..."
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "9px 12px",
                paddingRight: passwordValid && passwordInput.length > 0 ? "70px" : "44px",
                borderRadius: "8px",
                border: `1.5px solid ${passwordError ? "#ef4444" : (passwordValid && passwordInput.length > 0 ? "#10b981" : "#cbd5e1")}`,
                boxShadow: passwordError ? "0 0 0 3px rgba(239, 68, 68, 0.15)" : (passwordValid && passwordInput.length > 0 ? "0 0 0 3px rgba(16, 185, 129, 0.15)" : "none"),
                fontSize: "var(--text-14)",
                color: "#0f172a",
                outline: "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
            />

            {/* Dấu tích xanh khi mật khẩu hợp lệ */}
            {passwordValid && passwordInput.length > 0 && (
              <div
                title="Mật khẩu hợp lệ"
                style={{
                  position: "absolute",
                  right: "42px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10b981",
                  pointerEvents: "none",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
                fontSize: "var(--text-12)",
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>

          {passwordError && (
            <span
              role="alert"
              style={{
                color: "#ef4444",
                fontSize: "var(--text-12)",
                fontWeight: 500,
                marginTop: "5px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>⚠️</span>
              <span>Vui lòng nhập đúng định dạng: Mật khẩu tối thiểu 8 ký tự.</span>
            </span>
          )}
        </div>
        <label className="check-field">
          <input name="remember" type="checkbox" /> Ghi nhớ đăng nhập
        </label>
        {message && (
          <p className="form-message" role="alert" aria-live="polite">
            {message}
          </p>
        )}
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "ĐANG ĐĂNG NHẬP…" : "ĐĂNG NHẬP"}
        </button>
      </form>
    </div>
  );
}
