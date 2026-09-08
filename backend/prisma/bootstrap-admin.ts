import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import argon2 from "argon2";

const databaseUrl = z.string().min(1).parse(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });

const permissions = [
  "dashboard.view",
  "news.view", "news.create", "news.update", "news.delete", "news.restore", "news.publish",
  "resources.view", "resources.create", "resources.update", "resources.delete",
  "consultations.view", "consultations.update", "consultations.assign", "consultations.export",
  "media.view", "media.upload", "media.delete",
  "admins.view", "admins.create", "admins.update", "admins.disable", "admins.reset_password", "admins.change_role", "admins.delete",
  "permissions.manage", "audit.view",
  "settings.view", "settings.update", "settings.security", "settings.logs",
] as const;

async function main() {
  const roleSeeds = [
    { code: "SUPER_ADMIN", name: "QTV Cấp 1 – Super Admin", level: 1 },
    { code: "ADMIN_LEVEL_2", name: "QTV Cấp 2", level: 2 },
  ];

  const roles = await Promise.all(
    roleSeeds.map((role) => prisma.role.upsert({ where: { code: role.code }, update: role, create: role }))
  );

  const permissionRows = await Promise.all(
    permissions.map((code) =>
      prisma.permission.upsert({ where: { code }, update: {}, create: { code, description: `Quyền ${code}` } })
    )
  );

  const superRole = roles.find((role) => role.code === "SUPER_ADMIN")!;
  const level2Role = roles.find((role) => role.code === "ADMIN_LEVEL_2")!;

  // Super Admin gets ALL permissions
  await prisma.rolePermission.createMany({
    data: permissionRows.map((p) => ({ roleId: superRole.id, permissionId: p.id })),
    skipDuplicates: true,
  });

  // Level 2 gets all permissions EXCEPT admins.* and permissions.*
  const level2Permissions = permissionRows.filter(
    (p) => !p.code.startsWith("admins.") && !p.code.startsWith("permissions.") && !p.code.startsWith("audit.")
  );
  await prisma.rolePermission.createMany({
    data: level2Permissions.map((p) => ({ roleId: level2Role.id, permissionId: p.id })),
    skipDuplicates: true,
  });

  const existing = await prisma.admin.findFirst({ where: { role: { code: "SUPER_ADMIN" } } });
  if (existing) return console.log(`Đã có Super Admin (${existing.username}); không tạo thêm.`);

  const username = z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9._-]+$/)
    .transform((v) => v.toLowerCase())
    .parse(process.env.INITIAL_ADMIN_USERNAME);

  const password = z
    .string()
    .min(10)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/)
    .parse(process.env.INITIAL_ADMIN_PASSWORD);

  const fullName = z.string().trim().min(2).max(120).parse(process.env.INITIAL_ADMIN_NAME);
  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });

  await prisma.admin.create({
    data: {
      username,
      passwordHash,
      fullName,
      email: process.env.INITIAL_ADMIN_EMAIL?.trim() || null,
      roleId: superRole.id,
      mustChangePassword: true,
    },
  });

  console.log(`Đã tạo Super Admin đầu tiên: ${username}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
