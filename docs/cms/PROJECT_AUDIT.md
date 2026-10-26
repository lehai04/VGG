# Khảo sát dự án VGG — 26/10/2026

## Kiến trúc và công nghệ đã xác minh

Monorepo npm workspaces: frontend, admin, backend; phiên bản ứng dụng 1.0.2. Frontend/Admin dùng Next.js 16.3.1 và React 19.2.8, TypeScript. Backend là Fastify 5.12.x, không phải Go/Gin; Prisma 7.9.1, PostgreSQL qua pg. MinIO là kho media hiện có. Zod 4.4.x validate dữ liệu; Argon2 và cookie/session phục vụ đăng nhập.

## Cấu trúc và nguồn dữ liệu

- Public routes nằm ở frontend/src/app/(public): discover, programmes, admissions, research, student-success, news, resources và các trang chi tiết. frontend/src/lib/website-content.ts đọc dữ liệu runtime bằng no-store; nguồn TypeScript/JSON là fallback cho nội dung chưa quản trị.
- Admin dùng admin/src/app/admin/(protected), có dashboard, users, news, resources, consultations, notifications, settings, website, programmes, guide.
- Backend modules auth, admins, cms, consultations; API CMS chính nằm ở cms.routes.ts và website.routes.ts.
- Prisma models hiện có: Admin, Session, Role, Permission, RolePermission, NewsPost, ResourceFile, ResourceCategory, SiteContent, AuditLog, PageVisit, Application, Consultation/Note/History, PasswordResetToken.
- SiteContent Json chứa các bản cms-draft/cms-published, metadata chương trình, SEO, preview tạm và cấu hình; có author/updatedAt. Không cần database xác thực thứ hai.

## Các thành phần tái sử dụng

VisualWebsiteManager/WebsiteManager, CmsVisualBridge (chỉ preview có xác thực), DevicePreview, VisualStructureEditor, VisualCollectionEditor, CurriculumEditor, RichTextEditor, VisualImagePicker, SeoEditor. Trang ngành dùng ProgrammeDetailPage và route động programmes/[slug]; programme-template.json chứa dữ liệu mặc định, không phải bộ component sao chép cho mỗi ngành.

Layout/header/footer dùng component hiện có; chromeContent và WebsiteChromeProvider nối các trường dùng chung. Media upload qua API Next của Admin, kiểm tra chữ ký file và đưa vào MinIO. PDF tài nguyên tối đa 100 MB; ảnh editor tối đa 8 MB. Quyền được kiểm tra lại ở backend, không chỉ ẩn nút.

## Nội dung còn ở source / ranh giới quản trị

Các file frontend/src/data/programmes/*, curricula.ts, site.ts, catalogue-copy/config, shared-content, discover-introduction/media và dữ liệu home/research/student-success chứa fallback/layout labels. CMS chỉ ghi đè trường whitelist và collection có schema. Không phải tất cả chuỗi ở mọi component đều chỉnh sửa được; menu phân cấp, theme token, lifecycle trang chung và quản lý media metadata/xóa an toàn chưa đủ thành một module hoàn chỉnh. Thư viện ảnh hiện không phải hệ quản trị asset có quan hệ tham chiếu riêng.

## Git và baseline

Trước vòng nâng cấp này có thay đổi chưa commit ở ProgrammeCreator/Manager, VisualCollectionEditor, styles Admin, programme-manager/website.routes, integration test, docs và các file form mới. Giữ nguyên, không reset/stash/checkout. Scripts root có dev/dev:admin/dev:backend, typecheck, lint, test, build frontend/Admin/backend. Next yêu cầu đọc hướng dẫn phiên bản cài trong node_modules trước khi sửa.

## Rủi ro / giả định

- JSON whitelist có cơ chế fallback nhưng chưa có schemaVersion ở tất cả block; cần tương thích ngược.
- Chưa có lịch sử xuất bản bền vững cho trang; upsert bản public hiện thay thế snapshot trước.
- Không thể khẳng định mọi nội dung public đã nối CMS; phải kiểm tra từng module.
- Không dùng credential production để kiểm thử; scripts/test-cms-integration.mjs tạo PostgreSQL QA riêng và tự dọn. Kết quả chi tiết ghi tại CMS_TEST_REPORT.md.
- SSO/email/backup production và thiết bị vật lý chưa được xác minh trong audit này.
- Giá trị secret của DATABASE_URL, storage keys và session không được ghi vào tài liệu/log.
