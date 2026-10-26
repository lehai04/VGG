import Image from 'next/image';
import Link from '@/i18n/components/LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/shared/components/layout/SiteHeader';
import { SiteFooter } from '@/shared/components/layout/SiteFooter';
import { NextStepCTA } from '@/features/content/components/NextStepCTA';
import { RevealOnScroll } from '@/shared/components/layout/RevealOnScroll';
import { studentSuccessContent } from '@/data/student-success-content';
import { websiteContent,websiteLayout } from '@/lib/website-content';
import {CmsPageSections} from '@/shared/components/CmsPageSections';
import styles from './StudentSuccessPage.module.css';
import {withPageSeo} from '@/lib/page-seo';
export async function generateMetadata(){return withPageSeo({title:'Hành trình người học | Viện Sau Đại học',description:'Hệ sinh thái học tập, hỗ trợ và phát triển nghề nghiệp đồng hành cùng người học Viện Sau Đại học.'});}
export default async function StudentSuccessPage() {
  const content = await websiteContent('student-success', studentSuccessContent);
  const layout=await websiteLayout('student-success');
  return <main className={styles.page} id="main-content"><RevealOnScroll/><SiteHeader compact/><CmsPageSections pageId="student-success" layout={layout}>
    <section data-cms-slot="hero" className={styles.hero}><Image src={content.hero.image} alt={content.hero.alt} fill priority sizes="100vw" style={{zIndex:0}}/><div className={styles.heroShade} style={{zIndex:1}}/><div className={styles.heroCopy} style={{position:'relative',zIndex:2}}><p>{content.hero.label}</p><h1>{content.hero.title}</h1><span>{content.hero.intro}</span></div></section>
    {[content.learning, content.community].map((section,index)=><section data-cms-slot={index?'community':'learning'} key={index} className={`${styles.zigzag} ${index ? styles.reverse : ''}`}><figure><Image src={section.image} alt={section.alt} fill sizes="(max-width:800px) 100vw,50vw"/></figure><div><p>{section.label}</p><h2>{section.title}</h2><span>{section.text}</span><Link href={section.href}>{section.action} <ArrowUpRight/></Link></div></section>)}
    <section data-cms-slot="experience" className={styles.experience}><header><p>{content.experience.label}</p><h2>{content.experience.title}</h2><span>{content.experience.intro}</span></header><div className={styles.cardGrid}>{content.services.map(item=><Link id={item.id} href={item.href} className={styles.card} key={item.id}><figure><Image src={item.image} alt={item.title} fill sizes="(max-width:700px) 100vw,33vw"/></figure><h3>{item.title}</h3><p>{item.text}</p><b>{content.experience.action} <ArrowUpRight/></b></Link>)}</div></section>
    <section data-cms-slot="moments" className={styles.moments}><header><p>{content.moments.label}</p><h2>{content.moments.title}</h2></header><div>{content.moments.images.map((item,index)=><figure key={index}><Image src={item.image} alt={item.alt} fill sizes="(max-width:600px) 100vw,33vw"/></figure>)}</div></section>
    </CmsPageSections><NextStepCTA/><SiteFooter/>
  </main>;
}
