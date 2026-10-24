// ==================================================
// NGÀNH: QUAN HỆ CÔNG CHÚNG
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const quanHeCongChungPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển năng lực hoạch định chiến lược, quản trị truyền thông, sáng tạo nội dung và nghiên cứu quan hệ công chúng trong môi trường số.",
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
    headline: "Kiến thức chuyên sâu. Năng lực tạo tác động.",
    overview: [
      "Chương trình kết nối lý thuyết truyền thông với thực hành chiến lược, quản trị danh tiếng, khủng hoảng, nội dung đa phương tiện và công chúng số. Người học rèn luyện năng lực phân tích dữ liệu, tư duy phản biện và quản lý chiến dịch trong bối cảnh truyền thông biến đổi nhanh.",
      "Định hướng ứng dụng gắn với trải nghiệm quốc tế, thực tập doanh nghiệp và đề án tốt nghiệp. Định hướng nghiên cứu chú trọng phương pháp khoa học, nghiên cứu quan hệ công chúng và luận văn.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Quan hệ Công chúng",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quan hệ Công chúng",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quan hệ Công chúng",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Quan hệ Công chúng",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Quan hệ Công chúng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Quan hệ Công chúng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const quanHeCongChungProgramme: Programme = {
  id: "quan-he-cong-chung",
  code: "S-14",

  title: "Quan hệ Công chúng",
  englishTitle: "Master of Public Relations",

  degree: "Thạc sĩ",

  field: "Luật, Nhân văn & Truyền thông",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 – 110.000.000 VNĐ",
  graduationRequirements: [
    "Đối với ngành Quan hệ Công chúng: Có tối thiểu 01 công bố khoa học được đăng trên tạp chí khoa học hoặc trong kỷ yếu hội nghị trong nước/quốc tế.",
  ],
};

const prResearchSpecialisedCourses: CurriculumCourse[] = [
  { name: "Truyền thông số", englishName: "Digital Media and Public Relations", credits: 3 },
  { name: "Công chúng truyền thông", englishName: "Media Audiences and Users", credits: 3 },
  {
    name: "Quản trị danh tiếng và khủng hoảng",
    englishName: "Crisis and Reputation Management",
    credits: 3,
  },
  { name: "Quản trị kinh tế truyền thông", englishName: "Media Economics", credits: 3 },
  { name: "Trải nghiệm quốc tế Truyền thông", credits: 2 },
  {
    name: "Truyền thông và lãnh đạo",
    englishName: "Communications and Leadership",
    credits: 3,
    elective: true,
  },
  { name: "Thẩm định tin tức", englishName: "Media Literacy", credits: 3, elective: true },
  { name: "Kỹ thuật truyền thông", englishName: "Media Technologies", credits: 3, elective: true },
  {
    name: "Truyền thông toàn cầu",
    englishName: "Global Communication Theories and Application",
    credits: 3,
    elective: true,
  },
  { name: "Quan hệ giới truyền thông", englishName: "Media Relations", credits: 3, elective: true },
  {
    name: "Quan hệ nội bộ và Nhà đầu tư",
    englishName: "Employee and Investor Relations",
    credits: 3,
    elective: true,
  },
  {
    name: "Quan hệ công chúng trong tổ chức Phi chính phủ",
    englishName: "Public Relations and Advocacy for Nonprofit Organizations",
    credits: 3,
    elective: true,
  },
  {
    name: "Phát triển nội dung Quan hệ Công chúng",
    englishName: "Public Relations Writing and Content Creation",
    credits: 3,
    elective: true,
  },
  {
    name: "Thuyết trình chuyên nghiệp",
    englishName: "Academic and professional presentation skills",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị thương hiệu cá nhân",
    englishName: "Personal Branding Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Truyền thông sức khoẻ",
    englishName: "Health Communication and Advocacy",
    credits: 3,
    elective: true,
  },
  { name: "Báo chí", englishName: "Understanding Journalism", credits: 3, elective: true },
  {
    name: "Quảng cáo và tiếp thị kỹ thuật số",
    englishName: "Advertising and Promotion in the Digital Age",
    credits: 3,
    elective: true,
  },
  {
    name: "Truyền thông đa phương tiện",
    englishName: "Creative Media Design & Expression",
    credits: 3,
    elective: true,
  },
];

