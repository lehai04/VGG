# VGG Platform — Hệ thống Cổng thông tin & Quản trị Viện Sau Đại học

Monorepo bao gồm Cổng thông tin đào tạo công khai (Frontend), Hệ thống Quản trị Nội dung & Tuyển sinh (Admin Portal), và Dịch vụ Xử lý Dữ liệu Tập trung (Backend API).

```text
├── frontend/        # Website public Next.js 16 (Port 3000) - SSR, SSG, đa ngôn ngữ VI/EN
├── backend/         # REST API Fastify + Prisma ORM (Port 4000) - Auth, Consultations, CMS, Logs
├── admin/           # CMS & CRM Admin Next.js 16 (Port 3001) - Quản lý tin tức, biểu mẫu, phân quyền
├── docs/handover/   # HỒ SƠ BÀN GIAO TRIỂN KHAI CHO IT / DEVOPS (16 tài liệu chi tiết)
└── compose.yaml     # Docker Compose quản lý PostgreSQL 17 Alpine
```

---

## 📚 HỒ SƠ BÀN GIAO DEPLOY CHO BỘ PHẬN IT (HANDOVER PACKAGE)

Toàn bộ tài liệu chi tiết cho IT / DevOps được lưu trữ tại thư mục [`docs/handover/`](docs/handover/):

1. 📄 [Tóm tắt Bàn giao IT (1-2 trang)](docs/handover/IT_HANDOVER_SUMMARY.md)
2. 🌐 [01. Tổng quan Hệ thống](docs/handover/01_SYSTEM_OVERVIEW.md)
3. 🏛️ [02. Kiến trúc Hệ thống](docs/handover/02_ARCHITECTURE.md)
4. 🚀 [03. Hướng dẫn Triển khai Production](docs/handover/03_DEPLOYMENT_GUIDE.md)
5. 🔑 [04. Danh mục Biến Môi trường](docs/handover/04_ENVIRONMENT_VARIABLES.md)
6. 🗄️ [05. Hướng dẫn Cơ sở Dữ liệu](docs/handover/05_DATABASE_GUIDE.md)
7. ⚙️ [06. Hướng dẫn Build & Run](docs/handover/06_BUILD_AND_RUN.md)
8. 🖥️ [07. Yêu cầu Hạ tầng Máy chủ](docs/handover/07_SERVER_REQUIREMENTS.md)
9. 🛡️ [08. Bảng Kiểm tra Bảo mật](docs/handover/08_SECURITY_CHECKLIST.md)
10. 💾 [09. Sao lưu & Phục hồi Dữ liệu](docs/handover/09_BACKUP_AND_RESTORE.md)
11. 🔄 [10. Quy trình Rollback Sự cố](docs/handover/10_ROLLBACK_GUIDE.md)
12. ✅ [11. Bảng Kiểm tra Sau Deploy](docs/handover/11_POST_DEPLOY_CHECKLIST.md)
13. 🛠️ [12. Hướng dẫn Xử lý Sự cố (Troubleshooting)](docs/handover/12_TROUBLESHOOTING.md)
14. 📌 [13. Danh sách Vấn đề Đã biết](docs/handover/13_KNOWN_ISSUES.md)
15. 📋 [14. Checklist Bàn giao IT](docs/handover/14_IT_HANDOVER_CHECKLIST.md)
16. 📦 [15. Thông tin Bản phát hành](docs/handover/15_RELEASE_NOTES.md)

---

## 1. Yêu cầu Môi trường (System Requirements)

- **Node.js**: `>= 22.13.0` (LTS khuyến nghị)
- **npm**: `>= 10.0.0`
- **Docker & Docker Compose**: Quản lý PostgreSQL 17
- **Database**: PostgreSQL 17

---

## 2. Hướng dẫn Khởi động Nhanh (Local Development)

```bash
# Bước 1: Khởi động PostgreSQL và MinIO nội bộ
docker compose up -d

# Bước 2: Cài đặt Dependencies
npm install

# Bước 3: Thiết lập Biến Môi trường
# Sao chép từ các file .env.example sang backend/.env, frontend/.env.local, admin/.env.local

# Bước 4: Migrate Database & Tạo Tài khoản Quản trị Ban đầu
npm run db:deploy
npm run db:bootstrap-admin

# Bước 5: Khởi chạy Ứng dụng
npm run dev           # Frontend tại http://localhost:3000
npm run dev:backend   # Backend API tại http://localhost:4000
npm run dev:admin     # Admin Portal tại http://localhost:3001
```

---

## 3. Kiểm tra Chất lượng & Build Production

```bash
# Chạy toàn bộ kiểm tra chất lượng trước khi deploy (Lint, Typecheck, Test, Build)
npm run check

# Hoặc chạy từng công đoạn riêng lẻ:
npm run lint          # Kiểm tra cú pháp ESLint
npm run typecheck     # Kiểm tra TypeScript type safety
npm run test          # Chạy Unit & Integration tests
npm run build         # Build production bundle cho Frontend
npm run build:admin   # Build production bundle cho Admin
npm run build:backend # Biên dịch Backend API
```

---

## 4. Phân Quyền Quản Trị (Roles & Permissions)

- **QTV Cấp 1 — Super Admin (`SUPER_ADMIN`)**: Toàn quyền quản trị hệ thống, bao gồm toàn quyền Quản lý Nhân sự (xem, sửa, phân quyền, khóa, xóa).
- **QTV Cấp 2 (`ADMIN_LEVEL_2`)**: Toàn quyền quản lý Dashboard, Tin tức, Tài nguyên biểu mẫu, và Lịch tư vấn tuyển sinh; **không có quyền truy cập Nhân sự**.
