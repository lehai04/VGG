# Tạo tài khoản CMS lần đầu

Script `backend/scripts/seed-cms-admin.mjs` tạo một tài khoản có quyền cập nhật tư vấn và quản lý tin/tài nguyên. Script chỉ tạo mới, không ghi đè tài khoản đang có. Email, họ tên và mật khẩu được truyền qua biến môi trường; mật khẩu cần lấy từ secret store, không commit vào source hoặc file `.env` dùng chung.

## Chạy trong Docker Compose

1. Triển khai bản build có script này và để migration hoàn tất.
2. Trong phiên terminal được cấp secret từ secret manager, thiết lập `CMS_ADMIN_EMAIL`, `CMS_ADMIN_NAME`, `CMS_ADMIN_PASSWORD` cùng `DATABASE_URL` của đúng môi trường.
3. Chạy:

   ```sh
   docker compose run --rm migrate npm run staff:seed --workspace=backend
   ```

Nếu tài khoản đã tồn tại, script dừng mà không đổi mật khẩu/quyền. Dùng `staff:manage` cho thao tác đặt lại hoặc khóa tài khoản. Bàn giao mật khẩu ngoài repository và log.

## Chạy trực tiếp trên server

Trong thư mục dự án, nạp cùng bốn biến trên từ secret manager/phiên bảo mật rồi chạy:

```sh
npm run staff:seed --workspace=backend
```
