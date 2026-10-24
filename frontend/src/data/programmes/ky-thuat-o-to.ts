// Nguồn: thac-si-ky-thuat-o-to.html do người dùng cung cấp ngày 24/10/2026.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";

export const kyThuatOToPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển năng lực thiết kế, mô phỏng và tối ưu hóa hệ thống ô tô; tiếp cận công nghệ xe điện, pin và trí tuệ nhân tạo để giải quyết các bài toán kỹ thuật trong công nghiệp và nghiên cứu.",
    heroSlogan: "FUTURE",
    heroImage: "/images/pages/programmes/ky-thuat-o-to/programme-hero.webp",
    imageAlt: "Hoạt động hướng dẫn và thực hành trên động cơ ô tô tại Văn Lang",
    imageCredit: {
      text: "Thực hành tại xưởng Kỹ thuật Ô tô · Nguồn: Văn Lang ↗",
      href: "https://www.vlu.edu.vn/news/truong-dai-hoc-van-lang-mo-nganh-thac-si-logistics-va-quan-ly-chuoi-cung-ung-va-thac-si-ky-thuat-o-to",
    },
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "520130",
        detail: "Mã chương trình: 8520130",
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
    headline: "Hiểu sâu công nghệ. Phát triển giải pháp ô tô hiện đại.",
    overview: [
      "Chương trình Thạc sĩ Kỹ thuật ô tô tại Văn Lang kết nối nền tảng động lực học, tính toán và thiết kế với công nghệ xe điện, pin, quản lý năng lượng và các hệ thống ô tô hiện đại. Người học phát triển khả năng phân tích, mô hình hóa, tối ưu hóa và đề xuất giải pháp cho những bài toán kỹ thuật phức tạp.",
      "Định hướng ứng dụng chú trọng giải quyết vấn đề trong sản xuất, vận hành, bảo trì, quản lý kỹ thuật và chất lượng. Định hướng nghiên cứu tập trung vào phương pháp nghiên cứu, thực nghiệm, mô phỏng và phát triển giải pháp công nghệ.",
      "Danh mục tự chọn mở rộng sang vật liệu mới, nhiên liệu tái tạo, công nghệ tái chế, xe tự hành và giao thông thông minh. Người học lựa chọn học phần theo từng nhóm trong cơ cấu của định hướng đào tạo.",
      "Văn bằng tốt nghiệp: Thạc sĩ Kỹ thuật ô tô Master of Automotive Engineering",
    ],
    overviewImage: "/images/pages/programmes/ky-thuat-o-to/programme-overview.webp",
    imageAlt: "Thực hành hàn với thiết bị bảo hộ tại xưởng Kỹ thuật Ô tô Văn Lang",
    imageCredit: {
      text: "Hoạt động thực hành tại xưởng Kỹ thuật Ô tô Nguồn: Trường Đại học Văn Lang ↗",
      href: "https://www.vlu.edu.vn/faculty/khoa-ky-thuat-o-to",
    },
    focusAreas: [
      "Thiết kế & mô phỏng",
      "Xe điện & năng lượng",
      "Hệ thống thông minh",
      "Nghiên cứu & phát triển",
    ],
    ribbonTitle: "Hai định hướng. Cùng nền tảng kỹ thuật chuyên sâu.",
    tags: [
      "Ứng dụng Chuyên đề · Thực tập · Đề án 18 tháng",
      "Nghiên cứu Hai chuyên đề · Luận văn 24 tháng",
    ],
    link: {
      text: "Khám phá hai định hướng đào tạo",
      href: "#chuong-trinh",
      ariaLabel: "Khám phá khung chương trình Kỹ thuật ô tô",
    },
  },
  section02: {
    ...programmeSharedContent.highlights,
    sectionNumber: "02",
    highlights: [
      {
        title: "Hai định hướng theo mục tiêu phát triển",
        text: "Lựa chọn ứng dụng để nâng cao năng lực giải quyết bài toán nghề nghiệp, hoặc nghiên cứu để phát triển chuyên môn học thuật và tham gia các hoạt động R&D.",
      },
      {
        title: "Xe điện, pin và quản lý năng lượng",
        text: "Cả hai định hướng đều có học phần về công nghệ xe điện, xe lai, trạm sạc, công nghệ pin và quản lý năng lượng.",
      },
      {
        title: "Thiết kế, mô phỏng và tối ưu hóa",
        text: "Phát triển nền tảng tính toán và đánh giá hệ thống ô tô qua phương pháp phần tử hữu hạn, động lực học nâng cao và tối ưu hóa thiết kế.",
      },
      {
        title: "Kết nối với các hướng công nghệ mới",
        text: "Tiếp cận AI và Deep Learning, hệ thống nhúng, xe tự hành, giao thông thông minh và vật liệu mới qua các học phần theo từng định hướng.",
      },
      {
        title: "Phát triển chuyên môn qua mô phỏng, thực nghiệm và thực hành",
        text: "Định hướng ứng dụng rèn luyện khả năng vận dụng các công cụ thiết kế, mô phỏng và công nghệ số để cải tiến giải pháp kỹ thuật. Định hướng nghiên cứu chú trọng thiết lập nghiên cứu thực nghiệm hoặc tính toán, xử lý và diễn giải kết quả, phát triển năng lực nghiên cứu và hợp tác chuyên môn.",
      },
    ],
    learningOutcomes: {
      intro:
        "Chương trình hướng đến phát triển kiến thức liên ngành, kỹ năng thiết kế và nghiên cứu, năng lực phối hợp cùng trách nhiệm nghề nghiệp.",
      items: [
        {
          code: "Cả hai định hướng",
          title: "Phân tích và tối ưu hóa hệ thống",
          text: "Kết nối kiến thức liên ngành để phân tích, thiết kế, tối ưu hóa và vận hành các hệ thống ô tô hiện đại.",
        },
        {
          code: "Cả hai định hướng",
          title: "Triển khai và cải tiến giải pháp",
          text: "Thiết kế, triển khai và cải tiến các giải pháp kỹ thuật, nghiên cứu trong bối cảnh công nghiệp 4.0.",
        },
        {
          code: "Định hướng ứng dụng",
          title: "Mô phỏng và giải quyết bài toán thực tiễn",
          text: "Vận dụng công cụ CAD/CAE/CFD, phối hợp dự án và công nghệ số để nâng cao năng suất, an toàn và độ tin cậy của phương tiện.",
        },
        {
          code: "Định hướng nghiên cứu",
          title: "Nghiên cứu thực nghiệm và tính toán",
          text: "Thiết lập và triển khai nghiên cứu, xử lý và diễn giải kết quả, phát triển khả năng viết và công bố khoa học.",
        },
        {
          code: "Cả hai định hướng",
          title: "Hợp tác và dẫn dắt chuyên môn",
          text: "Phát triển khả năng phối hợp trong dự án kỹ thuật hoặc nghiên cứu đa ngành theo định hướng đào tạo.",
        },
        {
          code: "Cả hai định hướng",
          title: "Đạo đức và học tập suốt đời",
          text: "Duy trì trách nhiệm nghề nghiệp, sự trung thực và tinh thần chủ động học tập để thích ứng với thay đổi của ngành ô tô.",
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
        title: "Người làm kỹ thuật và công nghệ ô tô",
        text: "Mong muốn nâng cao năng lực thiết kế, mô phỏng, sản xuất, vận hành hoặc bảo trì các hệ thống ô tô hiện đại.",
      },
      {
        title: "Người hướng đến quản lý kỹ thuật",
        text: "Muốn phát triển chuyên môn để tham gia điều phối dự án, quản lý chất lượng và cải tiến hoạt động trong ngành ô tô.",
      },
      {
        title: "Người quan tâm nghiên cứu và R&D",
        text: "Muốn phát triển năng lực thực nghiệm, tính toán, mô hình hóa và nghiên cứu các hướng công nghệ mới.",
      },
    ],
    requirements: [
      {
        title: "Ngành tốt nghiệp có phù hợp?",
        paragraphs: [
          "Người tốt nghiệp Công nghệ kỹ thuật ô tô, Kỹ thuật ô tô hoặc Kỹ thuật cơ khí động lực không cần học bổ sung kiến thức. Các ngành gần trong danh mục học tối đa 9 tín chỉ; các ngành kỹ thuật khác được liệt kê học tối đa 15 tín chỉ. Nội dung cụ thể được xác định sau khi đối chiếu hồ sơ và bảng điểm. Ngành chưa có trong danh mục được Khoa chuyên môn rà soát để Nhà trường xem xét.",
        ],
      },
      {
        title: "Phương thức tuyển sinh",
        paragraphs: [
          "Xét tuyển. Hồ sơ được đánh giá theo điều kiện đầu vào và yêu cầu của chương trình Thạc sĩ Kỹ thuật ô tô.",
          "Văn bằng đại học do cơ sở nước ngoài cấp cần kèm minh chứng đã được công nhận theo quy định.",
        ],
      },
      {
        title: "Yêu cầu ngoại ngữ đầu vào",
        paragraphs: [
          "Chương trình giảng dạy bằng tiếng Việt. Ứng viên đáp ứng yêu cầu ngoại ngữ tương đương Bậc 3/6 trở lên, được minh chứng bằng một trong các hình thức công nhận trong thông báo tuyển sinh.",
        ],
      },
      {
        title: "Điều kiện riêng của định hướng nghiên cứu",
        paragraphs: [
          "Ứng viên tốt nghiệp đại học từ loại Khá trở lên hoặc có công bố khoa học liên quan đến lĩnh vực sẽ học tập, nghiên cứu.",
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
          "Viện và Khoa đối chiếu ngành tốt nghiệp, bảng điểm và nội dung đã tích lũy để xác định các học phần cần bổ sung. Ứng viên hoàn thành các học phần được yêu cầu trước khi xét tuyển.",
          "Nội dung bổ sung kiến thức được xác định theo hồ sơ từng ứng viên và nằm ngoài 60 tín chỉ của chương trình thạc sĩ.",
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
                  "Ứng viên vẫn phải đáp ứng đầy đủ các điều kiện dự tuyển của định hướng đăng ký.",
                ],
                points: ["Công nghệ kỹ thuật ô tô.", "Kỹ thuật ô tô.", "Kỹ thuật cơ khí động lực."],
              },
            ],
          },
          {
            title: "02. Các ngành gần · Tối đa 9 tín chỉ",
            paragraphs: [],
            groups: [
              {
                title: "Danh mục ngành gần",
                paragraphs: [],
                points: [
                  "Công nghệ kỹ thuật cơ khí Công nghệ kỹ thuật cơ khí; Công nghệ kỹ thuật cơ điện tử; Công nghệ kỹ thuật nhiệt; Công nghệ kỹ thuật tàu thủy; Bảo dưỡng công nghiệp.",
                  "Kỹ thuật cơ khí và cơ kỹ thuật Kỹ thuật cơ khí; Kỹ thuật cơ điện tử; Kỹ thuật nhiệt; Kỹ thuật công nghiệp; Kỹ thuật hệ thống công nghiệp; Kỹ thuật hàng không; Kỹ thuật tàu thủy.",
                ],
              },
              {
                title: "Các học phần bổ sung kiến thức",
                paragraphs: [
                  "Khối lượng bổ sung tối đa 9 tín chỉ. Các học phần cụ thể được xác định sau khi đối chiếu hồ sơ và bảng điểm của từng ứng viên.",
                ],
                points: [
                  "Động cơ đốt trong · 3 tín chỉ .",
                  "Lý thuyết ô tô · 3 tín chỉ .",
                  "Hệ thống điện - điện tử ô tô · 3 tín chỉ .",
                ],
              },
            ],
          },
          {
            title: "03. Các ngành kỹ thuật khác trong danh mục · Tối đa 15 tín chỉ",
            paragraphs: [],
            groups: [
              {
                title: "Danh mục ngành kỹ thuật khác",
                paragraphs: [],
                points: [
                  "Công nghệ kỹ thuật kiến trúc và công trình xây dựng Công nghệ kỹ thuật kiến trúc; Công nghệ kỹ thuật xây dựng; Công nghệ kỹ thuật giao thông; Công nghệ kỹ thuật vật liệu xây dựng.",
                  "Công nghệ kỹ thuật điện, điện tử và viễn thông Công nghệ kỹ thuật điện, điện tử; Công nghệ kỹ thuật điện tử - viễn thông; Công nghệ kỹ thuật điều khiển và tự động hóa.",
                  "Công nghệ hóa học, vật liệu, luyện kim và môi trường Công nghệ kỹ thuật hóa học; Công nghệ vật liệu; Công nghệ kỹ thuật môi trường.",
                  "Quản lý công nghiệp Quản lý công nghiệp; Quản lý năng lượng; Kinh tế công nghiệp.",
                  "Công nghệ dầu khí và khai thác Công nghệ dầu khí và khai thác dầu.",
                  "Công nghệ kỹ thuật in Công nghệ kỹ thuật in.",
                  "Kỹ thuật cơ khí và cơ kỹ thuật Cơ kỹ thuật; Kỹ thuật Robot; Kỹ thuật không gian; Kỹ thuật năng lượng; Kỹ thuật in; Kỹ thuật hàng hải.",
                  "Kỹ thuật điện, điện tử và viễn thông Kỹ thuật điện; Thiết kế vi mạch; Kỹ thuật điện tử; Kỹ thuật rađa - dẫn đường; Kỹ thuật điện tử - viễn thông; Kỹ thuật mật mã; Kỹ thuật y sinh; Kỹ thuật điều khiển và tự động hóa.",
                  "Kỹ thuật hóa học, vật liệu, luyện kim và môi trường Kỹ thuật hóa học; Kỹ thuật vật liệu; Kỹ thuật dệt, may; Kỹ thuật môi trường.",
                  "Vật lý kỹ thuật Vật lý kỹ thuật; Kỹ thuật hạt nhân.",
                  "Kỹ thuật địa chất, địa vật lý và trắc địa Kỹ thuật địa chất; Kỹ thuật địa vật lý; Kỹ thuật trắc địa - bản đồ.",
                  "Kỹ thuật mỏ Kỹ thuật mỏ; Khai thác mỏ; Kỹ thuật dầu khí; Kỹ thuật tuyển khoáng.",
                ],
              },
              {
                title: "Các học phần bổ sung kiến thức",
                paragraphs: [
                  "Khối lượng bổ sung tối đa 15 tín chỉ dành cho các ngành được liệt kê ở trên. Các học phần cụ thể được xác định sau khi đối chiếu hồ sơ và bảng điểm của từng ứng viên.",
                ],
                points: [
                  "Lý thuyết ô tô · 3 tín chỉ .",
                  "Hệ thống điện - điện tử ô tô · 3 tín chỉ .",
                  "Kết cấu ô tô · 3 tín chỉ .",
                  "Tính toán thiết kế ô tô · 3 tín chỉ .",
                  "Công nghệ chẩn đoán sửa chữa ô tô · 3 tín chỉ .",
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
    headline: "Vững chuyên môn kỹ thuật. Mở rộng hướng phát triển.",
    intro:
      "Nền tảng thiết kế, công nghệ và nghiên cứu hỗ trợ người học phát triển nghề nghiệp tại doanh nghiệp sản xuất, dịch vụ ô tô, đơn vị R&D và cơ sở giáo dục.",
    note: "Hướng phát triển và vị trí đảm nhiệm phụ thuộc vào nền tảng chuyên môn, kinh nghiệm, năng lực thực tế và yêu cầu của từng tổ chức.",
    careerImage: "/images/pages/programmes/ky-thuat-o-to/programme-hero.webp",
    careers: [
      {
        group: "Thiết kế và phát triển kỹ thuật",
        title: "Thiết kế, mô phỏng và tối ưu hóa",
        sub: "Vận dụng kiến thức chuyên sâu để phân tích, mô hình hóa, thiết kế và cải tiến các hệ thống ô tô hiện đại.",
      },
      {
        group: "Thiết kế và phát triển kỹ thuật",
        title: "Phát triển giải pháp công nghệ",
        sub: "Tham gia các bài toán kỹ thuật liên quan đến xe điện, năng lượng, điều khiển và các hệ thống thông minh theo hướng chuyên môn.",
      },
      {
        group: "Sản xuất, dịch vụ và quản lý",
        title: "Sản xuất, vận hành và dịch vụ ô tô",
        sub: "Giải quyết vấn đề trong chế tạo, vận hành, bảo trì phương tiện; đề xuất giải pháp nâng cao năng suất, an toàn và độ tin cậy.",
      },
      {
        group: "Sản xuất, dịch vụ và quản lý",
        title: "Quản lý chất lượng và dự án",
        sub: "Phát triển năng lực tổ chức, điều phối và cải tiến hoạt động kỹ thuật, chất lượng hoặc dự án trong ngành công nghiệp ô tô.",
      },
      {
        group: "Nghiên cứu và phát triển học thuật",
        title: "Nghiên cứu và phát triển (R&D)",
        sub: "Tham gia nghiên cứu thực nghiệm, tính toán và phát triển công nghệ; phối hợp trong các dự án nghiên cứu đa ngành.",
      },
      {
        group: "Nghiên cứu và phát triển học thuật",
        title: "Giảng dạy và học tập nâng cao",
        sub: "Phát triển theo hướng giảng dạy tại cơ sở giáo dục hoặc tiếp tục học trình độ tiến sĩ khi đáp ứng các điều kiện của vị trí, chương trình.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "Dành cho người muốn nâng cao khả năng thiết kế, triển khai và cải tiến giải pháp kỹ thuật trong sản xuất, vận hành và dịch vụ ô tô. Chương trình gồm 15 học phần, một chuyên đề, thực tập chuyên môn nâng cao và đề án tốt nghiệp.",
      "Dành cho người muốn phát triển năng lực nghiên cứu thực nghiệm hoặc tính toán, mô hình hóa hệ thống và đề xuất hướng công nghệ mới. Chương trình gồm 13 học phần, hai chuyên đề nghiên cứu và luận văn tốt nghiệp.",
    ],
    trackLabels: ["Định hướng ứng dụng", "Định hướng nghiên cứu"],
    graduationProjects: ["Đề án tốt nghiệp · 6 tín chỉ", "Luận văn tốt nghiệp · 15 tín chỉ"],
    studyMode: "Chính quy tập trung",
  },
  consultation: {
    ...programmeSharedContent.consultation,
    ctaHeading: ["Sẵn sàng cho bước học tiếp theo?"],
    ctaBody: "Trao đổi về chương trình, nền tảng đã học và mục tiêu của bạn để chuẩn bị phù hợp.",
    formIntro: {
      eyebrow: "VIỆN SAU ĐẠI HỌC · LIÊN HỆ TƯ VẤN",
      titleLines: ["Bắt đầu từ", "mục tiêu của bạn."],
      body: "Chia sẻ điều bạn quan tâm về chương trình Thạc sĩ Kỹ thuật ô tô. Đội ngũ tư vấn sẽ hỗ trợ bạn lựa chọn định hướng học tập và chuẩn bị hồ sơ phù hợp.",
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
          "Cả hai định hướng đều có 60 tín chỉ. Hướng ứng dụng tập trung giải quyết bài toán nghề nghiệp, gồm chuyên đề công nghệ mới 3 tín chỉ, thực tập chuyên môn nâng cao 6 tín chỉ và đề án tốt nghiệp 6 tín chỉ. Hướng nghiên cứu phát triển năng lực thực nghiệm, tính toán và nghiên cứu, gồm hai chuyên đề tổng 6 tín chỉ cùng luận văn tốt nghiệp 15 tín chỉ.",
      },
      {
        question: "Thời gian học và lịch học được bố trí như thế nào?",
        answer:
          "Thời gian đào tạo theo đề án tuyển sinh là 18 tháng đối với định hướng ứng dụng và 24 tháng đối với định hướng nghiên cứu. Lịch học được bố trí vào buổi tối các ngày trong tuần và/hoặc Thứ Bảy, Chủ nhật theo kế hoạch từng học kỳ. Thời khóa biểu chính thức do Trường công bố.",
      },
      {
        question: "Điều kiện riêng khi đăng ký định hướng nghiên cứu là gì?",
        answer:
          "Ngoài các điều kiện dự tuyển chung, ứng viên cần tốt nghiệp đại học từ loại Khá trở lên hoặc có công bố khoa học liên quan đến lĩnh vực sẽ học tập, nghiên cứu. Cả hai định hướng đều tuyển sinh bằng phương thức xét tuyển.",
      },
      {
        question: "Tốt nghiệp ngành khác có thể dự tuyển không?",
        answer:
          "Ứng viên các ngành gần trong danh mục bổ sung tối đa 9 tín chỉ; các ngành kỹ thuật khác được liệt kê bổ sung tối đa 15 tín chỉ. Nội dung cụ thể được xác định qua hồ sơ và bảng điểm. Với ngành ngoài danh mục, Khoa chuyên môn rà soát và đề xuất để Nhà trường xem xét, quyết định.",
      },
      {
        question: "Yêu cầu ngoại ngữ đầu vào và đầu ra như thế nào?",
        answer:
          "Ứng viên đáp ứng ngoại ngữ đầu vào tương đương Bậc 3/6 trở lên theo các hình thức công nhận trong thông báo tuyển sinh. Trước khi được công nhận tốt nghiệp, học viên cần đạt chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 theo quy định.",
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

export const kyThuatOToProgramme: Programme = {
  id: "ky-thuat-o-to",
  code: "520130",
  title: "Kỹ thuật ô tô",
  englishTitle: "Master of Automotive Engineering",
  degree: "Thạc sĩ",
  field: "Kỹ thuật, Môi trường & Công nghệ",
  orientation: "Ứng dụng",
  credits: 60,
  duration: "18–24 tháng",
  studyMode: "Chính quy tập trung, tiếng Việt",
  intake: "Tuyển sinh thạc sĩ 2027",
  summary:
    "Phát triển năng lực thiết kế, mô phỏng và tối ưu hóa hệ thống ô tô; tiếp cận công nghệ xe điện, pin và trí tuệ nhân tạo để giải quyết các bài toán kỹ thuật trong công nghiệp và nghiên cứu.",
  schedule:
    "Buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu theo từng học kỳ.",
  tuition: "85.000.000 VNĐ",
  orientations: ["Ứng dụng", "Nghiên cứu"],
};

export function getKyThuatOToCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng ứng dụng",
      orientation: "Ứng dụng",
      subtitle: "18 tháng · 60 tín chỉ",
      graduationProject: "Đề án tốt nghiệp · 6 tín chỉ",
      intro:
        "Dành cho người muốn nâng cao khả năng thiết kế, triển khai và cải tiến giải pháp kỹ thuật trong sản xuất, vận hành và dịch vụ ô tô. Chương trình gồm 15 học phần, một chuyên đề, thực tập chuyên môn nâng cao và đề án tốt nghiệp.",
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
          value: "9 tín chỉ",
        },
        {
          label: "Tốt nghiệp",
          value: "Đề án · 6 tín chỉ",
        },
      ],
      notes: [
        "Cùng khối lượng 60 tín chỉ, mỗi định hướng có cơ cấu học phần, nhóm tự chọn và hình thức hoàn thành riêng. Chọn định hướng để xem chi tiết chương trình.",
        "6 tín chỉ chung + 18 tín chỉ cơ sở + 21 tín chỉ chuyên ngành + 15 tín chỉ chuyên đề, thực tập và đề án = 60 tín chỉ.",
        "Học phần được triển khai theo kế hoạch đào tạo của Khoa. Lịch mở lớp, lựa chọn học phần tự chọn và thời khóa biểu được thông báo theo từng đợt.",
      ],
      groups: [
        {
          title: "I. Kiến thức chung",
          totalCreditsLabel: "6 tín chỉ",
          courses: [
            {
              name: "Triết học Mác Lênin",
              englishName: "Philosophy of Marxism and Leninism",
              credits: 3,
            },
            {
              name: "Phương pháp nghiên cứu khoa học",
              englishName: "Research Methodology",
              credits: 3,
            },
          ],
          description: ["Học phần bắt buộc · 6 tín chỉ"],
        },
        {
          title: "II. Kiến thức cơ sở",
          totalCreditsLabel: "18 tín chỉ",
          courses: [],
          subgroups: [
            {
              title: "Học phần bắt buộc · 15 tín chỉ",
              totalCreditsLabel: "15 tín chỉ",
              description: [],
              courses: [
                {
                  name: "Công nghệ chế tạo và lắp ráp ô tô hiện đại",
                  englishName: "Advanced Automotive Manufacturing and Assembly Technology",
                  credits: 3,
                },
                {
                  name: "Phương pháp phần tử hữu hạn",
                  englishName: "Finite Element Method (FEM)",
                  credits: 3,
                },
                {
                  name: "Tính toán và tối ưu hóa thiết kế hệ thống ô tô",
                  englishName: "Automotive Systems Design and Optimization",
                  credits: 3,
                },
                {
                  name: "Động lực học ô tô nâng cao",
                  englishName: "Advanced Vehicle Dynamics",
                  credits: 3,
                },
                {
                  name: "Kỹ thuật va chạm ô tô và phân tích an toàn",
                  englishName: "Automotive Crash Engineering and Safety Analysis",
                  credits: 3,
                },
              ],
            },
            {
              title: "Tự chọn kiến thức cơ sở",
              totalCreditsLabel: "3 tín chỉ",
              description: [
                "Chọn 1 trong 3 học phần · Tích lũy 3 tín chỉ. Mỗi học phần 3 tín chỉ.",
              ],
              courses: [
                {
                  name: "Mô phỏng và mô hình hóa trong thiết kế ô tô",
                  englishName: "Modeling and Simulation in Automotive Design",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Công nghệ chẩn đoán và sửa chữa ô tô hiện đại",
                  englishName: "Advanced Automotive Diagnostics and Repair",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Công nghệ tái chế và quản lý bền vững trong ngành ô tô",
                  englishName: "Recycling and Sustainable Management in the Automotive Industry",
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
          totalCreditsLabel: "21 tín chỉ",
          courses: [],
          subgroups: [
            {
              title: "Học phần bắt buộc · 15 tín chỉ",
              totalCreditsLabel: "15 tín chỉ",
              description: [],
              courses: [
                {
                  name: "Mô phỏng và tối ưu hóa hệ thống động lực học ô tô",
                  englishName: "Simulation and Optimization of Vehicle Dynamic Systems",
                  credits: 3,
                },
                {
                  name: "Công nghệ pin và quản lý năng lượng trong xe điện",
                  englishName: "Battery Technology and Energy Management in Electric Vehicles",
                  credits: 3,
                },
                {
                  name: "Vi xử lý và hệ thống nhúng trong ô tô",
                  englishName: "Microprocessors and Embedded Systems in Automotive Applications",
                  credits: 3,
                },
                {
                  name: "Công nghệ xe điện (EV), xe lai và trạm sạc",
                  englishName:
                    "Electric Vehicles (EVs), Hybrids, and Charging Station Technologies",
                  credits: 3,
                },
                {
                  name: "AI và ứng dụng Deep Learning trong kỹ thuật ô tô",
                  englishName: "AI and Deep Learning Applications in Automotive Engineering",
                  credits: 3,
                },
              ],
            },
            {
              title: "Tự chọn chuyên ngành 1",
              totalCreditsLabel: "3 tín chỉ",
              description: [
                "Chọn 1 trong 4 học phần · Tích lũy 3 tín chỉ. Mỗi học phần 3 tín chỉ.",
              ],
              courses: [
                {
                  name: "Công nghệ vật liệu mới dùng trên ô tô",
                  englishName: "Advanced Automotive Materials Technology",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Nhiên liệu và năng lượng tái tạo trong giao thông vận tải",
                  englishName: "Renewable Fuels and Sustainable Energy in Transportation",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Động học lưu chất tính toán (CFD)",
                  englishName: "Computational Fluid Dynamics (CFD) in Vehicle Design",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Quản lý kỹ thuật và dịch vụ trong ngành công nghiệp ô tô",
                  englishName: "Engineering and Service Management in the Automotive Industry",
                  credits: 3,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn chuyên ngành 2",
              totalCreditsLabel: "3 tín chỉ",
              description: [
                "Chọn 1 trong 3 học phần · Tích lũy 3 tín chỉ. Mỗi học phần 3 tín chỉ.",
              ],
              courses: [
                {
                  name: "Xe tự hành và các công nghệ liên quan",
                  englishName: "Autonomous Vehicles Technologies",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Hệ thống giao thông thông minh và công nghệ kết nối",
                  englishName: "Smart Transportation Systems and Connectivity Technologies",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Hệ thống điện - điện tử ô tô hiện đại",
                  englishName: "Advanced Automotive Electrical and Electronic Systems",
                  credits: 3,
                  elective: true,
                },
              ],
            },
          ],
          description: ["Tự chọn 6 tín chỉ: chọn một học phần trong mỗi nhóm dưới đây."],
        },
        {
          title: "IV. Chuyên đề, thực tập và đề án tốt nghiệp",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              name: "Chuyên đề công nghệ mới trên ô tô",
              englishName: "Special Studies on Novel Automotive Technology",
              credits: 3,
            },
            {
              name: "Thực tập chuyên môn nâng cao",
              englishName: "Advanced Professional Internship",
              credits: 6,
            },
            {
              name: "Đề án tốt nghiệp",
              englishName: "Capstone project",
              credits: 6,
            },
          ],
          description: [],
        },
      ],
      completion: {
        heading: "Hoàn thành chương trình",
        items: [
          "Tích lũy 60 tín chỉ theo cơ cấu chương trình, gồm chuyên đề công nghệ mới trên ô tô 3 tín chỉ, thực tập chuyên môn nâng cao 6 tín chỉ và đề án tốt nghiệp 6 tín chỉ.",
          "Hoàn thành thực tập và đề án theo yêu cầu; đáp ứng chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 và các điều kiện công nhận tốt nghiệp theo quy định của Trường.",
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
        "Dành cho người muốn phát triển năng lực nghiên cứu thực nghiệm hoặc tính toán, mô hình hóa hệ thống và đề xuất hướng công nghệ mới. Chương trình gồm 13 học phần, hai chuyên đề nghiên cứu và luận văn tốt nghiệp.",
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
          value: "Tiếng Việt",
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
        "Cùng khối lượng 60 tín chỉ, mỗi định hướng có cơ cấu học phần, nhóm tự chọn và hình thức hoàn thành riêng. Chọn định hướng để xem chi tiết chương trình.",
        "6 tín chỉ chung + 15 tín chỉ cơ sở + 18 tín chỉ chuyên ngành + 6 tín chỉ chuyên đề nghiên cứu + 15 tín chỉ luận văn = 60 tín chỉ.",
        "Học phần được triển khai theo kế hoạch đào tạo của Khoa. Lịch mở lớp, lựa chọn học phần tự chọn và thời khóa biểu được thông báo theo từng đợt.",
      ],
      groups: [
        {
          title: "I. Kiến thức chung",
          totalCreditsLabel: "6 tín chỉ",
          courses: [
            {
              name: "Triết học Mác Lênin",
              englishName: "Philosophy of Marxism and Leninism",
              credits: 3,
            },
            {
              name: "Phương pháp nghiên cứu khoa học",
              englishName: "Research Methodology",
              credits: 3,
            },
          ],
          description: ["Học phần bắt buộc · 6 tín chỉ"],
        },
        {
          title: "II. Kiến thức cơ sở",
          totalCreditsLabel: "15 tín chỉ",
          courses: [],
          subgroups: [
            {
              title: "Học phần bắt buộc · 12 tín chỉ",
              totalCreditsLabel: "12 tín chỉ",
              description: [],
              courses: [
                {
                  name: "Phương pháp phần tử hữu hạn",
                  englishName: "Finite Element Method (FEM)",
                  credits: 3,
                },
                {
                  name: "Tính toán và tối ưu hóa thiết kế hệ thống ô tô",
                  englishName: "Automotive Systems Design and Optimization",
                  credits: 3,
                },
                {
                  name: "Động lực học ô tô nâng cao",
                  englishName: "Advanced Vehicle Dynamics",
                  credits: 3,
                },
                {
                  name: "Kỹ thuật va chạm ô tô và phân tích an toàn",
                  englishName: "Automotive Crash Engineering and Safety Analysis",
                  credits: 3,
                },
              ],
            },
            {
              title: "Tự chọn kiến thức cơ sở",
              totalCreditsLabel: "3 tín chỉ",
              description: [
                "Chọn 1 trong 4 học phần · Tích lũy 3 tín chỉ. Mỗi học phần 3 tín chỉ.",
              ],
              courses: [
                {
                  name: "Công nghệ chẩn đoán và sửa chữa ô tô hiện đại",
                  englishName: "Advanced Automotive Diagnostics and Repair",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Vi xử lý và hệ thống nhúng trong ô tô",
                  englishName: "Microprocessors and Embedded Systems in Automotive Applications",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Mô phỏng và mô hình hóa trong thiết kế ô tô",
                  englishName: "Modeling and Simulation in Automotive Design",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Công nghệ chế tạo và lắp ráp ô tô hiện đại",
                  englishName: "Advanced Automotive Manufacturing and Assembly Technology",
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
          totalCreditsLabel: "18 tín chỉ",
          courses: [],
          subgroups: [
            {
              title: "Học phần bắt buộc · 9 tín chỉ",
              totalCreditsLabel: "9 tín chỉ",
              description: [],
              courses: [
                {
                  name: "Mô phỏng và tối ưu hóa hệ thống động lực học ô tô",
                  englishName: "Simulation and Optimization of Vehicle Dynamic Systems",
                  credits: 3,
                },
                {
                  name: "Công nghệ pin và quản lý năng lượng trong xe điện",
                  englishName: "Battery Technology and Energy Management in Electric Vehicles",
                  credits: 3,
                },
                {
                  name: "Công nghệ xe điện (EV), xe lai và trạm sạc",
                  englishName:
                    "Electric Vehicles (EVs), Hybrids, and Charging Station Technologies",
                  credits: 3,
                },
              ],
            },
            {
              title: "Tự chọn chuyên ngành 1",
              totalCreditsLabel: "3 tín chỉ",
              description: [
                "Chọn 1 trong 3 học phần · Tích lũy 3 tín chỉ. Mỗi học phần 3 tín chỉ.",
              ],
              courses: [
                {
                  name: "Công nghệ tái chế và quản lý bền vững trong ngành ô tô",
                  englishName: "Recycling and Sustainable Management in the Automotive Industry",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Công nghệ vật liệu mới dùng trên ô tô",
                  englishName: "Advanced Automotive Materials Technology",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Nhiên liệu và năng lượng tái tạo trong giao thông vận tải",
                  englishName: "Renewable Fuels and Sustainable Energy in Transportation",
                  credits: 3,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn chuyên ngành 2",
              totalCreditsLabel: "3 tín chỉ",
              description: [
                "Chọn 1 trong 3 học phần · Tích lũy 3 tín chỉ. Mỗi học phần 3 tín chỉ.",
              ],
              courses: [
                {
                  name: "Quản lý kỹ thuật và dịch vụ trong ngành công nghiệp ô tô",
                  englishName: "Engineering and Service Management in the Automotive Industry",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Hệ thống giao thông thông minh và công nghệ kết nối",
                  englishName: "Smart Transportation Systems and Connectivity Technologies",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Hệ thống điện - điện tử ô tô hiện đại",
                  englishName: "Advanced Automotive Electrical and Electronic Systems",
                  credits: 3,
                  elective: true,
                },
              ],
            },
            {
              title: "Tự chọn chuyên ngành 3",
              totalCreditsLabel: "3 tín chỉ",
              description: [
                "Chọn 1 trong 3 học phần · Tích lũy 3 tín chỉ. Mỗi học phần 3 tín chỉ.",
              ],
              courses: [
                {
                  name: "Động học lưu chất tính toán (CFD)",
                  englishName: "Computational Fluid Dynamics (CFD) in Vehicle Design",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "Xe tự hành và các công nghệ liên quan",
                  englishName: "Autonomous Vehicles Technologies",
                  credits: 3,
                  elective: true,
                },
                {
                  name: "AI và ứng dụng Deep Learning trong kỹ thuật ô tô",
                  englishName: "AI and Deep Learning Applications in Automotive Engineering",
                  credits: 3,
                  elective: true,
                },
              ],
            },
          ],
          description: ["Tự chọn 9 tín chỉ: chọn một học phần trong mỗi nhóm dưới đây."],
        },
        {
          title: "IV. Chuyên đề nghiên cứu",
          totalCreditsLabel: "6 tín chỉ",
          courses: [
            {
              name: "Chuyên đề cơ sở ngành",
              englishName: "Special Studies on Automotive Engineering",
              credits: 3,
            },
            {
              name: "Chuyên đề công nghệ mới trên ô tô",
              englishName: "Special Studies on Novel Automotive Technology",
              credits: 3,
            },
          ],
          description: [],
        },
        {
          title: "V. Luận văn tốt nghiệp",
          totalCreditsLabel: "15 tín chỉ",
          courses: [
            {
              name: "Luận văn tốt nghiệp",
              englishName: "Graduation Thesis",
              credits: 15,
            },
          ],
          description: [],
        },
      ],
      completion: {
        heading: "Hoàn thành chương trình",
        items: [
          "Tích lũy 60 tín chỉ theo cơ cấu chương trình, gồm chuyên đề cơ sở ngành 3 tín chỉ, chuyên đề công nghệ mới trên ô tô 3 tín chỉ và luận văn tốt nghiệp 15 tín chỉ.",
          "Hoàn thành chuyên đề và luận văn theo yêu cầu; đáp ứng chuẩn ngoại ngữ đầu ra tương đương Bậc 4/6 và các điều kiện công nhận tốt nghiệp theo quy định của Trường.",
        ],
      },
    },
  ];
}
