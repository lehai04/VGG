import Link from "next/link";
import { legalLinks } from "./footerData";
export function FooterBottom() {
  return (
    <div className="university-footer-bottom">
      <span>© 2024 Van Lang University. All rights reserved.</span>
      <nav aria-label="Liên kết pháp lý">
        {legalLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
