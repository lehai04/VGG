import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { findGroup, subpageHref } from "@/data/site";

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
