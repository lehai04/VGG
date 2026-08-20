import Image from "next/image";

export function Footer() {
  return (
    // Footer gồm logo, thông tin liên hệ, mạng xã hội và thanh liên kết nhanh.
    <footer className="siteFooter">
      <div className="footerMain">
        <div className="footerLogo">
          <Image
            src="/images/logo/logo-vgg.png"
            alt="Institute of Postgraduate Education"
            width={288}
            height={108}
          />
        </div>

        <div className="footerColumn">
          <small>LIÊN HỆ</small>
          <p>
            <a href="mailto:v.sdh@vlu.edu.vn">v.sdh@vlu.edu.vn</a>
            <br />
            <a href="tel:02871016869">028 7101 6869</a>
            <br />
            Hotline/Zalo: <a href="tel:0988486869">0988 48 68 69</a>
          </p>
        </div>

        <div className="footerColumn">
          <small>ĐỊA CHỈ</small>
          <p>
            Phòng A02.01, Tòa A,
            <br />
            69/68 Đặng Thùy Trâm,
            <br />
            P. Bình Lợi Trung, TP.HCM
          </p>
        </div>

        <div className="footerColumn">
          <small>KẾT NỐI</small>
          <p className="footerSocials">
            <a href="#footer">Facebook</a>
            <a href="#footer">YouTube</a>
            <a href="#footer">LinkedIn</a>
          </p>
        </div>
      </div>

      <div className="footerCopyright" id="footer">
        © 2026 Trường Đại học Văn Lang. Bảo lưu mọi quyền.
      </div>

      <a className="chatbotFloat" href="#consultation" aria-label="Mở khu vực tư vấn VGG">
        <span>AI</span>
        <b>Chat với VGG</b>
      </a>

      <a
        className="facebookFloat"
        href="https://www.facebook.com/truongdaihocvanlang/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Theo dõi Văn Lang University trên Facebook"
      >
        <span>f</span>
        <b>Facebook Văn Lang</b>
      </a>

      <a
        className="zaloFloat"
        href="https://zalo.me/0988486869"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ tuyển sinh qua Zalo"
      >
        <span>Zalo</span>
        <b>Liên hệ tuyển sinh</b>
      </a>
    </footer>
  );
}
