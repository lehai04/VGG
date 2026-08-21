import { menuGroups } from "@/data/site";

export const contactItems = [
  {
    label: "Email",
    value: "truyenthong@vlu.edu.vn",
    href: "mailto:truyenthong@vlu.edu.vn",
    icon: "mail",
  },
  { label: "Đào tạo", value: "028.7109 9221", href: "tel:+842871099221", icon: "book" },
  { label: "Tuyển sinh", value: "028.7105 9999", href: "tel:+842871059999", icon: "phone" },
  {
    label: "Hỗ trợ Sinh viên (Call Center)",
    value: "028.7106.1111",
    href: "tel:+842871061111",
    icon: "headset",
  },
] as const;

export const aboutLinks = [
  { label: "Tin tức", href: "/news" },
  { label: "Sự kiện", href: "/news" },
  { label: "Tuyển dụng", href: "/discover/gioi-thieu" },
  { label: "Đảm bảo chất lượng đào tạo", href: "/discover/xep-hang-thanh-tuu" },
  { label: "Trung tâm khảo thí tiếng Anh", href: "/resources" },
] as const;

export const quickLinks = [
  { label: "Trang chủ", href: "/" },
  ...menuGroups.map((group) => ({ label: group.vi, href: `/${group.slug}` })),
  { label: "Liên hệ", href: "/discover/lien-he" },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/truongdaihocvanlang/", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@VanLangUniversity", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/vanlanguniversity/", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@vanlanguniversity", icon: "tiktok" },
] as const;

export const locations = [
  {
    name: "Cơ sở chính",
    address: "69/68 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh",
    mapUrl:
      "https://www.google.com/maps?q=69%2F68%20Dang%20Thuy%20Tram%2C%20Ho%20Chi%20Minh%20City",
  },
  {
    name: "Cơ sở 2",
    address: "233A Phan Văn Trị, Quận Bình Thạnh, TP. Hồ Chí Minh",
    mapUrl: "https://www.google.com/maps?q=233A%20Phan%20Van%20Tri%2C%20Ho%20Chi%20Minh%20City",
  },
] as const;

export const legalLinks = [
  { label: "Điều khoản", href: "/resources" },
  { label: "Chính sách Bảo mật", href: "/resources" },
  { label: "Sitemap", href: "/sitemap.xml" },
] as const;
