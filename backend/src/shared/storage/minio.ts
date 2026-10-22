import { Client } from "minio";
import { env } from "../../config/environment.js";

// Client dùng phía server để thao tác object storage. Khởi tạo client không
// tự tạo bucket hoặc chứng minh kho đang sẵn sàng; lỗi kết nối xuất hiện khi gọi thao tác.
export const mediaStorage = new Client({
  endPoint: env.STORAGE_ENDPOINT,
  port: env.STORAGE_PORT,
  useSSL: env.STORAGE_USE_SSL,
  accessKey: env.STORAGE_ACCESS_KEY,
  secretKey: env.STORAGE_SECRET_KEY,
});

// Tên bucket lấy từ env để các module upload/download cùng dùng một cấu hình.
export const mediaBucket = env.STORAGE_BUCKET;
