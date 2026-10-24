import { CmsManager } from "@/components/cms/CmsManager";
import { backendRequest } from "@/lib/backend-api";

export const metadata = { title: "Cấu hình website" };

export default async function Page() {
  const { contents } = await backendRequest<{ contents: Array<Record<string, unknown> & { id: string }> }>("/api/admin/site-content");
  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <span className="eyebrow">CMS / WEBSITE</span>
          <h1>Cấu hình website</h1>
          <p>Quản lý nội dung và Technical SEO theo từng đường dẫn. SEO dùng section “seo”, page là đường dẫn không gồm locale và value là JSON cấu hình.</p>
          <p>Ví dụ page “/discover”, locale “vi”, key “seo.vi.discover”; chỉ khai báo hreflang khi URL bản dịch đã tồn tại.</p>
          <details open>
            <summary>Nội dung các phần trên trang được sửa ở đâu?</summary>
            <p>Các trường bên dưới chỉ lưu cấu hình website và SEO, không sửa nội dung thân trang. Nội dung trang chi tiết ngành hiện nằm trong <code>frontend/src/data/programmes/&lt;slug-nganh&gt;.ts</code>.</p>
            <ul>
              <li><strong>Phần 01 · Tổng quan:</strong> <code>overviewTitle</code>, <code>overview</code>, <code>overviewImage</code>.</li>
              <li><strong>Phần 02 · Điểm nổi bật và chuẩn đầu ra:</strong> <code>highlights</code>, <code>learningOutcomes</code>.</li>
              <li><strong>Phần 03 · Đối tượng:</strong> <code>audienceHeading</code>, <code>audience</code>.</li>
              <li><strong>Phần 04 · Nghề nghiệp:</strong> <code>careerHeading</code>, <code>careers</code>.</li>
              <li><strong>Chương trình đào tạo:</strong> <code>curriculumIntro</code> và dữ liệu ở <code>frontend/src/data/curricula.ts</code>.</li>
              <li><strong>FAQ:</strong> <code>faqs</code>.</li>
            </ul>
            <p>Thay <code>&lt;slug-nganh&gt;</code> bằng tên file của ngành, ví dụ <code>cong-nghe-thong-tin.ts</code>. Dữ liệu chuẩn đầu ra hiện được khai báo cho ngành Công nghệ thông tin; các ngành khác cần bổ sung chuẩn đầu ra chính thức trước khi hiển thị.</p>
          </details>
          <details>
            <summary>Trường Technical SEO có thể cấu hình</summary>
            <pre>{`{
  "metaTitle": "",
  "metaDescription": "",
  "canonicalUrl": "",
  "robotsIndex": true,
  "robotsFollow": true,
  "ogTitle": "",
  "ogDescription": "",
  "ogImage": "",
  "ogImageAlt": "",
  "ogType": "website",
  "hreflang": { "vi": "/vi/discover", "en": "/en/discover", "x-default": "/vi/discover" },
  "customJsonLd": {}
}`}</pre>
            <p>URL canonical, ảnh OG và hreflang phải cùng domain website. Bỏ các trường không dùng; customJsonLd phải là JSON object tối đa 20 KB.</p>
          </details>
        </div>
      </header>
      <CmsManager endpoint="site-content" kind="site" items={contents} fields={[
        { name: "key", label: "Khóa duy nhất (vd: seo.vi.discover)", required: true, description: "Mã định danh bản ghi cấu hình; không phải tiêu đề hay nội dung hiển thị trên trang." },
        { name: "locale", label: "Ngôn ngữ", type: "select", options: ["vi", "en"], description: "Bản ghi áp dụng cho phiên bản tiếng Việt hoặc tiếng Anh của trang." },
        { name: "section", label: "Chuyên mục (SEO: seo)", required: true, description: "Nhóm cấu hình. Dùng “seo” cho metadata; trường này không chọn section nội dung 01, 02… trên trang." },
        { name: "page", label: "Đường dẫn (vd: /discover)", required: true, description: "Đường dẫn trang được áp dụng, không gồm mã ngôn ngữ; ví dụ /programmes/cong-nghe-thong-tin." },
        { name: "title", label: "Tên cấu hình", description: "Tên để nhận biết bản ghi trong trang quản trị; không thay tiêu đề hiển thị của trang." },
        { name: "value", label: "Dữ liệu JSON", type: "json", required: true, description: "Với section “seo”, các khóa JSON cấu hình tiêu đề, mô tả, canonical, Open Graph và hreflang. Nội dung thân trang ngành học sửa trong tệp dữ liệu được chỉ dẫn ở phần trợ giúp phía trên." },
      ]} />
    </div>
  );
}
