import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { ArrowDown } from "lucide-react";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { ResearchHighlights } from "./ResearchHighlights";
import { StrategicPartnersCarousel } from "./StrategicPartnersCarousel";
import styles from "./ResearchLanding.module.css";
import researchCopy from '@/data/research-copy.json';
import partners from '@/data/research-partners.json';
import { websiteContent,websiteLayout } from '@/lib/website-content';
import {CmsPageSections} from '@/shared/components/CmsPageSections';

const goals = [
  { title: "Nâng cao chất lượng nghiên cứu", text: "Phát triển năng lực nghiên cứu của giảng viên và người học, gia tăng chất lượng công bố và khả năng tham gia các mạng lưới học thuật." },
  { title: "Chú trọng tính thực tiễn", text: "Khởi xướng các đề tài có khả năng ứng dụng, chuyển giao tri thức và góp phần giải quyết những vấn đề của tổ chức, xã hội và cộng đồng." },
  { title: "Đa dạng và quốc tế hóa", text: "Mở rộng hợp tác với các đối tác trong và ngoài nước thông qua dự án, hội nghị, hội thảo và trao đổi chuyên môn." },
] as const;

const researchFields = [
  {
    name: "Quản trị kinh doanh",
    image: "/images/pages/research/content/qtkd.avif",
    href: "/research/cum-nghien-cuu",
  },
  {
    name: "Công nghệ & Kỹ thuật",
    image: "/images/pages/research/content/congnghekythuat.avif",
    href: "/research/cum-nghien-cuu",
  },
  {
    name: "Môi trường & Phát triển bền vững",
    image: "/images/pages/research/content/moitruong.avif",
    href: "/research/doi-moi-sang-tao",
  },
  {
    name: "Dịch vụ & Du lịch",
    image: "/images/pages/research/content/dulich.avif",
    href: "/research/cum-nghien-cuu",
  },
  {
    name: "Thiết kế & Truyền thông",
    image: "/images/pages/research/content/thietke.avif",
    href: "/research/cum-nghien-cuu",
  },
  {
    name: "Khoa học Xã hội & Nhân văn",
    image: "/images/pages/research/content/xhnv.avif",
    href: "/research/cum-nghien-cuu",
  },
] as const;

const researchLinks = [
  { label: "Tổng quan", href: "/research" }, { label: "Các cụm nghiên cứu", href: "/research/cum-nghien-cuu" },
  { label: "Dự án nghiên cứu", href: "/research/du-an" }, { label: "Công bố khoa học", href: "/research/cong-bo" },
  { label: "Hội thảo & Sự kiện", href: "/research/hoi-thao" }, { label: "Đổi mới sáng tạo", href: "/research/doi-moi-sang-tao" },
  { label: "Hợp tác doanh nghiệp", href: "/research/hop-tac-doanh-nghiep" },
] as const;

