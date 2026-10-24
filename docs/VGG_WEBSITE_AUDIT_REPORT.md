# Báo cáo audit nội dung website VGG — 24/10/2026

Cập nhật tiếp theo cùng ngày: đã nhận HTML và hoàn thiện Công nghệ Sinh học. Xem `docs/BIOTECH_CONTENT_UPDATE.md`; nhận định thiếu nguồn của ngành này trong bảng kiểm kê ban đầu bên dưới đã được thay thế bằng báo cáo cập nhật. Còn 19 ngành chưa có nguồn mới riêng.

Cập nhật tiếp: đã nhận HTML và hoàn thiện Kinh doanh Thương mại, xem `docs/COMMERCE_CONTENT_UPDATE.md`. Còn 18 ngành chưa có nguồn mới riêng; trạng thái kiểm kê ban đầu của Kinh doanh Thương mại đã được thay bằng báo cáo cập nhật này.

Cập nhật tiếp: đã nhận HTML và hoàn thiện Kế toán, Kỹ thuật Môi trường, xem `docs/ACCOUNTING_ENVIRONMENT_CONTENT_UPDATE.md`. Còn 16 ngành chưa có nguồn mới riêng; trạng thái ban đầu của hai ngành này được thay bằng báo cáo mới.

Cập nhật tiếp: đã hoàn thiện Kỹ thuật ô tô và Kiến trúc theo HTML mới, xem `docs/AUTOMOTIVE_ARCHITECTURE_CONTENT_UPDATE.md`. Còn 14 ngành chưa có nguồn mới riêng; báo cáo này thay trạng thái ban đầu của hai ngành vừa cập nhật.

Cập nhật tiếp: đã hoàn thiện Lý luận và Lịch sử Mỹ thuật Ứng dụng, Logistics và Quản lý chuỗi cung ứng; xem `docs/ART_THEORY_LOGISTICS_CONTENT_UPDATE.md`. Còn 12 ngành chưa có nguồn mới riêng. Trạng thái ban đầu của hai ngành này được thay bằng báo cáo cập nhật.

Cập nhật tiếp: đã hoàn thiện Luật Kinh tế và Mỹ thuật Ứng dụng theo hai HTML mới, xem `docs/LAW_APPLIED_ART_CONTENT_UPDATE.md`. Còn 10 ngành chưa có nguồn mới riêng. Báo cáo mới ghi rõ dữ liệu sao chép nhầm trong nguồn và cách xử lý.

Cập nhật tiếp: đã hoàn thiện Quản trị Khách sạn và Quản trị Kinh doanh theo HTML mới, xem `docs/HOSPITALITY_BUSINESS_CONTENT_UPDATE.md`. Còn 8 ngành chưa có nguồn mới riêng.

Cập nhật ngày 25/10/2026: đã cập nhật Tài chính – Ngân hàng và Quản lý Tài nguyên và Môi trường theo HTML mới, xem `docs/FINANCE_RESOURCES_CONTENT_UPDATE.md`. Còn 6 ngành chưa có nguồn mới riêng. Báo cáo ghi rõ giới hạn phân nhóm học phần của nguồn.

Cập nhật tiếp ngày 25/10/2026: đã cập nhật Ngôn ngữ Anh và Quan hệ Công chúng theo HTML mới, xem `docs/ENGLISH_PR_CONTENT_UPDATE.md`. Còn 4 ngành chưa có nguồn mới riêng. Báo cáo ghi rõ mâu thuẫn tín chỉ PR ứng dụng cần CTĐT chính thức để đối chiếu.

Cập nhật trang Tuyển sinh ngày 25/10/2026: thay layout và nội dung theo mẫu HTML tuyển sinh mới, có tra cứu/checklist/tải tài liệu và hai bậc đào tạo. Xem `docs/ADMISSIONS_LAYOUT_CONTENT_UPDATE.md`. Số liệu mẫu mới chỉ áp dụng cho trang Tuyển sinh; không ghi đè nguồn riêng của các ngành.

## Phạm vi và nguồn

Đã kiểm kê toàn bộ 79 URL public trong repository (gồm alias), 21 ngành, 19 file page/layout/not-found frontend, cùng cấu trúc admin/backend. Nguồn mới được chỉ định là `C:/Users/lepha/Downloads/thac-si-marketing.html`; script trong HTML không được thực thi. Bản đồ nguồn → trang → component → thiếu sót nằm ở `docs/VGG_CONTENT_AUDIT_MAPPING.md`.

