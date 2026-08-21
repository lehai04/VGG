import { locations } from "./footerData";
import { FooterIcon } from "./FooterIcon";

export function FooterLocation() {
  const [mainLocation, ...otherLocations] = locations;
  return (
    <section className="university-footer-location">
      <h2>Địa chỉ</h2>
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
              <strong>{location.name}:</strong> {location.address}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
