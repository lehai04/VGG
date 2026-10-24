// ==================================================
// NGÀNH: LOGISTICS VÀ QUẢN LÝ CHUỖI CUNG ỨNG
// ==================================================
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumGroup, CurriculumTrack } from "../curricula";

export const logisticsProgramme: Programme = {
  id: "logistics",
  orientations: ["Ứng dụng", "Nghiên cứu"],
  code: "S-10",

  title: "Logistics và Quản lý chuỗi cung ứng",

  englishTitle: "Master of Logistics and Supply Chain Management",

  degree: "Thạc sĩ",

  field: "Kinh doanh & Quản lý",

  orientation: "Ứng dụng",

  credits: 60,

  duration: "24 tháng",

  studyMode: "Linh hoạt",

  intake: "Theo thông báo tuyển sinh",

  tuition: "85.000.000 VNĐ",
};

// NỘI DUNG MỤC 05 - CHI TIẾT HỌC PHẦN VÀ ĐỊNH HƯỚNG
export function getLogisticsCurricula(): CurriculumTrack[] {
  const sharedGroups: CurriculumGroup[] = [
    {
      title: "Kiến thức chung",
      englishTitle: "General knowledge",
      courses: [
        { name: "Triết học", englishName: "Philosophy", credits: 3 },
        {
          name: "Phương pháp nghiên cứu khoa học",
          englishName: "Scientific Research Methods",
          credits: 3,
        },
      ],
    },
    {
      title: "Kiến thức cơ sở",
      englishTitle: "Foundation knowledge",
      courses: [
        { name: "Kỹ thuật hệ thống", englishName: "Systems Engineering", credits: 3 },
        { name: "Kinh tế kỹ thuật", englishName: "Engineering Economy", credits: 3 },
        { name: "Vận trù học", englishName: "Operations Research", credits: 3 },
        { name: "Thống kê trong công nghiệp", englishName: "Industrial Statistics", credits: 3 },
        {
          name: "Kiểm soát và quản lý chất lượng",
          englishName: "Quality Control and Management",
          credits: 3,
        },
      ],
    },
    {
      title: "Kiến thức chuyên ngành",
      englishTitle: "Specialised knowledge",
      courses: [
        { name: "Quản lý thu mua", englishName: "Procurement Management", credits: 3 },
        {
          name: "Quản lý vận tải Logistics",
          englishName: "Logistics Transportation Management",
          credits: 3,
        },
        {
          name: "Hoạch định tồn kho và vật tư",
          englishName: "Inventory and Warehouse Planning",
          credits: 3,
        },
        {
          name: "Tinh gọn trong chuỗi cung ứng",
          englishName: "Lean Management in Supply Chain Systems",
          credits: 3,
        },
        {
          name: "Hệ thống thông tin quản lý",
          englishName: "Management Information Systems",
          credits: 3,
          elective: true,
        },
        {
          name: "Hoạch định nguồn lực ERP",
          englishName: "Enterprise Resources Planning",
          credits: 3,
          elective: true,
        },
        {
          name: "Kỹ thuật thiết kế mặt bằng công nghiệp",
          englishName: "Facility Layout and Planning",
          credits: 3,
          elective: true,
        },
        {
          name: "Đánh giá kinh tế và quản lý dự án",
          englishName: "Economic evaluation & Project management",
          credits: 3,
          elective: true,
        },
        {
          name: "Kế toán quản trị",
          englishName: "Management Accounting",
          credits: 3,
          elective: true,
        },
        {
          name: "Quản trị nguồn nhân lực",
          englishName: "Human Resources Management",
          credits: 3,
          elective: true,
        },
      ],
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
          title: "Thực tập tốt nghiệp và Đề án tốt nghiệp",
          englishTitle: "Graduation internship and graduation project",
          courses: [
            { name: "Thực tập tốt nghiệp", englishName: "Graduation Internship", credits: 6 },
            { name: "Đề án tốt nghiệp", englishName: "Graduation Project", credits: 9 },
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
          title: "Luận văn tốt nghiệp và chuyên đề nghiên cứu",
          englishTitle: "Graduation thesis and research seminars",
          courses: [
            {
              name: "Chuyên đề Quản lý chuỗi cung ứng 1",
              englishName: "Special topic on Supply Chain Management 1",
              credits: 6,
            },
            {
              name: "Chuyên đề Quản lý chuỗi cung ứng 2",
              englishName: "Special topic on Supply Chain Management 2",
              credits: 6,
            },
            { name: "Luận văn tốt nghiệp", englishName: "Graduation Thesis" },
          ],
        },
      ],
    },
  ];
}

