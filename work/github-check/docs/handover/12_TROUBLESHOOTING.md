# 12. HƯỚNG DẪN XỬ LÝ SỰ CỐ THƯỜNG GẶP (TROUBLESHOOTING GUIDE)

---

## 1. Sự Cố Kết Nối Cơ Sở Dữ Liệu (Database Connection Refused / Prisma Error)

### Triệu chứng:
Log ứng dụng hiển thị lỗi: `Can't reach database server at 127.0.0.1:5433` hoặc `PrismaClientInitializationError`.

### Cách xử lý:
1. Kiểm tra container PostgreSQL có đang chạy không:
   ```bash
   docker compose ps
   ```
2. Nếu container chưa chạy hoặc bị exit:
   ```bash
   docker compose up -d postgres
   docker compose logs postgres
   ```
3. Kiểm tra biến môi trường `DATABASE_URL` trong `backend/.env` và `admin/.env.local` đã khớp thông tin người dùng, mật khẩu và cổng `5433` hay chưa.

---

## 2. Sự Cố Xung Đột Cổng Mạng (Port Already in Use / EADDRINUSE)

### Triệu chứng:
Khi khởi động ứng dụng báo lỗi: `listen EADDRINUSE: address already in use 0.0.0.0:4000` (hoặc `3000`, `3001`).

### Cách xử lý:
1. Kiểm tra tiến trình đang chiếm cổng:
   ```bash
   sudo lsof -i :4000   # Hoặc :3000, :3001
   ```
2. Nếu do một tiến trình Node.js cũ bị treo, tắt tiến trình đó:
   ```bash
   sudo kill -9 <PID>
   ```
3. Sau đó khởi động lại service qua PM2:
   ```bash
   pm2 restart all
   ```

---

## 3. Lỗi 503 Backend Chưa Được Cấu Hình / Service Unavailable

### Triệu chứng:
Frontend hoặc Admin hiển thị thông báo: *"Backend chưa được cấu hình"* hoặc lỗi kết nối khi lưu bài viết.

### Cách xử lý:
1. Kiểm tra biến `BACKEND_INTERNAL_URL` trong `frontend/.env.local` và `admin/.env.local`:
   - Phải trỏ đúng về địa chỉ Backend đang lắng nghe (mặc định: `http://127.0.0.1:4000`).
2. Kiểm tra Backend API có đang chạy và phản hồi không:
    ```bash
    curl -f http://127.0.0.1:4000/health
    ```

---

## 4. Lỗi 413 Payload Too Large Khi Tải Tệp / Hình Ảnh Lên CMS

### Triệu chứng:
Khi quản trị viên tải tệp PDF dung lượng lớn (10MB - 30MB) hoặc ảnh chất lượng cao lên CMS thì nhận lỗi `413 Request Entity Too Large` từ Nginx.

### Cách xử lý:
Mặc định Nginx giới hạn file upload là `1MB`. Cần tăng giới hạn này trong cấu hình Nginx:
1. Mở file cấu hình Nginx: `/etc/nginx/sites-available/vgg-platform`
2. Bổ sung dòng sau vào bên trong block `server { ... }` của trang Admin:
   ```nginx
   client_max_body_size 50M;
   ```
3. Kiểm tra và tải lại Nginx:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

---

## 5. Lỗi Không Đăng Nhập Được Tài Khoản Quản Trị / Bị Khóa

### Triệu chứng:
Đăng nhập báo *"Tài khoản đã bị tạm khóa do nhập sai mật khẩu quá 5 lần"* hoặc quên mật khẩu Super Admin.

### Cách xử lý:
1. Sử dụng tính năng **"Quên mật khẩu?"** tại trang `/admin/forgot-password` bằng Email Văn Lang `@vlu.edu.vn`.
2. Hoặc kết nối trực tiếp vào CSDL để mở khóa tài khoản ngay lập tức:
   ```bash
   docker compose exec postgres psql -U vgg -d vgg -c "UPDATE admins SET status = 'ACTIVE', failed_login_attempts = 0, locked_until = NULL WHERE username = 'admin';"
   ```
