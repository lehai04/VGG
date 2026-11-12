"use client";

import Link from "@/i18n/components/LocalizedLink";
import { useWebsiteChrome } from '../WebsiteChromeProvider';
import { useWebsiteCopy } from "@/i18n/components/WebsiteCopy";

/** Dòng copyright + điều khoản / bảo mật / sitemap. */
export function FooterBottom() {
  const { legalLinks } = useWebsiteChrome();
  const t = useWebsiteCopy();
  return (
    <div className="university-footer-bottom">
      <span>© Van Lang University. All rights reserved.</span>
      <nav aria-label={t("Liên kết pháp lý")}>
        {legalLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            {t(link.label)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
