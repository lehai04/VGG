# Bản đồ page và section của website VGG

Tài liệu này trả lời ba câu hỏi: route nằm ở đâu, giao diện được render bởi component nào, và khi cần sửa thì nên sửa file dùng chung hay file riêng.

## 1. Quy tắc tổ chức

- `app/**/page.tsx`: khai báo route. File route nên mỏng, ưu tiên ghép component và metadata.
- `components/layout`: header, footer và hành động dùng lại ở nhiều page.
- `components/home`: section chỉ thuộc homepage.
- `components/sections`: template hoặc section lớn dùng cho các page ngoài homepage.
- `data`: nguồn dữ liệu chung cho menu, page và liên kết.
- `app/globals.css`: token, layout và responsive dùng chung.
- `app/home.css`: style đặc thù của homepage; không đặt style dùng chung tại đây.

Khi sửa một thành phần, ưu tiên theo thứ tự: data dùng chung → component dùng chung → CSS dùng chung → code riêng của page.

## 2. Page lớn và route

| Route              | File route                     | Component chính                          | Ghi chú                               |
| ------------------ | ------------------------------ | ---------------------------------------- | ------------------------------------- |
| `/`                | `app/page.tsx`                 | `components/home/*`                      | Homepage riêng, ghép nhiều section.   |
| `/discover`        | `app/discover/page.tsx`        | Render trực tiếp                         | Landing editorial riêng của Discover. |
| `/programmes`      | `app/programmes/page.tsx`      | `components/sections/ProgrammesPage.tsx` | Landing chương trình chuyên biệt.     |
| `/admissions`      | `app/admissions/page.tsx`      | `SectionLanding`                         | Kế thừa template và dữ liệu chung.    |
| `/research`        | `app/research/page.tsx`        | `SectionLanding`                         | Kế thừa template và dữ liệu chung.    |
| `/global`          | `app/global/page.tsx`          | `SectionLanding`                         | Kế thừa template và dữ liệu chung.    |
| `/student-success` | `app/student-success/page.tsx` | `SectionLanding`                         | Kế thừa template và dữ liệu chung.    |
| `/news`            | `app/news/page.tsx`            | `SectionLanding`                         | Kế thừa template và dữ liệu chung.    |
| `/resources`       | `app/resources/page.tsx`       | `SectionLanding`                         | Kế thừa template và dữ liệu chung.    |

Các file nền tảng của App Router:

- `app/layout.tsx`: font, metadata mặc định, favicon và root HTML/body.
- `app/not-found.tsx`: giao diện 404.
- `app/robots.ts`: tạo `/robots.txt`.
- `app/sitemap.ts`: tạo `/sitemap.xml` từ dữ liệu menu chung.
- `app/api/consultations/route.ts`: API nhận form tư vấn.

## 3. Page nhỏ của Discover

Tất cả trang con dùng chung một dynamic route:

- `app/discover/[slug]/page.tsx`

Các URL được render từ cùng template:

- `/discover/gioi-thieu`
- `/discover/tam-nhin-su-menh`
- `/discover/lanh-dao`
- `/discover/vi-sao-chon-vgg`
- `/discover/xep-hang-thanh-tuu`
- `/discover/lien-he`

Tên, mô tả ngắn và slug dùng cho navigation nằm trong `data/site.ts`. Nội dung dài riêng của từng trang nằm trong object `pages` của dynamic route.

## 4. Section của homepage

Thứ tự render được khai báo tại `app/page.tsx`:

1. `components/home/Header.tsx`: top bar, logo, navigation và mega menu homepage.
2. `components/home/Hero.tsx`: hero, CTA và số liệu đầu trang.
3. `components/home/Programmes.tsx`: giới thiệu VGG, video và thống kê.
4. `components/home/Research.tsx`: nghiên cứu và đổi mới.
5. `components/home/ProgrammeCatalog.tsx`: nhóm chương trình đào tạo.
6. `components/home/Admissions.tsx`: quy trình tuyển sinh.
7. `components/home/StudentSuccess.tsx`: dịch vụ hỗ trợ học viên.
8. `components/home/News.tsx`: tin tức và sự kiện.
9. `components/home/ResourcesConsultation.tsx`: tài nguyên và form tư vấn.
10. `components/home/Footer.tsx`: footer riêng của homepage.

