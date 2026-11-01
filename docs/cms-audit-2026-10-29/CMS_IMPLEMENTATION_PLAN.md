# Kế hoạch triển khai CMS

Lần khảo sát này dừng ở tài liệu; chưa sửa source. Mỗi bước triển khai sau phải bắt đầu từ working tree/release đã xác định vì hiện có nhiều thay đổi chưa commit. Các đường dẫn mới dưới đây là dự kiến, không phải file đã tồn tại. Không ước lượng lịch giao hàng khi chưa xác nhận nhân lực và môi trường.

## 1. Chốt baseline và tài liệu

- Mục tiêu: biết chính xác nội dung và release cần bảo toàn.
- Phạm vi: đối chiếu tám tài liệu này với staging, inventory DOM/field, diff defaults JSON–TS, review dữ liệu seed, chốt vai trò/SSO, RPO/RTO; đo ảnh desktop/mobile VI/EN.
- File: `docs/cms-audit-2026-10-29/*.md`, sau đó bổ sung baseline trong thư mục bằng chứng riêng.
- Phụ thuộc: staging cô lập và bản sao dữ liệu đã xử lý PII; runtime phù hợp `.nvmrc`.
- Nghiệm thu: route/section/field có nguồn và trạng thái; biết trang nào cố ý ẩn; xác nhận backup và release ID.
- Rủi ro/xử lý: source khác production → giữ hai inventory riêng, không dùng tài liệu cũ làm chứng cứ chạy hiện tại.

## 2. Thiết kế schema/API và migration thử

- Mục tiêu: revision và projection public tương thích, không mất dữ liệu.
- Phạm vi: schema typed, optimistic concurrency, migration additive, backfill dry-run từ nội dung published thật, kiểm tra rollback.
- File: `backend/prisma/schema.prisma`, migration mới `backend/prisma/migrations/<timestamp>_cms_foundation/migration.sql`; dự kiến `backend/src/modules/cms/{schemas,repository}.ts`, `scripts/cms-backfill.mjs`, tests backend mới.
- Phụ thuộc: bước 1, snapshot DB/media, API spec được rà soát.
- Nghiệm thu: migrate trên clone; checksum public không đổi; backfill chạy lại không nhân đôi; app cũ đọc được; rollback app không mất revision.
- Rủi ro/xử lý: unique slug/locale và defaults lệch → báo cáo xung đột trước khi ghi, chưa thay unique index ở pilot.

## 3. Nền tảng bảo vệ và workflow

- Mục tiêu: mọi thao tác ghi được xác thực, kiểm tra quyền và lưu vết.
- Phạm vi: auth/session hoặc SSO đã chọn, CSRF, RBAC, draft/revision/publish/restore, media staging tối thiểu.
- File dự kiến: `backend/src/modules/auth/*`, `backend/src/modules/cms/*`, `backend/src/modules/media/*`; chỉnh `backend/src/app.ts`, `backend/src/shared/storage/minio.ts`; package manifests/lock chỉ khi dependency đã chọn.
- Phụ thuộc: bước 2, cách cấp tài khoản và storage được xác nhận.
- Nghiệm thu: 401/403/CSRF, login rate-limit, version conflict, atomic publish, draft asset không đọc công khai; không có user mặc định.
- Rủi ro/xử lý: bypass quyền qua proxy hoặc raw API → test cả hai đường; storage không transaction → prepare trước commit và cleanup sau.

## 4. Giao diện admin tối thiểu

- Mục tiêu: biên tập được bằng form dễ dùng và nhận diện hiện tại.
- Phạm vi: login, danh sách trang/locale, editor theo field, Save/Hủy, diff, Preview, Publish, upload ảnh; click vào ô text, keyboard và trạng thái lỗi/dirty.
- File dự kiến: `frontend/src/app/admin/*`, `frontend/src/features/cms/*`, `frontend/src/app/api/admin/[...path]/route.ts`; chỉnh `frontend/src/proxy.ts`, `frontend/src/app/layout.tsx`; thêm layout public nếu cần.
- Phụ thuộc: bước 3 và CSS/tokens đã đối chiếu. Đọc hướng dẫn Next local theo `frontend/AGENTS.md` trước viết code.
- Nghiệm thu: responsive, focus/label, view/edit/save/publish tách biệt; public không đổi markup/style; admin không gắn analytics và StickyActions public.
- Rủi ro/xử lý: refactor root gây hồi quy → kiểm tra ảnh và DOM trước/sau trên tất cả nhóm trang.

## 5. Luồng hoàn chỉnh pilot: nội dung trang chủ

