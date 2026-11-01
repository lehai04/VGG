import { cmsPath } from "../../lib/cms-path";
export const statuses = {
  NEW: "Mới đăng ký",
  RECEIVED: "Đã tiếp nhận",
  CONTACTING: "Đang liên hệ",
  CONSULTED: "Đã tư vấn",
  COMPLETED: "Hoàn tất",
  UNREACHABLE: "Chưa liên hệ được",
  CANCELLED: "Đã hủy",
} as const;
export type Status = keyof typeof statuses;
export type User = { id: string; fullName: string; email: string; canUpdate: boolean; canManageContent: boolean };
export type Entry = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  programme: string | null;
  status: Status;
  createdAt: string;
  updatedAt: string;
};
export type Detail = Entry & {
  message: string | null;
  interestedField: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  consultationMethod: string | null;
  sourcePage: string | null;
  sourceComponent: string | null;
  history: {
    id: string;
    action: string;
    oldStatus: Status | null;
    newStatus: Status | null;
    createdAt: string;
    metadata: { actorName?: string; note?: string } | null;
  }[];
};
export type Listing = {
  items: Entry[];
  total: number;
  newCount: number;
  page: number;
  totalPages: number;
};
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
export async function adminApi<T>(
  path: string,
  method = "GET",
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(cmsPath(`/api/admin/${path}`), {
    method,
    cache: "no-store",
    credentials: "same-origin",
    signal,
    headers: { "content-type": "application/json", "x-vgg-admin": "1" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const payload = await response.json();
  if (!response.ok)
    throw new ApiError(payload.message || "Không thể thực hiện thao tác.", response.status);
  return payload.data as T;
}
export function displayDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}
