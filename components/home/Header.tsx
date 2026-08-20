"use client";

import { useState } from "react";
import Image from "next/image";

// Đường dẫn logo chính của Header.
const LOGO_SRC = "/images/logo/logo-vgg.png";

// Cấu hình menu song ngữ và nội dung hiển thị trong mega menu.
const MENU_ITEMS = [
  {
    english: "Discover VGG",
    vietnamese: "Về VGG",
    href: "#about",
    links: [
      "Giới thiệu",
      "Tầm nhìn & Sứ mệnh",
      "Lãnh đạo",
      "Vì sao chọn VGG",
      "Xếp hạng & Thành tựu",
      "Liên hệ",
    ],
  },
  {
    english: "Programmes",
    vietnamese: "Chương trình đào tạo",
    href: "#programmes",
    links: [
      "Chương trình Thạc sĩ Flagship",
      "Thạc sĩ",
      "Tiến sĩ",
      "Executive Education",
      "Chương trình Quốc tế",
    ],
  },
  {
    english: "Admissions",
    vietnamese: "Tuyển sinh",
    href: "#admissions",
    links: [
      "Yêu cầu tuyển sinh",
      "Học phí",
      "Học bổng & Hỗ trợ tài chính",
      "Quy trình nộp hồ sơ",
      "Các mốc thời gian",
      "FAQ",
    ],
  },
  {
    english: "Research & Innovation",
    vietnamese: "Nghiên cứu & Đổi mới",
    href: "#research",
    links: [
      "Các cụm nghiên cứu",
      "Dự án nghiên cứu",
      "Công bố khoa học",
      "Hội thảo & Sự kiện khoa học",
      "Đổi mới sáng tạo",
      "Hợp tác doanh nghiệp",
    ],
  },
  {
    english: "Global Opportunities",
    vietnamese: "Cơ hội quốc tế",
    href: "#global",
    links: [
      "Trao đổi sinh viên",
      "Dual Degree",
      "Thực tập quốc tế",
      "Study Tour",
      "Overseas Immersion",
      "Đối tác toàn cầu",
    ],
  },
  {
    english: "Student Success",
    vietnamese: "Hành trình học viên",
    href: "#student-success",
    links: [
      "Dịch vụ hỗ trợ học viên",
      "Phát triển sự nghiệp",
      "Tài nguyên học tập",
      "Cựu học viên",
      "Câu chuyện thành công",
    ],
  },
  {
    english: "News & Events",
    vietnamese: "Tin tức & Sự kiện",
    href: "#news",
    links: [
      "Tin tức",
      "Sự kiện",
      "Seminar / Webinar",
      "Thông cáo báo chí",
      "Thư viện hình ảnh",
      "Video",
    ],
  },
  {
    english: "Resources",
    vietnamese: "Tài nguyên",
    href: "#resources",
    links: ["Biểu mẫu", "Chính sách & Quy định", "Tài liệu tải về", "Lịch học thuật", "FAQ"],
  },
] as const;

export function Header() {
  // Quản lý trạng thái menu trên thiết bị di động và mục mega menu đang được chọn.
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const activeItem = activeMenu === null ? null : MENU_ITEMS[activeMenu];

  return (
    <>
      <div className="topBar">
        <a className="topBarUniversity" href="#top">
          TRƯỜNG ĐẠI HỌC VĂN LANG
        </a>
        <nav className="topBarLinks" aria-label="Liên kết nhanh">
          <a href="#news">Tin tức</a>
          <a href="#resources">Tài nguyên</a>
          <button type="button" aria-label="Chuyển đổi ngôn ngữ">
            VI <span>/ EN</span>
          </button>
        </nav>
      </div>

      <div className="headerShell" onMouseLeave={() => setActiveMenu(null)}>
        <header className="header">
          <a className="brand" href="#top" aria-label="Trang chủ VGG">
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
              <a
                href={item.href}
                key={item.english}
                className={activeMenu === index ? "active" : ""}
                onMouseEnter={() => setActiveMenu(index)}
                onFocus={() => setActiveMenu(index)}
                onClick={() => setOpen(false)}
              >
                <span className="navTitle">{item.english}</span>
                <span className="navSubtitle">{item.vietnamese}</span>
              </a>
            ))}
          </nav>
        </header>

        {activeItem && (
          <section className="megaMenu" aria-label={`Menu ${activeItem.english}`}>
            <div className="megaIntro">
              <span>{String(activeMenu! + 1).padStart(2, "0")}</span>
              <h2>{activeItem.english}</h2>
              <p>{activeItem.vietnamese}</p>
            </div>

            <div className="megaLinks">
              {activeItem.links.map((link, index) => (
                <a href={activeItem.href} key={link}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{link}</b>
                  <i>↗</i>
                </a>
              ))}
            </div>

            <aside className="megaPromo">
              <small>VAN LANG GLOBAL GRADUATE</small>
              <strong>
                Chuẩn quốc tế.
                <br />
                Lấy người học
                <br />
                làm trung tâm.
              </strong>
              <a href="#about">Khám phá VGG →</a>
            </aside>
          </section>
        )}
      </div>
    </>
  );
}
