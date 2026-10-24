// ==================================================
// NGÀNH: TÀI CHÍNH - NGÂN HÀNG
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const taiChinhNganHangPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Tài chính - Ngân hàng cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kinh doanh & quản lý.",
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
      "Chương trình Thạc sĩ Tài chính - Ngân hàng cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kinh doanh & quản lý.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Tài chính - Ngân hàng",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Tài chính - Ngân hàng",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Tài chính - Ngân hàng",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Tài chính - Ngân hàng",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Tài chính - Ngân hàng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Tài chính - Ngân hàng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const taiChinhNganHangProgramme: Programme = {
  id: "tai-chinh-ngan-hang",
  code: "S-08",

  title: "Tài chính - Ngân hàng",
  englishTitle: "Master of Finance and Banking",

  degree: "Thạc sĩ",

  field: "Kinh doanh & Quản lý",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const financeBankingResearchFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp định lượng trong tài chính",
    englishName: "Quantitative Research Methods for Finance",
    credits: 3,
  },
  {
    name: "Ứng dụng AI trong nghiên cứu",
    englishName: "Application Artificial Intelligence in Research",
    credits: 3,
  },
  {
    name: "Tiền tệ, ngân hàng và thị trường tài chính",
    englishName: "Money, Banking and Financial Markets",
    credits: 3,
  },
  {
    name: "Tài chính hành vi",
    englishName: "Behavioral Finance",
    credits: 2,
    elective: true,
  },
  {
    name: "Chuyên đề công nghệ tài chính",
    englishName: "Proseminar in Financial Technology",
    credits: 2,
    elective: true,
  },
  {
    name: "Tinh thần doanh nhân",
    englishName: "Entrepreneurship",
    credits: 3,
  },
  {
    name: "Tài chính khởi nghiệp",
    englishName: "Entrepreneurial Finance",
    credits: 0,
  },
];

const financeBankingResearchGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
  {
    name: "Chuyên đề Kinh tế học về Tài chính & Ngân hàng",
    englishName: "Proseminar in Economics of Finance & Banking",
    credits: 3,
  },
];

const financeBankingSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Quản trị rủi ro doanh nghiệp",
    englishName: "Enterprise Risk Management",
    credits: 3,
  },
  {
    name: "Quản trị ngân hàng",
    englishName: "Bank Management",
    credits: 3,
  },
  {
    name: "Quản trị tài chính",
    englishName: "Financial Management",
    credits: 3,
  },
  {
    name: "Quản trị đổi mới sáng tạo",
    englishName: "Innovation Management",
    credits: 3,
  },
  {
    name: "Hệ thống thông tin quản lý",
    englishName: "Management Information Systems",
    credits: 3,
  },
  {
    name: "Chuyên đề ngân hàng và các định chế tài chính phi ngân hàng",
    englishName: "Proseminar in Financial Intermediaries",
    credits: 3,
    elective: true,
  },
  {
    name: "Nghệ thuật lãnh đạo trong tài chính",
    englishName: "Leadership in Finance",
    credits: 3,
    elective: true,
  },
  {
    name: "Chuyên đề tài chính doanh nghiệp",
    englishName: "Proseminar in Corporate Finance",
    credits: 3,
    elective: true,
  },
];

const financeBankingAppliedFoundationCourses: CurriculumCourse[] = [
  {
    name: "Chuyên đề Kinh tế học về Tài chính & Ngân hàng",
    englishName: "Proseminar in Economics of Finance & Banking",
    credits: 3,
  },
  {
    name: "Tiền tệ, ngân hàng và thị trường tài chính",
    englishName: "Money, Banking and Financial Markets",
    credits: 3,
  },
  {
    name: "Phương pháp định lượng trong tài chính",
    englishName: "Quantitative Research Methods for Finance",
    credits: 3,
  },
  {
    name: "Tinh thần doanh nhân",
    englishName: "Entrepreneurship",
    credits: 3,
  },
  {
    name: "Tài chính khởi nghiệp",
    englishName: "Entrepreneurial Finance",
    credits: 3,
  },
  {
    name: "Tài chính hành vi",
    englishName: "Behavioral Finance",
    credits: 2,
    elective: true,
  },
  {
    name: "Chuyên đề công nghệ tài chính",
    englishName: "Proseminar in Financial Technology",
    credits: 2,
    elective: true,
  },
];

const financeBankingAppliedGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getTaiChinhNganHangCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: financeBankingAppliedGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: financeBankingAppliedFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: financeBankingSpecialisedCourses,
        },
        {
          title: "Tốt nghiệp",
          englishTitle: "Graduation requirements",
          courses: [
            {
              name: "Thực tập (Báo cáo thực tập và Đề cương Đề án)",
              englishName: "Internship (Internship Report and Project Outline)",
              credits: 6,
            },
            {
              name: "Đề án tốt nghiệp",
              englishName: "Final Project",
              credits: 9,
            },
          ],
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
          courses: financeBankingResearchGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: financeBankingResearchFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: financeBankingSpecialisedCourses,
        },
        {
          title: "Tốt nghiệp",
          englishTitle: "Graduation requirements",
          courses: [
            {
              name: "Luận văn tốt nghiệp",
              englishName: "Master's thesis",
              credits: 12,
            },
          ],
        },
      ],
    },
  ];
}
