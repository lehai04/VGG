import { SubpageDetail, subpageMetadata } from "@/features/content/components/SubpageDetail";
import { MasterProgrammesPage } from "@/features/programmes/components/MasterProgrammesPage";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return subpageMetadata("programmes", (await params).slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "thac-si") return <MasterProgrammesPage />;
  return <SubpageDetail section="programmes" slug={slug} />;
}
