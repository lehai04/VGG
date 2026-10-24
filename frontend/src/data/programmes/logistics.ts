// Nguồn: thac-si-logistics-va-quan-ly-chuoi-cung-ung.html do người dùng cung cấp ngày 24/10/2026.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";

export const logisticsPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển góc nhìn hệ thống và năng lực phân tích để tổ chức vận hành, thiết kế và cải tiến chuỗi cung ứng; kết nối kiến thức chuyên sâu với quyết định quản trị và nghiên cứu.",
    heroSlogan: "FUTURE",
    heroImage: "/images/pages/programmes/logistics/programme-hero.jpg",
    imageAlt:
      "Sinh viên Văn Lang tham quan Cảng Vận tải Quốc tế SP–ITC, với cần cẩu và container ở hậu cảnh.",
    imageCredit: {
      text: "Hoạt động tìm hiểu thực tế tại Cảng SP–ITC · Nguồn: Văn Lang ↗",
      href: "https://www.vlu.edu.vn/news/vlu-sinh-vien-vien-dao-tao-quoc-te-truong-dai-hoc-van-lang-tham-quan-cang-van-tai-quoc-te-sp-itc",
    },
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "340123",
        detail: "Mã chương trình: 8340123",
      },
      {
        label: "Khối lượng chương trình",
        value: "60 tín chỉ",
        detail: "Cho mỗi định hướng",
      },
      {
        label: "Thời gian đào tạo",
        value: "18–24 tháng",
        detail: "Ứng dụng: 18 tháng Nghiên cứu: 24 tháng",
      },
      {
        label: "Hình thức đào tạo",
        value: "Chính quy",
        detail: "Tập trung",
      },
      {
        label: "Ngôn ngữ đào tạo",
        value: "Tiếng Việt",
        detail: "Hoặc tiếng Anh",
      },
      {
        label: "Học phí toàn khóa",
        value: "Từ 85 triệu đồng",
        detail: "Theo ngôn ngữ đào tạo",
      },
    ],
  },
  section01: {
    ...programmeSharedContent.overview,
    sectionNumber: "01",
    overviewTitle: "Tổng quan chương trình",
    headline: "Hiểu chuỗi cung ứng. Giải quyết bài toán vận hành.",
    overview: [
      "Chương trình Thạc sĩ Logistics và Quản lý chuỗi cung ứng tại Văn Lang phát triển kiến thức chuyên sâu về quản lý vận hành, phân tích và cải tiến hoạt động logistics. Người học tiếp cận chuỗi cung ứng như một hệ thống, từ đó nâng cao khả năng nhận diện vấn đề, thiết kế giải pháp và hỗ trợ quyết định trong thực tiễn.",
      "Nền tảng chung kết hợp phương pháp nghiên cứu khoa học với kỹ thuật hệ thống, kinh tế kỹ thuật, vận trù học, thống kê trong công nghiệp và quản lý chất lượng. Danh mục chuyên ngành mở rộng sang thu mua, vận tải, tồn kho, tinh gọn, hệ thống thông tin và các công cụ quản trị; cơ cấu bắt buộc, tự chọn khác nhau theo từng định hướng.",
      "Cả hai định hướng đều có khối lượng 60 tín chỉ. Hướng ứng dụng kết nối học tập với thực tập tốt nghiệp 6 tín chỉ và đề án tốt nghiệp 9 tín chỉ. Hướng nghiên cứu dành 12 tín chỉ cho hai chuyên đề Quản lý chuỗi cung ứng và 15 tín chỉ cho luận văn, hỗ trợ người học đào sâu một vấn đề chuyên môn.",
      "Văn bằng tốt nghiệp: Thạc sĩ Logistics và quản lý chuỗi cung ứng Master of Logistics and Supply Chain Management",
    ],
    overviewImage: "/images/pages/programmes/logistics/programme-overview.jpg",
    imageAlt: "Sinh viên Văn Lang tìm hiểu hoạt động logistics tại Cảng Vận tải Quốc tế SP–ITC.",
    imageCredit: {
      text: "Trao đổi chuyên môn về logistics tại Cảng SP–ITC Ảnh: Trí Nguyễn · Trường Đại học Văn Lang ↗",
      href: "https://www.vlu.edu.vn/news/vlu-sinh-vien-vien-dao-tao-quoc-te-truong-dai-hoc-van-lang-tham-quan-cang-van-tai-quoc-te-sp-itc",
    },
    focusAreas: [
      "Quản lý vận hành",
      "Phân tích & ra quyết định",
      "Thiết kế hệ thống",
      "Cải tiến chuỗi cung ứng",
    ],
    ribbonTitle: "Hai định hướng. Hai cách phát triển chuyên môn.",
    tags: [
      "Ứng dụng Thực tập · Đề án tốt nghiệp 18 tháng",
      "Nghiên cứu Hai chuyên đề · Luận văn 24 tháng",
    ],
    link: {
      text: "Khám phá hai định hướng đào tạo",
      href: "#chuong-trinh",
      ariaLabel: "Khám phá khung chương trình Logistics và Quản lý chuỗi cung ứng",
    },
  },
  section02: {
    ...programmeSharedContent.highlights,
    sectionNumber: "02",
    highlights: [
      {
        title: "Nền tảng hệ thống và định lượng",
        text: "Kết nối kỹ thuật hệ thống, vận trù học, thống kê và kinh tế kỹ thuật để phát triển cách tiếp cận vấn đề trong quản lý, vận hành chuỗi cung ứng.",
      },
      {
        title: "Chuyên môn gắn với chuỗi cung ứng",
        text: "Danh mục chuyên ngành bao quát thu mua, vận tải logistics, hoạch định tồn kho và vật tư, cùng các phương pháp tinh gọn trong hệ thống chuỗi cung ứng.",
      },
      {
        title: "Mở rộng công cụ quản trị",
        text: "Các lựa chọn học phần gồm hệ thống thông tin, hoạch định nguồn lực ERP, thiết kế mặt bằng công nghiệp, đánh giá kinh tế và quản lý dự án, kế toán và nguồn nhân lực.",
      },
      {
        title: "Hai định hướng theo mục tiêu phát triển",
        text: "Hướng ứng dụng kết thúc bằng thực tập và đề án tốt nghiệp; hướng nghiên cứu tập trung vào hai chuyên đề nghiên cứu và luận văn tốt nghiệp.",
      },
      {
        title: "Kết nối tư duy hệ thống với quyết định vận hành",
        text: "Từ kỹ thuật hệ thống, vận trù học và thống kê đến quản lý thu mua, vận tải, tồn kho và tinh gọn, chương trình giúp người học nhìn nhận chuỗi cung ứng trong mối liên hệ giữa các hoạt động. Hai định hướng phát triển khả năng vận dụng kiến thức vào thực tiễn hoặc đi sâu nghiên cứu một vấn đề chuyên môn.",
      },
    ],
    learningOutcomes: {
      intro:
        "Chương trình hướng đến năng lực phân tích, thiết kế và cải tiến hệ thống, quản lý hoạt động nghề nghiệp, nghiên cứu và hợp tác chuyên môn.",
      items: [
        {
          code: "Cả hai định hướng",
          title: "Phân tích và cải tiến vận hành",
          text: "Phân tích, đánh giá và cải tiến các hoạt động logistics, quản lý và vận hành chuỗi cung ứng.",
        },
        {
          code: "Cả hai định hướng",
          title: "Thiết kế hệ thống chuỗi cung ứng",
          text: "Phát triển khả năng thiết kế, tái thiết kế hệ thống chuỗi cung ứng phù hợp với vấn đề và điều kiện thực tế.",
        },
        {
          code: "Cả hai định hướng",
          title: "Hỗ trợ quyết định quản trị",
          text: "Vận dụng kiến thức chuyên ngành và các công cụ phân tích để hỗ trợ ra quyết định trong vận hành logistics và chuỗi cung ứng.",
        },
        {
          code: "Định hướng ứng dụng",
          title: "Lãnh đạo và tổ chức thực hiện",
          text: "Hướng ứng dụng chú trọng năng lực lãnh đạo, quản lý, điều hành và tổ chức thực hiện các công việc chuyên môn phức tạp.",
        },
        {
          code: "Định hướng nghiên cứu",
          title: "Nghiên cứu độc lập và phát triển ý tưởng",
          text: "Hướng nghiên cứu chú trọng phương pháp khoa học, khả năng nghiên cứu độc lập, hình thành ý tưởng và thử nghiệm kiến thức mới.",
        },
        {
          code: "Cả hai định hướng",
          title: "Tiếp tục phát triển chuyên môn",
          text: "Xây dựng nền tảng để tiếp tục học tập nâng cao trình độ hoặc tham gia đào tạo tiến sĩ ở ngành gần, liên quan khi đáp ứng điều kiện của chương trình.",
        },
      ],
    },
    outcomesHeading: "Mục tiêu phát triển năng lực",
  },
  section03: {
    sectionNumber: "03",
    audienceHeading: "Chương trình phù hợp với ai?",
    headline: "Chọn hướng học phù hợp với mục tiêu của bạn.",
    intro: [
      "Ứng viên đã tốt nghiệp hoặc đủ điều kiện được công nhận tốt nghiệp từ trình độ đại học trở lên, có ngành học phù hợp và đáp ứng các điều kiện dự tuyển của chương trình.",
    ],
    audience: [
      {
        title: "Người làm vận hành logistics và chuỗi cung ứng",
        text: "Muốn nâng cao kiến thức chuyên môn, khả năng quản lý và xử lý các vấn đề trong hoạt động logistics, thu mua, vận tải hoặc tồn kho.",
      },
      {
        title: "Người tham gia phân tích và cải tiến hệ thống",
        text: "Quan tâm đến thiết kế, tái thiết kế chuỗi cung ứng và vận dụng công cụ phân tích để hỗ trợ ra quyết định, nâng cao hiệu quả vận hành.",
      },
      {
        title: "Người định hướng nghiên cứu chuyên sâu",
        text: "Hướng đến nghiên cứu độc lập, phát triển ý tưởng khoa học hoặc tham gia nghiên cứu, giảng dạy và tư vấn trong lĩnh vực logistics và chuỗi cung ứng.",
      },
    ],
    requirements: [
      {
        title: "Ngành tốt nghiệp có phù hợp?",
        paragraphs: [
          "Người tốt nghiệp Logistics và quản lý chuỗi cung ứng, Kỹ thuật hệ thống công nghiệp hoặc Quản lý công nghiệp không cần học bổ sung kiến thức. Với các ngành khác, Viện và Khoa đối chiếu hồ sơ để xác định mức độ phù hợp và các học phần cần bổ sung, tối đa 6 tín chỉ.",
        ],
      },
      {
        title: "Phương thức tuyển sinh",
        paragraphs: [
          "Xét tuyển cho cả định hướng ứng dụng và nghiên cứu. Hồ sơ được đánh giá theo điều kiện đầu vào và yêu cầu của chương trình Thạc sĩ Logistics và quản lý chuỗi cung ứng.",
          "Hồ sơ sử dụng văn bằng đại học do cơ sở giáo dục nước ngoài cấp cần kèm giấy công nhận hoặc xác nhận văn bằng theo quy định.",
          "Chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 trở lên cần được đáp ứng trước thời điểm xét tốt nghiệp, theo các hình thức được Trường công nhận.",
        ],
      },
      {
        title: "Ngoại ngữ theo ngôn ngữ đào tạo",
        paragraphs: [
          "Chương trình bằng tiếng Việt: năng lực ngoại ngữ tương đương Bậc 3/6 trở lên theo các hình thức được công nhận.",
          "Chương trình bằng tiếng Anh: năng lực ngoại ngữ tương đương Bậc 4/6 trở lên hoặc văn bằng thuộc diện được công nhận theo quy định của Trường.",
        ],
      },
      {
        title: "Điều kiện riêng của định hướng nghiên cứu",
        paragraphs: [
          "Ứng viên cần tốt nghiệp đại học từ loại Khá trở lên và có công bố khoa học liên quan đến lĩnh vực học tập, nghiên cứu.",
        ],
      },
      {
        title: "Minh chứng ngoại ngữ theo ngôn ngữ đào tạo",
        paragraphs: [],
        groups: [
          {
            title: "Chương trình bằng tiếng Việt",
            paragraphs: [
              "Ứng viên đáp ứng ít nhất một trong các điều kiện sau:",
              "Kỳ thi tiếng Anh đầu vào tại Văn Lang cấp giấy chứng nhận kết quả thi, có giá trị 12 tháng khi dự tuyển thạc sĩ tại Trường; không cấp chứng chỉ ngoại ngữ.",
            ],
            points: [
              "Bằng đại học trở lên ngành ngôn ngữ nước ngoài hoặc chương trình được giảng dạy chủ yếu bằng ngôn ngữ nước ngoài.",
              "Văn bằng, chứng chỉ tương đương Bậc 3 trở lên thuộc danh mục được công nhận và còn hiệu lực.",
              "Kết quả đánh giá tương đương Bậc 3 trở lên do Trường tổ chức; hoặc hoàn thành chương trình đào tạo, bồi dưỡng ngoại ngữ do Trường tổ chức hoặc công nhận.",
              "Bằng đại học trở lên do Văn Lang cấp trong thời hạn không quá 2 năm, với chương trình đã đáp ứng chuẩn đầu ra ngoại ngữ từ Bậc 3 trở lên.",
            ],
          },
          {
            title: "Chương trình bằng tiếng Anh",
            paragraphs: [
              "Năng lực ngoại ngữ tương đương Bậc 4 trở lên hoặc có văn bằng thuộc diện được công nhận theo quy định của Nhà trường.",
              "Ứng viên là công dân nước ngoài đăng ký chương trình bằng tiếng Việt cần đạt tiếng Việt từ Bậc 4 trở lên hoặc đã tốt nghiệp đại học hay tương đương trở lên từ chương trình được giảng dạy bằng tiếng Việt.",
            ],
            points: [],
          },
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
            title: "01. Các ngành không cần bổ sung kiến thức",
            paragraphs: [],
            groups: [
              {
                title: "Ngành tốt nghiệp",
                paragraphs: [
                  "Ứng viên vẫn phải đáp ứng đầy đủ các điều kiện dự tuyển của định hướng và ngôn ngữ đào tạo đăng ký.",
                ],
                points: [
                  "Logistics và quản lý chuỗi cung ứng.",
                  "Kỹ thuật Hệ thống Công nghiệp.",
                  "Quản lý Công nghiệp.",
                ],
              },
            ],
          },
          {
            title: "02. Các ngành khác · Tối đa 6 tín chỉ",
            paragraphs: [
              "Với các ngành ngoài nhóm miễn, hồ sơ được đối chiếu để xác định mức độ phù hợp và các học phần cần bổ sung, tối đa 6 tín chỉ.",
            ],
            groups: [
              {
                title: "Các học phần bổ sung kiến thức",
                paragraphs: [
                  "Nội dung cụ thể được xác định theo chương trình đại học, bảng điểm và kiến thức đã tích lũy của từng ứng viên.",
                ],
                points: [
                  "Quản trị sản xuất · 2 tín chỉ .",
                  "Quản trị Logistics và chuỗi cung ứng · 2 tín chỉ .",
                  "Các mô hình toán ứng dụng · 2 tín chỉ .",
                ],
              },
            ],
          },
          {
            title: "Hồ sơ của bạn cần bổ sung những gì?",
            paragraphs: [
              "Liên hệ Viện để được đối chiếu ngành học, bảng điểm và mục tiêu đào tạo trước khi đăng ký. Khoa chuyên môn sẽ xem xét mức độ phù hợp của hồ sơ và hướng dẫn các học phần cần hoàn thành.",
            ],
          },
        ],
      },
    ],
  },
  section04: {
    sectionNumber: "04",
    careerHeading: "Cơ hội nghề nghiệp và phát triển",
    headline: "Phát triển chuyên môn. Mở rộng vai trò trong chuỗi cung ứng.",
    intro:
      "Nền tảng quản lý vận hành, phân tích hệ thống và phương pháp nghiên cứu hỗ trợ người học phát triển trong doanh nghiệp, đơn vị tư vấn, tổ chức nghiên cứu và cơ sở giáo dục.",
    note: "Hướng phát triển và vị trí đảm nhiệm phụ thuộc vào nền tảng chuyên môn, kinh nghiệm, năng lực thực tế và yêu cầu của từng tổ chức.",
    careerImage: "/images/pages/programmes/logistics/programme-hero.jpg",
    careers: [
      {
        group: "Vận hành và cải tiến",
        title: "Quản lý hoạt động logistics",
        sub: "Vận dụng kiến thức chuyên môn để tham gia quản lý, điều hành và tổ chức thực hiện các công việc trong hệ thống logistics.",
      },
      {
        group: "Vận hành và cải tiến",
        title: "Cải tiến chuỗi cung ứng",
        sub: "Phân tích hoạt động, nhận diện vấn đề và đề xuất giải pháp cải tiến phù hợp với điều kiện thực tế của tổ chức.",
      },
      {
        group: "Phân tích và tư vấn",
        title: "Phân tích, thiết kế hệ thống",
        sub: "Tham gia phân tích, đánh giá, thiết kế và tái thiết kế hệ thống chuỗi cung ứng, hỗ trợ các quyết định vận hành.",
      },
      {
        group: "Phân tích và tư vấn",
        title: "Tư vấn chuyên môn",
        sub: "Vận dụng kiến thức, kết quả nghiên cứu và công cụ phân tích trong hoạt động tư vấn về logistics và quản lý chuỗi cung ứng.",
      },
      {
        group: "Nghiên cứu và giảng dạy",
        title: "Nghiên cứu logistics và chuỗi cung ứng",
        sub: "Nghiên cứu độc lập, phát triển ý tưởng, khám phá và thử nghiệm kiến thức mới về quản lý, vận hành hệ thống logistics.",
      },
      {
        group: "Nghiên cứu và giảng dạy",
        title: "Giảng dạy và phát triển học thuật",
        sub: "Phát triển theo hướng giảng dạy hoặc tiếp tục học tập ở trình độ cao hơn khi đáp ứng các yêu cầu của vị trí, chương trình.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "Dành cho người muốn nâng cao năng lực quản lý, điều hành, thiết kế và cải tiến hoạt động logistics, chuỗi cung ứng trong thực tiễn nghề nghiệp.",
      "Dành cho người muốn đào sâu kiến thức, công cụ phân tích và phương pháp nghiên cứu; phát triển khả năng nghiên cứu độc lập, hình thành và thử nghiệm ý tưởng khoa học.",
    ],
    trackLabels: ["Định hướng ứng dụng", "Định hướng nghiên cứu"],
    graduationProjects: ["Đề án tốt nghiệp · 9 tín chỉ", "Luận văn tốt nghiệp · 15 tín chỉ"],
    studyMode: "Chính quy tập trung",
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody: "Trao đổi về chương trình, nền tảng đã học và mục tiêu của bạn để chuẩn bị phù hợp.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ", "mục tiêu của bạn."],
      body: "Chia sẻ điều bạn quan tâm về chương trình Thạc sĩ Logistics và quản lý chuỗi cung ứng. Đội ngũ tư vấn sẽ hỗ trợ bạn lựa chọn định hướng học tập và chuẩn bị hồ sơ phù hợp.",
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
        question: "Hai định hướng ứng dụng và nghiên cứu khác nhau thế nào?",
        answer:
          "Cả hai định hướng đều có 60 tín chỉ. Hướng ứng dụng phát triển năng lực quản lý, điều hành và cải tiến hoạt động logistics, với thực tập tốt nghiệp 6 tín chỉ và đề án tốt nghiệp 9 tín chỉ. Hướng nghiên cứu phát triển năng lực phân tích và nghiên cứu độc lập, với hai chuyên đề Quản lý chuỗi cung ứng, mỗi chuyên đề 6 tín chỉ, cùng luận văn tốt nghiệp 15 tín chỉ.",
      },
      {
        question: "Thời gian học và lịch học được bố trí như thế nào?",
        answer:
          "Thời gian đào tạo chuẩn là 18 tháng đối với định hướng ứng dụng và 24 tháng đối với định hướng nghiên cứu. Lịch học được bố trí vào buổi tối các ngày trong tuần và/hoặc Thứ Bảy, Chủ nhật theo kế hoạch từng học kỳ. Thời khóa biểu chính thức do Trường công bố.",
      },
      {
        question: "Định hướng nghiên cứu có điều kiện dự tuyển riêng không?",
        answer:
          "Ngoài các điều kiện dự tuyển chung, ứng viên đăng ký định hướng nghiên cứu cần tốt nghiệp đại học từ loại Khá trở lên và có công bố khoa học liên quan đến lĩnh vực học tập, nghiên cứu. Cả hai định hướng đều tuyển sinh bằng phương thức xét tuyển.",
      },
      {
        question: "Học phần tự chọn của hai định hướng được lựa chọn như thế nào?",
        answer:
          "Cả hai định hướng đều tích lũy 12 tín chỉ tự chọn chuyên ngành. Hướng ứng dụng chọn 4 trong 6 học phần; hướng nghiên cứu chọn 4 trong 10 học phần. Mỗi học phần có 3 tín chỉ. Việc đăng ký và mở lớp thực hiện theo kế hoạch đào tạo của Khoa.",
      },
      {
        question: "Tốt nghiệp ngành khác có thể dự tuyển không?",
        answer:
          "Người tốt nghiệp các ngành Logistics và quản lý chuỗi cung ứng, Kỹ thuật hệ thống công nghiệp hoặc Quản lý công nghiệp không cần học bổ sung kiến thức. Các ngành khác được đối chiếu hồ sơ để xác định mức độ phù hợp và các học phần cần bổ sung, tối đa 6 tín chỉ. Ứng viên vẫn cần đáp ứng các điều kiện dự tuyển của định hướng và ngôn ngữ đào tạo đăng ký.",
      },
      {
        question: "Yêu cầu ngoại ngữ của chương trình tiếng Việt và tiếng Anh có khác nhau?",
        answer:
          "Với chương trình bằng tiếng Việt, ứng viên đáp ứng ngoại ngữ đầu vào tương đương Bậc 3/6 trở lên theo các hình thức được công nhận. Với chương trình bằng tiếng Anh, yêu cầu đầu vào tương đương Bậc 4/6 trở lên hoặc văn bằng thuộc diện được công nhận theo quy định của Trường. Chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 trở lên cần đạt trước thời điểm xét tốt nghiệp.",
      },
      {
        question: "Học phí toàn khóa được xác định theo định hướng hay ngôn ngữ?",
        answer:
          "Học phí được công bố theo ngôn ngữ đào tạo: 85.000.000 đồng cho chương trình bằng tiếng Việt và 175.000.000 đồng cho chương trình bằng tiếng Anh. Mỗi mức được chia thành ba đợt theo tỷ lệ 35% – 30% – 35%. Chọn ngôn ngữ tại mục Học phí để xem số tiền từng đợt. Mức này chưa trừ học bổng, hỗ trợ tài chính và chưa bao gồm các khoản thu riêng khi áp dụng.",
      },
    ],
  },
  fees: {
    heading: "Chủ động chuẩn bị cho hành trình học.",
    intro: [
      "Chọn ngôn ngữ đào tạo để xem học phí toàn khóa và số tiền của từng đợt. Học phí được chia thành ba đợt theo tỷ lệ 35% – 30% – 35%.",
      "Tiếng Việt: 85.000.000 đồng/toàn khóa.",
      "Tiếng Anh: 175.000.000 đồng/toàn khóa.",
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
    variants: [
      {
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
      },
      {
        language: "Tiếng Anh",
        total: "175.000.000 đồng",
        installments: [
          {
            label: "Đợt 1 · 35%",
            amount: "61.250.000 đồng",
          },
          {
            label: "Đợt 2 · 30%",
            amount: "52.500.000 đồng",
          },
          {
            label: "Đợt 3 · 35%",
            amount: "61.250.000 đồng",
          },
        ],
      },
    ],
  },
};

