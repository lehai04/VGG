# 05. HƯỚNG DẪN CƠ SỞ DỮ LIỆU (DATABASE GUIDE)

## 1. Thông Số Kỹ Thuật (Database Specifications)
* **Hệ Quản Trị CSDL:** PostgreSQL 17 (Cổng mặc định qua Docker Compose: `5433` để tránh xung đột cổng hệ thống `5432`).
* **Object-Relational Mapping (ORM):** Prisma ORM `v7.9.1` với `@prisma/adapter-pg`.
* **Character Set & Collation:** `UTF-8` (hỗ trợ lưu trữ tiếng Việt đầy đủ dấu và ký tự quốc tế).

---

## 2. Danh Sách Các Bảng Dữ Liệu Chính (Database Schema)

| Tên Bảng (Table Name) | Mục Đích Lưu Trữ | Quan Hệ & Ràng Buộc Chính |
| :--- | :--- | :--- |
| `admins` | Thông tin tài khoản nhân sự & quản trị viên | Khóa ngoại `roleId` -> `roles(id)`. Unique: `username`, `email`. |
| `roles` | Danh sách vai trò (`SUPER_ADMIN`, `ADMIN_LEVEL_2`) | Unique: `code`. Cấp bậc 1 và 2. |
| `permissions` | Danh mục quyền hạn (`admins.*`, `news.*`, etc.) | Unique: `code`. |
| `role_permissions` | Bảng nối phân quyền vai trò - quyền hạn | Composite PK (`roleId`, `permissionId`). Cascade on delete. |
| `admin_sessions` | Phiên đăng nhập của quản trị viên | Băm token SHA-256 (`tokenHash`), liên kết `adminId`. |
| `password_reset_tokens` | Mã đặt lại mật khẩu bảo mật (15 phút) | Băm token SHA-256 (`tokenHash`), liên kết `adminId`. |
| `news_posts` | Bài viết tin tức & sự kiện sau đại học | Unique `slug`, hỗ trợ danh mục (`category`), song ngữ. |
| `resource_files` | Tài liệu biểu mẫu, thông báo, quy chế | Khóa ngoại `categoryId` -> `resource_categories(id)`. |
| `resource_categories` | Danh mục tài nguyên | Unique: `name`. |
| `consultations` | Đơn đăng ký tư vấn tuyển sinh từ ứng viên | Lưu thông tin liên hệ, nguyện vọng, trạng thái xử lý. |
| `consultation_histories` | Lịch sử xử lý đơn tư vấn | Lưu vết thay đổi trạng thái và ghi chú của cán bộ. |
| `site_contents` | Cấu hình nội dung trang website | Unique: `key`. Lưu JSON linh hoạt. |
| `page_visits` | Nhật ký lượt truy cập ẩn danh (Analytics) | Phục vụ biểu đồ thống kê Dashboard. |
| `audit_logs` | Nhật ký kiểm toán mọi thao tác quản trị | Bất biến (Immutable), phục vụ thông báo Realtime. |

---

## 3. Quy Trình Vận Hành CSDL Trên Production

### 3.1. Khởi Tạo Cơ Sở Dữ Liệu
Khi triển khai lần đầu trên máy chủ, kiểm tra container PostgreSQL 17 đang hoạt động:
```bash
docker compose up -d postgres
```

### 3.2. Cập Nhật Cấu Trúc Bảng (Deploy Schema)
Sử dụng lệnh sau để tạo và đồng bộ toàn bộ bảng, khóa ngoại và chỉ mục:
```bash
npm run db:deploy
```

> ⛔ **CẢNH BÁO TUYỆT ĐỐI:**
> KHÔNG BAO GIỜ chạy lệnh `prisma migrate reset` hoặc `prisma db push --force-reset` trên máy chủ Production vì sẽ xóa sạch toàn bộ dữ liệu đang có.

### 3.3. Khởi Tạo Dữ Liệu Mẫu & Super Admin (Bootstrap / Seed)
Lệnh sau sẽ tự động tạo đủ vai trò `SUPER_ADMIN`, `ADMIN_LEVEL_2`, phân quyền mặc định và tạo tài khoản Super Admin đầu tiên nếu CSDL chưa có:
```bash
npm run db:bootstrap-admin
```
*(Thông tin tài khoản Super Admin được lấy từ biến môi trường `INITIAL_ADMIN_*` trong `backend/.env`).*

---

## 4. Kiểm Tra Tình Trạng Cơ Sở Dữ Liệu (Health Check & Verification)

Để kiểm tra nhanh kết nối CSDL và số lượng bản ghi:
```bash
# Kết nối psql vào container Docker qua service name
docker compose exec postgres psql -U vgg -d vgg -c "\dt"

# Kiểm tra danh sách Admin đã tạo
docker compose exec postgres psql -U vgg -d vgg -c "SELECT id, username, email, status FROM admins;"
```
