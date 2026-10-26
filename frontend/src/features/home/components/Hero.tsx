import Link from "@/i18n/components/LocalizedLink";
import Image from "next/image";
import { homeContent } from "@/data/home-content";
import { websiteContent, websiteBanner, websiteProgrammes } from "@/lib/website-content";

/** HOMEPAGE SECTION: Hero đầu trang, CTA chính và các số liệu tổng quan. */
export async function Hero() {
  const { hero } = await websiteContent("home", homeContent);
  const banner = await websiteBanner("home");
  const programmes = await websiteProgrammes();
  return (
    <section className="hero" id="top">
      <div className="heroMedia" aria-hidden="true">
        {banner?.kind === "image" ? (
          <Image fill sizes="100vw" className="heroBackground" src={banner.src} alt={banner.alt} />
        ) : (
          <video
            className="heroBackground"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={banner?.poster ?? hero.posterImage}
          >
            <source
              src={banner?.src ?? "/video/video-banner.webm"}
              type={banner?.src.endsWith(".mp4") ? "video/mp4" : "video/webm"}
            />
          </video>
        )}
      </div>
      <div className="heroOverlay" aria-hidden="true" />

      <div className="eyebrow">{hero.label}</div>
      <h1>
        {hero.title} <em>{hero.emphasis}</em>
      </h1>
      <p>{hero.intro}</p>

      <div className="heroActions">
        <a href={hero.primary.href} className="primary vgg-cta-pill">
          {hero.primary.label}
        </a>
        <Link className="vgg-cta-pill" href={hero.secondary.href}>
          {hero.secondary.label}
        </Link>
      </div>

      <div className="heroStats">
        <div>
          <b>
            {String(
              programmes.filter((programme) => programme.degree === "Thạc sĩ").length,
            ).padStart(2, "0")}
          </b>
          <span>
            Chương trình
            <br />
            Thạc sĩ
          </span>
        </div>
        <div>
          <b>
            {String(
              programmes.filter((programme) => programme.degree === "Tiến sĩ").length,
            ).padStart(2, "0")}
          </b>
          <span>
            Chương trình
            <br />
            Tiến sĩ
          </span>
        </div>
        <div>
          <b>01</b>
          <span>
            Chương trình
            <br />
            Liên kết quốc tế
          </span>
        </div>
      </div>
    </section>
  );
}
