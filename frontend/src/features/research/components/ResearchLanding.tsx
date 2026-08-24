import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import styles from "./ResearchLanding.module.css";

const stats = [
  { value: "240+", label: "Công bố khoa học / năm" },
  { value: "60+", label: "Đối tác doanh nghiệp" },
  { value: "180+", label: "Nhà nghiên cứu" },
  { value: "34", label: "Dự án đang triển khai" },
] as const;

const themes = [
  {
    index: "01",
    title: "Kinh doanh & Phát triển bền vững",
    body: "Quản trị, kinh tế tuần hoàn và các mô hình tạo giá trị dài hạn trong bối cảnh Việt Nam và khu vực.",
    href: "/research/cum-nghien-cuu",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Nghiên cứu kinh doanh và phát triển bền vững",
  },
  {
    index: "02",
    title: "Công nghệ & Đô thị thông minh",
    body: "Dữ liệu, AI và kỹ thuật số phục vụ quy hoạch đô thị, logistics và chất lượng sống cộng đồng.",
    href: "/research/doi-moi-sang-tao",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Công nghệ và đổi mới sáng tạo",
  },
  {
    index: "03",
    title: "Sáng tạo & Bản sắc văn hóa",
    body: "Vị trí của bản sắc Việt trong dòng chảy toàn cầu hóa — qua lăng kính thiết kế, truyền thông và di sản.",
    href: "/research/cum-nghien-cuu",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Nghiên cứu văn hóa và sáng tạo",
  },
] as const;

const navigation = [
  { label: "Các cụm nghiên cứu", href: "/research/cum-nghien-cuu", en: "Research Clusters" },
  { label: "Dự án nghiên cứu", href: "/research/du-an", en: "Research Projects" },
  { label: "Công bố khoa học", href: "/research/cong-bo", en: "Publications" },
  { label: "Hội thảo & Sự kiện", href: "/research/hoi-thao", en: "Conferences & Events" },
  { label: "Đổi mới sáng tạo", href: "/research/doi-moi-sang-tao", en: "Innovation" },
  { label: "Hợp tác doanh nghiệp", href: "/research/hop-tac-doanh-nghiep", en: "Industry Collaboration" },
] as const;

export function ResearchLanding() {
  return (
    <main className={styles.page} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroImage} role="img" aria-label="Không gian nghiên cứu học thuật VGG" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.heroEyebrow}>Research &amp; Innovation · VGG · 2026</p>
          <h1>
            Tri thức
            <br />
            <em>tạo tác động.</em>
          </h1>
          <span>
            VGG kết nối học giả, người học, doanh nghiệp và cộng đồng để biến
            nghiên cứu thành lời giải có ích cho xã hội.
          </span>
        </div>
        <a className={styles.heroScroll} href="#research-statement" aria-label="Khám phá">
          <ArrowDownRight strokeWidth={1.5} />
        </a>
      </section>

      {/* ─── STATEMENT ─── */}
      <section className={styles.statement} id="research-statement" data-reveal>
        <p className={styles.kicker}>01 — OUR PHILOSOPHY</p>
        <h2>
          Những câu hỏi lớn cần
          <br />
          <em>góc nhìn liên ngành.</em>
        </h2>
        <p className={styles.statementBody}>
          Tại VGG, nghiên cứu không bắt đầu từ lý thuyết — mà từ những vấn đề
          thực sự của con người và xã hội. Chúng tôi kết nối học giả từ nhiều
          lĩnh vực, tạo ra môi trường nơi tri thức không bị giới hạn bởi ranh
          giới ngành học.
        </p>
      </section>

      {/* ─── STATS ─── */}
      <section className={styles.stats} data-reveal>
        {stats.map((stat, i) => (
          <div className={styles.statItem} key={stat.label}>
            <span className={styles.statIndex}>{String(i + 1).padStart(2, "0")}</span>
            <strong className={styles.statValue}>{stat.value}</strong>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ─── RESEARCH THEMES ─── */}
      <section className={styles.themes} id="research-themes">
        <header className={styles.themesHeader} data-reveal>
          <p className={styles.kicker}>02 — RESEARCH AREAS</p>
          <h2>Hướng nghiên cứu trọng điểm.</h2>
        </header>
        <div className={styles.themeList}>
          {themes.map((theme) => (
            <Link href={theme.href} key={theme.index} className={styles.themeRow} data-reveal>
              <span className={styles.themeIndex}>{theme.index}</span>
              <div className={styles.themeText}>
                <h3>{theme.title}</h3>
                <p>{theme.body}</p>
              </div>
              <div className={styles.themeImageWrap}>
                <Image
                  src={theme.image}
                  alt={theme.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 38vw"
                  className={styles.themeImage}
                />
              </div>
              <ArrowUpRight className={styles.themeArrow} strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURE SPLIT ─── */}
      <section className={styles.feature} data-reveal>
        <div className={styles.featureMedia}>
          <Image
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85"
            alt="Nhà nghiên cứu trong phòng thí nghiệm hiện đại"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className={styles.featureImage}
          />
          <span className={styles.featureCaption}>VGG RESEARCH / 2026</span>
        </div>
        <div className={styles.featureCopy}>
          <p className={styles.kicker}>03 — RESEARCH IN MOTION</p>
          <h2>
            Từ phòng học
            <br />
            đến <em>đời sống.</em>
          </h2>
          <p>
            Nghiên cứu tốt không chỉ được công bố — nó mở ra đối thoại, thay
            đổi cách làm và tạo những kết nối mới giữa học thuật và cộng đồng.
          </p>
          <Link href="/research/du-an" className={styles.featureLink}>
            Khám phá các dự án <ArrowUpRight strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* ─── NAVIGATION INDEX ─── */}
      <section className={styles.navSection}>
        <header className={styles.navHeader} data-reveal>
          <p className={styles.kicker}>04 — EXPLORE RESEARCH</p>
          <h2>Khám phá Research.</h2>
        </header>
        <nav className={styles.navList} aria-label="Điều hướng nghiên cứu">
          {navigation.map((item, index) => (
            <Link href={item.href} key={item.href} className={styles.navItem} data-reveal>
              <span className={styles.navIndex}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.navItemText}>
                <strong>{item.label}</strong>
                <small>{item.en}</small>
              </div>
              <ArrowUpRight className={styles.navArrow} strokeWidth={1.5} />
            </Link>
          ))}
        </nav>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.cta} data-reveal>
        <p className={styles.ctaEyebrow}>HỢP TÁC NGHIÊN CỨU</p>
        <h2>
          Cùng mở rộng
          <br />
          biên giới tri thức.
        </h2>
        <Link className={styles.ctaLink} href="/discover/lien-he">
          Trao đổi với chúng tôi <ArrowUpRight strokeWidth={1.5} />
        </Link>
      </section>

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
