# Hướng dẫn chỉnh hiển thị ngành và định hướng đào tạo

Tài liệu này hướng dẫn ẩn/hiện một ngành trên website và cập nhật ngành có nhiều định hướng. Các thay đổi dưới đây chỉ tác động phần hiển thị; không xóa dữ liệu chương trình.

## Ẩn hoặc hiện một ngành

Danh sách ngành công khai được lọc tại `frontend/src/lib/website-content.ts`, trong `hiddenSourceProgrammeIds`.

```ts
const hiddenSourceProgrammeIds = new Set(["quan-tri-du-lich"]);
```

- Để ẩn ngành, thêm `id` của ngành vào tập hợp. Ví dụ: `"quan-tri-du-lich"`.
- Để hiện lại, xóa `id` đó khỏi tập hợp.
- ID cần khớp với trường `id` trong `frontend/src/data/programmes/<slug>.ts`.
- Không xóa đối tượng ngành khỏi `frontend/src/data/programmes.ts`; giữ nguyên dữ liệu để có thể bật lại.

Lớp lọc này cấp dữ liệu cho danh mục ngành, trang ngành, lựa chọn chương trình trên các trang dùng `websiteProgrammes` và sitemap. Nó không tự ẩn tên ngành trong danh sách tĩnh của các biểu mẫu ở `frontend/src/data/site.ts`; nếu cần ẩn khỏi biểu mẫu, cập nhật danh sách ở file đó riêng.

## Khai báo hai định hướng

Trong file dữ liệu ngành, thuộc tính `orientation` là giá trị mặc định; `orientations` khai báo đầy đủ các lựa chọn để thẻ ngành và bộ lọc nhận biết chương trình có nhiều hướng.

```ts
orientation: "Ứng dụng",
orientations: ["Nghiên cứu", "Ứng dụng"],
```

Thứ tự trong `orientations` là thứ tự hiển thị ở bộ lọc. Chỉ khai báo những định hướng thực sự có trong chương trình.

## Cập nhật nội dung và thông tin nhanh

Trong `frontend/src/data/programmes/<slug>.ts`:

- `pageContent.facts.quickFactsDetailed` điều khiển các ô thông tin nhanh trên trang ngành.
- `pageContent.section01.overview` là phần tổng quan.
- `pageContent.section05.trackLabels`, `graduationProjects` và `curriculumIntro` mô tả các lộ trình đào tạo.
- FAQ ở `pageContent.faq.faqs` cần khớp với các định hướng và yêu cầu tốt nghiệp hiện hành.

Khi cập nhật dữ liệu tuyển sinh, kiểm tra các nội dung về thời gian, học phí, tín chỉ và điều kiện đầu vào ở cùng file để tránh thông tin không nhất quán.

## Cập nhật khung học phần

Khung học phần được khai báo bởi hàm `get<Slug>Curricula()` trong file ngành hoặc trong `frontend/src/data/programmes/`.

- Mỗi định hướng cần có một `CurriculumTrack` riêng.
- Đặt `orientation` rõ ràng là `"Ứng dụng"` hoặc `"Nghiên cứu"`.
- Cập nhật `title`, `intro`, `groups`, `graduationProject` và `completion` cho đúng lộ trình.
- Dùng `groups` chung cho học phần giống nhau; tạo nhóm riêng cho học phần tốt nghiệp khác nhau.
- Kiểm tra mã học phần và số tín chỉ theo chương trình đào tạo gốc trước khi sửa.

Ví dụ, định hướng ứng dụng có thể gồm thực tập và đề án; định hướng nghiên cứu có thể gồm chuyên đề nghiên cứu và luận văn. Không suy ra tín chỉ từ tên định hướng; đối chiếu tài liệu CTĐT đang áp dụng.

## Các ngành đã áp dụng

- **Quản trị Dịch vụ Du lịch và Lữ hành**: đang được ẩn tại `hiddenSourceProgrammeIds`; xóa ID khỏi tập hợp để hiện lại.
- **Kỹ thuật Xây dựng**: khai báo hai định hướng trong `frontend/src/data/programmes/ky-thuat-xay-dung.ts`; khung học phần có hai track.
- **Quản lý Tài nguyên và Môi trường**: khai báo hai track và nhóm học phần tốt nghiệp riêng trong `frontend/src/data/programmes/quan-ly-tai-nguyen-moi-truong.ts`.
