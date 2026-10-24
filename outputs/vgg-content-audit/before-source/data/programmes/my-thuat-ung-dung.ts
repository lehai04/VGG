// ==================================================
// NGÀNH: MỸ THUẬT ỨNG DỤNG
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumTrack } from "../curricula";

export const myThuatUngDungPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Mỹ thuật Ứng dụng cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực thiết kế & mỹ thuật ứng dụng.",
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
      "Chương trình Thạc sĩ Mỹ thuật Ứng dụng cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực thiết kế & mỹ thuật ứng dụng.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Mỹ thuật Ứng dụng",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Mỹ thuật Ứng dụng",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Mỹ thuật Ứng dụng",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Mỹ thuật Ứng dụng",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Mỹ thuật Ứng dụng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Mỹ thuật Ứng dụng được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const myThuatUngDungProgramme: Programme = {
  id: "my-thuat-ung-dung",
  code: "S-17",

  title: "Mỹ thuật Ứng dụng",
  englishTitle: "Master of Applied Arts",

  degree: "Thạc sĩ",

  field: "Thiết kế & Mỹ thuật Ứng dụng",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "100.000.000 VNĐ",
  graduationRequirements: [
    "Đối với ngành Mỹ thuật Ứng dụng: Có tối thiểu 02 công bố khoa học được đăng trên tạp chí khoa học hoặc trong kỷ yếu hội nghị trong nước/quốc tế.",
  ],
};

const appliedArtsGraduationCourses: CurriculumCourse[] = [
  { name: "Thực tập tốt nghiệp", englishName: "Internship", credits: 6 },
  { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 },
];

const appliedArtsMandatoryRequirements: CurriculumCourse[] = [
  {
    name: "Hoàn thành bài báo thứ nhất đăng trên tạp chí khoa học",
    englishName: "First Scientific Journal Publication",
    credits: 0,
  },
  {
    name: "Chứng nhận trải nghiệm thực tiễn",
    englishName: "Certificate of International Practical Experience",
    credits: 0,
  },
  {
    name: "Chứng nhận tham gia 2 hội thảo khoa học hoặc triển lãm quốc tế phù hợp với chuyên ngành",
    englishName:
      "Certificates of Participation in Two International Scientific Conferences / Exhibitions",
    credits: 0,
  },
  {
    name: "Hoàn thành bài báo thứ hai đăng trên tạp chí khoa học",
    englishName: "Second Scientific Journal Publication",
    credits: 0,
  },
];

const appliedArtsSpecialisedCourses: CurriculumCourse[] = [
  { name: "Phương pháp luận sáng tạo", englishName: "Creativity Methodology", credits: 3 },
  { name: "Lý thuyết văn hóa thị giác", englishName: "Theory of Visual Culture", credits: 3 },
  { name: "Cơ sở lý luận đề tài", englishName: "Thesis Proposal", credits: 2 },
  { name: "Phát triển sản phẩm", englishName: "Product Development", credits: 3, elective: true },
  { name: "Phân tích dữ liệu", englishName: "Data Analysis", credits: 3, elective: true },
  { name: "Thiết kế đương đại", englishName: "Contemporary Design", credits: 3, elective: true },
  { name: "Thiết kế bền vững", englishName: "Sustainable Design", credits: 3, elective: true },
  {
    name: "Workshop - Chuyên ngành thiết kế",
    englishName: "Specialized Design Workshop",
    credits: 3,
    elective: true,
  },
  {
    name: "Lịch sử và thẩm mỹ công nghiệp",
    englishName: "Industrial Aesthetic History",
    credits: 3,
    elective: true,
  },
];

const appliedArtsFoundationCourses: CurriculumCourse[] = [
  {
    name: "Phương pháp nghiên cứu khoa học",
    englishName: "Scientific Research Methods",
    credits: 3,
  },
  {
    name: "Văn hóa dân tộc học nghệ thuật",
    englishName: "Ethnology for Artistic Culture",
    credits: 3,
  },
  { name: "Mỹ thuật học", englishName: "Art Studies", credits: 3 },
  { name: "Thiết kế cộng đồng", englishName: "Social Design", credits: 3 },
  { name: "Thiết kế trải nghiệm người dùng", englishName: "User Experience Design", credits: 3 },
  {
    name: "Phương pháp nghiên cứu lịch sử Mỹ thuật",
    englishName: "Methods of Studying History of Arts",
    credits: 3,
    elective: true,
  },
  { name: "Tâm lý thiết kế", englishName: "Psychology of Design", credits: 3, elective: true },
  {
    name: "Phương tiện truyền thông tích hợp",
    englishName: "Integrated Media",
    credits: 3,
    elective: true,
  },
  {
    name: "Thiết kế sản phẩm tương tác",
    englishName: "Interaction Design",
    credits: 3,
    elective: true,
  },
  {
    name: "Công nghệ và chất liệu",
    englishName: "Technology and Materials",
    credits: 3,
    elective: true,
  },
  { name: "Tư duy thiết kế", englishName: "Design Thinking", credits: 3, elective: true },
];

const appliedArtsGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 3 },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getMyThuatUngDungCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        {
          title: "Kiến thức chung",
          englishTitle: "General knowledge",
          courses: appliedArtsGeneralCourses,
        },
        {
          title: "Kiến thức cơ sở ngành",
          englishTitle: "Foundation knowledge",
          courses: appliedArtsFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: appliedArtsSpecialisedCourses,
        },
        {
          title: "Điều kiện bắt buộc",
          englishTitle: "Mandatory Requirements",
          courses: appliedArtsMandatoryRequirements,
        },
        {
          title: "Chuyên đề, Thực tập & Đề án tốt nghiệp",
          englishTitle: "Capstone, Internship & Graduation Project",
          courses: appliedArtsGraduationCourses,
        },
      ],
    },
  ];
}
