# Báo cáo kiểm thử CMS

## Bằng chứng kế thừa

Các vòng trước đã chạy integration PostgreSQL riêng cho auth, draft isolation, signed preview, publish, revision conflicts, collection whitelist, programme create/state, SEO và resource filter. Form chương trình đã thử browser QA save/preview/publish. Xem docs/CMS_PROGRAMME_WORKFLOW.md, CMS_VISUAL_EDITOR.md và outputs/cms-qa/.

Không diễn giải các bằng chứng đó là đã nghiệm thu menu/theme hay media delete. IAB từng không click xuyên iframe được; đã kiểm tra trực tiếp preview và một chiều Inspector → iframe. Chưa có thiết bị vật lý.

## Vòng nâng cấp hiện tại

Ngày 26/10/2026:

- Build backend, Admin và frontend: qua.
- Test frontend: 42/42; Admin: 28/28. Sau đổi tên biến trong test SEO để hết vi phạm Next lint, chạy lại 2 test SEO: qua.
- Integration PostgreSQL QA: qua. Có snapshot mỗi lần publish; snapshot không public; restore sai trang/ngôn ngữ bị từ chối; revision cũ 409; reader không có quyền update bị 403; restore chỉ đổi draft; publish sau restore tạo snapshot mới; mốc public trước nâng cấp được giữ lại. AuditLog có metadata CMS_PUBLISH/CMS_RESTORE_DRAFT.
- Browser QA: mở lịch sử trang Về Viện, đọc được hai phiên bản, author/time và nút restore. Ảnh outputs/cms-qa/version-history.png. Chưa tự động click hộp xác nhận restore; nghiệp vụ này được xác minh qua integration API.
- Lint frontend đầy đủ: qua sau sửa biến `module` trong tests/page-seo.test.mjs. Lint các component CMS mới: qua.
- Lint Admin toàn workspace chưa qua: 10 lỗi/6 cảnh báo ở LoginForm, PasswordChecklistInput, ValidatedInput, RealtimeDashboard, SettingsManager và cảnh báo ảnh trong NewsPostModal. Các file đó không được sửa trong module history/builder này; không tuyên bố full lint xanh.
- Gesture kéo thả native/duplicate mới có code nhưng chưa nghiệm thu qua browser; không đánh dấu module builder hoàn thành.
- Chưa kiểm tra menu/theme/asset delete và thiết bị vật lý. Không có test production/SSO/email/backup production.
- QA chạy DB và bucket riêng, đã dọn. Không tự publish nội dung thật, không deploy.
