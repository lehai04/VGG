import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "@/i18n/components/LocalizedLink";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { findGroup, sectionSubpages, subpageHref } from "@/data/site";
import styles from "./AdmissionsSubpage.module.css";

const MEDIA = [
  "/images/programmers/pic_pro.jpg",
  "/images/hero/campus-hero.jpg",
];

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
    copy: "Đội ngũ tư vấn VGG sẵn sàng hỗ trợ từ bước tìm hiểu đầu tiên đến khi bạn chính thức trở thành học viên.",
  },
] as const;

/**
 * Component trang con /admissions/[slug] theo phong cách VisionMissionPage:
 * hero fullscreen → overview (paper) → highlights (navy) → quote (red) → nav grid.
 */
export function AdmissionsSubpage({
  slug,
}: {
  slug: string;
}) {
  const group = findGroup("admissions");
  const pages = sectionSubpages["admissions"];
  const page = pages?.find((p) => p.slug === slug);
  if (!group || !page) notFound();

  const index = pages.indexOf(page);
  const imgSrc = MEDIA[index % MEDIA.length];

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
          alt="Tuyển sinh VGG"
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
          href="#adm-overview"
          aria-label="Cuộn xuống xem nội dung"
        >
          <span>KHÁM PHÁ</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      {/* ── OVERVIEW (PAPER) ─────────────────────────────────── */}
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
            VGG kết nối nền tảng học thuật, trải nghiệm thực tiễn và một cộng
            đồng đa lĩnh vực để mỗi lựa chọn đều dẫn tới giá trị lâu dài.
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
          <Image
            src={imgSrc}
            alt={page.title}
            fill
            sizes="(max-width: 767px) 100vw, 44vw"
          />
          <figcaption>
            ADMISSIONS
            <br />
            {String(index + 1).padStart(2, "0")} / {pages.length.toString().padStart(2, "0")}
          </figcaption>
        </figure>
      </section>

      {/* ── HIGHLIGHTS (NAVY) ────────────────────────────────── */}
      <section className={styles.highlights} aria-labelledby="highlights-heading">
        <div className={styles.highlightsHead} data-reveal>
          <p className={styles.eyebrow}>TẠI SAO CHỌN VGG</p>
          <h2 id="highlights-heading">
            Ba cam kết của chúng tôi với bạn.
          </h2>
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

      {/* ── QUOTE (RED) ──────────────────────────────────────── */}
      <section className={styles.quote} aria-label="Triết lý VGG">
        <figure className={styles.quoteMedia} data-reveal>
          <Image
            src={MEDIA[(index + 1) % MEDIA.length]}
            alt="Cộng đồng học viên VGG"
            fill
            sizes="(max-width: 767px) 100vw, 44vw"
          />
        </figure>
        <div className={styles.quoteCopy} data-reveal>
          <p className={styles.eyebrow}>VGG PERSPECTIVE</p>
          <blockquote>
            &ldquo;Tri thức chỉ thật sự có ý nghĩa khi giúp con người tiến xa
            hơn và tạo ra thay đổi tích cực cho tổ chức và cộng đồng.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── NAV GRID — TẤT CẢ CÁC TRANG CON ────────────────── */}
      <nav className={styles.navStrip} aria-label="Tất cả mục tuyển sinh">
        <p>KHÁM PHÁ THÊM</p>
        <div className={styles.navList}>
          {pages.map((p, i) => (
            <Link
              key={p.slug}
              href={subpageHref("admissions", i)}
              className={`${styles.navItem} ${p.slug === slug ? styles.active : ""}`}
            >
              <span>{String(i + 1).padStart(2, "0")} — {p.title}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function admissionsSubpageMetadata(slug: string) {
  const page = sectionSubpages["admissions"]?.find((p) => p.slug === slug);
  return page ? { title: `${page.title} | Tuyển sinh VGG`, description: page.summary } : {};
}
