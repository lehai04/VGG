"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  validatePhone,
  validateUsername,
  validateAdminEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/validation/rules";
import { ValidatedInput } from "@/components/common/ValidatedInput";
import { PasswordChecklistInput } from "@/components/common/PasswordChecklistInput";

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
  const [editRole, setEditRole] = useState(user.role.code);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // States cho form chỉnh sửa
  const [editFullName, setEditFullName] = useState(user.fullName);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editEmail, setEditEmail] = useState(user.email || "");
  const [editPhone, setEditPhone] = useState(user.phone || "");
  const [editForceTouched, setEditForceTouched] = useState(false);

  // States cho form cấp lại mật khẩu
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [resetForceTouched, setResetForceTouched] = useState(false);

  const isSelf = user.id === currentAdminId;

  async function handleUpdateInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEditForceTouched(true);
    setMessage("");
    setIsSuccess(false);

    const uRes = validateUsername(editUsername);
    if (!uRes.isValid) {
      setIsSuccess(false);
      return setMessage(uRes.message);
    }

    const emailCheck = validateAdminEmail(editEmail, editRole);
    if (!emailCheck.isValid) {
      setIsSuccess(false);
      return setMessage(emailCheck.message);
    }

    if (editPhone) {
      const pRes = validatePhone(editPhone);
      if (!pRes.isValid) {
        setIsSuccess(false);
        return setMessage(pRes.message);
      }
    }

    setLoading(true);
    const body = {
      fullName: editFullName.trim(),
      username: editUsername.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      roleCode: editRole,
    };

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json()) as { message?: string };
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
    setResetForceTouched(true);
    setMessage("");

    const pRes = validatePassword(resetPassword);
    if (!pRes.isValid) {
      setIsSuccess(false);
      return setMessage(pRes.message);
    }

    const cpRes = validateConfirmPassword(resetPassword, resetConfirmPassword);
    if (!cpRes.isValid) {
      setIsSuccess(false);
      return setMessage(cpRes.message);
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${user.id}/reset-password`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          password: resetPassword,
          confirmPassword: resetConfirmPassword,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setIsSuccess(false);
        return setMessage(result.message || "Không thể reset mật khẩu.");
      }
      setIsSuccess(true);
      setMessage(result.message || "Đã cấp lại mật khẩu tạm thời thành công.");
      setResetPassword("");
      setResetConfirmPassword("");
      setResetForceTouched(false);
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
        <div className="account-card-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
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
            <ValidatedInput
              label="Họ và tên"
              name="fullName"
              value={editFullName}
              onChange={(val) => setEditFullName(val)}
              required
              forceTouched={editForceTouched}
              validator={(val) =>
                val.trim().length >= 2
                  ? { isValid: true, message: "" }
                  : { isValid: false, message: "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)." }
              }
            />

            <ValidatedInput
              label="Tên đăng nhập"
              name="username"
              value={editUsername}
              onChange={(val) => setEditUsername(val)}
              required
              forceTouched={editForceTouched}
              validator={validateUsername}
              hint="Tối thiểu 6 ký tự, không chứa dấu cách"
            />

            <div className="full">
              <ValidatedInput
                label={
                  editRole === "ADMIN_LEVEL_3"
                    ? "Email CTV Sinh viên"
                    : editRole === "ADMIN_LEVEL_2"
                    ? "Email Nhân viên Văn Lang (VLU)"
                    : "Email Quản trị viên (VLU)"
                }
                name="email"
                type="email"
                value={editEmail}
                onChange={(val) => setEditEmail(val)}
                placeholder={
                  editRole === "ADMIN_LEVEL_3"
                    ? "ha.221a01001@vanlanguni.vn"
                    : "ha.nt@vlu.edu.vn"
                }
                required
                forceTouched={editForceTouched}
                validator={(val) => validateAdminEmail(val, editRole)}
                hint={
                  editRole === "ADMIN_LEVEL_3"
                    ? "Cấu trúc: ten.mssv@vanlanguni.vn (Ví dụ: ha.221a01001@vanlanguni.vn)"
                    : "Cấu trúc: ten.holot@vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn)"
                }
              />
            </div>

            <ValidatedInput
              label="Số điện thoại"
              name="phone"
              type="tel"
              value={editPhone}
              onChange={(val) => setEditPhone(val)}
              placeholder="0901234567"
              forceTouched={editForceTouched}
              validator={(val) => validatePhone(val, false)}
              hint="Gồm 10 chữ số tự nhiên bắt đầu bằng số 0"
            />

            <label className="field full">
              Vai trò / Cấp bậc quản trị *
              <select
                name="roleCode"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                required
                disabled={!isSuperAdmin}
              >
                <option value="ADMIN_LEVEL_2">QTV Cấp 2 – Nhân viên trường (Nội dung, Tài nguyên, Tư vấn)</option>
                <option value="ADMIN_LEVEL_3">QTV Cấp 3 – CTV Sinh viên (Nội dung, Tài nguyên, Tư vấn)</option>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "18px", overflowWrap: "anywhere" }}>
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
              <p style={{ margin: "4px 0 0" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "3px 8px",
                    borderRadius: "12px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    background:
                      user.role.level === 1
                        ? "#fee2e2"
                        : user.role.level === 2
                        ? "#dbeafe"
                        : "#e0f2fe",
                    color:
                      user.role.level === 1
                        ? "#991b1b"
                        : user.role.level === 2
                        ? "#1e40af"
                        : "#0369a1",
                  }}
                >
                  {user.role.name}
                </span>
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
        <div className="account-actions-grid" style={{ display: "grid", gridTemplateColumns: "var(--account-actions-columns, repeat(auto-fit, minmax(320px, 1fr)))", gap: "24px" }}>
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
              <PasswordChecklistInput
                label="Mật khẩu mới"
                name="password"
                value={resetPassword}
                onChange={(val) => setResetPassword(val)}
                placeholder="Nhập mật khẩu mới..."
                required
                forceTouched={resetForceTouched}
              />

              <ValidatedInput
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                type="password"
                value={resetConfirmPassword}
                onChange={(val) => setResetConfirmPassword(val)}
                placeholder="Nhập lại mật khẩu mới..."
                required
                forceTouched={resetForceTouched}
                validator={(val) => validateConfirmPassword(resetPassword, val)}
              />

              <button
                type="submit"
                className="secondary-button danger-button"
                style={{ width: "100%", padding: "10px", marginTop: "6px" }}
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
            <div className="account-card-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                <div className="account-card-heading" style={{ display: "flex", gap: "10px" }}>
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
