# Quản trị yêu cầu tư vấn — hướng dẫn triển khai và sử dụng

## Giao diện CMS

Bố cục admin gồm sidebar điều hướng, thanh công cụ, thẻ tổng quan và bảng yêu cầu. Sidebar có bộ lọc nhanh Tất cả/Mới đăng ký/Đang liên hệ/Hoàn tất; các mục này dùng cùng API và dữ liệu thật. Chi tiết mở trong khung bên phải với ghi chú và lịch sử. Trên màn hình nhỏ, điều hướng thu gọn bằng nút menu và bảng có thể cuộn ngang. Số đếm “Yêu cầu mới” là toàn hệ thống; “Kết quả theo bộ lọc” phản ánh lựa chọn hiện tại. Không bổ sung module CMS chưa triển khai vào menu.

## Chức năng đã triển khai

Đường dẫn sau khi triển khai bản mới: **`https://<tên-miền-cms>/`**.

- Đăng nhập bằng tài khoản cán bộ, đăng xuất, phiên tối đa 8 giờ.
- Xem đăng ký mới nhất, tìm họ tên/điện thoại/email/ngành, lọc trạng thái, phân trang 20 dòng.
- Xem đầy đủ lời nhắn, lịch tư vấn mong muốn, nguồn đăng ký và tối đa 100 lịch sử gần nhất.
- Cập nhật trạng thái và ghi chú nội bộ; ghi nhận tên/ID cán bộ và thời gian.
- Hai mức quyền: chỉ xem, hoặc xem và cập nhật. Không có đăng ký tài khoản công khai, xóa hồ sơ hay xuất hàng loạt dữ liệu cá nhân.
- Kiểm tra phiên/quyền ở backend, cookie HttpOnly/SameSite Strict, Secure ở production, kiểm tra origin và custom header với thao tác ghi; chống ghi đè khi hai người cùng sửa.

Public form tiếp tục ghi vào `consultations`/`consultation_history` như trước. Admin đọc cùng database của backend; không có cơ chế tự đồng bộ database dev và production. Không gửi email hoặc Zalo tự động.

## Phát hành lên server

Quy trình chính nằm trong [HANDOVER.md](../HANDOVER.md): Docker Compose cho ba ứng dụng riêng, HTTPS tại gateway và CI chỉ kiểm tra/build. Đã kiểm tra build trên Node 26.12.1 trong Docker. Không dùng các gói output cũ; công cụ triển khai cũ được giữ trong `deploy/legacy` để tham khảo/phục hồi có chủ đích.

Migration `20261029000000_consultation_admin` thêm `consultation_staff` và `consultation_sessions`. Compose chạy migration trước backend, không tự seed. IT backup database, đối chiếu volume/credentials và kiểm tra trên staging trước khi áp dụng production.

Tạo tài khoản qua `docker compose run --rm migrate npm run staff:manage --workspace=backend`. Nhập email, họ tên, quyền và mật khẩu tối thiểu 12 ký tự bằng giao diện tương tác; mật khẩu không truyền trên dòng lệnh. Mỗi cán bộ một tài khoản, không có tài khoản mặc định.

Cấu hình `CMS_APP_URL` đúng origin HTTPS ở backend và CMS, dùng tên miền riêng. Giữ nguyên Origin qua gateway, không thay bằng localhost. Không mở cổng database/backend ra Internet.

## Tài khoản và thao tác của cán bộ

IT dùng cùng lệnh `staff:manage` để đặt lại mật khẩu/quyền hoặc khóa tài khoản. Đặt lại/khóa thu hồi mọi phiên hiện có. Script yêu cầu xác nhận khi thay thông tin tài khoản đã tồn tại. Người dùng liên hệ IT nếu quên mật khẩu; chưa có email reset tự động. Bàn giao mật khẩu qua kênh riêng, không trong repository hay tài liệu chung.

