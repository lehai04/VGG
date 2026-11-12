import { requestCopy } from "@/i18n/request-copy";
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
  const t = await requestCopy();
  const content = await websiteContent('student-success', studentSuccessContent);
  const layout=await websiteLayout('student-success');
  return <main className={styles.page} id="main-content"><SiteHeader compact/><ContentPageSections pageId="student-success" layout={layout}>
    <section data-site-banner data-content-slot="hero" className={styles.hero}><Image src={content.hero.image} alt={t(content.hero.alt)} fill priority sizes="100vw" style={{zIndex:0}}/><div className={styles.heroShade} style={{zIndex:1}}/><div data-banner-copy className={styles.heroCopy} style={{position:'relative',zIndex:2}}><p data-banner-label>Learner journey</p><h1 data-banner-title>{t(content.hero.title)}</h1><span data-banner-description>{t(content.hero.intro)}</span></div></section>
    {[content.learning, content.community].map((section,index)=><section data-content-slot={index?'community':'learning'} key={index} className={`${styles.zigzag} ${index ? styles.reverse : ''}`}><figure><Image src={section.image} alt={t(section.alt)} fill sizes="(max-width:800px) 100vw,50vw"/></figure><div><p data-section-label>{t(section.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, ""))}</p><h3 data-section-subtitle>{t(section.title)}</h3><span>{t(section.text)}</span><Link href={section.href}>{t(section.action)} <ArrowUpRight/></Link></div></section>)}
    <section data-content-slot="experience" className={styles.experience}><header><p data-section-label>{t(content.experience.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, ""))}</p><h3 data-section-subtitle>{t(content.experience.title)}</h3><span>{t(content.experience.intro)}</span></header><div className={styles.cardGrid}>{content.services.map(item=><article id={item.id} className={styles.card} key={item.id}><figure><Image src={item.image} alt={t(item.title)} fill sizes="(max-width:700px) 100vw,33vw"/></figure><h3>{t(item.title)}</h3><p>{t(item.text)}</p></article>)}</div></section>
    <section data-content-slot="moments" className={styles.moments}><header><p data-section-label>{t(content.moments.label.replace(/^\s*\d+\s*[·.\-–—]\s*/, ""))}</p><h3 data-section-subtitle>{t(content.moments.title)}</h3></header><div>{content.moments.images.map((item,index)=><figure key={index}><Image src={item.image} alt={t(item.alt)} fill sizes="(max-width:600px) 100vw,33vw"/></figure>)}</div></section>
    </ContentPageSections><NextStepCTA/><SiteFooter/>
  </main>;
}
