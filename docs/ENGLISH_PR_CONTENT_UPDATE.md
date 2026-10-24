# Cập nhật Ngôn ngữ Anh và Quan hệ Công chúng — 25/10/2026

Nguồn người dùng: `C:/Users/lepha/Downloads/thac-si-ngon-ngu-anh.html`, `thac-si-quan-he-cong-chung.html`. Đọc nội dung và ảnh nguồn, không thực thi JavaScript. Giữ layout chung và route hiện có.

## Ngôn ngữ Anh

Mã 8220201, 60 tín chỉ, 18–24 tháng, ứng dụng và nghiên cứu, 9 PLO, 4 điểm nổi bật, 4 hướng nghề nghiệp, 6 FAQ. Mỗi định hướng có danh mục 23 học phần riêng. Ứng dụng: 4 chung, 47 cơ sở/chuyên ngành, đề án 9; có thực tập 6 tín chỉ, quy tắc tự chọn 2/5 và 2/6. Nghiên cứu: 4 chung, 44 cơ sở/chuyên ngành, luận văn 12; quy tắc 2/5 và 3/7, thực tập trong bảng 3 tín chỉ. Giữ lộ trình mẫu, đề án ít nhất 3 tháng, luận văn ít nhất 6 tháng.

Miễn bổ sung cho Ngôn ngữ Anh và Sư phạm Tiếng Anh; nhập danh mục nhóm đối chiếu và bốn học phần bổ sung. Nhóm ngoài khối tiếng Anh cần IELTS 6.5 hoặc tương đương theo nguồn; không thay thế bằng yêu cầu ngoại ngữ đầu vào chung. Học phí 85 triệu đồng, ba đợt 30/25/30 triệu.

## Quan hệ Công chúng

Mã 8320108, 18–24 tháng, hai định hướng. Hiển thị tín chỉ theo track: ứng dụng 60, nghiên cứu 61; nhãn danh mục chung 60–61. Có 10 PLO, 4 điểm nổi bật, 4 hướng nghề nghiệp, 6 FAQ. Danh mục ứng dụng 23 học phần, nghiên cứu 26; luận văn nghiên cứu 13 tín chỉ theo ô tín chỉ nguồn, không suy ra 15 từ mã học phần `81THES72415`.

Xét tuyển kết hợp phỏng vấn. Miễn bổ sung cho Quan hệ công chúng/Truyền thông đa phương tiện; Báo chí và truyền thông bổ sung 9 tín chỉ, nhóm Nhân văn/khoa học xã hội và hành vi 12, ngành khác 15. Điều kiện nghiên cứu giữ “Khá trở lên hoặc có công bố”. Học phí 110 triệu đồng, ba đợt 35/35/40 triệu.

## Sai lệch và giới hạn của nguồn

- FAQ về miễn bổ sung của cả hai file chép nhầm nhóm cần bổ sung: thay bằng đúng mục miễn bổ sung trong điều kiện dự tuyển. Sửa ký tự `&amp;` bị mã hóa hai lần trong FAQ Ngôn ngữ Anh.
- Không giữ điều kiện tốt nghiệp “01 công bố” từ dữ liệu PR cũ vì nguồn mới không nêu điều kiện này. Điều kiện công bố trong hồ sơ dự tuyển nghiên cứu vẫn được giữ.
- PR ứng dụng: các khối tóm tắt 7+10+22+12+6+9 cộng thành **66**, khác tổng **60** ở đầu nguồn. Bảng không có dòng đề án tốt nghiệp dù tóm tắt ghi 9 tín chỉ. Giữ nguyên cơ cấu nguồn để đối chiếu, không tự sửa số từng khối hay tạo mã học phần. Đề án 9 tín chỉ chỉ được trình bày trong mục kết thúc chương trình, ghi “theo mô tả chương trình”. Cần CTĐT chính thức để giải quyết mâu thuẫn này.
- Nguồn dạng bảng phẳng không đánh dấu từng nhóm tự chọn. Giữ danh mục với nhãn “Theo cơ cấu chương trình”, quy tắc lựa chọn ở phần tóm tắt; không coi toàn bộ danh mục là học phần bắt buộc, không tự phân nhóm.

## Kiểm chứng

Typecheck, lint phạm vi thay đổi, production build frontend qua; **25/25 tests qua**. Test riêng số học phần hai track, tổng tín chỉ track PR, tín chỉ luận văn, điều kiện IELTS/phỏng vấn, miễn bổ sung và học phí. Test cũ yêu cầu 01 công bố được thay bằng kiểm tra không giữ điều kiện ngoài nguồn mới.

Browser cả hai trang ở 320, 768, 960, 1440 px: không tràn ngang, một h1, anchor nội bộ hợp lệ, form chọn sẵn đúng ngành. Đã chuyển sang nghiên cứu xác nhận PR 61 tín chỉ, luận văn 13 và Ngôn ngữ Anh 60 tín chỉ, luận văn 12. Mobile mở đủ 13/13 details Ngôn ngữ Anh và 12/12 PR ứng dụng, không tràn ngang. Không gửi form thật hoặc publish.

Đối chiếu nguyên văn gộp hai track: Ngôn ngữ Anh 116/123 và PR 115/121. Mỗi trang khác năm dòng khoản thu do tách nhãn/giá trị bỏ dấu hai chấm khi ghép text và tiêu đề FAQ dùng nhãn chung. Một mục khác ở Ngôn ngữ Anh là sửa `&amp;` thành `&`; nội dung còn đủ. Không coi đối chiếu này là xác minh chính sách bên ngoài tài liệu được cung cấp.

Bằng chứng: `outputs/english-pr-responsive.json`, `outputs/english-pr-build.log`, `outputs/ngon-ngu-anh-update/`, `outputs/quan-he-cong-chung-update/`. Importer `work/import-english-pr-sources.py`.
