import Image from "next/image";
import { ArrowDown, ArrowUpRight, CircleCheck } from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import { programmes } from "@/data/programmes";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import styles from "./MasterProgrammesPage.module.css";

type PageConfig = {
  variant: "doctoral" | "international";
  eyebrow: string;
  title: string;
  stats: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overview: readonly [string, string];
  quote: string;
  quoteBy: string;
  quoteRole: string;
  whyTitle: string;
  whyLead: string;
  benefits: readonly { title: string; text: string }[];
  directoryEyebrow: string;
  directoryTitle: string;
  groups: readonly { title: string; items: readonly { label: string; href: string }[] }[];
};

const doctoral = programmes.filter((programme) => programme.degree === "Tiến sĩ");

const doctoralConfig: PageConfig = {
  variant: "doctoral",
  eyebrow: "Viện Sau Đại học · DOCTORAL PROGRAMMES",
  title: "Chương trình Tiến sĩ",
  stats: "01 chương trình · Định hướng nghiên cứu · 36–48 tháng",
  overviewEyebrow: "CHƯƠNG TRÌNH TIẾN SĨ · TIẾNG VIỆT",
  overviewTitle: "Kiến tạo tri thức mới.",
  overview: [
    "Chương trình Tiến sĩ tại Văn Lang được xây dựng cho các nhà nghiên cứu muốn phát triển chuyên môn ở chiều sâu, làm chủ phương pháp khoa học và tạo ra những đóng góp có giá trị cho cộng đồng.",
    "Viện Sau Đại học hiện triển khai chương trình Tiến sĩ Khoa học Môi trường với lộ trình nghiên cứu chuyên sâu, kết nối đội ngũ giảng viên giàu kinh nghiệm và hệ sinh thái học thuật đa ngành.",
  ],
  quote:
    "Văn Lang mang đến cho nghiên cứu sinh một môi trường học thuật định hướng nghiên cứu, nơi nền tảng chuyên môn, năng lực công bố và khả năng tạo ra giải pháp bền vững được phát triển song hành.",
  quoteBy: "Ban lãnh đạo Viện Sau Đại học",
  quoteRole: "Viện Sau đại học · Trường Đại học Văn Lang",
  whyTitle: "Tại sao nên chọn chương trình Tiến sĩ tại Viện Sau Đại học?",
  whyLead:
    "Một môi trường nghiên cứu được thiết kế để nghiên cứu sinh phát triển năng lực học thuật và theo đuổi những vấn đề có ý nghĩa lâu dài.",
  benefits: [
    {
      title: "Chính sách hỗ trợ tài chính ưu việt",
      text: "Các chính sách học phí và hỗ trợ nghiên cứu giúp nghiên cứu sinh chủ động hơn trong quá trình thực hiện luận án và công bố khoa học.",
    },
    {
      title: "Điều kiện học tập thuận lợi",
      text: "Môi trường học thuật và cơ sở nghiên cứu hỗ trợ nghiên cứu sinh hoàn thành chuẩn đầu ra của chương trình.",
    },
    {
      title: "Đội ngũ giảng viên",
      text: "Nghiên cứu sinh được đồng hành bởi đội ngũ giảng viên có chuyên môn sâu và kinh nghiệm nghiên cứu trong lĩnh vực môi trường.",
    },
    {
      title: "Hợp tác nghiên cứu trong và ngoài nước",
      text: "Các hoạt động học thuật mở rộng cơ hội kết nối, trao đổi và phát triển những hướng nghiên cứu có giá trị ứng dụng.",
    },
  ],
  directoryEyebrow: "NGÀNH ĐÀO TẠO",
  directoryTitle: "Khám phá chương trình Tiến sĩ",
  groups: [
    {
      title: "Kỹ thuật, Môi trường & Công nghệ",
      items: doctoral.map((programme) => ({
        label: programme.title,
        href: `/programmes/${programme.id}`,
      })),
    },
  ],
};

