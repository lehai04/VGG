import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { UnifiedSectionContent } from "@/features/content/components/SectionPages";
import { findGroup, subpageHref } from "@/data/site";
import styles from "./AdmissionsPage.module.css";

const group = findGroup("admissions")!;
export const metadata = { title: group.vi, description: group.intro };

const admissionsStats = [
  ["18", "chương trình thạc sĩ"],
  ["01", "chương trình tiến sĩ"],
  ["07", "nhóm thông tin hỗ trợ"],
] as const;

const programmeOptions = [
  {
    title: "Chương trình Thạc sĩ",
    description:
      "Dành cho người học muốn nâng cao năng lực chuyên môn, quản lý và khả năng ứng dụng tri thức vào thực tiễn nghề nghiệp.",
    href: "/programmes/thac-si",
    image: "/images/pages/admissions/content/graduates.jpg",
  },
  {
    title: "Chương trình Tiến sĩ",
    description:
      "Dành cho những nhà nghiên cứu và chuyên gia muốn phát triển tri thức mới, năng lực học thuật và tác động chuyên sâu.",
    href: "/programmes/tien-si",
    image: "/images/pages/admissions/content/campus.jpg",
  },
  {
    title: "Chương trình Quốc tế",
    description:
      "Mở rộng trải nghiệm học thuật toàn cầu thông qua chương trình hợp tác, mạng lưới đối tác và môi trường học tập quốc tế.",
    href: "/programmes/quoc-te",
    image: "/images/pages/admissions/content/graduates.jpg",
  },
] as const;

