# 14. BẢNG KIỂM TRA BÀN GIAO CHO BỘ PHẬN IT (IT HANDOVER CHECKLIST)

---

## 1. Hạng Mục Mã Nguồn & Tài Liệu (Source Code & Documentation)
- [ ] Đã tiếp nhận quyền truy cập Git Repository của dự án.
- [ ] Đã xác nhận nhánh triển khai chính thức (`main` / `production`).
- [ ] Đã đọc và hiểu tài liệu kiến trúc hệ thống (`02_ARCHITECTURE.md`).
- [ ] Đã đọc hướng dẫn quy trình deploy (`03_DEPLOYMENT_GUIDE.md`).

---

## 2. Hạng Mục Hạ Tầng & Môi Trường Máy Chủ (Infrastructure & Server)
- [ ] Đã khởi tạo máy chủ Linux (Khuyến nghị Ubuntu 22.04 LTS, tối thiểu 2 vCPU, 4GB RAM).
- [ ] Đã cài đặt Node.js 22 LTS, npm 10+, Docker, Docker Compose, Nginx và PM2.
- [ ] Đã mở các cổng tường lửa ngoài (`80`, `443`, `22`).
- [ ] Đã chặn toàn bộ các cổng nội bộ (`3000`, `3001`, `4000`, `5433`, `6379`) không cho truy cập trực tiếp từ Internet.

---

## 3. Hạng Mục Biến Môi Trường (Environment Variables)
- [ ] Đã tạo file `.env` (root) với cấu hình mật khẩu PostgreSQL mạnh cho Docker.
- [ ] Đã tạo file `backend/.env` với mật khẩu Database và thông tin khởi tạo Super Admin an toàn.
- [ ] Đã tạo file `frontend/.env.local` với cấu hình URL nội bộ và allowed origins.
- [ ] Đã tạo file `admin/.env.local` với cấu hình chuỗi kết nối Database, backend URL và API Cloudinary.
- [ ] Đã xác nhận không có bất kỳ secret/mật khẩu mặc định nào bị để lộ.

---

## 4. Hạng Mục Cơ Sở Dữ Liệu (Database Setup)
- [ ] Đã khởi động PostgreSQL 17 qua `docker compose up -d`.
- [ ] Đã chạy lệnh deploy schema CSDL: `npm run db:deploy`.
- [ ] Đã chạy script tạo vai trò và tài khoản Super Admin ban đầu: `npm run db:bootstrap-admin`.
- [ ] Đã thiết lập Cronjob tự động sao lưu CSDL hàng ngày lúc 02:00 sáng.

---

## 5. Hạng Mục Biên Dịch & Khởi Chạy Dịch Vụ (Build & Process Management)
- [ ] Đã chạy thành công `npm run build` (Frontend).
- [ ] Đã chạy thành công `npm run build:admin` (Admin Portal).
- [ ] Đã chạy thành công `npm run build:backend` (Backend Fastify API).
- [ ] Đã khởi chạy 3 service qua PM2 (`vgg-backend`, `vgg-frontend`, `vgg-admin`).
- [ ] Đã lưu cấu hình tự khởi động khi khởi động lại máy chủ: `pm2 save && pm2 startup`.

---

## 6. Hạng Mục Tên Miền, Nginx & Chứng Chỉ SSL (Domain, Nginx & SSL)
- [ ] Đã trỏ bản ghi DNS của tên miền công khai (`vgg.vlu.edu.vn`) về IP máy chủ.
- [ ] Đã trỏ bản ghi DNS của tên miền quản trị (`admin-vgg.vlu.edu.vn`) về IP máy chủ.
- [ ] Đã cấu hình Nginx Reverse Proxy và giới hạn kích thước tải tệp (`client_max_body_size 50M`).
- [ ] Đã cấp chứng chỉ SSL HTTPS (Let's Encrypt / Certbot) và bật tính năng tự động gia hạn.

---

## 7. Hạng Mục Nghiệm Thu Vận Hành (Operational Verification)
- [ ] Truy cập `https://vgg.vlu.edu.vn` tải nhanh, hiển thị đầy đủ hình ảnh, video, song ngữ.
- [ ] Gửi thử đơn tư vấn tuyển sinh và xác nhận đơn hiển thị ngay trong trang Admin.
- [ ] Đăng nhập thành công tài khoản Super Admin tại `https://admin-vgg.vlu.edu.vn`.
- [ ] Thử tạo bài viết tin tức, tài liệu biểu mẫu và kiểm tra chuông thông báo Realtime.
- [ ] Xem log hoạt động: `pm2 logs` không phát hiện lỗi bất thường.
