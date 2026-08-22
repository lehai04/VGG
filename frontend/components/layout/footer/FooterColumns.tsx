"use client";

import Link from "@/components/i18n/LocalizedLink";
import { aboutLinks, quickLinks, socialLinks } from "./footerData";
import { FooterIcon } from "./FooterIcon";
import { useLocale } from "@/components/i18n/LocaleProvider";

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
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export function FooterAbout() {
  const { locale } = useLocale();
  const labels = locale === "en" ? ["News", "Events", "Careers", "Quality Assurance", "English Testing Centre"] : aboutLinks.map((item) => item.label);
  return <LinkColumn title={locale === "en" ? "About us" : "Về chúng tôi"} links={aboutLinks.map((item,index) => ({...item,label:labels[index]}))} />;
}
export function FooterQuickLinks() {
  const { locale } = useLocale();
  const labels = locale === "en" ? ["Home", "About VGG", "Programmes", "Admissions", "Research & Innovation", "Global Opportunities", "Student Success", "News & Events", "Resources", "Contact"] : quickLinks.map((item) => item.label);
  return <LinkColumn title={locale === "en" ? "Quick links" : "Truy cập nhanh"} links={quickLinks.map((item,index) => ({...item,label:labels[index] ?? item.label}))} />;
}
export function FooterSocial() {
  const { locale } = useLocale();
  return (
    <section className="university-footer-column university-footer-social">
      <h2>{locale === "en" ? "Follow us" : "Theo dõi"}</h2>
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