const internationalConfig: PageConfig = {
  variant: "international",
  eyebrow: "Viện Sau Đại học · INTERNATIONAL PROGRAMMES",
  title: "Chương trình Quốc tế",
  stats: "Kết nối toàn cầu · Trải nghiệm đa văn hóa · Chuẩn học thuật quốc tế",
  overviewEyebrow: "CHƯƠNG TRÌNH QUỐC TẾ",
  overviewTitle: "Mở rộng biên giới học thuật.",
  overview: [
    "Chương trình Quốc tế tại Viện Sau Đại học mở rộng trải nghiệm sau đại học thông qua môi trường học thuật đa văn hóa, hoạt động trao đổi tri thức và kết nối với mạng lưới chuyên gia quốc tế.",
    "Các cơ hội được định hướng nhằm giúp người học nâng cao năng lực chuyên môn, khả năng làm việc trong bối cảnh toàn cầu và tư duy thích ứng trước những thay đổi của nghề nghiệp.",
  ],
  quote:
    "Trải nghiệm quốc tế không chỉ là dịch chuyển giữa các quốc gia, mà là khả năng đối thoại với nhiều hệ tri thức, cộng tác vượt qua khác biệt và tạo ra giá trị trong một thế giới kết nối.",
  quoteBy: "Ban lãnh đạo Viện Sau Đại học",
  quoteRole: "Viện Sau đại học · Trường Đại học Văn Lang",
  whyTitle: "Tại sao nên chọn chương trình Quốc tế tại Viện Sau Đại học?",
  whyLead:
    "Một hành trình học thuật giúp người học mở rộng góc nhìn, mạng lưới chuyên môn và năng lực làm việc trong môi trường toàn cầu.",
  benefits: [
    {
      title: "Môi trường học thuật quốc tế",
      text: "Tiếp cận các góc nhìn đa chiều và chuẩn mực học thuật phù hợp với bối cảnh nghề nghiệp toàn cầu.",
    },
    {
      title: "Lộ trình học tập linh hoạt",
      text: "Các hoạt động được tổ chức để người học có thể kết hợp phát triển chuyên môn với công việc hiện tại.",
    },
    {
      title: "Kết nối chuyên gia",
      text: "Mở rộng cơ hội trao đổi với giảng viên, chuyên gia và cộng đồng học thuật trong và ngoài nước.",
    },
    {
      title: "Năng lực hội nhập",
      text: "Phát triển tư duy liên văn hóa, khả năng cộng tác và giải quyết vấn đề trong môi trường đa quốc gia.",
    },
  ],
  directoryEyebrow: "CƠ HỘI HỌC TẬP",
  directoryTitle: "Khám phá hành trình quốc tế",
  groups: [
    {
      title: "Đào tạo & học thuật",
      items: [
        { label: "Chương trình liên kết quốc tế", href: "/programmes/quoc-te" },
        { label: "Học phần và chuyên đề quốc tế", href: "/programmes/quoc-te" },
      ],
    },
    {
      title: "Trao đổi & kết nối",
      items: [
        { label: "Trao đổi học thuật", href: "/global/trao-doi-hoc-thuat" },
        { label: "Mạng lưới đối tác", href: "/global/doi-tac-quoc-te" },
      ],
    },
  ],
};

function SpecialProgrammesPage({ config }: { config: PageConfig }) {
  return (
    <main
      className={`${styles.page} ${config.variant === "doctoral" ? styles.doctoral : ""}`}
      id="main-content"
    >
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="special-programme-title">
        <Image
          src="/images/pages/programmes/content/graduates.jpg"
          alt={config.title}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p>{config.eyebrow}</p>
          <h1 id="special-programme-title">{config.title}</h1>
          <span>{config.stats}</span>
        </div>
        <a className={styles.scroll} href="#special-overview" aria-label="Xem tổng quan">
          <ArrowDown />
        </a>
      </section>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <Link href="/programmes">Chương trình đào tạo</Link>
        <span>/</span>
        <strong>{config.title}</strong>
      </nav>

      <section className={styles.overview} id="special-overview" data-reveal>
        <div className={styles.overviewCopy}>
          <p className={styles.eyebrow}>{config.overviewEyebrow}</p>
          <h2>{config.overviewTitle}</h2>
          <div className={styles.overviewText}>
            {config.overview.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
        <div className={styles.overviewMedia}>
          <Image
            src="/images/pages/programmes/content/campus.jpg"
            alt="Không gian đào tạo và nghiên cứu tại Văn Lang"
            fill
            sizes="(max-width: 950px) 100vw, 44vw"
          />
          <span>Viện Sau Đại học · KNOWLEDGE WITHOUT BORDERS</span>
        </div>
      </section>

      <section className={`${styles.leadershipQuote} ${styles.quoteImageRight}`} data-reveal>
        <div className={styles.quoteCopy}>
          <span aria-hidden="true">“</span>
          <blockquote>{config.quote}</blockquote>
          <p>
            <strong>{config.quoteBy}</strong>
            <small>{config.quoteRole}</small>
          </p>
        </div>
        <div className={styles.quotePortrait}>
          <Image
            src="/images/pages/programmes/content/academic-leader.avif"
            alt="Đại diện lãnh đạo học thuật Viện Sau Đại học"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
      </section>

      <section className={styles.why} aria-labelledby="special-why-title">
        <header data-reveal>
          <h2 id="special-why-title">{config.whyTitle}</h2>
          <p>{config.whyLead}</p>
        </header>
        <div className={styles.benefits}>
          {config.benefits.map((benefit) => (
            <article key={benefit.title} data-reveal>
              <CircleCheck aria-hidden="true" />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.directory} aria-labelledby="special-directory-title">
        <header data-reveal>
          <p className={styles.eyebrow}>{config.directoryEyebrow}</p>
          <h2 id="special-directory-title">{config.directoryTitle}</h2>
        </header>
        <div className={styles.fieldGroups}>
          {config.groups.map((group, groupIndex) => (
            <section key={group.title} data-reveal>
              <header>
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
              </header>
              <div>
                {group.items.map((item) => (
                  <Link href={item.href} key={item.label}>
                    {item.label}
                    <ArrowUpRight />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        <Link className={styles.allProgrammes} href="/programmes">
          Xem tất cả chương trình <ArrowUpRight />
        </Link>
      </section>

      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}

export function DoctoralProgrammesPage() {
  return <SpecialProgrammesPage config={doctoralConfig} />;
}

export function InternationalProgrammesPage() {
  return <SpecialProgrammesPage config={internationalConfig} />;
}
