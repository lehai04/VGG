import { SectionLanding, sectionMetadata } from "@/features/content/components/SectionPages";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("news");
export default function NewsPage() {
  return <SectionLanding section="news" />;
}
