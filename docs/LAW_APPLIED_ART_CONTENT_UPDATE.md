# Cập nhật Luật Kinh tế và Mỹ thuật Ứng dụng — 24/10/2026

Nguồn: hai HTML người dùng cung cấp trong Downloads: `thac-si-luat-kinh-te.html`, `thac-si-my-thuat-ung-dung (1).html`. Chỉ đọc nội dung và dữ liệu, không thực thi script của HTML.

## Luật Kinh tế

Route `/vi/programmes/luat-kinh-te`; mã ngành 380107, mã chương trình 8380107, ứng dụng 18 tháng, 60 tín chỉ, học phí 85 triệu đồng; ba đợt 29,75/25,5/29,75 triệu đồng.

Nhập tổng quan, điểm nổi bật, 7 PLO, đối tượng, ngoại ngữ, danh mục bổ sung kiến thức 19 tín chỉ, 4 hướng nghề nghiệp, 19 học phần trong danh mục, kế hoạch học tập, điều kiện hoàn thành, khoản thu riêng, 7 FAQ và lời dẫn tư vấn. Cơ cấu bắt buộc 42 tín chỉ và tự chọn 18 tín chỉ; thực tập 8 tín chỉ tối thiểu 9 tuần, đề án 9 tín chỉ ít nhất 3 tháng.

Nguồn có một khối facts và JSON PROGRAMME còn dữ liệu Kế toán (340301/8340301, 24 tháng). Dùng khối đầu trang và FAQ đúng Luật Kinh tế: 380107/8380107, 18 tháng; không nhập dữ liệu sao chép nhầm. Giữ hai ảnh URL gốc; ghi công dạng văn bản nếu nguồn không cung cấp liên kết.

## Mỹ thuật Ứng dụng

Route `/vi/programmes/my-thuat-ung-dung`; mã ngành 210410, mã chương trình 8210410-01, ứng dụng 18–24 tháng, 60 tín chỉ, học phí 100 triệu đồng; ba đợt 35/30/35 triệu đồng.

Nhập 10 PLO, 3 nhóm đối tượng, xét tuyển kết hợp phỏng vấn, yêu cầu ngoại ngữ, bổ sung kiến thức tối đa 4 hoặc 10 tín chỉ theo nhóm, 6 hướng nghề nghiệp, 23 học phần trong danh mục, 6 FAQ và lời dẫn tư vấn. Khối bắt buộc 39 tín chỉ cộng tự chọn 21 tín chỉ; thực tập 6 và đề án 9 tín chỉ. Giữ lịch 6 học kỳ là kế hoạch tham khảo từ bản mô tả 2024; không tự coi toàn bộ học phần tự chọn là bắt buộc.

Bỏ yêu cầu 2 công bố của dữ liệu cũ vì nguồn mới không nêu. JSON PROGRAMME còn metadata ngành Lý luận và Lịch sử Mỹ thuật được bỏ qua; dùng nội dung hiển thị đúng ngành. Ảnh nhúng được trích nguyên bản vào public, không chỉnh sửa ảnh.

## Kiểm chứng

- Typecheck, lint phạm vi thay đổi, production build frontend: qua. 22/22 tests qua, có kiểm tra riêng hai ngành và cơ cấu tín chỉ.
- Browser: hai trang ở 320, 768, 960, 1440 px không tràn ngang; mỗi trang một h1, không có anchor nội bộ hỏng, form chọn sẵn đúng ngành. Mở toàn bộ 20/20 và 30/30 details trên mobile, không tràn ngang.
- Đối chiếu nguyên văn DOM: Luật 138/143 đơn vị; 5 khác biệt là hai nhãn mục dùng tiêu đề chung và ba dấu + trang trí của summary. Mỹ thuật 198/204 đơn vị; 6 khác biệt là từng dòng học kỳ được tách thành tiêu đề và nội dung, nội dung vẫn có đủ (DOM đã kiểm tra). Không coi phép đếm nguyên văn là xác minh chính sách tuyển sinh ngoài nguồn.
- Hai ảnh nội dung mỗi ngành đã tải thành công trong kiểm tra; trạng thái ảnh lazy ở các khung chưa cuộn đến không được tính là lỗi tải. Không gửi form đăng ký thật, không thay API/auth/database, không publish.

Bằng chứng: `outputs/law-art-responsive.json`, `outputs/law-applied-art-build.log`, `outputs/luat-kinh-te-update/`, `outputs/my-thuat-ung-dung-update/`. Importer: `work/import-law-applied-art-sources.py`.
