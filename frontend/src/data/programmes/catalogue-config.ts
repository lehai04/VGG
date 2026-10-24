import { programmes } from "../programmes";

export type PageConfig = {
  variant: "doctoral" | "international";
  eyebrow: string;
  title: string;
  stats: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overview: readonly [string, string];
  quote: string;
  quoteBy: string;
  quoteRole: string;
  whyTitle: string;
  whyLead: string;
  benefits: readonly { title: string; text: string }[];
  directoryEyebrow: string;
  directoryTitle: string;
  groups: readonly { title: string; items: readonly { label: string; href: string }[] }[];
};

const doctoral = programmes.filter((programme) => programme.degree === "Tiến sĩ");

export const doctoralConfig: PageConfig = {
  variant: "doctoral",
  eyebrow: "Viện Sau Đại học · DOCTORAL PROGRAMMES",
  title: "Chương trình Tiến sĩ",
  stats: "01 chương trình · Định hướng nghiên cứu · 36–48 tháng",
  overviewEyebrow: "CHƯƠNG TRÌNH TIẾN SĨ · TIẾNG VIỆT",
  overviewTitle: "Kiến tạo tri thức mới.",
  overview: [
    "Chương trình Tiến sĩ tại Văn Lang được xây dựng cho các nhà nghiên cứu muốn phát triển chuyên môn ở chiều sâu, làm chủ phương pháp khoa học và tạo ra những đóng góp có giá trị cho cộng đồng.",
    "Viện Sau Đại học hiện triển khai chương trình Tiến sĩ Khoa học Môi trường với lộ trình nghiên cứu chuyên sâu, kết nối đội ngũ giảng viên giàu kinh nghiệm và hệ sinh thái học thuật đa ngành.",
  ],
  quote:
    "Văn Lang mang đến cho nghiên cứu sinh một môi trường học thuật định hướng nghiên cứu, nơi nền tảng chuyên môn, năng lực công bố và khả năng tạo ra giải pháp bền vững được phát triển song hành.",
  quoteBy: "Ban lãnh đạo Viện Sau Đại học",
  quoteRole: "Viện Sau đại học · Trường Đại học Văn Lang",
  whyTitle: "Tại sao nên chọn chương trình Tiến sĩ tại Viện Sau Đại học?",
  whyLead:
    "Một môi trường nghiên cứu được thiết kế để nghiên cứu sinh phát triển năng lực học thuật và theo đuổi những vấn đề có ý nghĩa lâu dài.",
  benefits: [
    {
      title: "Chính sách hỗ trợ tài chính ưu việt",
      text: "Các chính sách học phí và hỗ trợ nghiên cứu giúp nghiên cứu sinh chủ động hơn trong quá trình thực hiện luận án và công bố khoa học.",
    },
    {
      title: "Điều kiện học tập thuận lợi",
      text: "Môi trường học thuật và cơ sở nghiên cứu hỗ trợ nghiên cứu sinh hoàn thành chuẩn đầu ra của chương trình.",
    },
    {
      title: "Đội ngũ giảng viên",
      text: "Nghiên cứu sinh được đồng hành bởi đội ngũ giảng viên có chuyên môn sâu và kinh nghiệm nghiên cứu trong lĩnh vực môi trường.",
    },
    {
      title: "Hợp tác nghiên cứu trong và ngoài nước",
      text: "Các hoạt động học thuật mở rộng cơ hội kết nối, trao đổi và phát triển những hướng nghiên cứu có giá trị ứng dụng.",
    },
  ],
  directoryEyebrow: "NGÀNH ĐÀO TẠO",
  directoryTitle: "Khám phá chương trình Tiến sĩ",
  groups: [
    {
      title: "Kỹ thuật, Môi trường & Công nghệ",
      items: doctoral.map((programme) => ({
        label: programme.title,
        href: `/programmes/${programme.id}`,
      })),
    },
  ],
};

