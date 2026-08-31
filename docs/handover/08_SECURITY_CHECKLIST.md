# 08. BẢNG KIỂM TRA BẢO MẬT BÀN GIAO (SECURITY CHECKLIST)

Bảng đối soát an toàn thông tin và bảo mật ứng dụng trước khi đưa vào vận hành thực tế.

---

## 1. Bảng Kiểm Tra Chi Tiết (Security Checklist)

- [x] **Không chứa Secrets trong Git:** File `.gitignore` loại bỏ toàn bộ `.env*` (trừ `.env.example`). Không có mật khẩu hoặc khóa riêng bí mật nào bị lưu trong source code.
- [x] **Bảo Mật Quy Trình Quên & Đặt Lại Mật Khẩu (Hardened Forgot Password Flow):**
  - Tuyệt đối không trả `resetUrl`, `resetToken`, hay `token` về browser response.
  - Phản hồi generic không phân biệt email tồn tại hay không tồn tại (Zero Email Enumeration).
  - Token ngẫu nhiên 32 bytes sinh bằng CSPRNG, chỉ lưu bản băm SHA-256 trong CSDL.
  - Token có thời hạn nghiêm ngặt 15 phút, chỉ sử dụng 1 lần duy nhất (`single-use`) và tự động vô hiệu hóa sau khi hoàn tất.
  - Tự động hủy toàn bộ phiên làm việc cũ khi đặt lại mật khẩu thành công.
  - Giới hạn tần suất (Rate Limiting) tối đa 5 yêu cầu / 15 phút trên mỗi IP/Email.
- [x] **Yêu Cầu HTTPS / SSL Bắt Buộc:** Toàn bộ cookie phiên làm việc được gắn cờ `Secure: true` khi chạy trên môi trường Production.
- [x] **Chuẩn Mã Hóa Mật Khẩu:** Sử dụng **Argon2id** (64MB memory cost, 3 iterations) — chuẩn mã hóa đạt khuyến nghị an toàn OWASP mới nhất.
- [x] **Quản Lý Phiên & Token An Toàn:** Token phiên được băm một chiều **SHA-256** trước khi lưu vào CSDL. Cookie `HttpOnly: true` chống đánh cắp qua tấn công XSS.
- [x] **Bảo Vệ Cookie:** Thiết lập `SameSite: Strict` (hoặc `Lax`) ngăn chặn các cuộc tấn công Cross-Site Request Forgery (CSRF).
- [x] **Phân Quyen Chặt Chẽ Phía Máy Chủ (Server-side RBAC):** Mọi API endpoint quản trị đều được kiểm tra token phiên và danh sách quyền hạn thực tế từ CSDL trước khi thực thi.
- [x] **Chống SQL Injection:** Sử dụng Prisma ORM với 100% Parameterized Queries, loại bỏ nguy cơ chèn câu lệnh SQL trái phép.
- [x] **Chống Stored XSS:** Toàn bộ nội dung bài viết HTML gửi lên từ trình soạn thảo rich-text đều được lọc triệt để qua `sanitize-html` với whitelist thẻ và thuộc tính an toàn trước khi lưu vào CSDL.
- [x] **Kiểm Soát Nguồn Gốc (CORS):** Backend và Frontend chỉ chấp nhận yêu cầu từ các origin hợp lệ (`ALLOWED_ORIGINS`). Tuyệt đối không bật `Access-Control-Allow-Origin: *` cho các API quản trị.
- [x] **Giới Hạn Tần Suất (Rate Limiting):** API đăng nhập (`/api/admin/auth/login`), API quên mật khẩu (`/api/admin/auth/forgot-password`) và API gửi form tư vấn (`/api/public/consultations`) được cấu hình rate limit ngăn chặn Brute-force và Spam bot.
- [x] **Chống Tấn Công Dò Quét (Timing Attack Mitigation):** Khi người dùng nhập sai username, hệ thống vẫn tính toán `DUMMY_HASH` để giữ thời gian phản hồi không đổi.
- [x] **Cơ Chế Khóa Tài Khoản (Account Lockout):** Tự động khóa tài khoản 15 phút nếu nhập sai mật khẩu 5 lần liên tiếp.
- [x] **Bảo Vệ Tài Khoản Nhân Sự Cấp Cao:** Hệ thống chặn Super Admin tự xóa chính mình và chặn xóa Super Admin hoạt động duy nhất còn lại trong hệ thống.

---

## 2. Khuyến Nghị Vận Hành Thêm Cho Đội Ngũ IT / DevOps

1. **Bật Tường Lửa Máy Chủ (UFW / iptables):**
   Chỉ cho phép kết nối bên ngoài qua cổng `80`, `443` và `SSH` (hạn chế theo IP nếu có thể).
2. **Cấu Hình Nginx Security Headers:**
   Bổ sung các header an toàn trong cấu hình Nginx:
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-Content-Type-Options "nosniff" always;
   add_header X-XSS-Protection "1; mode=block" always;
   add_header Referrer-Policy "strict-origin-when-cross-origin" always;
   ```
3. **Đổi Mật Khẩu Định Kỳ:**
   Khuyến khích quản trị viên đổi mật khẩu định kỳ 90 ngày và sử dụng mật khẩu độ dài tối thiểu 10 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
