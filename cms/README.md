# CMS Viện Sau Đại học

Ứng dụng quản trị riêng, không import mã nguồn hoặc CSS của website.

Từ thư mục VGG: `npm install`, sao chép `cms/.env.example` thành `cms/.env.local`, chạy `npm run dev:cms`.
Mở http://localhost:3001. Website tiếp tục dùng http://localhost:3000.
Backend đặt `CMS_APP_URL=http://localhost:3001`; hai ứng dụng dùng cùng `BACKEND_INTERNAL_URL`.

Build: `npm run build:cms`. Production: `npm run start:cms`.
Xem `../docs/CONSULTATION_ADMIN.md` để chạy migration và tạo tài khoản. Không có tài khoản mặc định.
