// ==================================================
// NGÀNH: QUẢN LÝ TÀI NGUYÊN VÀ MÔI TRƯỜNG
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumGroup, CurriculumTrack } from "../curricula";

export const quanLyTaiNguyenMoiTruongPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Quản lý Tài nguyên và Môi trường cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
      "Chương trình Thạc sĩ Quản lý Tài nguyên và Môi trường cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Quản lý Tài nguyên và Môi trường",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản lý Tài nguyên và Môi trường",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản lý Tài nguyên và Môi trường",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản lý Tài nguyên và Môi trường",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Quản lý Tài nguyên và Môi trường được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Quản lý Tài nguyên và Môi trường được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const quanLyTaiNguyenMoiTruongProgramme: Programme = {
  id: "quan-ly-tai-nguyen-moi-truong",
  code: "S-02",

  title: "Quản lý Tài nguyên và Môi trường",

  englishTitle: "Master of Natural Resources and Environmental Management",

  degree: "Thạc sĩ",

  field: "Kỹ thuật, Môi trường & Công nghệ",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const resourceManagementElectiveCourses: CurriculumCourse[] = [
  { name: "Quy hoạch môi trường", credits: 2, elective: true },
  { name: "Quản lý môi trường: Giải pháp cho các đô thị thông minh", credits: 3, elective: true },
  {
    name: "Viễn thám và GIS ứng dụng trong Quản lý Tài nguyên và Môi trường",
    credits: 3,
    elective: true,
  },
  { name: "Tư vấn chính sách môi trường quốc tế", credits: 6, elective: true },
  { name: "Kiểm soát ô nhiễm không khí nâng cao", credits: 3, elective: true },
  { name: "Công nghệ xử lý nước thải bậc cao", credits: 3, elective: true },
  { name: "Công nghệ tái chế chất thải rắn", credits: 3, elective: true },
  { name: "Công nghệ màng và ứng dụng", credits: 3, elective: true },
  { name: "Đánh giá rủi ro và đánh giá tác động môi trường", credits: 3, elective: true },
  { name: "Phân tích và đánh giá dữ liệu môi trường", credits: 3, elective: true },
  { name: "Quản lý carbon cho môi trường bền vững", credits: 3, elective: true },
  { name: "Ứng dụng trí tuệ nhân tạo trong môi trường", credits: 3, elective: true },
];

const resourceManagementRequiredCourses: CurriculumCourse[] = [
  { name: "Chính sách quản lý tài nguyên và môi trường", credits: 2 },
  { name: "Kinh tế tài nguyên môi trường", credits: 2 },
  { name: "Quản lý tổng hợp lưu vực sông", credits: 2 },
  { name: "Phân tích hệ thống môi trường", credits: 3 },
];

const resourceManagementFoundationCourses: CurriculumCourse[] = [
  { name: "Biến đổi khí hậu và tăng trưởng xanh", credits: 3 },
  { name: "Mô hình hóa môi trường", credits: 3 },
  { name: "Phương pháp nghiên cứu khoa học", credits: 3 },
  { name: "Quản lý chất lượng môi trường", credits: 3 },
  { name: "Kỹ thuật phân tích nước và nước thải", credits: 2, elective: true },
  { name: "Độc chất học môi trường", credits: 3, elective: true },
  { name: "Vi sinh ứng dụng", credits: 2, elective: true },
  { name: "Năng lượng và năng lượng tái tạo", credits: 3, elective: true },
  { name: "Kỹ thuật xử lý chất thải nguy hại", credits: 3, elective: true },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getQuanLyTaiNguyenMoiTruongCurricula(): CurriculumTrack[] {
  const sharedGroups: CurriculumGroup[] = [
    { title: "Kiến thức chung", courses: [{ name: "Triết học", credits: 3 }] },
    { title: "Kiến thức cơ sở", courses: resourceManagementFoundationCourses },
  ];
  const specialised = (proposal: string, includeAudit = false): CurriculumGroup => ({
    title: "Kiến thức chuyên ngành",
    courses: [
      ...resourceManagementRequiredCourses,
      { name: proposal, credits: 2 },
      ...(includeAudit ? [{ name: "Kiểm toán môi trường", credits: 2, elective: true }] : []),
      ...resourceManagementElectiveCourses,
    ],
  });
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      groups: [
        ...sharedGroups,
        specialised("Đề cương thực hiện Đề án tốt nghiệp và bảo vệ đề cương"),
        {
          title: "Tốt nghiệp",
          courses: [
            { name: "Thực tập chuyên ngành", credits: 6 },
            { name: "Đề án tốt nghiệp", credits: 9 },
          ],
        },
      ],
    },
    {
      number: "06",
      title: "Chương trình đào tạo nghiên cứu",
      groups: [
        ...sharedGroups,
        specialised("Đề cương thực hiện Luận văn tốt nghiệp và bảo vệ đề cương", true),
        {
          title: "Tốt nghiệp",
          courses: [
            { name: "Chuyên đề nghiên cứu", credits: 15 },
            { name: "Luận văn tốt nghiệp", credits: 15 },
          ],
        },
      ],
    },
  ];
}
