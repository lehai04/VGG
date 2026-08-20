import Image from "next/image";

// Ảnh đại diện cho khu vực Nghiên cứu & Đổi mới.
const RESEARCH_IMAGE_SRC = "/images/hero/campus-hero.jpg";

// Danh sách các hướng nghiên cứu nổi bật.
const RESEARCH_LINKS = [
  "Các cụm nghiên cứu",
  "Dự án nghiên cứu",
  "Công bố khoa học",
  "Hợp tác doanh nghiệp",
] as const;

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
        <p className="researchEyebrow">
          RESEARCH &amp; INNOVATION
        </p>
        <h2>
          Tri thức tạo nên
          <br />
          <em>tác động.</em>
        </h2>
        <p className="researchDescription">
          Người học làm việc cùng giảng viên, nhà nghiên cứu và doanh nghiệp để chuyển hóa vấn đề
          thực tiễn thành dự án, công bố và giải pháp có giá trị.
        </p>

        <div className="researchLinks" aria-label="Các hướng nghiên cứu">
          {RESEARCH_LINKS.map((label, index) => (
            <div key={label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{label}</b>
            </div>
          ))}
        </div>

        <div className="researchFooter">
          <span>VGG RESEARCH ECOSYSTEM</span>
          <b>Knowledge for real-world impact</b>
        </div>
      </div>
    </section>
  );
}
