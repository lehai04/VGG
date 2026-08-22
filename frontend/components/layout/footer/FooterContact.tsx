import Image from "next/image";
import { contactItems } from "./footerData";
import { FooterIcon } from "./FooterIcon";

/** Hàng trên cùng footer: logo + email / đào tạo / tuyển sinh / call center. */
export function FooterContact() {
  return (
    <section className="university-footer-contact">
      <div className="university-footer-logo">
        <Image src="/images/logo/logo-vgg.png" alt="Van Lang University" width={300} height={116} />
      </div>
      {contactItems.map((item) => (
        <a className="university-footer-contact-item" href={item.href} key={item.label}>
          <FooterIcon name={item.icon} />
          <span>
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </span>
        </a>
      ))}
    </section>
  );
}
