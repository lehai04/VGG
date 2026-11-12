# Đối chiếu URL và trường nội dung CMS VGG

Đợt đầu cho biên tập viên sửa nội dung tiếng Việt của các trang VGG hiện có trong CMS. Bảng tách phần thực sự được trang render khỏi trường CMS cần cung cấp. Cột trường CMS mô tả yêu cầu, kể cả các trường hiện còn nằm trong mã. URL trong bảng dùng tiền tố công khai `/vi`. Route tương ứng với tiền tố `/en` vẫn tồn tại theo mã nguồn. URL không có tiền tố được chuyển sang ngôn ngữ mặc định.

## Trang nội dung và trường cần sửa

| URL | Phần đang có trong mã render | Trường CMS cần cho sửa | Nguồn và khoảng trống |
|---|---|---|---|
| `/vi` | Banner, tìm chương trình, giới thiệu Viện, nghiên cứu, nhóm chương trình, tư vấn | **Banner** nhãn, tiêu đề, chữ nhấn, mô tả, ảnh và nút. **Tìm chương trình** tiêu đề, nhãn, gợi ý ô nhập, chữ nút. **Giới thiệu** nhãn, tiêu đề, chữ nhấn, đoạn giới thiệu. **Nghiên cứu** nhãn, tiêu đề, chữ nhấn, ảnh, văn bản thay thế, chú thích, mô tả và liên kết. **Nhóm chương trình** tên nhóm, mô tả, ảnh và nhãn liên kết. **Tư vấn** tiêu đề, mô tả, lợi ích, nhãn form và thông báo. | [Route Trang chủ](../../frontend/src/app/%28public%29/page.tsx), [nội dung mặc định](../../frontend/src/data/home-content.ts), [form tư vấn](../../frontend/src/features/home/components/ResourcesConsultation.tsx). Tin mới là khối có thể thêm theo yêu cầu, chưa có trong phần mặc định đang render. |
| `/vi/discover` | Banner, Giới thiệu Viện, Tầm nhìn và Sứ mệnh, Triết lý giáo dục, Giá trị cốt lõi, Lợi thế người học, Lãnh đạo và người phụ trách, lời kết | **Banner** tiêu đề, dòng phụ, mô tả, ảnh và nút. **Giới thiệu, tầm nhìn, sứ mệnh** tiêu đề, nhãn và các đoạn văn. **Triết lý, giá trị, lợi thế** tiêu đề, lời dẫn và mục lặp gồm tiêu đề, mô tả, ảnh nếu phần có ảnh. **Lãnh đạo** tên, chức danh, ảnh, mô tả và thông tin công khai đang hiển thị. **Lời kết** tiêu đề, thông điệp, mô tả và liên kết đang hiển thị. | [Trang Giới thiệu](../../frontend/src/features/discover/components/DiscoverIntroduction.tsx), [nội dung](../../frontend/src/data/discover-introduction.json). Định hướng phát triển có dữ liệu mặc định nhưng không có phần riêng trong trang đang render. |
| `/vi/programmes` | Banner, điều hướng nhanh, danh mục, bộ tìm kiếm/lọc chương trình và khối bước tiếp theo | **Banner** nhãn, tiêu đề, mô tả, ảnh, nút và nhãn liên kết. **Danh mục** tiêu đề, mô tả, nhãn tìm kiếm/bộ lọc, nhãn thẻ và thông báo rỗng. Thẻ lấy tên, ảnh và thông tin hiển thị từ hồ sơ chương trình. | [Trang danh mục](../../frontend/src/features/programmes/components/ProgrammesPage.tsx), [bộ lọc](../../frontend/src/features/programmes/components/ProgrammeDirectory.tsx), [dữ liệu danh mục](../../frontend/src/data/programmes/catalogue-copy.ts). Danh mục và bộ tìm không cần nhập lại từng chương trình. |
| `/vi/programmes/{slug}` | Banner, thông tin nhanh, tổng quan, điểm nổi bật, đối tượng, nghề nghiệp, khung đào tạo, học phí, hồ sơ/hỗ trợ khi có, FAQ, thông tin liên hệ và form tư vấn | Dùng bảng trường chi tiết chương trình bên dưới. Một hồ sơ chương trình cấp dữ liệu cho trang chi tiết và các nơi đang lấy thông tin chương trình. | [Trang chi tiết](../../frontend/src/features/programmes/components/ProgrammeDetailPage.tsx), [kiểu dữ liệu](../../frontend/src/data/programmes.ts), [dữ liệu chương trình](../../frontend/src/lib/website-content.ts). |
| `/vi/admissions` | Banner, thông báo/lịch tuyển sinh, điều kiện/phương thức, học phí/học bổng, hồ sơ, quy trình/kết quả, FAQ, tư vấn. Có nội dung riêng theo bậc Thạc sĩ và Tiến sĩ. | **Banner** nhãn, tiêu đề, mô tả, ảnh, nhãn nút. **Lịch** đợt, mốc, hạn và ghi chú. **Điều kiện** tiêu đề nhóm và nội dung. **Học phí/học bổng** nhãn, nội dung chính sách, ghi chú và liên kết. **Hồ sơ** tên biểu mẫu, hướng dẫn, tệp, mục checklist. **Quy trình/kết quả** tên bước, hướng dẫn, liên kết. **FAQ** câu hỏi, câu trả lời. **Tư vấn** tiêu đề, mô tả, nhãn/gợi ý, chữ nút và thông báo. | [Trang Tuyển sinh](../../frontend/src/features/admissions/AdmissionsReference.tsx), [bản mẫu HTML](../../frontend/src/features/admissions/reference-content.json), [trường đã tách](../../frontend/src/features/admissions/content-copy.json), [quy trình và FAQ](../../frontend/src/features/admissions/editorial-content.json). Dữ liệu ngành/học phí đang được truyền từ danh mục chương trình. Giữ các cơ chế tương tác hiện có khi sửa nội dung. |
| `/vi/research` | Banner, tổng quan, mục tiêu, lĩnh vực, dự án/công bố, đối tác chiến lược, hợp tác doanh nghiệp và khối bước tiếp theo | **Banner, tổng quan** nhãn, tiêu đề, mô tả, ảnh và văn bản thay thế. **Mục tiêu, lĩnh vực** tiêu đề, giới thiệu và các mục đang hiển thị. **Dự án/công bố** tiêu đề phần, nhãn/liên kết xem tất cả, tiêu đề thẻ, mô tả, ảnh, đích liên kết tại nguồn bài. **Đối tác** tên, logo, mô tả, liên kết khi có. **Doanh nghiệp** ảnh, chú thích, số liệu và mô tả. | [Trang Nghiên cứu](../../frontend/src/features/research/components/ResearchLanding.tsx), [dự án/công bố](../../frontend/src/features/research/components/ResearchHighlights.tsx). Khối nổi bật đọc bài theo nhóm nghiên cứu từ API và hiện có dữ liệu dự phòng trong mã. Cần đối chiếu dữ liệu dự phòng trước khi chuyển vào CMS. |
| `/vi/student-success` | Banner, Học tập và phát triển, Cộng đồng, Dịch vụ người học, Khoảnh khắc và khối bước tiếp theo | **Banner** nhãn, tiêu đề, mô tả, ảnh và văn bản thay thế. **Học tập, cộng đồng** nhãn, tiêu đề, đoạn mô tả, ảnh, văn bản thay thế và nút. **Dịch vụ** tiêu đề, lời dẫn, tiêu đề/mô tả/ảnh từng thẻ. **Khoảnh khắc** nhãn, tiêu đề, ảnh, văn bản thay thế. | [Trang Hỗ trợ học viên](../../frontend/src/features/student-success/components/StudentSuccessPage.tsx), [nội dung](../../frontend/src/data/student-success-content.ts). Một số URL nằm trong dữ liệu thẻ nhưng renderer hiện chỉ dùng tiêu đề, mô tả và ảnh. |
| `/vi/news` | Banner, tìm kiếm, lọc chuyên mục, kết quả, phân trang, trạng thái rỗng | Ảnh/banner, nhãn, tiêu đề, mô tả, nhãn tìm kiếm/bộ lọc, tiêu đề kết quả, nội dung trạng thái rỗng. Tiêu đề, ảnh, mô tả và đích của từng thẻ lấy từ bài; danh sách bài công khai sắp mới nhất trước. | [Trang Tin tức](../../frontend/src/features/news/components/NewsLanding.tsx), [API công khai](../../backend/src/modules/public/public.routes.ts). Nội dung tĩnh của màn hình danh sách còn trong component. |
| `/vi/news/{slug}` | Breadcrumb, chuyên mục, tiêu đề, tác giả/ngày đăng, chia sẻ, ảnh bìa, mô tả, thân bài, tin gần đây | Tiêu đề, chuyên mục, tên tác giả hiển thị, ảnh bìa và văn bản thay thế, mô tả, thân bài có định dạng chữ/ảnh/liên kết, thông tin SEO/ảnh chia sẻ. Ngày đăng lấy từ lần xuất bản theo quy trình. Nhãn chia sẻ và tin gần đây là nội dung dùng chung; các thẻ tin gần đây sinh tự động. | [Trang bài viết](../../frontend/src/app/%28public%29/news/%5Bslug%5D/page.tsx), [mô hình NewsPost](../../backend/prisma/schema.prisma). Slug thực tế đến từ dữ liệu bài viết, không suy ra từ dữ liệu demo. |
| `/vi/resources` | Banner, phần tra cứu, tìm kiếm và lọc theo danh mục/loại, thẻ tài liệu, xem trước và tải xuống | **Banner/tra cứu** nhãn, tiêu đề, mô tả, ảnh, gợi ý tìm kiếm và trạng thái rỗng. **Danh mục** tên hiển thị. **Tài liệu** tên, mô tả, danh mục, loại, số văn bản, đơn vị ban hành, ngày và tệp theo các trường đang dùng. **Xem/tải** nhãn nút và nhãn hộp xem trước. | [Trang Tài nguyên](../../frontend/src/features/resources/components/ResourcesLanding.tsx), [tra cứu tài liệu](../../frontend/src/features/resources/components/ResourcesExplorer.tsx), [mô hình tài nguyên](../../backend/prisma/schema.prisma). Từng tệp là một mục trên danh sách, có đường dẫn tải nhưng không có trang chi tiết riêng. |

