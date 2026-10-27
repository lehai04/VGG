# Hiện trạng CMS và website VGG

## Mốc khảo sát

Git HEAD: `edd9ce0040cab5e4d1e23d49ff686628e5756ae2`. Working tree sạch trước khi tạo hồ sơ. Không sửa frontend/admin/backend, không chạy migration, seed hoặc ghi database.

Kiểm tra cổng local 3000, 3001, 4000 không thấy listener. Chưa có screenshot baseline mới hoặc xác minh dữ liệu production. Snapshot mã và hash tệp là mốc nguồn, không thay thế snapshot giao diện.

## Kiến trúc được xác nhận từ mã

| Phần | Hiện trạng | Hướng xử lý |
|---|---|---|
| Frontend | Next.js; route public, CSS/module CSS; VI/EN qua proxy | Giữ renderer, CSS và URL; chỉ thay adapter dữ liệu cần thiết |
| Admin | Next.js độc lập; API auth trực tiếp và proxy CMS | Xây trải nghiệm mới song song, chuyển từng phân hệ |
| Backend | Fastify; CMS, website, consultations | Tách service theo nghiệp vụ, không thay public contract tùy tiện |
| Database | PostgreSQL/Prisma; NewsPost, ResourceFile, SiteContent, Application, Consultation và bảng auth | Migration bổ sung trước, chưa xóa schema cũ |
| Nội dung trang | Defaults frontend + patch `cms.published.{locale}.{id}` | Snapshot nội dung đã resolve, không chỉ copy defaults |
| Ngành | Danh mục nguồn + ngành động API + hiddenIds + patch từng ngành | Chuyển đủ cả ngành động, trạng thái ẩn và nội dung mặc định |
| Preview | Token preview, kiểm tra locale/path; bản nháp tách published | Kế thừa sau kiểm thử quyền và thời hạn |
| Lịch sử | Snapshot website, restore vào draft, revision check | Mở rộng nhất quán sang tin/tài liệu; giữ media tham chiếu |
| Auth | Cookie HttpOnly, SameSite strict, opaque token băm trong DB | Tái sử dụng sau kiểm thử; không đổi session tùy tiện |
| Storage | Upload/proxy media, thư viện ảnh trong frontend/public | Giữ URL; cần kiểm kê MinIO thực tế trước chuyển |

Nguồn: `frontend/src/lib/website-content.ts`, `frontend/src/proxy.ts`, `backend/prisma/schema.prisma`, `backend/src/modules/cms/website.routes.ts`, `admin/src/lib/auth/session.ts`, `admin/src/lib/storage.ts`.

## Các khác biệt ảnh hưởng kế hoạch

1. `CmsPageSections` và `applyAdmissionsLayout` hiện cho phép reorder/hidden/added. Không được bỏ `$layout` một cách máy móc vì có thể đổi website đang hiển thị. Cần đóng băng trạng thái đã công khai rồi khóa sửa cấu trúc trong CMS mới.
2. Registry cũ liệt kê mục strategy của Discover nhưng component hiện khảo sát không render section đó. Trường có trong defaults không đồng nghĩa xuất hiện trên trang. Không tự thêm mục lên website.
3. Tin tức mặc định kết hợp bài API và demo cards nếu `VGG_DEMO_NEWS` không bằng false. Tài nguyên mặc định dùng demo resources nếu `VGG_DEMO_RESOURCES` không bằng false. Không tự tắt các cờ hoặc xóa dữ liệu được gọi là demo: có thể đó chính là nội dung người dùng đã hoàn thiện.
4. Tin tức frontend đang gửi locale vi; nhãn VI/EN ở route không chứng minh mọi dữ liệu có bản dịch. Không dịch hoặc tạo bản EN tự động trong chuyển đổi.
5. Quyền khai báo admin và quyền API sử dụng có khác biệt: cần lập ma trận từ cả seed, DB và guard. Không suy luận quyền hiệu lực chỉ từ tên vai trò.
6. Consultation có model notes/history/assignee nhưng màn hình hiện tại chủ yếu đổi trạng thái. Tái sử dụng bảng phù hợp, bổ sung luồng UI/API còn thiếu.
7. Application hiện là danh sách, không phải hệ thống xét tuyển. Giữ đúng phạm vi.

## Các mục chưa kiểm chứng

| Mục | Cách đóng trước triển khai liên quan |
|---|---|
| Override DB, layout/banner/collection đang public | Export read-only có kiểm soát; resolve với đúng defaults và locale |
| Media, tệp tải, tham chiếu lịch sử | Inventory metadata và checksum; không ghi secret vào báo cáo |
| Giao diện chuẩn | Mở đúng môi trường, chụp 1440/768/390px; ghi URL, locale, trạng thái tương tác |
| Ngành tạo từ CMS cũ | Đọc API/database đúng môi trường; thêm vào inventory ngoài 21 ngành nguồn |
| Dữ liệu tư vấn/đăng ký | Chỉ thống kê schema/số lượng cho khảo sát; không đưa PII vào tài liệu |
| Giá trị môi trường tác động nội dung | Xác nhận cờ demo/nguồn backend mà không xuất credential |

Không chạy test/build ứng dụng trong khảo sát tài liệu; không tuyên bố ứng dụng đã đạt kiểm thử. Công cụ inventory được chạy và kiểm tra đầu ra riêng.
