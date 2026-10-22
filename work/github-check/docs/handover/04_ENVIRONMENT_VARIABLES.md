# 04. DANH MỤC BIẾN MÔI TRƯỜNG (ENVIRONMENT VARIABLES)

Tài liệu mô tả chi tiết tất cả các biến môi trường được sử dụng trong hệ thống.
> ⚠️ **LƯU Ý:** Không lưu trữ mật khẩu, secret key, hoặc API key thật vào Git. Các giá trị dưới đây là định dạng mẫu (Placeholder).

---

## 1. Môi Trường Docker Gốc (`.env`)

| Tên Biến Môi Trường | Bắt Buộc | Mục Đích Sử Dụng | Định Dạng Ví Dụ Mẫu |
| :--- | :---: | :--- | :--- |
| `POSTGRES_DB` | **Có** | Tên cơ sở dữ liệu PostgreSQL | `vgg` |
| `POSTGRES_USER` | **Có** | Tên người dùng quản trị PostgreSQL | `vgg` |
| `POSTGRES_PASSWORD` | **Có** | Mật khẩu kết nối CSDL (Fail-fast, bắt buộc) | `<GENERATE_STRONG_DATABASE_PASSWORD>` |

---

## 2. Phân Hệ Backend (`backend/.env`)

| Tên Biến Môi Trường | Bắt Buộc | Mục Đích Sử Dụng | Định Dạng Ví Dụ Mẫu |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | **Có** | Môi trường thực thi (`production`) | `production` |
| `DATABASE_URL` | **Có** | Chuỗi kết nối đến PostgreSQL 17 | `postgresql://vgg:<GENERATE_STRONG_DATABASE_PASSWORD>@127.0.0.1:5433/vgg` |
| `BACKEND_HOST` | **Có** | Host lắng nghe của Fastify server | `0.0.0.0` |
| `BACKEND_PORT` | **Có** | Cổng lắng nghe của Fastify server | `4000` |
| `PUBLIC_APP_URL` | **Có** | URL công khai của trang Frontend | `https://vgg.vlu.edu.vn` |
| `ADMIN_APP_URL` | **Có** | URL công khai của trang Admin | `https://admin-vgg.vlu.edu.vn` |
| `INITIAL_ADMIN_USERNAME` | Không | Username tạo Super Admin ban đầu | `admin` |
| `INITIAL_ADMIN_PASSWORD` | Không | Mật khẩu tạo Super Admin ban đầu | `<INITIAL_SUPER_ADMIN_PASSWORD>` |
| `INITIAL_ADMIN_NAME` | Không | Họ tên Super Admin ban đầu | `Super Admin` |
| `INITIAL_ADMIN_EMAIL` | Không | Email VLU Super Admin ban đầu | `admin@vlu.edu.vn` |
| `REDIS_URL` | Không | Tùy chọn / Dành cho mở rộng cache phân tán tương lai | `redis://127.0.0.1:6379` |

---

## 3. Phân Hệ Frontend (`frontend/.env.local`)

| Tên Biến Môi Trường | Bắt Buộc | Mục Đích Sử Dụng | Định Dạng Ví Dụ Mẫu |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | **Có** | Môi trường thực thi (`production`) | `production` |
| `BACKEND_INTERNAL_URL` | **Có** | URL gọi nội bộ tới Backend API | `http://127.0.0.1:4000` |
| `ALLOWED_ORIGINS` | **Có** | Danh sách origin cho phép gửi form | `https://vgg.vlu.edu.vn` |
| `CONSULTATION_WEBHOOK_URL` | Không | Webhook tích hợp CRM ngoài (nếu có) | `https://crm.vlu.edu.vn/webhook/consultation` |

---

## 4. Phân Hệ Admin Portal (`admin/.env.local`)

| Tên Biến Môi Trường | Bắt Buộc | Mục Đích Sử Dụng | Định Dạng Ví Dụ Mẫu |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | **Có** | Môi trường thực thi (`production`) | `production` |
| `DATABASE_URL` | **Có** | Chuỗi kết nối PostgreSQL (cùng DB với Backend) | `postgresql://vgg:<GENERATE_STRONG_DATABASE_PASSWORD>@127.0.0.1:5433/vgg` |
| `BACKEND_INTERNAL_URL` | **Có** | URL gọi nội bộ tới Backend API | `http://127.0.0.1:4000` |
| `ADMIN_ALLOWED_ORIGINS` | **Có** | Origin của trang Admin | `https://admin-vgg.vlu.edu.vn` |
| `STORAGE_ENDPOINT` | Có | Host MinIO nội bộ, không kèm protocol | `127.0.0.1` |
| `STORAGE_PORT` | Có | Cổng API MinIO | `9000` |
| `STORAGE_USE_SSL` | Có | Dùng TLS khi kết nối MinIO | `false` |
| `STORAGE_BUCKET` | Có | Bucket media private | `vgg-media` |
| `STORAGE_ACCESS_KEY` | Có | Access key dành riêng cho ứng dụng, không dùng root key | `vgg_platform_app` |
| `STORAGE_SECRET_KEY` | Có | App secret mạnh, khác root password và lưu ngoài Git | `<GENERATE_SEPARATE_APP_PASSWORD>` |
| `STORAGE_MAX_RESOURCE_FILE_MB` | Không | Giới hạn dung lượng tệp CMS | `25` |
| `SMTP_HOST` | Không | Máy chủ SMTP gửi email đặt lại mật khẩu | `smtp.gmail.com` |
| `SMTP_PORT` | Không | Cổng kết nối SMTP | `587` |
| `SMTP_USER` | Không | Tài khoản gửi email | `no-reply@vlu.edu.vn` |
| `SMTP_PASS` | Không | Mật khẩu ứng dụng gửi email | `<SMTP_APP_PASSWORD>` |
| `SMTP_FROM` | Không | Tiêu đề người gửi | `"VGG Admin Portal <no-reply@vlu.edu.vn>"` |
