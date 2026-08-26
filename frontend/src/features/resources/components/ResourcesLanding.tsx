import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { ResourcesExplorer } from "./ResourcesExplorer";
import type { PublicResource } from "../data";
import styles from "./ResourcesLanding.module.css";

export function ResourcesLanding({ resources }: { resources: PublicResource[] }) {
  return <main className={styles.page} id="main-content">
    <SiteHeader compact />
    <nav className={styles.breadcrumb} aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span>/</span><b>Tài nguyên</b></nav>
    <header className={styles.hero}>
      <Image src="/images/pages/resources/content/banner.jpg" alt="Tài nguyên Viện Sau Đại học" fill priority sizes="100vw" />
      <div className={styles.heroShade}/><div className={styles.heroCopy}><p>RESOURCES · VIỆN SAU ĐẠI HỌC</p><h1>TÀI NGUYÊN</h1><span>Tra cứu văn bản, quy định, biểu mẫu và các tài liệu chính thức phục vụ học tập, nghiên cứu và công tác tại Viện Sau Đại học.</span></div>
    </header>
    <ResourcesExplorer resources={resources}/><SiteFooter/>
  </main>;
}
