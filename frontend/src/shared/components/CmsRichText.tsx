import { createElement, type ReactNode } from "react";
import { safeContentUrl, safeContentImage } from "../../../../backend/src/modules/cms/content-patch";

const tags = new Set(["p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "a"]);
/** Render a small HTML vocabulary as escaped React nodes; never execute stored HTML. */
export function CmsRichText({ html }: { html: string }) {
  const stack: Array<{ tag: string; children: ReactNode[]; href?: string }> = [{ tag: "root", children: [] }];
  let key = 0;
  const decode = (text: string) => text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, name: string) => {
    const numeric = name.startsWith("#") ? Number.parseInt(name.slice(name[1]?.toLowerCase() === "x" ? 2 : 1), name[1]?.toLowerCase() === "x" ? 16 : 10) : 0;
    return name.startsWith("#") ? numeric > 0 && numeric <= 0x10ffff ? String.fromCodePoint(numeric) : "" : ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" }[name.toLowerCase()] ?? entity);
  });
  const close = () => {
    const node = stack.pop()!;
    stack.at(-1)!.children.push(createElement(node.tag, { key: key++, ...(node.tag === "a" && node.href ? { href: node.href } : {}) }, ...node.children));
  };
  const content = html.slice(0, 20000).replace(/<(script|style|iframe|object)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
  for (const token of content.match(/<[^>]*>|[^<]+|</g) ?? []) {
    if (!token.startsWith("<")) { stack.at(-1)!.children.push(decode(token)); continue; }
    const match = /^<\s*(\/?)\s*([a-z0-9]+)/i.exec(token);
    if (!match) continue;
    const tag = match[2].toLowerCase();
    const attribute = (name: string) => decode(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i").exec(token)?.slice(1).find((value) => value !== undefined) ?? "");
    if (tag === "img" && !match[1]) {
      const src = attribute("src");
      if (safeContentImage(src)) stack.at(-1)!.children.push(createElement("img", { key: key++, src, alt: attribute("alt"), loading: "lazy", style: { maxWidth: "100%", height: "auto" } }));
      continue;
    }
    if (!tags.has(tag)) continue;
    if (match[1]) {
      const index = stack.findLastIndex((node) => node.tag === tag);
      if (index > 0) while (stack.length > index) close();
    } else if (tag === "br") stack.at(-1)!.children.push(createElement("br", { key: key++ }));
    else if (stack.length < 40) {
      const href = attribute("href");
      stack.push({ tag, children: [], ...(tag === "a" && safeContentUrl(href) ? { href } : {}) });
    }
  }
  while (stack.length > 1) close();
  return <>{stack[0].children}</>;
}
