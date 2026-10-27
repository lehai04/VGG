# Nâng cấp Next.js và Node.js — 27/10/2026

## Phạm vi

- Frontend và admin: Next.js / eslint-config-next từ 16.3.1 lên **16.4.3**, khóa phiên bản chính xác trong package.json và package-lock.json.
- Node.js mới nhất tại thời điểm kiểm tra danh sách phát hành chính thức: **26.12.1** (Current, trường `lts: false`). `.nvmrc` chỉ định phiên bản này cho phát triển/server nội bộ.
- Vercel hiện chỉ công bố hỗ trợ Node.js 24.x và 22.x. `engines.node` dùng `^24.22.1 || ^26.12.1` để chấp nhận nhánh 24 đã vá và nhánh 26 đã vá; khi triển khai Vercel, chọn **24.x** và xác minh phiên bản thực tế trong build log.
- Không đổi phiên bản React, Prisma, PostgreSQL hoặc schema dữ liệu trong đợt này.
- Phiên bản ứng dụng khai báo vẫn là 1.0.2; chưa tạo release tag mới.

## Cài đặt và kiểm tra

Máy chủ nội bộ: cài Node.js 26.12.1 từ nguồn chính thức, xác minh `node --version`, rồi chạy `npm ci` và `npm run check`. Backend được build trong bước test; có thể chạy riêng `npm run build:backend` khi chuẩn bị triển khai.

Node.js 26.12.1 portable dùng kiểm thử trên máy hiện tại nằm trong `outputs/node26-runtime/`, đã đối chiếu SHA-256 với SHASUMS256.txt chính thức. Đây là runtime cục bộ, không được commit và không thay Node.js toàn máy. Người nhận mã nguồn phải cài/chọn runtime tương ứng; `.nvmrc` không tự cài Node.js.

Không chạy migration hoặc sửa dữ liệu production. Gói snapshot tĩnh đã bàn giao trước đó không tự thay đổi khi nâng Next.js. Muốn phát hành gói mới phải xuất lại từ phiên bản đã nghiệm thu.

## Nguồn đối chiếu

- npm: `npm view next dist-tags --json` trả `latest: 16.4.3` (không dùng canary/beta).
- Node.js: https://nodejs.org/dist/index.json
- SHA-256: https://nodejs.org/dist/v26.12.1/SHASUMS256.txt
- Vercel: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions

## Kết quả kiểm chứng

- `npm ci`: thành công với Node.js 26.12.1.
- Typecheck: đạt ở backend, frontend và admin.
- Tests: 84 bài đạt, 0 thất bại, 1 bài bỏ qua (frontend 45, backend 11 đạt/1 bỏ qua, admin 28).
- Build production: frontend và admin thành công với Next.js 16.4.3; backend Prisma generate/TypeScript build thành công trong bước test.
- Lint frontend: đạt. Lint admin: còn 10 lỗi và 6 cảnh báo; vì vậy `npm run check` chưa đạt toàn bộ. Chi tiết ở `outputs/technology-audit/upgrade-check.log`: liên kết SSO, cập nhật state trong effect và ký tự JSX chưa escape. Các component này chưa được sửa trong đợt nâng runtime.
- Smoke test: production `/vi` trả HTTP 200; trình duyệt hiển thị trang chủ và điều hướng sang `/vi/programmes` thành công. Trang `/admin/login` của admin dev trả HTTP 200.
- Dev frontend: ép `-H 127.0.0.1` gây vòng redirect locale trong lần thử; chạy lại theo lệnh dev mặc định (không ép host) và truy cập `http://localhost:3000/vi` trả HTTP 200. Không sửa proxy ứng dụng.
- Chưa kiểm chứng luồng đăng nhập/CMS/ghi dữ liệu end-to-end vì backend local cổng 4000 không hoạt động. Không dùng kết quả smoke test giao diện để khẳng định kết nối PostgreSQL thành công.
- Chưa push GitHub, triển khai Vercel hoặc phát hành lại bundle/ZIP snapshot tĩnh. Node.js toàn máy vẫn là 24.19.0; runtime 26.12.1 được dùng riêng cho lượt cài đặt, build và kiểm thử này.

Log kiểm tra nằm trong `outputs/technology-audit/upgrade-*.log`. Cần xử lý các lỗi lint admin và nghiệm thu với backend/cơ sở dữ liệu trước khi phát hành production.

## Cập nhật bàn giao sau kiểm thử

Đã xuất lại VGG-STATIC-IT.zip từ production build local Next.js 16.4.3 / Node.js 26.12.1: 92 trang/biến thể URL và trang danh mục; 223 URL kiểm tra đạt, checksum ZIP đạt. Gói dùng nội dung mặc định trong mã nguồn, không phải bản sao CMS/database. Bốn ảnh được tải trực tiếp từ nguồn sau lỗi timeout optimizer; một ảnh nguồn 404 dùng placeholder có ghi chú. ZIP và runtime chỉ lưu local, không đưa vào repository. Các dòng trạng thái chưa push ở trên ghi nhận thời điểm kiểm thử; việc push GitHub được thực hiện theo yêu cầu tiếp theo của người dùng.
