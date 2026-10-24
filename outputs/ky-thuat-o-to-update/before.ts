// ==================================================
// NGÀNH: KỸ THUẬT Ô TÔ
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme } from "../programmes";
import type { ProgrammePageContent } from "../programmes";
import type { CurriculumCourse, CurriculumGroup, CurriculumTrack } from "../curricula";

export const kyThuatOToPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Chương trình Thạc sĩ Kỹ thuật ô tô cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
      "Chương trình Thạc sĩ Kỹ thuật ô tô cung cấp kiến thức chuyên sâu, năng lực nghiên cứu và khả năng vận dụng chuyên môn để giải quyết những vấn đề thực tiễn trong lĩnh vực kỹ thuật, môi trường & công nghệ.",
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
        text: "Vận dụng kiến thức chuyên sâu để giải quyết các vấn đề phức tạp của ngành Kỹ thuật ô tô",
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
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kỹ thuật ô tô",
      },
      {
        title: "Tham gia nghiên cứu, tư vấn, hoạch định và triển khai các dự án chuyên ngành",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kỹ thuật ô tô",
      },
      {
        title: "Giảng dạy tại cơ sở đào tạo hoặc tiếp tục học tập ở trình độ cao hơn",
        sub: "Hướng đi và vai trò chuyên môn trong ngành Kỹ thuật ô tô",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình Định hướng ứng dụng ngành Kỹ thuật ô tô được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
      "Chương trình Định hướng nghiên cứu ngành Kỹ thuật ô tô được xây dựng theo chuẩn quốc tế, đáp ứng linh hoạt mục tiêu phát triển chuyên môn của người học.",
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

export const kyThuatOToProgramme: Programme = {
  id: "ky-thuat-o-to",
  code: "S-05",

  title: "Kỹ thuật ô tô",
  englishTitle: "Master of Automotive Engineering",

  degree: "Thạc sĩ",

  field: "Kỹ thuật, Môi trường & Công nghệ",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "18–24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

const automotiveResearchSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Mô phỏng và tối ưu hóa hệ thống động lực học ô tô",
    englishName: "Simulation and Optimization of Vehicle Dynamic Systems",
    credits: 3,
  },
  {
    name: "Công nghệ pin và quản lý năng lượng trong xe điện",
    englishName: "Battery Technology and Energy Management in Electric Vehicles",
    credits: 3,
  },
  {
    name: "Công nghệ xe điện (EV), xe lai và trạm sạc",
    englishName: "Electric Vehicles (EVs), Hybrids, and Charging Station Technologies",
    credits: 3,
  },
  {
    name: "Công nghệ tái chế và quản lý bền vững trong ngành ô tô",
    englishName: "Recycling and Sustainable Management in the Automotive Industry",
    credits: 3,
    elective: true,
  },
  {
    name: "Công nghệ vật liệu mới dùng trên ô tô",
    englishName: "Advanced Automotive Materials Technology",
    credits: 3,
    elective: true,
  },
  {
    name: "Nhiên liệu và năng lượng tái tạo trong giao thông vận tải",
    englishName: "Renewable Fuels and Sustainable Energy in Transportation",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản lý kỹ thuật và dịch vụ trong ngành công nghiệp ô tô",
    englishName: "Engineering and Service Management in the Automotive Industry",
    credits: 3,
    elective: true,
  },
  {
    name: "Hệ thống giao thông thông minh và công nghệ kết nối",
    englishName: "Smart Transportation Systems and Connectivity Technologies",
    credits: 3,
    elective: true,
  },
  {
    name: "Hệ thống điện - điện tử ô tô hiện đại",
    englishName: "Advanced Automotive Electrical and Electronic Systems",
    credits: 3,
    elective: true,
  },
  {
    name: "Động học lưu chất tính toán (CFD)",
    englishName: "Computational Fluid Dynamics (CFD) in Vehicle Design",
    credits: 3,
    elective: true,
  },
  {
    name: "Xe tự hành và các công nghệ liên quan",
    englishName: "Autonomous Vehicles Technologies",
    credits: 3,
    elective: true,
  },
  {
    name: "AI và ứng dụng Deep Learning trong kỹ thuật ô tô",
    englishName: "AI and Deep Learning Applications in Automotive Engineering",
    credits: 3,
    elective: true,
  },
];

