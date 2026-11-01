# Sửa lỗi bàn giao CMS/backend

Các thay đổi được chuẩn bị trong workspace, chưa áp dụng lên server.

1. Nginx: `/cms` và `/cms/` proxy tới `127.0.0.1:3001`, giữ prefix, không redirect thêm slash. Cấu hình mẫu thống nhất domain `sdh.vlu.edu.vn`, bỏ phụ thuộc `$connection_upgrade`, giới hạn upload CMS 101 MiB.
2. systemd: tên file `vgg-cms.service`; chạy `server.js` từ thư mục CMS standalone; backend chạy `dist/server.js`. Cả hai nạp env riêng và chạy kiểm tra runtime trước khi khởi động. Tài khoản chạy dịch vụ là `www-data`.
3. Backend: khôi phục `package.json` và Prisma schema/migrations từ gói native hiện có. Manifest khớp dependency trong lockfile, gồm Fastify multipart, S3 SDK, sharp, mammoth và sanitize-html. Không khôi phục source từ gói build cũ lên source hiện tại.
4. Build Linux: generate Prisma Client trước TypeScript; đóng gói dependency chung, client đã generate, CLI Prisma, schema, migrations và công cụ quản lý tài khoản. Kiểm tra runtime ngay trên cây thư mục release trước khi tạo tar.
5. Origin đăng nhập: `CMS_APP_URL=https://sdh.vlu.edu.vn/cms` phải có trong cả `/etc/saudaihoc/backend.env` và `/etc/saudaihoc/cms.env`. Giữ nguyên `DATABASE_URL` và `STORAGE_*` của server. Không thay backend.env thật bằng file ví dụ.

## Cập nhật server

- Build lại gói Linux theo README để nhận script kiểm tra runtime mới trước khi cài các service mới.
- Đối chiếu và cập nhật cấu hình Nginx/systemd từ gói; sao lưu cấu hình đang chạy.
- Kiểm tra cả hai file env có CMS_APP_URL đúng domain truy cập.
- Sau khi cài release và service, chạy bằng tài khoản có quyền quản trị:

```sh
sudo systemctl daemon-reload
sudo nginx -t
# Chỉ tiếp tục nếu kiểm tra Nginx thành công.
sudo systemctl restart vgg-backend.service vgg-cms.service vgg-frontend.service
sudo systemctl reload nginx
sudo systemctl --no-pager --full status vgg-backend.service vgg-cms.service
```

Nếu service thất bại, xem `journalctl -u vgg-backend.service -u vgg-cms.service -n 80 --no-pager` trên server. Kiểm tra runtime xác nhận app nạp được dependencies, Prisma Client và cấu hình; không xác nhận kết nối DB, quyền bucket hoặc mật khẩu người dùng. Kiểm tra `/ready` trên backend và thực hiện đăng nhập/lưu nháp/upload để nghiệm thu thực tế.

## Sửa riêng lỗi đăng nhập trên bản đang chạy

Nếu chưa thay runtime/service, chỉ thêm hoặc sửa `CMS_APP_URL` trong hai file env hiện tại rồi restart backend và CMS. Không cần thay DB hay đặt lại mật khẩu để xử lý lỗi origin.
