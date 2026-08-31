# 15. THÔNG TIN BẢN PHÁT HÀNH (RELEASE NOTES - V1.0.2)

* **Phiên Bản (Version):** `v1.0.2` (Production Release)
* **Ngày Phát Hành (Release Date):** 31/08/2026
* **Trạng Thái Kiểm Định (QA Status):** PASS TOÀN BỘ — Đủ điều kiện bàn giao triển khai Production.

---

## 1. Các Cải Tiến & Vá Lỗi Bảo Mật V1.0.2 (Security Fixes & Hardening)

### A. Tăng Cường Bảo Mật Khôi Phục Mật Khẩu (Forgot Password Security)
1. **Loại Bỏ Hoàn Toàn Rò Rỉ Reset Token/URL:**
   - Endpoint `/api/admin/auth/forgot-password` tuyệt đối không trả về `resetUrl`, `resetToken` hay `token` trong JSON response.
   - Giao diện Admin không render trực tiếp đường dẫn đặt lại mật khẩu.
2. **Chống Tiết Lộ Danh Tính Người Dùng (Zero Email Enumeration):**
   - Phản hồi generic thống nhất cho cả trường hợp email tồn tại và không tồn tại:
     ```json
     {
       "success": true,
       "message": "Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi."
     }
     ```
3. **Giới Hạn Tần Suất Yêu Cầu (Rate Limiting):**
   - Áp dụng rate limiting chặt chẽ (tối đa 5 yêu cầu / 15 phút trên mỗi IP/Email) nhằm chống spam bot và tấn công từ chối dịch vụ.
4. **Bảo Vệ Token & Phiên Đăng Nhập:**
   - Token ngẫu nhiên 32 bytes sinh qua CSPRNG, chỉ lưu dạng băm SHA-256 trong Database.
   - Token chỉ có hiệu lực 15 phút, chỉ dùng 1 lần duy nhất (`single-use`) và tự động vô hiệu hóa sau khi đổi mật khẩu thành công.
   - Hủy bỏ toàn bộ phiên đăng nhập cũ (`prisma.session.deleteMany`) ngay sau khi hoàn tất đặt lại mật khẩu.

### B. Đồng Bộ Hạ Tầng & Tệp Cấu Hình Deploy (DevOps & Deployment Hardening)
1. **Sửa Quy Tắc `.gitignore` Cho Prisma Migration:**
   - Loại bỏ rule `*.sql` toàn cục, đảm bảo toàn bộ tệp `migration.sql` trong `backend/prisma/migrations` được Git theo dõi đầy đủ.
   - Cho phép IT khởi tạo cơ sở dữ liệu mới hoàn toàn qua `npm run db:deploy` mà không bị thiếu bảng.
2. **Loại Bỏ Mật Khẩu Mặc Định PostgreSQL (Fail-Fast Configuration):**
   - Cập nhật `compose.yaml` sử dụng cú pháp `${POSTGRES_PASSWORD:?POSTGRES_PASSWORD is required}` để bắt buộc cấu hình mật khẩu mạnh tại môi trường production.
3. **Tinh Gọn Docker Compose Production:**
   - Loại bỏ các dịch vụ không sử dụng trong mã nguồn hiện tại (Redis, MinIO) khỏi production compose, chỉ giữ lại PostgreSQL 17.
   - Xác định rõ Cloudinary là dịch vụ lưu trữ media/PDF chính thức cho CMS.
4. **Chuẩn Hóa Lệnh Sao Lưu & Kiểm Tra Sức Khỏe:**
   - Chuyển toàn bộ câu lệnh backup sang dạng portable: `docker compose exec -T postgres ...`.
   - Chuẩn hóa lệnh healthcheck thành: `curl -f http://127.0.0.1:4000/health`.

### C. Tối Ưu Hóa Asset Đa Phương Tiện (Asset Performance)
1. **Nén Video Banner WebM:**
   - Video `frontend/public/video/video-banner.webm` được tối ưu hóa qua chuẩn VP9/Opus, giảm dung lượng từ 57.4 MB xuống còn 21.8 MB mà vẫn duy trì chất lượng sắc nét.
   - Thiết lập đầy đủ thuộc tính `muted`, `playsInline`, `preload="metadata"`, `poster` nhằm tối ưu hóa tải trang trên thiết bị di động.

---

## 2. Các Tính Năng Đã Hoàn Thành (Core Features)

