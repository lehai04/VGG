export const SESSION_COOKIE = "vgg_admin_session";
export const SESSION_DAYS = 1;
export const REMEMBER_SESSION_DAYS = 30;
export const MAX_FAILED_LOGINS = 5;
export const LOCK_MINUTES = 15;

export const ROLE_CODES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  LEVEL_2: "ADMIN_LEVEL_2",
} as const;

export const ADMIN_PERMISSIONS = [
  "admins.view",
  "admins.create",
  "admins.update",
  "admins.disable",
  "admins.reset_password",
  "admins.change_role",
  "admins.delete",
] as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];

