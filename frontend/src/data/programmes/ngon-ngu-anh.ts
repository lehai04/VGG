// Nguồn: thac-si-ngon-ngu-anh.html do người dùng cung cấp.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";
export const ngonNguAnhPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Đào sâu ngôn ngữ học ứng dụng, phương pháp giảng dạy và nghiên cứu tiếng Anh; tích hợp công nghệ số và trí tuệ nhân tạo vào môi trường giáo dục hiện đại.",
    heroSlogan: "FUTURE",
    heroImage: "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/VLU_0801_16e223fdcf.jpg",
    imageAlt: "Không gian học tập và trao đổi học thuật tại Trường Đại học Văn Lang",
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "8220201",
      },
      {
        label: "Khối lượng",
        value: "60 tín chỉ",
      },
      {
        label: "Định hướng",
        value: "Ứng dụng · Nghiên cứu",
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
      "Chương trình củng cố kiến thức chuyên sâu về ngôn ngữ học ứng dụng, phương pháp giảng dạy tiếng Anh và thiết kế nghiên cứu. Người học phát triển khả năng làm việc độc lập, tư duy sáng tạo và giải quyết vấn đề chuyên môn trong bối cảnh giáo dục đang chuyển đổi số.",
      "Định hướng ứng dụng tập trung vào thiết kế chương trình, tài liệu, thực hành giảng dạy và đề án tốt nghiệp. Định hướng nghiên cứu tăng cường phương pháp nghiên cứu định tính – định lượng và kết thúc bằng luận văn 12 tín chỉ.",
    ],
    overviewImage: "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/VLU_0801_16e223fdcf.jpg",
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
        title: "Ngôn ngữ học ứng dụng",
        text: "Phân tích các lý thuyết ngôn ngữ học và vận dụng vào nghiên cứu, giảng dạy.",
      },
      {
        title: "Giảng dạy hiện đại",
        text: "Thiết kế chương trình, tài liệu và hoạt động phù hợp với người học và bối cảnh.",
      },
      {
        title: "Công nghệ số và AI",
        text: "Tích hợp công nghệ vào thu thập, xử lý dữ liệu và nâng cao chất lượng dạy – học.",
      },
      {
        title: "Hai lộ trình chuyên sâu",
        text: "Lựa chọn đề án ứng dụng hoặc luận văn nghiên cứu theo mục tiêu nghề nghiệp.",
      },
    ],
    outcomesHeading: "Chuẩn đầu ra của chương trình",
    learningOutcomes: {
      intro: "",
      items: [
        {
          code: "PLO 1",
          title: "",
          text: "Phân tích và đánh giá lý thuyết ngôn ngữ học ứng dụng.",
        },
        {
          code: "PLO 2",
          title: "",
          text: "Vận dụng phương pháp giảng dạy hiện đại để thiết kế chương trình và tài liệu.",
        },
        {
          code: "PLO 3",
          title: "",
          text: "Tích hợp công nghệ số, trí tuệ nhân tạo vào nghiên cứu và giảng dạy.",
        },
        {
          code: "PLO 4",
          title: "",
          text: "Thiết kế đề tài nghiên cứu có giá trị học thuật và ứng dụng.",
        },
        {
          code: "PLO 5",
          title: "",
          text: "Thiết kế hoạt động giảng dạy phù hợp đối tượng và bối cảnh.",
        },
        {
          code: "PLO 6",
          title: "",
          text: "Ứng dụng công nghệ để nâng cao chất lượng dạy – học.",
        },
        {
          code: "PLO 7",
          title: "",
          text: "Thể hiện trách nhiệm và đạo đức nghề nghiệp.",
        },
        {
          code: "PLO 8",
          title: "",
          text: "Phát triển tư duy sáng tạo và năng lực tự học.",
        },
        {
          code: "PLO 9",
          title: "",
          text: "Chủ động thích ứng với chuyển đổi số.",
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
          "Miễn bổ sung: Ngôn ngữ Anh; Sư phạm Tiếng Anh.",
          "Nhóm phù hợp cần đối chiếu: Quản lý giáo dục, Giáo dục học, các ngành ngôn ngữ và văn hóa nước ngoài, Tâm lý học, Tâm lý học giáo dục, Ngôn ngữ học.",
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
          "Định hướng nghiên cứu: tốt nghiệp đại học từ loại Khá trở lên hoặc có công bố khoa học liên quan.",
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
            paragraphs: ["Miễn bổ sung: Ngôn ngữ Anh; Sư phạm Tiếng Anh."],
          },
          {
            title: "02. Đối chiếu hồ sơ và danh mục bổ sung",
            paragraphs: [
              "Nhóm phù hợp cần đối chiếu: Quản lý giáo dục, Giáo dục học, các ngành ngôn ngữ và văn hóa nước ngoài, Tâm lý học, Tâm lý học giáo dục, Ngôn ngữ học.",
              "Học phần bổ sung: Hình thái học & cú pháp học; Ngữ âm & Âm vị học; Ngữ nghĩa học; Kỹ năng Viết học thuật. Mỗi học phần được đối chiếu với bảng điểm; nhóm ngoài khối tiếng Anh cần IELTS 6.5 hoặc tương đương.",
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
    careerImage: "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/VLU_0801_16e223fdcf.jpg",
    careers: [
      {
        title: "Giảng dạy và phát triển chương trình",
        sub: "Giảng dạy tiếng Anh; thiết kế chương trình, tài liệu và đánh giá năng lực ngoại ngữ.",
      },
      {
        title: "Nghiên cứu học thuật",
        sub: "Nghiên cứu tại cơ sở giáo dục, viện nghiên cứu; tiếp tục học tiến sĩ.",
      },
      {
        title: "Biên phiên dịch",
        sub: "Đảm nhiệm công việc biên dịch, phiên dịch và truyền thông ngôn ngữ.",
      },
      {
        title: "Quản lý đào tạo",
        sub: "Quản lý trung tâm ngoại ngữ, chuyên môn và chất lượng đào tạo.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "4 tín chỉ kiến thức chung; 47 tín chỉ cơ sở và chuyên ngành; 9 tín chỉ đề án tốt nghiệp. Có thực tập giảng dạy 6 tín chỉ; các nhóm tự chọn nêu rõ quy tắc chọn 2/5 và 2/6.",
    ],
    trackLabels: ["Định hướng ứng dụng", "Định hướng nghiên cứu"],
    graduationProjects: ["Đề án tốt nghiệp · 9 tín chỉ", "Luận văn tốt nghiệp · 12 tín chỉ"],
    studyMode: "Chính quy tập trung",
    notes: [
      "60 tín chỉ theo lộ trình rõ ràng.",
      "Lộ trình mẫu: Học kỳ 1–3 hoàn thành học phần chung, cơ sở, chuyên ngành và thực tập; giai đoạn cuối thực hiện đề án tối thiểu 3 tháng.",
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
      items: ["Graduation Project (Đề án tốt nghiệp) · 9 tín chỉ"],
    },
    trackCredits: ["60 tín chỉ", "60 tín chỉ"],
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody: "Trao đổi về chương trình Ngôn ngữ Anh, điều kiện đầu vào và lộ trình đăng ký.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ mục tiêu học tập của bạn."],
      body: "Trao đổi về chương trình Ngôn ngữ Anh, điều kiện đầu vào và lộ trình đăng ký.",
      benefits: [],
      formTitle: "Trao đổi trực tiếp với Viện",
    },
  },
  faq: {
    ...programmeSharedContent.faq,
    faqs: [
      {
        question: "Chương trình có mấy định hướng?",
        answer:
          "Chương trình tuyển sinh theo định hướng ứng dụng · nghiên cứu trong kế hoạch năm 2027.",
      },
      {
        question: "Ngành nào được miễn bổ sung kiến thức?",
        answer: "Miễn bổ sung: Ngôn ngữ Anh; Sư phạm Tiếng Anh.",
      },
      {
        question: "Người học ngành ngôn ngữ khác cần điều kiện gì?",
        answer:
          "Nhóm phù hợp cần đối chiếu: Quản lý giáo dục, Giáo dục học, các ngành ngôn ngữ và văn hóa nước ngoài, Tâm lý học, Tâm lý học giáo dục, Ngôn ngữ học. Học phần bổ sung: Hình thái học & cú pháp học; Ngữ âm & Âm vị học; Ngữ nghĩa học; Kỹ năng Viết học thuật. Mỗi học phần được đối chiếu với bảng điểm; nhóm ngoài khối tiếng Anh cần IELTS 6.5 hoặc tương đương.",
      },
      {
        question: "Định hướng nghiên cứu có yêu cầu riêng không?",
        answer:
          "Định hướng nghiên cứu: tốt nghiệp đại học từ loại Khá trở lên hoặc có công bố khoa học liên quan.",
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
export const ngonNguAnhProgramme: Programme = {
  id: "ngon-ngu-anh",
  code: "8220201",
  title: "Ngôn ngữ Anh",
  englishTitle: "Master of English Language",
  degree: "Thạc sĩ",
  field: "Luật, Nhân văn & Truyền thông",
  orientation: "Ứng dụng và nghiên cứu",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy · Tiếng Việt",
  summary:
    "Đào sâu ngôn ngữ học ứng dụng, phương pháp giảng dạy và nghiên cứu tiếng Anh; tích hợp công nghệ số và trí tuệ nhân tạo vào môi trường giáo dục hiện đại.",
  tuition: "85.000.000 VNĐ",
  intake: "Tuyển sinh thạc sĩ 2027",
  orientations: ["Ứng dụng", "Nghiên cứu"],
};
export function getNgonNguAnhCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "18–24 tháng · 60 tín chỉ",
      graduationProject: "Đề án tốt nghiệp · 9 tín chỉ",
      intro:
        "4 tín chỉ kiến thức chung; 47 tín chỉ cơ sở và chuyên ngành; 9 tín chỉ đề án tốt nghiệp. Có thực tập giảng dạy 6 tín chỉ; các nhóm tự chọn nêu rõ quy tắc chọn 2/5 và 2/6.",
      notes: [
        "60 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Học kỳ 1–3 hoàn thành học phần chung, cơ sở, chuyên ngành và thực tập; giai đoạn cuối thực hiện đề án tối thiểu 3 tháng.",
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
              code: "81PHIL6014",
              name: "Philosophy (Triết học)",
              credits: 4,
            },
            {
              code: "81REWR5014",
              name: "Research Writing (Viết nghiên cứu)",
              credits: 4,
            },
            {
              code: "81GRME5024",
              name: "Graduate Research and Methodology (Phương pháp Nghiên cứu khoa học nâng cao)",
              credits: 4,
            },
            {
              code: "81SLAC6033",
              name: "Second Language Acquisition (Thụ đắc ngôn ngữ thứ hai)",
              credits: 3,
            },
            {
              code: "81IALI6043",
              name: "Introduction to Applied Linguistics (Dẫn luận Ngôn ngữ học ứng dụng)",
              credits: 3,
            },
            {
              code: "81WENG6053",
              name: "World Englishes (Tiếng Anh toàn cầu)",
              credits: 3,
            },
            {
              code: "81CCCO6073",
              name: "Cross-cultural communication (Giao tiếp giao văn hoá)",
              credits: 3,
            },
            {
              code: "81COLI5083",
              name: "Contrastive Linguistics (Ngôn ngữ học đối chiếu)",
              credits: 3,
            },
            {
              code: "81COMP5283",
              name: "Computational Linguistics (Ngôn ngữ Máy tính)",
              credits: 3,
            },
            {
              code: "81IFLT6093",
              name: "IT in Foreign Language Teaching(CNTT trong Giảng dạy tiếng Anh)",
              credits: 3,
            },
            {
              code: "81AMTL5103",
              name: "Advanced Methods of Teaching Language(Phương pháp Giảng dạy Ngôn ngữ nâng cao)",
              credits: 3,
            },
            {
              code: "81DIAN7113",
              name: "Discourse Analysis (Phân tích diễn ngôn)",
              credits: 3,
            },
            {
              code: "81COLI6063",
              name: "Cognitive Linguistics (Ngôn ngữ học tri nhận)",
              credits: 3,
            },
            {
              code: "81CDEV7293",
              name: "Curriculum Development (Phát triển Chương trình giảng dạy)",
              credits: 3,
            },
            {
              code: "81TEPR7306",
              name: "Teaching Practicum (Thực tập tại doanh nghiệp)",
              credits: 6,
            },
            {
              code: "81PLTE7193",
              name: "Practice of Language Teaching (Thực hành giảng dạy ngôn ngữ)",
              credits: 3,
            },
            {
              code: "81SOLI7143",
              name: "Sociolinguistics (Ngôn ngữ học xã hội)",
              credits: 3,
            },
            {
              code: "81STLI7153",
              name: "Structuralism in Linguistics (Cấu trúc ngôn ngữ)",
              credits: 3,
            },
            {
              code: "81PRAG7163",
              name: "Pragmatics (Ngữ dụng học)",
              credits: 3,
            },
            {
              code: "81EFSP7173",
              name: "English for Specific Purposes (Tiếng Anh chuyên ngành)",
              credits: 3,
            },
            {
              code: "81ATRT5183",
              name: "Advanced Translation Theories (Lý thuyết dịch)",
              credits: 3,
            },
            {
              code: "81LTEV5123",
              name: "Language Testing and Evaluation (Kiểm tra và đánh giá ngôn ngữ)",
              credits: 3,
            },
          ],
        },
        {
          title: "Thực tập và đề án tốt nghiệp",
          totalCreditsLabel: "9 tín chỉ",
          courses: [
            {
              code: "81GPRO7279",
              name: "Graduation Project (Đề án tốt nghiệp)",
              credits: 9,
            },
          ],
        },
      ],
      completion: {
        heading: "Thực tập và đề án tốt nghiệp",
        items: ["Graduation Project (Đề án tốt nghiệp) · 9 tín chỉ"],
      },
    },
    {
      number: "05",
      title: "Định hướng nghiên cứu",
      orientation: "Nghiên cứu",
      subtitle: "18–24 tháng · 60 tín chỉ",
      graduationProject: "Luận văn tốt nghiệp · 12 tín chỉ",
      intro:
        "4 tín chỉ kiến thức chung; 44 tín chỉ cơ sở và chuyên ngành; 12 tín chỉ luận văn. Các nhóm tự chọn theo quy tắc 2/5 và 3/7.",
      notes: [
        "60 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Học kỳ 1–3 hoàn thành học phần; luận văn được thực hiện tối thiểu 6 tháng.",
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
              code: "81PHIL6014",
              name: "Philosophy (Triết học)",
              credits: 4,
            },
            {
              code: "81REWR5014",
              name: "Research Writing (Viết nghiên cứu)",
              credits: 4,
            },
            {
              code: "81GRME5254",
              name: "Seminar on Quantitative and Qualitative Research (Chuyên đề về Nghiên cứu định lượng và định tính)",
              credits: 4,
            },
            {
              code: "81SLAC6223",
              name: "Seminar on Second Language Acquisition (Thụ đắc ngôn ngữ thứ hai)",
              credits: 3,
            },
            {
              code: "81IALI6043",
              name: "Introduction to Applied Linguistics (Dẫn luận Ngôn ngữ học ứng dụng)",
              credits: 3,
            },
            {
              code: "81WENG6053",
              name: "World Englishes (Tiếng Anh toàn cầu)",
              credits: 3,
            },
            {
              code: "81CCCO6073",
              name: "Cross-cultural communication (Giao tiếp giao văn hoá)",
              credits: 3,
            },
            {
              code: "81COLI5083",
              name: "Contrastive Linguistics (Ngôn ngữ học đối chiếu)",
              credits: 3,
            },
            {
              code: "81COMP5283",
              name: "Computational Linguistics (Ngôn ngữ Máy tính)",
              credits: 3,
            },
            {
              code: "81IFLT6093",
              name: "IT in Foreign Language Teaching(CNTT trong Giảng dạy tiếng Anh)",
              credits: 3,
            },
            {
              code: "81AMTL5233",
              name: "Seminar on Advanced Methods of Teaching Language (Phương pháp Giảng dạy Ngôn ngữ nâng cao)",
              credits: 3,
            },
            {
              code: "81DIAN7243",
              name: "Seminar on Discourse Analysis (Chuyên đề về Phân tích diễn ngôn)",
              credits: 3,
            },
            {
              code: "81COLI6063",
              name: "Cognitive Linguistics (Ngôn ngữ học tri nhận)",
              credits: 3,
            },
            {
              code: "81CDEV7293",
              name: "Curriculum Development (Phát triển Chương trình giảng dạy)",
              credits: 3,
            },
            {
              code: "81PLTE7193",
              name: "Practice of Language Teaching (Thực hành giảng dạy ngôn ngữ)",
              credits: 3,
            },
            {
              code: "81SOLI7143",
              name: "Sociolinguistics (Ngôn ngữ học xã hội)",
              credits: 3,
            },
            {
              code: "81STLI7153",
              name: "Structuralism in Linguistics (Cấu trúc ngôn ngữ)",
              credits: 3,
            },
            {
              code: "81PRAG7163",
              name: "Pragmatics (Ngữ dụng học)",
              credits: 3,
            },
            {
              code: "81EFSP7173",
              name: "English for Specific Purposes (Tiếng Anh chuyên ngành)",
              credits: 3,
            },
            {
              code: "81ATRT5183",
              name: "Advanced Translation Theories(Lý thuyết dịch)",
              credits: 3,
            },
            {
              code: "81LTEV5123",
              name: "Language Testing and Evaluation (Kiểm tra và đánh giá ngôn ngữ)",
              credits: 3,
            },
            {
              code: "81TEPR7213",
              name: "Teaching Practicum(Thực tập tại Doanh nghiệp)",
              credits: 3,
            },
          ],
        },
        {
          title: "Luận văn tốt nghiệp",
          totalCreditsLabel: "12 tín chỉ",
          courses: [
            {
              code: "81THES2612",
              name: "Thesis (Luận văn tốt nghiệp)",
              credits: 12,
            },
          ],
        },
      ],
      completion: {
        heading: "Luận văn tốt nghiệp",
        items: ["Thesis (Luận văn tốt nghiệp) · 12 tín chỉ"],
      },
    },
  ];
}
