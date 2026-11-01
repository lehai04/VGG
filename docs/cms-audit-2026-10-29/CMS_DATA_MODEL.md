# Mô hình dữ liệu dự kiến

Phân biệt rõ bảng đang có và thiết kế mới; chưa chạy DDL/migration.

## Bảng hiện có — nguồn `backend/prisma/schema.prisma`

| Model | Khóa/ràng buộc đáng chú ý | Tái sử dụng |
|---|---|---|
| SiteContent | id; key unique; locale; section/page; value JSON; published boolean; index(section,page,locale) | Snapshot trang, chrome, messages, SEO; ngành động và trạng thái ngành |
| NewsPost | slug unique toàn bảng; locale; content String; SEO; ContentStatus; publishedAt; index(status,publishedAt), (category,status,publishedAt) | Bài viết và dự án/công bố qua category đã có |
| ResourceFile | slug unique; categoryId FK Restrict; file URL/name/type/size; loại tài liệu; status mặc định PUBLISHED | Tài liệu; khi tạo từ CMS phải chủ động DRAFT |
| ResourceCategory | name unique; quan hệ ResourceFile | Chuyên mục tài liệu |
| Consultation | PII, chương trình quan tâm, trạng thái, timestamps | Giữ phạm vi tư vấn riêng |
| ConsultationHistory | FK consultation Cascade; action/status/metadata | Lịch sử tư vấn, không phải audit CMS |
| PageVisit | path, locale, visitorId, createdAt; index thời gian/path | Analytics hiện có |

ContentStatus = DRAFT/PUBLISHED/ARCHIVED. Chưa có trạng thái review. SiteContent key unique khiến locale phải có trong namespace; NewsPost/ResourceFile slug unique chưa cho hai bản dịch cùng slug. Giữ nguyên constraint ở pilot; nếu đổi sang unique(locale,slug) phải sửa endpoint detail, canonical và redirect cùng migration, không chỉ thay schema.

## Bổ sung đề xuất

| Model mới | Trường chính | Ràng buộc/quan hệ |
|---|---|---|
| CmsUser (nếu không dùng SSO thay thế) | id, normalizedEmail, passwordHash nullable khi SSO, externalSubject nullable, role, disabledAt, createdAt | Email unique; role EDITOR/PUBLISHER/ADMIN; không xóa cứng tác giả lịch sử |
| CmsSession | id, tokenHash, userId, expiresAt, revokedAt | TokenHash unique, FK user, index expiresAt; không lưu raw token |
| ContentDocument | id, kind, contentId, locale, version Int, draftRevisionId?, publishedRevisionId?, visibility, sourceVersion | unique(kind,contentId,locale); pointer revision phải cùng document; visibility VISIBLE/HIDDEN/ARCHIVED |
| ContentRevision | id, documentId, sequence, schemaVersion, payload JSON, createdBy, createdAt, reason? | unique(documentId,sequence), FK document/user; immutable; payload tùy kind và được Zod validate |
| ContentAuditEvent | id, documentId?, actorId, action, revisionId?, createdAt, requestId, metadata giới hạn | Index(documentId,createdAt); không ghi secrets hoặc toàn bộ PII |
| MediaAsset | id, storageKey, state, mimeType, byteSize, sha256, width?, height?, originalName, alt?, createdBy, createdAt, deletedAt? | storageKey unique; STAGED/READY/PUBLISHED/DELETED; private staging |
| ContentAssetReference | revisionId, assetId, fieldPath | unique(revisionId,assetId,fieldPath), FK Restrict bảo vệ tài sản đang dùng |

ContentDocument là workflow metadata, không thay bảng business đang có. kind đề xuất PAGE/NEWS/RESOURCE/SEO; chrome và messages thuộc PAGE. Không tạo bảng Section riêng khi composition JSON đã đáp ứng. Không thêm bảng Programme trước khi có nhu cầu vượt khả năng hợp đồng đang dùng.

Payload PAGE giữ patch, layout, collections theo schemaVersion; projection tương thích vẫn serialize `$layout`/`$banner` theo parser hiện tại. NEWS/RESOURCE payload là snapshot typed các trường được phép, khi publish cập nhật bảng hiện có. SEO dùng JSON typed tương ứng `page-seo.ts`. `sourceVersion` là hash defaults để phát hiện thay đổi cấu trúc/array index; không tự áp nháp cũ lên defaults mới.

## Nhất quán và vòng đời

1. Import snapshot hiện tại thành revision đầu tiên, đánh dấu nguồn import; không tạo nội dung mới từ ví dụ.
2. Save dùng compare-and-swap `version = expectedVersion`, tạo revision rồi tăng version trong transaction; thất bại trả 409.
3. Publish chọn revision đã lưu và đúng version, kiểm tra schema/assets; cập nhật projection public, pointer và audit trong một transaction.
4. Draft không đặt `published=true`; public chỉ đọc projection. Preview kiểm tra quyền và đọc revision riêng.
5. Archive ghi trạng thái riêng và giữ revision; public resolver cần tôn trọng tombstone kể cả bản có defaults. Xóa snapshot đơn thuần không đủ.
6. Restore revision cũ tạo revision mới, không sửa lịch sử. Dọn asset theo reference của mọi revision còn giữ, có thời gian chờ và audit.

## Migration, backfill, rollback

- Trước migration: backup và restore thử, đối chiếu schema live với migration `20261028000000_public_foundation`, kiểm tra unique key/locale, media, record counts; không suy diễn database live từ dump cũ.
- Migration additive: thêm bảng/FK/index, không rename/drop bảng hiện có; application reader cũ tiếp tục dùng snapshot.
- Backfill bằng script riêng có dry-run, transaction theo lô, log mapping/checksum, chạy lại không nhân đôi; nhập **giá trị published đang vận hành**, không tự chạy `seed-public.ts`.
- Đối chiếu defaults JSON và source hiện tại trước import; lưu sourceVersion; trường không còn tồn tại đưa vào báo cáo xử lý thủ công.
- Bật CMS trên staging, kiểm tra permission/concurrency/rollback rồi mới phát hành. Nếu migration lỗi, dừng và giữ bản app cũ.
- Rollback app giữ bảng mới để không mất nháp/audit. Nếu cần rollback dữ liệu, restore DB và media theo cùng mốc đã diễn tập; không tự chạy SQL drop. Migration down cụ thể chỉ viết khi schema implementation được chốt.
