# Quản lý chuyên ngành trên template chung

## Kiến trúc kế thừa

- Admin Next.js: `/admin/programmes`, VisualWebsiteManager, VisualLists, upload và SEO hiện có.
- Backend Fastify, Prisma/PostgreSQL: dùng SiteContent, không tạo CMS hay database thứ hai.
- Frontend: route động `/programmes/[slug]` → ProgrammeDetailPage. Header/footer, form tư vấn và các component học phần dùng chung.
- Bản gốc các ngành cũ là fallback; dữ liệu CMS chỉ thay riêng ngành/ngôn ngữ đã xuất bản.

## Nhập nội dung

1. Thêm ngành, chọn ảnh trong thư viện hoặc tải lên; slug không dấu, duy nhất. `thac-si` và `tien-si` dành cho danh mục. Slug cố định sau khi tạo để giữ URL ổn định.
2. Chỉnh từng nhóm trong Inspector hoặc click preview. Các danh sách có Lưu/Hủy riêng.
3. Thông tin định danh: mã, trình độ, nhóm, định hướng và tổng tín chỉ. Tổng tín chỉ không tự cộng từ các định hướng/học phần tự chọn.
4. Tổng quan có định dạng sử dụng editor hiện có; frontend dựng lại các thẻ cho phép thành React node, không thực thi HTML nhập vào.
5. Các nhóm mở rộng: thông tin nhanh, mục tiêu/chuẩn đầu ra, điều kiện dự tuyển, hồ sơ/các bước đăng ký, hỗ trợ/học bổng.
6. Bảng học phần: tên, tín chỉ, nhóm/học kỳ, định hướng và ghi chú; hỗ trợ sắp xếp. Lưu bảng thay khung học phần của riêng ngành đó. Bảng rỗng được giữ rỗng, không lấy học phần ngành khác. Giới hạn 200 dòng, từng dòng 0–50 tín chỉ, bước 0.5.
7. FAQ có thể ẩn từng câu. Cấu trúc hỗ trợ ẩn/sắp xếp section; section danh sách trống được bỏ khỏi phần trình bày tương ứng. Footer vẫn dùng chung.
8. Lưu nháp và xem trước bằng template thật; Xuất bản cần quyền riêng và thông tin chính hợp lệ. Không tự xuất bản khi chuyển focus.

## Vòng đời và phân quyền

- `website.view`: xem danh sách/editor.
- `website.update`: tạo, sửa, lưu nháp.
- `website.publish`: xuất bản, gỡ công khai, chuyển vào thùng rác và khôi phục.
- `media.upload`: tải ảnh; dùng validation/MinIO hiện có.
- Gỡ công khai ẩn cả trang, danh mục và lựa chọn tư vấn. Thùng rác là xóa mềm, giữ bản nháp/bản đã xuất bản và cho phép khôi phục.
- Khôi phục chỉ trở lại trạng thái trước khi ẩn; ngành chưa từng xuất bản vẫn là nháp. Phải khôi phục trước khi xuất bản lại.
- Các thay đổi trạng thái dùng revision để tránh ghi đè phiên khác. Người sửa và thời gian cập nhật dùng quan hệ author của SiteContent.

## Dữ liệu/API

- Tái sử dụng `$list:<path>` trong bản nháp/bản công khai; schema whitelist ở `visual-model.ts`.
- Nhóm bổ sung: cmsBasics, cmsOverview, cmsCurriculum, cmsObjectives, cmsRequirements, cmsApplication, cmsSupport và pageContent.facts.quickFactsDetailed.
- `POST /api/admin/website/programmes/state`: `{ id, action: hide|archive|restore, revision }`.
- Trạng thái lưu ở SiteContent section `cms-programme-state`, không public qua API nội dung chung.
- API danh sách chương trình public trả thêm hiddenIds để loại ngành gốc đã ẩn. Preview có chữ ký vẫn cho Admin xem nháp ngành ẩn.
- Không cần migration, package hay biến môi trường mới.

## Kiểm thử

Chạy từ thư mục dự án:

```powershell
npm run build --workspace=backend
npm test --workspace=frontend
npm test --workspace=admin
node scripts/test-cms-integration.mjs
npm run build --workspace=admin
npm run build --workspace=frontend
```

Integration dùng database QA riêng, kiểm tra phân quyền, slug trùng, draft/preview/publish, validation, bảng học phần, ẩn/thùng rác/khôi phục và xung đột revision. Không dùng dữ liệu mẫu làm thông tin chính thức.

Kết quả nghiệm thu 26/10/2026:
- Build backend, Admin và frontend: qua; lint các component thay đổi: qua.
- 40 test frontend, 25 test Admin và integration PostgreSQL mở rộng: qua.
- Browser QA: sửa/lưu bảng học phần, hoàn thiện trường bắt buộc và xuất bản qua UI; HTML frontend có đúng tên học phần mới. Danh sách phản ánh tên ngành, nhóm, người cập nhật và các thao tác vòng đời.
- Vòng đời ẩn/thùng rác/khôi phục, chặn quyền editor, slug trùng và revision stale được xác minh qua API integration.
- Ảnh: outputs/cms-qa/programme-workflow-final.png.
- Không chạy migration mới, không cần biến môi trường mới, chưa commit/push/deploy. QA dùng database riêng và được dọn sau kiểm tra.
- Chưa kiểm tra trên thiết bị vật lý; bảng học phần dùng vùng cuộn ngang trong panel hẹp. Không hỗ trợ đổi slug hoặc xóa vĩnh viễn trong giao diện này.

## Form tạo mới theo nhóm nội dung

- Mở Thêm chuyên ngành mới tại danh sách. Có ba tab Nội dung / Hình ảnh / Xem trước, thông tin cơ bản và mười section thu gọn theo mẫu.
- Lưu nháp tạo ngành và toàn bộ section trong cùng transaction; lần lưu tiếp theo cập nhật đúng ngành với revision, không tạo bản ghi trùng. Slug khóa sau lần lưu đầu.
- Xem trước lưu bản nháp rồi mở template frontend thật. Xuất bản lưu các thay đổi trước, sau đó gọi nghiệp vụ publish có kiểm tra quyền và dữ liệu bắt buộc.
- Form giữ dữ liệu khi chuyển tab hoặc mở/đóng section; có cảnh báo rời trang khi chưa lưu. Lỗi API giữ dữ liệu trên form.
- Kiểm tra: build Admin/backend, TypeScript/lint, test chuyển đổi payload và integration với payload thực tế: qua. Browser QA đã lưu nháp, xem đúng tiêu đề trong iframe, xuất bản thành công qua UI và chuyển lại tab mà vẫn giữ dữ liệu. Ảnh: outputs/cms-qa/programme-create-sections.png.
- QA dùng database riêng và đã dọn. Không deploy, không publish dữ liệu thử vào database thật.

Layout chuẩn: trang Công nghệ sinh học /vi/programmes/cong-nghe-sinh-hoc là mẫu tham chiếu. Ngành mới vẫn render bằng ProgrammeDetailPage dùng chung. Form tự tạo thanh thông tin nhanh 6 ô (mã ngành, khối lượng, định hướng, hình thức, ngôn ngữ, học phí) theo dữ liệu nhập; có thể tùy chỉnh trong Thông tin nhanh. Không sao chép dữ liệu, ảnh hoặc học phần của ngành mẫu. Nội dung chưa cung cấp vẫn để đang cập nhật hoặc ẩn theo quy tắc hiện có.
