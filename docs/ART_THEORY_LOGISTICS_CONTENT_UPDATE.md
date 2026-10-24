# Cập nhật Lý luận và Lịch sử Mỹ thuật Ứng dụng, Logistics — 24/10/2026

Nguồn người dùng chỉ định: `C:/Users/lepha/Downloads/thac-si-ly-luan-va-lich-su-my-thuat-ung-dung.html` và `thac-si-logistics-va-quan-ly-chuoi-cung-ung.html`. Trích nội dung và ảnh nhúng nguyên bản JPEG/WebP; đọc giá trị JSON PROGRAMME như dữ liệu, không thực thi JavaScript HTML.

## Lý luận và Lịch sử Mỹ thuật Ứng dụng

Route giữ nguyên `/vi/programmes/ly-luan-lich-su-my-thuat`, file dữ liệu `frontend/src/data/programmes/ly-luan-lich-su-my-thuat.ts`.

- Mã ngành 210401, mã chương trình 8210401; Master of Applied Art Theory and History; nghiên cứu, 24 tháng, 60 tín chỉ.
- Danh mục 25 học phần: 28 tín chỉ học phần bắt buộc, 17 tín chỉ tự chọn (8 cơ sở, 9 chuyên ngành), luận văn 15 tín chỉ. Danh mục có 14 lựa chọn tự chọn, không cộng toàn bộ danh mục thành khối lượng phải học.
- Nhập đủ tổng quan, điểm nổi bật, 9 PLO, ba nhóm đối tượng, danh mục ngành phù hợp, bổ sung kiến thức tối đa 4 hoặc 10 tín chỉ theo nhóm, điều kiện ngoại ngữ/văn bằng nước ngoài, sáu hướng nghề nghiệp, điều kiện hoàn thành và bảy FAQ.
- Học phí 100 triệu đồng, ba đợt 35/30/35 triệu đồng, các khoản thu riêng theo nguồn. Không tự dịch tên học phần tiếng Anh hoặc thêm điều kiện công bố từ ngành khác.
- Đối chiếu nguồn với DOM: **229/229 mục**, không thiếu.

## Logistics và Quản lý chuỗi cung ứng

Route giữ nguyên `/vi/programmes/logistics`, file dữ liệu `frontend/src/data/programmes/logistics.ts`.

- Mã ngành 340123, mã chương trình 8340123; Master of Logistics and Supply Chain Management; 60 tín chỉ cho mỗi định hướng.
- Ứng dụng 18 tháng: danh mục 19 học phần, chọn 4 trong 6 học phần tự chọn để tích lũy 12 tín chỉ; thực tập 6 và đề án 9 tín chỉ.
- Nghiên cứu 24 tháng: danh mục 20 học phần, chọn 4 trong 10 học phần tự chọn để tích lũy 12 tín chỉ; hai chuyên đề 6 tín chỉ mỗi chuyên đề và luận văn 15 tín chỉ.
- Giữ sáu mục tiêu phát triển năng lực đúng tên nguồn, không gọi thành PLO. Nhập điều kiện tuyển sinh, bổ sung kiến thức tối đa 6 tín chỉ, sáu hướng nghề nghiệp và bảy FAQ.
- Điều kiện riêng nghiên cứu là tốt nghiệp đại học từ loại Khá trở lên **và** có công bố khoa học liên quan, giữ đúng liên từ nguồn. Tiếng Việt yêu cầu ngoại ngữ đầu vào Bậc 3; chương trình tiếng Anh Bậc 4 hoặc văn bằng được công nhận; nội dung minh chứng của hai ngôn ngữ được tách nhóm.
- Học phí theo ngôn ngữ, độc lập với định hướng. Tiếng Việt 85 triệu đồng, ba đợt 29,75/25,5/29,75 triệu; tiếng Anh 175 triệu đồng, ba đợt 61,25/52,5/61,25 triệu. Bộ chọn ngôn ngữ cập nhật cả tổng học phí và bảng thanh toán, giữ đúng tỷ lệ 35/30/35%.
- Đối chiếu DOM gộp hai định hướng và hai mức học phí: **221/221 mục**, không thiếu.

## Triển khai và kiểm chứng

Mở rộng `ProgrammeFeeContent.variants` và khối `ProgrammeFees` để hiển thị bộ chọn ngôn ngữ khi đúng ngành có nhiều mức phí. Các ngành khác giữ mức phí riêng. Giá tổng có aria-live; select có label, co giãn trên mobile. Điều kiện ngoại ngữ Logistics dùng cùng layout hai thẻ, các minh chứng chia nhóm mở rộng. Không thêm lịch học kỳ vì nguồn không cung cấp.

Typecheck, lint các file thay đổi, production build frontend và **20/20 tests qua**. Tests kiểm tra riêng cơ cấu tự chọn, điều kiện nghiên cứu dùng “và”, mức học phí và lịch đóng từng ngôn ngữ, giữ dữ liệu các ngành khác.

Browser: hai trang không tràn ngang ở 320/768/960/1440px, một H1, không anchor hỏng, form đủ bốn trường và chọn đúng ngành. Mobile mở đủ 27 accordion ngành Lý luận và Lịch sử Mỹ thuật Ứng dụng, 24 accordion Logistics ứng dụng và 22 accordion Logistics nghiên cứu. Bộ chọn tiếng Anh hiển thị đúng 61.250.000 / 52.500.000 / 61.250.000 đồng, kể cả sau khi đổi tab. Console không có error trong lượt kiểm tra.

Bằng chứng/bản dữ liệu trước sửa: `outputs/ly-luan-lich-su-my-thuat-update`, `outputs/logistics-update`, `outputs/art-logistics-browser.json`; log build cuối `outputs/art-logistics-build-final.log`. Không gửi đăng ký thật, đổi API/auth/database hoặc publish.
