import { ProgrammesLanding } from "@/features/programmes/components/ProgrammesPage";
import { sectionMetadata } from "@/features/content/components/SectionPages";

// PAGE LỚN: Route /programmes kết nối metadata với landing component chuyên biệt.
export const metadata = sectionMetadata("programmes");
export default function ProgrammesPage() {
  return <ProgrammesLanding />;
}
