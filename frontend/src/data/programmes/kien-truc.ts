// Nguồn: thac-si-kien-truc.html do người dùng cung cấp ngày 24/10/2026.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";

export const kienTrucPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển tư duy thiết kế, khả năng tích hợp kiến thức và năng lực quản lý dự án để đề xuất giải pháp kiến trúc sáng tạo, bền vững và phù hợp bối cảnh.",
    heroSlogan: "FUTURE",
    heroImage: "/images/pages/programmes/kien-truc/programme-hero.webp",
    imageAlt: "Trao đổi quanh mô hình và bản vẽ kiến trúc tại Văn Lang",
    imageCredit: {
      text: "Trao đổi về mô hình kiến trúc · Nguồn: Văn Lang ↗",
      href: "https://www.vlu.edu.vn/academics/majors/thac-si-kien-truc",
    },
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "580101",
        detail: "Mã chương trình: 8580101",
      },
      {
        label: "Khối lượng chương trình",
        value: "60 tín chỉ",
        detail: "Định hướng ứng dụng",
      },
      {
        label: "Thời gian đào tạo",
        value: "18 tháng",
        detail: "",
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
        value: "85 triệu đồng",
        detail: "",
      },
    ],
  },
  section01: {
    ...programmeSharedContent.overview,
    sectionNumber: "01",
    overviewTitle: "Tổng quan chương trình",
    headline: "Phát triển tư duy thiết kế. Vững năng lực hành nghề.",
    overview: [
      "Chương trình Thạc sĩ Kiến trúc tại Văn Lang phát triển kiến thức chuyên ngành và liên ngành, kết nối lý luận kiến trúc với hoạt động thiết kế, tư vấn và quản lý. Người học nâng cao khả năng phân tích bối cảnh, hình thành ý tưởng và giải quyết các vấn đề kiến trúc trong thực tiễn nghề nghiệp.",
      "Định hướng ứng dụng được thể hiện qua đồ án thiết kế nâng cao, hình thái đô thị, tham quan và phê bình kiến trúc, quản lý dự án, thực tập và đề án tốt nghiệp. Các nội dung về thiết kế bền vững, bảo tồn di sản và BIM bổ sung góc nhìn cho quá trình phát triển giải pháp.",
      "Bảy nhóm học phần tự chọn mở rộng sang cảnh quan, thiết kế đô thị, môi trường ở, công trình xanh, công nghệ và vật liệu mới. Người học chọn một học phần trong mỗi nhóm để tích lũy 14 tín chỉ tự chọn.",
      "Văn bằng tốt nghiệp: Thạc sĩ Kiến trúc Master of Architecture",
    ],
    overviewImage: "/images/pages/programmes/kien-truc/programme-overview.webp",
    imageAlt: "Hoàn thiện bản vẽ mặt bằng và mặt cắt kiến trúc tại Văn Lang",
    imageCredit: {
      text: "Thực hành thể hiện bản vẽ kiến trúc Nguồn: Trường Đại học Văn Lang ↗",
      href: "https://www.vlu.edu.vn/academics/majors/thac-si-kien-truc",
    },
    focusAreas: ["Thiết kế bền vững", "BIM", "Bảo tồn di sản", "Quản lý dự án"],
    ribbonTitle: "Định hướng ứng dụng. Kết nối thiết kế với thực tiễn.",
    tags: [
      "Thời gian đào tạo Chính quy tập trung 18 tháng",
      "Khối lượng chương trình Bao gồm đề án tốt nghiệp 9 tín chỉ 60 tín chỉ",
    ],
    link: {
      text: "Khám phá chương trình đào tạo",
      href: "#chuong-trinh",
      ariaLabel: "Khám phá khung chương trình Kiến trúc",
    },
  },
  section02: {
    ...programmeSharedContent.highlights,
    sectionNumber: "02",
    highlights: [
      {
        title: "Thiết kế gắn với bối cảnh",
        text: "Rèn luyện tư duy thiết kế qua đồ án kiến trúc nâng cao, hình thái đô thị và hoạt động phân tích, đánh giá, phê bình kiến trúc.",
      },
      {
        title: "Bền vững, bản sắc và di sản",
        text: "Kết nối thiết kế bền vững với lý luận bảo tồn di sản; mở rộng qua các lựa chọn về công trình xanh, môi trường ở và phát triển đô thị.",
      },
      {
        title: "BIM trong thiết kế và quản lý",
        text: "Tiếp cận mô hình thông tin công trình trong thiết kế và quản lý công trình kiến trúc, gắn với năng lực tổ chức và điều hành dự án.",
      },
      {
        title: "Phát triển năng lực qua dự án",
        text: "Kết hợp học phần quản lý và phát triển dự án, hai học phần thực tập và đề án tốt nghiệp để vận dụng kiến thức vào hoạt động chuyên môn.",
      },
      {
        title: "Từ phân tích bối cảnh đến phát triển giải pháp",
        text: "Chương trình kết hợp kiến thức chuyên ngành, phương pháp nghiên cứu và thực hành thiết kế. Người học rèn luyện khả năng đánh giá phương án, tích hợp yếu tố kỹ thuật, kinh tế và xã hội, đồng thời phát triển năng lực tổ chức công việc và phản biện chuyên môn.",
      },
    ],
    learningOutcomes: {
      intro:
        "Mười chuẩn đầu ra tập trung vào kiến thức chuyên sâu, kỹ năng nghiên cứu và thiết kế, năng lực quản lý cùng trách nhiệm nghề nghiệp.",
      items: [
        {
          code: "PLO 1",
          title: "Đánh giá lý luận và xu hướng kiến trúc",
          text: "Đánh giá, phát triển lý thuyết, nguyên lý và xu hướng kiến trúc để định hướng nghiên cứu, tư vấn và thiết kế phù hợp bối cảnh.",
        },
        {
          code: "PLO 2",
          title: "Tích hợp kiến thức và thiết kế bền vững",
          text: "Kết nối kiến thức liên ngành để đề xuất giải pháp kiến trúc đồng bộ, bền vững và phù hợp điều kiện tự nhiên, xã hội, kỹ thuật.",
        },
        {
          code: "PLO 3",
          title: "Xây dựng phương pháp nghiên cứu",
          text: "Xác định vấn đề, xây dựng câu hỏi và lựa chọn phương pháp nghiên cứu phù hợp trong lĩnh vực kiến trúc.",
        },
        {
          code: "PLO 4",
          title: "Phân tích dữ liệu và triển khai nghiên cứu",
          text: "Phân tích, tổng hợp dữ liệu và triển khai nghiên cứu để đưa ra kết luận có cơ sở khoa học và giá trị thực tiễn.",
        },
        {
          code: "PLO 5",
          title: "Sáng tạo định hướng và chiến lược",
          text: "Phát triển các định hướng và chiến lược kiến trúc có tính đổi mới, khả thi và đáp ứng yêu cầu thực tiễn.",
        },
        {
          code: "PLO 6",
          title: "Giải quyết bài toán kiến trúc phức tạp",
          text: "Lựa chọn phương án thiết kế và triển khai dự án trên cơ sở tích hợp các yếu tố kỹ thuật, kinh tế và xã hội.",
        },
        {
          code: "PLO 7",
          title: "Tổ chức và quản lý dự án",
          text: "Tổ chức, quản lý và điều hành hoạt động chuyên môn để đảm bảo hiệu quả, chất lượng và tiến độ dự án kiến trúc.",
        },
        {
          code: "PLO 8",
          title: "Trình bày và phản biện chuyên môn",
          text: "Trình bày, bảo vệ và phản biện nội dung chuyên môn, học thuật rõ ràng và thuyết phục.",
        },
        {
          code: "PLO 9",
          title: "Tự phát triển năng lực nghề nghiệp",
          text: "Đánh giá năng lực cá nhân, chủ động học tập suốt đời và thích ứng với sự thay đổi của môi trường nghề nghiệp.",
        },
        {
          code: "PLO 10",
          title: "Đạo đức và trách nhiệm xã hội",
          text: "Đánh giá chuẩn mực đạo đức nghề nghiệp và thực hiện trách nhiệm xã hội, phát triển bền vững trong kiến trúc.",
        },
      ],
    },
    outcomesHeading: "Chuẩn đầu ra của chương trình",
  },
  section03: {
    sectionNumber: "03",
    audienceHeading: "Chương trình phù hợp với ai?",
    headline: "Tiếp nối nền tảng đã có. Phát triển chiều sâu chuyên môn.",
    intro: [
      "Ứng viên đã tốt nghiệp hoặc đủ điều kiện được công nhận tốt nghiệp từ trình độ đại học trở lên, có ngành học phù hợp và đáp ứng các điều kiện dự tuyển của chương trình.",
    ],
    audience: [
      {
        title: "Kiến trúc sư và người làm thiết kế",
        text: "Mong muốn nâng cao nền tảng lý luận, tư duy sáng tạo và khả năng giải quyết các vấn đề kiến trúc trong thực tiễn.",
      },
      {
        title: "Người làm tư vấn và quản lý dự án",
        text: "Muốn phát triển năng lực tích hợp kiến thức, tổ chức công việc và quản lý các hoạt động chuyên môn trong kiến trúc, quy hoạch và xây dựng.",
      },
      {
        title: "Người quan tâm nghiên cứu và phát triển chuyên môn",
        text: "Hướng đến nâng cao năng lực phân tích, đánh giá và phản biện kiến trúc, hoặc phát triển theo hướng nghiên cứu, giảng dạy và học tập ở trình độ cao hơn.",
      },
    ],
    requirements: [
      {
        title: "Ngành tốt nghiệp có phù hợp?",
        paragraphs: [
          "Người tốt nghiệp ngành Kiến trúc có chương trình đào tạo ở bậc đại học từ 150 tín chỉ trở lên không cần học bổ sung kiến thức. Các ngành và chương trình còn lại trong danh mục được đối chiếu bảng điểm để xác định các học phần cần bổ sung, tối đa 9 tín chỉ. Ngành chưa có trong danh mục được Khoa chuyên môn rà soát để Nhà trường xem xét.",
        ],
      },
      {
        title: "Phương thức tuyển sinh",
        paragraphs: [
          "Xét tuyển. Hồ sơ được đánh giá theo điều kiện đầu vào và yêu cầu của chương trình Thạc sĩ Kiến trúc định hướng ứng dụng.",
          "Hồ sơ sử dụng văn bằng đại học do cơ sở giáo dục nước ngoài cấp cần kèm giấy công nhận hoặc xác nhận văn bằng theo quy định.",
        ],
      },
      {
        title: "Yêu cầu ngoại ngữ",
        paragraphs: [
          "Chương trình giảng dạy bằng tiếng Việt. Ứng viên đáp ứng ngoại ngữ đầu vào tương đương Bậc 3/6 trở lên theo các hình thức được công nhận. Chuẩn ngoại ngữ đầu ra là Bậc 4/6 trở lên, cần đạt trước thời điểm xét tốt nghiệp.",
        ],
      },
      {
        title: "Các hình thức minh chứng ngoại ngữ đầu vào",
        paragraphs: [
          "Ứng viên đáp ứng ít nhất một trong các điều kiện sau:",
          "Kỳ thi tiếng Anh đầu vào tại Văn Lang cấp giấy chứng nhận kết quả thi, có giá trị 12 tháng khi dự tuyển thạc sĩ tại Trường; không cấp chứng chỉ ngoại ngữ.",
          "Ứng viên là công dân nước ngoài cần đạt tiếng Việt từ Bậc 4 trở lên hoặc đã tốt nghiệp đại học hay tương đương trở lên từ chương trình được giảng dạy bằng tiếng Việt.",
        ],
        points: [
          "Bằng đại học trở lên ngành ngôn ngữ nước ngoài hoặc chương trình được giảng dạy chủ yếu bằng ngôn ngữ nước ngoài.",
          "Văn bằng, chứng chỉ tương đương Bậc 3 trở lên thuộc danh mục được công nhận và còn hiệu lực.",
          "Kết quả đánh giá tương đương Bậc 3 trở lên do Trường tổ chức; hoặc hoàn thành chương trình đào tạo, bồi dưỡng ngoại ngữ do Trường tổ chức hoặc công nhận.",
          "Bằng đại học trở lên do Văn Lang cấp trong thời hạn không quá 2 năm, với chương trình đã đáp ứng chuẩn đầu ra ngoại ngữ từ Bậc 3 trở lên.",
        ],
      },
      {
        title: "Bổ sung kiến thức đầu vào",
        paragraphs: [
          "Viện và Khoa đối chiếu ngành tốt nghiệp, chương trình đào tạo và bảng điểm để xác định các học phần cần bổ sung. Ứng viên hoàn thành các học phần được yêu cầu trước khi xét tuyển.",
          "Các học phần bổ sung kiến thức được xác định theo hồ sơ từng ứng viên và nằm ngoài 60 tín chỉ của chương trình thạc sĩ.",
          "Kết quả bổ sung kiến thức có giá trị 2 năm kể từ ngày được công nhận đạt yêu cầu.",
        ],
        groups: [
          {
            title: "01. Điều kiện không cần bổ sung kiến thức",
            paragraphs: [],
            groups: [
              {
                title: "Người tốt nghiệp ngành Kiến trúc",
                paragraphs: [
                  "Không cần học bổ sung kiến thức nếu chương trình đào tạo ở bậc đại học có từ 150 tín chỉ trở lên .",
                  "Ứng viên vẫn phải đáp ứng đầy đủ các điều kiện dự tuyển của chương trình.",
                ],
                points: [],
              },
            ],
          },
          {
            title: "02. Danh mục ngành phù hợp · Bổ sung tối đa 9 tín chỉ",
            paragraphs: [],
            groups: [
              {
                title: "Ngành tốt nghiệp được xem xét",
                paragraphs: [
                  "Với các ngành và chương trình trong danh mục chưa đáp ứng điều kiện miễn nêu trên, yêu cầu bổ sung được xác định qua bảng điểm, tối đa 9 tín chỉ.",
                ],
                points: [
                  "Công nghệ kỹ thuật kiến trúc và công trình xây dựng Công nghệ kỹ thuật kiến trúc.",
                  "Kiến trúc và quy hoạch Kiến trúc; Kiến trúc cảnh quan; Kiến trúc nội thất; Quy hoạch vùng và đô thị; Thiết kế nội thất.",
                ],
              },
              {
                title: "Các học phần bổ sung kiến thức",
                paragraphs: [
                  "Các học phần cụ thể được xác định sau khi đối chiếu nội dung và khối lượng kiến thức đã tích lũy của từng ứng viên.",
                ],
                points: [
                  "Đồ án kiến trúc công cộng · 3 tín chỉ .",
                  "Nguyên lý kiến trúc dân dụng, công nghiệp - nhà ở · 3 tín chỉ .",
                  "Lịch sử kiến trúc Phương Tây, Phương Đông, Việt Nam · 3 tín chỉ .",
                ],
              },
            ],
          },
          {
            title: "Chưa tìm thấy ngành tốt nghiệp của bạn?",
            paragraphs: [
              "Khoa chuyên môn sẽ rà soát hồ sơ và đề xuất để Nhà trường xem xét điều kiện dự tuyển cùng yêu cầu bổ sung kiến thức. Liên hệ Viện để được đối chiếu ngành học và bảng điểm trước khi đăng ký.",
            ],
          },
        ],
      },
    ],
  },
  section04: {
    sectionNumber: "04",
    careerHeading: "Cơ hội nghề nghiệp và phát triển",
    headline: "Mở rộng vai trò trong nghề kiến trúc.",
    intro:
      "Nền tảng chuyên sâu cùng năng lực nghiên cứu, thiết kế và quản lý hỗ trợ người học phát triển trong doanh nghiệp, cơ quan quản lý, đơn vị tư vấn và cơ sở đào tạo.",
    note: "Hướng phát triển và vị trí đảm nhiệm phụ thuộc vào nền tảng chuyên môn, kinh nghiệm, năng lực thực tế và yêu cầu của từng tổ chức.",
    careerImage: "/images/pages/programmes/kien-truc/programme-hero.webp",
    careers: [
      {
        group: "Thiết kế và tư vấn kiến trúc",
        title: "Thiết kế và tư vấn chuyên sâu",
        sub: "Vận dụng kiến thức chuyên ngành, tư duy liên ngành và phương pháp nghiên cứu để phát triển các giải pháp kiến trúc phù hợp bối cảnh.",
      },
      {
        group: "Thiết kế và tư vấn kiến trúc",
        title: "Đánh giá và phê bình kiến trúc",
        sub: "Phát triển theo hướng tư vấn, đánh giá, thẩm định và phản biện chuyên môn theo yêu cầu của từng vị trí.",
      },
      {
        group: "Quản lý doanh nghiệp và đô thị",
        title: "Quản lý doanh nghiệp và dự án",
        sub: "Tham gia tổ chức, điều hành hoạt động tư vấn, đầu tư, xây dựng và các dịch vụ trong lĩnh vực kiến trúc – xây dựng.",
      },
      {
        group: "Quản lý doanh nghiệp và đô thị",
        title: "Quản lý kiến trúc và quy hoạch",
        sub: "Tham gia công tác quản lý nhà nước về kiến trúc, quy hoạch và xây dựng; đánh giá hồ sơ quản lý và thiết kế kiến trúc.",
      },
      {
        group: "Nghiên cứu và phát triển học thuật",
        title: "Nghiên cứu và giảng dạy",
        sub: "Phát triển năng lực hợp tác nghiên cứu, giảng dạy tại viện nghiên cứu, cơ sở giáo dục và đào tạo khi đáp ứng yêu cầu của vị trí.",
      },
      {
        group: "Nghiên cứu và phát triển học thuật",
        title: "Tiếp tục học trình độ tiến sĩ",
        sub: "Củng cố nền tảng lý luận và phương pháp nghiên cứu để tiếp tục học tập ở trình độ cao hơn theo điều kiện của chương trình dự tuyển.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "Chương trình kết nối kiến thức nền tảng, lý luận và thiết kế chuyên sâu với phát triển dự án, thực tập và đề án tốt nghiệp. Các học phần tự chọn được tổ chức thành bảy nhóm để người học lựa chọn theo cơ cấu chương trình.",
    ],
    trackLabels: ["Định hướng ứng dụng"],
    graduationProjects: ["Đề án tốt nghiệp · 9 tín chỉ"],
    studyMode: "Chính quy tập trung",
    generalFacts: [
      {
        label: "Thời gian đào tạo",
        value: "18 tháng",
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
        label: "Học phần tự chọn",
        value: "14 tín chỉ",
      },
      {
        label: "Tốt nghiệp",
        value: "Đề án · 9 tín chỉ",
      },
    ],
    notes: [
      "Chương trình gồm 60 tín chỉ, trong đó có 46 tín chỉ bắt buộc và 14 tín chỉ tự chọn. Xem danh mục học phần và yêu cầu tích lũy trong từng khối kiến thức.",
      "6 tín chỉ chung + 30 tín chỉ cơ sở và chuyên ngành + 15 tín chỉ phát triển dự án, thực tập và đề cương + 9 tín chỉ đề án = 60 tín chỉ.",
      "Học phần được triển khai theo kế hoạch đào tạo của Khoa. Lịch mở lớp, lựa chọn học phần tự chọn và thời khóa biểu được thông báo theo từng đợt.",
    ],
    completion: {
      heading: "Hoàn thành chương trình",
      items: [
        "Tích lũy 60 tín chỉ theo cơ cấu chương trình, bao gồm 14 tín chỉ tự chọn theo các nhóm học phần.",
        "Hoàn thành các học phần phát triển dự án, thực tập và đề cương; bảo vệ đề án tốt nghiệp 9 tín chỉ đạt yêu cầu.",
        "Đạt chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 trước thời điểm xét tốt nghiệp và đáp ứng các điều kiện công nhận tốt nghiệp theo quy định của Trường.",
      ],
    },
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody: "Trao đổi về chương trình, nền tảng đã học và mục tiêu của bạn để chuẩn bị phù hợp.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ", "mục tiêu của bạn."],
      body: "Chia sẻ điều bạn quan tâm về chương trình Thạc sĩ Kiến trúc. Đội ngũ tư vấn sẽ hỗ trợ bạn tìm hiểu lộ trình học tập và chuẩn bị hồ sơ phù hợp.",
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
        question: "Chương trình đào tạo theo định hướng nào và kéo dài bao lâu?",
        answer:
          "Thạc sĩ Kiến trúc được đào tạo theo định hướng ứng dụng, khối lượng 60 tín chỉ, thời gian tiêu chuẩn 18 tháng. Lịch học được bố trí vào buổi tối các ngày trong tuần và/hoặc Thứ Bảy, Chủ nhật theo kế hoạch từng học kỳ. Thời khóa biểu chính thức do Trường công bố.",
      },
      {
        question: "Tốt nghiệp ngành Kiến trúc có cần học bổ sung kiến thức?",
        answer:
          "Người tốt nghiệp ngành Kiến trúc có chương trình đào tạo ở bậc đại học từ 150 tín chỉ trở lên không cần học bổ sung kiến thức. Các ngành và chương trình còn lại trong danh mục được đối chiếu bảng điểm để xác định yêu cầu bổ sung, tối đa 9 tín chỉ. Với ngành ngoài danh mục, Khoa chuyên môn rà soát và đề xuất để Nhà trường xem xét.",
      },
      {
        question: "Các học phần tự chọn được lựa chọn như thế nào?",
        answer:
          "Chương trình có 7 nhóm tự chọn, mỗi nhóm gồm 2 học phần. Học viên chọn 1 học phần trong mỗi nhóm, mỗi học phần 2 tín chỉ, để tích lũy tổng cộng 14 tín chỉ tự chọn. Việc đăng ký và mở lớp thực hiện theo kế hoạch đào tạo của Khoa.",
      },
      {
        question: "Phần thực tập và đề án tốt nghiệp gồm bao nhiêu tín chỉ?",
        answer:
          "Khối phát triển dự án, thực tập và đề cương gồm 15 tín chỉ: Quản lý và phát triển dự án kiến trúc 6 tín chỉ, Thực tập 1 là 6 tín chỉ và Thực tập 2 là 3 tín chỉ. Đề án tốt nghiệp có 9 tín chỉ. Các học phần này nằm trong tổng khối lượng 60 tín chỉ của chương trình.",
      },
      {
        question: "Yêu cầu ngoại ngữ đầu vào và đầu ra như thế nào?",
        answer:
          "Ứng viên đáp ứng ngoại ngữ đầu vào tương đương Bậc 3/6 trở lên theo các hình thức được công nhận trong thông báo tuyển sinh. Trước khi được công nhận tốt nghiệp, học viên cần đạt chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 trở lên theo quy định.",
      },
      {
        question: "Học phí toàn khóa và cách đóng học phí ra sao?",
        answer:
          "Học phí toàn khóa là 85.000.000 đồng, chia thành ba đợt: 29.750.000 đồng, 25.500.000 đồng và 29.750.000 đồng. Mức này chưa trừ học bổng, hỗ trợ tài chính và chưa bao gồm các khoản thu riêng khi áp dụng. Thời hạn thanh toán được Trường thông báo cụ thể.",
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
    total: "85.000.000 đồng",
    installments: [
      {
        label: "Đợt 1 · 35%",
        amount: "29.750.000 đồng",
      },
      {
        label: "Đợt 2 · 30%",
        amount: "25.500.000 đồng",
      },
      {
        label: "Đợt 3 · 35%",
        amount: "29.750.000 đồng",
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

export const kienTrucProgramme: Programme = {
  id: "kien-truc",
  code: "580101",
  title: "Kiến trúc",
  englishTitle: "Master of Architecture",
  degree: "Thạc sĩ",
  field: "Kỹ thuật, Môi trường & Công nghệ",
  orientation: "Ứng dụng",
  credits: 60,
  duration: "18 tháng",
  studyMode: "Chính quy tập trung, tiếng Việt",
  intake: "Tuyển sinh thạc sĩ 2027",
  summary:
    "Phát triển tư duy thiết kế, khả năng tích hợp kiến thức và năng lực quản lý dự án để đề xuất giải pháp kiến trúc sáng tạo, bền vững và phù hợp bối cảnh.",
  schedule:
    "Buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu theo từng học kỳ.",
  tuition: "85.000.000 VNĐ",
};

export function getKienTrucCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "Thiết kế · Quản lý dự án · Thực tập · Đề án tốt nghiệp",
      graduationProject: "Đề án tốt nghiệp · 9 tín chỉ",
      intro:
        "Chương trình kết nối kiến thức nền tảng, lý luận và thiết kế chuyên sâu với phát triển dự án, thực tập và đề án tốt nghiệp. Các học phần tự chọn được tổ chức thành bảy nhóm để người học lựa chọn theo cơ cấu chương trình.",
      generalFacts: [
        {
          label: "Thời gian đào tạo",
          value: "18 tháng",
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
          label: "Học phần tự chọn",
          value: "14 tín chỉ",
        },
        {
          label: "Tốt nghiệp",
          value: "Đề án · 9 tín chỉ",
        },
      ],
      notes: [
        "Chương trình gồm 60 tín chỉ, trong đó có 46 tín chỉ bắt buộc và 14 tín chỉ tự chọn. Xem danh mục học phần và yêu cầu tích lũy trong từng khối kiến thức.",
        "6 tín chỉ chung + 30 tín chỉ cơ sở và chuyên ngành + 15 tín chỉ phát triển dự án, thực tập và đề cương + 9 tín chỉ đề án = 60 tín chỉ.",
        "Học phần được triển khai theo kế hoạch đào tạo của Khoa. Lịch mở lớp, lựa chọn học phần tự chọn và thời khóa biểu được thông báo theo từng đợt.",
      ],
      groups: [
        {
          title: "I. Kiến thức chung",
          totalCreditsLabel: "6 tín chỉ",
          courses: [
            {
              name: "Triết học",
              englishName: "",
              credits: 3,
            },
            {
              name: "Phương pháp nghiên cứu khoa học",
              englishName: "",
              credits: 3,
            },
          ],
          description: ["Học phần bắt buộc · 6 tín chỉ"],
        },
        {
          title: "II. Kiến thức cơ sở và chuyên ngành",
          totalCreditsLabel: "30 tín chỉ",
          courses: [],
          subgroups: [
            {
              title: "Học phần bắt buộc · 16 tín chỉ",
              totalCreditsLabel: "16 tín chỉ",
              description: [],
              courses: [
                {
                  name: "Lý thuyết và thực hành kiến trúc đương đại",
                  englishName: "",
                  credits: 2,
                },
                {
                  name: "Kiến trúc và Thiết kế bền vững",
                  englishName: "",
                  credits: 2,
                },
                {
                  name: "Mô hình thông tin công trình (BIM) trong thiết kế và quản lý công trình kiến trúc",
                  englishName: "",
                  credits: 2,
                },
                {
                  name: "Lý luận bảo tồn di sản văn hóa – kiến trúc",
                  englishName: "",
                  credits: 2,
                },
                {
                  name: "Đồ án thiết kế kiến trúc nâng cao",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Đồ án Hình thái đô thị và kiến trúc",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Tham quan – phân tích, đánh giá và phê bình kiến trúc",
                  englishName: "",
                  credits: 2,
                },
              ],
            },
            {
              title: "Tự chọn nhóm 1",
              totalCreditsLabel: "2 tín chỉ",
              description: ["Chọn 1 trong 2 học phần · Tích lũy 2 tín chỉ."],
              courses: [
                {
                  name: "Lý thuyết tổ hợp không gian kiến trúc hiện đại",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
                {
                  name: "Kiến trúc cảnh quan",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn nhóm 2",
              totalCreditsLabel: "2 tín chỉ",
              description: ["Chọn 1 trong 2 học phần · Tích lũy 2 tín chỉ."],
              courses: [
                {
                  name: "Mối quan hệ giữa kiến trúc và các ngành nghệ thuật khác",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
                {
                  name: "Tổ chức không gian kiến trúc môi trường ở",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn nhóm 3",
              totalCreditsLabel: "2 tín chỉ",
              description: ["Chọn 1 trong 2 học phần · Tích lũy 2 tín chỉ."],
              courses: [
                {
                  name: "Lý thuyết và ứng dụng Hình Thái học đô thị",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
                {
                  name: "Thiết kế đô thị",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn nhóm 4",
              totalCreditsLabel: "2 tín chỉ",
              description: ["Chọn 1 trong 2 học phần · Tích lũy 2 tín chỉ."],
              courses: [
                {
                  name: "Lý luận phát triển không gian đô thị",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
                {
                  name: "Tổ chức môi trường dịch vụ công cộng đô thị",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn nhóm 5",
              totalCreditsLabel: "2 tín chỉ",
              description: ["Chọn 1 trong 2 học phần · Tích lũy 2 tín chỉ."],
              courses: [
                {
                  name: "Lý luận quy hoạch vùng và đô thị",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
                {
                  name: "Quản lý quy hoạch, kiến trúc và xây dựng",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn nhóm 6",
              totalCreditsLabel: "2 tín chỉ",
              description: ["Chọn 1 trong 2 học phần · Tích lũy 2 tín chỉ."],
              courses: [
                {
                  name: "Kiến trúc bền vững: mô phỏng và thiết kế công trình",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
                {
                  name: "Công trình xanh: thiết kế và tiêu chuẩn đánh giá",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn nhóm 7",
              totalCreditsLabel: "2 tín chỉ",
              description: ["Chọn 1 trong 2 học phần · Tích lũy 2 tín chỉ."],
              courses: [
                {
                  name: "Công nghệ mới trong kỹ thuật công trình",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
                {
                  name: "Vật liệu và công nghệ xây dựng mới",
                  englishName: "",
                  credits: 2,
                  elective: true,
                },
              ],
            },
          ],
          description: [
            "Tích lũy 14 tín chỉ tự chọn : chọn một học phần trong mỗi nhóm dưới đây. Có 7 nhóm, mỗi học phần 2 tín chỉ.",
          ],
        },
        {
          title: "III. Phát triển dự án, thực tập và đề cương",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              name: "Quản lý và phát triển dự án kiến trúc",
              englishName: "",
              credits: 6,
            },
            {
              name: "Thực tập 1 (Chuyên gia và năng lực quản lý chuyên ngành)",
              englishName: "",
              credits: 6,
            },
            {
              name: "Thực tập 2 (Dự án nghiên cứu và Đề cương tốt nghiệp)",
              englishName: "",
              credits: 3,
            },
          ],
          description: [],
        },
        {
          title: "IV. Đề án tốt nghiệp",
          totalCreditsLabel: "9 tín chỉ",
          courses: [
            {
              name: "Đề án tốt nghiệp",
              englishName: "",
              credits: 9,
            },
          ],
          description: [],
        },
      ],
      completion: {
        heading: "Hoàn thành chương trình",
        items: [
          "Tích lũy 60 tín chỉ theo cơ cấu chương trình, bao gồm 14 tín chỉ tự chọn theo các nhóm học phần.",
          "Hoàn thành các học phần phát triển dự án, thực tập và đề cương; bảo vệ đề án tốt nghiệp 9 tín chỉ đạt yêu cầu.",
          "Đạt chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 trước thời điểm xét tốt nghiệp và đáp ứng các điều kiện công nhận tốt nghiệp theo quy định của Trường.",
        ],
      },
    },
  ];
}
