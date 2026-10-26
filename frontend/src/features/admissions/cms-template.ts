import template from './reference-content.json';
import inventory from './cms-copy.json';
import editorial from './editorial-content.json';
export const admissionsCopy = inventory.defaults;
export const admissionsDefaults = { ...admissionsCopy, interactive: editorial };
function escape(value: string) { return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
/** Replace only reviewed text and attribute slots; template structure stays fixed. */
export function admissionsHtml(content: typeof admissionsCopy) {
  const groups = content as Record<string, Record<string, string>>;
  const defaults = admissionsCopy as Record<string, Record<string, string>>;
  let html = template.html;
  for (const slot of [...inventory.slots].sort((a, b) => b.start - a.start)) {
    const value = groups[slot.section]?.[slot.key];
    if (typeof value !== 'string' || value === defaults[slot.section]?.[slot.key]) continue;
    html = html.slice(0, slot.start) + escape(value) + html.slice(slot.end);
  }
  return html;
}
