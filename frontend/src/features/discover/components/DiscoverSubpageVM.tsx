import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { DiscoverMore } from "@/features/discover/components/DiscoverMore";
import styles from "./DiscoverSubpageVM.module.css";

interface PageData {
  number: string;
  title: string;
  en: string;
  headline: string;
  lead: string;
  sections: readonly (readonly [string, string])[];
}

const MEDIA = ["/images/pages/discover/content/graduates.jpg", "/images/pages/discover/content/campus.jpg"];

const RANKINGS = [
  {
    rank: "251",
    scope: "CHÂU Á",
    title: "QS Asia University Rankings 2026",
    copy: "Văn Lang vươn lên vị trí 251, vượt qua 83,6% cơ sở giáo dục được xếp hạng trong khu vực.",
    href: "https://www.vlu.edu.vn/news/qs-asia-ranking-2026-truong-dai-hoc-van-lang-thang-hang-251-dai-hoc-hang-dau-chau-a",
    image: "/images/pages/discover/rank/1.jpg",
  },
  {
    rank: "1001–1200",
    scope: "THẾ GIỚI",
    title: "QS World University Rankings 2026",
    copy: "Đồng thời đạt hạng 392 toàn cầu về danh tiếng học thuật.",
    href: "https://www.vlu.edu.vn/about-us",
    image: "/images/pages/discover/rank/2.jpg",
  },
  {
    rank: "69",
    scope: "THẾ GIỚI",
    title: "Art & Design · QS by Subject 2026",
    copy: "Một dấu ấn nổi bật của năng lực đào tạo sáng tạo và hội nhập quốc tế.",
    href: "https://www.vlu.edu.vn/news/truong-dai-hoc-van-lang-thang-hang-top-401-600-the-gioi-ve-dong-gop-cho-phat-trien-ben-vung",
    image: "/images/pages/discover/rank/3.jpg",
  },
  {
    rank: "601–800",
    scope: "THẾ GIỚI",
    title: "THE Impact Rankings 2025",
    copy: "Ghi nhận đóng góp của Nhà trường đối với các mục tiêu phát triển bền vững.",
    href: "https://www.vlu.edu.vn/about-us",
    image: "/images/pages/discover/rank/4.jpg",
  },
  {
    rank: "781",
    scope: "THẾ GIỚI · 247 CHÂU Á",
    title: "QS Sustainability Rankings 2026",
    copy: "Lần đầu góp mặt, Văn Lang đứng hạng 7 Việt Nam về phát triển bền vững.",
    href: "https://www.vlu.edu.vn/news/truong-dai-hoc-van-lang-dat-thu-hang-781-the-gioi-ve-dai-hoc-phat-trien-ben-vung",
    image: "/images/pages/discover/rank/5.jpg",
  },
  {
    rank: "4 SAO",
    scope: "CHUẨN QUỐC TẾ",
    title: "QS Stars & FIBAA",
    copy: "Kiểm định cơ sở giáo dục góp phần khẳng định chất lượng đào tạo theo các chuẩn mực quốc tế.",
    href: "https://www.vlu.edu.vn/about-us",
    image: "/images/pages/discover/rank/6.jpg",
  },
] as const;

