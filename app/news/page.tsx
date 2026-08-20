import { SectionLanding, sectionMetadata } from "@/components/sections/SectionPages";
export const metadata = sectionMetadata("news");
export default function NewsPage() {
  return <SectionLanding section="news" />;
}
