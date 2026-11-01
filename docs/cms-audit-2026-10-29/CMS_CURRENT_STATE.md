# Hiện trạng CMS — 29/10/2026

## Phạm vi và mức độ kiểm chứng

Khảo sát working tree `C:/Users/lepha/VGG`, HEAD `cd2f1ce`, bao gồm thay đổi chưa commit tại thời điểm đọc. Không coi `outputs/`, `.worktrees/` hay tài liệu kiến trúc cũ là mã nguồn đang chạy. Chỉ tạo tám tài liệu trong thư mục này; không sửa ứng dụng, cấu hình, môi trường, migration hoặc dữ liệu.

Đã đọc route, layout, component nghiệp vụ, nguồn nội dung, schema, seed, API, storage, proxy và cấu hình triển khai. Đã chạy `node --test frontend/tests/*.test.mjs`: **45/45 đạt**. Đây là kiểm thử hiện có, phần lớn kiểm tra logic/source; không chứng minh luồng CMS hoạt động. Không có listener ở 3000/4000/5432/9000 khi kiểm tra. Chưa kiểm tra trực quan trên trình duyệt, chưa truy vấn database đang vận hành, chưa chạy backend integration/build. Kết quả ngày 28/10 trong `docs/VERIFICATION.md` là bằng chứng lịch sử, không phải kết quả chạy lại hôm nay. URL production thực tế chưa được xác nhận; domain mặc định trong code không chứng minh deployment.

## Kiến trúc và công nghệ

| Lớp | Hiện trạng kiểm tra từ mã nguồn |
|---|---|
| Repository | npm workspaces `frontend`, `backend`; `package-lock.json`; ESM |
| Frontend | Next.js 16.4.3 App Router, React/React DOM 19.2.8, TypeScript 5.9.3; CSS thường/CSS modules; lucide-react, sharp |
| Backend | Fastify ^5.12.1, Zod ^4.4.3; helmet, cors, rate-limit; TypeScript |
| Database | PostgreSQL; Prisma/client/adapter-pg ^7.9.1; pg ^8.23.1; Compose chọn PostgreSQL 17 |
| Media | File trong `frontend/public`; client MinIO ^8.0.6 tùy chọn, đọc object qua API |
| Runtime | `.nvmrc` 26.12.1, engines ^26.12.1; shell khảo sát thực tế Node 24.19.0, npm 11.17.0 — cần thống nhất trước build |
| Vận hành | `HANDOVER.md`, systemd/Nginx trong `deploy/handover*`, PM2 `ecosystem.config.cjs`; Docker/Compose là lựa chọn bổ sung |

Các số có dấu ^ là khai báo manifest, không khẳng định phiên bản cài thực tế hay phiên bản mới nhất.

## Tổ chức mã và luồng dữ liệu

- `frontend/src/app/(public)`: route công khai; `app/api`: proxy tư vấn, analytics, media, tài liệu.
- `frontend/src/proxy.ts`: redirect URL thiếu locale sang `/vi`; rewrite `/vi` và `/en` về cùng cây route, gắn header locale. Chưa có ngoại lệ admin.
- `app/layout.tsx`: CSS toàn cục, LocaleProvider, WebsiteChromeProvider, metadata/JSON-LD, VisitTracker, StickyActions. Nếu thêm admin bên dưới root hiện tại, các thành phần public này vẫn được kế thừa.
- `features/*`: tuyển sinh, ngành học, giới thiệu, nghiên cứu, tài nguyên, tin, hành trình người học; `data/*`, `messages/*`: defaults và từ điển.
- `lib/website-content.ts`: lấy SiteContent đã publish, ghép patch trên defaults; `page-seo.ts` đọc SEO riêng; `shared/components/ContentPageSections.tsx` ghép section được kiểm soát.
- `backend/src/app.ts`: chỉ đăng ký publicRoutes và health/readiness; `modules/content`: helper patch, schema composition/banner/collection và snapshot defaults, chưa có route ghi CMS.
- `backend/prisma`: bảy model nghiệp vụ, một migration foundation. Không có User, Session, Role, MediaAsset hay ContentRevision.
- `shared/styles`: style dùng chung; frontend đang import trực tiếp helper TypeScript từ backend, tạo phụ thuộc build giữa hai workspace.

## Năng lực nội dung hiện có

SiteContent lưu JSON, namespace `page.published.{locale}.{id}`; boolean `published` lọc public. Patch dạng `Record<string,string>` theo đường dẫn field; `$layout`, `$banner` và collections là cấu trúc đã có parser. Trường kỹ thuật bị khóa; URL/ảnh có kiểm tra. `websiteProgrammes` ghép 21 ngành nguồn với ngành mới ở section `content-programme` và trạng thái `content-programme-state`.

Nguồn thật là kết hợp defaults TypeScript/JSON + patch database. Khi backend lỗi, trang nội dung dùng lại defaults; do đó nội dung cũ có thể xuất hiện lại. Tin/tài nguyên dùng API; demo chỉ bật trực tiếp khi cờ tương ứng bằng `true`, nhưng seed **luôn nhập** dữ liệu từ `demoNewsPosts` và `demoResources` vào database. Cần rà soát nguồn và phê duyệt dữ liệu này, không mặc định tên demo đồng nghĩa toàn bộ dữ liệu là giả hoặc đã được duyệt.

`NewsPost`, `ResourceFile` có DRAFT/PUBLISHED/ARCHIVED; SiteContent chỉ có boolean. Các trường này không đồng nghĩa đã có workflow. Frontend còn lời gọi `/api/public/news-preview` nhưng backend không đăng ký endpoint đó. Không thấy khu vực admin, login, upload, CRUD nội dung, phiên đăng nhập, RBAC hay audit nội dung trong mã đang hoạt động.

## Bảo vệ hiện tại và khoảng trống

Helmet, origin CORS, giới hạn body 1 MB, Zod, tư vấn 5 request/10 phút; global rate-limit tắt. `trustProxy: true` cần đối chiếu mạng/proxy thật. Visits chưa thấy rate-limit riêng. Có renderer rich text theo allowlist cho một số nội dung, nhưng bài tin render `post.content` bằng `dangerouslySetInnerHTML`; cần bảo vệ riêng trước mở ghi CMS. API media công khai theo object key, không kiểm tra trạng thái xuất bản của tài sản.

Không có cơ chế backup/restore CMS đã được kiểm chứng trong lần khảo sát này. Có tài liệu/bộ đóng gói bàn giao và script chuyển dữ liệu; chúng không thay thế diễn tập khôi phục cả DB lẫn object storage.

## Cần xác minh tiếp

Trên staging cô lập: xác định release đang chạy, đối chiếu migration/schema và số bản ghi, chụp baseline desktop/mobile, đo latency, kiểm tra VI/EN, kiểm tra media reference và nguồn nội dung seed. Với vận hành: xác nhận có SSO hay admin ở repository khác, vai trò duyệt bài, chính sách backup và tài nguyên máy chủ. Không cần người dùng mô tả lại cấu trúc đã đọc được từ source.
