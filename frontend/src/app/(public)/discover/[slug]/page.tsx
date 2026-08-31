import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { notFound, redirect } from "next/navigation";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { VisionMissionPage } from "@/features/discover/components/VisionMissionPage";
import { LeadershipPage } from "@/features/discover/components/LeadershipPage";
import { ContactPage } from "@/features/discover/components/ContactPage";
import { DiscoverSubpageVM } from "@/features/discover/components/DiscoverSubpageVM";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";

// CONTENT MODEL: Nội dung riêng của từng trang con; tất cả cùng dùng template render bên dưới.
const pages = {
  "gioi-thieu": {
    number: "01",
    title: "Giới thiệu",
    en: "About Viện Sau Đại học",
    headline: "Một không gian học thuật cho những bước tiến dài.",
    lead: "Viện Sau Đại học là nơi tri thức chuyên sâu, thực tiễn nghề nghiệp và tinh thần đổi mới cùng hội tụ trong một trải nghiệm sau đại học lấy người học làm trung tâm.",
    sections: [
      [
        "Học thuật gắn với thực tiễn",
        "Chương trình được xây dựng để người học vừa củng cố nền tảng chuyên môn, vừa phát triển khả năng giải quyết những vấn đề thực tế.",
      ],
      [
        "Cộng đồng cùng tiến bộ",
        "Giảng viên, người học, cựu người học và đối tác tạo nên một mạng lưới trao đổi tri thức cởi mở, đa chiều.",
      ],
      [
        "Hành trình tạo tác động",
        "Mỗi trải nghiệm tại Viện Sau Đại học hướng đến năng lực chuyển hóa tri thức thành giá trị tích cực cho tổ chức và cộng đồng.",
      ],
    ],
  },
  "tam-nhin-su-menh": {
    number: "02",
    title: "Tầm nhìn & Sứ mệnh",
    en: "Vision & Mission",
    headline: "Tri thức mở lối. Con người dẫn đường.",
    lead: "Viện Sau Đại học hướng đến một cộng đồng sau đại học có năng lực học tập suốt đời, tư duy toàn cầu và bản lĩnh kiến tạo thay đổi.",
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
    lead: "Đội ngũ lãnh đạo Viện Sau Đại học định hình một môi trường học thuật cởi mở, chuẩn mực và luôn sẵn sàng đổi mới vì người học.",
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
  "xep-hang-thanh-tuu": {
    number: "04",
    title: "Xếp hạng & Thành tựu",
    en: "Recognition & Achievements",
    headline: "Mỗi dấu ấn là một bước tiến chung.",
    lead: "Những kết quả của Viện Sau Đại học được tạo nên từ nỗ lực học tập, nghiên cứu và đổi mới bền bỉ của toàn cộng đồng.",
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
        "Ghi nhận sự trưởng thành nghề nghiệp, đóng góp học thuật và tác động cộng đồng của người học.",
      ],
    ],
  },
  "lien-he": {
    number: "05",
    title: "Liên hệ",
    en: "Contact Viện Sau Đại học",
    headline: "Bắt đầu cuộc trò chuyện cùng Viện Sau Đại học.",
    lead: "Dù bạn đang tìm hiểu chương trình, chuẩn bị hồ sơ hay cần hỗ trợ trong hành trình học tập, đội ngũ Viện Sau Đại học luôn sẵn sàng lắng nghe.",
    sections: [
      ["Điện thoại", "0287 101 6869"],
      ["Hotline/Zalo", "0988 48 6869"],
      ["Email", "tuyensinh.sdh@vlu.edu.vn"],
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
  return page ? { title: `${page.title} | About Viện Sau Đại học`, description: page.lead } : {};
}

/**
 * PAGE NHỎ: /discover/[slug]
 * Muốn thêm trang con mới, bổ sung dữ liệu vào `pages` thay vì tạo thêm component/route riêng.
 */
export default async function DiscoverDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "vi-sao-chon-vgg") redirect("/discover#vi-sao-chon-vgg");
  const page = pages[slug as PageSlug];
  if (!page) notFound();
  if (slug === "gioi-thieu") redirect("/discover");
  // Trang institutional statement có content model/layout riêng.
  if (slug === "tam-nhin-su-menh") return <VisionMissionPage />;
  if (slug === "lanh-dao") return <LeadershipPage />;
  if (slug === "lien-he") return <ContactPage />;
  // Các trang còn lại (xep-hang-thanh-tuu, lien-he) dùng layout editorial VisionMission.
  if (slug === "xep-hang-thanh-tuu") {
    return <DiscoverSubpageVM slug={slug} page={page} />;
  }
  return (
    <main className="subpage discover-detail" id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />
      <section className="discover-detail-hero">
        <Image
          src="/images/pages/discover/content/campus.jpg"
          alt="Khuôn viên Trường Đại học Văn Lang"
          fill
          priority
          sizes="100vw"
        />
        <div className="discover-detail-overlay" />
        <div className="discover-detail-title">
          <p>DISCOVER Viện Sau Đại học · {page.number}</p>
          <h1>{page.title}</h1>
          <span>{page.en}</span>
        </div>
      </section>
      <nav className="discover-detail-trail">
        <Link href="/">Trang chủ</Link>
        <span>／</span>
        <Link href="/discover">Về Viện Sau Đại học</Link>
        <span>／</span>
        <b>{page.title}</b>
      </nav>
      <section className="discover-detail-body">
        <aside>
          <p>DISCOVER Viện Sau Đại học</p>
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
        <h2>Kiến tạo bước tiến tiếp theo cùng Viện Sau Đại học.</h2>
        <Link href="/admissions">
          Tìm hiểu tuyển sinh <span>→</span>
        </Link>
      </section>
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

