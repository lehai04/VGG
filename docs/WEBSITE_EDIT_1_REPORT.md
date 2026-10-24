# Báo cáo chỉnh sửa theo EDIT 1_WEBSITE.pptx

Ngày kiểm tra: 24/10/2026. Project: `C:/Users/lepha/VGG`. Phạm vi: frontend website hiện có, theo đủ 20 slide và yêu cầu đi kèm.

## Tổng quan

Đã đọc toàn bộ văn bản, hình ảnh và vị trí đánh dấu của 20 slide trước khi sửa source. Tệp PowerPoint được giữ nguyên. Bản trích xuất tham chiếu nằm trong [outputs/website-edit-reference](C:/Users/lepha/VGG/outputs/website-edit-reference/slides.json).

Đã cập nhật nội dung được chú thích; bỏ các section được chỉ định; giữ sáu thẻ chương trình, bốn nội dung “Vì sao học…”, đội ngũ phụ trách bộ phận, sáu thẻ xếp hạng, danh mục tìm kiếm và form tư vấn. Điều hướng “Về Viện Sau Đại học” đi trực tiếp tới route `/discover` đang có. Không thêm thư viện, thay đổi backend, database hoặc cấu hình triển khai trong nhiệm vụ này.

Các thay đổi đã có từ trước trong admin, backend, SEO/tin tức và cấu trúc dữ liệu ngành học được giữ lại. Báo cáo này chỉ liệt kê công việc của lần chỉnh theo PowerPoint; toàn bộ `git diff` còn bao gồm công việc có sẵn trước đó.

**Giới hạn:** giao diện và validation form đã được kiểm tra; việc gửi hồ sơ thành công chưa xác minh được vì API cục bộ trả HTTP 502 khi kết nối backend. Không gửi hồ sơ tư vấn thật. Website chưa được triển khai lên production trong nhiệm vụ này.

## Đối chiếu 20 slide

Các đường dẫn trong cột source tính từ `C:/Users/lepha/VGG/frontend/src/`. D/T/M = desktop 1440 px, tablet 768 px, mobile 390 px.

