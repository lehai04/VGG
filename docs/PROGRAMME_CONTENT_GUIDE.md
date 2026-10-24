# Quản lý nội dung và CSS ngành học

Ngày thực hiện: 24/10/2026. Kiến trúc giữ nguyên Next.js 16 App Router, React, TypeScript và CSS Modules. Không thêm dependency hoặc sửa backend.

## A. Nguồn dữ liệu và template

Route `frontend/src/app/(public)/programmes/[slug]/page.tsx` lấy ngành từ registry `frontend/src/data/programmes.ts`, dùng một template `frontend/src/features/programmes/components/ProgrammeDetailPage.tsx`. Danh mục và tìm kiếm cũng lấy từ registry này. `frontend/src/data/curricula.ts` tiếp tục điều phối học phần và tạo dữ liệu tóm tắt cho danh mục từ nguồn ngành.

Mỗi file dưới đây quản lý nội dung và học phần của ngành tương ứng trong `frontend/src/data/programmes/`:

| Ngành | File |
| --- | --- |
| Công nghệ thông tin | `cong-nghe-thong-tin.ts` |
| Marketing | `marketing.ts` |
| Khoa học Môi trường | `khoa-hoc-moi-truong.ts` |
| Kỹ thuật Môi trường | `ky-thuat-moi-truong.ts` |
| Quản lý Tài nguyên và Môi trường | `quan-ly-tai-nguyen-moi-truong.ts` |
| Công nghệ Sinh học | `cong-nghe-sinh-hoc.ts` |
| Kỹ thuật Xây dựng | `ky-thuat-xay-dung.ts` |
| Kỹ thuật ô tô | `ky-thuat-o-to.ts` |
| Quản trị Kinh doanh | `quan-tri-kinh-doanh.ts` |
| Kinh doanh Thương mại | `kinh-doanh-thuong-mai.ts` |
| Tài chính - Ngân hàng | `tai-chinh-ngan-hang.ts` |
| Kế toán | `ke-toan.ts` |
| Logistics và Quản lý chuỗi cung ứng | `logistics.ts` |
| Quản trị Dịch vụ Du lịch và Lữ hành | `quan-tri-du-lich.ts` |
| Quản trị Khách sạn | `quan-tri-khach-san.ts` |
| Luật Kinh tế | `luat-kinh-te.ts` |
| Quan hệ Công chúng | `quan-he-cong-chung.ts` |
| Ngôn ngữ Anh | `ngon-ngu-anh.ts` |
| Kiến trúc | `kien-truc.ts` |
| Mỹ thuật Ứng dụng | `my-thuat-ung-dung.ts` |
| Lý luận và Lịch sử Mỹ thuật Ứng dụng | `ly-luan-lich-su-my-thuat.ts` |

Các khối trong `*PageContent`:

| Khối | Phạm vi |
| --- | --- |
| `hero` | Tiêu đề, mô tả, ảnh banner, slogan và nút điều hướng |
| `facts` | Nhãn thông tin nhanh, giá trị hiển thị, bảng thông tin chi tiết riêng |
| `section01` | Tổng quan, ảnh và alt, thẻ thông tin, liên kết brochure |
| `section02` | Điểm nổi bật, chuẩn đầu ra nếu ngành có |
| `section03` | Nhóm đối tượng, ảnh và alt từng nhóm |
| `section04` | Cơ hội nghề nghiệp, ảnh nền |
| `section05` | Mô tả từng định hướng, tín chỉ, thời gian, nhãn và liên kết khung chương trình |
| `consultation` | Tiêu đề, mô tả và nút của banner tư vấn |
| `faq` | Danh sách hỏi đáp và liên kết |

`shared-content.ts` là nguồn chính thức của nội dung thực sự dùng chung: nhãn, nút, ảnh mặc định, thẻ định hướng và thông tin liên hệ. File ngành kế thừa bằng spread; sửa nội dung riêng ngay sau spread để chỉ tác động ngành đó. Không sao chép dữ liệu chung sang component.

`catalogue-copy.ts` chứa nội dung và ảnh của danh mục, tìm kiếm ở trang chủ, cùng các component giới thiệu bậc học; chia theo tên component và ID/class mục. `catalogue-config.ts` chứa cấu hình Tiến sĩ/Quốc tế và lợi ích Thạc sĩ. Dữ liệu danh sách ngành vẫn sinh từ registry, không tạo danh sách ngành thứ hai.