export const logisticsProgramme: Programme = {
  id: "logistics",
  code: "340123",
  title: "Logistics và Quản lý chuỗi cung ứng",
  englishTitle: "Master of Logistics and Supply Chain Management",
  degree: "Thạc sĩ",
  field: "Kinh doanh & Quản lý",
  orientation: "Ứng dụng",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy tập trung, tiếng Việt hoặc tiếng Anh",
  intake: "Tuyển sinh thạc sĩ 2027",
  summary:
    "Phát triển góc nhìn hệ thống và năng lực phân tích để tổ chức vận hành, thiết kế và cải tiến chuỗi cung ứng; kết nối kiến thức chuyên sâu với quyết định quản trị và nghiên cứu.",
  schedule:
    "Buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu theo từng học kỳ.",
  tuition: "Từ 85.000.000 VNĐ",
  orientations: ["Ứng dụng", "Nghiên cứu"],
};

export function getLogisticsCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "18 tháng · 60 tín chỉ",
      graduationProject: "Đề án tốt nghiệp · 9 tín chỉ",
      intro:
        "Dành cho người muốn nâng cao năng lực quản lý, điều hành, thiết kế và cải tiến hoạt động logistics, chuỗi cung ứng trong thực tiễn nghề nghiệp.",
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
          value: "Tiếng Việt hoặc tiếng Anh",
        },
        {
          label: "Học phần tự chọn",
          value: "12 tín chỉ",
        },
        {
          label: "Tốt nghiệp",
          value: "Đề án · 9 tín chỉ",
        },
      ],
      notes: [
        "Cả hai định hướng đều có 60 tín chỉ, với cơ cấu học phần, lựa chọn tự chọn và hình thức hoàn thành riêng. Chọn định hướng để xem chi tiết chương trình.",
        "6 tín chỉ chung + 15 tín chỉ cơ sở ngành + 24 tín chỉ chuyên ngành + 6 tín chỉ thực tập + 9 tín chỉ đề án = 60 tín chỉ.",
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
          title: "II. Kiến thức cơ sở ngành",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              name: "Kỹ thuật hệ thống",
              englishName: "",
              credits: 3,
            },
            {
              name: "Kinh tế kỹ thuật",
              englishName: "",
              credits: 3,
            },
            {
              name: "Vận trù học",
              englishName: "",
              credits: 3,
            },
            {
              name: "Thống kê trong công nghiệp",
              englishName: "",
              credits: 3,
            },
            {
              name: "Kiểm soát và quản lý chất lượng",
              englishName: "",
              credits: 3,
            },
          ],
          description: ["Học phần bắt buộc · 15 tín chỉ"],
        },
        {
          title: "III. Kiến thức chuyên ngành",
          totalCreditsLabel: "24 tín chỉ",
          courses: [],
          subgroups: [
            {
              title: "Học phần bắt buộc · 12 tín chỉ",
              totalCreditsLabel: "12 tín chỉ",
              description: [],
              courses: [
                {
                  name: "Quản lý thu mua",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Quản lý vận tải Logistics",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Hoạch định tồn kho và vật tư",
                  englishName: "",
                  credits: 3,
                },
                {
                  name: "Tinh gọn trong chuỗi cung ứng",
                  englishName: "",
                  credits: 3,
                },
              ],
            },
            {
              title: "Học phần tự chọn · 12 tín chỉ",
              totalCreditsLabel: "3 tín chỉ",
              description: [
                "Chọn 4 trong 6 học phần · Tích lũy 12 tín chỉ. Mỗi học phần 3 tín chỉ.",
              ],
              courses: [
                {
                  name: "Hệ thống thông tin quản lý",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Hoạch định nguồn lực ERP",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Kỹ thuật thiết kế mặt bằng công nghiệp",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Đánh giá kinh tế và quản lý dự án",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Kế toán quản trị",
                  englishName: "",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Quản trị nguồn nhân lực",
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
          title: "IV. Thực tập tốt nghiệp và đề án tốt nghiệp",
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
          description: ["Học phần bắt buộc · 15 tín chỉ"],
        },
      ],
      completion: {
        heading: "Hoàn thành chương trình",
        items: [
          "Tích lũy đủ 60 tín chỉ theo cơ cấu chương trình, gồm 12 tín chỉ tự chọn: chọn 4 trong 6 học phần thuộc danh mục tự chọn chuyên ngành.",
          "Hoàn thành thực tập tốt nghiệp 6 tín chỉ và đề án tốt nghiệp 9 tín chỉ theo yêu cầu của chương trình.",
          "Đạt chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 trước thời điểm xét tốt nghiệp; đáp ứng chuẩn đầu ra và các điều kiện công nhận tốt nghiệp theo quy định của chương trình và Trường.",
        ],
      },
    },
    {
      number: "05",
      title: "Định hướng nghiên cứu",
      orientation: "Nghiên cứu",
      subtitle: "24 tháng · 60 tín chỉ",
      graduationProject: "Luận văn tốt nghiệp · 15 tín chỉ",
      intro:
        "Dành cho người muốn đào sâu kiến thức, công cụ phân tích và phương pháp nghiên cứu; phát triển khả năng nghiên cứu độc lập, hình thành và thử nghiệm ý tưởng khoa học.",
      generalFacts: [
        {
          label: "Thời gian đào tạo",
          value: "24 tháng",
        },
        {
          label: "Định hướng",
          value: "Nghiên cứu",
        },
        {
          label: "Hình thức",
          value: "Chính quy tập trung",
        },
        {
          label: "Ngôn ngữ",
          value: "Tiếng Việt hoặc tiếng Anh",
        },
        {
          label: "Học phần tự chọn",
          value: "12 tín chỉ",
        },
        {
          label: "Tốt nghiệp",
          value: "Luận văn · 15 tín chỉ",
        },
      ],
      notes: [
        "Cả hai định hướng đều có 60 tín chỉ, với cơ cấu học phần, lựa chọn tự chọn và hình thức hoàn thành riêng. Chọn định hướng để xem chi tiết chương trình.",
        "6 tín chỉ chung + 15 tín chỉ cơ sở ngành + 12 tín chỉ tự chọn chuyên ngành + 12 tín chỉ chuyên đề nghiên cứu + 15 tín chỉ luận văn = 60 tín chỉ.",
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
          title: "II. Kiến thức cơ sở ngành",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              name: "Kỹ thuật hệ thống",
              englishName: "",
              credits: 3,
            },
            {
              name: "Kinh tế kỹ thuật",
              englishName: "",
              credits: 3,
            },
            {
              name: "Vận trù học",
              englishName: "",
              credits: 3,
            },
            {
              name: "Thống kê trong công nghiệp",
              englishName: "",
              credits: 3,
            },
            {
              name: "Kiểm soát và quản lý chất lượng",
              englishName: "",
              credits: 3,
            },
          ],
          description: ["Học phần bắt buộc · 15 tín chỉ"],
        },
        {
          title: "III. Kiến thức chuyên ngành",
          totalCreditsLabel: "12 tín chỉ",
          courses: [
            {
              name: "Quản lý thu mua",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Quản lý vận tải Logistics",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Hoạch định tồn kho và vật tư",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Tinh gọn trong chuỗi cung ứng",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Hệ thống thông tin quản lý",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Hoạch định nguồn lực ERP",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Kỹ thuật thiết kế mặt bằng công nghiệp",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Đánh giá kinh tế và quản lý dự án",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Kế toán quản trị",
              englishName: "",
              credits: 3,
              elective: true,
            },
            {
              name: "Quản trị nguồn nhân lực",
              englishName: "",
              credits: 3,
              elective: true,
            },
          ],
          description: [
            "Học phần tự chọn · 12 tín chỉ",
            "Chọn 4 trong 10 học phần · Tích lũy 12 tín chỉ. Mỗi học phần 3 tín chỉ.",
          ],
        },
        {
          title: "IV. Chuyên đề nghiên cứu và luận văn tốt nghiệp",
          totalCreditsLabel: "27 tín chỉ",
          courses: [
            {
              name: "Chuyên đề Quản lý chuỗi cung ứng 1",
              englishName: "",
              credits: 6,
            },
            {
              name: "Chuyên đề Quản lý chuỗi cung ứng 2",
              englishName: "",
              credits: 6,
            },
            {
              name: "Luận văn tốt nghiệp",
              englishName: "",
              credits: 15,
            },
          ],
          description: ["Học phần bắt buộc · 27 tín chỉ"],
        },
      ],
      completion: {
        heading: "Hoàn thành chương trình",
        items: [
          "Tích lũy đủ 60 tín chỉ theo cơ cấu chương trình, gồm 12 tín chỉ tự chọn: chọn 4 trong 10 học phần thuộc danh mục tự chọn chuyên ngành.",
          "Hoàn thành hai chuyên đề Quản lý chuỗi cung ứng, mỗi chuyên đề 6 tín chỉ, và luận văn tốt nghiệp 15 tín chỉ theo yêu cầu của chương trình.",
          "Đạt chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 trước thời điểm xét tốt nghiệp; đáp ứng chuẩn đầu ra và các điều kiện công nhận tốt nghiệp theo quy định của chương trình và Trường.",
        ],
      },
    },
  ];
}
