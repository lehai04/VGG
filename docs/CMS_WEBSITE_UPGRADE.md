# CMS nội dung website VGG

Cập nhật ngày 25/10/2026. CMS được tích hợp vào **Admin hiện có → Nội dung website**, tại `/admin/website`. Không tạo hệ thống đăng nhập hoặc trang Admin thứ hai.

## Phạm vi và kiểm kê

Trình biên tập có 30 trang/nhóm nội dung: 21 ngành, 6 trang chính, header/footer và 2 nhóm nhãn theo ngôn ngữ. Tin tức và tài liệu tiếp tục sử dụng module CMS hiện có.

| Trang / nhóm | Nội dung quản trị |
| --- | --- |
| `/` | Banner, nội dung giới thiệu, nghiên cứu, các nhóm chương trình, nhãn tìm chương trình |
| `/discover` | Giới thiệu, tầm nhìn, sứ mệnh, triết lý, LEAD, lợi thế, định hướng, lời mời; ảnh/alt/CTA; 6 lãnh đạo hiện có |
| `/programmes` | Banner, breadcrumb, nhãn danh mục, bộ lọc, nhãn thông tin và các nút. Chương trình lấy tên/nội dung từ đúng hồ sơ ngành |
| `/programmes/[id]` | Tiêu đề và thông tin chung; banner; tổng quan; điểm nổi bật; đối tượng/đầu vào; nghề nghiệp; phần diễn giải chương trình; học phí dạng nội dung; FAQ; ảnh/alt và CTA theo từng ngành |
| `/admissions` | Các trường văn bản, ảnh và liên kết tĩnh trong 8 phần thực tế; FAQ và quy trình Thạc sĩ/Tiến sĩ. Không đưa kết quả tính tự động vào form sửa chữ |
| `/research` | Banner, tổng quan, mục tiêu, lĩnh vực, đối tác, ảnh/alt và nội dung hợp tác doanh nghiệp |
| `/student-success` | Banner, học tập/cộng đồng, 6 dịch vụ, bộ ảnh khoảnh khắc, alt và liên kết |
| Header/footer dùng chung | Logo/alt; nhãn menu; liên hệ; địa chỉ; liên kết nhanh, mạng xã hội, pháp lý; cổng đăng ký và nút nổi |
| Nhãn dùng chung VI/EN | Nhãn thanh tiện ích, nút đăng ký và nội dung form tư vấn đang thực sự được dùng |
| `/news`, `/news/[slug]` | Giữ module Tin tức hiện có: bài viết, rich text, ảnh, SEO, trạng thái và xuất bản qua API news |
| `/resources` | Giữ module Tài nguyên hiện có: văn bản, PDF, thông tin tệp, danh mục và trạng thái |
| `/global`, các URL con research/admissions/student-success/resources và URL chọn bậc học | Giữ cơ chế chuyển hướng hiện có; không tạo trang CMS trùng với đích chuyển hướng |
| Các trang con `/discover/*` đã bỏ | Không khôi phục; kiểm tra `/vi/discover/gioi-thieu` vẫn 404 |

Danh sách **đúng từng ngành, route và đường dẫn trường được phép sửa** nằm trong [page-inventory.json](cms-audit/page-inventory.json). Danh sách nguồn và nội dung mặc định được sinh từ source thật, không phải dữ liệu mẫu: `backend/src/modules/cms/page-defaults.json`.

### Phần tiếp tục cần code / học vụ

- Route, ID, mã ngành, enum bậc học/nhóm ngành/định hướng, icon, CSS, điều khiển và validation của form.
- Cấu trúc section/card và thứ tự cố định: frontend chưa có bộ dựng bố cục hoặc hợp đồng thêm/xóa section, nên CMS không cung cấp cấu hình bố cục không được hỗ trợ.
- Bảng môn học, tín chỉ và quy tắc học vụ trong `curricula.ts`; các mô hình tính học phí/học bổng, lịch xét tuyển, danh mục đầu vào và điều kiện tự động trong admissions engine. Đây là dữ liệu liên quan phép tính/đối chiếu, không đưa vào bộ sửa chuỗi tự do. Thay đổi cần kiểm tra đồng thời các bảng và quy tắc tương ứng.
- Nội dung modal động, thông báo trạng thái/validation, video, nhãn kỹ thuật không thuộc nhóm biên tập đã kiểm kê; nguồn fallback/lịch sử của news/research tiếp tục theo source hoặc module Tin tức hiện có. Không tự seed/ghi đè các bản ghi tin tức của người dùng.
- Không bật lại chú thích nguồn ảnh đã được yêu cầu bỏ trên giao diện công khai. Nguồn ảnh có thể lưu ở metadata thư viện.
- CMS này sửa các mục con hiện có. Không thêm loại card mới, đổi số lượng cột, kéo thả section hoặc thay logic tuyển sinh.

