import { ResearchSubpage, researchSubpageMetadata } from "@/features/research/components/ResearchSubpage";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return researchSubpageMetadata((await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ResearchSubpage slug={(await params).slug} />;
}
