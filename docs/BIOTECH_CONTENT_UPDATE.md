# Cập nhật Công nghệ Sinh học — 24/10/2026

Nguồn: `C:/Users/lepha/Downloads/thac-si-cong-nghe-sinh-hoc.html`, do người dùng chỉ định. Chỉ nhập nội dung và hai ảnh nhúng; không chạy script trong HTML.

Trang đích: `/vi/programmes/cong-nghe-sinh-hoc`. Dữ liệu chính nằm tại `frontend/src/data/programmes/cong-nghe-sinh-hoc.ts`, được danh mục, tìm kiếm và form dùng chung truy xuất qua registry hiện có.

Đã thay mô tả mẫu bằng toàn bộ nội dung nguồn: tổng quan, bốn điểm nổi bật và khối hỗ trợ nghiên cứu, sáu PLO, ba nhóm đối tượng, điều kiện ngoại ngữ và bổ sung kiến thức, chín hướng nghề nghiệp, 19 học phần song ngữ, kế hoạch sáu học kỳ (học kỳ 5–6 chung cho luận văn), ba điều kiện hoàn thành, học phí/ba đợt thanh toán/sáu khoản thu riêng, bảy FAQ, ảnh phòng thí nghiệm có alt/ghi nguồn và lời giới thiệu tư vấn riêng.

Các thông tin được sửa theo nguồn: mã ngành 420201, mã chương trình 8420201, tên văn bằng tiếng Anh Master of Engineering in Biotechnology, 24 tháng, 6 học kỳ, chính quy tập trung/tiếng Việt, nghiên cứu 27 tín chỉ, tổng 60 tín chỉ. Giữ học phí 85 triệu đồng; lịch thanh toán 29,75 / 25,5 / 29,75 triệu đồng. Tự chọn 12 tín chỉ tương ứng 4 trong 9 học phần; danh mục bổ sung có 8 môn 2 tín chỉ nhưng chỉ bổ sung tối đa 6 tín chỉ theo hồ sơ, không buộc học tất cả.

Không thêm yêu cầu tốt nghiệp khá hoặc chính sách 12 tín chỉ của Marketing vào ngành này. Không sửa template hay dữ liệu ngành khác. Test được mở rộng để kiểm tra riêng các số liệu và điều kiện của Công nghệ Sinh học.

Kiểm chứng:

- Typecheck frontend: qua.
- Test frontend: 13/13 qua, gồm Marketing và Công nghệ Sinh học.
- Lint frontend và production build: qua; log tại `outputs/biotech-update/lint.log` và `build.log`.
- Đối chiếu nguồn với DOM trang: 226/226 đơn vị nội dung, không thiếu. Dữ liệu chi tiết ở `outputs/biotech-update/coverage.json`.
- Trình duyệt: một H1, không anchor nội bộ lỗi, form chọn đúng ngành; mở đủ 32 accordion trên mobile 390×844, không tràn ngang; console không có error trong lượt kiểm tra.
- Ảnh kiểm chứng: `outputs/biotech-update/desktop.png`, `fees-mobile.png`. Bản cũ lưu tại `outputs/biotech-update/before.ts`.

Đây là cập nhật nội dung theo file người dùng cung cấp; không phải xác minh chính sách từ văn bản bên ngoài. Chức năng gửi form/API giữ nguyên; không tạo đăng ký thật trong lượt kiểm tra.
