# Đặc tả API hiện có và đề xuất

Nguồn hiện có: `backend/src/modules/public/public.routes.ts`, `backend/src/app.ts`, `frontend/src/app/api/**/route.ts`. Không có admin API được đăng ký. Các endpoint bên dưới phần đề xuất chưa hoạt động.

## Backend hiện có

| Method/path | Input | Output/hành vi |
|---|---|---|
| GET /health | Không | success,data.status=ok; chỉ process |
| GET /ready | Không | Truy vấn SELECT 1; 503 khi DB lỗi |
| GET /api/public/site-content | locale vi/en, mặc định vi | data.contents với published=true; no-store; lấy tất cả nội dung locale |
| GET /api/public/website/programmes | Không | data.programmes và hiddenIds; đọc content-programme published + mọi state; chưa lọc locale |
| GET /api/public/news | category enum, q ≤100, locale vi/en, limit 1..100 mặc định 30, page ≥1 | data.posts + pagination(page,limit,total,totalPages); status=PUBLISHED |
| GET /api/public/news/:slug | Slug 2..190, lowercase/digits/hyphen | data.post published hoặc 404 NEWS_NOT_FOUND; chưa tham số locale |
| GET /api/public/resources | Không | data.resources, categories, resourceTypes; no-store; chưa phân trang/lọc locale |
| GET /api/public/media/* | Object key, không rỗng/.. hoặc bắt đầu / | Stream + MIME/length/cache; 400 đường dẫn, 503 storage chưa cấu hình, 404 khi đọc lỗi; chưa kiểm tra trạng thái asset |
| POST /api/public/visits | path ≤500, locale? ≤5, visitorId? ≤100 | 201, data={} |
| POST /api/public/consultations | name 2..120, phone 9..30, email, consent true/yes; optional programme/interestedField/date/time/method/message/source; website honeypot rỗng | 201 data.id; tạo Consultation + History; 400 validation; 5/10 phút theo cấu hình rate-limit |

Envelope thông thường `{success:true,data:...,message:""}` hoặc `{success:false,message,code}`. Lỗi Zod 400, lỗi server thông báo chung. Không coi tất cả route có schema response runtime chỉ vì đã có type.

## Next.js cùng origin hiện có

`POST /api/consultations`, `POST /api/analytics/visit`, `GET /api/media/[...path]` chuyển tiếp tới backend; `GET /api/resources/file?url=...&name=...&download=1` kiểm tra nguồn tài liệu, stream tải hoặc xem inline. Tài liệu hiện chỉ chấp nhận `/api/media/` hoặc URL nằm trong danh sách demoResources; file mới từ nguồn khác cần thiết kế tương thích. Không truyền backend credential cho browser.

Frontend `getNewsPost` có thể gọi `POST /api/public/news-preview` với token 64 hex; backend hiện **không có** endpoint này. Không quảng bá preview là chức năng đã hoàn thành.

## API admin đề xuất — v1

Base `/api/admin`; cookie session cùng origin, kiểm tra tại backend. Tất cả write kiểm tra CSRF/origin; mọi query locale chỉ vi/en; page ID phải nằm trong registry hoặc ngành động đã validate. Mọi response admin `Cache-Control: no-store`. List dùng page/limit (1..100). Envelope giữ tương thích `{success,data,message}`; thêm `code`, `fieldErrors`, `requestId` khi cần. Không trả passwordHash/tokenHash.

| Method/path | Quyền | Request | Response thành công |
|---|---|---|---|
| POST /auth/login | Anonymous, rate-limit | email,password hoặc callback SSO được xác định sau | 200 user + Set-Cookie; không raw session trong JSON |
| POST /auth/logout | Session | CSRF | 204, revoke session |
| GET /auth/me | Session | — | 200 user/role/capabilities |
| GET /pages | Editor+ | locale,page,limit | Registry + trạng thái/version, bao gồm trang đang ẩn |
| GET /pages/:id | Editor+ | locale | defaults/schema, resolved draft, published revision, version, sourceVersion |
| PUT /pages/:id/draft | Editor+ | locale,expectedVersion,sourceVersion,patch | 200 revisionId,version; 201 nếu lần đầu |
| POST /pages/:id/preview | Editor+ | locale,revisionId | 200 URL preview yêu cầu session, hết hạn ngắn; không URL public chứa nội dung nháp |
| POST /pages/:id/publish | Publisher+ | locale,revisionId,expectedVersion | 200 publishedRevisionId,version,publishedAt |
| POST /pages/:id/archive | Publisher+ | locale,expectedVersion,reason | 200 visibility=ARCHIVED; không xóa lịch sử |
| GET /pages/:id/revisions | Editor+ | locale,page,limit | Revision metadata, không tải mọi payload cùng lúc |
| POST /pages/:id/restore | Publisher+ | locale,revisionId,expectedVersion | 200 nháp mới, không tự publish |
| POST /programmes | Publisher+ | slug,locale,typed programme defaults,sourceVersion | 201 registry ngành mới ở SiteContent theo hợp đồng hiện tại; draft trước |
| GET/POST /news; GET/PUT /news/:id/draft | Editor+ | List filter hoặc typed news snapshot, expectedVersion | Danh sách hoặc revision nháp |
| POST /news/:id/publish, /archive, /restore | Publisher+ | revisionId/expectedVersion/reason tùy action | Trạng thái/version; sanitize HTML trước publish |
| GET/POST /resources; PUT /resources/:id/draft | Editor+ | categoryId,metadata,assetId,expectedVersion | Danh sách/nháp; file metadata do server xác định |
| POST /resources/:id/publish, /archive | Publisher+ | revisionId,expectedVersion | Published/archived projection |
| GET/POST/PATCH /resource-categories[/:id] | Đọc Editor+, ghi Publisher+ | name,expectedVersion khi sửa | Category; xóa chỉ Admin và không còn reference |
| GET/POST /media | Editor+ | Filter hoặc multipart file/alt | Asset metadata + trạng thái; 201 upload xong |
| DELETE /media/:id | Admin | expectedVersion hoặc precondition tương đương | 204 soft-delete; 409 nếu đang dùng |
| GET/POST/PATCH /users[/:id] | Admin | Email/role/disabled; không cho mass-assignment | User an toàn; bảo vệ admin cuối cùng |

SEO dùng cùng document draft/publish workflow với kind SEO; triển khai route `/seo/:id/draft`, `/publish` theo schema `page-seo.ts` khi đến module SEO. News/resource preview và revisions dùng cùng service và hợp đồng của page, không viết workflow thứ hai. Quyền quản lý tư vấn ngoài API pilot.

## Hợp đồng chi tiết pilot

Ví dụ cấu trúc PUT draft (giá trị minh họa đặc tả, không seed vào database):

```json
{"locale":"vi","expectedVersion":3,"sourceVersion":"<hash-defaults>","patch":{"hero.title":"<nội dung do quản trị nhập>"}}
```

`hero.title` chỉ hợp lệ nếu registry của page thực sự có path này. Unknown key trả 400 thay vì âm thầm bỏ; text ≤20000; ảnh/link dùng validator có sẵn rồi kiểm tra quyền asset; composition có schemaVersion và ID allowlist. Publish chỉ nhận revisionId đã lưu thuộc đúng document/locale; không nhận payload tùy ý để bỏ qua Save. Thực hiện CAS và transaction; retry publish cùng revision phải trả trạng thái nhất quán, không nhân đôi audit publish.

Mã lỗi: 400 VALIDATION_ERROR/INVALID_FIELD; 401 UNAUTHENTICATED; 403 FORBIDDEN/CSRF_FAILED; 404 CONTENT_NOT_FOUND; 409 VERSION_CONFLICT/SOURCE_CHANGED/ASSET_IN_USE; 413 PAYLOAD_TOO_LARGE; 415 UNSUPPORTED_MEDIA_TYPE; 429 RATE_LIMITED; 503 STORAGE_UNAVAILABLE/DATABASE_UNAVAILABLE. Response 409 chứa currentVersion và thông tin reload/merge, không tự ghi đè.

Upload: xác minh magic bytes, MIME, decoded dimensions, size, checksum; tạo key ngẫu nhiên không dùng nguyên filename; file staged không qua public media endpoint. Lỗi giữa upload/DB tạo record FAILED hoặc dọn object tạm theo tác vụ; không nhận fileSize/MIME client là sự thật. Không thêm API ghi public.
