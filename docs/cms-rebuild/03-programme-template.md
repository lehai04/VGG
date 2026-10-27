# Mẫu chương trình đào tạo kế thừa

## Kết quả khảo sát

21 ngành trong nguồn hiện tại đều có pageContent và không bật detailsPending, cùng đi qua `ProgrammeDetailPage`. Có nhánh PendingPage trong renderer cho dữ liệu chưa hoàn thiện; không được tự biến ngành mới thành trang pending rồi coi đó là đạt yêu cầu kế thừa đầy đủ. Ngành động từ DB chưa được kiểm kê.

Danh sách từng ngành và đặc tính nằm trong `programme-inventory.json`. Số ngành này không đại diện cho toàn bộ danh mục production.

## Cấu trúc trường theo vị trí

| Vị trí | Nguồn trường | Quy tắc kế thừa |
|---|---|---|
| Danh mục và nhận diện | id, title, englishTitle, code, degree, field, summary, duration, tuition, credits, studyMode, orientation | Giữ ID/slug hiện có; ngành mới có ID duy nhất, không dùng slug reserved; không tự sửa copy cũ |
| Hero | pageContent.hero | Giữ ảnh nền, overlay, typography và CTA; nhập nội dung mới đúng vị trí |
| Facts | pageContent.facts + dữ liệu ngành | Giữ thứ tự và override displayCode/displayDuration/displayTuition; không thay bằng phép tính mới |
| Tổng quan | pageContent.section01 | overview, headline, focusAreas, link, image, tags; null ảnh khác undefined fallback, không chuẩn hóa làm đổi layout |
| Điểm nổi bật | pageContent.section02 | highlights, learningOutcomes; điều kiện xuất hiện phụ thuộc dữ liệu hiện hữu |
| Đối tượng/đầu vào | pageContent.section03 | audience, requirements, intro, illustration; tên mục dùng giá trị thật của ngành |
| Nghề nghiệp | pageContent.section04 | careers, careerImage, intro, note và tiêu đề |
| Đào tạo | pageContent.section05 + curricula.ts + cmsCurriculum | Track, nhóm học phần, tín chỉ, học kỳ, điều kiện hoàn thành; giữ thứ tự track và fallback đang có |
| Học phí | pageContent.fees, tuition và hàm fallback | Giữ bảng kỳ đóng, variants theo ngôn ngữ, phụ phí và ghi chú; không suy đoán học phí ngành mới |
| Hồ sơ/hỗ trợ | cmsApplication, cmsSupport | Chỉ hiển thị theo điều kiện renderer hiện hữu; không tự thêm vào ngành đang không có |
| CTA | pageContent.consultation.ctaHeading/ctaBody/href/text | Là vị trí riêng trước FAQ, không gộp nhầm với form cuối trang |
| FAQ và thông tin liên hệ | pageContent.faq và consultation theo component | Giữ accordion và vị trí cột liên hệ |
| Form cuối trang | ResourcesConsultation initialProgramme, formIntro | Chọn đúng ngành đang xem, không thay cấu trúc form |

## Luồng tạo ngành mới đề xuất

1. Nhập nhận diện và chọn loại mẫu đã duyệt; hệ thống gắn renderer chung, không clone JSX/CSS.
2. Tạo draft với dữ liệu riêng trống và các nhãn dùng chung hợp lệ. Không dùng đoạn giới thiệu, học phí, FAQ, học phần của ngành mẫu làm dữ liệu thật.
3. Biên tập từng mục theo thứ tự website, xem trước bằng renderer công khai.
4. Kiểm tra dữ liệu bắt buộc theo mẫu: nhận diện, nội dung hero/ảnh, các mục được mẫu yêu cầu, nguồn học phí và chương trình học. Nếu thiếu dữ liệu làm biến mất mục bắt buộc thì chặn xuất bản; không tự sinh nội dung.
5. Duyệt bản revision cụ thể; xuất bản đồng bộ chi tiết và khả năng xuất hiện trong danh mục/form. Kiểm tra các danh sách curated trên trang chủ riêng, không tự thêm vào mọi vị trí.
6. Gỡ/khôi phục giữ ID và dữ liệu cũ; bản ghi tư vấn trước đó giữ thông tin lịch sử.

## Các quyết định cần duyệt

- Giữ một renderer chung và cho phép đúng các biến thể nội dung hiện có; không tự tạo mẫu Thạc sĩ/Tiến sĩ khác nhau chỉ dựa tên bậc.
- Mẫu nào làm cấu hình mục bắt buộc cho ngành mới: cần xem mẫu runtime trước khi chốt; không suy ra mọi mục tùy chọn hiện có đều bắt buộc.
- Chưa cho biên tập viên thay sectionNumber, layout, className, order/hidden/added hoặc kiểu banner.
- Script tạo ngành hiện tại dùng programme-template.json và một số câu fallback. Phải kiểm tra/loại khả năng lẫn nội dung mẫu trong bản mới, không sửa ngành đã xuất bản ở giai đoạn khảo sát.
