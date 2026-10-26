# CMS trực quan — cập nhật 25/10/2026

Mở **Admin → Nội dung website**. Studio tải chính frontend trong iframe riêng; không dựng lại giao diện công khai bằng một bộ CSS khác.

## Nội dung và xuất bản

- Chọn trang/ngôn ngữ, chọn chữ hoặc bút chì, hoặc chọn trường ở bảng Section. Khi cùng một chuỗi xuất hiện ở nhiều trường, không tự đoán trường cần sửa; dùng bộ chọn trường.
- Chữ thay đổi được xem trong phiên riêng sau khi dừng nhập. Lưu/Hủy nhóm, danh sách, banner và cấu trúc được quản lý độc lập. Xuất bản bị khóa khi còn nhóm chưa lưu.
- Endpoint lưu section kiểm tra trường thuộc nhóm được chọn và revision. Giữ các nhóm khác, từ chối thay đổi vượt phạm vi hoặc bản nháp đã bị người khác sửa.
- Mặc định không đổi DOM/CSS của các section công khai. Việc ẩn, khôi phục, thêm khối văn bản hoặc đổi thứ tự chỉ xảy ra khi lưu cấu trúc và xuất bản. Nội dung dài hơn vẫn có thể xuống dòng hoặc làm khối cao hơn theo CSS hiện có.
- Banner trang chủ/Về Viện hỗ trợ ảnh và video MP4/WebM (20 MB); ảnh JPG/PNG/WebP/AVIF (8 MB). Danh sách lãnh đạo hỗ trợ ảnh, tên, chức danh, thêm/xóa/sắp xếp.
- Các trường định danh và dữ liệu học vụ có cấu trúc trong code (ví dụ mã ngành, số tín chỉ, khung học phần hiện có) không trở thành ô nhập tự do. Nội dung chữ/ảnh của từng trang nằm trong các trường CMS được đăng ký.

## Ngành học

Form Thêm ngành học tạo định nghĩa và bản nháp, không tự công khai. Khi xuất bản, nguồn chương trình chung cấp dữ liệu cho route chi tiết, danh mục, số đếm trang chủ, sitemap và các form tư vấn. Tên ngành sửa trong CMS cũng được dùng tại danh mục/form.

Ngành mới dùng mẫu nội dung chung; các mục chưa được cung cấp ghi rõ đang cập nhật, không sao chép học phí/điều kiện/khung học phần của một ngành khác. Khung học phần cho ngành mới chưa có nguồn được đánh dấu chờ cập nhật.

## Import Excel

Mở **Lịch tư vấn → Import Excel**. Tải mẫu, xóa dòng minh họa, điền dữ liệu, tải lên để kiểm tra rồi xác nhận. Không ghi database ở bước đọc file. Chỉ nhận `.xlsx`, tối đa 5 MB và 500 dòng. Từ chối công thức, macro, external links và gói ZIP/XML vượt giới hạn. Kiểm tra dung lượng giải nén thực tế, không chỉ tin metadata ZIP.

Quyền mới `consultations.import` được cấp mặc định cho Super Admin; không tự cấp cho cấp thấp hơn. Import nguyên tử, khóa riêng các lượt import đồng thời, bỏ qua bản ghi trùng email/điện thoại/chương trình đã chuẩn hóa và giữ trạng thái của dữ liệu cũ. Có audit/history, không gửi email hoặc thông báo ra bên ngoài.

Migration: `backend/prisma/migrations/20261025010000_consultation_import` (đã áp dụng vào database local). Môi trường khác cần chạy migration bằng quy trình triển khai hiện có.

## Kiểm tra

- Build backend, frontend, Admin: qua. Admin build cần quyền tạo junction của Turbopack trên Windows.
- Frontend: 34 tests; Admin: 25 tests. Lint các file chức năng mới/sửa: không lỗi trong lần kiểm tra riêng.
- Integration PostgreSQL trong database tạm: đăng nhập, phân quyền, cô lập nháp/public, preview không lưu nháp, lưu section không ghi đè section khác, chặn trường ngoài nhóm, xung đột revision, tạo ngành chỉ công khai khi publish, Import Excel chống trùng: qua.
- Browser: đăng nhập QA, sửa qua panel, xem tiêu đề mới trong iframe, lưu nháp, đối chiếu public giữ nội dung cũ; xác nhận Xuất bản bị khóa khi cấu trúc chưa lưu và mở lại sau Hủy. Đã xác nhận hiển thị các bút chì trên frontend thực tế.
- Giới hạn kiểm tra: trình điều khiển IAB báo `Click target is no longer available` khi click xuyên iframe. Không coi đó là bằng chứng đã kiểm tra mọi điểm click trực tiếp; thao tác qua panel và cập nhật preview đã được kiểm tra. Chưa kiểm tra trên điện thoại thật hoặc mọi trình duyệt.
- Ảnh giao diện: `outputs/cms-qa/visual-editor-final.png`, cũng được đưa vào trang Hướng dẫn sử dụng.
- Dữ liệu thử nằm trong database, tài khoản và bucket QA riêng, được dọn sau kiểm tra. Không publish dữ liệu thử vào database thật; chưa commit/push/deploy.

