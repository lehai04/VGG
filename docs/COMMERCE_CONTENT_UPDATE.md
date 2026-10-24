# Cập nhật Kinh doanh Thương mại — 24/10/2026

Nguồn được chỉ định: `C:/Users/lepha/Downloads/thac-si-kinh-doanh-thuong-mai.html`. Chỉ trích nội dung và hai ảnh WebP nhúng; không chạy script của file nguồn.

Trang `/vi/programmes/kinh-doanh-thuong-mai` dùng layout chung đã thống nhất: thanh thông tin ngang có icon, menu căn giữa, phần điều kiện dự tuyển gồm tóm tắt/hai thẻ/accordion/khối bổ sung kiến thức, form tư vấn và footer responsive.

Đã cập nhật `frontend/src/data/programmes/kinh-doanh-thuong-mai.ts`: tổng quan, bốn điểm nổi bật và nội dung trao đổi chuyên môn, 10 PLO, ba nhóm đối tượng, điều kiện ngoại ngữ/đầu vào, hai nhóm bổ sung kiến thức, bảy hướng nghề nghiệp, 18 học phần, bốn học kỳ, bốn điều kiện hoàn thành, học phí/ba đợt/sáu khoản thu riêng, tám FAQ và nội dung tư vấn riêng. Danh mục/search tự dùng metadata từ registry.

Thông tin theo nguồn: mã ngành 340121, mã chương trình 8340121; Master of Commerce; định hướng ứng dụng; 60 tín chỉ, 24 tháng, bốn học kỳ. Triết học 4 tín chỉ; khối cơ sở 11; chuyên ngành 30 (22 bắt buộc, 8 tự chọn); thực tập 6 và đề án 9. Hai nhóm tự chọn có ba lựa chọn mỗi nhóm, chọn một môn 4 tín chỉ ở mỗi nhóm. Học kỳ 1–4 lần lượt tích lũy 15/16/14/15 tín chỉ. Học phí 85 triệu đồng, ba đợt 29,75/25,5/29,75 triệu; bổ sung kiến thức tối đa 12 tín chỉ theo hồ sơ.

Không tự dịch tên tiếng Anh cho học phần Dự án kinh doanh kết hợp chuyến đi thực tế vì nguồn không có. Không sao chép chính sách của ngành khác. Các thay đổi dữ liệu chỉ thuộc ngành này; test được mở rộng để kiểm tra quy tắc riêng.

Kiểm chứng: đối chiếu 218/218 đơn vị nội dung nguồn có trong DOM; một H1, không anchor nội bộ hỏng, form chọn sẵn đúng ngành. Mở cả 29 accordion trên mobile 390×844, kiểm tra tablet 768×1024, không tràn ngang; console không có error trong lượt kiểm tra. Typecheck frontend và 14/14 tests qua. Bằng chứng và bản dữ liệu trước sửa ở `outputs/commerce-update`.

Lint các file thay đổi và production build frontend đều qua. Chức năng gửi form/API giữ nguyên, không gửi đăng ký thật. Đây là cập nhật theo HTML được cung cấp, không phải xác nhận chính sách từ văn bản khác.
