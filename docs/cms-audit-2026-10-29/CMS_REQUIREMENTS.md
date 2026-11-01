# Ma trận yêu cầu CMS

P0: điều kiện trước mở quản trị; P1: phạm vi tiếp theo; P2: mở rộng có điều kiện. Tất cả endpoint `/api/admin/*` trong bảng là **đề xuất**, chưa tồn tại.

| Chức năng | Hiện trạng | Mức | Dữ liệu | API cần có | Giao diện | Tiêu chí nghiệm thu |
|---|---|---|---|---|---|---|
| Đăng nhập/đăng xuất | Chưa có | P0 | User, Session mới | auth/login, logout, me | Login, lỗi chung | Phiên hết hạn bị từ chối; không lộ mật khẩu/token |
| Phân quyền | Chưa có | P0 | Role đề xuất | Guard mọi route admin | Ẩn action không được phép | Editor không publish, gọi API trực tiếp vẫn 403 |
| Danh mục trang | Có registry | P0 | Registry + SiteContent | GET pages | Trang/locale/trạng thái | Hiển thị đúng 21 ngành và trang ẩn; không nhân đôi chrome |
| Text/ảnh/link | Có reader/validator | P0 | Patch theo allowlist | GET page, PUT draft | Click ô để vào input/textarea; Lưu/Hủy | Chỉ field hợp lệ thay đổi; không đổi layout/CSS |
| Nháp/xuất bản | Chỉ published/status | P0 | Revision + snapshot | PUT draft, POST publish | Trạng thái và nút riêng | Save không đổi public; publish atomic; truy cập mới thấy đúng bản |
| Preview | Thiếu backend | P0 | Revision, phiên | POST preview, GET preview | Preview dùng renderer thật | Không có session không đọc được nháp; no-store/noindex |
| Lịch sử/khôi phục | Chưa có | P0 | Revision, AuditEvent | GET revisions, POST restore | Diff, chọn bản, xác nhận | Restore tạo nháp mới; lưu tác giả/thời gian |
| Section/order/ẩn | Có composition renderer | P1 | $layout | Draft schema theo page | Danh sách section, sắp thứ tự | Chỉ slot hợp lệ; không trùng ID; giữ cấu trúc phần không quản lý |
| Section bổ sung | Có 4 template | P1 | text/text-image/cards/faq | Cùng draft API | Form theo template | Không cho CSS/JS tùy ý; responsive đúng |
| Chương trình | 21 ngành nguồn + dynamic reader | P1 | SiteContent + programme registry | pages, programme create/state | Form ngành/khung học/phí | Sửa một ngành không ảnh hưởng ngành khác; đúng lựa chọn tư vấn |
| Tuyển sinh | Template và slot patch | P1 | copy, editorial, programme refs | pages/admissions draft | Form theo 8 section | Slot không lệch; form tư vấn POST vẫn hoạt động |
| Giới thiệu/nghiên cứu | Copy + collections | P1 | leaders, partners, goals, fields | pages draft | Danh sách có thêm/xóa/sắp xếp | Validation từng item, ảnh có alt, link an toàn |
| Tin tức | DB/read API; route ẩn | P1 | NewsPost + revisions | CRUD news + publish | Danh sách, editor có giới hạn | HTML an toàn, nháp không lộ; chỉ mở public khi nội dung đã duyệt |
| Tài liệu/chuyên mục | DB/read API | P1 | ResourceFile/Category | CRUD resources/categories | Danh sách, bộ lọc, chọn file | Không xóa category đang dùng; file tải đúng MIME/tên |
| Upload/thay thế/xóa | Chỉ đọc object | P0 cho ảnh pilot; P1 đầy đủ | MediaAsset/reference mới | media upload/list/delete | Thư viện, dung lượng, alt | Chặn sai MIME/kích thước; file đang tham chiếu không xóa |
| Menu/footer/banner | Có patch reader | P1 | chrome/$banner | page draft | Form link, preview desktop/mobile | Giữ branding; không tạo menu tới route bị chặn |
| SEO/locale | Reader có; coverage lệch | P1 | SiteContent seo, NewsPost | SEO draft/publish | Tab SEO và locale | Canonical hợp lệ; không ghi nhầm VI/EN |
| Chờ duyệt | Chưa có | P2 | Revision state | submit/review | Inbox duyệt | Chỉ bổ sung nếu xác nhận quy trình; không tự buộc mọi nội dung chờ duyệt |
| Quản lý tư vấn | Có nhận form + lịch sử | P2 riêng | Consultation/History | Admin riêng khi cần | CRM tối thiểu | Không đưa dữ liệu người đăng ký vào API public/CMS content |
| Backup/restore | Chưa kiểm chứng | P0 | DB + media + manifest | Tác vụ vận hành | Runbook | Restore trên DB/bucket sạch; kiểm tra hash và public |

## Vai trò đề xuất

Editor: đọc/sửa nháp, preview, upload; Publisher: thêm publish/archive/restore; Admin: quản lý tài khoản và vai trò. Quyền xóa tài sản và tài khoản dành Admin; xóa nội dung ưu tiên archive có lịch sử. Đây là mô hình khuyến nghị, chưa phải vai trò tổ chức đã xác nhận. Không yêu cầu thêm bảng role/permission động nếu ba vai trò cố định đáp ứng nhu cầu.

## Yêu cầu phi chức năng

- Public giữ màu, typography, spacing, layout, breakpoint, markup khi chưa chủ động sửa cấu trúc. Tái sử dụng token trong `docs/UI_DESIGN_SYSTEM.md`, `docs/design-system.md` sau đối chiếu CSS thực tế. Admin chưa tồn tại trong repo nên cần xây theo hệ nhận diện hiện tại; không tuyên bố tái sử dụng admin sẵn có.
- View/Edit/Save/Publish phân biệt rõ; click nội dung bằng chuột hoặc Enter mở field; Esc hủy; focus rõ, label đầy đủ. Dirty-form warning, trạng thái đang lưu và lỗi có thể thử lại; xác nhận archive/xóa/thay thế nguy hiểm.
- API xác thực, CSRF/origin, validation server, giới hạn body/file, rate-limit; không lưu secrets vào repo; log không chứa PII/session đầy đủ.
- Revision có optimistic concurrency; hai editor không âm thầm ghi đè. API public chỉ đọc bản published, không đọc draft khi có lỗi.
- Mục tiêu hiệu năng đề xuất: publish phản ánh ở request public kế tiếp sau commit; CMS list phân trang tối đa 100; đo p95 và payload trước/sau trên cùng staging, chưa có baseline để cam kết SLA số.
- Backup mục tiêu đề xuất RPO 24 giờ/RTO 4 giờ cần IT xác nhận; kiểm thử restore trước bàn giao. Có rollback ứng dụng và dữ liệu riêng.
- Không dữ liệu mẫu thay dữ liệu vận hành. Không nâng framework, đổi env hay triển khai production trong phạm vi khảo sát.
