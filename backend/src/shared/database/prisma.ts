import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "../../config/environment.js";

// Một client PostgreSQL dùng chung qua cơ chế cache module của Node.js.
// buildApp đăng ký hook onClose để ngắt kết nối; không disconnect sau mỗi request.
export const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: env.DATABASE_URL }) });