## Nội dung dùng chung

| Phạm vi | Phần đang có | Trường CMS cần cho sửa |
|---|---|---|
| Đầu trang của website | Logo, menu chính và menu con | Ảnh logo và văn bản thay thế khi thuộc nội dung biên tập. Tên hiển thị và đích của mục menu, quan hệ cha/con, thứ tự, trạng thái ẩn/hiện. Cho thêm và xóa mục theo phạm vi đã chốt. |
| Chân trang của website | Thông tin liên hệ, nhóm liên kết về Viện, truy cập nhanh, mạng xã hội, địa điểm, liên kết pháp lý; liên kết ứng tuyển và các nút nhanh | Tiêu đề nhóm, tên và đích từng liên kết, tên cơ sở, địa chỉ, điện thoại, email, nhãn nút. Cho thêm, xóa, ẩn, hiện và đổi thứ tự các nhóm liên kết. |
| Mỗi trang nội dung | Tiêu đề, mô tả trang và metadata chia sẻ | Tiêu đề SEO, mô tả SEO, ảnh chia sẻ. Dùng tiêu đề/mô tả/ảnh mặc định của trang nếu biên tập viên bỏ trống. |
| Danh mục chương trình, Nghiên cứu và Hỗ trợ học viên | Khối Bước tiếp theo dùng chung | Tiêu đề, lời dẫn, nhãn và đích nút theo [component](../../frontend/src/features/content/components/NextStepCTA.tsx). |
| Các nơi đặt form tư vấn | Lời dẫn, nhãn trường, nút gửi, thông báo xác nhận/lỗi | Cho sửa nội dung hiển thị. Dùng lại luồng gửi hiện có, các trường dữ liệu của API và quy tắc kiểm tra đang áp dụng. |
| Khối thêm vào Trang chủ và Giới thiệu | Bộ tám loại khối đã chốt | **Banner** nhãn, tiêu đề, mô tả, ảnh, nút. **Văn bản** tiêu đề và nội dung định dạng. **Ảnh** tệp, văn bản thay thế và chú thích. **Nút** nhãn và đích. **Tin mới** tiêu đề, số mục hiển thị, nguồn tự động. **Liên hệ** tên đơn vị, địa chỉ, điện thoại, email. **Biểu mẫu** chữ hiển thị và luồng tiếp nhận hiện có. **Bản đồ** tên địa điểm, địa chỉ và liên kết hoặc vị trí bản đồ. |

