# Checklist triển khai

Đánh dấu chỉ sau khi code và kiểm thử tương ứng có bằng chứng.

- [x] Khảo sát repository, Git, stack, models và CMS hiện tại.
- [x] Ghi kiến trúc kế thừa và API hiện trạng.
- [x] Tái sử dụng quản lý trang/ngành, typed editor, whitelist collections, SEO, upload, signed preview và RBAC.
- [x] Thêm snapshot mỗi lần publish thân trang, metadata lịch sử, restore về draft, audit trong cùng transaction; kiểm thử xung đột và isolation bằng integration PostgreSQL.
- [x] Giao diện lịch sử trong editor; đã kiểm tra tải danh sách qua browser và restore/public isolation qua API. Chưa tự động click hộp xác nhận restore trong browser.
- [x] Schema version 1 của composition/custom blocks, đọc tương thích dữ liệu cũ; test từ chối version không hỗ trợ.
- [ ] Menu phân cấp có schema, thứ tự lưu DB, UI kéo thả và keyboard.
- [ ] Theme/global settings có whitelist token, preview và publish.
- [ ] Thư viện media đầy đủ metadata/tìm lọc/thay thế/xóa có kiểm tra tham chiếu.
- [ ] Nghiệm thu UI duplicate/kéo thả builder: code đã bổ sung handle kéo, Lên/Xuống bằng bàn phím, sao chép và xóa khối tự thêm; chưa test gesture kéo thả thực tế. Gallery/statistics/video độc lập chưa triển khai.
- [ ] Lifecycle unpublish/soft-delete cho trang chung ngoài programme.
- [ ] Bộ nghiệm thu trọn luồng menu/theme/media/builder trên responsive và kiểm tra hồi quy ngoài CMS.

Ưu tiên vòng hiện tại: version history/restore vì đây là lỗ hổng toàn vẹn dữ liệu trong luồng publish đã hoạt động. Không thay layout public hoặc tự xuất bản thay đổi nội dung thật trong quá trình phát triển.
