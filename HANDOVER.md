# Triển khai bằng Docker Compose

## Chuẩn bị

IT dùng source revision đã duyệt, Docker Engine và Docker Compose. CI chỉ kiểm tra/build, không có quyền deploy server. Dùng `Dockerfile` và `compose.yaml` ở root, không dùng `deploy/legacy`.

1. Sao chép `.env.example` thành `.env` trên server; không commit file này.
2. Đặt `PUBLIC_APP_URL=https://<website>`, `CMS_APP_URL=https://<cms>` khác origin; `WEBSITE_HOST`/`CMS_HOST` chỉ là hostname, không có scheme/path. Trỏ DNS hai tên miền về gateway.
3. Đặt mật khẩu mạnh, khác nhau cho PostgreSQL, root MinIO và tài khoản ứng dụng MinIO. Mật khẩu PostgreSQL trong URL cần URL-safe hoặc percent-encode. Không dùng chuỗi `REPLACE_...` trong bản mẫu.
4. `TLS_DIRECTORY` là thư mục tuyệt đối bên ngoài source, chứa `website/fullchain.pem`, `website/privkey.pem`, `cms/fullchain.pem`, `cms/privkey.pem`. IT cấp và gia hạn chứng chỉ hợp lệ, quyền đọc tối thiểu. Không đưa khóa vào Git/public/image.
5. Nếu dùng dữ liệu cũ, giữ **đúng** Compose project name, tên database, credentials và volume hiện có. `name: vgg`, volume keys `vgg_public_postgres_data` và `vgg_public_media_data` cần được đối chiếu trước khi chạy trên hệ thống đã có dữ liệu. Backup PostgreSQL/MinIO ra ngoài repository và thử restore.
6. Network app mặc định `172.30.10.0/24`. Nếu xung đột, đổi đồng thời subnet và hai IP frontend/CMS. Backend chỉ chạy nội bộ, dùng `trustProxy: true` để nhận IP người dùng do frontend/CMS chuyển tiếp. Gateway ghi đè X-Forwarded-For; backend không publish cổng ra Internet.

## Phân biệt local, staging và production

- Giới hạn CMS: JSON 1 MiB, đăng nhập 16 KiB; upload ảnh/Word 10 MiB, PDF 100 MiB, tài liệu khác 50 MiB. Nginx/proxy upload nhận tối đa 101 MiB gồm metadata, timeout 120 giây. Backend xác thực quyền trước khi đọc multipart. Khởi động lại backend/CMS và reload gateway khi triển khai.

- Chạy local: dùng `frontend/.env.local`, `backend/.env` và `cms/.env.local` từ mẫu trong từng ứng dụng. Các mẫu này dùng localhost và `NODE_ENV=development`.
- Chạy Docker: chỉ cấu hình `.env` ở root; Compose truyền từng biến cần thiết vào từng container. Docker không copy env riêng của các ứng dụng.
- `PUBLIC_APP_URL` là origin công khai dùng cho canonical, sitemap và metadata; không có path/query. `BACKEND_INTERNAL_URL` là địa chỉ API trong mạng riêng, không dùng biến cũ `NEXT_PUBLIC_BACKEND_URL`.
- Staging hiện dùng `https://sdh.vlu.edu.vn`. Đặt `SITE_INDEXABLE=false` để trả robots disallow và header noindex trên các trang. Đây không phải xác thực; muốn staging riêng tư cần IT bảo vệ ở gateway.
- Production: xác nhận domain chính thức rồi đặt `PUBLIC_APP_URL`, `WEBSITE_HOST` tương ứng và `SITE_INDEXABLE=true`. Không suy ra domain production từ địa chỉ test. `CMS_APP_URL`/`CMS_HOST` vẫn dùng tên miền CMS riêng.
- Tải tài liệu đi trực tiếp từ website tới backend/MinIO hoặc đọc file đã được cho phép trong `frontend/public`; không cần website tự gọi cổng 3000 để tải PDF.

## Build và khởi chạy

```sh
docker compose config --quiet
docker compose build
docker compose up -d
```

Compose chạy migration một lần trước backend; **không tự seed/ghi đè nội dung website**. Gateway cần chứng chỉ tồn tại để khởi động. Chỉ gateway publish 80/443; các dịch vụ còn lại dùng mạng Docker riêng.

