# Deploy sửa tràn lịch đăng ký trên Dashboard CMS

## Nội dung

- Giới hạn các cột của lưới dashboard để nội dung biểu đồ không làm rộng thẻ hoặc đè lên phần “Hoạt động gần đây”.
- Biểu đồ đặt lịch theo ngày có vùng cuộn ngang riêng; mỗi ngày giữ đủ chỗ cho nhãn.
- Chú thích bên dưới biểu đồ tự xuống dòng khi màn hình hẹp.

## File đã sửa

- `cms/src/app/restored.css`: giới hạn lưới/thẻ, tạo vùng cuộn cho biểu đồ và cho footer xuống dòng.
- `cms/src/components/dashboard/RealtimeDashboard.tsx`: đặt chiều rộng nội dung biểu đồ theo số ngày trong kỳ.

Không có thay đổi database hoặc migration.

## Cập nhật Docker local

Tại thư mục chứa source mới nhất đã lấy từ GitHub và cấu hình Compose local, chạy:

```powershell
docker compose -f compose.yaml -f compose.local.yaml build cms
docker compose -f compose.yaml -f compose.local.yaml up -d --no-deps cms
docker compose -f compose.yaml -f compose.local.yaml ps cms
```

Nếu deploy dùng bộ Compose khác, chạy `docker compose build cms` rồi `docker compose up -d --no-deps cms` tại thư mục triển khai.

CMS dùng cổng `3001`. Không chạy đồng thời `npm run dev:cms` khi container CMS đang publish cổng này; nếu muốn dùng chế độ phát triển bằng npm, dừng container CMS trước.

## Kiểm tra sau cập nhật

Mở Dashboard, chọn **Tháng này** hoặc **Năm nay**, rồi kiểm tra nhãn ngày cuộn trong biểu đồ và không đè lên thẻ bên cạnh. Tải lại trang bằng `Ctrl + F5` nếu trình duyệt còn giữ CSS cũ.
