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

export const loginIdentifierSchema = z
  .string()
  .trim()
  .min(3, "Vui lòng nhập Email VLU hoặc Tên đăng nhập.")
  .max(190, "Thông tin đăng nhập không được vượt quá 190 ký tự.")
  .transform((value) => value.toLowerCase());

export const loginSchema = z.object({
  username: loginIdentifierSchema,
  password: z.string().min(1, "Vui lòng nhập mật khẩu.").max(128),
  remember: z.boolean().optional().default(false),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email không đúng định dạng.")
    .max(190)
    .transform((value) => value.toLowerCase()),
});

export const resetPasswordWithTokenSchema = z
  .object({
    token: z.string().trim().min(10, "Mã khôi phục không hợp lệ."),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
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
    email: z.union([z.string().trim().email("Email không hợp lệ."), z.literal("")]).optional(),
    phone: z.string().trim().max(30).optional(),
    roleCode: z.enum([ROLE_CODES.SUPER_ADMIN, ROLE_CODES.LEVEL_2]),
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
  username: usernameSchema.optional(),
  email: z.union([z.string().trim().email("Email không hợp lệ."), z.literal(""), z.null()]).optional(),
  phone: z.union([z.string().trim().max(30), z.null()]).optional(),
  roleCode: z.enum([ROLE_CODES.SUPER_ADMIN, ROLE_CODES.LEVEL_2]).optional(),
});

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Họ và tên tối thiểu 2 ký tự.").max(120),
  username: usernameSchema,
  email: z.union([z.string().trim().email("Email không hợp lệ."), z.literal("")]).optional(),
  phone: z.string().trim().max(30).optional(),
});

export const updateStatusSchema = z.object({ status: z.enum(["ACTIVE", "INACTIVE"]) });
export const updateRoleSchema = z.object({
  roleCode: z.enum([ROLE_CODES.SUPER_ADMIN, ROLE_CODES.LEVEL_2]),
});
export const resetPasswordSchema = z
  .object({ password: passwordSchema, confirmPassword: z.string() })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });

