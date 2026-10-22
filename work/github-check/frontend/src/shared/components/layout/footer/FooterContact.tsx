"use client";

import Image from "next/image";
import { contactItems } from "./footerData";
import { FooterIcon } from "./FooterIcon";
import { useLocale } from "@/i18n/components/LocaleProvider";

/** Hàng trên cùng footer: logo + email / điện thoại / Hotline-Zalo. */
export function FooterContact() {
  const { locale } = useLocale();
  const englishLabels = ["Email", "Phone", "Hotline/Zalo"];
  return (
    <section className="university-footer-contact">
      <div className="university-footer-logo">
        <Image src="/images/logo/logo-vgg.png" alt="Van Lang University" width={300} height={116} />
      </div>
      {contactItems.map((item,index) => (
        <a className="university-footer-contact-item" href={item.href} key={item.label}>
          <FooterIcon name={item.icon} />
          <span>
            <small>{locale === "en" ? englishLabels[index] : item.label}</small>
            <strong>{item.value}</strong>
          </span>
        </a>
      ))}
    </section>
  );
}