### CSS

- `frontend/src/features/programmes/components/ProgrammeDetailPage.module.css`: layout/nút dùng chung, Hero, thông tin nhanh, mục 01–05, tư vấn, FAQ/liên hệ. Mỗi nhóm có comment `CSS DÙNG CHUNG TẤT CẢ NGÀNH - MỤC NN`; breakpoint và trạng thái tương tác của mục nằm cùng nhóm.
- `frontend/src/features/programmes/components/ProgrammeCatalogue.module.css`: CSS của landing chương trình, danh mục/bộ lọc và tìm kiếm trang chủ; đã chuyển khỏi `globals.css` và đổi tham chiếu class sang CSS Module. Giữ thứ tự breakpoint/container query.
- `frontend/src/features/programmes/components/MasterProgrammesPage.module.css`: stylesheet hiện có của các component giới thiệu Thạc sĩ/Tiến sĩ/Quốc tế, vẫn được những component đó tham chiếu.
- `frontend/src/app/globals.css`: giữ typography, gutter và các thành phần toàn website còn được trang khác dùng. Không sao chép chúng sang file ngành.

Các ngành hiện dùng cùng bộ style chi tiết nên không tạo 21 bản CSS giống nhau. `main` có `data-programme="<slug>"` để định vị ngành. Khi thật sự cần style riêng, đặt cạnh mục tương ứng trong module, giới hạn bằng `.page[data-programme="<slug>"]` và class của mục; sửa quy tắc chính thức, tránh thêm lớp vá ở cuối file.

## B. Thay đổi trong lần này

### File mới

- `frontend/src/data/programmes/shared-content.ts`
- `frontend/src/data/programmes/catalogue-copy.ts`
- `frontend/src/data/programmes/catalogue-config.ts`
- `frontend/src/features/programmes/components/ProgrammeCatalogue.module.css`
- `frontend/tests/programmes.test.mjs`
- Tài liệu này và bằng chứng kiểm tra dưới `outputs/programme-refactor/`.

### File được cập nhật

- 21 file dữ liệu ngành trong bảng trên. Chúng đã tồn tại ở trạng thái chưa được Git theo dõi trước khi bắt đầu; không tính là 21 file được tạo mới bởi lần này.
- `frontend/src/data/programmes.ts`, `frontend/src/data/curricula.ts`.
- `ProgrammeDetailPage.tsx`, `ProgrammeDetailPage.module.css` trong thư mục component ngành.
- `ProgrammeDirectory.tsx`, `ProgrammesPage.tsx`, `ProgrammeSearch.tsx`, `MasterProgrammesPage.tsx`, `SpecialProgrammesPage.tsx` trong cùng thư mục.
- `frontend/src/app/globals.css`: chuyển CSS danh mục đang dùng sang module, bỏ selector ngành đã xác minh không còn tham chiếu.

### Phần cũ được loại bỏ

- `CareerProspects.tsx`, `CareerProspects.module.css`, `ProgrammeCurriculum.tsx`, `ProgrammeCurriculum.module.css`: không còn nơi import; trang chi tiết đang dùng template hiện hành.
- Export trung gian `congNgheThongTinContent`: nội dung đã chuyển trực tiếp vào đúng mục, giữ toàn bộ giá trị.
- Export `logisticsContent`: chỉ còn được hai component không sử dụng nói trên tham chiếu; dữ liệu đang hiển thị ở `logisticsPageContent` được giữ nguyên.
- CSS `.careerImageCol` và breakpoint của cột không có JSX sử dụng.
- Style inline của trang chi tiết: chuyển vào các class theo đúng mục, kể cả chevron accordion và trạng thái chờ.
- 110 selector CSS gắn với 25 class ngành không còn được mã nguồn tham chiếu; hai khai báo danh mục bị khai báo sau ghi đè. Không xóa theo tên trùng một cách mù quáng.

Không reset hoặc ghi đè các thay đổi có sẵn của admin, backend, tin tức, SEO hay dữ liệu nghiệp vụ. Các file đã có chỉnh sửa trong Git được tiếp tục chỉnh trên nội dung đang có, không lấy lại phiên bản HEAD.

## C. Hạn chế và nội dung giữ nguyên

