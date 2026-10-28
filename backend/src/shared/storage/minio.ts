import { Client } from "minio";
import { env } from "../../config/environment.js";

// Client dùng phía server để thao tác object storage. Khởi tạo client không
// tự tạo bucket hoặc chứng minh kho đang sẵn sàng; lỗi kết nối xuất hiện khi gọi thao tác.
export const mediaStorage = env.STORAGE_ACCESS_KEY && env.STORAGE_SECRET_KEY ? new Client({
  endPoint: env.STORAGE_ENDPOINT,
  port: env.STORAGE_PORT,
  useSSL: env.STORAGE_USE_SSL,
  accessKey: env.STORAGE_ACCESS_KEY,
  secretKey: env.STORAGE_SECRET_KEY,
}) : null;

// Tên bucket lấy từ env để các module upload/download cùng dùng một cấu hình.
export const mediaBucket = env.STORAGE_BUCKET;
