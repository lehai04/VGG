"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import {
  ArrowRight,
  ArrowUpRight,
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
import { getProgrammeCurricula, getProgrammeDetails } from "@/data/curricula";
import {
  type Programme,
  getProgrammeTuition,
} from "@/data/programmes";
import { logisticsContent } from "../logistics";
import styles from "./ProgrammeDetailPage.module.css";

/* ──────────────────────────────────────────────────────────────
   Pending page — shown when details are not yet ready
   ────────────────────────────────────────────────────────────── */
function PendingPage({ programme }: { programme: Programme }) {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <SiteHeader compact />
      <div className={styles.container} style={{ padding: "80px 24px" }}>
        <p className={styles.heroDegree}>{programme.degree}</p>
        <h1 className={styles.heroTitle} style={{ color: "#0f172a" }}>{programme.title}</h1>
        <p style={{ fontSize: "16px", color: "#64748b", margin: "20px 0 30px" }}>
          Thông tin chi tiết ngành {programme.title} đang được cập nhật.
        </p>
        <div style={{ display: "flex", gap: "24px", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>Tín chỉ</div>
            <strong style={{ fontSize: "16px" }}>{programme.creditsLabel ?? programme.credits}</strong>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>Thời gian</div>
            <strong style={{ fontSize: "16px" }}>{programme.duration}</strong>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>Học phí toàn khóa</div>
            <strong style={{ fontSize: "16px" }}>{getProgrammeTuition(programme)}</strong>
          </div>
        </div>
      </div>
      <ResourcesConsultation showResources={false} initialProgramme={programme.title} />
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
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Static Logistics specific data sets matching reference design
   ────────────────────────────────────────────────────────────── */

interface HighlightItem {
  Icon: LucideIcon;
  title: string;
  text: string;
}

const logisticsHighlights: HighlightItem[] = [
  {
    Icon: GitFork,
    title: "Hai định hướng đào tạo linh hoạt",
    text: "Ứng dụng và nghiên cứu, đáp ứng những mục tiêu phát triển khác nhau.",
  },
  {
    Icon: TrendingUp,
    title: "Kiến thức gắn với thực tiễn",
    text: "Chú trọng giải quyết các vấn đề thực tế trong Logistics và chuỗi cung ứng.",
  },
  {
    Icon: Cpu,
    title: "Tiếp cận công nghệ và xu hướng mới",
    text: "Tích hợp phân tích dữ liệu, chuyển đổi số và phát triển bền vững trong chương trình.",
  },
  {
    Icon: Users,
    title: "Đội ngũ giảng viên và mạng lưới doanh nghiệp",
    text: "Giảng viên giàu kinh nghiệm cùng cơ hội học tập, kết nối và trải nghiệm thực tế.",
  },
];

interface AudienceItem {
  image: string;
  title: string;
  text: string;
}

// Real photographs: Unsplash License (linked in the task notes) and official VLU media.
const logisticsPhotos = {
  hero: "https://images.unsplash.com/photo-1564035105550-e1f02aa8556b?auto=format&fit=crop&w=2400&q=85",
  port: "https://images.unsplash.com/photo-1606964212858-c215029db704?auto=format&fit=crop&w=1200&q=85",
  warehouse: "https://images.unsplash.com/photo-1764795850513-fa8a469a4600?auto=format&fit=crop&w=1200&q=85",
  truck: "https://images.unsplash.com/photo-1778629794381-d3ae4a54311c?auto=format&fit=crop&w=1200&q=85",
  portTruck: "https://images.unsplash.com/photo-1774929108280-652f82f21d9f?auto=format&fit=crop&w=1200&q=85",
  campus: "/images/pages/programmes/logistics/campus-vlu.jpg",
};

const logisticsAudience: AudienceItem[] = [
  {
    image: logisticsPhotos.warehouse,
    title: "Chuyên viên và nhà quản lý trong lĩnh vực Logistics",
    text: "Những người đang làm việc trong vận tải, kho bãi, xuất nhập khẩu, phân phối, mua hàng và quản lý chuỗi cung ứng.",
  },
  {
    image: logisticsPhotos.port,
    title: "Nhân sự trong lĩnh vực sản xuất và kinh doanh",
    text: "Những người muốn phát triển năng lực hoạch định, tối ưu vận hành, quản trị cung ứng và nâng cao hiệu quả hoạt động doanh nghiệp.",
  },
  {
    image: logisticsPhotos.truck,
    title: "Người mong muốn chuyển hướng hoặc phát triển nghề nghiệp",
    text: "Người tốt nghiệp đại học ở các lĩnh vực phù hợp, có định hướng chuyển sang Logistics và quản lý chuỗi cung ứng hoặc đảm nhận những vị trí yêu cầu chuyên môn cao hơn.",
  },
  {
    image: logisticsPhotos.portTruck,
    title: "Người có định hướng nghiên cứu và giảng dạy",
    text: "Những người mong muốn phát triển năng lực nghiên cứu khoa học, tham gia giảng dạy đại học hoặc chuẩn bị cho lộ trình học tập ở trình độ tiến sĩ.",
  },
];

interface CareerRoleItem {
  Icon: LucideIcon;
  title: string;
  sub: string;
}

const logisticsCareers: CareerRoleItem[] = [
  {
    Icon: Network,
    title: "Quản lý chuỗi cung ứng",
    sub: "Supply Chain Manager, Supply Chain Planning Manager",
  },
  {
    Icon: Building2,
    title: "Quản lý mua hàng và sản xuất",
    sub: "Procurement Manager, Production Planning Manager",
  },
  {
    Icon: Truck,
    title: "Quản lý Logistics",
    sub: "Logistics Manager, Transportation Manager",
  },
  {
    Icon: TrendingUp,
    title: "Phân tích và tư vấn",
    sub: "Supply Chain Analyst, Logistics Consultant",
  },
  {
    Icon: Warehouse,
    title: "Quản lý vận hành",
    sub: "Operations Manager, Warehouse Manager",
  },
  {
    Icon: GraduationCap,
    title: "Nghiên cứu và giảng dạy",
    sub: "Nghiên cứu viên, giảng viên, học tiếp tiến sĩ",
  },
];

interface FaqQuestion {
  question: string;
  answer: string;
}

const logisticsFaqs: FaqQuestion[] = [
  {
    question: "Điều kiện tuyển sinh là gì?",
    answer:
      "Chương trình tuyển sinh theo hình thức xét tuyển hồ sơ. Ứng viên tốt nghiệp Đại học ngành đúng, phù hợp hoặc ngành gần với ngành đăng ký dự tuyển (có thể cần bổ sung kiến thức theo quy định) và đạt chuẩn đầu vào tiếng Anh của Trường Đại học Văn Lang.",
  },
  {
    question: "Chương trình có học bổng không?",
    answer:
      "Trường Đại học Văn Lang có nhiều chính sách học bổng đa dạng từ 10% đến 30% học phí toàn khóa dành cho cựu sinh viên Văn Lang, cán bộ công tác tại các đơn vị đối tác, con thương binh - bệnh binh và học viên có thành tích xuất sắc, cùng chính sách ưu đãi giảm thêm khi đóng học phí một lần.",
  },
  {
    question: "Lịch học được sắp xếp như thế nào?",
    answer:
      "Lịch học được bố trí linh hoạt ngoài giờ hành chính (buổi tối trong tuần và cả ngày Thứ Bảy, Chủ Nhật) nhằm tạo điều kiện thuận lợi tối đa cho học viên vừa đi làm vừa nâng cao trình độ chuyên môn.",
  },
  {
    question: "Khác biệt giữa hai định hướng là gì?",
    answer:
      "Định hướng ứng dụng chú trọng giải quyết bài toán vận hành thực tế tại doanh nghiệp, kết thúc bằng Đề án tốt nghiệp. Định hướng nghiên cứu tập trung sâu vào phương pháp luận khoa học, năng lực phân tích học thuật và chuẩn bị cho học viên học tiếp lên bậc Tiến sĩ, kết thúc bằng Luận văn tốt nghiệp.",
  },
];

/* ──────────────────────────────────────────────────────────────
   Main Component: ProgrammeDetailPage
   ────────────────────────────────────────────────────────────── */
export function ProgrammeDetailPage({ programme }: { programme: Programme }) {
  if (programme.detailsPending) {
    return <PendingPage programme={programme} />;
  }

  const isLogistics = programme.id === "logistics";
  const details = getProgrammeDetails(programme);
  const curricula = getProgrammeCurricula(programme);

  // Active track state for Section 05 ("ung-dung" = 0, "nghien-cuu" = 1)
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});

  const toggleModule = (index: number) => {
    setOpenModules((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  /* ── 01. Dynamic Fact ribbon items ───────────────────────── */
  const quickFacts = [
    {
      Icon: GraduationCap,
      label: "Trình độ",
      value: programme.degree,
    },
    {
      Icon: FileText,
      label: "Mã ngành",
      value: isLogistics ? "8340101" : programme.code,
    },
    {
      Icon: Clock,
      label: "Thời gian đào tạo",
      value: isLogistics ? "Theo CTĐT" : programme.duration,
    },
    {
      Icon: GitFork,
      label: "Định hướng",
      value: programme.orientations && programme.orientations.length > 1
        ? `${String(programme.orientations.length).padStart(2, "0")} định hướng`
        : programme.orientation,
    },
    {
      Icon: Calendar,
      label: "Lịch học",
      value: "Ngoài giờ hành chính",
    },
    {
      Icon: CreditCard,
      label: "Học phí",
      value: isLogistics ? "Theo thông báo" : getProgrammeTuition(programme),
    },
  ];

  /* ── 02. Overview content ────────────────────────────────── */
  const overviewParagraphs = isLogistics
    ? [
        "Chương trình Thạc sĩ Logistics và Quản lý chuỗi cung ứng của Trường Đại học Văn Lang được thiết kế nhằm phát triển kiến thức chuyên sâu, tư duy chiến lược và năng lực quản trị trong lĩnh vực Logistics và chuỗi cung ứng.",
        "Chương trình trang bị cho người học khả năng phân tích, hoạch định, tổ chức và tối ưu hóa các hoạt động Logistics và chuỗi cung ứng; đồng thời tiếp cận các xu hướng mới như chuyển đổi số, phân tích dữ liệu, ứng dụng công nghệ và phát triển bền vững.",
        "Với hai định hướng đào tạo: ứng dụng và nghiên cứu, chương trình tạo điều kiện để người học lựa chọn lộ trình phù hợp với mục tiêu phát triển nghề nghiệp, nâng cao năng lực quản trị hoặc tiếp tục nghiên cứu chuyên sâu.",
      ]
    : [
        details.intro,
        ...(details.highlights.length > 0
          ? [details.highlights.join(" ")]
          : ["Chương trình đào tạo chất lượng cao tại Viện Sau Đại học Văn Lang."]),
      ];

  /* ── 03. Highlights ──────────────────────────────────────── */
  const highlightsList: HighlightItem[] = isLogistics
    ? logisticsHighlights
    : details.highlights.map((h, i) => {
        const fallbackIcons = [GitFork, TrendingUp, Cpu, Users];
        return {
          Icon: fallbackIcons[i % fallbackIcons.length],
          title: `Đặc điểm nổi bật ${i + 1}`,
          text: h,
        };
      });

  /* ── 04. Audience ────────────────────────────────────────── */
  const audienceList: AudienceItem[] = isLogistics
    ? logisticsAudience
    : (details.outcomes && details.outcomes.length > 0
        ? details.outcomes.map((f: string, i: number) => ({
            image: [logisticsPhotos.warehouse, logisticsPhotos.port, logisticsPhotos.truck, logisticsPhotos.portTruck][i % 4],
            title: `Nhóm đối tượng ${i + 1}`,
            text: f,
          }))
        : logisticsAudience);

  /* ── 05. Careers ─────────────────────────────────────────── */
  const careersList: CareerRoleItem[] = isLogistics
    ? logisticsCareers
    : details.careers.map((c, i) => {
        const icons = [Network, Building2, Truck, TrendingUp, Warehouse, GraduationCap];
        return {
          Icon: icons[i % icons.length],
          title: c,
          sub: `Hướng đi và vai trò chuyên môn trong ngành ${programme.title}`,
        };
      });

  /* ── 06. Curriculum tracks & selected track data ─────────── */
  const availableTracks = curricula.length > 0 ? curricula : [];
  const currentTrack = availableTracks[activeTrackIndex] ?? availableTracks[0];

  const orientationName =
    activeTrackIndex === 1 ? "Định hướng nghiên cứu" : "Định hướng ứng dụng";

  const graduationProjectName =
    activeTrackIndex === 1 ? "Luận văn tốt nghiệp" : "Đề án tốt nghiệp";

  const curriculumIntroText = isLogistics
    ? activeTrackIndex === 1
      ? "Định hướng nghiên cứu tập trung vào phương pháp luận khoa học, năng lực phân tích sâu và kỹ năng nghiên cứu độc lập nhằm giải quyết các vấn đề học thuật và chiến lược chuỗi cung ứng."
      : "Định hướng ứng dụng trang bị kiến thức chuyên sâu và kỹ năng thực hành nhằm nâng cao năng lực quản trị, giải quyết các vấn đề thực tiễn trong lĩnh vực Logistics và chuỗi cung ứng."
    : `Chương trình ${orientationName} ngành ${programme.title} được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.`;

  /* ── 07. FAQs ────────────────────────────────────────────── */
  const faqsList: FaqQuestion[] = isLogistics
    ? logisticsFaqs
    : logisticsContent.faq.length > 0
    ? logisticsContent.faq
    : [
        {
          question: "Điều kiện tuyển sinh là gì?",
          answer:
            "Tuyển sinh theo hình thức xét tuyển hồ sơ tốt nghiệp đại học ngành đúng, phù hợp hoặc ngành gần và đáp ứng chuẩn tiếng Anh đầu vào theo quy định.",
        },
        {
          question: "Chương trình có học bổng không?",
          answer:
            "Trường Đại học Văn Lang có nhiều chính sách học bổng hấp dẫn từ 10% đến 30% dành cho cựu sinh viên, đối tượng chính sách và học viên xuất sắc.",
        },
        {
          question: "Lịch học được sắp xếp như thế nào?",
          answer:
            "Lịch học được sắp xếp ngoài giờ hành chính vào các buổi tối trong tuần hoặc cuối tuần nhằm tạo điều kiện thuận lợi cho học viên vừa học vừa làm.",
        },
      ];

  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <SiteHeader compact />

      {/* ────────────────────────────────────────────────────────
          HERO BANNER
          ──────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="programme-title">
        <Image
          className={styles.heroBackground}
          src={isLogistics ? logisticsPhotos.hero : (programme.bannerImage || logisticsPhotos.hero)}
          alt={`Ngành ${programme.title} - Đại học Văn Lang`}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroInner}>
          {/* Subtle slogan watermark on the right */}
          <div className={styles.heroSloganWatermark} aria-hidden="true">
            <span>CONNECT</span>
            <span>PEOPLE</span>
            <span>&amp; NEW OPPORTUNITIES</span>
            <span>FOR A BETTER</span>
            <span>{isLogistics ? "SUPPLY CHAIN" : "FUTURE"}</span>
          </div>

          <div className={styles.heroContent}>
            <span className={styles.heroDegree}>{programme.degree.toUpperCase()}</span>
            <h1 id="programme-title" className={styles.heroTitle}>
              {isLogistics ? (
                <>
                  Logistics và
                  <br />
                  Quản lý chuỗi cung ứng
                </>
              ) : (
                programme.title
              )}
            </h1>
            <p className={styles.heroLead}>
              {isLogistics
                ? "Kiến tạo năng lực quản trị chuỗi cung ứng hiện đại dưới góc nhìn toàn cầu, từ tri thức đến thực tiễn."
                : (details.intro || "Phát triển chuyên môn sâu và năng lực quản trị chiến lược tại Viện Sau Đại học Văn Lang.")}
            </p>

            <div className={styles.heroCtas}>
              <a className={styles.btnPrimary} href="#consultation">
                Đăng ký tư vấn <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link className={styles.btnSecondary} href="/admissions">
                Tìm hiểu tuyển sinh <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          QUICK INFO FACTS BAR
          ──────────────────────────────────────────────────────── */}
      <div className={styles.factsBarWrapper}>
        <div className={styles.factsBar}>
          {quickFacts.map(({ Icon, label, value }) => (
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
          <SectionHeader index="01" title="Tổng quan chương trình" />

          <div className={styles.overviewGrid}>
            <div className={styles.overviewCopy}>
              {overviewParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <a
                className={styles.btnDownloadOutline}
                href="#consultation"
                aria-label="Tải brochure chương trình đào tạo"
              >
                <Download size={17} aria-hidden="true" />
                <span>Tải brochure chương trình</span>
                <Download size={17} aria-hidden="true" />
              </a>
            </div>

            <div className={styles.overviewMedia}>
              <div className={styles.overviewImageWrap}>
                <Image
                  src={isLogistics ? logisticsPhotos.campus : "/images/pages/programmes/logistics/campus-building.jpg"}
                  alt="Trường Đại học Văn Lang cơ sở Đặng Thùy Trâm"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.overviewRibbon}>
                <h3 className={styles.ribbonTitle}>Hai định hướng đào tạo</h3>
                <div className={styles.ribbonItems}>
                  <div className={styles.ribbonItem}>
                    <span className={styles.ribbonBadge} aria-hidden="true">
                      <Target size={16} />
                    </span>
                    <span>Ứng dụng</span>
                  </div>
                  <div className={styles.ribbonItem}>
                    <span className={styles.ribbonBadge} aria-hidden="true">
                      <FlaskConical size={16} />
                    </span>
                    <span>Nghiên cứu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          02 / ĐIỂM NỔI BẬT CỦA CHƯƠNG TRÌNH
          ──────────────────────────────────────────────────────── */}
      <section id="diem-noi-bat" className={styles.sectionHighlights} aria-labelledby="sec-02-title">
        <div className={styles.container}>
          <SectionHeader index="02" title="Điểm nổi bật của chương trình" />

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
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          03 / CHƯƠNG TRÌNH PHÙ HỢP VỚI AI?
          ──────────────────────────────────────────────────────── */}
      <section id="doi-tuong" className={styles.sectionAudience} aria-labelledby="sec-03-title">
        <div className={styles.container}>
          <SectionHeader index="03" title="Chương trình phù hợp với ai?" />

          <div className={styles.audienceGrid}>
            {audienceList.map((item, idx) => (
              <article key={idx} className={styles.audienceCard}>
                <div className={styles.audienceImageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                  />
                </div>
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
          src={isLogistics ? logisticsPhotos.portTruck : logisticsPhotos.hero}
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
        />
        <div className={styles.container}>
          <SectionHeader index="04" title="Cơ hội nghề nghiệp và phát triển" />

          <div className={styles.careersLayout}>
            <div className={styles.careersGrid}>
              {careersList.map(({ Icon, title, sub }, idx) => (
                <div key={idx} className={styles.careerCard}>
                  <div className={styles.careerIconBox} aria-hidden="true"><Icon size={30} strokeWidth={1.8} /></div>
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
      <section id="chuong-trinh" className={styles.sectionCurriculum} aria-labelledby="sec-05-title">
        <div className={styles.container}>
          <SectionHeader index="05" title="Khung chương trình đào tạo" />

          {/* Orientation switcher tabs */}
          <div className={styles.curriculumTabs}>
            <button
              type="button"
              className={`${styles.curriculumTab} ${activeTrackIndex === 0 ? styles.curriculumTabActive : ""}`}
              onClick={() => setActiveTrackIndex(0)}
            >
              <Briefcase size={18} aria-hidden="true" />
              <span>Định hướng ứng dụng</span>
            </button>
            <button
              type="button"
              className={`${styles.curriculumTab} ${activeTrackIndex === 1 ? styles.curriculumTabActive : ""}`}
              onClick={() => setActiveTrackIndex(1)}
            >
              <BookOpen size={18} aria-hidden="true" />
              <span>Định hướng nghiên cứu</span>
            </button>
          </div>

          <div className={styles.curriculumLayout}>
            {/* Left: General Information card */}
            <aside className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>Thông tin chung</h3>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <FileText className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div>
                    <div className={styles.infoItemTitle}>Tổng số tín chỉ</div>
                    <div className={styles.infoItemValue}>
                      {isLogistics ? "Theo CTĐT (60 TC)" : `${programme.credits} tín chỉ`}
                    </div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Clock className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div>
                    <div className={styles.infoItemTitle}>Thời gian đào tạo</div>
                    <div className={styles.infoItemValue}>
                      {isLogistics ? "Theo CTĐT (24 tháng)" : programme.duration}
                    </div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Building2 className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div>
                    <div className={styles.infoItemTitle}>Hình thức học</div>
                    <div className={styles.infoItemValue}>Ngoài giờ hành chính</div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Award className={styles.infoIcon} size={20} aria-hidden="true" />
                  <div>
                    <div className={styles.infoItemTitle}>Hình thức tốt nghiệp</div>
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
                    const totalCredits = group.courses.reduce((sum, c) => sum + (c.credits || 0), 0);
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
                              style={{
                                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                                color: "#8b1d2c",
                              }}
                              aria-hidden="true"
                            />
                            <span>{group.title}</span>
                          </div>

                          <div className={styles.moduleCredits}>
                            <span className={styles.moduleToggleBtn}>
                              {isOpen ? "Thu gọn" : "Xem chi tiết →"}
                            </span>
                            {totalCredits > 0 && <span>{totalCredits} tín chỉ</span>}
                          </div>
                        </div>

                        {isOpen && (
                          <div className={styles.moduleBody}>
                            <ul className={styles.courseList}>
                              {group.courses.map((course, cIdx) => (
                                <li key={cIdx} className={styles.courseItem}>
                                  <div>
                                    <span className={styles.courseName}>{course.name}</span>
                                    {course.elective && (
                                      <span className={styles.courseElectiveTag}>Tự chọn</span>
                                    )}
                                  </div>
                                  {course.credits && (
                                    <span className={styles.courseCredit}>
                                      {course.credits} TC
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
                      <span>Nội dung chương trình đang được cập nhật</span>
                    </div>
                  </div>
                )}
              </div>

              <a
                className={styles.btnDownloadOutline}
                href="#consultation"
                style={{ marginTop: "14px" }}
              >
                <Download size={17} aria-hidden="true" />
                <span>Xem khung chương trình chi tiết (PDF)</span>
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
              Sẵn sàng cho bước tiến mới
              <br />
              trong sự nghiệp của bạn?
            </h2>
            <p>
              Đăng ký tư vấn để được cung cấp thông tin chi tiết về chương trình, điều kiện tuyển sinh
              và lộ trình học tập.
            </p>
          </div>
          <a className={styles.ctaButton} href="#consultation">
            <span>Đăng ký tư vấn ngay</span>
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
                  Câu hỏi thường gặp
                </h2>
                <a className={styles.faqViewAllLink} href="#consultation">
                  Xem tất cả →
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
              <h3 className={styles.contactCardTitle}>Liên hệ tư vấn</h3>

              <div className={styles.contactItemList}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <Phone size={18} />
                  </div>
                  <div className={styles.contactItemBody}>
                    <span className={styles.contactItemLabel}>Hotline tư vấn</span>
                    <span className={styles.contactItemValue}>
                      <a href="tel:02871059999">(028) 7105 9999 - Ext: XXXX</a>
                    </span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <Mail size={18} />
                  </div>
                  <div className={styles.contactItemBody}>
                    <span className={styles.contactItemLabel}>Email hỗ trợ</span>
                    <span className={styles.contactItemValue}>
                      <a href="mailto:saudaihoc@vlu.edu.vn">saudaihoc@vlu.edu.vn</a>
                    </span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <MapPin size={18} />
                  </div>
                  <div className={styles.contactItemBody}>
                    <span className={styles.contactItemLabel}>Địa chỉ làm việc</span>
                    <span className={styles.contactItemValue}>
                      Viện Sau đại học - Trường Đại học Văn Lang
                      <br />
                      69/68 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh, TP. HCM
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
      <div id="consultation">
        <ResourcesConsultation showResources={false} initialProgramme={programme.title} />
      </div>
      <SiteFooter />
    </main>
  );
}
