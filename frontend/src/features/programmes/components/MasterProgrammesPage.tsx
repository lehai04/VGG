import { catalogueCopy } from "@/data/programmes/catalogue-copy";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, CircleCheck } from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import { programmes } from "@/data/programmes";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { benefits } from "@/data/programmes/catalogue-config";
import styles from "./MasterProgrammesPage.module.css";

const copy = catalogueCopy.MasterProgrammesPage;

const masters = programmes.filter((programme) => programme.degree === "Thạc sĩ");
const fields = [...new Set(masters.map((programme) => programme.field))];

export function MasterProgrammesPage() {
  return (
    <main className={styles.page} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="master-title">
        <Image
          src={copy.hero.src_images_pages_programmes_content_graduates_jpg}
          alt={copy.hero.alt_nguoi_hoc_chuong_trinh_thac_si}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p>{copy.hero.vien_sau_dai_hoc_master_programmes}</p>
          <h1 id="master-title">
            {copy.hero.chuong_trinh}
            {" "}
            {copy.hero.thac_si}
          </h1>
          <span>{copy.hero.value_1}</span>
        </div>
        <a
          className={styles.scroll}
          href={copy.hero.href_master_overview}
          aria-label={copy.hero.aria_label_xem_tong_quan}
        >
          <ArrowDown />
        </a>
      </section>

      <nav className={styles.breadcrumb} aria-label={copy.shared.aria_label_breadcrumb}>
        <Link href={copy.shared.href}>{copy.shared.trang_chu}</Link>
        <span>{copy.shared.value_2}</span>
        <Link href={copy.shared.href_programmes}>{copy.shared.chuong_trinh_dao_tao}</Link>
        <span>{copy.shared.value_3}</span>
        <strong>{copy.shared.thac_si}</strong>
      </nav>

      <section className={styles.overview} id="master-overview" data-reveal>
        <div className={styles.overviewCopy}>
          <p className={styles.eyebrow}>{copy.master_overview.chuong_trinh_thac_si_tieng_viet}</p>
          <h2>{copy.master_overview.phat_trien_chieu_sau_chuyen_mon}</h2>
          <div className={styles.overviewText}>
            <p>{copy.master_overview.chuong_trinh_sau_dai_hoc_tai_van}</p>
            <p>{copy.master_overview.vien_sau_dai_hoc_hien_trien_khai}</p>
          </div>
        </div>
        <div className={styles.overviewMedia}>
          <Image
            src={copy.master_overview.src_images_pages_programmes_content_campus_jpg}
            alt={copy.master_overview.alt_khong_gian_dao_tao_va_nghien}
            fill
            sizes="(max-width: 950px) 100vw, 44vw"
          />
          <span>{copy.master_overview.vien_sau_dai_hoc_knowledge_in_practice}</span>
        </div>
      </section>

      <section className={styles.leadershipQuote} data-reveal>
        <div className={styles.quoteCopy}>
          <span aria-hidden="true">{copy.leadershipquote.value_4}</span>
          <blockquote>{copy.leadershipquote.sau_hon_30_nam_xay_dung_va}</blockquote>
          <p>
            <strong>{copy.leadershipquote.ban_lanh_dao_vien_sau_dai_hoc}</strong>
            <small>{copy.leadershipquote.vien_sau_dai_hoc_truong_dai_hoc}</small>
          </p>
        </div>
        <div className={styles.quotePortrait}>
          <Image
            src={copy.leadershipquote.src_images_pages_programmes_content_academic_leader}
            alt={copy.leadershipquote.alt_chan_dung_dai_dien_doi_ngu}
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
      </section>

      <section className={styles.why} aria-labelledby="why-master-title">
        <header data-reveal>
          <h2 id="why-master-title">{copy.why.tai_sao_nen_chon_chuong_trinh_thac}</h2>
          <p>{copy.why.mot_lo_trinh_duoc_thiet_ke_cho}</p>
        </header>
        <div className={styles.benefits}>
          {benefits.map(({ title, text }) => (
            <article key={title} data-reveal>
              <CircleCheck aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.directory} aria-labelledby="master-directory-title">
        <header data-reveal>
          <p className={styles.eyebrow}>{copy.directory.nganh_dao_tao}</p>
          <h2 id="master-directory-title">{copy.directory.kham_pha_20_nganh_thac_si}</h2>
        </header>
        <div className={styles.fieldGroups}>
          {fields.map((field, fieldIndex) => (
            <section key={field} data-reveal>
              <header>
                <span>{String(fieldIndex + 1).padStart(2, "0")}</span>
                <h3>{field}</h3>
              </header>
              <div>
                {masters
                  .filter((programme) => programme.field === field)
                  .map((programme) => (
                    <Link
                      href={`/programmes?degree=Thạc sĩ&search=${encodeURIComponent(programme.title)}`}
                      key={programme.id}
                    >
                      <span>{programme.title}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <Link className={styles.allProgrammes} href={copy.directory.href_programmes_degree_thac_si}>
          {copy.directory.xem_danh_muc_day_du}
          <ArrowUpRight />
        </Link>
      </section>

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
