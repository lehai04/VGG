# 09. HƯỚNG DẪN SAO LƯU VÀ PHỤC HỒI DỮ LIỆU (BACKUP & RESTORE GUIDE)

---

## 1. Chiến Lược Sao Lưu Cơ Sở Dữ Liệu (Database Backup Strategy)

Khuyến nghị thiết lập sao lưu tự động hàng ngày vào lúc **02:00 sáng** (thời điểm lưu lượng truy cập thấp nhất).

### A. Lệnh Sao Lưu Nhanh (Manual Portable Backup Command)
```bash
# Tạo thư mục chứa file sao lưu
mkdir -p /var/backups/vgg-platform

# Xuất dữ liệu PostgreSQL từ Docker Compose service và nén gzip
cd /var/www/vgg-platform
docker compose exec -T postgres pg_dump -U vgg vgg | gzip > /var/backups/vgg-platform/db_backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

### B. Cấu Hình Tự Động Hóa Qua Linux Cronjob
Mở bảng lịch trình crontab của hệ điều hành:
```bash
crontab -e
```
Thêm dòng lệnh sau vào cuối file (tự động chạy lúc 02:00 sáng và tự xóa bản sao lưu cũ hơn 30 ngày):
```cron
0 2 * * * cd /var/www/vgg-platform && docker compose exec -T postgres pg_dump -U vgg vgg | gzip > /var/backups/vgg-platform/db_backup_$(date +\%Y\%m\%d_\%H\%M\%S).sql.gz && find /var/backups/vgg-platform/ -type f -name "db_backup_*.sql.gz" -mtime +30 -delete
```

---

## 2. Sao Lưu MinIO Media

Ảnh bài viết và tài liệu được lưu trong volume MinIO. Sao lưu database **không bao gồm** các file này; IT phải sao lưu cả hai trong cùng một lịch:
```bash
cd /var/www/vgg-platform
MINIO_CONTAINER=$(docker compose ps -q minio)
docker run --rm --volumes-from "$MINIO_CONTAINER" \
  -v /var/backups/vgg-platform:/backup alpine \
  tar -czf /backup/minio_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .
```

Kiểm tra file backup bằng `tar -tzf <file>`. Nên lưu một bản sao trên NAS/backup server nội bộ khác máy chủ ứng dụng.

### Phục hồi MinIO

> Thao tác này ghi vào kho media. Dừng admin và backend, đồng thời chụp snapshot volume hiện tại trước khi phục hồi.

```bash
cd /var/www/vgg-platform
docker compose stop minio
MINIO_CONTAINER=$(docker compose ps -aq minio)
docker run --rm --volumes-from "$MINIO_CONTAINER" \
  -v /var/backups/vgg-platform:/backup alpine \
  sh -c 'rm -rf /data/* && tar -xzf /backup/minio_backup_YYYYMMDD_HHMMSS.tar.gz -C /data'
docker compose start minio
```

---

## 3. Quy Trình Phục Hồi Dữ Liệu An Toàn (Database Restore Procedure)

> ⛔ **CẢNH BÁO AN TOÀN:**
> Phục hồi cơ sở dữ liệu là thao tác mang tính phá hủy dữ liệu hiện tại (**DESTRUCTIVE ACTION**). Bắt buộc phải sao lưu snapshot dữ liệu trước khi tiến hành phục hồi.

### Quy trình phục hồi chuẩn 6 bước:

#### Bước 1: Bật chế độ bảo trì và dừng ghi dữ liệu mới
```bash
pm2 stop all
```

#### Bước 2: Tạo bản sao lưu Snapshot khẩn cấp của CSDL hiện tại
```bash
cd /var/www/vgg-platform
docker compose exec -T postgres pg_dump -U vgg vgg | gzip > /var/backups/vgg-platform/emergency_pre_restore_snapshot_$(date +%Y%m%d_%H%M%S).sql.gz
```

#### Bước 3: Dọn dẹp schema cũ để tránh xung đột khóa chính / trùng lặp bảng
```bash
docker compose exec -T postgres psql -U vgg -d vgg -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO vgg;"
```

#### Bước 4: Nạp dữ liệu từ file sao lưu `.sql.gz`
```bash
# Chỉ định file backup cần phục hồi
BACKUP_FILE="/var/backups/vgg-platform/db_backup_20260831_020000.sql.gz"

# Giải nén và nạp trực tiếp vào PostgreSQL
gunzip -c $BACKUP_FILE | docker compose exec -T postgres psql -U vgg -d vgg
```

#### Bước 5: Chạy migration đồng bộ schema mới nhất (nếu có)
```bash
npm run db:deploy
```

#### Bước 6: Khởi động lại dịch vụ và kiểm tra
```bash
pm2 restart all
pm2 status
curl -f http://127.0.0.1:4000/health
```

---

## 4. Chính Sách Lưu Trữ Bản Sao Lưu Khuyến Nghị (Retention Policy)
* **Bản sao lưu hàng ngày (Daily):** Giữ lại trong vòng 7 - 14 ngày gần nhất.
* **Bản sao lưu hàng tuần (Weekly):** Giữ lại 4 tuần gần nhất.
* **Bản sao lưu hàng tháng (Monthly):** Giữ lại 3 tháng gần nhất.
* **Lưu trữ ngoài máy chủ ứng dụng:** Đồng bộ cả `.sql.gz` và `minio_backup_*.tar.gz` sang NAS hoặc máy chủ backup nội bộ riêng.
