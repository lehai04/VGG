import { EditorialAccordion } from "./EditorialAccordion";

const STUDENT_SERVICES = [
  { title:"Cố vấn học tập", description:"Đồng hành cùng người học trong việc xây dựng kế hoạch học tập và giải quyết những khó khăn trong quá trình học.", href:"/student-success/ho-tro-hoc-vien", linkLabel:"Tìm hiểu thêm" },
  { title:"Phát triển nghề nghiệp", description:"Kết nối kiến thức học thuật với định hướng nghề nghiệp thông qua tư vấn, hoạt động thực tế và cơ hội kết nối doanh nghiệp.", href:"/student-success/phat-trien-su-nghiep", linkLabel:"Tìm hiểu thêm" },
  { title:"Kỹ năng & phát triển cá nhân", description:"Các hoạt động giúp người học phát triển kỹ năng chuyên môn, kỹ năng mềm và năng lực thích ứng.", href:"/student-success/tai-nguyen-hoc-tap", linkLabel:"Tìm hiểu thêm" },
  { title:"Cộng đồng học viên", description:"Môi trường kết nối, chia sẻ và học hỏi giữa học viên, giảng viên và cộng đồng.", href:"/student-success/cuu-hoc-vien", linkLabel:"Tìm hiểu thêm" },
  { title:"Câu chuyện thành công", description:"Những hành trình, trải nghiệm và thành tựu nổi bật của người học.", href:"/student-success/cau-chuyen-thanh-cong", linkLabel:"Khám phá câu chuyện" },
] as const;

/** HOMEPAGE SECTION: Dịch vụ hỗ trợ và hành trình thành công của học viên. */
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

      <EditorialAccordion items={STUDENT_SERVICES} label="Dịch vụ hỗ trợ học viên" className="studentServices" />
    </section>
  );
}
