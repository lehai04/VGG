# Sổ rủi ro và thông tin cần xác minh

Đánh giá định tính theo source ngày 29/10/2026. “Cao” là ưu tiên xử lý trước mở chức năng liên quan, không khẳng định đã bị khai thác. Chủ trì là vai trò đề xuất, chưa gán nhân sự.

| ID | Bằng chứng / rủi ro | Ảnh hưởng / khả năng | Kiểm soát và cách xác minh | Chủ trì / thời điểm |
|---|---|---|---|---|
| R01 | Working tree có nhiều thay đổi staged/unstaged; outputs có bản source khác | Cao / cao: đánh giá nhầm release, ghi đè công việc | Chốt release/source manifest; giữ nguyên thay đổi hiện tại; inventory riêng staging | Tech lead / bước 1 |
| R02 | Không có auth/User/Session/admin API | Cao / chắc chắn thiếu: mở write không bảo vệ | Session/SSO, RBAC/CSRF, test 401/403 trước bất kỳ endpoint ghi | Backend / bước 3 |
| R03 | `seed-public.ts` import demoNewsPosts/demoResources không phụ thuộc cờ frontend | Cao / có điều kiện chạy seed: đưa nội dung chưa duyệt vào DB | Không chạy seed khi khảo sát; audit nguồn nội dung, import được duyệt riêng; xem CI/Compose migrate command | Content owner + IT / bước 1 |
| R04 | News `dangerouslySetInnerHTML`, không thấy sanitize chung ở read path | Cao / khi mở biên tập tin: stored XSS | Sanitizer/renderer allowlist phía server và render, test bypass; giữ route ẩn đến khi đạt | Backend/FE / trước news |
| R05 | Public media đọc object bất kỳ trong bucket theo key | Cao / nếu đặt draft vào cùng kho public: lộ tài liệu | Staging riêng không qua endpoint public; asset state/ref check, test anonymous | Backend / pilot media |
| R06 | SiteContent boolean; không revision/CAS | Cao / khi sửa trực tiếp: mất nháp hoặc ghi đè | Workflow document/revision, transaction projection, version conflict | Backend / bước 2–3 |
| R07 | `website-content.ts` fallback defaults khi API lỗi | Cao / backend lỗi: nội dung cũ/ngành ẩn có thể trở lại | Tombstone và policy last-good/fail-closed; test outage với nội dung đã archive | Backend/FE / pilot |
| R08 | JSON defaults và TS defaults có nguồn song song | Cao / cao: patch che nội dung mới hoặc sai array index | Hash/sourceVersion, diff fields trước backfill, migration patch khi đổi cấu trúc | Content/FE / bước 1, mỗi module |
| R09 | Locale: news list cố định vi; programme API không lọc locale; slug unique toàn bảng | Vừa / cao khi làm EN: sai ngôn ngữ/collision | Quy ước content identity; test VI/EN; đổi API/schema có migration nếu cần | Backend/FE / bước 6 |
| R10 | `public-sections.ts` + layout chặn news/student-success | Vừa / chắc chắn: publish vẫn không thấy trang | Hiển thị trạng thái route ẩn trong admin; không tự mở; xác nhận nội dung đầy đủ trước thay flag | Content owner / bước 6 |
| R11 | Preview caller tồn tại nhưng backend thiếu endpoint | Vừa / chắc chắn khi gọi: preview không chạy | Session-bound preview cùng renderer; no-store/noindex; test draft không lộ | FE/Backend / pilot |
| R12 | Template admissions dùng offset slots | Cao / khi template đổi: sửa sai vị trí hoặc vỡ HTML | Version template + kiểm tra inventory, tests escape và form sau chỉnh sửa | FE / admissions |
| R13 | Root layout có public providers/analytics/sticky; proxy locale mọi page | Vừa / cao khi thêm admin: route/chrome không đúng | Tách boundary có baseline; test admin không tracker, public DOM giữ nguyên | FE / bước 4 |
| R14 | Node shell 24.19.0 khác .nvmrc/engines 26.12.1 | Vừa / có thể: build/deploy lệch | Dùng runtime đã khai báo, kiểm tra lockfile; không tự nâng/hạ version | IT / trước build |
| R15 | trustProxy true, visits không rate-limit riêng | Vừa / phụ thuộc mạng: spoof IP, spam DB | Giới hạn backend chỉ proxy tin cậy; rate-limit endpoint ghi, retention analytics | IT/Backend / bước 7 |
| R16 | no-store toàn bộ SiteContent mỗi request; SEO fetch riêng | Vừa / tăng tải khi content lớn | Đo query/payload, cache theo revision hoặc fetch theo page sau benchmark; tránh cache draft | Backend/FE / bước 8 |
| R17 | ResearchHighlights cache 60s, lọc nghiên cứu từ trang tin đầu, fallback hardcode | Vừa / cao khi đăng nhiều tin: thiếu nghiên cứu, publish chậm | Query đúng category/pagination, invalidation, fallback được duyệt; test >30 tin | FE/Backend / research |
| R18 | File proxy allowlist gồm demoResources và /api/media | Vừa / khi tài liệu mới dùng URL khác: tải thất bại | Dùng asset ID/key chuẩn; test inline/download, không mở arbitrary URL fetch | Backend/FE / resources |
| R19 | Chưa kiểm tra DB live, schema drift và restore | Cao / chưa biết: mất dữ liệu khi deploy | Clone staging, kiểm tra migration, backup + restore DB/media cùng mốc | IT / trước migration |
| R20 | Consultation chứa PII; Content CMS không có nhu cầu đọc PII | Cao / nếu gộp quyền hoặc đưa vào log/export | Tách quyền tư vấn, giới hạn log/export và test dữ liệu public không có PII | Backend/IT / mọi bước |
| R21 | Asset mới và DB không chung transaction | Vừa / upload/publish lỗi: broken image/object rác | Stage, verify, promote trước commit; immutable key, retry idempotent, cleanup theo ref | Backend / pilot |
| R22 | Design docs có thể lạc hậu so với CSS đang sửa | Vừa / cao: vô tình đổi typography/layout | Source CSS và ảnh staging làm baseline; không áp lại thông số tài liệu cũ máy móc | FE / bước 1 và 4 |

