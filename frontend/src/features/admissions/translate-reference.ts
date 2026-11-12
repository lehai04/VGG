// The admissions engine owns its DOM and re-renders sections when filters change.
export function translateAdmissions(root: HTMLElement, translate: (text: string) => string) {
  const translatedText = new WeakMap<Text, string>();

  function translateElement(element: Element) {
    for (const attribute of ["aria-label", "title", "placeholder", "alt"]) {
      const text = element.getAttribute(attribute);
      if (text === null) continue;
      const translated = translate(text);
      if (translated !== text) element.setAttribute(attribute, translated);
    }
    if (element instanceof HTMLAnchorElement) {
      const href = element.getAttribute("href");
      if (href && /^\/vi(?:\/|[?#]|$)/.test(href)) {
        element.setAttribute("href", `/en${href.slice(3)}`);
      }
    }
  }

  function translateText(node: Text) {
    const parent = node.parentElement;
    if (!parent || parent.closest("script, style, textarea, [translate=no]")) return;
    if (translatedText.get(node) === node.data) return;
    const source = node.data.trim();
    if (!source) return;
    const translated = translate(source);
    if (translated === source) return;
    if (parent instanceof HTMLOptionElement) {
      if (!parent.hasAttribute("value")) parent.value = parent.value;
      parent.dataset.vggSourceLabel = source;
    }
    const localized = node.data.replace(source, () => translated);
    translatedText.set(node, localized);
    node.data = localized;
  }

  function translateTree(node: Node) {
    if (node instanceof Text) {
      translateText(node);
      return;
    }
    if (!(node instanceof Element)) return;
    translateElement(node);
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    for (let child = walker.nextNode(); child; child = walker.nextNode()) {
      if (child instanceof Text) translateText(child);
      if (child instanceof Element) translateElement(child);
    }
  }

  translateTree(root);
  const observer = new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "characterData") translateTree(change.target);
      for (const node of change.addedNodes) translateTree(node);
    }
  });
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  return () => observer.disconnect();
}
