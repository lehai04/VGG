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
  { label: "Điện thoại", value: "0287 101 6869", href: "tel:+842871016869", icon: "phone" },
  { label: "Hotline/Zalo", value: "0988 48 6869", href: "tel:+84988486869", icon: "zalo" },
] as const;

export const aboutLinks = [
  { label: "Giới thiệu", href: "/discover#gioi-thieu" },
  { label: "Tầm nhìn và Sứ mệnh", href: "/discover#tam-nhin-su-menh" },
  { label: "Triết lý giáo dục", href: "/discover#triet-ly-giao-duc" },
  { label: "Giá trị cốt lõi", href: "/discover#gia-tri-cot-loi" },
  { label: "Vì sao chọn Viện Sau đại học", href: "/discover#vi-sao-chon-vgg" },
  { label: "Đội ngũ lãnh đạo", href: "/discover#doi-ngu-lanh-dao" },
] as const;

export const quickLinks = [
  { label: "Trang chủ", href: "/" },
  ...navigationGroups.map((group) => ({ label: group.vi, href: `/${group.slug}` })),
  { label: "Liên hệ", href: "/admissions#consultation" },
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/saudaihoc.vlu", icon: "facebook" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Vi%E1%BB%87nsau%C4%90%E1%BA%A1ih%E1%BB%8Dc-VLU",
    icon: "youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vsdh.vlu?igsi=MXc4aWFqc2FlOWc1Yw==",
    icon: "instagram",
  },
  { label: "Zalo", href: "https://zalo.me/0988486869", icon: "zalo" },
] as const;

export const locations = [
  {
    name: "Cơ sở chính",
    address: "69/68 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP. Hồ Chí Minh",
    mapUrl:
      "https://www.google.com/maps?q=69%2F68%20Dang%20Thuy%20Tram%2C%20Ho%20Chi%20Minh%20City",
  },
] as const;

export const legalLinks = [
  { label: "Điều khoản", href: "/resources" },
  { label: "Chính sách Bảo mật", href: "/resources" },
  { label: "Sitemap", href: "/sitemap.xml" },
] as const;
