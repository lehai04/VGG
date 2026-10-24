# Bổ sung ảnh các trang ngành — 25/10/2026

Đã bổ sung thư viện 21 ảnh minh họa chuyên môn cho 21 chương trình. Ảnh được tìm và kiểm tra trên Unsplash, tải JPEG về `frontend/public/images/programme-library/` (tối đa chiều rộng 1600px); xem ảnh tổng hợp `outputs/programme-photo-contact-sheet.png`. Dùng Next Image để tự tối ưu kích thước hiển thị.

## Phạm vi

Mục 03: 50 vị trí ảnh trên 21 trang. 14 trang có ba thẻ đối tượng, Luật có hai thẻ, sáu trang không có thẻ đối tượng trong nội dung nguồn được bổ sung một figure minh họa. Không tự thêm đối tượng dự tuyển hay sửa điều kiện học thuật. Mỗi thẻ/figure mới có alt và liên kết nguồn, ghi rõ “Ảnh minh họa”.

Banner/tổng quan: giữ ảnh riêng phù hợp đã có từ nguồn Văn Lang; thay ảnh thiếu hoặc ảnh mặc định trùng (URL placeholder cũ, ảnh campus logistics dùng chung, tổng quan có alt campus mặc định) bằng ảnh chuyên môn. Phần nền hướng phát triển nghề nghiệp của mỗi ngành dùng ảnh chủ đề chính của ngành. Không gắn tên Văn Lang vào ảnh stock.

Cấu hình tại `frontend/src/data/programmes/images.ts`: thư viện, lựa chọn từng ngành và hàm withProgrammeImages. Registry áp dụng qua phép sao chép nội dung, không sửa trực tiếp dữ liệu học thuật gốc. Những lần nhập HTML sau vẫn dùng lớp ảnh này. Chỉnh mapping tại đây để đổi ảnh riêng; không sửa nội dung gốc của ngành.

## Kiểm chứng

Typecheck, lint phạm vi thay đổi và build frontend qua; **26/26 tests qua**. Test mới bảo đảm 21 ngành đều có ảnh ở mục 3, có alt/nguồn, file local tồn tại và ảnh nghề nghiệp đúng thư viện. Browser mở cả 21 route ở 320 và 1440px: tất cả có ảnh mục 3, không tràn ngang, một h1. Ảnh đã kiểm tra trực quan qua contact sheet. Không gửi form hoặc publish.

Bằng chứng: `outputs/programme-images-browser.json`, `outputs/programme-images-build.log`, `outputs/programme-image-downloads.json`, ảnh giao diện `outputs/programme-images-preview.png`.

## Nguồn ảnh

Các ảnh có trang nguồn ghi Free to use under the Unsplash License. [Điều khoản sử dụng Unsplash](https://unsplash.com/license). Liên kết dưới đây cũng được lưu trong cấu hình và hiển thị tại vị trí ảnh mới.

- [laboratory](https://unsplash.com/photos/a-scientist-is-working-in-a-laboratory-476mHdnj8dM) — `/images/programme-library/laboratory.jpg`
- [energyLab](https://unsplash.com/photos/scientist-using-laptop-in-laboratory-8yS04veb1TQ) — `/images/programme-library/energyLab.jpg`
- [logistics](https://unsplash.com/photos/stacks-of-shipping-containers-at-a-port-2mnOE-OPn-k) — `/images/programme-library/logistics.jpg`
- [law](https://unsplash.com/photos/a-library-with-books-on-shelves-3K6Qcxm6Jig) — `/images/programme-library/law.jpg`
- [hotel](https://unsplash.com/photos/empty-hotel-lobby-FPS7a7XQZ0w) — `/images/programme-library/hotel.jpg`
- [accounting](https://unsplash.com/photos/person-reviewing-documents-with-calculator-and-laptop-0oZpRxG5Hkk) — `/images/programme-library/accounting.jpg`
- [marketing](https://unsplash.com/photos/three-men-using-macbooks-_S7-KX8geL0) — `/images/programme-library/marketing.jpg`
- [forest](https://unsplash.com/photos/an-aerial-view-of-a-river-running-through-a-forest-1oEnl6GQxWE) — `/images/programme-library/forest.jpg`
- [automotive](https://unsplash.com/photos/mechanic-working-on-a-car-engine-in-a-workshop-XP8o9_Arwqg) — `/images/programme-library/automotive.jpg`
- [art](https://unsplash.com/photos/artist-paints-on-canvas-in-a-light-filled-studio-eD8AGdTTlQc) — `/images/programme-library/art.jpg`
- [communication](https://unsplash.com/photos/a-microphone-stands-on-a-stand-in-an-empty-room-Wce1i00U8eM) — `/images/programme-library/communication.jpg`
- [coding](https://unsplash.com/photos/computer-screen-displaying-code-and-terminal-output-fmH6yLBwEPw) — `/images/programme-library/coding.jpg`
- [architecture](https://unsplash.com/photos/architectural-blueprints-with-drafting-tools-Yn8D5B8C-eY) — `/images/programme-library/architecture.jpg`
- [tourism](https://unsplash.com/photos/two-women-planning-a-journey-pointing-at-a-detailed-map-FkSchPMHSBg) — `/images/programme-library/tourism.jpg`
- [classroom](https://unsplash.com/photos/students-reading-textbooks-in-classroom-BCBGahg0MH0) — `/images/programme-library/classroom.jpg`
- [gallery](https://unsplash.com/photos/art-gallery-interior-with-paintings-and-seating-EzfHCR-0bGo) — `/images/programme-library/gallery.jpg`
- [construction](https://unsplash.com/photos/construction-workers-review-plans-at-a-job-site-qjxlAZYkGpU) — `/images/programme-library/construction.jpg`
- [finance](https://unsplash.com/photos/financial-stock-market-data-displayed-on-a-screen-EuIqk6LpUU0) — `/images/programme-library/finance.jpg`
- [water](https://unsplash.com/photos/aerial-view-of-a-water-treatment-plant-with-surrounding-fields-T-q7fVaJgHA) — `/images/programme-library/water.jpg`
- [commerce](https://unsplash.com/photos/woman-shopping-for-clothes-in-a-boutique-WUXaLGUkNs8) — `/images/programme-library/commerce.jpg`
- [management](https://unsplash.com/photos/team-discussing-charts-during-a-business-meeting-3B5Hf9_PLpU) — `/images/programme-library/management.jpg`
