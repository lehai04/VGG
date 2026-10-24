// ==================================================
// NGÀNH: LUẬT KINH TẾ
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const luatKinhTePageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Luật Kinh tế cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực luật, nhân văn & truyền thông.",
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
      "Chương trình Thạc sĩ Luật Kinh tế cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực luật, nhân văn & truyền thông.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Luật Kinh tế",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Luật Kinh tế",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Luật Kinh tế",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Luật Kinh tế",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Luật Kinh tế được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Luật Kinh tế được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const luatKinhTeProgramme: Programme = {
  id: "luat-kinh-te",
  code: "S-13",

  title: "Luật Kinh tế",
  englishTitle: "Master of Economic Law",

  degree: "Thạc sĩ",

  field: "Luật, Nhân văn & Truyền thông",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 – 110.000.000 VNĐ",
};

const economicLawGraduationCourses: CurriculumCourse[] = [
  { name: "Thực tập", englishName: "Internship", credits: 8 },
  { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 },
];

const economicLawSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Áp dụng pháp luật doanh nghiệp trong hoạt động của doanh nghiệp",
    englishName: "The application of law on enterprises in business activities",
    credits: 3,
  },
  {
    name: "Pháp luật về đầu tư trong thời kỳ hội nhập",
    englishName: "Investment Law in the integration facilitation",
    credits: 3,
  },
  {
    name: "Pháp luật về thương mại trong điều kiện hội nhập",
    englishName: "Commercial Law in the integration facilitation",
    credits: 3,
  },
  {
    name: "Pháp luật về xác lập quyền sử dụng đất của chủ thể kinh doanh",
    englishName: "Law on the assertion of land use rights of business entitites",
    credits: 3,
  },
  {
    name: "Pháp luật về cạnh tranh trong nền kinh tế thị trường",
    englishName: "Competition law in the market economy",
    credits: 3,
  },
  {
    name: "Chuyên đề thực hành 1: Kỹ năng nhận diện và giải quyết tranh chấp hợp đồng mua bán hàng hóa quốc tế",
    englishName:
      "Internship and Practical module 1: Skills of identification and dispute resolution of contracts for the international sale of goods",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề thực hành 2: Trọng tài giả định",
    englishName: "Internship and Practical module 2: Moot Court",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề thực hành 3: Kỹ năng soạn thảo, đàm phán, ký kết hợp đồng thương mại",
    englishName:
      "Internship and Practical module 3: Skills of drafting, negotiating and signing commercial contracts",
    credits: 3,
    elective: true,
  },
  {
    name: "Áp dụng pháp luật lao động trong doanh nghiệp",
    englishName: "The application of labor law in enterprises",
    credits: 3,
    elective: true,
  },
  {
    name: "Tội phạm kinh tế",
    englishName: "Economic Crime",
    credits: 3,
    elective: true,
  },
  {
    name: "Một số vấn đề pháp lý về thị trường bất động sản",
    englishName: "Some legal issues on the real estate market",
    credits: 3,
    elective: true,
  },
  {
    name: "Xử phạt vi phạm hành chính trong lĩnh vực kinh tế",
    englishName: "Administrative Sanctions in the Economic Sector",
    credits: 3,
    elective: true,
  },
  {
    name: "Pháp luật về nghĩa vụ thuế của chủ thể kinh doanh",
    englishName: "Law on tax duty of business entities",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm soát rủi ro pháp lý trong doanh nghiệp",
    englishName: "Legal risk control in enterprises",
    credits: 3,
    elective: true,
  },
];

const economicLawGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
  { name: "Tư duy pháp lý", englishName: "Legal Reasoning", credits: 3 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getLuatKinhTeCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: economicLawGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở ngành và chuyên ngành",
          englishTitle: "Major Foundation Knowledge & Specialized Knowledge",
          courses: economicLawSpecialisedCourses,
        },
        {
          title: "Kiến thức ứng dụng/Nghiên cứu khoa học",
          englishTitle: "Applied and Research Knowledge",
          courses: economicLawGraduationCourses,
        },
      ],
    },
  ];
}
