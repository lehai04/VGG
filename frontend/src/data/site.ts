/**
 * data/site.ts — nguồn dữ liệu tĩnh dùng chung toàn website.
 *
 * Sửa file này khi muốn đổi: tên menu, slug URL, headline landing page,
 * danh sách chương trình (dropdown form tư vấn), hoặc ảnh hero của page con.
 * Không nhét nội dung dài của Discover vào đây — nội dung đó nằm ở
 * app/discover/[slug]/page.tsx (object `pages`).
 */
export type MenuGroup = {
  slug: string; // khớp với thư mục route: app/<slug>/page.tsx
  en: string;
  vi: string;
  kicker: string; // dòng phụ trên hero
  headline: string;
  intro: string;
  items: readonly string[]; // mục mega menu + danh sách landing
  itemsEn: readonly string[]; // nhãn English dùng cho Header/search; cùng index với items
  image: string;
};

// NGUỒN DỮ LIỆU CHUNG cho menu Discover, landing page và các liên kết trang con.
export const discoverSections = [
  {
    slug: "gioi-thieu",
    title: "Giới thiệu",
    summary: "Khám phá câu chuyện và môi trường học thuật của Viện Sau Đại học.",
  },
  {
    slug: "tam-nhin-su-menh",
    title: "Tầm nhìn & Sứ mệnh",
    summary: "Tìm hiểu định hướng phát triển và những giá trị Viện Sau Đại học theo đuổi.",
  },
  {
    slug: "lanh-dao",
    title: "Lãnh đạo",
    summary: "Gặp gỡ đội ngũ định hướng hành trình học thuật tại Viện Sau Đại học.",
  },
  {
    slug: "vi-sao-chon-vgg",
    title: "Vì sao chọn Viện Sau Đại học",
    summary: "Những khác biệt làm nên trải nghiệm sau đại học tại Văn Lang.",
  },
  {
    slug: "xep-hang-thanh-tuu",
    title: "Xếp hạng & Thành tựu",
    summary: "Các dấu ấn từ cộng đồng học thuật và người học Viện Sau Đại học.",
  },
  {
    slug: "lien-he",
    title: "Liên hệ",
    summary: "Kết nối với đội ngũ Viện Sau Đại học để được tư vấn và hỗ trợ.",
  },
] as const;