export const internationalConfig: PageConfig = {
  variant: "international",
  eyebrow: "Viện Sau Đại học · INTERNATIONAL PROGRAMMES",
  title: "Chương trình Quốc tế",
  stats: "Kết nối toàn cầu · Trải nghiệm đa văn hóa · Chuẩn học thuật quốc tế",
  overviewEyebrow: "CHƯƠNG TRÌNH QUỐC TẾ",
  overviewTitle: "Mở rộng biên giới học thuật.",
  overview: [
    "Chương trình Quốc tế tại Viện Sau Đại học mở rộng trải nghiệm sau đại học thông qua môi trường học thuật đa văn hóa, hoạt động trao đổi tri thức và kết nối với mạng lưới chuyên gia quốc tế.",
    "Các cơ hội được định hướng nhằm giúp người học nâng cao năng lực chuyên môn, khả năng làm việc trong bối cảnh toàn cầu và tư duy thích ứng trước những thay đổi của nghề nghiệp.",
  ],
  quote:
    "Trải nghiệm quốc tế không chỉ là dịch chuyển giữa các quốc gia, mà là khả năng đối thoại với nhiều hệ tri thức, cộng tác vượt qua khác biệt và tạo ra giá trị trong một thế giới kết nối.",
  quoteBy: "Ban lãnh đạo Viện Sau Đại học",
  quoteRole: "Viện Sau đại học · Trường Đại học Văn Lang",
  whyTitle: "Tại sao nên chọn chương trình Quốc tế tại Viện Sau Đại học?",
  whyLead:
    "Một hành trình học thuật giúp người học mở rộng góc nhìn, mạng lưới chuyên môn và năng lực làm việc trong môi trường toàn cầu.",
  benefits: [
    {
      title: "Môi trường học thuật quốc tế",
      text: "Tiếp cận các góc nhìn đa chiều và chuẩn mực học thuật phù hợp với bối cảnh nghề nghiệp toàn cầu.",
    },
    {
      title: "Lộ trình học tập linh hoạt",
      text: "Các hoạt động được tổ chức để người học có thể kết hợp phát triển chuyên môn với công việc hiện tại.",
    },
    {
      title: "Kết nối chuyên gia",
      text: "Mở rộng cơ hội trao đổi với giảng viên, chuyên gia và cộng đồng học thuật trong và ngoài nước.",
    },
    {
      title: "Năng lực hội nhập",
      text: "Phát triển tư duy liên văn hóa, khả năng cộng tác và giải quyết vấn đề trong môi trường đa quốc gia.",
    },
  ],
  directoryEyebrow: "CƠ HỘI HỌC TẬP",
  directoryTitle: "Khám phá hành trình quốc tế",
  groups: [
    {
      title: "Đào tạo & học thuật",
      items: [
        { label: "Chương trình liên kết quốc tế", href: "/programmes/quoc-te" },
        { label: "Học phần và chuyên đề quốc tế", href: "/programmes/quoc-te" },
      ],
    },
    {
      title: "Trao đổi & kết nối",
      items: [
        { label: "Trao đổi học thuật", href: "/global/trao-doi-hoc-thuat" },
        { label: "Mạng lưới đối tác", href: "/global/doi-tac-quoc-te" },
      ],
    },
  ],
};

// NỘI DUNG THẠC SĨ - LỢI ÍCH
export const benefits = [
  {
    title: "Phương thức xét tuyển linh hoạt",
    text: "Tuyển sinh theo hình thức xét tuyển với yêu cầu rõ ràng về trình độ chuyên môn và năng lực ngoại ngữ.",
  },
  {
    title: "Lộ trình tinh gọn",
    text: "Thời gian đào tạo từ 18 đến 24 tháng, giúp người học nâng cao chuyên môn mà vẫn duy trì nhịp độ sự nghiệp.",
  },
  {
    title: "Thời gian biểu linh hoạt",
    text: "Kế hoạch học tập phù hợp với người đang đi làm, tạo điều kiện cân bằng giữa học tập, công việc và cuộc sống.",
  },
  {
    title: "Học bổng và hỗ trợ",
    text: "Nhiều chính sách học bổng và hỗ trợ tài chính giúp người học chủ động hơn trên hành trình học tập chuyên sâu.",
  },
] as const;
