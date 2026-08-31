import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { PublicationsSearch, type PublicationItem } from "./PublicationsSearch";
import { ResearchGateway } from "./ResearchLanding";
import styles from "./ResearchPublicationsPage.module.css";

const displayYear = (value: string | null | undefined) => {
  const year = new Date(value || Date.now()).getFullYear();
  return year === 2026 ? "" : year.toString();
};

const fallback: PublicationItem[] = [
  { id:"p1", title:"Các yếu tố ảnh hưởng đến đổi mới và năng lực thích ứng của tổ chức", field:"Kinh doanh & Quản trị", author:"Nhóm nghiên cứu Viện Sau Đại học", year:"", type:"Quốc tế", language:"Vietnamese", abstract:"Nghiên cứu phân tích năng lực đổi mới và khả năng thích ứng của tổ chức trong bối cảnh kinh tế nhiều biến động." },
  { id:"p2", title:"Tiếp cận liên ngành trong nghiên cứu văn hóa và truyền thông đương đại", field:"Xã hội nhân văn & Truyền thông", author:"Trần Thị Mỹ Duyên", year:"", type:"Trong nước", language:"Vietnamese", abstract:"Công trình đề xuất cách tiếp cận liên ngành đối với những chuyển động văn hóa và truyền thông hiện nay." },
  { id:"p3", title:"Giải pháp công nghệ hướng đến môi trường sống bền vững", field:"Công nghệ & Kỹ thuật", author:"Viện nghiên cứu Viện Sau Đại học", year:"2025", type:"ISI & Scopus", language:"English", abstract:"Nghiên cứu các giải pháp kỹ thuật và dữ liệu hỗ trợ xây dựng môi trường sống bền vững cho cộng đồng đô thị." },
  { id:"p4", title:"Mô hình kinh tế tuần hoàn cho doanh nghiệp vừa và nhỏ tại Việt Nam", field:"Luật - Kinh doanh - Quản lý", author:"PGS. TS. Lê Thị Kim Oanh", year:"2025", type:"Scopus", language:"Vietnamese", abstract:"Đánh giá khả năng triển khai mô hình kinh tế tuần hoàn và các điều kiện thúc đẩy chuyển đổi trong doanh nghiệp." },
  { id:"p5", title:"Ứng dụng dữ liệu trong quản trị chất lượng dịch vụ giáo dục", field:"Công nghệ & Kỹ thuật", author:"Trần Công Minh", year:"2024", type:"Quốc tế", language:"English", abstract:"Khảo sát vai trò của dữ liệu trong việc nâng cao trải nghiệm người học và hiệu quả quản trị giáo dục." },
  { id:"p6", title:"Bảo tồn bản sắc địa phương trong thiết kế không gian đương đại", field:"Thiết kế - Nghệ thuật", author:"Nhóm nghiên cứu Sáng tạo", year:"2024", type:"Trong nước", language:"Vietnamese", abstract:"Phân tích cách chuyển hóa chất liệu văn hóa bản địa thành ngôn ngữ thiết kế phù hợp với đời sống hiện đại." },
] as const;

async function getPublications(): Promise<PublicationItem[]> {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return [...fallback];
  try {
    const response = await fetch(`${backend}/api/public/news?locale=vi&category=RESEARCH_PUBLICATION`, { next:{ revalidate:60 } });
    if (!response.ok) return [...fallback];
    const payload = await response.json();
    const posts = (payload.data?.posts ?? []).filter((post: { category?: string }) => post.category === "RESEARCH_PUBLICATION");
    if (!posts.length) return [...fallback];
    return posts.map((post: { id:string; title:string; excerpt?:string|null; publishedAt?:string|null; createdAt?:string; author?:{ name?:string } }) => ({
      id:post.id,
      title:post.title,
      field:post.excerpt || "Nghiên cứu Viện Sau Đại học",
      author:post.author?.name || "Nhóm nghiên cứu Viện Sau Đại học",
      year:displayYear(post.publishedAt || post.createdAt),
      type:"Công bố khoa học",
      language:"Vietnamese",
      abstract:"Nghiên cứu hướng đến giá trị học thuật, khả năng ứng dụng và những tác động tích cực cho xã hội.",
    }));
  } catch { return [...fallback]; }
}

export async function ResearchPublicationsPage() {
  const publications = await getPublications();
  return <main className={styles.page} id="main-content"><SiteHeader compact /><PublicationsSearch publications={publications} /><ResearchGateway activeHref="/research/cong-bo" /><NextStepCTA /><SiteFooter /></main>;
}
