import { requestCopy } from "@/i18n/request-copy";
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { ResourcesExplorer } from "./ResourcesExplorer";
import type { ResourceCatalogue } from "../data";
import styles from "./ResourcesLanding.module.css";

export async function ResourcesLanding({ resources, categories, resourceTypes }: ResourceCatalogue) {
  const t = await requestCopy();
  return <main className={styles.page} id="main-content">
    <SiteHeader compact />
    <nav className={styles.breadcrumb} aria-label={t("Đường dẫn")}><Link href="/">{t("Trang chủ")}</Link><span>/</span><b>{t("Tài nguyên")}</b></nav>
    <header data-site-banner className={styles.hero}>
      <Image src="/images/pages/resources/content/banner.jpg" alt="Tài nguyên Viện Sau đại học" fill priority sizes="100vw" />
      <div className={styles.heroShade}/><div data-banner-copy className={styles.heroCopy}><p data-banner-label>RESOURCES</p><h1 data-banner-title>{t("TÀI NGUYÊN")}</h1><span data-banner-description>{t("Tra cứu văn bản, quy định, biểu mẫu và các tài liệu chính thức phục vụ học tập, nghiên cứu và công tác tại Viện Sau đại học.")}</span></div>
    </header>
    <ResourcesExplorer resources={resources} categories={categories} resourceTypes={resourceTypes}/><SiteFooter/>
  </main>;
}
