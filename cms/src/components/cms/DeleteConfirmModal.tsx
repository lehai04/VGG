"use client";

import { useEffect } from "react";

type DeleteConfirmModalProps = {
  open: boolean;
  count: number;
  postTitle?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmModal({
  open,
  count,
  postTitle,
  loading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99990,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        padding: "16px",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-confirm-title"
      onClick={() => {
        if (!loading) onCancel();
      }}
    >
      <div
        style={{
          width: "min(100%, 480px)",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "28px 24px",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.35)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon cảnh báo thùng rác đỏ */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(220, 38, 38, 0.25)",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <div>
          <h3
            id="delete-confirm-title"
            style={{
              margin: 0,
              fontSize: "var(--text-20)",
              fontWeight: 700,
              color: "#991b1b",
            }}
          >
            Xác nhận xóa vĩnh viễn?
          </h3>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: "var(--text-14)",
              color: "#475569",
              lineHeight: 1.55,
            }}
          >
            {count > 1 ? (
              <>
                Bạn có chắc chắn muốn xóa vĩnh viễn <strong>{count} bài viết đã chọn</strong> không?
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn xóa vĩnh viễn bài viết:
                <br />
                <strong style={{ color: "#0f172a" }}>&ldquo;{postTitle || "bài viết này"}&rdquo;</strong>?
              </>
            )}
            <br />
            <span style={{ color: "#dc2626", fontWeight: 600, display: "inline-block", marginTop: "6px" }}>
              ⚠️ Thao tác này sẽ xóa hoàn toàn khỏi cơ sở dữ liệu và không thể hoàn tác!
            </span>
          </p>
        </div>

        {/* Nút hành động */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            width: "100%",
            marginTop: "8px",
          }}
        >
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "11px 16px",
              backgroundColor: "#f1f5f9",
              color: "#334155",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              fontSize: "var(--text-14)",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "11px 16px",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: "var(--text-14)",
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {loading ? "Đang xóa..." : "Xóa vĩnh viễn"}
          </button>
        </div>
      </div>
    </div>
  );
}