Chỉ Marketing đủ nguồn mới để hoàn thiện nội dung chuyên môn. Những trang khác đã được rà soát, đồng bộ cấu trúc và sửa lỗi có thể chứng minh từ mã nguồn; nội dung chuyên môn/thu phí/quy định cũ được giữ lại và đánh dấu cần xác minh. Không coi kiểm tra HTTP thành công là xác minh tính chính xác của chính sách tuyển sinh.

## Nội dung đã hoàn thiện

- Marketing: tổng quan, 4 điểm nổi bật, 6 chuẩn đầu ra, 3 nhóm đối tượng, điều kiện dự tuyển/ngoại ngữ/bổ sung kiến thức, 6 hướng phát triển, 15 học phần song ngữ, 4 học kỳ, điều kiện tốt nghiệp, học phí 2027 và 3 đợt thanh toán, 6 khoản thu riêng, 6 FAQ và CTA/form tư vấn. Hai ảnh WebP được lấy nguyên từ nguồn, có alt và ghi công.
- Template 21 ngành: số tab khớp track thực tế, phân biệt nghiên cứu/ứng dụng, hiện EnglishName và dữ liệu tốt nghiệp, khối học phí dùng số liệu riêng từng ngành, anchor điều hướng và liên hệ thống nhất. Các mục chỉ có nguồn Marketing không lan sang ngành khác.
- 18 ngành: thay tiêu đề biên tập mẫu bằng nhãn đúng chức năng; nội dung năng lực không còn bị gọi sai là nhóm đối tượng. Giữ nguyên nội dung chuyên môn và số liệu.
- Form chung: đủ 21 lựa chọn đúng tên registry, chọn sẵn đúng ngành; giữ API contract. Backend nhận programme dạng chuỗi, không có whitelist 18 ngành ở route hiện hành.
- Sửa link/alias nghiên cứu, hợp tác quốc tế, người học, tài nguyên, 6 danh mục tin cũ; bảo toàn bài CMS thực nếu có, bài không tồn tại vẫn 404. Sửa URL bài nghiên cứu ngoài bị ghép sai; các anchor dẫn tới khối thực có trên trang.
- Sửa trùng ID học phí Tuyển sinh, bổ sung sitemap cho 21 ngành, bỏ nhãn tải PDF sai khi đích chỉ là form tư vấn.

## Các file chính

`frontend/src/data/programmes/marketing.ts`, `programmes.ts`, `curricula.ts`, `site.ts`, `programmes/shared-content.ts`; `ProgrammeDetailPage.tsx/.module.css`, `ProgrammeCurriculumGroups.tsx`, `ProgrammeSupplementaryContent.tsx/.module.css`; `ResourcesConsultation.tsx`; các page redirect và link helper của news/research; `SectionPages.tsx`, trang admissions, sitemap; tests frontend. Danh sách 18 file biên tập nằm trong `outputs/vgg-content-audit/editorial-label-changes.json`. Hướng dẫn cập nhật: `docs/PROGRAMME_CONTENT_GUIDE.md`.

Các thay đổi admin/backend/SEO có sẵn trong working tree được giữ nguyên. Không chạy migration, không đổi quyền hay đăng nhập, không publish.

## Kiểm chứng

- 82 GET local: 79 URL public, sitemap, robots, URL âm tính. Tất cả URL dự kiến hoạt động trả 200 sau redirect; chỉ URL âm tính trả 404.
- Phân tích HTML đã render: không còn duplicate ID, anchor nội bộ lỗi, ảnh local đang dùng bị thiếu hoặc các nhãn mẫu đã nhắm sửa. Phạm vi này không bao gồm mọi liên kết ngoài mạng.
- Đối chiếu Marketing: 204/204 đơn vị nội dung ngữ nghĩa của HTML có trong DOM main. Tất cả 39 accordion đã được mở kiểm tra mobile; bảng học phí/nhóm học phần không tràn ngang.
- Trình duyệt: 21 trang ngành desktop có một H1, track đúng số lượng, chọn đúng form và anchor hợp lệ. 9 trang tổng hợp desktop, 8 trang tổng hợp mobile và 2 ngành đại diện mobile được kiểm tra. Marketing kiểm tra desktop/mobile; không tuyên bố mọi breakpoint của mọi trang đã so ảnh pixel.
- Tìm Marketing trả 1 kết quả; lọc tiến sĩ trả 1 chương trình Khoa học Môi trường.
- Chi tiết lệnh kiểm tra được bổ sung ở phần kết quả cuối cùng bên dưới; log và ảnh nằm trong `outputs/vgg-content-audit`.

## Giới hạn cần xử lý bằng nguồn hoặc môi trường

