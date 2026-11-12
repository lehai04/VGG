# Đặc tả cập nhật CMS VGG và tiêu chí nghiệm thu

**Phiên bản 0.1 · 10/11/2026 · Phạm vi nghiệp vụ đợt đầu**

Biên tập viên VGG có thể sửa nội dung tiếng Việt của mọi trang công khai hiện có qua CMS, xem trước và gửi duyệt. Người duyệt quyết định nội dung nào được công khai và có thể khôi phục phiên bản trước. Sau khi chuyển nội dung hiện có sang CMS, người đọc tiếp tục dùng các URL cũ.

[Bảng đối chiếu URL và trường CMS](VGG_CMS_URL_FIELD_MATRIX.md) là danh mục chi tiết cho đặc tả này. Bảng bao phủ 16 mẫu route trong mã nguồn và 21 URL chương trình từ dữ liệu nguồn, gồm cả route chuyển hướng và chương trình đang bị lọc. Kiểm kê dữ liệu triển khai bổ sung các bài viết và chương trình chỉ có trong cơ sở dữ liệu.

Đặc tả dùng quy trình duyệt chung cho menu và chân trang. Việc ghi người thao tác, chống ghi đè khi sửa đồng thời và đồng bộ sitemap là các quy tắc vận hành bổ sung trong bản đặc tả.

## 1. Phạm vi biên tập

| Mã | Phạm vi | Yêu cầu |
|---|---|---|
| FR-01 | Danh mục trang | CMS hiển thị các trang tiếng Việt theo tên và URL, gồm trang đang công khai và trang đã ẩn. Mỗi trang có danh sách phần nội dung và trạng thái công khai. Route chuyển hướng hoặc điểm neo dẫn biên tập viên đến phần tương ứng trên trang đích. |
| FR-02 | Trang chủ và Giới thiệu | Cho sửa trường hiện có, thêm khối theo mẫu, xóa khối và đổi thứ tự. Bộ mẫu gồm banner, văn bản, ảnh, nút liên kết, tin mới, thông tin liên hệ, biểu mẫu liên hệ và bản đồ. Khối tin mới lấy bài công khai tự động. |
| FR-03 | Tuyển sinh, Chương trình đào tạo, Nghiên cứu, Hỗ trợ học viên, Tài nguyên và trang chuyên mục hiện có | Giữ bố cục và thứ tự phần của từng trang. Biên tập viên sửa các trường nội dung trong phần có sẵn theo bảng đối chiếu. Các phần tương tác như bộ lọc ngành, chọn bậc học, tra cứu tài liệu và checklist tiếp tục hoạt động theo luồng hiện có. |
| FR-04 | Trang chi tiết chương trình | Sửa dữ liệu theo từng hồ sơ, gồm banner, thông tin nhanh, tổng quan, điểm nổi bật, đối tượng, nghề nghiệp, khung đào tạo, học phí, FAQ, tư vấn và các phần tùy chọn có dữ liệu. Các nơi đang lấy dữ liệu từ cùng hồ sơ nhận nội dung đã xuất bản của hồ sơ đó. |
| FR-05 | Tin tức | Sửa tiêu đề, ảnh đại diện và văn bản thay thế, mô tả, chuyên mục, tên tác giả hiển thị và thân bài định dạng chữ, ảnh, liên kết. Trang danh sách cho sửa nội dung tĩnh trong bố cục hiện tại. Bài xuất bản tự xuất hiện theo ngày đăng, mới nhất trước. |
| FR-06 | Menu và chân trang | Với menu, cho sửa tên và đích liên kết, thêm, xóa, ẩn, hiện, đổi thứ tự mục chính và mục con. Với chân trang, cho sửa thông tin hiển thị và thêm, xóa, ẩn, hiện, đổi thứ tự nhóm liên kết. Cả hai dùng luồng nháp và duyệt trước khi thay đổi công khai. |
| FR-07 | Liên hệ | Mục Liên hệ ở chân trang tiếp tục dùng `/vi/admissions#consultation`. Mở **Tuyển sinh → Đăng ký tư vấn** trong CMS để sửa lời dẫn, tiêu đề, nhãn/gợi ý, chữ nút và thông báo. Dữ liệu khách gửi tiếp tục đi theo luồng tiếp nhận đang dùng. |
| FR-08 | Ảnh, tệp và thông tin chia sẻ | Trường ảnh và tệp cho tải tệp mới ngay trong màn hình sửa hoặc chọn tệp từ **Quản lý tài nguyên**. Cho sửa riêng tiêu đề SEO, mô tả SEO và ảnh khi chia sẻ. URL công khai của trang hiện có được giữ khi xuất bản. |
| FR-09 | Tạo landing page · Chờ chốt phạm vi | Nếu đưa vào đợt đầu, CMS có một mẫu **Giới thiệu sản phẩm hoặc dịch vụ**. Biên tập viên chọn mẫu, điền nội dung trong bố cục cố định, xem trước và gửi duyệt. Sau khi xuất bản, trang truy cập được qua URL công khai riêng. |

