import Image from "next/image";
import Link from "next/link";
import { discoverSections } from "@/data/site";

/** Section điều hướng About VGG dùng chung cho landing và các trang con Discover. */
export function DiscoverMore({ activeSlug = "gioi-thieu" }: { activeSlug?: string }) {
  return <section className="discover-editorial-more">
    <div className="discover-editorial-more-scene">
      <Image src="/images/hero/campus-hero.jpg" alt="Khuôn viên Văn Lang nhìn qua kiến trúc hiện đại" fill sizes="100vw" />
      <div className="discover-editorial-more-card">
        <h2>Khám phá thêm</h2>
        <p>VGG phát triển từ tinh thần đổi mới của Trường Đại học Văn Lang, kết nối giáo dục, nghiên cứu và thực tiễn để chuẩn bị cho người học năng lực dẫn dắt và đóng góp cho cộng đồng.</p>
        <div><Link href="/discover/lanh-dao">Lãnh đạo VGG</Link><Link href="/discover/gioi-thieu">Câu chuyện của chúng tôi</Link></div>
      </div>
    </div>
    <div className="discover-editorial-more-nav">
      <h2>About VGG</h2>
      <nav aria-label="Khám phá thêm về VGG">
        {discoverSections.map(({ title, slug }) => <Link className={slug === activeSlug ? "active" : ""} href={`/discover/${slug}`} key={slug}>{title}</Link>)}
      </nav>
    </div>
  </section>;
}
