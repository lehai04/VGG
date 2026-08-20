// Nội dung các bước tuyển sinh; chỉnh sửa tại đây để giao diện tự cập nhật.
const ADMISSION_STEPS = [
  [
    "Kiểm tra yêu cầu tuyển sinh",
    "Điều kiện văn bằng, chuyên môn và ngoại ngữ theo từng chương trình.",
  ],
  ["Xem học phí & học bổng", "Chính sách học phí, ưu đãi cựu sinh viên và hỗ trợ tài chính."],
  ["Nộp hồ sơ trực tuyến", "Khai báo thông tin và theo dõi tiến độ hồ sơ trên hệ thống."],
  ["Nhập học tại VGG", "Hoàn tất thủ tục và chính thức gia nhập cộng đồng học thuật."],
] as const;

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
        <div className="admissionsSteps">
          {ADMISSION_STEPS.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>

        <a href="#contact" className="admissionCta">
          <span>Apply now · Đăng ký ngay</span>
          <b>↗</b>
        </a>
      </div>
    </section>
  );
}
