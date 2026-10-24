// ==================================================
// NGÀNH: CÔNG NGHỆ SINH HỌC
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const congNgheSinhHocPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Công nghệ Sinh học cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
      "Chương trình Thạc sĩ Công nghệ Sinh học cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Công nghệ Sinh học",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Công nghệ Sinh học",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Công nghệ Sinh học",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Công nghệ Sinh học",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Công nghệ Sinh học được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Công nghệ Sinh học được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const congNgheSinhHocProgramme: Programme = {
  id: "cong-nghe-sinh-hoc",
  code: "S-03",

  title: "Công nghệ Sinh học",
  englishTitle: "Master of Biotechnology",

  degree: "Thạc sĩ",

  field: "Kỹ thuật, Môi trường & Công nghệ",

  orientation: "Nghiên cứu",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const biotechnologySpecialisedCourses: CurriculumCourse[] = [
  { name: "Liệu pháp tế bào", credits: 3, elective: true },
  { name: "Vắc xin", credits: 3, elective: true },
  { name: "Chẩn đoán phân tử", credits: 3, elective: true },
  { name: "Sinh học ung thư", credits: 3, elective: true },
  { name: "Cơ sở phân tử trong tương tác vật chủ - tác nhân gây bệnh", credits: 3, elective: true },
  { name: "Vi sinh vật học ứng dụng trong sản xuất", credits: 3, elective: true },
  { name: "Công nghệ sinh học nano", credits: 3, elective: true },
  { name: "Công nghệ sinh học và phát triển bền vững", credits: 3, elective: true },
  { name: "Đổi mới sáng tạo trong công nghệ sinh học", credits: 3, elective: true },
];

const biotechnologyFoundationCourses: CurriculumCourse[] = [
  { name: "Hóa sinh trong sức khỏe và bệnh tật", credits: 3 },
  { name: "Tin sinh học ứng dụng", credits: 3 },
  { name: "Miễn dịch học ứng dụng", credits: 3 },
  { name: "Truyền tải tín hiệu ở tế bào", credits: 3 },
  { name: "Liệu pháp gene", credits: 3 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getCongNgheSinhHocCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo nghiên cứu",
      groups: [
        {
          title: "Kiến thức chung",
          courses: [
            { name: "Triết học", credits: 3 },
            { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
          ],
        },
        { title: "Kiến thức cơ sở", courses: biotechnologyFoundationCourses },
        { title: "Kiến thức chuyên ngành", courses: biotechnologySpecialisedCourses },
        {
          title: "Kiến thức Nghiên cứu khoa học",
          courses: [
            { name: "Chuyên đề nghiên cứu 1", credits: 6 },
            { name: "Chuyên đề nghiên cứu 2", credits: 6 },
            { name: "Luận văn", credits: 15 },
          ],
        },
      ],
    },
  ];
}
