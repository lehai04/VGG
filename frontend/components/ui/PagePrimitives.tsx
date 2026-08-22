import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import type { ReactNode } from "react";
import styles from "./PageUI.module.css";

type CommonProps = { children: ReactNode; className?: string };
const cx = (base:string, extra?:string) => extra ? `${base} ${extra}` : base;

export function PageContainer({children,className}:CommonProps){return <div className={cx(styles.container,className)}>{children}</div>}

export function PageHero({eyebrow,title,summary,image,imageAlt,signature,children,className}:{eyebrow:string;title:ReactNode;summary?:ReactNode;image?:string;imageAlt?:string;signature?:ReactNode;children?:ReactNode;className?:string}){
  return <section className={cx(styles.hero,className)}>{image&&<div className={styles.heroMedia}><Image src={image} alt={imageAlt??""} fill priority sizes="100vw"/></div>}<PageContainer className={styles.heroInner}><div className={styles.heroCopy} data-reveal><p className={styles.eyebrow}>{eyebrow}</p><h1>{title}</h1>{summary&&<div className={styles.heroSummary}>{summary}</div>}{signature&&<p className={styles.signature}>{signature}</p>}{children}</div></PageContainer></section>
}

export function SectionHeader({eyebrow,title,intro,className}:{eyebrow:string;title:ReactNode;intro?:ReactNode;className?:string}){
  return <header className={cx(styles.sectionHeader,className)} data-reveal><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2>{intro&&<div className={styles.sectionIntro}>{intro}</div>}</header>
}

export function AnimatedLink({href,children,className}:{href:string;children:ReactNode;className?:string}){
  return <Link className={cx(styles.animatedLink,className)} href={href}><span>{children}</span><b aria-hidden="true">↗</b></Link>
}

export type EditorialListItem={title:string;href:string;meta?:ReactNode};
export function EditorialList({items,label,className}:{items:readonly EditorialListItem[];label:string;className?:string}){
  return <nav className={cx(styles.editorialList,className)} aria-label={label}>{items.map((item,index)=><Link href={item.href} key={`${item.href}-${item.title}`} data-reveal><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong>{item.meta&&<small>{item.meta}</small>}<b aria-hidden="true">↗</b></Link>)}</nav>
}

export function ImageFeature({image,imageAlt,children,reverse=false,className}:{image:string;imageAlt:string;children:ReactNode;reverse?:boolean;className?:string}){
  return <section className={cx(`${styles.imageFeature} ${reverse?styles.reverse:""}`,className)}><div className={styles.featureMedia} data-reveal><Image src={image} alt={imageAlt} fill sizes="(max-width: 899px) 100vw, 55vw"/></div><div className={styles.featureCopy} data-reveal>{children}</div></section>
}

export function PageCTA({eyebrow,title,children,tone="red",className}:{eyebrow:string;title:ReactNode;children?:ReactNode;tone?:"red"|"ink";className?:string}){
  return <section className={cx(`${styles.cta} ${tone==="ink"?styles.ctaInk:styles.ctaRed}`,className)} data-reveal><PageContainer><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2>{children&&<div className={styles.ctaActions}>{children}</div>}</PageContainer></section>
}

