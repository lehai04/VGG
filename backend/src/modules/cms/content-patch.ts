export type ContentPatch = Record<string, string>;
const locked =
  /^(id|code|slug|icon|type|kind|degree|field|orientation|orientations|target|dialog|sectionNumber|bannerPosition|imagePosition|source|sourceUrl|className|variant|color|locale|locales)$/i;
export function contentFields(
  value: unknown,
  prefix = "",
  sectionOverride?: string,
): Array<{
  path: string;
  value: string;
  type: "text" | "image" | "url";
  section: string;
}> {
  if (!value || typeof value !== "object") return [];
  const programme = !prefix && Object.hasOwn(value, "pageContent");
  return Object.entries(value).flatMap(([key, child]) => {
    if (
      locked.test(key) ||
      /(?:source|sourceUrl|credit)$/i.test(key) ||
      ["__proto__", "constructor", "prototype"].includes(key)
    )
      return [];
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof child === "string") {
      const type =
        /image|banner|photo|portrait|^src|^logo$/i.test(key) &&
        !/alt|label|title|caption|credit|source/i.test(key)
          ? "image"
          : /href|url|link/i.test(key)
            ? "url"
            : "text";
      return [
        {
          path,
          value: child,
          type,
          section:
            sectionOverride ??
            (programme
              ? "general"
              : path.startsWith("pageContent.") ||
                  path.startsWith("interactive.")
                ? path.split(".")[1]
                : path.split(".")[0]),
        },
      ];
    }
    return contentFields(
      child,
      path,
      sectionOverride ??
        (programme && key !== "pageContent" ? "general" : undefined),
    );
  });
}
export function safeContentUrl(value: string) {
  if (value === "") return true;
  if (/[\\\u0000-\u001f<>"']/.test(value)) return false;
  if (
    /^\/(?!\/)/.test(value) ||
    /^#[\w-]+$/.test(value) ||
    /^(mailto:|tel:)[^\s<>]+$/i.test(value)
  )
    return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}
export function safeContentImage(value: string) {
  if (!safeContentUrl(value) || !value) return false;
  if (/^\/(images|api\/media)\//.test(value))
    return !/(?:^|\/)\.\.?([/#?]|$)|%2e|%2f|%5c/i.test(value);
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      [
        "images.unsplash.com",
        "vluwebmedia.s3.ap-southeast-1.amazonaws.com",
      ].includes(url.hostname) &&
      (url.hostname === "images.unsplash.com" || !url.search) &&
      !url.port
    );
  } catch {
    return false;
  }
}
export function applyContentPatch<T>(defaults: T, patch: ContentPatch): T {
  const result = structuredClone(defaults);
  for (const field of contentFields(result)) {
    const value = patch[field.path];
    if (
      typeof value !== "string" ||
      value.length > 20000 ||
      (field.type === "image"
        ? !safeContentImage(value)
        : field.type === "url" && !safeContentUrl(value))
    )
      continue;
    const keys = field.path.split(".");
    let target = result as Record<string, unknown>;
    for (const key of keys.slice(0, -1))
      target = target[key] as Record<string, unknown>;
    target[keys[keys.length - 1]] = value;
  }
  return result;
}
