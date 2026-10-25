# Tuyển sinh — bố cục 8 phần

## Cập nhật giao diện tiếp theo

Theo yêu cầu bỏ khối danh sách chương trình, đã gỡ khối tìm/lọc và các thẻ chương trình khỏi nội dung Tuyển sinh. Nút “Khám phá chương trình” và liên kết chương trình tại footer mở trang `/vi/programmes` (hoặc bản ngôn ngữ hiện tại), thay vì cuộn tới danh sách cũ. Bộ dữ liệu ngành vẫn giữ nguyên để chọn học phí, điều kiện, tra cứu BSKT và form tư vấn.

Banner hiện dùng ảnh khuôn viên `/images/pages/discover/content/campus.jpg`, lớp phủ navy, nét nhấn đỏ bên trái tiêu đề, cỡ chữ và nhịp khoảng cách cùng phong cách các trang chính. Không chỉnh sửa file ảnh hoặc trang khác.

Phối nền mới: thông báo nền kem; điều kiện nền trắng–xanh nhạt; học phí nền hồng nhạt; hồ sơ nền xanh lạnh; quy trình nền trắng ấm; FAQ nền tím xám nhẹ; tư vấn nền navy với form trắng. Các điểm nhấn đỏ, border, shadow và hover được giới hạn trong trang Tuyển sinh.

Hiệu ứng: reveal một lần cho tiêu đề/khối thông báo/tư vấn khi vào viewport; fade khi đổi tab; hover nhẹ trên nút và thẻ. Module `admissions-motion.js` dùng IntersectionObserver có cleanup, hỗ trợ `prefers-reduced-motion`; nội dung vẫn hiển thị nếu JavaScript không chạy. Không cài thư viện animation.

Kiểm tra sau thay đổi: không còn `#chuong-trinh`/danh sách lọc trong DOM; tab Tiến sĩ vẫn hiển thị điều kiện, học phí và checklist 24 mục; form và lựa chọn học phí vẫn có dữ liệu. Kiểm tra 320–1440px không tràn ngang, còn đủ 8 phần. Ảnh chụp mới: `outputs/admissions-polished-banner.png`, `outputs/admissions-polished-consultation.png`. Các mục bên dưới ghi lại triển khai ban đầu; phần mô tả danh mục chương trình trong section 03 được thay thế bởi cập nhật này.

Route: `/vi/admissions` (và route theo ngôn ngữ hiện có). Cải tiến trên AdmissionsReference hiện hữu, giữ nguyên bộ dữ liệu và engine tra cứu; không xây dựng trang HTML độc lập, không thay framework, API hoặc database.

## Các file thay đổi

| File | Thay đổi |
| --- | --- |
| `frontend/src/features/admissions/AdmissionsReference.tsx` | Nạp CSS cục bộ cho bố cục mới; giữ SiteHeader và quy trình khởi tạo/cleanup |
| `frontend/src/features/admissions/reference-content.json` | Sắp xếp markup cũ thành 8 section, đưa các panel theo bậc vào đúng phần, thêm thông báo nguồn tài liệu và trường form phù hợp nghiệp vụ |
| `frontend/src/features/admissions/reference-engine.js` | Chuyển bậc đào tạo đồng bộ trên 8 phần; giữ tra cứu/filter/checklist/modal/FAQ; trình bày bảng đợt học phí; nối form tới API hiện hữu |
| `frontend/src/features/admissions/admissions-redesign.css` | Layout, ảnh banner, tiêu đề, khoảng cách với header cố định, bảng thanh toán, responsive và trạng thái form; mọi selector giới hạn trong `.admissions-reference` |
| `frontend/src/features/admissions/consultation-request.js` | POST JSON tới `/api/consultations`, timeout, chỉ báo thành công khi API trả HTTP thành công |
| `frontend/tests/admissions-consultation.test.mjs` | Kiểm tra POST body, phản hồi thành công, từ chối/không kết nối; không tạo hồ sơ thật |

Script nguồn: `work/admissions_html.py`, `work/redesign-admissions.py`. Bản HTML trước thay đổi: `work/admissions-before-redesign.json`. Kiểm tra bất biến dữ liệu: `work/audit-admissions-source.cjs`.

## Tình trạng 8 phần

