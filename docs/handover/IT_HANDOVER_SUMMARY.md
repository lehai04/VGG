# TÓM TẮT BÀN GIAO TRIỂN KHAI CHO BỘ PHẬN IT (IT HANDOVER SUMMARY)

> 📄 **Tài liệu ngắn gọn dành riêng cho Kỹ sư IT / DevOps tiếp nhận và triển khai hệ thống lên Server.**

---

## 1. Thông Tin Chung (Project Overview)
* **Tên Dự Án:** VGG Platform — Hệ thống Cổng thông tin & Quản trị Viện Sau Đại học Văn Lang.
* **Phiên Bản (Release Version):** `v1.0.2` (Production Release).
* **Nhánh Triển Khai (Branch):** `main` (hoặc release tag `v1.0.2`).
* **Kiến Trúc Ngăn Xếp (Stack):**
  - **Frontend:** Next.js 16.3.1 (Cổng thông tin công khai — Port `3000`).
  - **Admin:** Next.js 16.3.1 (Cổng CMS & Quản lý Nhân sự — Port `3001`).
  - **Backend API:** Fastify 5.2.1 (REST API lõi — Port `4000`).
  - **Database:** PostgreSQL 17 (Prisma ORM — Port nội bộ `127.0.0.1:5433`).
  - **Media Storage:** Cloudinary Cloud Media SDK (Ảnh bài viết & PDF biểu mẫu).

---

## 2. Tên Miền & Cổng Mạng (Domain & Port Mapping)
1. `https://vgg.vlu.edu.vn` (Website chính) -> Reverse Proxy về `http://127.0.0.1:3000`
2. `https://admin-vgg.vlu.edu.vn` (Cổng Quản trị) -> Reverse Proxy về `http://127.0.0.1:3001`
*(Cài đặt chứng chỉ SSL HTTPS qua Let's Encrypt / Certbot).*

---

## 3. Các Biến Môi Trường IT Cần Thiết Lập

Tạo các file cấu hình môi trường từ các file mẫu:

### A. Root Docker (`.env`)
```ini
# cp .env.example .env
POSTGRES_DB=vgg
POSTGRES_USER=vgg
POSTGRES_PASSWORD=<GENERATE_STRONG_DATABASE_PASSWORD>
```

### B. `backend/.env`
```ini
# cp backend/.env.example backend/.env
NODE_ENV=production
DATABASE_URL=postgresql://vgg:<GENERATE_STRONG_DATABASE_PASSWORD>@127.0.0.1:5433/vgg
BACKEND_HOST=0.0.0.0
BACKEND_PORT=4000
PUBLIC_APP_URL=https://vgg.vlu.edu.vn
ADMIN_APP_URL=https://admin-vgg.vlu.edu.vn
INITIAL_ADMIN_USERNAME=admin
INITIAL_ADMIN_PASSWORD=<INITIAL_SUPER_ADMIN_PASSWORD>
INITIAL_ADMIN_NAME=Super Admin
INITIAL_ADMIN_EMAIL=admin@vlu.edu.vn
```

### C. `frontend/.env.local`
```ini
# cp frontend/.env.example frontend/.env.local
NODE_ENV=production
BACKEND_INTERNAL_URL=http://127.0.0.1:4000
ALLOWED_ORIGINS=https://vgg.vlu.edu.vn
```

### D. `admin/.env.local`
```ini
# cp admin/.env.example admin/.env.local
NODE_ENV=production
DATABASE_URL=postgresql://vgg:<GENERATE_STRONG_DATABASE_PASSWORD>@127.0.0.1:5433/vgg
BACKEND_INTERNAL_URL=http://127.0.0.1:4000
ADMIN_ALLOWED_ORIGINS=https://admin-vgg.vlu.edu.vn

# Cloudinary Storage Configuration (BẮT BUỘC cho tính năng tải ảnh bài viết & PDF)
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

# Optional SMTP Email Configuration (Dành cho gửi email đặt lại mật khẩu)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=no-reply@vlu.edu.vn
SMTP_PASS=<YOUR_APP_PASSWORD>
SMTP_FROM="VGG Admin Portal <no-reply@vlu.edu.vn>"
```

---

## 4. Thứ Tự Các Lệnh Triển Khai (Deployment Commands)

```bash
# 1. Clone mã nguồn và vào thư mục dự án
cd /var/www/vgg-platform

# 2. Cài đặt toàn bộ dependencies
npm ci

# 3. Khởi động PostgreSQL 17 bằng Docker
docker compose up -d

# 4. Deploy schema cơ sở dữ liệu và tạo tài khoản Super Admin ban đầu
npm run db:deploy
npm run db:bootstrap-admin

# 5. Build production toàn bộ hệ thống
npm run build         # Build Frontend
npm run build:admin   # Build Admin Portal
npm run build:backend # Build Backend API

# 6. Khởi chạy và quản lý qua PM2
pm2 start "npm run start --workspace=backend" --name "vgg-backend"
pm2 start "npm run start --workspace=frontend" --name "vgg-frontend"
pm2 start "npm run start --workspace=admin" --name "vgg-admin"
pm2 save
pm2 startup
```

---

## 5. Kiểm Tra Tình Trạng Hoạt Động (Verification)
1. **API Health Check:** `curl -f http://127.0.0.1:4000/health` (Phải trả về `HTTP 200 OK`).
2. **Website Public:** Mở trình duyệt truy cập `https://vgg.vlu.edu.vn`.
3. **Admin Portal:** Truy cập `https://admin-vgg.vlu.edu.vn/admin/login`, đăng nhập bằng tài khoản Super Admin đã khởi tạo tại Bước 4.

---

## 6. Danh Mục Tài Liệu Chi Tiết Đính Kèm
Toàn bộ tài liệu kỹ thuật chi tiết đã được lưu sẵn trong thư mục `docs/handover/`:
- `01_SYSTEM_OVERVIEW.md`: Tổng quan các phân hệ và vai trò người dùng.
- `02_ARCHITECTURE.md`: Sơ đồ kiến trúc Mermaid, luồng xác thực Argon2id và realtime.
- `03_DEPLOYMENT_GUIDE.md`: Hướng dẫn triển khai chi tiết từ A - Z kèm cấu hình Nginx.
- `04_ENVIRONMENT_VARIABLES.md`: Bảng giải thích chi tiết từng biến môi trường.
- `05_DATABASE_GUIDE.md`: Mô tả bảng dữ liệu, migration và seed.
- `06_BUILD_AND_RUN.md`: Danh mục toàn bộ câu lệnh NPM.
- `07_SERVER_REQUIREMENTS.md`: Yêu cầu cấu hình phần cứng và phân bổ cổng mạng.
- `08_SECURITY_CHECKLIST.md`: Bảng kiểm tra an toàn thông tin OWASP.
- `09_BACKUP_AND_RESTORE.md`: Hướng dẫn thiết lập sao lưu tự động hàng ngày.
- `10_ROLLBACK_GUIDE.md`: Quy trình xử lý sự cố và rollback phiên bản khẩn cấp.
- `11_POST_DEPLOY_CHECKLIST.md`: Bảng kiểm thử chức năng sau khi deploy.
- `12_TROUBLESHOOTING.md`: Hướng dẫn xử lý các lỗi thường gặp khi vận hành.
- `13_KNOWN_ISSUES.md`: Các lưu ý kỹ thuật về mở rộng hệ thống.
- `14_IT_HANDOVER_CHECKLIST.md`: Bảng kiểm tra nghiệm thu bàn giao.
- `15_RELEASE_NOTES.md`: Danh sách tính năng và quy trình cập nhật code sau này.
