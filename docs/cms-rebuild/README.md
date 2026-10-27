# Hồ sơ khảo sát xây lại CMS VGG

Ngày khảo sát: 27/10/2026. Trạng thái: dự thảo giai đoạn 1, chờ duyệt; chưa triển khai CMS mới.

Website hiện hữu là chuẩn. CMS mới chỉ quản trị dữ liệu trong cấu trúc được duyệt, không tự đổi nội dung, layout, thứ tự mục hoặc responsive.

## Tài liệu cần xem

1. [Hiện trạng và giới hạn kiểm chứng](01-current-state.md).
2. [Ánh xạ trang và vị trí nội dung](02-mapping.md).
3. [Mẫu ngành kế thừa](03-programme-template.md).
4. [Đặc tả nghiệp vụ và dữ liệu đề xuất](04-specification.md).
5. [Kế hoạch chuyển đổi và nghiệm thu](05-delivery-plan.md).

Phụ lục: `field-mapping.csv` và `field-mapping.json` chứa 6.480 giá trị lá từ 30 tài liệu nguồn, gồm 21 ngành. `source-content-snapshot.json` giữ nguyên các giá trị được nhập từ module frontend; `programme-inventory.json` ghi biến thể ngành. Đây là bản chụp dữ liệu nguồn, không phải bản sao cơ sở dữ liệu hoặc bằng chứng tất cả trường đang được render.

`generate-inventory.ts` chỉ ghi các phụ lục trong thư mục này. Chạy từ gốc repo bằng `node node_modules/tsx/dist/cli.mjs --tsconfig frontend/tsconfig.json docs/cms-rebuild/generate-inventory.ts`. Không chạy script export cũ vì script đó ghi lại dữ liệu nguồn backend.

## Nội dung đề nghị duyệt

- Phạm vi và quy trình trong đặc tả; không thay website hoặc xóa admin ở giai đoạn này.
- Một renderer ngành dùng chung, giữ các biến thể đang có; không lấy nội dung của ngành A làm mặc định cho ngành B.
- Khóa quyền sửa cấu trúc; giữ cấu hình layout đã công khai nếu khác mã nguồn mặc định.
- Tiếp tục thiết kế mẫu CMS sau khi duyệt. Trước khi coi ánh xạ là bản chuẩn cuối cùng phải đối chiếu website đang chạy và các override đã xuất bản.

Chưa đủ căn cứ để duyệt chuyển đổi dữ liệu hoặc xác nhận giao diện không đổi: phiên khảo sát chưa có dịch vụ local chạy và chưa đọc database/media storage thực tế. Cần URL hoặc môi trường chuẩn có thể truy cập để đóng các mục này. Không sử dụng ảnh QA cũ làm bằng chứng giao diện hiện tại.
