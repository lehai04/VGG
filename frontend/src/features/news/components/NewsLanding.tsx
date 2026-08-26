import Image from "next/image";
import { ArrowRight, Search, UserRound } from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { categoryLabel, newsCategories, type NewsPost } from "../data";
import styles from "./NewsLanding.module.css";

export function NewsLanding({posts,activeCategory,query}:{posts:NewsPost[];activeCategory?:string;query?:string}){
  const categoryHref=(value?:string)=>{const params=new URLSearchParams();if(value)params.set("category",value);if(query)params.set("q",query);return `/news${params.size?`?${params}`:""}`};
  return <main className={styles.page} id="main-content"><RevealOnScroll/><SiteHeader compact/>
    <nav className={styles.breadcrumb} aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span>/</span><b>Tin tức &amp; Sự kiện</b></nav>
    <header className={styles.hero} data-reveal><Image src="/images/pages/news/content/banner.jpg" alt="Tin tức và sự kiện Viện Sau Đại học" fill priority sizes="100vw"/><div className={styles.heroShade}/><div className={styles.heroCopy}><p>NEWS &amp; EVENTS · VIỆN SAU ĐẠI HỌC</p><h1>TIN TỨC &amp; SỰ KIỆN</h1><span>Nơi cập nhật thông tin tuyển sinh, hoạt động học thuật, đời sống Văn Lang và những kết nối quốc tế mới nhất.</span></div></header>
    <section className={styles.controls} aria-label="Tìm kiếm và lọc tin tức">
      <form action="/vi/news" method="get"><Search/><input type="search" name="q" defaultValue={query} placeholder="Tìm kiếm theo tiêu đề bài viết..."/><button type="submit">Tìm kiếm</button>{activeCategory&&<input type="hidden" name="category" value={activeCategory}/>}</form>
      <nav className={styles.tags} aria-label="Lọc tin theo chuyên mục"><Link className={!activeCategory?styles.activeTag:undefined} href={categoryHref()}>Tất cả</Link>{newsCategories.map((category)=><Link className={activeCategory===category.value?styles.activeTag:undefined} href={categoryHref(category.value)} key={category.value}>{category.label}</Link>)}</nav>
    </section>
    <section className={styles.results} aria-labelledby="news-results"><header><div><p>{activeCategory?categoryLabel(activeCategory):"Tất cả bài viết"}</p><h2 id="news-results">{query?`Kết quả cho “${query}”`:"Bài viết mới nhất"}</h2></div><span>{posts.length} bài viết</span></header>
      {posts.length?<div className={styles.grid}>{posts.map((post)=><Link href={`/news/${post.slug}`} key={post.id} data-reveal><figure><Image src={post.coverImage||"/images/pages/news/content/banner.jpg"} unoptimized={post.coverImage?.startsWith("/uploads/")} alt={post.title} fill sizes="(max-width:760px) 100vw,33vw"/><span>{categoryLabel(post.category)}</span></figure><div className={styles.cardBody}><h3>{post.title}</h3><div className={styles.byline}><UserRound/><b>{post.authorName||post.author?.fullName||"Viện Sau Đại học"}</b><i>·</i><time>{post.publishedAt?new Date(post.publishedAt).toLocaleDateString("vi-VN"):"Mới cập nhật"}</time></div>{post.excerpt&&<p>{post.excerpt}</p>}<b className={styles.readMore}>Đọc bài viết <ArrowRight/></b></div></Link>)}</div>:<div className={styles.empty}><Search/><h3>Không tìm thấy bài viết</h3><p>Hãy thử từ khóa khác hoặc chọn “Tất cả” để xem những nội dung mới nhất.</p><Link href="/news">Xem tất cả bài viết</Link></div>}
    </section>
    <SiteFooter/>
  </main>
}
