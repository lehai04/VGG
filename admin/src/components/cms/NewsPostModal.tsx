"use client";

import { useEffect } from "react";
import Link from "next/link";

type NewsPostDetail = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: string;
  publishedAt: string | null;
  authorName: string | null;
  updatedAt: string;
  author?: { fullName: string };
};

type NewsPostModalProps = {
  post: NewsPostDetail | null;
  open: boolean;
  categoryLabel: (code: string) => string;
  onClose: () => void;
  onEdit: (post: NewsPostDetail) => void;
};

export function NewsPostModal({
  post,
  open,
  categoryLabel,
  onClose,
  onEdit,
}: NewsPostModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open || !post) return null;

  const isPublished = post.status === "PUBLISHED";
  const authorDisplay = post.authorName || post.author?.fullName || "Chưa cập nhật";
  const dateDisplay = post.publishedAt
    ? new Date(`${post.publishedAt}T00:00:00`).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Chưa chọn ngày";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99980,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        padding: "20px",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-detail-title"
      onClick={onClose}
    >
      <div
        style={{
          width: "min(100%, 820px)",
          maxHeight: "90vh",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.4)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 24px",
            borderBottom: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "var(--text-12)",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#db2639",
              }}
            >
              CHI TIẾT BÀI VIẾT
            </span>
            <span
              style={{
                fontSize: "var(--text-12)",
                padding: "3px 10px",
                borderRadius: "999px",
                fontWeight: 600,
                backgroundColor: isPublished ? "#dcfce7" : "#fef3c7",
                color: isPublished ? "#15803d" : "#b45309",
              }}
            >
              {isPublished ? "✓ Công khai" : post.status === "DRAFT" ? "Bản nháp" : "Lưu trữ"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "var(--text-16)",
            }}
          >
            ✕
          </button>
        </div>

        {/* Nội dung chi tiết cuộn */}
        <div
          style={{
            padding: "24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Ảnh đại diện 16:9 */}
          {post.coverImage ? (
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "14px",
                overflow: "hidden",
                backgroundColor: "#f1f5f9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                position: "relative",
              }}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  backgroundColor: "rgba(15, 23, 42, 0.75)",
                  color: "#ffffff",
                  fontSize: "var(--text-10)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  backdropFilter: "blur(4px)",
                }}
              >
                16:9 (Chuẩn 1024 × 576 px)
              </span>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "14px",
                backgroundColor: "#f8fafc",
                border: "2px dashed #cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                fontSize: "var(--text-14)",
              }}
            >
              Chưa có ảnh đại diện
            </div>
          )}

          {/* Thông tin metadata */}
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  fontSize: "var(--text-12)",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "6px",
                }}
              >
                {categoryLabel(post.category)}
              </span>
              <span style={{ fontSize: "var(--text-12)", color: "#64748b" }}>
                Tác giả: <strong style={{ color: "#1e293b" }}>{authorDisplay}</strong>
              </span>
              <span style={{ fontSize: "var(--text-12)", color: "#64748b" }}>
                Ngày đăng: <strong style={{ color: "#1e293b" }}>{dateDisplay}</strong>
              </span>
            </div>

            <h2
              id="news-detail-title"
              style={{
                margin: "8px 0 12px",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.35,
              }}
            >
              {post.title}
            </h2>

            {post.excerpt && (
              <div
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#f8fafc",
                  borderLeft: "4px solid #db2639",
                  borderRadius: "4px 8px 8px 4px",
                  color: "#334155",
                  fontSize: "var(--text-14)",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                }}
              >
                {post.excerpt}
              </div>
            )}
          </div>

          {/* Nội dung chi tiết bài viết */}
          <div>
            <h4 style={{ margin: "0 0 8px", fontSize: "var(--text-12)", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
              Nội dung chi tiết
            </h4>
            <div
              style={{
                fontSize: "var(--text-14)",
                lineHeight: 1.7,
                color: "#1e293b",
                maxHeight: "300px",
                overflowY: "auto",
                padding: "16px",
                backgroundColor: "#fafafa",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>

        {/* Footer Modal */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {isPublished && (
              <a
                href={`/news/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "var(--text-12)",
                  fontWeight: 600,
                  color: "#2563eb",
                  textDecoration: "none",
                }}
              >
                <span>Xem trên website</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "9px 18px",
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "var(--text-14)",
                fontWeight: 600,
                color: "#475569",
                cursor: "pointer",
              }}
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(post);
              }}
              style={{
                padding: "9px 18px",
                backgroundColor: "#db2639",
                border: "none",
                borderRadius: "8px",
                fontSize: "var(--text-14)",
                fontWeight: 600,
                color: "#ffffff",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Chỉnh sửa bài viết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
