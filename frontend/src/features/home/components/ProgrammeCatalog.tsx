import Link from "@/i18n/components/LocalizedLink";
import { homeContent } from '@/data/home-content';
import { websiteContent } from '@/lib/website-content';

const MASTER_FIELDS = [
  {
    code: "PHD",
    title: "Tiến sĩ Khoa học Môi trường",
    english: "PhD in Environmental Science",
    description:
      "Phát triển năng lực nghiên cứu độc lập, đóng góp tri thức mới và đề xuất giải pháp cho các vấn đề môi trường, hướng đến phát triển bền vững.",
  },
  {
    code: "EET",
    title: "Kỹ thuật, Môi trường & Công nghệ",
    english: "Engineering, Environment & Technology",
    description:
      "Đào sâu kiến thức kỹ thuật, môi trường và công nghệ; phát triển tư duy ứng dụng, hướng đến các giải pháp thiết thực và bền vững.",
  },
  {
    code: "BM",
    title: "Kinh doanh & Quản lý",
    english: "Business & Management",
    description:
      "Củng cố nền tảng quản trị, phát triển tư duy chiến lược và năng lực ra quyết định để dẫn dắt tổ chức thích ứng, đổi mới và tạo giá trị.",
  },
  {
    code: "TH",
    title: "Du lịch & Khách sạn",
    english: "Tourism & Hospitality",
    description:
      "Phát triển tư duy quản trị dịch vụ, thấu hiểu trải nghiệm khách hàng và khám phá những hướng đi mới cho ngành du lịch, khách sạn.",
  },
  {
    code: "LHC",
    title: "Luật, Nhân văn & Truyền thông",
    english: "Law, Humanities & Communication",
    description:
      "Mở rộng góc nhìn về con người và xã hội, vận dụng tri thức pháp lý, ngôn ngữ và truyền thông để giải quyết các vấn đề thực tiễn.",
  },
  {
    code: "AAD",
    title: "Thiết kế & Mỹ thuật Ứng dụng",
    english: "Design & Applied Arts",
    description:
      "Phát triển tư duy thẩm mỹ, khả năng sáng tạo và năng lực thiết kế, đưa ý tưởng thành sản phẩm có giá trị ứng dụng trong đời sống.",
  },
] as const;

/** HOMEPAGE SECTION: Danh mục các nhóm chương trình và liên kết sang /programmes. */
export async function ProgrammeCatalog() {
  const content = await websiteContent('home', homeContent);
  return (
    <section className="programmeCatalog" aria-label="Chương trình đào tạo" id="programmes">
      {/* Các nhóm ngành dẫn tới danh mục với bộ lọc tương ứng. */}
      <div className="programmeFieldGrid">
        {content.fields.map((field, fieldIndex) => (
          <article
            className={
              field.code === "PHD" ? "programmeField programmeFieldDoctoral" : "programmeField"
            }
            key={field.code}
          >
            <header>
              <span>{String(fieldIndex + 1).padStart(2, "0")}</span>
              <b>{field.code === "PHD" ? "CHƯƠNG TRÌNH TIẾN SĨ" : "CHƯƠNG TRÌNH THẠC SĨ"}</b>
            </header>
            <p>{field.english}</p>
            <h3>{field.title}</h3>
            <p className="programmeFieldDescription">{field.description}</p>
            <Link className="programmeFieldLink" href={field.code === "PHD" ? "/programmes?degree=Tiến sĩ" : `/programmes?degree=Thạc sĩ&field=${encodeURIComponent(MASTER_FIELDS[fieldIndex].title)}`}>
              Tìm hiểu chương trình <b aria-hidden="true">→</b>
            </Link>
          </article>
        ))}
      </div>

    </section>
  );
}
