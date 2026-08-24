import Image from "next/image";
import { EditorialAccordion } from "./EditorialAccordion";

// Ảnh đại diện cho khu vực Nghiên cứu & Đổi mới.
const RESEARCH_IMAGE_SRC = "/images/hero/campus-hero.jpg";

// Danh sách các hướng nghiên cứu nổi bật.
const RESEARCH_LINKS = [
  { title:"Hướng nghiên cứu trọng điểm", description:"Khám phá các hướng nghiên cứu tập trung vào những vấn đề có ý nghĩa đối với xã hội, môi trường và sự phát triển bền vững.", linkLabel:"Khám phá lĩnh vực nghiên cứu", href:"/research/cum-nghien-cuu" },
  { title:"Dự án & công bố", description:"Tổng hợp các dự án, công trình và kết quả nghiên cứu tiêu biểu được triển khai bởi giảng viên và học viên.", linkLabel:"Tìm hiểu hoạt động nghiên cứu", href:"/research/du-an" },
  { title:"Hợp tác nghiên cứu", description:"Kết nối nhà trường với doanh nghiệp, tổ chức và các đối tác học thuật trong nước và quốc tế.", linkLabel:"Xem cơ hội hợp tác", href:"/research/hop-tac-doanh-nghiep" },
  { title:"Phòng thí nghiệm & cơ sở nghiên cứu", description:"Hệ thống không gian nghiên cứu và cơ sở vật chất hỗ trợ học tập, thử nghiệm và phát triển các ý tưởng mới.", linkLabel:"Tìm hiểu thêm", href:"/research/doi-moi-sang-tao" },
] as const;

/** HOMEPAGE SECTION: Tổng quan nghiên cứu, đổi mới và các hướng nghiên cứu chính. */
export function Research() {
  return (
    // Bố cục chia đôi: hình ảnh bên trái và nội dung bên phải.
    <section className="research" id="research">
      <div className="researchImage">
        <Image
          src={RESEARCH_IMAGE_SRC}
          alt="Sinh viên và giảng viên cùng nghiên cứu"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <span>LEARN · RESEARCH · INNOVATE · IMPACT</span>
      </div>

      <div className="researchContent">
        <p className="researchEyebrow">RESEARCH &amp; INNOVATION</p>
        <h2>
          Tri thức tạo nên
          <br />
          <em>tác động.</em>
        </h2>
        <p className="researchDescription">
          Người học làm việc cùng giảng viên, nhà nghiên cứu và doanh nghiệp để chuyển hóa vấn đề
          thực tiễn thành dự án, công bố và giải pháp có giá trị.
        </p>

        <EditorialAccordion items={RESEARCH_LINKS} label="Các hướng nghiên cứu" className="researchLinks" />

        <div className="researchFooter">
          <span>VGG RESEARCH ECOSYSTEM</span>
          <b>Knowledge for real-world impact</b>
        </div>
      </div>
    </section>
  );
}
