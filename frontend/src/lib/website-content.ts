import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { programmes as sourceProgrammes } from "@/data/programmes";
import {
  parseComposition,
  bannerSchema,
  applyCollections,
} from "../../../backend/src/modules/content/visual-model";
import {
  applyContentPatch,
  type ContentPatch,
} from "../../../backend/src/modules/content/content-patch";

const readContents = cache(async () => {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-vgg-locale") === "en" ? "en" : "vi";
  const backend = process.env.BACKEND_INTERNAL_URL;
  const result: {
    locale: string;
    contents: Array<{ key: string; value: ContentPatch }>;
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
  } catch {
    /* Preserve source defaults during backend outages. */
  }
  return result;
});
export async function websiteContent<T>(id: string, defaults: T): Promise<T> {
  const data = await readContents();
  const value = data.contents.find((row) => row.key === `page.published.${data.locale}.${id}`)?.value;
  return value && typeof value === "object" && !Array.isArray(value)
    ? applyContentPatch(applyCollections(defaults, value, id), value)
    : defaults;
}
async function pagePatch(id: string) {
  const data = await readContents();
  return data.contents.find((row) => row.key === `page.published.${data.locale}.${id}`)?.value ?? {};
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
  return Promise.all(
    all.map((programme) => websiteContent(`programme:${programme.id}`, programme)),
  );
});
