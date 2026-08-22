import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { findGroup, subpageHref } from "@/data/site";
import styles from "./AdmissionsPage.module.css";

const group = findGroup("admissions")!;
export const metadata = { title: group.vi, description: group.intro };

export default function AdmissionsPage() {
  return <main className={`subpage ${styles.page}`} id="main-content">
    <RevealOnScroll /><SiteHeader compact />
    <section className={styles.hero}>
      <div className={styles.heroImage} style={{ backgroundImage: `url('${group.image}')` }} /><div className={styles.heroShade} />
      <div className={styles.heroCopy}><p>{group.en} / 2026</p><h1>{group.vi}</h1><span>{group.kicker}</span></div>
      <a className={styles.scrollCue} href="#admissions-overview" aria-label="Xem tổng quan"><ArrowDownRight /></a>
    </section>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Trang chủ</Link><span>/</span><b>{group.vi}</b></nav>
    <section className={styles.intro} id="admissions-overview" data-reveal>
      <p className={styles.kicker}>01 — ADMISSIONS</p><h2>{group.headline}</h2>
      <div className={styles.introText}><p>{group.intro}</p><Link href={subpageHref("admissions",6)}>Đặt lịch tư vấn <ArrowUpRight /></Link></div>
    </section>
    <section className={styles.pathways} aria-labelledby="pathways-title">
      <div className={styles.sectionHeading} data-reveal><p className={styles.kicker}>02 — YOUR PATH TO VGG</p><h2 id="pathways-title">Mọi thông tin bạn cần,<br />trong một hành trình rõ ràng.</h2></div>
      <div className={styles.grid}>{group.items.map((item,index)=><Link className={styles.card} href={subpageHref("admissions",index)} key={item} data-reveal><span>{String(index+1).padStart(2,"0")}</span><h3>{item}</h3><ArrowUpRight className={styles.cardArrow}/></Link>)}</div>
    </section>
    <section className={styles.feature} data-reveal>
      <div className={styles.featureLabel}><span>VGG PERSPECTIVE</span><b>2026</b></div>
      <div className={styles.featureBody}><h2>Chuẩn quốc tế.<br />Lấy người học<br />làm trung tâm.</h2><blockquote>“Mỗi chương trình, dịch vụ và trải nghiệm tại VGG đều được thiết kế để người học tiến xa hơn trong chuyên môn và tạo giá trị cho cộng đồng.”</blockquote></div>
    </section>
    <NextStepCTA />
    <SiteFooter />
  </main>;
}
