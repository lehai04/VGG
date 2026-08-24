import { cookies } from "next/headers";

export async function backendRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) throw new Error("BACKEND_INTERNAL_URL chưa được cấu hình.");
  const cookieHeader = (await cookies()).toString();
  const response = await fetch(`${backend}${path}`, { ...init, cache: "no-store", headers: { accept: "application/json", cookie: cookieHeader, ...init?.headers } });
  const payload = await response.json() as { success: boolean; data: T; message: string };
  if (!response.ok || !payload.success) throw new Error(payload.message || "Backend request failed.");
  return payload.data;
}

