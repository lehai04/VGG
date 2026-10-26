import { ProgrammesLanding } from "@/features/programmes/components/ProgrammesPage";
import { sectionMetadata } from "@/lib/section-metadata";
import {withPageSeo} from '@/lib/page-seo';

// PAGE LỚN: Route /programmes kết nối metadata với landing component chuyên biệt.
export async function generateMetadata(){return withPageSeo(sectionMetadata('programmes'));}
export default function ProgrammesPage() {
  return <ProgrammesLanding />;
}