- Mục tiêu: chỉnh sửa → lưu → xem trước → xuất bản → hiển thị đúng.
- Phạm vi: một field text và ảnh có thật trong hero của home; giữ reader/projection namespace cũ; cập nhật resolver preview riêng; lịch sử và rollback.
- File: `frontend/src/lib/website-content.ts`, `frontend/src/features/home/components/Hero.tsx` chỉ khi cần hỗ trợ preview; các module cms/auth/media mới; route preview dự kiến `frontend/src/app/admin/preview/*`; tests integration/E2E mới.
- Phụ thuộc: bước 2–4; baseline, dữ liệu thật, storage staging.
- Nghiệm thu tuần tự: (1) Editor đăng nhập; (2) sửa và Save; (3) public giữ bản cũ; (4) Preview hiện nháp bằng renderer thật; (5) Editor publish bị 403; (6) Publisher publish thành công; (7) request public kế tiếp thấy bản mới; (8) restart vẫn giữ; (9) restore tạo nháp rồi publish bản cũ; (10) ảnh và typography không thay ngoài nội dung được sửa. Thử đồng thời hai editor phải có 409.
- Rủi ro/xử lý: fallback source che lỗi → bật quan sát fallback, test backend lỗi và không tuyên bố thành công khi chỉ thấy defaults.

## 6. Mở rộng từng module

- Mục tiêu: phủ nội dung có thật, tái dùng workflow.
- Thứ tự: chrome/messages/SEO → discover → catalogue và 21 ngành → admissions → research → resources → news/student-success khi được xác nhận mở lại.
- File: `backend/src/modules/content/{visual-model.ts,page-defaults.json,content-patch.ts}`, module cms; `frontend/src/features/{discover,programmes,admissions,research,resources,news,student-success}/*`, `frontend/src/data/*`, `frontend/src/lib/page-seo.ts`, public routes/API có liên quan.
- Phụ thuộc: pilot đạt; mapping field từng module, kiểm duyệt tài liệu/ảnh.
- Nghiệm thu: mỗi module có test nháp/publish/restore; 21 ngành không rò nội dung qua nhau; admissions slot đúng template; tài liệu tải đúng; news HTML an toàn. Không tự thay trạng thái public-sections.
- Rủi ro/xử lý: admissions dùng offset HTML, nghiên cứu cache 60 giây và lọc từ trang tin đầu → cập nhật mapping theo template version, query category đúng và invalidation khi publish; giữ cache contract nhất quán.

## 7. Rà soát quyền, validation và lỗi toàn hệ thống

- Mục tiêu: đóng khoảng trống còn lại trước phát hành; kiểm tra bảo vệ đã làm từ bước 3, không trì hoãn bảo mật đến cuối.
- File: module auth/cms/media, `backend/src/modules/public/public.routes.ts`, `frontend/src/shared/components/ContentRichText.tsx`, trang tin, tests.
- Phụ thuộc: các module đã tích hợp.
- Nghiệm thu: stored XSS, IDOR, CSRF, path traversal, MIME giả, file quá lớn, draft exposure, mất kết nối DB/storage, xóa asset đang dùng và double-submit có test đúng kết quả.
- Rủi ro/xử lý: HTML tin có renderer riêng → dùng chung chính sách sanitize/allowlist và test payload thực tế, không chỉ test component khác.

## 8. Kiểm thử hồi quy và triển khai staging

- Mục tiêu: chứng minh toàn bộ luồng chứ không chỉ build thành công.
- File: `frontend/tests/*`, `backend/tests/*`, `scripts/smoke-public.mjs`, bộ E2E/baseline mới; cấu hình CI chỉ thay khi đã đánh giá.
- Phụ thuộc: Node đúng version, DB clone, media clone và không dùng PII production trong test.
- Nghiệm thu: lint/typecheck/build/test; E2E auth→edit→publish→DB→public; VI/EN, route ẩn, redirect, SEO, PDF, consultation, mobile menu, keyboard, reduced motion; không regression hình ảnh ngoài thay đổi nội dung chủ động; đo p95/payload.
- Rủi ro/xử lý: tests source-only bỏ sót runtime → dùng browser và DB assertions; lỗi cũ tách khỏi lỗi mới có bằng chứng.

## 9. Bàn giao và phát hành có kiểm soát

- Mục tiêu: vận hành tự quản trị và khôi phục được.
- File: cập nhật `HANDOVER.md`, tài liệu CMS sử dụng/vận hành mới, runbook backup/restore; `deploy/*` chỉ thay theo phương án thực tế đã chốt.
- Phụ thuộc: UAT, IT xác nhận cấu hình/SSO/storage, backup đã restore thử.
- Nghiệm thu: hướng dẫn editor/publisher/admin; migrate/deploy/rollback có checklist; backup DB/media khôi phục trên môi trường sạch; thông tin tài khoản bàn giao ngoài repo; cảnh báo lỗi hoạt động.
- Rủi ro/xử lý: CI/seed ghi dữ liệu ngoài ý muốn → tách migration và import nội dung được duyệt; không tự chạy seed demo trong production.

## Điểm bắt đầu khuyến nghị

Thực hiện bước 1 trước để hoàn thiện phần kiểm chứng runtime còn thiếu, rồi triển khai liên tục bước 2–5 thành pilot home. Không làm toàn bộ giao diện quản trị cho mọi module trước khi chứng minh luồng publish. Bộ tài liệu lần này đã hoàn thành khảo sát source; chưa phải nghiệm thu CMS.
