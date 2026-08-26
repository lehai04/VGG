/**
 * Nội dung footer: SĐT, email, cột link, MXH, địa chỉ, legal.
 * Đổi thông tin liên hệ/cơ sở tại đây; markup nằm ở các file Footer*.tsx.
 */
import { navigationGroups } from "@/data/site";

export const contactItems = [
  {
    label: "Email",
    value: "tuyensinh.sdh@vlu.edu.vn",
    href: "mailto:tuyensinh.sdh@vlu.edu.vn",
    icon: "mail",
  },
  { label: "Đào tạo", value: "098.848 6869", href: "tel:+8498848 6869", icon: "book" },
  { label: "Tuyển sinh", value: "098.848 6869", href: "tel:+8498848 6869", icon: "phone" },
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
  { label: "Đảm bảo chất lượng đào tạo", href: "/discover/xep-hang-thanh-tuu" },
  { label: "Trung tâm khảo thí tiếng Anh", href: "/resources" },
] as const;

export const quickLinks = [
  { label: "Trang chủ", href: "/" },
  ...navigationGroups.map((group) => ({ label: group.vi, href: `/${group.slug}` })),
  { label: "Liên hệ", href: "/discover/lien-he" },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/saudaihoc.vlu", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@Vi%E1%BB%87nsau%C4%90%E1%BA%A1ih%E1%BB%8Dc-VLU", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/vsdh.vlu?igsi=MXc4aWFqc2FlOWc1Yw==", icon: "instagram" },
  { label: "Zalo", href: "https://zalo.me/0988486869", icon: "zalo" },
] as const;

export const locations = [
  {
    name: "Cơ sở chính",
    address: "69/68 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh",
    mapUrl:
      "https://www.google.com/maps?q=69%2F68%20Dang%20Thuy%20Tram%2C%20Ho%20Chi%20Minh%20City",
  },
] as const;

export const legalLinks = [
  { label: "Điều khoản", href: "/resources" },
  { label: "Chính sách Bảo mật", href: "/resources" },
  { label: "Sitemap", href: "/sitemap.xml" },
] as const;
