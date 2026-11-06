# Hướng dẫn deploy chức năng xuất danh sách tư vấn

## Thay đổi

- Danh sách tư vấn có checkbox chọn từng hồ sơ và chọn tất cả trên trang hiện tại.
- Có thể xuất các hồ sơ đã chọn thành Excel `.xlsx` hoặc xóa hàng loạt. Xóa yêu cầu xác nhận và chỉ tài khoản có quyền quản lý nội dung mới thực hiện được.
- File Excel có bố cục theo mẫu: tiêu đề gộp, hàng tiêu đề nền xanh, ngày đăng ký, thông tin liên hệ, ngành, trạng thái, người phụ trách, kết quả tư vấn, lần liên hệ tiếp theo và ghi chú nội bộ.
- Ghi chú nội bộ chỉ xuất nội dung. Ngày giờ liên hệ hiển thị theo múi giờ Việt Nam.
- Tên file theo ngày xuất: `DANH SÁCH TƯ VẤN_DDMMYYYY.xlsx`, ví dụ `DANH SÁCH TƯ VẤN_11062026.xlsx`.

## Các file

- `cms/src/components/cms-next/ConsultationWorkspace.tsx`: chọn hồ sơ, tạo file Excel và gọi API xóa.
- `cms/src/components/cms-next/ContentWorkspace.module.css`: giao diện nhóm nút thao tác.
- `backend/src/modules/cms/cms.routes.ts`: trả lịch sử cần cho kết quả/ghi chú và API xóa hàng loạt.

Không có thay đổi schema hoặc migration database.

## Deploy Docker Compose

Tại thư mục dự án đã cấu hình `.env`, dùng đúng các file Compose của môi trường. Với môi trường local có `compose.local.yaml`:

```powershell
docker compose -f compose.yaml -f compose.local.yaml build backend cms
docker compose -f compose.yaml -f compose.local.yaml up -d --no-deps backend cms
docker compose -f compose.yaml -f compose.local.yaml ps backend cms
```

Production dùng các file Compose và biến môi trường production đã cấu hình cho server:

```sh
docker compose build backend cms
docker compose up -d --no-deps backend cms
docker compose ps backend cms
```

Không dùng giá trị mẫu thay cho domain, TLS hoặc credentials production. Không chạy migration vì thay đổi này không thêm/sửa schema.

## Kiểm tra sau deploy

1. Đăng nhập CMS bằng tài khoản có quyền quản lý nội dung.
2. Mở **Lịch tư vấn**, chọn một vài hồ sơ và xuất Excel.
3. Kiểm tra bố cục, ngày xuất trong tên file, kết quả tư vấn, lần liên hệ tiếp theo và nội dung ghi chú.
4. Kiểm tra xóa một hồ sơ test sau khi xác nhận; không dùng hồ sơ thật để thử xóa.

