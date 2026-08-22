import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { RevealOnScroll } from "@/components/ui";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { DiscoverMore } from "@/components/sections/DiscoverMore";
import styles from "./VisionMissionPage.module.css";

const vision = "Trở thành đơn vị đào tạo sau đại học tiên phong trong kết nối tri thức học thuật với thực tiễn nghề nghiệp, mở rộng mạng lưới học thuật – doanh nghiệp và phát triển nguồn nhân lực có năng lực tạo ra giá trị cho xã hội.";
const mission = "Kiến tạo môi trường đào tạo và nghiên cứu chất lượng cao, giúp người học phát triển chuyên môn chuyên sâu, năng lực nghiên cứu, tư duy phản biện và khả năng giải quyết các vấn đề thực tiễn. Thông qua sự kết nối giữa học thuật, doanh nghiệp và cộng đồng, VGG đồng hành cùng người học trong phát triển sự nghiệp và tạo ra những tác động tích cực cho xã hội.";

/** Trang riêng cho tuyên ngôn VGG: nhịp editorial lớn, không dùng layout card của các trang con khác. */
export function VisionMissionPage() {
  return <main className={styles.page} id="main-content">
    <RevealOnScroll />
    <SiteHeader compact />

    {/* Hero có sequence load riêng; ảnh priority để tránh layout shift ở vùng đầu trang. */}
    <section className={styles.hero} aria-labelledby="vision-mission-title">
      <Image className={styles.heroImage} src="/images/hero/campus-hero.jpg" alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang" fill priority sizes="100vw" />
      <div className={styles.heroOverlay} />
      <div className={styles.heroCopy}>
        <p>VAN LANG UNIVERSITY · GRADUATE SCHOOL</p>
        <h1 id="vision-mission-title"><span><i>TẦM NHÌN &amp;</i></span><span><i>SỨ MỆNH</i></span></h1>
        <strong>Học thuật vững vàng – Sự nghiệp rộng mở.</strong>
      </div>
      <a className={styles.scrollCue} href="#tam-nhin"><span>KHÁM PHÁ</span><ArrowDown aria-hidden="true" /></a>
    </section>

    {/* 01 — Tầm nhìn: text và campus portrait tạo khoảng dừng thị giác đầu tiên. */}
    <section className={`${styles.story} ${styles.vision}`} id="tam-nhin">
      <div className={styles.storyCopy} data-reveal>
        <p className={styles.eyebrow}>01 / TẦM NHÌN</p><h2>Tầm nhìn</h2><p className={styles.lead}>{vision}</p>
        <div className={styles.keywords} aria-label="Trọng tâm tầm nhìn"><span>Tri thức học thuật</span><span>Thực tiễn nghề nghiệp</span><span>Tạo ra giá trị</span></div>
      </div>
      <figure className={styles.visionMedia} data-reveal>
        <Image src="/images/hero/campus-hero.jpg" alt="Không gian học thuật tại khuôn viên Văn Lang" fill sizes="(max-width: 767px) 100vw, 44vw" />
        <figcaption>KNOWLEDGE<br />CONNECTION<br />IMPACT</figcaption>
      </figure>
    </section>

    {/* 02 — Sứ mệnh: mảng đỏ tương phản và ảnh giữ nhẹ trên desktop để tạo nhịp pause. */}
    <section className={`${styles.story} ${styles.mission}`}>
      <figure className={styles.missionMedia} data-reveal><Image src="/images/programmers/pic_pro.jpg" alt="Học viên Văn Lang trong ngày tốt nghiệp" fill sizes="(max-width: 767px) 100vw, 44vw" /></figure>
      <div className={styles.storyCopy} data-reveal>
        <p className={styles.eyebrow}>02 / SỨ MỆNH</p><h2>Sứ mệnh</h2><p className={styles.lead}>{mission}</p>
      </div>
    </section>

    {/* 03 — Các dòng triết lý reveal tuần tự để người dùng đọc theo nhịp scroll. */}
    <section className={styles.philosophy}>
      <div className={styles.philosophyHead} data-reveal><p className={styles.eyebrow}>03 / TRIẾT LÝ GIẢNG DẠY</p><h2>Triết lý giảng dạy</h2></div>
      <div className={styles.philosophyBottom}>
        <p data-reveal>VGG hướng đến mô hình giáo dục lấy người học làm trung tâm, trong đó quá trình giảng dạy không chỉ truyền đạt kiến thức mà còn khuyến khích tư duy độc lập, khám phá và ứng dụng. Nội dung đào tạo được kết nối với các vấn đề thực tiễn, hoạt động nghiên cứu và kinh nghiệm nghề nghiệp, giúp người học chuyển hóa tri thức thành năng lực hành động và những giá trị có ý nghĩa cho tổ chức, cộng đồng và xã hội.</p>
        {/* Ảnh luôn hiển thị; không gắn reveal để tránh bị giữ opacity khi section vào viewport nhanh. */}
        <figure><Image src="/images/programmers/pic_pro.jpg" alt="Cộng đồng học viên sau đại học Văn Lang" fill sizes="(max-width: 767px) 100vw, 38vw" /></figure>
      </div>
    </section>

    {/* Closing kế thừa form tư vấn chuẩn của homepage, không nhân đôi logic gửi API. */}
    <DiscoverMore activeSlug="tam-nhin-su-menh" />
    <NextStepCTA />
    <SiteFooter />
  </main>;
}
