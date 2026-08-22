import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/components/sections/DiscoverMore";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import styles from "./LeadershipPage.module.css";

const reasons = [
  {
    title: "Một bước tiến trong học thuật có thể mở ra một bước tiến trong sự nghiệp.",
    copy: "VGG mang đến môi trường đào tạo sau đại học nơi chiều sâu học thuật gắn liền với thực tiễn nghề nghiệp, với 18 chương trình Thạc sĩ và 01 chương trình Tiến sĩ thuộc 05 nhóm ngành. Các chương trình được định hướng phát triển chuyên môn, năng lực nghiên cứu, tư duy phân tích và khả năng vận dụng kiến thức vào những vấn đề thực tiễn.",
  },
  {
    title: "Học để ứng dụng, nghiên cứu để phát triển",
    copy: "Chương trình đào tạo được xây dựng theo định hướng ứng dụng và nghiên cứu tùy từng ngành, giúp người học đào sâu chuyên môn, phát triển năng lực giải quyết vấn đề và tiếp tục mở rộng năng lực nghề nghiệp.",
  },
  {
    title: "Một môi trường để đi xa hơn",
    copy: "Với lộ trình đào tạo phù hợp cho người học đang phát triển sự nghiệp, VGG tạo điều kiện để người học kết nối với giảng viên, chuyên gia, cộng đồng học thuật và thực tiễn doanh nghiệp; từ đó mở rộng góc nhìn, xây dựng mạng lưới và tìm kiếm những cơ hội phát triển mới.",
  },
  {
    title: "Chọn VGG là chọn chủ động đi tiếp",
    copy: "Học sâu hơn, tư duy rộng hơn, kết nối nhiều hơn và sẵn sàng cho những bước tiến xa hơn.",
  },
] as const;

export function WhyVGGPage() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="why-vgg-title">
        <Image src="/images/hero/campus-hero.jpg" alt="Khuôn viên Trường Đại học Văn Lang" fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTitle}>
          <p>DISCOVER VGG · 04</p>
          <h1 id="why-vgg-title">Vì sao chọn VGG</h1>
          <span>Why VGG</span>
        </div>
      </section>

      <div className={styles.profileList}>
        {reasons.map((reason, index) => (
          <section className={styles.leaderProfile} aria-labelledby={`why-vgg-reason-${index}`} key={reason.title}>
            <div className={styles.profileCopy} data-reveal>
              <h2 id={`why-vgg-reason-${index}`}>{reason.title}</h2>
              <p>{reason.copy}</p>
            </div>
            <div className={styles.profileGallery} data-reveal>
              <figure className={styles.profileMainImage}>
                <Image src={index % 2 === 0 ? "/images/programmers/pic_pro.jpg" : "/images/hero/campus-hero.jpg"} alt={`${reason.title} tại VGG`} fill sizes="(max-width: 800px) 100vw, 54vw" />
              </figure>
              <figure><Image src="/images/hero/campus-hero.jpg" alt="Không gian học thuật VGG" fill sizes="(max-width: 800px) 50vw, 27vw" /></figure>
              <figure><Image src="/images/programmers/pic_pro.jpg" alt="Cộng đồng người học VGG" fill sizes="(max-width: 800px) 50vw, 27vw" /></figure>
            </div>
          </section>
        ))}
      </div>

      <DiscoverMore activeSlug="vi-sao-chon-vgg" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
