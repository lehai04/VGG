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
    summary: "Khám phá câu chuyện và môi trường học thuật của VGG.",
  },
  {
    slug: "tam-nhin-su-menh",
    title: "Tầm nhìn & Sứ mệnh",
    summary: "Tìm hiểu định hướng phát triển và những giá trị VGG theo đuổi.",
  },
  {
    slug: "lanh-dao",
    title: "Lãnh đạo",
    summary: "Gặp gỡ đội ngũ định hướng hành trình học thuật tại VGG.",
  },
  {
    slug: "vi-sao-chon-vgg",
    title: "Vì sao chọn VGG",
    summary: "Những khác biệt làm nên trải nghiệm sau đại học tại Văn Lang.",
  },
  {
    slug: "xep-hang-thanh-tuu",
    title: "Xếp hạng & Thành tựu",
    summary: "Các dấu ấn từ cộng đồng học thuật và người học VGG.",
  },
  {
    slug: "lien-he",
    title: "Liên hệ",
    summary: "Kết nối với đội ngũ VGG để được tư vấn và hỗ trợ.",
  },
] as const;

// NGUỒN DỮ LIỆU CHUNG cho navigation và các landing page dùng SectionLanding.
export const menuGroups: readonly MenuGroup[] = [
  {
    slug: "discover",
    en: "About VGG",
    vi: "Về VGG",
    kicker: "Van Lang Global Graduate",
    headline: "Khám phá một VGG lấy người học làm trung tâm.",
    intro:
      "VGG kiến tạo môi trường học thuật khai phóng, nơi người học phát triển chuyên môn, tư duy nghiên cứu và năng lực tạo tác động.",
    items: discoverSections.map((item) => item.title),
    itemsEn: ["Introduction", "Vision & Mission", "Leadership", "Why VGG", "Rankings & Achievements", "Contact"],
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
    itemsEn: ["Flagship Master's Programmes", "Master's Programmes", "Doctoral Programmes", "Executive Education", "International Programmes"],
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "admissions",
    en: "Admissions",
    vi: "Tuyển sinh",
    kicker: "Your VGG journey starts here",
    headline: "Thông tin rõ ràng. Hành trình tinh gọn.",
    intro: "Tìm hiểu điều kiện, học phí, học bổng, quy trình hồ sơ và các mốc quan trọng.",
    items: [
      "Yêu cầu tuyển sinh",
      "Học phí",
      "Học bổng & Hỗ trợ tài chính",
      "Quy trình nộp hồ sơ",
      "Các mốc thời gian",
      "FAQ",
      "Đặt lịch tư vấn",
    ],
    itemsEn: ["Admission Requirements", "Tuition Fees", "Scholarships & Financial Aid", "Application Process", "Key Dates", "FAQ", "Book a Consultation"],
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "research",
    en: "Research & Innovation",
    vi: "Nghiên cứu & Đổi mới",
    kicker: "Knowledge for real-world impact",
    headline: "Nghiên cứu để giải quyết vấn đề thực tiễn.",
    intro:
      "VGG kết nối nhà khoa học, doanh nghiệp và cộng đồng để kiến tạo các giải pháp có giá trị.",
    items: [
      "Các cụm nghiên cứu",
      "Dự án nghiên cứu",
      "Công bố khoa học",
      "Hội thảo & Sự kiện khoa học",
      "Đổi mới sáng tạo",
      "Hợp tác doanh nghiệp",
    ],
    itemsEn: ["Research Clusters", "Research Projects", "Publications", "Conferences & Academic Events", "Innovation", "Industry Collaboration"],
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
    itemsEn: ["Student Exchange", "Dual Degree", "International Internships", "Study Tour", "Overseas Immersion", "Global Partners"],
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
    itemsEn: ["Student Support", "Career Development", "Learning Resources", "Alumni", "Success Stories"],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=86",
  },
  {
    slug: "news",
    en: "News & Events",
    vi: "Tin tức & Sự kiện",
    kicker: "The pulse of our academic community",
    headline: "Theo dòng chuyển động học thuật.",
    intro: "Cập nhật tin tức, sự kiện, seminar và những khoảnh khắc nổi bật trong cộng đồng VGG.",
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

export type SectionSubpage = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  summary: string;
};

const subpageSlugs: Record<string, string[]> = {
  programmes: ["flagship", "thac-si", "tien-si", "executive-education", "quoc-te"],
  admissions: ["yeu-cau", "hoc-phi", "hoc-bong", "nop-ho-so", "moc-thoi-gian", "faq", "tu-van"],
  research: ["cum-nghien-cuu", "du-an", "cong-bo", "hoi-thao", "doi-moi-sang-tao", "hop-tac-doanh-nghiep"],
  global: ["trao-doi", "dual-degree", "thuc-tap", "study-tour", "overseas-immersion", "doi-tac"],
  "student-success": ["ho-tro-hoc-vien", "phat-trien-su-nghiep", "tai-nguyen-hoc-tap", "cuu-hoc-vien", "cau-chuyen-thanh-cong"],
  news: ["tin-tuc", "su-kien", "seminar-webinar", "thong-cao-bao-chi", "thu-vien-hinh-anh", "video"],
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
        summary: `Khám phá thông tin, cơ hội và nguồn lực dành cho ${title.toLowerCase()} tại VGG — được thiết kế rõ ràng, thực tiễn và lấy người học làm trung tâm.`,
      })),
    ]),
);

export function subpageHref(section: string, index: number) {
  const page = sectionSubpages[section]?.[index];
  return page ? `/${section}/${page.slug}` : `/${section}`;
}
