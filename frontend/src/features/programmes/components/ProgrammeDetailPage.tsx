"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CmsRichText } from "@/shared/components/CmsRichText";
import Link from "@/i18n/components/LocalizedLink";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Cpu,
  CreditCard,
  Download,
  FileText,
  FlaskConical,
  GitFork,
  GraduationCap,
  Mail,
  MapPin,
  Network,
  Phone,
  Target,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { ResourcesConsultation } from "@/features/home/components/ResourcesConsultation";
import {
  getProgrammeCurricula,
  getCurriculumOrientation,
  getCurriculumGraduationProject,
} from "@/data/curricula";
import { type Programme, getProgrammeTuition } from "@/data/programmes";
import styles from "./ProgrammeDetailPage.module.css";
import {CmsPageSections,CmsSlot} from '@/shared/components/CmsPageSections';
import type {CmsComposition} from '../../../../../backend/src/modules/cms/visual-model';
import { ProgrammeCurriculumGroups } from "./ProgrammeCurriculumGroups";
import {
  ProgrammeAdmissions,
  ProgrammeCompletion,
  ProgrammeFees,
  ProgrammeSemesterPlan,
} from "./ProgrammeSupplementaryContent";
import { programmeSharedContent } from "@/data/programmes/shared-content";

/* ──────────────────────────────────────────────────────────────
   Pending page — shown when details are not yet ready
   ────────────────────────────────────────────────────────────── */