## 2. Luồng biên tập, duyệt và khôi phục

| Mã | Bước | Quy tắc |
|---|---|---|
| FR-10 | Sửa và xem trước | Biên tập viên mở phần cần sửa từ danh sách hoặc bấm vào phần đó trên bản xem trước máy tính để mở đúng trường. Bản xem trước hiển thị bản nháp với bố cục của trang công khai. Người được cấp quyền mới mở được bản nháp. |
| FR-11 | Lưu và gửi duyệt | Lưu thay đổi thành bản nháp. Khi gửi duyệt, CMS đưa bản cần duyệt vào danh sách của người duyệt. Nếu trang đã công khai, khách tiếp tục xem phiên bản đang xuất bản trong lúc biên tập và duyệt. |
| FR-12 | Xử lý bản chờ duyệt | Người duyệt có thể sửa trực tiếp bản chờ duyệt hoặc trả về kèm lý do. Biên tập viên thấy lý do, sửa và gửi lại. Chỉ người duyệt có quyền xuất bản. Khi xuất bản thành công, nội dung lên website ngay. |
| FR-13 | Lịch sử và khôi phục | CMS lưu các phiên bản đã xuất bản, cho xem nội dung từng phiên bản và ghi nhận người thao tác cùng thời điểm. Người duyệt chọn một phiên bản cũ để đưa lên website ngay. Lần khôi phục được ghi thành một sự kiện trong lịch sử. |
| FR-14 | Tính nhất quán | Khi thao tác lưu, xuất bản hoặc khôi phục lỗi, CMS báo trạng thái và giữ bản công khai gần nhất đã lưu thành công. Nếu hai người cùng sửa, CMS phát hiện bản họ mở đã cũ và yêu cầu tải lại hoặc xử lý xung đột trước khi ghi đè. Các kiểm tra quyền áp dụng cả khi thao tác qua API. |

Trạng thái bản sửa gồm **Bản nháp**, **Chờ duyệt** và **Trả lại**. Phiên bản công khai và trạng thái ẩn/hiện được theo dõi riêng để CMS có thể giữ bản đang công khai trong khi một bản sửa chờ duyệt.

## 3. Ẩn và hiện trang

| Mã | Thao tác | Hành vi trên website |
|---|---|---|
| FR-15 | Người duyệt ẩn riêng một trang chi tiết | URL của trang trả HTTP 404. Trang chuyên mục và các trang chi tiết khác vẫn truy cập được theo trạng thái của chúng. Hiện lại trang dùng URL cũ. |
| FR-16 | Người duyệt ẩn một chuyên mục | Mỗi lần ẩn, người duyệt chọn **chỉ trang chuyên mục** hoặc **cả chuyên mục và các trang chi tiết**. Ở lựa chọn thứ nhất, chỉ URL chuyên mục trả 404. Ở lựa chọn thứ hai, cả chuyên mục và các trang chi tiết đều trả 404. |
| FR-17 | Người duyệt hiện lại chuyên mục | Khôi phục các trang chi tiết vốn công khai trước lần ẩn theo chuyên mục. Trang đã ẩn riêng vẫn ẩn. Nếu một trang đang đồng thời chịu quy tắc ẩn riêng, ưu tiên trạng thái ẩn riêng. |
| FR-18 | Tự cập nhật các mục dẫn tới trang | Khi trang ẩn, menu, chân trang và danh sách tự động bỏ các mục trỏ đến trang đó. Khi trang hiện, chỉ khôi phục mục vốn hiển thị và vẫn đủ điều kiện hiển thị theo cấu hình hiện tại. Sitemap loại URL đang ẩn. |

## 4. Chuyển nội dung hiện có

