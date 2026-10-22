# VGG PLATFORM — PRODUCTION RELEASE MANIFEST

* **Phiên Bản (Release Version):** `v1.0.2` (Production Release)
* **Ngày Đóng Gói (Release Date):** 31/08/2026
* **Nhánh Triển Khai (Target Branch):** `main`
* **Kiểm Định Chất Lượng (QA Status):** PASS TOÀN BỘ — Đủ điều kiện bàn giao/deploy (`npm run check` PASS 100%).

---

## 1. Danh Sách Phân Hệ Bao Gồm Trong Gói (Included Applications)

| Phân hệ | Công nghệ | Cổng mặc định | Vai trò |
| :--- | :--- | :---: | :--- |
| **`frontend/`** | Next.js 16.3.1 (SSR/SSG), React 19, TypeScript | `3000` | Cổng thông tin tuyển sinh công khai, song ngữ VI/EN, form đăng ký tư vấn. |
| **`admin/`** | Next.js 16.3.1 (App Router), React 19, TypeScript | `3001` | Cổng CMS Tin tức, Tài liệu biểu mẫu, Quản lý Nhân sự, Chuông thông báo Live. |
| **`backend/`** | Fastify 5.2.1 REST API, Prisma 7.9.1, Argon2id | `4000` | API dịch vụ lõi, xác thực, sanitize HTML, ghi nhận kiểm toán. |
| **`docs/`** | Markdown Documentation | — | Toàn bộ 16 tài liệu kỹ thuật bàn giao tại `docs/handover/`. |
| **`compose.yaml`**| Docker Compose (PostgreSQL 17 Alpine) | `5433` (DB) | Cấu hình hạ tầng CSDL PostgreSQL 17 độc lập, an toàn. |

---

## 2. Danh Sách Migration Cơ Sở Dữ Liệu (Database Migrations)

Các file migration nằm tại `backend/prisma/migrations/` và được tự động thực thi tuần tự qua lệnh `npm run db:deploy`:

1. `20260824000000_foundation` — Bảng phân quyền `admins`, `roles`, `permissions`, `sessions`.
2. `20260824010000_cms_foundation` — Bảng `news_posts`, `site_contents`, `consultations`, `page_visits`.
3. `20260825010000_news_research_category` — Cập nhật danh mục nghiên cứu tin tức.
4. `20260826010000_news_author_name` — Cập nhật tác giả bài viết.
5. `20260826020000_resource_management` — Bảng `resource_categories` và `resource_files` (PDF/DOCX).
6. `20260831000000_password_reset_and_audit_extensions` — Bảng `password_reset_tokens` và mở rộng enum `AuditAction`.

---

## 3. Các Biến Môi Trường Bắt Buộc (Required Environment Variables)

- **PostgreSQL Database:** `DATABASE_URL=postgresql://vgg:<GENERATE_STRONG_DATABASE_PASSWORD>@127.0.0.1:5433/vgg`
- **Môi trường thực thi:** `NODE_ENV=production`
- **MinIO nội bộ (Bắt buộc cho CMS upload ảnh/PDF):**
  - `STORAGE_ENDPOINT=127.0.0.1`
  - `STORAGE_BUCKET=vgg-media`
  - `STORAGE_ACCESS_KEY` / `STORAGE_SECRET_KEY` (tài khoản ứng dụng, không dùng MinIO root)
- **Khởi tạo Super Admin:**
  - `INITIAL_ADMIN_USERNAME=admin`
  - `INITIAL_ADMIN_PASSWORD=<INITIAL_SUPER_ADMIN_PASSWORD>`

---

## 4. Lệnh Triển Khai & Khởi Chạy Chuẩn (Standard Commands)

```bash
# 1. Cài đặt dependencies
npm ci

# 2. Khởi động CSDL
docker compose up -d

# 3. Migrate & Tạo Super Admin
npm run db:deploy
npm run db:bootstrap-admin

# 4. Build toàn bộ phân hệ
npm run build
npm run build:admin
npm run build:backend

# 5. Khởi chạy PM2
pm2 start ecosystem.config.cjs
```

---

## 5. Danh Mục Tài Liệu Bàn Giao (Handover Documentation Index)
- `docs/handover/IT_HANDOVER_SUMMARY.md`: Bản tóm tắt triển khai cho IT.
- `docs/handover/01_SYSTEM_OVERVIEW.md` đến `15_RELEASE_NOTES.md`: 15 hồ sơ kỹ thuật chi tiết.
