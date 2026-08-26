import Image from "next/image";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/features/discover/components/DiscoverMore";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import styles from "./LeadershipPage.module.css";

const leadershipProfiles = [
  {
    name: "PGS.TS. NGUYỄN VĂN THÀNH",
    title: "Phó Viện Trưởng\nPhụ trách Viện Sau đại học\nTrường Đại học Văn Lang",
    quote: "Tại Trường Đại học Văn Lang, chúng tôi tin rằng giá trị lớn nhất của đào tạo sau đại học không chỉ nằm ở văn bằng, mà ở sự trưởng thành của người học. Đó là những con người có tư duy chiến lược; biết kết nối tri thức với công nghệ, dữ liệu và đổi mới sáng tạo; có năng lực nghiên cứu, phản biện và ra quyết định dựa trên bằng chứng; đồng thời tạo ra giá trị mới cho tổ chức và cộng đồng.",
    image: "/images/pages/discover/leadership/logistic-transparent.png",
  },
] as const;

export function LeadershipPage() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* Hero giữ nguyên ngôn ngữ hình ảnh của nhóm trang Discover hiện tại. */}
      <section className={styles.hero} aria-labelledby="leadership-title">
        <Image src="/images/pages/discover/content/campus.jpg" alt="Khuôn viên Trường Đại học Văn Lang" fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTitle}>
          <p>DISCOVER Viện Sau Đại học · 03</p>
          <h1 id="leadership-title">Lãnh đạo</h1>
          <span>Leadership</span>
        </div>
      </section>

      {/* Mỗi hồ sơ chỉ gồm tên, chức danh và câu trích dẫn. */}
      <div className={styles.profileList}>
        {leadershipProfiles.map((profile, index) => (
          <section className={styles.leaderProfile} aria-labelledby={`leader-profile-${index}`} key={profile.name}>
            <div className={styles.profileCopy} data-reveal>
              <h2 id={`leader-profile-${index}`}>{profile.name}</h2>
              <p>{profile.title}</p>
              <blockquote>“{profile.quote}”</blockquote>
            </div>
            <figure className={styles.profileImage} data-reveal>
              <Image src={profile.image} alt={`Chân dung ${profile.name}`} fill sizes="(max-width: 900px) 88vw, 46vw" />
            </figure>
          </section>
        ))}
      </div>

      <DiscoverMore activeSlug="lanh-dao" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