function RankingsContent() {
  return (
    <>
      <section className={styles.rankingsIntro} id="dvm-intro">
        <div className={styles.rankingsIntroLabel} data-reveal>
          <span>01</span>
          <p>
            RECOGNITION
            <br />& ACHIEVEMENTS
          </p>
        </div>
        <div className={styles.rankingsIntroCopy} data-reveal>
          <p className={styles.eyebrow}>XẾP HẠNG & THÀNH TỰU</p>
          <h2>
            Nền tảng chất lượng.
            <br />
            <em>Dấu ấn toàn cầu.</em>
          </h2>
          <p>
            Là một đơn vị thuộc hệ sinh thái giáo dục của Trường Đại học Văn Lang, Viện Sau đại học
            được phát triển trên nền tảng chất lượng đào tạo, nghiên cứu khoa học và hội nhập quốc
            tế của Nhà trường. Những nỗ lực này được ghi nhận qua nhiều bảng xếp hạng và hệ thống
            kiểm định uy tín.
          </p>
        </div>
      </section>

      <section className={styles.rankingsSection} aria-labelledby="rankings-heading">
        <header className={styles.rankingsHeader} data-reveal>
          <div>
            <p className={styles.eyebrow}>KHỐI 01 · THÀNH TỰU TOÀN TRƯỜNG</p>
            <h2 id="rankings-heading">Những dấu ấn nổi bật của Văn Lang.</h2>
          </div>
          <p>
            Vị thế được bồi đắp từ chất lượng học thuật, nghiên cứu và cam kết tạo tác động tích cực
            cho cộng đồng.
          </p>
        </header>

        <div className={styles.rankingsGrid}>
          {RANKINGS.map((item, index) => (
            <a
              className={styles.rankingCard}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              key={item.title}
              data-reveal
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span className={styles.rankingCardOverlay} />
              <span className={styles.rankingCardIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.rankingCardIcon}>
                <ArrowUpRight aria-hidden="true" />
              </span>
              <span className={styles.rankingCardContent}>
                <strong>{item.rank}</strong>
                <small>{item.scope}</small>
                <span className={styles.rankingCardRule} />
                <b>{item.title}</b>
                <p>{item.copy}</p>
                <i>
                  Xem bài viết <ArrowUpRight aria-hidden="true" />
                </i>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.learnerImpact} aria-labelledby="learner-impact-heading">
        <div className={styles.learnerImpactMedia} data-reveal>
          <Image
            src="/images/pages/discover/content/graduates.jpg"
            alt="Cộng đồng người học sau đại học Văn Lang"
            fill
            sizes="(max-width: 767px) 100vw, 43vw"
          />
          <span>
            HỌC THUẬT
            <br />· CỘNG ĐỒNG
          </span>
        </div>
        <div className={styles.learnerImpactCopy} data-reveal>
          <p className={styles.eyebrow}>KHỐI 02 · NGƯỜI HỌC SAU ĐẠI HỌC</p>
          <h2 id="learner-impact-heading">Thành tựu được viết tiếp bởi người học.</h2>
          <p>
            Giá trị của đào tạo sau đại học không chỉ được phản ánh qua các bảng xếp hạng, mà còn
            hiện diện trong hành trình học tập, nghiên cứu và phát triển nghề nghiệp của mỗi học
            viên.
          </p>
          <p>
            Từ trải nghiệm học thuật tại Hàn Quốc, Đài Loan đến các giải thưởng thiết kế trong nước
            và quốc tế, người học Văn Lang từng bước đưa tri thức chuyên môn vào thực tiễn và mở
            rộng kết nối toàn cầu.
          </p>
          <a href="/vi/student-success">
            Xem hoạt động học viên <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}

/** Biến đổi contact value thành JSX — email/phone thành links. */
function ContactValue({ label, value }: { label: string; value: string }) {
  if (label === "Email") {
    return <a href={`mailto:${value}`}>{value}</a>;
  }
  if (label === "Điện thoại") {
    const first = value.split("·")[0].trim();
    return <a href={`tel:${first.replace(/\s/g, "")}`}>{value}</a>;
  }
  return <p>{value}</p>;
}

/**
 * Component trang con /discover theo phong cách editorial VisionMissionPage:
 * hero fullscreen + lead section + story sections paper/red/navy.
 * Dùng cho: xep-hang-thanh-tuu, lien-he (và bất kỳ slug generic nào trong tương lai).
 */
export function DiscoverSubpageVM({ slug, page }: { slug: string; page: PageData }) {
  const isContact = slug === "lien-he";
  const isRankings = slug === "xep-hang-thanh-tuu";

  // Hero h1: nếu có " & " thì tách thành 2 dòng animate riêng.
  const titleParts = !isRankings && page.title.includes(" & ")
    ? [page.title.split(" & ")[0], `& ${page.title.split(" & ")[1]}`]
    : [page.title];

  return (
    <main className={`${styles.page} ${isRankings ? styles.rankingsPage : ""}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="dvm-title">
        <Image
          className={styles.heroImage}
          src={isRankings ? "/images/pages/discover/rank/banner.avif" : "/images/pages/discover/content/campus.jpg"}
          alt={isRankings ? "Thành tựu và xếp hạng của Trường Đại học Văn Lang" : "Toàn cảnh khuôn viên Trường Đại học Văn Lang"}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroCopy}>
          <p>DISCOVER Viện Sau Đại học · {page.number}</p>
          <h1 id="dvm-title">
            {titleParts.map((part, i) => (
              <span key={i}>
                <i>{part}</i>
              </span>
            ))}
          </h1>
          <strong>{page.headline}</strong>
        </div>
        <a className={styles.scrollCue} href="#dvm-intro">
          <span>KHÁM PHÁ</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      {isRankings ? (
        <RankingsContent />
      ) : (
        <>
          <section
            className={`${styles.story} ${styles.paper}`}
            id="dvm-intro"
            aria-labelledby="dvm-intro-heading"
          >
            <div className={styles.storyCopy} data-reveal>
              <p className={styles.eyebrow}>00 / GIỚI THIỆU</p>
              <h2 id="dvm-intro-heading">{page.en}</h2>
              <p className={styles.lead}>{page.lead}</p>
              <div className={styles.keywords} aria-label="Từ khoá">
                <span>Viện Sau Đại học</span>
                <span>Graduate School</span>
                <span>Văn Lang University</span>
              </div>
            </div>
            <figure className={styles.storyMedia} data-reveal>
              <Image
            src="/images/pages/discover/rank/7.avif"
                alt={page.title}
                fill
                sizes="(max-width: 767px) 100vw, 44vw"
              />
              <figcaption>
                {page.number}
                <br />
                {page.en.toUpperCase()}
              </figcaption>
            </figure>
          </section>

          {/* ── STORY SECTIONS hoặc CONTACT ──────────────────────── */}
          {isContact ? (
            /* Trang liên hệ: danh sách thông tin + ảnh cố định bên phải. */
            <section className={styles.contact} aria-label="Thông tin liên hệ">
              <div className={styles.contactGrid} data-reveal>
                {page.sections.map(([label, value], i) => (
                  <div key={label} className={styles.contactItem}>
                    <span className={styles.contactLabel}>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{label}</h3>
                    <ContactValue label={label} value={value} />
                  </div>
                ))}
              </div>
              <figure className={styles.contactMedia} data-reveal>
                <Image
                  src="/images/pages/discover/content/campus.jpg"
                  alt="Khuôn viên Trường Đại học Văn Lang"
                  fill
                  sizes="(max-width: 767px) 100vw, 44vw"
                />
              </figure>
            </section>
          ) : (
            /* Các trang khác: story sections xen kẽ đỏ / navy. */
            page.sections.map(([title, copy], i) => {
              const bgClass = i % 2 === 0 ? styles.red : styles.navy;
              const imgSrc = MEDIA[i % MEDIA.length];
              // Red: ảnh trước (grid đã đảo cột). Navy: ảnh sau.
              const mediaFirst = i % 2 === 0;

              return (
                <section
                  key={title}
                  className={`${styles.story} ${bgClass}`}
                  id={`dvm-s${i + 1}`}
                  aria-labelledby={`dvm-s${i + 1}-heading`}
                >
                  {mediaFirst && (
                    <figure className={styles.storyMedia} data-reveal>
                      <Image src={imgSrc} alt={title} fill sizes="(max-width: 767px) 100vw, 44vw" />
                    </figure>
                  )}
                  <div className={styles.storyCopy} data-reveal>
                    <p className={styles.eyebrow}>
                      {String(i + 1).padStart(2, "0")} / {title.toUpperCase()}
                    </p>
                    <h2 id={`dvm-s${i + 1}-heading`}>{title}</h2>
                    <p className={styles.lead}>{copy}</p>
                  </div>
                  {!mediaFirst && (
                    <figure className={styles.storyMedia} data-reveal>
                      <Image src={imgSrc} alt={title} fill sizes="(max-width: 767px) 100vw, 44vw" />
                    </figure>
                  )}
                </section>
              );
            })
          )}
        </>
      )}

      <DiscoverMore activeSlug={slug} />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
