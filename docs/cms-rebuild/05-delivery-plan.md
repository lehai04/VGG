# Kế hoạch triển khai chuyển đổi và nghiệm thu

## Thứ tự và ước lượng sơ bộ

Ước lượng theo ngày công kỹ sư, không phải cam kết thời gian chạy của agent. Chưa gồm thời gian chờ duyệt/cấp môi trường; cần cập nhật sau khi đóng runtime inventory và khối lượng dữ liệu DB.

| Công việc | Ước lượng | Phụ thuộc và kết quả |
|---|---|---|
| Đóng runtime baseline và ánh xạ từng field render | 3–5 ngày | Môi trường chuẩn, read-only data; snapshot đầy đủ và mapping được duyệt |
| Prototype và thiết kế CMS | 3–5 ngày | Mapping/mẫu ngành được duyệt; duyệt UX trước lập trình diện rộng |
| Nền tảng quyền/revision/media và tin tức | 8–12 ngày | UX và mô hình dữ liệu; một luồng end-to-end hoàn chỉnh |
| Website/chuyên ngành/tài liệu | 8–12 ngày | Template đã duyệt, xử lý admissions HTML engine và curricula riêng |
| Tư vấn/đăng ký/dashboard | 4–6 ngày | Quyền/phạm vi dữ liệu; không mở rộng thành xét tuyển |
| Dry run dữ liệu, regression, bàn giao | 5–8 ngày | Dữ liệu môi trường kiểm thử và nghiệm thu |

Tổng sơ bộ 31–48 ngày công sau bản khảo sát nguồn này; có thể thay đổi khi xác minh overrides, ngành động và dữ liệu legacy. Không quy đổi trực tiếp thành số tuần hay lịch giao cố định.

## Kế hoạch chuyển đổi

1. Chốt môi trường chuẩn và freeze mốc nội dung/layout phục vụ đối chiếu; không khóa hoạt động biên tập toàn dự án quá sớm.
2. Backup DB và storage bằng quy trình có kiểm chứng restore trong môi trường riêng. Hash nguồn không phải backup DB.
3. Export đủ source defaults + published patches + collections + banner/layout + ngành động/trạng thái ẩn + SEO + draft/history + media references. Không đưa PII vào bộ tài liệu duyệt.
4. Resolve nội dung bằng cơ chế hiện tại. Lưu checksum, URL, locale, thứ tự và quan hệ; map ID cũ–mới. Không tự dịch hoặc làm sạch câu chữ.
5. Dry run importer idempotent vào DB kiểm thử. Log số lượng, duplicate, unmapped fields và tệp thiếu; không ghi credential.
6. So sánh legacy và v2: text/HTML, ảnh/link, metadata, thứ tự và trạng thái. Không chuyển nếu có khác biệt chưa giải thích/duyệt.
7. Mỗi phân hệ chỉ có một nơi được ghi. Khi cutover, đóng writer cũ cho phân hệ đó, đồng bộ delta rồi đổi adapter; không dual-write tùy tiện.
8. Giữ legacy read-only và snapshot. Nếu rollback sau khi v2 có thay đổi mới, phải lưu/chuyển các thay đổi đó trước khi quay adapter; không đơn giản restore backup cũ gây mất nội dung.
9. Chỉ gỡ admin/schema cũ sau nghiệm thu, quan sát ổn định trong thời hạn được thống nhất và có duyệt riêng.

## Ma trận kiểm thử

| Nhóm | Điều kiện đạt |
|---|---|
| Nội dung | Giá trị, liên kết, URL, locale, thứ tự tương đương baseline; không mất trường hoặc fallback |
| Layout | Ảnh đối chiếu cùng viewport 1440/768/390px; DOM section order giống; kiểm tra tràn nội dung và tương tác |
| Ngành | 21 ngành nguồn + ngành động thực tế; kiểm tra đủ biến thể; ngành mới dùng renderer chung, không rò dữ liệu ngành mẫu |
| Admissions | Tab bậc đào tạo, modal, FAQ, form và HTML slot giữ hoạt động; không lệch offset template |
| Workflow | Draft chưa đủ lưu được; sửa LIVE không đổi public; duyệt đúng revision; restore vào draft |
| Hẹn giờ | Chưa tới giờ không lộ list/detail/search/cache; job retry không xuất bản trùng; hủy lịch hiệu lực |
| Quyền | Test API trực tiếp, cross-owner/role, session hết hạn và tài khoản khóa; không chỉ test nút ẩn |
| Xung đột | Hai editor cùng revision không ghi đè âm thầm; giữ nội dung của người bị conflict |
| Media | Tệp đang dùng/được history tham chiếu không bị xóa; URL tải và MIME đúng |
| Tư vấn | Assignment, note/history, next contact và outcome đúng; lỗi mạng không xóa cập nhật khác |
| Tìm kiếm | Total/filter/page nhất quán, kiểm tra tập dữ liệu vượt một trang |
| Khôi phục | Backup restore được; rollback có phương án giữ các cập nhật phát sinh sau cutover |

Build/lint/typecheck/unit test theo repository là điều kiện kỹ thuật bổ sung, không thay thế nghiệm thu nội dung và giao diện. Chỉ chạy toàn bộ khi triển khai có thay đổi ứng dụng; hiện mới kiểm chứng script inventory.

## Ba điểm duyệt

1. Duyệt mapping, mẫu ngành và phạm vi. Phiên này dừng tại đây; runtime baseline còn cần đóng trước coi mapping cuối cùng hoàn tất.
2. Duyệt prototype và luồng thao tác trước triển khai diện rộng.
3. Nghiệm thu dữ liệu/giao diện/quyền và cho phép chuyển chính thức. Gỡ admin cũ phải có xác nhận rõ.

## Điều kiện cần bổ sung ngay

Cần xác định URL hoặc môi trường website VGG được coi là bản chuẩn và cách truy cập dữ liệu public đã xuất bản. Hiện không có dịch vụ local chạy; không thể xác nhận các override trong DB hoặc chụp giao diện thực tế. Có thể duyệt định hướng kiến trúc trước, nhưng chưa được đánh dấu toàn bộ bản đồ nội dung là đã nghiệm thu.