export async function ResearchLanding() {
  const content = await websiteContent('research', { ...researchCopy, goals, researchFields, partners });
  const layout=await websiteLayout('research');
  return (
    <main className={styles.vluResearch} id="main-content">
      <SiteHeader compact />

      <CmsPageSections pageId="research" layout={layout}>
      <section data-site-banner data-cms-slot="hero" className={styles.hero}>
        <Image src={content.hero.image} alt={content.hero.alt} fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div data-banner-copy className={styles.heroCopy} data-reveal>
          <p data-banner-label>{content.hero.label.split(" · ")[0]}</p>
          <h1 data-banner-title>{content.hero.title}</h1>
          <span data-banner-description>{content.hero.intro}</span>
        </div>
        <a href="#overview" className={styles.heroDown} aria-label="Xem nội dung"><ArrowDown /></a>
      </section>

      <section className={styles.overview} id="overview" data-reveal>
        <div>
          <p data-section-label>{content.overview.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, "")}</p>
          <h2 data-section-subtitle>{content.overview.title}</h2>
          <p>{content.overview.text}</p>
        </div>
        <figure><Image src={content.overview.image} alt={content.overview.alt} fill sizes="(max-width: 800px) 100vw, 42vw" /></figure>
      </section>

      <section className={styles.goals} id="goals">
        <header data-reveal>
          <p data-section-label>{content.goalsHeading.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, "")}</p>
          <h2 data-section-subtitle>{content.goalsHeading.title}</h2>
          <span>{content.goalsHeading.intro}</span>
        </header>
        <div>
          {content.goals.map((goal) => (
            <article key={goal.title} data-reveal>
              <span aria-hidden="true" />
              <h3>{goal.title}</h3>
              <p>{goal.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fields} id="fields">
        <header data-reveal>
          <p data-section-label>{content.fieldsHeading.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, "")}</p>
          <h2 data-section-subtitle>{content.fieldsHeading.title}</h2>
          <span>{content.fieldsHeading.intro}</span>
        </header>
        <div className={styles.fieldGrid}>
          {content.researchFields.map((field, index) => (
            <div className={styles.fieldCard} key={field.name} data-reveal>
              <Image src={field.image} alt={field.name} fill sizes="(max-width: 700px) 100vw, 33vw" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{field.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <ResearchHighlights />

      <section data-cms-slot="partners" className={styles.partners} aria-labelledby="strategic-partners-title">
        <header className={styles.partnerLead} data-reveal>
          <h2 data-section-label id="strategic-partners-title">{content.partnersHeading.title}</h2>
          <p>{content.partnersHeading.text}</p>
        </header>
        <StrategicPartnersCarousel partners={content.partners} />
      </section>

      <section id="hop-tac-doanh-nghiep" className={styles.industryNetwork} aria-labelledby="industry-network-title">
        <div className={styles.industryRedRail} aria-hidden="true" />
        <figure className={styles.industryPhoto} data-reveal>
          <Image src={content.industry.image} alt={content.industry.alt} fill sizes="(max-width: 900px) 100vw, 55vw" />
          <figcaption>{content.industry.captionLine1}<br />{content.industry.captionLine2}</figcaption>
        </figure>
        <div className={styles.industryContent} data-reveal>
          <header>
            <strong>{content.industry.count}</strong>
            <div>
              <h2 data-section-label id="industry-network-title">{content.industry.title}</h2>
              <p>{content.industry.intro}</p>
            </div>
          </header>
          <p className={styles.industryLead}>{content.industry.text}</p>
          <figure className={styles.partnerLogoBoard}>
            <Image
              src={content.industry.logoImage}
              alt={content.industry.logoAlt}
              width={832}
              height={800}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          </figure>
        </div>
      </section>

      </CmsPageSections>
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function ResearchGateway({ activeHref = "/research" }: { activeHref?: string }) {
  return <section className={styles.admissionGateway} aria-labelledby="research-admission-title"><div className={styles.admissionScene}><Image src="/images/pages/research/content/campus.jpg" alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang" fill sizes="100vw" /><div className={styles.admissionCard} data-reveal><h2>Khám phá thêm</h2><p>Tìm hiểu các cụm nghiên cứu, dự án, công bố khoa học và hoạt động đổi mới để kết nối sâu hơn với hệ sinh thái nghiên cứu của Viện Sau Đại học.</p><div><Link href="/research/cum-nghien-cuu">Các cụm nghiên cứu</Link><Link href="/research/du-an">Dự án nghiên cứu</Link></div></div></div><div className={styles.admissionNav}><h2 id="research-admission-title">Nghiên cứu &amp; Đổi mới</h2><nav aria-label="Điều hướng Nghiên cứu và Đổi mới">{researchLinks.map((item) => <Link className={item.href === activeHref ? styles.activeAdmissionLink : undefined} href={item.href} key={item.href}>{item.label}</Link>)}</nav></div></section>;
}
