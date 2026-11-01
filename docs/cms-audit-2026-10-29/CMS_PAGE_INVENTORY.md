# Danh mục trang, section và nguồn nội dung

Kiểm kê theo source ngày 29/10/2026, không phải ảnh chụp production. Tất cả đường dẫn công khai bên dưới có tiền tố `/vi` hoặc `/en`. Có 16 file `page.tsx` trong nhóm public; route động không tương đương một trang tĩnh. Registry JSON có 30 định nghĩa, 58 cặp định nghĩa–locale, gồm 21 ngành và các nội dung dùng chung; đây không phải số bản ghi DB đã kiểm tra.

| Route / content ID | Section/thành phần | Nguồn và mức hỗ trợ |
|---|---|---|
| `/` / home | Banner, tìm chương trình, giới thiệu Viện, nghiên cứu, nhóm chương trình, form tư vấn | `data/home-content.ts`, `data/home-cards.json`, component home + patch SiteContent; `websiteLayout`; News slot có trong registry nhưng không render ở page hiện tại |
| `/discover` / discover | Banner, giới thiệu, tầm nhìn/sứ mệnh, triết lý, giá trị, lợi thế, lãnh đạo, lời kết | `DiscoverIntroduction.tsx`, `data/discover-*`, patch và banner; registry có strategy nhưng không thấy section strategy render tương ứng: cần đối chiếu trước cung cấp editor |
| `/programmes` / catalogue | Banner, giới thiệu danh mục, bộ lọc/tìm kiếm, danh sách | `data/programmes/catalogue-copy.ts`, `ProgrammesPage.tsx`, `ProgrammeDirectory.tsx`, websiteProgrammes + patch |
| `/programmes/[slug]` / programme:{id} | Banner, thông tin nhanh, tổng quan, điểm nổi bật/đầu ra, đối tượng, nghề nghiệp, chương trình học, học phí, hồ sơ/hỗ trợ nếu có, FAQ, tư vấn | 21 module `data/programmes/*.ts`, `data/curricula*`, shared-content; patch, collections, layout. Không phải ngành nào cũng có mọi trường tùy chọn |
| `/admissions` / admissions | Banner, thông báo/lịch, điều kiện/phương thức, học phí/học bổng, hồ sơ, quy trình, FAQ, tư vấn | `reference-content.json` là HTML template; `content-copy.json` có vị trí slot; `editorial-content.json`, `content-template.ts`, JS tương tác; patch + layout và danh mục ngành |
| `/research` / research | Hero, tổng quan, mục tiêu, lĩnh vực, dự án/công bố, đối tác chiến lược, hợp tác doanh nghiệp | `ResearchLanding.tsx` chứa copy/danh sách, patch và layout, gọi `ResearchHighlights.tsx`: đọc NewsPost locale vi, revalidate 60 giây, lọc category nghiên cứu từ trang kết quả đầu; fallback 6 mục hardcode nếu thiếu dữ liệu/lỗi |
| `/resources` | Header/footer, banner, lọc/tra cứu, danh sách tài liệu, xem/tải | ResourceFile + ResourceCategory qua API; `ResourcesLanding.tsx`, `ResourcesExplorer.tsx` chứa UI/copy; demo chỉ opt-in ở frontend; chưa dùng websiteContent cho toàn bộ copy trang |
| `/news` và `/news/[slug]` | Bộ lọc/tìm kiếm/phân trang; bài, ảnh bìa, metadata, nội dung HTML, chia sẻ, bài gần đây | NewsPost qua API; **layout đang trả notFound**; frontend query danh sách cố định locale vi; preview client có nhưng API thiếu |
| `/student-success` | Hero, learning, community, experience, services, moments | `data/student-success*`, component StudentSuccessPage + patch; **layout đang trả notFound** |
| Dùng chung / chrome | Brand, menu, contact, about/quick/social/legal links, locations, application | `data/chrome-content.ts`, SiteHeader/SiteFooter, WebsiteChromeProvider; patch; bộ lọc code tiếp tục ẩn news/student-success |
| Dùng chung / shared:vi, shared:en | navigation, common, cta | `messages/vi.json`, `messages/en.json` + patch riêng locale |
| SEO | Title, description, canonical, robots, OG, hreflang, JSON-LD | `lib/page-seo.ts` + SiteContent section `seo`; tin có trường SEO riêng trên NewsPost |

## Route chuyển hướng và hệ thống

| Route | Hành vi source |
|---|---|
| `/admissions/[slug]` | `/admissions#{slug}` |
| `/research/[slug]` | cum-nghien-cuu → #fields; du-an → #du-an; cong-bo → #cong-bo; doi-moi-sang-tao → #goals; hop-tac-doanh-nghiep → anchor cùng tên; doi-tac → #strategic-partners-title; khác → /research |
| `/global` | `/research#strategic-partners-title` |
| `/global/[slug]` | `/research/{slug}`, rồi redirect theo bảng trên |
| `/resources/[slug]` | `/resources` |
| `/student-success/[slug]` | Có logic redirect anchor nhưng layout cha đang chặn |
| `/programmes/[slug]` không tồn tại | thac-si/tien-si → `/programmes?degree=...`; slug khác → `/programmes` |
| `/robots.txt`, `/sitemap.xml`, not-found | Route hệ thống trong app; sitemap cần đồng bộ visibility |
| `/admin`, `/login` | Không tìm thấy page tương ứng trong source đang khảo sát |

Các anchor dự án/công bố cần kiểm tra DOM thực tế: có redirect không chứng minh đích được render. Không tự mở lại trang đang ẩn khi triển khai CMS.

## Giới hạn khả năng chỉnh sửa hiện tại

Có thể đọc patch cho text/ảnh/link và danh sách đã khai báo, chưa có UI/API để người quản trị lưu. Số/boolean và field khóa không đi qua patch text thông thường; một số được hỗ trợ bằng collection riêng. Nội dung trực tiếp trong JSX (ví dụ tiêu đề tầm nhìn, CTA nghiên cứu, nhãn form) cần inventory theo field bổ sung. Registry không tự đảm bảo mỗi field xuất hiện trong renderer. Snapshot `page-defaults.json` có thể khác defaults mới trong TypeScript; phải diff trước import dữ liệu.

## Danh mục ngành nguồn

Mỗi slug sau tương ứng `/programmes/{slug}`, file `frontend/src/data/programmes/{slug}.ts`, content ID `programme:{slug}`, dùng chung ProgrammeDetailPage. Tổng 21 ngành: cong-nghe-thong-tin; marketing; khoa-hoc-moi-truong; ky-thuat-moi-truong; quan-ly-tai-nguyen-moi-truong; cong-nghe-sinh-hoc; ky-thuat-xay-dung; ky-thuat-o-to; quan-tri-kinh-doanh; kinh-doanh-thuong-mai; tai-chinh-ngan-hang; ke-toan; logistics; quan-tri-du-lich; quan-tri-khach-san; luat-kinh-te; quan-he-cong-chung; ngon-ngu-anh; kien-truc; my-thuat-ung-dung; ly-luan-lich-su-my-thuat.

Để nghiệm thu inventory: render toàn bộ route/locale trên staging, ghi lại field → source → patch path → DOM slot; đánh dấu không hiển thị cho trường tùy chọn và route ẩn. Chưa có kiểm chứng trực quan trong lần này.
