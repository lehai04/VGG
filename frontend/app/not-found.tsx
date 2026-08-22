"use client";

import Link from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/LocaleProvider";

/** Giao diện 404. Next tự render khi notFound() được gọi hoặc URL không khớp route. */
export default function NotFound() {
  const { locale } = useLocale();
  return (
    <main className="not-found" id="main-content">
      <p className="eyebrow">404 · {locale === "en" ? "NOT FOUND" : "KHÔNG TÌM THẤY"}</p>
      <h1>{locale === "en" ? "The page you are looking for does not exist." : "Trang bạn tìm kiếm không tồn tại."}</h1>
      <p>{locale === "en" ? "The URL may have changed or the content has not been published." : "Đường dẫn có thể đã thay đổi hoặc nội dung chưa được xuất bản."}</p>
      <Link className="button coral vgg-cta-pill" href="/">
        {locale === "en" ? "Back to homepage →" : "Về trang chủ →"}
      </Link>
    </main>
  );
}

