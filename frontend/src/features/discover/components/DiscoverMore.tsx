"use client";

import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { discoverSections } from "@/data/site";
import { useLocale } from "@/i18n/components/LocaleProvider";

/** Section điều hướng About Viện Sau Đại học dùng chung cho landing và các trang con Discover. */
export function DiscoverMore({ activeSlug = "gioi-thieu" }: { activeSlug?: string }) {
  const { locale, messages } = useLocale();
  return <section className="discover-editorial-more">
    <div className="discover-editorial-more-scene">
      <Image src="/images/pages/discover/content/campus.jpg" alt="Khuôn viên Văn Lang nhìn qua kiến trúc hiện đại" fill sizes="100vw" />
      <div className="discover-editorial-more-card">
        <h2>{messages.common.discoverMore}</h2>
        <p>{locale === "en" ? "Viện Sau Đại học builds on Van Lang University's spirit of innovation, connecting education, research, and practice to prepare learners to lead and contribute to their communities." : "Viện Sau Đại học phát triển từ tinh thần đổi mới của Trường Đại học Văn Lang, kết nối giáo dục, nghiên cứu và thực tiễn để chuẩn bị cho người học năng lực dẫn dắt và đóng góp cho cộng đồng."}</p>
        <div><Link href="/discover/lanh-dao">{locale === "en" ? "Viện Sau Đại học Leadership" : "Lãnh đạo Viện Sau Đại học"}</Link><Link href="/discover">{locale === "en" ? "Introduction" : "Giới thiệu"}</Link></div>
      </div>
    </div>
    <div className="discover-editorial-more-nav">
      <h2>{locale === "en" ? "About Graduate School" : "Về Viện Sau Đại học"}</h2>
      <nav aria-label={messages.common.discoverMore}>
        {discoverSections.map(({ title, slug }) => {
          const href = slug === "gioi-thieu" ? "/discover" : `/discover/${slug}`;
          return (
            <Link
              className={slug === activeSlug ? "active" : ""}
              href={href}
              key={slug}
            >
              {locale === "en" ? messages.discover[slug] : title}
            </Link>
          );
        })}
      </nav>
    </div>
  </section>;
}
