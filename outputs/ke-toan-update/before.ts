// ==================================================
// NGÀNH: KẾ TOÁN
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const keToanPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Kế toán cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kinh doanh & quản lý.",
    heroSlogan: "FUTURE",
    heroImage:
      "https://images.unsplash.com/photo-1564035105550-e1f02aa8556b?auto=format&fit=crop&w=2400&q=85",
  },

  // --------------------------------------------------
  // NỘI DUNG THÔNG TIN NHANH
  // --------------------------------------------------
  facts: {
    ...programmeSharedContent.facts,
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 01 - TỔNG QUAN CHƯƠNG TRÌNH
  // --------------------------------------------------
  section01: {
    sectionNumber: "01",
    overviewTitle: "Tổng quan chương trình",
    overview: [
      "Chương trình Thạc sĩ Kế toán cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kinh doanh & quản lý.",
      "Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại Kết nối nghiên cứu, doanh nghiệp và mạng lưới chuyên gia trong lĩnh vực",
    ],
    ...programmeSharedContent.overview,
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 02 - ĐIỂM NỔI BẬT
  // --------------------------------------------------
  section02: {
    sectionNumber: "02",
    highlights: [
      {
        title: "Học thuật gắn với thực tiễn",
        text: "Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn",
      },
      {
        title: "Đội ngũ giảng viên",
        text: "Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại",
      },
      {
        title: "Kết nối chuyên môn",
        text: "Kết nối nghiên cứu, doanh nghiệp và mạng lưới chuyên gia trong lĩnh vực",
      },
    ],
    ...programmeSharedContent.highlights,
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 03 - ĐỐI TƯỢNG
  // --------------------------------------------------
  section03: {
    sectionNumber: "03",
    audienceHeading: "Năng lực phát triển qua chương trình",
    audience: [
      {
        title: "Năng lực chuyên môn",
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Kế toán",
        image:
          "https://images.unsplash.com/photo-1764795850513-fa8a469a4600?auto=format&fit=crop&w=1200&q=85",
      },
      {
        title: "Nghiên cứu và ra quyết định",
        text: "Phát triển năng lực nghiên cứu, tư duy phản biện và ra quyết định",
        image:
          "https://images.unsplash.com/photo-1589793463357-5fb813435467?auto=format&fit=crop&w=1200&q=85",
      },
      {
        title: "Hợp tác và truyền đạt tri thức",
        text: "Làm việc độc lập, hợp tác liên ngành và truyền đạt tri thức chuyên môn",
        image:
          "https://images.unsplash.com/photo-1758876021840-0209f3bd38f4?auto=format&fit=crop&w=1200&q=85",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 04 - NGHỀ NGHIỆP
  // --------------------------------------------------
  section04: {
    sectionNumber: "04",
    careerHeading: "Cơ hội nghề nghiệp và phát triển",
    careers: [
      {
        title:
          "Đảm nhận các vị trí chuyên môn và quản lý tại doanh nghiệp, tổ chức trong và ngoài nước",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kế toán",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kế toán",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kế toán",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Kế toán được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Kế toán được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
    ],
    ...programmeSharedContent.curriculum,
  },

  // --------------------------------------------------
  // NỘI DUNG TƯ VẤN
  // --------------------------------------------------
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước tiến mới", "trong sự nghiệp của bạn?"],
    ctaBody:
      "Đăng ký tư vấn để được cung cấp thông tin chi tiết về chương trình, điều kiện tuyển sinh và lộ trình học tập.",
  },

  // --------------------------------------------------
  // NỘI DUNG FAQ VÀ LIÊN HỆ
  // --------------------------------------------------
  faq: {
    ...programmeSharedContent.faq,
    faqs: [
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
    ],
  },
};

export const keToanProgramme: Programme = {
  id: "ke-toan",
  code: "S-09",

  title: "Kế toán",
  englishTitle: "Master of Accounting",

  degree: "Thạc sĩ",

  field: "Kinh doanh & Quản lý",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const accountingGraduationCourses: CurriculumCourse[] = [
  { name: "Thực tập", englishName: "Internship", credits: 6 },
  { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 8 },
];

const accountingSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Báo cáo tài chính hợp nhất nâng cao",
    englishName: "Advanced Consolidated Financial Reporting",
    credits: 3,
  },
  {
    name: "Kế toán quản trị nâng cao",
    englishName: "Advanced Management Accounting",
    credits: 3,
  },
  {
    name: "Hệ thống thông tin quản lý trong kế toán nâng cao",
    englishName: "Advanced Management Information Systems in Accounting",
    credits: 3,
  },
  {
    name: "Kiểm toán và các dịch vụ đảm bảo nâng cao",
    englishName: "Advanced Auditing and Assurance Services",
    credits: 3,
  },
  {
    name: "Báo cáo ESG và tạo lập giá trị tổ chức",
    englishName: "ESG Reporting and Organizational Value Creation",
    credits: 3,
  },
  {
    name: "Kế toán công nâng cao",
    englishName: "Advanced Public Sector Accounting",
    credits: 3,
    elective: true,
  },
  {
    name: "Kế toán phát triển bền vững",
    englishName: "Sustainability Accounting",
    credits: 3,
    elective: true,
  },
  {
    name: "Kế toán điều tra số",
    englishName: "Digital Forensic Accounting",
    credits: 3,
    elective: true,
  },
  {
    name: "Kế toán quốc tế nâng cao",
    englishName: "Advanced International Accounting",
    credits: 3,
    elective: true,
  },
  {
    name: "Phân tích chính sách thuế",
    englishName: "Business Tax Policy Analysis",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản lý rủi ro tuân thủ thuế nâng cao",
    englishName: "Advanced Tax Compliance Risk Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro thuế trong môi trường số",
    englishName: "Tax Risk Management in the Digital Environment",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm soát nội bộ nâng cao",
    englishName: "Advanced Internal Controls",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm soát quản lý",
    englishName: "Management Control",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm toán hoạt động",
    englishName: "Operational Auditing",
    credits: 3,
    elective: true,
  },
  {
    name: "Sáp nhập, mua lại và tái cấu trúc doanh nghiệp",
    englishName: "Mergers, Acquisitions, and Corporate Restructuring",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị chiến lược",
    englishName: "Strategic Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro doanh nghiệp",
    englishName: "Enterprise Risk Management",
    credits: 3,
    elective: true,
  },
];

const accountingFoundationCourses: CurriculumCourse[] = [
  { name: "Lý thuyết kế toán", englishName: "Accounting Theory", credits: 3 },
  {
    name: "Quản trị tài chính doanh nghiệp",
    englishName: "Corporate Financial Management",
    credits: 3,
  },
  {
    name: "Trí tuệ nhân tạo và dữ liệu lớn trong kinh doanh",
    englishName: "Artificial Intelligence and Big Data in Business",
    credits: 3,
    elective: true,
  },
  {
    name: "Công nghệ Blockchain và ứng dụng",
    englishName: "Blockchain Technology and Applications",
    credits: 3,
    elective: true,
  },
  {
    name: "An toàn thông tin kế toán nâng cao",
    englishName: "Advanced Accounting Information Security",
    credits: 3,
    elective: true,
  },
  {
    name: "Đạo đức nghề nghiệp kế toán, kiểm toán trong môi trường số",
    englishName: "Professional Ethics in Accounting and Auditing in the Digital Environment",
    credits: 3,
    elective: true,
  },
];

const accountingGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getKeToanCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: accountingGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: accountingFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: accountingSpecialisedCourses,
        },
        {
          title: "Chuyên đề, Thực tập & Đề án tốt nghiệp",
          englishTitle: "Capstone, Internship & Graduation Project",
          courses: accountingGraduationCourses,
        },
      ],
    },
  ];
}