export const logisticsPageContent: ProgrammePageContent = {
  // --------------------------------------------------
  // NỘI DUNG HERO
  // --------------------------------------------------
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Kiến tạo năng lực quản trị chuỗi cung ứng hiện đại dưới góc nhìn toàn cầu, từ tri thức đến thực tiễn.",
    heroTitle: "Logistics và\nQuản lý chuỗi cung ứng",
    heroSlogan: "SUPPLY CHAIN",
    heroImage:
      "https://images.unsplash.com/photo-1564035105550-e1f02aa8556b?auto=format&fit=crop&w=2400&q=85",
  },

  // --------------------------------------------------
  // NỘI DUNG THÔNG TIN NHANH
  // --------------------------------------------------
  facts: {
    ...programmeSharedContent.facts,
    displayCode: "8340101",
    displayDuration: "Theo CTĐT",
    displayTuition: "Theo thông báo",
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 01 - TỔNG QUAN CHƯƠNG TRÌNH
  // --------------------------------------------------
  section01: {
    sectionNumber: "01",
    overviewImage: "/images/pages/programmes/logistics/campus-vlu.jpg",
    overviewTitle: "Tổng quan chương trình",
    overview: [
      "Chương trình Thạc sĩ Logistics và Quản lý chuỗi cung ứng của Trường Đại học Văn Lang được thiết kế nhằm phát triển kiến thức chuyên sâu, tư duy chiến lược và năng lực quản trị trong lĩnh vực Logistics và chuỗi cung ứng.",
      "Chương trình trang bị cho người học khả năng phân tích, hoạch định, tổ chức và tối ưu hóa các hoạt động Logistics và chuỗi cung ứng; đồng thời tiếp cận các xu hướng mới như chuyển đổi số, phân tích dữ liệu, ứng dụng công nghệ và phát triển bền vững.",
      "Với hai định hướng đào tạo: ứng dụng và nghiên cứu, chương trình tạo điều kiện để người học lựa chọn lộ trình phù hợp với mục tiêu phát triển nghề nghiệp, nâng cao năng lực quản trị hoặc tiếp tục nghiên cứu chuyên sâu.",
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
        title: "Hai định hướng đào tạo linh hoạt",
        text: "Ứng dụng và nghiên cứu, đáp ứng những mục tiêu phát triển khác nhau.",
      },
      {
        title: "Kiến thức gắn với thực tiễn",
        text: "Chú trọng giải quyết các vấn đề thực tế trong Logistics và chuỗi cung ứng.",
      },
      {
        title: "Tiếp cận công nghệ và xu hướng mới",
        text: "Tích hợp phân tích dữ liệu, chuyển đổi số và phát triển bền vững trong chương trình.",
      },
      {
        title: "Đội ngũ giảng viên và mạng lưới doanh nghiệp",
        text: "Giảng viên giàu kinh nghiệm cùng cơ hội học tập, kết nối và trải nghiệm thực tế.",
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
        image:
          "https://images.unsplash.com/photo-1764795850513-fa8a469a4600?auto=format&fit=crop&w=1200&q=85",
        title: "Chuyên viên và nhà quản lý trong lĩnh vực Logistics",
        text: "Những người đang làm việc trong vận tải, kho bãi, xuất nhập khẩu, phân phối, mua hàng và quản lý chuỗi cung ứng.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1589793463357-5fb813435467?auto=format&fit=crop&w=1200&q=85",
        title: "Nhân sự trong lĩnh vực sản xuất và kinh doanh",
        text: "Những người muốn phát triển năng lực hoạch định, tối ưu vận hành, quản trị cung ứng và nâng cao hiệu quả hoạt động doanh nghiệp.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1758876021840-0209f3bd38f4?auto=format&fit=crop&w=1200&q=85",
        title: "Người mong muốn chuyển hướng hoặc phát triển nghề nghiệp",
        text: "Người tốt nghiệp đại học ở các lĩnh vực phù hợp, có định hướng chuyển sang Logistics và quản lý chuỗi cung ứng hoặc đảm nhận những vị trí yêu cầu chuyên môn cao hơn.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1758270704851-adff797a2010?auto=format&fit=crop&w=1200&q=85",
        title: "Người có định hướng nghiên cứu và giảng dạy",
        text: "Những người mong muốn phát triển năng lực nghiên cứu khoa học, tham gia giảng dạy đại học hoặc chuẩn bị cho lộ trình học tập ở trình độ tiến sĩ.",
      },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 04 - NGHỀ NGHIỆP
  // --------------------------------------------------
  section04: {
    sectionNumber: "04",
    careerImage:
      "https://images.unsplash.com/photo-1774929108280-652f82f21d9f?auto=format&fit=crop&w=1200&q=85",
    careerHeading: "Cơ hội nghề nghiệp và phát triển",
    careers: [
      {
        title: "Quản lý chuỗi cung ứng",
        sub: "Supply Chain Manager, Supply Chain Planning Manager",
      },
      {
        title: "Quản lý mua hàng và sản xuất",
        sub: "Procurement Manager, Production Planning Manager",
      },
      { title: "Quản lý Logistics", sub: "Logistics Manager, Transportation Manager" },
      { title: "Phân tích và tư vấn", sub: "Supply Chain Analyst, Logistics Consultant" },
      { title: "Quản lý vận hành", sub: "Operations Manager, Warehouse Manager" },
      { title: "Nghiên cứu và giảng dạy", sub: "Nghiên cứu viên, giảng viên, học tiếp tiến sĩ" },
    ],
  },

  // --------------------------------------------------
  // NỘI DUNG MỤC 05 - KHUNG CHƯƠNG TRÌNH
  // --------------------------------------------------
  section05: {
    sectionNumber: "05",
    curriculumIntro: [
      "Định hướng ứng dụng trang bị kiến thức chuyên sâu và kỹ năng thực hành nhằm nâng cao năng lực quản trị, giải quyết các vấn đề thực tiễn trong lĩnh vực Logistics và chuỗi cung ứng.",
      "Định hướng nghiên cứu tập trung vào phương pháp luận khoa học, năng lực phân tích sâu và kỹ năng nghiên cứu độc lập nhằm giải quyết các vấn đề học thuật và chiến lược chuỗi cung ứng.",
    ],
    trackCredits: ["Theo CTĐT (60 TC)", "Theo CTĐT (60 TC)"],
    trackDurations: ["Theo CTĐT (24 tháng)", "Theo CTĐT (24 tháng)"],
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
          "Chương trình tuyển sinh theo hình thức xét tuyển hồ sơ. Ứng viên tốt nghiệp Đại học ngành đúng, phù hợp hoặc ngành gần với ngành đăng ký dự tuyển (có thể cần bổ sung kiến thức theo quy định) và đạt chuẩn đầu vào tiếng Anh của Trường Đại học Văn Lang.",
      },
      {
        question: "Chương trình có học bổng không?",
        answer:
          "Trường Đại học Văn Lang có nhiều chính sách học bổng đa dạng từ 10% đến 30% học phí toàn khóa dành cho cựu sinh viên Văn Lang, cán bộ công tác tại các đơn vị đối tác, con thương binh - bệnh binh và học viên có thành tích xuất sắc, cùng chính sách ưu đãi giảm thêm khi đóng học phí một lần.",
      },
      {
        question: "Lịch học được sắp xếp như thế nào?",
        answer:
          "Lịch học được bố trí linh hoạt ngoài giờ hành chính (buổi tối trong tuần và cả ngày Thứ Bảy, Chủ Nhật) nhằm tạo điều kiện thuận lợi tối đa cho học viên vừa đi làm vừa nâng cao trình độ chuyên môn.",
      },
      {
        question: "Khác biệt giữa hai định hướng là gì?",
        answer:
          "Định hướng ứng dụng chú trọng giải quyết bài toán vận hành thực tế tại doanh nghiệp, kết thúc bằng Đề án tốt nghiệp. Định hướng nghiên cứu tập trung sâu vào phương pháp luận khoa học, năng lực phân tích học thuật và chuẩn bị cho học viên học tiếp lên bậc Tiến sĩ, kết thúc bằng Luận văn tốt nghiệp.",
      },
    ],
  },
};
