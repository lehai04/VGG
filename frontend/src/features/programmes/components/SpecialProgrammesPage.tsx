import { catalogueCopy } from "@/data/programmes/catalogue-copy";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, CircleCheck } from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import {
  doctoralConfig,
  internationalConfig,
  type PageConfig,
} from "@/data/programmes/catalogue-config";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import styles from "./MasterProgrammesPage.module.css";

const copy = catalogueCopy.SpecialProgrammesPage;

function SpecialProgrammesPage({ config }: { config: PageConfig }) {
  return (
    <main
      className={`${styles.page} ${config.variant === "doctoral" ? styles.doctoral : ""}`}
      id="main-content"
    >
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="special-programme-title">
        <Image
          src={copy.hero.src_images_pages_programmes_content_graduates_jpg}
          alt={config.title}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p>{config.eyebrow}</p>
          <h1 id="special-programme-title">{config.title}</h1>
          <span>{config.stats}</span>
        </div>
        <a
          className={styles.scroll}
          href={copy.hero.href_special_overview}
          aria-label={copy.hero.aria_label_xem_tong_quan}
        >
          <ArrowDown />
        </a>
      </section>

      <nav className={styles.breadcrumb} aria-label={copy.shared.aria_label_breadcrumb}>
        <Link href={copy.shared.href}>{copy.shared.trang_chu}</Link>
        <span>{copy.shared.value_1}</span>
        <Link href={copy.shared.href_programmes}>{copy.shared.chuong_trinh_dao_tao}</Link>
        <span>{copy.shared.value_2}</span>
        <strong>{config.title}</strong>
      </nav>

      <section className={styles.overview} id="special-overview" data-reveal>
        <div className={styles.overviewCopy}>
          <p className={styles.eyebrow}>{config.overviewEyebrow}</p>
          <h2>{config.overviewTitle}</h2>
          <div className={styles.overviewText}>
            {config.overview.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
        <div className={styles.overviewMedia}>
          <Image
            src={copy.special_overview.src_images_pages_programmes_content_campus_jpg}
            alt={copy.special_overview.alt_khong_gian_dao_tao_va_nghien}
            fill
            sizes="(max-width: 950px) 100vw, 44vw"
          />
          <span>{copy.special_overview.vien_sau_dai_hoc_knowledge_without_borders}</span>
        </div>
      </section>

      <section className={`${styles.leadershipQuote} ${styles.quoteImageRight}`} data-reveal>
        <div className={styles.quoteCopy}>
          <span aria-hidden="true">{copy.leadershipquote_quoteimageright.value_3}</span>
          <blockquote>{config.quote}</blockquote>
          <p>
            <strong>{config.quoteBy}</strong>
            <small>{config.quoteRole}</small>
          </p>
        </div>
        <div className={styles.quotePortrait}>
          <Image
            src={
              copy.leadershipquote_quoteimageright
                .src_images_pages_programmes_content_academic_leader
            }
            alt={copy.leadershipquote_quoteimageright.alt_dai_dien_lanh_dao_hoc_thuat}
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
      </section>

      <section className={styles.why} aria-labelledby="special-why-title">
        <header data-reveal>
          <h2 id="special-why-title">{config.whyTitle}</h2>
          <p>{config.whyLead}</p>
        </header>
        <div className={styles.benefits}>
          {config.benefits.map((benefit) => (
            <article key={benefit.title} data-reveal>
              <CircleCheck aria-hidden="true" />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.directory} aria-labelledby="special-directory-title">
        <header data-reveal>
          <p className={styles.eyebrow}>{config.directoryEyebrow}</p>
          <h2 id="special-directory-title">{config.directoryTitle}</h2>
        </header>
        <div className={styles.fieldGroups}>
          {config.groups.map((group, groupIndex) => (
            <section key={group.title} data-reveal>
              <header>
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
              </header>
              <div>
                {group.items.map((item) => (
                  <Link href={item.href} key={item.label}>
                    {item.label}
                    <ArrowUpRight />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        <Link className={styles.allProgrammes} href={copy.directory.href_programmes}>
          {copy.directory.xem_tat_ca_chuong_trinh}
          <ArrowUpRight />
        </Link>
      </section>

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function DoctoralProgrammesPage() {
  return <SpecialProgrammesPage config={doctoralConfig} />;
}

export function InternationalProgrammesPage() {
  return <SpecialProgrammesPage config={internationalConfig} />;
}
