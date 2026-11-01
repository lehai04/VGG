import { AdmissionsReference } from "@/features/admissions/AdmissionsReference";
import { websiteContent,websiteLayout,websiteProgrammes } from '@/lib/website-content';
import { admissionsDefaults, admissionsHtml } from '@/features/admissions/content-template';
import {programmes} from '@/data/programmes';
import {withPageSeo} from '@/lib/page-seo';
const defaultMetadata = {
  title: "Tuyển sinh sau đại học",
  description:
    "Thông tin tuyển sinh Thạc sĩ 2027 và Tiến sĩ tại Văn Lang: chương trình, điều kiện, học phí, học bổng, hồ sơ và hướng dẫn đăng ký.",
};
export async function generateMetadata(){return withPageSeo(defaultMetadata);}
export default async function AdmissionsPage({ searchParams }: { searchParams: Promise<{ programme?: string; degree?: string }> }) {
  const selection = await searchParams;
  const copy = await websiteContent('admissions', admissionsDefaults);
  return <AdmissionsReference key={`${selection.programme ?? ""}:${selection.degree ?? ""}`} html={admissionsHtml(copy)} editorial={copy.interactive} layout={await websiteLayout('admissions')} programmeOptions={(await websiteProgrammes()).map(programme=>({id:programme.id,title:programme.title,degree:programme.degree,tuition:programme.tuition,sourceTitle:programmes.find(item=>item.id===programme.id)?.title}))} />;
}
