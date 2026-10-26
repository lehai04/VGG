import { sectionMetadata } from "@/lib/section-metadata";
import { ResourcesLanding } from "@/features/resources/components/ResourcesLanding";
import { getPublicResourceCatalogue } from "@/features/resources/data";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("resources");
export default async function ResourcesPage() {
  const catalogue = await getPublicResourceCatalogue();
  return <ResourcesLanding {...catalogue} />;
}
