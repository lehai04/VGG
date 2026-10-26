"use client";
import { useEffect } from "react";

type Context = {
  channel: string;
  adminOrigin: string;
  fields: Array<{ path: string; value: string; type: string; section: string }>;
};

/** Installed only in an authenticated, signed CMS preview. Never changes public markup. */
export function CmsVisualBridge({ context }: { context: Context }) {
  useEffect(() => {
    const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
    const source = (value: string): string => {
      try {
        const url = new URL(value, location.origin);
        const original = url.searchParams.get("url");
        if (original) return source(original);
        return url.origin === location.origin ? url.pathname : url.href;
      } catch { return value; }
    };
    const mapped = new Map<HTMLElement, string>();
    let selected: HTMLElement | null = null;
    const style = document.createElement("style");
    style.textContent = `
      [data-cms-field] { cursor: pointer !important; }
      [data-cms-field]:hover { outline: 2px solid #2563eb !important; outline-offset: 3px; background-color: rgb(37 99 235 / 6%); }
      [data-cms-selected] { outline: 3px solid #2563eb !important; outline-offset: 3px; }
      [data-cms-field]:focus-visible { outline: 3px solid #2563eb !important; outline-offset: 3px; }
    `;
    document.head.append(style);
    const attributes = new Map<HTMLElement, string | null>();
    const scan = () => {
      for (const node of document.querySelectorAll<HTMLElement>("[data-cms-path],main h1,main h2,main h3,main h4,main h5,main p,main a,main button,main li,main span,main img")) {
        if (mapped.has(node)) continue;
        const explicit = node.getAttribute("data-cms-path");
        const image = node instanceof HTMLImageElement;
        const text = normalize(node.textContent ?? "");
        const matches = context.fields.filter(field => explicit ? field.path === explicit : image
          ? field.type === "image" && source(field.value) === source(node.currentSrc || node.src)
          : field.type === "text" && text.length > 1 && normalize(field.value) === text);
        if (matches.length !== 1) continue;
        // Prefer the complete semantic box to a nested span with the same text.
        if (!image && node.parentElement && mapped.get(node.parentElement) === matches[0].path) continue;
        mapped.set(node, matches[0].path);
        node.setAttribute("data-cms-field", matches[0].path);
        attributes.set(node, node.getAttribute("tabindex"));
        if (!node.matches("a,button,input,textarea,select")) node.tabIndex = 0;
      }
    };
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });
    const mark = (path: string) => {
      selected?.removeAttribute("data-cms-selected");
      selected = [...mapped].find(([node, value]) => value === path && node.isConnected)?.[0] ?? null;
      selected?.setAttribute("data-cms-selected", "true");
    };
    const choose = (node: HTMLElement) => {
      const path = mapped.get(node);
      if (!path) return;
      mark(path);
      window.parent.postMessage({ type: "vgg-cms-select", channel: context.channel, path }, context.adminOrigin);
    };
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const node = target?.closest<HTMLElement>("[data-cms-field]");
      if (node) { event.preventDefault(); event.stopPropagation(); choose(node); }
      else if (target?.closest("a")) {
        const link = target.closest("a") as HTMLAnchorElement;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) {
          event.preventDefault(); event.stopPropagation();
        }
      }
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { selected?.removeAttribute("data-cms-selected"); selected = null; return; }
      if (event.key !== "Enter" && event.key !== " ") return;
      const node = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-cms-field]") : null;
      if (node) { event.preventDefault(); event.stopPropagation(); choose(node); }
    };
    const submit = (event: Event) => event.preventDefault();
    const scroll = () => window.parent.postMessage({ type: "vgg-cms-scroll", channel: context.channel, y: window.scrollY }, context.adminOrigin);
    const receive = (event: MessageEvent) => {
      if (event.source !== window.parent || event.origin !== context.adminOrigin || event.data?.channel !== context.channel) return;
      if (event.data.type === "vgg-cms-restore") {
        if (Number.isFinite(event.data.y)) window.scrollTo(0, Math.max(0, event.data.y));
        if (typeof event.data.path === "string") mark(event.data.path);
      }
      if (event.data.type === "vgg-cms-highlight" && typeof event.data.path === "string") mark(event.data.path);
    };
    document.addEventListener("click", click, true);
    document.addEventListener("keydown", keyboard, true);
    document.addEventListener("submit", submit, true);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "vgg-cms-ready", channel: context.channel }, context.adminOrigin);
    return () => {
      observer.disconnect(); style.remove();
      for (const [node, previous] of attributes) {
        node.removeAttribute("data-cms-field"); node.removeAttribute("data-cms-selected");
        if (previous === null) node.removeAttribute("tabindex"); else node.setAttribute("tabindex", previous);
      }
      document.removeEventListener("click", click, true);
      document.removeEventListener("keydown", keyboard, true);
      document.removeEventListener("submit", submit, true);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("message", receive);
    };
  }, [context]);
  return null;
}
