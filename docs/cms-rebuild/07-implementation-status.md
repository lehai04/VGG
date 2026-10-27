# Tiến độ triển khai CMS VGG

Cập nhật 27/10/2026. Đây là trạng thái triển khai và kiểm thử; chưa phải biên bản nghiệm thu hoặc cho phép xóa admin cũ.

## Đã triển khai

- Nội dung website: workspace theo registry thật, vi/en, tìm trang/ngành, nội dung theo section, nháp tách bản công khai, tự lưu tùy chọn, chống xung đột, gửi duyệt/yêu cầu sửa/duyệt đúng revision, xem trước renderer thật, lịch sử/khôi phục và lịch xuất bản.
- Ngành mới: form dữ liệu sạch, dùng template ngành hiện có; tạo ở dạng riêng tư. Danh sách FAQ, đối tượng, điểm nổi bật, nghề nghiệp và học phần CMS có editor chuyên biệt. Backend giữ metadata layout/banner và không cho sửa cấu trúc qua content endpoint.
- Tin tức: danh sách phân trang máy chủ, nháp riêng, rich text/ảnh/SEO, vi/en, tự lưu tùy chọn, duyệt, xuất bản và hẹn giờ đúng revision; gỡ công khai, thùng rác, khôi phục vào nháp, lịch sử. Bài từng công khai khóa slug và locale ở backend. Xem trước bằng token 10 phút, no-store, noindex và renderer website hiện có.
- Tư vấn: tìm kiếm toàn bộ dữ liệu, phân trang, trạng thái gốc, phân công có quyền riêng, ghi chú, lịch sử, kết quả riêng và lần liên hệ tiếp theo; lọc đến hạn. Lưu nguyên tử và kiểm tra revision.
- Hồ sơ đăng ký: tìm kiếm/lọc/phân trang/chi tiết; chỉ đọc.
- Tài nguyên: giữ URL khi đổi tiêu đề, revision guard, lưu phiên bản cũ khi cập nhật/lưu trữ, nạp phiên bản vào biểu mẫu, trạng thái nháp/công khai/lưu trữ. Không xóa vật lý tài nguyên. **Tài nguyên vẫn dùng editor hiện hữu; lưu sửa bản công khai áp dụng trực tiếp với cảnh báo, chưa có draft độc lập như tin tức.**
- Thư viện: dò tham chiếu nội dung lồng nhau, JSON collection, HTML, bản nháp và phiên bản cũ của trang/tin/tài nguyên; ảnh OG và file tài nguyên. Chưa cung cấp thao tác xóa vật lý media.
- Dashboard: hàng đợi duyệt, lỗi lịch đăng, tư vấn chưa phân công/đến hạn theo quyền.
- Giữ hệ thống tài khoản/phân quyền/SSO/audit hiện hữu; các API CMS mới kiểm tra quyền trên server và bắt buộc đổi mật khẩu.

## Đã kiểm tra

- Backend và admin TypeScript qua; build production frontend/admin qua ở các lượt triển khai.
- 28 test admin; 7 test content-only qua.
- Integration với PostgreSQL thật trên database tạm riêng: auth/quyền, nháp/công khai, conflict, layout guard, workflow, preview token, schedule concurrency, programme, tin tức, phiên bản/thùng rác, tài nguyên và hồ sơ.
- Browser đã kiểm tra tạo ngành, sửa/lưu FAQ, xem trước ngành đúng renderer, tin tức tự lưu và luồng duyệt, tư vấn ghi chú/phân công.
- Browser phát hiện lỗi preview tin đọc bản công khai; đã sửa nhánh fetch theo token và cần xác minh lại sau build mới trước khi đóng nghiệm thu.
- Không chạy migration vào database VGG thật; database và tài khoản QA được tạo riêng rồi xóa.

## Những phần còn phải đóng trước khi coi là hoàn tất toàn bộ

1. Kiểm chứng runtime mapping toàn bộ trang/section/ngôn ngữ, so sánh trước-sau trên desktop/mobile; hiện chưa đủ bằng chứng để tuyên bố toàn website không sai lệch.
2. Tài nguyên: nháp độc lập/duyệt, phân trang máy chủ trong UI (hiện danh sách ban đầu tối đa 100), kiểm tra tệp còn tồn tại khi khôi phục; hoàn thiện điều khiển theo quyền trong UI.
3. SEO trang vẫn có luồng áp dụng riêng; cần thống nhất duyệt với nội dung trước cutover.
4. Editor collection cho ngành nguồn chỉ cho các list đã có cấu trúc được hỗ trợ; cần đóng mapping học phần nguồn thay vì chuyển ngầm sang list rỗng.
5. Khóa API quản trị layout cũ và chuyển menu sau nghiệm thu; hiện admin cũ còn để rollback nên không thể coi khóa layout là chính sách bắt buộc toàn hệ thống.
6. Kiểm tra hồi quy tài khoản/audit, khôi phục backup, migration dry-run trên bản sao dữ liệu thật; hướng dẫn vận hành và biên bản nghiệm thu.

## Phạm vi frontend

Chỉ thay kết nối dữ liệu preview ở trang chi tiết tin và helper news. Không thay JSX layout/CSS hiển thị. Các thay đổi font, home.css, root layout và typography có sẵn của công việc khác được giữ nguyên.
