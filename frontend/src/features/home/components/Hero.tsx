/** HOMEPAGE SECTION: Hero đầu trang, CTA chính và các số liệu tổng quan. */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="heroMedia" aria-hidden="true">
        <video
          className="heroBackground"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/pages/home/banner/banner-01.jpg"
        >
          <source src="/video/video-banner.webm" type="video/webm" />
        </video>
      </div>
      <div className="heroOverlay" aria-hidden="true" />

      <div className="eyebrow">CHƯƠNG TRÌNH SAU ĐẠI HỌC · 2026</div>
      <h1>Nuôi dưỡng<br /><em>lãnh đạo đổi mới.</em></h1>
      <p>
        KIẾN TẠO ƯU THẾ TỪ TRI THỨC, DẪN ĐẦU BẰNG CHUYÊN MÔN.<br />
        Chương trình Đào tạo Sau đại học Trường Đại học Văn Lang với 18 chương trình Thạc sĩ và 01 chương trình Tiến sĩ
      </p>

      <div className="heroActions">
        <a href="#programmes" className="primary vgg-cta-pill">Khám phá chương trình →</a>
        <a className="vgg-cta-pill" href="#admissions">Tuyển sinh 2026 →</a>
      </div>

      <div className="heroStats">
        <div><b>18</b><span>Chương trình<br />Thạc sĩ</span></div>
        <div><b>01</b><span>Chương trình<br />Tiến sĩ</span></div>
        <div><b>05</b><span>Nhóm ngành<br />đa lĩnh vực</span></div>
      </div>
    </section>
  );
}
