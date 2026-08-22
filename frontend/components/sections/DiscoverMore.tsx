"use client";

import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import { discoverSections } from "@/data/site";
import { useLocale } from "@/components/i18n/LocaleProvider";

/** Section điều hướng About VGG dùng chung cho landing và các trang con Discover. */
export function DiscoverMore({ activeSlug = "gioi-thieu" }: { activeSlug?: string }) {
  const { locale, messages } = useLocale();
  return <section className="discover-editorial-more">
    <div className="discover-editorial-more-scene">
      <Image src="/images/hero/campus-hero.jpg" alt="Khuôn viên Văn Lang nhìn qua kiến trúc hiện đại" fill sizes="100vw" />
      <div className="discover-editorial-more-card">
        <h2>{messages.common.discoverMore}</h2>
        <p>{locale === "en" ? "VGG builds on Van Lang University's spirit of innovation, connecting education, research, and practice to prepare learners to lead and contribute to their communities." : "VGG phát triển từ tinh thần đổi mới của Trường Đại học Văn Lang, kết nối giáo dục, nghiên cứu và thực tiễn để chuẩn bị cho người học năng lực dẫn dắt và đóng góp cho cộng đồng."}</p>
        <div><Link href="/discover/lanh-dao">{locale === "en" ? "VGG Leadership" : "Lãnh đạo VGG"}</Link><Link href="/discover/gioi-thieu">{locale === "en" ? "Our story" : "Câu chuyện của chúng tôi"}</Link></div>
      </div>
    </div>
    <div className="discover-editorial-more-nav">
      <h2>About VGG</h2>
      <nav aria-label={messages.common.discoverMore}>
        {discoverSections.map(({ title, slug }) => <Link className={slug === activeSlug ? "active" : ""} href={`/discover/${slug}`} key={slug}>{locale === "en" ? messages.discover[slug] : title}</Link>)}
      </nav>
    </div>
  </section>;
}
