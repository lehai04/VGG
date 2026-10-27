import { applyContentPatch, contentFields, safeContentImage, safeContentUrl } from "./content-patch.js";
import { applyCollections, collectionSchemas } from "./visual-model.js";

// Lists consumed by the existing programme renderer. No section composition is accepted.
export const programmeContentLists = ["cmsCurriculum", "pageContent.section02.highlights", "pageContent.section03.audience", "pageContent.section04.careers", "pageContent.faq.faqs"];

export function mergeContentLists(id: string, baseline: Record<string, string>, changes: Record<string, unknown>) {
  const merged = { ...baseline };
  for (const [path, rows] of Object.entries(changes)) {
    if (!id.startsWith("programme:") || !programmeContentLists.includes(path)) throw Error("CONTENT_FIELD_INVALID");
    const normalized = Array.isArray(rows) ? rows.map(row => {
      if (row && typeof row === "object" && !Array.isArray(row) && row.image === "") {
        const copy = { ...row }; delete copy.image; return copy;
      }
      return row;
    }) : rows;
    const parsed = collectionSchemas(id)[path]?.safeParse(normalized);
    if (!parsed?.success) throw Error("CONTENT_FIELD_INVALID");
    const serialized = JSON.stringify(parsed.data);
    if (serialized.length > 20000) throw Error("CONTENT_FIELD_INVALID");
    for (const field of contentFields(parsed.data)) {
      if (field.type === "image" ? !safeContentImage(field.value) : field.type === "url" && !safeContentUrl(field.value)) throw Error("CONTENT_FIELD_INVALID");
    }
    // Leaf overrides refer to old indexes; retaining them would attach old text to new rows.
    for (const key of Object.keys(merged)) if (key.startsWith(`${path}.`)) delete merged[key];
    merged[`$list:${path}`] = serialized;
  }
  if (JSON.stringify(merged).length > 1_000_000) throw Error("CONTENT_FIELD_INVALID");
  return merged;
}

/** Merge only leaf content fields. Never accept client-supplied composition or collections. */
export function mergeContentOnly(id: string, defaults: unknown, baseline: Record<string, string>, changes: Record<string, string>) {
  const fields = new Map(contentFields(applyCollections(defaults, baseline, id)).map(field => [field.path, field]));
  const merged = { ...baseline };
  for (const [path, value] of Object.entries(changes)) {
    const field = fields.get(path);
    if (path.startsWith("$") || !field || typeof value !== "string" || value.length > 20000)
      throw Error("CONTENT_FIELD_INVALID");
    if (field.type === "image" ? !safeContentImage(value) : field.type === "url" && !safeContentUrl(value))
      throw Error("CONTENT_FIELD_INVALID");
    merged[path] = value;
  }
  if (JSON.stringify(merged).length > 1_000_000) throw Error("CONTENT_FIELD_INVALID");
  const effective = applyContentPatch(applyCollections(defaults, merged, id), merged);
  for (const [path, schema] of Object.entries(collectionSchemas(id))) {
    if (!Object.keys(changes).some(key => key.startsWith(`${path}.`))) continue;
    let rows: unknown = effective;
    for (const key of path.split(".")) rows = rows && typeof rows === "object" ? (rows as Record<string, unknown>)[key] : undefined;
    if (!schema.safeParse(rows).success) throw Error("CONTENT_FIELD_INVALID");
  }
  return merged;
}

/** Existing draft layout changes must be reviewed separately, not silently published. */
export function hasPresentationChanges(draft: Record<string, string>, published: Record<string, string>) {
  return ["$layout", "$banner"].some(key => (draft[key] ?? null) !== (published[key] ?? null));
}
