VGG — GÓI WEBSITE TĨNH CHO IT KIỂM THỬ

Nguồn: https://vgg-vlu-demo.vercel.app/
Phiên bản và danh sách trang: manifest.json.
Đây là bản chụp HTML công khai, KHÔNG phải gói toàn bộ ứng dụng hoặc bản sao database.
Chưa xác minh được commit GitHub tương ứng vì kết nối Vercel không đọc được deployment.

1. CHẠY THỬ NHANH
Giải nén toàn bộ thư mục. Máy có Node.js 22 hoặc mới hơn:
  node server.mjs
Mở http://127.0.0.1:8080/ hoặc http://127.0.0.1:8080/page-index.html
Windows có thể chạy START-WINDOWS.cmd. Ctrl+C để dừng.
Không chạy npm install, npm build, migration hoặc Docker.
Server mặc định chỉ cho máy hiện tại truy cập. IT có thể đặt HOST và PORT theo mạng test được cấp.
Linux: HOST=0.0.0.0 PORT=8080 node server.mjs
PowerShell: $env:HOST='0.0.0.0'; $env:PORT='8080'; node server.mjs
Chỉ mở cổng trong mạng test theo quy định P.CNTT. Đây là server xem thử, không phải dịch vụ production.

2. CHẠY TRÊN WEB SERVER SẴN CÓ — KHÔNG CẦN NODE.JS
Trỏ document root đến thư mục site, phục vụ index.html cho từng thư mục.
Dùng cấu hình nginx-test.conf kèm theo, thay đúng đường dẫn và cổng được IT cấp.
Các URL bắt đầu bằng /, vì vậy cần một hostname/cổng riêng và đặt site ở gốc tên miền.
Không mở index.html bằng file://; không đặt site vào thư mục con của một website khác.

3. PHẠM VI DỮ LIỆU
Bao gồm các trang HTML lấy qua sitemap và liên kết công khai, CSS, ảnh/font/video/tài liệu tải được.
Các URL có bộ lọc được lưu thành trang riêng trong _views nếu website trả HTML tương ứng.
Danh mục tìm kiếm trong /page-index.html hoạt động ngay tại máy test.
Không có tài khoản, mật khẩu, bản nháp CMS, thông tin người đăng ký tư vấn hoặc khóa bí mật.
Không bao gồm nội dung chỉ sinh sau thao tác JavaScript mà HTML nguồn chưa chứa.
Website bên ngoài (tuyển sinh, Facebook, Zalo, bài viết trên vlu.edu.vn...) vẫn là liên kết cần Internet.

4. GIỚI HẠN CHỨC NĂNG
Đã bỏ Next.js runtime để không gọi backend/RSC trên server tĩnh.
Không đăng nhập CMS, không gửi/lưu form, không cập nhật nội dung từ CMS.
Các nút tương tác động không hỗ trợ được vô hiệu hóa; dùng danh mục trang để tìm nội dung.
Menu di động và liên kết trang vẫn hoạt động; nội dung accordion có sẵn được mở khi có thể.
Đây là gói test giao diện/nội dung, KHÔNG thay thế nghiệm thu nghiệp vụ toàn bộ hệ thống.
Các tài nguyên thiếu/lỗi được ghi trong manifest.json và verification.json; xem trước khi nghiệm thu.

5. CẬP NHẬT / GIT
Nếu nhận một file VGG-STATIC-IT.bundle, IT chạy:
  git clone /duong-dan/VGG-STATIC-IT.bundle vgg-static
  cd vgg-static
  node server.mjs
Trên Windows thay đường dẫn bằng đường dẫn file .bundle thực tế.
Bundle chứa một repository độc lập với kết quả xuất sẵn, không cần Internet khi clone.
Đây là bản bàn giao một lần; không tự đồng bộ với GitHub/Vercel.
Gói chứa kết quả xuất sẵn. Có thể đưa toàn bộ gói lên repository bàn giao RIÊNG.
IT clone/pull repository đó rồi chạy node server.mjs hoặc trỏ web server vào site.
Không push gói vào nhánh production của repository đang nối Vercel.
Khi website nguồn đổi, đơn vị phát triển xuất gói mới, kiểm tra, rồi thay gói trên server test.
Giữ lại gói trước để khôi phục. IT không cần tự build.
Tệp lớn cần xem xét giới hạn Git hosting/LFS; ZIP là cách bàn giao trực tiếp được hỗ trợ ở lượt này.

6. KIỂM TRA
Xem verification.json, manifest.json và SHA256SUMS.txt.
Kiểm tra trang chủ VI/EN, trang ngành, tin tức/tài nguyên, liên kết và video.
Đảm bảo không có thao tác form gửi dữ liệu sang hệ thống thật.
