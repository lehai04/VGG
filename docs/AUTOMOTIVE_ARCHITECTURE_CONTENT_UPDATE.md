# Cập nhật Kỹ thuật ô tô và Kiến trúc — 24/10/2026

Nguồn: `C:/Users/lepha/Downloads/thac-si-ky-thuat-o-to.html` và `thac-si-kien-truc.html`, do người dùng chỉ định. Nhập nội dung và ảnh WebP nhúng; không thực thi script của HTML. Dùng layout chung hiện tại cho thanh thông tin, menu, tuyển sinh, học phí, form và footer.

## Kỹ thuật ô tô

Route `/vi/programmes/ky-thuat-o-to`, file `frontend/src/data/programmes/ky-thuat-o-to.ts`. Mã ngành 520130, mã chương trình 8520130, Master of Automotive Engineering; 60 tín chỉ cho mỗi định hướng.

- Ứng dụng: 18 tháng, danh mục 25 học phần; bắt buộc 51 tín chỉ và tự chọn 9 tín chỉ; chuyên đề 3, thực tập chuyên môn nâng cao 6, đề án 6 tín chỉ.
- Nghiên cứu: 24 tháng, danh mục 25 học phần; bắt buộc 48 tín chỉ và tự chọn 12 tín chỉ; hai chuyên đề 3 tín chỉ mỗi chuyên đề, luận văn 15 tín chỉ.
- Giữ 6 mục tiêu phát triển năng lực theo nguồn, không đổi tên thành PLO. Ghi rõ mục tiêu chung và mục tiêu riêng từng định hướng.
- Nhập điều kiện nghiên cứu, danh mục miễn bổ sung, nhóm ngành gần tối đa 9 tín chỉ và nhóm kỹ thuật khác tối đa 15 tín chỉ, yêu cầu công nhận văn bằng nước ngoài, 6 hướng nghề nghiệp, học phí, 6 FAQ và nội dung tư vấn riêng.
- Chuyển tab cập nhật đúng khung học phần, thời lượng và yêu cầu hoàn thành. Không thêm yêu cầu công bố tốt nghiệp từ Kỹ thuật Môi trường sang ngành này.
- Đối chiếu DOM gộp hai tab: **244/244 mục**, không thiếu.

## Kiến trúc

Route `/vi/programmes/kien-truc`, file `frontend/src/data/programmes/kien-truc.ts`. Mã ngành 580101, mã chương trình 8580101, Master of Architecture; ứng dụng, 18 tháng, 60 tín chỉ.

- Danh mục 27 học phần; bắt buộc 46 tín chỉ và tự chọn 14 tín chỉ. Bảy nhóm tự chọn, mỗi nhóm hai lựa chọn, chọn một môn 2 tín chỉ ở mỗi nhóm.
- Khối phát triển dự án/thực tập/đề cương 15 tín chỉ; đề án 9 tín chỉ. Không tự dịch tên học phần tiếng Anh vì nguồn không cung cấp.
- Nhập 10 PLO, 6 hướng nghề nghiệp, điều kiện ngành phù hợp, miễn bổ sung cho người tốt nghiệp Kiến trúc có chương trình đại học từ 150 tín chỉ, nhóm còn lại trong danh mục bổ sung tối đa 9 tín chỉ, yêu cầu văn bằng nước ngoài, học phí và 6 FAQ.
- Đối chiếu DOM: **221/221 mục**, không thiếu.

Hai nguồn không có kế hoạch từng học kỳ. Đã giữ ghi chú triển khai theo kế hoạch của Khoa, không tự tạo học kỳ hoặc lịch mở lớp. Học phí mỗi ngành 85 triệu đồng, ba đợt 29,75/25,5/29,75 triệu đồng và các khoản thu riêng theo chính nguồn.

## Kiểm chứng và phạm vi

Typecheck, lint các file thay đổi, build frontend và **18/18 tests qua**. Browser kiểm tra cả hai trang ở 320/768/960/1440px: một H1, không tràn ngang, không anchor nội bộ hỏng, đủ 4 trường form và chọn đúng ngành. Mobile mở đủ 27 accordion Kiến trúc, 28 accordion ô tô ứng dụng và 30 accordion ô tô nghiên cứu; console không có error trong lượt kiểm tra.

Component dùng key kết hợp nhãn/tiêu đề cho các mục tiêu năng lực có nhãn trùng, và hỗ trợ tên thẻ “Yêu cầu ngoại ngữ” từ nguồn Kiến trúc. Nội dung ngành khác được giữ nguyên. Không gửi đăng ký thật, không đổi API/auth/database, không publish.

Bằng chứng và bản trước sửa: `outputs/ky-thuat-o-to-update`, `outputs/kien-truc-update`; kiểm tra responsive tại `outputs/auto-architecture-browser.json`, build cuối tại `outputs/auto-architecture-build-final.log`.
