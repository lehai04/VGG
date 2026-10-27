# Bản giao diện CMS để duyệt

Mở local: http://127.0.0.1:3001/cms-preview

Chạy từ thư mục admin: `node ../node_modules/next/dist/bin/next dev --webpack -p 3001 -H 127.0.0.1`.

## Đã có

- Khung CMS mới, điều hướng, dashboard ghi rõ số liệu từ nguồn và phần chưa kết nối.
- Danh sách 21 ngành và 9 document trang/dùng chung từ page-defaults; tìm kiếm theo tên/đường dẫn.
- Bố cục biên tập theo mục, luồng tạo ngành, mẫu soạn tin, lưu nháp thiếu nội dung và gửi duyệt mô phỏng.
- Cảnh báo rời màn hình khi có thay đổi; tóm tắt văn bản nhập thử.
- Bố cục chi tiết tư vấn, trạng thái/kết quả tách riêng, ghi chú trong phiên thử.
- CSS responsive và nhãn biểu mẫu; chưa nghiệm thu hình ảnh trên mobile.

## Giới hạn phải hiểu trước khi duyệt

Đây là prototype giai đoạn 2, không phải CMS vận hành. Route chỉ có ở development và trả 404 trong production. Không kết nối database/API, không có người dùng thật, không ghi hoặc xuất bản nội dung thật. Tải lại trang mất thay đổi thử.

Biểu mẫu mục đang dùng ba trường minh họa chung, chưa nối toàn bộ 6.480 giá trị nguồn. Màn hình website ngoài Trang chủ ghi rõ đang dùng ví dụ cấu trúc Trang chủ. Các nút chọn mục chỉ minh họa điều hướng, chưa giữ nội dung riêng từng mục. Danh sách tin chưa tải bài thật; SEO, media và xem trước website thật chưa triển khai. Danh mục nguồn không bao gồm override hoặc ngành động DB.

## Kiểm chứng

- TypeScript admin chạy không lỗi sau khi sửa đường dẫn import.
- ESLint cho hai file TSX mới qua.
- Trang chạy webpack trả HTTP 200; đã quan sát trình duyệt.
- Đã thử lưu nháp trống; nhập tiêu đề/nội dung và gửi duyệt hiện trạng thái mô phỏng.
- Tìm Marketing trả một dòng trong danh sách ngành.
- Ảnh: `outputs/cms-next/overview.png`.
- Lượt này chỉ tạo route/component prototype, tài liệu và ảnh kiểm chứng; không chỉnh frontend/backend/shared. Kiểm tra Git cuối lượt thấy thay đổi frontend layout/font/typography xuất hiện đồng thời từ công việc khác; giữ nguyên, không nhận là thay đổi CMS. Chưa kiểm thử publication, quyền hoặc persistence vì chưa triển khai các phần đó.

## Điểm duyệt theo kế hoạch

Yêu cầu đã chốt: “DỪNG để người dùng duyệt giao diện và luồng thao tác.” Bản này dùng để duyệt hướng bố cục và luồng trước khi nối biểu mẫu chuyên biệt, backend và dữ liệu. Không coi việc xem prototype là nghiệm thu mapping, migration hoặc xuất bản thật.
