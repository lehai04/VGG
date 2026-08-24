import { z } from "zod";
import { passwordSchema } from "./password";
import { ROLE_CODES } from "./constants";

export const usernameSchema = z
  .string()
  .trim()
  .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự.")
  .max(50, "Tên đăng nhập không được vượt quá 50 ký tự.")
  .regex(/^[a-zA-Z0-9._-]+$/, "Tên đăng nhập chỉ gồm chữ, số, dấu chấm, gạch dưới hoặc gạch ngang.")
  .transform((value) => value.toLowerCase());

export const loginSchema = z.object({
  username: usernameSchema,
  password: z.string().min(1).max(128),
  remember: z.boolean().optional().default(false),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1).max(128),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });

export const createAdminSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120),
    username: usernameSchema,
    email: z.union([z.email(), z.literal("")]).optional(),
    phone: z.string().trim().max(30).optional(),
    roleCode: z.enum([ROLE_CODES.SUPER_ADMIN, ROLE_CODES.LEVEL_2, ROLE_CODES.LEVEL_3]),
    password: passwordSchema,
    confirmPassword: z.string(),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    mustChangePassword: z.boolean().default(true),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });

export const updateAdminSchema = z.object({
  fullName: z.string().trim().min(2).max(120).optional(),
  email: z.union([z.email(), z.literal(""), z.null()]).optional(),
  phone: z.union([z.string().trim().max(30), z.null()]).optional(),
});

export const updateStatusSchema = z.object({ status: z.enum(["ACTIVE", "INACTIVE"]) });
export const updateRoleSchema = z.object({
  roleCode: z.enum([ROLE_CODES.SUPER_ADMIN, ROLE_CODES.LEVEL_2, ROLE_CODES.LEVEL_3]),
});
export const resetPasswordSchema = z
  .object({ password: passwordSchema, confirmPassword: z.string() })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });

