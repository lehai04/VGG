// ==================================================
// NGÀNH: QUẢN TRỊ KINH DOANH
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumGroup, CurriculumTrack } from "../curricula";

export const quanTriKinhDoanhPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Quản trị Kinh doanh cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kinh doanh & quản lý.",
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
      "Chương trình Thạc sĩ Quản trị Kinh doanh cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kinh doanh & quản lý.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Quản trị Kinh doanh",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản trị Kinh doanh",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản trị Kinh doanh",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quản trị Kinh doanh",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Quản trị Kinh doanh được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Quản trị Kinh doanh được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const quanTriKinhDoanhProgramme: Programme = {
  id: "quan-tri-kinh-doanh",
  code: "S-06",

  title: "Quản trị Kinh doanh",
  englishTitle: "Master of Business Administration",

  degree: "Thạc sĩ",

  field: "Kinh doanh & Quản lý",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const businessAdministrationResearchElectiveCourses: CurriculumCourse[] = [
  {
    name: "Chuyên đề về Khởi nghiệp, đổi mới sáng tạo và phát triển bền vững",
    englishName: "Seminar in Enterpreneurship, Innovations and Sustainable Development",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề về Marketing kỹ thuật số",
    englishName: "Seminar in Digital Marketing",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề về Quản trị sự thay đổi",
    englishName: "Seminar in Change Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề về Quản lý dự án",
    englishName: "Seminar in Project Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề về Phân tích dữ liệu lớn trong kinh doanh và quản lý",
    englishName: "Seminar in Big Data Analytics for Business and Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề tự chọn",
    englishName: "Special Study",
    credits: 3,
    elective: true,
  },
  {
    name: "Các vấn đề đương đại trong Quản lý Kinh doanh 1",
    englishName: "Contemporary issues in Business & Management 1",
    credits: 1,
    elective: true,
  },
];

const businessAdministrationAppliedElectiveCourses: CurriculumCourse[] = [
  {
    name: "Khởi nghiệp, đổi mới sáng tạo và phát triển bền vững",
    englishName: "Enterpreneurship, Innovations and Sustainable Development",
    credits: 3,
    elective: true,
  },
  {
    name: "Marketing kỹ thuật số",
    englishName: "Digital Marketing",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị sự thay đổi",
    englishName: "Change Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản lý dự án",
    englishName: "Project Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Phân tích dữ liệu lớn trong kinh doanh và quản lý",
    englishName: "Big Data Analytics for Business and Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề tự chọn",
    englishName: "Special Study",
    credits: 3,
    elective: true,
  },
  {
    name: "Các vấn đề đương đại trong Quản lý Kinh doanh 1",
    englishName: "Contemporary issues in Business & Management 1",
    credits: 1,
    elective: true,
  },
  {
    name: "Các vấn đề đương đại trong Quản lý Kinh doanh 2",
    englishName: "Contemporary issues in Business & Management 2",
    credits: 1,
    elective: true,
  },
];

const businessAdministrationCoreCourses: CurriculumCourse[] = [
  {
    name: "Quản lý chiến lược và chuyển đổi số",
    englishName: "Strategic Management and Digital Transformation",
    credits: 3,
  },
  {
    name: "Quản trị Con người và Tổ chức",
    englishName: "Managing People and Organization",
    credits: 3,
  },
  {
    name: "Quản trị vận hành và chuỗi cung ứng",
    englishName: "Operation and Supply Chain Management",
    credits: 3,
  },
  {
    name: "Lãnh đạo và quản trị doanh nghiệp",
    englishName: "Leadership and Governance",
    credits: 3,
  },
  {
    name: "Phân tích kinh doanh",
    englishName: "Business Analytics",
    credits: 4,
  },
  {
    name: "Chiến lược Marketing trong bối cảnh toàn cầu",
    englishName: "Marketing Strategy in the Global context",
    credits: 3,
  },
];

const businessAdministrationFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp nghiên cứu trong kinh doanh",
    englishName: "Business Research Methods",
    credits: 3,
  },
  {
    name: "Kinh tế học cho nhà quản lý",
    englishName: "Economics for Manager",
    credits: 3,
  },
  {
    name: "Tài chính và kế toán cho nhà quản lý",
    englishName: "Finance and Accounting for Manager",
    credits: 3,
  },
];

const businessAdministrationGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getQuanTriKinhDoanhCurricula(): CurriculumTrack[] {
  const sharedGroups: CurriculumGroup[] = [
    {
      title: "Kiến thức chung",
      englishTitle: "General knowledge",
      courses: businessAdministrationGeneralCourses,
    },
    {
      title: "Kiến thức cơ sở",
      englishTitle: "Foundation knowledge",
      courses: businessAdministrationFoundationCourses,
    },
  ];
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        ...sharedGroups,
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: [
            ...businessAdministrationCoreCourses,
            ...businessAdministrationAppliedElectiveCourses,
          ],
        },
        {
          title: "Tốt nghiệp",
          englishTitle: "Graduation requirements",
          courses: [
            { name: "Thực tập tốt nghiệp 1", englishName: "Internship 1", credits: 2 },
            { name: "Thực tập tốt nghiệp 2", englishName: "Internship 2", credits: 4 },
            { name: "Đề án tốt nghiệp", englishName: "Final Project", credits: 9 },
          ],
        },
      ],
    },
    {
      number: "06",
      title: "Chương trình đào tạo nghiên cứu",
      subtitle: "Research curriculum",
      groups: [
        ...sharedGroups,
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: [
            ...businessAdministrationCoreCourses,
            ...businessAdministrationResearchElectiveCourses,
          ],
        },
        {
          title: "Tốt nghiệp",
          englishTitle: "Graduation requirements",
          courses: [{ name: "Luận văn tốt nghiệp", englishName: "Thesis", credits: 15 }],
        },
      ],
    },
  ];
}
