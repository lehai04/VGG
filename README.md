# VGG — Website public không CMS

Bản bàn giao giai đoạn 1: frontend Next.js, backend Fastify, PostgreSQL và MinIO.
Form tư vấn lưu vào database; tin tức, tài liệu và nội dung trang đọc dữ liệu đã bàn giao.

Xem [hướng dẫn triển khai và nghiệm thu](HANDOVER.md).

```sh
cp .env.example .env
# Điền mật khẩu và domain trong .env
docker compose up -d --build
```

Không có ứng dụng admin hay API quản trị trong branch này. Lịch sử migration và
các tiện ích render nội dung được giữ để bảo toàn dữ liệu và tương thích giai đoạn sau.
