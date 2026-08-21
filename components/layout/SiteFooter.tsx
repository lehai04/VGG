import Link from "next/link";
import { FooterBottom } from "./footer/FooterBottom";
import { FooterAbout, FooterQuickLinks, FooterSocial } from "./footer/FooterColumns";
import { FooterContact } from "./footer/FooterContact";
import { FooterLocation } from "./footer/FooterLocation";
import { ScrollToTop } from "./footer/ScrollToTop";

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

/** Cụm nút nổi (AI, Facebook, Apply, Zalo, cuộn lên) — được RootLayout gắn 1 lần. */
export function StickyActions() {
  return (
    <>
      <Link className="chatbot-float" href="/#consultation" aria-label="Mở khu vực tư vấn VGG">
        <span>AI</span>
        <b>Chat với VGG</b>
      </Link>
      <a
        className="facebook-float"
        href="https://www.facebook.com/truongdaihocvanlang/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Theo dõi Văn Lang University trên Facebook"
      >
        <span>f</span>
        <b>Facebook Văn Lang</b>
      </a>
      <Link className="apply-now-float" href="/admissions" aria-label="Nộp hồ sơ ngay">
        Apply now
      </Link>
      <a
        className="zalo-float"
        href="https://zalo.me/0988486869"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ tuyển sinh qua Zalo"
      >
        <span>Zalo</span>
        <b>Liên hệ tuyển sinh</b>
      </a>
      <ScrollToTop />
    </>
  );
}
