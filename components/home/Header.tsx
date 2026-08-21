"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { discoverSections, menuGroups } from "@/data/site";

// Đường dẫn logo chính của Header.
const LOGO_SRC = "/images/logo/logo-vgg.png";

// Homepage dùng chung nguồn navigation với các trang con; chỉ đích liên kết khác nhau.
const MENU_ITEMS = menuGroups.map((group) => ({
  slug: group.slug,
  english: group.en,
  vietnamese: group.vi,
  links: group.items,
}));

/** Header dùng chung; trang chủ cuộn tới section, trang con điều hướng bằng route. */
export function Header({ routeMode = false }: { routeMode?: boolean }) {
  // Quản lý trạng thái menu trên thiết bị di động và mục mega menu đang được chọn.
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const activeItem = activeMenu === null ? null : MENU_ITEMS[activeMenu];

  // Ở homepage, menu trỏ tới section; ở page con, menu chuyển sang route độc lập.
  const itemHref = (slug: string) => {
    if (routeMode) return `/${slug}`;
    return slug === "discover" ? "/discover" : `#${slug}`;
  };

  // Riêng nhóm Về VGG có route chi tiết; các nhóm còn lại dùng landing page hiện có.
  const submenuHref = (slug: string, index: number) => {
    if (slug === "discover") return `/discover/${discoverSections[index].slug}`;
    return routeMode ? `/${slug}` : `#${slug}`;
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
        <a className="topBarUniversity" href={routeMode ? "/" : "#top"}>
          TRƯỜNG ĐẠI HỌC VĂN LANG
        </a>
        <nav className="topBarLinks" aria-label="Liên kết nhanh">
          <a href={routeMode ? "/news" : "#news"}>Tin tức</a>
          <a href={routeMode ? "/resources" : "#resources"}>Tài nguyên</a>
          <button type="button" aria-label="Chuyển đổi ngôn ngữ">
            VI <span>/ EN</span>
          </button>
        </nav>
      </div>

      <div className="headerShell" ref={headerRef}>
        <header className="header">
          <a className="brand" href={routeMode ? "/" : "#top"} aria-label="Trang chủ VGG">
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
          </a>

          <button
            className="menuButton"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Mở menu điều hướng"
          >
            MENU <i>{open ? "×" : "+"}</i>
          </button>

          <nav className={open ? "nav open" : "nav"} aria-label="Điều hướng chính">
            {MENU_ITEMS.map((item, index) => (
              // Giữ thẻ <a> để có href hợp lệ, nhưng chặn điều hướng khi dùng nó làm nút mở mega menu.
              <a
                href={itemHref(item.slug)}
                key={item.english}
                aria-expanded={activeMenu === index}
                aria-controls="header-mega-menu"
                className={
                  activeMenu === index || (routeMode && pathname.startsWith(`/${item.slug}`))
                    ? "active"
                    : ""
                }
                onClick={(event) => {
                  event.preventDefault();
                  setActiveMenu((current) => (current === index ? null : index));
                  setOpen(false);
                }}
              >
                <span className="navTitle">{item.vietnamese}</span>
              </a>
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
                <h2>{activeItem.vietnamese}</h2>
                <a href={itemHref(activeItem.slug)} onClick={() => setActiveMenu(null)}>
                  <span>TỔNG QUAN</span>
                  <b aria-hidden="true">›</b>
                </a>
              </div>

              <nav className="megaVluLinks" aria-label={`Các mục ${activeItem.vietnamese}`}>
                {activeItem.links.map((link, index) => (
                  <a
                    href={submenuHref(activeItem.slug, index)}
                    key={link}
                    onClick={() => setActiveMenu(null)}
                  >
                    {link}
                  </a>
                ))}
              </nav>

              <aside className="megaVluPromo">
                <small>VAN LANG GLOBAL GRADUATE</small>
                <strong>
                  Chuẩn quốc tế.
                  <br />
                  Lấy người học làm trung tâm.
                </strong>
                <Link href="/discover" onClick={() => setActiveMenu(null)}>
                  Khám phá VGG <span>→</span>
                </Link>
              </aside>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
