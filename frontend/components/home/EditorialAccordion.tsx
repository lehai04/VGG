"use client";

import Link from "next/link";
import { useState } from "react";

export type EditorialAccordionItem = {
  title: string;
  description: string;
  linkLabel?: string;
  href?: string;
};

export function EditorialAccordion({ items, label, className = "" }: {
  items: readonly EditorialAccordionItem[];
  label: string;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return <div className={`editorialAccordion ${className}`} aria-label={label}>
    {items.map((item,index) => {
      const open = openIndex === index;
      const panelId = `accordion-${label.replace(/\s+/g,"-").toLowerCase()}-${index}`;
      return <div className={open ? "editorialAccordionItem isOpen" : "editorialAccordionItem"} key={item.title}>
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? null : index)}>
          <span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong><i aria-hidden="true">{open ? "−" : "+"}</i>
        </button>
        <div className="editorialAccordionPanel" id={panelId} aria-hidden={!open}>
          <div><p>{item.description}</p>{item.href && item.linkLabel && <Link href={item.href}>{item.linkLabel} →</Link>}</div>
        </div>
      </div>;
    })}
  </div>;
}
