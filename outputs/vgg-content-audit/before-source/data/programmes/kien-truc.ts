// ==================================================
// NGÀNH: KIẾN TRÚC
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const kienTrucPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Kiến trúc cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
      "Chương trình Thạc sĩ Kiến trúc cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Kiến trúc",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kiến trúc",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kiến trúc",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kiến trúc",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Kiến trúc được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Kiến trúc được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const kienTrucProgramme: Programme = {
  id: "kien-truc",
  code: "S-16",

  title: "Kiến trúc",
  englishTitle: "Master of Architecture",

  degree: "Thạc sĩ",

  field: "Kỹ thuật, Môi trường & Công nghệ",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const architectureGraduationCourses: CurriculumCourse[] = [
  { name: "Vật liệu và công nghệ xây dựng mới", credits: 2, elective: true },
  { name: "Quản lý và phát triển dự án kiến trúc", credits: 6 },
  { name: "Thực tập 1 (Chuyên gia và năng lực quản lý chuyên ngành)", credits: 6 },
  { name: "Thực tập 2 (Dự án nghiên cứu và Đề cương tốt nghiệp)", credits: 3 },
  { name: "Đề án tốt nghiệp", credits: 9 },
];

const architectureCoreCourses: CurriculumCourse[] = [
  { name: "Lý thuyết và thực hành kiến trúc đương đại", credits: 2 },
  { name: "Kiến trúc và Thiết kế bền vững", credits: 2 },
  {
    name: "Mô hình thông tin công trình (BIM) trong thiết kế và quản lý công trình kiến trúc",
    credits: 2,
  },
  { name: "Lý luận bảo tồn di sản văn hóa – kiến trúc", credits: 2 },
  { name: "Đồ án thiết kế kiến trúc nâng cao", credits: 3 },
  { name: "Đồ án Hình thái đô thị và kiến trúc", credits: 3 },
  { name: "Tham quan – phân tích, đánh giá và phê bình kiến trúc", credits: 2 },
  { name: "Lý thuyết tổ hợp không gian kiến trúc hiện đại", credits: 2, elective: true },
  { name: "Kiến trúc cảnh quan", credits: 2, elective: true },
  { name: "Mối quan hệ giữa kiến trúc và các ngành nghệ thuật khác", credits: 2, elective: true },
  { name: "Tổ chức không gian kiến trúc môi trường ở", credits: 2, elective: true },
  { name: "Lý thuyết và ứng dụng Hình Thái học đô thị", credits: 2, elective: true },
  { name: "Thiết kế đô thị", credits: 2, elective: true },
  { name: "Lý luận phát triển không gian đô thị", credits: 2, elective: true },
  { name: "Tổ chức môi trường dịch vụ công cộng đô thị", credits: 2, elective: true },
  { name: "Lý luận quy hoạch vùng và đô thị", credits: 2, elective: true },
  { name: "Quản lý quy hoạch, kiến trúc và xây dựng", credits: 2, elective: true },
  { name: "Kiến trúc bền vững: mô phỏng và thiết kế công trình", credits: 2, elective: true },
  { name: "Công trình xanh: thiết kế và tiêu chuẩn đánh giá", credits: 2, elective: true },
  { name: "Công nghệ mới trong kỹ thuật công trình", credits: 2, elective: true },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getKienTrucCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      groups: [
        {
          title: "Kiến thức chung",
          courses: [
            { name: "Triết học", credits: 3 },
            { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
          ],
        },
        { title: "Kiến thức cơ sở và chuyên ngành", courses: architectureCoreCourses },
        { title: "Thực tập và Đề án tốt nghiệp", courses: architectureGraduationCourses },
      ],
    },
  ];
}
