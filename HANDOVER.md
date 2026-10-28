# Bàn giao website VGG

## Cài đặt mới

1. Cài Docker Engine/Desktop với Compose và Git LFS; chạy `git lfs pull` sau khi clone.
2. Sao chép `.env.example` thành `.env`. Thay mật khẩu, đặt `PUBLIC_APP_URL` theo domain.
   Mật khẩu PostgreSQL dùng trong URL: chọn chuỗi hex dài hoặc percent-encode ký tự đặc biệt.
3. Chạy `docker compose up -d --build`.
4. Kiểm tra `docker compose logs migrate` và `docker compose ps`.
   Mở `http://localhost:3000/vi` hoặc domain đã cấu hình.

Frontend chờ backend khỏe; backend chờ migrate và seed thành công. PostgreSQL và MinIO
chỉ mở trong mạng Docker. Reverse proxy HTTPS trỏ tới cổng 3000 của frontend.
`PUBLIC_PORT` cho phép đổi cổng host nếu cần.

## Database và nội dung

Schema mới chỉ gồm bài viết, tài liệu, danh mục tài liệu, nội dung trang, lượt truy cập,
yêu cầu tư vấn và lịch sử yêu cầu. Tác giả bài viết được lưu bằng tên hiển thị.

- Schema: `backend/prisma/schema.prisma`.
- Migration khởi tạo: `backend/prisma/migrations/20261028000000_public_foundation/`.
- Seed: `npm run db:seed` — 58 bản ghi nội dung, 4 tin tóm tắt có nguồn và 8 tài liệu.
- Dữ liệu trang: `backend/src/modules/content/page-defaults.json`.
- PDF: `frontend/public/documents/demo/`; giữ URL cũ để các liên kết tài liệu còn hoạt động.
- Seed không ghi đè bản ghi đã có và không tạo người đăng ký giả.

Migration này dành cho database trống. Không chạy chồng lên database đang có lịch sử
migration khác. Volume mới được đặt tên `vgg_public_postgres_data`; volume cũ không bị xóa.
Khi chuyển hệ thống đang có dữ liệu: sao lưu trước, tạo database mới, chạy migration,
chuyển dữ liệu website bằng script bên dưới, sau đó seed và kiểm tra trước khi đổi kết nối.

```sh
# Thiết lập SOURCE_DATABASE_URL và DATABASE_URL bằng biến môi trường.
# Database đích đã migrate và chưa seed; database nguồn chỉ được đọc.
node scripts/transfer-public-data.mjs
npm run db:seed
```

Script chỉ chuyển các bảng website được liệt kê rõ ràng và những cột còn trong schema mới.
Database đích phải trống; toàn bộ thao tác ghi nằm trong một transaction. Media MinIO cần
được đồng bộ riêng nếu dữ liệu cũ tham chiếu tới object storage.

## Chạy trực tiếp bằng Node.js

Node theo `.nvmrc`. Cấu hình `backend/.env` và `frontend/.env.local` từ file mẫu.
`DATABASE_URL` phải có khi build/generate Prisma. PostgreSQL và MinIO cần được cung cấp
riêng khi chạy ngoài Compose.

```sh
npm ci
npm run db:deploy
npm run db:seed
npm run build
npm run start:backend
# Terminal thứ hai
npm start
```

## Nghiệm thu và sao lưu

- Mở VI/EN, danh mục/chi tiết chương trình, tuyển sinh, nghiên cứu, tin và tài liệu.
- Kiểm tra tìm kiếm/lọc tin, tải PDF và gửi form tư vấn; xác nhận dòng mới trong `consultations`.
- Khởi động lại backend rồi kiểm tra dữ liệu vẫn còn. Seed lại không nhân đôi nội dung.
- Backend `/ready` phải trả 200. Các API public chỉ phục vụ đọc nội dung, ghi lượt truy cập
  và nhận yêu cầu tư vấn.
- Dùng `pg_dump` để backup PostgreSQL và sao lưu MinIO riêng. Kiểm tra restore trước bàn giao.
- Script `scripts/smoke-public.mjs` có phase `create` và `check`, chạy trên database kiểm thử
  riêng với `ALLOW_PUBLIC_SMOKE=true`. Phase `check` dọn bản ghi tư vấn mà script đã tạo.

Kết quả kiểm tra của bản hiện tại được ghi tại `docs/VERIFICATION.md`.