## Thông tin chưa xác định và cách làm rõ

| Thông tin | Cách xác minh |
|---|---|
| URL/release production và DB authoritative | IT cung cấp deployment identity; đối chiếu source hash + schema read-only trên staging |
| Tài khoản/SSO ngoài repository | Xác nhận với vận hành; nếu có adapter SSO thì tái dùng, chưa cài auth library trước quyết định |
| Nội dung demo có được duyệt làm dữ liệu thật không | Content owner rà từng tin/PDF/nguồn; không suy ra chỉ từ tên file |
| Vai trò duyệt, nhu cầu chờ duyệt và người mở lại news/student-success | Xác nhận nghiệp vụ; giữ ba vai trò đề xuất và trạng thái hiện tại đến khi chốt |
| Dung lượng media, retention, ngân sách, RPO/RTO | Đo storage/tần suất cập nhật và xác nhận IT; chưa có căn cứ báo giá |
| Giao diện và tính sẵn sàng runtime | Khởi chạy staging từ đúng release, render đủ route/locale, kiểm tra DB và browser; hiện chưa kiểm chứng |

## Trạng thái cuối khảo sát

Đã hoàn thành tám tài liệu và kiểm thử frontend hiện có 45/45. Chưa thực hiện migration, backfill, xây CMS, upload, seed, sửa env, deploy, kiểm thử browser hay kiểm chứng database live. Các rủi ro trên được ghi nhận để triển khai, chưa được coi là đã khắc phục.
