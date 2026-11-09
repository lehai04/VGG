# Deploy thay đổi nhãn chuẩn đầu ra

## Nội dung

Trên trang chi tiết chương trình, nhãn chuẩn đầu ra hiển thị số thứ tự (`1`, `2`, `3`…) thay cho mã có tiền tố `PLO` (`PLO1`, `PLO2`, `PLO3`…). Dữ liệu mã chuẩn đầu ra không thay đổi.

## File đã sửa

- `frontend/src/features/programmes/components/ProgrammeDetailPage.tsx`: bỏ tiền tố `PLO` khi hiển thị nhãn.

## Cập nhật môi trường Docker local

Tại thư mục dự án đã cấu hình `.env`, chạy:

```powershell
docker compose -f compose.yaml -f compose.local.yaml build frontend
docker compose -f compose.yaml -f compose.local.yaml up -d --no-deps frontend
docker compose -f compose.yaml -f compose.local.yaml ps frontend
```

Nếu production dùng bộ Compose khác, chạy `docker compose build frontend` rồi `docker compose up -d --no-deps frontend` tại thư mục triển khai production.

Sau khi frontend chạy lại, tải lại trang chi tiết chương trình bằng `Ctrl + F5` để thấy thay đổi. Không cần migration database.
