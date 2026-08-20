import { ProgrammesLanding } from "@/components/sections/ProgrammesPage";
import { sectionMetadata } from "@/components/sections/SectionPages";
export const metadata = sectionMetadata("programmes");
export default function ProgrammesPage() {
  return <ProgrammesLanding />;
}