// NGUỒN DỮ LIỆU CHUNG cho navigation và các landing page dùng SectionLanding.
export const menuGroups: readonly MenuGroup[] = [
  {
    slug: "discover",
    en: "About Viện Sau Đại học",
    vi: "Về Viện Sau Đại học",
    kicker: "Van Lang Global Graduate",
    headline: "Khám phá một Viện Sau Đại học lấy người học làm trung tâm.",
    intro:
      "Viện Sau Đại học kiến tạo môi trường học thuật khai phóng, nơi người học phát triển chuyên môn, tư duy nghiên cứu và năng lực tạo tác động.",
    items: discoverSections.map((item) => item.title),
    itemsEn: [
      "Introduction",
      "Vision & Mission",
      "Leadership",
      "Why Viện Sau Đại học",
      "Rankings & Achievements",
      "Contact",
    ],
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "programmes",
    en: "Programmes",
    vi: "Chương trình đào tạo",
    kicker: "Choose the path that moves you forward",
    headline: "Chương trình cho từng bước tiến sự nghiệp.",
    intro:
      "Các lộ trình kết nối tri thức chuyên sâu với nhu cầu thực tiễn và mục tiêu nghề nghiệp.",
    items: [
      "Chương trình Thạc sĩ Flagship",
      "Thạc sĩ",
      "Tiến sĩ",
      "Executive Education",
      "Chương trình Quốc tế",
    ],
    itemsEn: [
      "Flagship Master's Programmes",
      "Master's Programmes",
      "Doctoral Programmes",
      "Executive Education",
      "International Programmes",
    ],
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "admissions",
    en: "Admissions",
    vi: "Tuyển sinh",
    kicker: "Your Viện Sau Đại học journey starts here",
    headline: "Thông tin rõ ràng. Hành trình tinh gọn.",
    intro: "Tìm hiểu điều kiện, học phí, học bổng, quy trình hồ sơ và các mốc quan trọng.",
    items: [
      "Yêu cầu tuyển sinh",
      "Học phí",
      "Học bổng & Hỗ trợ tài chính",
      "Quy trình nộp hồ sơ",
      "Các mốc thời gian",
    ],
    itemsEn: [
      "Admission Requirements",
      "Tuition Fees",
      "Scholarships & Financial Aid",
      "Application Process",
      "Key Dates",
    ],
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "research",
    en: "Research & Global Opportunities",
    vi: "Nghiên cứu khoa học & Cơ hội quốc tế",
    kicker: "Knowledge for real-world impact",
    headline: "Nghiên cứu chuyên sâu. Kết nối tri thức toàn cầu.",
    intro:
      "Viện Sau Đại học kết nối nhà khoa học, doanh nghiệp, cộng đồng và mạng lưới đối tác quốc tế để kiến tạo tri thức, giải pháp thực tiễn và những cơ hội học tập vượt ra ngoài biên giới.",
    items: [
      "Các cụm nghiên cứu",
      "Dự án nghiên cứu",
      "Công bố khoa học",
      "Hội thảo & Sự kiện khoa học",
      "Đổi mới sáng tạo",
      "Hợp tác doanh nghiệp",
      "Trao đổi sinh viên",
      "Dual Degree",
      "Thực tập Quốc tế",
      "Study Tour",
      "Overseas Immersion",
      "Đối tác toàn cầu",
    ],
    itemsEn: [
      "Research Clusters",
      "Research Projects",
      "Publications",
      "Conferences & Academic Events",
      "Innovation",
      "Industry Collaboration",
      "Student Exchange",
      "Dual Degree",
      "International Internships",
      "Study Tour",
      "Overseas Immersion",
      "Global Partners",
    ],
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "global",
    en: "Global Opportunities",
    vi: "Cơ hội quốc tế",
    kicker: "Learn beyond borders",
    headline: "Thế giới là một phần của hành trình học tập.",
    intro:
      "Trao đổi, bằng đôi, thực tập và mạng lưới đối tác giúp người học mở rộng góc nhìn toàn cầu.",
    items: [
      "Trao đổi sinh viên",
      "Dual Degree",
      "Thực tập Quốc tế",
      "Study Tour",
      "Overseas Immersion",
      "Đối tác toàn cầu",
    ],
    itemsEn: [
      "Student Exchange",
      "Dual Degree",
      "International Internships",
      "Study Tour",
      "Overseas Immersion",
      "Global Partners",
    ],
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "student-success",
    en: "Student Success",
    vi: "Hành trình học viên",
    kicker: "Supported at every step",
    headline: "Thành công của học viên là trung tâm.",
    intro:
      "Hệ sinh thái hỗ trợ học tập, nghề nghiệp và kết nối doanh nghiệp đồng hành xuyên suốt hành trình.",
    items: [
      "Dịch vụ hỗ trợ học viên",
      "Phát triển sự nghiệp",
      "Tài nguyên học tập",
      "Cựu học viên",
      "Câu chuyện thành công",
    ],
    itemsEn: [
      "Student Support",
      "Career Development",
      "Learning Resources",
      "Alumni",
      "Success Stories",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "news",
    en: "News & Events",
    vi: "Tin tức & Sự kiện",
    kicker: "The pulse of our academic community",
    headline: "Theo dòng chuyển động học thuật.",
    intro: "Cập nhật tin tức, sự kiện, seminar và những khoảnh khắc nổi bật trong cộng đồng Viện Sau Đại học.",
    items: [
      "Tin tức",
      "Sự kiện",
      "Seminar / Webinar",
      "Thông cáo báo chí",
      "Thư viện hình ảnh",
      "Video",
    ],
    itemsEn: ["News", "Events", "Seminars / Webinars", "Press Releases", "Photo Gallery", "Video"],
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "resources",
    en: "Resources",
    vi: "Tài nguyên",
    kicker: "Everything you need in one place",
    headline: "Tài nguyên học thuật dễ tìm, dễ sử dụng.",
    intro: "Truy cập biểu mẫu, chính sách, tài liệu, lịch học thuật và câu hỏi thường gặp.",
    items: ["Biểu mẫu", "Chính sách & Quy định", "Tài liệu tải về", "Lịch học thuật", "FAQ"],
    itemsEn: ["Forms", "Policies & Regulations", "Downloads", "Academic Calendar", "FAQ"],
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1800&q=86",
  },
];

/** Danh sách ngành cho form tư vấn. Phải khớp option trong ResourcesConsultation. */
export const programmes = [
  "Quản trị Kinh doanh",
  "Kinh doanh Thương mại",
  "Tài chính - Ngân hàng",
  "Kế toán",
  "Luật Kinh tế",
  "Quan hệ Công chúng",
  "Ngôn ngữ Anh",
  "Công nghệ Sinh học",
  "Kỹ thuật Môi trường",
  "Quản lý Tài nguyên và Môi trường",
  "Kỹ thuật Xây dựng",
  "Kỹ thuật ô tô",
  "Logistics và Quản lý chuỗi cung ứng",
  "Kiến trúc",
  "Mỹ thuật Ứng dụng",
  "Lý luận và Lịch sử Mỹ thuật Ứng dụng",
  "Quản trị Dịch vụ Du lịch và Lữ hành",
  "Quản trị Khách sạn",
] as const;

/** Lấy 1 nhóm menu theo slug. SectionLanding gọi hàm này; nếu không có thì 404. */
export function findGroup(slug: string): MenuGroup | undefined {
  return menuGroups.find((group) => group.slug === slug);
}

/** Navigation chính: Cơ hội quốc tế đã được gộp vào nhóm Nghiên cứu. */
export const navigationGroups = menuGroups.filter((group) => group.slug !== "global");

export type SectionSubpage = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  summary: string;
};

