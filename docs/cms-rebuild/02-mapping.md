# Ánh xạ website sang CMS

Thứ tự dưới đây là thứ tự cấu trúc nguồn được khảo sát, chưa bao gồm layout override trong database. URL public có tiền tố `/vi` hoặc `/en`. Header/footer/CTA dùng chung phải được đối chiếu riêng, không nhân bản nội dung vào từng trang.

## Trang và thứ tự mục

| Trang | Thứ tự theo nguồn | Nguồn và renderer | Trường quản trị đề xuất | Phần cố định |
|---|---|---|---|---|
| `/` | Header → hero → tìm chương trình → giới thiệu → nghiên cứu → nhóm chương trình → tin → tư vấn → footer | `app/(public)/page.tsx`; `data/home-content.ts`; `features/home/components/*` | Nhóm hero, programmeSearch, overview, research, researchLinks, fields; tin tham chiếu NewsPost; tư vấn dùng chung | Slot, grid, header, CSS, cách bố trí form |
| `/discover` | Hero → giới thiệu → tầm nhìn/sứ mệnh → triết lý → giá trị → lợi thế → lãnh đạo → kết thúc | `DiscoverIntroduction.tsx`; discover-introduction.json, discover-media.ts, discover-leadership.ts | Nội dung, media, actions, leaders theo đúng mục render | Không tự đưa strategy trong registry cũ lên trang |
| `/programmes` | Hero/breadcrumb/thống kê → bộ lọc và danh mục → NextStepCTA → footer | `ProgrammesPage.tsx`, `ProgrammeDirectory.tsx`, catalogue-copy.ts | Nội dung banner/thống kê hiện có; nhãn bộ lọc; bản ghi ngành từ nguồn chung | Không tự tính lại số thống kê nếu hiện đang là copy đã duyệt; cấu trúc card/grid giữ nguyên |
| `/programmes/[slug]` | Hero → facts → điều hướng nội trang → tổng quan → điểm nổi bật → đối tượng → nghề nghiệp → đào tạo → học phí → hồ sơ/hỗ trợ nếu có → CTA → FAQ/liên hệ → form tư vấn → footer | `ProgrammeDetailPage.tsx`, `ProgrammeSupplementaryContent.tsx`, `curricula.ts` | Chi tiết theo 03-programme-template.md | Giữ thứ tự nguồn và điều kiện render, rồi đối chiếu override |
| `/admissions` | Hero → thông báo/lịch → điều kiện/phương thức → học phí/học bổng → hồ sơ → quy trình → FAQ → tư vấn | `AdmissionsReference.tsx`, reference-content.json, cms-copy.json, editorial-content.json, reference-engine.js | Các text/attribute slot đã có; nội dung tương tác theo bậc đào tạo | HTML engine, tab/modal, selector, khoảng offset template không cho sửa tùy ý |
| `/research` | Hero → overview → goals → fields → partners → industry | `ResearchLanding.tsx`; research-copy/cards/partners.json | Tiêu đề, đoạn, cards, đối tác, ảnh và link tương ứng | Không xuất component phụ không được gọi thành mục CMS đang hiển thị |
| `/student-success` | Hero → learning → community → experience/services → moments → footer | `StudentSuccessPage.tsx`, student-success-content.ts | Nội dung zigzag, cards dịch vụ, ảnh khoảnh khắc | Thứ tự hai khối, chiều đảo, grid và responsive |
| `/news` | Giữ cấu trúc NewsLanding: banner/nhóm tin/bộ lọc/danh sách theo renderer | `NewsLanding.tsx`, news/data.ts, news/demo-posts.ts | Nhãn tĩnh cần kiểm kê literal; dữ liệu NewsPost và card nguồn | Thứ tự ưu tiên API/demo đang có không tự thay |
| `/news/[slug]` | Khung bài theo page.tsx: thông tin bài, ảnh, thân bài, chia sẻ và phần liên quan | `app/(public)/news/[slug]/page.tsx`, NewsDetail.module.css | title, category, authorName, publishedAt, coverImage/alt, content, metadata | Khung bài, typography, vị trí chia sẻ giữ nguyên |
| `/resources` | Header → breadcrumb → banner → ResourcesExplorer → footer | `ResourcesLanding.tsx`, ResourcesExplorer.tsx, resources/data.ts | Copy banner hiện hardcode; category, title, description, file metadata | Bộ lọc, cách trình bày tài nguyên và chế độ nguồn hiện tại |
| Dùng chung | Header, navigation/mega menu; footer, liên hệ, địa chỉ; sticky actions; CTA; form tư vấn | `data/chrome-content.ts`, `data/site.ts`, messages/vi.json/en.json, shared/components/layout, ResourcesConsultation.tsx | Một nguồn cho từng nội dung thật sự dùng chung; giữ override riêng nếu có | Navigation structure, breakpoint, form fields và hành vi hiện có |

## Các route chuyển hướng phải giữ

- `/admissions/[slug]` → anchor trang admissions.
- `/research/[slug]` → anchor ánh xạ trong route, mặc định về research.
- `/student-success/[slug]` → anchor được hỗ trợ hoặc trang gốc.
- `/resources/[slug]` → resources.
- `/global` → research#strategic-partners-title; `/global/[slug]` qua research/[slug].
- Programme slug hợp lệ render chi tiết; `thac-si`/`tien-si` lọc danh mục; slug không khớp hiện chuyển danh mục. Không tự đổi thành 404 trong dự án CMS.
- News giữ nhánh legacy redirect. Không thêm trang con Discover chỉ vì tài liệu cũ có nhắc: cây route hiện tại không có `discover/[slug]`.

## Cách đọc bảng trường

`field-mapping.csv/json` lưu giá trị nguồn và từng đường dẫn trường, kiểu dữ liệu, vùng nhóm, cờ shared, khả năng sửa hiện tại, quy tắc đề xuất và giới hạn kiểm chứng. Array index là vị trí dữ liệu nguồn, không phải chứng minh thứ tự DOM runtime. Các trường khóa như id, variant, className phải giữ; trường nghiệp vụ code/degree chỉ được đổi theo quy trình riêng được duyệt.

Không chuyển toàn bộ 6.480 trường thành 6.480 input. Gom thành biểu mẫu theo mục và collection có cấu trúc, lọc các trường thực sự render. Giá trị null, số và boolean vẫn có trong inventory để không mất thông tin khi chuyển đổi.

## Khoảng trống cần đóng trước chốt mapping cuối

- Phụ lục là inventory nguồn đầy đủ của 30 document được script frontend tổng hợp, chưa là inventory đầy đủ mọi literal trong JSX, dictionary và dữ liệu DB.
- Đối chiếu từng field với consumer render, nhất là strategy Discover, labels hardcode News/Resources, CTA và các field dự phòng.
- Gắn tên nhãn tiếng Việt và selector/DOM vị trí cho từng field sau khi kiểm tra trang chạy; không lấy nhãn kỹ thuật làm UX cuối.
- Phân tích nội dung legacy/demo đang hiện thật, xác định giữ nguồn hay nhập thành bản ghi mà không đổi thứ tự/URL.
- Kiểm tra banner override và collection patch; giữ trạng thái đã resolve trước khi khóa cấu trúc.

Validation mới áp dụng cho lần sửa/xuất bản tương lai. Không cắt dữ liệu hiện tại để vừa giới hạn mới; trường vượt giới hạn cần cảnh báo và giữ nguyên trong chuyển đổi.
