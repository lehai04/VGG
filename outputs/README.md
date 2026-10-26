# Kết quả kiểm tra

Thư mục này không được ứng dụng import và không được deploy như mã nguồn. Nó lưu bằng chứng kiểm tra được các báo cáo trong `docs` tham chiếu.

- `cms-qa/`: kết quả API, giao diện và responsive của CMS.
- `*-update/`, `programme-refactor/`: đối chiếu dữ liệu chương trình trước/sau, không phải nguồn ngành hiện hành.
- `vgg-content-audit/`, `seo-inventory-*/`: kiểm kê nội dung và SEO.
- `website-edit-reference/`, `website-edit-verification/`: tham chiếu yêu cầu và bằng chứng nghiệm thu.
- Ảnh và JSON ở gốc: bằng chứng các đợt kiểm tra giao diện trước đây.

Các log build cũ ở gốc đã được xóa; nhắc tới chúng trong báo cáo cũ là ghi chép lịch sử. Không dùng `before.ts`, HTML trích xuất hoặc ảnh chụp ở đây để chỉnh website. Nguồn đang chạy nằm trong `frontend/src`, `admin/src`, `backend/src`.

Chỉ tạo lại bằng chứng khi kiểm tra thay đổi liên quan. Giữ ảnh/JSON có giá trị đối chiếu; không lưu thêm bản sao toàn bộ project.