## Cách dùng

1. Đăng nhập Admin bằng tài khoản hiện có; mở **Nội dung website**.
2. Chọn ngôn ngữ, tìm tên/route hoặc lọc trạng thái, rồi chọn trang.
3. Mở section cần sửa. Có thể tìm theo nhãn hoặc nội dung để chỉ hiện các trường liên quan.
4. Sửa văn bản, ảnh, mô tả ảnh hoặc CTA. **Dùng nội dung gốc** bỏ override của riêng trường đó.
5. Bấm **Lưu bản nháp**. Bước này không thay nội dung công khai.
6. Bấm **Xem trước**. Nếu trình duyệt chặn popup, dùng liên kết **Mở bản xem trước đã tạo**. Liên kết có hiệu lực 10 phút và là ảnh chụp của bản nháp tại thời điểm tạo. Sau khi sửa/lưu tiếp, tạo bản xem trước mới.
7. Bấm **Xuất bản**, mở trang công khai rồi tải lại để kiểm tra. CMS đọc dữ liệu với `no-store`; không cần build lại cho thao tác biên tập thông thường.
8. **Hủy thay đổi chưa lưu** khôi phục về lần lưu gần nhất. **Bỏ bản nháp** xóa bản nháp đã lưu, giữ nguyên bản công khai. Muốn trả nội dung công khai về nguồn gốc, chọn nội dung gốc cho các trường tương ứng rồi lưu và xuất bản lại.

Nếu một phiên khác vừa lưu trang, máy chủ trả **409** và không ghi đè. Tải lại trang trước khi tiếp tục; sao chép phần đang viết cần giữ trước khi tải lại.

Nhóm header/footer và nhãn dùng chung có chủ đích áp dụng trên nhiều trang. Các hồ sơ ngành và ngôn ngữ được lưu riêng. Khi đổi tên ngành qua CMS, nhãn danh mục và lựa chọn form tư vấn dùng tên đã xuất bản, vẫn giữ ID ngành và route.

## Ảnh và PDF

- **Thư viện ảnh** hiển thị 183 tệp ảnh đang có trong dự án, cộng ảnh ngoài và ảnh API được tham chiếu. Không di chuyển/xóa thư viện cũ.
- Tìm theo tên, đường dẫn hoặc nơi dùng. Mỗi ảnh phân biệt **trong dự án**, **kho nội bộ/API**, **URL ngoài**. Thông tin nơi dùng là kiểm kê bảo thủ của nguồn mặc định, bản nháp, bản xuất bản và ảnh tin tức; không khẳng định ảnh chưa được tham chiếu trong CMS là không dùng ở nơi nào khác.
- Tại trường ảnh, chọn **Chọn ảnh có sẵn** hoặc **Tải ảnh mới**. Upload JPEG/PNG/WebP/AVIF tối đa 8 MB, kiểm tra chữ ký tệp và xử lý bằng sharp qua uploader MinIO hiện có. Không nhận SVG upload hoặc HTML giả ảnh.
- Ảnh upload được lưu trong MinIO, ghi metadata thư viện, sau đó gắn vào trường ảnh. Phải lưu nháp/xuất bản trang để thay ảnh công khai.
- Trong thư viện mở từ nút chung, chọn ảnh để sửa tên và nguồn. Alt text dùng trên website sửa ở trường mô tả ảnh của chính trang. Tên/nguồn thư viện không tự thay alt của mọi trang.
- Giữ danh sách host ảnh Next.js hiện có: `images.unsplash.com` và `vluwebmedia.s3.ap-southeast-1.amazonaws.com`; ảnh dự án dùng `/images/...`, ảnh upload dùng `/api/media/...`. Không mở rộng wildcard host ảnh. API từ chối URL thực thi, URL protocol-relative và đường dẫn ảnh đi xuyên thư mục.
- Không có nút xóa vật lý trong thư viện CMS để bảo vệ ảnh đang dùng. Không coi metadata là bằng chứng đủ để xóa tệp khỏi kho.
- PDF tiếp tục quản lý tại **Tài nguyên**, dùng uploader/kiểm tra tệp và danh mục hiện có. Giới hạn mặc định 25 MB, cấu hình bằng `STORAGE_MAX_RESOURCE_FILE_MB`. Không tạo kho PDF hoặc API upload trùng lặp.

## Lưu trữ, API và bảo mật

