import { notFound } from "next/navigation";
import { isPublicSectionVisible } from "@/lib/public-sections";

export default function StudentSuccessLayout({ children }: { children: React.ReactNode }) {
  if (!isPublicSectionVisible("/student-success")) notFound();
  return children;
}