Trong ứng dụng CMS, nhấn **Làm mới** để lấy hồ sơ mới; dữ liệu không tự polling. Chọn **Xem**, đọc nội dung và nhập ghi chú, chọn trạng thái rồi **Lưu cập nhật**. Ghi chú là nội bộ, không gửi cho người đăng ký. Khi báo xung đột, tải lại chi tiết trước khi cập nhật; không ghi đè thay đổi của người khác. Hủy hồ sơ chỉ đổi trạng thái, không xóa dữ liệu. Giờ hiển thị theo Việt Nam.

Trạng thái: Mới đăng ký → Đã tiếp nhận/Đang liên hệ → Đã tư vấn/Hoàn tất; có Chưa liên hệ được và Đã hủy. Cho phép cán bộ sửa lại trạng thái khi xử lý nhầm; mọi lần lưu có lịch sử.

## Vận hành và rollback

- Sao lưu hai bảng mới cùng database nghiệp vụ; session có thể xóa khi cần đăng xuất tất cả người dùng. Không đưa bản backup chứa PII vào source control.
- Phiên hết hạn không được chấp nhận; session hết hạn được dọn khi đăng nhập thành công. Login giới hạn 5 lần/15 phút theo email đã hash, trong bộ nhớ mỗi tiến trình; nếu triển khai nhiều backend cần limiter chia sẻ/reverse-proxy rate limit. Việc này chưa phải giải pháp SSO/MFA.
- Không log routine request URL admin ở Fastify để hạn chế lộ từ khóa tìm kiếm. Nginx/access log phía ngoài cũng cần loại query của `/api/admin/*` và không log body/cookie; người triển khai kiểm tra cấu hình log hiện có.
- Không cache `/api/admin/*` ở proxy/CDN; API đã trả `no-store, private`.
- Rollback ứng dụng: chọn lại revision/image website/CMS/backend đã xác nhận tương thích schema theo `HANDOVER.md`; giữ hai bảng mới để không mất tài khoản. Hồ sơ và lịch sử vẫn tương thích schema cũ. Không tự drop bảng hoặc reset database để rollback.
- Health/readiness hiện có tiếp tục sử dụng. Database phải migrate trước mở admin; thiếu bảng sẽ trả lỗi máy chủ, không tạo bảng tự động.

## Kiểm thử đã thực hiện ngày 29/10/2026

| Kiểm tra | Kết quả |
|---|---|
| Backend build/TypeScript; frontend production build | Đạt |
| Frontend lint | Đạt |
| Bộ test backend + frontend | 55 đạt gồm 45 frontend, 9 backend và 1 integration DB chạy riêng |
| Integration với PostgreSQL tạm qua `node scripts/test-consultation-admin.mjs` | Đạt: migration mới trên DB trống, login, hash session, 401/403, CSRF, quyền chỉ xem, submit form, search, detail, update/history, conflict 409, disable/expiry/logout |
| Browser trên bản build production frontend, database tạm | Đạt: login → danh sách hồ sơ gửi qua Next form proxy → chi tiết → lưu trạng thái/ghi chú → lịch sử và danh sách cập nhật → reload vẫn đăng nhập → logout |

Ảnh nghiệm thu cũ đã được xóa cùng các output tạm trong đợt dọn project. Không có dữ liệu cá nhân thực được chèn hoặc thay đổi trong các kiểm thử này. Chưa triển khai production, chưa tạo tài khoản cán bộ thật, chưa migrate database vận hành. Kiểm thử HTTPS/reverse proxy, Node đúng version yêu cầu, lưu lâu dài sau restart server và giao diện trên thiết bị thật là checklist nghiệm thu tại IT.

Kiểm thử integration cần quyền tạo database trên PostgreSQL **phát triển**; script tạo database tên ngẫu nhiên `vgg_admin_test_*`, chạy migration ở đó rồi dọn. `--preview` mở bản tạm cổng 3401/4401 cho kiểm tra UI, dùng tài khoản và nội dung giả chỉ trong DB tạm. Không dùng tùy chọn này trên máy chủ production. Nếu tiến trình bị đóng cưỡng bức, phải dọn đúng database tạm của phiên kiểm thử, không xóa database khác.

