import { withProgrammeImages } from "./programmes/images";
import type { programmeSharedContent } from "./programmes/shared-content";
import type { CurriculumGroup } from "./curricula";
import {
  congNgheThongTinProgramme,
  congNgheThongTinPageContent,
} from "./programmes/cong-nghe-thong-tin";
import { marketingProgramme, marketingPageContent } from "./programmes/marketing";
import {
  khoaHocMoiTruongProgramme,
  khoaHocMoiTruongPageContent,
} from "./programmes/khoa-hoc-moi-truong";
import {
  kyThuatMoiTruongProgramme,
  kyThuatMoiTruongPageContent,
} from "./programmes/ky-thuat-moi-truong";
import {
  quanLyTaiNguyenMoiTruongProgramme,
  quanLyTaiNguyenMoiTruongPageContent,
} from "./programmes/quan-ly-tai-nguyen-moi-truong";
import {
  congNgheSinhHocProgramme,
  congNgheSinhHocPageContent,
} from "./programmes/cong-nghe-sinh-hoc";
import { kyThuatXayDungProgramme, kyThuatXayDungPageContent } from "./programmes/ky-thuat-xay-dung";
import { kyThuatOToProgramme, kyThuatOToPageContent } from "./programmes/ky-thuat-o-to";
import {
  quanTriKinhDoanhProgramme,
  quanTriKinhDoanhPageContent,
} from "./programmes/quan-tri-kinh-doanh";
import {
  kinhDoanhThuongMaiProgramme,
  kinhDoanhThuongMaiPageContent,
} from "./programmes/kinh-doanh-thuong-mai";
import {
  taiChinhNganHangProgramme,
  taiChinhNganHangPageContent,
} from "./programmes/tai-chinh-ngan-hang";
import { keToanProgramme, keToanPageContent } from "./programmes/ke-toan";
import { logisticsProgramme, logisticsPageContent } from "./programmes/logistics";
import { quanTriDuLichProgramme, quanTriDuLichPageContent } from "./programmes/quan-tri-du-lich";
import {
  quanTriKhachSanProgramme,
  quanTriKhachSanPageContent,
} from "./programmes/quan-tri-khach-san";
import { luatKinhTeProgramme, luatKinhTePageContent } from "./programmes/luat-kinh-te";
import {
  quanHeCongChungProgramme,
  quanHeCongChungPageContent,
} from "./programmes/quan-he-cong-chung";
import { ngonNguAnhProgramme, ngonNguAnhPageContent } from "./programmes/ngon-ngu-anh";
import { kienTrucProgramme, kienTrucPageContent } from "./programmes/kien-truc";
import { myThuatUngDungProgramme, myThuatUngDungPageContent } from "./programmes/my-thuat-ung-dung";
import {
  lyLuanLichSuMyThuatProgramme,
  lyLuanLichSuMyThuatPageContent,
} from "./programmes/ly-luan-lich-su-my-thuat";

// data/programmes.ts

/* =========================================================
   PROGRAMME TYPES
   ========================================================= */

export const programmeDegrees = ["Thạc sĩ", "Tiến sĩ"] as const;

export type ProgrammeDegree = (typeof programmeDegrees)[number];

export const programmeFields = [
  "Kinh doanh & Quản lý",
  "Kỹ thuật, Môi trường & Công nghệ",
  "Du lịch & Khách sạn",
  "Luật, Nhân văn & Truyền thông",
  "Thiết kế & Mỹ thuật Ứng dụng",
] as const;

export type ProgrammeField = (typeof programmeFields)[number];

export const programmeOrientations = ["Ứng dụng", "Nghiên cứu"] as const;

export type ProgrammeOrientation = (typeof programmeOrientations)[number];

export type ProgrammeInformationBlock = {
  title: string;
  paragraphs?: readonly string[];
  points?: readonly string[];
  groups?: readonly ProgrammeInformationBlock[];
};

export type ProgrammeFeeContent = {
  heading: string;
  intro: readonly string[];
  intake: string;
  language: string;
  total: string;
  installments: readonly { label: string; amount: string }[];
  variants?: readonly {
    language: string;
    total: string;
    installments: readonly { label: string; amount: string }[];
  }[];
  additionalFees: readonly { title: string; amount: string; note: string }[];
  notes: readonly string[];
};

export type ProgrammeConsultationIntro = {
  eyebrow: string;
  titleLines: readonly string[];
  body: string;
  benefits: readonly string[];
  formTitle?: string;
};

