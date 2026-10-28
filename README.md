# VGG — Cổng thông tin Viện Sau Đại học

Website công khai gồm Next.js, API Fastify, PostgreSQL và kho media MinIO.
Hỗ trợ nội dung VI/EN, chương trình đào tạo, tuyển sinh, tin tức, tài liệu và form tư vấn.

## Khởi chạy

```sh
cp .env.example .env
# Điền mật khẩu và PUBLIC_APP_URL trong .env
docker compose up -d --build
```

Xem [hướng dẫn bàn giao](HANDOVER.md) để triển khai, nạp dữ liệu và nghiệm thu.

## Mã nguồn

- `frontend/`: giao diện và API cùng origin.
- `backend/`: API public, schema PostgreSQL, migration và seed.
- `scripts/`: kiểm tra tích hợp và chuyển dữ liệu website.
- `compose.yaml`, `Dockerfile`: triển khai toàn bộ hệ thống.

Kiểm tra: `npm run build`, `npm test`, `npm run lint`.
