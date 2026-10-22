import { ROLE_CODES } from "./constants";

/**
 * Định dạng email nhân viên Văn Lang: ha.nt@vlu.edu.vn (ten.chulot@vlu.edu.vn)
 */
export const VLU_STAFF_EMAIL_REGEX = /^[a-z0-9]+(\.[a-z0-9]+)+@vlu\.edu\.vn$/i;

/**
 * Định dạng email sinh viên CTV Văn Lang: ten.mssv@vanlanguni.vn
 * Ví dụ: ha.221a01001@vanlanguni.vn
 */
export const VLU_STUDENT_EMAIL_REGEX = /^[a-z0-9]+\.[a-z0-9]+@vanlanguni\.vn$/i;

export interface EmailValidationResult {
  ok: boolean;
  message?: string;
}

/**
 * Xác thực email quản trị viên theo từng vai trò:
 * - SUPER_ADMIN & ADMIN_LEVEL_2: Bắt buộc ten.holot@vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn)
 * - ADMIN_LEVEL_3: Bắt buộc CHỈ DUY NHẤT ten.mssv@vanlanguni.vn (Ví dụ: ha.221a01001@vanlanguni.vn)
 */
export function validateAdminEmailByRole(
  email: string | undefined | null,
  roleCode?: string,
): EmailValidationResult {
  const trimmed = (email || "").trim().toLowerCase();

  // Kiểm tra khi chưa nhập email
  if (!trimmed) {
    if (roleCode === ROLE_CODES.LEVEL_2 || roleCode === ROLE_CODES.SUPER_ADMIN) {
      return {
        ok: false,
        message: "Email là bắt buộc. Vui lòng nhập email Văn Lang (@vlu.edu.vn).",
      };
    }
    if (roleCode === ROLE_CODES.LEVEL_3) {
      return {
        ok: false,
        message: "Email là bắt buộc. Vui lòng nhập email CTV sinh viên (@vanlanguni.vn).",
      };
    }
    return { ok: true };
  }

  // Nếu là QTV Cấp 1 (Super Admin) hoặc QTV Cấp 2 (Nhân viên trường)
  if (roleCode === ROLE_CODES.SUPER_ADMIN || roleCode === ROLE_CODES.LEVEL_2) {
    if (!trimmed.endsWith("@vlu.edu.vn")) {
      return {
        ok: false,
        message: "Email Quản trị viên (Cấp 1 & Cấp 2) phải có đuôi @vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn).",
      };
    }
    if (!VLU_STAFF_EMAIL_REGEX.test(trimmed)) {
      return {
        ok: false,
        message: "Cấu trúc Email không đúng định dạng: ten.holot@vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn).",
      };
    }
  }

  // Nếu là QTV Cấp 3 (CTV là Sinh viên)
  if (roleCode === ROLE_CODES.LEVEL_3) {
    if (!trimmed.endsWith("@vanlanguni.vn")) {
      return {
        ok: false,
        message: "Email QTV Cấp 3 (CTV Sinh viên) chỉ chấp nhận duy nhất đuôi @vanlanguni.vn (Ví dụ: ha.221a01001@vanlanguni.vn).",
      };
    }
    if (!VLU_STUDENT_EMAIL_REGEX.test(trimmed)) {
      return {
        ok: false,
        message: "Cấu trúc Email CTV sinh viên không đúng định dạng: ten.mssv@vanlanguni.vn (Ví dụ: ha.221a01001@vanlanguni.vn).",
      };
    }
  }

  return { ok: true };
}
