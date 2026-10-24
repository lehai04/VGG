"use client";

import React, { useState, useEffect, useCallback } from "react";
import { NotificationDetail, NotificationDetailModal } from "./NotificationDetailModal";

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
    }).format(d);
  } catch {
    return isoString;
  }
}

function getCategoryBadge(category: string): { label: string; bg: string; color: string } {
  switch (category) {
    case "users":
      return { label: "Quản trị viên", bg: "#f3e8ff", color: "#7c3aed" };
    case "cms":
      return { label: "Nội dung", bg: "#dbeafe", color: "#2563eb" };
    case "consultations":
      return { label: "Lịch tư vấn", bg: "#dcfce7", color: "#15803d" };
    case "security":
      return { label: "Bảo mật", bg: "#fee2e2", color: "#b91c1c" };
    case "auth":
      return { label: "Đăng nhập", bg: "#fef3c7", color: "#b45309" };
    default:
      return { label: "Hệ thống", bg: "#f4f4f5", color: "#52525b" };
  }
}

interface NotificationsManagerProps {
  initialNotifications?: NotificationDetail[];
  initialPagination?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export function NotificationsManager({
  initialNotifications = [],
  initialPagination = { page: 1, limit: 20, totalCount: 0, totalPages: 1 },
}: NotificationsManagerProps) {
  const [notifications, setNotifications] = useState<NotificationDetail[]>(initialNotifications);
  const [pagination, setPagination] = useState(initialPagination);
  const [selectedNotification, setSelectedNotification] = useState<NotificationDetail | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchList = useCallback(
    async (pageToLoad: number, cat: string, search: string) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", pageToLoad.toString());
        params.set("limit", "20");
        if (cat !== "all") params.set("category", cat);
        if (search.trim()) params.set("search", search.trim());

        const res = await fetch(`/api/admin/notifications?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications || []);
          if (data.pagination) setPagination(data.pagination);
        }
      } catch (err) {
        console.error("Lỗi khi tải thông báo:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void fetchList(pagination.page, activeCategory, searchQuery);
  }, [pagination.page, activeCategory, fetchList]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    void fetchList(1, activeCategory, searchQuery);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Search & Category Filter Bar */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "16px 20px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
        }}
      >
        {/* Categories Tab Buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          {[
            { id: "all", label: "Tất cả" },
            { id: "users", label: "Quản trị viên" },
            { id: "cms", label: "Nội dung & Tin tức" },
            { id: "consultations", label: "Lịch tư vấn" },
            { id: "security", label: "Bảo mật & Mật khẩu" },
            { id: "auth", label: "Phiên đăng nhập" },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  padding: "7px 14px",
                  borderRadius: "8px",
                  border: isActive ? "1px solid #991b1b" : "1px solid #e2e8f0",
                  background: isActive ? "#b91c1c" : "#ffffff",
                  color: isActive ? "#ffffff" : "#475569",
                  fontSize: "var(--text-14)",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input and Refresh */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "6px" }}>
            <input
              type="text"
              placeholder="Tìm theo người thực hiện / tài khoản..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "7px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "var(--text-14)",
                outline: "none",
                minWidth: "240px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "7px 14px",
                borderRadius: "8px",
                border: "none",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "var(--text-14)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Tìm kiếm
            </button>
          </form>

          <button
            type="button"
            onClick={() => void fetchList(pagination.page, activeCategory, searchQuery)}
            title="Làm mới danh sách"
            style={{
              padding: "7px 12px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              color: "#64748b",
              fontSize: "var(--text-14)",
              cursor: "pointer",
            }}
          >
            🔄
          </button>
        </div>
      </div>

      {/* Notifications Table Card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "var(--text-16)", color: "#0f172a" }}>
            Danh sách hoạt động & thông báo ({pagination.totalCount})
          </div>
          {isLoading && <span style={{ fontSize: "var(--text-12)", color: "#64748b" }}>Đang tải dữ liệu...</span>}
        </div>

        {notifications.length === 0 ? (
          <div style={{ padding: "48px 20px", textAlign: "center", color: "#94a3b8", fontSize: "var(--text-14)" }}>
            {isLoading ? "Đang đồng bộ hoạt động..." : "Không có thông báo nào phù hợp với bộ lọc hiện tại."}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "var(--text-14)" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
                  <th style={{ padding: "12px 18px", fontWeight: 600 }}>Hành động / Nội dung</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600 }}>Phân loại</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600 }}>Người thực hiện</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600 }}>Thời gian</th>
                  <th style={{ padding: "12px 18px", fontWeight: 600, textAlign: "right" }}>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((item) => {
                  const badge = getCategoryBadge(item.category);
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        transition: "background 0.15s ease",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedNotification(item)}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
                    >
                      {/* Title & Icon */}
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span
                            style={{
                              fontSize: "var(--text-20)",
                              width: "34px",
                              height: "34px",
                              borderRadius: "8px",
                              background: "#f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {item.icon}
                          </span>
                          <span style={{ fontWeight: 600, color: "#1e293b", lineHeight: 1.4 }}>
                            {item.title}
                          </span>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td style={{ padding: "14px 18px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "var(--text-12)",
                            fontWeight: 700,
                            background: badge.bg,
                            color: badge.color,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {badge.label}
                        </span>
                      </td>

                      {/* Actor */}
                      <td style={{ padding: "14px 18px" }}>
                        <strong style={{ color: "#0f172a", display: "block" }}>{item.actorName}</strong>
                        {item.actorRole && (
                          <span style={{ fontSize: "var(--text-12)", color: "#64748b" }}>{item.actorRole}</span>
                        )}
                      </td>

                      {/* Time */}
                      <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                        <div style={{ color: "#0f172a", fontWeight: 500 }}>{timeAgo(item.createdAt)}</div>
                        <div style={{ fontSize: "var(--text-12)", color: "#94a3b8" }}>{formatExactDate(item.createdAt)}</div>
                      </td>

                      {/* Action Button */}
                      <td style={{ padding: "14px 18px", textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedNotification(item);
                          }}
                          style={{
                            padding: "5px 12px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            background: "#ffffff",
                            color: "#2563eb",
                            fontSize: "var(--text-12)",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fafafa",
            }}
          >
            <div style={{ fontSize: "var(--text-14)", color: "#64748b" }}>
              Trang {pagination.page} / {pagination.totalPages} ({pagination.totalCount} hoạt động)
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                style={{
                  padding: "5px 12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  background: pagination.page <= 1 ? "#f1f5f9" : "#ffffff",
                  color: pagination.page <= 1 ? "#94a3b8" : "#334155",
                  fontSize: "var(--text-12)",
                  cursor: pagination.page <= 1 ? "not-allowed" : "pointer",
                }}
              >
                ← Trang trước
              </button>

              <button
                type="button"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                style={{
                  padding: "5px 12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  background: pagination.page >= pagination.totalPages ? "#f1f5f9" : "#ffffff",
                  color: pagination.page >= pagination.totalPages ? "#94a3b8" : "#334155",
                  fontSize: "var(--text-12)",
                  cursor: pagination.page >= pagination.totalPages ? "not-allowed" : "pointer",
                }}
              >
                Trang sau →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal chi tiết */}
      <NotificationDetailModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </div>
  );
}