1. **Banner tuyển sinh**: tiêu đề “Tuyển sinh năm 2027”, giới thiệu trung tính từ trang cũ, CTA đăng ký mở đúng hướng dẫn theo bậc; CTA khám phá đến danh mục chương trình. Banner không khẳng định Tiến sĩ đã mở tuyển năm 2027.
2. **Thông báo và lịch tuyển sinh**: giữ ba đợt Thạc sĩ 2027 từ nguồn cũ; các mốc xét tuyển/kết quả/nhập học vẫn là “Theo thông báo” khi nguồn không có ngày. PDF Tiến sĩ 2026 có nhãn năm riêng. Thông báo Thạc sĩ có nội dung trên trang nhưng chưa có PDF tải xuống trong asset hiện có; hướng dẫn liên hệ Viện để nhận văn bản.
3. **Điều kiện và phương thức tuyển sinh**: tab Thạc sĩ/Tiến sĩ có chuyển đổi thực tế, đồng bộ bậc với các phần khác. Giữ điều kiện văn bằng, ngành phù hợp, BSKT, ngoại ngữ, nghiên cứu/đề cương và phương thức riêng. Danh mục 19 ngành cùng chức năng tìm/lọc/tra cứu gốc nằm trong phần này.
4. **Học phí và chính sách học bổng**: giữ nguyên học phí theo chương trình, biến thể ngôn ngữ/chuyên ngành và chính sách/điều kiện gốc. Các đợt đóng học phí Thạc sĩ hiển thị bằng bảng có đơn vị, caption và tiêu đề hàng/cột. Không bổ sung tiền, tỷ lệ hoặc hạn đóng mới.
5. **Hồ sơ dự tuyển**: giữ checklist 12 mục dự tuyển/8 mục nhập học Thạc sĩ và 24 mục Tiến sĩ; các điều kiện “nếu có” giữ nguyên. Tiếp tục cho tải checklist TXT, PDF Tiến sĩ và hướng dẫn nhận biểu mẫu chính thức. TXT không được mô tả là biểu mẫu chính thức.
6. **Quy trình tuyển sinh**: giữ số bước gốc của mỗi bậc, tab từng bước, mô tả, hướng dẫn nộp hồ sơ và phần kết quả/nhập học. Không tự tạo thời gian xử lý.
7. **FAQ**: giữ câu hỏi/trả lời gốc theo bậc, native details/summary mở đóng và thao tác bàn phím.
8. **Đăng ký dự tuyển / Nhận tư vấn**: giữ họ tên/điện thoại/email/chương trình/nội dung hỗ trợ, thêm lựa chọn bậc, đồng ý liên hệ và honeypot theo schema API hiện hữu. Gửi qua POST JSON, có kiểm tra bắt buộc/định dạng, trạng thái đang gửi, thành công và lỗi. Không còn soạn email chứa dữ liệu cá nhân trong URL. Liên hệ điện thoại/email gốc vẫn có sẵn.

## Nguồn thông tin và điều cần xác nhận

- Nội dung của `reference-content.json` và đối tượng `DATA` trong `reference-engine.js` trước thay đổi là nguồn kế thừa từ HTML Tuyển sinh do người dùng đã cung cấp.
- Đã so sánh đối tượng DATA trước/sau với Git HEAD: bằng nhau hoàn toàn; không thay đổi dữ liệu 19 ngành, học phí, học bổng, các điều kiện hay lịch gốc. Kết quả: `outputs/admissions-redesign-source-audit.json`.
- Mốc nhận hồ sơ Thạc sĩ trong nguồn: đợt 1 tháng 10/2026–31/12/2026; đợt 2 tháng 01/2027–30/04/2027; đợt 3 tháng 05/2027–30/09/2027. Đây là dữ liệu kế thừa, không phải lịch tự suy ra hoặc kết quả xác minh một thông báo mới trên web.
- Lịch xét tuyển, công bố kết quả và nhập học chưa có ngày cụ thể trong nguồn: giữ trạng thái theo thông báo của Trường.
- PDF hiện có: `/admissions/thong-bao-tuyen-sinh-tien-si-2026.pdf`, khoảng 9,3 MB. HTTP 200, nhãn ghi đúng năm 2026. Không dùng PDF này làm thông báo 2027.
- Chưa có bản PDF Thạc sĩ 2027 hoặc Tiến sĩ 2027 trong các asset được dùng. Không tạo tài liệu hay liên kết tải giả. Các thông tin kế hoạch/học phí/chính sách 2027 vẫn cần người quản trị đối chiếu văn bản ban hành trước khi công bố chính thức.