[Nguồn đầu/chân trang](../../frontend/src/data/chrome-content.ts) · [Cấu trúc chân trang](../../frontend/src/shared/components/layout/footer/footerData.ts) · [SEO theo URL](../../frontend/src/lib/page-seo.ts) · [Registry phần nội dung](../../backend/src/modules/content/visual-model.ts)

Trên màn hình sửa, biên tập viên có thể chọn phần từ danh sách hoặc bấm vào phần trên bản xem trước máy tính. Mỗi ô ảnh/tệp cho tải mới hoặc chọn từ Quản lý tài nguyên. Sửa nội dung tạo bản nháp để gửi duyệt. Người duyệt có thể sửa, trả lại kèm lý do, xuất bản ngay hoặc khôi phục bản cũ.

## Trường trên trang chi tiết chương trình

Bảng dùng cho từng URL chương trình bên dưới. Một phần tùy chọn chỉ xuất hiện khi trang có dữ liệu tương ứng. Mẫu và thứ tự bố cục theo trang hiện có.

| Phần render | Trường CMS cần cho sửa |
|---|---|
| Banner và thông tin nhanh | Tên chương trình, tên tiếng Anh nếu đang hiển thị, nhãn, khẩu hiệu, giới thiệu ngắn, ảnh và văn bản thay thế, ghi nguồn ảnh, nhãn/đích CTA. Mã ngành, bậc, nhóm ngành, định hướng, số tín chỉ, thời lượng, học phí tóm tắt và ghi chú theo trường dữ liệu. |
| Tổng quan | Tiêu đề, đoạn nội dung, ảnh, nguồn ảnh, nhóm trọng tâm, thẻ và liên kết tư vấn khi có. |
| Điểm nổi bật và chuẩn đầu ra | Tiêu đề, mô tả từng điểm; lời dẫn và các mục chuẩn đầu ra gồm mã, tên và mô tả nếu đang dùng. |
| Đối tượng và điều kiện | Tiêu đề, lời dẫn, nhóm điều kiện, nội dung từng đối tượng, ảnh minh họa, văn bản thay thế và nguồn ảnh. |
| Nghề nghiệp | Tiêu đề, lời dẫn, ảnh, ghi chú và các nhóm/vị trí nghề nghiệp kèm mô tả. |
| Chương trình đào tạo | Lời dẫn, định hướng, tín chỉ/thời lượng, bảng thông tin, nhóm môn/học kỳ, tên môn, tín chỉ, ghi chú và yêu cầu tốt nghiệp nếu có. |
| Học phí | Tiêu đề, kỳ tuyển sinh, ngôn ngữ, tổng học phí, đợt đóng và số tiền, các phương án, phí bổ sung và ghi chú nếu có. |
| Hồ sơ, hỗ trợ, FAQ | Tiêu đề và nội dung từng nhóm hồ sơ/quy trình/hỗ trợ khi có. Câu hỏi, câu trả lời và trạng thái hiển thị của từng FAQ. |
| Liên hệ và tư vấn | Tiêu đề, mô tả, lợi ích, nhãn nút và đích liên hệ, điện thoại, email, địa chỉ và nội dung giới thiệu form. |

