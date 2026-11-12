import { requestCopy, requestLanguage } from "@/i18n/request-copy";
import publishedCounts from "@/data/programmes/published-counts.json";
import styles from "./ProgrammeCatalogue.module.css";

import { catalogueCopy } from "@/data/programmes/catalogue-copy";
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import ProgrammeDirectory from "@/features/programmes/components/ProgrammeDirectory";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { websiteContent,websiteProgrammes,websiteLayout } from '@/lib/website-content';
import {ContentPageSections,ContentSlot} from '@/shared/components/ContentPageSections';

export async function ProgrammesLanding() {
  const t = await requestCopy();
  const { locale } = await requestLanguage();
  const content = await websiteContent('catalogue', { ProgrammesPage: catalogueCopy.ProgrammesPage, ProgrammeDirectory: catalogueCopy.ProgrammeDirectory });
  const copy = content.ProgrammesPage;
  const entries = await websiteProgrammes();
  const layout=await websiteLayout('catalogue');
  return (
    <main className={`subpage ${styles["programmes-page"]}`} id="main-content">
      <SiteHeader compact />

      <ContentPageSections pageId="catalogue" layout={layout}>
      <section data-site-banner data-content-slot="hero" className={`${styles["programmes-hero"]}`} aria-labelledby="programmes-title">
        <Image
          src={copy.programmes_hero.src_images_pages_programmes_content_campus_jpg}
          alt={t(copy.programmes_hero.alt_khuon_vien_truong_dai_hoc_van)}
          fill
          priority
          sizes="100vw"
        />
        <div className={`${styles["programmes-hero-overlay"]}`} />

        <nav
          className={`${styles["programmes-breadcrumb"]}`}
          aria-label={t(copy.programmes_hero.aria_label_breadcrumb)}
        >
          <Link href={copy.programmes_hero.href}>{t(copy.programmes_hero.trang_chu)}</Link>
          <span>{t(copy.programmes_hero.value_1)}</span>
          <strong>{t(copy.programmes_hero.chuong_trinh_dao_tao)}</strong>
        </nav>

        <div data-banner-copy className={`${styles["programmes-hero-copy"]}`}>
          <p data-banner-label>PROGRAMMES</p>
          <h1 data-banner-title id="programmes-title">
            <span>{t(copy.programmes_hero.chuong_trinh_dao_tao)}</span>
          </h1>
          <p data-banner-description className={`${styles["programmes-hero-lead"]}`}>
            {t(copy.programmes_hero.kien_tao_lo_trinh_hoc_thuat_phu)}
          </p>
        </div>

        <div
          className={`${styles["programmes-hero-stats"]}`}
          aria-label={t(copy.programmes_hero.aria_label_thong_tin_tong_quan_chuong)}
        >
          <div>
            <strong>{publishedCounts.master}{publishedCounts.masterSuffix}</strong>
            <span>
              {locale === "en" ? t("Chương trình Thạc sĩ") : <>{copy.programmes_hero.chuong_trinh}<br />{copy.programmes_hero.thac_si}</>}
            </span>
          </div>
          <div>
            <strong>{String(publishedCounts.doctoral).padStart(2, "0")}</strong>
            <span>
              {locale === "en" ? t("Chương trình Tiến sĩ") : <>{copy.programmes_hero.chuong_trinh}<br />{copy.programmes_hero.tien_si}</>}
            </span>
          </div>
          <div>
            <strong>{String(publishedCounts.internationalMaster).padStart(2, "0")}</strong>
            <span>
              {locale === "en" ? t("Chương trình Thạc sĩ liên kết quốc tế") : <>Chương trình Thạc sĩ<br />liên kết quốc tế</>}
            </span>
          </div>
        </div>
      </section>

      <ContentSlot slot="directory"><ProgrammeDirectory content={content.ProgrammeDirectory} entries={entries} /></ContentSlot>
      </ContentPageSections>
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
