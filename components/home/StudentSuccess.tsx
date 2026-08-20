// Danh sách dịch vụ hỗ trợ học viên được hiển thị ở cột bên phải.
const STUDENT_SERVICES = [
  ["Academic Support", "Hỗ trợ học tập & tư vấn học thuật"],
  ["Career Development", "Việc làm, thực tập & kết nối doanh nghiệp"],
  ["Global Community", "Cựu học viên & đối tác toàn cầu"],
] as const;

export function StudentSuccess() {
  return (
    // Khu vực Student Success và các dịch vụ hỗ trợ người học.
    <section className="studentSuccess" id="student-success">
      <span className="anchorTarget" id="contact" aria-hidden="true" />

      <div className="studentSuccessIntro">
        <p>STUDENT SUCCESS · HÀNH TRÌNH HỌC VIÊN</p>
        <h2>
          Đồng hành để
          <br />
          <em>mỗi người học thành công.</em>
        </h2>
        <div>
          Từ hỗ trợ học tập, tư vấn học thuật, phát triển nghề nghiệp đến kết nối doanh nghiệp — VGG
          đồng hành xuyên suốt hành trình của học viên.
        </div>
        <a href="#student-success">Khám phá dịch vụ học viên ↗</a>
      </div>

      <div className="studentServices">
        {STUDENT_SERVICES.map(([title, description], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <i>↗</i>
          </article>
        ))}
      </div>
    </section>
  );
}
