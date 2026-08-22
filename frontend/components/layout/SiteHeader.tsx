"use client";

/**
 * Header trang con. `compact` = dùng Header homepage ở chế độ routeMode
 * (click menu đi tới /slug thay vì #anchor). Nhánh không compact là mega menu hover cũ.
 */
import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import { useState } from "react";
import { discoverSections, menuGroups, subpageHref } from "@/data/site";
import { Header } from "@/components/home/Header";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

function UtilityBar() {
  return (
    <div className="utility">
      <span>TRƯỜNG ĐẠI HỌC VĂN LANG</span>
      <div>
        <Link href="/news">Tin tức</Link>
        <Link href="/resources">Tài nguyên</Link>
        <LanguageToggle />
      </div>
    </div>
  );
}

function BrandLink({ className }: { className: string }) {
  return (
    <Link href="/" className={className} aria-label="Trang chủ VGG">
      <Image
        src="/images/logo/logo-vgg.png"
        alt="Viện Sau đại học Văn Lang"
        width={320}
        height={125}
        priority
      />
    </Link>
  );
}

/**
 * LAYOUT DÙNG CHUNG cho các page ngoài homepage.
 * `compact` dùng header route trực tiếp; nhánh còn lại hỗ trợ mega menu đầy đủ.
 */
export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = menuGroups.find((group) => group.slug === activeSlug);

  if (compact)
    return (
      <div className="home-page shared-header-scope">
        <Header routeMode />
      </div>
    );

  return (
    <>
      <UtilityBar />
      <header className="vgg-header">
        <BrandLink className="vgg-brand" />
        <button
          className="menu-button"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="main-menu"
          onClick={() => {
            setMobileOpen((value) => !value);
            setActiveSlug(null);
          }}
        >
          {mobileOpen ? "ĐÓNG ×" : "MENU ☰"}
        </button>
        <nav
          id="main-menu"
          aria-label="Điều hướng chính"
          className={mobileOpen ? "main-menu open" : "main-menu"}
        >
          {menuGroups.map((group) => (
            <button
              type="button"
              key={group.slug}
              aria-expanded={activeSlug === group.slug}
              onClick={() => setActiveSlug(activeSlug === group.slug ? null : group.slug)}
              className={activeSlug === group.slug ? "active" : ""}
            >
              <span>{group.en}</span>
              <small>{group.vi}</small>
            </button>
          ))}
        </nav>
        {active && (
          <div className="mega-menu">
            <div className="mega-title">
              <p>{String(menuGroups.indexOf(active) + 1).padStart(2, "0")}</p>
              <h2>{active.en}</h2>
              <span>{active.vi}</span>
            </div>
            <div className="mega-links">
              {active.items.map((item, index) => (
                <Link
                  key={item}
                  href={
                    active.slug === "discover"
                      ? `/discover/${discoverSections[index].slug}`
                      : subpageHref(active.slug, index)
                  }
                  onClick={() => {
                    setActiveSlug(null);
                    setMobileOpen(false);
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
            <div className="mega-feature">
              <small>VAN LANG GLOBAL GRADUATE</small>
              <h3>
                Chuẩn quốc tế.
                <br />
                Lấy người học
                <br />
                làm trung tâm.
              </h3>
              <Link href="/discover">Khám phá VGG →</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