**FR-19.** Kiểm kê từng URL và bản ghi tiếng Việt theo bảng đối chiếu, bổ sung dữ liệu đang có trong môi trường triển khai. Mỗi mục ghi URL, loại trang, nguồn, trạng thái công khai, phần/trường, tài nguyên tham chiếu và đích chuyển hướng nếu có. Chuyển dữ liệu nguồn và dữ liệu đã biên tập sang CMS theo trạng thái đang dùng. Kiểm kê cả nội dung mặc định trong mã đang thực sự hiển thị. So sánh dữ liệu đang công khai với dữ liệu sau chuyển trước khi bàn giao.

**FR-20.** Giữ URL và đích liên kết của các trang và bài viết hiện có. Khi đối chiếu các chuyển hướng cũ, ghi riêng các điểm neo Tuyển sinh có trong URL nhưng thiếu trong mẫu trang, cùng trang Quản trị du lịch đang bị lọc trong mã. Chuyển nội dung phải tôn trọng trạng thái hiện có và giữ nguyên liên kết ảnh/tệp cần dùng. Xác nhận nguồn của nội dung dự án và công bố đang dùng dữ liệu dự phòng trước khi đưa vào CMS.

## 5. Tiêu chí nghiệm thu

Thực hiện trên môi trường nghiệm thu có bản sao dữ liệu phù hợp, tài khoản biên tập viên và người duyệt. Kiểm tra cả thao tác trong CMS và kết quả trên website bằng trình duyệt chưa đăng nhập. Các ca dưới đây là tiêu chí cần đạt khi triển khai.