## URL chi tiết chương trình trong mã nguồn

| URL | Trạng thái theo nguồn | Phần có dữ liệu theo ngành ngoài các trường chung |
|---|---|---|
| `/vi/programmes/cong-nghe-sinh-hoc` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, kế hoạch học kỳ, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/cong-nghe-sinh-hoc.ts) |
| `/vi/programmes/cong-nghe-thong-tin` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, chuẩn đầu ra, học phí tóm tắt · [dữ liệu ngành](../../frontend/src/data/programmes/cong-nghe-thong-tin.ts) |
| `/vi/programmes/ke-toan` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, kế hoạch học kỳ, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/ke-toan.ts) |
| `/vi/programmes/khoa-hoc-moi-truong` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, học phí tóm tắt · [dữ liệu ngành](../../frontend/src/data/programmes/khoa-hoc-moi-truong.ts) |
| `/vi/programmes/kien-truc` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/kien-truc.ts) |
| `/vi/programmes/kinh-doanh-thuong-mai` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, kế hoạch học kỳ, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/kinh-doanh-thuong-mai.ts) |
| `/vi/programmes/ky-thuat-moi-truong` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/ky-thuat-moi-truong.ts) |
| `/vi/programmes/ky-thuat-o-to` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/ky-thuat-o-to.ts) |
| `/vi/programmes/ky-thuat-xay-dung` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, học phí tóm tắt · [dữ liệu ngành](../../frontend/src/data/programmes/ky-thuat-xay-dung.ts) |
| `/vi/programmes/logistics` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/logistics.ts) |
| `/vi/programmes/luat-kinh-te` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, kế hoạch học kỳ, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/luat-kinh-te.ts) |
| `/vi/programmes/ly-luan-lich-su-my-thuat` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/ly-luan-lich-su-my-thuat.ts) |
| `/vi/programmes/marketing` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, kế hoạch học kỳ, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/marketing.ts) |
| `/vi/programmes/my-thuat-ung-dung` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, kế hoạch học kỳ, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/my-thuat-ung-dung.ts) |
| `/vi/programmes/ngon-ngu-anh` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/ngon-ngu-anh.ts) |
| `/vi/programmes/quan-he-cong-chung` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/quan-he-cong-chung.ts) |
| `/vi/programmes/quan-ly-tai-nguyen-moi-truong` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/quan-ly-tai-nguyen-moi-truong.ts) |
| `/vi/programmes/quan-tri-du-lich` | Bị lọc khỏi danh mục ở mã nguồn; route động chuyển về danh mục | 2 khung đào tạo, học phí tóm tắt · [dữ liệu ngành](../../frontend/src/data/programmes/quan-tri-du-lich.ts) |
| `/vi/programmes/quan-tri-khach-san` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/quan-tri-khach-san.ts) |
| `/vi/programmes/quan-tri-kinh-doanh` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 1 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/quan-tri-kinh-doanh.ts) |
| `/vi/programmes/tai-chinh-ngan-hang` | Có dữ liệu nguồn; trạng thái có thể chịu cấu hình từ API | 2 khung đào tạo, chuẩn đầu ra, học phí chi tiết · [dữ liệu ngành](../../frontend/src/data/programmes/tai-chinh-ngan-hang.ts) |