export const subpageSlugs: Record<string, string[]> = {
  programmes: ["flagship", "thac-si", "tien-si", "executive-education", "quoc-te"],
  admissions: ["yeu-cau", "hoc-phi", "hoc-bong", "nop-ho-so", "moc-thoi-gian"],
  research: [
    "cum-nghien-cuu",
    "du-an",
    "cong-bo",
    "hoi-thao",
    "doi-moi-sang-tao",
    "hop-tac-doanh-nghiep",
    "trao-doi",
    "dual-degree",
    "thuc-tap",
    "study-tour",
    "overseas-immersion",
    "doi-tac",
  ],
  global: ["trao-doi", "dual-degree", "thuc-tap", "study-tour", "overseas-immersion", "doi-tac"],
  "student-success": [
    "ho-tro-hoc-vien",
    "phat-trien-su-nghiep",
    "tai-nguyen-hoc-tap",
    "cuu-hoc-vien",
    "cau-chuyen-thanh-cong",
  ],
  news: [
    "tin-tuc",
    "su-kien",
    "seminar-webinar",
    "thong-cao-bao-chi",
    "thu-vien-hinh-anh",
    "video",
  ],
  resources: ["bieu-mau", "chinh-sach-quy-dinh", "tai-lieu", "lich-hoc-thuat", "faq"],
};

export const sectionSubpages: Record<string, SectionSubpage[]> = Object.fromEntries(
  menuGroups
    .filter((group) => subpageSlugs[group.slug])
    .map((group) => [
      group.slug,
      group.items.map((title, index) => ({
        slug: subpageSlugs[group.slug][index],
        title,
        eyebrow: `${group.en} / ${String(index + 1).padStart(2, "0")}`,
        headline: `${title}: kiến tạo một hành trình có chiều sâu.`,
        summary: `Khám phá thông tin, cơ hội và nguồn lực dành cho ${title.toLowerCase()} tại Viện Sau Đại học — được thiết kế rõ ràng, thực tiễn và lấy người học làm trung tâm.`,
      })),
    ]),
);

export type UnifiedDetailBlock = {
  title: string;
  text?: string;
  points?: readonly string[];
};

