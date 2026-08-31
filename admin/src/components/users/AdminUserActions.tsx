"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminUserDetail {
  id: string;
  username: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  status: string;
  role: {
    code: string;
    name: string;
    level: number;
    permissions?: Array<{ permission: { code: string; description: string | null } }>;
  };
  lastLoginAt: Date | null;
  createdAt: Date;
}

export function AdminUserActions({
  user,
  currentAdminId,
  isSuperAdmin,
}: {
  user: AdminUserDetail;
  currentAdminId: string;
  isSuperAdmin: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isSelf = user.id === currentAdminId;

  async function handleUpdateInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);
    const data = new FormData(event.currentTarget);

    const body = {
      fullName: String(data.get("fullName") || "").trim(),
      username: String(data.get("username") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      roleCode: data.get("roleCode") ? String(data.get("roleCode")) : undefined,
    };

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setIsSuccess(false);
        return setMessage(result.message || "Không thể cập nhật nhân sự.");
      }
      setIsSuccess(true);
      setMessage(result.message || "Cập nhật thành công.");
      setIsEditing(false);
      router.refresh();
    } catch {
      setIsSuccess(false);
      setMessage("Không thể kết nối đến hệ thống.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleStatus() {
    const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const promptMsg = newStatus === "INACTIVE"
      ? `Bạn có chắc chắn muốn KHÓA tài khoản của ${user.fullName} (${user.username})?`
      : `Bạn có chắc chắn muốn MỞ KHÓA / KÍCH HOẠT lại tài khoản của ${user.fullName}?`;

    if (!window.confirm(promptMsg)) return;

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/users/${user.id}/status`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setIsSuccess(false);
        return setMessage(result.message || "Không thể đổi trạng thái.");
      }
      setIsSuccess(true);
      setMessage(result.message || `Đã ${newStatus === "ACTIVE" ? "kích hoạt" : "khóa"} tài khoản thành công.`);
      router.refresh();
    } catch {
      setIsSuccess(false);
      setMessage("Lỗi kết nối.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteUser() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setIsSuccess(false);
        return setMessage(result.message || "Không thể xóa tài khoản.");
      }
      alert("Đã xóa tài khoản nhân sự thành công.");
      router.replace("/admin/users");
      router.refresh();
    } catch {
      setIsSuccess(false);
      setMessage("Lỗi kết nối khi xóa tài khoản.");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/admin/users/${user.id}/reset-password`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          password: data.get("password"),
          confirmPassword: data.get("confirmPassword"),
        }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setIsSuccess(false);
        return setMessage(result.message || "Không thể reset mật khẩu.");
      }
      setIsSuccess(true);
      setMessage(result.message || "Đã cấp lại mật khẩu tạm thời thành công.");
      (event.target as HTMLFormElement).reset();
    } catch {
      setIsSuccess(false);
      setMessage("Lỗi kết nối.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {message && (
        <div
          className={`admin-alert ${isSuccess ? "admin-alert--success" : ""}`}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            background: isSuccess ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
            color: isSuccess ? "#166534" : "#991b1b",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          {message}
        </div>
      )}

      {/* KHỐI 1: CHỈNH SỬA THÔNG TIN & PHÂN QUYỀN */}
      <section className="admin-card" style={{ padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#18181b" }}>
              {isEditing ? "Chỉnh sửa thông tin & Phân quyền" : "Thông tin định danh & Phân quyền"}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#71717a" }}>
              Super Admin có quyền cập nhật thông tin và điều chỉnh cấp bậc quản trị của nhân sự.
            </p>
          </div>
          {isSuperAdmin && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => setIsEditing(!isEditing)}
              disabled={loading}
            >
              {isEditing ? "HỦY SỬA" : "CHỈNH SỬA"}
            </button>
          )}
        </div>

        {isEditing ? (
          <form className="form-grid" onSubmit={handleUpdateInfo}>
            <label className="field">
              Họ và tên *
              <input
                name="fullName"
                defaultValue={user.fullName}
                minLength={2}
                maxLength={120}
                required
              />
            </label>

            <label className="field">
              Tên đăng nhập *
              <input
                name="username"
                defaultValue={user.username}
                minLength={3}
                maxLength={50}
                pattern="[A-Za-z0-9._-]+"
                required
              />
            </label>

            <label className="field">
              Email Văn Lang (VLU) *
              <input
                name="email"
                type="email"
                defaultValue={user.email || ""}
                placeholder="ten.ho@vlu.edu.vn"
                maxLength={190}
                required
              />
            </label>

            <label className="field">
              Số điện thoại
              <input
                name="phone"
                type="tel"
                defaultValue={user.phone || ""}
                placeholder="0901234567"
                maxLength={30}
              />
            </label>

            <label className="field full">
              Vai trò / Cấp bậc quản trị *
              <select name="roleCode" defaultValue={user.role.code} required disabled={!isSuperAdmin}>
                <option value="ADMIN_LEVEL_2">QTV Cấp 2 (Quản lý Nội dung, Tài nguyên & Tư vấn)</option>
                <option value="SUPER_ADMIN">QTV Cấp 1 – Super Admin (Toàn quyền hệ thống & Nhân sự)</option>
              </select>
            </label>

            <div className="full" style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button className="primary-button" type="submit" disabled={loading}>
                {loading ? "ĐANG LƯU…" : "LƯU CẬP NHẬT"}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                HỦY
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "18px" }}>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700 }}>Họ và tên</span>
              <p style={{ margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 700, color: "#18181b" }}>{user.fullName}</p>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700 }}>Tên đăng nhập</span>
              <p style={{ margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 600, color: "#27272a" }}>{user.username}</p>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700 }}>Email Văn Lang</span>
              <p style={{ margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 600, color: user.email ? "#b91c1c" : "#a1a1aa" }}>
                {user.email || "Chưa thiết lập"}
              </p>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700 }}>Số điện thoại</span>
              <p style={{ margin: "4px 0 0", fontSize: "0.95rem", color: "#27272a" }}>{user.phone || "—"}</p>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700 }}>Vai trò phân quyền</span>
              <p style={{ margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 700, color: "#991b1b" }}>
                {user.role.name}
              </p>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700 }}>Trạng thái</span>
              <p style={{ margin: "4px 0 0", fontSize: "0.9rem", fontWeight: 700, color: user.status === "ACTIVE" ? "#15803d" : "#b91c1c" }}>
                ● {user.status === "ACTIVE" ? "Đang hoạt động" : "Đang bị khóa"}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* KHỐI 2: KHÓA / MỞ KHÓA & RESET MẬT KHẨU & XÓA TÀI KHOẢN */}
      {isSuperAdmin && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {/* KHÓA / KÍCH HOẠT */}
          <section className="admin-card" style={{ padding: "24px" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "1rem", fontWeight: 800, color: "#18181b" }}>
              Khóa / Mở khóa tài khoản
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: "0.85rem", color: "#52525b", lineHeight: 1.5 }}>
              {user.status === "ACTIVE"
                ? "Tài khoản hiện đang hoạt động bình thường. Khóa tài khoản sẽ chặn đăng nhập ngay lập tức."
                : "Tài khoản hiện đang bị khóa. Mở khóa để cho phép nhân sự tiếp tục đăng nhập và làm việc."}
            </p>
            <button
              type="button"
              className={`secondary-button${user.status === "ACTIVE" ? " danger-button" : ""}`}
              style={{ width: "100%", padding: "10px" }}
              disabled={loading || isSelf}
              onClick={handleToggleStatus}
            >
              {isSelf
                ? "KHÔNG THỂ KHÓA CHÍNH MÌNH"
                : user.status === "ACTIVE"
                ? "KHÓA TÀI KHOẢN"
                : "MỞ KHÓA / KÍCH HOẠT"}
            </button>
          </section>

          {/* CẤP LẠI MẬT KHẨU */}
          <section className="admin-card" style={{ padding: "24px" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "1rem", fontWeight: 800, color: "#18181b" }}>
              Cấp lại mật khẩu tạm thời
            </h3>
            <form className="form-stack" onSubmit={handleResetPassword}>
              <label className="field">
                Mật khẩu mới
                <input
                  name="password"
                  type="password"
                  minLength={8}
                  maxLength={128}
                  placeholder="Tối thiểu 8 ký tự"
                  required
                />
              </label>
              <label className="field">
                Xác nhận mật khẩu
                <input
                  name="confirmPassword"
                  type="password"
                  minLength={8}
                  maxLength={128}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </label>
              <button
                type="submit"
                className="secondary-button danger-button"
                style={{ width: "100%", padding: "10px" }}
                disabled={loading}
              >
                {loading ? "ĐANG XỬ LÝ…" : "CẬP NHẬT MẬT KHẨU MỚI"}
              </button>
            </form>
          </section>

          {/* XÓA TÀI KHOẢN */}
          <section
            className="admin-card full"
            style={{
              gridColumn: "1 / -1",
              padding: "24px",
              background: "#fff5f5",
              border: "1px solid #fed7d7",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 800, color: "#991b1b" }}>
                  Vùng nguy hiểm: Xóa tài khoản nhân sự
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#742a2a" }}>
                  Hành động này sẽ xóa vĩnh viễn tài khoản nhân sự khỏi hệ thống và vô hiệu hóa mọi phiên đăng nhập.
                </p>
              </div>
              <button
                type="button"
                className="primary-button"
                style={{ background: "#dc2626", borderColor: "#dc2626" }}
                disabled={loading || isSelf}
                onClick={() => setShowDeleteConfirm(true)}
              >
                {isSelf ? "KHÔNG THỂ XÓA CHÍNH MÌNH" : "XÓA TÀI KHOẢN"}
              </button>
            </div>

            {showDeleteConfirm && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  background: "#ffffff",
                  borderRadius: "8px",
                  border: "2px solid #ef4444",
                }}
              >
                <p style={{ margin: "0 0 12px", fontWeight: 700, color: "#991b1b", fontSize: "0.95rem" }}>
                  ⚠️ Xác nhận xóa: Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản &ldquo;{user.fullName}&rdquo; ({user.username})?
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="primary-button"
                    style={{ background: "#b91c1c", borderColor: "#b91c1c" }}
                    onClick={handleDeleteUser}
                    disabled={loading}
                  >
                    {loading ? "ĐANG XÓA…" : "TÔI CHẮC CHẮN, XÓA VĨNH VIỄN"}
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={loading}
                  >
                    HỦY BỎ
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
