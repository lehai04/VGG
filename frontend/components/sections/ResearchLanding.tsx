import Link from "@/components/i18n/LocalizedLink";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { ResearchAreas } from "./ResearchAreas";
import { NextStepCTA } from "./NextStepCTA";
import styles from "./ResearchLanding.module.css";

const themes = [
  { number:"01", title:"Kinh doanh bền vững", description:"Quản trị, kinh tế và các mô hình tạo giá trị dài hạn.", href:"/research/cum-nghien-cuu" },
  { number:"02", title:"Công nghệ vì con người", description:"Dữ liệu, AI và kỹ thuật phục vụ đời sống đô thị.", href:"/research/doi-moi-sang-tao" },
  { number:"03", title:"Sáng tạo & văn hóa", description:"Thiết kế, truyền thông và bản sắc Việt trong bối cảnh toàn cầu.", href:"/research/cum-nghien-cuu" },
] as const;
const navigation = [
  ["Các cụm nghiên cứu","/research/cum-nghien-cuu"], ["Dự án nghiên cứu","/research/du-an"], ["Công bố khoa học","/research/cong-bo"],
  ["Hội thảo & Sự kiện khoa học","/research/hoi-thao"], ["Đổi mới sáng tạo","/research/doi-moi-sang-tao"], ["Hợp tác doanh nghiệp","/research/hop-tac-doanh-nghiep"],
] as const;

export function ResearchLanding() {
  return <main className={styles.page} id="main-content">
    <RevealOnScroll /><SiteHeader compact />
    <section className={styles.hero}>
      <div className={styles.heroImage} role="img" aria-label="Không gian nghiên cứu và hợp tác học thuật" />
      <div className={styles.heroCopy} data-reveal><p>RESEARCH &amp; INNOVATION / VGG</p><h1>Tri thức tạo nên<br /><em>tác động.</em></h1><span>VGG kết nối học giả, người học, doanh nghiệp và cộng đồng để biến nghiên cứu thành lời giải có ích cho xã hội.</span></div>
      <a className={styles.scroll} href="#research-approach" aria-label="Khám phá nghiên cứu"><ArrowDownRight /></a>
    </section>
    <section className={styles.approach} id="research-approach" data-reveal>
      <p className={styles.kicker}>01 — OUR APPROACH</p><h2>Nghiên cứu để tạo ra những thay đổi <em>có ý nghĩa.</em></h2>
      <p>Những câu hỏi lớn cần những góc nhìn liên ngành. VGG kết nối học giả, người học, doanh nghiệp và cộng đồng để biến nghiên cứu thành lời giải có ích cho xã hội.</p>
    </section>
    <section className={styles.areas} id="research-themes">
      <header data-reveal><p className={styles.kicker}>02 — RESEARCH AREAS</p><h2>Hướng nghiên cứu<br />trọng điểm.</h2></header><ResearchAreas items={themes} />
    </section>
    <section className={styles.feature} data-reveal>
      <div className={styles.featureImage}><span>VGG RESEARCH / 2026</span></div>
      <div className={styles.featureCopy}><p className={styles.kicker}>03 — RESEARCH IN MOTION</p><h2>Từ phòng học<br />đến <em>đời sống.</em></h2><p>Nghiên cứu tốt không chỉ được công bố; nó mở ra đối thoại, thay đổi cách làm và tạo những kết nối mới.</p><Link href="/research/du-an">Khám phá nghiên cứu <ArrowUpRight /></Link></div>
    </section>
    <section className={styles.impact} data-reveal>
      <p className={styles.kicker}>04 — REAL-WORLD IMPACT</p><div><h2>Tri thức đi xa<br />khi tạo được<br /><em>tác động thực tiễn.</em></h2><p>VGG kết nối nhà khoa học, doanh nghiệp và cộng đồng để kiến tạo các giải pháp có giá trị.</p></div>
    </section>
    <section className={styles.navigation}>
      <header data-reveal><p className={styles.kicker}>05 — EXPLORE RESEARCH</p><h2>Khám phá Research.</h2></header>
      <nav aria-label="Điều hướng nghiên cứu">{navigation.map(([title,href],index)=><Link href={href} key={href} data-reveal><span>{String(index+1).padStart(2,"0")}</span><strong>{title}</strong><ArrowUpRight /></Link>)}</nav>
    </section>
    <section className={styles.cta} data-reveal><p>HỢP TÁC NGHIÊN CỨU</p><h2>Cùng mở rộng<br />biên giới tri thức.</h2><Link className="vgg-cta-pill" href="/discover/lien-he">Trao đổi với chúng tôi <ArrowUpRight /></Link></section>
    <NextStepCTA />
    <SiteFooter />
  </main>;
}

