# Bàn giao website VGG

## Phương án triển khai của phòng IT: cài trực tiếp, không dùng Docker

Cài PostgreSQL 17, Node.js theo `.nvmrc` (26.12.1) và Git LFS trên máy chủ.
Windows có thể dùng [bộ cài PostgreSQL được giới thiệu trên trang chính thức](https://www.postgresql.org/download/windows/).
Với Linux, IT dùng gói PostgreSQL 17 phù hợp hệ điều hành và chạy PostgreSQL bằng dịch vụ hệ thống.
Chạy `git lfs pull` sau khi lấy source để các PDF là file thật, không phải pointer Git LFS.

Ảnh/PDF đi kèm nằm trong `frontend/public`, không cần MinIO. Chỉ cấu hình object storage
nếu chuyển dữ liệu cũ có các URL `/api/media/...`; nếu không cấu hình, riêng các URL đó
trả 503, còn website, tài liệu đi kèm và form tư vấn vẫn hoạt động.

## 1. Tạo tài khoản và database PostgreSQL

Khởi động dịch vụ PostgreSQL. Ví dụ dưới đây dùng PostgreSQL trên cùng máy với backend,
cổng 5432 và tài khoản vận hành có quyền tạo role/database. Trên Windows cần đưa thư mục
`bin` của PostgreSQL vào PATH, hoặc chạy trong terminal tại thư mục này.

```sh
createuser -h 127.0.0.1 -p 5432 -U postgres --pwprompt --no-superuser --no-createdb --no-createrole vgg
createdb -h 127.0.0.1 -p 5432 -U postgres --owner=vgg --encoding=UTF8 vgg_public
psql -h 127.0.0.1 -p 5432 -U vgg -d vgg_public -c "SELECT current_database(), current_user;"
```

`--pwprompt` yêu cầu nhập mật khẩu cho tài khoản ứng dụng mới. Không dùng tài khoản
superuser `postgres` trong cấu hình backend. Database `vgg_public` thuộc sở hữu `vgg`
để tài khoản này thực hiện migration trong database của ứng dụng.
Tham khảo [createuser](https://www.postgresql.org/docs/17/app-createuser.html) và
[createdb](https://www.postgresql.org/docs/17/app-createdb.html).

## 2. Cấu hình kết nối và domain

Tại thư mục gốc dự án, sao chép `backend/.env.example` thành `backend/.env` và
`frontend/.env.example` thành `frontend/.env.local`. Trên Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env.local
```

Trên Linux dùng `cp` cho cùng hai đường dẫn. Không ghi đè file cấu hình đang vận hành.
Trong `backend/.env`, đặt:

```dotenv
NODE_ENV=production
DATABASE_URL=postgresql://vgg:URL_ENCODED_PASSWORD@127.0.0.1:5432/vgg_public
BACKEND_HOST=127.0.0.1
BACKEND_PORT=4000
PUBLIC_APP_URL=https://vgg.vlu.edu.vn
```

Thay mật khẩu bằng giá trị thật đã percent-encode nếu có ký tự đặc biệt. Nếu PostgreSQL
ở máy riêng, thay host và cấu hình `listen_addresses`/`pg_hba.conf` cùng firewall theo
chính sách IT, chỉ cho phép máy backend kết nối. Khi hạ tầng yêu cầu TLS, cấu hình
chuỗi kết nối và chứng chỉ theo chính sách PostgreSQL của IT.

Trong `frontend/.env.local`, đặt `BACKEND_INTERNAL_URL=http://127.0.0.1:4000`,
`PUBLIC_APP_URL` cùng domain với backend và giữ hai cờ dữ liệu demo là `false`.
Không cần tạo `.env` ở gốc cho cách triển khai này.

## 3. Migration, seed và build

Chạy từ thư mục gốc. `DATABASE_URL` được Prisma và backend đọc từ `backend/.env`;
cấu hình frontend được Next.js đọc từ `frontend/.env.local`.

```sh
npm ci
npm run db:deploy
npm run db:seed
npm run build
```

Chỉ tiếp tục nếu từng lệnh hoàn thành thành công. Khi chuyển dữ liệu có sẵn, thực hiện
phần chuyển dữ liệu bên dưới sau migration và trước seed.

## Database và nội dung

Schema mới chỉ gồm bài viết, tài liệu, danh mục tài liệu, nội dung trang, lượt truy cập,
yêu cầu tư vấn và lịch sử yêu cầu. Tác giả bài viết được lưu bằng tên hiển thị.

- Schema: `backend/prisma/schema.prisma`.
- Migration khởi tạo: `backend/prisma/migrations/20261028000000_public_foundation/`.
- Seed: `npm run db:seed` — 58 bản ghi nội dung, 4 tin tóm tắt có nguồn và 8 tài liệu.
- Dữ liệu trang: `backend/src/modules/content/page-defaults.json`.
- PDF: `frontend/public/documents/demo/`; giữ URL cũ để các liên kết tài liệu còn hoạt động.
- Seed không ghi đè bản ghi đã có và không tạo người đăng ký giả.

Migration này dành cho database trống. Không chạy chồng lên database đang có lịch sử
migration khác. Dùng database mới `vgg_public`; không xóa hay reset database đang vận hành.
Khi chuyển hệ thống đang có dữ liệu: sao lưu trước, tạo database mới, chạy migration,
chuyển dữ liệu website bằng script bên dưới, sau đó seed và kiểm tra trước khi đổi kết nối.

```sh
# Thiết lập SOURCE_DATABASE_URL và DATABASE_URL bằng biến môi trường.
# Database đích đã migrate và chưa seed; database nguồn chỉ được đọc.
node scripts/transfer-public-data.mjs
npm run db:seed
```

Script chỉ chuyển các bảng website được liệt kê rõ ràng và những cột còn trong schema mới.
Database đích phải trống; toàn bộ thao tác ghi nằm trong một transaction. Media MinIO cần
được đồng bộ riêng nếu dữ liệu cũ tham chiếu tới object storage.

## 4. Chạy frontend và backend

```sh
npm run start:backend
# Terminal thứ hai
npm start
```

Kiểm tra `http://127.0.0.1:4000/ready` trả 200, sau đó mở `http://localhost:3000/vi`.
Frontend gọi backend nội bộ; backend kết nối PostgreSQL đã cài trực tiếp.
Đặt reverse proxy HTTPS của IT trước cổng 3000 và giới hạn cổng backend/database
trong mạng nội bộ. Khi triển khai thật, IT đăng ký hai tiến trình thành dịch vụ tự khởi
động và tự khởi động lại khi lỗi bằng công cụ vận hành trên máy chủ. Nếu dùng PM2,
có sẵn `ecosystem.config.cjs`; phải chạy từ thư mục gốc dự án.

## Nghiệm thu và sao lưu

- Mở VI/EN, danh mục/chi tiết chương trình, tuyển sinh, nghiên cứu, tin và tài liệu.
- Kiểm tra tìm kiếm/lọc tin, tải PDF và gửi form tư vấn; xác nhận dòng mới trong `consultations`.
- Khởi động lại backend rồi kiểm tra dữ liệu vẫn còn. Seed lại không nhân đôi nội dung.
- Backend `/ready` phải trả 200. Các API public chỉ phục vụ đọc nội dung, ghi lượt truy cập
  và nhận yêu cầu tư vấn.
- Dùng `pg_dump` để backup PostgreSQL; sao lưu object storage riêng nếu có sử dụng.
  Kiểm tra restore trên database thử nghiệm trước bàn giao.
- Script `scripts/smoke-public.mjs` có phase `create` và `check`, chạy trên database kiểm thử
  riêng với `ALLOW_PUBLIC_SMOKE=true`. Phase `check` dọn bản ghi tư vấn mà script đã tạo.
  Chạy trực tiếp bằng `node --env-file=backend/.env scripts/smoke-public.mjs create`
  và tương tự với `check`; mặc định kiểm tra frontend cổng 3000 và backend cổng 4000.
  Có thể đặt `SMOKE_FRONTEND_URL`, `SMOKE_BACKEND_URL` và `SMOKE_MARKER_PATH` để đổi
  địa chỉ hoặc vị trí file ghi nhận kiểm thử. Giữa hai phase, restart backend và seed lại.

Các file Docker chỉ là phương án kiểm thử tùy chọn, không bắt buộc cài đặt trên máy IT.
Kiểm thử trước đó dùng PostgreSQL trong môi trường Docker; cấu hình startup trực tiếp
không có object storage được kiểm tra riêng. Việc cài đặt PostgreSQL native và nghiệm thu
trên máy chủ thực tế vẫn do IT thực hiện theo môi trường của họ.

Kết quả kiểm tra của bản hiện tại được ghi tại `docs/VERIFICATION.md`.
