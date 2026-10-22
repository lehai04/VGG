"use client";

import Link from "@/i18n/components/LocalizedLink";
import { FooterBottom } from "./footer/FooterBottom";
import { FooterAbout, FooterQuickLinks, FooterSocial } from "./footer/FooterColumns";
import { FooterContact } from "./footer/FooterContact";
import { FooterLocation } from "./footer/FooterLocation";
import { useLocale } from "@/i18n/components/LocaleProvider";

/** Footer duy nhất, được chia nhỏ theo từng vùng nội dung để tái sử dụng toàn site. */
export function SiteFooter() {
  return (
    <footer className="university-footer" id="footer">
      <FooterContact />
      <div className="university-footer-divider" />
      <div className="university-footer-content">
        <FooterAbout />
        <FooterQuickLinks />
        <FooterSocial />
        <FooterLocation />
      </div>
      <FooterBottom />
    </footer>
  );
}

/** Cụm nút nổi (Facebook, Apply, Zalo) — được RootLayout gắn 1 lần. */
export function StickyActions() {
  const { locale, messages } = useLocale();
  return (
    <>
      <a
        className="facebook-float"
        href="https://www.facebook.com/saudaihoc.vlu"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Theo dõi Văn Lang University trên Facebook"
      >
        <span>f</span>
        <b>Facebook Văn Lang</b>
      </a>
      <Link
        className="apply-now-float"
        href="https://tuyensinh.vlu.edu.vn/xet-tuyen/thac-si/"
        aria-label="Nộp hồ sơ ngay"
      >
        <span>{messages.common.applyNow}</span>
      </Link>
      <a
        className="zalo-float"
        href="https://zalo.me/0988486869"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ tuyển sinh qua Zalo"
      >
        <span>Zalo</span>
        <b>{locale === "en" ? "Admissions contact" : "Liên hệ tuyển sinh"}</b>
      </a>
    </>
  );
}
