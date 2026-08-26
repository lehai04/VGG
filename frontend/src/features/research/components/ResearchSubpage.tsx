/**
 * ResearchSubpage.tsx — Layout chuyên biệt cho các subpage /research/[slug].
 * Thay thế SubpageDetail generic bằng thiết kế editorial phong phú hơn,
 * với nội dung riêng cho từng slug lấy từ data/research.ts.
 */
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { findResearchSubpage, researchSubpages } from "@/data/research";
import { ResearchGateway } from "./ResearchLanding";
import styles from "./ResearchSubpage.module.css";

/** Labels tiếng Việt khớp với thứ tự researchSubpages */
const navLabels: Record<string, string> = {
  "cum-nghien-cuu": "Các cụm nghiên cứu",
  "du-an": "Dự án nghiên cứu",
  "cong-bo": "Công bố khoa học",
  "hoi-thao": "Hội thảo & Sự kiện",
  "doi-moi-sang-tao": "Đổi mới sáng tạo",
  "hop-tac-doanh-nghiep": "Hợp tác doanh nghiệp",
};

export function ResearchSubpage({ slug }: { slug: string }) {
  const data = findResearchSubpage(slug);
  if (!data) notFound();

  // 3 related: lấy slugs khác, exclude slug hiện tại
  const related = researchSubpages.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className={styles.page} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* ─── HERO — half split ─── */}
      <section className={styles.hero}>
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.heroEyebrow}>{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <span className={styles.heroSubtitle}>{data.headline}</span>
        </div>
        <div className={styles.heroMedia}>
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.heroImage}
          />
          <div className={styles.heroImageOverlay} />
        </div>
        <a className={styles.heroScroll} href="#overview" aria-label="Xem nội dung">
          <ArrowDownRight strokeWidth={1.5} />
        </a>
      </section>

      {/* ─── BREADCRUMB ─── */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span className={styles.breadSep}>›</span>
        <Link href="/research">Nghiên cứu &amp; Đổi mới</Link>
        <span className={styles.breadSep}>›</span>
        <b>{data.title}</b>
      </nav>

      {/* ─── OVERVIEW ─── */}
      <section className={styles.overview} id="overview" data-reveal>
        <div className={styles.overviewLeft}>
          <p className={styles.kicker}>01 — TỔNG QUAN</p>
          <h2>{data.title}</h2>
        </div>
        <div className={styles.overviewRight}>
          <p>{data.intro}</p>
          <p>
            Viện Sau Đại học kết nối nền tảng học thuật nghiêm túc với nhu cầu thực tiễn của
            xã hội — để mỗi kết quả nghiên cứu đều dẫn tới hành động và tạo
            giá trị lâu dài.
          </p>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <div className={styles.statsSection} data-reveal>
        {data.stats.map((stat, i) => (
          <div className={styles.statCell} key={stat.label}>
            <span className={styles.statIdx}>{String(i + 1).padStart(2, "0")}</span>
            <strong className={styles.statVal}>{stat.value}</strong>
            <p className={styles.statLbl}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ─── HIGHLIGHTS ─── */}
      <section className={styles.highlights}>
        <header className={styles.highlightsHeader} data-reveal>
          <p className={styles.kicker}>02 — NỘI DUNG TRỌNG TÂM</p>
          <h2>
            Điểm nổi bật
            <br />
            đáng chú ý.
          </h2>
        </header>
        <div className={styles.highlightList}>
          {data.highlights.map((hl) => (
            <div className={styles.highlightItem} key={hl.index} data-reveal>
              <span className={styles.hlIndex}>{hl.index}</span>
              <div className={styles.hlBody}>
                <h3>{hl.title}</h3>
                <p>{hl.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className={styles.quoteSection} data-reveal>
        <p className={styles.quoteLabel}>Viện Sau Đại học / PERSPECTIVE</p>
        <blockquote>“{data.quote}”</blockquote>
        <p className={styles.quoteAttrib}>— {data.quoteAttrib}</p>
      </section>

      {/* ─── RELATED ─── */}
      <section className={styles.related}>
        <header className={styles.relatedHeader} data-reveal>
          <p className={styles.kicker}>03 — KHÁM PHÁ TIẾP</p>
          <h2>Các chủ đề liên quan.</h2>
        </header>
        <div className={styles.relatedList}>
          {related.map((item, i) => (
            <Link
              href={`/research/${item.slug}`}
              key={item.slug}
              className={styles.relatedItem}
              data-reveal
            >
              <span className={styles.relatedIdx}>{String(i + 1).padStart(2, "0")}</span>
              <strong>{navLabels[item.slug] ?? item.title}</strong>
              <ArrowUpRight className={styles.relatedArrow} strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </section>

      <ResearchGateway activeHref={`/research/${slug}`} />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function researchSubpageMetadata(slug: string) {
  const data = findResearchSubpage(slug);
  if (!data) return {};
  return {
    title: data.title,
    description: data.intro.slice(0, 160),
    openGraph: { title: data.title, description: data.intro.slice(0, 160), type: "article" as const },
  };
}
