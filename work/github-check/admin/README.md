# VGG Administration

Ứng dụng quản trị độc lập chạy ở cổng `3001`. Authentication sử dụng username/password, Argon2id, PostgreSQL và opaque session trong cookie HttpOnly.

## Khởi tạo

1. Sao chép `admin/.env.example` thành `admin/.env.local` và cấu hình `DATABASE_URL`.
2. Sao chép `backend/.env.example` thành `backend/.env`; hai ứng dụng phải dùng cùng `DATABASE_URL`.
3. Từ thư mục gốc, chạy `npm run db:deploy`.
4. Điền `INITIAL_ADMIN_USERNAME`, `INITIAL_ADMIN_PASSWORD`, `INITIAL_ADMIN_NAME` trong `backend/.env`.
5. Chạy `npm run db:bootstrap-admin` đúng một lần.
6. Xóa các biến `INITIAL_ADMIN_*` khỏi môi trường sau khi bootstrap.
7. Chạy `npm run dev:backend` và `npm run dev:admin`, sau đó mở `http://localhost:3001/admin/login`.

Super Admin đầu tiên luôn có `must_change_password = true`.

## API

- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/auth/me`
- `POST /api/admin/auth/change-password`
- `GET|POST /api/admin/users`
- `GET|PATCH /api/admin/users/:id`
- `PATCH /api/admin/users/:id/status`
- `POST /api/admin/users/:id/reset-password`
- `PATCH /api/admin/users/:id/role`

Không có endpoint đăng ký công khai. Mọi quyền quản trị tài khoản được kiểm tra lại ở server.