| Slide | Ghi chú ban đầu | Thành phần website | Source liên quan | Kết quả thực hiện | Kiểm thử thực tế |
|---|---|---|---|---|---|
| 1 | Sửa giới thiệu, số liệu, bỏ cụm được đánh dấu; kiểm tra font | Utility header và hero trang chủ | `features/home/components/Header.tsx`, `Hero.tsx`; `messages/vi.json`; `shared/components/layout/SiteHeader.tsx` | Giữ nội dung hero người dùng đã cập nhật; đổi dòng tên đơn vị; bỏ riêng nút VI/EN theo khung đánh dấu, giữ Tin tức/Tài nguyên. CTA tuyển sinh đi tới route thật sau khi section tuyển sinh bị bỏ. | D/T/M không tràn ngang; font computed là Inter; kiểm tra liên kết. |
| 2 | Sửa phần tra cứu; bỏ badge; đổi nhãn trình độ | ProgrammeSearch | `features/programmes/components/ProgrammeSearch.tsx`, `ProgrammeCatalogue.module.css`; `data/programmes/catalogue-copy.ts` | Tiêu đề theo câu mới trên slide; nhãn “Tra cứu chương trình”; bỏ phần mở đầu cũ và badge “19 chương trình”; dùng “Trình độ đào tạo”. Giữ từ khóa và ba dropdown. | Từ trang chủ nhập Logistics → `/vi/programmes?search=logistics` → 1 kết quả; kiểm tra responsive. |
| 3 | Đồng bộ giới thiệu và số liệu | Programmes / overview | `features/home/components/Programmes.tsx`; `app/home.css` | Nội dung giới thiệu theo slide; ba số liệu 20 / 01 / 01, giữ hiệu ứng CountUp. | DOM có 3 thẻ; desktop chia đúng 3 cột; font Inter. |
| 4 | Bỏ hai cụm; giữ nghiên cứu và mô tả | Research | `features/home/components/Research.tsx`; `app/home.css` | Bỏ hai nhãn footer “RESEARCH ECOSYSTEM” và “Knowledge for real-world impact”; cập nhật tiêu đề/mô tả. Giữ ảnh và 4 accordion nghiên cứu. | Kiểm tra DOM không còn footer; nội dung nghiên cứu còn đủ; trang chủ D/T/M. |
| 5 | Bỏ section ảnh và thống kê | ProgrammeCatalogShowcase | `features/home/components/ProgrammeCatalog.tsx`; `app/home.css`; `ScrollReveal.tsx` | Xóa khối ảnh tốt nghiệp, thống kê SVG và helper CurvedLabel; giữ lưới bên dưới. | Không còn khối trong DOM/source/CSS; vẫn có 6 thẻ nhóm chương trình. |
| 6 | Giữ chương trình, mô tả, liên kết; đồng bộ font; đổi màu thẻ cuối | ProgrammeFieldGrid | `features/home/components/ProgrammeCatalog.tsx`; `app/home.css` | Sáu thẻ theo nội dung slide; PhD in Environmental Science, Design & Applied Arts. CTA dẫn tới danh mục được lọc theo trình độ/nhóm ngành. Đổi màu cam của thẻ cuối thành đỏ trầm `#9c2842` theo bảng màu hiện có vì slide không chỉ định mã màu. Sửa quy tắc chữ nghiêng/giãn chữ chỉ áp dụng tiếng Anh, không áp dụng nhầm đoạn mô tả. | 6 thẻ còn đủ; không tràn nội dung; liên kết PhD và nhóm ngành đúng query; font Inter. |
| 7 | Bỏ điều kiện tốt nghiệp | ProgrammeGraduation trên homepage | `features/home/components/ProgrammeCatalog.tsx`; `app/home.css` | Xóa markup, dữ liệu, icon riêng và CTA chi tiết của khối. Dữ liệu điều kiện tốt nghiệp trên từng trang ngành vẫn được giữ. | Không còn section trên homepage; 8 test dữ liệu/chương trình qua. |
| 8 | Bỏ khối tuyển sinh trang chủ | Home Admissions | `app/(public)/page.tsx`; `features/home/components/index.ts`; xóa `Admissions.tsx`; `app/home.css`, `app/globals.css` | Xóa component, dữ liệu bước tuyển sinh, export, selector và cấu hình reveal riêng. Trang `/admissions` vẫn tồn tại. | Homepage không còn khối; production build vẫn có route tuyển sinh. |
| 9 | Bỏ hành trình người học trang chủ | Home StudentSuccess | `app/(public)/page.tsx`; `features/home/components/index.ts`; xóa `StudentSuccess.tsx`; CSS và ScrollReveal | Xóa component/dữ liệu, anchor trang trí và style riêng. Các route người học giữ nguyên. | Homepage không còn section; build vẫn có `/student-success` và route con. |
| 10 | Bỏ tài nguyên trang chủ | ResourcesBlock | `features/home/components/ResourcesConsultation.tsx`; `app/home.css`; `ScrollReveal.tsx` | Bỏ riêng tài nguyên, array RESOURCES và import accordion; bỏ prop showResources đã hết ý nghĩa. Giữ form tư vấn dùng chung. | DOM không có resourcesBlock; mỗi trang vẫn có một form tư vấn. |
| 11 | Giữ tư vấn, cập nhật nội dung, bảo toàn validation/API | ResourcesConsultation | `features/home/components/ResourcesConsultation.tsx`; `messages/vi.json`; `features/content/components/NextStepCTA.tsx`; `features/programmes/components/ProgrammeDetailPage.tsx` | Nội dung “Cùng bạn lựa chọn chương trình phù hợp”, ba quyền lợi và thông báo dữ liệu theo slide. Giữ POST `/api/consultations`, trạng thái gửi và validation. Bỏ ID consultation bị lặp trên trang ngành. | Điện thoại `123` và email `sai-email` hiện lỗi; chỉ một form và một ID consultation. API thực tế trả 502, chưa xác minh gửi thành công. |
| 12 | Bỏ mega menu; điều hướng thẳng về Viện | Hai biến thể Header | `features/home/components/Header.tsx`; `shared/components/layout/SiteHeader.tsx`; `app/home.css`, `app/globals.css` | Bỏ JSX mega menu, state/handler/submenu helper và CSS riêng. Link trực tiếp `/discover`; mobile vẫn có mở/đóng, Escape và focus trap. Các trang con vẫn truy cập qua DiscoverMore. | Bấm desktop và mobile tới `/vi/discover`; menu mobile đóng lại; không còn mega menu. |
| 13 | Bỏ khối giới thiệu ảnh lớn | Discover editorial hero | `app/(public)/discover/page.tsx`; `app/globals.css` | Xóa tiêu đề “Giới thiệu…” và cover lớn; không xóa WhyChoose hoặc các chapter. | `/discover` bắt đầu bằng section “Vì sao học…”, có một H1; D/T/M. |
| 14 | Giữ bốn nội dung và mô tả đúng file | WhyChooseSection | `features/discover/components/WhyChooseSection.tsx`, `WhyChooseSection.module.css` | Thay đúng bốn category/heading/body theo slide; giữ thứ tự, icon, ảnh, bố cục bốn thẻ. Tiêu đề dùng Inter thay Georgia và làm H1 sau khi hero cũ bị bỏ. | 4 thẻ D/T/M; không tràn; computed font Inter; ảnh chụp desktop/mobile. |
| 15 | Sửa lỗi cột bị co hẹp | Discover editorial chapters | `app/globals.css` | Thêm `width: 100%` vào quy tắc container gốc, giữ max-width và grid responsive. Không thêm lớp override. | Trước sửa không tái hiện được lỗi cũ ở desktop hiện tại; sau sửa: desktop container 1360 px, hai cột khoảng 563/610 px; tablet/mobile một cột khoảng 661/328 px. Không khẳng định đã xác định được nguyên nhân của trạng thái lịch sử trong ảnh. |
| 16 | Giữ đội ngũ phụ trách bộ phận và mô tả | LeadershipPage | `features/discover/components/LeadershipPage.tsx` | Cập nhật eyebrow, heading và đoạn mô tả đúng slide; giữ nguyên 5 người và ảnh. | Có 5 article bộ phận; mobile/tablet không tràn; route render bình thường desktop. |
| 17 | Thay ảnh bị bể | VisionMission philosophy image | `features/discover/components/VisionMissionPage.tsx`, `VisionMissionPage.module.css` | Nguồn cũ Vision/4.jpg chỉ 447 × 447 px; thay bằng ảnh thực hành học thuật sẵn có content/2.jpg 2048 × 1536 px. Giữ khung ảnh và bố cục; sửa alt phù hợp. Bỏ CSS philosophyStatement không còn JSX sử dụng. Không xóa ảnh cũ khỏi tài nguyên để tránh ảnh hưởng tham chiếu ngoài source. | Ảnh tải thành công desktop/mobile; khung desktop khoảng 482 × 361 px, mobile rộng 335 px; không méo ảnh. |
| 18 | Bỏ thành tựu người học trong trang xếp hạng | RankingsContent learnerImpact | `features/discover/components/DiscoverSubpageVM.tsx`, `DiscoverSubpageVM.module.css` | Xóa learnerImpact và mọi selector riêng, giữ nội dung xếp hạng còn lại. | Không còn learnerImpact; đủ 6 liên kết thẻ xếp hạng; D/T/M. |
| 19 | Giữ/cập nhật chọn chương trình và hướng dẫn tra cứu | ProgrammesLanding và directory intro | `data/programmes/catalogue-copy.ts`; `features/programmes/components/ProgrammeCatalogue.module.css` | Nội dung theo slide; giữ thống kê, tín chỉ/thời gian/học phí. Sửa nguồn CSS nowrap gây tiêu đề dài đè mô tả: cho xuống dòng, dùng biến cỡ chữ của hệ thống và phân bổ lại hai cột trong cùng layout. | Desktop tiêu đề có hai dòng, cỡ computed 38.88 px tại 1440 px, không giao nhau với mô tả; mobile/tablet không tràn; build qua. |
| 20 | Giữ hỗ trợ, tìm kiếm và các bộ lọc | ProgrammeDirectory | `data/programmes/catalogue-copy.ts` | “Cần hỗ trợ chọn chương trình?”, đoạn hỗ trợ, “Đăng ký tư vấn”, placeholder “Tìm theo tên chương trình”, nhãn “Trình độ đào tạo”. Giữ logic directory hiện có. | 21 chương trình ban đầu; tìm Logistics → 1; Tiến sĩ → 1; nhóm kỹ thuật → 8; link tư vấn tới `/vi/admissions#consultation`. |

