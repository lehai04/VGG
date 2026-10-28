# Bàn giao website public — giai đoạn không CMS

Branch: `codex/static-no-cms`. Website chạy Next.js + Fastify + PostgreSQL;
đây là bản ứng dụng có backend và lưu dữ liệu thật. Không triển khai admin portal,
đăng nhập quản trị, API chỉnh sửa nội dung, preview CMS hoặc lịch xuất bản.

## Cài đặt bằng Docker

1. Cài Docker Engine/Desktop với Compose và Git LFS. Chạy `git lfs pull` sau khi clone
   để lấy đủ PDF và media (không dùng file pointer LFS làm tài liệu).
2. Sao chép `.env.example` thành `.env`, thay các mật khẩu và `PUBLIC_APP_URL`.
   Mật khẩu PostgreSQL dùng trong URL: dùng chuỗi hex dài, hoặc percent-encode ký tự đặc biệt.
3. Chạy `docker compose up -d --build`.
4. Xem `docker compose logs migrate`: phải hoàn thành toàn bộ migration và seed.
   Kiểm tra `docker compose ps`, rồi mở `http://localhost:3000/vi`.

Compose dựng PostgreSQL, MinIO, backend và frontend. Service `migrate` chạy xong trước
backend; frontend đợi backend kết nối được database. Backend không mở cổng ra ngoài.
MinIO phục vụ media đã nhập; PDF bàn giao nằm trong `frontend/public/documents/demo`.
Tên thư mục `demo` được giữ để các URL tài liệu hiện hữu không bị hỏng.
Khi triển khai domain thật, đặt reverse proxy HTTPS trước cổng 3000.

## Migration và dữ liệu

- Schema và lịch sử SQL: `backend/prisma/schema.prisma`, `backend/prisma/migrations/`.
- Dữ liệu trang: `backend/src/modules/cms/page-defaults.json`.
- Seed: `backend/prisma/seed-public.ts`. Nhập nội dung trang VI/EN, danh mục tài liệu,
  PDF sẵn có và các tin tóm tắt kèm link bài gốc VLU. Không có dữ liệu người đăng ký giả.
- Seed dùng upsert với `update: {}`: chạy lại không ghi đè nội dung hoặc yêu cầu tư vấn.
- Giữ lịch sử schema tương thích với giai đoạn CMS sau này. Các bảng author/role vẫn
  tồn tại vì khóa ngoại; seed chỉ tạo một bản ghi tác giả khóa vĩnh viễn, không tạo tài khoản đăng nhập.
- Các tiện ích thuần xử lý nội dung trong `backend/src/modules/cms` được frontend dùng
  để render nội dung; chúng không cung cấp API quản trị.
- Đây là dữ liệu có trong mã nguồn bàn giao, không phải bản sao database production.
  Nếu cần chuyển dữ liệu đang vận hành, IT phải backup/restore PostgreSQL và đồng bộ bucket MinIO;
  không chỉ copy schema. Không đưa bản backup chứa thông tin cá nhân vào Git.

Chạy thủ công khi đã cấu hình `backend/.env` và `frontend/.env.local`:

```sh
npm ci
npm run db:deploy
npm run db:seed
npm run build
npm run start:backend
# Terminal thứ hai
npm start
```

Node theo `.nvmrc`/`package.json`. `DATABASE_URL` phải có khi Prisma generate/build.
Không chạy bootstrap admin. `VGG_DEMO_NEWS=false`, `VGG_DEMO_RESOURCES=false` để tin
và tài liệu đọc từ database; đây cũng là mặc định của branch này.

## Nghiệm thu

1. Mở trang VI/EN, danh mục và chi tiết chương trình, tuyển sinh, nghiên cứu.
2. Tìm kiếm/lọc tin, mở bài; tra cứu, xem và tải PDF.
3. Gửi một form tư vấn hợp lệ, xác nhận hàng mới trong bảng `consultations`.
   Khởi động lại backend rồi kiểm tra hàng vẫn tồn tại.
4. Backend `/ready` trả 200; `/api/admin/*`, `/api/auth/*` và preview CMS trả 404.
5. Chạy lại `npm run db:seed`, xác nhận không nhân đôi dữ liệu và không mất form đã gửi.

Không dùng gói HTML snapshot `VGG-STATIC-IT` cũ để triển khai bản này.
Các tài liệu CMS cũ còn trong lịch sử Git chỉ dành cho giai đoạn sau; dùng tài liệu này
làm đầu mối triển khai branch public.

## Kết quả xác minh ngày 28/10/2026

- Build production frontend/backend trên Windows và trong Docker: đạt.
- Bộ kiểm thử: 2 backend + 45 frontend, tất cả đạt; lint và kiểm tra whitespace đạt.
- Khởi tạo PostgreSQL trống: cả 9 migration thành công; seed tạo 58 bản ghi nội dung,
  4 tin tóm tắt có nguồn và 8 tài liệu.
- Smoke test HTTP: trang VI/EN, chương trình, tuyển sinh, tin tức, tài liệu và PDF đạt.
- Form tư vấn gửi qua API frontend, backend lưu vào PostgreSQL và ghi lịch sử thành công.
- Restart backend và chạy seed lần hai: form còn nguyên, số lượng nội dung không đổi.
  Bản ghi form kiểm thử đã được xóa sau xác minh.
- Các route quản trị/auth/preview đã kiểm tra trả 404.

Script `scripts/smoke-public.mjs` hỗ trợ kiểm tra lại trên database thử nghiệm riêng:
chạy phase `create`, restart backend và seed lại, rồi chạy phase `check`.
Phải đặt `ALLOW_PUBLIC_SMOKE=true`; không chạy script này trên database production.
