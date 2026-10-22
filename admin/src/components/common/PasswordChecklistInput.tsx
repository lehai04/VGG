"use client";

import React, { useState, useEffect } from "react";
import { checkPasswordCriteria, PasswordCriteria } from "@/lib/validation/rules";

interface PasswordChecklistInputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, isValid: boolean) => void;
  wrapperClassName?: string;
  autoComplete?: string;
  forceTouched?: boolean;
}

export function PasswordChecklistInput({
  label = "Mật khẩu",
  name = "password",
  placeholder = "Nhập mật khẩu...",
  required = true,
  value: controlledValue,
  defaultValue = "",
  onChange,
  wrapperClassName = "field",
  autoComplete = "new-password",
  forceTouched = false,
}: PasswordChecklistInputProps) {
  const [innerValue, setInnerValue] = useState<string>(
    controlledValue !== undefined ? controlledValue : defaultValue
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(forceTouched);

  const currentValue = controlledValue !== undefined ? controlledValue : innerValue;
  const criteria: PasswordCriteria = checkPasswordCriteria(currentValue);

  useEffect(() => {
    if (forceTouched) {
      setIsTouched(true);
    }
  }, [forceTouched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (controlledValue === undefined) {
      setInnerValue(val);
    }
    setIsTouched(true);
    const updatedCriteria = checkPasswordCriteria(val);
    onChange?.(val, updatedCriteria.isValid);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const showSuccess = isTouched && criteria.isValid;
  const showError = isTouched && !criteria.isValid && currentValue.length > 0;

  let borderColor = "#cbd5e1";
  let boxShadow = "none";

  if (showError) {
    borderColor = "#ef4444";
    boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.15)";
  } else if (showSuccess) {
    borderColor = "#10b981";
    boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.15)";
  }

  const checklist = [
    { label: "Tối thiểu 8 ký tự", met: criteria.hasMinLength },
    { label: "Bao gồm chữ cái (A-Z, a-z)", met: criteria.hasLetter },
    { label: "Bao gồm chữ số (0-9)", met: criteria.hasNumber },
    { label: "Bao gồm ký tự đặc biệt (!@#$%...)", met: criteria.hasSpecial },
  ];

  return (
    <div className={wrapperClassName} style={{ display: "flex", flexDirection: "column" }}>
      {label && (
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </span>
      )}

      <div style={{ position: "relative", width: "100%" }}>
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "9px 12px",
            paddingRight: showSuccess ? "70px" : "44px",
            borderRadius: "8px",
            border: `1.5px solid ${borderColor}`,
            boxShadow,
            fontSize: "0.88rem",
            color: "#0f172a",
            outline: "none",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          }}
        />

        {/* Dấu tích xanh khi thỏa mãn toàn bộ tiêu chí */}
        {showSuccess && (
          <div
            title="Mật khẩu đạt độ mạnh tiêu chuẩn"
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
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}

        {/* Nút Hiện/Ẩn mật khẩu */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
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
            fontSize: "0.78rem",
            color: "#64748b",
            fontWeight: 600,
          }}
        >
          {showPassword ? "Ẩn" : "Hiện"}
        </button>
      </div>

      {/* Thông báo lỗi khi sai định dạng */}
      {showError && (
        <span
          role="alert"
          style={{
            color: "#ef4444",
            fontSize: "0.78rem",
            fontWeight: 500,
            marginTop: "5px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>⚠️</span>
          <span>Vui lòng nhập đúng định dạng: Mật khẩu chưa đáp ứng đủ các yêu cầu bảo mật bên dưới.</span>
        </span>
      )}

      {/* Checklist điều kiện thời gian thực (Realtime Criteria Checklist) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 8px",
          marginTop: "8px",
          padding: "8px 10px",
          background: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #f1f5f9",
        }}
      >
        {checklist.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.76rem",
              color: item.met ? "#15803d" : "#94a3b8",
              fontWeight: item.met ? 600 : 400,
              transition: "color 0.2s ease",
            }}
          >
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.68rem",
                background: item.met ? "#dcfce7" : "#e2e8f0",
                color: item.met ? "#16a34a" : "#94a3b8",
                flexShrink: 0,
              }}
            >
              {item.met ? "✓" : "•"}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
