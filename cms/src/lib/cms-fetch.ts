import { cmsPath } from "./cms-path";
/** Adapt restored CMS screens to the existing session and CSRF-protected proxy. */
export async function cmsFetch(input: string, init: RequestInit = {}) {
  const internal = input.startsWith("/api/cms/");
  const headers = new Headers(init.headers);
  if (internal) headers.set("x-vgg-admin", "1");
  const response = await fetch(internal ? cmsPath(input.replace("/api/cms/", "/api/admin/")) : input, {
    ...init, headers, ...(internal ? { credentials: "same-origin" as const, cache: "no-store" as const } : {}),
  });
  if (internal && response.status === 401) window.dispatchEvent(new Event("cms:expired"));
  if (internal && response.ok && init.method && init.method !== "GET") window.dispatchEvent(new Event("cms:changed"));
  return response;
}
