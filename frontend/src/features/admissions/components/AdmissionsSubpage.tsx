import Image from "next/image";
import { ArrowDown, CalendarDays, GraduationCap } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "@/i18n/components/LocalizedLink";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { ApplicationProcess } from "@/features/admissions/components/ApplicationProcess";
import { AdmissionsMore } from "@/features/admissions/components/AdmissionsMore";
import { findGroup, sectionSubpages } from "@/data/site";
import styles from "./AdmissionsSubpage.module.css";

const MEDIA = ["/images/pages/admissions/content/graduates.jpg", "/images/pages/admissions/content/campus.jpg"];

/** 3 highlights áp dụng cho mọi trang con tuyển sinh */
const HIGHLIGHTS = [
  {
    num: "01",
    title: "Thông tin minh bạch",
    copy: "Mọi điều kiện, học phí, học bổng và quy trình đều được trình bày rõ ràng, dễ tiếp cận để bạn chủ động lên kế hoạch.",
  },
  {
    num: "02",
    title: "Hành trình linh hoạt",
    copy: "Lộ trình tuyển sinh được thiết kế phù hợp với người học đang phát triển sự nghiệp — không đánh đổi công việc để học tập.",
  },
  {
    num: "03",
    title: "Đồng hành đến cùng",
    copy: "Đội ngũ tư vấn Viện Sau Đại học sẵn sàng hỗ trợ từ bước tìm hiểu đầu tiên đến khi bạn chính thức trở thành học viên.",
  },
] as const;

const ADMISSION_ROUNDS = [
  {
    round: "Đợt 01",
    year: "2026",
    scholarship: "08/12/2025",
    regular: "15/12/2025",
  },
  {
    round: "Đợt 02",
    year: "2026",
    scholarship: "08/04/2026",
    regular: "15/04/2026",
  },
  {
    round: "Đợt 03",
    year: "2026",
    scholarship: "29/08/2026",
    regular: "05/09/2026",
  },
] as const;

/**
 * Component trang con /admissions/[slug] theo phong cách VisionMissionPage:
 * hero fullscreen → overview (paper) → highlights (navy) → quote (red) → nav grid.
 */
