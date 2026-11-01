/** Build-time prefix: empty for a dedicated CMS host, /cms for IT deployment. */
export function cmsPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_CMS_BASE_PATH || ""}${path}`;
}

export function cmsCookie(cookie: string): string {
  return cookie.replace(/Path=\/api\/admin(?=;|$)/i, `Path=${cmsPath("/api/admin")}`);
}
