# Cập nhật trang Tuyển sinh — 25/10/2026

Nguồn người dùng chỉ định: `C:/Users/lepha/Downloads/tuyen-sinh-sau-dai-hoc-cap-nhat (1).html`. Route `/vi/admissions` được thay bằng bố cục/nội dung của mẫu, gồm header, hero, thanh chuyển bậc, chín nhóm nội dung và footer mẫu. Các trang ngành và subpage tuyển sinh vẫn giữ dữ liệu riêng.

## Nội dung và chức năng

- Thạc sĩ 2027: 19 ngành trong nguồn, tìm theo tên/mã và lọc nhóm; xem chi tiết hồ sơ dự tuyển; tra cứu ngành phù hợp/bổ sung kiến thức, minh chứng ngoại ngữ; ba đợt tuyển sinh; học phí theo ngành/ngôn ngữ; chính sách học bổng và hỗ trợ; hồ sơ 12 mục dự tuyển/8 mục nhập học; 6 bước hướng dẫn; kết quả/nhập học, FAQ, tư vấn.
- Tiến sĩ: Khoa học Môi trường, thông tin điều kiện và nhận hồ sơ, học phí/học bổng, checklist 24 mục, quy trình và FAQ riêng; tải thông báo tiến sĩ 2026 cùng phụ lục từ PDF nhúng trong mẫu.
- Checklist cập nhật tiến độ, lưu riêng trạng thái giữa nhóm hồ sơ trong phiên, đặt lại và tải TXT. Không hứa lưu qua lần tải lại trang vì mẫu không lưu trạng thái lâu dài.
- Form theo mẫu là **soạn email** đến Viện: người dùng kiểm tra rồi gửi trong ứng dụng email. Không đổi API tư vấn chung hoặc gửi đăng ký thử.

## Triển khai

Component `frontend/src/features/admissions/AdmissionsReference.tsx`, nội dung tĩnh `reference-content.json`, module tương tác `reference-engine.js`, stylesheet `reference.css` cùng thư mục. Nội dung tĩnh được render trong HTML server; các điều khiển được khởi tạo phía client. Không dùng iframe, eval hoặc thực thi script qua chuỗi HTML. Mã tương tác của nguồn được đọc và chuyển thành module cục bộ; truy vấn DOM và sự kiện được giới hạn trong component, sự kiện window/timer/frame được dọn khi rời trang hoặc React chạy lại effect.

CSS được thêm tiền tố `.admissions-reference` để tránh ảnh hưởng trang khác. Nút nổi toàn site được ẩn riêng ở trang này vì mẫu đã có thanh hành động mobile. Giữ số thứ tự accordion không xuống dòng ở màn hình hẹp. Ảnh WebP, hai font WOFF2 và PDF được tách nguyên bản vào `frontend/public/admissions/`; PDF 9.3 MB tải khi yêu cầu, không còn nằm trong HTML/JS ban đầu. Các đường dẫn nội bộ sử dụng `/vi`; cổng đăng ký, tel/mailto giữ theo nguồn. Anchor bỏ qua điều hướng chung vẫn có đích hợp lệ.

## Kiểm chứng

Typecheck, lint phạm vi mới và production build frontend qua; 25/25 tests hiện có qua. Browser kiểm tra cả Thạc sĩ và Tiến sĩ tại 320, 375, 768, 1024, 1440 px: không tràn ngang, một h1, anchor nội bộ hợp lệ.

Đã kiểm tra tìm Logistics trả một kết quả, thay học phí Logistics tiếng Anh cập nhật ba đợt 61.25/52.5/61.25 triệu, checklist 1/12 và chuyển nhập học 0/8, chuyển Tiến sĩ có 24 mục; tra cứu Sư phạm tiếng Anh cho kết quả phù hợp, chọn đợt 3 hiển thị 30/09/2027; menu mobile mở/đóng, ảnh tải thành công. Tải PDF tiến sĩ thực tế thành công. Không có console error trong lượt kiểm tra chức năng. Không mở/gửi email hoặc nộp hồ sơ thật.

## Phạm vi số liệu

Trang Tuyển sinh dùng đúng **nguồn mới**, gồm danh mục 19 ngành, mức thu và lịch tuyển sinh trong mẫu. Không ghi đè mức phí/định hướng các trang ngành đã cập nhật từ file riêng trước đó. Nguồn mới có một số khác biệt với các file ngành trước (ví dụ tỷ lệ ba đợt 35/30/35 và phí thi ngoại ngữ); nếu cần thống nhất chính sách giữa tất cả các trang, cần chọn bộ số liệu chính thức áp dụng. Kiểm tra kỹ thuật này không xác nhận chính sách bên ngoài tài liệu người dùng cung cấp.

Bằng chứng: `outputs/admissions-responsive.json`, `outputs/admissions-build.log`, ảnh `outputs/admissions-mobile.png` và `outputs/admissions-desktop.png`. Script nhập/scoping tại `work/import-admissions-reference.py`, `work/scope-admissions-reference.cjs`; các điều chỉnh lifecycle và accessibility sau nhập được lưu trong mã nguồn ứng dụng.

## Điều chỉnh theo phản hồi người dùng

Phần đầu trang dùng lại `SiteHeader compact` giống các trang khác (logo, thanh tiện ích và menu chung). Loại header/topline của mẫu và mã xử lý menu riêng. Nội dung tuyển sinh bên dưới giữ theo mẫu. Typecheck/lint qua; browser xác nhận header chung, không tràn ngang ở mobile và chuyển bậc đào tạo vẫn hoạt động.
