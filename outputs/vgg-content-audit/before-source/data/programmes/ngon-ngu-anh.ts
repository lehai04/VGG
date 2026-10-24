// ==================================================
// NGÀNH: NGÔN NGỮ ANH
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const ngonNguAnhPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Ngôn ngữ Anh cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực luật, nhân văn & truyền thông.",
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
      "Chương trình Thạc sĩ Ngôn ngữ Anh cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực luật, nhân văn & truyền thông.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Ngôn ngữ Anh",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Ngôn ngữ Anh",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Ngôn ngữ Anh",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Ngôn ngữ Anh",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Ngôn ngữ Anh được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Ngôn ngữ Anh được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const ngonNguAnhProgramme: Programme = {
  id: "ngon-ngu-anh",
  code: "S-15",

  title: "Ngôn ngữ Anh",
  englishTitle: "Master of English Language",

  degree: "Thạc sĩ",

  field: "Luật, Nhân văn & Truyền thông",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 – 110.000.000 VNĐ",
};

const englishResearchSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp Giảng dạy Ngôn ngữ nâng cao",
    englishName: "Seminar on Advanced Methods of Teaching Language",
    credits: 3,
  },
  {
    name: "Chuyên đề về Phân tích diễn ngôn",
    englishName: "Seminar on Discourse Analysis",
    credits: 3,
  },
  { name: "Ngôn ngữ học tri nhận", englishName: "Cognitive Linguistics", credits: 3 },
  { name: "Phát triển Chương trình giảng dạy", englishName: "Curriculum Development", credits: 3 },
  {
    name: "Thực hành giảng dạy ngôn ngữ",
    englishName: "Practice of Language Teaching",
    credits: 3,
  },
  { name: "Ngôn ngữ học xã hội", englishName: "Sociolinguistics", credits: 3, elective: true },
  {
    name: "Cấu trúc ngôn ngữ",
    englishName: "Structuralism in Linguistics",
    credits: 3,
    elective: true,
  },
  { name: "Ngữ dụng học", englishName: "Pragmatics", credits: 3, elective: true },
  {
    name: "Tiếng Anh chuyên ngành",
    englishName: "English for Specific Purposes",
    credits: 3,
    elective: true,
  },
  {
    name: "Lý thuyết dịch",
    englishName: "Advanced Translation Theories",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm tra và đánh giá ngôn ngữ",
    englishName: "Language Testing and Evaluation",
    credits: 3,
    elective: true,
  },
  {
    name: "Thực tập tại doanh nghiệp",
    englishName: "Teaching Practicum",
    credits: 3,
    elective: true,
  },
];

const englishResearchFoundationCourses: CurriculumCourse[] = [
  { name: "Viết nghiên cứu", englishName: "Research Writing", credits: 4 },
  {
    name: "Dẫn luận Ngôn ngữ học ứng dụng",
    englishName: "Introduction to Applied Linguistics",
    credits: 3,
  },
  {
    name: "Chuyên đề về Nghiên cứu định lượng và định tính",
    englishName: "Seminar on Quantitative and Qualitative Research",
    credits: 4,
  },
  {
    name: "Thụ đắc ngôn ngữ thứ hai",
    englishName: "Seminar on Second Language Acquisition",
    credits: 3,
  },
  { name: "Tiếng Anh toàn cầu", englishName: "World Englishes", credits: 3, elective: true },
  {
    name: "Giao tiếp giao văn hoá",
    englishName: "Cross-cultural communication",
    credits: 3,
    elective: true,
  },
  {
    name: "Ngôn ngữ học đối chiếu",
    englishName: "Contrastive Linguistics",
    credits: 3,
    elective: true,
  },
  {
    name: "Ngôn ngữ Máy tính",
    englishName: "Computational Linguistics",
    credits: 3,
    elective: true,
  },
  {
    name: "CNTT trong giảng dạy ngôn ngữ",
    englishName: "IT in Foreign Language Teaching",
    credits: 3,
    elective: true,
  },
];

const englishAppliedSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp Giảng dạy Ngôn ngữ nâng cao",
    englishName: "Advanced Methods of Teaching Language",
    credits: 3,
  },
  { name: "Phân tích diễn ngôn", englishName: "Discourse Analysis", credits: 3 },
  { name: "Ngôn ngữ học tri nhận", englishName: "Cognitive Linguistics", credits: 3 },
  { name: "Phát triển Chương trình giảng dạy", englishName: "Curriculum Development", credits: 3 },
  { name: "Thực tập tại doanh nghiệp", englishName: "Teaching Practicum", credits: 6 },
  {
    name: "Thực hành giảng dạy ngôn ngữ",
    englishName: "Practice of Language Teaching",
    credits: 3,
  },
  { name: "Ngôn ngữ học xã hội", englishName: "Sociolinguistics", credits: 3, elective: true },
  {
    name: "Cấu trúc ngôn ngữ",
    englishName: "Structuralism in Linguistics",
    credits: 3,
    elective: true,
  },
  { name: "Ngữ dụng học", englishName: "Pragmatics", credits: 3, elective: true },
  {
    name: "Tiếng Anh chuyên ngành",
    englishName: "English for Specific Purposes",
    credits: 3,
    elective: true,
  },
  {
    name: "Lý thuyết dịch",
    englishName: "Advanced Translation Theories",
    credits: 3,
    elective: true,
  },
  {
    name: "Kiểm tra và đánh giá ngôn ngữ",
    englishName: "Language Testing and Evaluation",
    credits: 3,
    elective: true,
  },
];

const englishAppliedFoundationCourses: CurriculumCourse[] = [
  { name: "Viết nghiên cứu", englishName: "Research Writing", credits: 4 },
  {
    name: "Phương pháp Nghiên cứu khoa học nâng cao",
    englishName: "Graduate Research and Methodology",
    credits: 4,
  },
  { name: "Thụ đắc ngôn ngữ thứ hai", englishName: "Second Language Acquisition", credits: 3 },
  {
    name: "Dẫn luận Ngôn ngữ học ứng dụng",
    englishName: "Introduction to Applied Linguistics",
    credits: 3,
  },
  { name: "Tiếng Anh toàn cầu", englishName: "World Englishes", credits: 3, elective: true },
  {
    name: "Giao tiếp giao văn hoá",
    englishName: "Cross-cultural communication",
    credits: 3,
    elective: true,
  },
  {
    name: "Ngôn ngữ học đối chiếu",
    englishName: "Contrastive Linguistics",
    credits: 3,
    elective: true,
  },
  {
    name: "Ngôn ngữ Máy tính",
    englishName: "Computational Linguistics",
    credits: 3,
    elective: true,
  },
  {
    name: "CNTT trong Giảng dạy tiếng Anh",
    englishName: "IT in Foreign Language Teaching",
    credits: 3,
    elective: true,
  },
];

const englishGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getNgonNguAnhCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: englishGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: englishAppliedFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: englishAppliedSpecialisedCourses,
        },
        {
          title: "Tốt nghiệp",
          englishTitle: "Graduation requirements",
          courses: [{ name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 }],
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
          courses: englishGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: englishResearchFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: englishResearchSpecialisedCourses,
        },
        {
          title: "Tốt nghiệp",
          englishTitle: "Graduation requirements",
          courses: [{ name: "Luận văn tốt nghiệp", englishName: "Thesis", credits: 12 }],
        },
      ],
    },
  ];
}
