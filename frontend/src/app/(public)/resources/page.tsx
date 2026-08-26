import { sectionMetadata } from "@/features/content/components/SectionPages";
import { ResourcesLanding } from "@/features/resources/components/ResourcesLanding";
import { getPublicResources } from "@/features/resources/data";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("resources");
export default async function ResourcesPage() {
  const resources = await getPublicResources();
  return <ResourcesLanding resources={resources} />;
}
