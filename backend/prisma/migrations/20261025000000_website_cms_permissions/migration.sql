-- Add CMS capabilities without granting publishing to existing editors.
INSERT INTO "permissions" ("id", "code", "description") VALUES
('cms-website-view', 'website.view', 'Xem trang và bản nháp website'),
('cms-website-update', 'website.update', 'Chỉnh sửa bản nháp website'),
('cms-website-publish', 'website.publish', 'Xuất bản nội dung website'),
('cms-media-view', 'media.view', 'Xem thư viện media'),
('cms-media-upload', 'media.upload', 'Tải media lên thư viện')
ON CONFLICT ("code") DO NOTHING;
INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT r.id, p.id FROM roles r CROSS JOIN permissions p
WHERE r.code = 'SUPER_ADMIN' AND p.code IN ('website.view','website.update','website.publish','media.view','media.upload')
ON CONFLICT DO NOTHING;
