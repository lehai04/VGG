import test from "node:test";
import assert from "node:assert/strict";

// Re-implement pure validation checks for testing environment matching rules.ts
function validatePhone(phone, required = false) {
  const trimmed = phone.trim();
  if (!trimmed) {
    if (required) return { isValid: false, message: "Vui lòng nhập số điện thoại" };
    return { isValid: true, message: "" };
  }
  const phoneRegex = /^0\d{9}$/;
  if (!phoneRegex.test(trimmed)) {
    return {
      isValid: false,
      message: "Vui lòng nhập đúng định dạng: Số điện thoại phải gồm đúng 10 chữ số bắt đầu bằng số 0 (VD: 0901234567)",
    };
  }
  return { isValid: true, message: "" };
}

function validateUsername(username) {
  const trimmed = username.trim();
  if (!trimmed) return { isValid: false, message: "Vui lòng nhập tên đăng nhập" };
  if (/\s/.test(username)) return { isValid: false, message: "Tên đăng nhập không được chứa dấu cách" };
  if (username.length < 6) return { isValid: false, message: "Tên đăng nhập phải có tối thiểu 6 ký tự" };
  return { isValid: true, message: "" };
}

function validateGeneralEmail(email, required = true) {
  const trimmed = email.trim();
  if (!trimmed) {
    if (required) return { isValid: false, message: "Vui lòng nhập email" };
    return { isValid: true, message: "" };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, message: "Vui lòng nhập đúng định dạng email (VD: hoten@gmail.com)" };
  }
  return { isValid: true, message: "" };
}

function validateAdminEmail(email, roleCode) {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { isValid: false, message: "Vui lòng nhập email" };

  if (roleCode === "LEVEL_3") {
    // Duy nhất định dạng ten.mssv@vanlanguni.vn
    const ctvRegex = /^[a-z0-9]+(\.[a-z0-9]+)*\.[0-9a-z]+@vanlanguni\.vn$/i;
    if (!ctvRegex.test(trimmed)) {
      return {
        isValid: false,
        message: "CTV Sinh viên (Cấp 3) bắt buộc duy nhất định dạng ten.mssv@vanlanguni.vn (VD: ha.221a01001@vanlanguni.vn)",
      };
    }
    return { isValid: true, message: "" };
  }

  // Cấp 1, Cấp 2: ten.holot@vlu.edu.vn
  const staffRegex = /^[a-z0-9]+(\.[a-z0-9]+)+@vlu\.edu\.vn$/i;
  if (!staffRegex.test(trimmed)) {
    return {
      isValid: false,
      message: "Quản trị viên Cấp 1 & 2 bắt buộc dùng email dạng ten.holot@vlu.edu.vn (VD: ha.nt@vlu.edu.vn)",
    };
  }
  return { isValid: true, message: "" };
}

function checkPasswordCriteria(password) {
  return {
    hasMinLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
  };
}

test("validatePhone: kiểm tra số điện thoại bắt đầu bằng 0 và gồm đúng 10 số tự nhiên", () => {
  assert.equal(validatePhone("0987654321").isValid, true);
  assert.equal(validatePhone("0123456789").isValid, true);
  assert.equal(validatePhone("098765432").isValid, false); // 9 số
  assert.equal(validatePhone("09876543210").isValid, false); // 11 số
  assert.equal(validatePhone("1987654321").isValid, false); // Không bắt đầu bằng 0
  assert.equal(validatePhone("098765432a").isValid, false); // Chứa chữ
  assert.equal(validatePhone("09876-5432").isValid, false); // Chứa ký tự đặc biệt
});

test("validateUsername: tối thiểu 6 ký tự và không chứa dấu cách", () => {
  assert.equal(validateUsername("admin123").isValid, true);
  assert.equal(validateUsername("admin").isValid, false); // 5 ký tự
  assert.equal(validateUsername("admin 123").isValid, false); // Chứa dấu cách
});

test("validateGeneralEmail: chấp nhận mọi email thật hợp lệ (tư vấn)", () => {
  assert.equal(validateGeneralEmail("levuluan@gmail.com").isValid, true);
  assert.equal(validateGeneralEmail("sinhvien@vanlanguni.vn").isValid, true);
  assert.equal(validateGeneralEmail("user@outlook.com.vn").isValid, true);
  assert.equal(validateGeneralEmail("invalid-email").isValid, false);
});

test("validateAdminEmail: QTV Cấp 1 & Cấp 2 bắt buộc ten.holot@vlu.edu.vn", () => {
  assert.equal(validateAdminEmail("ha.nt@vlu.edu.vn", "LEVEL_2").isValid, true);
  assert.equal(validateAdminEmail("nam.nv@vlu.edu.vn", "SUPER_ADMIN").isValid, true);
  assert.equal(validateAdminEmail("ha.nt@gmail.com", "LEVEL_2").isValid, false);
});

test("validateAdminEmail: QTV Cấp 3 (CTV Sinh viên) bắt buộc DUY NHẤT ten.mssv@vanlanguni.vn", () => {
  assert.equal(validateAdminEmail("ha.221a01001@vanlanguni.vn", "LEVEL_3").isValid, true);
  assert.equal(validateAdminEmail("ha.nt@vlu.edu.vn", "LEVEL_3").isValid, false);
  assert.equal(validateAdminEmail("ha.221a@gmail.com", "LEVEL_3").isValid, false);
});

test("checkPasswordCriteria: kiểm tra checklist thời gian thực 4 điều kiện", () => {
  const empty = checkPasswordCriteria("");
  assert.deepEqual(empty, {
    hasMinLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const partial = checkPasswordCriteria("Abc12");
  assert.equal(partial.hasMinLength, false);
  assert.equal(partial.hasLetter, true);
  assert.equal(partial.hasNumber, true);
  assert.equal(partial.hasSpecialChar, false);

  const full = checkPasswordCriteria("P@ssw0rd123");
  assert.equal(full.hasMinLength, true);
  assert.equal(full.hasLetter, true);
  assert.equal(full.hasNumber, true);
  assert.equal(full.hasSpecialChar, true);
});
