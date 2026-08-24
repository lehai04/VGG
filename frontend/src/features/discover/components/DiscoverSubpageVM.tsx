import Image from "next/image";
import { ArrowDown } from "lucide-react";
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

const MEDIA = [
  "/images/programmers/pic_pro.jpg",
  "/images/hero/campus-hero.jpg",
];

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
export function DiscoverSubpageVM({
  slug,
  page,
}: {
  slug: string;
  page: PageData;
}) {
  const isContact = slug === "lien-he";

  // Hero h1: nếu có " & " thì tách thành 2 dòng animate riêng.
  const titleParts = page.title.includes(" & ")
    ? [page.title.split(" & ")[0], `& ${page.title.split(" & ")[1]}`]
    : [page.title];

  return (
    <main className={styles.page} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="dvm-title">
        <Image
          className={styles.heroImage}
          src="/images/hero/campus-hero.jpg"
          alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroCopy}>
          <p>DISCOVER VGG · {page.number}</p>
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

      {/* ── INTRO / LEAD ─────────────────────────────────────── */}
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
            <span>VGG</span>
            <span>Graduate School</span>
            <span>Văn Lang University</span>
          </div>
        </div>
        <figure className={styles.storyMedia} data-reveal>
          <Image
            src="/images/programmers/pic_pro.jpg"
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
                <span className={styles.contactLabel}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{label}</h3>
                <ContactValue label={label} value={value} />
              </div>
            ))}
          </div>
          <figure className={styles.contactMedia} data-reveal>
            <Image
              src="/images/hero/campus-hero.jpg"
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
                  <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 767px) 100vw, 44vw"
                  />
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
                  <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 767px) 100vw, 44vw"
                  />
                </figure>
              )}
            </section>
          );
        })
      )}

      <DiscoverMore activeSlug={slug} />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
