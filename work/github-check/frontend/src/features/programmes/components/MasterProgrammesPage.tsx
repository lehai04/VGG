import Image from "next/image";
import { ArrowDown, ArrowUpRight, CircleCheck } from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import { programmes } from "@/data/programmes";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import styles from "./MasterProgrammesPage.module.css";

const masters = programmes.filter((programme) => programme.degree === "Thạc sĩ");
const fields = [...new Set(masters.map((programme) => programme.field))];

const benefits = [
  { title: "Phương thức xét tuyển linh hoạt", text: "Tuyển sinh theo hình thức xét tuyển với yêu cầu rõ ràng về trình độ chuyên môn và năng lực ngoại ngữ." },
  { title: "Lộ trình tinh gọn", text: "Thời gian đào tạo từ 18 đến 24 tháng, giúp người học nâng cao chuyên môn mà vẫn duy trì nhịp độ sự nghiệp." },
  { title: "Thời gian biểu linh hoạt", text: "Kế hoạch học tập phù hợp với người đang đi làm, tạo điều kiện cân bằng giữa học tập, công việc và cuộc sống." },
  { title: "Học bổng và hỗ trợ", text: "Nhiều chính sách học bổng và hỗ trợ tài chính giúp người học chủ động hơn trên hành trình học tập chuyên sâu." },
] as const;

export function MasterProgrammesPage() {
  return (
    <main className={styles.page} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="master-title">
        <Image src="/images/pages/programmes/content/graduates.jpg" alt="Người học chương trình Thạc sĩ Văn Lang" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p>Viện Sau Đại học · MASTER PROGRAMMES</p>
          <h1 id="master-title">Chương trình<br />Thạc sĩ</h1>
          <span>18 chương trình · 05 khối ngành · 18–24 tháng</span>
        </div>
        <a className={styles.scroll} href="#master-overview" aria-label="Xem tổng quan"><ArrowDown /></a>
      </section>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link><span>/</span><Link href="/programmes">Chương trình đào tạo</Link><span>/</span><strong>Thạc sĩ</strong>
      </nav>

      <section className={styles.overview} id="master-overview" data-reveal>
        <div className={styles.overviewCopy}>
          <p className={styles.eyebrow}>CHƯƠNG TRÌNH THẠC SĨ · TIẾNG VIỆT</p>
          <h2>Phát triển chiều sâu chuyên môn.</h2>
          <div className={styles.overviewText}>
            <p>Chương trình Sau đại học tại Văn Lang không ngừng được cập nhật theo định hướng gắn kết học thuật với thực tiễn. Với lộ trình đào tạo từ 18 đến 24 tháng, mỗi ngành học mang đến mục tiêu phát triển và cơ hội nghề nghiệp rõ ràng.</p>
            <p>Viện Sau Đại học hiện triển khai 18 chương trình Thạc sĩ thuộc 05 khối ngành, trang bị cho người học năng lực chuyên môn nâng cao, tư duy nghiên cứu, khả năng giải quyết vấn đề và nền tảng để phát triển sự nghiệp bền vững.</p>
          </div>
        </div>
        <div className={styles.overviewMedia}>
          <Image src="/images/pages/programmes/content/campus.jpg" alt="Không gian đào tạo và nghiên cứu tại Văn Lang" fill sizes="(max-width: 950px) 100vw, 44vw" />
          <span>Viện Sau Đại học · KNOWLEDGE IN PRACTICE</span>
        </div>
      </section>

      <section className={styles.leadershipQuote} data-reveal>
        <div className={styles.quoteCopy}>
          <span aria-hidden="true">“</span>
          <blockquote>
            Sau hơn 30 năm xây dựng và trưởng thành, Văn Lang không ngừng cung
            cấp nguồn nhân lực chất lượng cao, đáp ứng yêu cầu từ các nhà tuyển
            dụng trong và ngoài nước. Chương trình sau đại học trang bị nền tảng
            vững chắc cho các nhà quản lý, chuyên gia, nhà nghiên cứu và giảng
            viên tương lai. Đến nay, Viện Sau Đại học đã triển khai 18 chương trình Thạc sĩ
            thuộc nhiều lĩnh vực chuyên sâu.
          </blockquote>
          <p><strong>Ban lãnh đạo Viện Sau Đại học</strong><small>Viện Sau đại học · Trường Đại học Văn Lang</small></p>
        </div>
        <div className={styles.quotePortrait}>
          <Image
            src="/images/pages/programmes/content/academic-leader.avif"
            alt="Chân dung đại diện đội ngũ lãnh đạo học thuật"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
      </section>

      <section className={styles.why} aria-labelledby="why-master-title">
        <header data-reveal>
          <h2 id="why-master-title">Tại sao nên chọn chương trình Thạc sĩ tại Viện Sau Đại học?</h2>
          <p>Một lộ trình được thiết kế cho người học muốn tiến xa hơn trong chuyên môn mà không tách rời thực tiễn nghề nghiệp.</p>
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
          <p className={styles.eyebrow}>NGÀNH ĐÀO TẠO</p>
          <h2 id="master-directory-title">Khám phá 18 ngành Thạc sĩ</h2>
        </header>
        <div className={styles.fieldGroups}>
          {fields.map((field, fieldIndex) => (
            <section key={field} data-reveal>
              <header><span>{String(fieldIndex + 1).padStart(2, "0")}</span><h3>{field}</h3></header>
              <div>
                {masters.filter((programme) => programme.field === field).map((programme) => (
                  <Link href={`/programmes?degree=Thạc sĩ&search=${encodeURIComponent(programme.title)}`} key={programme.id}>
                    <span>{programme.title}</span><ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        <Link className={styles.allProgrammes} href="/programmes?degree=Thạc sĩ">Xem danh mục đầy đủ <ArrowUpRight /></Link>
      </section>

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
