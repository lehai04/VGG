# Cập nhật Quản trị Khách sạn và Quản trị Kinh doanh — 24/10/2026

Nguồn người dùng cung cấp: `C:/Users/lepha/Downloads/thac-si-quan-tri-khach-san.html` và `thac-si-quan-tri-kinh-doanh.html`. Đọc nội dung HTML, không thực thi script nguồn. Giữ URL ảnh gốc, layout chung, menu giữa, bố cục tuyển sinh và form chọn đúng ngành.

## Nội dung

Cả hai: định hướng ứng dụng, 60 tín chỉ, 18–24 tháng, chính quy tiếng Việt; 4 điểm nổi bật, 6 PLO, 4 hướng nghề nghiệp, điều kiện ngoại ngữ cho ứng viên Việt Nam và nước ngoài, danh mục bổ sung kiến thức, lộ trình mẫu, 6 FAQ, nội dung tư vấn. Học phí 85 triệu, ba đợt 30/25/30 triệu; 5 khoản thu riêng. Không áp tỷ lệ thanh toán 35/30/35% từ các ngành trước.

- Khách sạn: mã nguồn 8810201, 17 học phần trong danh mục. Khối chung 4, cơ sở 18, chuyên ngành bắt buộc 17, tự chọn 6 (chọn 2/4), thực tập 6, đề án 9 tín chỉ. Ngành gần bổ sung ba môn 3 tín chỉ, ngành khác thêm Marketing du lịch thành 12 tín chỉ. Giữ lộ trình mẫu học kỳ 1–3 học phần, 4–5 thực tập/đề án.
- Quản trị Kinh doanh: mã 8340101, 21 học phần trong danh mục. Chung 4, cơ sở 9, chuyên ngành bắt buộc 19, tự chọn 13, thực tập 2+4, đề án 9 tín chỉ. Miễn bổ sung cho các ngành thuộc khối Kinh doanh và Quản lý của Văn Lang; hồ sơ khác được đối chiếu bằng cấp, bảng điểm, kinh nghiệm; bổ sung tối đa 12 tín chỉ. Lộ trình mẫu 13/18/14/15 tín chỉ trong bốn học kỳ.

Tên học phần và mã được giữ nguyên theo bảng, gồm tên tiếng Anh khi có. Không tự thêm công bố khoa học hoặc điều kiện tốt nghiệp ngoài nguồn; mục kết thúc chương trình chỉ liệt kê học phần thực tập và đề án.

## Sai lệch nguồn đã sửa

Khách sạn ghi 16 tín chỉ chuyên ngành bắt buộc trong đoạn tóm tắt, trong khi 5 học phần trong bảng có 3+4+3+3+4=17. Dùng 17 để khớp bảng và tổng 60. FAQ miễn bổ sung của cả hai file trả lời nhầm nhóm cần bổ sung: thay bằng đúng đoạn “Miễn bổ sung” trong điều kiện dự tuyển của chính ngành.

Ẩn thẻ h3 của PLO khi nguồn không có tiêu đề riêng để tránh heading rỗng. Không ảnh hưởng PLO có tiêu đề ở ngành khác.

## Kiểm chứng

Typecheck, lint các file thay đổi và production build frontend qua; 23/23 tests qua. Test riêng cơ cấu tín chỉ bắt buộc/tự chọn, học phí ba đợt, PLO, FAQ miễn bổ sung và điều kiện đầu vào.

Browser ở 320, 768, 960, 1440 px: hai trang không tràn ngang; mỗi trang một h1, không anchor nội bộ hỏng, form chọn sẵn đúng ngành. Khách sạn đã xác nhận 15/15 details mở trên mobile không tràn ngang. Không gửi form thật hoặc publish.

Đối chiếu nguyên văn nguồn–DOM: Khách sạn 88/95, Quản trị Kinh doanh 97/103. Năm khoản thu ở mỗi ngành được tách thành nhãn và giá trị nên mất dấu hai chấm khi ghép text; dữ liệu đủ. Tiêu đề FAQ dùng nhãn chung của website. Một khác biệt còn lại ở Khách sạn là sửa 16 thành 17 tín chỉ như trên. Không coi phép đối chiếu này là xác minh chính sách ngoài tài liệu được cung cấp.

Bằng chứng: `outputs/hospitality-business-responsive.json`, `outputs/hospitality-business-build.log`, `outputs/quan-tri-khach-san-update/coverage.json`, `outputs/quan-tri-kinh-doanh-update/coverage.json`, ảnh `outputs/quan-tri-kinh-doanh-update/preview.png`. Importer: `work/import-hospitality-business-sources.py`.
