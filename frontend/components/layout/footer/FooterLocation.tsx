"use client";

import { locations } from "./footerData";
import { FooterIcon } from "./FooterIcon";
import { useLocale } from "@/components/i18n/LocaleProvider";

/** Cột địa chỉ + iframe Google Maps (cơ sở đầu tiên trong `locations`). */
export function FooterLocation() {
  const { locale } = useLocale();
  const [mainLocation, ...otherLocations] = locations;
  return (
    <section className="university-footer-location">
      <h2>{locale === "en" ? "Locations" : "Địa chỉ"}</h2>
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
              <strong>{locale === "en" ? (location === mainLocation ? "Main campus" : "Campus 2") : location.name}:</strong> {location.address}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
