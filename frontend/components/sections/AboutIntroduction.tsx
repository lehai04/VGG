import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/components/sections/DiscoverMore";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import styles from "./AboutIntroduction.module.css";

const stats = [
  ["18", "Chương trình Thạc sĩ"],
  ["01", "Chương trình Tiến sĩ"],
  ["05", "Nhóm ngành đào tạo"],
  ["18–24", "Tháng đào tạo phổ biến"],
] as const;

const areas = [
  "Kỹ thuật, Môi trường & Công nghệ",
  "Kinh doanh & Quản lý",
  "Du lịch & Khách sạn",
  "Luật, Nhân văn & Truyền thông",
  "Thiết kế & Mỹ thuật Ứng dụng",
] as const;

const connections = ["Người học", "Giảng viên", "Chuyên gia", "Doanh nghiệp", "Cộng đồng học thuật"] as const;

export function AboutIntroduction() {
  return (
    <main className={styles.page} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* Hero mở đầu: giới thiệu ngắn gọn, ưu tiên hình ảnh và thông điệp thương hiệu. */}
      <section className={styles.hero} aria-labelledby="about-title">
        <Image
          className={styles.heroImage}
          src="/images/hero/campus-hero.jpg"
          alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ABOUT VGG · GIỚI THIỆU</p>
          <h1 id="about-title">Giới thiệu</h1>
          <p className={styles.heroLead}>Viện Đào tạo Sau đại học<br />Trường Đại học Văn Lang</p>
          <p className={styles.heroStatement}>Một hành trình học thuật cho bước tiến tiếp theo.</p>
        </div>
        <a className={styles.scrollCue} href="#about-institute" aria-label="Khám phá về VGG">
          <span>Khám phá</span><ArrowDown aria-hidden="true" />
        </a>
      </section>

      {/* Phần giới thiệu chính sử dụng bố cục ảnh bất đối xứng để tạo nhịp editorial. */}
      <section className={styles.intro} id="about-institute">
        <div className={styles.introCopy} data-reveal>
          <p className={styles.kicker}>VIỆN ĐÀO TẠO SAU ĐẠI HỌC</p>
          <h2>Nơi học thuật gặp gỡ <em>thực tiễn nghề nghiệp.</em></h2>
          <div className={styles.introText}>
            <p><strong>Viện Đào tạo Sau đại học – Trường Đại học Văn Lang</strong> là đơn vị phụ trách đào tạo trình độ sau đại học.</p>
            <p>Các chương trình hướng đến sự kết nối giữa <strong>nền tảng học thuật, năng lực nghiên cứu</strong> và thực tiễn nghề nghiệp, giúp người học chủ động kiến tạo bước tiến mới.</p>
          </div>
        </div>
        <div className={styles.introMedia} data-reveal>
          <figure className={styles.campusFrame}>
            <Image src="/images/hero/campus-hero.jpg" alt="Không gian học tập tại Văn Lang" fill sizes="(max-width: 900px) 90vw, 44vw" />
          </figure>
          <figure className={styles.studentFrame}>
            <Image src="/images/programmers/pic_pro.jpg" alt="Học viên tốt nghiệp tại Văn Lang" fill sizes="(max-width: 900px) 48vw, 18vw" />
          </figure>
        </div>
      </section>

      <section className={styles.stats} aria-label="Thông tin chương trình">
        {stats.map(([value, label], index) => (
          <article key={label} data-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{value}</strong>
            <p>{label}</p>
          </article>
        ))}
      </section>

      {/* Danh sách ngành được trình bày theo kiểu editorial, tránh cảm giác lưới card dày đặc. */}
      <section className={styles.areas}>
        <header data-reveal>
          <p className={styles.kicker}>ACADEMIC AREAS</p>
          <h2>05 nhóm ngành.<br /><em>Nhiều hướng đi.</em></h2>
          <p>Các lĩnh vực đào tạo được phát triển trên nền tảng liên ngành và gắn với nhu cầu chuyển động của xã hội.</p>
        </header>
        <div className={styles.areaBody}>
          <ol>
            {areas.map((area, index) => (
              <li key={area} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><h3>{area}</h3></li>
            ))}
          </ol>
          <figure data-reveal>
            <Image src="/images/programmers/pic_pro.jpg" alt="Học viên Văn Lang trong ngày tốt nghiệp" fill sizes="(max-width: 900px) 90vw, 40vw" />
          </figure>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.approachCopy} data-reveal>
          <p className={styles.kicker}>ACADEMIC × PRACTICAL</p>
          <h2>Không chỉ học để biết.<br /><em>Học để vận dụng.</em></h2>
          <p>Các chương trình kết nối nền tảng học thuật với thực tiễn nghề nghiệp, phát triển năng lực nghiên cứu, tư duy phân tích và khả năng giải quyết vấn đề trong bối cảnh thực tế.</p>
          <blockquote>Tri thức trở nên có giá trị khi được chuyển hóa thành năng lực hành động.</blockquote>
        </div>
        <figure data-reveal>
          <Image src="/images/programmers/pic_pro.jpg" alt="Niềm vui của học viên sau đại học" fill sizes="(max-width: 900px) 100vw, 46vw" />
        </figure>
      </section>

      <section className={styles.connected}>
        <div className={styles.connectedHeading} data-reveal>
          <p className={styles.kicker}>CONNECTED LEARNING</p>
          <h2>Một hệ sinh thái học tập <em>được kết nối.</em></h2>
        </div>
        <div className={styles.connectionLine} aria-label="Các thành phần trong hệ sinh thái học tập">
          {connections.map((item, index) => <span key={item} data-reveal>{item}{index < connections.length - 1 && <i>×</i>}</span>)}
        </div>
        <div className={styles.connectedContent}>
          <p data-reveal>Viện hướng đến xây dựng môi trường kết nối người học, giảng viên, chuyên gia, doanh nghiệp và cộng đồng học thuật; từ đó mở rộng trải nghiệm chuyên môn và năng lực nghề nghiệp.</p>
          <figure data-reveal><Image src="/images/hero/campus-hero.jpg" alt="Hệ sinh thái học tập tại Văn Lang" fill sizes="(max-width: 900px) 90vw, 48vw" /></figure>
          <aside data-reveal><strong>18–24 tháng</strong><span>Thời gian đào tạo phổ biến, cùng hoạt động hỗ trợ xuyên suốt hành trình học tập.</span></aside>
        </div>
      </section>

      {/* Kế thừa nguyên section tư vấn và logic form đang dùng trên các trang con khác. */}
      {/* Kế thừa section điều hướng chung của nhóm trang About VGG. */}
      <DiscoverMore activeSlug="gioi-thieu" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
