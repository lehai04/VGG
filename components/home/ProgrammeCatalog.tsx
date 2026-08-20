function CurvedLabel({ children, pathId }: { children: string; pathId: string }) {
  return (
    <svg className="programmeArcLabel" viewBox="0 0 140 140" role="img" aria-label={children}>
      <defs>
        <path id={pathId} d="M 14 88 Q 70 136 126 88" />
      </defs>
      <text>
        <textPath
          href={`#${pathId}`}
          startOffset="50%"
          textAnchor="middle"
          textLength="108"
          lengthAdjust="spacingAndGlyphs"
        >
          {children}
        </textPath>
      </text>
    </svg>
  );
}

const MASTER_FIELDS = [
  {
    code: "PHD",
    title: "Tiến sĩ Khoa học Môi trường",
    english: "Doctor of Philosophy in Environmental Science",
    description:
      "Phát triển năng lực nghiên cứu độc lập, kiến tạo tri thức mới và giải quyết những thách thức môi trường trong bối cảnh phát triển bền vững.",
    programmes: ["Khoa học Môi trường"],
  },
  {
    code: "EET",
    title: "Kỹ thuật, Môi trường & Công nghệ",
    english: "Engineering, Environment & Technology",
    description:
      "Làm chủ công nghệ, kiến tạo giải pháp bền vững và dẫn dắt những chuyển đổi của tương lai.",
    programmes: [
      "Kỹ thuật Môi trường",
      "Quản lý Tài nguyên và Môi trường",
      "Công nghệ Sinh học",
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
      "Nền tảng quản trị vững chắc, tư duy chiến lược linh hoạt và năng lực tạo giá trị trong nền kinh tế mới.",
    programmes: [
      "Quản trị Kinh doanh",
      "Kinh doanh Thương mại",
      "Tài chính Ngân hàng",
      "Kế toán",
    ],
  },
  {
    code: "TH",
    title: "Du lịch & Khách sạn",
    english: "Tourism & Hospitality",
    description:
      "Kiến tạo trải nghiệm khác biệt và định hình tương lai ngành dịch vụ, khách sạn và du lịch.",
    programmes: ["Quản trị Dịch vụ Du lịch và Lữ hành", "Quản trị Khách sạn"],
  },
  {
    code: "LHC",
    title: "Luật, Nhân văn & Truyền thông",
    english: "Law, Humanities & Communication",
    description:
      "Thấu hiểu con người và xã hội để tạo tác động tích cực bằng pháp lý, ngôn ngữ và truyền thông.",
    programmes: ["Luật Kinh tế", "Ngôn ngữ Anh", "Quan hệ Công chúng"],
  },
  {
    code: "AAD",
    title: "Thiết kế & Mỹ thuật Ứng dụng",
    english: "Art, Architecture & Design",
    description:
      "Nuôi dưỡng tư duy thẩm mỹ, bản lĩnh sáng tạo và khả năng biến ý tưởng thành giá trị thực tiễn.",
    programmes: ["Mỹ thuật Ứng dụng", "Lý luận và Lịch sử Mỹ thuật Ứng dụng"],
  },
] as const;

export function ProgrammeCatalog() {
  return (
    <section className="programmeCatalog" aria-labelledby="programme-catalog-title">
      <div className="programmeCatalogShowcase">
        <div className="programmeCatalogVisual" aria-label="Vị trí dành cho ảnh học viên">
          <span>YOUR IMAGE</span>
          <small>ẢNH HỌC VIÊN · 1600 × 1200 PX</small>
        </div>
        <div className="programmeCatalogLead">
          <p>PROGRAMMES · CHƯƠNG TRÌNH ĐÀO TẠO</p>
          <div className="programmeCatalogNumbers">
            <h2 className="programmeArcStat programmeArcStatMasters" id="programme-catalog-title">
              <strong>18</strong>
              <CurvedLabel pathId="masters-arc">Chương trình Thạc sĩ 2026</CurvedLabel>
            </h2>
            <div className="programmeArcStat programmeArcStatFields">
              <strong>05</strong>
              <CurvedLabel pathId="fields-arc">Khối ngành chuyên sâu</CurvedLabel>
            </div>
            <div className="programmeArcStat programmeArcStatDoctoral">
              <strong>01</strong>
              <CurvedLabel pathId="doctoral-arc">Chương trình Tiến sĩ</CurvedLabel>
            </div>
          </div>
        </div>
      </div>

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

      <a className="programmeCatalogCta" href="/programmes">
        <span>XEM CHI TIẾT</span>
        <b>→</b>
      </a>
    </section>
  );
}
