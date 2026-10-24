// Nguồn: thac-si-quan-ly-tai-nguyen-va-moi-truong.html do người dùng cung cấp.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";
export const quanLyTaiNguyenMoiTruongPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển năng lực nghiên cứu, phân tích dữ liệu và đề xuất giải pháp quản lý tài nguyên, môi trường theo hướng tăng trưởng xanh, thích ứng biến đổi khí hậu.",
    heroSlogan: "FUTURE",
    heroImage:
      "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/296673760_3424521084455298_2982558230818820073_n_207fc67abf.jpg",
    imageAlt: "Hoạt động học tập và nghiên cứu môi trường tại Trường Đại học Văn Lang",
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "8850101",
      },
      {
        label: "Khối lượng",
        value: "60 tín chỉ",
      },
      {
        label: "Định hướng",
        value: "Nghiên cứu",
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
      "Chương trình cung cấp kiến thức chuyên sâu về quản lý chất lượng môi trường, sử dụng tài nguyên hiệu quả, chính sách, kinh tế môi trường và các công cụ phân tích hiện đại. Nội dung gắn với phát triển bền vững, tăng trưởng xanh và thích ứng biến đổi khí hậu.",
      "Theo danh mục tuyển sinh 2027, chương trình tuyển định hướng nghiên cứu. Khối tốt nghiệp gồm chuyên đề nghiên cứu và luận văn, tạo nền tảng cho công việc chuyên gia, nghiên cứu, giảng dạy hoặc học tiếp tiến sĩ.",
    ],
    overviewImage:
      "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/296673760_3424521084455298_2982558230818820073_n_207fc67abf.jpg",
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
        title: "Quản lý tích hợp",
        text: "Kết nối tài nguyên, chất lượng môi trường, chính sách và quy hoạch.",
      },
      {
        title: "Dữ liệu và công nghệ",
        text: "Ứng dụng mô hình hóa, GIS, phân tích dữ liệu và trí tuệ nhân tạo.",
      },
      {
        title: "Tăng trưởng xanh",
        text: "Giải quyết bài toán biến đổi khí hậu, carbon và phát triển bền vững.",
      },
      {
        title: "Nghiên cứu chuyên sâu",
        text: "30 tín chỉ dành cho chuyên đề nghiên cứu và luận văn tốt nghiệp.",
      },
    ],
    outcomesHeading: "Chuẩn đầu ra của chương trình",
    learningOutcomes: {
      intro: "",
      items: [
        {
          code: "PLO 1",
          title: "",
          text: "Đề xuất giải pháp quản lý chất lượng môi trường phù hợp bối cảnh phát triển.",
        },
        {
          code: "PLO 2",
          title: "",
          text: "Xây dựng giải pháp tích hợp để quản lý và sử dụng tài nguyên hiệu quả.",
        },
        {
          code: "PLO 3",
          title: "",
          text: "Phát triển giải pháp đáp ứng mục tiêu bền vững và thích ứng biến đổi khí hậu.",
        },
        {
          code: "PLO 4",
          title: "",
          text: "Sử dụng công cụ tính toán và thiết bị để phân tích, đánh giá số liệu.",
        },
        {
          code: "PLO 5",
          title: "",
          text: "Vận dụng tư duy phản biện, sáng tạo và truyền đạt tri thức chuyên môn.",
        },
        {
          code: "PLO 6",
          title: "",
          text: "Sử dụng tiếng Anh trong học tập và nghiên cứu ở Bậc 4.",
        },
        {
          code: "PLO 7",
          title: "",
          text: "Đưa ra sáng kiến và thích nghi linh hoạt trong nghiên cứu.",
        },
        {
          code: "PLO 8",
          title: "",
          text: "Quản lý, đánh giá, cải tiến và kết luận mang tính chuyên gia.",
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
          "Ngành phù hợp dự tuyển trực tiếp: Khoa học môi trường, Công nghệ kỹ thuật môi trường, Kỹ thuật môi trường, Quản lý tài nguyên và môi trường, Kinh tế tài nguyên thiên nhiên, Kỹ thuật tài nguyên nước.",
          "Nhóm ngành gần: các ngành quản lý, sinh học, hóa học, địa chất, vật liệu, quy hoạch, xây dựng, nông–lâm–ngư nghiệp, quản lý đất đai, bảo hộ lao động, luật và các ngành liên quan trong danh mục CTĐT.",
        ],
      },
      {
        title: "Yêu cầu ngoại ngữ đầu vào",
        paragraphs: [
          "Ứng viên Việt Nam cần đáp ứng ngoại ngữ đầu vào từ Bậc 3/6 hoặc minh chứng tương đương được Trường công nhận. Công dân nước ngoài học chương trình tiếng Việt cần đạt tiếng Việt từ Bậc 4 hoặc tốt nghiệp chương trình đào tạo bằng tiếng Việt.",
        ],
      },
      {
        title: "Điều kiện định hướng nghiên cứu",
        paragraphs: [
          "Định hướng nghiên cứu: tốt nghiệp từ loại Khá trở lên hoặc có công bố khoa học liên quan.",
        ],
      },
      {
        title: "Bổ sung kiến thức đầu vào",
        paragraphs: [
          "Lưu ý: học phần bổ sung kiến thức không tính vào 60 tín chỉ của chương trình thạc sĩ.",
        ],
        groups: [
          {
            title: "01. Ngành phù hợp",
            paragraphs: [
              "Ngành phù hợp dự tuyển trực tiếp: Khoa học môi trường, Công nghệ kỹ thuật môi trường, Kỹ thuật môi trường, Quản lý tài nguyên và môi trường, Kinh tế tài nguyên thiên nhiên, Kỹ thuật tài nguyên nước.",
            ],
          },
          {
            title: "02. Đối chiếu hồ sơ và danh mục bổ sung",
            paragraphs: [
              "Nhóm ngành gần: các ngành quản lý, sinh học, hóa học, địa chất, vật liệu, quy hoạch, xây dựng, nông–lâm–ngư nghiệp, quản lý đất đai, bảo hộ lao động, luật và các ngành liên quan trong danh mục CTĐT.",
              "Bổ sung kiến thức: Quản lý môi trường: Giải pháp cho các đô thị thông minh (2 tín chỉ); Đánh giá tác động môi trường (3 tín chỉ); Luật và chính sách môi trường (3 tín chỉ). Học phần đã học tương đương được xem xét miễn.",
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
    careerImage:
      "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/296673760_3424521084455298_2982558230818820073_n_207fc67abf.jpg",
    careers: [
      {
        title: "Quản lý và tư vấn",
        sub: "Quản lý doanh nghiệp hoặc cung cấp dịch vụ, tư vấn tài nguyên và môi trường.",
      },
      {
        title: "Phân tích chuyên môn",
        sub: "Chuyên gia phân tích dữ liệu, chính sách, rủi ro và chất lượng môi trường.",
      },
      {
        title: "Nghiên cứu và giảng dạy",
        sub: "Làm việc tại viện nghiên cứu, cơ sở giáo dục và các dự án khoa học.",
      },
      {
        title: "Phát triển học thuật",
        sub: "Tiếp tục học chương trình tiến sĩ trong và ngoài nước.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "3 tín chỉ kiến thức chung; 11–16 tín chỉ kiến thức cơ sở; 11 tín chỉ chuyên ngành bắt buộc; nhóm tự chọn theo quy tắc của chương trình; 15 tín chỉ chuyên đề nghiên cứu và 15 tín chỉ luận văn.",
    ],
    trackLabels: ["Định hướng nghiên cứu"],
    graduationProjects: ["Luận văn tốt nghiệp · 15 tín chỉ"],
    studyMode: "Chính quy tập trung",
    notes: [
      "60 tín chỉ theo lộ trình rõ ràng.",
      "Lộ trình mẫu: Ba học kỳ đầu hoàn thành học phần và đề cương; giai đoạn cuối dành cho chuyên đề nghiên cứu và luận văn tối thiểu 6 tháng.",
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
      heading: "Luận văn tốt nghiệp",
      items: [
        "Chuyên đề nghiên cứu · Research Seminar · 15 tín chỉ",
        "Luận văn tốt nghiệp Graduation Thesis · 15 tín chỉ",
      ],
    },
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody:
      "Trao đổi về chương trình Quản lý tài nguyên và môi trường, điều kiện đầu vào và lộ trình đăng ký.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ mục tiêu học tập của bạn."],
      body: "Trao đổi về chương trình Quản lý tài nguyên và môi trường, điều kiện đầu vào và lộ trình đăng ký.",
      benefits: [],
      formTitle: "Trao đổi trực tiếp với Viện",
    },
  },
  faq: {
    ...programmeSharedContent.faq,
    faqs: [
      {
        question: "Năm 2027 tuyển định hướng nào?",
        answer: "Chương trình tuyển sinh theo định hướng nghiên cứu trong kế hoạch năm 2027.",
      },
      {
        question: "Ngành nào được dự tuyển trực tiếp?",
        answer:
          "Ngành phù hợp dự tuyển trực tiếp: Khoa học môi trường, Công nghệ kỹ thuật môi trường, Kỹ thuật môi trường, Quản lý tài nguyên và môi trường, Kinh tế tài nguyên thiên nhiên, Kỹ thuật tài nguyên nước.",
      },
      {
        question: "Các học phần bổ sung gồm những gì?",
        answer:
          "Bổ sung kiến thức: Quản lý môi trường: Giải pháp cho các đô thị thông minh (2 tín chỉ); Đánh giá tác động môi trường (3 tín chỉ); Luật và chính sách môi trường (3 tín chỉ). Học phần đã học tương đương được xem xét miễn.",
      },
      {
        question: "Yêu cầu ngoại ngữ đầu vào ra sao?",
        answer:
          "Ứng viên Việt Nam cần đáp ứng ngoại ngữ đầu vào từ Bậc 3/6 hoặc minh chứng tương đương được Trường công nhận; công dân nước ngoài học bằng tiếng Việt cần đạt tiếng Việt từ Bậc 4 hoặc tốt nghiệp chương trình bằng tiếng Việt.",
      },
      {
        question: "Khối tốt nghiệp gồm bao nhiêu tín chỉ?",
        answer:
          "Định hướng nghiên cứu dành 30 tín chỉ cho chuyên đề nghiên cứu và luận văn tốt nghiệp, mỗi phần 15 tín chỉ.",
      },
      {
        question: "Học phí toàn khóa là bao nhiêu?",
        answer:
          "Học phí toàn khóa là 85.000.000 đồng, chia thành ba đợt 30.000.000 đồng, 25.000.000 đồng và 30.000.000 đồng.",
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
export const quanLyTaiNguyenMoiTruongProgramme: Programme = {
  id: "quan-ly-tai-nguyen-moi-truong",
  code: "8850101",
  title: "Quản lý Tài nguyên và Môi trường",
  englishTitle: "Master of Natural Resources and Environmental Management",
  degree: "Thạc sĩ",
  field: "Kỹ thuật, Môi trường & Công nghệ",
  orientation: "Nghiên cứu",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy · Tiếng Việt",
  summary:
    "Phát triển năng lực nghiên cứu, phân tích dữ liệu và đề xuất giải pháp quản lý tài nguyên, môi trường theo hướng tăng trưởng xanh, thích ứng biến đổi khí hậu.",
  tuition: "85.000.000 VNĐ",
  intake: "Tuyển sinh thạc sĩ 2027",
};
export function getQuanLyTaiNguyenMoiTruongCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng nghiên cứu",
      orientation: "Nghiên cứu",
      subtitle: "18–24 tháng · 60 tín chỉ",
      graduationProject: "Luận văn tốt nghiệp · 15 tín chỉ",
      intro:
        "3 tín chỉ kiến thức chung; 11–16 tín chỉ kiến thức cơ sở; 11 tín chỉ chuyên ngành bắt buộc; nhóm tự chọn theo quy tắc của chương trình; 15 tín chỉ chuyên đề nghiên cứu và 15 tín chỉ luận văn.",
      notes: [
        "60 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Ba học kỳ đầu hoàn thành học phần và đề cương; giai đoạn cuối dành cho chuyên đề nghiên cứu và luận văn tối thiểu 6 tháng.",
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
          title: "Danh mục học phần và lựa chọn",
          totalCreditsLabel: "Theo cơ cấu chương trình",
          description: [
            "Danh mục dưới đây gồm học phần và các lựa chọn theo cơ cấu chương trình; không phải tất cả học phần trong danh mục đều bắt buộc. Quy tắc lựa chọn theo phần tóm tắt chương trình.",
          ],
          courses: [
            {
              code: "81PHIL60013",
              name: "Triết học · Philosophy",
              credits: 3,
            },
            {
              code: "81CCGG70023",
              name: "Biến đổi khí hậu và tăng trưởng xanh · Climate Change and Green Growth",
              credits: 3,
            },
            {
              code: "81ENMO70033",
              name: "Mô hình hóa môi trường · Environmental Modeling",
              credits: 3,
            },
            {
              code: "81REME70053",
              name: "Phương pháp nghiên cứu khoa học · Research Methodology",
              credits: 3,
            },
            {
              code: "81EQMA70062",
              name: "Quản lý chất lượng môi trường · Environmental Quality Management",
              credits: 2,
            },
            {
              code: "81WWAT70022",
              name: "Kỹ thuật phân tích nước và nước thải · Water and Wastewater Analytical Techniques",
              credits: 2,
            },
            {
              code: "81ENTP70103",
              name: "Độc chất học môi trường · Environmental Toxicology",
              credits: 3,
            },
            {
              code: "81APMI70122",
              name: "Vi sinh ứng dụng · Applied Microbiology",
              credits: 2,
            },
            {
              code: "81EREN70173",
              name: "Năng lượng và năng lượng tái tạo · Energy and Renewable Energy",
              credits: 3,
            },
            {
              code: "81HWTT70183",
              name: "Kỹ thuật xử lý chất thải nguy hại · Hazardous Waste Treatment Technology",
              credits: 3,
            },
            {
              code: "81NREM70042",
              name: "Chính sách quản lý tài nguyên và môi trường · Natural Resources and Environmental Management Policy",
              credits: 2,
            },
            {
              code: "81ENRE70052",
              name: "Kinh tế tài nguyên môi trường · Economic of Natural Resources and Environment",
              credits: 2,
            },
            {
              code: "81IRBM70072",
              name: "Quản lý tổng hợp lưu vực sông · Integrated River Basin Management",
              credits: 2,
            },
            {
              code: "81ESAN70083",
              name: "Phân tích hệ thống môi trường · Environmental System Analysis",
              credits: 3,
            },
            {
              code: "81RPDE70092",
              name: "Đề cương thực hiện Luận văn tốt nghiệp và bảo vệ đề cương · Research proposal and defense",
              credits: 2,
            },
            {
              code: "81ENAU70212",
              name: "Kiểm toán môi trường · Environmental Auditing",
              credits: 2,
            },
            {
              code: "81ENPL70292",
              name: "Quy hoạch môi trường · Environmental Planning",
              credits: 2,
            },
            {
              code: "81EMSS70233",
              name: "Quản lý môi trường: Giải pháp cho các đô thị thông minh · Environmental Management: Solutions for Smart Cities",
              credits: 3,
            },
            {
              code: "81REGN70243",
              name: "Viễn thám và GIS ứng dụng trong Quản lý Tài nguyên và Môi trường · Remote Sensing and GIS applied in Natural Resources and Environmental Management",
              credits: 3,
            },
            {
              code: "81IEPC70306",
              name: "Tư vấn chính sách môi trường quốc tế · International Environmental Policy Consultant",
              credits: 6,
            },
            {
              code: "81AAPC70043",
              name: "Kiểm soát ô nhiễm không khí nâng cao · Advanced Air Pollution Control Technology",
              credits: 3,
            },
            {
              code: "81AWTT70063",
              name: "Công nghệ xử lý nước thải bậc cao · Advanced Wastewater Treatment Technology",
              credits: 3,
            },
            {
              code: "81SWRT0073",
              name: "Công nghệ tái chế chất thải rắn · Solid Waste Recycling Technology",
              credits: 3,
            },
            {
              code: "81MTAP70193",
              name: "Công nghệ màng và ứng dụng · Membrane Technology and Applications",
              credits: 3,
            },
            {
              code: "81ERIA70203",
              name: "Đánh giá rủi ro và đánh giá tác động môi trường Envionmental Risk and Impact Assessment",
              credits: 3,
            },
            {
              code: "81AEED70213",
              name: "Phân tích và đánh giá dữ liệu môi trường · Analysis and Evaluation of Environmental Data",
              credits: 3,
            },
            {
              code: "81CMSE70313",
              name: "Quản lý carbon cho môi trường bền vững · Carbon Management for Sustainable Environment",
              credits: 3,
            },
            {
              code: "81AIAE770323",
              name: "Ứng dụng trí tuệ nhân tạo trong môi trường · Artificial-intelligence applied in environment",
              credits: 3,
            },
          ],
        },
        {
          title: "Luận văn tốt nghiệp",
          totalCreditsLabel: "30 tín chỉ",
          courses: [
            {
              code: "81RESE703315",
              name: "Chuyên đề nghiên cứu · Research Seminar",
              credits: 15,
            },
            {
              code: "81GRTH703415",
              name: "Luận văn tốt nghiệp Graduation Thesis",
              credits: 15,
            },
          ],
        },
      ],
      completion: {
        heading: "Luận văn tốt nghiệp",
        items: [
          "Chuyên đề nghiên cứu · Research Seminar · 15 tín chỉ",
          "Luận văn tốt nghiệp Graduation Thesis · 15 tín chỉ",
        ],
      },
    },
  ];
}
