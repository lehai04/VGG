import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProgrammeFinder } from "@/components/sections/ProgrammeFinder";

export const pathways = [
  {
    index: "01",
    degree: "Master's",
    title: "Chương trình Thạc sĩ",
    description:
      "Phát triển năng lực chuyên môn, tư duy lãnh đạo và khả năng giải quyết những thách thức thực tiễn.",
    meta: "18 chương trình · Định hướng ứng dụng & nghiên cứu",
  },
  {
    index: "02",
    degree: "Doctoral",
    title: "Chương trình Tiến sĩ",
    description:
      "Theo đuổi nghiên cứu chuyên sâu trong một hệ sinh thái kết nối học thuật, doanh nghiệp và cộng đồng.",
    meta: "01 chương trình · Môi trường nghiên cứu liên ngành",
  },
  {
    index: "03",
    degree: "Global & Executive",
    title: "Chương trình Quốc tế",
    description:
      "Mở rộng góc nhìn toàn cầu qua trải nghiệm học tập linh hoạt và mạng lưới đối tác quốc tế.",
    meta: "Lộ trình linh hoạt · Kết nối toàn cầu",
  },
] as const;

export const masterFields = [
  {
    code: "EET",
    title: "Kỹ thuật, Môi trường & Công nghệ",
    english: "Engineering, Environment & Technology",
    image: null as string | null,
    programmes: [
      "Kỹ thuật Xây dựng",
      "Kỹ thuật ô tô",
      "Công nghệ Sinh học",
      "Kỹ thuật Môi trường",
      "Quản lý Tài nguyên và Môi trường",
    ],
  },
  {
    code: "BM",
    title: "Kinh doanh & Quản lý",
    english: "Business & Management",
    image: null as string | null,
    programmes: [
      "Quản trị Kinh doanh",
      "Kinh doanh Thương mại",
      "Tài chính - Ngân hàng",
      "Kế toán",
      "Logistics và Quản lý chuỗi cung ứng",
    ],
  },
  {
    code: "TH",
    title: "Du lịch & Khách sạn",
    english: "Tourism & Hospitality",
    image: null as string | null,
    programmes: ["Quản trị Dịch vụ Du lịch và Lữ hành", "Quản trị Khách sạn"],
  },
  {
    code: "LHC",
    title: "Luật, Nhân văn & Truyền thông",
    english: "Law, Humanities & Communication",
    image: null as string | null,
    programmes: ["Luật Kinh tế", "Quan hệ Công chúng", "Ngôn ngữ Anh"],
  },
  {
    code: "AAD",
    title: "Thiết kế & Mỹ thuật Ứng dụng",
    english: "Art, Architecture & Design",
    image: null as string | null,
    programmes: ["Kiến trúc", "Mỹ thuật Ứng dụng", "Lý luận và Lịch sử Mỹ thuật Ứng dụng"],
  },
] as const;

/** PAGE COMPONENT CHUYÊN BIỆT cho /programmes; chỉ route wrapper nằm trong app/programmes. */
export function ProgrammesLanding() {
  return (
    <main className="subpage programmes-page" id="main-content">
      <SiteHeader compact />

      <section className="programmes-hero" aria-labelledby="programmes-title">
        <Image
          src="/images/hero/campus-hero.jpg"
          alt="Khuôn viên Trường Đại học Văn Lang"
          fill
          priority
          sizes="100vw"
        />
        <div className="programmes-hero-overlay" />
        <div className="programmes-hero-copy">
          <p className="programmes-label">PROGRAMMES · CHƯƠNG TRÌNH ĐÀO TẠO</p>
          <h1 id="programmes-title">
            Học để tiến xa.
            <br />
            <em>Dẫn dắt tương lai.</em>
          </h1>
          <p className="programmes-hero-lead">
            Kiến tạo lộ trình học thuật phù hợp với tham vọng nghề nghiệp — từ chuyên môn chuyên sâu
            đến năng lực nghiên cứu và lãnh đạo toàn cầu.
          </p>
          <div className="programmes-hero-actions">
            <a href="#programme-directory">
              Khám phá chương trình <span>↓</span>
            </a>
            <Link href="/admissions">
              Thông tin tuyển sinh <span>↗</span>
            </Link>
          </div>
        </div>
        <div className="programmes-hero-stats" aria-label="Thông tin tổng quan chương trình">
          <div>
            <strong>18</strong>
            <span>
              Chương trình
              <br />
              Thạc sĩ
            </span>
          </div>
          <div>
            <strong>01</strong>
            <span>
              Chương trình
              <br />
              Tiến sĩ
            </span>
          </div>
          <div>
            <strong>03</strong>
            <span>
              Hướng tiếp cận
              <br />
              học thuật
            </span>
          </div>
        </div>
      </section>

      <section className="programmes-intro">
        <p className="programmes-section-index">01 / ĐỊNH HƯỚNG ĐÀO TẠO</p>
        <div>
          <h2>Không chỉ là một tấm bằng.</h2>
          <p>
            Chương trình sau đại học tại VGG kết hợp nền tảng học thuật, trải nghiệm thực tiễn và
            kết nối đa ngành. Người học được trao quyền để biến tri thức thành quyết định, giải pháp
            và tác động có ý nghĩa.
          </p>
        </div>
      </section>

      <ProgrammeFinder />

      <section className="programmes-admission">
        <div>
          <p>ADMISSIONS 2026</p>
          <h2>Sẵn sàng cho bước tiến tiếp theo?</h2>
        </div>
        <p>
          Đội ngũ tư vấn VGG sẽ giúp bạn lựa chọn chương trình và chuẩn bị hồ sơ phù hợp với mục
          tiêu cá nhân.
        </p>
        <Link href="/admissions">
          Khám phá tuyển sinh <span>↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
