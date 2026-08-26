import Link from "@/i18n/components/LocalizedLink";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { findGroup, sectionSubpages, subpageHref, unifiedSectionDetails } from "@/data/site";
import { CmsPublishedItems } from "./CmsPublishedItems";

/**
 * TEMPLATE PAGE CHUNG cho admissions, research, global, student-success, news và resources.
 * Tiêu đề, mô tả và ảnh được lấy từ data/site.ts để tránh tạo sáu component gần giống nhau.
 */
export function SectionLanding({ section }: { section: string }) {
  const group = findGroup(section);
  if (!group) notFound();
  return (
    <main className="subpage" id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />
      <SectionHero section={section} />
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <b>{group.vi}</b>
      </div>
      <section className="academic-intro" data-reveal>
        <div>
          <p className="academic-kicker">01 — {group.en.toUpperCase()}</p>
          <h2>{group.headline}</h2>
        </div>
        <p>{group.intro}</p>
      </section>
      <section className="academic-index" aria-label={`Khám phá ${group.vi}`}>
        {group.items.map((item, index) => (
          <Link href={subpageHref(section, index)} key={item} data-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </section>
      <UnifiedSectionContent section={section} />
      <CmsPublishedItems section={section} />
      <section className="academic-feature" data-reveal>
        <div>
          <p>VGG PERSPECTIVE / 2026</p>
          <h2>
            Chuẩn quốc tế.
            <br />
            Lấy người học làm trung tâm.
          </h2>
        </div>
        <blockquote>
          “Mỗi chương trình, dịch vụ và trải nghiệm tại VGG đều được thiết kế để người học tiến xa
          hơn trong chuyên môn và tạo giá trị cho cộng đồng.”
        </blockquote>
      </section>
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function UnifiedSectionContent({ section }: { section: string }) {
  const group = findGroup(section);
  if (!group) return null;
  return (
    <section className="academic-unified-sections" aria-label={`Nội dung ${group.vi}`}>
      <header className="academic-unified-intro" data-reveal>
        <p>{group.en.toUpperCase()} · {group.vi.toUpperCase()}</p>
        <h2>Sẵn sàng cho<br />bước tiến mới.</h2>
        <span>{group.intro}</span>
      </header>
      <div className="academic-unified-list">
        {(sectionSubpages[section] ?? []).map((page, index) => (
          <details id={page.slug} key={page.slug} data-reveal>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{page.title}</strong>
              <i aria-hidden="true">+</i>
            </summary>
            <div className="academic-unified-panel">
              <p>{page.eyebrow}</p>
              <h3>{page.headline}</h3>
              {unifiedSectionDetails[`${section}/${page.slug}`] ? (
                <div className={`academic-unified-detail-grid${page.slug === "nop-ho-so" ? " is-process" : ""}`}>
                  {unifiedSectionDetails[`${section}/${page.slug}`].map((block, blockIndex) => (
                    <article key={block.title}>
                      <span>
                        {String(blockIndex + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4>{block.title}</h4>
                        {block.text && <p>{block.text}</p>}
                        {block.points && (
                          <ul>
                            {block.points.map((point) => <li key={point}>{point}</li>)}
                          </ul>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p>{page.summary}</p>
              )}
            </div>
          </details>
        ))}
        <Link className="academic-unified-cta" href="/admissions">
          Đăng ký ngay <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}

export function sectionMetadata(section: string) {
  const group = findGroup(section);
  if (!group) return {};
  const title = group.vi;
  const description = group.intro;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" as const },
    twitter: { card: "summary" as const, title, description },
  };
}

// SECTION DÙNG CHUNG: Hero của các landing page theo dữ liệu menu group.
function SectionHero({ section }: { section: string }) {
  const group = findGroup(section);
  if (!group) notFound();
  return (
    <section
      className="sub-hero"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(31,34,81,.94),rgba(31,34,81,.28)),url('${group.image}')`,
      }}
    >
      <div className="sub-hero-copy">
        <p>
          {group.en} · {group.vi}
        </p>
        <h1>{group.vi}</h1>
        <span>{group.kicker}</span>
      </div>
    </section>
  );
}

