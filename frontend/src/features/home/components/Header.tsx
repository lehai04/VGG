"use client";

/**
 * Header dùng chung cho homepage và mọi trang con.
 * Menu chính luôn dẫn tới route thật, để cùng một điều hướng hoạt động nhất quán
 * ở bất kỳ page nào. Mega menu chỉ là lớp khám phá bổ sung.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { usePathname } from "next/navigation";
import { discoverSections, navigationGroups, subpageHref } from "@/data/site";
import { LanguageToggle } from "@/shared/components/layout/LanguageToggle";
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
  // Quản lý trạng thái menu trên thiết bị di động và mục mega menu đang được chọn.
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const routePathname = stripLocale(pathname);
  const activeItem = activeMenu === null ? null : MENU_ITEMS[activeMenu];

  // Navigation chính không dùng hash: mọi page có đích route độc lập trong app/<slug>/page.tsx.
  const itemHref = (slug: string) => `/${slug}`;

  // Chỉ Về Viện Sau Đại học còn trang con. Các nhóm khác đi thẳng tới trang tổng hợp duy nhất.
  const submenuHref = (slug: string, index: number) => {
    if (slug === "discover")
      return index === 0 ? "/discover" : `/discover/${discoverSections[index].slug}`;
    return subpageHref(slug, index);
  };

  // Mega menu chỉ mở bằng click và đóng bằng click bên ngoài hoặc phím Escape.
  useEffect(() => {
    const closeFromOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setActiveMenu(null);
    };
    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMenu(null);
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
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
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
          <LanguageToggle />
        </nav>
      </div>

      <div className="headerShell" ref={headerRef}>
        <header className="header">
          <Link className="brand" href="/" aria-label="Trang chủ Viện Sau Đại học">
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
            {MENU_ITEMS.map((item, index) => (
              <Link
                href={itemHref(item.slug)}
                key={item.english}
                aria-expanded={item.slug === "discover" ? activeMenu === index : undefined}
                aria-controls={item.slug === "discover" ? "header-mega-menu" : undefined}
                className={
                  activeMenu === index || (routeMode && routePathname.startsWith(`/${item.slug}`))
                    ? "active"
                    : ""
                }
                onClick={(event) => {
                  if (item.slug === "discover") {
                    if (window.matchMedia("(max-width: 1100px)").matches) {
                      setOpen(false);
                      setActiveMenu(null);
                      return;
                    }
                    event.preventDefault();
                    setActiveMenu((current) => (current === index ? null : index));
                    return;
                  }
                  setActiveMenu(null);
                  setOpen(false);
                }}
              >
                <span className="navTitle">{locale === "en" ? item.english : item.vietnamese}</span>
              </Link>
            ))}
          </nav>
        </header>

        {activeItem && (
          // Nội dung mega menu được sinh từ cùng nguồn data/site.ts với menu chính.
          <section
            className="megaMenu megaMenuVlu"
            id="header-mega-menu"
            aria-label={`Menu ${activeItem.english}`}
          >
            <div className="megaVluImage">
              <Image
                src="/images/pages/home/sections/campus.jpg"
                alt="Khuôn viên Trường Đại học Văn Lang"
                fill
                sizes="(max-width: 1100px) 0px, 42vw"
              />
            </div>

            <div className="megaVluBody">
              <div className="megaVluHeading">
                <h2>{locale === "en" ? activeItem.english : activeItem.vietnamese}</h2>
                <Link href={itemHref(activeItem.slug)} onClick={() => setActiveMenu(null)}>
                  <span>{messages.navigation.overview.toUpperCase()}</span>
                  <b aria-hidden="true">›</b>
                </Link>
              </div>

              <nav
                className="megaVluLinks"
                aria-label={`${messages.navigation.overview} ${locale === "en" ? activeItem.english : activeItem.vietnamese}`}
              >
                {(locale === "en" ? activeItem.linksEn : activeItem.links).map((link, index) => (
                  <Link
                    href={submenuHref(activeItem.slug, index)}
                    key={link}
                    onClick={() => setActiveMenu(null)}
                  >
                    {link}
                  </Link>
                ))}
              </nav>

              <aside className="megaVluPromo">
                <small>VAN LANG GLOBAL GRADUATE</small>
                <strong>
                  {locale === "en" ? "International standards." : "Chuẩn quốc tế."}
                  <br />
                  {locale === "en" ? "Learner-centered." : "Lấy người học làm trung tâm."}
                </strong>
                <Link href="/discover" onClick={() => setActiveMenu(null)}>
                  {locale === "en" ? "Explore Viện Sau Đại học" : "Khám phá Viện Sau Đại học"}{" "}
                  <span>→</span>
                </Link>
              </aside>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
