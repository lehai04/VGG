# Bảo mật của VGG

## Ranh giới truy cập

Website công khai có thể bị bot phát hiện/quét. robots/noindex chỉ là yêu cầu dành cho crawler, không phải xác thực. CMS dùng tên miền riêng và session bắt buộc; gateway không chuyển tiếp đường quản trị từ website. Nginx là cổng công khai duy nhất, database và kho MinIO không publish port.

## Các lớp đang có

- Session ngẫu nhiên 256-bit, chỉ lưu hash ở database; cookie HttpOnly, SameSite Strict, Secure ở production; hết hạn 8 giờ.
- Kiểm tra quyền ở API, CSRF bằng exact origin CMS và custom header; cập nhật có kiểm tra phiên bản để tránh ghi đè đồng thời.
- Mật khẩu scrypt có salt riêng; không có tài khoản/mật khẩu mặc định, thông báo đăng nhập không phân biệt email tồn tại.
- Đăng nhập: tối đa 5 request/tài khoản/15 phút và 20 request/IP/15 phút ở backend; gateway thêm quota IP. Các quota độc lập đã có test. Header forwarded IP chỉ tin gateway và proxy Docker đã chỉ định.
- Form tư vấn có validation, honeypot, giới hạn body và quota; analytics có quota riêng. Rate limit không thay được chống DDoS ở tầng mạng/CDN khi cần.
- CMS/API không cache dữ liệu riêng tư; không log cookie và query tìm kiếm admin. Log container được giới hạn dung lượng.
- Security headers chống MIME sniffing, nhúng iframe, object/base/form trái origin. CSP hiện là lớp hạn chế cơ bản, chưa phải policy script-src nonce đầy đủ.
- Tải file không đi theo redirect ngoài ý muốn, có timeout; nội dung không thuộc PDF/ảnh raster được trả attachment với sandbox để tránh thực thi HTML/SVG trực tiếp trên origin ứng dụng.
- SDK đọc MinIO sử dụng S3 path-style và giữ nguyên bucket/key/credentials; không có thao tác di chuyển/xóa file trong thay đổi này.
- Container ứng dụng chạy non-root, bỏ capabilities, no-new-privileges, read-only filesystem ngoại trừ cache/tmp. Chỉ runtime dependencies được đưa vào image phục vụ HTTP; tools/migration là target riêng.
- CI kiểm tra test/build/lint, dependency audit và repository guard; không tự deploy.

## Những việc vẫn cần vận hành

IT duy trì TLS, cập nhật bản vá, backup/restore, quyền MinIO, quyền cán bộ và kiểm tra log bất thường. Không chia sẻ tài khoản. Không lưu yêu cầu tư vấn, backup, khóa TLS hoặc env trong public/Git.

Không có MFA hay hệ thống chống bot phân tán trong bản hiện tại. Quota in-memory sẽ reset khi restart và không dùng chung khi tăng replica. Không cam kết loại bỏ mọi lỗ hổng hoặc ngăn toàn bộ bot; dependency audit 0 chỉ là kết quả tại thời điểm kiểm tra, không phải chứng nhận pentest. Kiểm tra lại trên staging có cấu hình thật trước production.
