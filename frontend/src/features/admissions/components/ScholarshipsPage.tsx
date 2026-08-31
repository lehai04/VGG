import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { AdmissionsMore } from "@/features/admissions/components/AdmissionsMore";
import styles from "./ScholarshipsPage.module.css";

const scholarships = [
  {
    number: "01",
    rate: "100%",
    kicker: "HỌC BỔNG TÀI NĂNG",
    title: "Ghi nhận năng lực nổi bật.",
    description:
      "Hỗ trợ lên đến 100% học phí dành cho người học có thành tích nổi bật ở bậc Đại học và có thành tích nghiên cứu, công bố khoa học ở bậc Thạc sĩ.",
    icon: Sparkles,
    tone: "red",
  },
  {
    number: "02",
    rate: "30%",
    kicker: "HỌC BỔNG ĐỒNG HÀNH",
    title: "Mở rộng cơ hội tiếp cận.",
    description:
      "Hỗ trợ 30% học phí toàn khóa dành cho thương binh, bệnh binh và người khuyết tật.",
    icon: HeartHandshake,
    tone: "navy",
  },
  {
    number: "03",
    rate: "10%",
    kicker: "HỌC BỔNG KẾT NỐI",
    title: "Tiếp nối hành trình Văn Lang.",
    description:
      "Dành cho cựu sinh viên Văn Lang; vợ, chồng hoặc anh, chị, em ruột cùng theo học; người dân tộc thiểu số; con thương binh, bệnh binh.",
    icon: GraduationCap,
    tone: "paper",
  },
] as const;

const encouragement = [
  {
    rate: "10%",
    title: "Nhóm ngành STEM",
    copy: "Hỗ trợ 10% học phí toàn khóa cho người học theo học các ngành thuộc nhóm STEM.",
    icon: FlaskConical,
  },
  {
    rate: "5%",
    title: "Khuyến khích đa dạng",
    copy: "Dành cho người học nữ, người dân tộc thiểu số, người khuyết tật, thương binh hoặc bệnh binh.",
    icon: HeartHandshake,
  },
] as const;

export function ScholarshipsPage() {
  return (
    <main className={styles.page} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="scholarship-title">
        <Image
          src="/images/pages/admissions/content/campus.jpg"
          alt="Không gian học tập tại Trường Đại học Văn Lang"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p>ADMISSIONS · FINANCIAL SUPPORT</p>
          <h1 id="scholarship-title">
            Học bổng
            <br />& hỗ trợ tài chính
          </h1>
          <span>Đầu tư cho tri thức. Đồng hành cùng những bước tiến dài.</span>
        </div>
        <a
          className={styles.scrollCue}
          href="#scholarship-intro"
          aria-label="Xem chính sách học bổng"
        >
          <span>KHÁM PHÁ</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <Link href="/admissions">Tuyển sinh</Link>
        <span>/</span>
        <strong>Học bổng</strong>
      </nav>

      <section className={styles.intro} id="scholarship-intro">
        <div className={styles.introCopy} data-reveal>
          <p className={styles.sectionIndex}>01 / CƠ HỘI HỌC TẬP</p>
          <h2>
            Chi phí phù hợp.
            <br />
            <em>Cơ hội rộng mở.</em>
          </h2>
          <p>
            Nhằm tạo điều kiện để người học tiếp cận chương trình sau đại học với chi phí phù hợp,
            Trường Đại học Văn Lang triển khai nhiều chính sách học bổng và ưu đãi học phí dành cho
            các nhóm đối tượng khác nhau.
          </p>
        </div>
        <figure className={styles.introMedia} data-reveal>
          <Image
            src="/images/pages/admissions/content/graduates.jpg"
            alt="Người học Văn Lang trong hành trình học tập và phát triển"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <span>Viện Sau Đại học · INVEST IN YOUR FUTURE</span>
        </figure>
      </section>

      <section className={styles.scholarshipSection} aria-labelledby="scholarship-levels-title">
        <header data-reveal>
          <p>HỆ THỐNG HỌC BỔNG</p>
          <h2 id="scholarship-levels-title">Mỗi thành tích đều xứng đáng được ghi nhận.</h2>
        </header>
        <div className={styles.scholarshipGrid}>
          {scholarships.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                className={`${styles.scholarshipCard} ${styles[item.tone]}`}
                key={item.number}
                data-reveal
                style={{ "--academic-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span className={styles.cardNumber}>{item.number}</span>
                <Icon className={styles.cardIcon} aria-hidden="true" />
                <strong>{item.rate}</strong>
                <small>{item.kicker}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.payment} aria-labelledby="payment-title">
        <figure className={styles.paymentMedia} data-reveal>
          <Image
            src="/images/pages/admissions/content/celebration.jpg"
            alt="Hành trình học tập chủ động tại Văn Lang"
            fill
            sizes="(max-width: 900px) 100vw, 38vw"
          />
          <span>04 / ƯU ĐÃI HỌC PHÍ</span>
        </figure>
        <div className={styles.paymentCopy} data-reveal>
          <p>ƯU ĐÃI HỌC PHÍ</p>
          <h2 id="payment-title">
            <strong>5%</strong> thêm cho kế hoạch chủ động.
          </h2>
          <p>
            Giảm thêm 5% trên mức học phí thực đóng khi thanh toán toàn bộ học phí trong một lần.
            Chính sách áp dụng với người học đang hưởng mức học bổng dưới 30%.
          </p>
        </div>
      </section>

      <section className={styles.encouragement} aria-labelledby="encouragement-title">
        <header data-reveal>
          <p>05 / HỌC BỔNG KHUYẾN KHÍCH</p>
          <h2 id="encouragement-title">Khuyến khích lựa chọn tạo tác động.</h2>
        </header>
        <div className={styles.encouragementGrid}>
          {encouragement.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                data-reveal
                style={{ "--academic-delay": `${index * 100}ms` } as React.CSSProperties}
              >
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <strong>{item.rate}</strong>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Check aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.closing}>
        <div data-reveal>
          <p>Viện Sau Đại học FINANCIAL SUPPORT</p>
          <h2>Đồng hành cùng bạn trong suốt hành trình phát triển chuyên môn.</h2>
        </div>
        <Link href="/admissions/nop-ho-so" data-reveal>
          Chuẩn bị hồ sơ <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

      <AdmissionsMore activeIndex={2} />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