## Ảnh và tài liệu

- Banner dùng lại ảnh hội thảo thực tế đã được xác minh trong đợt cập nhật Giới thiệu: `/images/pages/discover/introduction/seminar-community.webp` (WebP 1600 px, khoảng 166 KB); không chỉnh file này hoặc trang Giới thiệu.
- Nguồn chính thức: [Viện Sau Đại học tổ chức Hội thảo Dẫn nhập Nghiên cứu Khoa học](https://www.vlu.edu.vn/news/vien-sau-dai-hoc-to-chuc-hoi-thao-dan-nhap-nghien-cuu-khoa-hoc).
- URL ảnh: https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/vlu_vien_sau_dai_hoc_to_chuc_hoi_thao_dan_nhap_nghien_cuu_khoa_hoc_c_f73ef5707d.jpg ; bài ghi hình ảnh của Đắc Khánh, không có giấy phép mở riêng được xác nhận. Không khẳng định ảnh public domain.
- Các phần lịch/điều kiện/học phí/hồ sơ/quy trình dùng giao diện dữ liệu và icon sẵn có; không thêm ảnh ngẫu nhiên. Asset và PDF cũ được giữ nguyên.

## Kiểm tra thực tế

- Lint, typecheck, 28 bài kiểm tra frontend (gồm 2 kiểm tra API adapter mới) và Next.js build đã chạy thành công.
- DOM có đúng 8 section chính theo thứ tự yêu cầu, một H1; kiểm tra 1440/1024/768/375/320 px không tràn ngang.
- Tab Tiến sĩ ẩn panel Thạc sĩ, hiển thị đúng panel Tiến sĩ và checklist 24 mục; lựa chọn bậc tại phần lịch/form được đồng bộ. Tab và biểu mẫu giữ label/role/aria-selected và hỗ trợ phím điều hướng từ engine cũ.
- Logistics: chuyển ngôn ngữ Việt/Anh hiển thị đúng 85/175 triệu theo dữ liệu gốc; bảng thanh toán thay đổi tương ứng.
- FAQ mở được câu hỏi; checklist đánh dấu được; form rỗng có 5 trường không hợp lệ và không hiển thị thành công/không gửi request.
- CTA khám phá và các anchor nội bộ có đích tồn tại; hướng dẫn đăng ký tiếp tục dùng cổng/hộp thoại hiện có, không gửi hồ sơ thật.
- PDF trả HTTP 200. POST `{}` vào API tư vấn trả HTTP 502 ở môi trường hiện tại: upstream backend chưa truy cập được. Chưa xác minh luồng lưu hồ sơ thật; không tạo dữ liệu thử trong database. Các nhánh HTTP lỗi/mạng lỗi và thành công được kiểm tra bằng fetch giả trong unit test.
- Form chỉ báo thành công sau HTTP thành công; không có thông tin cá nhân trong query string hoặc console. API/proxy/backend không bị sửa.
- Console trình duyệt trong lượt kiểm tra không có lỗi/cảnh báo runtime mới.

## Giới hạn còn lại và phạm vi

Để nhận yêu cầu tư vấn thực tế, cần backend và database hiện hữu hoạt động và `BACKEND_INTERNAL_URL` trỏ đúng; lệnh phát triển backend của dự án là `npm run dev:backend`. Không tự sửa cấu hình, API hoặc database trong công việc thiết kế này. Không tuyên bố đã lưu yêu cầu thành công khi upstream hiện trả 502.

Không sửa trang ngành, trang Về VGG, header/footer toàn cục, menu, design system, authentication hay backend. Giữ các thay đổi chưa commit của công việc trước. Bổ sung alias `#consultation` tại phần cuối trang để các CTA đang có trên website tiếp tục đến khu vực tư vấn, cùng với `#tu-van` hiện hữu.

Ảnh chụp và kết quả: `outputs/admissions-redesign-desktop.png`, `outputs/admissions-redesign-mobile.png`, `outputs/admissions-redesign-source-audit.json`, `outputs/admissions-redesign-browser.json`; log build `outputs/admissions-redesign-build.log`.
