import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// Trong dev, module có thể được tải lại bởi HMR. Giữ client trên globalThis
// giúp tái sử dụng kết nối thay vì tạo một client mới mỗi lần nạp module.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** Tạo adapter PostgreSQL từ cấu hình server; thiếu URL thì dừng sớm.
 * Không import module này từ Client Component hoặc đưa DATABASE_URL ra client. */
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL chưa được cấu hình.");
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Production không gán cache global; vẫn tái sử dụng export của module trong tiến trình.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

