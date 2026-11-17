# Tin tức và tin nổi bật — 16/11/2026

- Trang Tin tức: thay banner bằng khối bài lớn bên trái và tối đa 3 tin mới bên phải; mobile xếp dọc. Nút “Xem tất cả tin tức” mở trang con `/vi/news/all` hoặc `/en/news/all`; tìm kiếm, bộ lọc, danh sách và phân trang được chuyển sang trang con. Các URL tìm kiếm/lọc cũ tại `/news` chuyển hướng sang trang con và giữ tham số.
- Bài lớn ưu tiên bài nổi bật đã xuất bản; nếu chưa có thì dùng bài mới nhất và không gắn nhãn nổi bật. Không thêm thẻ giả khi thiếu bài.
- CMS thêm công tắc Tin nổi bật, mặc định tắt. Bật cần xác nhận trong hộp thoại; hủy không thay đổi công tắc. Trạng thái chỉ ghi vào database khi lưu/đăng bài.
- Khi lưu bài có bật nổi bật, bài nổi bật trước đó tự tắt. Trạng thái này dùng chung cho VI/EN của một bài.
- Chỉ bài đã xuất bản xuất hiện trên website. Chọn nổi bật cho bản nháp vẫn thay thế lựa chọn trước; bài nháp chưa hiển thị công khai.
- Backend dùng transaction và advisory lock, database có unique partial index để chỉ cho phép một bài nổi bật.

## Triển khai

Chạy migration `20261116000000_news_featured`, generate Prisma Client, build và triển khai đồng bộ backend, CMS, frontend. Migration thêm `news_posts.is_featured` và index `news_posts_single_featured`; mặc định các bài cũ không nổi bật.

Local: đã chạy migration và cập nhật backend/CMS Docker với image `vgg-app:news-featured-local`. Frontend local dùng mã nguồn hiện tại. Chưa push hoặc deploy production trong thay đổi này.

## Kiểm tra

- Typecheck backend, CMS và frontend đạt; build backend và CMS đạt.
- 51 kiểm thử frontend đạt; 2 kiểm thử dịch tin và 2 kiểm thử trường/lọc tin nổi bật đạt.
- Giao dịch kiểm tra trên database local xác nhận bài cũ tắt, bài mới bật và chỉ có một bài nổi bật; rollback toàn bộ dữ liệu kiểm thử.
- Trang local kiểm tra desktop 1440px và mobile 390px: không tràn ngang.
- Hộp xác nhận CMS cần kiểm tra thêm bằng phiên đăng nhập của biên tập viên; chưa tự động thao tác đăng bài thật.