Dùng bảng Prisma/PostgreSQL **SiteContent** hiện có. Không lưu nội dung CMS trong localStorage.

| Loại | Key / section | Công khai? |
| --- | --- | --- |
| Nháp | `cms.draft.<locale>.<id>` / `cms-draft` | Không |
| Xuất bản | `cms.published.<locale>.<id>` / `cms-published` | Có |
| Metadata media | `cms.media.<hash>` / `cms-media` | Không qua API nội dung công khai |
| Preview | Token ngẫu nhiên 32 byte, chỉ lưu SHA-256 / `cms-preview` | Chỉ đọc bằng token tạm, hết hạn sau 10 phút |

Save/publish dùng transaction Serializable và revision thời gian cập nhật để chặn ghi đè giữa các phiên. Bản xuất bản là snapshot riêng, không trỏ trực tiếp vào bản nháp. Preview cũng là snapshot riêng; bản cũ không thay đổi khi nháp được sửa tiếp. Bản xem trước được giới hạn theo trang và locale, có `noindex`, `no-store`, `no-referrer`; token sai/hết hạn không trả nội dung nháp. Bản ghi preview cũ hơn một giờ được dọn ở lần tạo preview tiếp theo.

Frontend có fallback dữ liệu nguồn khi backend lỗi, dữ liệu không đúng dạng hoặc chưa xuất bản. Nội dung chữ render bằng React; bản template HTML Tuyển sinh chỉ thay các slot đã kiểm kê và escape văn bản/thuộc tính. FAQ/quy trình động escape dữ liệu CMS trước khi dựng HTML. Không cung cấp trình sửa HTML/JS/CSS tự do. Rich text Tin tức vẫn dùng sanitizer hiện có.

API quản trị mới nằm tại `/api/admin/website/pages`, `/page`, `/publish`, `/preview`, `/media`, đi qua proxy `/api/cms/[...path]` hiện có. API public preview là POST `/api/public/website/preview`; nội dung public dùng API site-content hiện có, chỉ lấy bản `published=true`. Các key/section dành riêng CMS không thể bị ghi đè qua form cấu hình cũ.

Quyền tách biệt: `website.view`, `website.update`, `website.publish`, `media.view`, `media.upload`. Super Admin giữ cơ chế quyền hiện có. Người có quyền sửa không mặc nhiên có quyền xuất bản. Tài khoản bắt buộc đổi mật khẩu bị chặn khỏi API CMS mới. Proxy mutation và uploader ảnh dùng kiểm tra Origin hiện có; upload vẫn yêu cầu phiên và quyền. Không đổi hệ thống xác thực.

Migration `20261025000000_website_cms_permissions` chỉ thêm định nghĩa quyền và gắn cho Super Admin; không cấp quyền xuất bản hàng loạt cho biên tập viên. Đã kiểm tra trạng thái rồi áp dụng migration này vào database local `vgg`; không có migration khác chờ lúc áp dụng. Các môi trường khác cần chạy quy trình deploy migration bình thường.

## Cấu hình và vận hành

Giữ các cấu hình hiện có:

- Backend: `DATABASE_URL`, `PUBLIC_APP_URL`, `ADMIN_APP_URL`, các biến `STORAGE_*` cho MinIO.
- Frontend/Admin: `BACKEND_INTERNAL_URL`; Admin dùng cùng database; cấu hình storage hiện có cho uploader.
- `ADMIN_ALLOWED_ORIGINS` nếu Admin phục vụ sau reverse proxy/domain khác origin nội bộ.
- Không thêm secret CMS mới và không đưa credential vào client/repository.

Từ thư mục gốc, cài/chạy theo workspace hiện có. Các lệnh `dev` chạy ở các terminal riêng; chỉ khởi động khi chưa có server ở cổng tương ứng:

```powershell
npm run db:deploy
npm run dev:backend
npm run dev:admin
npm run dev
```

Không tạo/đặt lại tài khoản Admin thật trong đợt nâng cấp này. Dùng tài khoản hiện có hoặc nhờ người phụ trách cấp theo quy trình cũ.

Khi IT đổi cấu trúc/nội dung nguồn bằng code, cập nhật kiểm kê trước build (không ghi vào database):

```powershell
npx --no-install tsx scripts/export-research-data.ts
npx --no-install tsx scripts/export-admissions-data.ts
python scripts/export-admissions-copy.py
npx --no-install tsx --tsconfig frontend/tsconfig.json scripts/export-cms-defaults.ts
```

Các JSON kiểm kê được commit cùng source, nên runtime/build thông thường không cần Python. Nếu đổi thứ tự/xóa mục con bằng code, cần rà soát các override theo chỉ số của mảng trước deploy; không tự di chuyển override sang mục khác. Không sửa trực tiếp HTML template mà bỏ qua việc xuất lại slot inventory.

