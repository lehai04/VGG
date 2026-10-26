import { sectionMetadata } from "@/features/content/components/SectionPages";
import { ResearchLanding } from "@/features/research/components/ResearchLanding";
import {withPageSeo} from '@/lib/page-seo';

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export async function generateMetadata(){return withPageSeo(sectionMetadata('research'));}
export default function ResearchPage() {
  return <ResearchLanding />;
}
