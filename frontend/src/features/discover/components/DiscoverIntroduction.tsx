import { requestCopy } from "@/i18n/request-copy";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Compass,
  GraduationCap,
  Lightbulb,
  Network,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import defaultContent from "@/data/discover-introduction.json";
import { websiteContent,websiteLayout,websiteBanner } from '@/lib/website-content';
import {ContentPageSections} from '@/shared/components/ContentPageSections';
import { discoverMedia, discoverActions } from '@/data/discover-media';
import { leadershipProfiles, departmentHeads } from "@/data/discover-leadership";
import styles from "./DiscoverIntroduction.module.css";

const philosophyIcons = [BookOpen, Lightbulb, Target];
const valueIcons = [Compass, ShieldCheck, Lightbulb, Users];
const benefitIcons = [GraduationCap, Users, BookOpen, Network];
const leaders = [
  ...leadershipProfiles.map((person) => ({
    name: person.name,
    role: person.title,
    image: person.image,
  })),
  ...departmentHeads,
];
async function Paragraphs({ items }: { items: readonly string[] }) {
  const t = await requestCopy();
  return (
    <>
      {items.map((text) => (
        <p key={text}>{t(text)}</p>
      ))}
    </>
  );
}
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div data-section-label={number ? "" : undefined} className={styles.label}>
      <span hidden>{number}</span>
      {children}
    </div>
  );
}
async function Actions({ actions }: { actions: typeof discoverActions }) {
  const t = await requestCopy();
  return (
    <div className={styles.actions}>
      <Link className={styles.primary} href={actions.primary.href}>
        {t(actions.primary.label)} <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <Link className={styles.secondary} href={actions.secondary.href}>
        {t(actions.secondary.label)} <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}

export async function DiscoverIntroduction() {
  const t = await requestCopy();
  const layout=await websiteLayout('discover');
  const banner=await websiteBanner('discover');
  const { leaders: contentLeaders, media, actions, ...content } = await websiteContent('discover', { ...defaultContent, leaders, media: discoverMedia, actions: discoverActions });
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <SiteHeader compact />
      <ContentPageSections layout={layout} pageId="discover">
      <section data-site-banner data-content-slot="hero" className={styles.hero} aria-labelledby="discover-title">
        {banner?.kind==='video'?<video className={styles.cover} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} src={banner.src} poster={banner.poster} autoPlay muted loop playsInline/>:<Image
          src={banner?.src??media.hero.image}
          alt={banner?.alt??media.hero.alt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className={styles.cover}
        />}
        <div className={styles.heroShade} />
        <div data-banner-copy data-banner-inset className={`${styles.container} ${styles.heroCopy}`}>
          <div data-banner-label><SectionLabel number="">ABOUT THE INSTITUTE OF POSTGRADUATE EDUCATION</SectionLabel></div>
          <h1 data-banner-title id="discover-title">
            {content.hero.title.map((line) => (
              <span key={line}>{t(line)}</span>
            ))}
          </h1>
          <div data-banner-description className={styles.english}>{content.hero.english}</div>
          <p data-banner-description className={styles.heroMessage}>{t(content.hero.message)}</p>
          <p data-banner-description className={styles.heroIntro}>{t(content.hero.intro)}</p>
          <Actions actions={actions} />
          <Link
            href="#gioi-thieu"
            className={styles.scrollLink}
            aria-label="Đọc giới thiệu Viện Sau đại học"
          >
            <ArrowDown size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section id="gioi-thieu" className={styles.section} aria-labelledby="introduction-title">
        <div className={`${styles.container} ${styles.split}`}>
          <div>
            <SectionLabel number="02">{t("GIỚI THIỆU Viện Sau đại học")}</SectionLabel>
            <h3 data-section-subtitle id="introduction-title">{t(content.introduction.title)}</h3>
            <Paragraphs items={content.introduction.paragraphs} />
            <Link className={styles.textLink} href="#tam-nhin-su-menh">
              {t("Tìm hiểu thêm")} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <figure className={styles.introMedia}>
            <Image
              src={media.introduction.image}
              alt={t(media.introduction.alt)}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.cover}
            />
          </figure>
        </div>
      </section>
      <section
        id="tam-nhin-su-menh"
        className={`${styles.section} ${styles.tinted}`}
        aria-labelledby="vision-title"
      >
        <div className={styles.container}>
          <SectionLabel number="03">{t("TẦM NHÌN & SỨ MỆNH")}</SectionLabel>
          <h3 data-section-subtitle id="vision-title">{t("Tầm nhìn và Sứ mệnh")}</h3>
          <div className={styles.visionGrid}>
            {[content.vision, content.mission].map((item, i) => (
              <article className={styles.visionBlock} key={item.title}>
                {i === 0 ? (
                  <Compass className={styles.icon} size={34} aria-hidden="true" />
                ) : (
                  <Target className={styles.icon} size={34} aria-hidden="true" />
                )}
                <div className={styles.cardEnglish}>{item.english}</div>
                <h3 className="type-card-title">{t(item.title)}</h3>
                <Paragraphs items={item.paragraphs} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="triet-ly-giao-duc" className={styles.section} aria-labelledby="philosophy-title">
        <div className={styles.container}>
          <SectionLabel number="04">{t("TRIẾT LÝ GIÁO DỤC")}</SectionLabel>
          <h3 data-section-subtitle id="philosophy-title">{t(content.philosophy.title)}</h3>
          <div className={styles.sectionIntro}>
            <Paragraphs items={content.philosophy.paragraphs} />
          </div>
          <div className={styles.threeGrid}>
            {content.philosophy.items.map((item, i) => {
              const Icon = philosophyIcons[i];
              return (
                <article className={styles.philosophyCard} key={item.english}>
                  <Icon className={styles.icon} size={32} aria-hidden="true" />
                  <div className={styles.cardEnglish}>{item.english}</div>
                  <h3 className="type-card-title">{t(item.title)}</h3>
                  <p>{t(item.text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="gia-tri-cot-loi"
        className={`${styles.section} ${styles.values}`}
        aria-labelledby="values-title"
      >
        <div className={styles.container}>
          <SectionLabel number="05">{t("GIÁ TRỊ CỐT LÕI LEAD")}</SectionLabel>
          <h3 data-section-subtitle id="values-title">{t(content.values.title)}</h3>
          <p className={styles.sectionIntro}>{t(content.values.intro)}</p>
          <div className={styles.fourGrid}>
            {content.values.items.map((item, i) => {
              const Icon = valueIcons[i];
              return (
                <article className={styles.valueItem} key={item.name}>
                  <div className={styles.valueTop}>
                    <span aria-hidden="true">{t(item.name[0])}</span>
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <div className={styles.cardEnglish}>{t(item.name)}</div>
                  <h3 className="type-card-title">{t(item.title)}</h3>
                  <p>{t(item.text)}</p>
                </article>
              );
            })}
          </div>
          <p className={styles.valueMessage}>{t(content.values.message)}</p>
        </div>
      </section>
      <section id="vi-sao-chon-vgg" className={styles.section} aria-labelledby="benefits-title">
        <div className={styles.container}>
          <SectionLabel number="06">{t("LỢI THẾ DÀNH CHO NGƯỜI HỌC")}</SectionLabel>
          <h3 data-section-subtitle id="benefits-title">{t(content.benefits.title)}</h3>
          <p className={styles.statement}>{t(content.benefits.message)}</p>
          <p className={styles.sectionIntro}>{t(content.benefits.intro)}</p>
          <div className={styles.benefitsGrid}>
            {content.benefits.items.map((item, i) => {
              const Icon = benefitIcons[i];
              return (
                <article className={styles.benefitItem} key={item.title}>
                  <Icon className={styles.icon} size={30} aria-hidden="true" />
                  <div>
                    <h3 className="type-card-title">{t(item.title)}</h3>
                    <p>{t(item.text)}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <Link className={styles.textLink} href="/programmes">
            {t("Khám phá các chương trình đào tạo")} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section id="doi-ngu-lanh-dao" className={styles.section} aria-labelledby="leaders-title">
        <div className={styles.container}>
          <SectionLabel number="07">{t("ĐỘI NGŨ LÃNH ĐẠO")}</SectionLabel>
          <h3 data-section-subtitle id="leaders-title">{t(content.leadership.title)}</h3>
          <div className={styles.sectionIntro}>
            <Paragraphs items={content.leadership.paragraphs} />
          </div>
          <div id="phu-trach-cac-bo-phan" className={styles.leadersGrid}>
            {contentLeaders.map((person) => (
              <article className={styles.leaderCard} key={person.name}>
                <div className={styles.portrait}>
                  {person.image && (
                    <Image
                      src={person.image}
                      alt={t(`Chân dung ${person.name}`)}
                      fill
                      sizes="(max-width: 440px) 260px, (max-width: 680px) 50vw, (max-width: 1000px) 33vw, 25vw"
                    />
                  )}
                </div>
                <div className={styles.leaderCopy}>
                  <h3 className={styles.departmentName}>{t(person.name)}</h3>
                  <p>{t(person.role)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section data-content-slot="closing" className={`${styles.section} ${styles.closing}`} aria-labelledby="closing-title">
        <Image
          src={media.closing.image}
          alt={t(media.closing.alt)}
          fill
          sizes="100vw"
          className={styles.cover}
        />
        <div className={styles.heroShade} />
        <div className={`${styles.container} ${styles.closingCopy}`}>
          <SectionLabel number="09">{t("HÀNH TRÌNH TIẾP THEO")}</SectionLabel>
          <h3 data-section-subtitle id="closing-title">{t(content.closing.title)}</h3>
          <p className={styles.statement}>{t(content.closing.message)}</p>
          <p>{t(content.closing.intro)}</p>
          <Actions actions={actions} />
        </div>
      </section>
      </ContentPageSections>
      <SiteFooter />
    </main>
  );
}
