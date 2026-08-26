import Image from "next/image";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { PublicationsSearch, type PublicationItem } from "./PublicationsSearch";
import { ResearchGateway } from "./ResearchLanding";
import styles from "./ResearchPublicationsPage.module.css";

const fallback: PublicationItem[] = [
  { id:"r1", title:"Giải pháp phát triển bền vững gắn với quản trị và kinh tế tuần hoàn", field:"Kinh doanh & Phát triển bền vững", author:"Nhóm nghiên cứu VGG", year:"2026", type:"Đang triển khai", language:"Vietnamese", abstract:"Dự án xây dựng mô hình quản trị tài nguyên và tăng trưởng có trách nhiệm phù hợp với doanh nghiệp Việt Nam." },
  { id:"r2", title:"Ứng dụng dữ liệu nâng cao chất lượng môi trường đô thị", field:"Công nghệ & Môi trường", author:"Viện nghiên cứu VGG", year:"2026", type:"Hợp tác doanh nghiệp", language:"Vietnamese", abstract:"Ứng dụng dữ liệu và công nghệ số để theo dõi, phân tích và đề xuất giải pháp cải thiện môi trường đô thị." },
  { id:"r3", title:"Kết nối nghiên cứu với nhu cầu phát triển của cộng đồng", field:"Nghiên cứu liên ngành", author:"Trần Công Minh", year:"2025", type:"Đang triển khai", language:"Vietnamese", abstract:"Kết nối giảng viên, người học và đối tác địa phương trong các sáng kiến tạo tác động xã hội có thể đo lường." },
  { id:"r4", title:"Không gian sáng tạo cho bảo tồn và phát huy bản sắc địa phương", field:"Văn hóa & Sáng tạo", author:"Nhóm nghiên cứu Sáng tạo", year:"2025", type:"Trong nước", language:"Vietnamese", abstract:"Thử nghiệm các phương pháp thiết kế và truyền thông nhằm đưa giá trị văn hóa bản địa đến gần hơn với công chúng." },
  { id:"r5", title:"Mô hình đô thị thông minh thích ứng với biến đổi khí hậu", field:"Công nghệ & Kỹ thuật", author:"Viện Công nghệ VGG", year:"2024", type:"Quốc tế", language:"English", abstract:"Phát triển mô hình tích hợp dữ liệu, hạ tầng và hành vi cộng đồng cho đô thị có khả năng thích ứng cao." },
  { id:"r6", title:"Nâng cao chất lượng sống thông qua nghiên cứu sức khỏe liên ngành", field:"Sức khỏe & Chất lượng sống", author:"Nhóm nghiên cứu Sức khỏe", year:"2024", type:"Hoàn thành", language:"Vietnamese", abstract:"Nghiên cứu các yếu tố hành vi và môi trường ảnh hưởng tới sức khỏe, từ đó đề xuất giải pháp can thiệp phù hợp." },
];

async function getProjects(): Promise<PublicationItem[]> {
  const backend=process.env.BACKEND_INTERNAL_URL;
  if (!backend) return fallback;
  try {
    const response=await fetch(`${backend}/api/public/news?locale=vi&category=RESEARCH_PROJECT`,{next:{revalidate:60}});
    if (!response.ok) return fallback;
    const payload=await response.json();
    const posts=(payload.data?.posts??[]).filter((post:{category?:string})=>post.category==="RESEARCH_PROJECT");
    if (!posts.length) return fallback;
    return posts.map((post:{id:string;title:string;excerpt?:string|null;publishedAt?:string|null;createdAt?:string;author?:{name?:string}})=>({ id:post.id,title:post.title,field:post.excerpt||"Dự án nghiên cứu VGG",author:post.author?.name||"Nhóm nghiên cứu VGG",year:new Date(post.publishedAt||post.createdAt||Date.now()).getFullYear().toString(),type:"Dự án nghiên cứu",language:"Vietnamese",abstract:"Dự án kết nối năng lực học thuật với nhu cầu thực tế nhằm tạo ra những giải pháp có giá trị cho cộng đồng." }));
  } catch { return fallback; }
}

export async function ResearchProjectsPage() {
  const projects=await getProjects();
  return <main className={styles.page} id="main-content">
    <SiteHeader compact />
    <section className={styles.projectHero} aria-labelledby="project-page-title">
      <Image src="/images/pages/research/content/campus.jpg" alt="Hoạt động dự án nghiên cứu tại VGG" fill priority sizes="100vw" />
      <div className={styles.projectHeroOverlay}/>
      <div className={styles.projectHeroCopy}>
        <p>RESEARCH &amp; INNOVATION · 02</p>
        <h1 id="project-page-title">Dự án nghiên cứu</h1>
        <span>Nghiên cứu gắn với thực tiễn, tác động có thể đo lường.</span>
      </div>
    </section>
    <PublicationsSearch publications={projects} titleSecond="Dự án nghiên cứu VGG" breadcrumbLast="Dự án nghiên cứu" searchPlaceholder="Tìm kiếm Dự án nghiên cứu" resultLabel="dự án"/>
    <ResearchGateway activeHref="/research/du-an"/>
    <NextStepCTA/><SiteFooter/>
  </main>;
}
