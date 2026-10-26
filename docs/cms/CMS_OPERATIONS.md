# Vận hành CMS local và production

## Local

Từ thư mục gốc, chạy ba terminal:

```powershell
npm run dev:backend
npm run dev:admin
npm run dev
```

Admin và frontend phải trỏ BACKEND_INTERNAL_URL về cùng backend/database. Không in secret khi chẩn đoán. Đừng khởi chạy trùng Next dev cho cùng workspace. Đổi môi trường/giới hạn runtime có thể cần restart; đổi nội dung đã publish không cần rebuild.

## Kiểm thử riêng

```powershell
npm run build:backend
node scripts/test-cms-integration.mjs
npm run test --workspace=frontend
npm run test --workspace=admin
npm run build:admin
npm run build
```

Script integration chỉ chấp nhận PostgreSQL local, tạo vgg_cms_test_* và dọn đúng database đó. Không chạy test mutation trên database production.

## Backup và restore

Backup PostgreSQL bằng pg_dump theo runbook hạ tầng, đồng thời backup/versioning bucket MinIO. Database và object storage phải được khôi phục nhất quán. Chưa tự chạy backup/restore production trong tác vụ này. Version history CMS chỉ khôi phục nội dung trang, không thay thế backup DB hay khôi phục object bị xóa.

Quy trình khôi phục nội dung: chọn snapshot → khôi phục vào draft → preview → publish bằng tài khoản có quyền. Không dùng prisma db push/reset để xử lý xung đột nội dung. SiteContent và AuditLog có sẵn, nâng cấp history không cần migration phá dữ liệu.

## Triển khai

Build ba workspace bằng cấu hình tương ứng, áp dụng migration bổ sung nếu có sau backup. Chưa tự deploy/push trong tác vụ này. Các module checklist chưa tick không được quảng bá là đã hoạt động.