function PendingPage({ programme }: { programme: Programme }) {
  return (
    <main className={`subpage ${styles.page}`} data-programme={programme.id} id="main-content">
      <SiteHeader compact />
      <div className={`${styles.container} ${styles.pendingContainer}`}>
        <p className={styles.heroDegree}>{programme.degree}</p>
        <h1 className={styles.heroTitle} data-pending="true">
          {programme.title}
        </h1>
        <p className={styles.pendingSummary}>
          {programme.summary ?? `Thông tin chi tiết ngành ${programme.title} đang được cập nhật.`}
        </p>
        <div className={styles.pendingFacts}>
          <div>
            <div className={styles.pendingFactLabel}>
              {programmeSharedContent.facts.pendingCredits}
            </div>
            <strong className={styles.pendingFactValue}>
              {programme.creditsLabel ?? programme.credits}
            </strong>
          </div>
          <div>
            <div className={styles.pendingFactLabel}>
              {programmeSharedContent.facts.pendingDuration}
            </div>
            <strong className={styles.pendingFactValue}>{programme.duration}</strong>
          </div>
          <div>
            <div className={styles.pendingFactLabel}>
              {programmeSharedContent.facts.pendingTuition}
            </div>
            <strong className={styles.pendingFactValue}>{getProgrammeTuition(programme)}</strong>
          </div>
        </div>
      </div>
      <ResourcesConsultation
        initialProgramme={programme.title}
        intro={programme.pageContent?.consultation.formIntro}
      />
      <SiteFooter />
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────
   Section Header Subcomponent
   ────────────────────────────────────────────────────────────── */
function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionIndex}>{index}</span>
      <span className={styles.sectionDivider} aria-hidden="true" />
      <h2 id={`sec-${index}-title`} className={styles.sectionTitle}>
        {title}
      </h2>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Presentation types shared by every programme
   ────────────────────────────────────────────────────────────── */

interface HighlightItem {
  Icon: LucideIcon;
  title: string;
  text: string;
}

interface AudienceItem {
  imageSource?: string;
  image?: string;
  alt?: string;
  title: string;
  text: string;
}

interface CareerRoleItem {
  group?: string;
  Icon: LucideIcon;
  title: string;
  sub: string;
}

interface FaqQuestion {
  question: string;
  answer: string;
}

/* ──────────────────────────────────────────────────────────────
   Main Component: ProgrammeDetailPage
   ────────────────────────────────────────────────────────────── */
export function ProgrammeDetailPage({ programme,layout }: { programme: Programme;layout?:CmsComposition }) {
  const pageContent = programme.pageContent;
  const curricula = getProgrammeCurricula(programme);

  // Active track state for Section 05 ("ung-dung" = 0, "nghien-cuu" = 1)
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);

  if (programme.detailsPending) {
    return <PendingPage programme={programme} />;
  }

  if (!pageContent) {
    return <PendingPage programme={programme} />;
  }

  /* ── 01. Dynamic Fact ribbon items ───────────────────────── */
  const quickFacts = [
    {
      Icon: GraduationCap,
      label: pageContent.facts.degree,
      value: programme.degree,
    },
    {
      Icon: FileText,
      label: pageContent.facts.code,
      value: pageContent.facts.displayCode ?? programme.code,
    },
    {
      Icon: Clock,
      label: pageContent.facts.duration,
      value: pageContent.facts.displayDuration ?? programme.duration,
    },
    {
      Icon: GitFork,
      label: pageContent.facts.orientation,
      value:
        programme.orientations && programme.orientations.length > 1
          ? `${String(programme.orientations.length).padStart(2, "0")} ${pageContent.facts.orientationUnit}`
          : programme.orientation,
    },
    {
      Icon: Calendar,
      label: pageContent.facts.schedule,
      value: programme.schedule ?? pageContent.facts.fallbackSchedule,
    },
    {
      Icon: CreditCard,
      label: pageContent.facts.tuition,
      value: pageContent.facts.displayTuition ?? getProgrammeTuition(programme),
    },
  ];

  /* ── 02. Overview content ────────────────────────────────── */
  const overviewParagraphs = pageContent.section01.overview;

  /* ── 03. Highlights ──────────────────────────────────────── */
  const highlightIcons = [GitFork, TrendingUp, Cpu, Users];
  const highlightsList: HighlightItem[] = pageContent.section02.highlights.map((item, i) => ({
    Icon: highlightIcons[i % highlightIcons.length],
    ...item,
  }));

  /* ── 04. Audience ────────────────────────────────────────── */
  const audienceList: readonly AudienceItem[] = pageContent.section03.audience;

  /* ── 05. Careers ─────────────────────────────────────────── */
  const careerIcons = [Network, Building2, Truck, TrendingUp, Warehouse, GraduationCap];
  const careersList: CareerRoleItem[] = pageContent.section04.careers.map((item, i) => ({
    Icon: careerIcons[i % careerIcons.length],
    ...item,
  }));

  /* ── 06. Curriculum tracks & selected track data ─────────── */
  const availableTracks = curricula.length > 0 ? curricula : [];
  const currentTrack = availableTracks[activeTrackIndex] ?? availableTracks[0];
  const usesDefaultTags =
    pageContent.section01.tags.length === 2 &&
    pageContent.section01.tags.every(
      (tag, index) => tag === programmeSharedContent.overview.tags[index],
    );
  const overviewTags = usesDefaultTags
    ? [...new Set(availableTracks.map((track) => getCurriculumOrientation(programme, track)))]
    : pageContent.section01.tags;

  const orientationIndex =
    getCurriculumOrientation(programme, currentTrack) === "Nghiên cứu" ? 1 : 0;
  const graduationProjectName =
    getCurriculumGraduationProject(currentTrack) ??
    pageContent.section05.graduationProjects[orientationIndex] ??
    pageContent.section05.graduationProjects[0];
  const curriculumIntroText =
    currentTrack?.intro ??
    pageContent.section05.curriculumIntro[orientationIndex] ??
    pageContent.section05.curriculumIntro[0];
  const generalFacts = [
    {
      label: pageContent.section05.creditsLabel,
      value:
        pageContent.section05.trackCredits?.[activeTrackIndex] ??
        `${programme.credits} ${pageContent.section05.creditUnit}`,
    },
    ...(currentTrack?.generalFacts ??
      pageContent.section05.generalFacts ?? [
        {
          label: pageContent.section05.durationLabel,
          value: pageContent.section05.trackDurations?.[activeTrackIndex] ?? programme.duration,
        },
        { label: pageContent.section05.studyModeLabel, value: programme.studyMode },
        { label: pageContent.section05.graduationLabel, value: graduationProjectName },
      ]),
  ];

  /* ── 07. FAQs ────────────────────────────────────────────── */
  const faqsList: readonly FaqQuestion[] = pageContent.faq.faqs.filter((faq) => faq.hidden !== "true");

  return (
    <main className={`subpage ${styles.page}`} data-programme={programme.id} id="main-content">
      <SiteHeader compact />

      {/* ────────────────────────────────────────────────────────
          HERO BANNER
          ──────────────────────────────────────────────────────── */}
      <CmsPageSections pageId={`programme:${programme.id}`} layout={layout}>
      <section data-cms-slot="hero" data-cms-path="pageContent.hero.heroImage" className={styles.hero} aria-labelledby="programme-title">
        <Image
          className={styles.heroBackground}
          src={
            pageContent.hero.heroImage ||
            programme.bannerImage ||
            programmeSharedContent.hero.fallbackImage
          }
          alt={pageContent.hero.imageAlt ?? `Ngành ${programme.title} - Đại học Văn Lang`}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroInner}>
          {/* Subtle slogan watermark on the right */}
          <div className={styles.heroSloganWatermark} aria-hidden="true">
            {programmeSharedContent.hero.sloganLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <span>{pageContent.hero.heroSlogan ?? programmeSharedContent.hero.fallbackSlogan}</span>
          </div>

          <div className={styles.heroContent}>
            <span className={styles.heroDegree}>{programme.degree.toUpperCase()}</span>
            <h1 id="programme-title" className={styles.heroTitle} data-cms-path="pageContent.hero.heroTitle">
              {(pageContent.hero.heroTitle ?? programme.title).split("\n").map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 && " "}
                  {line}
                </React.Fragment>
              ))}
            </h1>
            <p className={styles.heroLead} data-cms-path="pageContent.hero.heroLead">{pageContent.hero.heroLead}</p>

            <div className={styles.heroCtas}>
              <a data-cms-path="pageContent.hero.consultation.text" className={styles.btnPrimary} href={pageContent.hero.consultation.href}>
                {pageContent.hero.consultation.text} <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link data-cms-path="pageContent.hero.admissions.text" className={styles.btnSecondary} href={pageContent.hero.admissions.href}>
                {pageContent.hero.admissions.text} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          QUICK INFO FACTS BAR
          ──────────────────────────────────────────────────────── */}
      <div data-cms-slot="facts" className={styles.factsBarWrapper}>
        <div
          className={`${styles.factsBar} ${pageContent.facts.quickFactsDetailed ? styles.factsBarDetailed : ""}`}
        >
          {pageContent.facts.quickFactsDetailed
            ? pageContent.facts.quickFactsDetailed.map(({ label, value, detail }) => {
                const Icon =
                  (
                    {
                      "Mã ngành": FileText,
                      "Mã chương trình": FileText,
                      "Định hướng": GitFork,
                      "Khối lượng": BookOpen,
                      "Thời gian chuẩn": Clock,
                      "Khối lượng chương trình": BookOpen,
                      "Thời gian đào tạo": Clock,
                      "Định hướng đào tạo": GitFork,
                      "Hình thức đào tạo": GraduationCap,
                      "Ngôn ngữ đào tạo": Users,
                      "Học phí toàn khóa": CreditCard,
                    } satisfies Record<string, LucideIcon>
                  )[label] ?? BookOpen;
                return (
                  <div key={label} className={styles.factItem}>
                    <div className={styles.factIcon} aria-hidden="true">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div className={styles.factContent}>
                      <span className={styles.factLabel}>{label}</span>
                      <span className={styles.factValue}>{value}</span>
                      {detail && <span className={styles.factDetail}>{detail}</span>}
                    </div>
                  </div>
                );
              })
            : quickFacts.map(({ Icon, label, value }) => (
                <div key={label} className={styles.factItem}>
                  <div className={styles.factIcon} aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className={styles.factContent}>
                    <span className={styles.factLabel}>{label}</span>
                    <span className={styles.factValue}>{value}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <nav className={styles.sectionNav} aria-label="Nội dung chương trình">
        {[
          ["tong-quan", "Tổng quan"],
          ["diem-noi-bat", "Điểm nổi bật"],
          [
            "doi-tuong",
            pageContent.section03.audienceHeading === "Năng lực phát triển qua chương trình"
              ? "Năng lực"
              : "Đối tượng",
          ],
          ["nghe-nghiep", "Hướng phát triển"],
          ["chuong-trinh", "Chương trình"],
          ["hoc-phi", "Học phí"],
          ["faq", "Câu hỏi thường gặp"],
        ].map(([id, label]) => (
          <a href={`#${id}`} key={id}>
            {label}
          </a>
        ))}
      </nav>

      {/* ────────────────────────────────────────────────────────
          01 / TỔNG QUAN CHƯƠNG TRÌNH
          ──────────────────────────────────────────────────────── */}
      <section id="tong-quan" className={styles.sectionOverview} aria-labelledby="sec-01-title">
        <div className={styles.container}>
          <SectionHeader
            index={pageContent.section01.sectionNumber}
            title={pageContent.section01.overviewTitle}
          />

          <div
            className={styles.overviewGrid}
            data-no-media={pageContent.section01.overviewImage === null}
          >
            <div className={styles.overviewCopy}>
              {pageContent.section01.headline && (
                <h3 className={styles.contentHeadline}>{pageContent.section01.headline}</h3>
              )}
              {programme.cmsOverview?.[0]?.html ? <div data-cms-path="cmsOverview.0.html"><CmsRichText html={programme.cmsOverview[0].html} /></div> : overviewParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {pageContent.section01.focusAreas && (
                <ul className={styles.focusAreas}>
                  {pageContent.section01.focusAreas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              )}
              {pageContent.section01.link && (
                <a
                  className={styles.btnDownloadOutline}
                  href={pageContent.section01.link.href}
                  aria-label={pageContent.section01.link.ariaLabel}
                >
                  <ArrowRight size={17} aria-hidden="true" />
                  <span>{pageContent.section01.link.text}</span>
                </a>
              )}
            </div>

            {(pageContent.section01.overviewImage !== null ||
              pageContent.section01.tags.length > 0) && (
              <div className={styles.overviewMedia}>
                {pageContent.section01.overviewImage !== null && (
                  <div className={styles.overviewImageWrap}>
                    <Image
                      data-cms-path="pageContent.section01.overviewImage"
                      src={
                        pageContent.section01.overviewImage ?? pageContent.section01.imageFallback
                      }
                      alt={pageContent.section01.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className={styles.overviewPhoto}
                    />
                  </div>
                )}
                {pageContent.section01.tags.length > 0 && (
                  <div className={styles.overviewRibbon}>
                    <h3 className={styles.ribbonTitle}>{pageContent.section01.ribbonTitle}</h3>
                    <div className={styles.ribbonItems}>
                      {overviewTags.map((tag, index) => {
                        const Icon = index === 0 ? Target : FlaskConical;
                        return (
                          <div className={styles.ribbonItem} key={tag}>
                            <span className={styles.ribbonBadge} aria-hidden="true">
                              <Icon size={16} />
                            </span>
                            <span>{tag}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          02 / ĐIỂM NỔI BẬT CỦA CHƯƠNG TRÌNH
          ──────────────────────────────────────────────────────── */}
      {(highlightsList.length > 0 || Boolean(pageContent.section02.learningOutcomes?.items.length)) && (
      <section
        id="diem-noi-bat"
        className={styles.sectionHighlights}
        aria-labelledby="sec-02-title"
      >
        <div className={styles.container}>
          <SectionHeader
            index={pageContent.section02.sectionNumber}
            title={pageContent.section02.heading}
          />

          <div className={styles.highlightGrid}>
            {highlightsList.slice(0, 3).map(({ Icon, title, text }) => (
              <article key={title} className={styles.highlightCard}>
                <div className={styles.highlightIconBox} aria-hidden="true">
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <h3 className={`${styles.highlightTitle} type-card-title`}>{title}</h3>
                <p className={styles.highlightText}>{text}</p>
              </article>
            ))}
          </div>
          {highlightsList.length > 3 && (
            <details className={styles.moreHighlights}>
              <summary>Xem thêm điểm nổi bật ({highlightsList.length - 3})</summary>
              <div className={styles.highlightGrid}>
                {highlightsList.slice(3).map(({ Icon, title, text }) => (
                  <article key={title} className={styles.highlightCard}>
                    <div className={styles.highlightIconBox} aria-hidden="true">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>
                    <h3 className={`${styles.highlightTitle} type-card-title`}>{title}</h3>
                    <p className={styles.highlightText}>{text}</p>
                  </article>
                ))}
              </div>
            </details>
          )}

          {pageContent.section02.learningOutcomes && (
            <details className={styles.outcomesPanel} open>
              <summary className={styles.outcomesHeading}>
                <span>{pageContent.section02.outcomesHeading}</span>
                <span className={styles.outcomesToggle} aria-hidden="true" />
              </summary>
              <p className={styles.outcomesIntro}>{pageContent.section02.learningOutcomes.intro}</p>
              <div className={styles.outcomesGrid}>
                {pageContent.section02.learningOutcomes.items.map((outcome) => (
                  <article className={styles.outcomeItem} key={`${outcome.code}-${outcome.title}`}>
                    <span className={styles.outcomeCode}>{outcome.code}</span>
                    {outcome.title && <h3>{outcome.title}</h3>}
                    <p>{outcome.text}</p>
                  </article>
                ))}
              </div>
            </details>
          )}
        </div>
      </section>
      )}

      {/* ────────────────────────────────────────────────────────
          03 / CHƯƠNG TRÌNH PHÙ HỢP VỚI AI?
          ──────────────────────────────────────────────────────── */}
      {(audienceList.length > 0 || Boolean(pageContent.section03.requirements?.length)) && (
      <section id="doi-tuong" className={styles.sectionAudience} aria-labelledby="sec-03-title">
        <div className={styles.container}>
          <SectionHeader
            index={pageContent.section03.sectionNumber}
            title={pageContent.section03.audienceHeading}
          />

          {pageContent.section03.headline && (
            <h3 className={styles.contentHeadline}>{pageContent.section03.headline}</h3>
          )}
          {pageContent.section03.intro?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {pageContent.section03.illustration && (
            <figure className={styles.audienceIllustration}>
              <div className={styles.audienceIllustrationImage}>
                <Image
                  data-cms-path="pageContent.section03.illustration.src"
                  src={pageContent.section03.illustration.src}
                  alt={pageContent.section03.illustration.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className={styles.audiencePhoto}
                />
              </div>
            </figure>
          )}
          <div className={styles.audienceGrid}>
            {audienceList.map((item, idx) => (
              <article key={idx} className={styles.audienceCard}>
                {item.image && (
                  <div className={styles.audienceImageWrap}>
                    <Image
                      src={item.image}
                      alt={item.alt ?? item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={styles.audiencePhoto}
                    />
                  </div>
                )}
                <div className={styles.audienceBody}>
                  <h3 className={`${styles.audienceTitle} type-card-title`}>{item.title}</h3>
                  <p className={styles.audienceText}>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <ProgrammeAdmissions blocks={pageContent.section03.requirements} />
        </div>
      </section>
      )}

      {/* ────────────────────────────────────────────────────────
          04 / CƠ HỘI NGHỀ NGHIỆP VÀ PHÁT TRIỂN
          ──────────────────────────────────────────────────────── */}
      {(careersList.length > 0) && (
      <section id="nghe-nghiep" data-cms-path="pageContent.section04.careerImage" className={styles.sectionCareers} aria-labelledby="sec-04-title">
        <Image
          className={styles.careersBackground}
          src={
            pageContent.section04.careerImage ||
            programme.bannerImage ||
            pageContent.hero.heroImage ||
            programmeSharedContent.hero.fallbackImage
          }
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
        />
        <div className={styles.container}>
          <SectionHeader
            index={pageContent.section04.sectionNumber}
            title={pageContent.section04.careerHeading}
          />

          {pageContent.section04.headline && (
            <h3 className={styles.contentHeadline}>{pageContent.section04.headline}</h3>
          )}
          {pageContent.section04.intro && <p>{pageContent.section04.intro}</p>}
          <div className={styles.careersLayout}>
            <div className={styles.careersGrid}>
              {careersList.map(({ Icon, title, sub, group }, idx) => (
                <div key={idx} className={styles.careerCard}>
                  <div className={styles.careerIconBox} aria-hidden="true">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>
                  <div className={styles.careerCopy}>
                    {group && <p className={styles.careerGroup}>{group}</p>}
                    <h3 className={`${styles.careerTitle} type-career-title`}>{title}</h3>
                    <p className={styles.careerSub}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {pageContent.section04.note && <p>{pageContent.section04.note}</p>}
        </div>
      </section>
      )}

      {/* ────────────────────────────────────────────────────────
          05 / KHUNG CHƯƠNG TRÌNH ĐÀO TẠO
          ──────────────────────────────────────────────────────── */}
      <section
        id="chuong-trinh"
        className={styles.sectionCurriculum}
        aria-labelledby="sec-05-title"
      >
        <div className={styles.container}>
          <SectionHeader
            index={pageContent.section05.sectionNumber}
            title={pageContent.section05.heading}
          />

          <div className={styles.curriculumTabs} aria-label="Định hướng chương trình">
            {availableTracks.map((track, index) => (
              <button
                type="button"
                key={track.title}
                className={`${styles.curriculumTab} ${activeTrackIndex === index ? styles.curriculumTabActive : ""}`}
                aria-pressed={activeTrackIndex === index}
                onClick={() => setActiveTrackIndex(index)}
              >
                {getCurriculumOrientation(programme, track) === "Nghiên cứu" ? (
                  <BookOpen size={18} aria-hidden="true" />
                ) : (
                  <Briefcase size={18} aria-hidden="true" />
                )}
                <span>{track.title}</span>
              </button>
            ))}
          </div>

          <div className={styles.curriculumLayout}>
            {/* Left: General Information card */}
            <aside className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>{pageContent.section05.generalInformation}</h3>
              <div className={styles.infoList}>
                {generalFacts.map((fact) => (
                  <div className={styles.infoItem} key={fact.label}>
                    <FileText className={styles.infoIcon} size={20} aria-hidden="true" />
                    <div>
                      <div className={styles.infoItemTitle}>{fact.label}</div>
                      <div className={styles.infoItemValue}>{fact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Right: Modules Accordion */}
            <div className={styles.curriculumRight}>
              {currentTrack?.subtitle && <p>{currentTrack.subtitle}</p>}
              <p className={styles.curriculumIntro}>{curriculumIntroText}</p>

              {(currentTrack?.notes ?? pageContent.section05.notes)?.map((note) => (
                <p key={note}>{note}</p>
              ))}
              <ProgrammeCurriculumGroups
                key={currentTrack?.title}
                groups={currentTrack?.groups ?? []}
              />
              <ProgrammeSemesterPlan
                programme={programme}
                track={currentTrack}
                key={`plan-${currentTrack?.title}`}
              />
              <ProgrammeCompletion programme={programme} track={currentTrack} />

              <a
                className={styles.btnDownloadOutline}
                href={pageContent.section05.link.href}
                data-curriculum-download={
                  /\.pdf(?:[?#]|$)/i.test(pageContent.section05.link.href) || undefined
                }
              >
                {/\.pdf(?:[?#]|$)/i.test(pageContent.section05.link.href) ? (
                  <Download size={17} aria-hidden="true" />
                ) : (
                  <ArrowRight size={17} aria-hidden="true" />
                )}
                <span>{pageContent.section05.link.text}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CmsSlot slot="fees"><ProgrammeFees programme={programme} /></CmsSlot>
      {programme.cmsApplication?.length ? <section id="ho-so-dang-ky" className={styles.sectionAudience} aria-label="Hồ sơ và quy trình đăng ký"><div className={styles.container}><ProgrammeAdmissions blocks={programme.cmsApplication.map((item) => ({ title: item.title, paragraphs: [item.text] }))} /></div></section> : null}
      {programme.cmsSupport?.length ? <section id="chinh-sach-ho-tro" className={styles.sectionAudience} aria-label="Chính sách hỗ trợ"><div className={styles.container}><ProgrammeAdmissions blocks={programme.cmsSupport.map((item) => ({ title: item.title, paragraphs: [item.text] }))} /></div></section> : null}

      {/* ────────────────────────────────────────────────────────
          CALL TO ACTION BANNER
          ──────────────────────────────────────────────────────── */}
      <div className={styles.ctaBannerWrapper}>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <h2>
              {pageContent.consultation.ctaHeading.map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 && " "}
                  {line}
                </React.Fragment>
              ))}
            </h2>
            <p>{pageContent.consultation.ctaBody}</p>
          </div>
          <a className={styles.ctaButton} href={pageContent.consultation.href}>
            <span>{pageContent.consultation.text}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          CÂU HỎI THƯỜNG GẶP (FAQ) & LIÊN HỆ TƯ VẤN
          ──────────────────────────────────────────────────────── */}
      <section id="faq" className={styles.sectionFaqContact} aria-labelledby="sec-faq-title">
        <div className={styles.container}>
          <div className={styles.faqContactGrid}>
            {/* Left: FAQs list */}
            <div>
              <div className={styles.faqColHeader}>
                <h2 id="sec-faq-title" className={styles.faqColTitle}>
                  {pageContent.faq.heading}
                </h2>
                <a className={styles.faqViewAllLink} href={pageContent.faq.link.href}>
                  {pageContent.faq.link.text}
                </a>
              </div>

              <div className={styles.faqList}>
                {faqsList.map((faq, idx) => (
                  <details key={idx} className={styles.faqItem}>
                    <summary className={styles.faqSummary}>
                      <span>{faq.question}</span>
                      <ChevronRight className={styles.faqChevron} size={18} aria-hidden="true" />
                    </summary>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Right: Contact Information Card */}
            <aside className={styles.contactCard}>
              <h3 className={styles.contactCardTitle}>{programmeSharedContent.contact.heading}</h3>
              <p className={styles.contactItemValue}>
                Điện thoại:{" "}
                <a href={programmeSharedContent.contact.officePhoneHref}>
                  {programmeSharedContent.contact.officePhone}
                </a>
              </p>

              <div className={styles.contactItemList}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <Phone size={18} />
                  </div>
                  <div className={styles.contactItemBody}>
                    <span className={styles.contactItemLabel}>
                      {programmeSharedContent.contact.phoneLabel}
                    </span>
                    <span className={styles.contactItemValue}>
                      <a href={programmeSharedContent.contact.phoneHref}>
                        {programmeSharedContent.contact.phone}
                      </a>
                    </span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <Mail size={18} />
                  </div>
                  <div className={styles.contactItemBody}>
                    <span className={styles.contactItemLabel}>
                      {programmeSharedContent.contact.emailLabel}
                    </span>
                    <span className={styles.contactItemValue}>
                      <a href={programmeSharedContent.contact.emailHref}>
                        {programmeSharedContent.contact.email}
                      </a>
                    </span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <MapPin size={18} />
                  </div>
                  <div className={styles.contactItemBody}>
                    <span className={styles.contactItemLabel}>
                      {programmeSharedContent.contact.addressLabel}
                    </span>
                    <span className={styles.contactItemValue}>
                      {programmeSharedContent.contact.institution}
                      <br />
                      {programmeSharedContent.contact.address}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.contactActions}>
                {(
                  pageContent.consultation.contactActions ?? [
                    { text: "Gọi tư vấn ↗", href: programmeSharedContent.contact.phoneHref },
                    { text: "Gửi email ↗", href: programmeSharedContent.contact.emailHref },
                    { text: "Hướng dẫn đăng ký dự tuyển ↗", href: "/admissions" },
                  ]
                ).map((action) => (
                  <Link href={action.href} key={action.href}>
                    {action.text}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          CONSULTATION SECTION & FOOTER (Preserved as required)
          ──────────────────────────────────────────────────────── */}
      <CmsSlot slot="consultation"><ResourcesConsultation
        initialProgramme={programme.title}
        intro={programme.pageContent?.consultation.formIntro}
      /></CmsSlot>
      </CmsPageSections>
      <SiteFooter />
    </main>
  );
}
