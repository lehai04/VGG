"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { menuGroups } from "@/data/site";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const pathname = usePathname();
  const active = menuGroups.find((group) => group.slug === activeSlug);

  if (compact)
    return (
      <>
        <div className="utility">
          <span>TRƯỜNG ĐẠI HỌC VĂN LANG</span>
          <div>
            <Link href="/news">Tin tức</Link>
            <Link href="/resources">Tài nguyên</Link>
            <span>VI</span>
          </div>
        </div>
        <header className="sub-header">
          <Link href="/" className="sub-logo" aria-label="Trang chủ VGG">
            <Image
              src="/images/logo/logo-vgg.png"
              alt="Viện Sau đại học Văn Lang"
              width={320}
              height={125}
              priority
            />
          </Link>
          <button
            className="sub-menu-button"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="sub-main-menu"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? "ĐÓNG ×" : "MENU ☰"}
          </button>
          <nav
            id="sub-main-menu"
            className={mobileOpen ? "open" : ""}
            aria-label="Điều hướng chính"
          >
            {menuGroups.map((group) => (
              <Link
                href={`/${group.slug}`}
                key={group.slug}
                className={pathname.startsWith(`/${group.slug}`) ? "active" : ""}
                onClick={() => setMobileOpen(false)}
              >
                {group.en}
                <small>{group.vi}</small>
              </Link>
            ))}
          </nav>
        </header>
      </>
    );

  return (
    <>
      <div className="utility">
        <span>TRƯỜNG ĐẠI HỌC VĂN LANG</span>
        <div>
          <Link href="/news">Tin tức</Link>
          <Link href="/resources">Tài nguyên</Link>
          <span>VI</span>
        </div>
      </div>
      <header className="vgg-header" onMouseLeave={() => setActiveSlug(null)}>
        <Link className="vgg-brand" href="/" aria-label="Trang chủ VGG">
          <Image
            src="/images/logo/logo-vgg.png"
            alt="Viện Sau đại học Văn Lang"
            width={320}
            height={125}
            priority
          />
        </Link>
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
              onMouseEnter={() => setActiveSlug(group.slug)}
              onFocus={() => setActiveSlug(group.slug)}
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
                  href={`/${active.slug}`}
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
