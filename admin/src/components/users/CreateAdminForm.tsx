"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  validatePhone,
  validateUsername,
  validateAdminEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/validation/rules";
import { ValidatedInput } from "@/components/common/ValidatedInput";
import { PasswordChecklistInput } from "@/components/common/PasswordChecklistInput";

export function CreateAdminForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState("ADMIN_LEVEL_2");

  // State các trường
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forceTouched, setForceTouched] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setForceTouched(true);
    setMessage("");

    // Validate toàn bộ các trường trước khi gửi
    const uRes = validateUsername(username);
    if (!uRes.isValid) return setMessage(uRes.message);

    const eRes = validateAdminEmail(email, selectedRole);
    if (!eRes.isValid) return setMessage(eRes.message);

    if (phone) {
      const pRes = validatePhone(phone);
      if (!pRes.isValid) return setMessage(pRes.message);
    }

    const pwRes = validatePassword(password);
    if (!pwRes.isValid) return setMessage(pwRes.message);

    const cpwRes = validateConfirmPassword(password, confirmPassword);
    if (!cpwRes.isValid) return setMessage(cpwRes.message);

    setLoading(true);
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          phone,
          roleCode: selectedRole,
          password,
          confirmPassword,
          status: data.get("status"),
          mustChangePassword: data.get("mustChangePassword") === "on",
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) return setMessage(result.message || "Không thể tạo tài khoản.");
      router.replace("/admin/users");
      router.refresh();
    } catch {
      setMessage("Không thể kết nối đến hệ thống.");
    } finally {
      setLoading(false);
    }
  }

  const getEmailFieldMeta = () => {
    if (selectedRole === "ADMIN_LEVEL_3") {
      return {
        label: "Email CTV Sinh viên Văn Lang *",
        placeholder: "ha.221a01001@vanlanguni.vn",
        hint: "Cấu trúc: ten.mssv@vanlanguni.vn (Ví dụ: ha.221a01001@vanlanguni.vn)",
      };
    }
    if (selectedRole === "ADMIN_LEVEL_2") {
      return {
        label: "Email Nhân viên Văn Lang (VLU) *",
        placeholder: "ha.nt@vlu.edu.vn",
        hint: "Cấu trúc: ten.holot@vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn)",
      };
    }
    return {
      label: "Email Quản trị viên (VLU) *",
      placeholder: "ha.nt@vlu.edu.vn",
      hint: "Cấu trúc: ten.holot@vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn)",
    };
  };

  const emailMeta = getEmailFieldMeta();

  return (
    <form className="form-grid" onSubmit={submit}>
      <ValidatedInput
        label="Họ và tên"
        name="fullName"
        value={fullName}
        onChange={(val) => setFullName(val)}
        placeholder="Nguyễn Văn A"
        required
        forceTouched={forceTouched}
        validator={(val) =>
          val.trim().length >= 2
            ? { isValid: true, message: "" }
            : { isValid: false, message: "Vui lòng nhập họ và tên (tối thiểu 2 ký tự)." }
        }
      />

      <ValidatedInput
        label="Tên đăng nhập"
        name="username"
        value={username}
        onChange={(val) => setUsername(val)}
        placeholder="admin_vgg"
        required
        forceTouched={forceTouched}
        validator={validateUsername}
        hint="Tối thiểu 6 ký tự, không chứa dấu cách"
      />

      <label className="field full">
        Vai trò phân quyền *
        <select
          name="roleCode"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          required
        >
          <option value="ADMIN_LEVEL_2">QTV Cấp 2 – Nhân viên trường (Nội dung, Tài nguyên, Tư vấn)</option>
          <option value="ADMIN_LEVEL_3">QTV Cấp 3 – CTV Sinh viên (Nội dung, Tài nguyên, Tư vấn)</option>
          <option value="SUPER_ADMIN">QTV Cấp 1 – Super Admin (Toàn quyền hệ thống & Nhân sự)</option>
        </select>
      </label>

      <div className="full">
        <ValidatedInput
          label={emailMeta.label.replace(" *", "")}
          name="email"
          type="email"
          value={email}
          onChange={(val) => setEmail(val)}
          placeholder={emailMeta.placeholder}
          required
          forceTouched={forceTouched}
          validator={(val) => validateAdminEmail(val, selectedRole)}
          hint={emailMeta.hint}
        />
      </div>

      <ValidatedInput
        label="Số điện thoại"
        name="phone"
        type="tel"
        value={phone}
        onChange={(val) => setPhone(val)}
        placeholder="0901234567"
        forceTouched={forceTouched}
        validator={(val) => validatePhone(val, false)}
        hint="Gồm 10 chữ số tự nhiên bắt đầu bằng số 0"
      />

      <label className="field">
        Trạng thái
        <select name="status">
          <option value="ACTIVE">Hoạt động</option>
          <option value="INACTIVE">Không hoạt động</option>
        </select>
      </label>

      <PasswordChecklistInput
        label="Mật khẩu tạm thời"
        name="password"
        value={password}
        onChange={(val) => setPassword(val)}
        placeholder="Nhập mật khẩu..."
        required
        forceTouched={forceTouched}
      />

      <ValidatedInput
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(val) => setConfirmPassword(val)}
        placeholder="Nhập lại mật khẩu..."
        required
        forceTouched={forceTouched}
        validator={(val) => validateConfirmPassword(password, val)}
      />

      <label className="check-field full">
        <input name="mustChangePassword" type="checkbox" defaultChecked /> Bắt buộc đổi mật khẩu khi đăng nhập lần đầu
      </label>

      {message && (
        <p className="form-message full" role="alert">
          {message}
        </p>
      )}

      <div className="full" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "ĐANG TẠO TÀI KHOẢN…" : "TẠO TÀI KHOẢN"}
        </button>
      </div>
    </form>
  );
}
