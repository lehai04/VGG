"use client";

/**
 * Header dùng chung cho homepage và mọi trang con.
 * Menu chính luôn dẫn tới route thật, để cùng một điều hướng hoạt động nhất quán
 * ở bất kỳ page nào. Các mục điều hướng dẫn thẳng đến trang tương ứng.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { usePathname } from "next/navigation";
import { navigationGroups } from "@/data/site";
import { useLocale } from "@/i18n/components/LocaleProvider";
import { stripLocale } from "@/lib/i18n";

// Đường dẫn logo chính của Header.
const LOGO_SRC = "/images/logo/logo-vgg.png";

// Homepage dùng chung nguồn navigation với các trang con; chỉ đích liên kết khác nhau.
const MENU_ITEMS = navigationGroups.map((group) => ({
  slug: group.slug,
  english: group.en,
  vietnamese: group.vi,
  links: group.items,
  linksEn: group.itemsEn,
}));

/** Header dùng chung; routeMode được giữ lại để tương thích các nơi đang sử dụng component. */
export function Header({ routeMode = false }: { routeMode?: boolean }) {
  const { locale, messages } = useLocale();
  // Quản lý trạng thái menu trên thiết bị di động.
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const routePathname = stripLocale(pathname);

  // Navigation chính không dùng hash: mọi page có đích route độc lập trong app/<slug>/page.tsx.
  const itemHref = (slug: string) => `/${slug}`;

  // Đóng menu di động bằng click bên ngoài hoặc phím Escape.
  useEffect(() => {
    const closeFromOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        if (window.matchMedia("(width < 1024px)").matches) setOpen(false);
      }
    };
    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("click", closeFromOutside);
    document.addEventListener("keydown", closeFromKeyboard);
    return () => {
      document.removeEventListener("click", closeFromOutside);
      document.removeEventListener("keydown", closeFromKeyboard);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        headerRef.current?.querySelector<HTMLButtonElement>(".menuButton")?.focus();
      }
      if (event.key === "Tab" && window.matchMedia("(width < 1024px)").matches) {
        const first = headerRef.current?.querySelector<HTMLButtonElement>(".menuButton");
        const links = headerRef.current?.querySelectorAll<HTMLAnchorElement>(".nav a");
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
    };
    const mobile = window.matchMedia("(width < 1024px)");
    const closeOnResize = () => setOpen(false);
    mobile.addEventListener("change", closeOnResize);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      mobile.removeEventListener("change", closeOnResize);
    };
  }, [open]);

  return (
    <>
      <div className="topBar">
        <Link className="topBarUniversity" href="/">
          {messages.navigation.university}
        </Link>
        <nav className="topBarLinks" aria-label="Liên kết nhanh">
          <Link href="/news">{messages.navigation.news}</Link>
          <Link href="/resources">{messages.navigation.resources}</Link>
        </nav>
      </div>

      <div className="headerShell" ref={headerRef}>
        <header className="header">
          <Link className="brand" href="/" aria-label="Trang chủ Viện Sau Đại học" onClick={() => { setOpen(false); }}>
            <Image
              className="brandLogo"
              src={LOGO_SRC}
              alt="Viện Sau đại học Văn Lang"
              width={270}
              height={96}
              priority
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <span className="brandFallback">VLU</span>
            <b className="brandFallback">
              VAN LANG
              <br />
              GRADUATE
            </b>
          </Link>

          <button
            className="menuButton"
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-primary-navigation"
            aria-label={open ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
          >
            <span className="menuButtonIcon" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>

          <nav
            id="mobile-primary-navigation"
            className={open ? "nav open" : "nav"}
            aria-label="Điều hướng chính"
          >
            {MENU_ITEMS.map((item) => (
              <Link
                href={itemHref(item.slug)}
                key={item.english}
                className={
                  routeMode && routePathname.startsWith(`/${item.slug}`)
                    ? "active"
                    : ""
                }
                onClick={() => setOpen(false)}
              >
                <span className="navTitle">{locale === "en" ? item.english : item.vietnamese}</span>
              </Link>
            ))}
          </nav>
        </header>

      </div>
    </>
  );
}