Chạy lại kiểm thử API local:

```powershell
npm run build --workspace=backend
node scripts/test-cms-integration.mjs
```

## Rà soát responsive và SEO — 26/10/2026

- CMS có nhãn trường tiếng Việt, trạng thái lưu rõ ràng, focus bàn phím và vùng bấm tối thiểu 44px. CSS quản trị được giới hạn riêng, không đổi bố cục website công khai.
- Khung chỉnh sửa chuyển sang tab Nội dung/Xem trước trên màn hình hẹp. Đã đo không tràn ngang ở các khung 320, 375, 768 và 1280px; chưa kiểm tra điện thoại vật lý.
- Preview hỗ trợ Vừa khung, Desktop 1440, Tablet 820 và Điện thoại 390px, tự thu vừa vùng làm việc.
- SEO có tiêu đề, mô tả, canonical, robots và Open Graph. Lưu nháp độc lập với Áp dụng SEO; metadata trang chi tiết nhận đúng nội dung đã áp dụng, đồng bộ Open Graph/Twitter. Không thay dữ liệu trang khác hoặc ngôn ngữ khác.
- Kiểm tra: 36 test frontend, 25 test Admin, kiểm thử tích hợp PostgreSQL và build Admin/frontend/backend đạt. Đã kiểm tra HTML công khai trước/sau áp dụng SEO trong database QA riêng.
- Ảnh mới: outputs/cms-qa/cms-responsive-desktop.png. Tài khoản, dữ liệu và dịch vụ QA được dọn sau kiểm tra; chưa deploy.

## Tách Quản lý chuyên ngành — 26/10/2026

- Menu riêng /admin/programmes: danh sách chuyên ngành, tìm tên/slug, lọc bản nháp hoặc đã xuất bản qua CMS, thời gian cập nhật.
- Tạo ngành chuyển thẳng sang trình chỉnh sửa chuyên ngành; mỗi ngành dùng lại VisualWebsiteManager, API và template frontend hiện có.
- /admin/website chỉ liệt kê trang chung. Công cụ nâng cao giữ cùng phạm vi sau khi tải lại danh sách.
- Giữ quyền website.view/update/publish và media.upload. Không thay schema, dữ liệu công khai hay layout frontend.
- Build, TypeScript, 25 test Admin và integration CMS qua. Browser đã kiểm tra tìm Marketing, mở editor riêng và danh sách trang chung không còn ngành. Ảnh: outputs/cms-qa/programme-manager.png.
- Đây là tách chức năng quản lý; chưa bổ sung gỡ xuất bản/xóa chuyên ngành hay các schema học phần mới ngoài khả năng CMS hiện có.

## Click-to-edit — 26/10/2026

- Preview riêng bỏ toàn bộ nút bút chì, dùng outline xanh khi hover/selected, không thêm hộp vào flow layout.
- Click chọn trường sâu nhất; định danh tường minh cho hero, CTA và các ảnh chính chuyên ngành; nội dung không xác định duy nhất vẫn chọn qua Inspector để tránh sửa nhầm.
- Đồng bộ lựa chọn hai chiều, giữ selected sau reload preview, focus trường nhập. CTA có nhãn và URL liền nhau. Enter kết thúc nhập tiêu đề; Escape khôi phục giá trị lúc bắt đầu nhập. Không thay API/schema hoặc tự xuất bản.
- Chặn liên kết rời preview, giữ liên kết neo trong trang và cuộn. Hỗ trợ chọn bằng Enter/Space.
- Build Admin/frontend, lint phần thay đổi và 36 test frontend qua; integration PostgreSQL CMS qua.
- Browser: preview trực tiếp chọn title và CTA đúng path, không còn nút bút chì. Inspector chọn CTA làm highlight đúng trong iframe, hiển thị URL /admissions. Công cụ IAB chưa click/press được xuyên iframe (lỗi target/focus root), nên chưa xác nhận trọn chiều click iframe → focus Inspector bằng tự động hóa.
- Ảnh: outputs/cms-qa/click-to-edit.png. Không publish vào database thật, QA đã dọn.
