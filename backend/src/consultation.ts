/**
 * Kiểm tra dữ liệu form tư vấn, không phụ thuộc giao diện hay framework.
 * API public, admin và worker có thể dùng chung rule validation này.
 */

export type Consultation = {
  name: string;
  phone: string;
  email: string;
  programme: string;
  consent: true;
};
export type ValidationResult =
  { success: true; data: Consultation } | { success: false; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+ ()-]{9,20}$/;

export function validateConsultation(
  value: unknown,
  allowedProgrammes: readonly string[],
): ValidationResult {
  if (!value || typeof value !== "object")
    return { success: false, message: "Dữ liệu không hợp lệ." };
  const input = value as Record<string, unknown>;
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const programme = typeof input.programme === "string" ? input.programme.trim() : "";
  // Honeypot: field `website` ẩn trên form. Bot thường điền → từ chối im lặng.
  if (typeof input.website === "string" && input.website)
    return { success: false, message: "Yêu cầu không hợp lệ." };
  if (name.length < 2 || name.length > 80)
    return { success: false, message: "Họ tên phải có từ 2 đến 80 ký tự." };
  if (!phonePattern.test(phone)) return { success: false, message: "Số điện thoại không hợp lệ." };
  if (email.length > 120 || !emailPattern.test(email))
    return { success: false, message: "Email không hợp lệ." };
  if (!allowedProgrammes.includes(programme))
    return { success: false, message: "Vui lòng chọn một chương trình hợp lệ." };
  if (input.consent !== "yes" && input.consent !== true)
    return { success: false, message: "Bạn cần đồng ý để VGG liên hệ tư vấn." };
  return { success: true, data: { name, phone, email, programme, consent: true } };
}
