import { sectionMetadata } from "@/features/content/components/SectionPages";
import { ResearchLanding } from "@/features/research/components/ResearchLanding";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("research");
export default function ResearchPage() {
  return <ResearchLanding />;
}
