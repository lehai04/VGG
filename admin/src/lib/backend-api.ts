import { cookies } from "next/headers";

/** Helper chạy phía server của admin, dùng cookie request hiện tại để gọi backend.
 * T là kiểu mong đợi của data khi biên dịch, không thay thế validation dữ liệu runtime. */
export async function backendRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) throw new Error("BACKEND_INTERNAL_URL chưa được cấu hình.");
  // Cookie được đọc từ request server, không đưa token vào JavaScript phía trình duyệt.
  const cookieHeader = (await cookies()).toString();
  // no-store luôn thắng init.cache. Các header trong init được trải sau header mặc định.
  // Không log cookieHeader hoặc payload nhạy cảm khi bổ sung chẩn đoán lỗi.
  const response = await fetch(`${backend}${path}`, { ...init, cache: "no-store", headers: { accept: "application/json", cookie: cookieHeader, ...init?.headers } });
  const payload = await response.json() as { success: boolean; data: T; message: string };
  // Kiểm tra đồng thời mã HTTP và cờ nghiệp vụ: HTTP 200 vẫn có thể báo success=false.
  if (!response.ok || !payload.success) throw new Error(payload.message || "Backend request failed.");
  return payload.data;
}

