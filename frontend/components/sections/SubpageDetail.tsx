import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { findGroup, sectionSubpages } from "@/data/site";

export function SubpageDetail({ section, slug }: { section: string; slug: string }) {
  const group = findGroup(section);
  const pages = sectionSubpages[section];
  const page = pages?.find((entry) => entry.slug === slug);
  if (!group || !page) notFound();
  const index = pages.indexOf(page);
  return (
    <main className="subpage detail-page" id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />
      <section className="detail-hero">
        <div className="detail-hero-copy">
          <p>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <span>{page.headline}</span>
        </div>
        <div className="detail-hero-media" style={{ backgroundImage: `url('${group.image}')` }} />
        <a className="detail-scroll" href="#overview" aria-label="Xem nội dung"><ArrowDownRight /></a>
      </section>
      <nav className="detail-trail" aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link><span>/</span><Link href={`/${section}`}>{group.vi}</Link><span>/</span><b>{page.title}</b>
      </nav>
      <section className="detail-overview" id="overview" data-reveal>
        <p className="academic-kicker">TỔNG QUAN</p>
        <h2>{page.headline}</h2>
        <div><p>{page.summary}</p><p>VGG kết nối nền tảng học thuật, trải nghiệm thực tiễn và một cộng đồng đa lĩnh vực để mỗi lựa chọn đều dẫn tới giá trị lâu dài.</p></div>
      </section>
      <section className="detail-facts" data-reveal>
        <article><strong>01</strong><h3>Thông tin minh bạch</h3><p>Nội dung được tổ chức mạch lạc để bạn nhanh chóng xác định bước tiếp theo.</p></article>
        <article><strong>02</strong><h3>Trải nghiệm linh hoạt</h3><p>Lộ trình phù hợp với người học đang phát triển chuyên môn và sự nghiệp.</p></article>
        <article><strong>03</strong><h3>Kết nối thực tiễn</h3><p>Tiếp cận giảng viên, chuyên gia, doanh nghiệp và mạng lưới học viên VGG.</p></article>
      </section>
      <section className="detail-quote" data-reveal><p>VGG / PERSPECTIVE</p><blockquote>“Tri thức chỉ thật sự có ý nghĩa khi giúp con người tiến xa hơn và tạo ra thay đổi tích cực.”</blockquote></section>
      <section className="detail-next" data-reveal>
        <div><p>KHÁM PHÁ TIẾP</p><h2>{pages[(index + 1) % pages.length].title}</h2></div>
        <Link href={`/${section}/${pages[(index + 1) % pages.length].slug}`}>Trang tiếp theo <ArrowUpRight /></Link>
      </section>
      {/* Trang con kế thừa nguyên form tư vấn của homepage, chỉ ẩn danh sách tài nguyên. */}
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function subpageMetadata(section: string, slug: string) {
  const page = sectionSubpages[section]?.find((entry) => entry.slug === slug);
  return page ? { title: page.title, description: page.summary } : {};
}
