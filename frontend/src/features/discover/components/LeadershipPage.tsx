import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/features/discover/components/DiscoverMore";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import styles from "./LeadershipPage.module.css";

const leadershipProfiles = [
  {
    name: "PGS.TS. NGUYỄN VĂN THÀNH",
    title: "Phó Viện Trưởng\nPhụ trách Viện Sau đại học\nTrường Đại học Văn Lang",
    quote: "Tại Trường Đại học Văn Lang, chúng tôi tin rằng giá trị lớn nhất của đào tạo sau đại học không chỉ nằm ở văn bằng, mà ở sự trưởng thành của người học. Đó là những con người có tư duy chiến lược; biết kết nối tri thức với công nghệ, dữ liệu và đổi mới sáng tạo; có năng lực nghiên cứu, phản biện và ra quyết định dựa trên bằng chứng; đồng thời tạo ra giá trị mới cho tổ chức và cộng đồng.",
    image: "/images/pages/discover/content/nguyen-van-thanh-u-shape.png",
  },
] as const;

// Danh sách khoa/viện có chương trình Thạc sĩ hoặc Tiến sĩ; mỗi đơn vị chỉ xuất hiện một lần.
const postgraduateFaculties = [
  { faculty: "Khoa Môi trường", dean: "PGS.TS. Lê Thị Kim Oanh", image: "/images/pages/discover/leadership/environment-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-moi-truong", },
  { faculty: "Khoa Công nghệ Ứng dụng", dean: "TS. Nguyễn Hữu Hùng", image: "/images/pages/discover/leadership/biotechnology-transparent.png" ,
  href: "https://www.vlu.edu.vn/people/search?units=khoa-cong-nghe-ung-dung",},
  { faculty: "Khoa Kỹ thuật Xây dựng", dean: "TS. Nguyễn Hoàng Tùng", image: "/images/pages/discover/leadership/civil-engineering-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-xay-dung", },
  { faculty: "Khoa Kỹ thuật Ô tô", dean: "PGS.TS. Nguyễn Phụ Thượng Lưu", image: "/images/pages/discover/leadership/automotive-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-ky-thuat-o-to", },
  { faculty: "Khoa Quản trị Kinh doanh", dean: "TS. Nguyễn Quỳnh Mai", image: "/images/pages/discover/leadership/business-administration-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-quan-tri-kinh-doanh", },
  { faculty: "Khoa Thương mại", dean: "TS. Ngô Quang Trung", image: "/images/pages/discover/leadership/commerce-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-thuong-mai", },
  { faculty: "Khoa Tài chính - Ngân hàng", dean: "PGS. TS. Nguyễn Tiến Hoàng", image: "/images/pages/discover/leadership/finance-banking-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-tai-chinh-ngan-hang", },
  { faculty: "Khoa Kế toán - Kiểm toán", dean: "TS. Mai Bình Dương", image: "/images/pages/discover/leadership/accounting-auditing-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-ke-toan-kiem-toan", },
  { faculty: "Khoa Du lịch", dean: "TS. Nguyễn Thị Vân", image: "/images/pages/discover/leadership/tourism-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-du-lich", },
  { faculty: "Khoa Luật", dean: "PGS.TS.GVCC. Bùi Anh Thủy", image: "/images/pages/discover/leadership/law-transparent.png",
     href: "https://www.vlu.edu.vn/people/search?units=khoa-luat", },
  { faculty: "Khoa Quan hệ Công chúng và Truyền thông", dean: "TS. Võ Văn Tuấn", image: "/images/pages/discover/leadership/public-relations-communications-transparent.png", 
    href: "https://www.vlu.edu.vn/faculty/khoa-quan-he-cong-chung-va-truyen-thong", },
  { faculty: "Khoa Ngoại ngữ", dean: "GVC.TS. Phan Thế Hưng", image: "/images/pages/discover/leadership/foreign-languages-transparent.png", 
    href: "https://www.vlu.edu.vn/people/search?units=khoa-ngoai-ngu", },
  { faculty: "Khoa Kiến trúc", dean: "TS.KTS. Đỗ Phú Hưng", image: "/images/pages/discover/leadership/architecture-transparent.png", 
    href: "https://www.vlu.edu.vn/people/search?units=khoa-kien-truc", },
  { faculty: "Khoa Mỹ thuật & Thiết kế", dean: "ThS.HS. Phan Quân Dũng", image: "/images/pages/discover/leadership/fine-arts-design-transparent.png", 
    href: "https://www.vlu.edu.vn/people/search?units=khoa-my-thuat-va-thiet-ke", },
  { faculty: "Khoa Logistic và Quản lý Chuỗi Cung ứng", dean: "PGS.TS. Nuyễn Văn Thành", image: "/images/pages/discover/leadership/logistic-transparent.png",
     href: "https://www.vlu.edu.vn/faculty/khoa-ky-thuat-va-quan-ly-cong-nghiep#professors_lectures", },
] as const;

export function LeadershipPage() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      {/* Hero giữ nguyên ngôn ngữ hình ảnh của nhóm trang Discover hiện tại. */}
      <section className={styles.hero} aria-labelledby="leadership-title">
        <Image src="/images/pages/discover/content/campus.jpg" alt="Khuôn viên Trường Đại học Văn Lang" fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTitle}>
          <p>DISCOVER VGG · 03</p>
          <h1 id="leadership-title">Lãnh đạo</h1>
          <span>Leadership</span>
        </div>
      </section>

      {/* Mỗi hồ sơ chỉ gồm tên, chức danh và câu trích dẫn. */}
      <div className={styles.profileList}>
        {leadershipProfiles.map((profile, index) => (
          <section className={styles.leaderProfile} aria-labelledby={`leader-profile-${index}`} key={profile.name}>
            <div className={styles.profileCopy} data-reveal>
              <h2 id={`leader-profile-${index}`}>{profile.name}</h2>
              <p>{profile.title}</p>
              <blockquote>“{profile.quote}”</blockquote>
            </div>
            <figure className={styles.profileImage} data-reveal>
              <Image src={profile.image} alt={`Chân dung ${profile.name}`} fill sizes="(max-width: 900px) 88vw, 46vw" />
            </figure>
          </section>
        ))}
      </div>

      <section className={styles.facultyDirectory} aria-labelledby="postgraduate-faculties-title">
        <div className={styles.facultyHeading} data-reveal>
          <h2 id="postgraduate-faculties-title">Lãnh đạo các khoa & viện</h2>
        </div>
        <div className={styles.facultyGrid}>
          {postgraduateFaculties.map((item) => (
            <article className={styles.facultyCard} data-reveal key={item.faculty}>
              <figure>
                <Image
                  src={item.image}
                  alt={`Lãnh đạo ${item.faculty}`}
                  className={item.image.includes("logistic-") ? styles.logisticImage : undefined}
                  fill
                  sizes="(max-width: 600px) 44vw, 240px"
                />
              </figure>
              <h3>{item.dean}</h3>
              <p>Trưởng Khoa<br />{item.faculty}</p>
              <Link href={item.href}>Đội ngũ của chúng tôi <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <DiscoverMore activeSlug="lanh-dao" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
