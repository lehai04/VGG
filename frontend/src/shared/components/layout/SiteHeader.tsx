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
import { LanguageSwitch } from "@/i18n/components/LanguageSwitch";
import { useWebsiteCopy } from "@/i18n/components/WebsiteCopy";

function UtilityBar() {
  const t = useWebsiteCopy();
  return (
    <div className="utility">
      <span>{t("Viện Sau đại học – TRƯỜNG ĐẠI HỌC VĂN LANG")}</span>
      <LanguageSwitch />
    </div>
  );
}

function BrandLink({ className }: { className: string }) {
  const { brand } = useWebsiteChrome();
  return (
    <Link href="/" className={className} aria-label="Trang chủ Viện Sau đại học">
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

