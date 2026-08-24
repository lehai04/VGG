import argon2 from "argon2";
import { z } from "zod";

const weakPasswords = new Set(["123456", "password", "admin123", "qwerty"]);

export const passwordSchema = z
  .string()
  .min(10, "Mật khẩu phải có ít nhất 10 ký tự.")
  .max(128, "Mật khẩu không được vượt quá 128 ký tự.")
  .regex(/[A-Z]/, "Mật khẩu phải có chữ hoa.")
  .regex(/[a-z]/, "Mật khẩu phải có chữ thường.")
  .regex(/[0-9]/, "Mật khẩu phải có chữ số.")
  .regex(/[^A-Za-z0-9]/, "Mật khẩu phải có ký tự đặc biệt.")
  .refine((value) => !weakPasswords.has(value.toLowerCase()), "Mật khẩu quá phổ biến.");

export function hashPassword(password: string) {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  });
}

export function verifyPassword(hash: string, password: string) {
  return argon2.verify(hash, password);
}

