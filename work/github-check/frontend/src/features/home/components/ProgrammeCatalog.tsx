import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { Award, BookCheck, FileText, GraduationCap, Languages } from "lucide-react";

/** Nhãn SVG chạy theo đường cong ở phần bầu dưới của mỗi thẻ thống kê. */
function CurvedLabel({ children, pathId }: { children: string; pathId: string }) {
  return (
    <svg className="programmeArcLabel" viewBox="0 0 140 140" role="img" aria-label={children}>
      <defs>
        {/* Đường cong đồng tâm với đáy chữ U, đủ rộng để nhãn không bị nén hoặc cắt. */}
        <path id={pathId} d="M 7 101 Q 70 161 133 101" />
      </defs>
      <text>
        <textPath
          href={`#${pathId}`}
          startOffset="50%"
          textAnchor="middle"
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
    programmes: ["Quản trị Kinh doanh", "Kinh doanh Thương mại", "Tài chính Ngân hàng", "Kế toán"],
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

interface GraduationRequirement {
  category: string;
  title: string;
  desc: string;
  icon: typeof BookCheck;
  highlight: string;
  highlightLabel: string;
  isSpecial?: boolean;
}

const GRADUATION_REQUIREMENTS: GraduationRequirement[] = [
  {
    category: "Quy chế chung",
    title: "Chương trình đào tạo",
    desc: "Hoàn thành chương trình đào tạo theo quy định.",
    icon: BookCheck,
    highlight: "100%",
    highlightLabel: "Khối lượng đào tạo",
  },
  {
    category: "Chuẩn ngoại ngữ",
    title: "Năng lực tiếng Anh",
    desc: "Đạt chuẩn đầu ra về năng lực tiếng Anh theo quy định của Trường Đại học Văn Lang.",
    icon: Languages,
    highlight: "Chuẩn VLU",
    highlightLabel: "Khung năng lực ngoại ngữ",
  },
  {
    category: "Mỹ thuật Ứng dụng",
    title: "Công bố khoa học",
    desc: "Đối với ngành Mỹ thuật Ứng dụng: Có tối thiểu 02 công bố khoa học được đăng trên tạp chí khoa học hoặc trong kỷ yếu hội nghị trong nước/quốc tế.",
    icon: Award,
    highlight: "≥ 02",
    highlightLabel: "Công bố khoa học",
    isSpecial: true,
  },
  {
    category: "Quan hệ Công chúng",
    title: "Công bố khoa học",
    desc: "Đối với ngành Quan hệ Công chúng: Có tối thiểu 01 công bố khoa học được đăng trên tạp chí khoa học hoặc trong kỷ yếu hội nghị trong nước/quốc tế.",
    icon: FileText,
    highlight: "≥ 01",
    highlightLabel: "Công bố khoa học",
    isSpecial: true,
  },
];

/** HOMEPAGE SECTION: Danh mục các nhóm chương trình và liên kết sang /programmes. */
export function ProgrammeCatalog() {
  return (
    <section className="programmeCatalog" aria-labelledby="programme-catalog-title">
      <div className="programmeCatalogShowcase">
        {/* Ảnh đại diện cho khu vực chương trình đào tạo trên homepage. */}
        <div className="programmeCatalogVisual">
          <Image
            src="/images/pages/home/sections/graduates.jpg"
            alt="Người học trong chương trình đào tạo sau đại học"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="programmeCatalogImage"
          />
        </div>
        <div className="programmeCatalogLead">
          <p>PROGRAMMES · CHƯƠNG TRÌNH ĐÀO TẠO</p>
          {/* Ba số liệu chính dùng chung component nhãn cong để bảo đảm đồng bộ. */}
          <div className="programmeCatalogNumbers">
            <h2 className="programmeArcStat programmeArcStatMasters" id="programme-catalog-title">
              <strong>18</strong>
              <CurvedLabel pathId="masters-arc">Chương trình Thạc sĩ</CurvedLabel>
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

      {/* Mục Điều kiện tốt nghiệp */}
      <div className="programmeGraduation" aria-labelledby="graduation-requirements-title">
        <div className="programmeGraduationHeader">
          <div className="programmeGraduationKicker">
            <GraduationCap className="programmeGraduationKickerIcon" size={18} aria-hidden="true" />
            <span>GRADUATION REQUIREMENTS · ĐIỀU KIỆN TỐT NGHIỆP</span>
          </div>
          <h3 id="graduation-requirements-title" className="programmeGraduationTitle">
            Điều kiện <em>tốt nghiệp</em>
          </h3>
          <p className="programmeGraduationSubtitle">
            Quy định điều kiện hoàn thành khóa học và chuẩn đầu ra áp dụng cho học viên sau đại học tại Trường Đại học Văn Lang.
          </p>
        </div>

        <div className="programmeGraduationGrid">
          {GRADUATION_REQUIREMENTS.map((req, idx) => {
            const IconComponent = req.icon;
            return (
              <article
                key={idx}
                className={`programmeGraduationCard ${req.isSpecial ? "programmeGraduationCard--special" : ""}`}
              >
                <div className="programmeGraduationCardTop">
                  <div className="programmeGraduationCardBadge">
                    <span className="programmeGraduationStep">0{idx + 1}</span>
                    <span className="programmeGraduationCategory">{req.category}</span>
                  </div>
                  <div className="programmeGraduationCardIcon">
                    <IconComponent size={20} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                </div>

                <div className="programmeGraduationCardBody">
                  <div className="programmeGraduationMetric">
                    <span className="programmeGraduationMetricValue">{req.highlight}</span>
                    <span className="programmeGraduationMetricLabel">{req.highlightLabel}</span>
                  </div>
                  <h4 className="programmeGraduationCardTitle">{req.title}</h4>
                  <p className="programmeGraduationCardText">{req.desc}</p>
                </div>

                <div className="programmeGraduationCardFooter">
                  <span className="programmeGraduationStatusDot" />
                  <span className="programmeGraduationStatusText">Tiêu chuẩn bắt buộc</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <Link className="programmeCatalogCta vgg-cta-pill" href="/programmes">
        <span>XEM CHI TIẾT</span>
        <b>→</b>
      </Link>
    </section>
  );
}

