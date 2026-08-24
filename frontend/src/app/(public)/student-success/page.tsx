import { SectionLanding, sectionMetadata } from "@/features/content/components/SectionPages";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("student-success");
export default function StudentSuccessPage() {
  return <SectionLanding section="student-success" />;
}
