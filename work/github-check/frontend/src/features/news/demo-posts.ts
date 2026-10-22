import type { NewsPost } from "./data";

// Frontend-only demo cards. Original articles remain on the VLU website.
const media = "https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/";
const articles = [
  {
    slug: "hoi-nghi-eset-2026",
    title: "Hội nghị ESET2026",
    category: "UNIVERSITY_EVENT",
    excerpt: "Diễn đàn trao đổi nghiên cứu về kinh tế, xã hội, kỹ thuật và công nghệ, kết nối các nhà khoa học, giảng viên và học viên sau đại học.",
    image: "ESET_2026_600_x_1920_px_1_c1c1607751.png",
    publishedAt: "2026-03-25T00:00:00+07:00",
    authorName: "Viện Sau đại học",
  },
  {
    slug: "truong-dai-hoc-van-lang-mo-nganh-thac-si-logistics-va-quan-ly-chuoi-cung-ung-va-thac-si-ky-thuat-o-to",
    title: "Trường Đại học Văn Lang mở ngành Thạc sĩ Logistics và Quản lý Chuỗi cung ứng và Thạc sĩ Kỹ thuật Ô tô",
    category: "ADMISSIONS",
    excerpt: "Hai chương trình thạc sĩ mới mở rộng cơ hội học tập và nghiên cứu chuyên sâu trong lĩnh vực quản trị chuỗi cung ứng và công nghệ ô tô.",
    image: "vlu_dao_tao_thac_si_nganh_logistics_va_quan_ly_chuoi_cung_ung_va_nganh_ky_thuat_o_to_cover_94a5414465.jpg",
    publishedAt: "2025-09-09T00:00:00+07:00",
    authorName: "Viện Sau đại học",
  },
  {
    slug: "thong-bao-tuyen-sinh-chuong-trinh-dao-tao-bac-tien-si-nam-2025",
    title: "Thông báo tuyển sinh chương trình Tiến sĩ chuyên ngành Khoa học Môi trường năm 2025",
    category: "ADMISSIONS",
    excerpt: "Thông tin về chương trình tiến sĩ Khoa học Môi trường, điều kiện dự tuyển, hồ sơ và các đợt tuyển sinh năm 2025 tại Trường Đại học Văn Lang.",
    image: "IMGL_7516_20148ee3db_2_9add689e4d.jpg",
    publishedAt: "2025-04-14T00:00:00+07:00",
    authorName: "Viện Sau Đại học",
  },
  {
    slug: "hoi-thao-ve-ung-dung-tri-tue-nhan-tao-trong-kinh-doanh-thoi-dai-cong-nghe-so",
    title: "Hội thảo về ứng dụng trí tuệ nhân tạo trong kinh doanh thời đại công nghệ số",
    category: "UNIVERSITY_EVENT",
    excerpt: "Cùng chuyên gia tìm hiểu cơ hội kinh doanh trong thời đại AI và cách kết hợp công nghệ với năng lực sáng tạo, tư duy và kết nối của con người.",
    image: "vlu_ung_dung_tri_tue_nhan_tao_trong_kinh_doanh_thoi_dai_cong_nghe_so_cover_404e36104a.JPG",
    publishedAt: "2025-03-20T00:00:00+07:00",
    authorName: "Thanh Phúc",
  },
];

export const demoNewsPosts: NewsPost[] = articles.map(({ image, ...article }) => ({
  ...article,
  id: `demo-${article.slug}`,
  content: "",
  coverImage: `${media}${image}`,
  externalUrl: `https://www.vlu.edu.vn/news/${article.slug}`,
}));

export function getDemoNewsPosts(options: { category?: string; q?: string }) {
  const query = options.q?.trim().toLocaleLowerCase("vi");
  return demoNewsPosts.filter((post) =>
    (!options.category || post.category === options.category) &&
    (!query || `${post.title} ${post.excerpt ?? ""}`.toLocaleLowerCase("vi").includes(query)),
  );
}
