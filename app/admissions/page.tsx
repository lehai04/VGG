import { SectionLanding, sectionMetadata } from "@/components/sections/SectionPages";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("admissions");
export default function AdmissionsPage() {
  return <SectionLanding section="admissions" />;
}
