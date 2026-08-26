import Image from "next/image";
import { ArrowUpRight, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { FooterIcon } from "@/shared/components/layout/footer/FooterIcon";
import { RevealOnScroll } from "@/shared/components/layout/RevealOnScroll";
import { DiscoverMore } from "@/features/discover/components/DiscoverMore";
import { NextStepCTA } from "@/features/content/components/NextStepCTA";
import styles from "./ContactPage.module.css";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/saudaihoc.vlu" },
  { label: "Zalo", href: "https://zalo.me/0988486869" },
  { label: "Instagram", href: "https://www.instagram.com/vanlanguniversity/" },
] as const;

export function ContactPage() {
  return (
    <main className={`subpage ${styles.page}`} id="main-content">
      <RevealOnScroll />
      <SiteHeader compact />

      <section className={styles.hero} aria-labelledby="contact-title">
        <Image src="/images/pages/discover/content/campus.jpg" alt="Khuôn viên Trường Đại học Văn Lang" fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroTitle}>
          <p>DISCOVER Viện Sau Đại học · 06</p>
          <h1 id="contact-title">Liên hệ</h1>
          <span>Contact Viện Sau Đại học</span>
        </div>
      </section>

      <section className={styles.remoteSection} aria-labelledby="remote-title">
        <header className={styles.sectionHeading} data-reveal>
          <p>01 / KẾT NỐI TỪ XA</p>
          <h2 id="remote-title">Luôn sẵn sàng lắng nghe bạn</h2>
          <span>Chọn kênh thuận tiện nhất để bắt đầu cuộc trò chuyện cùng đội ngũ Viện Sau Đại học.</span>
        </header>

        <div className={styles.contactCards}>
          <article className={styles.contactCard} data-reveal>
            <div className={styles.cardNumber}>01</div>
            <h3>Liên hệ qua mạng xã hội</h3>
            <p>
              Kết nối với Viện Sau Đại học qua Facebook, Zalo hoặc Instagram để cập nhật thông tin mới nhất. Đội ngũ tư vấn tiếp nhận các câu hỏi về chương trình, tuyển sinh và hồ sơ. Bạn có thể gửi tin nhắn bất cứ khi nào thuận tiện. Mỗi yêu cầu sẽ được chuyển đến đúng bộ phận phụ trách. Viện Sau Đại học luôn phản hồi rõ ràng và đầy đủ.
            </p>
            <div className={styles.socialLinks} aria-label="Các kênh mạng xã hội">
              {socialLinks.map(({ label, href }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" key={label}>
                  {label === "Zalo" ? <MessageCircle aria-hidden="true" /> : <FooterIcon name={label === "Facebook" ? "facebook" : "instagram"} />}
                  <span>{label}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </article>

          <article className={`${styles.contactCard} ${styles.hotlineCard}`} data-reveal>
            <div className={styles.cardNumber}>02</div>
            <h3>Liên hệ qua đường dây nóng</h3>
            <p>
              Gọi trực tiếp khi bạn cần trao đổi nhanh với chuyên viên tư vấn. Chúng tôi hỗ trợ về ngành học, điều kiện dự tuyển và quy trình nộp hồ sơ. Thông tin của bạn được tiếp nhận cẩn thận và bảo mật. Những câu hỏi chuyên sâu sẽ được kết nối đúng đơn vị phụ trách. Hãy chuẩn bị nội dung để buổi tư vấn hiệu quả hơn.
            </p>
            <div className={styles.phoneLinks}>
              <a href="tel:02871016869"><Phone aria-hidden="true" /><span><small>Đào tạo</small>028 7101 6869</span></a>
              <a href="tel:0988486869"><Phone aria-hidden="true" /><span><small>Tuyển sinh</small>0988 48 68 69</span></a>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.visitSection} aria-labelledby="visit-title">
        <figure className={styles.visitMedia} data-reveal>
          <Image src="/images/pages/discover/content/1.jpg" alt="Đội ngũ Viện Sau Đại học hỗ trợ người học" fill sizes="(max-width: 900px) 100vw, 52vw" />
        </figure>
        <div className={styles.visitCopy} data-reveal>
          <p className={styles.eyebrow}>02 / LÀM VIỆC TRỰC TIẾP</p>
          <h2 id="visit-title">Gặp đội ngũ Viện Sau Đại học tại văn phòng</h2>
          <p>
            Bạn có thể đến văn phòng để trao đổi trực tiếp cùng đội ngũ phụ trách. Chuyên viên sẽ hỗ trợ hồ sơ, lộ trình học tập và các thủ tục liên quan. Một cuộc hẹn trước giúp chúng tôi chuẩn bị thông tin phù hợp với bạn. Khi đến, vui lòng mang theo giấy tờ hoặc tài liệu cần tư vấn. Viện Sau Đại học mong muốn mỗi buổi gặp đều thân thiện và hiệu quả.
          </p>
          <div className={styles.visitDetails}>
            <div><MapPin aria-hidden="true" /><span><small>Địa điểm</small>Phòng A02.01, Tòa A, 69/68 Đặng Thùy Trâm, P. Bình Lợi Trung, TP.HCM</span></div>
            <div><Clock3 aria-hidden="true" /><span><small>Thời gian làm việc</small>Thứ Hai – Thứ Bảy, 08:00 – 17:00</span></div>
          </div>
          <a className={styles.mapLink} href="https://www.google.com/maps?q=69%2F68%20Dang%20Thuy%20Tram%2C%20Ho%20Chi%20Minh%20City" target="_blank" rel="noopener noreferrer">
            Xem đường đi <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <DiscoverMore activeSlug="lien-he" />
      <NextStepCTA />
      <SiteFooter />
    </main>
  );
}
