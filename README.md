# VGG — Cổng thông tin Viện Sau Đại học

Website công khai gồm Next.js, API Fastify và PostgreSQL cài trực tiếp trên máy chủ.
Hỗ trợ nội dung VI/EN, chương trình đào tạo, tuyển sinh, tin tức, tài liệu và form tư vấn.

## Khởi chạy

```sh
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Tạo database và cấu hình kết nối theo HANDOVER.md trước khi chạy các lệnh sau.
npm ci
npm run db:deploy
npm run db:seed
npm run build
npm run start:backend
# Terminal thứ hai: npm start
```

Xem [hướng dẫn bàn giao](HANDOVER.md) để triển khai, nạp dữ liệu và nghiệm thu.

## Mã nguồn

- `frontend/`: giao diện và API cùng origin.
- `backend/`: API public, schema PostgreSQL, migration và seed.
- `scripts/`: kiểm tra tích hợp và chuyển dữ liệu website.
- `ecosystem.config.cjs`: cấu hình chạy hai tiến trình bằng PM2 nếu IT sử dụng PM2.

Triển khai trực tiếp không cần Docker. Ảnh/PDF bàn giao nằm trong `frontend/public`;
MinIO chỉ cần khi tiếp nhận dữ liệu đã tham chiếu tới object storage. Các file Docker
được giữ làm phương án kiểm thử tùy chọn, không nằm trong quy trình triển khai cho IT.

Kiểm tra: `npm run build`, `npm test`, `npm run lint`.
