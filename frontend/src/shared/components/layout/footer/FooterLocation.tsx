"use client";

import { useWebsiteCopy } from "@/i18n/components/WebsiteCopy";
import { useWebsiteChrome } from '../WebsiteChromeProvider';
import { FooterIcon } from "./FooterIcon";
import { useLocale } from "@/i18n/components/LocaleProvider";

/** Cột địa chỉ + iframe Google Maps (cơ sở đầu tiên trong `locations`). */
export function FooterLocation() {
  const t = useWebsiteCopy();
  const { locations } = useWebsiteChrome();
  const { locale } = useLocale();
  const [mainLocation, ...otherLocations] = locations;
  return (
    <section className="university-footer-location">
      <h3>{t("Địa chỉ")}</h3>
      <a
        className="university-footer-map"
        href={mainLocation.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Mở bản đồ cơ sở chính Văn Lang"
      >
        <iframe
          title="Bản đồ cơ sở chính Văn Lang"
          src={`${mainLocation.mapUrl}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
        />
      </a>
      <div className="university-footer-addresses">
        {[mainLocation, ...otherLocations].map((location) => (
          <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" key={location.name}>
            <FooterIcon name="pin" />
            <span>
              <strong>{t(locale === "en" ? (location === mainLocation ? "Main campus" : "Campus 2") : location.name)}:</strong> {t(location.address)}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
