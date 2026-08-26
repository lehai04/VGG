import Link from "@/i18n/components/LocalizedLink";
import { ArrowUpRight } from "lucide-react";
import styles from "./ResearchLanding.module.css";

type ResearchPost = { id: string; slug: string; title: string; excerpt: string | null; coverImage: string | null; category: "RESEARCH_PROJECT" | "RESEARCH_PUBLICATION" };

const fallback: ResearchPost[] = [
  { id: "project-1", slug: "https://www.vlu.edu.vn/projects/nghien-cuu-cac-phuong-trinh-khuech-tan-cua-vat-chat-hoac-vi-sinh-vat-bi-anh-huong-boi-cac-hieu-ung-ngau-nhien", title: "Nghiên cứu các phương trình khuếch tán của vật chất hoặc vi sinh vật bị ảnh hưởng bởi các hiệu ứng ngẫu nhiên", excerpt: "", coverImage: "/images/pages/research/content/graduates.avif", category: "RESEARCH_PROJECT" },
  { id: "project-2", slug: "https://www.vlu.edu.vn/projects/du-an-chuyen-giao-cong-nghe-san-xuat-tra-thao-moc-1", title: "Dự án chuyển giao công nghệ sản xuất trà thảo mộc", excerpt: "Viện IAMTECH", coverImage: "/images/pages/research/content/duan2.avif", category: "RESEARCH_PROJECT" },
  { id: "project-3", slug: "https://www.vlu.edu.vn/projects/du-an-nghien-cuu-san-xuat-thu-nghiem-va-danh-gia-chat-luong-compost-tu-chat-thai-huu-co-da-phan-loai-tai-tinh-long-an", title: "Dự án nghiên cứu sản xuất thử nghiệm và đánh giá chất lượng compost từ chất thải hữu cơ đã phân loại tại tỉnh Long An", excerpt: "TS.Huỳnh Tấn Lợi", coverImage: "/images/pages/research/content/duan3.avif", category: "RESEARCH_PROJECT" },
  { id: "publication-1", slug: "https://www.vlu.edu.vn/publications/nhung-nhan-to-tac-dong-den-xu-huong-hanh-vi-cua-cong-chung-trong-boi-canh-khung-hoang-truyen-thong", title: "Những nhân tố tác động đến xu hướng hành vi của công chúng trong bối cảnh khủng hoảng truyền thông", excerpt: "Tại Trường Đại học Văn Lang, chúng tôi hướng tới mang đến những nghiên cứu khoa học mang tính...", coverImage: null, category: "RESEARCH_PUBLICATION" },
  { id: "publication-2", slug: "https://www.vlu.edu.vn/publications/danh-gia-chat-luong-va-ung-dung-cong-nghe-dat-ngap-nuoc-voi-su-tham-gia-cua-co-nang-eleocharis-dulcis-de-xu-ly-nuoc-thai-nuoi-tom", title: "Đánh giá chất lượng và ứng dụng công nghệ đất ngập nước với sự tham gia của cỏ năng (eleocharis dulcis) để xử lý nước thải nuôi tôm.", excerpt: "Tại Trường Đại học Văn Lang, chúng tôi hướng tới mang đến những nghiên cứu khoa học mang tính...", coverImage: null, category: "RESEARCH_PUBLICATION" },
  { id: "publication-3", slug: "https://www.vlu.edu.vn/publications/cac-yeu-to-anh-huong-den-chat-luong-cam-nhan-dich-vu-dao-tao-cua-sinh-vien-truong-dai-hoc-van-lang", title: "Các yếu tố ảnh hưởng đến chất lượng cảm nhận dịch vụ đào tạo của sinh viên trường Đại học Văn Lang", excerpt: "Tại Trường Đại học Văn Lang, chúng tôi hướng tới mang đến những nghiên cứu khoa học mang tính...", coverImage: null, category: "RESEARCH_PUBLICATION" },
];

const publicationLinks = [
  "https://www.vlu.edu.vn/publications/nhung-nhan-to-tac-dong-den-xu-huong-hanh-vi-cua-cong-chung-trong-boi-canh-khung-hoang-truyen-thong",
  "https://www.vlu.edu.vn/publications/danh-gia-chat-luong-va-ung-dung-cong-nghe-dat-ngap-nuoc-voi-su-tham-gia-cua-co-nang-eleocharis-dulcis-de-xu-ly-nuoc-thai-nuoi-tom",
  "https://www.vlu.edu.vn/publications/cac-yeu-to-anh-huong-den-chat-luong-cam-nhan-dich-vu-dao-tao-cua-sinh-vien-truong-dai-hoc-van-lang",
] as const;

async function getResearchPosts() {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return fallback;
  try {
    const response = await fetch(`${backend}/api/public/news?locale=vi`, { next: { revalidate: 60 } });
    if (!response.ok) return fallback;
    const payload = await response.json();
    const posts = (payload.data?.posts ?? []).filter((post: ResearchPost) => post.category === "RESEARCH_PROJECT" || post.category === "RESEARCH_PUBLICATION");
    return posts.length ? posts as ResearchPost[] : fallback;
  } catch {
    return fallback;
  }
}

export async function ResearchHighlights() {
  const posts = await getResearchPosts();
  const projects = posts.filter((post) => post.category === "RESEARCH_PROJECT").slice(0, 3);
  const publications = posts.filter((post) => post.category === "RESEARCH_PUBLICATION").slice(0, 3);
  return (
    <section className={styles.achievements} id="achievements">
      <h2>Dự án &amp; Công bố nổi bật</h2>
      <div className={styles.projectHead}><h3>Dự án khoa học</h3><Link href="https://www.vlu.edu.vn/research/projects/search">Xem tất cả dự án <ArrowUpRight /></Link></div>
      <div className={styles.projectGrid}>{projects.map((post) => <article key={post.id} className={styles.projectCard}><div className={styles.projectImage} style={{ backgroundImage: `url("${post.coverImage || "/images/pages/research/content/campus.jpg"}")` }} /><h3><Link href={`/news/${post.slug}`}>{post.title}</Link></h3>{post.excerpt && <p>{post.excerpt}</p>}</article>)}</div>
      <div className={styles.publicationBlock}>
        <div className={styles.publicationHead}><h3>Công bố khoa học</h3><Link href="https://www.vlu.edu.vn/research/publications/search">Xem tất cả công bố <ArrowUpRight /></Link></div>
        <div className={styles.projectGrid}>{publications.map((post, index) => <article key={post.id} className={styles.projectCard}><div className={styles.projectImage} style={{ backgroundImage: `url("${post.coverImage || "/images/pages/research/content/campus.jpg"}")` }} /><h3><Link href={publicationLinks[index]}>{post.title}</Link></h3>{post.excerpt && <p>{post.excerpt}</p>}</article>)}</div>
      </div>
    </section>
  );
}