export default function AdmissionsPage() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="admissions-title">
        <Image
          className={styles.heroImage}
          src="/images/pages/admissions/content/graduates.jpg"
          alt="Học viên Văn Lang trong ngày tốt nghiệp"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <strong>Tuyển sinh</strong>
        </nav>
        <div className={styles.heroCopy}>
          <p>Viện Sau Đại học ADMISSIONS · 2026</p>
          <h1 id="admissions-title">
            <span>Một bước gần hơn</span>
            <span>đến tương lai</span>
            <span>bạn mong muốn</span>
          </h1>
          <strong>
            Tương lai luôn nằm trong tầm với khi bạn có một định hướng rõ ràng. Viện Sau Đại học đồng hành để bạn
            lựa chọn chương trình, chuẩn bị hồ sơ và tạo dựng bước tiến phù hợp với mục tiêu nghề
            nghiệp của mình.
          </strong>
        </div>
      </section>

      <section className={styles.introduction} aria-labelledby="journey-title">
        <div>
          <p className={styles.eyebrow}>YOUR JOURNEY STARTS HERE</p>
          <h2 id="journey-title">Chỉ cần bạn sẵn sàng, con đường sẽ luôn rộng mở.</h2>
        </div>
        <div>
          <h3>Bạn đang quan tâm điều gì?</h3>
          <p>
            18 chương trình thạc sĩ và 01 chương trình tiến sĩ mở ra nhiều lựa chọn để bạn phát
            triển chuyên môn từ chính kinh nghiệm, sở thích và thế mạnh của mình. Nếu bạn chưa xác
            định được lộ trình, đội ngũ tư vấn Viện Sau Đại học sẽ giúp bạn tìm ra hướng đi phù hợp.
          </p>
          <Link href="/programmes">
            Khám phá các chương trình <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={styles.story} aria-labelledby="admission-story-title">
        <figure className={styles.storyMedia} data-reveal>
          <Image
            src="/images/pages/admissions/content/campus.jpg"
            alt="Không gian học thuật tại Trường Đại học Văn Lang"
            fill
            sizes="(max-width: 800px) 100vw, 56vw"
          />
        </figure>
        <div className={styles.storyCopy} data-reveal>
          <p className={styles.eyebrow}>A CLEAR ADMISSION JOURNEY</p>
          <h2 id="admission-story-title">Không có một hành trình chung cho tất cả.</h2>
          <p>
            Viện Sau Đại học xem xét mỗi hồ sơ từ nền tảng học thuật, kinh nghiệm nghề nghiệp và định hướng phát
            triển của từng ứng viên. Điều quan trọng không chỉ là nơi bạn bắt đầu, mà còn là mục
            tiêu bạn muốn theo đuổi và giá trị bạn mong muốn tạo ra trong tương lai.
          </p>
          <p>
            Đội ngũ tuyển sinh cung cấp thông tin rõ ràng ở từng bước để bạn có thể chủ động chuẩn
            bị, hoàn thiện hồ sơ và đưa ra lựa chọn phù hợp.
          </p>
          <Link href={subpageHref("admissions", 0)}>
            Xem yêu cầu tuyển sinh <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={styles.profile} aria-labelledby="profile-title">
        <header data-reveal>
          <p className={styles.eyebrow}>Viện Sau Đại học GRADUATE PROFILE</p>
          <h2 id="profile-title">Một cộng đồng học thuật dành cho bước tiến mới.</h2>
        </header>
        <div className={styles.stats}>
          {admissionsStats.map(([value, label], index) => (
            <div
              key={label}
              data-reveal
              style={{ "--academic-delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.procedures} aria-labelledby="procedures-title">
        <header data-reveal>
          <p className={styles.eyebrow}>THỦ TỤC XÉT TUYỂN</p>
          <h2 id="procedures-title">Chương trình tuyển sinh Sau đại học</h2>
          <p>
            Tìm hiểu tổng quan về các bậc đào tạo sau đại học tại Viện Sau Đại học và chọn chương trình phù hợp
            để xem nội dung, điều kiện và lộ trình chi tiết.
          </p>
        </header>
        <div className={styles.programmeCards}>
          {programmeOptions.map((programme, index) => (
            <Link
              className={styles.programmeCard}
              href={programme.href}
              key={programme.title}
              data-reveal
              style={{ "--academic-delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <Image
                src={programme.image}
                alt={programme.title}
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
              />
              <span className={styles.programmeShade} />
              <span className={styles.programmeNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{programme.title}</h3>
                <p>{programme.description}</p>
                <strong>
                  Tìm hiểu thêm <ArrowUpRight aria-hidden="true" />
                </strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.finance} aria-label="Thông tin học phí và học bổng">
        <article className={styles.financeRow} id="hoc-phi" data-reveal>
          <div className={styles.financeCopy}>
            <h2>Học phí</h2>
            <p>
              Mỗi chương trình đào tạo sau đại học tại Trường Đại học Văn Lang có mức học phí khác
              nhau, được xây dựng phù hợp với nội dung đào tạo và lộ trình học tập. Người học có thể
              chủ động tham khảo, so sánh và lựa chọn chương trình phù hợp với định hướng của mình.
            </p>
            <Link href={subpageHref("admissions", 1)}>
              Tìm hiểu học phí <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.financeMedia}>
            <Image
              src="/images/pages/admissions/content/graduates.jpg"
              alt="Học viên Viện Sau Đại học trong môi trường học tập"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
        </article>

        <article className={styles.financeRow} data-reveal>
          <div className={styles.financeCopy}>
            <h2>Học bổng</h2>
            <p>
              Trường Đại học Văn Lang mang đến nhiều chính sách học bổng và hỗ trợ tài chính nhằm
              khuyến khích người học theo đuổi hành trình học thuật chuyên sâu. Khám phá các chương
              trình hiện có để chuẩn bị hồ sơ và lựa chọn cơ hội phù hợp nhất với bạn.
            </p>
            <Link href={subpageHref("admissions", 2)}>
              Khám phá học bổng <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.financeMedia}>
            <Image
              src="/images/pages/admissions/content/campus.jpg"
              alt="Không gian học tập tại Trường Đại học Văn Lang"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
        </article>
      </section>

      <UnifiedSectionContent section="admissions" />

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
