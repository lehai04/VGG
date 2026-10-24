"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import {
  ArrowRight,
  Award,
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
import { getProgrammeCurricula } from "@/data/curricula";
import { type Programme, getProgrammeTuition } from "@/data/programmes";
import styles from "./ProgrammeDetailPage.module.css";
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
      <ResourcesConsultation initialProgramme={programme.title} />
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
  image?: string;
  alt?: string;
  title: string;
  text: string;
}

interface CareerRoleItem {
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
export function ProgrammeDetailPage({ programme }: { programme: Programme }) {
  const pageContent = programme.pageContent;
  const curricula = getProgrammeCurricula(programme);

  // Active track state for Section 05 ("ung-dung" = 0, "nghien-cuu" = 1)
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});

  if (programme.detailsPending) {
    return <PendingPage programme={programme} />;
  }

  if (!pageContent) {
    return <PendingPage programme={programme} />;
  }

  const toggleModule = (index: number) => {
    setOpenModules((prev) => ({ ...prev, [index]: !prev[index] }));
  };

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

  const graduationProjectName =
    pageContent.section05.graduationProjects[activeTrackIndex === 1 ? 1 : 0];

  const curriculumIntroText = pageContent.section05.curriculumIntro[activeTrackIndex === 1 ? 1 : 0];

  /* ── 07. FAQs ────────────────────────────────────────────── */
  const faqsList: readonly FaqQuestion[] = pageContent.faq.faqs;

  return (
    <main className={`subpage ${styles.page}`} data-programme={programme.id} id="main-content">
      <SiteHeader compact />

      {/* ────────────────────────────────────────────────────────
          HERO BANNER
          ──────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="programme-title">
        <Image
          className={styles.heroBackground}
          src={
            pageContent.hero.heroImage ||
            programme.bannerImage ||
            programmeSharedContent.hero.fallbackImage
          }
          alt={`Ngành ${programme.title} - Đại học Văn Lang`}
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
            <h1 id="programme-title" className={styles.heroTitle}>
              {(pageContent.hero.heroTitle ?? programme.title).split("\n").map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </h1>
            <p className={styles.heroLead}>{pageContent.hero.heroLead}</p>

            <div className={styles.heroCtas}>
              <a className={styles.btnPrimary} href={pageContent.hero.consultation.href}>
                {pageContent.hero.consultation.text} <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link className={styles.btnSecondary} href={pageContent.hero.admissions.href}>
                {pageContent.hero.admissions.text} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          QUICK INFO FACTS BAR
          ──────────────────────────────────────────────────────── */}
      <div className={styles.factsBarWrapper}>
        <div
          className={`${styles.factsBar} ${pageContent.facts.quickFactsDetailed ? styles.factsBarDetailed : ""}`}
        >
          {pageContent.facts.quickFactsDetailed
            ? pageContent.facts.quickFactsDetailed.map(({ label, value, detail }) => (
                <div key={label} className={styles.factItem}>
                  <span className={styles.factLabel}>{label}</span>
                  <span className={styles.factValue}>{value}</span>
                  {detail && <span className={styles.factDetail}>{detail}</span>}
                </div>
              ))
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
              {overviewParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {pageContent.section01.link && (
                <a
                  className={styles.btnDownloadOutline}
                  href={pageContent.section01.link.href}
                  aria-label={pageContent.section01.link.ariaLabel}
                >
                  <Download size={17} aria-hidden="true" />
                  <span>{pageContent.section01.link.text}</span>
                  <Download size={17} aria-hidden="true" />
                </a>
              )}
            </div>

            {(pageContent.section01.overviewImage !== null ||
              pageContent.section01.tags.length > 0) && (
              <div className={styles.overviewMedia}>
                {pageContent.section01.overviewImage !== null && (
                  <div className={styles.overviewImageWrap}>
                    <Image
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
                      {pageContent.section01.tags.map((tag, index) => {
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
            {highlightsList.map(({ Icon, title, text }) => (
              <article key={title} className={styles.highlightCard}>
                <div className={styles.highlightIconBox} aria-hidden="true">
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <h3 className={styles.highlightTitle}>{title}</h3>
                <p className={styles.highlightText}>{text}</p>
              </article>
            ))}
          </div>

          {pageContent.section02.learningOutcomes && (
            <details className={styles.outcomesPanel} open>
              <summary className={styles.outcomesHeading}>
                <span>{pageContent.section02.outcomesHeading}</span>
                <span className={styles.outcomesToggle} aria-hidden="true" />
              </summary>
              <p className={styles.outcomesIntro}>{pageContent.section02.learningOutcomes.intro}</p>
              <div className={styles.outcomesGrid}>
                {pageContent.section02.learningOutcomes.items.map((outcome) => (
                  <article className={styles.outcomeItem} key={outcome.code}>
                    <span className={styles.outcomeCode}>{outcome.code}</span>
                    <h3>{outcome.title}</h3>
                    <p>{outcome.text}</p>
                  </article>
                ))}
              </div>
            </details>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          03 / CHƯƠNG TRÌNH PHÙ HỢP VỚI AI?
          ──────────────────────────────────────────────────────── */}
      <section id="doi-tuong" className={styles.sectionAudience} aria-labelledby="sec-03-title">
        <div className={styles.container}>
          <SectionHeader
            index={pageContent.section03.sectionNumber}
            title={pageContent.section03.audienceHeading}
          />

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
                  <h3 className={styles.audienceTitle}>{item.title}</h3>
                  <p className={styles.audienceText}>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          04 / CƠ HỘI NGHỀ NGHIỆP VÀ PHÁT TRIỂN
          ──────────────────────────────────────────────────────── */}
      <section id="nghe-nghiep" className={styles.sectionCareers} aria-labelledby="sec-04-title">
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

          <div className={styles.careersLayout}>
            <div className={styles.careersGrid}>
              {careersList.map(({ Icon, title, sub }, idx) => (
                <div key={idx} className={styles.careerCard}>
                  <div className={styles.careerIconBox} aria-hidden="true">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>
                  <div className={styles.careerCopy}>
                    <h3 className={styles.careerTitle}>{title}</h3>
                    <p className={styles.careerSub}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

          {/* Orientation switcher tabs */}
          <div className={styles.curriculumTabs}>
            <button
              type="button"
              className={`${styles.curriculumTab} ${activeTrackIndex === 0 ? styles.curriculumTabActive : ""}`}
              onClick={() => setActiveTrackIndex(0)}
            >
              <Briefcase size={18} aria-hidden="true" />
              <span>{pageContent.section05.trackLabels[0]}</span>
            </button>
            <button
              type="button"
              className={`${styles.curriculumTab} ${activeTrackIndex === 1 ? styles.curriculumTabActive : ""}`}
              onClick={() => setActiveTrackIndex(1)}
            >
              <BookOpen size={18} aria-hidden="true" />
              <span>{pageContent.section05.trackLabels[1]}</span>
            </button>
          </div>

          <div className={styles.curriculumLayout}>
            {/* Left: General Information card */}
            <aside className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>{pageContent.section05.generalInformation}</h3>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <FileText className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div>
                    <div className={styles.infoItemTitle}>{pageContent.section05.creditsLabel}</div>
                    <div className={styles.infoItemValue}>
                      {pageContent.section05.trackCredits?.[activeTrackIndex] ??
                        `${programme.credits} ${pageContent.section05.creditUnit}`}
                    </div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Clock className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div>
                    <div className={styles.infoItemTitle}>
                      {pageContent.section05.durationLabel}
                    </div>
                    <div className={styles.infoItemValue}>
                      {pageContent.section05.trackDurations?.[activeTrackIndex] ??
                        programme.duration}
                    </div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Building2 className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div>
                    <div className={styles.infoItemTitle}>
                      {pageContent.section05.studyModeLabel}
                    </div>
                    <div className={styles.infoItemValue}>{pageContent.section05.studyMode}</div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Award className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div>
                    <div className={styles.infoItemTitle}>
                      {pageContent.section05.graduationLabel}
                    </div>
                    <div className={styles.infoItemValue}>{graduationProjectName}</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right: Modules Accordion */}
            <div className={styles.curriculumRight}>
              <p className={styles.curriculumIntro}>{curriculumIntroText}</p>

              <div className={styles.moduleList}>
                {currentTrack && currentTrack.groups && currentTrack.groups.length > 0 ? (
                  currentTrack.groups.map((group, gIdx) => {
                    const totalCredits = group.courses.reduce(
                      (sum, c) => sum + (c.credits || 0),
                      0,
                    );
                    const isOpen = !!openModules[gIdx];

                    return (
                      <div key={group.title} className={styles.moduleCard}>
                        <div
                          className={styles.moduleHeader}
                          onClick={() => toggleModule(gIdx)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleModule(gIdx);
                            }
                          }}
                          aria-expanded={isOpen}
                        >
                          <div className={styles.moduleTitleRow}>
                            <ChevronRight
                              size={18}
                              className={styles.moduleChevron}
                              data-open={isOpen}
                              aria-hidden="true"
                            />
                            <span>{group.title}</span>
                          </div>

                          <div className={styles.moduleCredits}>
                            <span className={styles.moduleToggleBtn}>
                              {isOpen
                                ? pageContent.section05.collapse
                                : pageContent.section05.expand}
                            </span>
                            {(group.totalCreditsLabel || totalCredits > 0) && (
                              <span>
                                {group.totalCreditsLabel ??
                                  `${totalCredits} ${pageContent.section05.creditUnit}`}
                              </span>
                            )}
                          </div>
                        </div>

                        {isOpen && (
                          <div className={styles.moduleBody}>
                            <ul className={styles.courseList}>
                              {group.courses.map((course, cIdx) => (
                                <li key={cIdx} className={styles.courseItem}>
                                  <div>
                                    <span className={styles.courseName}>
                                      {course.code
                                        ? `${course.code} · ${course.name}`
                                        : course.name}
                                    </span>
                                    {course.elective && (
                                      <span className={styles.courseElectiveTag}>
                                        {pageContent.section05.elective}
                                      </span>
                                    )}
                                  </div>
                                  {course.credits && (
                                    <span className={styles.courseCredit}>
                                      {course.credits} {pageContent.section05.creditAbbreviation}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.moduleCard}>
                    <div className={styles.moduleHeader}>
                      <span>{pageContent.section05.pending}</span>
                    </div>
                  </div>
                )}
              </div>

              <a
                className={styles.btnDownloadOutline}
                href={pageContent.section05.link.href}
                data-curriculum-download="true"
              >
                <Download size={17} aria-hidden="true" />
                <span>{pageContent.section05.link.text}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          CALL TO ACTION BANNER
          ──────────────────────────────────────────────────────── */}
      <div className={styles.ctaBannerWrapper}>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <h2>
              {pageContent.consultation.ctaHeading.map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 && <br />}
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
            </aside>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          CONSULTATION SECTION & FOOTER (Preserved as required)
          ──────────────────────────────────────────────────────── */}
      <ResourcesConsultation initialProgramme={programme.title} />
      <SiteFooter />
    </main>
  );
}
