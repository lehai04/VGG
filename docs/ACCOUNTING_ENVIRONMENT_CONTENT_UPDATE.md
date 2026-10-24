# Cập nhật Kế toán và Kỹ thuật Môi trường — 24/10/2026

Nguồn người dùng chỉ định: `C:/Users/lepha/Downloads/thac-si-ke-toan.html` và `thac-si-ky-thuat-moi-truong.html`. Chỉ nhập nội dung và hai ảnh WebP của từng nguồn; không thực thi script HTML.

## Kế toán

- Route `/vi/programmes/ke-toan`, dữ liệu tại `frontend/src/data/programmes/ke-toan.ts`.
- Mã ngành 340301, mã chương trình 8340301, Master of Accounting; ứng dụng, 60 tín chỉ, 24 tháng, 6 học kỳ.
- Nhập đầy đủ tổng quan, điểm nổi bật/học qua tình huống, 6 PLO, điều kiện đầu vào và bổ sung kiến thức, 6 hướng nghề nghiệp, 28 học phần trong danh mục, 5 nhóm tự chọn, kế hoạch 6 học kỳ, điều kiện hoàn thành, học phí và 9 FAQ.
- Khối bắt buộc 42 tín chỉ và tự chọn 18 tín chỉ. Thực tập 6 tín chỉ ở học kỳ 5; đề án 8 tín chỉ ở học kỳ 6. Giữ lựa chọn 2/4 môn kế toán chuyên sâu và 1 môn ở từng nhóm còn lại, không cộng toàn bộ môn trong danh mục thành khối lượng phải học.
- Đối chiếu nguồn với DOM: **237/237 mục**, không thiếu.

## Kỹ thuật Môi trường

- Route `/vi/programmes/ky-thuat-moi-truong`, dữ liệu tại `frontend/src/data/programmes/ky-thuat-moi-truong.ts`.
- Mã ngành 520320, mã chương trình 8520320, Master of Science in Environmental Engineering; 60 tín chỉ cho mỗi định hướng.
- Ứng dụng: 18 tháng, danh mục 33 học phần; tích lũy 8 tín chỉ tự chọn cơ sở và 12 tín chỉ tự chọn chuyên ngành; thực tập chuyên ngành 6 và đề án 9 tín chỉ.
- Nghiên cứu: 24 tháng, danh mục 32 học phần; tổng tự chọn 5 tín chỉ; chuyên đề nghiên cứu 15 và luận văn 15 tín chỉ. Điều kiện công bố công trình nghiên cứu trước khi bảo vệ chỉ xuất hiện trong yêu cầu hoàn thành của tab nghiên cứu.
- Nhập đủ 8 PLO, ghi rõ PLO3 riêng cho nghiên cứu; điều kiện đầu vào của nghiên cứu; danh mục ngành phù hợp/bổ sung kiến thức; 6 hướng nghề nghiệp, hai khung chương trình, hai lộ trình tham khảo và 6 FAQ. Lộ trình học kỳ là danh mục lựa chọn dự kiến mở, không phải yêu cầu học toàn bộ môn tự chọn.
- Đối chiếu gộp DOM của hai tab: **256/256 mục**, không thiếu.

## Triển khai và kiểm chứng

Mở rộng `CurriculumTrack` với intro, generalFacts, notes, semesters và completion tùy chọn; template và component học kỳ/tốt nghiệp dùng nội dung của tab đang chọn, giữ fallback cũ cho các ngành khác. Không nhân điều kiện nghiên cứu sang ứng dụng. Layout thanh thông tin, menu, điều kiện dự tuyển, form và footer dùng thiết kế chung hiện hành.

Typecheck frontend, lint frontend và production build qua; **16/16 tests qua**, có kiểm tra riêng cơ cấu tự chọn, số tín chỉ, học kỳ, FAQ không rỗng và tách điều kiện công bố theo định hướng. Trình duyệt: cả hai trang có một H1, không anchor nội bộ hỏng, đủ 4 trường form và chọn đúng ngành; không tràn ngang ở 320/768/1440px. Trên mobile đã mở 40 accordion Kế toán, 32 accordion ứng dụng và 31 accordion nghiên cứu Kỹ thuật Môi trường.

Bằng chứng: `outputs/ke-toan-update`, `outputs/ky-thuat-moi-truong-update`, `outputs/two-programmes-browser.json`, `outputs/two-programmes-lint.log`, `outputs/two-programmes-build.log`. Bản dữ liệu trước sửa được lưu trong `before.ts` của từng thư mục.

Không gửi đăng ký thật, không đổi API/auth/database, không publish. Đây là cập nhật theo file nguồn được cung cấp, không phải xác minh chính sách từ một văn bản khác.
