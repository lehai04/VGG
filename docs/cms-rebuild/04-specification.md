# Đặc tả CMS mới đề xuất

## Phạm vi

Xây lại UX quản trị và các service cần thiết trên stack hiện có. Không thiết kế lại public website, không page builder tự do, không AI viết/dịch, email/SMS automation, hệ thống xét tuyển/thu phí hoặc CRM bên ngoài.

Các màn hình: Tổng quan công việc; Nội dung website; Chuyên ngành; Tin tức; Media; Tài liệu; Yêu cầu tư vấn; Danh sách đăng ký; Tài khoản/quyền; Nhật ký/cấu hình. Menu theo quyền, bảng có bộ lọc và phân trang server; lỗi ở trường, loading/empty/retry rõ ràng. Không có search/nút giả.

## Mô hình dữ liệu đề xuất để thảo luận

| Khái niệm | Trường và trách nhiệm | Chuyển từ hiện tại |
|---|---|---|
| ContentItem | ID, type, slug ổn định, templateKey/version, owner, translationGroup | NewsPost và các SiteContent document |
| ContentRevision | itemId, locale, revisionNumber, payload, author, createdAt, checksum | Draft/snapshot hiện có; payload có schema theo loại |
| Publication | itemId, locale, publishedRevisionId, publishedAt, visibility | Published hiện tại, tách khỏi draft |
| EditorialTask | revisionId, state, submitter, reviewer, feedback, timestamps | Bổ sung workflow; quyết định duyệt gắn revision cụ thể |
| PublicationSchedule | revisionId, dueAt UTC, displayTimezone, state, idempotencyKey | Bổ sung hẹn giờ; worker + kiểm tra visibility ở public API |
| MediaAsset và MediaUsage | stable URL/key, MIME, size, checksum, alt; revision/field tham chiếu | Inventory static + storage; giữ reference lịch sử |
| ResourceVersion | resourceId, assetId, hiệu lực, supersededBy | ResourceFile, giữ đường tải và phiên bản cũ |
| Consultation | Giữ bảng hiện có; tách processingStatus/outcome, assignee, nextContactAt | Không mất note/history; map trạng thái cũ có bảng rõ ràng |
| Application | Giữ schema và metadata hiện tại | Chỉ thêm truy vấn list/detail theo quyền |
| RBAC và Audit | Quyền hành động/phạm vi; actor, target, revision, operation, timestamp | Giữ account ID, role mapping và audit cũ |

Đây là mô hình logic, chưa là migration được duyệt. Cần tránh lưu hai nguồn canonical cùng lúc: adapter đọc v2 sau cutover; legacy chỉ đọc. Duy trì public response shape để không đổi renderer.

## Hai trục trạng thái

Biên tập: DRAFT → IN_REVIEW → APPROVED hoặc CHANGES_REQUESTED. Xuất bản: UNPUBLISHED / SCHEDULED / LIVE / WITHDRAWN. Trạng thái thùng rác riêng, không xóa revision.

- Sửa nội dung đã duyệt tạo revision mới và làm quyết định duyệt trước đó không áp dụng cho revision mới.
- LIVE có thể đồng thời có DRAFT mới. Public chỉ đọc publishedRevisionId.
- Schedule phải trỏ revision đã duyệt. Hủy lịch hoặc gỡ công khai phải vô hiệu job tương ứng; worker idempotent.
- Public list, detail, search và cache đều không trả nội dung chưa tới giờ. Lịch chạy muộn phải được phát hiện và retry; không dựa duy nhất vào UI.
- Autosave được phép thiếu trường; publish validation theo template. Ghi có revision guard và giao dịch nguyên tử cho publish/audit.
- Restore tạo draft từ revision cũ, kiểm tra media còn tồn tại và cảnh báo tệp thiếu.

## Ma trận quyền đề xuất

| Hành động | Quản trị hệ thống | Quản lý nội dung | Biên tập viên | Tuyển sinh |
|---|---|---|---|---|
| Đọc nội dung quản trị | Có | Có | Trong phạm vi được giao | Chỉ phần cần thiết được cấp |
| Tạo/sửa draft | Có | Có | Của mình/được giao | Không mặc định |
| Gửi duyệt | Có | Có | Có trong phạm vi | Không |
| Duyệt/yêu cầu sửa | Có | Có | Không | Không |
| Xuất bản/hẹn giờ/gỡ | Có | Có | Không | Không |
| Media upload | Có | Có | Có; xóa cần quyền riêng | Tài liệu theo quyền được cấp |
| Khôi phục nội dung | Có | Có | Draft được giao nếu cấp quyền | Không |
| Xóa vĩnh viễn | Quyền riêng; kiểm tra tham chiếu | Không mặc định | Không | Không |
| Tư vấn/ghi chú | Có | Không mặc định | Không | Hồ sơ được giao |
| Phân công/xuất dữ liệu tuyển sinh | Quyền riêng | Không | Không | Chỉ người có quyền bổ sung |
| Tài khoản/quyền/cấu hình | Có | Không | Không | Không |
| Audit | Toàn hệ thống | Nội dung | Lịch sử nội dung được giao | Lịch sử tư vấn được giao |

Một tài khoản có thể nhận nhiều nhóm quyền nếu được duyệt; schema Admin hiện một roleId nên cần quyết định migration thay vì giả định đã hỗ trợ. API kiểm tra quyền và object scope, deny by default. Không tự nâng quyền tài khoản khi chuyển hệ thống.

## Các contract cần giữ

- Nội dung: read public trả đúng shape mà website đang dùng; preview có token ngắn hạn và kiểm tra quyền/locale/path.
- Danh sách: query, filters, sort, page/pageSize ở server; trả total cùng filter, không cắt 200 bản ghi mà không báo.
- Media: URL ổn định, kiểm tra MIME/signature/size và tham chiếu trước xóa; sanitize rich text trên server.
- SEO: revision gắn nội dung hoặc màn kiểm tra xuất bản nêu rõ SEO chờ áp dụng; giữ metadata hiện có khi chuyển.
- Audit: không ghi password/token; thao tác quan trọng không báo thành công nếu cập nhật giao dịch bắt buộc thất bại.
- Tư vấn: optimistic update có rollback theo bản ghi, không rollback toàn danh sách làm mất cập nhật khác; báo trạng thái dữ liệu cũ khi mất kết nối.

## UX cần duyệt ở giai đoạn 2

Prototype gồm dashboard theo vai trò, danh sách và soạn tin, sửa trang theo mục, tạo/sửa ngành, media picker, chi tiết tư vấn. Bản xem trước phải dùng renderer thật hoặc chỉ rõ là mock; không thay website thật để trình diễn.
