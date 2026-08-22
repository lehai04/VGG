import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutIntroduction } from "@/components/sections/AboutIntroduction";
import { VisionMissionPage } from "@/components/sections/VisionMissionPage";
import { LeadershipPage } from "@/components/sections/LeadershipPage";
import { WhyVGGPage } from "@/components/sections/WhyVGGPage";
import { DiscoverMore } from "@/components/sections/DiscoverMore";
import { NextStepCTA } from "@/components/sections/NextStepCTA";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";

// CONTENT MODEL: Nội dung riêng của từng trang con; tất cả cùng dùng template render bên dưới.
const pages = {
  "gioi-thieu": {
    number: "01",
    title: "Giới thiệu",
    en: "About VGG",
    headline: "Một không gian học thuật cho những bước tiến dài.",
    lead: "VGG là nơi tri thức chuyên sâu, thực tiễn nghề nghiệp và tinh thần đổi mới cùng hội tụ trong một trải nghiệm sau đại học lấy người học làm trung tâm.",
    sections: [
      [
        "Học thuật gắn với thực tiễn",
        "Chương trình được xây dựng để người học vừa củng cố nền tảng chuyên môn, vừa phát triển khả năng giải quyết những vấn đề thực tế.",
      ],
      [
        "Cộng đồng cùng tiến bộ",
        "Giảng viên, học viên, cựu học viên và đối tác tạo nên một mạng lưới trao đổi tri thức cởi mở, đa chiều.",
      ],
      [
        "Hành trình tạo tác động",
        "Mỗi trải nghiệm tại VGG hướng đến năng lực chuyển hóa tri thức thành giá trị tích cực cho tổ chức và cộng đồng.",
      ],
    ],
  },
  "tam-nhin-su-menh": {
    number: "02",
    title: "Tầm nhìn & Sứ mệnh",
    en: "Vision & Mission",
    headline: "Tri thức mở lối. Con người dẫn đường.",
    lead: "VGG hướng đến một cộng đồng sau đại học có năng lực học tập suốt đời, tư duy toàn cầu và bản lĩnh kiến tạo thay đổi.",
    sections: [
      [
        "Tầm nhìn",
        "Trở thành môi trường đào tạo sau đại học có sức ảnh hưởng, nơi người học được chuẩn bị để dẫn dắt trong một thế giới liên tục chuyển động.",
      ],
      [
        "Sứ mệnh",
        "Kết nối giáo dục, nghiên cứu và thực tiễn để phát triển năng lực chuyên môn, tư duy phản biện và trách nhiệm cộng đồng.",
      ],
      [
        "Cam kết",
        "Đặt trải nghiệm và sự tiến bộ bền vững của người học làm tiêu chuẩn cho mọi quyết định.",
      ],
    ],
  },
  "lanh-dao": {
    number: "03",
    title: "Lãnh đạo",
    en: "Leadership",
    headline: "Dẫn dắt bằng tầm nhìn và sự thấu hiểu.",
    lead: "Đội ngũ lãnh đạo VGG định hình một môi trường học thuật cởi mở, chuẩn mực và luôn sẵn sàng đổi mới vì người học.",
    sections: [
      [
        "Định hướng học thuật",
        "Bảo đảm chất lượng chuyên môn và khuyến khích những cách tiếp cận mới trong đào tạo, nghiên cứu.",
      ],
      [
        "Kết nối nguồn lực",
        "Mở rộng hợp tác giữa nhà trường, giới chuyên môn, doanh nghiệp và cộng đồng.",
      ],
      [
        "Văn hóa phụng sự",
        "Lắng nghe người học và xây dựng hệ thống hỗ trợ minh bạch, chủ động, hiệu quả.",
      ],
    ],
  },
  "vi-sao-chon-vgg": {
    number: "04",
    title: "Vì sao chọn VGG",
    en: "Why VGG",
    headline: "Một lựa chọn được thiết kế cho tương lai.",
    lead: "Tại VGG, người học không chỉ tiếp nhận kiến thức mà còn phát triển cách tư duy, mạng lưới và sự tự tin để tiến xa hơn.",
    sections: [
      [
        "Chương trình thiết thực",
        "Nội dung chuyên sâu, cập nhật và kết nối chặt chẽ với bối cảnh nghề nghiệp.",
      ],
      [
        "Trải nghiệm linh hoạt",
        "Hành trình học tập được tổ chức để phù hợp với người học đang phát triển sự nghiệp.",
      ],
      [
        "Mạng lưới rộng mở",
        "Cơ hội gặp gỡ chuyên gia, đồng môn và đối tác trong một cộng đồng đa lĩnh vực.",
      ],
    ],
  },
  "xep-hang-thanh-tuu": {
    number: "05",
    title: "Xếp hạng & Thành tựu",
    en: "Recognition & Achievements",
    headline: "Mỗi dấu ấn là một bước tiến chung.",
    lead: "Những kết quả của VGG được tạo nên từ nỗ lực học tập, nghiên cứu và đổi mới bền bỉ của toàn cộng đồng.",
    sections: [
      [
        "Chất lượng đào tạo",
        "Không ngừng hoàn thiện chương trình và trải nghiệm học thuật theo những chuẩn mực rõ ràng.",
      ],
      [
        "Nghiên cứu & đổi mới",
        "Khuyến khích các sáng kiến có khả năng giải quyết vấn đề và tạo ra giá trị thực tiễn.",
      ],
      [
        "Thành tựu người học",
        "Ghi nhận sự trưởng thành nghề nghiệp, đóng góp học thuật và tác động cộng đồng của học viên.",
      ],
    ],
  },
  "lien-he": {
    number: "06",
    title: "Liên hệ",
    en: "Contact VGG",
    headline: "Bắt đầu cuộc trò chuyện cùng VGG.",
    lead: "Dù bạn đang tìm hiểu chương trình, chuẩn bị hồ sơ hay cần hỗ trợ trong hành trình học tập, đội ngũ VGG luôn sẵn sàng lắng nghe.",
    sections: [
      ["Email", "v.sdh@vlu.edu.vn"],
      ["Điện thoại", "028 7101 6869 · 0988 48 68 69"],
      ["Địa chỉ", "Phòng A02.01, Tòa A, 69/68 Đặng Thùy Trâm, P. Bình Lợi Trung, TP.HCM"],
    ],
  },
} as const;

