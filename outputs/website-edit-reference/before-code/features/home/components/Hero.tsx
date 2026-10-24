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

      <div className="eyebrow">CHƯƠNG TRÌNH SAU ĐẠI HỌC</div>
      <h1>Nâng tầm tri thức<br /><em>Chủ động dẫn đầu.</em></h1>
      <p>
        Trường Đại học Văn Lang mang đến 20 chương trình thạc sĩ và 01 chương trình tiến sĩ, 01 chương trình liên kết quốc tế giúp bạn phát triển chuyên môn, nâng cao năng lực nghiên cứu và mở rộng cơ hội nghề nghiệp.

      </p>

      <div className="heroActions">
        <a href="#programmes" className="primary vgg-cta-pill">Khám phá chương trình →</a>
        <a className="vgg-cta-pill" href="#admissions">Thông tin tuyển sinh →</a>
      </div>

      <div className="heroStats">
        <div><b>20</b><span>Chương trình<br />Thạc sĩ</span></div>
        <div><b>01</b><span>Chương trình<br />Tiến sĩ</span></div>
        <div><b>01</b><span>Chương trình<br />Liên kết quốc tế</span></div>
      </div>
    </section>
  );
}
