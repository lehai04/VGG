import { SectionLanding, sectionMetadata } from "@/components/sections/SectionPages";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("resources");
export default function ResourcesPage() {
  return <SectionLanding section="resources" />;
}
