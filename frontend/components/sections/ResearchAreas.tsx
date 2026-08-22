"use client";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import styles from "./ResearchLanding.module.css";
type Item={readonly number:string;readonly title:string;readonly description:string;readonly href:string};
export function ResearchAreas({items}:{items:readonly Item[]}){
  const [open,setOpen]=useState<number|null>(0);
  return <div className={styles.areaList}>{items.map((item,index)=>{const active=open===index;const id=`research-area-${index}`;return <article className={active?styles.areaOpen:""} key={item.title} data-reveal><button type="button" aria-expanded={active} aria-controls={id} onClick={()=>setOpen(active?null:index)}><span>{item.number}</span><strong>{item.title}</strong><ArrowUpRight /></button><div className={styles.areaPanel} id={id} aria-hidden={!active}><div><p>{item.description}</p><Link href={item.href}>Tìm hiểu thêm <ArrowUpRight /></Link></div></div></article>})}</div>;
}

