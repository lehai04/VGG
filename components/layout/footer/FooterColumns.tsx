import Link from "next/link";
import { aboutLinks, quickLinks, socialLinks } from "./footerData";
import { FooterIcon } from "./FooterIcon";

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
  return <LinkColumn title="Về chúng tôi" links={aboutLinks} />;
}
export function FooterQuickLinks() {
  return <LinkColumn title="Truy cập nhanh" links={quickLinks} />;
}
export function FooterSocial() {
  return (
    <section className="university-footer-column university-footer-social">
      <h2>Theo dõi</h2>
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
