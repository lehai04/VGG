"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useMemo, type ReactNode } from "react";
import { LogoutButton } from "./LogoutButton";
import { AdminNotifications } from "./AdminNotifications";

// SVG Icons nét mảnh đồng nhất (stroke-width: 1.75)
function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconNews() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function IconResources() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <path d="M12 11v6" />
      <path d="M9 14h6" />
    </svg>
  );
}

function IconConsultations() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="2" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

function IconNotifications() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function AdminShell({
  admin,
  children,
}: {
  admin: {
    fullName: string;
    role: { name: string; code?: string };
    permissionCodes: string[];
  };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Dòng ngày hiện tại theo chuẩn tiếng Việt
  const currentDateFormatted = useMemo(() => {
    const d = new Date();
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const day = days[d.getDay()];
    const dateStr = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    return `${day}, ${dateStr}`;
  }, []);

  // Xử lý Escape và focus trap cho drawer
  // Xử lý Escape và scroll lock cho drawer khi ở màn hình nhỏ
  useEffect(() => {
    if (!drawerOpen) return;
    if (typeof window !== "undefined" && window.innerWidth > 900) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [drawerOpen]);

  const handleMobileNavClick = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 900) {
      setDrawerOpen(false);
    }
  };

  const can = (permission: string) =>
    admin.role.code === "SUPER_ADMIN" || admin.permissionCodes.includes(permission);

  const isSettingsAllowed =
    can("settings.view") || can("admins.view") || admin.role.code === "SUPER_ADMIN";

  const userInitial = admin.fullName ? admin.fullName.trim().charAt(0).toUpperCase() : "A";

  return (
    <div className="vgg-admin-layout">
      {/* Off-canvas Drawer Navigation (Chỉ hiện khi ở màn hình nhỏ) */}
      <div className={`vgg-drawer-backdrop ${drawerOpen ? "is-open" : ""}`} onClick={() => setDrawerOpen(false)} />
      
      <aside
        ref={sidebarRef}
        className={`vgg-sidebar-drawer ${drawerOpen ? "is-open" : ""}`}
        aria-label="Điều hướng quản trị"
      >
        {/* Header Drawer với Logo VGG ADMIN */}
        <div className="admin-sidebar__head">
          <Link
            className="admin-sidebar__brand"
            href="/admin/dashboard"
            onClick={handleMobileNavClick}
            title="VGG ADMIN - Bảng điều khiển"
          >
            <div className="admin-brand-icon">V</div>
            <div className="admin-brand-text">
              <span className="brand-title">VGG</span>
              <span className="brand-sub">ADMIN</span>
            </div>
          </Link>

          <button
            type="button"
            className="admin-sidebar-close-btn"
            aria-label="Đóng menu"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Hệ thống Menu Navigation */}
        <nav className="admin-nav" onClick={handleMobileNavClick}>
          <Link
            href="/admin/dashboard"
            className={`admin-nav-link ${pathname === "/admin/dashboard" ? "active" : ""}`}
          >
            <span className="nav-icon"><IconDashboard /></span>
            <span className="nav-text">Dashboard</span>
          </Link>

          <div className="nav-group-heading">CHỨC NĂNG</div>

          {can("admins.view") && (
            <Link
              href="/admin/users"
              className={`admin-nav-link ${pathname.startsWith("/admin/users") ? "active" : ""}`}
            >
              <span className="nav-icon"><IconUsers /></span>
              <span className="nav-text">Nhân sự</span>
            </Link>
          )}

          {can("news.view") && (
            <div className="admin-nav-submenu-group" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px 4px",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "var(--text-14)",
                  fontWeight: 600,
                  userSelect: "none",
                }}
              >
                <span className="nav-icon"><IconNews /></span>
                <span className="nav-text">Tin tức &amp; Sự kiện</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingLeft: "24px" }}>
                <Link
                  href="/admin/news/create"
                  className={`admin-nav-link ${pathname === "/admin/news/create" ? "active" : ""}`}
                  style={{
                    padding: "7px 12px",
                    fontSize: "var(--text-14)",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "var(--text-12)", opacity: 0.85 }}>✍️</span>
                  <span className="nav-text">Đăng tin</span>
                </Link>
                <Link
                  href="/admin/news"
                  className={`admin-nav-link ${pathname === "/admin/news" ? "active" : ""}`}
                  style={{
                    padding: "7px 12px",
                    fontSize: "var(--text-14)",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "var(--text-12)", opacity: 0.85 }}>📑</span>
                  <span className="nav-text">Danh sách tin</span>
                </Link>
              </div>
            </div>
          )}

          {can('website.view') && <Link href="/admin/programmes" className={`admin-nav-link ${pathname.startsWith('/admin/programmes') ? 'active' : ''}`}><span className="nav-icon"><IconResources /></span><span className="nav-text">Quản lý chuyên ngành</span></Link>}
          {can("news.view") && <Link href="/admin/news-workspace" className={`admin-nav-link ${pathname.startsWith("/admin/news-workspace") ? "active" : ""}`}><span className="nav-icon"><IconNews /></span><span className="nav-text">CMS mới · Tin tức</span></Link>}
          {can('website.view') && <Link href="/admin/content" className={`admin-nav-link ${pathname.startsWith('/admin/content') ? 'active' : ''}`}><span className="nav-icon"><IconResources /></span><span className="nav-text">CMS mới · Nội dung</span></Link>}
          {can('website.view') && <Link href="/admin/website" className={`admin-nav-link ${pathname.startsWith('/admin/website') ? 'active' : ''}`}><span className="nav-icon"><IconResources /></span><span className="nav-text">Nội dung website hiện tại</span></Link>}
          <Link href="/admin/guide" className={`admin-nav-link ${pathname.startsWith('/admin/guide') ? 'active' : ''}`}><span className="nav-icon"><IconResources /></span><span className="nav-text">Hướng dẫn sử dụng</span></Link>
          {can("resources.view") && (
            <Link
              href="/admin/resources"
              className={`admin-nav-link ${pathname.startsWith("/admin/resources") ? "active" : ""}`}
            >
              <span className="nav-icon"><IconResources /></span>
              <span className="nav-text">Tài nguyên</span>
            </Link>
          )}

          {can("applications.view") && <Link href="/admin/applications" className={`admin-nav-link ${pathname.startsWith("/admin/applications") ? "active" : ""}`}><span className="nav-icon"><IconConsultations /></span><span className="nav-text">Hồ sơ đăng ký</span></Link>}
          {can("consultations.view") && <Link href="/admin/consultation-workspace" className={`admin-nav-link ${pathname.startsWith("/admin/consultation-workspace") ? "active" : ""}`}><span className="nav-icon"><IconConsultations /></span><span className="nav-text">CMS mới · Tư vấn</span></Link>}
          {can("consultations.view") && (
            <Link
              href="/admin/consultations"
              className={`admin-nav-link ${pathname.startsWith("/admin/consultations") ? "active" : ""}`}
            >
              <span className="nav-icon"><IconConsultations /></span>
              <span className="nav-text">Lịch tư vấn</span>
            </Link>
          )}

          <Link
            href="/admin/notifications"
            className={`admin-nav-link ${pathname.startsWith("/admin/notifications") ? "active" : ""}`}
          >
            <span className="nav-icon"><IconNotifications /></span>
            <span className="nav-text">Thông báo</span>
          </Link>

          <div className="nav-group-heading">TÀI KHOẢN</div>

          <Link
            href="/admin/profile/security"
            className={`admin-nav-link ${pathname.startsWith("/admin/profile") ? "active" : ""}`}
          >
            <span className="nav-icon"><IconProfile /></span>
            <span className="nav-text">Tài khoản của tôi</span>
          </Link>
        </nav>

        {/* Thông tin người dùng ở chân Sidebar Drawer */}
        <div className="admin-sidebar__user">
          <div className="admin-avatar" title={admin.fullName}>
            {userInitial}
          </div>
          <div className="user-info-text">
            <strong className="user-name">{admin.fullName}</strong>
            <span className="user-role">{admin.role.name}</span>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* VÙNG TOÀN TRANG: TOPBAR + MAIN CONTENT */}
      <div className="vgg-main-wrapper">
        {/* TOPBAR CHUẨN THAM CHIẾU */}
        <header className="vgg-topbar">
          <div className="vgg-topbar__left">
            <button
              ref={toggleRef}
              className="vgg-hamburger-btn"
              type="button"
              aria-label="Mở menu quản trị"
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="vgg-topbar__title-block">
              <h2 className="topbar-heading">Tổng quan hệ thống</h2>
              <span className="topbar-date-sub">{currentDateFormatted}</span>
            </div>
          </div>

          <div className="vgg-topbar__right">
            {/* Thanh tìm kiếm */}
            <div className="vgg-search-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm chức năng, báo cáo..."
              />
            </div>

            {/* Icon chuông thông báo */}
            <div className="vgg-notif-wrapper">
              <AdminNotifications />
            </div>

            {/* User Profile Pill */}
            <div className="vgg-user-pill" title={`${admin.fullName} - ${admin.role.name}`}>
              <div className="vgg-user-avatar">{userInitial}</div>
              <div className="vgg-user-meta">
                <strong className="vgg-user-name">{admin.fullName}</strong>
                <span className="vgg-user-role">{admin.role.name}</span>
              </div>
              <svg className="vgg-caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </header>

        {/* NỘI DUNG CHÍNH (FULL WIDTH, PADDING 20PX) */}
        <main className="vgg-main-content">{children}</main>
      </div>
    </div>
  );
}
