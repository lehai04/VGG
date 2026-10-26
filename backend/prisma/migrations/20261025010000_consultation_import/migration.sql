INSERT INTO permissions (id,code,description) VALUES ('cms-consultations-import','consultations.import','Nhập danh sách tư vấn từ Excel') ON CONFLICT (code) DO NOTHING;
INSERT INTO role_permissions (role_id,permission_id) SELECT r.id,p.id FROM roles r CROSS JOIN permissions p WHERE r.code='SUPER_ADMIN' AND p.code='consultations.import' ON CONFLICT DO NOTHING;
