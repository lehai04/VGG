"use client";

import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { useLocale } from "@/i18n/components/LocaleProvider";
import { findGroup, subpageHref } from "@/data/site";

const admissions = findGroup("admissions")!;

export function AdmissionsMore({ activeIndex = -1 }: { activeIndex?: number }) {
  const { locale } = useLocale();
  const labels = locale === "en" ? admissions.itemsEn : admissions.items;

  return (
    <section className="discover-editorial-more" aria-labelledby="admissions-more-title">
      <div className="discover-editorial-more-scene">
        <Image
          src="/images/pages/admissions/content/campus.jpg"
          alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang"
          fill
          sizes="100vw"
        />
        <div className="discover-editorial-more-card">
          <h2 id="admissions-more-title">{locale === "en" ? "Explore more" : "Khám phá thêm"}</h2>
          <p>
            {locale === "en"
              ? "Find admissions requirements, tuition, scholarships and every milestone needed to prepare a clear application journey with Viện Sau Đại học."
              : "Tìm hiểu điều kiện dự tuyển, học phí, học bổng và các mốc quan trọng để chủ động chuẩn bị một hành trình hồ sơ rõ ràng cùng Viện Sau Đại học."}
          </p>
          <div>
            <Link href={subpageHref("admissions", 0)}>{labels[0]}</Link>
            <Link href={subpageHref("admissions", 2)}>{labels[2]}</Link>
          </div>
        </div>
      </div>

      <div className="discover-editorial-more-nav">
        <h2>{locale === "en" ? "Viện Sau Đại học Admissions" : "Tuyển sinh Viện Sau Đại học"}</h2>
        <nav aria-label={locale === "en" ? "Admissions pages" : "Các trang tuyển sinh"}>
          <Link className={activeIndex === -1 ? "active" : ""} href="/admissions">
            {locale === "en" ? "Overview" : "Tổng quan"}
          </Link>
          {labels.map((label, index) => (
            <Link className={activeIndex === index ? "active" : ""} href={subpageHref("admissions", index)} key={label}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
