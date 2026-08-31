# 13. DANH SÁCH VẤN ĐỀ ĐÃ BIẾT & LƯU Ý KỸ THUẬT (KNOWN ISSUES)

---

## 1. Trạng Thái Hiện Tại (Current Status)

> ✅ **XÁC NHẬN:** **Không ghi nhận lỗi nghiêm trọng (Critical / Blocker) nào cản trở việc triển khai Production tại thời điểm bàn giao.** Toàn bộ các luồng nghiệp vụ cốt lõi, xác thực bảo mật, quản lý nội dung và tiếp nhận đơn tuyển sinh đã vượt qua các kiểm tra hiện có và đủ điều kiện bàn giao/deploy theo phạm vi kiểm thử đã thực hiện.

---

## 2. Các Lưu Ý Vận Hành & Thiết Kế Kiến Trúc (Architecture Considerations)

| Vấn đề / Lưu ý | Mức độ | Phạm vi ảnh hưởng | Giải pháp / Hướng dẫn xử lý |
| :--- | :---: | :--- | :--- |
| **Dung Lượng Video Banner Trang Chủ (~54.7 MB)** | `LOW` | Tốc độ tải ban đầu trên mạng di động | Tệp `frontend/public/video/video-banner.webm` có chất lượng hình ảnh cao. Khuyến khích IT cấu hình Nginx cache static assets hoặc CDN (Cloudflare) để tối ưu băng thông máy chủ khi lượng truy cập cao điểm. |
| **Lưu Trữ Ảnh Dự Phòng (Asset Reuse)** | `LOW` | Kích thước gói mã nguồn | Ảnh `campus.jpg` đang được đặt trong một số thư mục trang con để dự phòng hiển thị độc lập. Trong các đợt bảo trì tương lai có thể quy hoạch thành 1 file dùng chung trong `shared/assets`. |
| **Lưu Trữ Tệp khi Mở Rộng Ngang (Multi-server Scaling)** | `LOW` | Mở rộng nhiều máy chủ ứng dụng | Hiện tại hệ thống hỗ trợ lưu trữ tệp qua Cloudinary và MinIO/Local. Nếu trong tương lai IT triển khai mô hình nhiều máy chủ Web (Multi-instance load balancing), Cloudinary hoặc S3 Bucket phân tán sẽ đảm bảo đồng bộ tệp tải lên giữa các máy chủ. |
| **Tích Hợp Gửi Mail Tự Động (External SMTP Relay)** | `LOW` | Gửi email thông báo tự động | Module phục hồi mật khẩu hiện tại sinh liên kết xác thực an toàn. Khi bàn giao cho IT, IT có thể bổ sung cấu hình SMTP Server của Văn Lang (ví dụ: Office365 SMTP Relay) để tự động gửi email trực tiếp vào hòm thư cán bộ. |
| **Tối Ưu Hóa Ảnh Nâng Cao (Next.js Image Optimization)** | `LOW` | Băng thông mạng | Next.js tự động tối ưu ảnh WebP/AVIF. Khi tải ảnh banner dung lượng rất lớn từ máy ảnh gốc (> 10MB), khuyến khích cán bộ nén ảnh dưới 2MB trước khi upload để tiết kiệm dung lượng lưu trữ máy chủ. |
