import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { ResearchHighlights } from "./ResearchHighlights";
import styles from "./ResearchLanding.module.css";

const goals = [
  { title: "Nâng cao chất lượng nghiên cứu", text: "Phát triển năng lực nghiên cứu của giảng viên và người học, gia tăng chất lượng công bố và khả năng tham gia các mạng lưới học thuật." },
  { title: "Chú trọng tính thực tiễn", text: "Khởi xướng các đề tài có khả năng ứng dụng, chuyển giao tri thức và góp phần giải quyết những vấn đề của tổ chức, xã hội và cộng đồng." },
  { title: "Đa dạng và quốc tế hóa", text: "Mở rộng hợp tác với các đối tác trong và ngoài nước thông qua dự án, hội nghị, hội thảo và trao đổi chuyên môn." },
] as const;

const fields = ["Kinh doanh & Quản trị", "Công nghệ & Kỹ thuật", "Môi trường & Phát triển bền vững", "Du lịch & Dịch vụ", "Thiết kế & Truyền thông", "Khoa học xã hội & Nhân văn"] as const;

const experts = [
  {
    name: "PGS.TS. Lê Thị Kim Oanh",
    faculty: "Khoa Môi trường",
    image: "/images/pages/discover/leadership/environment-transparent.png",
  },
  {
    name: "PGS.TS. Phạm Thanh Phong",
    faculty: "Viện Tiên tiến Khoa học và Công nghệ (STAI)",
    image: "/images/pages/research/experts/pham-thanh-phong.png",
  },
  {
    name: "ThS. Trần Công Minh",
    faculty: "Viện Tiên tiến Khoa học và Công nghệ (STAI)",
    image: "/images/pages/research/experts/tran-cong-minh.png",
  },
  {
    name: "TS. Lê Thọ Huệ",
    faculty: "Viện Tiên tiến Khoa học và Công nghệ (STAI)",
    image: "/images/pages/research/experts/le-tho-hue.png",
  },
  {
    name: "TS. Hirobumi Mineo",
    faculty: "Viện Tiên tiến Khoa học và Công nghệ (STAI)",
    image: "/images/pages/research/experts/hirobumi-mineo.png",
  },
  {
    name: "TS. Eibun Senaha",
    faculty: "Viện Tiên tiến Khoa học và Công nghệ (STAI)",
    image: "/images/pages/research/experts/eibun-senaha.png",
  },
  {
    name: "TS. Huỳnh Tấn Lợi",
    faculty: "Khoa Môi trường",
    image: "/images/pages/research/experts/huynh-tan-loi.png",
  },
] as const;

const researchLinks = [
  { label: "Tổng quan", href: "/research" }, { label: "Các cụm nghiên cứu", href: "/research/cum-nghien-cuu" },
  { label: "Dự án nghiên cứu", href: "/research/du-an" }, { label: "Công bố khoa học", href: "/research/cong-bo" },
  { label: "Hội thảo & Sự kiện", href: "/research/hoi-thao" }, { label: "Đổi mới sáng tạo", href: "/research/doi-moi-sang-tao" },
  { label: "Hợp tác doanh nghiệp", href: "/research/hop-tac-doanh-nghiep" },
] as const;

