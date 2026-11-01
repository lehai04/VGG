"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { adminApi, ApiError, type User } from "./api";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { CmsWorkspace } from "./CmsWorkspace";
import styles from "./admin.module.css";

export function ConsultationAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [bootError, setBootError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    adminApi<{ user: User }>("me", "GET", undefined, controller.signal)
      .then((data) => setUser(data.user))
      .catch((error: unknown) => {
        if (!controller.signal.aborted && !(error instanceof ApiError && error.status === 401))
          setBootError("Không kết nối được hệ thống quản trị. Vui lòng thử lại.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setChecking(false);
      });
    return () => controller.abort();
  }, [retry]);
  const expired = useCallback(() => setUser(null), []);
  return (
    <div className={user ? undefined : styles.shell} id="main-content" role="main">
      {!user && (
        <header className={styles.loginTopbar}>
          <a href={process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000/vi"} className={styles.brand}>
            VĂN LANG <span>VIỆN SAU ĐẠI HỌC</span>
          </a>
          <span>Cổng quản trị nội dung</span>
        </header>
      )}
      {checking ? (
        <p className={styles.notice} role="status">
          Đang kiểm tra phiên đăng nhập…
        </p>
      ) : bootError ? (
        <section className={styles.login}>
          <p role="alert">{bootError}</p>
          <button
            onClick={() => {
              setBootError("");
              setChecking(true);
              setRetry((value) => value + 1);
            }}
          >
            Thử lại
          </button>
        </section>
      ) : user ? (
        <CmsWorkspace user={user} onExpired={expired} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const data = await adminApi<{ user: User }>("login", "POST", {
        email: String(form.get("email")).trim(),
        password: String(form.get("password")),
      });
      onLogin(data.user);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Không thể đăng nhập.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={styles.loginLayout}>
      <aside className={styles.loginIntro}>
        <span className={styles.introIcon}>
          <GraduationCap size={36} />
        </span>
        <p className={styles.eyebrow}>VĂN LANG · SAU ĐẠI HỌC</p>
        <h2>
          Kết nối hôm nay.
          <br />
          Kiến tạo tương lai.
        </h2>
        <p>Một không gian làm việc tập trung để tiếp nhận và đồng hành cùng người học.</p>
        <div className={styles.introFoot}>
          <ShieldCheck size={18} /> Không gian dành riêng cho cán bộ Viện
        </div>
      </aside>
      <section className={styles.login}>
        <p className={styles.eyebrow}>DÀNH CHO CÁN BỘ VIỆN</p>
        <h1>Đăng nhập quản trị</h1>
        <p>Xem và tiếp nhận các yêu cầu tư vấn tuyển sinh.</p>
        <form onSubmit={submit}>
          <label>
            Email cơ quan
            <input name="email" type="email" autoComplete="username" maxLength={190} required />
          </label>
          <label>
            Mật khẩu
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              maxLength={256}
              required
            />
          </label>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          <button className={styles.primary} disabled={busy}>
            {busy ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
        <p className={styles.hint}>
          Liên hệ người quản trị hệ thống để được cấp tài khoản hoặc đặt lại mật khẩu.
        </p>
      </section>
    </div>
  );
}
