import { sectionMetadata } from "@/components/sections/SectionPages";
import { ResearchLanding } from "@/components/sections/ResearchLanding";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("research");
export default function ResearchPage() {
  return <ResearchLanding />;
}
