# VGG Platform

Monorepo cho website public, logic nghiệp vụ dùng chung và ứng dụng quản trị VGG.

```text
frontend/  Website public Next.js (port 3000)
backend/   Validation/domain logic không phụ thuộc framework
admin/     Admin Next.js độc lập (port 3001; khung ban đầu)
docs/      Page map, architecture và Design System
```

## Bắt đầu

Yêu cầu Node.js 22.13+ và npm 10+.

```bash
npm ci
copy frontend/.env.example frontend/.env.local
npm run dev
```

Mở `http://localhost:3000`. Chạy admin với `npm run dev:admin`.

## Chất lượng và triển khai

`npm run check` chạy lint, typecheck, test và build production cho public site lẫn admin.

Khi triển khai frontend trên Vercel, giữ **Root Directory** ở repository root để workspace `backend` có thể được resolve, đặt Build Command là `npm run build`, và khai báo biến môi trường theo `frontend/.env.example`.

## Documentation

Xem [docs/README.md](./docs/README.md) trước khi thêm page hoặc component. Đây là nguồn tham chiếu gọn cho cấu trúc page và Design System.
