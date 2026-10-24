// ==================================================
// NGÀNH: KỸ THUẬT XÂY DỰNG
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const kyThuatXayDungPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Kỹ thuật Xây dựng cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
      "Chương trình Thạc sĩ Kỹ thuật Xây dựng cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Kỹ thuật Xây dựng",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kỹ thuật Xây dựng",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kỹ thuật Xây dựng",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kỹ thuật Xây dựng",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Kỹ thuật Xây dựng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Kỹ thuật Xây dựng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const kyThuatXayDungProgramme: Programme = {
  id: "ky-thuat-xay-dung",
  code: "S-04",

  title: "Kỹ thuật Xây dựng",
  englishTitle: "Master of Civil Engineering",

  degree: "Thạc sĩ",

  field: "Kỹ thuật, Môi trường & Công nghệ",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const civilEngineeringSharedCourses: CurriculumCourse[] = [
  { name: "Triết học nâng cao", credits: 3 },
  { name: "Động lực học kết cấu và động đất", credits: 3 },
  { name: "Quản lý dự án đầu tư và xây dựng", credits: 3 },
  { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
  { name: "Kết cấu liên hợp", credits: 3, elective: true },
  { name: "Quan trắc và biến dạng công trình", credits: 3, elective: true },
  { name: "Phân tích định lượng trong quản lý xây dựng", credits: 3, elective: true },
  { name: "Kết cấu bê tông cốt thép nâng cao", credits: 3 },
  { name: "Công nghệ xây dựng và xu thế phát triển", credits: 3 },
  { name: "Phương pháp phần tử hữu hạn trong phân tích kết cấu", credits: 3 },
  { name: "Cơ kết cấu nâng cao", credits: 3, elective: true },
  { name: "Kết cấu cao tầng và tải trọng ngang", credits: 3, elective: true },
  { name: "Sửa chữa và nâng cấp công trình", credits: 3, elective: true },
  { name: "Kiểm định khai thác và thí nghiệm kết cấu công trình", credits: 3, elective: true },
  { name: "Kết cấu bê tông cốt thép ứng lực trước", credits: 3, elective: true },
  { name: "Quản lý An toàn và môi trường trong xây dựng", credits: 3, elective: true },
  { name: "Kết cấu thép nâng cao", credits: 3 },
  { name: "Kỹ thuật nền móng nâng cao", credits: 3 },
  { name: "Ứng dụng tin học trong nghiên cứu", credits: 3 },
  { name: "Quản lý dự án xây dựng nâng cao", credits: 3 },
  { name: "Kết cấu tấm và vỏ", credits: 3 },
];

const civilEngineeringAppliedCourses: CurriculumCourse[] = [
  ...civilEngineeringSharedCourses,
  { name: "Thực tập chuyên ngành", credits: 3 },
  { name: "Quản lý tài chính trong Doanh nghiệp xây dựng nâng cao", credits: 3 },
  { name: "Đề án tốt nghiệp", credits: 9 },
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 2", credits: 3, elective: true },
  { name: "Quản lý rủi ro trong xây dựng nâng cao", credits: 3, elective: true },
  { name: "Kinh tế đầu tư xây dựng nâng cao", credits: 3, elective: true },
];

const civilEngineeringResearchCourses: CurriculumCourse[] = [
  ...civilEngineeringSharedCourses,
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 1", credits: 3, elective: true },
  { name: "Quản lý dự án xây dựng nâng cao", credits: 3, elective: true },
  { name: "Kết cấu tấm và vỏ", credits: 3, elective: true },
  { name: "Quản lý tài chính trong Doanh nghiệp xây dựng nâng cao", credits: 3, elective: true },
  { name: "Chuyên đề tự chọn 2", credits: 3, elective: true },
  { name: "Quản lý rủi ro trong xây dựng nâng cao", credits: 3, elective: true },
  { name: "Thực tập chuyên ngành", credits: 3, elective: true },
  { name: "Luận văn tốt nghiệp", credits: 15 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getKyThuatXayDungCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      groups: [{ title: "Nội dung chương trình", courses: civilEngineeringAppliedCourses }],
    },
    {
      number: "06",
      title: "Chương trình đào tạo nghiên cứu",
      groups: [{ title: "Nội dung chương trình", courses: civilEngineeringResearchCourses }],
    },
  ];
}
