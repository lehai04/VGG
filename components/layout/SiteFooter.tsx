import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand logo-footer">
        <Image
          src="/images/logo/logo-vgg.png"
          alt="Viện Sau đại học Văn Lang"
          width={320}
          height={125}
        />
      </div>
      <div>
        <small>LIÊN HỆ</small>
        <p>
          <a href="mailto:v.sdh@vlu.edu.vn">v.sdh@vlu.edu.vn</a>
          <br />
          <a href="tel:+842871016869">028 7101 6869</a>
          <br />
          <a href="tel:+84988486869">0988 48 68 69</a>
        </p>
      </div>
      <div>
        <small>ĐỊA CHỈ</small>
        <p>
          Phòng A02.01, Tòa A,
          <br />
          69/68 Đặng Thùy Trâm,
          <br />
          P. Bình Lợi Trung, TP.HCM
        </p>
      </div>
      <div>
        <small>TRUY CẬP NHANH</small>
        <p>
          <Link href="/admissions">Tuyển sinh</Link>
          <br />
          <Link href="/resources">Tài nguyên</Link>
          <br />
          <Link href="/discover">Liên hệ</Link>
        </p>
      </div>
      <div className="copyright">© 2026 Trường Đại học Văn Lang. Bảo lưu mọi quyền.</div>
    </footer>
  );
}

export function StickyActions() {
  return (
    <>
      <Link className="chatbot-float" href="/#consultation" aria-label="Mở khu vực tư vấn VGG">
        <span>AI</span>
        <b>Chat với VGG</b>
      </Link>
      <a
        className="facebook-float"
        href="https://www.facebook.com/truongdaihocvanlang/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Theo dõi Văn Lang University trên Facebook"
      >
        <span>f</span>
        <b>Facebook Văn Lang</b>
      </a>
      <a
        className="zalo-float"
        href="https://zalo.me/0988486869"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ tuyển sinh qua Zalo"
      >
        <span>Zalo</span>
        <b>Liên hệ tuyển sinh</b>
      </a>
    </>
  );
}
