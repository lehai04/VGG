# Cập nhật Tài chính – Ngân hàng và Quản lý Tài nguyên và Môi trường — 25/10/2026

Nguồn: `C:/Users/lepha/Downloads/thac-si-tai-chinh-ngan-hang.html` và `thac-si-quan-ly-tai-nguyen-va-moi-truong.html`. Chỉ trích dữ liệu, không thực thi script HTML. Giữ layout chung, ảnh URL nguồn và cấu trúc tuyển sinh dùng chung; form chọn sẵn đúng ngành.

## Tài chính – Ngân hàng

Route `/vi/programmes/tai-chinh-ngan-hang`, mã 8340201, 60 tín chỉ, hai định hướng, 18–24 tháng theo nguồn. Có 8 PLO, 4 điểm nổi bật, 4 hướng nghề nghiệp, 6 FAQ.

- Ứng dụng: danh mục 19 học phần, cơ cấu nguồn 7 tín chỉ chung, 17 cơ sở, 21 chuyên ngành, thực tập 6 và đề án 9. Giữ quy tắc chọn 1/2 chuyên đề và 2/3 học phần, lộ trình mẫu học kỳ 1–3 tích lũy 45 tín chỉ, học kỳ 4 thực tập/đề án.
- Nghiên cứu: danh mục 18 học phần, cơ cấu nguồn 10 chung, 17 cơ sở, 21 chuyên ngành và luận văn 12; giữ lộ trình luận văn tối thiểu 6 tháng. Đoạn mô tả nguồn nói có học phần AI nhưng bảng không cung cấp tên/mã riêng: giữ mô tả, không tự tạo học phần.
- Miễn bổ sung cho người tốt nghiệp khối Kinh doanh và Quản lý của Văn Lang; hồ sơ trường khác đối chiếu bảng điểm, kinh nghiệm. Ba học phần bổ sung mỗi môn 2 tín chỉ.
- Sửa FAQ “Ai được miễn bổ sung kiến thức?” vốn chép nhầm danh mục học bổ sung bằng đúng đoạn miễn bổ sung của mục điều kiện dự tuyển trong chính nguồn.

## Quản lý Tài nguyên và Môi trường

Giữ route `/vi/programmes/quan-ly-tai-nguyen-moi-truong`, mã 8850101, nghiên cứu, 18–24 tháng, 60 tín chỉ; 30 học phần trong danh mục. Có 8 PLO, 4 điểm nổi bật, 4 hướng nghề nghiệp, 6 FAQ. Hai học phần cuối gồm chuyên đề nghiên cứu 15 và luận văn 15 tín chỉ; lộ trình mẫu cuối dành cho chuyên đề/luận văn tối thiểu 6 tháng.

Nhập danh mục ngành dự tuyển trực tiếp, nhóm ngành gần và ba học phần bổ sung 2+3+3 tín chỉ; học phần tương đương được xem xét miễn. Giữ yêu cầu tiếng Anh Bậc 4 trong PLO, tách khỏi ngoại ngữ đầu vào Bậc 3.

## Điểm cần đối chiếu từ nguồn

Cả hai điều kiện nghiên cứu đều ghi tốt nghiệp từ Khá trở lên **hoặc** có công bố khoa học liên quan; giữ đúng “hoặc”. Không lấy điều kiện “và” của Logistics. Giữ ngoại ngữ đầu vào cho người Việt Nam và tiếng Việt cho công dân nước ngoài.

Bảng phẳng của nguồn không đánh dấu rõ học phần bắt buộc/tự chọn hay ánh xạ từng môn vào nhóm. Vì vậy danh mục được hiển thị với nhãn “Theo cơ cấu chương trình”, kèm lưu ý không phải toàn bộ danh mục đều bắt buộc; giữ nguyên cơ cấu và quy tắc chọn ở phần tóm tắt. Không cộng toàn bộ danh mục thành số tín chỉ phải học, không tự gán nhóm. Đặc biệt nguồn Tài nguyên ghi cơ sở 11–16 và “nhóm tự chọn theo quy tắc của chương trình” nhưng không cung cấp quy tắc cụ thể; cần bản CTĐT chi tiết nếu muốn hiển thị phân nhóm chính xác hơn.

Cả hai học phí 85 triệu đồng, ba đợt 30/25/30 triệu; 5 khoản thu riêng. Không áp tỷ lệ thanh toán từ ngành khác. Chỉ liệt kê thực tập/đề án/luận văn theo nguồn, không thêm điều kiện công bố tốt nghiệp.

## Kiểm chứng

Typecheck, lint phạm vi thay đổi, production build frontend qua; **24/24 tests qua**. Test kiểm tra hai track Tài chính độc lập, số học phần, tín chỉ phần tốt nghiệp, cơ cấu mô tả, điều kiện “hoặc”, PLO và học phí.

Browser ở 320, 768, 960, 1440 px: không tràn ngang; mỗi trang một h1, không anchor nội bộ hỏng, form chọn sẵn đúng ngành. Chuyển track Tài chính hiển thị tóm tắt, lộ trình và luận văn đúng nghiên cứu. Mỗi trang mở 13/13 details trên mobile, không tràn ngang. Không gửi form thật hoặc publish.

Đối chiếu nguyên văn DOM gộp hai track: Tài chính 98/104, Tài nguyên 117/123. Sáu khác biệt mỗi ngành gồm năm dòng khoản thu được tách nhãn/giá trị (thiếu dấu hai chấm khi ghép text) và tiêu đề FAQ dùng nhãn chung website; nội dung và giá trị có đủ. Không coi kiểm tra này là xác minh chính sách bên ngoài tài liệu.

Bằng chứng: `outputs/finance-resources-responsive.json`, `outputs/finance-resources-build.log`, hai thư mục `outputs/tai-chinh-ngan-hang-update/` và `outputs/quan-ly-tai-nguyen-moi-truong-update/`. Importer `work/import-finance-resources-sources.py`.
