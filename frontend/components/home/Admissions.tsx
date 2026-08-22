import { EditorialAccordion } from "./EditorialAccordion";

const ADMISSION_STEPS = [
  { title:"Khám phá chương trình", description:"Tìm chương trình đào tạo phù hợp với định hướng học tập và phát triển nghề nghiệp của bạn.", linkLabel:"Xem chương trình", href:"/programmes" },
  { title:"Yêu cầu tuyển sinh", description:"Tìm hiểu điều kiện dự tuyển, yêu cầu học thuật và hồ sơ cần chuẩn bị.", linkLabel:"Xem yêu cầu", href:"/admissions/yeu-cau" },
  { title:"Học phí & học bổng", description:"Thông tin về học phí, học bổng và các hình thức hỗ trợ tài chính.", linkLabel:"Thông tin học phí", href:"/admissions/hoc-phi" },
  { title:"Quy trình đăng ký", description:"Tìm hiểu từng bước từ chuẩn bị hồ sơ đến hoàn tất quá trình nhập học.", linkLabel:"Xem quy trình", href:"/admissions/nop-ho-so" },
  { title:"Đặt lịch tư vấn", description:"Kết nối với đội ngũ tư vấn để được hỗ trợ lựa chọn chương trình phù hợp.", linkLabel:"Đặt lịch ngay", href:"/admissions/tu-van" },
] as const;

/** HOMEPAGE SECTION: Quy trình tuyển sinh và CTA đăng ký. */
export function Admissions() {
  return (
    // Khu vực giới thiệu quy trình tuyển sinh năm 2026.
    <section className="admissions" id="admissions">
      <div className="admissionsIntro">
        <p>ADMISSIONS · TUYỂN SINH 2026</p>
        <h2>
          Sẵn sàng cho
          <br />
          bước tiến mới.
        </h2>
        <div>
          Thông tin rõ ràng, quy trình tinh gọn và đội ngũ tư vấn đồng hành cùng bạn từ lúc tìm hiểu
          đến khi nhập học.
        </div>
      </div>

      <div className="admissionsProcess">
        <EditorialAccordion items={ADMISSION_STEPS} label="Hành trình tuyển sinh" className="admissionsSteps" />

        <a href="#contact" className="admissionCta vgg-cta-pill">
          <span>Apply now · Đăng ký ngay</span>
          <b>↗</b>
        </a>
      </div>
    </section>
  );
}
