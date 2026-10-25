# Cập nhật trang Về VGG

**Bố cục lãnh đạo hiện tại:** sáu người nằm chung một grid, PGS. TS. Nguyễn Văn Thành đứng đầu tiên; desktop có bốn người mỗi hàng. Tablet chuyển ba cột, mobile chuyển hai hoặc một cột. Ảnh và thông tin nhân sự giữ nguyên. Các bố cục cũ được thay thế bằng bố cục này.

## Cập nhật mới nhất — hợp nhất thành một trang

Theo yêu cầu tiếp theo của người dùng, Về Viện Sau Đại học chỉ còn `/vi/discover` (và bản ngôn ngữ tương ứng). Đã xóa route `discover/[slug]` cùng các component/CSS chỉ phục vụ các trang chi tiết cũ: LeadershipPage, LeadershipFloatingGuard, VisionMissionPage, ContactPage, DiscoverSubpageVM và DiscoverMore. Không tạo redirect; các URL chi tiết cũ không còn tồn tại và trả trang 404. Giữ nguyên toàn bộ tài sản ảnh.

Đã gỡ danh sách trang con khỏi `data/site.ts`, sitemap, các CTA trên landing và liên kết footer. Footer dẫn tới phần Giá trị cốt lõi trên landing; header vẫn mở thẳng `/discover`.

Phần nhân sự sử dụng lại bố cục ảnh 4:5, tên căn giữa và chức danh đỏ của cụm **Đội ngũ phụ trách các bộ phận** với năm người có sẵn. Hồ sơ PGS. TS. Nguyễn Văn Thành hiển thị riêng ở phía trên, giữ đủ sáu nhân sự và đường dẫn ảnh gốc. Năm thẻ xếp một hàng trên desktop lớn, ba/hai/một cột trên các màn hình nhỏ.

Các mục bên dưới ghi lại đợt triển khai ban đầu; những dòng nói về trang chi tiết/CTA sang trang con được thay thế bằng cập nhật này. Nguồn nội dung Word và nguồn ảnh giữ nguyên.

## Phạm vi và nội dung

Route thực tế: `/vi/discover` (`frontend/src/app/(public)/discover/page.tsx`). Next.js App Router, React server component, CSS Modules, Maison Neue và các token màu/khoảng cách hiện có. Dùng lại SiteHeader, SiteFooter, LocalizedLink, next/image và hệ icon lucide-react; không thêm thư viện.

Nguồn nội dung: file người dùng cung cấp `PHẦN GIỚI THIỆU.docx`. Nội dung được trích từ toàn bộ `word/document.xml`, bao gồm các đoạn trong bảng nếu có. Dữ liệu đưa vào `frontend/src/data/discover-introduction.json`; các chỉ dẫn biên tập như “Hình ảnh đề xuất”, “Nút điều hướng” không hiển thị thành nội dung website.

Đã triển khai đủ 9 phần, theo thứ tự:

1. Hero: tên Viện, tên Trường, thông điệp Anh/Việt, giới thiệu, hai CTA và nút cuộn.
2. Giới thiệu: đủ bốn đoạn gốc, bố cục nội dung–ảnh.
3. Tầm nhìn và Sứ mệnh: mỗi khối đủ hai đoạn gốc.
4. Triết lý giáo dục: hai đoạn mở đầu và ba định hướng, đầy đủ mô tả.
5. LEAD: giới thiệu, bốn giá trị và thông điệp kết nối nguyên văn.
6. Lợi thế cho người học: thông điệp, đoạn mở đầu, đủ bốn lợi thế.
7. Định hướng 2030: đủ bốn đoạn gốc, ảnh khuôn viên.
8. Lãnh đạo: hai đoạn gốc, sáu hồ sơ và ảnh có sẵn.
9. Kết thúc: tiêu đề, thông điệp, đoạn giới thiệu và hai CTA.

Không thêm khối thành tựu hoặc hợp tác quốc tế độc lập vào trang này.

## File triển khai

| File | Vai trò |
| --- | --- |
| `frontend/src/app/(public)/discover/page.tsx` | Route và metadata, tích hợp trang mới |
| `frontend/src/features/discover/components/DiscoverIntroduction.tsx` | Hiển thị chín phần và CTA |
| `frontend/src/features/discover/components/DiscoverIntroduction.module.css` | CSS cục bộ, responsive, focus/hover |
| `frontend/src/data/discover-introduction.json` | Nội dung chính xác từ Word |
| `frontend/src/data/discover-leadership.ts` | Tách nguyên dữ liệu sáu nhân sự hiện có, không đổi tên/chức danh/ảnh |
| `frontend/src/features/discover/components/LeadershipPage.tsx` | Dùng lại dữ liệu vừa tách; giữ nguyên nội dung, ảnh và cấu trúc hiển thị |

Tư liệu xử lý nguồn và script: `work/discover-source-paragraphs.json`, `work/build-discover-content.cjs`. Không chạy lại script sau khi dữ liệu lãnh đạo đã được tách.

## Ảnh và nguồn

