import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, StickyActions } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { findGroup } from "@/data/site";

export function SectionLanding({ section }: { section: string }) {
  const group = findGroup(section);
  if (!group) notFound();
  return (
    <main className="subpage" id="main-content">
      <SiteHeader compact />
      <SectionHero section={section} />
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <b>{group.vi}</b>
      </div>
      <section className="sub-intro">
        <div>
          <p className="eyebrow">{group.en.toUpperCase()}</p>
          <h2>{group.headline}</h2>
        </div>
        <p>{group.intro}</p>
      </section>
      <section className="sub-feature">
        <div>
          <p>VGG PERSPECTIVE</p>
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
      <CallToAction />
      <SiteFooter />
      <StickyActions />
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
function CallToAction() {
  return (
    <section className="sub-cta">
      <div>
        <p>READY FOR THE NEXT STEP?</p>
        <h2>Bắt đầu hành trình cùng VGG.</h2>
      </div>
      <Link href="/admissions">Tìm hiểu tuyển sinh →</Link>
    </section>
  );
}