1. HTML Marketing ghi nhóm tự chọn 1 chọn môn 3 hoặc 4 tín chỉ, nhưng tổng tự chọn ghi 15 tín chỉ. Đã giữ nguyên; cần đơn vị chuyên môn xác nhận trước khi thay số.
2. 20 ngành còn lại cần văn bản/HTML riêng để xác minh mã ngành, học phí, thời lượng, tín chỉ, điều kiện đầu vào/đầu ra và FAQ. Không nhân chính sách Marketing sang các ngành này.
3. Tin CMS, chuyên trang các chủ đề nghiên cứu/sự kiện/media và tài liệu chỉ được giữ theo dữ liệu hiện có. Alias hợp lệ không thay cho nội dung riêng chưa được cung cấp.
4. API tư vấn trong môi trường kiểm tra trả 502 khi backend không sẵn sàng; chưa xác minh gửi và lưu yêu cầu thành công. Không tạo dữ liệu đăng ký thật. Admin cần môi trường DB/tài khoản để kiểm tra UI được bảo vệ đầy đủ.
5. Ba asset thiếu chỉ được tham chiếu trong component cũ không hoạt động; không có ảnh local thiếu trên route đã render. Không kích hoạt lại component chứa số liệu demo để lấp nội dung.

## Kết quả kỹ thuật cuối cùng

| Kiểm tra | Kết quả |
|---|---|
| Frontend lint | Qua |
| Typecheck backend + frontend + admin | Qua |
| Frontend tests | 12/12 qua |
| Backend tests, bao gồm build | 1/1 qua |
| Admin tests | 19/19 qua |
| Frontend production build | Qua |
| Admin build mặc định (Turbopack) | Không qua: Windows từ chối tạo junction cho sharp, os error 5 |
| Admin build dùng `next build --webpack` | Qua, tạo đủ 31 trang static |
| Root lint/check | Dừng ở admin: 10 lỗi, 6 cảnh báo có sẵn ngoài phần chỉnh nội dung |
| Giữ metadata 20 ngành ngoài Marketing | 10 trường đối chiếu mỗi ngành, không có thay đổi |

Lỗi lint admin: `LoginForm.tsx` dùng anchor cho endpoint SSO; `PasswordChecklistInput.tsx`, `ValidatedInput.tsx`, `RealtimeDashboard.tsx`, `NotificationsManager.tsx` cập nhật state đồng bộ trong effect; `ResourceManager.tsx` có dấu nháy chưa escape. Không đổi auth hoặc luồng quản trị để xử lý ngoài phạm vi nội dung. Cảnh báo còn có dependency hook và ảnh img. Root `npm run check` chưa đạt dù các bước typecheck/test/build đã được chạy riêng. Log: `typecheck.log`, `tests.log`, `frontend-build.log`, `admin-build.log`, `admin-webpack-build.log` trong thư mục bằng chứng.

Review React: các accordion dùng native details/summary, tab có aria-pressed, ảnh có alt, liên kết có đích thực, key ổn định theo nội dung; không thêm effect, thư viện UI hoặc fetch phía client để dựng nội dung Marketing. Không thay đổi cơ chế API, auth hoặc truy cập dữ liệu.

## Kiểm kê từng URL public

CSV: `outputs/vgg-content-audit/page-status.csv`. URL động `/news/[slug]` phụ thuộc CMS và bài chưa có trả 404 đúng; không thể liệt kê toàn bộ bài backend từ nguồn HTML Marketing.

