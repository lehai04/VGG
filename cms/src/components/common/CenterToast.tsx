"use client";

import { CircleHelp } from "lucide-react";
import { useEffect, useRef } from "react";

export type CenterToastProps = {
  open: boolean;
  type?: "success" | "error" | "info" | "confirm";
  title?: string;
  message: string;
  onClose: () => void;
  autoCloseMs?: number;
  onConfirm?: () => void;
  confirmLabel?: string;
};

export function CenterToast({
  open,
  type = "success",
  title,
  message,
  onClose,
  autoCloseMs = 2600,
  onConfirm,
  confirmLabel = "Xác nhận",
}: CenterToastProps) {
  const isConfirm = type === "confirm";
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !isConfirm || !dialog) return;
    dialog.showModal();
    return () => dialog.close();
  }, [open, isConfirm]);

  useEffect(() => {
    if (!open || isConfirm) return;
    const timer = setTimeout(() => {
      onClose();
    }, autoCloseMs);
    return () => clearTimeout(timer);
  }, [open, isConfirm, onClose, autoCloseMs]);

  if (!open) return null;

  const isSuccess = type === "success";
  const isError = type === "error";

  const content = (
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
      role={isConfirm ? undefined : "status"}
      aria-live={isConfirm ? undefined : "polite"}
      onClick={isConfirm ? undefined : onClose}
    >
      <div
        style={{
          width: "min(100%, 460px)",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "26px 24px",
          textAlign: "center",
          boxShadow: isConfirm
            ? "0 25px 50px -12px rgba(202, 138, 4, 0.32), 0 0 0 1.5px #f2ce69"
            : isSuccess
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
            backgroundColor: isConfirm ? "#fef3c7" : isSuccess ? "#ecfdf5" : isError ? "#fef2f2" : "#f1f5f9",
            color: isConfirm ? "#925806" : isSuccess ? "#10b981" : isError ? "#ef4444" : "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isSuccess ? "0 4px 14px rgba(16, 185, 129, 0.25)" : "none",
          }}
        >
          {isConfirm && <CircleHelp size={34} strokeWidth={2.3} aria-hidden="true" />}
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
          {!isConfirm && !isSuccess && !isError && (
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
            id={isConfirm ? "center-confirm-title" : undefined}
            style={{
              margin: 0,
              fontSize: "var(--text-20)",
              fontWeight: 700,
              color: isConfirm ? "#754705" : isSuccess ? "#065f46" : isError ? "#991b1b" : "#0f172a",
            }}
          >
            {title || (isSuccess ? "Thành công!" : isError ? "Có lỗi xảy ra" : "Thông báo")}
          </h3>
          <p
            id={isConfirm ? "center-confirm-description" : undefined}
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

        {isConfirm ? (
          <div className="center-confirm-actions">
            <button type="button" autoFocus onClick={onClose}>Quay lại</button>
            <button type="button" onClick={onConfirm}>{confirmLabel}</button>
          </div>
        ) : <button
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
        </button>}
      </div>

      <style jsx global>{`
        .center-confirm-dialog::backdrop { background: transparent; }
        .center-confirm-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin-top: 6px; }
        .center-confirm-actions button {
          padding: 8px 19px; border: 1px solid #dbe1ea; border-radius: 999px;
          background: #fff; color: #334155; font-size: var(--text-14); font-weight: 600; cursor: pointer;
        }
        .center-confirm-actions button:last-child { background: #fde68a; border-color: #f2ce69; color: #633b04; }
        .center-confirm-actions button:hover { filter: brightness(0.96); }
        .center-confirm-actions button:focus-visible { outline: 2px solid #925806; outline-offset: 3px; }
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
  if (!isConfirm) return content;
  return (
    <dialog
      ref={dialogRef}
      className="center-confirm-dialog"
      aria-labelledby="center-confirm-title"
      aria-describedby="center-confirm-description"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", maxWidth: "none", maxHeight: "none", margin: 0, border: 0, padding: 0, background: "transparent" }}
    >
      {content}
    </dialog>
  );
}
