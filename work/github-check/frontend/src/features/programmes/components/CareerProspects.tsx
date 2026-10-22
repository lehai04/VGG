import Image from "next/image";
import { ArrowRight, BarChart3, Globe2, GraduationCap, Handshake, Network, Ship, TrendingUp, Truck, type LucideIcon } from "lucide-react";
import styles from "./CareerProspects.module.css";
import { logisticsContent } from "../logistics";

type Career = { title: string; text: string; roles?: string[] };
const careerIcons: LucideIcon[] = [Network, Truck, Handshake, Ship, BarChart3, GraduationCap];

function CareerCard({ career, index, supplemental }: { career: Career; index: number; supplemental?: boolean }) {
  const Icon = careerIcons[index % careerIcons.length];
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.iconBox}><Icon size={27} strokeWidth={1.6} aria-hidden="true" /></span>
        <span className={styles.number}>{supplemental ? "MỞ RỘNG" : String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{career.title}</h3>
      {career.roles ? <ul className={styles.roles}>{career.roles.map(role => <li key={role}>{role}</li>)}</ul> : <p>{career.text}</p>}
      <ArrowRight className={styles.cardArrow} size={22} aria-hidden="true" />
    </article>
  );
}

export function CareerProspects({ careers, isLogistics }: { careers: Career[]; isLogistics: boolean }) {
  return (
    <section id="nghe-nghiep" className={styles.section} aria-labelledby="career-title">
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.label}>02 / TRIỂN VỌNG NGHỀ NGHIỆP</p>
            <h2 id="career-title">Kiến thức hôm nay.<br /><span>Hướng đi ngày mai.</span></h2>
            <p className={styles.lead}>{isLogistics ? logisticsContent.careerIntro : "Khám phá những hướng phát triển phù hợp với chuyên môn và mục tiêu của bạn."}</p>
            <a className={styles.cta} href="#career-groups">Khám phá cơ hội nghề nghiệp <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          <div className={styles.collage}>
            <div className={styles.shape} aria-hidden="true" />
            <div className={styles.mainImage}>
              <Image src={isLogistics ? "/images/pages/programmes/logistics/career-warehouse-vlu.webp" : "/images/pages/programmes/content/campus.jpg"} alt={isLogistics ? "Hai nhân viên logistics kiểm tra hàng hóa trong kho bằng máy tính bảng" : "Không gian học tập tại Trường Đại học Văn Lang"} fill sizes="(max-width: 767px) 90vw, 50vw" />
            </div>
            <div className={styles.smallImage}>
              <Image src={isLogistics ? "/images/pages/programmes/logistics/career-port-vlu.webp" : "/images/pages/programmes/content/graduates.jpg"} alt={isLogistics ? "Hoạt động logistics tại cảng container với hệ thống cần cẩu và xe vận tải" : "Học viên tốt nghiệp tại Văn Lang"} fill sizes="(max-width: 767px) 45vw, 24vw" />
            </div>
            <div className={styles.globalCard}><span><Globe2 size={25} strokeWidth={1.5} aria-hidden="true" /></span><strong>Cơ hội làm việc<br />toàn cầu</strong></div>
          </div>
        </div>
        {isLogistics && <p className={styles.groupsIntro}>Các vị trí việc làm có thể phân thành các nhóm chính như sau:</p>}
        <div id="career-groups" className={styles.grid}>
          {careers.map((career, index) => <CareerCard key={career.title} career={career} index={index} supplemental={isLogistics && index === 5} />)}
        </div>
        <div className={styles.banner}>
          <span className={styles.bannerIcon}><TrendingUp size={32} strokeWidth={1.6} aria-hidden="true" /></span>
          <div><h3>Trang bị kiến thức – rèn luyện kỹ năng – kết nối doanh nghiệp</h3><p>Sẵn sàng cho những cơ hội nghề nghiệp trong nước và quốc tế.</p></div>
          <Globe2 className={styles.bannerGlobe} size={112} strokeWidth={.7} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
