import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/components/sections/DiscoverMore";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import styles from "./LeadershipPage.module.css";

const leadershipAreas = [
  {
    number: "01",
    title: "Định hướng học thuật",
    copy: "Bảo đảm chất lượng chuyên môn và khuyến khích những cách tiếp cận mới trong đào tạo, nghiên cứu.",
  },
  {
    number: "02",
    title: "Kết nối nguồn lực",
    copy: "Mở rộng hợp tác giữa nhà trường, giới chuyên môn, doanh nghiệp và cộng đồng.",
  },
  {
    number: "03",
    title: "Văn hóa phụng sự",
    copy: "Lắng nghe người học và xây dựng hệ thống hỗ trợ minh bạch, chủ động, hiệu quả.",
  },
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
        <a className={styles.heroScroll} href="#leadership-overview" aria-label="Xem nội dung lãnh đạo"><ArrowDown /></a>
      </section>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link><span>／</span><Link href="/discover">Về VGG</Link><span>／</span><b>Lãnh đạo</b>
      </nav>

      <section className={styles.overview} id="leadership-overview">
        <p className={styles.eyebrow} data-reveal>LEADERSHIP AT VGG</p>
        <div data-reveal>
          <h2>Dẫn dắt bằng tầm nhìn và sự thấu hiểu.</h2>
          <p>Đội ngũ lãnh đạo VGG định hình một môi trường học thuật cởi mở, chuẩn mực và luôn sẵn sàng đổi mới vì người học.</p>
        </div>
      </section>

      {/* Bố cục ảnh lớn và nội dung biên tập lấy cảm hứng từ nhịp trang leadership học thuật. */}
      <section className={styles.feature}>
        <figure data-reveal>
          <Image src="/images/programmers/pic_pro.jpg" alt="Cộng đồng học viên Văn Lang" fill sizes="(max-width: 900px) 100vw, 56vw" />
        </figure>
        <div className={styles.featureCopy} data-reveal>
          <p className={styles.eyebrow}>OUR LEADERSHIP</p>
          <h2>Một định hướng chung.<br />Nhiều năng lực cùng hội tụ.</h2>
          <p>VGG phát triển năng lực lãnh đạo trên nền tảng học thuật, hợp tác đa ngành và cam kết phục vụ người học.</p>
        </div>
      </section>

      <section className={styles.roles} aria-labelledby="leadership-roles-title">
        <header data-reveal>
          <p className={styles.eyebrow}>LEADERSHIP &amp; GOVERNANCE</p>
          <h2 id="leadership-roles-title">Những vai trò tạo nên một môi trường học thuật vững mạnh.</h2>
        </header>
        <div className={styles.roleList}>
          {leadershipAreas.map((item) => (
            <article key={item.number} data-reveal>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ArrowUpRight aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.principle}>
        <div data-reveal>
          <p className={styles.eyebrow}>A SHARED COMMITMENT</p>
          <h2>Lãnh đạo để kiến tạo điều kiện cho người học tiến xa.</h2>
        </div>
        <p data-reveal>Định hướng học thuật, khả năng kết nối nguồn lực và văn hóa phụng sự cùng tạo nên nền tảng để VGG phát triển bền vững.</p>
      </section>

      <DiscoverMore activeSlug="lanh-dao" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