### A. Cổng Thông Tin Tuyển Sinh & Đào Tạo Công Khai (Public Portal)
1. **Server-Side Rendering (Next.js 16 App Router):** Tối ưu hóa SEO tối đa với thẻ OpenGraph, Twitter Card, `sitemap.xml`, và `robots.txt` tự động.
2. **Hỗ trợ Song Ngữ Hoàn Chỉnh (VI / EN):** Tích hợp từ điển đa ngôn ngữ chuyển đổi tức thì giữa Tiếng Việt và Tiếng Anh.
3. **Danh Mục Chương Trình Đào Tạo Sau Đại Học:** Trình bày trực quan, hiện đại về các chuyên ngành Thạc sĩ và Tiến sĩ, định hướng nghiên cứu và lộ trình đào tạo.
4. **Form Đăng Ký Tư Vấn Tuyển Sinh Trực Tuyến:** Tiếp nhận thông tin ứng viên kèm cơ chế chống Spam bot.
5. **Khám Phá & Đời Sống Sau Đại Học:** Giới thiệu viện, sứ mệnh tầm nhìn, cơ sở vật chất, đội ngũ giảng viên và câu chuyện thành công của cựu học viên.

### B. Cổng Quản Trị Nội Dung & Vận Hành (Admin CMS Portal)
1. **Bảng Điều Khiển Tổng Quan (Dashboard Analytics):** Thống kê số lượng lượt truy cập 30 ngày, số hồ sơ tư vấn mới, bài viết và nhân sự hoạt động.
2. **Quản Lý Bài Viết & Sự Kiện (News CMS):** Soạn thảo bài viết, hỗ trợ nhập từ file Word (.docx), bộ lọc lọc mã độc HTML (`sanitize-html`), quản lý trạng thái Bản nháp / Đã xuất bản / Lưu trữ.
3. **Quản Lý Tài Liệu Biểu Mẫu (Resources CMS):** Phân loại văn bản chỉ đạo, văn bản thực thi, brochure, quy chế đào tạo, tải lên và quản lý tệp PDF qua Cloudinary.
4. **Quản Lý Lịch Tư Vấn Tuyển Sinh (Consultations):** Tiếp nhận đơn từ website công khai, phân công cán bộ phụ trách, cập nhật trạng thái xử lý (*Mới*, *Đang liên hệ*, *Đã hoàn thành*) và lưu vết lịch sử tương tác.
5. **Hệ Thống Thông Báo Thời Gian Thực (Realtime Activity Notifications):** Chuông thông báo tự động cập nhật mọi thao tác quản trị viên.

### C. Quản Lý Nhân Sự & Phân Quyền 2 Cấp Bậc (Personnel & 2-Tier RBAC)
1. **Tinh gọn 2 cấp bậc:**
   - **QTV Cấp 1 — Super Admin:** Toàn quyền quản trị hệ thống và quản lý nhân sự.
   - **QTV Cấp 2:** Toàn quyền quản trị nội dung tin tức, tài nguyên biểu mẫu và lịch tư vấn tuyển sinh; chặn hoàn toàn quyền xem và thao tác nhân sự.
2. **Quản lý Nhân sự chuyên sâu:** Super Admin có thể xem chi tiết hồ sơ, cấp email VLU, đổi vai trò phân quyền, khóa / mở khóa tài khoản, cấp lại mật khẩu và xóa tài khoản an toàn.

---

## 3. Quy Trình Cập Nhật Phiên Bản Sau Này (Future Deployments Workflow)

```bash
# 1. Truy cập thư mục ứng dụng
cd /var/www/vgg-platform

# 2. Sao lưu cơ sở dữ liệu trước khi nâng cấp
docker compose exec -T postgres pg_dump -U vgg vgg | gzip > /var/backups/vgg-platform/pre_update_$(date +%Y%m%d_%H%M%S).sql.gz

# 3. Kéo mã nguồn mới nhất
git fetch --tags
git checkout <NEW_VERSION_TAG> # Hoặc: git pull origin main

# 4. Cài đặt thư viện mới và cập nhật CSDL nếu có migration
npm ci
npm run db:deploy

# 5. Build lại các phân hệ
npm run build
npm run build:admin
npm run build:backend

# 6. Khởi động lại dịch vụ với thời gian gián đoạn tối thiểu (Zero-downtime reload)
pm2 reload all

# 7. Kiểm tra trạng thái hoạt động
pm2 status
curl -f http://127.0.0.1:4000/health
```
