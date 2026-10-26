import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { programmes as sourceProgrammes, type Programme } from "@/data/programmes";
import {
  parseComposition,
  bannerSchema,
  applyCollections,
} from "../../../backend/src/modules/cms/visual-model";
import {
  applyContentPatch,
  type ContentPatch,
} from "../../../backend/src/modules/cms/content-patch";

const readContents = cache(async () => {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-vgg-locale") === "en" ? "en" : "vi";
  const backend = process.env.BACKEND_INTERNAL_URL;
  const result: {
    locale: string;
    contents: Array<{ key: string; value: ContentPatch }>;
    preview?: {
      id: string;
      locale: string;
      page: string;
      values: ContentPatch;
      programme?: Programme;
      editor?: {
        channel: string;
        adminOrigin: string;
        fields: Array<{ path: string; value: string; type: string; section: string }>;
      };
    };
  } = { locale, contents: [] };
  if (!backend) return result;
  try {
    const response = await fetch(`${backend}/api/public/site-content?locale=${locale}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (response.ok) {
      const rows = (await response.json()).data?.contents;
      if (Array.isArray(rows))
        result.contents = rows.filter(
          (row) => row && typeof row.key === "string" && row.value && typeof row.value === "object",
        );
    }
    const token = requestHeaders.get("x-vgg-cms-preview");
    if (token && /^[a-f0-9]{64}$/.test(token)) {
      const preview = await fetch(`${backend}/api/public/website/preview`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (preview.ok) {
        const value = (await preview.json()).data;
        const path = requestHeaders.get("x-vgg-pathname")?.replace(/^\/(vi|en)(?=\/|$)/, "") || "/";
        if (value?.locale === locale && value.page === path) result.preview = value;
      }
    }
  } catch {
    /* Preserve source defaults during backend outages. */
  }
  return result;
});
export async function websitePreviewStatus() {
  const requestHeaders = await headers();
  if (!requestHeaders.get("x-vgg-cms-preview")) return null;
  const preview = (await readContents()).preview;
  return { valid: Boolean(preview), editor: preview?.editor };
}
export async function websiteContent<T>(id: string, defaults: T): Promise<T> {
  const data = await readContents();
  const preview =
    data.preview?.id === id && data.preview.locale === data.locale
      ? data.preview.values
      : undefined;
  const value =
    preview ?? data.contents.find((row) => row.key === `cms.published.${data.locale}.${id}`)?.value;
  return value && typeof value === "object" && !Array.isArray(value)
    ? applyContentPatch(applyCollections(defaults, value, id), value)
    : defaults;
}
async function pagePatch(id: string) {
  const data = await readContents();
  return data.preview?.id === id
    ? data.preview.values
    : (data.contents.find((row) => row.key === `cms.published.${data.locale}.${id}`)?.value ?? {});
}
export async function websiteLayout(id: string) {
  return parseComposition(id, (await pagePatch(id)).$layout);
}
export async function websiteBanner(id: string) {
  try {
    return bannerSchema.parse(JSON.parse((await pagePatch(id)).$banner));
  } catch {
    return undefined;
  }
}
export const websiteProgrammes = cache(async () => {
  const data = await readContents();
  let all = [...sourceProgrammes];
  try {
    const backend = process.env.BACKEND_INTERNAL_URL;
    if (backend) {
      const response = await fetch(`${backend}/api/public/website/programmes`, {
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (response.ok) {
        const payload = (await response.json()).data;
        const hiddenIds = Array.isArray(payload?.hiddenIds) ? payload.hiddenIds : [];
        all = all.filter((programme) => !hiddenIds.includes(programme.id));
        const entries = payload?.programmes;
        if (Array.isArray(entries))
          for (const entry of entries)
            if (entry && typeof entry.id === "string" && !all.some((p) => p.id === entry.id))
              all.push(entry);
      }
    }
  } catch {
    /* Keep the source catalogue available during outages. */
  }
  const preview = data.preview?.programme;
  if (preview && !all.some((p) => p.id === preview.id)) all.push(preview);
  return Promise.all(
    all.map((programme) => websiteContent(`programme:${programme.id}`, programme)),
  );
});
