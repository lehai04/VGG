import { prisma } from "@/lib/db";
import { ADMIN_PERMISSIONS, ROLE_CODES } from "./constants";

export const roleSeeds = [
  { code: ROLE_CODES.SUPER_ADMIN, name: "QTV Cấp 1 – Super Admin", level: 1 },
  { code: ROLE_CODES.LEVEL_2, name: "QTV Cấp 2", level: 2 },
] as const;

export async function ensureRolesAndPermissions() {
  const permissions = await Promise.all(
    ADMIN_PERMISSIONS.map((code) =>
      prisma.permission.upsert({
        where: { code },
        update: {},
        create: { code, description: `Quyền ${code}` },
      }),
    ),
  );
  const roles = await Promise.all(
    roleSeeds.map((role) => prisma.role.upsert({ where: { code: role.code }, update: role, create: role })),
  );
  const superAdmin = roles.find((role) => role.code === ROLE_CODES.SUPER_ADMIN);
  if (!superAdmin) throw new Error("Không thể khởi tạo vai trò Super Admin.");
  await prisma.rolePermission.createMany({
    data: permissions
      .filter((permission) => permission.code !== "admins.delete")
      .map((permission) => ({ roleId: superAdmin.id, permissionId: permission.id })),
    skipDuplicates: true,
  });
  return roles;
}

export async function isLastActiveSuperAdmin(adminId: string) {
  const target = await prisma.admin.findUnique({ where: { id: adminId }, include: { role: true } });
  if (!target || target.role.code !== ROLE_CODES.SUPER_ADMIN || target.status !== "ACTIVE") return false;
  const count = await prisma.admin.count({
    where: { role: { code: ROLE_CODES.SUPER_ADMIN }, status: "ACTIVE" },
  });
  return count <= 1;
}

