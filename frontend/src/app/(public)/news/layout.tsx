import { notFound } from "next/navigation";
import { isPublicSectionVisible } from "@/lib/public-sections";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  if (!isPublicSectionVisible("/news")) notFound();
  return children;
}