## File sửa trong nhiệm vụ này

- [Trang chủ](C:/Users/lepha/VGG/frontend/src/app/(public)/page.tsx), [trang Viện](C:/Users/lepha/VGG/frontend/src/app/(public)/discover/page.tsx): bỏ đúng các section yêu cầu.
- [home.css](C:/Users/lepha/VGG/frontend/src/app/home.css), [globals.css](C:/Users/lepha/VGG/frontend/src/app/globals.css): dọn selector section bị bỏ, chỉnh ba cột thống kê, CTA thẻ nhóm, màu thẻ cuối, chiều rộng chapter; giữ CSS chia sẻ còn dùng.
- [Header.tsx](C:/Users/lepha/VGG/frontend/src/features/home/components/Header.tsx), [SiteHeader.tsx](C:/Users/lepha/VGG/frontend/src/shared/components/layout/SiteHeader.tsx): bỏ mega menu và language toggle, giữ điều hướng trực tiếp và mobile.
- [Hero.tsx](C:/Users/lepha/VGG/frontend/src/features/home/components/Hero.tsx): giữ copy có sẵn; sửa CTA tuyển sinh thành LocalizedLink tới route thật.
- [Programmes.tsx](C:/Users/lepha/VGG/frontend/src/features/home/components/Programmes.tsx), [Research.tsx](C:/Users/lepha/VGG/frontend/src/features/home/components/Research.tsx), [ProgrammeCatalog.tsx](C:/Users/lepha/VGG/frontend/src/features/home/components/ProgrammeCatalog.tsx): copy, số liệu, xóa các khối riêng theo slide.
- [ResourcesConsultation.tsx](C:/Users/lepha/VGG/frontend/src/features/home/components/ResourcesConsultation.tsx), [vi.json](C:/Users/lepha/VGG/frontend/src/messages/vi.json): giữ form, bỏ resources và cập nhật nội dung tư vấn.
- [NextStepCTA.tsx](C:/Users/lepha/VGG/frontend/src/features/content/components/NextStepCTA.tsx), [ProgrammeDetailPage.tsx](C:/Users/lepha/VGG/frontend/src/features/programmes/components/ProgrammeDetailPage.tsx): bỏ prop showResources hết sử dụng; loại ID consultation bị lặp.
- [ScrollReveal.tsx](C:/Users/lepha/VGG/frontend/src/features/home/components/ScrollReveal.tsx), [index.ts](C:/Users/lepha/VGG/frontend/src/features/home/components/index.ts): bỏ cấu hình animation/export riêng của section đã xóa.
- [ProgrammeSearch.tsx](C:/Users/lepha/VGG/frontend/src/features/programmes/components/ProgrammeSearch.tsx), [ProgrammeCatalogue.module.css](C:/Users/lepha/VGG/frontend/src/features/programmes/components/ProgrammeCatalogue.module.css), [catalogue-copy.ts](C:/Users/lepha/VGG/frontend/src/data/programmes/catalogue-copy.ts): copy, nhãn, bỏ badge, xử lý tiêu đề dài và CSS cũ. Hai file dữ liệu/CSS này đã có từ công việc trước, không phải tạo mới cho nhiệm vụ này.
- [WhyChooseSection.tsx](C:/Users/lepha/VGG/frontend/src/features/discover/components/WhyChooseSection.tsx), [WhyChooseSection.module.css](C:/Users/lepha/VGG/frontend/src/features/discover/components/WhyChooseSection.module.css): bốn nội dung đúng tham chiếu và font hệ thống.
- [LeadershipPage.tsx](C:/Users/lepha/VGG/frontend/src/features/discover/components/LeadershipPage.tsx): copy khu vực phụ trách bộ phận.
- [VisionMissionPage.tsx](C:/Users/lepha/VGG/frontend/src/features/discover/components/VisionMissionPage.tsx), [VisionMissionPage.module.css](C:/Users/lepha/VGG/frontend/src/features/discover/components/VisionMissionPage.module.css): thay ảnh, bỏ style không dùng.
- [DiscoverSubpageVM.tsx](C:/Users/lepha/VGG/frontend/src/features/discover/components/DiscoverSubpageVM.tsx), [DiscoverSubpageVM.module.css](C:/Users/lepha/VGG/frontend/src/features/discover/components/DiscoverSubpageVM.module.css): bỏ learnerImpact.
- `frontend/next-env.d.ts` được Next.js cập nhật tự động sang đường dẫn type production khi build; không phải thay đổi nghiệp vụ.

