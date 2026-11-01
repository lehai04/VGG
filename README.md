# VGG — Website và CMS Viện Sau Đại học

Ba ứng dụng độc lập trong một npm workspace. Website và CMS có tên miền riêng, cùng dùng API/database để tiếp nhận và xử lý tư vấn.

## Cấu trúc

| Thư mục | Vai trò |
|---|---|
| `frontend/` | Website công khai, cổng nội bộ 3000 |
| `cms/` | Quản trị tư vấn, cổng nội bộ 3001 |
| `backend/` | API Fastify, Prisma/migrations, cổng nội bộ 4000 |
| `frontend/public/` | Ảnh, font, PDF và media tĩnh công khai |
| `scripts/` | Kiểm thử, kiểm tra repository/media, chuyển dữ liệu có chủ đích |
| `deploy/nginx/` | Gateway HTTPS, giới hạn request, chặn đường quản trị trên website |
| `deploy/legacy/` | Công cụ cũ được lưu theo yêu cầu, không còn là đường triển khai chính |
| `docs/` | Hướng dẫn nghiệp vụ, bảo mật, kết quả audit |

Không đặt file env, khóa TLS, backup, dữ liệu người đăng ký hoặc ảnh kiểm thử vào `public`. Tài liệu đã có trong MinIO tiếp tục được phục vụ qua `/api/media/`; không tự động di chuyển/xóa dữ liệu kho.

## Chạy phát triển

Dùng phiên bản Node trong `.nvmrc` và `npm ci`. Sao chép các `.env.example` của backend/frontend/cms thành file env tương ứng và cấu hình database/kho file.

```sh
npm run dev:backend
npm run dev       # terminal khác: website http://localhost:3000
npm run dev:cms   # terminal khác: CMS http://localhost:3001
```

Migration: `npm run db:deploy`. Seed chỉ dành cho database mới hoặc thao tác nhập nội dung đã được chủ dự án chấp thuận, không chạy tự động mỗi lần deploy.

## Triển khai và kiểm tra

**Docker Compose là quy trình chính.** Xem [HANDOVER.md](HANDOVER.md). CI chỉ kiểm tra/build; IT triển khai revision đã duyệt. PostgreSQL, MinIO, website, CMS và backend không publish port trực tiếp; gateway là điểm truy cập công khai.

```sh
npm run check:repository
npm test
npm run lint
npm run build
npm run audit:production
```

- [CMS và tài khoản cán bộ](docs/CONSULTATION_ADMIN.md)
- [Bảo mật và vận hành](docs/SECURITY.md)
- [Ngân sách media](docs/MEDIA_BUDGET.md)
- [Nhật ký dọn project](docs/audits/cleanup-2026-10-29.json)

`outputs/`, `work/`, `.tmp/`, build/cache là file sinh tạm, được Git/Docker bỏ qua. Không commit gói bàn giao, snapshot source hoặc secrets.

## Ranh giới mã nguồn frontend/backend

`frontend/src/app` chứa route, `features` chứa giao diện theo nghiệp vụ, `lib` chứa logic server/SEO và `public` chứa media tĩnh. `backend/src/modules` chứa API theo nghiệp vụ, `config` kiểm tra env, `shared` kết nối database/storage. `prisma` chứa schema, migration và seed; không xóa migration đã phát hành.

Các helper thuần `backend/src/modules/content` hiện được website dùng chung để diễn giải nội dung. Đây là phụ thuộc build có chủ đích trong monorepo; không phải frontend kết nối database trực tiếp. Các dữ liệu mặc định và demo vẫn có nơi sử dụng, không xóa chỉ vì chưa bật demo trên production.
