# Bàn giao native systemd cho CNTT

Đích triển khai: Linux x86_64, glibc tương thích Debian 12, Node.js 26.12.1 tại `/usr/local/bin/node`, PostgreSQL và Nginx có sẵn. Gói này chạy bằng systemd; Docker chỉ dùng để build/kiểm thử trên máy phát triển.

## URL đã chốt

| Chức năng | URL công khai | Upstream |
|---|---|---|
| Website | https://sdh.vlu.edu.vn | localhost:3000 |
| CMS | https://sdh.vlu.edu.vn/cms | 127.0.0.1:3001, giữ nguyên `/cms` |
| Gateway health | https://sdh.vlu.edu.vn/gateway/health | 127.0.0.1:4000/health |
| Gateway API công khai | https://sdh.vlu.edu.vn/gateway/api/public/... | 127.0.0.1:4000/api/public/... |
| API quản trị | https://sdh.vlu.edu.vn/cms/api/admin/... | CMS kiểm tra phiên/CSRF rồi gọi backend |

`/gateway/` là tiền tố API, không có trang HTML. Chỉ các tuyến public và health được công khai; `/gateway/api/admin/*` bị chặn để không bỏ qua proxy CMS. URL `/api/public/*` cũ vẫn dùng được. Tên miền `saudaihoc.vlu.edu.vn` chuyển về `sdh.vlu.edu.vn` để đồng nhất origin đăng nhập.

## Nội dung gói

Giải nén `release-linux-amd64.tar.gz` trực tiếp vào `/var/opt/saudaihoc/deploy/release/` sẽ có:

```text
backend/
  dist/server.js
  prisma/
  prisma.config.ts
  scripts/consultation-staff.mjs
  package.json
  package-lock.json
  runtime-package.json
  node_modules -> ../node_modules
frontend/
  server.js
  .next/
  public/
  package.json
cms/
  server.js
  .next/
  public/
  package.json
node_modules/
```

Thư viện được cài và build trên Linux, bao gồm Prisma Client và CLI để chạy migration offline. Giữ nguyên thư mục `node_modules` dùng chung và symlink khi giải nén bằng `tar` trên Linux. `backend/package-lock.json` là bản khóa toàn workspace để truy vết; không chạy `npm ci` riêng trong backend. Gói đã có thư viện, không cần cài npm trên máy chủ.

Gói không chứa `.env` phát triển, dữ liệu database, chứng chỉ hay khóa riêng từ ZIP cũ. File `cms.env` và `frontend.env` bàn giao không chứa bí mật. Cấu hình `backend.env.example` là mẫu; giữ thông tin DB/storage hiện có của IT.

## Cấu hình và triển khai

1. Sao lưu bản đang chạy và database. Chuẩn bị release mới tại thư mục staging, kiểm tra `sha256sum -c SHA256SUMS`, rồi giải nén bằng `tar -xzf`. Chỉ chuyển sang đường dẫn release chính thức trong cửa sổ triển khai; không giải nén đè lên tiến trình đang chạy.
2. Đặt `systemd/*.service` tại `/etc/systemd/system/`. Backend/frontend giữ đường dẫn và user `www-data` như cấu hình IT; CMS bổ sung file `vgg-cms.service` (tên systemd chính xác có đuôi `.service`).
3. Đặt `config/cms.env`, `config/frontend.env` tại `/etc/saudaihoc/`. Trong `backend.env` hiện tại, giữ `DATABASE_URL` và các biến `STORAGE_*`, đồng thời cập nhật:

   ```dotenv
   NODE_ENV=production
   BACKEND_HOST=127.0.0.1
   BACKEND_PORT=4000
   PUBLIC_APP_URL=https://sdh.vlu.edu.vn
   CMS_APP_URL=https://sdh.vlu.edu.vn/cms
   ```

4. Cấp quyền đọc/chạy release cho `www-data`; cấp quyền ghi các thư mục cache `.next/cache` của frontend/CMS. Bảo vệ file env, ví dụ `root:www-data`, quyền `640`. CMS upload sử dụng object storage: cần cấu hình đầy đủ `STORAGE_*` nếu chưa có. Không lấy khóa storage từ môi trường phát triển.
5. Chạy migration bằng cấu hình thật, sau khi sao lưu. Lệnh dưới cần tài khoản có quyền đọc env và quyền migrate DB:

   ```sh
   cd /var/opt/saudaihoc/deploy/release/backend
   /usr/local/bin/node --env-file=/etc/saudaihoc/backend.env ../node_modules/prisma/build/index.js migrate deploy
   ```

   Nếu DB cũ chưa được quản lý bằng Prisma migrations, đối chiếu schema và lịch sử `_prisma_migrations` trước; không dùng `migrate reset` hoặc ghi đè dữ liệu bằng SQL trong ZIP cũ.

   Prisma Client đã được generate khi build gói Linux. Chỉ chạy lại `generate` khi cần khắc phục client thiếu/sai; thao tác này ghi vào `node_modules`, cần tài khoản triển khai có quyền ghi. Luôn nạp `backend.env` như lệnh trên vì `prisma.config.ts` yêu cầu `DATABASE_URL`, kể cả khi chỉ generate. Generate không sửa schema hay dữ liệu DB. Không generate bằng tài khoản `www-data` nếu release được đặt chỉ đọc.

   ```sh
   # Khắc phục client thiếu/sai, chạy từ thư mục backend:
   /usr/local/bin/node --env-file=/etc/saudaihoc/backend.env ../node_modules/prisma/build/index.js generate
   ```
6. Dùng `nginx/sdh.vlu.edu.vn.conf` thay cấu hình site hiện tại sau khi đối chiếu các tùy chỉnh riêng của IT. Giữ chứng chỉ hiện có `/var/ssl/fullchain.pem` và `/var/ssl/private.key`; chứng chỉ phải bao phủ các tên miền cấu hình. File đã loại bỏ phụ thuộc vào biến `$connection_upgrade` chưa được định nghĩa trong file IT.
7. Kiểm tra và khởi động:

   ```sh
   sudo systemctl daemon-reload
   sudo systemctl enable vgg-backend vgg-frontend vgg-cms
   sudo systemctl restart vgg-backend vgg-frontend vgg-cms
   sudo nginx -t && sudo systemctl reload nginx
   curl -fsS https://sdh.vlu.edu.vn/gateway/health
   curl -I https://sdh.vlu.edu.vn/cms
   ```

8. Kiểm tra trình duyệt: website, CMS, đăng nhập, điều hướng, đăng xuất; thử thêm/sửa tin và upload với tài khoản có quyền. Nếu chưa có tài khoản, chạy công cụ tương tác (không có mật khẩu mặc định):

   ```sh
   cd /var/opt/saudaihoc/deploy/release/backend
   /usr/local/bin/node --env-file=/etc/saudaihoc/backend.env scripts/consultation-staff.mjs
   ```

## Build lại

Từ thư mục gốc dự án, với Docker Linux đang hoạt động:

```sh
docker build --platform linux/amd64 -f deploy/it-native/Dockerfile --target export --output type=local,dest=outputs/it-handover .
```

`NEXT_PUBLIC_CMS_BASE_PATH=/cms` và `NEXT_PUBLIC_WEBSITE_URL=https://sdh.vlu.edu.vn/vi` được biên dịch vào JavaScript. Đổi prefix CMS phải build lại; chỉ sửa `cms.env` sau build không đổi prefix. Các service không tự chạy migration hoặc seed.

Kiểm thử chính file tar đã xuất bằng PostgreSQL tạm và Nginx HTTPS, rồi dọn riêng môi trường kiểm thử:

```sh
docker build --platform linux/amd64 -f deploy/it-native/Dockerfile --target build -t vgg-it-native:verify .
docker compose -p vgg-it-native-check -f deploy/it-native/verify.compose.yaml up --abort-on-container-exit --exit-code-from app
docker compose -p vgg-it-native-check -f deploy/it-native/verify.compose.yaml down -v
```

Kết quả kiểm thử và các giới hạn được ghi trong `VERIFICATION.txt` của gói ZIP bàn giao. Khi rollback, khôi phục release và cấu hình đã sao lưu; migration chỉ thêm dữ liệu/schema vẫn cần đánh giá tương thích với phiên bản cũ trước khi đổi lại ứng dụng.

## Khác biệt so với tài liệu IT

- Gói ZIP cũ chia `FE-build`, `BE-build`, `CMS-build`; gói mới dùng `frontend`, `backend`, `cms` cùng cấp như cấu trúc IT.
- Thêm CMS tại port 3001 và service phù hợp `/var/opt/saudaihoc/deploy/release`.
- Thêm basePath `/cms`, sửa URL API, logo và cookie đăng nhập cho prefix này.
- Đổi origin từ `saudaihoc.vlu.edu.vn` trong env IT sang tên miền `sdh.vlu.edu.vn` người dùng đã chốt.
- Nginx bổ sung `/cms`, `/gateway`, giới hạn upload CMS 101 MiB để hỗ trợ file tài nguyên tối đa 100 MiB cùng multipart overhead.
- Giữ `HOSTNAME=localhost` và upstream `localhost:3000` của frontend như IT. Next.js chuẩn hóa `127.0.0.1` thành `localhost` trong URL middleware; dùng sai hostname có thể biến locale rewrite thành yêu cầu HTTPS đến cổng HTTP nội bộ.
- Không triển khai lên server thật hoặc thay dữ liệu production trong quá trình chuẩn bị gói.
