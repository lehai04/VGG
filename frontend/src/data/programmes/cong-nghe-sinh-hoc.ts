// Nguồn: thac-si-cong-nghe-sinh-hoc.html do người dùng cung cấp ngày 24/10/2026.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";

export const congNgheSinhHocPageContent: ProgrammePageContent = {
  hero: {
    ...programmeSharedContent.hero,
    heroLead:
      "Phát triển kiến thức chuyên sâu và năng lực nghiên cứu để khám phá các cơ chế của sự sống, ứng dụng công nghệ sinh học trong y sinh, sức khỏe và phát triển bền vững.",
    heroSlogan: "FUTURE",
    heroImage: "/images/pages/programmes/cong-nghe-sinh-hoc/laboratory-microscope.webp",
    imageAlt: "Thực hành với kính hiển vi trong phòng thí nghiệm tại Trường Đại học Văn Lang",
    imageCredit: {
      text: "Thực hành trong phòng thí nghiệm · Nguồn: Văn Lang ↗",
      href: "https://www.vlu.edu.vn/academics/majors/thac-si-cong-nghe-sinh-hoc",
    },
  },
  facts: {
    ...programmeSharedContent.facts,
    quickFactsDetailed: [
      {
        label: "Mã ngành",
        value: "420201",
        detail: "Mã chương trình: 8420201",
      },
      {
        label: "Khối lượng chương trình",
        value: "60 tín chỉ",
        detail: "24 tháng · 6 học kỳ",
      },
      {
        label: "Định hướng đào tạo",
        value: "Nghiên cứu",
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
    headline: "Nghiên cứu sự sống. Ứng dụng vì sức khỏe.",
    overview: [
      "Chương trình Thạc sĩ Công nghệ sinh học tại Văn Lang được thiết kế theo định hướng nghiên cứu, giúp người học phát triển kiến thức chuyên sâu về sinh học phân tử, hóa sinh, miễn dịch và sinh học tế bào. Từ nền tảng này, người học tiếp cận các công nghệ hiện đại trong chẩn đoán phân tử, liệu pháp gene, liệu pháp tế bào và tin sinh học.",
      "Với 27 tín chỉ dành cho hai chuyên đề nghiên cứu và luận văn, chương trình chú trọng năng lực xác định vấn đề, thiết kế nghiên cứu, triển khai thực nghiệm, phân tích dữ liệu và trình bày kết quả khoa học.",
      "Người học có cơ hội kết nối nghiên cứu với thực tiễn tại Trường, các viện, trung tâm nghiên cứu và doanh nghiệp; đồng thời phát triển ý thức về đạo đức nghiên cứu, an toàn sinh học và trách nhiệm với cộng đồng.",
      "Văn bằng tốt nghiệp: Thạc sĩ Công nghệ sinh học Master of Engineering in Biotechnology",
    ],
    overviewImage: "/images/pages/programmes/cong-nghe-sinh-hoc/laboratory-equipment.webp",
    imageAlt:
      "Thao tác với ống mẫu và thiết bị ly tâm trong phòng thí nghiệm của Trường Đại học Văn Lang",
    imageCredit: {
      text: "Thao tác với thiết bị phòng thí nghiệm Nguồn: Trường Đại học Văn Lang ↗",
      href: "https://www.vlu.edu.vn/academics/majors/thac-si-cong-nghe-sinh-hoc",
    },
    focusAreas: [
      "Y sinh & sức khỏe",
      "Tin sinh học",
      "Công nghệ sinh học hiện đại",
      "Phát triển bền vững",
    ],
    ribbonTitle: "Nghiên cứu là trọng tâm.",
    tags: [
      "Chuyên đề và luận văn 45% khối lượng chương trình 27 tín chỉ",
      "Luận văn tốt nghiệp Thực hiện trong học kỳ 5–6 15 tín chỉ",
    ],
    link: {
      text: "Khám phá khung chương trình",
      href: "#chuong-trinh",
      ariaLabel: "Khám phá khung chương trình Công nghệ sinh học",
    },
  },
  section02: {
    ...programmeSharedContent.highlights,
    sectionNumber: "02",
    highlights: [
      {
        title: "Nghiên cứu chiếm 45% chương trình",
        text: "Hai chuyên đề nghiên cứu, mỗi chuyên đề 6 tín chỉ, cùng luận văn 15 tín chỉ tạo không gian để người học phát triển một hướng nghiên cứu chuyên sâu.",
      },
      {
        title: "Tiếp cận công nghệ sinh học hiện đại",
        text: "Kết nối kiến thức sinh học phân tử và tế bào với liệu pháp gene, miễn dịch học, chẩn đoán phân tử và các học phần chuyên ngành tự chọn.",
      },
      {
        title: "Phân tích dữ liệu sinh học",
        text: "Học phần Tin sinh học ứng dụng giúp người học tiếp cận dữ liệu hệ gen và dữ liệu omics, rèn luyện kỹ năng xử lý, phân tích và diễn giải kết quả.",
      },
      {
        title: "Gắn với môi trường nghiên cứu thực tế",
        text: "Học viên được tham quan, kiến tập, thực tập và thực hiện luận văn tại Trường, viện, trung tâm nghiên cứu và doanh nghiệp theo kế hoạch đào tạo.",
      },
      {
        title: "Phát triển cùng môi trường nghiên cứu",
        text: "Học viên được tạo điều kiện đăng ký đề tài nghiên cứu khoa học cấp trường. Học viên đáp ứng năng lực ngoại ngữ được giới thiệu tham gia các dự án nghiên cứu quốc tế; với kết quả nghiên cứu tốt, học viên được giảng viên hướng dẫn công bố bài báo khoa học và giới thiệu cơ hội học tiến sĩ.",
      },
    ],
    learningOutcomes: {
      intro:
        "Sáu chuẩn đầu ra bao quát kiến thức chuyên sâu, kỹ năng nghiên cứu và năng lực tự chủ, trách nhiệm trong hoạt động khoa học.",
      items: [
        {
          code: "PLO1",
          title: "Vận dụng kiến thức chuyên sâu",
          text: "Vận dụng kiến thức chuyên sâu về sinh học phân tử, hóa sinh, sinh học tế bào, miễn dịch và vi sinh học để phân tích và giải thích các hiện tượng sinh học, bệnh học và các vấn đề khoa học trong lĩnh vực công nghệ sinh học.",
        },
        {
          code: "PLO2",
          title: "Đánh giá và ứng dụng công nghệ",
          text: "Phân tích nguyên lý và đánh giá khả năng ứng dụng của các công nghệ sinh học hiện đại trong y sinh và sức khỏe, bao gồm chẩn đoán phân tử, Vắc xin, liệu pháp sinh học, công nghệ nano sinh học và tin sinh học.",
        },
        {
          code: "PLO3",
          title: "Thiết kế và triển khai nghiên cứu",
          text: "Thiết kế, triển khai và đánh giá một nghiên cứu khoa học trong lĩnh vực công nghệ sinh học theo phương pháp luận khoa học, từ hình thành vấn đề nghiên cứu đến phân tích và diễn giải kết quả.",
        },
        {
          code: "PLO4",
          title: "Phân tích và trình bày dữ liệu",
          text: "Phân tích, xử lý và trình bày dữ liệu nghiên cứu khoa học bằng các công cụ và phương pháp phù hợp, đáp ứng yêu cầu báo cáo và công bố khoa học ở trình độ thạc sĩ.",
        },
        {
          code: "PLO5",
          title: "Làm việc độc lập và hợp tác",
          text: "Làm việc độc lập hoặc phối hợp trong nhóm nghiên cứu, có khả năng tổ chức, quản lý hoạt động nghiên cứu khoa học và chủ động cập nhật kiến thức mới trong lĩnh vực công nghệ sinh học.",
        },
        {
          code: "PLO6",
          title: "Thực hành nghiên cứu có trách nhiệm",
          text: "Tuân thủ đạo đức nghiên cứu, trung thực khoa học, an toàn sinh học và các quy định pháp lý liên quan; thể hiện trách nhiệm xã hội trong nghiên cứu và ứng dụng công nghệ sinh học vì sự phát triển bền vững.",
        },
      ],
    },
  },
  section03: {
    sectionNumber: "03",
    audienceHeading: "Chương trình phù hợp với ai?",
    headline: "Từ nền tảng chuyên môn đến năng lực nghiên cứu.",
    intro: [
      "Ứng viên đã tốt nghiệp hoặc đủ điều kiện được công nhận tốt nghiệp từ trình độ đại học trở lên, có ngành học phù hợp và đáp ứng các điều kiện dự tuyển của chương trình.",
    ],
    audience: [
      {
        title: "Người muốn đi sâu vào nghiên cứu",
        text: "Phát triển nền tảng sinh học thành năng lực đặt câu hỏi khoa học, thiết kế thực nghiệm, phân tích dữ liệu và thực hiện nghiên cứu độc lập.",
      },
      {
        title: "Người làm việc trong lĩnh vực liên quan",
        text: "Cập nhật kiến thức và phương pháp phục vụ công việc tại phòng thí nghiệm, đơn vị nghiên cứu, doanh nghiệp công nghệ sinh học hoặc y sinh.",
      },
      {
        title: "Người hướng đến giảng dạy và học tiếp",
        text: "Củng cố kiến thức chuyên sâu và năng lực nghiên cứu để chuẩn bị cho công việc học thuật hoặc hành trình học tập ở trình độ tiến sĩ.",
      },
    ],
    requirements: [
      {
        title: "Ngành tốt nghiệp có phù hợp?",
        paragraphs: [
          "Người tốt nghiệp Công nghệ sinh học, Kỹ thuật sinh học, Sinh học ứng dụng, Sinh học và Sư phạm sinh học không cần học bổ sung kiến thức. Với các ngành liên quan trong danh mục, khối lượng bổ sung tối đa 6 tín chỉ, được xác định trên cơ sở bảng điểm và nội dung đã học. Các ngành chưa có trong danh mục được Hội đồng xem xét theo từng hồ sơ.",
        ],
      },
      {
        title: "Phương thức tuyển sinh",
        paragraphs: [
          "Xét tuyển. Hồ sơ được đánh giá theo điều kiện đầu vào và yêu cầu của chương trình Thạc sĩ Công nghệ sinh học.",
        ],
      },
      {
        title: "Yêu cầu ngoại ngữ đầu vào",
        paragraphs: [
          "Chương trình giảng dạy bằng tiếng Việt. Ứng viên đáp ứng yêu cầu ngoại ngữ tương đương Bậc 3/6 trở lên, được minh chứng bằng một trong các hình thức công nhận trong thông báo tuyển sinh.",
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
          "Viện và Khoa đối chiếu ngành tốt nghiệp, bảng điểm và nội dung đã học để xác định học phần cần bổ sung. Ứng viên phải hoàn thành các học phần được yêu cầu trước khi xét tuyển.",
          "Với các ngành liên quan trong danh mục: bổ sung tối đa 6 tín chỉ. Phần bổ sung kiến thức nằm ngoài khối lượng 60 tín chỉ của chương trình thạc sĩ.",
          "Kết quả bổ sung kiến thức có giá trị 2 năm kể từ ngày được công nhận đạt yêu cầu.",
        ],
        groups: [
          {
            title: "01. Nhóm không cần bổ sung kiến thức",
            paragraphs: [],
            groups: [
              {
                title: "Ngành tốt nghiệp",
                paragraphs: [
                  "Ứng viên không cần học bổ sung kiến thức và vẫn phải đáp ứng đầy đủ các điều kiện dự tuyển của chương trình.",
                ],
                points: [
                  "Công nghệ sinh học (7420201)",
                  "Kỹ thuật sinh học (7420202)",
                  "Sinh học ứng dụng (7420203)",
                  "Sinh học (7420101)",
                  "Sư phạm sinh học (7140213)",
                ],
              },
            ],
          },
          {
            title: "02. Các ngành liên quan · Bổ sung tối đa 6 tín chỉ",
            paragraphs: [],
            groups: [
              {
                title: "Ngành tốt nghiệp",
                paragraphs: [],
                points: [
                  "Chế biến lương thực, thực phẩm và đồ uống Công nghệ thực phẩm (7540101); Công nghệ sau thu hoạch (7540104); Công nghệ chế biến thủy sản (7540105); Đảm bảo chất lượng và an toàn thực phẩm (7540106).",
                  "Nông nghiệp Nông nghiệp (7620101); Khuyến nông (7620102); Khoa học đất (7620103); Chăn nuôi (7620105); Nông học (7620109); Khoa học cây trồng (7620110); Bảo vệ thực vật (7620112); Kinh tế nông nghiệp (7620115); Phát triển nông thôn (7620116).",
                  "Dược học Dược học (7720201); Công nghệ dược phẩm (7720202); Hóa dược (7720203).",
                  "Dinh dưỡng Dinh dưỡng (7720401).",
                  "Kỹ thuật y học Kỹ thuật xét nghiệm y học (7720601).",
                  "Quản lý tài nguyên và môi trường Quản lý tài nguyên và môi trường (7850101); Môi trường và phát triển bền vững (7850104).",
                  "Lâm nghiệp Lâm học (7620201); Lâm nghiệp đô thị (7620202); Lâm sinh (7620205).",
                  "Thủy sản Khoa học thủy sản (7620303).",
                  "Y học Y học cổ truyền (7720115).",
                  "Thú y Thú y (7640101).",
                ],
              },
              {
                title: "Danh mục học phần có thể được yêu cầu",
                paragraphs: [
                  "Hội đồng xác định các học phần cần bổ sung, tổng khối lượng tối đa 6 tín chỉ, trên cơ sở nội dung đã học. Danh mục gồm 8 học phần, mỗi học phần 2 tín chỉ:",
                  "Ứng viên có thể được miễn học phần bổ sung nếu bảng điểm minh chứng đã hoàn thành học phần tương đương.",
                ],
                points: [
                  "Nhập môn Công nghệ sinh học · 2 tín chỉ",
                  "Hóa sinh · 2 tín chỉ",
                  "Sinh học phân tử và Di truyền · 2 tín chỉ",
                  "Kỹ thuật vi sinh · 2 tín chỉ",
                  "Sinh lý người và động vật · 2 tín chỉ",
                  "Sinh lý thực vật · 2 tín chỉ",
                  "Công nghệ gen · 2 tín chỉ",
                  "Tin sinh học · 2 tín chỉ",
                ],
              },
            ],
          },
          {
            title: "03. Ngành khác hoặc chưa có trong danh mục",
            paragraphs: [
              "Hội đồng tuyển sinh và Hội đồng Khoa học Khoa Công nghệ Ứng dụng xem xét từng trường hợp trên cơ sở văn bằng, bảng điểm và định hướng đào tạo, từ đó xác định yêu cầu bổ sung kiến thức phù hợp.",
            ],
            groups: [],
          },
        ],
      },
    ],
  },
  section04: {
    sectionNumber: "04",
    careerHeading: "Cơ hội nghề nghiệp và phát triển",
    headline: "Đưa năng lực nghiên cứu vào thực tiễn.",
    intro:
      "Nền tảng chuyên sâu và kỹ năng nghiên cứu mở ra nhiều hướng phát triển trong công nghệ sinh học, y sinh, dữ liệu sinh học và chuyển giao công nghệ.",
    note: "Hướng phát triển phụ thuộc vào nền tảng, kinh nghiệm và mục tiêu của mỗi người học. Các vị trí chuyên môn có yêu cầu tuyển dụng và điều kiện hành nghề riêng.",
    careerImage: "/images/pages/programmes/cong-nghe-sinh-hoc/laboratory-microscope.webp",
    careers: [
      {
        group: "Nghiên cứu và học thuật",
        title: "Nghiên cứu viên",
        sub: "Tham gia nghiên cứu tại viện, trung tâm R&D và phòng thí nghiệm công nghệ sinh học, y sinh.",
      },
      {
        group: "Nghiên cứu và học thuật",
        title: "Giảng dạy và trợ giảng",
        sub: "Phát triển theo hướng giảng dạy công nghệ sinh học, sinh học phân tử, hóa sinh và y sinh khi đáp ứng yêu cầu sư phạm, chuyên môn của vị trí.",
      },
      {
        group: "Nghiên cứu và học thuật",
        title: "Học tiếp trình độ tiến sĩ",
        sub: "Tiếp tục đào sâu một hướng nghiên cứu tại các chương trình tiến sĩ trong và ngoài nước khi đáp ứng điều kiện tuyển sinh.",
      },
      {
        group: "Phát triển và chuyển giao",
        title: "Nghiên cứu và phát triển sản phẩm",
        sub: "Tham gia phát triển sản phẩm, công nghệ trong lĩnh vực sinh học, chẩn đoán, vắc xin và liệu pháp sinh học.",
      },
      {
        group: "Phát triển và chuyển giao",
        title: "Chuyển giao công nghệ",
        sub: "Đánh giá, hoàn thiện và chuyển giao kết quả nghiên cứu sang ứng dụng thực tiễn trong doanh nghiệp.",
      },
      {
        group: "Phát triển và chuyển giao",
        title: "Tư vấn khoa học và đổi mới sáng tạo",
        sub: "Đóng góp chuyên môn cho các dự án phát triển công nghệ, đánh giá sản phẩm và khởi nghiệp trong công nghệ sinh học.",
      },
      {
        group: "Dữ liệu và phòng thí nghiệm",
        title: "Tin sinh học và phân tích dữ liệu",
        sub: "Phân tích dữ liệu gen, protein và hệ thống sinh học phục vụ nghiên cứu, phát triển công nghệ.",
      },
      {
        group: "Dữ liệu và phòng thí nghiệm",
        title: "Chẩn đoán phân tử và xét nghiệm sinh học",
        sub: "Tham gia các hoạt động chuyên môn tại phòng xét nghiệm, trung tâm y sinh hoặc cơ sở nghiên cứu và ứng dụng công nghệ chẩn đoán.",
      },
      {
        group: "Dữ liệu và phòng thí nghiệm",
        title: "Quản lý phòng thí nghiệm",
        sub: "Điều phối nghiên cứu, tổ chức vận hành phòng thí nghiệm và đảm bảo an toàn sinh học, chất lượng nghiên cứu.",
      },
    ],
  },
  section05: {
    ...programmeSharedContent.curriculum,
    sectionNumber: "05",
    curriculumIntro: [
      "Từ nền tảng sinh học hiện đại đến thực hành nghiên cứu, chương trình giúp người học xây dựng hướng chuyên môn phù hợp. Hai chuyên đề nghiên cứu và luận văn chiếm 27 tín chỉ, tương đương 45% khối lượng toàn khóa.",
    ],
    trackLabels: ["Định hướng nghiên cứu"],
    graduationProjects: ["Luận văn · 15 tín chỉ"],
    studyMode: "Chính quy tập trung",
    generalFacts: [
      {
        label: "Thời gian chuẩn",
        value: "24 tháng",
      },
      {
        label: "Kế hoạch học tập",
        value: "6 học kỳ",
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
        label: "Nghiên cứu khoa học",
        value: "27 tín chỉ",
      },
      {
        label: "Luận văn",
        value: "15 tín chỉ",
      },
    ],
    notes: [
      "6 tín chỉ chung · 15 tín chỉ cơ sở · 12 tín chỉ chuyên ngành tự chọn · 27 tín chỉ nghiên cứu khoa học.",
    ],
    semesters: {
      heading: "Kế hoạch học tập theo từng học kỳ",
      intro:
        "Chương trình được tổ chức trong 2 năm, mỗi năm 3 học kỳ chính. Ba học kỳ đầu tập trung vào các học phần nền tảng và chuyên ngành; học kỳ 4 thực hiện chuyên đề nghiên cứu; học kỳ 5–6 dành cho luận văn. Thời khóa biểu được công bố theo kế hoạch đào tạo.",
      items: [
        {
          title: "Học kỳ 1",
          subtitle: "Nền tảng nghiên cứu · 9 tín chỉ",
          groups: [
            {
              title: "Học kỳ 1 · Học phần",
              description: [],
              courses: [
                {
                  name: "Triết học",
                  englishName: "Philosophy",
                  credits: 3,
                },
                {
                  name: "Phương pháp nghiên cứu khoa học",
                  englishName: "Research Methodology",
                  credits: 3,
                },
                {
                  name: "Hóa sinh trong sức khỏe và bệnh tật",
                  englishName: "Biochemistry in Health and Diseases",
                  credits: 3,
                },
              ],
            },
          ],
        },
        {
          title: "Học kỳ 2",
          subtitle: "Kiến thức cơ sở chuyên sâu · 12 tín chỉ",
          groups: [
            {
              title: "Học kỳ 2 · Học phần",
              description: [],
              courses: [
                {
                  name: "Tin sinh học ứng dụng",
                  englishName: "Applied Bioinformatics",
                  credits: 3,
                },
                {
                  name: "Miễn dịch học ứng dụng",
                  englishName: "Applied Immunology",
                  credits: 3,
                },
                {
                  name: "Truyền tải tín hiệu ở tế bào",
                  englishName: "Cell Signaling",
                  credits: 3,
                },
                {
                  name: "Liệu pháp gene",
                  englishName: "Gene Therapy",
                  credits: 3,
                },
              ],
            },
          ],
        },
        {
          title: "Học kỳ 3",
          subtitle: "Phát triển hướng chuyên ngành · 12 tín chỉ",
          groups: [
            {
              title: "Học kỳ 3 · Học phần",
              description: [
                "Chọn 4 trong 9 học phần chuyên ngành, mỗi học phần 3 tín chỉ. Xem danh mục tại khối kiến thức chuyên ngành tự chọn.",
              ],
              courses: [],
            },
          ],
        },
        {
          title: "Học kỳ 4",
          subtitle: "Hai chuyên đề nghiên cứu · 12 tín chỉ",
          groups: [
            {
              title: "Học kỳ 4 · Học phần",
              description: [],
              courses: [
                {
                  name: "Chuyên đề nghiên cứu 1",
                  englishName: "Research topic 1",
                  credits: 6,
                },
                {
                  name: "Chuyên đề nghiên cứu 2",
                  englishName: "Research topic 2",
                  credits: 6,
                },
              ],
            },
          ],
        },
        {
          title: "Học kỳ 5–6",
          subtitle: "Luận văn tốt nghiệp · 15 tín chỉ",
          groups: [
            {
              title: "Học kỳ 5–6 · Học phần",
              description: [],
              courses: [
                {
                  name: "Luận văn",
                  englishName: "Thesis",
                  credits: 15,
                },
              ],
            },
          ],
        },
      ],
    },
    completion: {
      heading: "Hoàn thành chương trình",
      items: [
        "Hoàn thành các học phần của chương trình và bảo vệ luận văn đạt yêu cầu.",
        "Đạt chuẩn đầu ra ngoại ngữ tương đương Bậc 4 trở lên trước thời điểm xét tốt nghiệp, theo các hình thức minh chứng được công nhận.",
        "Hoàn thành các trách nhiệm và đáp ứng điều kiện công nhận tốt nghiệp theo quy định của Trường.",
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
      body: "Chia sẻ điều bạn quan tâm về chương trình Thạc sĩ Công nghệ sinh học. Đội ngũ tư vấn sẽ hỗ trợ bạn tìm hiểu chương trình và chuẩn bị hồ sơ phù hợp.",
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
        question: "Chương trình đào tạo theo định hướng nào?",
        answer:
          "Chương trình Thạc sĩ Công nghệ sinh học được thiết kế theo định hướng nghiên cứu, gồm 60 tín chỉ, thời gian chuẩn 24 tháng với 6 học kỳ. Khối nghiên cứu gồm hai chuyên đề, mỗi chuyên đề 6 tín chỉ, và luận văn 15 tín chỉ.",
      },
      {
        question: "Tôi cần đáp ứng điều kiện gì để dự tuyển?",
        answer:
          "Ứng viên đã tốt nghiệp hoặc đủ điều kiện được công nhận tốt nghiệp từ trình độ đại học trở lên, có ngành học phù hợp và đáp ứng yêu cầu ngoại ngữ đầu vào. Trường hợp được yêu cầu bổ sung kiến thức phải hoàn thành các học phần trước khi xét tuyển. Hồ sơ được xem xét theo quy chế và thông báo tuyển sinh của Trường.",
      },
      {
        question: "Tốt nghiệp ngành khác có thể dự tuyển không?",
        answer:
          "Người tốt nghiệp Công nghệ sinh học, Kỹ thuật sinh học, Sinh học ứng dụng, Sinh học và Sư phạm sinh học không cần học bổ sung kiến thức. Các ngành liên quan trong danh mục được đối chiếu bảng điểm để xác định học phần bổ sung, tối đa 6 tín chỉ. Những ngành chưa có trong danh mục được Hội đồng xem xét theo từng hồ sơ.",
      },
      {
        question: "Người học có phải học toàn bộ 9 học phần tự chọn?",
        answer:
          "Người học tích lũy tối thiểu 12 tín chỉ chuyên ngành tự chọn, tương đương 4 trong 9 học phần, mỗi học phần 3 tín chỉ. Các học phần được đăng ký theo hướng nghiên cứu và kế hoạch mở lớp của chương trình.",
      },
      {
        question: "Ngôn ngữ giảng dạy và yêu cầu ngoại ngữ là gì?",
        answer:
          "Chương trình giảng dạy bằng tiếng Việt. Ngoại ngữ đầu vào yêu cầu mức tương đương Bậc 3 trở lên; chuẩn đầu ra trước khi xét tốt nghiệp là mức tương đương Bậc 4 trở lên theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam. Hình thức minh chứng được đối chiếu theo quy định và thông báo của Trường.",
      },
      {
        question: "Lịch học có phù hợp với người đang đi làm?",
        answer:
          "Lịch học dự kiến bố trí vào buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật, theo kế hoạch từng học kỳ. Thời khóa biểu chính thức do Trường công bố. Bạn có thể trao đổi với Viện để sắp xếp công việc và kế hoạch học tập, nghiên cứu.",
      },
      {
        question: "Học phí và chính sách hỗ trợ được áp dụng như thế nào?",
        answer:
          "Học phí toàn khóa là 85.000.000 đồng, chia thành ba đợt: 29.750.000 đồng, 25.500.000 đồng và 29.750.000 đồng. Các khoản thu riêng áp dụng theo từng trường hợp. Học bổng và hỗ trợ tài chính được xét theo điều kiện, hồ sơ và thông báo của Trường; chỉ áp dụng một chính sách có mức cao nhất trong các nhóm được quy định, không cộng dồn.",
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

export const congNgheSinhHocProgramme: Programme = {
  id: "cong-nghe-sinh-hoc",
  code: "420201",
  title: "Công nghệ Sinh học",
  englishTitle: "Master of Engineering in Biotechnology",
  degree: "Thạc sĩ",
  field: "Kỹ thuật, Môi trường & Công nghệ",
  orientation: "Nghiên cứu",
  credits: 60,
  duration: "24 tháng",
  studyMode: "Chính quy tập trung, tiếng Việt",
  intake: "Tuyển sinh thạc sĩ 2027",
  summary:
    "Phát triển kiến thức chuyên sâu và năng lực nghiên cứu để khám phá các cơ chế của sự sống, ứng dụng công nghệ sinh học trong y sinh, sức khỏe và phát triển bền vững.",
  schedule:
    "Buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu theo từng học kỳ.",
  tuition: "85.000.000 VNĐ",
};

export function getCongNgheSinhHocCurricula(): CurriculumTrack[] {
  return [
    {
      number: "05",
      title: "Định hướng nghiên cứu",
      subtitle: "60 tín chỉ · 24 tháng · 6 học kỳ",
      orientation: "Nghiên cứu",
      graduationProject: "Luận văn · 15 tín chỉ",
      groups: [
        {
          title: "I. Kiến thức chung",
          totalCreditsLabel: "6 tín chỉ",
          description: [],
          courses: [
            {
              name: "Triết học",
              englishName: "Philosophy",
              credits: 3,
            },
            {
              name: "Phương pháp nghiên cứu khoa học",
              englishName: "Research Methodology",
              credits: 3,
            },
          ],
        },
        {
          title: "II. Kiến thức cơ sở",
          totalCreditsLabel: "15 tín chỉ",
          description: [],
          courses: [
            {
              name: "Hóa sinh trong sức khỏe và bệnh tật",
              englishName: "Biochemistry in Health and Diseases",
              credits: 3,
            },
            {
              name: "Tin sinh học ứng dụng",
              englishName: "Applied Bioinformatics",
              credits: 3,
            },
            {
              name: "Miễn dịch học ứng dụng",
              englishName: "Applied Immunology",
              credits: 3,
            },
            {
              name: "Truyền tải tín hiệu ở tế bào",
              englishName: "Cell Signaling",
              credits: 3,
            },
            {
              name: "Liệu pháp gene",
              englishName: "Gene Therapy",
              credits: 3,
            },
          ],
        },
        {
          title: "III. Kiến thức chuyên ngành tự chọn",
          totalCreditsLabel: "12 tín chỉ",
          description: [
            "Tích lũy tối thiểu 12 tín chỉ tự chọn, tương đương 4 trong 9 học phần dưới đây. Mỗi học phần 3 tín chỉ; việc đăng ký thực hiện theo hướng nghiên cứu và kế hoạch mở lớp.",
          ],
          courses: [
            {
              name: "Liệu pháp tế bào",
              englishName: "Cell Therapy",
              credits: 3,
              elective: true,
            },
            {
              name: "Vắc xin",
              englishName: "Vaccine",
              credits: 3,
              elective: true,
            },
            {
              name: "Chẩn đoán phân tử",
              englishName: "Molecular Diagnostics",
              credits: 3,
              elective: true,
            },
            {
              name: "Sinh học ung thư",
              englishName: "Cancer Cell Biology",
              credits: 3,
              elective: true,
            },
            {
              name: "Cơ sở phân tử trong tương tác vật chủ - tác nhân gây bệnh",
              englishName: "Molecular Basis of Host – Pathogen Interaction",
              credits: 3,
              elective: true,
            },
            {
              name: "Vi sinh vật học ứng dụng trong sản xuất",
              englishName: "Microbiology Applied in Manufacture",
              credits: 3,
              elective: true,
            },
            {
              name: "Công nghệ sinh học nano",
              englishName: "Nano Biotechnology",
              credits: 3,
              elective: true,
            },
            {
              name: "Công nghệ sinh học và phát triển bền vững",
              englishName: "Biotechnology and Sustainable Development",
              credits: 3,
              elective: true,
            },
            {
              name: "Đổi mới sáng tạo trong công nghệ sinh học",
              englishName: "Innovation in Biotechnology",
              credits: 3,
              elective: true,
            },
          ],
        },
        {
          title: "IV. Nghiên cứu khoa học",
          totalCreditsLabel: "27 tín chỉ",
          description: ["Hai chuyên đề nghiên cứu · 12 tín chỉ", "Luận văn · 15 tín chỉ"],
          courses: [],
          subgroups: [
            {
              title: "Hai chuyên đề nghiên cứu · 12 tín chỉ",
              totalCreditsLabel: "12 tín chỉ",
              courses: [
                {
                  name: "Chuyên đề nghiên cứu 1",
                  englishName: "Research topic 1",
                  credits: 6,
                },
                {
                  name: "Chuyên đề nghiên cứu 2",
                  englishName: "Research topic 2",
                  credits: 6,
                },
              ],
            },
            {
              title: "Luận văn · 15 tín chỉ",
              totalCreditsLabel: "15 tín chỉ",
              courses: [
                {
                  name: "Luận văn",
                  englishName: "Thesis",
                  credits: 15,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
