// Nguồn: thac-si-tai-chinh-ngan-hang.html do người dùng cung cấp.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";
export const taiChinhNganHangPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Cập nhật kiến thức tài chính – ngân hàng, công nghệ tài chính và quản trị rủi ro; phát triển năng lực phân tích, hoạch định và dẫn dắt thay đổi.",
    heroSlogan: "FUTURE",
    heroImage:
      "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/301263367_3443014019272671_6239498181410589711_n_dc2ed10970.jpg",
    imageAlt: "Không gian học tập và mô phỏng tài chính tại Trường Đại học Văn Lang",
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "8340201",
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
      "Chương trình kết hợp nền tảng tài chính – ngân hàng với phương pháp nghiên cứu, phân tích định lượng, công nghệ tài chính, quản trị rủi ro và đổi mới sáng tạo. Người học phát triển tư duy phản biện, năng lực ra quyết định và trách nhiệm nghề nghiệp.",
      "Định hướng ứng dụng kết thúc bằng thực tập và đề án giải quyết vấn đề tại tổ chức tài chính hoặc doanh nghiệp. Định hướng nghiên cứu tăng cường phương pháp định lượng, ứng dụng AI và luận văn 12 tín chỉ.",
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
        title: "Tài chính hiện đại",
        text: "Cập nhật thị trường tài chính, ngân hàng, tài chính doanh nghiệp và khởi nghiệp.",
      },
      {
        title: "Dữ liệu và Fintech",
        text: "Kết nối phương pháp định lượng, AI, blockchain, dữ liệu lớn và sản phẩm số.",
      },
      {
        title: "Quản trị rủi ro",
        text: "Phát triển năng lực nhận diện, định lượng và quản lý rủi ro doanh nghiệp.",
      },
      {
        title: "Hai định hướng",
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
          text: "Xây dựng thế giới quan và phương pháp luận khoa học cho vấn đề tài chính – ngân hàng.",
        },
        {
          code: "PLO 2",
          title: "",
          text: "Đánh giá các vấn đề phát sinh tại doanh nghiệp và định chế tài chính.",
        },
        {
          code: "PLO 3",
          title: "",
          text: "Đề xuất giải pháp tài chính phù hợp từng bối cảnh.",
        },
        {
          code: "PLO 4",
          title: "",
          text: "Thiết kế dự án nghiên cứu ứng dụng hoặc nghiên cứu độc lập.",
        },
        {
          code: "PLO 5",
          title: "",
          text: "Vận dụng tư duy phản biện, phân tích, tổng hợp và sáng tạo.",
        },
        {
          code: "PLO 6",
          title: "",
          text: "Hoạch định, tổ chức và giải quyết vấn đề quản lý.",
        },
        {
          code: "PLO 7",
          title: "",
          text: "Truyền đạt tri thức và dẫn dắt thay đổi nghề nghiệp.",
        },
        {
          code: "PLO 8",
          title: "",
          text: "Ra quyết định phù hợp đạo đức và khuôn khổ pháp luật.",
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
          "Ngành phù hợp: Tài chính – Ngân hàng và các ngành liên quan trực tiếp trong khối quản trị, kế toán, thương mại, kinh tế.",
          "Miễn bổ sung: người tốt nghiệp các ngành thuộc khối Kinh doanh và Quản lý của Trường Đại học Văn Lang; hồ sơ trường khác được đối chiếu bảng điểm và kinh nghiệm.",
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
              "Ngành phù hợp: Tài chính – Ngân hàng và các ngành liên quan trực tiếp trong khối quản trị, kế toán, thương mại, kinh tế.",
            ],
          },
          {
            title: "02. Đối chiếu hồ sơ và danh mục bổ sung",
            paragraphs: [
              "Miễn bổ sung: người tốt nghiệp các ngành thuộc khối Kinh doanh và Quản lý của Trường Đại học Văn Lang; hồ sơ trường khác được đối chiếu bảng điểm và kinh nghiệm.",
              "Bổ sung kiến thức: Tài chính – Tiền tệ (2 tín chỉ); Nghiệp vụ Ngân hàng thương mại hoặc Ngân hàng thương mại (2 tín chỉ); Tài chính doanh nghiệp (2 tín chỉ).",
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
        title: "Chuyên gia tài chính",
        sub: "Làm việc tại bộ phận tài chính, ngân hàng, đầu tư, quản trị rủi ro và phân tích.",
      },
      {
        title: "Lãnh đạo và quản lý",
        sub: "Đảm nhiệm vai trò quản lý tại định chế tài chính và doanh nghiệp.",
      },
      {
        title: "Khởi nghiệp tài chính",
        sub: "Sáng lập hoặc đồng sáng lập doanh nghiệp trong lĩnh vực tài chính – ngân hàng.",
      },
      {
        title: "Nghiên cứu và giảng dạy",
        sub: "Giảng dạy, nghiên cứu và tiếp tục học tiến sĩ.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "7 tín chỉ kiến thức chung; 17 tín chỉ cơ sở; 21 tín chỉ chuyên ngành; thực tập 6 tín chỉ và đề án 9 tín chỉ. Nhóm tự chọn gồm lựa chọn 1/2 chuyên đề và 2/3 học phần.",
    ],
    trackLabels: ["Định hướng ứng dụng", "Định hướng nghiên cứu"],
    graduationProjects: ["Đề án tốt nghiệp · 9 tín chỉ", "Luận văn tốt nghiệp · 12 tín chỉ"],
    studyMode: "Chính quy tập trung",
    notes: [
      "60 tín chỉ theo lộ trình rõ ràng.",
      "Lộ trình mẫu: Học kỳ 1–3 hoàn thành 45 tín chỉ; học kỳ 4 thực tập và đề án 15 tín chỉ.",
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
        "Thực tập (Báo cáo thực tập và Đề cương Đề án) · 6 tín chỉ",
        "Đề án tốt nghiệp · 9 tín chỉ",
      ],
    },
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody:
      "Trao đổi về chương trình Tài chính - Ngân hàng, điều kiện đầu vào và lộ trình đăng ký.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ mục tiêu học tập của bạn."],
      body: "Trao đổi về chương trình Tài chính - Ngân hàng, điều kiện đầu vào và lộ trình đăng ký.",
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
        question: "Ai được miễn bổ sung kiến thức?",
        answer:
          "Miễn bổ sung: người tốt nghiệp các ngành thuộc khối Kinh doanh và Quản lý của Trường Đại học Văn Lang; hồ sơ trường khác được đối chiếu bảng điểm và kinh nghiệm.",
      },
      {
        question: "Các học phần bổ sung gồm những gì?",
        answer:
          "Bổ sung kiến thức: Tài chính – Tiền tệ (2 tín chỉ); Nghiệp vụ Ngân hàng thương mại hoặc Ngân hàng thương mại (2 tín chỉ); Tài chính doanh nghiệp (2 tín chỉ).",
      },
      {
        question: "Định hướng nghiên cứu yêu cầu gì?",
        answer:
          "Định hướng nghiên cứu: tốt nghiệp từ loại Khá trở lên hoặc có công bố khoa học liên quan.",
      },
      {
        question: "Có nội dung công nghệ tài chính không?",
        answer:
          "Có. Chương trình có chuyên đề Công nghệ tài chính và kết nối với dữ liệu lớn, blockchain, AI cùng các sản phẩm tài chính số.",
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
export const taiChinhNganHangProgramme: Programme = {
  id: "tai-chinh-ngan-hang",
  code: "8340201",
  title: "Tài chính - Ngân hàng",
  englishTitle: "Master of Finance and Banking",
  degree: "Thạc sĩ",
  field: "Kinh doanh & Quản lý",
  orientation: "Ứng dụng và nghiên cứu",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy · Tiếng Việt",
  summary:
    "Cập nhật kiến thức tài chính – ngân hàng, công nghệ tài chính và quản trị rủi ro; phát triển năng lực phân tích, hoạch định và dẫn dắt thay đổi.",
  tuition: "85.000.000 VNĐ",
  intake: "Tuyển sinh thạc sĩ 2027",
  orientations: ["Ứng dụng", "Nghiên cứu"],
};
export function getTaiChinhNganHangCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "18–24 tháng · 60 tín chỉ",
      graduationProject: "Đề án tốt nghiệp · 9 tín chỉ",
      intro:
        "7 tín chỉ kiến thức chung; 17 tín chỉ cơ sở; 21 tín chỉ chuyên ngành; thực tập 6 tín chỉ và đề án 9 tín chỉ. Nhóm tự chọn gồm lựa chọn 1/2 chuyên đề và 2/3 học phần.",
      notes: [
        "60 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Học kỳ 1–3 hoàn thành 45 tín chỉ; học kỳ 4 thực tập và đề án 15 tín chỉ.",
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
              name: "Triết học · Philosophy",
              credits: 4,
            },
            {
              code: "81REME6023",
              name: "Phương pháp nghiên cứu khoa học · Research Methodology",
              credits: 3,
            },
            {
              code: "81PEFB7033",
              name: "Chuyên đề Kinh tế học về Tài chính & Ngân hàng · Proseminar in Economics of Finance & Banking",
              credits: 3,
            },
            {
              code: "81MBFM7043",
              name: "Tiền tệ, ngân hàng và thị trường tài chính · Money, Banking and Financial Markets",
              credits: 3,
            },
            {
              code: "81QRMF7073",
              name: "Phương pháp định lượng trong tài chính · Quantitative Research Methods for Finance",
              credits: 3,
            },
            {
              code: "81ENPR7063",
              name: "Tinh thần doanh nhân · Entrepreneurship",
              credits: 3,
            },
            {
              code: "81ENFI7193",
              name: "Tài chính khởi nghiệp · Entrepreneurial Finance",
              credits: 3,
            },
            {
              code: "81BHFI7053",
              name: "Tài chính hành vi · Behavioral Finance",
              credits: 2,
            },
            {
              code: "81PIFT7082",
              name: "Chuyên đề công nghệ tài chính · Proseminar in Financial Technology",
              credits: 2,
            },
            {
              code: "81ENRM7203",
              name: "Quản trị rủi ro doanh nghiệp · Enterprise Risk Management",
              credits: 3,
            },
            {
              code: "81BAMA7273",
              name: "Quản trị ngân hàng · Bank Management",
              credits: 3,
            },
            {
              code: "81FIMA7163",
              name: "Quản trị tài chính · Financial Management",
              credits: 3,
            },
            {
              code: "81INMA7133",
              name: "Quản trị đổi mới sáng tạo Innovation Management",
              credits: 3,
            },
            {
              code: "81MINS7223",
              name: "Hệ thống thông tin quản lý · Management Information Systems",
              credits: 3,
            },
            {
              code: "81PFMI7313",
              name: "Chuyên đề ngân hàng và các định chế tài chính phi ngân hàng · Proseminar in Financial Intermediaries",
              credits: 3,
            },
            {
              code: "81LEFI7113",
              name: "Nghệ thuật lãnh đạo trong tài chính Leadership in Finance",
              credits: 3,
            },
            {
              code: "81PRCF7183",
              name: "Chuyên đề tài chính doanh nghiệp · Proseminar in Corporate Finance",
              credits: 3,
            },
          ],
        },
        {
          title: "Thực tập và đề án tốt nghiệp",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              code: "81INTE7326",
              name: "Thực tập (Báo cáo thực tập và Đề cương Đề án)",
              credits: 6,
            },
            {
              code: "81THES7339",
              name: "Đề án tốt nghiệp",
              credits: 9,
            },
          ],
        },
      ],
      completion: {
        heading: "Thực tập và đề án tốt nghiệp",
        items: [
          "Thực tập (Báo cáo thực tập và Đề cương Đề án) · 6 tín chỉ",
          "Đề án tốt nghiệp · 9 tín chỉ",
        ],
      },
    },
    {
      number: "05",
      title: "Định hướng nghiên cứu",
      orientation: "Nghiên cứu",
      subtitle: "18–24 tháng · 60 tín chỉ",
      graduationProject: "Luận văn tốt nghiệp · 12 tín chỉ",
      intro:
        "10 tín chỉ kiến thức chung; 17 tín chỉ cơ sở; 21 tín chỉ chuyên ngành; luận văn 12 tín chỉ. Có học phần ứng dụng AI trong nghiên cứu.",
      notes: [
        "60 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Ba học kỳ đầu hoàn thành học phần; học kỳ cuối thực hiện luận văn tối thiểu 6 tháng.",
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
              name: "Triết học · Philosophy",
              credits: 4,
            },
            {
              code: "81REME6023",
              name: "Phương pháp nghiên cứu khoa học · Research Methodology",
              credits: 3,
            },
            {
              code: "81PEFB7033",
              name: "Chuyên đề Kinh tế học về Tài chính & Ngân hàng · Proseminar in Economics of Finance & Banking",
              credits: 3,
            },
            {
              code: "81QRMF7073",
              name: "Phương pháp định lượng trong tài chính · Quantitative Research Methods for Finance",
              credits: 3,
            },
            {
              code: "81MBFM7043",
              name: "Tiền tệ, ngân hàng và thị trường tài chính · Money, Banking and Financial Markets",
              credits: 3,
            },
            {
              code: "81ENPR7063",
              name: "Tinh thần doanh nhân · Entrepreneurship",
              credits: 3,
            },
            {
              code: "81ENFI7193",
              name: "Tài chính khởi nghiệp · Entrepreneurial Finance",
              credits: 3,
            },
            {
              code: "81BHFI7053",
              name: "Tài chính hành vi · Behavioral Finance",
              credits: 2,
            },
            {
              code: "81PIFT7082",
              name: "Chuyên đề công nghệ tài chính · Proseminar in Financial Technology",
              credits: 2,
            },
            {
              code: "81ENRM7203",
              name: "Quản trị rủi ro doanh nghiệp · Enterprise Risk Management",
              credits: 3,
            },
            {
              code: "81BAMA7273",
              name: "Quản trị ngân hàng · Bank Management",
              credits: 3,
            },
            {
              code: "81FIMA7163",
              name: "Quản trị tài chính · Financial Management",
              credits: 3,
            },
            {
              code: "81INMA7133",
              name: "Quản trị đổi mới sáng tạo Innovation Management",
              credits: 3,
            },
            {
              code: "81MINS7223",
              name: "Hệ thống thông tin quản lý · Management Information Systems",
              credits: 3,
            },
            {
              code: "81PFMI7313",
              name: "Chuyên đề ngân hàng và các định chế tài chính phi ngân hàng · Proseminar in Financial Intermediaries",
              credits: 3,
            },
            {
              code: "81LEFI7113",
              name: "Nghệ thuật lãnh đạo trong tài chính Leadership in Finance",
              credits: 3,
            },
            {
              code: "81PRCF7183",
              name: "Chuyên đề tài chính doanh nghiệp · Proseminar in Corporate Finance",
              credits: 3,
            },
          ],
        },
        {
          title: "Luận văn tốt nghiệp",
          totalCreditsLabel: "12 tín chỉ",
          courses: [
            {
              code: "81THES73312",
              name: "Luận văn tốt nghiệp · Master's thesis",
              credits: 12,
            },
          ],
        },
      ],
      completion: {
        heading: "Luận văn tốt nghiệp",
        items: ["Luận văn tốt nghiệp · Master's thesis · 12 tín chỉ"],
      },
    },
  ];
}
