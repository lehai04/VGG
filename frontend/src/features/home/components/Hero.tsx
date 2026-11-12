import { requestCopy, requestLanguage } from "@/i18n/request-copy";
import Link from "@/i18n/components/LocalizedLink";
import publishedCounts from "@/data/programmes/published-counts.json";
import Image from "next/image";
import { homeContent } from "@/data/home-content";
import { websiteContent, websiteBanner } from "@/lib/website-content";

/** HOMEPAGE SECTION: Hero đầu trang, CTA chính và các số liệu tổng quan. */
export async function Hero() {
  const t = await requestCopy();
  const { locale } = await requestLanguage();
  const { hero } = await websiteContent("home", homeContent);
  const banner = await websiteBanner("home");
  const intro = hero.intro
    .replace(/(?:19|20) chương trình Thạc sĩ và 01 chương trình Tiến sĩ, 01 chương trình liên kết quốc tế/i, "21+ chương trình Thạc sĩ, 01 chương trình Tiến sĩ và 01 chương trình Thạc sĩ liên kết quốc tế")
    .replace(/(?:19|20) master[’']s programs, 01 doctoral program and 01 international joint program/i, "21+ master’s programs, 01 doctoral program and 01 international joint master’s program");
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
        {t(hero.title)} <em>{t(hero.emphasis)}</em>
      </h1>
      <p data-banner-description>{t(intro)}</p>

      <div className="heroActions">
        <a href={hero.primary.href} className="primary vgg-cta-pill">
          {t(hero.primary.label)}
        </a>
        <Link className="vgg-cta-pill" href={hero.secondary.href}>
          {t(hero.secondary.label)}
        </Link>
      </div>

      </div>

      <div className="heroStats">
        <div>
          <b>{publishedCounts.master}{publishedCounts.masterSuffix}</b>
          <span>{locale === "en" ? "Master’s programs" : <>Chương trình<br />Thạc sĩ</>}</span>
        </div>
        <div>
          <b>
            {String(publishedCounts.doctoral).padStart(2, "0")}
          </b>
          <span>{locale === "en" ? "Doctoral program" : <>Chương trình<br />Tiến sĩ</>}</span>
        </div>
        <div>
          <b>{String(publishedCounts.internationalMaster).padStart(2, "0")}</b>
          <span>{locale === "en" ? "International joint master’s program" : <>Chương trình Thạc sĩ<br />liên kết quốc tế</>}</span>
        </div>
      </div>
    </section>
  );
}
