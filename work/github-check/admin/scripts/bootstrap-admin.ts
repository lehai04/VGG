import "dotenv/config";
import { prisma } from "../src/lib/db";
import { ROLE_CODES } from "../src/lib/auth/constants";
import { hashPassword, passwordSchema } from "../src/lib/auth/password";
import { ensureRolesAndPermissions } from "../src/lib/auth/roles";
import { usernameSchema } from "../src/lib/auth/schemas";

async function main() {
  const username = usernameSchema.parse(process.env.INITIAL_ADMIN_USERNAME);
  const password = passwordSchema.parse(process.env.INITIAL_ADMIN_PASSWORD);
  const fullName = process.env.INITIAL_ADMIN_NAME?.trim();
  if (!fullName || fullName.length < 2) throw new Error("INITIAL_ADMIN_NAME chưa hợp lệ.");

  await ensureRolesAndPermissions();
  const existingSuperAdmin = await prisma.admin.findFirst({
    where: { role: { code: ROLE_CODES.SUPER_ADMIN } },
    select: { username: true },
  });
  if (existingSuperAdmin) {
    console.log(`Đã có Super Admin (${existingSuperAdmin.username}); bootstrap không thay đổi dữ liệu.`);
    return;
  }
  const role = await prisma.role.findUniqueOrThrow({ where: { code: ROLE_CODES.SUPER_ADMIN } });
  await prisma.admin.create({
    data: {
      username,
      passwordHash: await hashPassword(password),
      fullName,
      email: process.env.INITIAL_ADMIN_EMAIL?.trim() || null,
      roleId: role.id,
      status: "ACTIVE",
      mustChangePassword: true,
    },
  });
  console.log(`Đã tạo Super Admin đầu tiên: ${username}. Tài khoản phải đổi mật khẩu khi đăng nhập.`);
}

main()
  .catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
