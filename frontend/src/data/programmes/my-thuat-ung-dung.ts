// Nguồn: thac-si-my-thuat-ung-dung (1).html do người dùng cung cấp ngày 24/10/2026.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";

export const myThuatUngDungPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển tư duy sáng tạo, năng lực nghiên cứu và khả năng dẫn dắt thực hành thiết kế; kết nối văn hóa, công nghệ và trải nghiệm thực tiễn để tạo ra các giải pháp mỹ thuật ứng dụng có giá trị cho cộng đồng.",
    heroSlogan: "FUTURE",
    heroImage: "/images/pages/programmes/my-thuat-ung-dung/programme-hero.jpg",
    imageAlt: "Cận cảnh thao tác màu trên tác phẩm mỹ thuật",
    imageCredit: {
      text: "Thực hành sáng tạo mỹ thuật · Nguồn: Trường Đại học Văn Lang ↗",
      href: "https://www.vlu.edu.vn/academics/majors/thac-si-ly-luan-va-lich-su-my-thuat-ung-dung",
    },
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "210410",
        detail: "Mã chương trình: 8210410-01",
      },
      {
        label: "Khối lượng chương trình",
        value: "60 tín chỉ",
        detail: "Định hướng ứng dụng",
      },
      {
        label: "Thời gian đào tạo",
        value: "18–24 tháng",
        detail: "Theo kế hoạch đào tạo",
      },
      {
        label: "Hình thức đào tạo",
        value: "Chính quy",
        detail: "Tập trung",
      },
      {
        label: "Ngôn ngữ đào tạo",
        value: "Tiếng Việt",
        detail: "",
      },
      {
        label: "Học phí toàn khóa",
        value: "100 triệu đồng",
        detail: "",
      },
    ],
  },
  section01: {
    ...programmeSharedContent.overview,
    sectionNumber: "01",
    overviewTitle: "Tổng quan chương trình",
    headline: "Sáng tạo có nền tảng. Thiết kế tạo tác động.",
    overview: [
      "Chương trình Thạc sĩ Mỹ thuật ứng dụng tại Văn Lang phát triển năng lực tư duy sáng tạo, nghiên cứu và thực hành thiết kế trong bối cảnh liên ngành. Người học kết nối kiến thức văn hóa – xã hội, mỹ thuật, công nghệ và phương pháp nghiên cứu để giải quyết các vấn đề thiết kế trong thực tiễn.",
      "Khối học phần nền tảng trải rộng từ phương pháp nghiên cứu khoa học, văn hóa dân tộc học nghệ thuật, mỹ thuật học đến thiết kế cộng đồng và thiết kế trải nghiệm người dùng. Các lựa chọn chuyên sâu mở rộng sang tâm lý thiết kế, truyền thông tích hợp, thiết kế sản phẩm tương tác, công nghệ – chất liệu và tư duy thiết kế.",
      "Ở giai đoạn chuyên ngành, người học tiếp tục phát triển tư duy sáng tạo thông qua phương pháp luận sáng tạo, lý thuyết văn hóa thị giác, phát triển sản phẩm, phân tích dữ liệu, thiết kế đương đại, thiết kế bền vững và workshop chuyên ngành.",
      "Văn bằng tốt nghiệp: Thạc sĩ Mỹ thuật ứng dụng Master of Applied Arts",
    ],
    overviewImage: "/images/pages/programmes/my-thuat-ung-dung/programme-overview.webp",
    imageAlt: "Hoạt động học thuật và sáng tạo trong lĩnh vực mỹ thuật và thiết kế tại Văn Lang",
    imageCredit: {
      text: "Không gian học thuật & sáng tạo · Trường Đại học Văn Lang",
    },
    focusAreas: ["Social Design", "User Experience", "Design Thinking", "Thiết kế bền vững"],
    ribbonTitle: "",
    tags: [],
    link: {
      text: "Khám phá chương trình đào tạo",
      href: "#chuong-trinh",
      ariaLabel: "Khám phá khung chương trình Mỹ thuật Ứng dụng",
    },
  },
  section02: {
    ...programmeSharedContent.highlights,
    sectionNumber: "02",
    highlights: [
      {
        title: "Thiết kế gắn với cộng đồng",
        text: "Kết nối thiết kế cộng đồng, văn hóa và môi trường để phát triển các giải pháp sáng tạo có giá trị xã hội.",
      },
      {
        title: "Trải nghiệm người dùng & truyền thông",
        text: "Phát triển góc nhìn về trải nghiệm người dùng, tâm lý thiết kế và phương tiện truyền thông tích hợp trong các bối cảnh thiết kế mới.",
      },
      {
        title: "Công nghệ, chất liệu & sản phẩm",
        text: "Mở rộng khả năng ứng dụng công nghệ và chất liệu, phát triển sản phẩm và thiết kế tương tác trong môi trường liên ngành.",
      },
      {
        title: "Thực tập & đề án tốt nghiệp",
        text: "Chương trình kết thúc bằng thực tập tốt nghiệp 6 tín chỉ và đề án tốt nghiệp 9 tín chỉ, gắn quá trình học với một sản phẩm hoặc vấn đề thiết kế cụ thể.",
      },
      {
        title: "Từ ý tưởng đến giải pháp thiết kế có giá trị",
        text: "Chương trình hướng đến khả năng tự nghiên cứu, thích ứng với thay đổi của xã hội và công nghệ, đồng thời phát triển tư duy phản biện, sáng tạo, tổ chức và quản lý hoạt động chuyên môn trong lĩnh vực mỹ thuật ứng dụng.",
      },
    ],
    learningOutcomes: {
      intro:
        "Mười chuẩn đầu ra trong bản mô tả chương trình tập trung vào kiến thức liên ngành, năng lực sáng tạo – nghiên cứu, công nghệ, quản lý chuyên môn và trách nhiệm với cộng đồng.",
      items: [
        {
          code: "PLO 1",
          title: "Kiến thức xã hội & môi trường",
          text: "Áp dụng kiến thức về kinh tế, chính trị, xã hội và môi trường vào lĩnh vực thiết kế.",
        },
        {
          code: "PLO 2",
          title: "Kiến thức liên ngành",
          text: "Vận dụng kiến thức liên ngành khoa học xã hội trong lĩnh vực thiết kế.",
        },
        {
          code: "PLO 3",
          title: "Nền tảng nghiên cứu mỹ thuật ứng dụng",
          text: "Áp dụng các nguyên lý và học thuyết cơ bản trong lĩnh vực nghiên cứu thuộc chuyên ngành Mỹ thuật ứng dụng.",
        },
        {
          code: "PLO 4",
          title: "Giải pháp sáng tạo",
          text: "Đề xuất các giải pháp sáng tạo để giải quyết những vấn đề mới trong lĩnh vực Mỹ thuật ứng dụng.",
        },
        {
          code: "PLO 5",
          title: "Năng lực nghiên cứu",
          text: "Thành thạo các kỹ năng nghiên cứu trong lĩnh vực Mỹ thuật ứng dụng.",
        },
        {
          code: "PLO 6",
          title: "Làm việc liên ngành & đa văn hóa",
          text: "Phát triển năng lực làm việc trong môi trường liên ngành và đa văn hóa.",
        },
        {
          code: "PLO 7",
          title: "Tích hợp công nghệ",
          text: "Tích hợp công nghệ vào nghiên cứu và giải quyết các vấn đề trong lĩnh vực thiết kế.",
        },
        {
          code: "PLO 8",
          title: "Tổ chức & quản lý",
          text: "Phát triển kỹ năng tổ chức và quản lý các hoạt động liên quan đến Mỹ thuật ứng dụng.",
        },
        {
          code: "PLO 9",
          title: "Đạo đức nghề nghiệp",
          text: "Gìn giữ đạo đức trong nghiên cứu và thiết kế.",
        },
        {
          code: "PLO 10",
          title: "Học tập suốt đời & cộng đồng",
          text: "Duy trì ý thức tự nghiên cứu và phát triển chuyên môn để phục vụ lợi ích cộng đồng.",
        },
      ],
    },
    outcomesHeading: "Chuẩn đầu ra của chương trình",
  },
  section03: {
    sectionNumber: "03",
    audienceHeading: "Chương trình phù hợp với ai?",
    headline: "Đào sâu tư duy thiết kế. Mở rộng năng lực sáng tạo.",
    intro: [
      "Chương trình phù hợp với người học có nền tảng thiết kế, mỹ thuật, kiến trúc hoặc các lĩnh vực liên quan, muốn phát triển năng lực chuyên môn ở trình độ sau đại học và tạo ra các giải pháp thiết kế có giá trị thực tiễn.",
    ],
    audience: [
      {
        title: "Nhà thiết kế & chuyên gia sáng tạo",
        text: "Muốn hệ thống hóa nền tảng chuyên môn, mở rộng phương pháp nghiên cứu và nâng cao năng lực dẫn dắt dự án thiết kế.",
      },
      {
        title: "Người làm việc trong ngành sáng tạo",
        text: "Quan tâm đến thiết kế cộng đồng, trải nghiệm người dùng, truyền thông, sản phẩm, công nghệ và vật liệu trong môi trường liên ngành.",
      },
      {
        title: "Người định hướng giảng dạy hoặc khởi nghiệp",
        text: "Muốn phát triển năng lực nghiên cứu, tổ chức chuyên môn và xây dựng thương hiệu hoặc doanh nghiệp thiết kế riêng.",
      },
    ],
    requirements: [
      {
        title: "Ngành tốt nghiệp có phù hợp?",
        paragraphs: [
          "Ứng viên tốt nghiệp các ngành thiết kế thuộc nhóm Mỹ thuật ứng dụng và Thiết kế Nội thất có thể được miễn bổ sung kiến thức. Các nhóm liên quan khác được xác định học bổ sung tối đa 4 hoặc 10 tín chỉ sau khi đối chiếu văn bằng và bảng điểm.",
        ],
      },
      {
        title: "Phương thức tuyển sinh",
        paragraphs: ["Xét tuyển kết hợp phỏng vấn theo thông báo tuyển sinh năm 2027."],
      },
      {
        title: "Yêu cầu ngoại ngữ",
        paragraphs: [
          "Chương trình tiếng Việt yêu cầu ngoại ngữ đầu vào tương đương Bậc 3/6 trở lên theo các hình thức được Trường công nhận. Chuẩn đầu ra thực hiện theo quy định hiện hành của chương trình và Nhà trường.",
        ],
      },
      {
        title: "Các hình thức minh chứng ngoại ngữ đầu vào",
        paragraphs: [
          "Ứng viên có thể đáp ứng yêu cầu bằng văn bằng, chứng chỉ ngoại ngữ hợp lệ hoặc kết quả đánh giá năng lực ngoại ngữ do Trường tổ chức/công nhận theo thông báo tuyển sinh.",
          "Ứng viên là công dân nước ngoài học chương trình tiếng Việt cần đáp ứng yêu cầu tiếng Việt theo quy định của Nhà trường.",
        ],
        groups: [],
      },
      {
        title: "Bổ sung kiến thức đầu vào",
        paragraphs: [
          "Khoa và Viện Sau đại học đối chiếu ngành tốt nghiệp, nội dung chương trình và bảng điểm để xác định học phần cần bổ sung trước khi xét tuyển.",
          "Các học phần bổ sung kiến thức không tính vào 60 tín chỉ của chương trình thạc sĩ.",
        ],
        groups: [
          {
            title: "01. Nhóm không cần bổ sung kiến thức",
            paragraphs: [],
            groups: [],
            points: [
              "Mỹ thuật ứng dụng Thiết kế Công nghiệp; Thiết kế Đồ họa; Thiết kế Thời trang; Thiết kế Mỹ thuật Sân khấu - Điện ảnh; Thiết kế Mỹ thuật số.",
              "Kiến trúc nội thất Thiết kế Nội thất.",
            ],
          },
          {
            title: "02. Nhóm liên quan · Tối đa 4 tín chỉ",
            paragraphs: [],
            groups: [
              {
                title: "Học phần bổ sung",
                paragraphs: [],
                points: ["Tư duy thiết kế · 2 tín chỉ .", "Mỹ thuật học · 2 tín chỉ ."],
              },
            ],
            points: [
              "Mỹ thuật Mỹ thuật đô thị.",
              "Kiến trúc & Quy hoạch Kiến trúc; Kiến trúc cảnh quan; Kiến trúc Nội thất; Kiến trúc Đô thị.",
            ],
          },
          {
            title: "03. Nhóm liên quan khác · Tối đa 10 tín chỉ",
            paragraphs: [],
            groups: [
              {
                title: "Học phần bổ sung",
                paragraphs: [
                  "Khối lượng tối đa 10 tín chỉ; học phần thực tế được xác định sau khi đối chiếu hồ sơ.",
                ],
                points: [
                  "Tư duy thiết kế · 2 tín chỉ .",
                  "Mỹ thuật học · 2 tín chỉ .",
                  "Lịch sử Mỹ thuật · 3 tín chỉ .",
                  "Văn hóa dân tộc học nghệ thuật · 3 tín chỉ .",
                ],
              },
            ],
            points: [
              "Báo chí & truyền thông Thiết kế truyền thông đa phương tiện; Công nghệ truyền thông.",
              "Công nghệ thông tin Khoa học máy tính; Trí tuệ nhân tạo; Khoa học dữ liệu.",
            ],
          },
          {
            title: "Ngành khác",
            paragraphs: [
              "Khoa chuyên môn và Viện Sau đại học xem xét hồ sơ, bảng điểm và nền tảng chuyên môn để xác định điều kiện dự tuyển và học phần bổ sung phù hợp.",
            ],
          },
        ],
      },
    ],
  },
  section04: {
    sectionNumber: "04",
    careerHeading: "Cơ hội nghề nghiệp và phát triển",
    headline: "Từ thực hành sáng tạo đến năng lực dẫn dắt thiết kế.",
    intro:
      "Chương trình hướng đến các vị trí sáng tạo, tư vấn, quản lý chuyên môn, giảng dạy và nghiên cứu trong hệ sinh thái mỹ thuật ứng dụng và thiết kế.",
    note: "",
    careerImage: "/images/pages/programmes/my-thuat-ung-dung/programme-hero.jpg",
    careers: [
      {
        group: "Sáng tạo & thiết kế",
        title: "Giám đốc sáng tạo",
        sub: "Dẫn dắt định hướng hình ảnh, trải nghiệm và giải pháp thiết kế tại doanh nghiệp, studio hoặc tổ chức sáng tạo.",
      },
      {
        group: "Sáng tạo & thiết kế",
        title: "Chuyên gia thiết kế",
        sub: "Phát triển sản phẩm, trải nghiệm, truyền thông và các giải pháp mỹ thuật ứng dụng cho tổ chức và doanh nghiệp.",
      },
      {
        group: "Tư vấn & khởi nghiệp",
        title: "Tư vấn thiết kế",
        sub: "Ứng dụng nghiên cứu người dùng, văn hóa, công nghệ và phương pháp sáng tạo để tư vấn chiến lược và giải pháp thiết kế.",
      },
      {
        group: "Tư vấn & khởi nghiệp",
        title: "Xây dựng thương hiệu thiết kế",
        sub: "Phát triển studio, doanh nghiệp hoặc thương hiệu thiết kế dựa trên năng lực chuyên môn và tư duy quản trị sáng tạo.",
      },
      {
        group: "Giảng dạy & nghiên cứu",
        title: "Giảng dạy chuyên môn",
        sub: "Tham gia đào tạo lĩnh vực thiết kế và mỹ thuật ứng dụng khi đáp ứng yêu cầu của cơ sở giáo dục.",
      },
      {
        group: "Giảng dạy & nghiên cứu",
        title: "Nghiên cứu & phát triển",
        sub: "Tham gia các viện, trung tâm, dự án nghiên cứu và đổi mới sáng tạo liên quan đến thiết kế, văn hóa, công nghệ và cộng đồng.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình kết hợp nền tảng nghiên cứu và mỹ thuật với thiết kế cộng đồng, trải nghiệm người dùng, công nghệ – chất liệu và phát triển sản phẩm; người học hoàn thành thực tập và đề án tốt nghiệp ở giai đoạn cuối.",
    ],
    trackLabels: ["Định hướng ứng dụng"],
    graduationProjects: ["Đề án tốt nghiệp · 9 tín chỉ"],
    studyMode: "Chính quy tập trung",
    generalFacts: [
      {
        label: "Thời gian đào tạo",
        value: "18–24 tháng",
      },
      {
        label: "Định hướng",
        value: "Ứng dụng",
      },
      {
        label: "Hình thức",
        value: "Chính quy tập trung",
      },
      {
        label: "Ngôn ngữ",
        value: "Tiếng Việt",
      },
      {
        label: "Thực tập",
        value: "6 tín chỉ",
      },
      {
        label: "Tốt nghiệp",
        value: "Đề án · 9 tín chỉ",
      },
    ],
    notes: [
      "Chương trình có tổng khối lượng 60 tín chỉ theo định hướng ứng dụng. Danh mục dưới đây được tổng hợp từ bản mô tả chương trình 2024 và cấu trúc công khai của Viện Sau đại học.",
      "",
    ],
    semesters: {
      heading: "Kế hoạch học tập tham khảo theo file chương trình",
      intro:
        "Bản mô tả 2024 phân bổ danh mục học phần qua 6 học kỳ. Việc lựa chọn các học phần tự chọn và lịch mở lớp thực hiện theo kế hoạch của Khoa.",
      items: [
        {
          title: "Học kỳ 1",
          subtitle: "",
          groups: [
            {
              title: "Học kỳ 1",
              description: [
                "Triết học; Phương pháp nghiên cứu khoa học; Văn hóa dân tộc học nghệ thuật; Mỹ thuật học.",
              ],
              courses: [],
            },
          ],
        },
        {
          title: "Học kỳ 2",
          subtitle: "",
          groups: [
            {
              title: "Học kỳ 2",
              description: [
                "Thiết kế cộng đồng; Thiết kế trải nghiệm người dùng; Phương pháp nghiên cứu lịch sử Mỹ thuật; Tâm lý thiết kế; Phương tiện truyền thông tích hợp.",
              ],
              courses: [],
            },
          ],
        },
        {
          title: "Học kỳ 3",
          subtitle: "",
          groups: [
            {
              title: "Học kỳ 3",
              description: [
                "Thiết kế sản phẩm tương tác; Công nghệ và chất liệu; Tư duy thiết kế; Phương pháp luận sáng tạo; Lý thuyết văn hóa thị giác.",
              ],
              courses: [],
            },
          ],
        },
        {
          title: "Học kỳ 4",
          subtitle: "",
          groups: [
            {
              title: "Học kỳ 4",
              description: [
                "Cơ sở lý luận đề tài; Phát triển sản phẩm; Phân tích dữ liệu; Thiết kế đương đại; Thiết kế bền vững.",
              ],
              courses: [],
            },
          ],
        },
        {
          title: "Học kỳ 5",
          subtitle: "",
          groups: [
            {
              title: "Học kỳ 5",
              description: [
                "Workshop - Chuyên ngành thiết kế; Lịch sử và thẩm mỹ công nghiệp; Thực tập tốt nghiệp.",
              ],
              courses: [],
            },
          ],
        },
        {
          title: "Học kỳ 6",
          subtitle: "",
          groups: [
            {
              title: "Học kỳ 6",
              description: ["Đề án tốt nghiệp."],
              courses: [],
            },
          ],
        },
      ],
    },
    completion: {
      heading: "Thực tập và đề án tốt nghiệp",
      items: ["Thực tập tốt nghiệp · 6 tín chỉ", "Đề án tốt nghiệp · 9 tín chỉ"],
    },
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody: "Trao đổi về chương trình, nền tảng đã học và mục tiêu của bạn để chuẩn bị phù hợp.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ định hướng sáng tạo của bạn."],
      body: "Trao đổi với Viện Sau đại học để được tư vấn về chương trình Mỹ thuật ứng dụng, điều kiện đầu vào và lộ trình đăng ký.",
      benefits: [
        "Tư vấn chương trình và định hướng học",
        "Hướng dẫn học phí và chính sách hỗ trợ",
        "Đối chiếu điều kiện và hồ sơ dự tuyển",
      ],
      formTitle: "Trao đổi trực tiếp với Viện",
    },
    contactActions: [
      {
        text: "Gọi tư vấn ↗",
        href: "tel:0988486869",
      },
      {
        text: "Gửi email ↗",
        href: "mailto:tuyensinh.sdh@vlu.edu.vn",
      },
      {
        text: "Hướng dẫn đăng ký dự tuyển ↗",
        href: "/admissions",
      },
    ],
  },
  faq: {
    ...programmeSharedContent.faq,
    faqs: [
      {
        question: "Chương trình Mỹ thuật ứng dụng theo định hướng nào?",
        answer:
          "Chương trình được triển khai theo định hướng ứng dụng, kết hợp nền tảng nghiên cứu với thực hành thiết kế, thực tập và đề án tốt nghiệp.",
      },
      {
        question: "Khối lượng chương trình là bao nhiêu?",
        answer:
          "Tổng khối lượng chương trình là 60 tín chỉ, trong đó có thực tập tốt nghiệp 6 tín chỉ và đề án tốt nghiệp 9 tín chỉ.",
      },
      {
        question: "Những lĩnh vực chuyên môn nào được chú trọng?",
        answer:
          "Chương trình tập trung vào thiết kế cộng đồng, trải nghiệm người dùng, mỹ thuật học, văn hóa nghệ thuật, truyền thông tích hợp, thiết kế tương tác, công nghệ và chất liệu, tư duy thiết kế, phát triển sản phẩm và thiết kế bền vững.",
      },
      {
        question: "Ngành nào không cần học bổ sung kiến thức?",
        answer:
          "Nhóm các ngành thiết kế thuộc Mỹ thuật ứng dụng và Thiết kế Nội thất thuộc danh mục được miễn bổ sung kiến thức theo phụ lục tuyển sinh 2027. Các nhóm khác được đối chiếu hồ sơ để xác định khối lượng cần bổ sung.",
      },
      {
        question: "Phương thức tuyển sinh là gì?",
        answer:
          "Ngành Mỹ thuật ứng dụng áp dụng phương thức xét tuyển kết hợp phỏng vấn theo thông báo tuyển sinh năm 2027.",
      },
      {
        question: "Học phí toàn khóa là bao nhiêu?",
        answer:
          "Chương trình Mỹ thuật ứng dụng bằng tiếng Việt có học phí toàn khóa 100.000.000 đồng, chia ba đợt 35.000.000 đồng, 30.000.000 đồng và 35.000.000 đồng. Học bổng và hỗ trợ tài chính áp dụng theo điều kiện của từng chính sách.",
      },
    ],
  },
  fees: {
    heading: "Chủ động chuẩn bị cho hành trình học.",
    intro: [
      "Học phí toàn khóa được chia thành ba đợt thanh toán, giúp người học chủ động sắp xếp kế hoạch tài chính.",
      "Các chính sách học bổng và hỗ trợ tài chính được xét theo điều kiện và hồ sơ. Người học chỉ được áp dụng một chính sách có mức cao nhất trong các nhóm được quy định, không cộng dồn.",
    ],
    intake: "TUYỂN SINH THẠC SĨ 2027",
    language: "Tiếng Việt",
    total: "100.000.000 đồng",
    installments: [
      {
        label: "Đợt 1 · 35%",
        amount: "35.000.000 đồng",
      },
      {
        label: "Đợt 2 · 30%",
        amount: "30.000.000 đồng",
      },
      {
        label: "Đợt 3 · 35%",
        amount: "35.000.000 đồng",
      },
    ],
    additionalFees: [
      {
        title: "Lệ phí xét tuyển",
        amount: "500.000 đồng",
        note: "Nộp minh chứng khi nộp hồ sơ dự tuyển.",
      },
      {
        title: "Lệ phí nhập học",
        amount: "1.000.000 đồng",
        note: "Nộp cùng học phí đợt đầu.",
      },
      {
        title: "Học bổ sung kiến thức",
        amount: "1.200.000 đồng/môn",
        note: "Áp dụng khi hồ sơ thuộc diện phải học bổ sung.",
      },
      {
        title: "Ôn tập tiếng Anh đầu vào",
        amount: "1.000.000 đồng",
        note: "Đăng ký tự nguyện.",
      },
      {
        title: "Thi tiếng Anh đầu vào",
        amount: "1.000.000 đồng",
        note: "Người đã đạt chuẩn đầu vào không phải tham gia kỳ thi.",
      },
      {
        title: "Gia hạn chương trình",
        amount: "5% học phí toàn khóa/lần",
        note: "Mỗi lần gia hạn 6 tháng, áp dụng khi học vượt thời gian tiêu chuẩn.",
      },
    ],
    notes: [
      "Hoạt động học tập thực tế, tham quan chuyên môn hoặc thực địa có thể phát sinh chi phí ngoài học phí toàn khóa; Khoa thông báo nội dung và chi phí trước khi triển khai. Điều kiện thu, hoàn trả và các khoản phát sinh thực hiện theo thông báo được ban hành.",
      "Mức trên chưa trừ học bổng, hỗ trợ và chưa bao gồm các khoản thu riêng. Ngày đến hạn thanh toán theo thông báo thu của Trường.",
    ],
  },
};

