"use client";

import { useWebsiteCopy } from "@/i18n/components/WebsiteCopy";
import Link from "@/i18n/components/LocalizedLink";
import { useWebsiteChrome } from '../WebsiteChromeProvider';
import { isPublicSectionVisible } from "@/lib/public-sections";
import { FooterIcon } from "./FooterIcon";

/** 3 cột giữa footer: Về chúng tôi, Truy cập nhanh, Theo dõi. */

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  const t = useWebsiteCopy();
  return (
    <section className="university-footer-column">
      <h3>{t(title)}</h3>
      <ul>
        {links.filter((link) => isPublicSectionVisible(link.href)).map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{t(link.label)}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export function FooterAbout() {
  const { aboutLinks } = useWebsiteChrome();
  return <LinkColumn title="Về Viện Sau đại học" links={aboutLinks} />;
}
export function FooterQuickLinks() {
  const { quickLinks } = useWebsiteChrome();
  return <LinkColumn title="Truy cập nhanh" links={quickLinks} />;
}
export function FooterSocial() {
  const t = useWebsiteCopy();
  const { socialLinks } = useWebsiteChrome();
  return (
    <section className="university-footer-column university-footer-social">
      <h3>{t("Theo dõi")}</h3>
      <ul>
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <FooterIcon name={link.icon} />
              {t(link.label)}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
