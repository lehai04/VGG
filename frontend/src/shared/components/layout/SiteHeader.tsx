"use client";

/**
 * Header trang con. `compact` = dùng Header homepage ở chế độ routeMode
 * (click menu đi tới /slug thay vì #anchor). Cả hai biến thể điều hướng trực tiếp.
 */
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { useState } from "react";
import { useWebsiteChrome } from './WebsiteChromeProvider';
import { Header } from "@/features/home/components/Header";

function UtilityBar() {
  return (
    <div className="utility">
      <span>VIỆN SAU ĐẠI HỌC – TRƯỜNG ĐẠI HỌC VĂN LANG</span>
      <div>
        <Link href="/news">Tin tức</Link>
        <Link href="/resources">Tài nguyên</Link>
      </div>
    </div>
  );
}

function BrandLink({ className }: { className: string }) {
  const { brand } = useWebsiteChrome();
  return (
    <Link href="/" className={className} aria-label="Trang chủ Viện Sau Đại học">
      <Image
        src={brand.image}
        alt={brand.alt}
        width={320}
        height={125}
        priority
      />
    </Link>
  );
}

/**
 * LAYOUT DÙNG CHUNG cho các page ngoài homepage.
 * `compact` dùng header route trực tiếp; cả hai biến thể dùng cùng đích điều hướng.
 */
export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const { navigationGroups } = useWebsiteChrome();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          }}
        >
          {mobileOpen ? "ĐÓNG ×" : "MENU ☰"}
        </button>
        <nav
          id="main-menu"
          aria-label="Điều hướng chính"
          className={mobileOpen ? "main-menu open" : "main-menu"}
        >
          {navigationGroups.map((group) => (
            <Link key={group.slug} href={`/${group.slug}`} onClick={() => setMobileOpen(false)}>
              <span>{group.en}</span>
              <small>{group.vi}</small>
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}