export function ResearchLanding() {
  return (
    <main className={styles.vluResearch} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero}>
        <Image src="/images/pages/research/content/campus.jpg" alt="Không gian nghiên cứu tại Văn Lang" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy} data-reveal>
          <p>RESEARCH &amp; GLOBAL OPPORTUNITIES · VGG</p>
          <h1>Nghiên cứu khoa học<br />&amp; Cơ hội quốc tế</h1>
          <span>VGG phát triển tri thức mới, giải pháp thực tiễn và kết nối người học với các chương trình, đối tác cùng trải nghiệm học thuật trên phạm vi toàn cầu.</span>
        </div>
        <a href="#overview" className={styles.heroDown} aria-label="Xem nội dung"><ArrowDown /></a>
      </section>

      <section className={styles.overview} id="overview" data-reveal>
        <div>
          <p>01 · TỔNG QUAN</p>
          <h2>Đặt nền móng cho những tác động truyền cảm hứng</h2>
          <p>Nền tảng của đổi mới nằm ở những khám phá mới. Thông qua các dự án nghiên cứu mang tính ứng dụng, những ý tưởng tiềm năng được cộng đồng VGG đào sâu để phát triển thành phương pháp, kỹ thuật và giải pháp có thể đóng góp cải thiện xã hội.</p>
        </div>
        <figure><Image src="/images/pages/research/content/academic-leader.avif" alt="Nhà nghiên cứu tại Văn Lang" fill sizes="(max-width: 800px) 100vw, 42vw" /></figure>
      </section>

      <section className={styles.goals} id="goals">
        <header data-reveal>
          <p>02 · ĐỊNH HƯỚNG</p>
          <h2>Mục tiêu nghiên cứu</h2>
          <span>Nghiên cứu tại VGG hướng đến chất lượng học thuật, giá trị ứng dụng và khả năng kết nối cộng đồng tri thức trong nước lẫn quốc tế.</span>
        </header>
        <div>
          {goals.map((goal) => (
            <article key={goal.title} data-reveal>
              <span aria-hidden="true" />
              <h3>{goal.title}</h3>
              <p>{goal.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fields} id="fields">
        <header data-reveal>
          <p>03 · RESEARCH AREAS</p>
          <h2>Lĩnh vực nghiên cứu trọng tâm</h2>
          <span>Cộng đồng VGG tiếp cận các vấn đề từ nhiều lĩnh vực để tạo ra góc nhìn liên ngành và những kết quả có giá trị cho xã hội.</span>
        </header>
        <div className={styles.fieldGrid}>
          {fields.map((field, index) => (
            <Link href={index === 2 ? "/research/doi-moi-sang-tao" : "/research/cum-nghien-cuu"} key={field} data-reveal>
              <Image src={index % 2 ? "/images/pages/research/content/graduates.jpg" : "/images/pages/research/content/campus.jpg"} alt={field} fill sizes="(max-width: 700px) 100vw, 33vw" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{field}</h3>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>

      <ResearchHighlights />

      <section className={styles.experts} id="experts">
        <header data-reveal>
          <div>
            <h2>Các chuyên gia nghiên cứu tại VLU</h2>
            <p>Tìm hiểu các chuyên gia nghiên cứu và dự án khoa học của Văn Lang.</p>
          </div>
          <Link href="https://www.vlu.edu.vn/research">Tìm hiểu thêm <ArrowUpRight /></Link>
        </header>
        <div>
          {experts.map((expert) => (
            <article key={expert.name} data-reveal>
              <figure>
                <Image
                  src={expert.image}
                  alt={`Chân dung ${expert.name}`}
                  className={expert.image.includes("pham-thanh-phong") ? styles.expertImageCompact : undefined}
                  fill
                  sizes="(max-width: 700px) 100vw, 320px"
                />
              </figure>
              <h3>{expert.name}</h3>
              <p>{expert.faculty}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.partners}>
        <div className={styles.partnerLead} data-reveal>
          <p>06 · HỢP TÁC</p>
          <h2>Các đối tác nghiên cứu</h2>
          <span>VGG mở rộng quan hệ hợp tác để kết nối nguồn lực học thuật, kinh nghiệm thực tiễn và cơ hội chuyển giao tri thức.</span>
        </div>
        <div className={styles.partnerCards}>
          <article>
            <h3>Đối tác học thuật</h3>
            <p>Các trường đại học, viện nghiên cứu và cộng đồng chuyên gia cùng phát triển đề tài, hội thảo và hoạt động trao đổi học thuật.</p>
          </article>
          <article>
            <h3>Đối tác doanh nghiệp</h3>
            <p>Doanh nghiệp đồng hành trong việc xác định vấn đề thực tiễn, hỗ trợ dự án và đưa các kết quả có tiềm năng đến gần hơn với ứng dụng.</p>
          </article>
        </div>
      </section>

      <section className={styles.industryNetwork} aria-labelledby="industry-network-title">
        <div className={styles.industryRedRail} aria-hidden="true" />
        <figure className={styles.industryPhoto} data-reveal>
          <Image src="/images/pages/research/content/graduates.jpg" alt="Người học VGG kết nối với chuyên gia và doanh nghiệp" fill sizes="(max-width: 800px) 100vw, 34vw" />
          <figcaption>Chương trình đào tạo<br />đảm bảo tính thực tiễn cao</figcaption>
        </figure>
        <div className={styles.industryContent} data-reveal>
          <header>
            <strong>700+</strong>
            <div>
              <h2 id="industry-network-title">Đối tác doanh nghiệp hàng đầu Việt Nam &amp; Thế giới</h2>
              <p>Đến từ hơn 30 quốc gia và toàn cầu</p>
            </div>
          </header>
          <p className={styles.industryLead}>Chương trình đảm bảo bám sát với thực tế và tương lai của công việc, có tính ứng dụng cao.</p>
          <figure className={styles.partnerLogoBoard}>
            <Image
              src="/images/pages/research/content/partner-logos.png"
              alt="Logo các đối tác doanh nghiệp thuộc nhiều lĩnh vực của VGG"
              width={832}
              height={800}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          </figure>
        </div>
      </section>

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function ResearchGateway({ activeHref = "/research" }: { activeHref?: string }) {
  return <section className={styles.admissionGateway} aria-labelledby="research-admission-title"><div className={styles.admissionScene}><Image src="/images/pages/research/content/campus.jpg" alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang" fill sizes="100vw" /><div className={styles.admissionCard} data-reveal><h2>Khám phá thêm</h2><p>Tìm hiểu các cụm nghiên cứu, dự án, công bố khoa học và hoạt động đổi mới để kết nối sâu hơn với hệ sinh thái nghiên cứu của VGG.</p><div><Link href="/research/cum-nghien-cuu">Các cụm nghiên cứu</Link><Link href="/research/du-an">Dự án nghiên cứu</Link></div></div></div><div className={styles.admissionNav}><h2 id="research-admission-title">Nghiên cứu &amp; Đổi mới</h2><nav aria-label="Điều hướng Nghiên cứu và Đổi mới">{researchLinks.map((item) => <Link className={item.href === activeHref ? styles.activeAdmissionLink : undefined} href={item.href} key={item.href}>{item.label}</Link>)}</nav></div></section>;
}