Số khung đào tạo và các mục tùy chọn trên được lấy từ dữ liệu chương trình trong repo. Hồ sơ và hỗ trợ chỉ render khi bản ghi có dữ liệu tương ứng. Ngoài các mục trên, API có thể cấp thêm hồ sơ chương trình. Danh sách bài viết và chương trình chỉ tồn tại trong cơ sở dữ liệu cần trích xuất khi kiểm kê môi trường triển khai. Dùng URL và trạng thái thực tế để đối chiếu trước khi chuyển dữ liệu.

## Đường dẫn chuyển hướng và điểm neo

Các đường dẫn này có thể xuất hiện trong menu hoặc liên kết cũ. Nội dung thuộc trang đích và được sửa tại đó.

| URL hoặc nhóm URL cụ thể | Hành vi trong mã nguồn | Trường hoặc phần liên quan |
|---|---|---|
| `/vi/admissions#consultation`, `/vi/admissions#tu-van` | Điểm neo trong Tuyển sinh. Mục Liên hệ ở chân trang trỏ đến `#consultation`. | Trong CMS, mở **Tuyển sinh → Đăng ký tư vấn** để sửa tiêu đề, mô tả, nhãn/gợi ý, chữ nút và thông báo. Chỉnh tên và đích của mục Liên hệ trong phần chân trang. |
| `/vi/admissions/yeu-cau`, `/vi/admissions/hoc-phi`, `/vi/admissions/hoc-bong`, `/vi/admissions/nop-ho-so`, `/vi/admissions/moc-thoi-gian` | Mỗi URL chuyển sang `/vi/admissions#{slug}`. Mẫu hiện có neo `hoc-phi` nhưng không có ID trùng bốn slug còn lại. | Điều kiện, học phí/học bổng, hồ sơ và lịch nằm trong các phần tương ứng của Tuyển sinh. Đối chiếu đích neo khi chuyển dữ liệu. |
| `/vi/admissions/{slug}` | Cùng quy tắc chuyển sang `/vi/admissions#{slug}` cho các slug khác. | Chỉnh tại Tuyển sinh nếu phần đích tồn tại. |
| `/vi/research/cum-nghien-cuu`, `/vi/research/du-an`, `/vi/research/cong-bo` | Chuyển lần lượt sang `/vi/research#fields`, `/vi/research#du-an`, `/vi/research#cong-bo`. | Lĩnh vực, dự án và công bố. |
| `/vi/research/doi-moi-sang-tao`, `/vi/research/hop-tac-doanh-nghiep`, `/vi/research/doi-tac` | Chuyển lần lượt sang `/vi/research#goals`, `/vi/research#hop-tac-doanh-nghiep`, `/vi/research#strategic-partners-title`. | Mục tiêu, hợp tác doanh nghiệp và đối tác. |
| `/vi/research/{slug-khác}` | Chuyển về `/vi/research`. | Nội dung trang Nghiên cứu. |
| `/vi/global` | Chuyển sang `/vi/research#strategic-partners-title`. | Đối tác chiến lược trên trang Nghiên cứu. |
| `/vi/global/{slug}` | Chuyển sang `/vi/research/{slug}`, rồi áp dụng quy tắc ở trên. Trong các slug menu cũ, `doi-tac` có điểm neo riêng; `trao-doi`, `dual-degree`, `thuc-tap`, `study-tour`, `overseas-immersion` về đầu trang Nghiên cứu. | Chỉnh nội dung tại Nghiên cứu. |
| `/vi/student-success/ho-tro-hoc-vien`, `/vi/student-success/phat-trien-su-nghiep`, `/vi/student-success/tai-nguyen-hoc-tap`, `/vi/student-success/cuu-hoc-vien` | Chuyển về điểm neo cùng tên trên `/vi/student-success`. | Thẻ dịch vụ người học. |
| `/vi/student-success/{slug}` | Slug ngoài bốn mục trên chuyển về `/vi/student-success`. | Nội dung trang Hỗ trợ học viên. |
| `/vi/programmes/thac-si`, `/vi/programmes/tien-si` | Chuyển về danh mục, chọn bậc tương ứng qua query `degree`. | Danh mục và bộ lọc theo bậc. |
| `/vi/programmes/{slug-không-khớp}` | Hiện chuyển về danh mục khi không tìm thấy chương trình. | Với chương trình bị ẩn qua CMS, yêu cầu mới là 404 và dùng lại URL cũ khi hiện. |
| `/vi/news/su-kien` | Nếu không khớp bài công khai, chuyển sang danh sách với bộ lọc sự kiện. | Danh sách tin. |
| `/vi/news/tin-tuc`, `/vi/news/seminar-webinar`, `/vi/news/thong-cao-bao-chi`, `/vi/news/thu-vien-hinh-anh`, `/vi/news/video` | Nếu không khớp bài công khai, chuyển về `/vi/news`. Slug khác không khớp trả 404. | Danh sách tin và các bài đã xuất bản. |
| `/vi/resources/{slug}` | Chuyển về `/vi/resources`. | Danh sách tài nguyên và bản ghi tài liệu. |
| `/robots.txt`, `/sitemap.xml`, trang lỗi 404 | URL hệ thống. | Sitemap cần đồng bộ trạng thái công khai. Lỗi 404 là kết quả truy cập URL đã ẩn. |