## Các file chính

- Admin: route website/dashboard hiện có; `WebsiteManager.tsx` và CSS module; sidebar; quyền; proxy CMS; uploader ảnh; sửa thông báo lỗi JSON ở `CmsManager.tsx`. Heading thanh trên được giữ 14px, tiêu đề trang quản trị 32px và tiêu đề trình biên tập 24px để tránh bị typography heading công khai ghi đè.
- Backend: `website.routes.ts`, `content-patch.ts`, `page-defaults.json`, `asset-defaults.json`; đăng ký module và xử lý validation trong `app.ts`; bảo vệ key CMS ở `cms.routes.ts`; migration quyền và seed định nghĩa quyền.
- Frontend: `website-content.ts`; root layout và locale/chrome providers; các route/component hiện có của home, discover, admissions, programmes, research, student-success; nguồn nội dung có cấu trúc tương ứng. Không thêm route `/discover/*`.
- Tuyển sinh: `cms-template.ts`, `cms-copy.json`, `editorial-content.json`, adapter và các điểm nối trong engine. Giữ form gửi tư vấn, đối chiếu đầu vào, tính học phí và tabs hiện có.
- Script và test: `scripts/export-*`, `test-cms-integration.mjs`, `cms-qa-server.mjs`, `check-cms-routes.mjs`, test backend CMS và frontend admissions CMS.

## Kiểm chứng và giới hạn

- Build và typecheck frontend/backend/admin: đã chạy; build Admin trên Windows cần chạy ngoài sandbox để Turbopack tạo junction `argon2`.
- Test frontend: 30 bài qua; Admin: 19 bài qua; backend thường: 3 bài qua, 1 integration test được skip có chủ đích khi không bật môi trường database kiểm thử.
- Integration test riêng với PostgreSQL thật: đã qua đăng nhập, phân quyền, nháp không lộ public, preview, publish, tải lại, locale/trang độc lập, sửa ảnh, xung đột đồng thời, discard, URL/key không hợp lệ, preview hết hạn và validation trả 400. Database tạm được tự xóa sau chạy.
- Browser QA bằng tài khoản tạm trong database riêng: đã đăng nhập Admin hiện có; sửa tiêu đề/nội dung/ảnh/alt của Marketing; lưu nháp, đối chiếu trang public chưa đổi; preview; publish; reload; xác nhận ngành CNTT không nhận nội dung Marketing. Upload ảnh vào bucket QA riêng và xác nhận ảnh public tải thành công. Đã sửa và kiểm tra banner/FAQ Tuyển sinh giữ nội dung sau khi đổi tab Thạc sĩ/Tiến sĩ.
- Kiểm tra HTTP: 59/59 route ở VI/EN và URL discover cũ đạt trạng thái mong đợi; kết quả lưu tại `outputs/cms-qa/routes.json`. Không coi kiểm tra HTTP là kiểm tra trực quan toàn bộ nội dung từng màn hình.
- Đã chụp bằng chứng giao diện desktop. Không khẳng định đã kiểm thử trên điện thoại thật; CSS có breakpoint nhưng bộ đổi viewport của trình duyệt QA không đổi kích thước render như yêu cầu.
- Lint frontend và các file CMS mới/sửa đã qua, không có lỗi/cảnh báo trong phần kiểm tra riêng. Lint toàn Admin còn 10 lỗi tồn tại từ trước ở LoginForm, PasswordChecklistInput, ValidatedInput, RealtimeDashboard, NotificationsManager, SettingsManager; không sửa luồng xác thực hoặc module ngoài phạm vi chỉ để xóa cảnh báo. Báo cáo tóm tắt ở `outputs/cms-qa/admin-lint.json`.
- Tài khoản/credential QA, database tạm, bucket ảnh QA và dịch vụ QA được dọn sau kiểm tra. Không xuất bản nội dung thử vào database website thật.
- Chưa triển khai lên hosting/Git remote; không tự commit/push. Backup database và kho MinIO theo vận hành hiện có. Không có lịch sử phiên bản dài hạn hoặc quy trình nhiều cấp duyệt mới trong phạm vi này.

Chạy lại kiểm thử API bằng database local tạm (cần tài khoản PostgreSQL local có quyền tạo database):

```powershell
node scripts/test-cms-integration.mjs
```

Script từ chối hostname database ngoài localhost/127.0.0.1 và chỉ tạo/xóa database tên `vgg_cms_test_<random>`. Không chạy script với credential production.
