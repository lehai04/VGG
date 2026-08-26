import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/features/discover/components/DiscoverMore";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import styles from "./DiscoverSubpageVM.module.css";

/**
 * Nội dung "Vì sao chọn Viện Sau Đại học" được đặt cứng ở đây vì có cấu trúc giàu hơn
 * so với dữ liệu tổng quan trong pages object (keywords, bg variant, ảnh riêng).
 */
const reasons = [
  {
    bg: "paper" as const,
    eyebrow: "01 / HỌC THUẬT & THỰC TIỄN",
    title: "Một bước tiến trong học thuật mở ra một bước tiến trong sự nghiệp.",
    copy: "Viện Sau Đại học mang đến môi trường đào tạo sau đại học nơi chiều sâu học thuật gắn liền với thực tiễn nghề nghiệp, với 18 chương trình Thạc sĩ và 01 chương trình Tiến sĩ thuộc 05 nhóm ngành. Các chương trình được định hướng phát triển chuyên môn, năng lực nghiên cứu, tư duy phân tích và khả năng vận dụng kiến thức vào những vấn đề thực tiễn.",
    img: "/images/pages/discover/visao/1.JPG",
    keywords: ["Chuyên môn chuyên sâu", "Nghiên cứu ứng dụng", "Tư duy phân tích"],
  },
  {
    bg: "red" as const,
    eyebrow: "02 / NGHIÊN CỨU & ỨNG DỤNG",
    title: "Học để ứng dụng, nghiên cứu để phát triển.",
    copy: "Chương trình đào tạo được xây dựng theo định hướng ứng dụng và nghiên cứu tùy từng ngành, giúp người học đào sâu chuyên môn, phát triển năng lực giải quyết vấn đề và tiếp tục mở rộng năng lực nghề nghiệp.",
    img: "/images/pages/discover/visao/2.jpg",
    keywords: null,
  },
  {
    bg: "navy" as const,
    eyebrow: "03 / CỘNG ĐỒNG & KẾT NỐI",
    title: "Một môi trường để đi xa hơn.",
    copy: "Với lộ trình đào tạo phù hợp cho người học đang phát triển sự nghiệp, Viện Sau Đại học tạo điều kiện để người học kết nối với giảng viên, chuyên gia, cộng đồng học thuật và thực tiễn doanh nghiệp; từ đó mở rộng góc nhìn, xây dựng mạng lưới và tìm kiếm những cơ hội phát triển mới.",
    img: "/images/pages/discover/visao/3.jpg",
    keywords: null,
  },
  {
    bg: "paper" as const,
    eyebrow: "04 / QUYẾT TÂM & TẦM NHÌN",
    title: "Chọn Viện Sau Đại học là chọn chủ động đi tiếp.",
    copy: "Học sâu hơn, tư duy rộng hơn, kết nối nhiều hơn và sẵn sàng cho những bước tiến xa hơn trong sự nghiệp và cuộc sống.",
    img: "/images/pages/discover/visao/4.jpg",
    keywords: ["Học suốt đời", "Mạng lưới rộng", "Tư duy toàn cầu"],
  },
] as const;

/** Trang "Vì sao chọn Viện Sau Đại học" (/discover/vi-sao-chon-vgg) theo phong cách VisionMissionPage. */
export function WhyVGGPage() {
  return (
    <main className={`${styles.page} ${styles.whyPage} subpage`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="why-vgg-title">
        <Image
          className={styles.heroImage}
          src="/images/pages/discover/visao/banner.jpg"
          alt="Học viên Văn Lang trong ngày tốt nghiệp"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroCopy}>
          <p>DISCOVER Viện Sau Đại học · 04</p>
          <h1 id="why-vgg-title">
            <span>
              <i>VÌ SAO CHỌN Viện Sau Đại học</i>
            </span>
          </h1>
          <strong>Một lựa chọn được thiết kế cho tương lai.</strong>
        </div>
        <a className={styles.scrollCue} href="#why-reason-1">
          <span>KHÁM PHÁ</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      {/* ── STORY SECTIONS ──────────────────────────────────── */}
      {reasons.map((reason, i) => {
        // Red section đã có grid-template-columns đảo → ảnh sẽ tự sang trái.
        // Paper/navy: ảnh sau text (image on right).
        const mediaFirst = reason.bg === "red";

        return (
          <section
            key={reason.eyebrow}
            className={`${styles.story} ${styles[reason.bg]}`}
            id={`why-reason-${i + 1}`}
            aria-labelledby={`why-reason-${i + 1}-heading`}
          >
            {mediaFirst && (
              <figure className={styles.storyMedia} data-reveal>
                <Image
                  src={reason.img}
                  alt={reason.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 44vw"
                />
              </figure>
            )}

            <div className={styles.storyCopy} data-reveal>
              <p className={styles.eyebrow}>{reason.eyebrow}</p>
              <h2 id={`why-reason-${i + 1}-heading`}>{reason.title}</h2>
              <p className={styles.lead}>{reason.copy}</p>
              {reason.keywords && (
                <div className={styles.keywords} aria-label="Điểm nổi bật">
                  {reason.keywords.map((kw) => (
                    <span key={kw}>{kw}</span>
                  ))}
                </div>
              )}
            </div>

            {!mediaFirst && (
              <figure className={styles.storyMedia} data-reveal>
                <Image
                  src={reason.img}
                  alt={reason.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 44vw"
                />
              </figure>
            )}
          </section>
        );
      })}

      <DiscoverMore activeSlug="vi-sao-chon-vgg" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
