"use client";

import { useEffect } from "react";

export type CenterToastProps = {
  open: boolean;
  type?: "success" | "error" | "info";
  title?: string;
  message: string;
  onClose: () => void;
  autoCloseMs?: number;
};

export function CenterToast({
  open,
  type = "success",
  title,
  message,
  onClose,
  autoCloseMs = 2600,
}: CenterToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, autoCloseMs);
    return () => clearTimeout(timer);
  }, [open, onClose, autoCloseMs]);

  if (!open) return null;

  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        padding: "16px",
        animation: "centerToastFadeIn 0.25s ease-out forwards",
      }}
      role="status"
      aria-live="polite"
      onClick={onClose}
    >
      <div
        style={{
          width: "min(100%, 460px)",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "26px 24px",
          textAlign: "center",
          boxShadow: isSuccess
            ? "0 25px 50px -12px rgba(16, 185, 129, 0.35), 0 0 0 1.5px #10b981"
            : isError
            ? "0 25px 50px -12px rgba(239, 68, 68, 0.35), 0 0 0 1.5px #ef4444"
            : "0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1.5px #cbd5e1",
          transform: "scale(1)",
          animation: "centerToastPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon huy hiệu tròn nổi bật */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: isSuccess ? "#ecfdf5" : isError ? "#fef2f2" : "#f1f5f9",
            color: isSuccess ? "#10b981" : isError ? "#ef4444" : "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isSuccess ? "0 4px 14px rgba(16, 185, 129, 0.25)" : "none",
          }}
        >
          {isSuccess && (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
          {isError && (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          {!isSuccess && !isError && (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          )}
        </div>

        {/* Tiêu đề */}
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "var(--text-20)",
              fontWeight: 700,
              color: isSuccess ? "#065f46" : isError ? "#991b1b" : "#0f172a",
            }}
          >
            {title || (isSuccess ? "Thành công!" : isError ? "Có lỗi xảy ra" : "Thông báo")}
          </h3>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "var(--text-16)",
              color: "#334155",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: "6px",
            padding: "8px 24px",
            backgroundColor: isSuccess ? "#10b981" : isError ? "#ef4444" : "#0f172a",
            color: "#ffffff",
            border: "none",
            borderRadius: "999px",
            fontSize: "var(--text-14)",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          Đóng
        </button>
      </div>

      <style jsx global>{`
        @keyframes centerToastFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes centerToastPop {
          from { transform: scale(0.9) translateY(8px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
