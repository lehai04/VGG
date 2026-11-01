import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../dist/modules/consultation-admin/password.js";

const email = process.env.CMS_ADMIN_EMAIL?.trim().toLowerCase();
const fullName = process.env.CMS_ADMIN_NAME?.trim();
const password = process.env.CMS_ADMIN_PASSWORD;

if (!process.env.DATABASE_URL) throw new Error("Thiếu DATABASE_URL.");
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 190)
  throw new Error("CMS_ADMIN_EMAIL không hợp lệ.");
if (!fullName || fullName.length > 120)
  throw new Error("CMS_ADMIN_NAME phải có 1–120 ký tự.");
if (!password || password.length < 12 || password.length > 256)
  throw new Error("CMS_ADMIN_PASSWORD phải có 12–256 ký tự; lấy từ secret store, không ghi vào source.");

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
try {
  const exists = await db.consultationStaff.findUnique({ where: { email } });
  if (exists) {
    throw new Error("Tài khoản đã tồn tại; dùng staff:manage để cập nhật, tránh seed ghi đè.");
  }

  await db.consultationStaff.create({
    data: {
      email,
      fullName,
      passwordHash: await hashPassword(password),
      canUpdate: true,
      canManageContent: true,
    },
  });
  console.log(`Đã tạo tài khoản CMS ${email} (quyền tư vấn + quản lý nội dung).`);
} finally {
  await db.$disconnect();
}