| Mã | Yêu cầu | Thao tác kiểm tra | Kết quả đạt |
|---|---|---|---|
| AC-01 | FR-01 | Đối chiếu danh mục CMS với toàn bộ URL và bản ghi trong kiểm kê. Mở một trang đã ẩn và một URL chuyển hướng trong danh mục đối chiếu. | Trang nội dung mở đúng bản ghi, phần và trạng thái. URL chuyển hướng/điểm neo dẫn đến phần đích mà không sinh nội dung trùng. |
| AC-02 | FR-02 | Trên Trang chủ và Giới thiệu, thêm lần lượt các loại khối đã chốt, đổi thứ tự và xóa một khối trong bản nháp. Sau đó xuất bản. | Bản xem trước và bản công khai sau duyệt hiển thị đúng tập khối và thứ tự. Khối tin mới chỉ lấy bài công khai. Khối form chuyển được dữ liệu thử đến hệ thống tiếp nhận. |
| AC-03 | FR-03, FR-04 | Sửa một trường của mỗi nhóm chuyên mục và một trường ở hồ sơ của hai ngành. Kiểm tra trên website sau khi xuất bản. | Nội dung đổi đúng phần và đúng ngành. Bố cục chuyên mục giữ nguyên. Dữ liệu chương trình được cập nhật tại các vị trí đang lấy cùng hồ sơ. Bộ lọc, FAQ, tra cứu, checklist và chức năng xem/tải tài liệu vẫn thao tác được. |
| AC-04 | FR-05 | Tạo hai bài bằng mẫu cố định, chèn ảnh và liên kết vào thân bài. Xuất bản lần lượt và kiểm tra danh sách. | Trang chi tiết render đúng nội dung đã duyệt. Danh sách hiển thị bài mới đăng trước. Bài nháp và bài bị ẩn không xuất hiện trong danh sách công khai. |
| AC-05 | FR-06, FR-07 | Thêm, ẩn, hiện, xóa và đổi thứ tự mục chính/mục con, chỉnh nhóm chân trang. Sửa lời dẫn tư vấn rồi gửi một lượt thử qua biểu mẫu. | Sau duyệt, menu và chân trang thay đổi đúng trên các trang dùng chung. Mục Liên hệ mở phần tư vấn Tuyển sinh. Dữ liệu thử đến đúng hệ thống tiếp nhận hiện có. |
| AC-06 | FR-08 | Tải một ảnh mới từ màn hình sửa, chọn một tệp có sẵn và nhập riêng tiêu đề, mô tả SEO, ảnh chia sẻ. Xuất bản. | Ảnh và tệp mở được từ trang công khai. Mã HTML trả về chứa đúng tiêu đề, mô tả và metadata ảnh chia sẻ. URL của trang giữ nguyên. |
| AC-07 | FR-09 · Có điều kiện | Nếu landing page thuộc đợt đầu, chọn mẫu, điền nội dung, xem trước, gửi duyệt và xuất bản. | Bố cục khớp mẫu được chốt ở mục 6. URL công khai mở đúng nội dung sau khi duyệt. |
| AC-08 | FR-10, FR-11 | Mở cùng một phần bằng danh sách và bằng bản xem trước. Lưu và gửi duyệt. Thử mở URL xem trước khi chưa đăng nhập. | Cả hai cách mở đúng trường. Bản nháp hiển thị trong CMS và vào danh sách chờ duyệt. Khách vẫn thấy bản công khai trước đó và không đọc được nháp qua URL xem trước. |
| AC-09 | FR-12, FR-14 | Dùng tài khoản biên tập viên thử xuất bản qua giao diện và API. Người duyệt trả lại kèm lý do, biên tập viên gửi lại, người duyệt sửa và xuất bản. | Biên tập viên bị chặn xuất bản. Lý do trả lại hiển thị cho biên tập viên. Sau khi người duyệt xuất bản thành công, lần tải mới trên website thấy đúng bản vừa duyệt. |
| AC-10 | FR-13, FR-14 | Xuất bản hai phiên bản và khôi phục phiên bản đầu. Mô phỏng lỗi ghi và thử lưu đồng thời từ hai phiên biên tập. | Phiên bản đầu trở lại ngay, lịch sử lưu sự kiện khôi phục. Lỗi ghi giữ bản công khai trước đó. Bản lưu từ dữ liệu cũ bị phát hiện, tránh ghi đè âm thầm. |
| AC-11 | FR-15, FR-16 | Chọn một chuyên mục có hai trang chi tiết đang công khai. Ẩn riêng một trang, sau đó lần lượt thử ẩn chỉ chuyên mục và ẩn cả chuyên mục lẫn trang chi tiết. Gọi trực tiếp các URL ở từng bước. | Ẩn riêng cho 404 đúng trang. Ẩn chỉ chuyên mục cho 404 ở URL chuyên mục, trang chi tiết đang công khai vẫn mở. Ẩn cả chuyên mục và trang chi tiết cho 404 ở tất cả URL thuộc phạm vi. |
| AC-12 | FR-17, FR-18 | Với dữ liệu AC-11, đặt một mục menu hoặc chân trang ở trạng thái ẩn sẵn. Sau khi ẩn cả chuyên mục và trang chi tiết, hiện lại chuyên mục. | Chỉ trang chi tiết từng công khai mở lại ở URL cũ. Trang đã ẩn riêng vẫn 404. Chỉ liên kết từng hiển thị và đang hợp lệ trở lại trong menu, chân trang và danh sách. Sitemap phản ánh trạng thái công khai. |
| AC-13 | FR-19, FR-20 | Đối chiếu toàn bộ danh mục chuyển theo URL và trạng thái. Mở các URL cũ, trang chi tiết có dữ liệu từ cơ sở dữ liệu, một số điểm neo và tệp đại diện trước/sau chuyển. | Mỗi mục nguồn có một kết quả đối chiếu. URL hiện có, nội dung đang công khai, trạng thái ẩn, chuyển hướng và tài nguyên khớp kiểm kê hoặc có sai lệch được ghi nhận. Biên tập viên có thể mở và sửa bản ghi đã chuyển. |
| AC-14 | FR-01–FR-08 | Dùng bảng đối chiếu để kiểm tra từng trường áp dụng trên mỗi mẫu trang. Với phần tùy chọn, kiểm tra một bản ghi có phần đó và một bản ghi thiếu dữ liệu. | Mỗi trường đang áp dụng có thể sửa trong CMS và cập nhật đúng vị trí trên website sau xuất bản. Trường nhập một lần và được dùng ở nhiều trang cho kết quả nhất quán. Phần tùy chọn giữ đúng cách hiển thị của mẫu. |

## 6. Điểm còn mở trước khi chốt nghiệm thu

| Nội dung | Trạng thái |
|---|---|
| Phạm vi tạo landing page | Chờ câu 35 xác định chức năng tạo trang mới có thuộc đợt đầu không. Website hiện có các trang như `/vi/programmes/marketing` để biên tập theo FR-04. Cây route hiện tại chưa có landing page theo mẫu nêu ở FR-09. |
| Bố cục và URL landing page mới | Chốt các phần trong mẫu cố định và quy tắc đặt URL nếu FR-09 thuộc đợt đầu. |
| Phạm vi ẩn trang đối với URL tiếng Anh | Đợt đầu chỉ biên tập tiếng Việt. Cần chốt thao tác ẩn áp dụng cho URL tiếng Việt hay cả URL tiếng Anh tương ứng. |
| Kiểm kê môi trường triển khai | Cần lấy danh sách bài viết và chương trình từ dữ liệu triển khai, đối chiếu liên kết cũ và xác nhận trạng thái trước chuyển. |
