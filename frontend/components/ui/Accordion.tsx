"use client";
import Link from "@/components/i18n/LocalizedLink";
import { useId,useState } from "react";
import styles from "./PageUI.module.css";

export type AccordionItem={title:string;description:string;href?:string;linkLabel?:string};
export function Accordion({items,label,defaultOpen=null,className}:{items:readonly AccordionItem[];label:string;defaultOpen?:number|null;className?:string}){
  const [open,setOpen]=useState<number|null>(defaultOpen);const uid=useId();
  return <div className={className?`${styles.accordion} ${className}`:styles.accordion} aria-label={label}>{items.map((item,index)=>{const active=open===index;const id=`${uid}-panel-${index}`;return <article className={active?styles.accordionOpen:undefined} key={item.title}><button type="button" aria-expanded={active} aria-controls={id} onClick={()=>setOpen(active?null:index)}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong><i aria-hidden="true">{active?"−":"+"}</i></button><div className={styles.accordionPanel} id={id} aria-hidden={!active}><div><p>{item.description}</p>{item.href&&item.linkLabel&&<Link href={item.href}>{item.linkLabel} →</Link>}</div></div></article>})}</div>
}

