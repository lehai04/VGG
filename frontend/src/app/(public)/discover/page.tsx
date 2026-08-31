/**
 * Landing editorial /discover. Nội dung dài viết trực tiếp tại đây.
 * Menu con (Giới thiệu, Tầm nhìn…) lấy slug từ data/site.ts → /discover/[slug].
 */
import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { WhyChooseSection } from "@/features/discover/components/WhyChooseSection";

export const metadata = {
  title: "Viện Sau Đại học | Về Viện Sau Đại học",
  description: "Khám phá những giá trị làm nên trải nghiệm học tập tại Viện Sau Đại học.",
};

/** PAGE LỚN: About Viện Sau Đại học (/discover). Chỉ nội dung editorial là riêng; layout và data kế thừa. */
export default function DiscoverPage() {
  return (
    <main className="subpage discover-editorial" id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className="discover-editorial-hero">
        <h1>Giới thiệu Viện Sau Đại học</h1>
        <div className="discover-editorial-cover">
          <Image
            src="/images/pages/discover/content/banner.jpg"
            alt="Toàn cảnh khuôn viên Trường Đại học Văn Lang"
            fill
            priority
            sizes="(max-width: 800px) 92vw, 76vw"
          />
        </div>
      </section>

      <WhyChooseSection />

      <section className="discover-editorial-chapter">
        <header className="discover-editorial-chapter-heading">
          <h2>GIÁO DỤC SAU ĐẠI HỌC</h2>
          <Link href="/discover/tam-nhin-su-menh">
            Tầm nhìn và Sứ mệnh <span>↗</span>
          </Link>
          <figure className="discover-editorial-chapter-media">
            <Image
              src="/images/pages/discover/content/1.jpg"
              alt="Người học Văn Lang trong ngày tốt nghiệp"
              fill
              sizes="(max-width: 800px) 88vw, 42vw"
            />
          </figure>
        </header>
        <div className="discover-editorial-chapter-body">
          <p>
            Viện Sau Đại học mang đến cơ hội tiếp cận những ý tưởng lớn, kết nối kiến thức vượt qua ranh giới
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
        </div>
      </section>

      <section className="discover-editorial-chapter">
        <header className="discover-editorial-chapter-heading">
          <h2>NGHIÊN CỨU VÀ ĐỔI MỚI</h2>
          <Link href="/discover/nghien-cuu-doi-moi">
            Khám phá Nghiên cứu & Đổi mới <span>↗</span>
          </Link>
          <figure className="discover-editorial-chapter-media campus-crop">
            <Image
              src="/images/pages/discover/content/2.jpg"
              alt="Cộng đồng học thuật tại khuôn viên Văn Lang"
              fill
              sizes="(max-width: 800px) 88vw, 42vw"
            />
          </figure>
        </header>
        <div className="discover-editorial-chapter-body">
          <p>
            Nghiên cứu là một phần quan trọng trong môi trường học thuật sau đại học.
            Thông qua đề tài nghiên cứu, seminar, hội thảo, công bố khoa học và các hoạt động trao đổi chuyên môn,
            Viện Sau Đại học tạo điều kiện để người học tiếp cận phương pháp nghiên cứu,
            phát triển khả năng đánh giá bằng chứng và tham gia vào quá trình hình thành tri thức mới.
          </p>
          <blockquote>
            Nghiên cứu tạo ra giá trị khi những câu hỏi học thuật có thể mở ra cách hiểu mới và những giải pháp mới cho thực tiễn.
          </blockquote>
          <p>
            Định hướng nghiên cứu của Viện Sau Đại học đồng thời chú trọng đến khả năng kết nối với những vấn đề thực tế của doanh nghiệp, tổ chức và xã hội.
          </p>
        </div>
      </section>

      <section className="discover-editorial-chapter">
        <header className="discover-editorial-chapter-heading">
          <h2>KẾT NỐI HỌC THUẬT VÀ NGHỀ NGHIỆP</h2>
          <Link href="/discover/ket-noi-hoc-thuat-va-nghe-nghiep">
            Khám phá kết nối học thuật và nghề nghiệp <span>↗</span>
          </Link>
          <figure className="discover-editorial-chapter-media">
            <Image
              src="/images/pages/discover/content/3.jpg"
              alt="Không gian học thuật tại Văn Lang"
              fill
              sizes="(max-width: 800px) 88vw, 42vw"
            />
          </figure>
        </header>
        <div className="discover-editorial-chapter-body">
          <p>
            Giáo dục sau đại học không chỉ diễn ra giữa người học và chương trình đào tạo.
            Đó còn là quá trình trao đổi giữa người học với giảng viên, nhà nghiên cứu, chuyên gia,
            nhà quản lý và những người đang hoạt động trong nhiều lĩnh vực khác nhau.
          </p>
          <blockquote>
            Một cộng đồng sau đại học mạnh được hình thành khi tri thức, kinh nghiệm và những góc nhìn khác biệt có cơ hội gặp nhau.
          </blockquote>
          <p>
            Viện Sau Đại học hướng đến xây dựng một môi trường nơi kinh nghiệm nghề nghiệp có thể gặp gỡ tri thức học thuật; nơi những vấn đề từ thực tiễn trở thành chủ đề để phân tích,
            nghiên cứu và thảo luận; và nơi các mối quan hệ học thuật có thể tiếp tục phát triển thành những kết nối nghề nghiệp lâu dài.
          </p>
        </div>
      </section>

      <NextStepCTA />

      <SiteFooter />
    </main>
  );
}
