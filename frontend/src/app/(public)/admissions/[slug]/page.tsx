import { AdmissionsSubpage, admissionsSubpageMetadata } from "@/features/admissions/components/AdmissionsSubpage";
import { sectionSubpages } from "@/data/site";

export async function generateStaticParams() {
  return (sectionSubpages["admissions"] ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return admissionsSubpageMetadata((await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <AdmissionsSubpage slug={(await params).slug} />;
}
