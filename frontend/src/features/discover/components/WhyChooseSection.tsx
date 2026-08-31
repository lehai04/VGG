import Image from "next/image";
import {
  BookOpen,
  Building2,
  Flag,
  GraduationCap,
  Microscope,
  Network,
  type LucideIcon,
} from "lucide-react";
import styles from "./WhyChooseSection.module.css";

type Reason = {
  number: string;
  category: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  accent: "red" | "navy";
  Icon: LucideIcon;
};

const reasons: Reason[] = [
  {
    number: "01",
    category: "Học thuật & Thực tiễn",
    heading: "Một bước tiến trong học thuật mở ra một bước tiến trong sự nghiệp.",
    body: "Viện Sau Đại học mang đến môi trường đào tạo nơi chiều sâu học thuật gắn liền với thực tiễn nghề nghiệp. Các chương trình phát triển chuyên môn, năng lực nghiên cứu, tư duy phân tích và khả năng vận dụng kiến thức vào những vấn đề thực tế.",
    image: "/images/pages/discover/content/1.jpg",
    imageAlt: "Giảng viên và người học Viện Sau Đại học trong ngày tốt nghiệp",
    accent: "red",
    Icon: GraduationCap,
  },
  {
    number: "02",
    category: "Nghiên cứu & Ứng dụng",
    heading: "Học để ứng dụng, nghiên cứu để phát triển.",
    body: "Chương trình được xây dựng theo định hướng ứng dụng và nghiên cứu tùy từng ngành, giúp người học đào sâu chuyên môn, phát triển năng lực giải quyết vấn đề và mở rộng năng lực nghề nghiệp.",
    image: "/images/pages/discover/content/2.jpg",
    imageAlt: "Người học Văn Lang trong không gian nghiên cứu ứng dụng",
    accent: "navy",
    Icon: Microscope,
  },
  {
    number: "03",
    category: "Cộng đồng & Kết nối",
    heading: "Một môi trường để đi xa hơn.",
    body: "Viện Sau Đại học tạo điều kiện để người học kết nối với giảng viên, chuyên gia, cộng đồng học thuật và thực tiễn doanh nghiệp; từ đó mở rộng góc nhìn, xây dựng mạng lưới và tìm kiếm cơ hội phát triển mới.",
    image: "/images/pages/discover/content/3.jpg",
    imageAlt: "Cộng đồng Văn Lang trong một hoạt động kết nối chuyên môn",
    accent: "navy",
    Icon: Network,
  },
  {
    number: "04",
    category: "Quyết tâm & Tầm nhìn",
    heading: "Chọn Viện Sau Đại học là chọn chủ động đi tiếp.",
    body: "Học sâu hơn, tư duy rộng hơn, kết nối nhiều hơn và sẵn sàng cho những bước tiến xa hơn trong sự nghiệp và cuộc sống.",
    image: "/images/pages/discover/content/campus.jpg",
    imageAlt: "Kiến trúc khuôn viên Trường Đại học Văn Lang",
    accent: "red",
    Icon: Flag,
  },
];

export function WhyChooseSection() {
  return (
    <section className={styles.section} id="vi-sao-chon-vgg" aria-labelledby="why-choose-title">
      <div className={styles.dotField} aria-hidden="true" />
      <BookOpen className={styles.bookMotif} aria-hidden="true" strokeWidth={0.9} />
      <Building2 className={styles.campusMotif} aria-hidden="true" strokeWidth={0.75} />
      <span className={styles.vMotif} aria-hidden="true">V</span>

      <div className={styles.inner}>
        <header className={styles.heading}>
          <div className={styles.eyebrow}>
            <span aria-hidden="true" />
            <p>Vì sao chọn</p>
            <span aria-hidden="true" />
          </div>
          <h2 id="why-choose-title">Viện Sau Đại học</h2>
          <div className={styles.headingMark} aria-hidden="true">
            <span />
            <b>V</b>
            <span />
          </div>
        </header>

        <div className={styles.grid}>
          {reasons.map(({ number, category, heading, body, image, imageAlt, accent, Icon }) => (
            <article className={styles.card} data-accent={accent} key={number}>
              <Image
                className={styles.cardImage}
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 680px"
              />
              <div className={styles.panel} aria-hidden="true">
                <span className={styles.panelDots} />
                <Icon strokeWidth={1.45} />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.category}>
                  <strong>{number}</strong>
                  <span aria-hidden="true">/</span>
                  <span className={styles.categoryLabel}>{category}</span>
                </p>
                <h3>{heading}</h3>
                <p className={styles.body}>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
