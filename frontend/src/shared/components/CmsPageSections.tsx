import { Children, Fragment, isValidElement, type ReactNode } from "react";
import type { CmsComposition } from "../../../../backend/src/modules/cms/visual-model";
import { cmsSections } from "../../../../backend/src/modules/cms/visual-model";
import styles from "./CmsPageSections.module.css";
import Image from "next/image";
export function CmsSlot({ children }: { slot: string; children: ReactNode }) {
  return <>{children}</>;
}
export function CmsPageSections({
  children,
  layout,
  pageId,
}: {
  children: ReactNode;
  layout?: CmsComposition;
  pageId?: string;
}) {
  if (!layout) return <>{children}</>;
  const nodes = Children.toArray(children);
  const slots = new Map<string, ReactNode>();
  const definitions = pageId ? cmsSections(pageId) : [];
  const keyOf = (node: ReactNode) => {
    if (
      !isValidElement<{
        slot?: string;
        id?: string;
        "data-cms-slot"?: string;
        "aria-labelledby"?: string;
      }>(node)
    )
      return undefined;
    return (
      node.props.slot ??
      node.props["data-cms-slot"] ??
      definitions.find((section) => section.domId === node.props.id && Boolean(section.domId))?.id
    );
  };
  for (const node of nodes) {
    const key = keyOf(node);
    if (key) slots.set(key, node);
  }
  const order = [...layout.order, ...slots.keys()].filter(
    (id, index, array) => array.indexOf(id) === index && !layout.hidden.includes(id),
  );
  const custom = new Map(layout.added.map((section) => [section.id, section]));
  const ordered = order
    .map(
      (id) =>
        slots.get(id) ??
        (custom.has(id) ? <CustomSection key={id} section={custom.get(id)!} /> : null),
    )
    .filter(Boolean);
  let index = 0;
  let last = -1;
  nodes.forEach((node, i) => {
    if (keyOf(node)) last = i;
  });
  return (
    <>
      {nodes.map((node, i) => {
        if (!keyOf(node)) return node;
        const result = i === last ? ordered.slice(index) : ordered.slice(index, index + 1);
        index++;
        return <Fragment key={isValidElement(node) ? (node.key ?? i) : i}>{result}</Fragment>;
      })}
    </>
  );
}
function CustomSection({ section }: { section: CmsComposition["added"][number] }) {
  return (
    <section id={section.id} className={styles.section}>
      <h2>{section.title}</h2>
      <p>{section.body}</p>
      {section.image && (
        <Image
          width={1440}
          height={810}
          sizes="(max-width:800px) 100vw,80vw"
          src={section.image}
          alt={section.alt ?? ""}
          className={styles.image}
        />
      )}
      {section.template === "faq" ? (
        section.items.map((item, index) => (
          <details key={index}>
            <summary>{item.title}</summary>
            <p>{item.text}</p>
          </details>
        ))
      ) : (
        <div className={styles.cards}>
          {section.items.map((item, index) => (
            <article key={index}>
              {item.image && (
                <Image
                  width={720}
                  height={480}
                  sizes="(max-width:800px) 100vw,33vw"
                  src={item.image}
                  alt={item.alt ?? ""}
                  className={styles.image}
                />
              )}
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.href && <a href={item.href}>Tìm hiểu thêm →</a>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
