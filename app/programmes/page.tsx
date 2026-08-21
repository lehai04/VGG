import { ProgrammesLanding } from "@/components/sections/ProgrammesPage";
import { sectionMetadata } from "@/components/sections/SectionPages";

// PAGE LỚN: Route /programmes kết nối metadata với landing component chuyên biệt.
export const metadata = sectionMetadata("programmes");
export default function ProgrammesPage() {
  return <ProgrammesLanding />;
}
