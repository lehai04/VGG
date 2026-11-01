# Quản lý tài nguyên — 30/10/2026

- Gom số văn bản, ngày ban hành, đơn vị vào một cột; bảng còn 7 cột có độ rộng cố định và cuộn ngang trên màn hình nhỏ. Tên file rút gọn có tooltip. Cụm thao tác 2×2 với icon và màu riêng, giữ ở mép phải khi cuộn.
- Xác nhận xóa vĩnh viễn thay nội dung lưu trữ sai. API xóa bản ghi và phiên bản; kiểm tra tham chiếu ở tài nguyên, tin tức, nội dung website và phiên bản khác trước khi xóa object MinIO. File dùng chung được giữ lại. Lỗi kho lưu tác vụ cleanup trong cms_revisions (chỉ URL, không giữ nội dung khôi phục), tự thử lại mỗi 30 giây. Cần DeleteObject giới hạn prefix tài liệu. Không thể thu hồi bản đã tải về hoặc cache ở máy người dùng.
- Sửa proxy CMS không tự gắn application/json cho DELETE không có body.
- PDF bị chặn vì X-Frame-Options DENY áp dụng toàn website/CMS. Chỉ các endpoint tài liệu đổi SAMEORIGIN và frame-ancestors self; trang thường vẫn DENY. PDF an toàn không dùng CSP sandbox để trình xem PDF của trình duyệt hoạt động.

Kiểm chứng: backend/CMS build, lint CMS; kiểm thử tích hợp trên DB tạm gồm xóa file không chung, giữ file dùng chung, hết phiên bản khôi phục và retry lỗi storage. Kiểm thử HTTP local: PDF website/CMS trả 200 application/pdf + SAMEORIGIN; trang website vẫn DENY. Upload PDF kiểm thử riêng, tạo resource nháp rồi DELETE qua proxy: 200, object gốc 404, số bản ghi và phiên bản đều 0; đã dọn danh mục và session kiểm thử. Không xóa tài liệu người dùng đang có. Chưa deploy lên server.