const prResearchFoundationCourses: CurriculumCourse[] = [
  {
    name: "Lý thuyết Quan hệ công chúng đương đại",
    englishName: "Contemporary Public Relations Theory",
    credits: 3,
  },
  {
    name: "Nghiên cứu Quan hệ Công chúng",
    englishName: "Research on Public Relations",
    credits: 3,
  },
  {
    name: "Đạo đức, luật pháp và Quy định truyền thông",
    englishName: "Media Law And Regulation",
    credits: 3,
  },
  {
    name: "Chiến lược Quan hệ Công chúng",
    englishName: "Public Relations Campaign Planning and Execution",
    credits: 3,
  },
];

const prAppliedSpecialisedCourses: CurriculumCourse[] = [
  { name: "Truyền thông số", englishName: "Digital Media and Public Relations", credits: 4 },
  { name: "Công chúng truyền thông", englishName: "Media Audiences and Users", credits: 3 },
  {
    name: "Phát triển nội dung Quan hệ Công chúng",
    englishName: "Public Relations Writing and Content Creation",
    credits: 3,
  },
  {
    name: "Quản trị danh tiếng và khủng hoảng",
    englishName: "Crisis and Reputation Management",
    credits: 3,
  },
  { name: "Quản trị kinh tế truyền thông", englishName: "Media Economics", credits: 3 },
  { name: "Thực tập 1: Trải nghiệm quốc tế truyền thông", credits: 2 },
  { name: "Thực tập 2: Thực tập tại doanh nghiệp", credits: 4 },
  {
    name: "Truyền thông và lãnh đạo",
    englishName: "Communications and Leadership",
    credits: 3,
    elective: true,
  },
  { name: "Thẩm định tin tức", englishName: "Media Literacy", credits: 3, elective: true },
  {
    name: "Lý thuyết Quan hệ công chúng đương đại",
    englishName: "Contemporary Public Relations Theory",
    credits: 3,
    elective: true,
  },
  {
    name: "Truyền thông toàn cầu",
    englishName: "Global Communication Theories and Application",
    credits: 3,
    elective: true,
  },
  {
    name: "Truyền thông sức khoẻ",
    englishName: "Health Communication and Advocacy",
    credits: 3,
    elective: true,
  },
  { name: "Quan hệ giới truyền thông", englishName: "Media Relations", credits: 3, elective: true },
  {
    name: "Quan hệ nội bộ và Nhà đầu tư",
    englishName: "Employee and Investor Relations",
    credits: 3,
    elective: true,
  },
  {
    name: "Quan hệ công chúng trong tổ chức Phi chính phủ",
    englishName: "Public Relations and Advocacy for Nonprofit Organizations",
    credits: 3,
    elective: true,
  },
  {
    name: "Thuyết trình chuyên nghiệp",
    englishName: "Academic and professional presentation skills",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản trị thương hiệu cá nhân",
    englishName: "Personal Branding Management",
    credits: 3,
    elective: true,
  },
  {
    name: "Truyền thông đa phương tiện",
    englishName: "Creative Media Design & Expression",
    credits: 3,
    elective: true,
  },
];

const prAppliedFoundationCourses: CurriculumCourse[] = [
  { name: "Kỹ thuật truyền thông", englishName: "Media Technologies", credits: 3 },
  {
    name: "Đạo đức, luật pháp và Quy định truyền thông",
    englishName: "Media Law And Regulation",
    credits: 3,
  },
  {
    name: "Chiến lược Quan hệ Công chúng",
    englishName: "Public Relations Campaign Planning and Execution",
    credits: 4,
  },
];

const prGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 4 },
  { name: "Phương pháp nghiên cứu khoa học", englishName: "Research Methodology", credits: 3 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getQuanHeCongChungCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: prGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: prAppliedFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: prAppliedSpecialisedCourses,
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
          courses: prGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: prResearchFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: prResearchSpecialisedCourses,
        },
        {
          title: "Tốt nghiệp",
          englishTitle: "Graduation requirements",
          courses: [{ name: "Luận văn tốt nghiệp", englishName: "Thesis", credits: 13 }],
        },
      ],
    },
  ];
}