export function AdmissionsSubpage({ slug }: { slug: string }) {
  const group = findGroup("admissions");
  const pages = sectionSubpages["admissions"];
  const page = pages?.find((p) => p.slug === slug);
  if (!group || !page) notFound();

  const index = pages.indexOf(page);
  const imgSrc = MEDIA[index % MEDIA.length];
  const isImportantDates = page.slug === "nop-ho-so";

  // Hero title: nếu có " & " tách thành 2 dòng animate; còn lại 1 dòng.
  const titleParts = page.title.includes(" & ")
    ? [page.title.split(" & ")[0], `& ${page.title.split(" & ")[1]}`]
    : [page.title];

  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="adm-sub-title">
        <Image
          className={styles.heroImage}
          src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=86"
          alt="Tuyển sinh Viện Sau Đại học"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroCopy}>
          <p>{page.eyebrow.toUpperCase()}</p>
          <h1 id="adm-sub-title">
            {titleParts.map((part, i) => (
              <span key={i}>
                <i>{part}</i>
              </span>
            ))}
          </h1>
          <span>{page.headline}</span>
        </div>
        <a
          className={styles.scrollCue}
          href={slug === "nop-ho-so" ? "#application-process" : "#adm-overview"}
          aria-label="Cuộn xuống xem nội dung"
        >
          <span>KHÁM PHÁ</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      {/* ── OVERVIEW (PAPER) ─────────────────────────────────── */}
      {slug !== "nop-ho-so" && (
        <section
          className={styles.overview}
          id="adm-overview"
          aria-labelledby="adm-overview-heading"
        >
          <div className={styles.overviewCopy} data-reveal>
            <p className={styles.eyebrow}>
              {String(index + 1).padStart(2, "0")} / {page.title.toUpperCase()}
            </p>
            <h2 id="adm-overview-heading">{page.headline}</h2>
            <p className={styles.lead}>{page.summary}</p>
            <p>
              Viện Sau Đại học kết nối nền tảng học thuật, trải nghiệm thực tiễn và một cộng đồng đa lĩnh vực để
              mỗi lựa chọn đều dẫn tới giá trị lâu dài.
            </p>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Trang chủ</Link>
              <span>/</span>
              <Link href="/admissions">{group.vi}</Link>
              <span>/</span>
              <b>{page.title}</b>
            </nav>
          </div>
          <figure className={styles.overviewMedia} data-reveal>
            <Image src={imgSrc} alt={page.title} fill sizes="(max-width: 767px) 100vw, 44vw" />
            <figcaption>
              ADMISSIONS
              <br />
              {String(index + 1).padStart(2, "0")} / {pages.length.toString().padStart(2, "0")}
            </figcaption>
          </figure>
        </section>
      )}

      {slug === "nop-ho-so" && <ApplicationProcess />}

      {/* ── HIGHLIGHTS (NAVY) ────────────────────────────────── */}
      <section className={styles.highlights} aria-labelledby="highlights-heading">
        <div className={styles.highlightsHead} data-reveal>
          <p className={styles.eyebrow}>TẠI SAO CHỌN Viện Sau Đại học</p>
          <h2 id="highlights-heading">Ba cam kết của chúng tôi với bạn.</h2>
        </div>
        <div className={styles.highlightsGrid}>
          {HIGHLIGHTS.map((item, i) => (
            <article
              key={item.num}
              className={styles.highlightItem}
              data-reveal
              style={{ "--academic-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className={styles.highlightNum}>{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── QUOTE hoặc CÁC MỐC THỜI GIAN ───────────────────── */}
      {isImportantDates ? (
        <section
          className={styles.dates}
          id="cac-moc-thoi-gian"
          aria-labelledby="important-dates-title"
        >
          <header className={styles.datesHead} data-reveal>
            <p className={styles.eyebrow}>ADMISSIONS CALENDAR · 2026</p>
            <h2 id="important-dates-title">Các mốc thời gian quan trọng</h2>
            <div className={styles.intakeFrequency}>
              <CalendarDays aria-hidden="true" />
              <span>Thời gian dự tuyển và đăng ký học bổng</span>
              <strong>03 đợt / năm</strong>
            </div>
          </header>
          <div className={styles.roundGrid}>
            {ADMISSION_ROUNDS.map((item, roundIndex) => (
              <article
                className={styles.roundCard}
                key={item.round}
                data-reveal
                style={{ "--academic-delay": `${roundIndex * 90}ms` } as React.CSSProperties}
              >
                <header>
                  <span>{item.round}</span>
                  <strong>{item.year}</strong>
                </header>
                <div className={styles.milestone}>
                  <GraduationCap aria-hidden="true" />
                  <span>Đăng ký học bổng</span>
                  <time dateTime={item.scholarship.split("/").reverse().join("-")}>
                    {item.scholarship}
                  </time>
                </div>
                <div className={styles.milestone}>
                  <CalendarDays aria-hidden="true" />
                  <span>Không đăng ký học bổng</span>
                  <time dateTime={item.regular.split("/").reverse().join("-")}>{item.regular}</time>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className={styles.quote} aria-label="Triết lý Viện Sau Đại học">
          <figure className={styles.quoteMedia} data-reveal>
            <Image
              src={MEDIA[(index + 1) % MEDIA.length]}
              alt="Cộng đồng học viên Viện Sau Đại học"
              fill
              sizes="(max-width: 767px) 100vw, 44vw"
            />
          </figure>
          <div className={styles.quoteCopy} data-reveal>
            <p className={styles.eyebrow}>Viện Sau Đại học PERSPECTIVE</p>
            <blockquote>
              &ldquo;Tri thức chỉ thật sự có ý nghĩa khi giúp con người tiến xa hơn và tạo ra thay
              đổi tích cực cho tổ chức và cộng đồng.&rdquo;
            </blockquote>
          </div>
        </section>
      )}

      <AdmissionsMore activeIndex={index} />

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function admissionsSubpageMetadata(slug: string) {
  const page = sectionSubpages["admissions"]?.find((p) => p.slug === slug);
  return page ? { title: `${page.title} | Tuyển sinh Viện Sau Đại học`, description: page.summary } : {};
}
