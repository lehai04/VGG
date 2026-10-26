# Công cụ bảo trì

Chạy từ thư mục gốc VGG. Đây là công cụ chủ động chạy khi cần, không phải các route website.

| File | Vai trò |
| --- | --- |
| `export-cms-defaults.ts` | Xuất dữ liệu mặc định frontend cho registry CMS |
| `create-programme-template.ts` | Tạo template chương trình cho CMS |
| `export-admissions-copy.py` | Kiểm kê các trường chữ/URL có thể chỉnh trong template tuyển sinh |
| `export-admissions-data.ts` | Trích dữ liệu tuyển sinh có cấu trúc từ engine |
| `export-research-data.ts` | Trích dữ liệu thẻ nghiên cứu, trang chủ và đối tác |
| `check-cms-routes.mjs` | Kiểm tra các route, ghi báo cáo vào `outputs/cms-qa` |
| `test-cms-integration.mjs` | Kiểm thử CMS bằng cơ sở dữ liệu riêng |
| `cms-qa-server.mjs` | Máy chủ QA; chỉ dùng database test được script kiểm tra |

Các script xuất dữ liệu có ghi file; chỉ chạy khi chủ động đồng bộ nguồn. Không chạy toàn bộ thư mục như một bước khởi động ứng dụng. Các importer HTML cá nhân và script sửa giao diện một lần trong `work` đã được xóa sau khi kết quả nằm trong nguồn hiện hành.