export const myThuatUngDungProgramme: Programme = {
  id: "my-thuat-ung-dung",
  code: "210410",
  title: "Mỹ thuật Ứng dụng",
  englishTitle: "Master of Applied Arts",
  degree: "Thạc sĩ",
  field: "Thiết kế & Mỹ thuật Ứng dụng",
  orientation: "Ứng dụng",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy tập trung, tiếng Việt",
  intake: "Tuyển sinh thạc sĩ 2027",
  summary:
    "Phát triển tư duy sáng tạo, năng lực nghiên cứu và khả năng dẫn dắt thực hành thiết kế; kết nối văn hóa, công nghệ và trải nghiệm thực tiễn để tạo ra các giải pháp mỹ thuật ứng dụng có giá trị cho cộng đồng.",
  schedule:
    "Buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu theo từng học kỳ.",
  tuition: "100.000.000 VNĐ",
};

export function getMyThuatUngDungCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "Thiết kế · Nghiên cứu · Công nghệ · Thực hành",
      graduationProject: "Đề án tốt nghiệp · 9 tín chỉ",
      intro:
        "Chương trình kết hợp nền tảng nghiên cứu và mỹ thuật với thiết kế cộng đồng, trải nghiệm người dùng, công nghệ – chất liệu và phát triển sản phẩm; người học hoàn thành thực tập và đề án tốt nghiệp ở giai đoạn cuối.",
      generalFacts: [
        {
          label: "Thời gian đào tạo",
          value: "18–24 tháng",
        },
        {
          label: "Định hướng",
          value: "Ứng dụng",
        },
        {
          label: "Hình thức",
          value: "Chính quy tập trung",
        },
        {
          label: "Ngôn ngữ",
          value: "Tiếng Việt",
        },
        {
          label: "Thực tập",
          value: "6 tín chỉ",
        },
        {
          label: "Tốt nghiệp",
          value: "Đề án · 9 tín chỉ",
        },
      ],
      notes: [
        "Chương trình có tổng khối lượng 60 tín chỉ theo định hướng ứng dụng. Danh mục dưới đây được tổng hợp từ bản mô tả chương trình 2024 và cấu trúc công khai của Viện Sau đại học.",
        "",
      ],
      groups: [
        {
          title: "I. Kiến thức chung",
          totalCreditsLabel: "3 tín chỉ",
          courses: [
            {
              name: "Triết học",
              englishName: "",
              credits: 3,
            },
          ],
          description: [],
        },
        {
          title: "II. Kiến thức cơ sở ngành",
          totalCreditsLabel: "27 tín chỉ",
          courses: [],
          subgroups: [
            {
              title: "Bắt buộc · 15 tín chỉ",
              totalCreditsLabel: "15 tín chỉ",
              description: [],
              courses: [
                {
                  name: "Phương pháp nghiên cứu khoa học",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Văn hóa dân tộc học nghệ thuật",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Mỹ thuật học",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Thiết kế cộng đồng",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Thiết kế trải nghiệm người dùng",
                  englishName: "",
                  credits: 3,
                },
              ],
            },
            {
              title: "Tự chọn · tích lũy 12 tín chỉ",
              totalCreditsLabel: "3 tín chỉ",
              description: ["Chọn 4 học phần, mỗi học phần 3 tín chỉ."],
              courses: [
                {
                  name: "Phương pháp nghiên cứu lịch sử Mỹ thuật",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Tâm lý thiết kế",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Phương tiện truyền thông tích hợp",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Thiết kế sản phẩm tương tác",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Công nghệ và chất liệu",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Tư duy thiết kế",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
              ],
            },
          ],
          description: [],
        },
        {
          title: "III. Kiến thức chuyên ngành",
          totalCreditsLabel: "15 tín chỉ",
          courses: [],
          subgroups: [
            {
              title: "Bắt buộc · 6 tín chỉ",
              totalCreditsLabel: "6 tín chỉ",
              description: [],
              courses: [
                {
                  name: "Phương pháp luận sáng tạo",
                  englishName: "",
                  credits: 2,
                },
                {
                  name: "Lý thuyết văn hóa thị giác",
                  englishName: "",
                  credits: 2,
                },
                {
                  name: "Cơ sở lý luận đề tài",
                  englishName: "",
                  credits: 2,
                },
              ],
            },
            {
              title: "Tự chọn · tích lũy 9 tín chỉ",
              totalCreditsLabel: "3 tín chỉ",
              description: ["Chọn 3 học phần, mỗi học phần 3 tín chỉ."],
              courses: [
                {
                  name: "Phát triển sản phẩm",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Phân tích dữ liệu",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Thiết kế đương đại",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Thiết kế bền vững",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Workshop - Chuyên ngành thiết kế",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Lịch sử và thẩm mỹ công nghiệp",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
              ],
            },
          ],
          description: [],
        },
        {
          title: "IV. Thực tập & đề án tốt nghiệp",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              name: "Thực tập tốt nghiệp",
              englishName: "",
              credits: 6,
            },
            {
              name: "Đề án tốt nghiệp",
              englishName: "",
              credits: 9,
            },
          ],
          description: [],
        },
      ],
      semesters: {
        heading: "Kế hoạch học tập tham khảo theo file chương trình",
        intro:
          "Bản mô tả 2024 phân bổ danh mục học phần qua 6 học kỳ. Việc lựa chọn các học phần tự chọn và lịch mở lớp thực hiện theo kế hoạch của Khoa.",
        items: [
          {
            title: "Học kỳ 1",
            subtitle: "",
            groups: [
              {
                title: "Học kỳ 1",
                description: [
                  "Triết học; Phương pháp nghiên cứu khoa học; Văn hóa dân tộc học nghệ thuật; Mỹ thuật học.",
                ],
                courses: [],
              },
            ],
          },
          {
            title: "Học kỳ 2",
            subtitle: "",
            groups: [
              {
                title: "Học kỳ 2",
                description: [
                  "Thiết kế cộng đồng; Thiết kế trải nghiệm người dùng; Phương pháp nghiên cứu lịch sử Mỹ thuật; Tâm lý thiết kế; Phương tiện truyền thông tích hợp.",
                ],
                courses: [],
              },
            ],
          },
          {
            title: "Học kỳ 3",
            subtitle: "",
            groups: [
              {
                title: "Học kỳ 3",
                description: [
                  "Thiết kế sản phẩm tương tác; Công nghệ và chất liệu; Tư duy thiết kế; Phương pháp luận sáng tạo; Lý thuyết văn hóa thị giác.",
                ],
                courses: [],
              },
            ],
          },
          {
            title: "Học kỳ 4",
            subtitle: "",
            groups: [
              {
                title: "Học kỳ 4",
                description: [
                  "Cơ sở lý luận đề tài; Phát triển sản phẩm; Phân tích dữ liệu; Thiết kế đương đại; Thiết kế bền vững.",
                ],
                courses: [],
              },
            ],
          },
          {
            title: "Học kỳ 5",
            subtitle: "",
            groups: [
              {
                title: "Học kỳ 5",
                description: [
                  "Workshop - Chuyên ngành thiết kế; Lịch sử và thẩm mỹ công nghiệp; Thực tập tốt nghiệp.",
                ],
                courses: [],
              },
            ],
          },
          {
            title: "Học kỳ 6",
            subtitle: "",
            groups: [
              {
                title: "Học kỳ 6",
                description: ["Đề án tốt nghiệp."],
                courses: [],
              },
            ],
          },
        ],
      },
      completion: {
        heading: "Thực tập và đề án tốt nghiệp",
        items: ["Thực tập tốt nghiệp · 6 tín chỉ", "Đề án tốt nghiệp · 9 tín chỉ"],
      },
    },
  ];
}
