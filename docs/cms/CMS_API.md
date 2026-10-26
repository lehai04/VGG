# API CMS

Admin Next proxy `/api/cms/*` → backend `/api/admin/*`; giữ cookie server-side và kiểm tra trusted origin cho mutation. Backend authenticateRequest + quyền, từ chối mustChangePassword. Public routes không đọc draft.

## API hiện có

| Route backend | Chức năng | Quyền |
|---|---|---|
| GET /api/admin/website/pages | Danh sách trang/ngành và trạng thái | website.view |
| GET/PUT/DELETE /api/admin/website/page | Đọc, lưu hoặc bỏ draft bằng revision | website.view/update |
| PATCH /api/admin/website/section | Chỉ thay nhóm được chọn | website.update |
| POST /api/admin/website/editor-session | Preview nội dung chưa lưu, có channel/origin | website.update |
| POST /api/admin/website/preview | URL preview bản nháp có thời hạn | website.view |
| POST /api/admin/website/publish | Public bản nháp đúng revision | website.publish |
| POST /api/admin/website/programmes | Tạo ngành và draft ban đầu trong transaction | website.update |
| POST /api/admin/website/programmes/state | hide/archive/restore ngành | website.publish |
| GET /api/public/website/programmes | Ngành đã public và hiddenIds | Public |
| POST /api/public/website/preview | Resolve token preview tạm | Token bí mật |
| GET /api/public/site-content | Nội dung published theo locale | Public |
| GET/PUT /api/admin/website/seo | SEO nháp có revision | website.view/update |
| POST /api/admin/website/seo/publish | Áp dụng SEO riêng | website.publish |
| GET /api/admin/website/media | Thư viện ảnh hiện có | media.upload |

Upload ảnh/video/resource dùng các route Next `/api/cms/upload-image`, upload-video, upload-resource, kiểm tra MIME/chữ ký/giới hạn rồi lưu MinIO. News/resources/categories/settings/audit có API riêng trong cms.routes.ts, không dựng lại.

## History bổ sung

- GET `/api/admin/website/history?id=<id>&locale=vi&page=1`: metadata snapshot (author/time/schemaVersion), phân trang, website.view.
- POST `/api/admin/website/history/restore`: `{id,locale,versionId,revision}`; website.update. revision là draft hiện tại hoặc null. Trả draft revision mới; chỉ tạo/thay draft.
- Public không được đọc cms-version. Snapshot sai schema/khác page/locale bị từ chối. Xung đột revision trả 409; dữ liệu không hợp lệ 400/422; không đăng nhập 401, thiếu quyền 403.

Menu/theme và asset delete API chuyên biệt chưa công bố là đã có; xem checklist trước khi tích hợp client.
