import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { ResearchGateway } from "./ResearchLanding";
import styles from "./ResearchClustersPage.module.css";

const clusters = [
  {
    title: "Kinh doanh & Phát triển bền vững",
    copy: "Cụm nghiên cứu tập trung vào kinh tế tuần hoàn, quản trị có trách nhiệm và những mô hình tăng trưởng dài hạn phù hợp với bối cảnh Việt Nam và khu vực.",
    image: "/images/pages/research/content/graduates.jpg",
  },
  {
    title: "Công nghệ & Đô thị thông minh",
    copy: "Các nhà nghiên cứu ứng dụng trí tuệ nhân tạo, dữ liệu lớn và kỹ thuật số vào quy hoạch đô thị, logistics, y tế và dịch vụ công vì chất lượng sống của cộng đồng.",
    image: "/images/pages/research/content/campus.jpg",
  },
  {
    title: "Môi trường & Kinh tế tuần hoàn",
    copy: "Cụm kết nối khoa học môi trường với công nghệ và quản trị để phát triển giải pháp sử dụng tài nguyên hiệu quả, giảm phát thải và thích ứng với biến đổi khí hậu.",
    image: "/images/pages/research/content/academic-leader.avif",
  },
  {
    title: "Văn hóa, Sáng tạo & Bản sắc",
    copy: "Nghiên cứu vị trí của bản sắc Việt trong dòng chảy toàn cầu qua thiết kế, truyền thông, ngôn ngữ, nghệ thuật và di sản văn hóa.",
    image: "/images/pages/research/content/graduates.jpg",
  },
  {
    title: "Sức khỏe & Chất lượng sống",
    copy: "Các hướng nghiên cứu liên ngành hướng tới chăm sóc sức khỏe, hành vi con người và những giải pháp giúp nâng cao chất lượng sống trong xã hội hiện đại.",
    image: "/images/pages/research/content/campus.jpg",
  },
] as const;

export function ResearchClustersPage() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="clusters-title">
        <Image src="/images/pages/research/content/campus.jpg" alt="Hoạt động nghiên cứu tại VGG" fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTitle}>
          <p>RESEARCH &amp; INNOVATION · 01</p>
          <h1 id="clusters-title">Các cụm<br />nghiên cứu</h1>
          <span>Research clusters</span>
        </div>
      </section>

      <div className={styles.clusterList}>
        {clusters.map((cluster, index) => (
          <section className={styles.clusterProfile} aria-labelledby={`cluster-${index}`} key={cluster.title}>
            <div className={styles.clusterCopy} data-reveal>
              <p className={styles.index}>{String(index + 1).padStart(2, "0")} · RESEARCH CLUSTER</p>
              <h2 id={`cluster-${index}`}>{cluster.title}</h2>
              <p>{cluster.copy}</p>
              <Link className="vgg-cta-pill" href="/research/du-an">Khám phá dự án</Link>
            </div>
            <div className={styles.clusterGallery} data-reveal>
              <figure className={styles.mainImage}>
                <Image src={cluster.image} alt={cluster.title} fill sizes="(max-width: 800px) 100vw, 54vw" />
              </figure>
              <figure><Image src="/images/pages/research/content/campus.jpg" alt={`Không gian ${cluster.title}`} fill sizes="(max-width: 800px) 50vw, 27vw" /></figure>
              <figure><Image src="/images/pages/research/content/graduates.jpg" alt={`Cộng đồng ${cluster.title}`} fill sizes="(max-width: 800px) 50vw, 27vw" /></figure>
            </div>
          </section>
        ))}
      </div>

      <ResearchGateway activeHref="/research/cum-nghien-cuu" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
