"use client";

/**
 * Form tư vấn (client): submit JSON tới POST /api/consultations.
 * Field ẩn `website` = honeypot chống bot. `consent` = hidden "yes".
 */
import { FormEvent, useState } from "react";
import { programmes as PROGRAMMES } from "@/data/site";
import { EditorialAccordion } from "./EditorialAccordion";
import { useLocale } from "@/components/i18n/LocaleProvider";

// Danh sách tài nguyên tải xuống hoặc tra cứu.
const RESOURCES = [
  { title:"Thư viện & học liệu", description:"Truy cập nguồn học liệu, tài liệu chuyên ngành và các tài nguyên phục vụ học tập và nghiên cứu.", href:"/resources/tai-lieu", linkLabel:"Truy cập tài nguyên" },
  { title:"Biểu mẫu & tài liệu", description:"Tổng hợp biểu mẫu, hướng dẫn và tài liệu cần thiết trong quá trình học tập.", href:"/resources/bieu-mau", linkLabel:"Xem biểu mẫu" },
  { title:"Quy định & chính sách", description:"Tra cứu các quy định, chính sách và hướng dẫn dành cho người học.", href:"/resources/chinh-sach-quy-dinh", linkLabel:"Tra cứu chính sách" },
  { title:"Hệ thống trực tuyến", description:"Truy cập nhanh các nền tảng và hệ thống hỗ trợ học tập.", href:"/resources", linkLabel:"Truy cập hệ thống" },
  { title:"Câu hỏi thường gặp", description:"Tìm câu trả lời nhanh cho những vấn đề thường gặp về chương trình, học vụ và các dịch vụ hỗ trợ.", href:"/resources/faq", linkLabel:"Xem câu hỏi" },
] as const;

/**
 * Khối tài nguyên + tư vấn dùng trên homepage; trang con có thể ẩn tài nguyên
 * để kế thừa nguyên form “Sẵn sàng cho bước tiến mới” mà không lặp logic/API.
 */
export function ResourcesConsultation({ showResources = true }: { showResources?: boolean }) {
  const { messages } = useLocale();
  const cta = messages.cta;
  // Thông báo trạng thái gửi form cho người dùng.
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gửi dữ liệu tư vấn đến API nội bộ và xử lý phản hồi thành công/thất bại.
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(cta.submitting);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json()) as { message?: string };

      if (response.ok) {
        form.reset();
        setMessage(cta.success);
      } else {
        setMessage(result.message ?? cta.invalid);
      }
    } catch {
      setMessage(cta.connectionError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    // Hai khối có cùng kích thước: Tài nguyên và Đặt lịch tư vấn.
    <section className={`resourcesContact${showResources ? "" : " consultationOnly home-page"}`} id={showResources ? "resources" : "consultation"}>
      {showResources && <div className="resourcesBlock">
        <div className="resourcesIntro">
          <p>RESOURCES · TÀI NGUYÊN</p>
          <h2>
            Mọi thông tin bạn cần,
            <br />
            tại một nơi.
          </h2>
        </div>

        <EditorialAccordion items={RESOURCES} label="Tài nguyên học tập" className="resourcesList" />
      </div>}

      <div className="consultationBlock" id={showResources ? "consultation" : undefined}>
        {/* Cột giới thiệu nhấn mạnh giá trị người dùng nhận được trước khi điền form. */}
        <div className="consultationIntro">
          <p>{cta.eyebrow}</p>
          <h2>
            {cta.titleLine1}
            <br />
            <em>{cta.titleLine2}</em>
          </h2>
          <div>{cta.support}</div>
          <ul className="consultationBenefits" aria-label="Quyền lợi tư vấn">
            <li>
              <span>01</span>
              {cta.benefit1}
            </li>
            <li>
              <span>02</span>
              {cta.benefit2}
            </li>
            <li>
              <span>03</span>
              {cta.benefit3}
            </li>
          </ul>
        </div>

        {/* Logic submit được giữ tách biệt ở submitForm; markup dưới đây chỉ mô tả dữ liệu đầu vào. */}
        <form className="consultationFields" onSubmit={submitForm}>
          <div className="consultationFormHead">
            <div>
              <span>PRIVATE CONSULTATION</span>
              <strong>{cta.formTitle}</strong>
            </div>
            <small>{cta.response}</small>
          </div>
          {/* consent phục vụ API; honeypot chặn bot và được ẩn khỏi người dùng thật. */}
          <input type="hidden" name="consent" value="yes" />
          <input
            className="form-honeypot"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <label>
            {cta.name}
            <input
              name="name"
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
            />
          </label>
          <label>
            {cta.phone}
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="0901 234 567"
              pattern="(?:\+84|0)(?:3|5|7|8|9)[0-9 .-]{8,12}"
              title="Nhập số di động Việt Nam, ví dụ 0901 234 567"
              maxLength={18}
              required
            />
          </label>
          <label>
            {cta.email}
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
              maxLength={190}
              required
            />
          </label>
          <label>
            {cta.programme}
            <select name="programme" defaultValue="" required>
              <option value="" disabled>
                {cta.chooseProgramme}
              </option>
              {PROGRAMMES.map((programme) => (
                <option value={programme} key={programme}>
                  {programme}
                </option>
              ))}
            </select>
          </label>
          <button className="vgg-cta-pill" type="submit" disabled={isSubmitting}>
            {isSubmitting ? cta.submitting : cta.submit} <span>→</span>
          </button>
          {/* aria-live thông báo kết quả gửi form cho cả người dùng bàn phím và trình đọc màn hình. */}
          <p className="consultationMessage" aria-live="polite">
            {message}
          </p>
          <small className="consultationPrivacy">
            {cta.privacy}
          </small>
        </form>
      </div>
    </section>
  );
}
