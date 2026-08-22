"use client";

import Link from "@/components/i18n/LocalizedLink";
import { legalLinks } from "./footerData";
import { useLocale } from "@/components/i18n/LocaleProvider";

/** Dòng copyright + điều khoản / bảo mật / sitemap. */
export function FooterBottom() {
  const { locale } = useLocale();
  const labels = locale === "en" ? ["Terms", "Privacy Policy", "Sitemap"] : legalLinks.map((item) => item.label);
  return (
    <div className="university-footer-bottom">
      <span>© 2024 Van Lang University. All rights reserved.</span>
      <nav aria-label="Liên kết pháp lý">
        {legalLinks.map((link,index) => (
          <Link href={link.href} key={link.label}>
            {labels[index]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
