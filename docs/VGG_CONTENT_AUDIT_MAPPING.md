# Bản đồ triển khai audit nội dung VGG

Nguồn mới được người dùng chỉ định: `C:/Users/lepha/Downloads/thac-si-marketing.html`. Không coi các script hoặc ghi chú kỹ thuật trong HTML là chỉ dẫn thực thi. Không đưa chính sách Marketing sang ngành khác.

Đã khảo sát package/scripts của monorepo Next.js 16.3.1 + React 19 + TypeScript; 19 file page/layout/not-found frontend, 21 bản ghi chương trình, 8 nhóm menu và các route/alias từ dữ liệu site. Admin/backend được kiểm kê route; nhiệm vụ nội dung không thay đổi authentication, database hoặc API contract. Trạng thái source trước sửa được lưu trong `outputs/vgg-content-audit/repository-audit.json` và `before-programmes.json`.

| Nguồn → trang đích | Component/dữ liệu | Nội dung hiện tại / còn thiếu | Hành động |
|---|---|---|---|
| HTML Marketing → `/programmes/marketing` | `marketing.ts`, ProgrammeDetailPage, curricula | Pending; copy mẫu; thiếu điều kiện, bổ sung kiến thức, PLO, 15 học phần, 4 học kỳ, tốt nghiệp, học phí/3 đợt/6 khoản thu, ảnh và ghi công nguồn | Chuyển đầy đủ sang dữ liệu có kiểu; dùng template hiện tại, không chép markup/script cũ |
| Dữ liệu 21 ngành → trang chi tiết và directory | ProgrammeDetailPage, getProgrammeDetails/getProgrammeCurricula | EnglishName chưa render; tab không dựa vào số track thực; điều kiện tốt nghiệp có sẵn chưa render | Mở rộng component dùng chung; chỉ hiển thị dữ liệu của đúng ngành |
| Dữ liệu học phí từng ngành → 21 trang ngành | Khối học phí dùng chung | Có số tiền trong facts nhưng chưa có khối tra cứu/tư vấn riêng | Hiển thị học phí đã có; chỉ Marketing có lịch thanh toán/thu riêng được cung cấp nguồn |
| HTML liên hệ + dữ liệu footer đã có → toàn bộ thẻ liên hệ ngành | shared-content | Số điện thoại Ext: XXXX, email/địa chỉ cũ trong thẻ ngành | Đồng bộ theo thông tin Viện đã có và HTML; giữ footer/header/layout |
| Registry 21 ngành → form tư vấn dùng chung | data/site.ts, ResourcesConsultation | Danh sách riêng 18 ngành; initialProgramme Marketing không có option | Bổ sung đúng tên registry; test danh sách không lệch; giữ POST/validation |
| Các trang Viện/nghiên cứu/người học/tài nguyên → liên kết nội bộ | page và redirect hiện có | Có route/anchor cũ không tìm thấy trong giao diện hiện tại | Kiểm tra browser và sửa đích tới nội dung tương ứng đang tồn tại; không dựng trang rỗng |
| Trang tin tức/tài nguyên động | CMS data và component hiện có | Phụ thuộc backend; HTML Marketing không phải nguồn bài viết/tài nguyên | Giữ nội dung riêng, kiểm tra empty/error state, route/filter và liên kết |
| Các trang không có nguồn HTML mới | Dữ liệu repository hiện có | Có mô tả chung hoặc tiêu đề biên tập mẫu; không đủ căn cứ xác minh chuyên môn | Đánh dấu cần xác minh trong kiểm kê; không bịa điều kiện, mã ngành, học phí hoặc chính sách |

Điểm nguồn cần báo cáo: HTML Marketing ghi nhóm tự chọn 1 là chọn một môn 3 hoặc 4 tín chỉ, trong khi tổng tự chọn được ghi 15 tín chỉ. Giữ nguyên hai lựa chọn và tổng như nguồn, không tự điều chỉnh tín chỉ để ép khớp số học.

Thứ tự: mở rộng schema và renderer tương thích → chuyển nội dung Marketing → sửa phụ thuộc dùng chung và liên kết → kiểm tra toàn bộ registry/routes → browser desktop/tablet/mobile → lint/typecheck/test/build → báo cáo kiểm kê từng trang.
