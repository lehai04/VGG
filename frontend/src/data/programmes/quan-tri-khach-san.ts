// Nguồn: thac-si-quan-tri-khach-san.html do người dùng cung cấp.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";
export const quanTriKhachSanPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển năng lực quản trị chiến lược, vận hành, tài chính, công nghệ và trải nghiệm khách hàng trong ngành khách sạn theo hướng đổi mới và bền vững.",
    heroSlogan: "FUTURE",
    heroImage: "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/VLU_1221_24b43bd3f0.jpg",
    imageAlt: "Hoạt động thực hành và trải nghiệm ngành khách sạn tại Trường Đại học Văn Lang",
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "8810201",
      },
      {
        label: "Khối lượng",
        value: "60 tín chỉ",
      },
      {
        label: "Định hướng",
        value: "Ứng dụng",
      },
      {
        label: "Thời gian",
        value: "18–24 tháng",
      },
      {
        label: "Hình thức · Ngôn ngữ",
        value: "Chính quy · Tiếng Việt",
      },
      {
        label: "Học phí toàn khóa",
        value: "85.000.000 đồng",
      },
    ],
  },
  section01: {
    ...programmeSharedContent.overview,
    sectionNumber: "01",
    overviewTitle: "Tổng quan chương trình",
    headline: "Kiến thức chuyên sâu. Năng lực tạo tác động.",
    overview: [
      "Chương trình trang bị kiến thức chuyên sâu về vận hành khách sạn, tài chính, doanh thu, nhân lực quốc tế, marketing và công nghệ số. Các học phần được đặt trong bối cảnh toàn cầu hóa, biến động thị trường và yêu cầu phát triển bền vững.",
      "Theo kế hoạch tuyển sinh 2027, chương trình tuyển định hướng ứng dụng, với học phần thực tập 6 tín chỉ và đề án tốt nghiệp 9 tín chỉ. Hoạt động trải nghiệm và học qua dự án giúp người học tiếp cận bài toán thực tế của doanh nghiệp khách sạn.",
    ],
    overviewImage: "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/VLU_1221_24b43bd3f0.jpg",
    imageCredit: {
      text: "Hoạt động học thuật · Trường Đại học Văn Lang",
    },
    tags: [],
  },
  section02: {
    ...programmeSharedContent.highlights,
    sectionNumber: "02",
    highlights: [
      {
        title: "Vận hành và trải nghiệm",
        text: "Cải tiến quy trình vận hành và tối ưu hóa trải nghiệm khách hàng.",
      },
      {
        title: "Tài chính và doanh thu",
        text: "Phân tích phương án tài chính, doanh thu và hiệu quả kinh doanh.",
      },
      {
        title: "Công nghệ và ESG",
        text: "Ứng dụng công nghệ số, chuyển đổi xanh và quản trị bền vững.",
      },
      {
        title: "Kết nối doanh nghiệp",
        text: "Thực tập, dự án phát triển khách sạn và đồng giảng dạy với chuyên gia.",
      },
    ],
    outcomesHeading: "Chuẩn đầu ra của chương trình",
    learningOutcomes: {
      intro: "",
      items: [
        {
          code: "PLO 1",
          title: "",
          text: "Đánh giá kiến thức chuyên ngành trong quản lý và vận hành khách sạn.",
        },
        {
          code: "PLO 2",
          title: "",
          text: "Đề xuất giải pháp nâng cao hiệu quả và phát triển bền vững.",
        },
        {
          code: "PLO 3",
          title: "",
          text: "Phát triển nghiên cứu ứng dụng và giải quyết vấn đề thực tiễn.",
        },
        {
          code: "PLO 4",
          title: "",
          text: "Tối ưu chiến lược kinh doanh và mô hình vận hành.",
        },
        {
          code: "PLO 5",
          title: "",
          text: "Hình thành tư duy đổi mới sáng tạo.",
        },
        {
          code: "PLO 6",
          title: "",
          text: "Tuân thủ pháp luật, đạo đức nghề nghiệp và tự chủ học tập.",
        },
      ],
    },
  },
  section03: {
    sectionNumber: "03",
    audienceHeading: "Chương trình phù hợp với ai?",
    headline: "Nền tảng phù hợp cho lộ trình sau đại học.",
    intro: ["Điều kiện cụ thể được xác định trên cơ sở văn bằng, bảng điểm và định hướng đăng ký."],
    audience: [],
    requirements: [
      {
        title: "Ngành tốt nghiệp có phù hợp?",
        paragraphs: [
          "Miễn bổ sung: Quản trị khách sạn; Quản trị nhà hàng và dịch vụ ăn uống; Quản trị dịch vụ du lịch và lữ hành; Du lịch.",
          "Ngành gần: Quản trị kinh doanh, Marketing, Kinh doanh quốc tế, Kinh doanh thương mại, Kinh tế, Kinh tế phát triển — học Tổng quan du lịch, Quản trị dịch vụ bổ sung, Quản trị tiền sảnh (3 tín chỉ/học phần).",
        ],
      },
      {
        title: "Yêu cầu ngoại ngữ đầu vào",
        paragraphs: [
          "Ứng viên Việt Nam cần đáp ứng ngoại ngữ đầu vào từ Bậc 3/6 hoặc minh chứng tương đương được Trường công nhận. Công dân nước ngoài học chương trình tiếng Việt cần đạt tiếng Việt từ Bậc 4 hoặc tốt nghiệp chương trình đào tạo bằng tiếng Việt.",
        ],
      },
      {
        title: "Bổ sung kiến thức đầu vào",
        paragraphs: [
          "Lưu ý: học phần bổ sung kiến thức không tính vào 60 tín chỉ của chương trình thạc sĩ.",
        ],
        groups: [
          {
            title: "01. Nhóm không cần bổ sung kiến thức",
            paragraphs: [
              "Miễn bổ sung: Quản trị khách sạn; Quản trị nhà hàng và dịch vụ ăn uống; Quản trị dịch vụ du lịch và lữ hành; Du lịch.",
            ],
          },
          {
            title: "02. Các hồ sơ cần bổ sung kiến thức",
            paragraphs: [
              "Ngành gần: Quản trị kinh doanh, Marketing, Kinh doanh quốc tế, Kinh doanh thương mại, Kinh tế, Kinh tế phát triển — học Tổng quan du lịch, Quản trị dịch vụ bổ sung, Quản trị tiền sảnh (3 tín chỉ/học phần).",
              "Ngành khác: học thêm Marketing du lịch, tổng cộng 12 tín chỉ.",
            ],
          },
        ],
      },
    ],
  },
  section04: {
    sectionNumber: "04",
    careerHeading: "Cơ hội nghề nghiệp và phát triển",
    headline: "Mở rộng vai trò chuyên môn và quản lý.",
    careerImage: "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/VLU_1221_24b43bd3f0.jpg",
    careers: [
      {
        title: "Quản lý khách sạn và khu nghỉ dưỡng",
        sub: "Đảm nhiệm vị trí quản lý cấp trung, cấp cao hoặc giám đốc bộ phận.",
      },
      {
        title: "Phát triển dự án",
        sub: "Quản lý dự án phát triển khách sạn, khu nghỉ dưỡng và doanh nghiệp dịch vụ.",
      },
      {
        title: "Tư vấn chiến lược",
        sub: "Tư vấn vận hành, tài chính, doanh thu, thương hiệu và trải nghiệm khách hàng.",
      },
      {
        title: "Nghiên cứu và đào tạo",
        sub: "Giảng dạy, nghiên cứu hoặc tiếp tục học ở bậc tiến sĩ.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "4 tín chỉ kiến thức chung; 18 tín chỉ cơ sở; 17 tín chỉ chuyên ngành bắt buộc; chọn 2/4 học phần tự chọn (6 tín chỉ); thực tập 6 tín chỉ và đề án 9 tín chỉ.",
    ],
    trackLabels: ["Định hướng ứng dụng"],
    graduationProjects: ["Đề án tốt nghiệp · 9 tín chỉ"],
    studyMode: "Chính quy tập trung",
    notes: [
      "60 tín chỉ theo lộ trình rõ ràng.",
      "Lộ trình mẫu: Học kỳ 1–3 hoàn thành học phần; học kỳ 4–5 dành cho thực tập và đề án tốt nghiệp.",
    ],
    generalFacts: [
      {
        label: "Thời gian đào tạo",
        value: "18–24 tháng",
      },
      {
        label: "Hình thức · Ngôn ngữ",
        value: "Chính quy · Tiếng Việt",
      },
    ],
    completion: {
      heading: "Thực tập và đề án tốt nghiệp",
      items: [
        "Thực tập (Internship) · 6 tín chỉ",
        "Đề án tốt nghiệp(Applied Graduation Project) · 9 tín chỉ",
      ],
    },
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody: "Trao đổi về chương trình Quản trị khách sạn, điều kiện đầu vào và lộ trình đăng ký.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ mục tiêu học tập của bạn."],
      body: "Trao đổi về chương trình Quản trị khách sạn, điều kiện đầu vào và lộ trình đăng ký.",
      benefits: [],
      formTitle: "Trao đổi trực tiếp với Viện",
    },
  },
  faq: {
    ...programmeSharedContent.faq,
    faqs: [
      {
        question: "Năm 2027 tuyển định hướng nào?",
        answer: "Chương trình tuyển sinh theo định hướng ứng dụng trong kế hoạch năm 2027.",
      },
      {
        question: "Ngành nào không cần bổ sung kiến thức?",
        answer:
          "Miễn bổ sung: Quản trị khách sạn; Quản trị nhà hàng và dịch vụ ăn uống; Quản trị dịch vụ du lịch và lữ hành; Du lịch.",
      },
      {
        question: "Ngành gần phải học những môn nào?",
        answer:
          "Ngành gần: Quản trị kinh doanh, Marketing, Kinh doanh quốc tế, Kinh doanh thương mại, Kinh tế, Kinh tế phát triển — học Tổng quan du lịch, Quản trị dịch vụ bổ sung, Quản trị tiền sảnh (3 tín chỉ/học phần).",
      },
      {
        question: "Chương trình có thực tập không?",
        answer: "Có. Chương trình bố trí học phần thực tập 6 tín chỉ trước phần đề án tốt nghiệp.",
      },
      {
        question: "Học phí toàn khóa là bao nhiêu?",
        answer:
          "Học phí toàn khóa là 85.000.000 đồng, chia thành ba đợt 30.000.000 đồng, 25.000.000 đồng và 30.000.000 đồng.",
      },
      {
        question: "Thời gian đào tạo bao lâu?",
        answer:
          "Thời gian đào tạo chuẩn là 18–24 tháng, tùy tiến độ hoàn thành học phần và phần tốt nghiệp.",
      },
    ],
  },
  fees: {
    heading: "Chủ động chuẩn bị cho hành trình học.",
    intro: ["Học phí toàn khóa được chia thành ba đợt theo thông báo tuyển sinh thạc sĩ 2027."],
    intake: "TUYỂN SINH THẠC SĨ 2027",
    language: "Tiếng Việt",
    total: "85.000.000 đồng",
    installments: [
      {
        label: "Đợt 1",
        amount: "30.000.000 đồng",
      },
      {
        label: "Đợt 2",
        amount: "25.000.000 đồng",
      },
      {
        label: "Đợt 3",
        amount: "30.000.000 đồng",
      },
    ],
    additionalFees: [
      {
        title: "Lệ phí xét tuyển",
        amount: "500.000 đồng",
        note: "",
      },
      {
        title: "Lệ phí nhập học",
        amount: "1.000.000 đồng",
        note: "",
      },
      {
        title: "Học bổ sung kiến thức",
        amount: "1.200.000 đồng/môn",
        note: "",
      },
      {
        title: "Ôn thi tiếng Anh đầu vào",
        amount: "1.000.000 đồng",
        note: "",
      },
      {
        title: "Thi tiếng Anh đầu vào",
        amount: "750.000 đồng",
        note: "",
      },
    ],
    notes: ["Chưa trừ học bổng, hỗ trợ và chưa gồm các khoản thu riêng."],
  },
};
export const quanTriKhachSanProgramme: Programme = {
  id: "quan-tri-khach-san",
  code: "8810201",
  title: "Quản trị Khách sạn",
  englishTitle: "Master of Hospitality Management",
  degree: "Thạc sĩ",
  field: "Du lịch & Khách sạn",
  orientation: "Ứng dụng",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy · Tiếng Việt",
  summary:
    "Phát triển năng lực quản trị chiến lược, vận hành, tài chính, công nghệ và trải nghiệm khách hàng trong ngành khách sạn theo hướng đổi mới và bền vững.",
  tuition: "85.000.000 VNĐ",
  intake: "Tuyển sinh thạc sĩ 2027",
};
export function getQuanTriKhachSanCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "18–24 tháng · 60 tín chỉ",
      graduationProject: "Đề án tốt nghiệp · 9 tín chỉ",
      intro:
        "4 tín chỉ kiến thức chung; 18 tín chỉ cơ sở; 17 tín chỉ chuyên ngành bắt buộc; chọn 2/4 học phần tự chọn (6 tín chỉ); thực tập 6 tín chỉ và đề án 9 tín chỉ.",
      notes: [
        "60 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Học kỳ 1–3 hoàn thành học phần; học kỳ 4–5 dành cho thực tập và đề án tốt nghiệp.",
      ],
      generalFacts: [
        {
          label: "Thời gian đào tạo",
          value: "18–24 tháng",
        },
        {
          label: "Hình thức · Ngôn ngữ",
          value: "Chính quy · Tiếng Việt",
        },
      ],
      groups: [
        {
          title: "I. Kiến thức chung",
          totalCreditsLabel: "4 tín chỉ",
          courses: [
            {
              code: "81PHIL1014",
              name: "Triết học(Philosophy)",
              credits: 4,
            },
          ],
        },
        {
          title: "II. Kiến thức cơ sở",
          totalCreditsLabel: "18 tín chỉ",
          courses: [
            {
              code: "81TTHR7034",
              name: "Phương pháp nghiên cứu trong du lịch(Research Methods in Tourism)",
              credits: 4,
            },
            {
              code: "81TTHR7084",
              name: "Marketing nâng cao trong du lịch - khách sạn (Advanced Marketing in Tourism and Hospitality)",
              credits: 4,
            },
            {
              code: "81TTHR7063",
              name: "Quản trị bền vững và ESG trong du lịch - khách sạn (Sustainable and ESG Management in Tourism & Hospitality)",
              credits: 3,
            },
            {
              code: "81TTHR7074",
              name: "Quản trị nhân lực quốc tế trong du lịch(International Human Resource Management in Tourism)",
              credits: 4,
            },
            {
              code: "81TTHR7053",
              name: "Kinh tế du lịch(Tourism Economics)",
              credits: 3,
            },
          ],
        },
        {
          title: "III. Chuyên ngành bắt buộc",
          totalCreditsLabel: "17 tín chỉ",
          courses: [
            {
              code: "81TTHR7233",
              name: "Quản trị vận hành khách sạn(Hospitality Operations Management)",
              credits: 3,
            },
            {
              code: "81TTHR7044",
              name: "Quản trị tài chính trong doanh nghiệp du lịch - khách sạn(Financial Management in Tourism and Hospitality Enterprises)",
              credits: 4,
            },
            {
              code: "81TTHR7093",
              name: "Ứng dụng công nghệ số trong du lịch - khách sạn(Digital Technology in Tourism and Hospitality)",
              credits: 3,
            },
            {
              code: "81HOSP7113",
              name: "Quản trị chiến lược nâng cao trong khách sạn(Advanced Strategic Management in Hospitality)",
              credits: 3,
            },
            {
              code: "81HOSP7104",
              name: "Dự án phát triển khách sạn(Hospitality Development Project)",
              credits: 4,
            },
          ],
        },
        {
          title: "IV. Chuyên ngành tự chọn",
          totalCreditsLabel: "6 tín chỉ",
          courses: [
            {
              code: "81HOSP7153",
              name: "Quản trị doanh thu khách sạn (Hospitality Revenue Management)",
              credits: 3,
              elective: true,
            },
            {
              code: "81TTHR7123",
              name: "Quản trị rủi ro và xử lý khủng hoảng trong du lịch(Risk and Crisis Management in Tourism)",
              credits: 3,
              elective: true,
            },
            {
              code: "81TTHR7133",
              name: "Quản trị dịch vụ cao cấp (Luxury Service Management)",
              credits: 3,
              elective: true,
            },
            {
              code: "81HOSP7143",
              name: "Lãnh đạo hiệu quả trong môi trường đa văn hóa(Effective Leadership in a Multicultural Environment)",
              credits: 3,
              elective: true,
            },
          ],
          description: ["Chọn 2/4 học phần tự chọn (6 tín chỉ)."],
        },
        {
          title: "V. Thực tập và đề án",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              code: "81TTHR7166",
              name: "Thực tập (Internship)",
              credits: 6,
            },
            {
              code: "81TTHR7179",
              name: "Đề án tốt nghiệp(Applied Graduation Project)",
              credits: 9,
            },
          ],
        },
      ],
      completion: {
        heading: "Thực tập và đề án tốt nghiệp",
        items: [
          "Thực tập (Internship) · 6 tín chỉ",
          "Đề án tốt nghiệp(Applied Graduation Project) · 9 tín chỉ",
        ],
      },
    },
  ];
}
