/** Server-side URL configuration. Set PUBLIC_APP_URL on the deployment. */
export function publicSiteOrigin(): string {
  const value = process.env.PUBLIC_APP_URL?.trim() || "http://localhost:3000";
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('PUBLIC_APP_URL must be an HTTP(S) origin without credentials, path, query or fragment.');
  }
  return url.origin;
}
export function siteIsIndexable(): boolean {
  return process.env.SITE_INDEXABLE !== 'false';
}
