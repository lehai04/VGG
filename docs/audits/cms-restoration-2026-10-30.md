# Khôi phục CMS — 30/10/2026

Nguồn giao diện: CMS cũ tại commit 2ef0b0e, chuyển vào ứng dụng cms riêng; giữ xác thực session mới. Bốn mục: Dashboard, Lịch tư vấn, Tin tức (Đăng tin / Danh sách tin đăng), Quản lý tài nguyên. Logo sao chép từ frontend/public/images/logo/logo-vgg.png.

Quyền nội dung mặc định false. Local đã cấp canManageContent cho admin@vgg.local; các tài khoản tư vấn khác không được cấp. Migration chỉ bổ sung bảng/cột mới và cho phép author_id cũ nullable, giữ dữ liệu/quan hệ hiện có. Không triển khai production.

## Kiểm chứng
- CMS: typecheck, lint, production build thành công.
- Backend: build thành công. 14 unit tests đạt; 2 integration tests chạy riêng trên database tạm và đạt (auth, quyền nội dung, CSRF, CRUD, lọc HTML, revision conflict, lịch sử, dashboard).
- HTTP local qua proxy CMS: dashboard/news/resources/resource-categories/consultation-workspace đều 200 khi đăng nhập.
- Upload ảnh PNG 16px qua CMS, backend chuyển WebP, lưu MinIO và GET media 200 image/webp. Đã dọn đúng ảnh và session kiểm thử.
- Trình duyệt: đăng nhập admin; mở dashboard, danh sách tư vấn, danh sách tin, soạn tin, tài nguyên; bốn mục menu và menu con đúng. Đã sửa định dạng ngày ISO của tin cũ.
- Quota đăng nhập độc lập theo tài khoản/IP. Backend chỉ tin forwarded IP từ loopback/private proxy; test giả mạo header từ IP public bị chặn.

## Khi triển khai
Build lại backend/CMS/gateway, chạy migration trên cơ sở dữ liệu đã đối chiếu lịch sử migration. Giữ MinIO và dữ liệu hiện có; app cần thêm PutObject cho cms/news/* và cms/resources/*, không cần DeleteObject. Hướng dẫn chi tiết trong HANDOVER.md và CONSULTATION_ADMIN.md. Chưa thực hiện kiểm thử production hoặc triển khai lên tên miền thật trong đợt này.