- Toàn bộ 21 nguồn dữ liệu đã được chuyển sang cấu trúc mới. Marketing vẫn có `detailsPending: true`, vì thế route hiển thị trang chờ như trước; dữ liệu học phần chưa hoàn chỉnh không được tự điền.
- Các component `MasterProgrammesPage` và `SpecialProgrammesPage` hiện không được route import. Resolver `[slug]` chỉ render ngành trong registry, còn slug không khớp chuyển về `/programmes#<slug>`. Đã chuẩn hóa nội dung của những component này, nhưng không thay đổi định tuyến hoặc tuyên bố đã kiểm tra giao diện riêng của chúng.
- Các nhãn/giao diện toàn website trong header, footer, `ResourcesConsultation` và `NextStepCTA` vẫn thuộc component dùng chung, không nhân bản vào 21 nguồn ngành.
- Ảnh Unsplash có lúc không tải trong trình duyệt; giữ nguyên URL gốc. Kiểm thử file ảnh nội bộ đã qua, không xác nhận mọi URL bên ngoài luôn khả dụng.
- Hotline có sẵn `Ext: XXXX`; không tự đoán số máy lẻ. Một số đoạn mô tả có tính khái quát đã tồn tại trước khi sửa và được bảo toàn.
- Form tư vấn dùng chung chưa có Công nghệ thông tin/Marketing trong danh sách lựa chọn; không sửa nghiệp vụ của form trong công việc cấu trúc nội dung/CSS này.
- Không gửi form thật hoặc kiểm thử ghi dữ liệu backend. Không có ảnh tham chiếu riêng ngoài văn bản đính kèm; đối chiếu trên giao diện thực tế của dự án.

## D. Kiểm chứng

- Đối chiếu dữ liệu runtime trước/sau: giữ nguyên tất cả trường cũ của 21 ngành, toàn bộ kết quả học phần và dữ liệu tóm tắt cho danh mục. Bản đối chiếu chỉ phục vụ chuyển đổi, không tạo nguồn nội dung production thứ hai.
- Đối chiếu CSS bằng parser: 204 selector của trang chi tiết giữ nguyên thứ tự và giá trị khai báo, gồm cả breakpoint; chỉ bỏ cột `.careerImageCol` không có nơi sử dụng. Kết quả tổng hợp nằm trong `outputs/programme-refactor/validation-summary.json`.
- `npm run lint --workspace=frontend`: qua.
- `npm run typecheck --workspace=frontend`: qua.
- `npm run test --workspace=frontend`: 8/8 qua, gồm cấu trúc từng mục, dữ liệu danh mục/học phần, tính độc lập giữa các ngành, ảnh nội bộ và tham chiếu class CSS Module.
- `npm run build --workspace=frontend`: qua, biên dịch và tạo đủ 21 static entry của ứng dụng; các route ngành vẫn là dynamic route.
- Trình duyệt: mở 21 route ngành ở 1440×1000 và 390×844, kiểm tra tiêu đề/khối nội dung và chiều rộng trang; không thấy tràn ngang ở cấp trang. Đây không phải phép so sánh ảnh pixel của toàn bộ các mục.
- Kiểm tra trực tiếp CNTT: mục 01, chuyển ứng dụng/nghiên cứu (45/60 tín chỉ, 18/24 tháng), mở accordion học phần. Danh mục: tìm `logistics` còn đúng một kết quả.
- Tab mới của trang chủ: component tìm kiếm render, tiêu đề có khoảng trắng đúng, không có lỗi JavaScript trong console. Các lỗi HMR trong lúc các file đang được chuyển đổi đã được sửa trước workflow kiểm tra cuối.
- Bằng chứng: `outputs/programme-refactor/browser-checks.json`, `overview-desktop.png`, `overview-mobile.png`.

## E. Chỉnh sửa về sau

Ví dụ ngành CNTT: mở `frontend/src/data/programmes/cong-nghe-thong-tin.ts`, tìm `NỘI DUNG MỤC 01 - TỔNG QUAN CHƯƠNG TRÌNH`:

