"use client";

import { FormEvent, useState } from "react";
import { programmes as PROGRAMMES } from "@/data/site";

// Danh sách tài nguyên tải xuống hoặc tra cứu.
const RESOURCES = [
  "Biểu mẫu",
  "Chính sách & Quy định",
  "Tài liệu tải về",
  "Lịch học thuật",
  "Câu hỏi thường gặp",
] as const;

/** HOMEPAGE SECTION: Tài nguyên tải về và biểu mẫu đặt lịch tư vấn. */
export function ResourcesConsultation() {
  // Thông báo trạng thái gửi form cho người dùng.
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gửi dữ liệu tư vấn đến API nội bộ và xử lý phản hồi thành công/thất bại.
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Đang gửi...");
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
        setMessage("Đã gửi yêu cầu. VGG sẽ sớm liên hệ với bạn.");
      } else {
        setMessage(result.message ?? "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại.");
      }
    } catch {
      setMessage("Không thể kết nối máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    // Hai khối có cùng kích thước: Tài nguyên và Đặt lịch tư vấn.
    <section className="resourcesContact" id="resources">
      <div className="resourcesBlock">
        <div className="resourcesIntro">
          <p>RESOURCES · TÀI NGUYÊN</p>
          <h2>
            Mọi thông tin bạn cần,
            <br />
            tại một nơi.
          </h2>
        </div>

        <div className="resourcesList">
          {RESOURCES.map((item, index) => (
            <a href="#resources" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              <i>+</i>
            </a>
          ))}
        </div>
      </div>

      <div className="consultationBlock" id="consultation">
        {/* Cột giới thiệu nhấn mạnh giá trị người dùng nhận được trước khi điền form. */}
        <div className="consultationIntro">
          <p>BOOK CONSULTATION · ĐẶT LỊCH TƯ VẤN</p>
          <h2>
            Bạn đã sẵn sàng
            <br />
            cho <em>bước tiến mới?</em>
          </h2>
          <div>Để lại thông tin, đội ngũ tuyển sinh VGG sẽ liên hệ và đồng hành cùng bạn.</div>
          <ul className="consultationBenefits" aria-label="Quyền lợi tư vấn">
            <li>
              <span>01</span>
              Tư vấn chương trình phù hợp
            </li>
            <li>
              <span>02</span>
              Hướng dẫn học phí và học bổng
            </li>
            <li>
              <span>03</span>
              Đồng hành hoàn thiện hồ sơ
            </li>
          </ul>
        </div>

        {/* Logic submit được giữ tách biệt ở submitForm; markup dưới đây chỉ mô tả dữ liệu đầu vào. */}
        <form className="consultationFields" onSubmit={submitForm}>
          <div className="consultationFormHead">
            <div>
              <span>PRIVATE CONSULTATION</span>
              <strong>Thông tin của bạn</strong>
            </div>
            <small>Phản hồi trong 24 giờ</small>
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
            Họ và tên
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
            Số điện thoại
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
            Email
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
            Chương trình quan tâm
            <select name="programme" defaultValue="" required>
              <option value="" disabled>
                Chọn chương trình
              </option>
              {PROGRAMMES.map((programme) => (
                <option value={programme} key={programme}>
                  {programme}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"} <span>→</span>
          </button>
          {/* aria-live thông báo kết quả gửi form cho cả người dùng bàn phím và trình đọc màn hình. */}
          <p className="consultationMessage" aria-live="polite">
            {message}
          </p>
          <small className="consultationPrivacy">
            Thông tin của bạn được bảo mật và chỉ sử dụng cho mục đích tư vấn tuyển sinh.
          </small>
        </form>
      </div>
    </section>
  );
}
