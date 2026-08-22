"use client";

/**
 * Header dùng chung cho homepage và mọi trang con.
 * Menu chính luôn dẫn tới route thật, để cùng một điều hướng hoạt động nhất quán
 * ở bất kỳ page nào. Mega menu chỉ là lớp khám phá bổ sung.
 */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import { usePathname } from "next/navigation";
import { discoverSections, menuGroups, subpageHref } from "@/data/site";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { stripLocale } from "@/lib/i18n";

// Đường dẫn logo chính của Header.
const LOGO_SRC = "/images/logo/logo-vgg.png";

// Homepage dùng chung nguồn navigation với các trang con; chỉ đích liên kết khác nhau.
const MENU_ITEMS = menuGroups.map((group) => ({
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

  // Riêng nhóm Về VGG có route chi tiết; các nhóm còn lại dùng landing page hiện có.
  const submenuHref = (slug: string, index: number) => {
    if (slug === "discover") return `/discover/${discoverSections[index].slug}`;
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
          <Link className="brand" href="/" aria-label="Trang chủ VGG">
            <Image
              className="brandLogo"
              src={LOGO_SRC}
              alt="Viện Sau đại học Văn Lang"
              width={270}
              height={96}
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
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Mở menu điều hướng"
          >
            {open ? messages.navigation.close : messages.navigation.menu} <i>{open ? "×" : "+"}</i>
          </button>

          <nav className={open ? "nav open" : "nav"} aria-label="Điều hướng chính">
            {MENU_ITEMS.map((item, index) => (
              <Link
                href={itemHref(item.slug)}
                key={item.english}
                aria-expanded={activeMenu === index}
                aria-controls="header-mega-menu"
                className={
                  activeMenu === index || (routeMode && routePathname.startsWith(`/${item.slug}`))
                    ? "active"
                    : ""
                }
                onClick={(event) => {
                  event.preventDefault();
                  setActiveMenu((current) => current === index ? null : index);
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
                src="/images/hero/campus-hero.jpg"
                alt="Khuôn viên Trường Đại học Văn Lang"
                fill
                sizes="(max-width: 900px) 0px, 42vw"
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

              <nav className="megaVluLinks" aria-label={`${messages.navigation.overview} ${locale === "en" ? activeItem.english : activeItem.vietnamese}`}>
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
                  {locale === "en" ? "Explore VGG" : "Khám phá VGG"} <span>→</span>
                </Link>
              </aside>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

