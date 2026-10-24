import Link from "@/i18n/components/LocalizedLink";

const MASTER_FIELDS = [
  {
    code: "PHD",
    title: "Tiến sĩ Khoa học Môi trường",
    english: "PhD in Environmental Science",
    description:
      "Phát triển năng lực nghiên cứu độc lập, đóng góp tri thức mới và đề xuất giải pháp cho các vấn đề môi trường, hướng đến phát triển bền vững.",
    programmes: ["Khoa học Môi trường"],
  },
  {
    code: "EET",
    title: "Kỹ thuật, Môi trường & Công nghệ",
    english: "Engineering, Environment & Technology",
    description:
      "Đào sâu kiến thức kỹ thuật, môi trường và công nghệ; phát triển tư duy ứng dụng, hướng đến các giải pháp thiết thực và bền vững.",
    programmes: [
      "Kỹ thuật Môi trường",
      "Quản lý Tài nguyên và Môi trường",
      "Công nghệ Sinh học",
      "Công nghệ thông tin",
      "Kiến trúc",
      "Kỹ thuật Xây dựng",
      "Kỹ thuật Ô tô",
      "Logistics và Quản lý Chuỗi cung ứng",
    ],
  },
  {
    code: "BM",
    title: "Kinh doanh & Quản lý",
    english: "Business & Management",
    description:
      "Củng cố nền tảng quản trị, phát triển tư duy chiến lược và năng lực ra quyết định để dẫn dắt tổ chức thích ứng, đổi mới và tạo giá trị.",
    programmes: ["Quản trị Kinh doanh", "Kinh doanh Thương mại", "Tài chính Ngân hàng", "Kế toán", "Marketing"],
  },
  {
    code: "TH",
    title: "Du lịch & Khách sạn",
    english: "Tourism & Hospitality",
    description:
      "Phát triển tư duy quản trị dịch vụ, thấu hiểu trải nghiệm khách hàng và khám phá những hướng đi mới cho ngành du lịch, khách sạn.",
    programmes: ["Quản trị Dịch vụ Du lịch và Lữ hành", "Quản trị Khách sạn"],
  },
  {
    code: "LHC",
    title: "Luật, Nhân văn & Truyền thông",
    english: "Law, Humanities & Communication",
    description:
      "Mở rộng góc nhìn về con người và xã hội, vận dụng tri thức pháp lý, ngôn ngữ và truyền thông để giải quyết các vấn đề thực tiễn.",
    programmes: ["Luật Kinh tế", "Ngôn ngữ Anh", "Quan hệ Công chúng"],
  },
  {
    code: "AAD",
    title: "Thiết kế & Mỹ thuật Ứng dụng",
    english: "Design & Applied Arts",
    description:
      "Phát triển tư duy thẩm mỹ, khả năng sáng tạo và năng lực thiết kế, đưa ý tưởng thành sản phẩm có giá trị ứng dụng trong đời sống.",
    programmes: ["Mỹ thuật Ứng dụng", "Lý luận và Lịch sử Mỹ thuật Ứng dụng"],
  },
] as const;

/** HOMEPAGE SECTION: Danh mục các nhóm chương trình và liên kết sang /programmes. */
export function ProgrammeCatalog() {
  return (
    <section className="programmeCatalog" aria-label="Chương trình đào tạo" id="programmes">
      {/* Các nhóm ngành được tạo từ dữ liệu tĩnh phía trên; details giữ trang gọn khi chưa mở. */}
      <div className="programmeFieldGrid">
        {MASTER_FIELDS.map((field, fieldIndex) => (
          <article
            className={
              field.code === "PHD" ? "programmeField programmeFieldDoctoral" : "programmeField"
            }
            key={field.code}
          >
            <header>
              <span>{String(fieldIndex + 1).padStart(2, "0")}</span>
              <b>{field.code === "PHD" ? "BẬC TIẾN SĨ" : "BẬC THẠC SĨ"}</b>
            </header>
            <p>{field.english}</p>
            <h3>{field.title}</h3>
            <p className="programmeFieldDescription">{field.description}</p>
            <details>
              <summary>
                Xem {String(field.programmes.length).padStart(2, "0")} chương trình <b>→</b>
              </summary>
              <ol>
                {field.programmes.map((programme, programmeIndex) => (
                  <li key={programme}>
                    <span>{String(programmeIndex + 1).padStart(2, "0")}</span>
                    <b>{programme}</b>
                  </li>
                ))}
              </ol>
            </details>
          </article>
        ))}
      </div>

    </section>
  );
}
