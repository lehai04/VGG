"use client";

import React from "react";
import Link from "next/link";

export interface NotificationDetail {
  id: string;
  action: string;
  actorName: string;
  actorEmail?: string | null;
  actorRole?: string | null;
  targetName?: string | null;
  targetEmail?: string | null;
  targetRole?: string | null;
  title: string;
  icon: string;
  category: string;
  createdAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: any;
}

interface NotificationDetailModalProps {
  notification: NotificationDetail | null;
  onClose: () => void;
}

function formatExactDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(d);
  } catch {
    return isoString;
  }
}

function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 10) return "vừa xong";
  if (seconds < 60) return `${seconds} giây trước`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

function getCategoryBadge(category: string): { label: string; bg: string; color: string } {
  switch (category) {
    case "users":
      return { label: "Quản trị viên & Nhân sự", bg: "#f3e8ff", color: "#7c3aed" };
    case "cms":
      return { label: "Nội dung & Tin tức", bg: "#dbeafe", color: "#2563eb" };
    case "consultations":
      return { label: "Tuyển sinh & Tư vấn", bg: "#dcfce7", color: "#15803d" };
    case "security":
      return { label: "Bảo mật & Xác thực", bg: "#fee2e2", color: "#b91c1c" };
    case "auth":
      return { label: "Phiên đăng nhập", bg: "#fef3c7", color: "#b45309" };
    default:
      return { label: "Hệ thống", bg: "#f4f4f5", color: "#52525b" };
  }
}

function getQuickLink(category: string): { text: string; href: string } | null {
  switch (category) {
    case "users":
      return { text: "Đi tới Quản lý nhân sự", href: "/admin/users" };
    case "cms":
      return { text: "Đi tới Quản lý tin tức", href: "/admin/news" };
    case "consultations":
      return { text: "Đi tới Lịch tư vấn", href: "/admin/consultations" };
    default:
      return null;
  }
}

export function NotificationDetailModal({ notification, onClose }: NotificationDetailModalProps) {
  if (!notification) return null;

  const categoryInfo = getCategoryBadge(notification.category);
  const quickLink = getQuickLink(notification.category);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "580px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          animation: "modalFadeIn 0.2s ease-out",
        }}
      >
        {/* Header Modal */}
        <div
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            background: "#f8fafc",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span
              style={{
                fontSize: "1.6rem",
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                border: "1px solid #e2e8f0",
              }}
            >
              {notification.icon}
            </span>
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  backgroundColor: categoryInfo.bg,
                  color: categoryInfo.color,
                  marginBottom: "4px",
                }}
              >
                {categoryInfo.label}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  lineHeight: 1.3,
                }}
              >
                Chi tiết thông báo hoạt động
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.2rem",
              color: "#64748b",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "6px",
            }}
            title="Đóng"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Action Title Card */}
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              fontSize: "0.92rem",
              fontWeight: 600,
              color: "#1e293b",
              lineHeight: 1.45,
            }}
          >
            {notification.title}
          </div>

          {/* Section: Người thực hiện & Đối tượng */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #f1f5f9",
                background: "#ffffff",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>
                Người thực hiện
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>
                {notification.actorName}
              </div>
              {notification.actorRole && (
                <div style={{ fontSize: "0.78rem", color: "#7c3aed", fontWeight: 600, marginTop: "2px" }}>
                  {notification.actorRole}
                </div>
              )}
              {notification.actorEmail && (
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px", wordBreak: "break-all" }}>
                  {notification.actorEmail}
                </div>
              )}
            </div>

            <div
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #f1f5f9",
                background: "#ffffff",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" }}>
                Đối tượng tác động
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>
                {notification.targetName || "Hệ thống chung"}
              </div>
              {notification.targetRole && (
                <div style={{ fontSize: "0.78rem", color: "#2563eb", fontWeight: 600, marginTop: "2px" }}>
                  {notification.targetRole}
                </div>
              )}
              {notification.targetEmail && (
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px", wordBreak: "break-all" }}>
                  {notification.targetEmail}
                </div>
              )}
            </div>
          </div>

          {/* Section: Thời gian & Mạng */}
          <div
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #f1f5f9",
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
              Thời gian & Mạng kết nối
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
              <span style={{ color: "#64748b" }}>Thời gian ghi nhận:</span>
              <strong style={{ color: "#0f172a" }}>
                {formatExactDate(notification.createdAt)} ({timeAgo(notification.createdAt)})
              </strong>
            </div>
            {notification.ipAddress && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b" }}>Địa chỉ IP:</span>
                <code style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontSize: "0.82rem", color: "#334155" }}>
                  {notification.ipAddress}
                </code>
              </div>
            )}
            {notification.userAgent && (
              <div style={{ marginTop: "4px" }}>
                <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block", marginBottom: "2px" }}>Thiết bị / Trình duyệt:</span>
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: "#475569",
                    background: "#f8fafc",
                    padding: "6px 8px",
                    borderRadius: "6px",
                    wordBreak: "break-word",
                    fontFamily: "monospace",
                  }}
                >
                  {notification.userAgent}
                </div>
              </div>
            )}
          </div>

          {/* Section: Dữ liệu Metadata (nếu có) */}
          {notification.metadata && Object.keys(notification.metadata).length > 0 && (
            <div
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #f1f5f9",
                background: "#ffffff",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }}>
                Dữ liệu thay đổi / Thông số liên quan
              </div>
              <div
                style={{
                  background: "#0f172a",
                  color: "#e2e8f0",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontFamily: "monospace",
                  maxHeight: "180px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {JSON.stringify(notification.metadata, null, 2)}
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div
          style={{
            padding: "14px 22px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc",
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        >
          {quickLink ? (
            <Link
              href={quickLink.href}
              onClick={onClose}
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#2563eb",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {quickLink.text} →
            </Link>
          ) : (
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Mã sự kiện: #{notification.id.slice(-8)}</span>
          )}

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "7px 16px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#334155",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