## File và code đã xóa

- `frontend/src/features/home/components/Admissions.tsx` và `StudentSuccess.tsx`: đã kiểm tra không còn nơi import sau khi bỏ khỏi trang chủ/barrel.
- `frontend/src/shared/components/layout/LanguageToggle.tsx`: không còn nơi dùng sau khi bỏ cụm VI/EN khỏi cả hai header. Hệ thống locale và các route ngôn ngữ vẫn được giữ.
- Xóa JSX, dữ liệu, icon/helper riêng của ProgrammeCatalogShowcase, ProgrammeGraduation, resourcesBlock, researchFooter, discover-editorial-hero và learnerImpact.
- Xóa state/event/helper riêng của mega menu, các selector animation của section bị bỏ.
- Loại các selector riêng `programmeArc*`, `programmeGraduation*`, `programmeCatalogShowcase*`, `programmeCatalogIntro*`, `programmeCatalogCta*`, `admissions*` trên homepage, `studentSuccess*`, `studentServices`, `resourcesBlock/resourcesIntro/resourcesList`, `researchFooter`, `megaMenu*/megaVlu*`, mega menu cũ, `languageToggle`, `learnerImpact*`, `philosophyStatement`.
- Bỏ style details/summary/ol/li, `programmeCourse*`, `programmeTabs` và `programmeList` cũ của danh mục sau khi xác nhận không có TS/TSX nào còn dùng. Bỏ margin-top 42 px của lưới vốn nằm dưới showcase đã xóa. Giữ style thẻ, ảnh, accordion và consultation dùng chung.
- Dọn các khai báo trùng bị ghi đè ở cùng selector/media context của phần đang chỉnh. Không thêm `!important` mới; không dùng `display: none` để che các section đã yêu cầu xóa. Các quy tắc responsive/ẩn honeypot và trạng thái mobile có chức năng khác vẫn được giữ.

