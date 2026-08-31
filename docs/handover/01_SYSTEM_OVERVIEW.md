# 01. TỔNG QUAN HỆ THỐNG (SYSTEM OVERVIEW)

## 1. Tên Dự Án (Project Name)
**VGG Platform** — Hệ thống Cổng thông tin Đào tạo & Quản trị Viện Sau Đại học Văn Lang (Van Lang Global Graduate).

---

## 2. Mục Đích Hệ Thống (Purpose)
- **Cổng thông tin Công khai (Public Website):** Cung cấp thông tin tuyển sinh sau đại học (Thạc sĩ, Tiến sĩ), định hướng nghiên cứu, cơ sở vật chất, tin tức sự kiện, học bổng và tiếp nhận đăng ký tư vấn trực tuyến.
- **Cổng Quản trị Nội dung & Nhân sự (Admin CMS Portal):** Quản lý tập trung các bài viết tin tức, biểu mẫu tài liệu, lịch tiếp nhận đơn tư vấn tuyển sinh, phân quyền nhân sự theo Email VLU và theo dõi nhật ký hoạt động hệ thống theo thời gian thực (Realtime).
- **Dịch vụ API Tập trung (Backend API Service):** Xử lý nghiệp vụ lõi, xác thực bảo mật chuẩn Argon2id, quản lý cơ sở dữ liệu PostgreSQL và bảo vệ dữ liệu với các lớp phòng thủ chuyên sâu.

---

## 3. Các Phân Hệ Chính (Main Modules)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              VGG PLATFORM                              │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ 1. Frontend Public │ 2. Admin CMS       │ 3. Backend API Service       │
│ - Port 3000        │ - Port 3001        │ - Port 4000                  │
│ - Next.js 16 (SSR) │ - Next.js 16 (App) │ - Fastify REST API           │
│ - Song ngữ VI / EN │ - Quản lý Tin tức  │ - Prisma ORM / PostgreSQL 17 │
│ - Đăng ký tư vấn   │ - Quản lý Tài liệu │ - Argon2id / SHA-256 Token   │
│ - Khám phá / Ngành │ - Quản lý Nhân sự  │ - Sanitize-HTML / Rate-Limit │
│ - SEO & Analytics  │ - Lịch tư vấn      │ - Audit Logging              │
│                    │ - Thông báo Live   │                              │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

---

## 4. Vai Trò Người Dùng (Main Users & Roles)

1. **Khách truy cập công khai (Public Visitors / Candidates):** Xem tin tức, tra cứu chương trình đào tạo, tải tài liệu biểu mẫu, đăng ký tư vấn tuyển sinh trực tuyến.
2. **QTV Cấp 1 — Super Admin (`SUPER_ADMIN`):** Toàn quyền quản trị hệ thống, bao gồm quản lý nhân sự (xem chi tiết, tạo mới, chỉnh sửa thông tin, phân quyền, khóa và xóa tài khoản), xem audit logs toàn hệ thống, quản lý tin tức, tài nguyên và tư vấn.
3. **QTV Cấp 2 (`ADMIN_LEVEL_2`):** Toàn quyền vận hành nội dung (Tin tức, Tài nguyên, Lịch tư vấn tuyển sinh, Dashboard thống kê); **KHÔNG có quyền truy cập và thao tác với module Quản lý Nhân sự**.

---

## 5. Ngăn Xếp Công Nghệ (Technology Stack)

| Thành phần | Công nghệ / Thư viện chính | Vai trò |
| :--- | :--- | :--- |
| **Frontend Public** | Next.js 16.3.1 (App Router), React 19, TypeScript, Vanilla CSS Modules | Giao diện công khai, Server-Side Rendering (SSR), i18n VI/EN |
| **Admin Portal** | Next.js 16.3.1 (App Router), React 19, TypeScript, Vanilla CSS Modules | Giao diện quản trị, thông báo realtime, phân quyền |
| **Backend API** | Fastify 5.2.1, TypeScript, Zod, sanitize-html, Argon2 | REST API, validation, lọc mã độc, xử lý xác thực |
| **Database & ORM**| PostgreSQL 17, Prisma ORM 7.9.1 (`@prisma/adapter-pg`) | Lưu trữ dữ liệu quan hệ, quan hệ toàn vẹn, indexing |
| **Authentication** | Argon2id (m=64MB, t=3, p=1), SHA-256 Session Tokens, HttpOnly Cookies | Bảo mật đăng nhập, phiên làm việc an toàn |
| **Cache & Queue** | Redis 7 (tùy chọn qua Docker Compose) | Cache session và hàng đợi xử lý |
| **File Storage** | Local Persistent Storage / S3-compatible (MinIO/Cloudinary) | Lưu trữ hình ảnh và tệp tài liệu biểu mẫu |

---

## 6. Cấu Trúc Thư Mục Repository (Repository Structure)

```text
vgg-platform/
├── frontend/                  # Cổng thông tin công khai (Next.js 16)
│   ├── src/
│   │   ├── app/               # App Router pages (home, news, programmes, admissions, etc.)
│   │   ├── features/          # Feature-based business components
│   │   ├── i18n/              # Song ngữ VI/EN dictionary & provider
│   │   └── shared/            # Header, Footer, Analytics Tracker, UI components
│   ├── public/                # Static assets, images, icons, brand identity
│   └── .env.example           # Biến môi trường mẫu cho Frontend
│
├── backend/                   # REST API Service (Fastify + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma      # Prisma Database Schema
│   │   └── bootstrap-admin.ts # Script khởi tạo Super Admin ban đầu
│   ├── src/
│   │   ├── modules/           # Auth, CMS, Consultations, Health modules
│   │   └── shared/            # Database connection, security helpers, HTTP responses
│   └── .env.example           # Biến môi trường mẫu cho Backend
│
├── admin/                     # Hệ thống Quản trị CMS & Nhân sự (Next.js 16)
│   ├── src/
│   │   ├── app/               # Admin App Router pages & Internal API routes
│   │   ├── components/        # Layout, Notifications, Users, CMS, Auth views
│   │   └── lib/               # Auth guards, password hashing, session cookies, schemas
│   └── .env.example           # Biến môi trường mẫu cho Admin
│
├── docs/                      # Tài liệu thiết kế, Page map và Handover
│   └── handover/              # Thư mục hồ sơ bàn giao kỹ thuật cho IT
│
├── compose.yaml               # Docker Compose cấu hình PostgreSQL 17, Redis 7, MinIO
├── package.json               # Monorepo configuration & NPM workspace scripts
└── README.md                  # Hướng dẫn khởi động nhanh
```