const automotiveResearchFoundationCourses: CurriculumCourse[] = [
  {
    name: "Công nghệ chế tạo và lắp ráp ô tô hiện đại",
    englishName: "Advanced Automotive Manufacturing and Assembly Technology",
    credits: 3,
  },
  { name: "Phương pháp phần tử hữu hạn", englishName: "Finite Element Method (FEM)", credits: 3 },
  {
    name: "Tính toán và tối ưu hóa thiết kế hệ thống ô tô",
    englishName: "Automotive Systems Design and Optimization",
    credits: 3,
  },
  { name: "Động lực học ô tô nâng cao", englishName: "Advanced Vehicle Dynamics", credits: 3 },
  {
    name: "Kỹ thuật va chạm ô tô và phân tích an toàn",
    englishName: "Automotive Crash Engineering and Safety Analysis",
    credits: 3,
  },
  {
    name: "Mô phỏng và mô hình hóa trong thiết kế ô tô",
    englishName: "Modeling and Simulation in Automotive Design",
    credits: 3,
  },
  {
    name: "Công nghệ chẩn đoán và sửa chữa ô tô hiện đại",
    englishName: "Advanced Automotive Diagnostics and Repair",
    credits: 3,
  },
  {
    name: "Vi xử lý và hệ thống nhúng trong ô tô",
    englishName: "Microprocessors and Embedded Systems in Automotive Applications",
    credits: 3,
  },
];

const automotiveAppliedSpecialisedCourses: CurriculumCourse[] = [
  {
    name: "Mô phỏng và tối ưu hóa hệ thống động lực học ô tô",
    englishName: "Simulation and Optimization of Vehicle Dynamic Systems",
    credits: 3,
  },
  {
    name: "Công nghệ pin và quản lý năng lượng trong xe điện",
    englishName: "Battery Technology and Energy Management in Electric Vehicles",
    credits: 3,
  },
  {
    name: "Vi xử lý và hệ thống nhúng trong ô tô",
    englishName: "Microprocessors and Embedded Systems in Automotive Applications",
    credits: 3,
  },
  {
    name: "Công nghệ xe điện (EV), xe lai và trạm sạc",
    englishName: "Electric Vehicles (EVs), Hybrids, and Charging Station Technologies",
    credits: 3,
  },
  {
    name: "AI và ứng dụng Deep Learning trong kỹ thuật ô tô",
    englishName: "AI and Deep Learning Applications in Automotive Engineering",
    credits: 3,
  },
  {
    name: "Công nghệ vật liệu mới dùng trên ô tô",
    englishName: "Advanced Automotive Materials Technology",
    credits: 3,
    elective: true,
  },
  {
    name: "Nhiên liệu và năng lượng tái tạo trong giao thông vận tải",
    englishName: "Renewable Fuels and Sustainable Energy in Transportation",
    credits: 3,
    elective: true,
  },
  {
    name: "Động học lưu chất tính toán (CFD)",
    englishName: "Computational Fluid Dynamics (CFD) in Vehicle Design",
    credits: 3,
    elective: true,
  },
  {
    name: "Quản lý kỹ thuật và dịch vụ trong ngành công nghiệp ô tô",
    englishName: "Engineering and Service Management in the Automotive Industry",
    credits: 3,
    elective: true,
  },
  {
    name: "Xe tự hành và các công nghệ liên quan",
    englishName: "Autonomous Vehicles Technologies",
    credits: 3,
    elective: true,
  },
  {
    name: "Hệ thống giao thông thông minh và công nghệ kết nối",
    englishName: "Smart Transportation Systems and Connectivity Technologies",
    credits: 3,
    elective: true,
  },
  {
    name: "Hệ thống điện - điện tử ô tô hiện đại",
    englishName: "Advanced Automotive Electrical and Electronic Systems",
    credits: 3,
    elective: true,
  },
];

