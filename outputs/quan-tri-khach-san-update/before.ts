// ==================================================
// NGÀNH: QUẢN TRỊ KHÁCH SẠN
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const quanTriKhachSanPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Quản trị Khách sạn cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực du lịch & khách sạn.",
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
      "Chương trình Thạc sĩ Quản trị Khách sạn cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực du lịch & khách sạn.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Quản trị Khách sạn",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản trị Khách sạn",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản trị Khách sạn",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản trị Khách sạn",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Quản trị Khách sạn được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Quản trị Khách sạn được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const quanTriKhachSanProgramme: Programme = {
  id: "quan-tri-khach-san",
  code: "S-12",

  title: "Quản trị Khách sạn",
  englishTitle: "Master of Hospitality Management",

  degree: "Thạc sĩ",

  field: "Du lịch & Khách sạn",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const hospitalityResearchGraduationCourses: CurriculumCourse[] = [
  {
    name: "Nghiên cứu marketing trong du lịch - khách sạn",
    englishName: "Marketing Research in Tourism and Hospitality",
    credits: 4,
  },
  {
    name: "Phương pháp viết và xuất bản nghiên cứu khoa học",
    englishName: "Research Writing and Publication",
    credits: 3,
  },
  {
    name: "Chuyên đề về ứng dụng công nghệ số trong du lịch - khách sạn",
    englishName: "Seminar in Digital Technology in Tourism and Hospitality",
    credits: 3,
  },
  {
    name: "Chuyên đề về dự án phát triển khách sạn",
    englishName: "Seminar in Hospitality Development Project",
    credits: 4,
  },
  {
    name: "Luận văn tốt nghiệp",
    englishName: "Graduation Research Thesis",
    credits: 15,
  },
];

const hospitalityResearchSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị vận hành khách sạn",
    englishName: "Hospitality Operations Management",
    credits: 3,
  },
  {
    name: "Quản trị tài chính trong doanh nghiệp du lịch - khách sạn",
    englishName: "Financial Management in Tourism and Hospitality Enterprises",
    credits: 4,
  },
  {
    name: "Quản trị chiến lược nâng cao trong khách sạn",
    englishName: "Advanced Strategic Management in Hospitality",
    credits: 3,
  },
  {
    name: "Quản trị doanh thu khách sạn",
    englishName: "Hospitality Revenue Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro và xử lý khủng hoảng trong du lịch",
    englishName: "Risk and Crisis Management in Tourism",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị dịch vụ cao cấp",
    englishName: "Luxury Service Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Lãnh đạo hiệu quả trong môi trường đa văn hóa",
    englishName: "Effective Leadership in a Multicultural Environment",
    credits: 3,
    elective: true,
  },
];

const tourismAppliedGraduationCourses: CurriculumCourse[] = [
  { name: "Thực tập", englishName: "Internship", credits: 6 },
  { name: "Đề án tốt nghiệp", englishName: "Applied Graduation Project", credits: 8 },
];

const hospitalityAppliedSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị vận hành khách sạn",
    englishName: "Hospitality Operations Management",
    credits: 3,
  },
  {
    name: "Quản trị tài chính trong doanh nghiệp du lịch - khách sạn",
    englishName: "Financial Management in Tourism and Hospitality Enterprises",
    credits: 4,
  },
  {
    name: "Ứng dụng công nghệ số trong du lịch - khách sạn",
    englishName: "Digital Technology in Tourism and Hospitality",
    credits: 3,
  },
  {
    name: "Quản trị chiến lược nâng cao trong khách sạn",
    englishName: "Advanced Strategic Management in Hospitality",
    credits: 3,
  },
  {
    name: "Dự án phát triển khách sạn",
    englishName: "Hospitality Development Project",
    credits: 4,
  },
  {
    name: "Quản trị doanh thu khách sạn",
    englishName: "Hospitality Revenue Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị rủi ro và xử lý khủng hoảng trong du lịch",
    englishName: "Risk and Crisis Management in Tourism",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị dịch vụ cao cấp",
    englishName: "Luxury Service Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Lãnh đạo hiệu quả trong môi trường đa văn hóa",
    englishName: "Effective Leadership in a Multicultural Environment",
    credits: 3,
    elective: true,
  },
];

const tourismFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp nghiên cứu trong du lịch",
    englishName: "Research Methods in Tourism",
    credits: 4,
  },
  {
    name: "Marketing nâng cao trong du lịch - khách sạn",
    englishName: "Advanced Marketing in Tourism and Hospitality",
    credits: 4,
  },
  {
    name: "Quản trị bền vững và ESG trong du lịch - khách sạn",
    englishName: "Sustainable and ESG Management in Tourism & Hospitality",
    credits: 3,
  },
  {
    name: "Quản trị nhân lực quốc tế trong du lịch",
    englishName: "International Human Resource Management in Tourism",
    credits: 4,
  },
  {
    name: "Kinh tế du lịch",
    englishName: "Tourism Economics",
    credits: 4,
  },
];

const tourismGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getQuanTriKhachSanCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: tourismGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: tourismFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: hospitalityAppliedSpecialisedCourses,
        },
        {
          title: "Kiến thức ứng dụng",
          englishTitle: "Applied knowledge",
          courses: tourismAppliedGraduationCourses,
        },
      ],
    },
    {
      number: "06",
      title: "Chương trình đào tạo nghiên cứu",
      subtitle: "Research curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: tourismGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: tourismFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: hospitalityResearchSpecialisedCourses,
        },
        {
          title: "Kiến thức nghiên cứu",
          englishTitle: "Research knowledge",
          courses: hospitalityResearchGraduationCourses,
        },
      ],
    },
  ];
}
