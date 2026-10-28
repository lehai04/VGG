# Xác minh bản website public — 28/10/2026

- Build frontend và backend trên Windows: đạt.
- Build production trong Docker từ source và lockfile: đạt.
- 47 kiểm thử tự động: 2 backend và 45 frontend đều đạt.
- Migration trên PostgreSQL trống: đạt, tạo đúng 7 bảng nghiệp vụ public.
- Seed: 58 bản ghi nội dung, 4 tin, 8 tài liệu; chạy lại không nhân đôi.
- HTTP VI/EN, chương trình, tuyển sinh, tin, tài liệu và tải PDF: đạt.
- Form đi qua frontend → backend → PostgreSQL, có lịch sử và tồn tại sau restart: đạt.
- Chuyển dữ liệu website từ database thử nghiệm trước sang schema mới: đạt.
  Đã kiểm tra 58 nội dung, 4 tin, 8 tài liệu, đổi namespace nội dung và chặn đích không trống.
- Bản ghi form và database chuyển dữ liệu tạm đã được dọn sau kiểm thử.

Schema gồm `news_posts`, `resource_files`, `resource_categories`, `site_contents`,
`page_visits`, `consultations`, `consultation_history`. Không tính bảng theo dõi migration
của Prisma trong 7 bảng nghiệp vụ này.
