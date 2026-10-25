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
import content from "@/data/discover-introduction.json";
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
function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </>
  );
}
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className={styles.label}>
      <span>{number}</span>
      {children}
    </div>
  );
}
function Actions() {
  return (
    <div className={styles.actions}>
      <Link className={styles.primary} href="/programmes">
        Khám phá chương trình đào tạo <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <Link className={styles.secondary} href="/admissions#tu-van">
        Đăng ký tư vấn <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}

export function DiscoverIntroduction() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <SiteHeader compact />
      <section className={styles.hero} aria-labelledby="discover-title">
        <Image
          src="/images/pages/discover/content/campus.jpg"
          alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className={styles.cover}
        />
        <div className={styles.heroShade} />
        <div className={`${styles.container} ${styles.heroCopy}`}>
          <SectionLabel number="01">VỀ VIỆN SAU ĐẠI HỌC</SectionLabel>
          <h1 id="discover-title">
            {content.hero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <div className={styles.english}>{content.hero.english}</div>
          <p className={styles.heroMessage}>{content.hero.message}</p>
          <p className={styles.heroIntro}>{content.hero.intro}</p>
          <Actions />
          <Link
            href="#gioi-thieu"
            className={styles.scrollLink}
            aria-label="Đọc giới thiệu Viện Sau Đại học"
          >
            <ArrowDown size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section id="gioi-thieu" className={styles.section} aria-labelledby="introduction-title">
        <div className={`${styles.container} ${styles.split}`}>
          <div>
            <SectionLabel number="02">GIỚI THIỆU VIỆN SAU ĐẠI HỌC</SectionLabel>
            <h2 id="introduction-title">{content.introduction.title}</h2>
            <Paragraphs items={content.introduction.paragraphs} />
            <Link className={styles.textLink} href="#tam-nhin-su-menh">
              Tìm hiểu thêm <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <figure className={styles.introMedia}>
            <Image
              src="/images/pages/discover/introduction/seminar-discussion.webp"
              alt="Học viên trao đổi tại hội thảo Dẫn nhập nghiên cứu khoa học của Viện Sau Đại học Văn Lang"
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
          <SectionLabel number="03">TẦM NHÌN & SỨ MỆNH</SectionLabel>
          <h2 id="vision-title">Tầm nhìn và Sứ mệnh</h2>
          <div className={styles.visionGrid}>
            {[content.vision, content.mission].map((item, i) => (
              <article className={styles.visionBlock} key={item.title}>
                {i === 0 ? (
                  <Compass className={styles.icon} size={34} aria-hidden="true" />
                ) : (
                  <Target className={styles.icon} size={34} aria-hidden="true" />
                )}
                <div className={styles.cardEnglish}>{item.english}</div>
                <h3 className="type-card-title">{item.title}</h3>
                <Paragraphs items={item.paragraphs} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="triet-ly-giao-duc" className={styles.section} aria-labelledby="philosophy-title">
        <div className={styles.container}>
          <SectionLabel number="04">TRIẾT LÝ GIÁO DỤC</SectionLabel>
          <h2 id="philosophy-title">{content.philosophy.title}</h2>
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
                  <h3 className="type-card-title">{item.title}</h3>
                  <p>{item.text}</p>
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
          <SectionLabel number="05">GIÁ TRỊ CỐT LÕI LEAD</SectionLabel>
          <h2 id="values-title">{content.values.title}</h2>
          <p className={styles.sectionIntro}>{content.values.intro}</p>
          <div className={styles.fourGrid}>
            {content.values.items.map((item, i) => {
              const Icon = valueIcons[i];
              return (
                <article className={styles.valueItem} key={item.name}>
                  <div className={styles.valueTop}>
                    <span aria-hidden="true">{item.name[0]}</span>
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <div className={styles.cardEnglish}>{item.name}</div>
                  <h3 className="type-card-title">{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
          <p className={styles.valueMessage}>{content.values.message}</p>
        </div>
      </section>
      <section id="vi-sao-chon-vgg" className={styles.section} aria-labelledby="benefits-title">
        <div className={styles.container}>
          <SectionLabel number="06">LỢI THẾ DÀNH CHO NGƯỜI HỌC</SectionLabel>
          <h2 id="benefits-title">{content.benefits.title}</h2>
          <p className={styles.statement}>{content.benefits.message}</p>
          <p className={styles.sectionIntro}>{content.benefits.intro}</p>
          <div className={styles.benefitsGrid}>
            {content.benefits.items.map((item, i) => {
              const Icon = benefitIcons[i];
              return (
                <article className={styles.benefitItem} key={item.title}>
                  <Icon className={styles.icon} size={30} aria-hidden="true" />
                  <div>
                    <h3 className="type-card-title">{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <Link className={styles.textLink} href="/programmes">
            Khám phá các chương trình đào tạo <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        id="dinh-huong-2030"
        className={`${styles.section} ${styles.tinted}`}
        aria-labelledby="strategy-title"
      >
        <div className={`${styles.container} ${styles.split}`}>
          <figure className={styles.strategyMedia}>
            <Image
              src="/images/pages/discover/content/campus.jpg"
              alt="Không gian khuôn viên và cơ sở vật chất Trường Đại học Văn Lang"
              fill
              loading="eager"
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.cover}
            />
            <span className={styles.year}>2030</span>
          </figure>
          <div>
            <SectionLabel number="07">ĐỊNH HƯỚNG PHÁT TRIỂN ĐẾN NĂM 2030</SectionLabel>
            <h2 id="strategy-title">{content.strategy.title}</h2>
            <Paragraphs items={content.strategy.paragraphs} />
          </div>
        </div>
      </section>
      <section id="doi-ngu-lanh-dao" className={styles.section} aria-labelledby="leaders-title">
        <div className={styles.container}>
          <SectionLabel number="08">ĐỘI NGŨ LÃNH ĐẠO</SectionLabel>
          <h2 id="leaders-title">{content.leadership.title}</h2>
          <div className={styles.sectionIntro}>
            <Paragraphs items={content.leadership.paragraphs} />
          </div>
          <div id="phu-trach-cac-bo-phan" className={styles.leadersGrid}>
            {leaders.map((person) => (
              <article className={styles.leaderCard} key={person.name}>
                <div className={styles.portrait}>
                  {person.image && (
                    <Image
                      src={person.image}
                      alt={`Chân dung ${person.name}`}
                      fill
                      sizes="(max-width: 440px) 260px, (max-width: 680px) 50vw, (max-width: 1000px) 33vw, 25vw"
                    />
                  )}
                </div>
                <div className={styles.leaderCopy}>
                  <h3 className={styles.departmentName}>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.closing}`} aria-labelledby="closing-title">
        <Image
          src="/images/pages/discover/introduction/seminar-community.webp"
          alt="Cộng đồng giảng viên và học viên tham gia hoạt động nghiên cứu tại Văn Lang"
          fill
          sizes="100vw"
          className={styles.cover}
        />
        <div className={styles.heroShade} />
        <div className={`${styles.container} ${styles.closingCopy}`}>
          <SectionLabel number="09">HÀNH TRÌNH TIẾP THEO</SectionLabel>
          <h2 id="closing-title">{content.closing.title}</h2>
          <p className={styles.statement}>{content.closing.message}</p>
          <p>{content.closing.intro}</p>
          <Actions />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