## Kết quả kiểm tra

| Lệnh/kiểm tra | Kết quả |
|---|---|
| `npm run lint --workspace frontend` | Qua, không có lỗi/warning ESLint. |
| `npm run typecheck --workspace frontend` | Qua. |
| `npm run test --workspace frontend` | 8/8 test qua. Bao gồm dữ liệu 21 chương trình, curriculum, ảnh local, class module và hợp đồng proxy tư vấn. |
| `npm run build --workspace frontend` | Qua; Next.js 16.3.1 compile, TypeScript và tạo trang hoàn tất. |
| Trang chủ, chương trình, Viện, lãnh đạo, tầm nhìn/sứ mệnh, xếp hạng | Kiểm tra browser desktop, tablet, mobile. Không thấy tràn ngang ở các kích thước đã kiểm tra. |
| Console browser | Không thấy lỗi JavaScript/render trong log đã thu; có cảnh báo dev Fast Refresh, smooth-scroll và ảnh LCP. Chưa tối ưu các cảnh báo hiệu năng ngoài phạm vi. |
| Tìm kiếm và lọc | Đã thao tác trên browser, kiểm tra số kết quả và URL; không chỉ đọc source. |
| Form tư vấn | UI validation điện thoại/email hoạt động; POST còn giữ nguyên. Gọi API cục bộ với payload rỗng nhận HTTP 502 và thông báo chung. Chưa xác minh lưu dữ liệu hoặc gửi thành công. |
| Phạm vi kiểm tra | Frontend/local browser; chưa kiểm thử mọi tổ hợp bộ lọc, thiết bị thật, mọi trang không liên quan hoặc môi trường production. Không chạy lại bộ test admin/backend vì không sửa các phần đó trong nhiệm vụ này. |

## Bằng chứng giao diện

- [Trang Viện desktop](C:/Users/lepha/VGG/outputs/website-edit-verification/discover-desktop.png), [mobile](C:/Users/lepha/VGG/outputs/website-edit-verification/discover-mobile.png).
- [Khối tra cứu trang chủ](C:/Users/lepha/VGG/outputs/website-edit-verification/programme-search-desktop.png), [lưới nhóm chương trình](C:/Users/lepha/VGG/outputs/website-edit-verification/programme-fields-desktop.png).
- [Danh mục và tiêu đề chương trình đã sửa](C:/Users/lepha/VGG/outputs/website-edit-verification/programme-directory-desktop.png).
- [Ảnh Triết lý giảng dạy desktop](C:/Users/lepha/VGG/outputs/website-edit-verification/philosophy-desktop.png), [mobile](C:/Users/lepha/VGG/outputs/website-edit-verification/philosophy-mobile.png).
- [Form tư vấn desktop](C:/Users/lepha/VGG/outputs/website-edit-verification/consultation-desktop.png).
- [Dữ liệu kiểm tra responsive](C:/Users/lepha/VGG/outputs/website-edit-verification/responsive-checks.json). Hai trường `departmentCards/rankCards` trong nhóm kiểm tra desktop ban đầu dùng selector khớp cả phần tử con; số đúng đã xác minh lại bằng selector article/liên kết ở `moreResponsive`: 5 bộ phận, 6 xếp hạng.

Tệp mới phục vụ báo cáo gồm tài liệu này, script đọc deck `work/inspect-website-deck.py` và các ảnh/JSON trong hai thư mục outputs nêu trên. Không tạo component production mới hoặc bản giao diện thứ hai.