## Hai ứng dụng riêng

- `frontend/`: website công khai, port 3000. Không còn trang/API quản trị.
- `cms/`: ứng dụng Next.js độc lập, port 3001. Trang chính `/`; `/admin` cùng ứng dụng vẫn mở được để tương thích bookmark.
- `backend/`: API và database dùng chung để yêu cầu từ website xuất hiện trong CMS.

Local: sao chép `cms/.env.example` thành `cms/.env.local`, chạy `npm run dev:cms` bên cạnh website/backend. Không sao chép database vào CMS.
Build CMS: `npm run build:cms`. Chạy bản build: `npm run start:cms`.
`NEXT_PUBLIC_WEBSITE_URL` là link quay lại website, cần đặt trước khi build CMS.
Production: cấp tên miền CMS riêng và TLS; cấu hình `CMS_APP_URL` giống nhau ở CMS/backend. Không trỏ CMS vào domain website. Dùng Docker Compose và gateway trong `deploy/nginx/`, xem `HANDOVER.md`; thay domain, chứng chỉ và đường dẫn theo máy triển khai. Các mẫu này chưa được áp dụng lên server.

## Quy trình triển khai hiện tại

Docker Compose ở root là đường triển khai chính. Tài liệu/native tools trước đây đã lưu trong `deploy/legacy`, không chạy trên bản hiện tại. Xem `HANDOVER.md` để chạy migration và tạo tài khoản qua tools container. Quota đăng nhập bổ sung theo IP được mô tả trong `docs/SECURITY.md`.

## Các màn hình CMS được khôi phục (30/10/2026)

CMS riêng tại `http://localhost:3001/admin` có 4 mục: Dashboard, Lịch tư vấn, Tin tức (Đăng tin / Danh sách tin đăng), Quản lý tài nguyên. Giao diện và quy trình được chuyển từ CMS cũ ở commit `2ef0b0e`; không khôi phục cơ chế xác thực cũ. Logo lấy từ website.

- Lịch tư vấn: danh sách, tìm kiếm, trạng thái, ghi chú, người phụ trách, kết quả và ngày liên hệ tiếp theo, lịch sử xử lý. Không thêm lịch tuần/tháng.
- Quyền `canUpdate` tiếp tục điều khiển cập nhật tư vấn. Quyền riêng `canManageContent` điều khiển quản lý tin/tài nguyên và phân công. Backend kiểm tra quyền trên mọi endpoint. Migration mặc định quyền nội dung là false. Local chỉ cấp cho `admin@vgg.local`; không hardcode email trong API. Công cụ `staff:manage` có câu hỏi cấp quyền nội dung rõ ràng.
- Tin tức: danh sách, tìm kiếm, soạn thảo, ảnh, import Word, lưu nháp/xuất bản, chỉnh sửa và xóa. Nội dung HTML được lọc trước khi lưu; cập nhật dùng revision để tránh ghi đè.
- Tài nguyên: danh mục, upload, nháp/xuất bản, cập nhật, lịch sử phiên bản. Xóa vĩnh viễn loại bỏ bản ghi, phiên bản và file MinIO không dùng chung; nếu kho file lỗi, tác vụ bền vững tự thử lại mỗi 30 giây. Media tĩnh vẫn ở public; tài liệu và ảnh biên tập CMS ở MinIO.
- Production cần chạy migration bổ sung, build lại cả backend/CMS và gateway. Tài khoản MinIO cần GetObject và PutObject cho `cms/news/*`, `cms/resources/*`; cần DeleteObject cho `cms/resources/*` và `resources/*` để xóa tài liệu không dùng chung. Xem HANDOVER.md.
- Migration tương thích bỏ NOT NULL của cột author_id cũ nếu có, giữ nguyên các giá trị và khóa ngoại hiện có. Không xóa tài khoản/tin/tài liệu cũ.