const automotiveAppliedFoundationCourses: CurriculumCourse[] = [
  {
    name: "Công nghệ chế tạo và lắp ráp ô tô hiện đại",
    englishName: "Advanced Automotive Manufacturing and Assembly Technology",
    credits: 3,
  },
  { name: "Phương pháp phần tử hữu hạn", englishName: "Finite Element Method (FEM)", credits: 3 },
  {
    name: "Tính toán và tối ưu hóa thiết kế hệ thống ô tô",
    englishName: "Automotive Systems Design and Optimization",
    credits: 3,
  },
  { name: "Động lực học ô tô nâng cao", englishName: "Advanced Vehicle Dynamics", credits: 3 },
  {
    name: "Kỹ thuật va chạm ô tô và phân tích an toàn",
    englishName: "Automotive Crash Engineering and Safety Analysis",
    credits: 3,
  },
  {
    name: "Mô phỏng và mô hình hóa trong thiết kế ô tô",
    englishName: "Modeling and Simulation in Automotive Design",
    credits: 3,
  },
  {
    name: "Công nghệ chẩn đoán và sửa chữa ô tô hiện đại",
    englishName: "Advanced Automotive Diagnostics and Repair",
    credits: 3,
  },
  {
    name: "Công nghệ tái chế và quản lý bền vững trong ngành ô tô",
    englishName: "Recycling and Sustainable Management in the Automotive Industry",
    credits: 3,
  },
];

const automotiveGeneralCourses: CurriculumCourse[] = [
  { name: "Triết học", englishName: "Philosophy", credits: 3 },
  {
    name: "Phương pháp nghiên cứu khoa học",
    englishName: "Scientific Research Methods",
    credits: 3,
  },
];

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getKyThuatOToCurricula(): CurriculumTrack[] {
  const generalKnowledge: CurriculumGroup = {
    title: "Kiến thức chung",
    englishTitle: "General knowledge",
    courses: automotiveGeneralCourses,
  };
  return [
    {
      number: "05",
      title: "Chương trình đào tạo ứng dụng",
      subtitle: "Applied curriculum",
      groups: [
        generalKnowledge,
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: automotiveAppliedFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: automotiveAppliedSpecialisedCourses,
        },
        {
          title: "Chuyên đề, thực tập và luận văn tốt nghiệp",
          englishTitle: "Special studies, internship and graduation requirements",
          courses: [
            {
              name: "Chuyên đề công nghệ mới trên ô tô",
              englishName: "Special Studies on Novel Automotive Technology",
              credits: 3,
            },
            {
              name: "Thực tập chuyên môn nâng cao",
              englishName: "Advanced Professional Internship",
              credits: 6,
            },
            {
              name: "Đề án tốt nghiệp",
              englishName: "Capstone project",
              credits: 6,
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
        generalKnowledge,
        {
          title: "Kiến thức cơ sở",
          englishTitle: "Foundation knowledge",
          courses: automotiveResearchFoundationCourses,
        },
        {
          title: "Kiến thức chuyên ngành",
          englishTitle: "Specialised knowledge",
          courses: automotiveResearchSpecialisedCourses,
        },
        {
          title: "Luận văn tốt nghiệp và chuyên đề nghiên cứu",
          englishTitle: "Graduation thesis and research seminars",
          courses: [
            {
              name: "Chuyên đề cơ sở ngành",
              englishName: "Special Studies on Automotive Engineering",
              credits: 3,
            },
            {
              name: "Chuyên đề công nghệ mới trên ô tô",
              englishName: "Special Studies on Novel Automotive Technology",
              credits: 3,
            },
            {
              name: "Luận văn tốt nghiệp",
              englishName: "Graduation Thesis",
              credits: 15,
            },
          ],
        },
      ],
    },
  ];
}
