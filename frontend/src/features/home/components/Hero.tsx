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
    <section data-site-banner className="hero" id="top">
      <div className="heroMedia" aria-hidden="true">
        <Image
          fill
          preload
          sizes="100vw"
          quality={75}
          className="heroBackground"
          src={banner?.kind === "image" ? banner.src : (banner?.poster || (hero.posterImage === "/images/pages/home/banner/banner-01.jpg" ? "/images/pages/home/banner/banner-01.webp" : hero.posterImage))}
          alt={banner?.alt || ""}
        />
      </div>
      <div className="heroOverlay" aria-hidden="true" />

      <div data-banner-copy data-banner-inset>
      <h1 data-banner-title>
        {hero.title} <em>{hero.emphasis}</em>
      </h1>
      <p data-banner-description>{hero.intro}</p>

      <div className="heroActions">
        <a href={hero.primary.href} className="primary vgg-cta-pill">
          {hero.primary.label}
        </a>
        <Link className="vgg-cta-pill" href={hero.secondary.href}>
          {hero.secondary.label}
        </Link>
      </div>

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