| Asset | Sử dụng | Nguồn/xác minh |
| --- | --- | --- |
| `/images/pages/discover/content/campus.jpg` | Hero, định hướng 2030 | Asset khuôn viên sẵn có của dự án, giữ nguyên file; không gán nguồn xuất bản mới chưa được xác minh |
| `/images/pages/discover/introduction/seminar-discussion.webp` | Giới thiệu Viện | Ảnh người tham dự trao đổi tại hội thảo, tải từ ảnh b trong bài chính thức bên dưới |
| `/images/pages/discover/introduction/seminar-community.webp` | CTA kết thúc | Ảnh cộng đồng dự hội thảo, tải từ ảnh c trong cùng bài chính thức |
| `/images/pages/discover/leadership/thay2.png` và năm ảnh `*-portrait.png` | Sáu lãnh đạo | Giữ nguyên asset, tên và vai trò đã được dùng trong LeadershipPage trước thay đổi |

Bài nguồn chính thức, đã mở để kiểm tra ngữ cảnh: [Viện Sau Đại học tổ chức hội thảo Dẫn nhập nghiên cứu khoa học](https://www.vlu.edu.vn/news/vien-sau-dai-hoc-to-chuc-hoi-thao-dan-nhap-nghien-cuu-khoa-hoc).

URL ảnh gốc:

- https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/vlu_vien_sau_dai_hoc_to_chuc_hoi_thao_dan_nhap_nghien_cuu_khoa_hoc_b_39025b2c05.jpg
- https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/vlu_vien_sau_dai_hoc_to_chuc_hoi_thao_dan_nhap_nghien_cuu_khoa_hoc_c_f73ef5707d.jpg

Hai ảnh được lưu cục bộ, tối ưu WebP 1600 px, lần lượt khoảng 114 KB và 166 KB; có alt theo đúng ngữ cảnh. Bài ghi hình ảnh của Đắc Khánh. Không tìm thấy giấy phép mở riêng cho hai ảnh; ghi nhận nguồn chính thức, không khẳng định ảnh thuộc public domain. Không dùng ảnh giả, watermark hoặc chân dung tạo mới. Các phần triết lý, LEAD, lợi thế dùng icon nhất quán thay cho ảnh không liên quan. Không còn vị trí ảnh trống.

## Điều hướng

- Khám phá chương trình: `/vi/programmes`.
- Đăng ký tư vấn: `/vi/admissions#tu-van` — form có sẵn, không tạo form/API mới.
- Tìm hiểu thêm: `#tam-nhin-su-menh` trên trang, vì `/discover/gioi-thieu` hiện chuyển hướng về landing.
- Tầm nhìn, triết lý, định hướng: sử dụng trang liên quan có sẵn `/vi/discover/tam-nhin-su-menh`; không tạo route giả.
- Lãnh đạo: `/vi/discover/lanh-dao`.
- Nút cuộn: `#gioi-thieu`.

Không có trang chi tiết độc lập riêng cho LEAD/định hướng 2030 trong phạm vi này; nội dung đầy đủ đã hiển thị tại landing. Trang Tầm nhìn & Sứ mệnh cũ được giữ nguyên theo giới hạn chỉ sửa landing.

## Kiểm tra

- Lint frontend, typecheck, 26 bài kiểm tra hiện có và Next.js build đã chạy thành công.
- Kiểm tra trình duyệt ở 1440, 1024, 768, 375, 320 px: chín section, một H1, sáu lãnh đạo, không tràn ngang, mọi ảnh có src/alt.
- Đối chiếu 55 đoạn/tiêu đề nguyên văn từ Word với DOM: không thiếu đoạn nào trong tập nội dung cần hiển thị.
- Sáu ảnh lãnh đạo trên landing đều tải thành công; trang chi tiết vẫn dùng sáu đường dẫn ảnh gốc.
- Anchor nội bộ có đích thực tế; đã mở các route đích liên quan. Không gửi thử form tư vấn để tránh tạo yêu cầu thật.
- CSS được giới hạn trong module của trang; các selector tiêu đề/đoạn văn giới hạn ở section, không sửa bố cục header/footer.
- Console sau lần tải lại cuối không có lỗi/cảnh báo mới. Trong quá trình điều hướng đã quan sát cảnh báo có sẵn của Next.js về `scroll-behavior: smooth` thiếu thuộc tính tương ứng trên HTML toàn cục; không chỉnh root layout ngoài phạm vi trang này. Cảnh báo khung ảnh sticky trong bản triển khai ban đầu đã được sửa bằng khung relative.

Kết quả đo và ảnh chụp nằm trong `outputs/discover-introduction-*`. Log build: `outputs/discover-introduction-build.log`.

## Giới hạn và bảo toàn

Không thiếu nội dung hoặc hồ sơ so với tài liệu và dữ liệu hiện có. Giữ nguyên sáu người trong dự án theo yêu cầu trực tiếp của người dùng, không thêm các chức danh minh họa trong wireframe khi chưa có dữ liệu nhân sự tương ứng. Không thay thế ảnh lãnh đạo.

Không sửa các trang ngành, tuyển sinh, chương trình đào tạo, API, database, auth, menu, header/footer hay design system. Thay đổi dùng chung duy nhất là đưa dữ liệu nhân sự từ LeadershipPage ra module dữ liệu để hai trang đọc cùng một nguồn; các giá trị dữ liệu không đổi. Không xóa component cũ đang có hoặc các file tài sản hiện hữu.