type PageSlug = keyof typeof pages;

/** Build-time: Next tạo sẵn HTML cho từng slug trong `pages`. */
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as PageSlug];
  return page ? { title: `${page.title} | About VGG`, description: page.lead } : {};
}

/**
 * PAGE NHỎ: /discover/[slug]
 * Muốn thêm trang con mới, bổ sung dữ liệu vào `pages` thay vì tạo thêm component/route riêng.
 */
export default async function DiscoverDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as PageSlug];
  if (!page) notFound();
  if (slug === "gioi-thieu") return <AboutIntroduction />;
  // Trang institutional statement có content model/layout riêng; các slug khác vẫn dùng template chung.
  if (slug === "tam-nhin-su-menh") return <VisionMissionPage />;
  if (slug === "lanh-dao") return <LeadershipPage />;
  if (slug === "vi-sao-chon-vgg") return <WhyVGGPage />;
  return (
    <main className="subpage discover-detail" id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />
      <section className="discover-detail-hero">
        <Image
          src="/images/hero/campus-hero.jpg"
          alt="Khuôn viên Trường Đại học Văn Lang"
          fill
          priority
          sizes="100vw"
        />
        <div className="discover-detail-overlay" />
        <div className="discover-detail-title">
          <p>DISCOVER VGG · {page.number}</p>
          <h1>{page.title}</h1>
          <span>{page.en}</span>
        </div>
      </section>
      <nav className="discover-detail-trail">
        <Link href="/">Trang chủ</Link>
        <span>／</span>
        <Link href="/discover">Về VGG</Link>
        <span>／</span>
        <b>{page.title}</b>
      </nav>
      <section className="discover-detail-body">
        <aside>
          <p>DISCOVER VGG</p>
          {Object.entries(pages).map(([key, item]) => (
            <Link className={key === slug ? "active" : ""} href={`/discover/${key}`} key={key}>
              <span>{item.number}</span>
              {item.title}
            </Link>
          ))}
        </aside>
        <article>
          <p className="discover-detail-eyebrow">{page.en.toUpperCase()}</p>
          <h2>{page.headline}</h2>
          <p className="discover-detail-lead">{page.lead}</p>
          <div className="discover-detail-sections">
            {page.sections.map(([title, copy], index) => (
              <section key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </section>
            ))}
          </div>
        </article>
      </section>
      <section className="discover-detail-next">
        <p>TIẾP TỤC KHÁM PHÁ</p>
        <h2>Kiến tạo bước tiến tiếp theo cùng VGG.</h2>
        <Link href="/admissions">
          Tìm hiểu tuyển sinh <span>→</span>
        </Link>
      </section>
      <DiscoverMore activeSlug={slug} />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
