"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";

interface AccountProfileProps {
  admin: {
    id: string;
    username: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    status: string;
    lastLoginAt: Date | null;
    role: {
      name: string;
      code: string;
      permissions: Array<{
        permission: {
          code: string;
          description: string | null;
        };
      }>;
    };
  };
}

export function AccountProfileView({ admin }: AccountProfileProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");

  async function handleUpdateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEditLoading(true);
    setEditMessage("");
    setEditSuccess(false);

    const data = new FormData(event.currentTarget);
    const body = {
      fullName: String(data.get("fullName") || "").trim(),
      username: String(data.get("username") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
    };

    try {
      const response = await fetch("/api/admin/auth/me", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        setEditSuccess(false);
        return setEditMessage(result.message || "Không thể cập nhật thông tin.");
      }
      setEditSuccess(true);
      setEditMessage(result.message || "Cập nhật thông tin tài khoản thành công.");
      setTimeout(() => {
        setIsEditing(false);
        router.refresh();
      }, 1200);
    } catch {
      setEditSuccess(false);
      setEditMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    } finally {
      setEditLoading(false);
    }
  }

  async function handleSendResetLink() {
    if (!admin.email) {
      return setForgotMsg("Tài khoản chưa được thiết lập Email VLU. Vui lòng liên hệ Super Admin.");
    }
    setForgotLoading(true);
    setForgotMsg("");
    try {
      const response = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: admin.email }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) {
        return setForgotMsg(result.message || "Không thể gửi yêu cầu đặt lại mật khẩu.");
      }
      setForgotMsg(result.message || "Yêu cầu đã được tiếp nhận. Hướng dẫn đặt lại mật khẩu đã được gửi tới email của bạn.");
    } catch {
      setForgotMsg("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setForgotLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px", marginTop: "24px" }}>
      {/* CỘT 1: THÔNG TIN TÀI KHOẢN & PHÂN QUYỀN */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <section className="admin-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #e4e4e7" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#b91c1c", color: "#fff", display: "grid", placeItems: "center", fontSize: "1.4rem", fontWeight: 800 }}>
                {admin.fullName.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#18181b" }}>{admin.fullName}</h2>
                <span style={{ display: "inline-block", marginTop: "4px", padding: "3px 10px", borderRadius: "12px", background: "#fee2e2", color: "#991b1b", fontSize: "0.78rem", fontWeight: 700 }}>
                  {admin.role.name}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="secondary-button"
              style={{ fontSize: "0.82rem", padding: "6px 12px" }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "HỦY SỬA" : "CHỈNH SỬA"}
            </button>
          </div>

          {isEditing ? (
            <form className="form-stack" onSubmit={handleUpdateProfile}>
              <h3 style={{ margin: "0 0 12px", fontSize: "1rem", fontWeight: 800, color: "#b91c1c" }}>
                Cập nhật thông tin tài khoản
              </h3>

              <label className="field">
                Họ và tên *
                <input
                  name="fullName"
                  defaultValue={admin.fullName}
                  minLength={2}
                  maxLength={120}
                  required
                />
              </label>

              <label className="field">
                Tên đăng nhập (Username) *
                <input
                  name="username"
                  defaultValue={admin.username}
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
                  defaultValue={admin.email || ""}
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
                  defaultValue={admin.phone || ""}
                  placeholder="0901234567"
                  maxLength={30}
                />
              </label>

              {editMessage && (
                <p
                  className={`form-message${editSuccess ? " success" : ""}`}
                  role="alert"
                >
                  {editMessage}
                </p>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button className="primary-button" type="submit" disabled={editLoading}>
                  {editLoading ? "ĐANG LƯU…" : "LƯU THAY ĐỔI"}
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setIsEditing(false)}
                  disabled={editLoading}
                >
                  HỦY
                </button>
              </div>
            </form>
          ) : (
            <div className="form-stack">
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700, letterSpacing: "0.05em" }}>Tên đăng nhập</span>
                <p style={{ margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 600, color: "#27272a" }}>{admin.username}</p>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700, letterSpacing: "0.05em" }}>Email Văn Lang (VLU)</span>
                <p style={{ margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 600, color: admin.email ? "#b91c1c" : "#a1a1aa" }}>
                  {admin.email || "Chưa thiết lập email VLU"}
                </p>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700, letterSpacing: "0.05em" }}>Số điện thoại</span>
                <p style={{ margin: "4px 0 0", fontSize: "0.95rem", fontWeight: 500, color: "#27272a" }}>{admin.phone || "—"}</p>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700, letterSpacing: "0.05em" }}>Trạng thái tài khoản</span>
                <p style={{ margin: "4px 0 0", fontSize: "0.9rem", fontWeight: 700, color: admin.status === "ACTIVE" ? "#15803d" : "#b91c1c" }}>
                  ● {admin.status === "ACTIVE" ? "Đang hoạt động" : "Tạm khóa"}
                </p>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#71717a", fontWeight: 700, letterSpacing: "0.05em" }}>Đăng nhập gần nhất</span>
                <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#52525b" }}>
                  {admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleString("vi-VN") : "Lần đầu đăng nhập"}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* CHỨC NĂNG & QUYỀN HẠN ĐƯỢC CHỈ ĐỊNH */}
        <section className="admin-card" style={{ padding: "24px" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "0.95rem", fontWeight: 800, color: "#18181b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Quyền hạn phân quyền
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {admin.role.code === "SUPER_ADMIN" ? (
              <span style={{ padding: "6px 12px", background: "#fee2e2", color: "#991b1b", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 700 }}>
                Toàn quyền Quản trị Tối cao (Super Admin)
              </span>
            ) : admin.role.permissions.length > 0 ? (
              admin.role.permissions.map((p) => (
                <span key={p.permission.code} style={{ padding: "5px 10px", background: "#f4f4f5", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 600, color: "#3f3f46", border: "1px solid #e4e4e7" }}>
                  {p.permission.description || p.permission.code}
                </span>
              ))
            ) : (
              <span style={{ fontSize: "0.85rem", color: "#71717a" }}>Toàn quyền quản lý nội dung, tài nguyên & tư vấn (QTV Cấp 2)</span>
            )}
          </div>
        </section>
      </div>

      {/* CỘT 2: THAY ĐỔI MẬT KHẨU & QUÊN MẬT KHẨU */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <section className="admin-card" style={{ padding: "28px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#18181b" }}>Thay đổi mật khẩu</h3>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#71717a" }}>
              Mật khẩu mới yêu cầu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và chữ số.
            </p>
          </div>
          <ChangePasswordForm />
        </section>

        <section className="admin-card" style={{ padding: "24px", background: "#fafafa", border: "1px solid #e4e4e7" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "#18181b" }}>Quên mật khẩu?</h3>
            <span style={{ fontSize: "0.75rem", padding: "2px 8px", background: "#fee2e2", color: "#991b1b", borderRadius: "10px", fontWeight: 700 }}>Bảo mật</span>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: "0.85rem", color: "#52525b", lineHeight: 1.5 }}>
            Nếu bạn cần liên kết khôi phục gửi về email Văn Lang ({admin.email || "chưa cấu hình"}), bấm nút bên dưới:
          </p>
          <button
            type="button"
            className="secondary-button"
            style={{ width: "100%", padding: "10px", fontSize: "0.85rem", cursor: "pointer" }}
            onClick={handleSendResetLink}
            disabled={forgotLoading || !admin.email}
          >
            {forgotLoading ? "ĐANG XỬ LÝ…" : "GỬI LIÊN KẾT ĐẶT LẠI MẬT KHẨU QUA EMAIL VLU"}
          </button>

          {forgotMsg && (
            <div style={{ marginTop: "14px", padding: "12px", borderRadius: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", fontSize: "0.85rem" }}>
              <p style={{ margin: 0, lineHeight: 1.4 }}>{forgotMsg}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
