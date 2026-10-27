# Vận hành thử CMS và rollback

## Thao tác biên tập

- Nội dung: mở /admin/content, chọn trang/ngành, ngôn ngữ và section. Lưu nháp, xem trước, gửi duyệt. Người có quyền xuất bản duyệt đúng phiên bản rồi đăng ngay hoặc đặt lịch. Sửa tiếp sẽ làm mất hiệu lực duyệt cũ.
- Tin tức: /admin/news-workspace. Tạo nháp, nội dung/ảnh/SEO, gửi duyệt. Khôi phục phiên bản chỉ thay nháp. Gỡ công khai và thùng rác giữ lịch sử. Khôi phục khỏi thùng rác về chưa công khai và phải duyệt lại.
- Tư vấn: /admin/consultation-workspace. Tìm hồ sơ, ghi chú, trạng thái, kết quả và lịch liên hệ; phân công yêu cầu quyền consultations.assign.
- Hồ sơ: /admin/applications chỉ đọc.
- Tài nguyên: /admin/resources. Tạo mới mặc định chưa công khai. Lưu bản công khai áp dụng trực tiếp; cần đọc cảnh báo. Phiên bản cũ có thể nạp vào biểu mẫu và lưu lại. Lưu trữ giữ dữ liệu/tệp.
- Lỗi conflict: sao chép phần đang nhập cần giữ, tải lại dữ liệu mới nhất rồi đối chiếu. Không bỏ kiểm tra revision.
- Lịch đăng chạy mỗi 30 giây khi backend hoạt động; nếu backend tắt, job được xét khi chạy lại. Quyền/duyệt/nội dung bị đổi làm lịch thất bại. Xem Dashboard và trạng thái lịch để xử lý.

## Kiểm thử riêng

Chạy node scripts/test-cms-integration.mjs từ gốc repo. Script biên dịch backend, chỉ chấp nhận PostgreSQL local, tạo database ngẫu nhiên vgg_cms_test_*, migrate ở database đó, test rồi drop trong finally. Không dùng seed/reset/migrate trên database gốc.

CMS_QA_SERVE=1 giữ môi trường browser QA sau khi tests qua: backend4020, frontend3020, admin3021. Build admin/frontend trước. Credentials nằm trong file tạm chỉ dùng QA, tự dọn sau tối đa20 phút hoặc tạo stopFile được chỉ ra trong file credentials. Không chia sẻ credential trong báo cáo.

## Điều kiện cutover chưa thực hiện

1. Backup DB và MinIO; thử restore vào môi trường riêng.
2. Chạy inventory/mapping và báo cáo chênh lệch với dữ liệu thật ở chế độ chỉ đọc.
3. Nghiệm thu nội dung/layout/URL và quyền bằng từng vai trò; kiểm tra vi/en và các breakpoint.
4. Đóng các mục tồn ở 07-implementation-status.md.
5. Dừng nhận sửa ở admin cũ, hủy/đối chiếu lịch chờ, triển khai app mới; chỉ xóa admin cũ sau nghiệm thu và có phương án khôi phục.

## Rollback

- Không xóa record cms-* hoặc tệp để rollback UI.
- Dừng backend worker trước khi đổi phiên bản nếu cần ngăn lịch đang chờ chạy; giữ DB và storage nguyên trạng.
- Trả app về bản release đã sao lưu, đối chiếu URL/trang quan trọng và phân quyền.
- Khôi phục nội dung bằng phiên bản vào nháp rồi duyệt lại; không tự động xuất bản hàng loạt.
- Các API tài nguyên mới yêu cầu revision khi PUT/DELETE. Rollback frontend cần đồng bộ backend tương ứng; không bỏ revision chỉ để tránh lỗi client cũ.
