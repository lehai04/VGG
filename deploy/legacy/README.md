# Lưu trữ công cụ triển khai cũ

Giữ theo yêu cầu của chủ dự án để có thể phục hồi. Không phải quy trình triển khai hiện tại.

`paths.json` ghi đường dẫn gốc của từng mục. Để khôi phục, đối chiếu commit và phục hồi về đúng đường dẫn gốc trước khi kiểm thử; không chạy trực tiếp từ thư mục này. Các công cụ cũ có thể chỉ hỗ trợ website/backend, không hỗ trợ CMS riêng.

Workflow rollback đã đưa ra khỏi `.github/workflows`, nên không còn chạy được từ GitHub Actions. Các runner/controller đã cài trên server nằm ngoài repository và chưa được thay đổi trong lần dọn này.

Quy trình hiện tại: `compose.yaml`, `Dockerfile`, `deploy/nginx/default.conf.template` và `HANDOVER.md` ở root. Không đưa thư mục legacy vào Docker image.
