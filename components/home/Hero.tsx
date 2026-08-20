import Image from "next/image";

// Ảnh nền chính; thay file tại đường dẫn này để đổi hình Hero.
const HERO_IMAGE_SRC = "/images/hero/campus-hero.jpg";

export function Hero() {
  return (
    // Hero là khu vực giới thiệu nổi bật đầu tiên ngay dưới Header.
    <section className="hero" id="top">
      <Image
        className="heroBackground"
        src={HERO_IMAGE_SRC}
        alt="Khuôn viên Trường Đại học Văn Lang"
        fill
        priority
        sizes="100vw"
      />
      <div className="heroOverlay" aria-hidden="true" />

      <div className="eyebrow">CHƯƠNG TRÌNH SAU ĐẠI HỌC · 2026</div>
      <h1>
        Nuôi dưỡng
        <br />
        <em>lãnh đạo đổi mới.</em>
      </h1>

      <p>
        Nơi tri thức, thực tiễn và đổi mới hội tụ — 18 chương trình Thạc sĩ và 01 chương trình Tiến
        sĩ,
        <br />
        được thiết kế cho người học trong kỷ nguyên AI.
      </p>

      <div className="heroActions">
        <a href="#programmes" className="primary">
          Khám phá chương trình →
        </a>
        <a href="#admissions">Tuyển sinh 2026 ↘</a>
      </div>

      <div className="heroStats">
        <div>
          <b>18</b>
          <span>
            Chương trình
            <br />
            Thạc sĩ
          </span>
        </div>
        <div>
          <b>01</b>
          <span>
            Chương trình
            <br />
            Tiến sĩ
          </span>
        </div>
        <div>
          <b>05</b>
          <span>
            Nhóm ngành
            <br />
            đa lĩnh vực
          </span>
        </div>
      </div>
    </section>
  );
}
