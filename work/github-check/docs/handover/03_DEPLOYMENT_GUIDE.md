# 03. HƯỚNG DẪN TRIỂN KHAI PRODUCTION (DEPLOYMENT GUIDE)

Tài liệu này được thiết kế để một Kỹ sư Hệ thống / DevOps / IT có thể tiếp nhận và triển khai toàn bộ hệ thống lên máy chủ Production từ đầu một cách an toàn và chính xác.

---

## 1. Chuẩn Bị Môi Trường (Prerequisites)

* **Hệ điều hành máy chủ:** Linux (Ubuntu 22.04 LTS hoặc 24.04 LTS khuyến nghị).
* **Node.js:** `>= 22.13.0` (LTS).
* **Package Manager:** `npm >= 10.0.0`.
* **Docker & Docker Compose:** Cài đặt sẵn để chạy PostgreSQL 17.
* **Process Manager:** `pm2` (`npm install -g pm2`).
* **Web Server & SSL:** `nginx` và `certbot` (`python3-certbot-nginx`).

---

## 2. Quy Trình Triển Khai Từng Bước (Step-by-Step Deployment)

### Bước 1: Clone Mã Nguồn Dự Án
```bash
# 1. Truy cập thư mục chứa ứng dụng trên Server
cd /var/www

# 2. Clone mã nguồn từ Git Repository
git clone <GIT_REPOSITORY_URL> vgg-platform
cd vgg-platform

# 3. Chuyển sang nhánh production đã kiểm duyệt (main / production)
git checkout main
```

---

### Bước 2: Cấu Hình Biến Môi Trường (Environment Configuration)

Tạo file môi trường từ các file mẫu có sẵn:

```bash
# Root Docker Environment
cp .env.example .env

# Backend Environment
cp backend/.env.example backend/.env

# Frontend Environment
cp frontend/.env.example frontend/.env.local

# Admin Environment
cp admin/.env.example admin/.env.local
```

> **LƯU Ý QUAN TRỌNG:** Mở các file `.env` vừa tạo và điền thông tin bí mật thực tế của môi trường Production (Mật khẩu Database, tên miền, mật khẩu Super Admin và credential MinIO). Tham khảo tài liệu `04_ENVIRONMENT_VARIABLES.md`.

---

### Bước 3: Cài Đặt Dependencies Monorepo
```bash
# Cài đặt chính xác các package theo package-lock.json
npm ci
```

---

### Bước 4: Khởi Động Cơ Sở Dữ Liệu PostgreSQL
```bash
# Khởi động PostgreSQL 17 dưới dạng container ngầm
docker compose up -d

# Kiểm tra trạng thái hoạt động (yêu cầu STATUS healthy / Up)
docker compose ps
```

---

### Bước 5: Thực Hiện Database Migration & Tạo Super Admin Ban Đầu
```bash
# 1. Chạy migration cập nhật toàn bộ bảng và chỉ mục
npm run db:deploy

# 2. Khởi tạo tài khoản Super Admin Cấp 1 ban đầu
npm run db:bootstrap-admin
```

---

### Bước 6: Build Production Toàn Bộ Ứng Dụng
```bash
# Chạy build tối ưu hóa cho cả 3 phân hệ
npm run build         # Build Frontend Website
npm run build:admin   # Build Admin CMS Portal
npm run build:backend # Compile Backend API (TypeScript -> dist)
```

---

### Bước 7: Khởi Chạy Ứng Dụng Bằng PM2 (Process Manager)

Khởi chạy 3 service với PM2:

```bash
# Khởi chạy Backend API (Port 4000)
pm2 start "npm run start --workspace=backend" --name "vgg-backend"

# Khởi chạy Frontend Public Website (Port 3000)
pm2 start "npm run start --workspace=frontend" --name "vgg-frontend"

# Khởi chạy Admin Portal (Port 3001)
pm2 start "npm run start --workspace=admin" --name "vgg-admin"

# Lưu danh sách tiến trình và thiết lập tự khởi động cùng hệ thống khi reboot server
pm2 save
pm2 startup
```

---

### Bước 8: Cấu Hình Nginx Reverse Proxy & SSL (HTTPS)

Tạo file cấu hình Nginx: `/etc/nginx/sites-available/vgg-platform`

```nginx
# 1. Cấu hình Cổng thông tin Công khai (Public Frontend)
server {
    listen 80;
    server_name vgg.vlu.edu.vn;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# 2. Cấu hình Cổng Quản trị (Admin Portal)
server {
    listen 80;
    server_name admin-vgg.vlu.edu.vn;

    # Giới hạn kích thước upload cho CMS (50MB cho PDF, hình ảnh)
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Kích hoạt cấu hình và cấp chứng chỉ SSL Let's Encrypt:
```bash
# Kích hoạt site
sudo ln -s /etc/nginx/sites-available/vgg-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Cài đặt SSL tự động
sudo certbot --nginx -d vgg.vlu.edu.vn -d admin-vgg.vlu.edu.vn
```

---

## 3. Kiểm Tra Sau Triển Khai (Health Verification)

1. Kiểm tra Backend API Health:
   ```bash
   curl -f http://127.0.0.1:4000/health
   # Kết quả mong đợi: HTTP 200 OK, {"status":"ok"}
   ```
2. Kiểm tra Frontend: Mở trình duyệt truy cập `https://vgg.vlu.edu.vn` kiểm tra trang chủ, chuyển đổi ngôn ngữ VI/EN.
3. Kiểm tra Admin: Truy cập `https://admin-vgg.vlu.edu.vn/admin/login`, đăng nhập bằng tài khoản Super Admin đã tạo tại Bước 5.
