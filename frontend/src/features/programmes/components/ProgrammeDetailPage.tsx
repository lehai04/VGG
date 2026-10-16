import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { ArrowRight, ArrowUpRight, MoveRight, Package, Radio, Wallet } from "lucide-react";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { ResourcesConsultation } from "@/features/home/components/ResourcesConsultation";
import { getProgrammeCurricula, getProgrammeDetails } from "@/data/curricula";
import { type Programme, getProgrammeTuition, getProgrammeGraduationRequirements } from "@/data/programmes";
import { logisticsContent as logistics } from "../logistics";
import styles from "./ProgrammeDetailPage.module.css";
import { CareerProspects } from "./CareerProspects";
import { ProgrammeCurriculum } from "./ProgrammeCurriculum";

export function ProgrammeDetailPage({ programme }: { programme: Programme }) {
  if (programme.detailsPending) {
    return (
      <main className={`subpage ${styles.page}`} id="main-content">
        <SiteHeader compact />
        <section className={styles.section} aria-labelledby="programme-title">
          <Link href="/programmes">Chương trình đào tạo</Link>
          <p className={styles.eyebrow}>{programme.degree}</p>
          <h1 id="programme-title">{programme.title}</h1>
          <p>Thông tin chi tiết ngành {programme.title} đang được cập nhật.</p>
          <dl>
            <div><dt>Tín chỉ</dt><dd>{programme.creditsLabel ?? programme.credits}</dd></div>
            <div><dt>Thời gian</dt><dd>{programme.duration}</dd></div>
            <div><dt>Học phí toàn khóa</dt><dd>{getProgrammeTuition(programme)}</dd></div>
          </dl>
        </section>
        <ResourcesConsultation showResources={false} initialProgramme={programme.title} />
        <SiteFooter />
      </main>
    );
  }
  const isLogistics = programme.id === "logistics";
  const details = getProgrammeDetails(programme);
  const curricula = getProgrammeCurricula(programme);
  const careers = isLogistics ? logistics.careers : details.careers.map((text, i) => ({ title: `Hướng phát triển ${i + 1}`, text }));
  const icons = [Package, Radio, Wallet];
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <SiteHeader compact />
      <section className={styles.hero} aria-labelledby="programme-title">
        <Image
          className={styles.heroBackground}
          src={programme.bannerImage || "/images/pages/programmes/content/campus.jpg"}
          alt=""
          fill
          preload
          sizes="100vw"
          style={{ objectPosition: programme.bannerPosition || "center" }}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <nav className={styles.breadcrumb} aria-label="Đường dẫn">
          <Link href="/">Trang chủ</Link><span>/</span><Link href="/programmes">Chương trình đào tạo</Link><span>/</span><span aria-current="page">{isLogistics ? "Logistics" : programme.title}</span>
        </nav>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>VAN LANG GRADUATE · {programme.degree.toUpperCase()}</p>
            <h1 id="programme-title">{isLogistics ? <>Logistics <span>và Quản lý<br />chuỗi cung ứng</span></> : programme.title}</h1>
            <p className={styles.heroLead}>{isLogistics ? logistics.intro : details.intro}</p>
            <a className={styles.primary} href="#chuong-trinh">Khám phá chương trình <ArrowRight size={18} /></a>
          </div>
        </div>
        <dl className={styles.facts}>
          <div><dt>Bậc đào tạo</dt><dd>Thạc sĩ và Tiến sĩ</dd></div>
          <div><dt>Thời gian</dt><dd>{programme.duration}</dd></div>
          <div><dt>Định hướng</dt><dd>{isLogistics ? "Ứng dụng & Nghiên cứu" : programme.orientation}</dd></div>
          <div><dt>Tuyển sinh</dt><dd>{isLogistics ? "Xét tuyển hồ sơ" : programme.intake}</dd></div>
          <div className={styles.tuition}><dt>Học phí toàn khóa</dt><dd>{getProgrammeTuition(programme)}</dd></div>
        </dl>
      </section>
      <nav className={styles.sectionNav} aria-label="Nội dung ngành học">
        <a href="#tong-quan">Tổng quan</a><a href="#nghe-nghiep">Nghề nghiệp</a><a href="#chuong-trinh">Chương trình</a>{isLogistics && <a href="#nghien-cuu">Nghiên cứu</a>}<a href="#tuyen-sinh">Tuyển sinh</a>
      </nav>
      <section id="tong-quan" className={styles.section}>
        <div className={styles.sectionHead}><p className={styles.eyebrow}>01 / KHÁM PHÁ LĨNH VỰC</p><h2>{isLogistics ? "Hiểu dòng chảy. Dẫn dắt kết nối." : "Phát triển chiều sâu chuyên môn."}</h2></div>
        <div className={styles.overview}><p>{isLogistics ? logistics.overview : details.intro}</p><p>{isLogistics ? logistics.explore : details.highlights.join(" ")}</p></div>
        {isLogistics && <>
          <div className={styles.flowGrid}>{logistics.flows.map((flow, i) => { const Icon = icons[i]; return <article key={flow.title}><Icon size={30} strokeWidth={1.4} /><h3>{flow.title}</h3><p>{flow.text}</p></article>; })}</div>
          <div className={styles.questions}><h3>Những bài toán bạn có thể giải quyết</h3><ul>{logistics.problems.map(text => <li key={text}><MoveRight size={18} /><span>{text}</span></li>)}</ul></div>
          <p className={styles.note}>Kết hợp tư duy kinh doanh, phân tích dữ liệu và công nghệ để tối ưu chi phí, duy trì nguồn cung thiết yếu, giảm phát thải và tổ chức thu gom, tái chế hiệu quả.</p>
        </>}
      </section>
      <CareerProspects careers={careers} isLogistics={isLogistics} />
      <ProgrammeCurriculum curricula={curricula} graduationRequirements={getProgrammeGraduationRequirements(programme)} isLogistics={isLogistics} title={programme.title} englishTitle={programme.englishTitle} />
      {isLogistics && <section id="nghien-cuu" className={styles.research} aria-labelledby="research-title">
        <div className={styles.section}><p className={styles.eyebrow}>04 / NGHIÊN CỨU & KẾT NỐI DOANH NGHIỆP</p><p className={styles.faculty}>Khoa Kỹ thuật và Quản lý Công nghiệp</p><h2 id="research-title">{logistics.researchTitle}</h2><p className={styles.researchLead}>{logistics.researchIntro}</p>
          <div className={styles.researchGrid}>{logistics.research.map((item, index) => <article key={item.title}><span className={styles.researchIndex}>TRỤ CỘT {String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          <div className={styles.methods}><h3>Từ phương pháp nghiên cứu đến ứng dụng thực tiễn</h3><p>{logistics.researchMethods}</p></div>
          <div className={styles.conference}><strong>ICLIE</strong><div><h3>Hội nghị Quốc tế về Logistics và Kỹ thuật Hệ thống Công nghiệp</h3><p>{logistics.conferenceIntro}</p><p>{logistics.conferenceAcademic}</p></div></div>
          <div className={styles.enterprise}><h3>Kết nối doanh nghiệp và chuyển giao tri thức</h3><p>{logistics.enterpriseConnection}</p></div>
        </div>
      </section>}
      <section id="tuyen-sinh" className={`${styles.section} ${styles.admissions}`}>
        <div><p className={styles.eyebrow}>BƯỚC TIẾP THEO</p><h2>Bắt đầu hành trình<br />của bạn tại VGG.</h2></div>
        <div><p>{isLogistics ? "Chương trình tuyển sinh theo hình thức xét tuyển hồ sơ. Để tìm hiểu điều kiện dự tuyển, học phí, học bổng và thời gian nhận hồ sơ, hãy trao đổi với đội ngũ tư vấn." : "Liên hệ đội ngũ tư vấn để tìm hiểu điều kiện dự tuyển, học phí và lịch tuyển sinh phù hợp."}</p><a className={styles.primary} href="#consultation">Nhận tư vấn ngành học <ArrowUpRight size={18} /></a><Link className={styles.textLink} href="/admissions">Thông tin tuyển sinh <ArrowRight size={16} /></Link></div>
      </section>
      <ResourcesConsultation showResources={false} initialProgramme={programme.title} />
      <SiteFooter />
    </main>
  );
}
