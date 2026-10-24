// ==================================================
// NGÀNH: KINH DOANH THƯƠNG MẠI
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const kinhDoanhThuongMaiPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Kinh doanh Thương mại cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kinh doanh & quản lý.",
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
      "Chương trình Thạc sĩ Kinh doanh Thương mại cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kinh doanh & quản lý.",
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
        title: "Đặc điểm nổi bật 1",
        text: "Chương trình cập nhật, kết hợp nền tảng học thuật với các vấn đề thực tiễn",
      },
      {
        title: "Đặc điểm nổi bật 2",
        text: "Đội ngũ giảng viên giàu kinh nghiệm cùng môi trường học tập hiện đại",
      },
      {
        title: "Đặc điểm nổi bật 3",
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
    audienceHeading: "Chương trình phù hợp với ai?",
    audience: [
      {
        title: "Nhóm đối tượng 1",
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Kinh doanh Thương mại",
        image:
          "https://images.unsplash.com/photo-1764795850513-fa8a469a4600?auto=format&fit=crop&w=1200&q=85",
      },
      {
        title: "Nhóm đối tượng 2",
        text: "Phát triển năng lực nghiên cứu, tư duy phản biện và ra quyết định",
        image:
          "https://images.unsplash.com/photo-1589793463357-5fb813435467?auto=format&fit=crop&w=1200&q=85",
      },
      {
        title: "Nhóm đối tượng 3",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kinh doanh Thương mại",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kinh doanh Thương mại",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kinh doanh Thương mại",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Kinh doanh Thương mại được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Kinh doanh Thương mại được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const kinhDoanhThuongMaiProgramme: Programme = {
  id: "kinh-doanh-thuong-mai",
  code: "S-07",

  title: "Kinh doanh Thương mại",
  englishTitle: "Master of Commercial Business",

  degree: "Thạc sĩ",

  field: "Kinh doanh & Quản lý",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const commercialBusinessGraduationCourses: CurriculumCourse[] = [
  {
    name: "Thực tập tốt nghiệp",
    englishName: "Graduation Internship",
    credits: 6,
  },
  {
    name: "Đề án tốt nghiệp",
    englishName: "Graduation Project",
    credits: 9,
  },
];

const commercialBusinessSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị kinh doanh số",
    englishName: "Digital Business Management",
    credits: 4,
  },
  {
    name: "Lãnh đạo số và Quản trị sự thay đổi",
    englishName: "Digital Leadership and Change Management",
    credits: 4,
  },
  {
    name: "Thiết kế Marketing số và Tối ưu hiệu suất",
    englishName: "Digital Marketing Design and Performance Optimization",
    credits: 4,
  },
  {
    name: "Nghiên cứu kinh doanh",
    englishName: "Business Research",
    credits: 4,
  },
  {
    name: "Các vấn đề đương đại trong thương mại và kinh doanh",
    englishName: "Contemporary Issues in Business Commerce",
    credits: 4,
  },
  {
    name: "Dự án kinh doanh (kết hợp field trip)",
    englishName: "Business Project (with Field Trip)",
    credits: 2,
  },
  {
    name: "ESG và Kinh doanh số bền vững",
    englishName: "ESG and Sustainable Digital Business",
    credits: 4,
    elective: true,
  },
  {
    name: "Dữ liệu lớn và Trí tuệ nhân tạo trong kinh doanh số",
    englishName: "Big Data and AI in Digital Business",
    credits: 4,
    elective: true,
  },
  {
    name: "Vận hành kênh Omni và Thương mại tích hợp",
    englishName: "Omnichannel Operations and Integrated Commerce",
    credits: 4,
    elective: true,
  },
  {
    name: "Quản trị rủi ro trong vận hành số",
    englishName: "Risk Management in Digital Operations",
    credits: 4,
    elective: true,
  },
  {
    name: "Quản trị sản phẩm và đổi mới sáng tạo",
    englishName: "Digital Product and Innovation Management",
    credits: 4,
    elective: true,
  },
  {
    name: "Phân tích dữ liệu ứng dụng trong kinh doanh số",
    englishName: "Applied Digital Business Analytics",
    credits: 4,
    elective: true,
  },
];

const commercialBusinessFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp nghiên cứu khoa học ứng dụng",
    englishName: "Applied Scientific Research Methods",
    credits: 3,
  },
  {
    name: "Kinh doanh kỹ thuật số",
    englishName: "Digital Business",
    credits: 4,
  },
  {
    name: "Thấu hiểu khách hàng và hành vi tiêu dùng kỹ thuật số",
    englishName: "Customer Insight and Digital Consumer Behavior",
    credits: 4,
  },
];

const commercialBusinessGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 3 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getKinhDoanhThuongMaiCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: commercialBusinessGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: commercialBusinessFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: commercialBusinessSpecialisedCourses,
        },
        {
          title: "Tốt nghiệp",
          englishTitle: "Graduation Project",
          courses: commercialBusinessGraduationCourses,
        },
      ],
    },
  ];
}