- Đổi tiêu đề: `section01.overviewTitle`.
- Đổi văn bản: `section01.overview`.
- Đổi ảnh: `section01.overviewImage`; đổi mô tả ảnh bằng `imageAlt` sau spread mặc định.
- Đổi thẻ: thêm `tags: [...]` sau `...programmeSharedContent.overview` trong mục này.
- Đổi nút: thêm/sửa `link: { text, href, ariaLabel }` sau spread. Đặt `link: undefined` để bỏ nút.
- Bỏ ảnh: `overviewImage: null`; bỏ cả thẻ bằng `tags: []`. Template xử lý trường hợp không có media mà không giữ cột rỗng.
- Ảnh nhóm đối tượng ở `section03.audience`; có thể không có `image`, hoặc đặt `alt` riêng. Khi không đặt `alt`, dùng tiêu đề nhóm như giao diện cũ.
- Học phần: sửa mảng/hàm curricula trong chính file ngành đó; registry `curricula.ts` không chứa bản sao học phần.
- CSS tổng quan: mở `ProgrammeDetailPage.module.css`, tìm comment `MỤC 01`; sửa layout desktop, breakpoint, hover trong cùng nhóm.
- Muốn đổi nhãn/nút cho mọi ngành: sửa đúng nhóm trong `shared-content.ts`. Muốn chỉ đổi một ngành: khai báo giá trị riêng sau spread của ngành.

Thêm mục mới: bổ sung kiểu trong `ProgrammePageContent`, dữ liệu thực tế theo ngành và render trong template dùng chung; đặt CSS/breakpoint cạnh đúng nhóm. Chạy workflow frontend trước khi bàn giao.

## F. Nội dung mở rộng từ nguồn Marketing

- `section02.learningOutcomes` là chuẩn đầu ra; không dùng làm đối tượng tuyển sinh.
- `section03.requirements` chứa điều kiện dự tuyển và các nhóm bổ sung kiến thức; hỗ trợ khối con qua `groups`. Không sao chép điều kiện của Marketing cho ngành khác.
- `section05.semesters` và `completion` chứa kế hoạch học kỳ và điều kiện tốt nghiệp có nguồn riêng. Khi chưa có dữ liệu, template dùng dữ liệu cũ, không tự sinh học kỳ.
- `fees` là nội dung học phí chi tiết, lịch thanh toán và khoản thu riêng. Không có trường này thì chỉ hiển thị mức học phí đã có trong registry.
- `fees.variants` chứa các mức theo ngôn ngữ khi có nguồn riêng. Mỗi lựa chọn có `language`, `total`, `installments`; bộ chọn cập nhật cả tổng và ba đợt, độc lập với tab định hướng. Không dùng biến thể học phí để suy ra điều kiện ngoại ngữ.
- `consultation.formIntro` đổi lời giới thiệu form của riêng ngành; danh sách ngành dùng `data/site.ts`, được kiểm tra khớp registry bằng test.
- Curriculum hỗ trợ `englishName`, `description`, `subgroups`, `orientation`, `graduationProject`. Tab được tạo theo số track thực tế; học phần tự chọn không được cộng toàn bộ lựa chọn thành tổng tín chỉ phải học.
- Ngành có hai định hướng có thể đặt `intro`, `generalFacts`, `notes`, `semesters`, `completion` trong từng `CurriculumTrack`. Khi đổi tab, template tự chọn đúng dữ liệu; không gộp điều kiện tốt nghiệp hoặc kế hoạch học tập của hai định hướng vào một mục chung.
- `ProgrammeCurriculumGroups` và `ProgrammeSupplementaryContent` render các khối dùng chung. Giữ nội dung ngành trong file dữ liệu, tránh điều kiện theo tên ngành trong JSX.
- Marketing giữ nguyên chênh lệch lựa chọn 3/4 tín chỉ của nguồn; cần chủ sở hữu chương trình xác minh trước khi điều chỉnh tổng tín chỉ.


## Ảnh minh họa ngành học

Thư viện và mapping riêng từng ngành tại `frontend/src/data/programmes/images.ts`; registry dùng `withProgrammeImages` để bổ sung ảnh cho mục 03 và thay ảnh mặc định, giữ nội dung học thuật gốc. Các trang không có thẻ đối tượng dùng `section03.illustration`. Ảnh mới có alt và liên kết nguồn; giữ nhãn ảnh minh họa, không ghi thành ảnh hoạt động Văn Lang. Báo cáo nguồn: `docs/PROGRAMME_IMAGES_UPDATE.md`.
