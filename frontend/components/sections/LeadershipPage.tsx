import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/components/sections/DiscoverMore";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import styles from "./LeadershipPage.module.css";

const leadershipProfiles = [
  ["Đội ngũ lãnh đạo VGG", "Đội ngũ lãnh đạo VGG định hình một môi trường học thuật cởi mở, chuẩn mực và luôn sẵn sàng đổi mới vì người học. Mọi quyết định đều hướng đến chất lượng đào tạo và sự phát triển bền vững của cộng đồng.", "Văn phòng lãnh đạo"],
  ["Định hướng học thuật", "Định hướng học thuật bảo đảm chiều sâu chuyên môn, tính cập nhật và sự kết nối giữa đào tạo, nghiên cứu với những chuyển động của thực tiễn nghề nghiệp.", "Tìm hiểu định hướng"],
  ["Quản trị đào tạo", "Hoạt động quản trị đào tạo được tổ chức minh bạch, chủ động và nhất quán, tạo điều kiện để người học tập trung vào hành trình phát triển chuyên môn.", "Khám phá đào tạo"],
  ["Nghiên cứu & Đổi mới", "VGG khuyến khích tinh thần tìm tòi, đối thoại học thuật và hợp tác liên ngành nhằm chuyển hóa tri thức thành những giá trị thiết thực cho tổ chức và cộng đồng.", "Khám phá nghiên cứu"],
  ["Kết nối & Phát triển", "Mạng lưới giảng viên, chuyên gia, doanh nghiệp và đối tác cùng mở rộng cơ hội học tập, nghiên cứu và phát triển nghề nghiệp cho cộng đồng VGG.", "Kết nối với VGG"],
] as const;

export function LeadershipPage() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* Hero giữ nguyên ngôn ngữ hình ảnh của nhóm trang Discover hiện tại. */}
      <section className={styles.hero} aria-labelledby="leadership-title">
        <Image src="/images/hero/campus-hero.jpg" alt="Khuôn viên Trường Đại học Văn Lang" fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTitle}>
          <p>DISCOVER VGG · 03</p>
          <h1 id="leadership-title">Lãnh đạo</h1>
          <span>Leadership</span>
        </div>
      </section>

      {/* Năm cụm cùng cấu trúc; có thể thay tên, nội dung và ảnh thật độc lập về sau. */}
      <div className={styles.profileList}>
        {leadershipProfiles.map(([title, copy, button], index) => (
          <section className={styles.leaderProfile} aria-labelledby={`leader-profile-${index}`} key={title}>
            <div className={styles.profileCopy} data-reveal>
              <h2 id={`leader-profile-${index}`}>{title}</h2>
              <p>{copy}</p>
              <Link href="/discover/lien-he">{button}</Link>
            </div>
            <div className={styles.profileGallery} data-reveal>
              <figure className={styles.profileMainImage}>
                <Image src={index % 2 === 0 ? "/images/programmers/pic_pro.jpg" : "/images/hero/campus-hero.jpg"} alt={`${title} tại VGG`} fill sizes="(max-width: 800px) 100vw, 54vw" />
              </figure>
              <figure><Image src="/images/hero/campus-hero.jpg" alt={`Không gian ${title}`} fill sizes="(max-width: 800px) 50vw, 27vw" /></figure>
              <figure><Image src="/images/programmers/pic_pro.jpg" alt={`Cộng đồng ${title}`} fill sizes="(max-width: 800px) 50vw, 27vw" /></figure>
            </div>
          </section>
        ))}
      </div>

      <DiscoverMore activeSlug="lanh-dao" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