Nếu dùng MinIO có sẵn, giữ volume và tài khoản ứng dụng. Với kho mới, IT tạo bucket cùng tài khoản ứng dụng theo `STORAGE_BUCKET`, `MINIO_APP_ACCESS_KEY`, `MINIO_APP_SECRET_KEY`; giữ quyền GetObject cho tài liệu hiện có và bổ sung PutObject chỉ cho hai prefix `cms/news/*`, `cms/resources/*` trong bucket. Chức năng xóa vĩnh viễn cần DeleteObject giới hạn cho `cms/resources/*` và prefix tài liệu cũ `resources/*`. Không cấp quyền xóa toàn bucket. Không dùng tài khoản root MinIO trong backend. Nếu cần quản trị MinIO, dùng kết nối nội bộ/SSH tunnel có chủ đích; không publish console ra Internet.

Nếu database hoàn toàn mới và cần bộ nội dung mặc định, IT mới chạy riêng `docker compose run --rm migrate npm run db:seed` sau khi xác nhận database đích. Không dùng lệnh này để bật CMS trên dữ liệu đang vận hành.

## Tài khoản CMS

Tài khoản cán bộ thuộc database của từng môi trường. Tài khoản tạo trong local development **không** được mang sang staging/production; DevOps/IT phải tạo tài khoản riêng sau khi migration chạy thành công và xác nhận đúng Compose project/database đích. Không đưa email/mật khẩu thực vào `.env`, Git, ticket hoặc log. Bàn giao mật khẩu ban đầu qua kênh bí mật đã được tổ chức phê duyệt; yêu cầu đổi sau lần đăng nhập đầu.

```sh
docker compose run --rm migrate npm run staff:manage --workspace=backend
```

Chạy lệnh trên đúng thư mục/revision có `.env` của môi trường đích. Nhập thông tin tương tác; không có tài khoản mặc định, không truyền mật khẩu trong tham số dòng lệnh. Mỗi cán bộ một tài khoản. Đổi mật khẩu/khóa tài khoản sẽ thu hồi phiên hiện có. Khi được hỏi xác nhận thay đổi tài khoản đã tồn tại hoặc cấp quyền quản lý nội dung, nhập chính xác `YES` viết hoa; mọi giá trị khác hủy thao tác.

## Nghiệm thu

- Website mở được các trang chính và media; gửi đăng ký có đánh dấu kiểm thử rồi xác nhận hiển thị trong CMS.
- CMS ở tên miền riêng, cần đăng nhập; tài khoản chỉ xem không cập nhật được. Đăng xuất phải mất quyền API.
- Website `/admin`, `/api/admin`, `/gateway` trả 404. Các đường `/.env`, `/.git/config`, file key/backup bị gateway chặn.
- CMS trả 429 khi vượt quota IP/tài khoản, có Retry-After; không log cookie, body hay query tìm kiếm của admin.
- File từ MinIO còn tải được; kiểm tra metadata/byte size của tài liệu đã biết. Không xóa volume hoặc chuyển tài liệu sang public trong đợt deploy này.
- Đo lại media trên staging bằng Network cache trống; số đo local fallback không thay kết quả dữ liệu thật.
- Kiểm tra tường lửa host chỉ mở cổng cần thiết; không thêm `ports` cho Postgres, MinIO, backend, frontend hoặc CMS.

## Cập nhật và khôi phục

Lưu source revision và image ID/tag của bản đang chạy trước khi cập nhật. Build bản mới, backup dữ liệu, chạy lại Compose. Khi rollback ứng dụng, IT chọn lại revision/image đã xác nhận tương thích schema hiện tại; **không tự rollback migration và không dùng `docker compose down -v`**, vì sẽ xóa volume dữ liệu.

Quota trong bộ nhớ chỉ phù hợp một backend/gateway như Compose này. Nếu tăng replica, phải bổ sung kho quota dùng chung và kiểm thử trước khi triển khai.

Visit analytics: mỗi cặp IP tin cậy + User-Agent có quota 1 request/giờ, áp dụng trước khi parse/ghi DB. Trùng cặp trả 429 và Retry-After; thay visitorId/path không làm mới quota. Cùng IP nhưng khác User-Agent có quota riêng. Proxy frontend chuyển tiếp User-Agent gốc; thiếu header dùng chuỗi rỗng, không bỏ qua quota. Quota hiện lưu RAM và mất khi restart; lưu tối đa 50.000 cặp, trả 429 khi đầy thay vì loại quota chưa hết hạn. User-Agent không phải định danh máy: các máy dùng cùng trình duyệt/phiên bản trong cùng mạng có thể bị gộp; bot đổi User-Agent vẫn có thể tạo lượt mới.

Các mẫu ở đây chưa được áp dụng lên production; việc cấu hình DNS/TLS, firewall, backup và theo dõi máy chủ do IT nghiệm thu trên môi trường thật.