| Route | H1/đích hiển thị | HTTP | Trạng thái | Ghi chú |
|---|---|---|---|---|
| / | Nâng tầm tri thức Chủ động dẫn đầu. | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /admissions | Một bước gần hơn đến tương lai bạn mong muốn | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /admissions/hoc-bong | Một bước gần hơn đến tương lai bạn mong muốn | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /admissions/hoc-phi | Một bước gần hơn đến tương lai bạn mong muốn | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /admissions/moc-thoi-gian | Một bước gần hơn đến tương lai bạn mong muốn | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /admissions/nop-ho-so | Một bước gần hơn đến tương lai bạn mong muốn | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /admissions/yeu-cau | Một bước gần hơn đến tương lai bạn mong muốn | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /discover | Vì sao học sau đại học tại Văn Lang? | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /discover/gioi-thieu | Vì sao học sau đại học tại Văn Lang? | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /discover/lanh-dao | Lãnh đạo | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /discover/lien-he | Liên hệ | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /discover/tam-nhin-su-menh | TẦM NHÌN & SỨ MỆNH | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /discover/xep-hang-thanh-tuu | Xếp hạng & Thành tựu | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /global | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /global/doi-tac | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /global/dual-degree | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /global/overseas-immersion | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /global/study-tour | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /global/thuc-tap | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /global/trao-doi | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /news | TIN TỨC & SỰ KIỆN | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /news/seminar-webinar | TIN TỨC & SỰ KIỆN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /news/su-kien | TIN TỨC & SỰ KIỆN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /news/thong-cao-bao-chi | TIN TỨC & SỰ KIỆN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /news/thu-vien-hinh-anh | TIN TỨC & SỰ KIỆN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /news/tin-tuc | TIN TỨC & SỰ KIỆN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /news/video | TIN TỨC & SỰ KIỆN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /programmes | CHỌN CHƯƠNG TRÌNH HỌC CHO BƯỚC TIẾN TIẾP THEO | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /programmes/cong-nghe-sinh-hoc | Công nghệ Sinh học | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/cong-nghe-thong-tin | Công nghệ thông tin | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/executive-education | CHỌN CHƯƠNG TRÌNH HỌC CHO BƯỚC TIẾN TIẾP THEO | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /programmes/flagship | CHỌN CHƯƠNG TRÌNH HỌC CHO BƯỚC TIẾN TIẾP THEO | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /programmes/ke-toan | Kế toán | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/khoa-hoc-moi-truong | Khoa học Môi trường | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/kien-truc | Kiến trúc | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/kinh-doanh-thuong-mai | Kinh doanh Thương mại | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/ky-thuat-moi-truong | Kỹ thuật Môi trường | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/ky-thuat-o-to | Kỹ thuật ô tô | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/ky-thuat-xay-dung | Kỹ thuật Xây dựng | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/logistics | Logistics và Quản lý chuỗi cung ứng | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/luat-kinh-te | Luật Kinh tế | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/ly-luan-lich-su-my-thuat | Lý luận và Lịch sử Mỹ thuật Ứng dụng | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/marketing | Marketing | 200 | Đã hoàn thành theo nguồn HTML | 204/204 đơn vị nội dung; cần xác minh mâu thuẫn tín chỉ tự chọn trong nguồn. |
| /programmes/my-thuat-ung-dung | Mỹ thuật Ứng dụng | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/ngon-ngu-anh | Ngôn ngữ Anh | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/quan-he-cong-chung | Quan hệ Công chúng | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/quan-ly-tai-nguyen-moi-truong | Quản lý Tài nguyên và Môi trường | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/quan-tri-du-lich | Quản trị Dịch vụ Du lịch và Lữ hành | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/quan-tri-khach-san | Quản trị Khách sạn | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/quan-tri-kinh-doanh | Quản trị Kinh doanh | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/quoc-te | CHỌN CHƯƠNG TRÌNH HỌC CHO BƯỚC TIẾN TIẾP THEO | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /programmes/tai-chinh-ngan-hang | Tài chính - Ngân hàng | 200 | Đã đồng bộ cấu trúc; cần xác minh nội dung | Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới. |
| /programmes/thac-si | CHỌN CHƯƠNG TRÌNH HỌC CHO BƯỚC TIẾN TIẾP THEO | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /programmes/tien-si | CHỌN CHƯƠNG TRÌNH HỌC CHO BƯỚC TIẾN TIẾP THEO | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /research/cong-bo | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/cum-nghien-cuu | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/doi-moi-sang-tao | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/doi-tac | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/du-an | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/dual-degree | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/hoi-thao | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/hop-tac-doanh-nghiep | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/overseas-immersion | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/study-tour | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/thuc-tap | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /research/trao-doi | Nghiên cứu khoa học & Hợp tác quốc tế | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /resources | TÀI NGUYÊN | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /resources/bieu-mau | TÀI NGUYÊN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /resources/chinh-sach-quy-dinh | TÀI NGUYÊN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /resources/faq | TÀI NGUYÊN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /resources/lich-hoc-thuat | TÀI NGUYÊN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /resources/tai-lieu | TÀI NGUYÊN | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /student-success | HỌC SÂU HƠN. KẾT NỐI XA HƠN. | 200 | Đã kiểm tra giao diện/route; cần xác minh nội dung | Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ. |
| /student-success/cau-chuyen-thanh-cong | HỌC SÂU HƠN. KẾT NỐI XA HƠN. | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /student-success/cuu-hoc-vien | HỌC SÂU HƠN. KẾT NỐI XA HƠN. | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /student-success/ho-tro-hoc-vien | HỌC SÂU HƠN. KẾT NỐI XA HƠN. | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /student-success/phat-trien-su-nghiep | HỌC SÂU HƠN. KẾT NỐI XA HƠN. | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |
| /student-success/tai-nguyen-hoc-tap | HỌC SÂU HƠN. KẾT NỐI XA HƠN. | 200 | Đã sửa/kiểm tra điều hướng | Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm. |

