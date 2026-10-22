/**
 * Bộ quy tắc kiểm tra định dạng dữ liệu (Validation Rules) cho toàn hệ thống VGG
 */

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface PasswordCriteria {
  hasMinLength: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  isValid: boolean;
}

/**
 * Số điện thoại: Bắt đầu bằng số 0, gồm đúng 10 số tự nhiên, không chữ, không ký tự đặc biệt.
 */
export function validatePhone(phone: string, required = false): ValidationResult {
  const trimmed = (phone || "").trim();
  if (!trimmed) {
    if (required) {
      return { isValid: false, message: "Vui lòng nhập số điện thoại." };
    }
    return { isValid: true, message: "" };
  }

  // Bắt đầu bằng số 0, theo sau là đúng 9 chữ số tự nhiên
  const phoneRegex = /^0[0-9]{9}$/;
  if (!phoneRegex.test(trimmed)) {
    return {
      isValid: false,
      message: "Vui lòng nhập đúng định dạng: Số điện thoại phải bắt đầu bằng số 0 và gồm đúng 10 chữ số (VD: 0901234567).",
    };
  }

  return { isValid: true, message: "" };
}

/**
 * Tên đăng nhập: Tối thiểu 6 ký tự, không chứa dấu cách.
 */
export function validateUsername(username: string): ValidationResult {
  const trimmed = username || "";
  if (!trimmed) {
    return { isValid: false, message: "Vui lòng nhập tên đăng nhập." };
  }

  if (/\s/.test(trimmed)) {
    return {
      isValid: false,
      message: "Vui lòng nhập đúng định dạng: Tên đăng nhập không được chứa dấu cách.",
    };
  }

  if (trimmed.length < 6) {
    return {
      isValid: false,
      message: "Vui lòng nhập đúng định dạng: Tên đăng nhập tối thiểu 6 ký tự.",
    };
  }

  // Cho phép chữ cái, chữ số, dấu gạch dưới, gạch ngang, dấu chấm
  if (!/^[a-zA-Z0-9._-]+$/.test(trimmed)) {
    return {
      isValid: false,
      message: "Vui lòng nhập đúng định dạng: Tên đăng nhập chỉ gồm chữ cái, chữ số và các ký tự . _ -",
    };
  }

  return { isValid: true, message: "" };
}

/**
 * Email người dùng / Form yêu cầu tư vấn: Bất kỳ email nào (gmail, email, outlook...) miễn đúng định dạng email thật.
 */
export function validateGeneralEmail(email: string): ValidationResult {
  const trimmed = (email || "").trim();
  if (!trimmed) {
    return { isValid: false, message: "Vui lòng nhập địa chỉ email." };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      message: "Vui lòng nhập đúng định dạng email (Ví dụ: hoten@gmail.com, contact@domain.com).",
    };
  }

  return { isValid: true, message: "" };
}

/**
 * Email Quản trị viên:
 * - Cấp 1, Cấp 2: Bắt buộc đuôi @vlu.edu.vn, cấu trúc ten.holot@vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn)
 * - Cấp 3: CHỈ DUY NHẤT đuôi @vanlanguni.vn, cấu trúc ten.mssv@vanlanguni.vn (Ví dụ: ha.221a01001@vanlanguni.vn)
 */
export function validateAdminEmail(email: string, roleCode?: string): ValidationResult {
  const trimmed = (email || "").trim().toLowerCase();
  if (!trimmed) {
    return { isValid: false, message: "Vui lòng nhập email quản trị viên." };
  }

  // Phân theo Cấp 3: CTV Sinh viên
  if (roleCode === "ADMIN_LEVEL_3") {
    if (!trimmed.endsWith("@vanlanguni.vn")) {
      return {
        isValid: false,
        message: "Vui lòng nhập đúng định dạng: Email CTV Cấp 3 phải có đuôi @vanlanguni.vn (Ví dụ: ha.221a01001@vanlanguni.vn).",
      };
    }
    // Cấu trúc ten.mssv@vanlanguni.vn (có dấu chấm phân cách tên và mã sinh viên)
    const ctvRegex = /^[a-z0-9]+\.[a-z0-9]+@vanlanguni\.vn$/i;
    if (!ctvRegex.test(trimmed)) {
      return {
        isValid: false,
        message: "Vui lòng nhập đúng định dạng: Cấu trúc email CTV Cấp 3 phải là ten.mssv@vanlanguni.vn (Ví dụ: ha.221a01001@vanlanguni.vn).",
      };
    }
    return { isValid: true, message: "" };
  }

  // Phân theo Cấp 1 (SUPER_ADMIN) và Cấp 2 (ADMIN_LEVEL_2)
  if (roleCode === "SUPER_ADMIN" || roleCode === "ADMIN_LEVEL_2") {
    if (!trimmed.endsWith("@vlu.edu.vn")) {
      return {
        isValid: false,
        message: "Vui lòng nhập đúng định dạng: Email QTV phải có đuôi @vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn).",
      };
    }
    // Cấu trúc ten.holot@vlu.edu.vn
    const staffRegex = /^[a-z0-9]+(\.[a-z0-9]+)+@vlu\.edu\.vn$/i;
    if (!staffRegex.test(trimmed)) {
      return {
        isValid: false,
        message: "Vui lòng nhập đúng định dạng: Cấu trúc email QTV phải là ten.holot@vlu.edu.vn (Ví dụ: ha.nt@vlu.edu.vn).",
      };
    }
    return { isValid: true, message: "" };
  }

  // Mặc định kiểm tra email chung nếu chưa xác định role
  return validateGeneralEmail(trimmed);
}

/**
 * Kiểm tra tiêu chí mật khẩu chi tiết (để phục vụ checklist thời gian thực)
 * - Tối thiểu 8 ký tự
 * - Bao gồm chữ cái
 * - Bao gồm chữ số
 * - Bao gồm ký tự đặc biệt
 */
export function checkPasswordCriteria(password: string): PasswordCriteria {
  const p = password || "";
  const hasMinLength = p.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(p);
  const hasNumber = /[0-9]/.test(p);
  const hasSpecial = /[^a-zA-Z0-9\s]/.test(p);
  const isValid = hasMinLength && hasLetter && hasNumber && hasSpecial;

  return {
    hasMinLength,
    hasLetter,
    hasNumber,
    hasSpecial,
    isValid,
  };
}

export function validatePassword(password: string): ValidationResult {
  const criteria = checkPasswordCriteria(password);
  if (!criteria.isValid) {
    return {
      isValid: false,
      message: "Vui lòng nhập đúng định dạng: Mật khẩu gồm 8 ký tự trở lên bao gồm chữ cái, chữ số và ký tự đặc biệt.",
    };
  }
  return { isValid: true, message: "" };
}

export function validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword) {
    return { isValid: false, message: "Vui lòng nhập lại mật khẩu xác nhận." };
  }
  if (password !== confirmPassword) {
    return { isValid: false, message: "Mật khẩu xác nhận không khớp với mật khẩu đã nhập." };
  }
  return { isValid: true, message: "" };
}
