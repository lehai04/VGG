"use client";

import { useEffect, useState, useRef } from "react";

interface NotificationItem {
  id: string;
  action: string;
  actorName: string;
  targetName?: string;
  title: string;
  icon: string;
  category: string;
  createdAt: string;
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

export function AdminNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [lastChecked, setLastChecked] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "users" | "cms" | "consultations">("all");
  const panelRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications?limit=25");
      if (res.ok) {
        const data = (await res.json()) as { notifications: NotificationItem[] };
        setNotifications(data.notifications || []);
      }
    } catch {
      // Silently ignore
    }
  };

  useEffect(() => {
    let isMounted = true;
    const poll = async () => {
      try {
        const res = await fetch("/api/admin/notifications?limit=25");
        if (res.ok && isMounted) {
          const data = (await res.json()) as { notifications: NotificationItem[] };
          setNotifications(data.notifications || []);
        }
      } catch {
        // Silently ignore
      }
    };

    void poll();
    const interval = setInterval(poll, 12000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);



  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function handleOpen() {
    setIsOpen((prev) => !prev);
    setLastChecked(Date.now());
    if (!isOpen) {
      fetchNotifications();
    }
  }

  const unreadCount = notifications.filter(
    (n) => new Date(n.createdAt).getTime() > lastChecked - 60000
  ).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "users") return n.category === "users" || n.category === "auth" || n.category === "security";
    if (activeTab === "cms") return n.category === "news" || n.category === "resources";
    if (activeTab === "consultations") return n.category === "consultations";
    return true;
  });

  return (
    <div style={{ position: "relative" }} ref={panelRef}>
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Thông báo và hoạt động"
        title="Thông báo hoạt động thời gian thực"
        style={{
          background: isOpen ? "#f4f4f5" : "transparent",
          border: "1px solid #e4e4e7",
          borderRadius: "8px",
          width: "38px",
          height: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          fontSize: "1.1rem",
          transition: "all 0.2s ease",
        }}
      >
        <span>🔔</span>
        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              background: "#b91c1c",
              color: "#fff",
              fontSize: "0.68rem",
              fontWeight: 800,
              borderRadius: "10px",
              minWidth: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              boxShadow: "0 0 0 2px #fff",
            }}
          >
            {notifications.length > 99 ? "99+" : notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "380px",
            maxWidth: "92vw",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e4e4e7",
            zIndex: 9999,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "var(--notifications-max-height, 520px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid #f4f4f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fafafa",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "#18181b" }}>Hoạt động & Thông báo</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#15803d",
                  background: "#dcfce7",
                  padding: "2px 6px",
                  borderRadius: "10px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                Realtime
              </span>
            </div>
            <button
              type="button"
              onClick={fetchNotifications}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.78rem",
                color: "#71717a",
                cursor: "pointer",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
              title="Tải lại hoạt động mới nhất"
            >
              🔄 Làm mới
            </button>
          </div>

          {/* Filter Tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #f4f4f5",
              padding: "6px 12px",
              gap: "6px",
              background: "#fff",
              overflowX: "auto",
            }}
          >
            {[
              { id: "all", label: "Tất cả" },
              { id: "users", label: "Nhân sự" },
              { id: "cms", label: "Nội dung" },
              { id: "consultations", label: "Tư vấn" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "none",
                  background: activeTab === tab.id ? "#b91c1c" : "#f4f4f5",
                  color: activeTab === tab.id ? "#ffffff" : "#52525b",
                  fontSize: "0.75rem",
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List of items */}
          <div style={{ overflowY: "auto", flex: 1, padding: "8px" }}>
            {filteredNotifications.length === 0 ? (
              <div style={{ padding: "32px 16px", textAlign: "center", color: "#a1a1aa", fontSize: "0.85rem" }}>
                Chưa có hoạt động nào được ghi nhận.
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    marginBottom: "4px",
                    background: "#ffffff",
                    border: "1px solid #f4f4f5",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fcfcfc")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
                >
                  <span style={{ fontSize: "1.2rem", marginTop: "2px", flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "6px" }}>
                      <strong style={{ fontSize: "0.82rem", color: "#18181b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.actorName}
                      </strong>
                      <span style={{ fontSize: "0.72rem", color: "#a1a1aa", flexShrink: 0 }}>
                        {timeAgo(item.createdAt)}
                      </span>
                    </div>
                    <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#4b5563", lineHeight: 1.4, wordBreak: "break-word" }}>
                      {item.title}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
