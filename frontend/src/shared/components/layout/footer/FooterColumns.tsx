"use client";

import Link from "@/i18n/components/LocalizedLink";
import { useWebsiteChrome } from '../WebsiteChromeProvider';
import { isPublicSectionVisible } from "@/lib/public-sections";
import { FooterIcon } from "./FooterIcon";
import { useLocale } from "@/i18n/components/LocaleProvider";

/** 3 cột giữa footer: Về chúng tôi, Truy cập nhanh, Theo dõi. */

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <section className="university-footer-column">
      <h3>{title}</h3>
      <ul>
        {links.filter((link) => isPublicSectionVisible(link.href)).map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export function FooterAbout() {
  const { aboutLinks } = useWebsiteChrome();
  const { locale } = useLocale();
  const labels = locale === "en" ? ["Introduction", "Vision and Mission", "Educational Philosophy", "Core Values", "Why choose us", "Leadership"] : aboutLinks.map((item) => item.label);
  return <LinkColumn title={locale === "en" ? "About the Institute" : "Về Viện Sau đại học"} links={aboutLinks.map((item,index) => ({...item,label:labels[index] ?? item.label}))} />;
}
export function FooterQuickLinks() {
  const { quickLinks } = useWebsiteChrome();
  const { locale } = useLocale();
  const labels = locale === "en" ? ["Home", "About Viện Sau đại học", "Programmes", "Admissions", "Research & Innovation", "Global Opportunities", "Student Success", "News & Events", "Resources", "Contact"] : quickLinks.map((item) => item.label);
  return <LinkColumn title={locale === "en" ? "Quick links" : "Truy cập nhanh"} links={quickLinks.map((item,index) => ({...item,label:labels[index] ?? item.label}))} />;
}
export function FooterSocial() {
  const { socialLinks } = useWebsiteChrome();
  const { locale } = useLocale();
  return (
    <section className="university-footer-column university-footer-social">
      <h3>{locale === "en" ? "Follow us" : "Theo dõi"}</h3>
      <ul>
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <FooterIcon name={link.icon} />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
