import Image from 'next/image';
import Link from '@/i18n/components/LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/shared/components/layout/SiteHeader';
import { SiteFooter } from '@/shared/components/layout/SiteFooter';
import { NextStepCTA } from '@/features/content/components/NextStepCTA';
import { studentSuccessContent } from '@/data/student-success-content';
import { websiteContent,websiteLayout } from '@/lib/website-content';
import {ContentPageSections} from '@/shared/components/ContentPageSections';
import styles from './StudentSuccessPage.module.css';
export async function StudentSuccessPage() {
  const content = await websiteContent('student-success', studentSuccessContent);
  const layout=await websiteLayout('student-success');
  return <main className={styles.page} id="main-content"><SiteHeader compact/><ContentPageSections pageId="student-success" layout={layout}>
    <section data-site-banner data-content-slot="hero" className={styles.hero}><Image src={content.hero.image} alt={content.hero.alt} fill priority sizes="100vw" style={{zIndex:0}}/><div className={styles.heroShade} style={{zIndex:1}}/><div data-banner-copy className={styles.heroCopy} style={{position:'relative',zIndex:2}}><p data-banner-label>Learner journey</p><h1 data-banner-title>{content.hero.title}</h1><span data-banner-description>{content.hero.intro}</span></div></section>
    {[content.learning, content.community].map((section,index)=><section data-content-slot={index?'community':'learning'} key={index} className={`${styles.zigzag} ${index ? styles.reverse : ''}`}><figure><Image src={section.image} alt={section.alt} fill sizes="(max-width:800px) 100vw,50vw"/></figure><div><p data-section-label>{section.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, "")}</p><h2 data-section-subtitle>{section.title}</h2><span>{section.text}</span><Link href={section.href}>{section.action} <ArrowUpRight/></Link></div></section>)}
    <section data-content-slot="experience" className={styles.experience}><header><p data-section-label>{content.experience.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, "")}</p><h2 data-section-subtitle>{content.experience.title}</h2><span>{content.experience.intro}</span></header><div className={styles.cardGrid}>{content.services.map(item=><Link id={item.id} href={item.href} className={styles.card} key={item.id}><figure><Image src={item.image} alt={item.title} fill sizes="(max-width:700px) 100vw,33vw"/></figure><h3>{item.title}</h3><p>{item.text}</p><b>{content.experience.action} <ArrowUpRight/></b></Link>)}</div></section>
    <section data-content-slot="moments" className={styles.moments}><header><p data-section-label>{content.moments.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, "")}</p><h2 data-section-subtitle>{content.moments.title}</h2></header><div>{content.moments.images.map((item,index)=><figure key={index}><Image src={item.image} alt={item.alt} fill sizes="(max-width:600px) 100vw,33vw"/></figure>)}</div></section>
    </ContentPageSections><NextStepCTA/><SiteFooter/>
  </main>;
}
