// Nguồn: thac-si-quan-he-cong-chung.html do người dùng cung cấp.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";
export const quanHeCongChungPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển năng lực hoạch định chiến lược, quản trị truyền thông, sáng tạo nội dung và nghiên cứu quan hệ công chúng trong môi trường số.",
    heroSlogan: "FUTURE",
    heroImage: "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/VLU_0801_16e223fdcf.jpg",
    imageAlt: "Hoạt động trao đổi học thuật và truyền thông tại Trường Đại học Văn Lang",
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "8320108",
      },
      {
        label: "Khối lượng",
        value: "60–61 tín chỉ",
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
        value: "110.000.000 đồng",
      },
    ],
  },
  section01: {
    ...programmeSharedContent.overview,
    sectionNumber: "01",
    overviewTitle: "Tổng quan chương trình",
    headline: "Kiến thức chuyên sâu. Năng lực tạo tác động.",
    overview: [
      "Chương trình kết nối lý thuyết truyền thông với thực hành chiến lược, quản trị danh tiếng, khủng hoảng, nội dung đa phương tiện và công chúng số. Người học rèn luyện năng lực phân tích dữ liệu, tư duy phản biện và quản lý chiến dịch trong bối cảnh truyền thông biến đổi nhanh.",
      "Định hướng ứng dụng gắn với trải nghiệm quốc tế, thực tập doanh nghiệp và đề án tốt nghiệp. Định hướng nghiên cứu chú trọng phương pháp khoa học, nghiên cứu quan hệ công chúng và luận văn.",
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
        title: "Chiến lược truyền thông tích hợp",
        text: "Hoạch định, phân bổ nguồn lực và đánh giá chiến dịch đa kênh.",
      },
      {
        title: "Danh tiếng và khủng hoảng",
        text: "Phân tích rủi ro, quản trị danh tiếng và xử lý vấn đề truyền thông.",
      },
      {
        title: "Nội dung và công nghệ",
        text: "Sản xuất nội dung đa phương tiện, khai thác nền tảng số và công nghệ mới.",
      },
      {
        title: "Trải nghiệm nghề nghiệp",
        text: "Kết nối trải nghiệm quốc tế, thực tập doanh nghiệp và bài toán thực tế.",
      },
    ],
    outcomesHeading: "Chuẩn đầu ra của chương trình",
    learningOutcomes: {
      intro: "",
      items: [
        {
          code: "PLO 1",
          title: "",
          text: "Vận dụng lý thuyết truyền thông, xã hội học và tâm lý học trong PR.",
        },
        {
          code: "PLO 2",
          title: "",
          text: "Phân tích xu hướng quảng cáo, tiếp thị và truyền thông số.",
        },
        {
          code: "PLO 3",
          title: "",
          text: "Vận dụng kiến thức quản trị khủng hoảng, truyền thông nội bộ và phát triển bền vững.",
        },
        {
          code: "PLO 4",
          title: "",
          text: "Sử dụng ngoại ngữ chuyên môn ở trình độ tương đương Bậc 4.",
        },
        {
          code: "PLO 5",
          title: "",
          text: "Vận dụng kỹ năng quản trị, lãnh đạo và giao tiếp.",
        },
        {
          code: "PLO 6",
          title: "",
          text: "Phân tích dữ liệu và đưa ra tư vấn chuyên sâu.",
        },
        {
          code: "PLO 7",
          title: "",
          text: "Ứng dụng công nghệ trong sản xuất, quản trị nội dung đa phương tiện.",
        },
        {
          code: "PLO 8",
          title: "",
          text: "Hoạch định và đánh giá chiến lược truyền thông tích hợp.",
        },
        {
          code: "PLO 9",
          title: "",
          text: "Ra quyết định mang tính chuyên gia.",
        },
        {
          code: "PLO 10",
          title: "",
          text: "Tuân thủ đạo đức nghề nghiệp và thích ứng với thay đổi.",
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
          "Miễn bổ sung: Quan hệ công chúng; Truyền thông đa phương tiện.",
          "Báo chí và truyền thông: học Nhập môn Quan hệ công chúng, Lập kế hoạch Quan hệ công chúng, Kỹ năng viết cho Quan hệ công chúng — 3 tín chỉ/học phần.",
        ],
      },
      {
        title: "Phương thức tuyển sinh",
        paragraphs: ["Tuyển sinh bằng xét tuyển kết hợp phỏng vấn."],
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
            paragraphs: ["Miễn bổ sung: Quan hệ công chúng; Truyền thông đa phương tiện."],
          },
          {
            title: "02. Đối chiếu hồ sơ và danh mục bổ sung",
            paragraphs: [
              "Báo chí và truyền thông: học Nhập môn Quan hệ công chúng, Lập kế hoạch Quan hệ công chúng, Kỹ năng viết cho Quan hệ công chúng — 3 tín chỉ/học phần.",
              "Nhân văn, khoa học xã hội và hành vi: học thêm Tâm lý học truyền thông (tổng 12 tín chỉ). Nhóm ngành khác: học thêm Marketing căn bản (tổng 15 tín chỉ).",
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
        title: "Quản trị truyền thông",
        sub: "Quản lý phòng truyền thông, PR tại doanh nghiệp, tập đoàn và cơ quan nhà nước.",
      },
      {
        title: "Tư vấn chiến lược",
        sub: "Tư vấn, hoạch định chính sách và chiến lược quan hệ công chúng.",
      },
      {
        title: "Nội dung và sự kiện",
        sub: "Sáng tạo nội dung, quảng cáo, mạng xã hội, báo chí, phát thanh, truyền hình và tổ chức sự kiện.",
      },
      {
        title: "Nghiên cứu và giảng dạy",
        sub: "Nghiên cứu, giảng dạy và tiếp tục học ở trình độ tiến sĩ.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "7 tín chỉ kiến thức chung; 10 tín chỉ cơ sở; 22 tín chỉ chuyên ngành bắt buộc; 12 tín chỉ tự chọn; 6 tín chỉ thực tập và 9 tín chỉ đề án.",
    ],
    trackLabels: ["Định hướng ứng dụng", "Định hướng nghiên cứu"],
    graduationProjects: ["Đề án tốt nghiệp · 9 tín chỉ", "Luận văn tốt nghiệp · 13 tín chỉ"],
    studyMode: "Chính quy tập trung",
    notes: [
      "60–61 tín chỉ theo lộ trình rõ ràng.",
      "Lộ trình mẫu: Ba học kỳ đầu hoàn thành khối học phần; học kỳ cuối gồm trải nghiệm quốc tế, thực tập doanh nghiệp và đề án.",
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
        "Thực tập 1: Trải nghiệm quốc tế truyền thông · 2 tín chỉ",
        "Thực tập 2: Thực tập tại doanh nghiệp · 4 tín chỉ",
        "Đề án tốt nghiệp · 9 tín chỉ (theo mô tả chương trình)",
      ],
    },
    trackCredits: ["60 tín chỉ", "61 tín chỉ"],
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody: "Trao đổi về chương trình Quan hệ công chúng, điều kiện đầu vào và lộ trình đăng ký.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ mục tiêu học tập của bạn."],
      body: "Trao đổi về chương trình Quan hệ công chúng, điều kiện đầu vào và lộ trình đăng ký.",
      benefits: [],
      formTitle: "Trao đổi trực tiếp với Viện",
    },
  },
  faq: {
    ...programmeSharedContent.faq,
    faqs: [
      {
        question: "Chương trình tuyển sinh theo phương thức nào?",
        answer:
          "Chương trình xét tuyển hồ sơ; ngành Quan hệ công chúng có thêm bước phỏng vấn theo thông báo tuyển sinh năm 2027.",
      },
      {
        question: "Có những định hướng nào?",
        answer:
          "Chương trình tuyển sinh theo định hướng ứng dụng · nghiên cứu trong kế hoạch năm 2027.",
      },
      {
        question: "Ngành nào không phải học bổ sung?",
        answer: "Miễn bổ sung: Quan hệ công chúng; Truyền thông đa phương tiện.",
      },
      {
        question: "Học phần bổ sung được xác định thế nào?",
        answer:
          "Báo chí và truyền thông: học Nhập môn Quan hệ công chúng, Lập kế hoạch Quan hệ công chúng, Kỹ năng viết cho Quan hệ công chúng — 3 tín chỉ/học phần. Nhân văn, khoa học xã hội và hành vi: học thêm Tâm lý học truyền thông (tổng 12 tín chỉ). Nhóm ngành khác: học thêm Marketing căn bản (tổng 15 tín chỉ).",
      },
      {
        question: "Học phí toàn khóa là bao nhiêu?",
        answer:
          "Học phí toàn khóa là 110.000.000 đồng, chia thành ba đợt 35.000.000 đồng, 35.000.000 đồng và 40.000.000 đồng.",
      },
      {
        question: "Định hướng nghiên cứu yêu cầu gì?",
        answer:
          "Định hướng nghiên cứu: tốt nghiệp từ loại Khá trở lên hoặc có công bố khoa học liên quan. Tuyển sinh bằng xét tuyển kết hợp phỏng vấn.",
      },
    ],
  },
  fees: {
    heading: "Chủ động chuẩn bị cho hành trình học.",
    intro: ["Học phí toàn khóa được chia thành ba đợt theo thông báo tuyển sinh thạc sĩ 2027."],
    intake: "TUYỂN SINH THẠC SĨ 2027",
    language: "Tiếng Việt",
    total: "110.000.000 đồng",
    installments: [
      {
        label: "Đợt 1",
        amount: "35.000.000 đồng",
      },
      {
        label: "Đợt 2",
        amount: "35.000.000 đồng",
      },
      {
        label: "Đợt 3",
        amount: "40.000.000 đồng",
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
export const quanHeCongChungProgramme: Programme = {
  id: "quan-he-cong-chung",
  code: "8320108",
  title: "Quan hệ Công chúng",
  englishTitle: "Master of Public Relations",
  degree: "Thạc sĩ",
  field: "Luật, Nhân văn & Truyền thông",
  orientation: "Ứng dụng và nghiên cứu",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy · Tiếng Việt",
  summary:
    "Phát triển năng lực hoạch định chiến lược, quản trị truyền thông, sáng tạo nội dung và nghiên cứu quan hệ công chúng trong môi trường số.",
  tuition: "110.000.000 VNĐ",
  intake: "Tuyển sinh thạc sĩ 2027",
  orientations: ["Ứng dụng", "Nghiên cứu"],
  creditsLabel: "60–61",
};
export function getQuanHeCongChungCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "18–24 tháng · 60 tín chỉ",
      graduationProject: "Đề án tốt nghiệp · 9 tín chỉ",
      intro:
        "7 tín chỉ kiến thức chung; 10 tín chỉ cơ sở; 22 tín chỉ chuyên ngành bắt buộc; 12 tín chỉ tự chọn; 6 tín chỉ thực tập và 9 tín chỉ đề án.",
      notes: [
        "60–61 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Ba học kỳ đầu hoàn thành khối học phần; học kỳ cuối gồm trải nghiệm quốc tế, thực tập doanh nghiệp và đề án.",
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
              code: "81PHIL1013",
              name: "Triết học Philosophy",
              credits: 4,
            },
            {
              code: "81RESM7013",
              name: "Phương pháp nghiên cứu khoa học · Research Methodology",
              credits: 3,
            },
            {
              code: "81MTEC7083",
              name: "Kỹ thuật truyền thông · Media Technologies",
              credits: 3,
            },
            {
              code: "81MEDL7043",
              name: "Đạo đức, luật pháp và Quy định truyền thông · Media Law And Regulation",
              credits: 3,
            },
            {
              code: "81PRCA7053",
              name: "Chiến lược Quan hệ Công chúng · Public Relations Campaign Planning and Execution",
              credits: 4,
            },
            {
              code: "81DIGI7103",
              name: "Truyền thông số · Digital Media and Public Relations",
              credits: 4,
            },
            {
              code: "81MEAU7113",
              name: "Công chúng truyền thông · Media Audiences and Users",
              credits: 3,
            },
            {
              code: "81PRWR7173",
              name: "Phát triển nội dung Quan hệ Công chúng · Public Relations Writing and Content Creation",
              credits: 3,
            },
            {
              code: "81CRIS7123",
              name: "Quản trị danh tiếng và khủng hoảng · Crisis and Reputation Management",
              credits: 3,
            },
            {
              code: "81MEDE7133",
              name: "Quản trị kinh tế truyền thông · Media Economics",
              credits: 3,
            },
            {
              code: "81TEIC7142",
              name: "Thực tập 1: Trải nghiệm quốc tế truyền thông",
              credits: 2,
            },
            {
              code: "81INTE7274",
              name: "Thực tập 2: Thực tập tại doanh nghiệp",
              credits: 4,
            },
            {
              code: "81COMM7063",
              name: "Truyền thông và lãnh đạo · Communications and Leadership",
              credits: 3,
            },
            {
              code: "81MLIT7073",
              name: "Thẩm định tin tức · Media Literacy",
              credits: 3,
            },
            {
              code: "81THEO7023",
              name: "Lý thuyết Quan hệ công chúng đương đại · Contemporary Public Relations Theory",
              credits: 3,
            },
            {
              code: "81GLOB7093",
              name: "Truyền thông toàn cầu · Global Communication Theories and Application",
              credits: 3,
            },
            {
              code: "81HEAL7203",
              name: "Truyền thông sức khoẻ Health Communication and Advocacy",
              credits: 3,
            },
            {
              code: "81MDRE7143",
              name: "Quan hệ giới truyền thông · Media Relations",
              credits: 3,
            },
            {
              code: "81EMPL7153",
              name: "Quan hệ nội bộ và Nhà đầu tư · Employee and Investor Relations",
              credits: 3,
            },
            {
              code: "81PRNO7163",
              name: "Quan hệ công chúng trong tổ chức Phi chính phủ · Public Relations and Advocacy for Nonprofit Organizations",
              credits: 3,
            },
            {
              code: "81ACDE7183",
              name: "Thuyết trình chuyên nghiệp · Academic and professional presentation skills",
              credits: 3,
            },
            {
              code: "81PEBM7193",
              name: "Quản trị thương hiệu cá nhân · Personal Branding Management",
              credits: 3,
            },
            {
              code: "81CREM7233",
              name: "Truyền thông đa phương tiện · Creative Media Design & Expression",
              credits: 3,
            },
          ],
        },
      ],
      completion: {
        heading: "Thực tập và đề án tốt nghiệp",
        items: [
          "Thực tập 1: Trải nghiệm quốc tế truyền thông · 2 tín chỉ",
          "Thực tập 2: Thực tập tại doanh nghiệp · 4 tín chỉ",
          "Đề án tốt nghiệp · 9 tín chỉ (theo mô tả chương trình)",
        ],
      },
    },
    {
      number: "05",
      title: "Định hướng nghiên cứu",
      orientation: "Nghiên cứu",
      subtitle: "18–24 tháng · 61 tín chỉ",
      graduationProject: "Luận văn tốt nghiệp · 13 tín chỉ",
      intro:
        "7 tín chỉ kiến thức chung; 12 tín chỉ cơ sở; 14 tín chỉ chuyên ngành bắt buộc; 15 tín chỉ tự chọn (chọn 5 học phần); 13 tín chỉ luận văn.",
      notes: [
        "60–61 tín chỉ theo lộ trình rõ ràng.",
        "Lộ trình mẫu: Học phần được phân bổ theo lộ trình mẫu; giai đoạn cuối tập trung thực hiện và bảo vệ luận văn.",
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
              code: "81PHIL1013",
              name: "Triết học · Philosophy",
              credits: 4,
            },
            {
              code: "81RESM7013",
              name: "Phương pháp nghiên cứu khoa học · Research Methodology",
              credits: 3,
            },
            {
              code: "81THEO7023",
              name: "Lý thuyết Quan hệ công chúng đương đại · Contemporary Public Relations Theory",
              credits: 3,
            },
            {
              code: "81RESP7033",
              name: "Nghiên cứu Quan hệ Công chúng · Research on Public Relations",
              credits: 3,
            },
            {
              code: "81MEDL7043",
              name: "Đạo đức, luật pháp và Quy định truyền thông · Media Law And Regulation",
              credits: 3,
            },
            {
              code: "81PRCA7053",
              name: "Chiến lược Quan hệ Công chúng · Public Relations Campaign Planning and Execution",
              credits: 3,
            },
            {
              code: "81DIGI7103",
              name: "Truyền thông số · Digital Media and Public Relations",
              credits: 3,
            },
            {
              code: "81MEAU7113",
              name: "Công chúng truyền thông · Media Audiences and Users",
              credits: 3,
            },
            {
              code: "81CRIS7123",
              name: "Quản trị danh tiếng và khủng hoảng · Crisis and Reputation Management",
              credits: 3,
            },
            {
              code: "81MEDE7133",
              name: "Quản trị kinh tế truyền thông · Media Economics",
              credits: 3,
            },
            {
              code: "81TEIC7142",
              name: "Trải nghiệm quốc tế Truyền thông",
              credits: 2,
            },
            {
              code: "81COMM7063",
              name: "Truyền thông và lãnh đạo · Communications and Leadership",
              credits: 3,
            },
            {
              code: "81MLIT7073",
              name: "Thẩm định tin tức · Media Literacy",
              credits: 3,
            },
            {
              code: "81MTEC7083",
              name: "Kỹ thuật truyền thông · Media Technologies",
              credits: 3,
            },
            {
              code: "81GLOB7093",
              name: "Truyền thông toàn cầu · Global Communication Theories and Application",
              credits: 3,
            },
            {
              code: "81MDRE7143",
              name: "Quan hệ giới truyền thông · Media Relations",
              credits: 3,
            },
            {
              code: "81EMPL7153",
              name: "Quan hệ nội bộ và Nhà đầu tư · Employee and Investor Relations",
              credits: 3,
            },
            {
              code: "81PRNO7163",
              name: "Quan hệ công chúng trong tổ chức Phi chính phủ · Public Relations and Advocacy for Nonprofit Organizations",
              credits: 3,
            },
            {
              code: "81PRWR7173",
              name: "Phát triển nội dung Quan hệ Công chúng · Public Relations Writing and Content Creation",
              credits: 3,
            },
            {
              code: "81ACDE7183",
              name: "Thuyết trình chuyên nghiệp · Academic and professional presentation skills",
              credits: 3,
            },
            {
              code: "81PEBM7193",
              name: "Quản trị thương hiệu cá nhân · Personal Branding Management",
              credits: 3,
            },
            {
              code: "81HEAL7203",
              name: "Truyền thông sức khoẻ · Health Communication and Advocacy",
              credits: 3,
            },
            {
              code: "81JOUR7213",
              name: "Báo chí · Understanding Journalism",
              credits: 3,
            },
            {
              code: "81ADVE7223",
              name: "Quảng cáo và tiếp thị kỹ thuật số · Advertising and Promotion in the Digital Age",
              credits: 3,
            },
            {
              code: "81CREM7233",
              name: "Truyền thông đa phương tiện · Creative Media Design & Expression",
              credits: 3,
            },
          ],
        },
        {
          title: "Luận văn tốt nghiệp",
          totalCreditsLabel: "13 tín chỉ",
          courses: [
            {
              code: "81THES72415",
              name: "Luận văn tốt nghiệp Thesis",
              credits: 13,
            },
          ],
        },
      ],
      completion: {
        heading: "Luận văn tốt nghiệp",
        items: ["Luận văn tốt nghiệp Thesis · 13 tín chỉ"],
      },
    },
  ];
}
