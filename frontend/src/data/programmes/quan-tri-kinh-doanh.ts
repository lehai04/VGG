// Nguồn: thac-si-quan-tri-kinh-doanh.html do người dùng cung cấp.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";
export const quanTriKinhDoanhPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Nâng cao năng lực quản trị, phân tích kinh doanh và lãnh đạo trong môi trường số; vận dụng dữ liệu, công nghệ và tư duy bền vững vào quyết định doanh nghiệp.",
    heroSlogan: "FUTURE",
    heroImage:
      "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/301263367_3443014019272671_6239498181410589711_n_dc2ed10970.jpg",
    imageAlt: "Không gian trao đổi chuyên môn kinh doanh tại Trường Đại học Văn Lang",
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "8340101",
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
      "Chương trình phát triển kiến thức chuyên sâu về chiến lược, tài chính, con người, vận hành, chuỗi cung ứng và marketing trong bối cảnh toàn cầu hóa. Người học được rèn luyện phương pháp nghiên cứu, phân tích dữ liệu và năng lực ra quyết định có trách nhiệm.",
      "Theo kế hoạch tuyển sinh 2027, chương trình tuyển định hướng ứng dụng. Lộ trình kết nối học phần nền tảng với các chủ đề chuyển đổi số, dữ liệu lớn, khởi nghiệp và đề án giải quyết vấn đề thực tế.",
    ],
    overviewImage:
      "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/301263367_3443014019272671_6239498181410589711_n_dc2ed10970.jpg",
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
        title: "Chiến lược và chuyển đổi số",
        text: "Phân tích bối cảnh số, mô hình kinh doanh và lợi thế cạnh tranh.",
      },
      {
        title: "Phân tích kinh doanh",
        text: "Khai thác dữ liệu đa nguồn và công cụ số để hỗ trợ quyết định.",
      },
      {
        title: "Lãnh đạo và vận hành",
        text: "Điều phối con người, dự án, vận hành và chuỗi cung ứng.",
      },
      {
        title: "Khởi nghiệp bền vững",
        text: "Kết nối đổi mới sáng tạo, đạo đức và phát triển bền vững.",
      },
    ],
    outcomesHeading: "Chuẩn đầu ra của chương trình",
    learningOutcomes: {
      intro: "",
      items: [
        {
          code: "PLO 1",
          title: "",
          text: "Phân tích bối cảnh kinh doanh số và toàn cầu.",
        },
        {
          code: "PLO 2",
          title: "",
          text: "Tích hợp lý thuyết, công cụ quản trị để giải quyết vấn đề.",
        },
        {
          code: "PLO 3",
          title: "",
          text: "Thiết kế nghiên cứu định tính, định lượng và phân tích dữ liệu.",
        },
        {
          code: "PLO 4",
          title: "",
          text: "Giao tiếp, lãnh đạo và hợp tác hiệu quả.",
        },
        {
          code: "PLO 5",
          title: "",
          text: "Vận dụng tư duy khởi nghiệp và tư duy số.",
        },
        {
          code: "PLO 6",
          title: "",
          text: "Tích hợp đạo đức và phát triển bền vững vào quyết định.",
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
          "Miễn bổ sung: người tốt nghiệp các ngành thuộc khối Kinh doanh và Quản lý của Trường Đại học Văn Lang.",
          "Hồ sơ khác: chương trình đánh giá bằng cấp, bảng điểm và kinh nghiệm làm việc để xác định học phần cần bổ sung; học phần đã hoàn tất hoặc kinh nghiệm liên quan được xem xét miễn tương ứng.",
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
              "Miễn bổ sung: người tốt nghiệp các ngành thuộc khối Kinh doanh và Quản lý của Trường Đại học Văn Lang.",
            ],
          },
          {
            title: "02. Các hồ sơ cần bổ sung kiến thức",
            paragraphs: [
              "Hồ sơ khác: chương trình đánh giá bằng cấp, bảng điểm và kinh nghiệm làm việc để xác định học phần cần bổ sung; học phần đã hoàn tất hoặc kinh nghiệm liên quan được xem xét miễn tương ứng.",
              "Chương trình bổ sung tối đa 12 tín chỉ: Quản trị học (3), Kinh tế học đại cương (3), Marketing (3), Nguyên lý Tài chính (3).",
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
      "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/301263367_3443014019272671_6239498181410589711_n_dc2ed10970.jpg",
    careers: [
      {
        title: "Quản lý doanh nghiệp",
        sub: "Quản lý doanh nghiệp hoặc các mảng marketing, nhân sự, vận hành, chuỗi cung ứng và dịch vụ khách hàng.",
      },
      {
        title: "Tư vấn quản trị",
        sub: "Tư vấn cho cá nhân, tổ chức về chiến lược, vận hành và kinh doanh.",
      },
      {
        title: "Khởi nghiệp",
        sub: "Xây dựng và phát triển hoạt động kinh doanh độc lập.",
      },
      {
        title: "Nghiên cứu và giảng dạy",
        sub: "Tham gia nghiên cứu, đào tạo và phát triển chuyên môn ở bậc cao hơn.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "4 tín chỉ kiến thức chung; 9 tín chỉ cơ sở; 19 tín chỉ chuyên ngành bắt buộc; chọn 13 tín chỉ trong nhóm tự chọn; 6 tín chỉ thực tập và 9 tín chỉ đề án.",
    ],
    trackLabels: ["Định hướng ứng dụng"],
    graduationProjects: ["Đề án tốt nghiệp · 9 tín chỉ"],
    studyMode: "Chính quy tập trung",
    notes: [
      "60 tín chỉ theo lộ trình rõ ràng.",
      "Lộ trình mẫu: Học kỳ I: 13 tín chỉ; học kỳ II: 18; học kỳ III: 14; học kỳ IV: thực tập và đề án 15 tín chỉ.",
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
        "Thực tập tốt nghiệp 1Internship 1 · 2 tín chỉ",
        "Thực tập tốt nghiệp 2Internship 2 · 4 tín chỉ",
        "Đề án tốt nghiệp · Final Project · 9 tín chỉ",
      ],
    },
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody: "Trao đổi về chương trình Quản trị kinh doanh, điều kiện đầu vào và lộ trình đăng ký.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ mục tiêu học tập của bạn."],
      body: "Trao đổi về chương trình Quản trị kinh doanh, điều kiện đầu vào và lộ trình đăng ký.",
      benefits: [],
      formTitle: "Trao đổi trực tiếp với Viện",
    },
  },
  faq: {
    ...programmeSharedContent.faq,
    faqs: [
      {
        question: "Năm 2027 chương trình tuyển định hướng nào?",
        answer: "Chương trình tuyển sinh theo định hướng ứng dụng trong kế hoạch năm 2027.",
      },
      {
        question: "Ai được miễn bổ sung kiến thức?",
        answer:
          "Miễn bổ sung: người tốt nghiệp các ngành thuộc khối Kinh doanh và Quản lý của Trường Đại học Văn Lang.",
      },
      {
        question: "Chương trình bổ sung tối đa bao nhiêu tín chỉ?",
        answer:
          "Hồ sơ khác: chương trình đánh giá bằng cấp, bảng điểm và kinh nghiệm làm việc để xác định học phần cần bổ sung; học phần đã hoàn tất hoặc kinh nghiệm liên quan được xem xét miễn tương ứng. Chương trình bổ sung tối đa 12 tín chỉ: Quản trị học (3), Kinh tế học đại cương (3), Marketing (3), Nguyên lý Tài chính (3).",
      },
      {
        question: "Có học phần về chuyển đổi số và dữ liệu không?",
        answer:
          "Có. Nội dung chương trình tích hợp quản trị chiến lược, chuyển đổi số, phân tích dữ liệu và các học phần kinh doanh hiện đại.",
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
export const quanTriKinhDoanhProgramme: Programme = {
  id: "quan-tri-kinh-doanh",
  code: "8340101",
  title: "Quản trị Kinh doanh",
  englishTitle: "Master of Business Administration",
  degree: "Thạc sĩ",
  field: "Kinh doanh & Quản lý",
  orientation: "Ứng dụng",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy · Tiếng Việt",
  summary:
    "Nâng cao năng lực quản trị, phân tích kinh doanh và lãnh đạo trong môi trường số; vận dụng dữ liệu, công nghệ và tư duy bền vững vào quyết định doanh nghiệp.",
  tuition: "85.000.000 VNĐ",
  intake: "Tuyển sinh thạc sĩ 2027",
};
export function getQuanTriKinhDoanhCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "18–24 tháng · 60 tín chỉ",
      graduationProject: "Đề án tốt nghiệp · 9 tín chỉ",
      intro:
        "4 tín chỉ kiến thức chung; 9 tín chỉ cơ sở; 19 tín chỉ chuyên ngành bắt buộc; chọn 13 tín chỉ trong nhóm tự chọn; 6 tín chỉ thực tập và 9 tín chỉ đề án.",
      notes: [
        "60 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Học kỳ I: 13 tín chỉ; học kỳ II: 18; học kỳ III: 14; học kỳ IV: thực tập và đề án 15 tín chỉ.",
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
              code: "81PHIL6014",
              name: "Triết học · Philosophy",
              credits: 4,
            },
          ],
        },
        {
          title: "II. Kiến thức cơ sở",
          totalCreditsLabel: "9 tín chỉ",
          courses: [
            {
              code: "81RESE6023",
              name: "Phương pháp nghiên cứu trong kinh doanh · Business Research Methods",
              credits: 3,
            },
            {
              code: "81MANA7033",
              name: "Kinh tế học cho nhà quản lý · Economics for Manager",
              credits: 3,
            },
            {
              code: "81FINA7153",
              name: "Tài chính và kế toán cho nhà quản lý · Finance and Accounting for Manager",
              credits: 3,
            },
          ],
        },
        {
          title: "III. Chuyên ngành bắt buộc",
          totalCreditsLabel: "19 tín chỉ",
          courses: [
            {
              code: "81STRA7063",
              name: "Quản lý chiến lược và chuyển đổi số · Strategic Management and Digital Transformation",
              credits: 3,
            },
            {
              code: "81MANA7073",
              name: "Quản trị Con người và Tổ chức · Managing People and Organization",
              credits: 3,
            },
            {
              code: "81OPER7113",
              name: "Quản trị vận hành và chuỗi cung ứng · Operation and Supply Chain Management",
              credits: 3,
            },
            {
              code: "81LEAD7083",
              name: "Lãnh đạo và quản trị doanh nghiệp · Leadership and Governance",
              credits: 3,
            },
            {
              code: "81BUSI7094",
              name: "Phân tích kinh doanh · Business Analytics",
              credits: 4,
            },
            {
              code: "81MARK7103",
              name: "Chiến lược Marketing trong bối cảnh toàn cầu · Marketing Strategy in the Global context",
              credits: 3,
            },
          ],
        },
        {
          title: "IV. Chuyên ngành tự chọn",
          totalCreditsLabel: "13 tín chỉ",
          courses: [
            {
              code: "81ENTR7113",
              name: "Khởi nghiệp, đổi mới sáng tạo và phát triển bền vững Enterpreneurship, Innovations and Sustainable Development",
              credits: 3,
              elective: true,
            },
            {
              code: "81DEGI7133",
              name: "Marketing kỹ thuật số · Digital Marketing",
              credits: 3,
              elective: true,
            },
            {
              code: "81CHAN7153",
              name: "Quản trị sự thay đổi · Change Management",
              credits: 3,
              elective: true,
            },
            {
              code: "81PROJ7163",
              name: "Quản lý dự án · Project Management",
              credits: 3,
              elective: true,
            },
            {
              code: "81DATA7153",
              name: "Phân tích dữ liệu lớn trong kinh doanh và quản lý · Big Data Analytics for Business and Management",
              credits: 3,
              elective: true,
            },
            {
              code: "81SPEC7173",
              name: "Chuyên đề tự chọn Special Study",
              credits: 3,
              elective: true,
            },
            {
              code: "81SEMN7171",
              name: "Các vấn đề đương đại trong Quản lý Kinh doanh 1Contemporary issues in Business & Management 1",
              credits: 1,
              elective: true,
            },
            {
              code: "81SEMN7181",
              name: "Các vấn đề đương đại trong Quản lý Kinh doanh 2Contemporary issues in Business & Management 2",
              credits: 1,
              elective: true,
            },
          ],
          description: ["Chọn 13 tín chỉ trong nhóm tự chọn."],
        },
        {
          title: "V. Thực tập và đề án",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              code: "81INTE7242",
              name: "Thực tập tốt nghiệp 1Internship 1",
              credits: 2,
            },
            {
              code: "81INTE7254",
              name: "Thực tập tốt nghiệp 2Internship 2",
              credits: 4,
            },
            {
              code: "81GRAD7269",
              name: "Đề án tốt nghiệp · Final Project",
              credits: 9,
            },
          ],
        },
      ],
      completion: {
        heading: "Thực tập và đề án tốt nghiệp",
        items: [
          "Thực tập tốt nghiệp 1Internship 1 · 2 tín chỉ",
          "Thực tập tốt nghiệp 2Internship 2 · 4 tín chỉ",
          "Đề án tốt nghiệp · Final Project · 9 tín chỉ",
        ],
      },
    },
  ];
}
