"use client";

import Link from "@/i18n/components/LocalizedLink";
import { legalLinks } from "./footerData";
import { useLocale } from "@/i18n/components/LocaleProvider";

/** Dòng copyright + điều khoản / bảo mật / sitemap. */
export function FooterBottom() {
  const { locale } = useLocale();
  const labels = locale === "en" ? ["Terms", "Privacy Policy", "Sitemap"] : legalLinks.map((item) => item.label);
  return (
    <div className="university-footer-bottom">
      <span>© Van Lang University. All rights reserved.</span>
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
