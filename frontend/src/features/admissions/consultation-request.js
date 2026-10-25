/** Reuse the existing same-origin proxy; never put applicant data in a URL. */
export async function sendAdmissionConsultation(input, fetcher = globalThis.fetch) {
  const response = await fetcher("/api/consultations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok)
    throw new Error(
      "Hệ thống chưa tiếp nhận được yêu cầu. Vui lòng thử lại hoặc liên hệ Viện qua số điện thoại bên cạnh.",
    );
  return "Hệ thống đã tiếp nhận yêu cầu tư vấn của bạn.";
}
