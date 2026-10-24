"use client";

import React, { useState, useEffect } from "react";
import { ValidationResult } from "@/lib/validation/rules";

interface ValidatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  hint?: string;
  validator?: (value: string) => ValidationResult;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, isValid: boolean) => void;
  validateTrigger?: "both" | "blur" | "change";
  wrapperClassName?: string;
  forceTouched?: boolean;
}

export function ValidatedInput({
  label,
  hint,
  validator,
  value: controlledValue,
  defaultValue = "",
  onChange,
  validateTrigger = "both",
  wrapperClassName = "field",
  forceTouched = false,
  type = "text",
  placeholder,
  required,
  style,
  ...rest
}: ValidatedInputProps) {
  const [innerValue, setInnerValue] = useState<string>(
    controlledValue !== undefined ? controlledValue : defaultValue
  );
  const [isTouched, setIsTouched] = useState<boolean>(forceTouched);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const currentValue = controlledValue !== undefined ? controlledValue : innerValue;

  useEffect(() => {
    if (forceTouched) {
      setIsTouched(true);
    }
  }, [forceTouched]);

  // Kiểm tra tính hợp lệ
  useEffect(() => {
    if (!validator) {
      setIsValid(true);
      setErrorMsg("");
      return;
    }

    // Nếu trường không bắt buộc và đang trống
    if (!required && !currentValue) {
      setIsValid(true);
      setErrorMsg("");
      return;
    }

    const result = validator(currentValue);
    setIsValid(result.isValid);
    setErrorMsg(result.isValid ? "" : result.message);
  }, [currentValue, validator, required]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (controlledValue === undefined) {
      setInnerValue(newVal);
    }

    // Khi người dùng gõ, nếu đã touched hoặc trigger là change/both thì đánh dấu touched
    if (validateTrigger === "change" || isTouched) {
      setIsTouched(true);
    }

    if (validator) {
      const res = validator(newVal);
      onChange?.(newVal, res.isValid);
    } else {
      onChange?.(newVal, true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  const showSuccess = isTouched && isValid && currentValue.length > 0;
  const showError = isTouched && !isValid;

  // Tính toán màu viền
  let borderColor = "#cbd5e1";
  let boxShadow = "none";

  if (showError) {
    borderColor = "#ef4444";
    boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.15)";
  } else if (showSuccess) {
    borderColor = "#10b981";
    boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.15)";
  }

  return (
    <div className={wrapperClassName} style={{ display: "flex", flexDirection: "column" }}>
      {label && (
        <span style={{ fontSize: "var(--text-14)", fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </span>
      )}

      <div style={{ position: "relative", width: "100%" }}>
        <input
          {...rest}
          type={type}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "9px 12px",
            paddingRight: showSuccess ? "38px" : "12px",
            borderRadius: "8px",
            border: `1.5px solid ${borderColor}`,
            boxShadow,
            fontSize: "var(--text-14)",
            color: "#0f172a",
            outline: "none",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            ...style,
          }}
        />

        {/* Dấu tích xanh khi nhập đúng định dạng */}
        {showSuccess && (
          <div
            title="Đúng định dạng"
            style={{
              position: "absolute",
              right: "12px",
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
      </div>

      {/* Thông báo lỗi đỏ dưới ô text khi sai định dạng */}
      {showError && (
        <span
          role="alert"
          style={{
            color: "#ef4444",
            fontSize: "var(--text-12)",
            fontWeight: 500,
            marginTop: "5px",
            lineHeight: 1.35,
            display: "flex",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <span style={{ flexShrink: 0 }}>⚠️</span>
          <span>{errorMsg}</span>
        </span>
      )}

      {/* Hint phụ trợ khi chưa có lỗi */}
      {!showError && hint && (
        <small style={{ color: "#71717a", marginTop: "4px", fontSize: "var(--text-12)" }}>
          {hint}
        </small>
      )}
    </div>
  );
}
