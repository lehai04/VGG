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
    category: "Chương trình đào tạo",
    heading: "Lựa chọn theo mục tiêu của bạn",
    body: "Với 20 chương trình thạc sĩ, 01 chương trình tiến sĩ, 01 chương trình liên kết quốc tế thuộc nhiều lĩnh vực, Văn Lang mang đến những lựa chọn học tập phù hợp với nền tảng chuyên môn, mối quan tâm và kế hoạch phát triển của mỗi người.",
    image: "/images/pages/discover/content/1.jpg",
    imageAlt: "Giảng viên và người học Viện Sau Đại học trong ngày tốt nghiệp",
    accent: "red",
    Icon: GraduationCap,
  },
  {
    number: "02",
    category: "Học thuật & Thực tiễn",
    heading: "Học chuyên sâu để giải quyết vấn đề",
    body: "Chương trình gắn kiến thức chuyên sâu với những vấn đề trong thực tiễn nghề nghiệp. Định hướng nghiên cứu hoặc ứng dụng được triển khai tùy từng ngành, giúp người học rèn luyện tư duy phản biện, khả năng phân tích và đề xuất giải pháp.",
    image: "/images/pages/discover/content/2.jpg",
    imageAlt: "Người học Văn Lang trong không gian nghiên cứu ứng dụng",
    accent: "navy",
    Icon: Microscope,
  },
  {
    number: "03",
    category: "Cộng đồng & Kết nối",
    heading: "Học hỏi từ những góc nhìn khác",
    body: "Trao đổi cùng giảng viên, chuyên gia và cộng đồng học thuật giúp người học tiếp cận nhiều cách nhìn về một vấn đề. Những kết nối với thực tiễn doanh nghiệp mở thêm cơ hội chia sẻ kinh nghiệm và xây dựng mạng lưới chuyên môn.",
    image: "/images/pages/discover/content/3.jpg",
    imageAlt: "Cộng đồng Văn Lang trong một hoạt động kết nối chuyên môn",
    accent: "navy",
    Icon: Network,
  },
  {
    number: "04",
    category: "Tư vấn & Hỗ trợ",
    heading: "Được hướng dẫn từ tìm hiểu đến nhập học",
    body: "Đội ngũ tư vấn hỗ trợ bạn tìm hiểu chương trình, điều kiện dự tuyển, học phí, học bổng và cách chuẩn bị hồ sơ, giúp bạn nắm rõ thông tin để chủ động lựa chọn và thực hiện các bước đăng ký, nhập học.",
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
            <p>VIỆN SAU ĐẠI HỌC</p>
            <span aria-hidden="true" />
          </div>
          <h1 id="why-choose-title">Vì sao học sau đại học tại Văn Lang?</h1>
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
