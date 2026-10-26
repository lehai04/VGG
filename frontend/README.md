# Cấu trúc website công khai

Đây là thư mục nguồn đang chạy của website. `app` quyết định URL; `features` chứa giao diện; `data` chứa dữ liệu mặc định. Không tạo thêm một phiên bản giao diện khi route đã có component tương ứng.

```text
frontend/
├── src/
│   ├── app/                    # Route Next.js, API, layout và CSS toàn website
│   │   ├── (public)/           # Các trang công khai và route chuyển hướng
│   │   ├── api/                # API trung gian của frontend
│   ├── features/               # Giao diện theo nhóm chức năng
│   │   ├── admissions/         # Trang tuyển sinh: AdmissionsReference + bộ reference/CMS
│   │   ├── content/            # Nội dung và CTA dùng chung
│   │   ├── discover/           # Về Viện: chỉ DiscoverIntroduction và CSS đi kèm
│   │   ├── home/               # Các section của trang chủ
│   │   ├── news/               # Tin tức, chia sẻ và nguồn bài viết
│   │   ├── programmes/         # Danh mục, bộ lọc và chi tiết ngành
│   │   ├── research/           # Nghiên cứu, tin liên quan, đối tác
│   │   ├── resources/          # Kho tài liệu và bộ lọc
│   │   └── student-success/    # Hành trình người học
│   ├── data/                   # Nội dung mặc định; programmes/ chứa dữ liệu từng ngành
│   ├── shared/                 # Header, footer, CMS renderer, analytics
│   ├── lib/                    # Kết nối CMS, SEO và tiện ích server
│   ├── i18n/                   # Component ngôn ngữ và liên kết
│   ├── messages/               # Nhãn VI/EN dùng chung
│   └── proxy.ts                # Xử lý tiền tố ngôn ngữ và preview
├── public/                     # Ảnh, tài liệu và fonts/maison-neue đang được phục vụ
└── tests/                      # Kiểm thử frontend
```

## Tìm đúng file theo trang

Các đường dẫn component bên dưới tính từ `src/`. URL công khai có tiền tố `/vi` hoặc `/en`.

| URL | File giao diện chính |
| --- | --- |
| `/` | `app/(public)/page.tsx` ghép `features/home/components/*` |
| `/discover` | `features/discover/components/DiscoverIntroduction.tsx` |
| `/programmes` | `features/programmes/components/ProgrammesPage.tsx` |
| `/programmes/[slug]` | `features/programmes/components/ProgrammeDetailPage.tsx` nếu slug là ngành |
| `/admissions` | `features/admissions/AdmissionsReference.tsx` |
| `/research` | `features/research/components/ResearchLanding.tsx` |
| `/student-success` | `features/student-success/components/StudentSuccessPage.tsx` |
| `/news` | `features/news/components/NewsLanding.tsx` |
| `/news/[slug]` | `app/(public)/news/[slug]/page.tsx`; CSS ở `features/news/components/NewsDetail.module.css` |
| `/resources` | `features/resources/components/ResourcesLanding.tsx` |

Các route `/global`, `/global/[slug]`, `/admissions/[slug]`, `/research/[slug]`, `/student-success/[slug]`, `/resources/[slug]` vẫn cần thiết: chúng chuyển URL cũ tới nội dung hiện hành. Không xóa chúng chỉ vì không có JSX. Slug chương trình không khớp ngành cũng chuyển về danh mục; Thạc sĩ/Tiến sĩ dùng bộ lọc.

## Sửa nội dung và style

- Bố cục trang: component trong bảng trên; CSS Module đặt cạnh component.
- Văn bản và ảnh mặc định: `src/data/`; nội dung CMS đã xuất bản hoặc preview có thể ghi đè các giá trị này qua `src/lib/website-content.ts`.
- Style chung: `src/app/globals.css`, `home.css`, `content-format.css`, `banner-layout.css` và `../shared/styles/typography.css`, được nạp trong root layout.
- Metadata nhóm trang nằm ở `src/lib/section-metadata.ts`. Template `SectionPages` cũ và renderer `CmsPublishedItems` đã được loại bỏ; các trang tin tức/tài nguyên dùng component riêng.
- `data/research-cards.json` còn được `../scripts/export-cms-defaults.ts` sử dụng; không phải file rác dù route không import trực tiếp.
- Ảnh trong `public` có thể được CMS tham chiếu bằng URL. Không xác định ảnh thừa chỉ bằng tìm kiếm import TypeScript.
- `.next`, `tsconfig.tsbuildinfo`, `next-env.d.ts` là đầu ra/cache của công cụ. `node_modules` là thư viện cài đặt; không phải thư mục viết trang.

## Quy tắc duy trì

1. Tìm route trước, rồi lần theo import đến component đang chạy.
2. Tái sử dụng template ngành; thêm dữ liệu ngành trong `data/programmes`, không sao chép trang chi tiết.
3. Xóa component cũ và CSS riêng khi đã thay thế và không còn tham chiếu. Dùng Git để xem lịch sử thay vì lưu bản `old`, `backup` trong nguồn.
4. Kiểm tra tham chiếu từ CMS, scripts và tests trước khi xóa dữ liệu hoặc tài nguyên.
5. Chạy `npm run check --workspace=frontend` từ thư mục gốc sau khi thay đổi cấu trúc.

Đợt dọn này loại bỏ 32 file không còn dùng: các giao diện giới thiệu thay thế, trang con tuyển sinh/nghiên cứu cũ, trang bậc học cũ, UI primitives không được gọi và CSS/dữ liệu chỉ phục vụ chúng. URL và dữ liệu CMS hiện hành được giữ nguyên.