/** Nội dung đầy đủ hiển thị trong các accordion của trang tổng hợp. */
export const unifiedSectionDetails: Record<string, readonly UnifiedDetailBlock[]> = {
  "admissions/yeu-cau": [
    {
      title: "Trình độ đào tạo",
      text: "Đã tốt nghiệp đại học hoặc đủ điều kiện được công nhận tốt nghiệp đại học (hoặc có trình độ tương đương trở lên) theo quy định của Bộ Giáo dục và Đào tạo.",
    },
    {
      title: "Ngành đào tạo",
      text: "Có bằng tốt nghiệp đại học thuộc ngành phù hợp với ngành đăng ký dự tuyển. Trường hợp tốt nghiệp ngành khác có thể phải học bổ sung kiến thức theo quy định của Trường Đại học Văn Lang trước khi tham gia chương trình đào tạo. Văn bằng do cơ sở giáo dục nước ngoài cấp phải được công nhận theo quy định hiện hành.",
    },
    {
      title: "Điều kiện ngoại ngữ",
      text: "Đáp ứng yêu cầu về năng lực ngoại ngữ theo Quy chế tuyển sinh trình độ thạc sĩ của Bộ Giáo dục và Đào tạo, bao gồm một trong các điều kiện sau:",
      points: [
        "Có chứng chỉ ngoại ngữ đạt trình độ tương đương Bậc 3 trở lên theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam còn hiệu lực.",
        "Có bằng tốt nghiệp đại học ngành ngôn ngữ nước ngoài.",
        "Tốt nghiệp chương trình đại học toàn thời gian bằng tiếng nước ngoài và văn bằng được công nhận theo quy định.",
        "Đạt yêu cầu đánh giá năng lực tiếng Anh đầu vào do Trường Đại học Văn Lang tổ chức (đối với các trường hợp áp dụng).",
      ],
    },
    {
      title: "Điều kiện khác",
      text: "Ứng viên không trong thời gian thi hành kỷ luật từ mức cảnh cáo trở lên hoặc không trong thời gian thi hành án hình sự; đồng thời đáp ứng các quy định tuyển sinh hiện hành của Trường Đại học Văn Lang và Bộ Giáo dục và Đào tạo.",
    },
  ],
  "admissions/hoc-bong": [
    {
      title: "Học bổng Tài năng 100%",
      text: "Hỗ trợ lên đến 100% học phí dựa trên thành tích nổi bật ở bậc Đại học và thành tích công bố khoa học ở bậc Thạc sĩ.",
    },
    {
      title: "Học bổng 30%",
      text: "Hỗ trợ 30% học phí toàn khóa dành cho thương binh, bệnh binh và người khuyết tật.",
    },
    {
      title: "Học bổng 10%",
      text: "Hỗ trợ 10% học phí toàn khóa dành cho cựu sinh viên Văn Lang; vợ, chồng hoặc anh, chị, em ruột cùng theo học; người dân tộc thiểu số; và con thương binh, bệnh binh.",
    },
    {
      title: "Ưu đãi học phí 5%",
      text: "Giảm thêm 5% trên mức học phí thực đóng khi thanh toán toàn bộ học phí trong một lần. Chính sách áp dụng đối với học viên có mức học bổng dưới 30%.",
    },
    {
      title: "Học bổng Khuyến khích 5–10%",
      points: [
        "Hỗ trợ 10% học phí toàn khóa dành cho học viên theo học các ngành thuộc nhóm STEM.",
        "Hỗ trợ 5% học phí toàn khóa dành cho học viên là nữ, người dân tộc thiểu số, người khuyết tật, thương binh hoặc bệnh binh.",
      ],
    },
  ],
  "admissions/nop-ho-so": [
    {
      title: "Khám phá chương trình",
      text: "Tìm hiểu chương trình đào tạo, yêu cầu tuyển sinh và lựa chọn chương trình phù hợp. Đối với chương trình Tiến sĩ, ứng viên được khuyến khích xác định định hướng nghiên cứu và lĩnh vực chuyên môn phù hợp trước khi nộp hồ sơ.",
    },
    {
      title: "Nộp hồ sơ",
      text: "Hoàn thành hồ sơ đăng ký theo yêu cầu của chương trình. Đối với chương trình Tiến sĩ, hồ sơ cần có đề cương nghiên cứu và minh chứng về năng lực nghiên cứu theo quy định.",
    },
    {
      title: "Kiểm tra điều kiện đầu vào",
      text: "Viện Sau đại học đánh giá điều kiện đầu vào, năng lực học thuật, trình độ ngoại ngữ và mức độ phù hợp của ứng viên với chương trình đào tạo. Trong một số trường hợp, ứng viên có thể được yêu cầu hoàn thành các học phần bổ sung kiến thức hoặc đáp ứng thêm điều kiện ngoại ngữ trước khi được công nhận đủ điều kiện xét tuyển.",
    },
    {
      title: "Đánh giá tuyển sinh",
      text: "Tùy theo chương trình, ứng viên có thể tham gia phỏng vấn, đánh giá năng lực hoặc các hình thức đánh giá khác. Đối với chương trình Tiến sĩ, ứng viên cần trình bày đề cương nghiên cứu; quá trình này tập trung vào tiềm năng nghiên cứu và sự phù hợp với định hướng học thuật của chương trình.",
    },
    {
      title: "Thông báo kết quả tuyển sinh",
      text: "Kết quả tuyển sinh sẽ được thông báo chính thức đến ứng viên. Đối với các hồ sơ trúng tuyển, Viện Sau đại học sẽ gửi hướng dẫn nhập học và các bước tiếp theo.",
    },
    {
      title: "Nhập học",
      text: "Sau khi hoàn tất thủ tục nhập học, học viên chính thức trở thành học viên cao học hoặc nghiên cứu sinh của Trường Đại học Văn Lang và bắt đầu hành trình học tập, nghiên cứu và phát triển nghề nghiệp trong môi trường học thuật quốc tế.",
    },
  ],
  "admissions/moc-thoi-gian": [
    {
      title: "Các đợt dự tuyển và đăng ký học bổng",
      text: "Trường Đại học Văn Lang tổ chức 3 đợt tuyển sinh sau đại học mỗi năm.",
    },
    {
      title: "Đợt 3 / 2026",
      points: [
        "29/08/2026 — Hạn dành cho học viên đăng ký học bổng.",
        "05/09/2026 — Hạn dành cho học viên không đăng ký học bổng.",
      ],
    },
  ],
};

export function subpageHref(section: string, index: number) {
  const page = sectionSubpages[section]?.[index];
  return page ? `/${section}#${page.slug}` : `/${section}`;
}
