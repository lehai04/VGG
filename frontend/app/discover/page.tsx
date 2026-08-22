/**
 * Landing editorial /discover. Nội dung dài viết trực tiếp tại đây.
 * Menu con (Giới thiệu, Tầm nhìn…) lấy slug từ data/site.ts → /discover/[slug].
 */
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DiscoverMore } from "@/components/sections/DiscoverMore";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

export const metadata = {
  title: "About VGG | Về VGG",
  description: "Khám phá môi trường học thuật, con người và tinh thần giáo dục của VGG.",
};

/** PAGE LỚN: About VGG (/discover). Chỉ nội dung editorial là riêng; layout và data kế thừa. */
export default function DiscoverPage() {
  return (
    <main className="subpage discover-editorial" id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className="discover-editorial-hero">
        <h1>About VGG</h1>
        <div className="discover-editorial-cover">
          <Image
            src="/images/hero/campus-hero.jpg"
            alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang"
            fill
            priority
            sizes="(max-width: 800px) 92vw, 76vw"
          />
        </div>
      </section>

      <section className="discover-editorial-intro">
        <p>THE VGG SPIRIT</p>
        <h2>Tinh thần khai phóng của VGG</h2>
        <div>
          <p>
            Từ nền tảng của Trường Đại học Văn Lang đến hôm nay, VGG được nuôi dưỡng bởi tinh thần
            cởi mở và niềm tin vào những khả năng mới. Chúng tôi tin giáo dục sau đại học có sứ mệnh
            kiến tạo, chia sẻ tri thức và chuẩn bị cho người học năng lực đóng góp tích cực vào thế
            giới.
          </p>
          <p>
            VGG kết nối nhiều lĩnh vực trong một môi trường học thuật chung, nơi lý thuyết gặp gỡ
            thực tiễn. Chúng tôi khuyến khích những câu hỏi lớn, những cuộc trao đổi thẳng thắn và
            sự tự do trong tư duy — để người học sẵn sàng dẫn dắt bằng hiểu biết và trách nhiệm.
          </p>
        </div>
        <Link href="/discover/gioi-thieu">
          Câu chuyện của VGG <span>→</span>
        </Link>
      </section>

      <section className="discover-editorial-chapter">
        <header className="discover-editorial-chapter-heading">
          <p>VISION · TẦM NHÌN</p>
          <h2>Xuất sắc trong giáo dục đa lĩnh vực</h2>
          <Link href="/discover/tam-nhin-su-menh">
            Tầm nhìn và Sứ mệnh <span>↗</span>
          </Link>
        </header>
        <div className="discover-editorial-chapter-body">
          <p>
            VGG mang đến cơ hội tiếp cận những ý tưởng lớn, kết nối kiến thức vượt qua ranh giới
            ngành và phát triển góc nhìn toàn cầu trong một cộng đồng tôn trọng sự đa dạng của tư
            duy và trải nghiệm.
          </p>
          <blockquote>
            Chúng tôi kết nối chiều sâu học thuật với những vấn đề thực tiễn để mỗi trải nghiệm học
            tập đều có ý nghĩa.
          </blockquote>
          <p>
            Đội ngũ giảng viên và chuyên gia mang đến cho người học nền tảng tri thức, công cụ
            nghiên cứu và những góc nhìn mới để phát triển sự nghiệp, đồng thời hành động có trách
            nhiệm vì lợi ích chung.
          </p>
          <figure>
            <Image
              src="/images/programmers/pic_pro.jpg"
              alt="Học viên Văn Lang trong ngày tốt nghiệp"
              fill
              sizes="(max-width: 800px) 92vw, 52vw"
            />
          </figure>
        </div>
      </section>

      <section className="discover-editorial-chapter">
        <header className="discover-editorial-chapter-heading">
          <p>OPEN MINDS · ĐỐI THOẠI</p>
          <h2>Nuôi dưỡng tư duy cởi mở và đối thoại xây dựng</h2>
          <Link href="/discover/vi-sao-chon-vgg">
            Tại sao chọn VGG? <span>↗</span>
          </Link>
        </header>
        <div className="discover-editorial-chapter-body">
          <p>
            VGG xây dựng một cộng đồng biết lắng nghe với sự tò mò, sẵn sàng xem xét những quan điểm
            khác biệt và cùng tìm kiếm lời giải tốt hơn cho các vấn đề phức tạp.
          </p>
          <blockquote>
            Những thách thức lớn cần con người từ nhiều lĩnh vực và bối cảnh cùng gặp gỡ, trao đổi
            và hành động.
          </blockquote>
          <p>
            Tinh thần đối thoại giúp người học rèn luyện tư duy phản biện, sự đồng cảm và năng lực
            hợp tác — những phẩm chất cần thiết để tạo ảnh hưởng tích cực trong bất kỳ nghề nghiệp
            nào.
          </p>
          <figure className="campus-crop">
            <Image
              src="/images/hero/campus-hero.jpg"
              alt="Cộng đồng học thuật tại khuôn viên Văn Lang"
              fill
              sizes="(max-width: 800px) 92vw, 52vw"
            />
          </figure>
        </div>
      </section>

      <section className="discover-editorial-chapter">
        <header className="discover-editorial-chapter-heading">
          <p>RESEARCH · INNOVATION</p>
          <h2>Nghiên cứu được thúc đẩy bởi đổi mới</h2>
          <Link href="/research">
            Khám phá nghiên cứu tại VGG <span>↗</span>
          </Link>
        </header>
        <div className="discover-editorial-chapter-body">
          <p>
            Môi trường liên ngành giúp giảng viên, học viên và đối tác cùng nhìn một vấn đề từ nhiều
            góc độ. Những cơ hội hợp tác mở ra khả năng tạo nên các giải pháp đột phá và có giá trị
            thực tiễn.
          </p>
          <blockquote>
            Tri thức chỉ thực sự tạo tác động khi được chia sẻ, thử thách và chuyển hóa thành hành
            động.
          </blockquote>
          <p>
            Từ lớp học đến dự án nghiên cứu, VGG khuyến khích người học đưa ý tưởng ra khỏi trang
            giấy, kiểm chứng bằng dữ liệu và kết nối kết quả với nhu cầu của tổ chức, doanh nghiệp
            và cộng đồng.
          </p>
          <figure>
            <Image
              src="/images/hero/campus-hero.jpg"
              alt="Không gian học thuật tại Văn Lang"
              fill
              sizes="(max-width: 800px) 92vw, 52vw"
            />
          </figure>
        </div>
      </section>

      <DiscoverMore />
      <NextStepCTA />

      <SiteFooter />
    </main>
  );
}