[Nguồn điều hướng](../../frontend/src/data/site.ts) · [Locale](../../frontend/src/proxy.ts) · [Sitemap](../../frontend/src/app/sitemap.ts) · [Chính sách hiển thị hiện tại](../../frontend/src/lib/public-sections.ts) · [URL tin cũ](../../frontend/src/features/news/links.ts)

## Quy tắc hiển thị và điểm cần đối chiếu

- Trang chuyên mục hoặc trang chi tiết bị ẩn trả 404 tại URL công khai. Khi ẩn chuyên mục, người duyệt chọn phạm vi áp dụng riêng chuyên mục hoặc cả trang chi tiết. Hiện lại chuyên mục chỉ khôi phục các trang chi tiết vốn công khai. Trạng thái ẩn riêng của từng trang chi tiết được giữ.
- Menu, chân trang và danh sách tự động tạm bỏ mục trỏ đến trang bị ẩn. Khi trang mở lại, chỉ tự hiện lại mục vốn hiển thị. Giữ nguyên URL gốc trong dữ liệu để dùng lại khi hiện.
- Tin tức và Hỗ trợ học viên hiện được phép truy cập theo cấu hình mã nguồn. Tình trạng URL và dữ liệu thực tế của môi trường triển khai cần được kiểm kê khi chuyển nội dung.
- **Liên hệ** được quản lý tại phần Đăng ký tư vấn của trang Tuyển sinh và tiếp tục dùng điểm neo hiện có. Biểu mẫu dùng lại luồng tiếp nhận hiện tại.
- **Landing page Giới thiệu sản phẩm hoặc dịch vụ** là mẫu đã chọn cho chức năng tạo trang. Cây route hiện tại chưa có URL landing page riêng theo mẫu này. Bố cục và các trường của mẫu chưa chốt.
