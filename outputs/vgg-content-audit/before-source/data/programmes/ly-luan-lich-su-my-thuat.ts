// ==================================================
// NGÀNH: LÝ LUẬN VÀ LỊCH SỬ MỸ THUẬT ỨNG DỤNG
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const lyLuanLichSuMyThuatPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Lý luận và Lịch sử Mỹ thuật Ứng dụng cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực thiết kế & mỹ thuật ứng dụng.",
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
      "Chương trình Thạc sĩ Lý luận và Lịch sử Mỹ thuật Ứng dụng cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực thiết kế & mỹ thuật ứng dụng.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Lý luận và Lịch sử Mỹ thuật Ứng dụng",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Lý luận và Lịch sử Mỹ thuật Ứng dụng",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Lý luận và Lịch sử Mỹ thuật Ứng dụng",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Lý luận và Lịch sử Mỹ thuật Ứng dụng",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Lý luận và Lịch sử Mỹ thuật Ứng dụng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Lý luận và Lịch sử Mỹ thuật Ứng dụng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const lyLuanLichSuMyThuatProgramme: Programme = {
  id: "ly-luan-lich-su-my-thuat",
  code: "S-18",

  title: "Lý luận và Lịch sử Mỹ thuật Ứng dụng",

  englishTitle: "Master of Theory and History of Applied Arts",

  degree: "Thạc sĩ",

  field: "Thiết kế & Mỹ thuật Ứng dụng",

  orientation: "Nghiên cứu",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "100.000.000 VNĐ",
};

const artTheoryGraduationCourses: CurriculumCourse[] = [
  { name: "Luận văn tốt nghiệp", englishName: "Thesis", credits: 15 },
];

const artTheorySpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Lịch sử và Thẩm mỹ Công nghiệp",
    englishName: "Industrial Aesthetic History",
    credits: 3,
  },
  { name: "Cơ sở lý luận đề tài", englishName: "Premis of Thesis", credits: 3 },
  {
    name: "Lý luận Mỹ thuật ứng dụng Việt Nam",
    englishName: "Theory of Applied Art in Vietnam",
    credits: 2,
  },
  { name: "Nghiên cứu chuyên đề", englishName: "Thematic Research", credits: 3 },
  {
    name: "Mỹ thuật ứng dụng Đông Nam Á",
    englishName: "Applied Arts in Southeast Asian",
    credits: 3,
    elective: true,
  },
  {
    name: "Mỹ thuật và môi trường",
    englishName: "Art and Environment",
    credits: 3,
    elective: true,
  },
  {
    name: "Phương pháp luận design",
    englishName: "Design Methodology",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề phát triển sản phẩm",
    englishName: "Product development Theme",
    credits: 3,
    elective: true,
  },
  {
    name: "Workshop - Thiết kế bền vững",
    englishName: "Workshop - sustainable design",
    credits: 3,
    elective: true,
  },
  {
    name: "Dự án thiết kế trải nghiệm người dùng",
    englishName: "User Experience",
    credits: 3,
    elective: true,
  },
];

const artTheoryFoundationCourses: CurriculumCourse[] = [
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
  { name: "Phương pháp luận sáng tạo", englishName: "Creativity Methodology", credits: 2 },
  {
    name: "Phương pháp nghiên cứu lịch sử Mỹ thuật",
    englishName: "Research Methodology of Fine Arts",
    credits: 3,
  },
  { name: "Lịch sử Design", englishName: "Design History", credits: 3 },
  { name: "Tư duy thiết kế", englishName: "Design Thinking", credits: 3 },
  { name: "Mỹ thuật học", englishName: "Art Studies", credits: 3, elective: true },
  {
    name: "Lý luận và phê bình Mỹ thuật ứng dụng",
    englishName: "Art theory and criticism",
    credits: 3,
    elective: true,
  },
  {
    name: "Văn hóa dân tộc học nghệ thuật",
    englishName: "Ethnographic culture",
    credits: 3,
    elective: true,
  },
  {
    name: "Đồ án thiết kế cộng đồng",
    englishName: "Social design project",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề công nghệ",
    englishName: "Thematic of technology",
    credits: 3,
    elective: true,
  },
  {
    name: "Lý luận dạy học đại học",
    englishName: "Theory of university teaching",
    credits: 3,
    elective: true,
  },
  {
    name: "Lý thuyết văn hoá thị giác",
    englishName: "Theory of visual culture",
    credits: 2,
    elective: true,
  },
  {
    name: "Nghiên cứu lịch sử Mỹ thuật thế giới",
    englishName: "The world art history",
    credits: 3,
    elective: true,
  },
];

const artTheoryGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 3 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getLyLuanLichSuMyThuatCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo nghiên cứu",
      subtitle: "Research curriculum",
      groups: [
        {
          title: "Kiến thức chung của ngành",
          englishTitle: "General knowledge",
          courses: artTheoryGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở ngành",
          englishTitle: "Major Foundation Knowledge",
          courses: artTheoryFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialized Knowledge",
          courses: artTheorySpecialisedCourses,
        },
        {
          title: "Luận văn tốt nghiệp",
          englishTitle: "Thesis",
          courses: artTheoryGraduationCourses,
        },
      ],
    },
  ];
}
