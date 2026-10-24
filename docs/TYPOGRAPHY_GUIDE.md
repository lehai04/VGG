# Maison Neue và thang chữ — 25/10/2026

Yêu cầu: đồng bộ dự án theo `Font_Family_Size.png`. Thư mục Downloads/fonts có DM Sans, IBM Plex Sans, Plus Jakarta Sans; bộ Maison Neue đã có sẵn trong `frontend/src/app/fonts/` nên dùng đúng bộ này.

## Quy chuẩn

Dùng font Book 400, Medium 500, Demi 600, Bold 700; Book Italic và Bold Italic từ file riêng. Cả sáu file có vùng ký tự tiếng Việt được kiểm tra. Không dùng Maison Neue Extended cho tiêu đề thay font Maison Neue thường.

Desktop từ 1024px: H1 64, H2 56, H3 40, H4 32, H5 28, H6 24 px; mặc định Bold. `.type-book` cho heading Book. Văn bản và điều khiển dùng thang 20/18/16/14/12/10 px, mặc định 16 px. Nhãn điều hướng footer dùng 20 px theo vai trò navigation, không phóng thành tiêu đề section 56 px.

Tablet 768–1023px: 56/40/32/28/24/24. Mobile 375–767px: 40/32/28/24/24/24. Dưới 375px: H1/H2/H3 giảm 32/28/24 để tránh vỡ khối chữ. Tất cả cỡ responsive vẫn dùng bước trong thang mẫu. Giữ line-height riêng phù hợp cho heading và nội dung.

Bộ hiện có chưa có file Maison Neue Medium Italic và Demi Italic riêng; trình duyệt dùng biến thể italic gần nhất từ Book/Bold. Không tuyên bố đã có đầy đủ file italic của hai trọng lượng này. Có thể bổ sung đúng file sau mà không đổi hệ token.

## Phạm vi triển khai

- `shared/styles/typography.css` là nguồn token/font-face dùng chung, import từ cả layout frontend và admin. Font được tự lưu trữ ở public/fonts/maison-neue của từng ứng dụng để hỗ trợ triển khai độc lập.
- Bỏ next/font Inter ở hai layout. Chuẩn hóa 28 stylesheet: font-family, trọng lượng về 400/500/600/700, cỡ nội dung nhỏ về token; bỏ font-face/biến font cũ gây ghi đè, gồm Plus Jakarta trên trang Tuyển sinh.
- Chuẩn hóa cỡ chữ inline dưới 20px ở 20 file TSX quản trị về token. Giữ monospace cho mã kỹ thuật và nội dung cần căn cột. Không thay nội dung nghiệp vụ, API hoặc quyền truy cập.
- Các utility `.type-h1` đến `.type-h6`, `.text-20/18/16/14/12/10`, `.weight-book/medium/demi/bold`, `.type-italic` hỗ trợ biên tập sau này.

## Kiểm chứng

Typecheck frontend và admin qua; lint hai layout qua; 25/25 tests frontend qua. Browser kiểm tra 8 nhóm trang (trang chủ, tuyển sinh, ngành Marketing, danh mục ngành, giới thiệu, nghiên cứu, tài nguyên, tin tức) tại 320/768/1440 px: không tràn ngang. Font computed là Maison Neue; desktop H1/H2 đúng 64/56, tablet 56/40, màn hình 320px 32/28. Trình duyệt ghi nhận sáu font-face và không có lỗi font trong console khi kiểm tra.

Production build frontend và admin (webpack) đều qua. Log cuối: `outputs/typography-build-final.log` và `outputs/typography-admin-build-retry.log`. Lần build admin trong sandbox gặp EPERM; lần kiểm tra lại ngoài sandbox thành công. Không xác nhận đã kiểm tra các màn hình quản trị sau đăng nhập; chỉ kiểm tra cấu hình, typecheck và build.

Bằng chứng: `outputs/typography-browser.json`, `outputs/typography-css-changes.json`, `outputs/typography-inline-changes.json`, ảnh `outputs/typography-preview.png`.


## Điều chỉnh cỡ chữ theo vai trò sau phản hồi

Tiêu đề thẻ nghiên cứu/công bố, tin tức, tài liệu và tin trang chủ dùng `.type-card-title`: 24px desktop/tablet, 20px mobile. Tên ngành trong danh sách dùng `.type-list-title`: 28px desktop/tablet, 24px mobile. Các vai trò này không dùng cỡ H3 section 40px dù vẫn giữ thẻ heading để bảo toàn cấu trúc nội dung.

Bỏ `text-wrap: balance/pretty`, thay bằng `wrap`; bỏ căn đều `justify` trong nội dung website, cho chữ xuống dòng theo khoảng trắng tự nhiên. Heading dùng hết chiều rộng khối chứa, không ép giới hạn số ký tự. Bỏ 20 thẻ br ép dòng trong heading TSX và br trong heading trang Tuyển sinh. Giữ xuống dòng địa chỉ/nội dung không phải heading.

Typecheck, production build frontend và 25 tests qua sau sửa. Browser kiểm tra 4 route nghiên cứu/tin tức/tài nguyên/danh mục ngành ở 320/768/1440 px: không tràn ngang; cỡ chữ cả heading và link bên trong đúng 20/24/28px theo vai trò. Bằng chứng `outputs/card-typography-browser.json`, `outputs/card-typography-build-final.log`, `outputs/card-typography-preview.png`.

## Tinh chỉnh tiếp theo theo yêu cầu

Menu header 14px; tiêu đề desktop H1–H6 giảm còn 56/48/32/28/24/22px. Tablet 48/36/28/24/24/22px; mobile 36/28/24/22/22/20px, màn hình dưới 375px giữ 32/28/24 cho H1–H3. Tiêu đề thẻ desktop giảm 24→22px; tên ngành 28→24px. Không đổi font Maison Neue hoặc cỡ chữ nội dung. Browser trang Tuyển sinh ở 320/768/1440px xác nhận menu14px, H1/H2 đúng token và không tràn ngang.