export type ProgrammePageContent = {
  hero: {
    heroLead: string;
    heroTitle?: string;
    heroSlogan?: string;
    heroImage?: string;
    imageAlt?: string;
    imageCredit?: { text: string; href?: string };
  } & typeof programmeSharedContent.hero;
  facts: {
    quickFactsDetailed?: readonly {
      label: string;
      value: string;
      detail?: string;
    }[];
    displayCode?: string;
    displayDuration?: string;
    displayTuition?: string;
  } & typeof programmeSharedContent.facts;
  section01: {
    sectionNumber: "01";
    /** null ẩn ảnh; undefined giữ ảnh mặc định hiện có. */
    overviewImage?: string | null;
    overviewTitle: string;
    overview: readonly string[];
    headline?: string;
    focusAreas?: readonly string[];
    imageCredit?: { text: string; href?: string };
    link?: typeof programmeSharedContent.overview.link;
  } & Omit<typeof programmeSharedContent.overview, "link">;
  section02: {
    sectionNumber: "02";
    highlights: readonly { title: string; text: string }[];
    learningOutcomes?: {
      intro: string;
      items: readonly { code: string; title: string; text: string }[];
    };
  } & typeof programmeSharedContent.highlights;
  section03: {
    sectionNumber: "03";
    audienceHeading: string;
    headline?: string;
    intro?: readonly string[];
    requirements?: readonly ProgrammeInformationBlock[];
    illustration?: { src: string; alt: string; source: string };
    audience: readonly {
      title: string;
      text: string;
      image?: string;
      alt?: string;
      imageSource?: string;
    }[];
  };
  section04: {
    sectionNumber: "04";
    careerImage?: string;
    careerHeading: string;
    headline?: string;
    intro?: string;
    note?: string;
    careers: readonly { title: string; sub: string; group?: string }[];
  };
  section05: {
    sectionNumber: "05";
    curriculumIntro: readonly string[];
    trackCredits?: readonly string[];
    trackDurations?: readonly string[];
    generalFacts?: readonly { label: string; value: string }[];
    notes?: readonly string[];
    semesters?: {
      heading: string;
      intro: string;
      items: readonly { title: string; subtitle: string; groups: CurriculumGroup[] }[];
    };
    completion?: { heading: string; items: readonly string[] };
  } & typeof programmeSharedContent.curriculum;
  consultation: {
    ctaHeading: readonly string[];
    ctaBody: string;
    formIntro?: ProgrammeConsultationIntro;
    contactActions?: readonly { text: string; href: string }[];
  } & typeof programmeSharedContent.consultation;
  faq: {
    faqs: readonly { question: string; answer: string; hidden?: "true" | "false" }[];
  } & typeof programmeSharedContent.faq;
  fees?: ProgrammeFeeContent;
};

/* =========================================================
   PROGRAMME MODEL
   ========================================================= */

export type Programme = {
  id: string;
  code: string;

  title: string;
  englishTitle: string;
  /** Ảnh nền banner ngành, dùng đường dẫn trong public hoặc URL đã được cấu hình. */
  bannerImage?: string;
  bannerPosition?: string;

  degree: ProgrammeDegree;
  field: ProgrammeField;
  orientation: ProgrammeOrientation | "Đang cập nhật" | "Ứng dụng và nghiên cứu";
  orientations?: readonly ProgrammeOrientation[];

  credits: number;
  creditsLabel?: string;
  summary?: string;
  detailsPending?: boolean;
  /** Ngành CMS mới chưa có khung chương trình đã được phê duyệt. */
  curriculaPending?: boolean;
  cmsCurriculum?: { name: string; credits: string; group: string; track: "Ứng dụng" | "Nghiên cứu"; note: string }[];
  cmsApplication?: { title: string; text: string }[];
  cmsOverview?: { html: string }[];
  cmsSupport?: { title: string; text: string }[];
  duration: string;
  tuition: string;
  schedule?: string;
  graduationRequirements?: readonly string[];
  pageContent?: ProgrammePageContent;

  studyMode: string;
  intake: string;
};

/** Điều kiện chung và yêu cầu công bố khoa học riêng theo đúng ngành. */
export function getProgrammeGraduationRequirements(programme: Programme): string[] {
  if (programme.pageContent?.section05.completion) {
    return [...programme.pageContent.section05.completion.items];
  }
  return [
    "Hoàn thành chương trình đào tạo theo quy định.",
    "Đạt chuẩn đầu ra về năng lực tiếng Anh theo quy định của Trường Đại học Văn Lang.",
    ...(programme.graduationRequirements ?? []),
  ];
}

/** Học phí toàn khóa theo danh mục tuyển sinh do Viện Sau Đại học công bố. */
export function getProgrammeTuition(programme: Programme) {
  return programme.tuition;
}

/* =========================================================
   PROGRAMME DATA
   ========================================================= */

export const programmes: Programme[] = [
  { ...congNgheThongTinProgramme, pageContent: congNgheThongTinPageContent },
  { ...marketingProgramme, pageContent: marketingPageContent },
  { ...khoaHocMoiTruongProgramme, pageContent: khoaHocMoiTruongPageContent },
  { ...kyThuatMoiTruongProgramme, pageContent: kyThuatMoiTruongPageContent },
  { ...quanLyTaiNguyenMoiTruongProgramme, pageContent: quanLyTaiNguyenMoiTruongPageContent },
  { ...congNgheSinhHocProgramme, pageContent: congNgheSinhHocPageContent },
  { ...kyThuatXayDungProgramme, pageContent: kyThuatXayDungPageContent },
  { ...kyThuatOToProgramme, pageContent: kyThuatOToPageContent },
  { ...quanTriKinhDoanhProgramme, pageContent: quanTriKinhDoanhPageContent },
  { ...kinhDoanhThuongMaiProgramme, pageContent: kinhDoanhThuongMaiPageContent },
  { ...taiChinhNganHangProgramme, pageContent: taiChinhNganHangPageContent },
  { ...keToanProgramme, pageContent: keToanPageContent },
  { ...logisticsProgramme, pageContent: logisticsPageContent },
  { ...quanTriDuLichProgramme, pageContent: quanTriDuLichPageContent },
  { ...quanTriKhachSanProgramme, pageContent: quanTriKhachSanPageContent },
  { ...luatKinhTeProgramme, pageContent: luatKinhTePageContent },
  { ...quanHeCongChungProgramme, pageContent: quanHeCongChungPageContent },
  { ...ngonNguAnhProgramme, pageContent: ngonNguAnhPageContent },
  { ...kienTrucProgramme, pageContent: kienTrucPageContent },
  { ...myThuatUngDungProgramme, pageContent: myThuatUngDungPageContent },
  { ...lyLuanLichSuMyThuatProgramme, pageContent: lyLuanLichSuMyThuatPageContent },
].map(withProgrammeImages);
