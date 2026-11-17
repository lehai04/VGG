export const knowledgeSchedule = "Sáng và chiều thứ Bảy, Chủ nhật";
export const knowledgeHours = "Sáng 07:30–11:30 / Chiều 13:30–17:15";

export function formatKnowledgeTuition(amount: number, locale: "vi" | "en" = "vi") {
  const formatted = new Intl.NumberFormat(locale === "en" ? "en-GB" : "vi-VN").format(amount);
  return `${formatted} ${locale === "en" ? "VND" : "VNĐ"}`;
}

export const personalFields = [
  ["fullName", "Họ và tên", true],
  ["birthDate", "Ngày sinh (dd/mm/yyyy hoặc yyyy)", true],
  ["birthplace", "Nơi sinh", true],
  ["gender", "Giới tính", true],
  ["address", "Địa chỉ liên lạc", true],
  ["phone", "Điện thoại cá nhân", true],
  ["email", "Email", true],
  ["citizenId", "Số CCCD", true],
  ["identityIssuedDate", "Ngày cấp (dd/mm/yyyy)", true],
  ["identityIssuedAt", "Nơi cấp", true],
] as const;

export const educationFields = [
  ["university", "Trường đại học đã tốt nghiệp", true],
  ["graduateMajor", "Ngành tốt nghiệp", true],
  ["graduateYear", "Năm tốt nghiệp", true],
  ["masterProgramme", "Ngành thạc sĩ dự tuyển", true],
  ["diplomaNumber", "Số hiệu văn bằng", false],
  ["diplomaRegistry", "Số vào sổ", false],
  ["diplomaDate", "Ngày ký trên văn bằng (dd/mm/yyyy)", false],
  ["decisionNumber", "Số quyết định công nhận tốt nghiệp", false],
  ["decisionDate", "Ngày ký quyết định (dd/mm/yyyy)", false],
] as const;

export const secondEducationFields = [
  ["secondUniversity", "Trường đại học đã tốt nghiệp", false],
  ["secondMajor", "Ngành tốt nghiệp", false],
  ["secondYear", "Năm tốt nghiệp", false],
  ["secondDiplomaNumber", "Số hiệu văn bằng", false],
  ["secondDiplomaRegistry", "Số vào sổ", false],
  ["secondDiplomaDate", "Ngày ký trên văn bằng (dd/mm/yyyy)", false],
  ["secondDecisionNumber", "Số quyết định công nhận tốt nghiệp", false],
  ["secondDecisionDate", "Ngày ký quyết định (dd/mm/yyyy)", false],
] as const;

export const attachmentLabels: Record<string, string> = {
  diploma: "Văn bằng đại học thứ nhất",
  transcript: "Bảng điểm đại học thứ nhất",
  secondDiploma: "Văn bằng đại học thứ hai",
  secondTranscript: "Bảng điểm đại học thứ hai",
};
