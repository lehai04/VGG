"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { LogoutButton } from "./LogoutButton";

import { AdminNotifications } from "./AdminNotifications";

export function AdminShell({
  admin,
  children,
}: {
  admin: {
    fullName: string;
    role: { name: string };
    permissionCodes: string[];
  };
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const can = (permission: string) =>
    admin.permissionCodes.includes(permission);

  return (
    <div className={`admin-shell${menuOpen ? " menu-open" : ""}`}>
      <button
        className="admin-sidebar-backdrop"
        aria-label="Đóng menu"
        onClick={() => setMenuOpen(false)}
      />
      <aside className="admin-sidebar" aria-label="Điều hướng quản trị">
        <div className="admin-sidebar__mobile-head">
          <Link
            className="admin-sidebar__brand"
            href="/admin/dashboard"
            onClick={() => setMenuOpen(false)}
          >
            <span>VGG</span>
            <b>ADMIN</b>
          </Link>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <nav className="admin-nav" onClick={() => setMenuOpen(false)}>
          <Link href="/admin/dashboard">
            <i>▦</i> Dashboard
          </Link>
          <p>CHỨC NĂNG</p>
          {can("admins.view") && (
            <Link href="/admin/users">
              <i>♙</i> Nhân sự
            </Link>
          )}
          {can("news.view") && (
            <Link href="/admin/news">
              <i>▤</i> Tin tức
            </Link>
          )}
          {can("resources.view") && (
            <Link href="/admin/resources">
              <i>▣</i> Tài nguyên
            </Link>
          )}
          {can("consultations.view") && (
            <Link href="/admin/consultations">
              <i>◷</i> Lịch tư vấn
            </Link>
          )}
          <p>TÀI KHOẢN</p>
          <Link href="/admin/profile/security">
            <i>⌾</i> Tài khoản của tôi
          </Link>
        </nav>
        <div className="admin-sidebar__user">
          <div className="admin-avatar">
            {admin.fullName.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <strong>{admin.fullName}</strong>
            <span>{admin.role.name}</span>
          </div>
          <LogoutButton />
        </div>
      </aside>
      <section className="admin-workspace">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            type="button"
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
          <strong>Hệ thống Quản trị VGG</strong>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
            <AdminNotifications />
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </section>
    </div>
  );
}
