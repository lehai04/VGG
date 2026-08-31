# 11. BẢNG KIỂM TRA SAU TRIỂN KHAI (POST-DEPLOY CHECKLIST)

Sau khi hoàn tất quá trình deploy lên máy chủ, kỹ sư IT / DevOps tiến hành kiểm tra lần lượt các hạng mục sau:

---

## 1. Kiểm Tra Hạ Tầng & Tên Miền (Domain & Network)

- [ ] **HTTPS / SSL Certificate:** Chứng chỉ SSL hợp lệ, không có cảnh báo bảo mật trên trình duyệt.
- [ ] **HTTP to HTTPS Redirect:** Truy cập qua `http://` tự động chuyển hướng an toàn sang `https://`.
- [ ] **Nginx Reverse Proxy:** Định tuyến đúng cổng `3000` (Frontend) và cổng `3001` (Admin).
- [ ] **PM2 Status:** Tất cả 3 service (`vgg-backend`, `vgg-frontend`, `vgg-admin`) đều ở trạng thái `online`, không bị restart liên tục (`uptime > 5m`).

---

## 2. Kiểm Tra Các Tuyến Đường Chính (Smoke Test Routes)

| Tuyến Đường (Route) | Phân Hệ | Mục Đích Kiểm Tra | Kết Quả Mong Đợi |
| :--- | :--- | :--- | :---: |
| `GET /health` | Backend | Kiểm tra sức khỏe API | `HTTP 200 {"status":"ok"}` |
| `GET /` | Frontend | Trang chủ Cổng thông tin | `HTTP 200` Tải đầy đủ Banner, Video, Menu |
| `GET /discover` | Frontend | Trang Giới thiệu & Sứ mệnh | `HTTP 200` Hiển thị nội dung & hình ảnh |
| `GET /programmes` | Frontend | Danh mục Chương trình Đào tạo | `HTTP 200` Danh sách Thạc sĩ, Tiến sĩ |
| `GET /admissions` | Frontend | Thông tin Tuyển sinh Sau Đại học | `HTTP 200` Tiêu chí, học phí, lịch tuyển sinh |
| `GET /news` | Frontend | Trang Tin tức & Sự kiện | `HTTP 200` Danh sách bài viết tin tức mới nhất |
| `GET /resources` | Frontend | Trang Tài nguyên & Biểu mẫu | `HTTP 200` Danh mục văn bản, brochure, PDF |
| `GET /sitemap.xml` | Frontend | Sơ đồ trang phục vụ SEO | `HTTP 200` Cấu trúc XML hợp lệ |
| `GET /robots.txt` | Frontend | Quy tắc thu thập dữ liệu bot | `HTTP 200` Cấu hình robots chuẩn |
| `GET /admin/login` | Admin | Trang Đăng nhập Quản trị viên | `HTTP 200` Form đăng nhập email VLU / username |
| `GET /admin/dashboard`| Admin | Bảng điều khiển thống kê | `HTTP 200` Biểu đồ truy cập, số lượng đơn |
| `GET /admin/users` | Admin | Quản lý Nhân sự (Super Admin) | `HTTP 200` Danh sách cán bộ & quyền hạn |
| `GET /admin/news` | Admin | Quản lý Tin bài CMS | `HTTP 200` Bảng bài viết & nút thêm mới |
| `GET /admin/resources`| Admin | Quản lý Tài liệu CMS | `HTTP 200` Danh sách tài liệu biểu mẫu |
| `GET /admin/consultations`| Admin | Quản lý Lịch tư vấn tuyển sinh | `HTTP 200` Danh sách yêu cầu tư vấn mới |

---

## 3. Kiểm Tra Nghiệp Vụ Chức Năng (Functional Smoke Test)

- [ ] **Chuyển đổi Ngôn ngữ (i18n):** Bấm chuyển đổi giữa **VI (Tiếng Việt)** và **EN (English)** trên Header trang chủ hoạt động mượt mà.
- [ ] **Gửi Đơn Tư Vấn Tuyển Sinh (Consultation Form):**
  - Mở form "Đăng ký tư vấn" tại trang tuyển sinh hoặc chân trang.
  - Điền thông tin thử nghiệm và bấm "Gửi yêu cầu".
  - Kiểm tra thông báo gửi thành công trên giao diện.
  - Đăng nhập Admin vào mục `/admin/consultations` để xác nhận đơn vừa gửi xuất hiện trong danh sách.
- [ ] **Đăng Nhập & Phân Quyền Quản Trị (Admin Auth):**
  - Đăng nhập bằng tài khoản Super Admin -> Xem được toàn bộ menu (bao gồm mục Nhân sự).
  - Đăng nhập bằng tài khoản QTV Cấp 2 -> Xem được Tin tức, Tài nguyên, Lịch tư vấn; không thấy và không vào được mục Nhân sự.
- [ ] **Thông Báo Thời Gian Thực (Realtime Notifications):**
  - Biểu tượng chuông 🔔 trên Topbar Admin hiển thị số lượng hoạt động gần nhất.
  - Khi tạo một bài viết mới hoặc có đơn tư vấn mới, chuông thông báo tự động cập nhật trong vòng 12 giây.
- [ ] **Tải Lên Tệp & Hình Ảnh (File Upload):**
  - Tạo thử một bài viết mới và tải lên ảnh đại diện cover image.
  - Tải lên một tệp tài liệu PDF trong mục Tài nguyên và kiểm tra nút tải về trên trang công khai.
- [ ] **Giao Diện Đáp Ứng Đa Thiết Bị (Responsive Mobile & Tablet):**
  - Mở giao diện trên thiết bị di động (hoặc chế độ Responsive F12), kiểm tra menu Hamburger và các nút bấm sticky actions hoạt động tốt.