Các utility của homepage:

- `components/home/ImmersiveVideo.tsx`: player/video giới thiệu.
- `components/home/CountUp.tsx`: animation đếm số.
- `components/home/ScrollReveal.tsx`: kích hoạt animation khi cuộn.
- `components/home/index.ts`: barrel export giúp `app/page.tsx` import gọn.

## 5. Template và section của các page khác

- `components/sections/SectionPages.tsx`
  - `SectionLanding`: template chung cho sáu landing page.
  - `SectionHero`: hero dùng chung của template.
  - `CallToAction`: CTA dùng chung cuối page.
  - `sectionMetadata`: tạo title/description từ `data/site.ts`.
- `components/sections/ProgrammesPage.tsx`
  - `ProgrammesLanding`: page component chuyên biệt của `/programmes`.
- `components/sections/ProgrammeFinder.tsx`
  - Section tương tác để tìm kiếm, lọc và sắp xếp chương trình.

## 6. Layout dùng chung

- `components/layout/SiteHeader.tsx`
  - Header của các page ngoài homepage.
  - `UtilityBar` và `BrandLink` là các phần nhỏ được kế thừa trong hai biến thể header.
- `components/layout/SiteFooter.tsx`
  - `SiteFooter`: footer của các page ngoài homepage.
  - `StickyActions`: cụm AI, Facebook và Zalo.

Homepage có header/footer riêng vì bố cục khác, nhưng dữ liệu navigation vẫn kế thừa từ `data/site.ts`.

## 7. Dữ liệu và logic

- `data/site.ts`
  - `discoverSections`: nguồn duy nhất cho tên/slug trang con Discover.
  - `menuGroups`: nguồn duy nhất cho navigation và nội dung template landing.
  - `programmes`: danh sách tên chương trình dùng chung.
  - `findGroup`: tìm menu group theo slug.
- `lib/consultation.ts`: validation và kiểu dữ liệu của form tư vấn.

## 8. Style và responsive

- `app/globals.css`
  - Design tokens màu VLU/VGG.
  - Reset và accessibility.
  - Header/footer/layout dùng chung.
  - Landing page, Discover, Programmes và responsive toàn site.
- `app/home.css`
  - Chỉ style của các homepage section.
  - Các breakpoint riêng cần thiết cho bố cục homepage.

Không tạo thêm file CSS cho một page nếu có thể mở rộng selector hoặc token dùng chung trong `globals.css`.

## 9. Asset

- `public/images/logo/logo-vgg.png`: logo chính.
- `public/images/logo/legacy-vgg-institute-logo.png`: logo cũ/dự phòng.
- `public/images/hero/campus-hero.jpg`: ảnh khuôn viên dùng ở hero và Discover.
- `public/images/programmers/pic_pro.jpg`: ảnh học viên/tốt nghiệp.
- `public/favicon.svg`: favicon.
- `app/fonts/*.otf`: các weight của Maison Neue dùng toàn website.

## 10. Test và cấu hình liên quan

- `tests/project.test.mjs`: kiểm tra workflow, API và sự tồn tại độc lập của các route.
- `package.json`: script `dev`, `check`, `build` và dependencies.
- `next.config.ts`: cấu hình Next.js và security headers.
- `eslint.config.mjs`: quy tắc lint.
- `.prettierrc.json`, `.prettierignore`: quy tắc format.
- `tsconfig.json`: TypeScript và alias `@/*`.

## 11. Cách sửa nhanh

- Đổi tên hoặc thêm menu: sửa `data/site.ts`.
- Đổi header/footer trang con: sửa `components/layout`.
- Đổi một section homepage: sửa đúng file trong `components/home`.
- Đổi toàn bộ landing page chung: sửa `components/sections/SectionPages.tsx`.
- Đổi riêng `/programmes`: sửa `components/sections/ProgrammesPage.tsx` hoặc `ProgrammeFinder.tsx`.
- Đổi riêng `/discover`: sửa `app/discover/page.tsx`.
- Đổi nội dung trang con Discover: sửa object `pages` trong `app/discover/[slug]/page.tsx`.
- Đổi responsive toàn site: sửa `app/globals.css`; chỉ dùng `app/home.css` nếu thay đổi thật sự riêng cho homepage.
