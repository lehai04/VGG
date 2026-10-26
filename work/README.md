# Công cụ và tư liệu đối chiếu lịch sử

Thư mục này không thuộc workspace chạy/build. Không sửa giao diện website ở đây.

- `ba-build/`: nguồn và công cụ tạo hồ sơ BA trong `docs/ba`; giữ để có thể tái tạo tài liệu.
- `audit-*`, `analyze-*`, `check-*`, `verify-*`, `write-vgg-audit-report.py`: kiểm kê và đối chiếu nội dung; một số phụ thuộc file HTML gốc ở Downloads và bằng chứng trong `outputs`.
- `programme-image-sources.json`: nguồn tham chiếu ảnh, cần giữ thông tin xuất xứ.
- Các bản trích xuất, ảnh preview và tài liệu khác: tư liệu đối chiếu của các lần biên tập; chưa được xác nhận là trùng hoàn toàn với tài nguyên hiện hành.

Đã xóa bản sao `github-check`, cache Python, importer `import-*.py` và sáu script sửa giao diện dùng một lần. Không chạy lại script lịch sử để ghi đè nội dung CMS hoặc nguồn mới. Khi cần sửa nội dung, dùng CMS hoặc file được chỉ ra trong `frontend/README.md`.
