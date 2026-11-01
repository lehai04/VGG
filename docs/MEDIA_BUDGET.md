# Media budget trước production

Phạm vi tối ưu: trang chủ trong ảnh Network, font dùng chung toàn website.

- Nền hero dùng ảnh responsive qua Next Image, không tự tải/phát video (kể cả banner cấu hình kiểu video: dùng poster).
- Poster WebP 1920 px: 262632 bytes; ảnh nghiên cứu WebP 1200 px: 128254 bytes.
- Ảnh nền campus trong CSS StudentSuccess: 203392 bytes thay cho JPG 5762459 bytes.
- Font WOFF2 giữ nguyên toàn bộ glyph và variable weights: IBM Plex Sans 230196 bytes, Plus Jakarta Sans 60244 bytes. Giữ file giấy phép OFL.
- Bỏ ảnh Unsplash nằm dưới hero và các tham chiếu background mẫu cũ không còn nơi sử dụng trong source.
- Giữ ảnh gốc còn được nội dung tham chiếu; font TTF/Maison và video nền cũ không còn dùng đã được đối soát source/database và dọn.

## Kiểm tra

Build `npm run build --workspace=frontend`, chạy `next start -H localhost` từ frontend. Cấu hình backend theo môi trường nghiệm thu. Khi chạy local, dùng hostname localhost để tránh vòng rewrite locale khi dùng 127.0.0.1.

`python scripts/check-homepage-budget.py http://localhost:3500/vi`

Script cộng response body đã nén gzip của HTML/JS/CSS, toàn bộ ảnh img (kể cả lazy, dùng src fallback lớn nhất), preload và URL trong CSS gồm font. Không dùng browser cache. Ngưỡng 3 MB = 3,000,000 bytes. Báo cáo ở `outputs/media-budget/homepage.json`.
Đây là phép kiểm tra ngân sách tài nguyên từ HTML/CSS, không thay thế Network của trình duyệt: không tính header, request API, navigation prefetch hoặc JS tải động sau tương tác. Không suy rộng kết quả trang chủ sang toàn bộ trang con.

Nghiệm thu trên staging: mở DevTools Network, Disable cache, hard reload ở desktop/mobile, chờ ổn định và cuộn hết trang. Ghi tổng Transferred và Resource size riêng. Kiểm tra thêm các trang chính và dữ liệu CMS thực tế; ảnh mới từ CMS có thể làm thay đổi ngân sách. Công cụ browser trong phiên tối ưu không kết nối được nên chưa xác minh Network/ảnh chụp sau cuộn.

`scripts/media-audit.html` là trang hỗ trợ kiểm thử local (không được đặt trong public khi deploy). Khi dùng, phục vụ cùng origin với website và cache trình duyệt trống; nó hiển thị Resource Timing của iframe trang chủ trước/sau cuộn. Không dùng số đo nếu có tài nguyên cross-origin không trả timing.

## Kết quả 29/10/2026

Production build local, nội dung fallback (không kết nối backend): **1,232,367 bytes / 23 tài nguyên** theo script HTTP, đạt ngưỡng 3,000,000 bytes. Đây không phải số đo Network trình duyệt hay dữ liệu production. Build và lint đã qua. Báo cáo đã lưu: `docs/audits/media-budget-2026-10-29.json`; lần chạy mới sinh vào `outputs/media-budget/homepage.json`.
