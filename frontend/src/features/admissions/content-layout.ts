import type { ContentComposition } from "../../../../backend/src/modules/content/visual-model";
const ids: Record<string, string> = {
  notices: "thong-bao-lich-tuyen-sinh",
  conditions: "dieu-kien-phuong-thuc",
  fees: "hoc-phi-hoc-bong",
  documents: "ho-so-du-tuyen",
  process: "quy-trinh-tuyen-sinh",
  faq: "cau-hoi-thuong-gap",
  consultation: "tu-van",
};
/** This subtree is owned by the existing HTML engine, never by React children. */
export function applyAdmissionsLayout(root: HTMLElement, layout?: ContentComposition) {
  if (!layout) return;
  const main = root.querySelector("main");
  if (!main) return;
  const nodes = new Map<string, HTMLElement>();
  const hero = main.querySelector<HTMLElement>(".hero");
  if (hero) nodes.set("hero", hero);
  for (const [key, id] of Object.entries(ids)) {
    const node = main.querySelector<HTMLElement>(`#${id}`);
    if (node) nodes.set(key, node);
  }
  const markers = [...nodes.values()].map((node) => {
    const marker = document.createComment("content-section");
    node.before(marker);
    return marker;
  });
  for (const section of layout.added) {
    const element = document.createElement("section");
    element.id = section.id;
    element.className = "section";
    const container = document.createElement("div");
    container.className = "container";
    const title = document.createElement("h2");
    title.textContent = section.title;
    const body = document.createElement("p");
    body.textContent = section.body;
    container.append(title, body);
    element.append(container);
    nodes.set(section.id, element);
  }
  const order = [...layout.order, ...nodes.keys()].filter(
    (id, index, array) => array.indexOf(id) === index,
  );
  const ordered = order.flatMap((id) => (nodes.has(id) ? [[id, nodes.get(id)!] as const] : []));
  for (const [id, node] of ordered) {
    if (layout.hidden.includes(id)) {
      node.hidden = true;
      node.style.setProperty("display", "none", "important");
    }
    node.remove();
  }
  ordered.forEach(([, node], index) => {
    const marker = markers[Math.min(index, markers.length - 1)];
    marker?.before(node);
  });
  markers.forEach((marker) => marker.remove());
}
