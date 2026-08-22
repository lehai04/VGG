import { SubpageDetail, subpageMetadata } from "@/components/sections/SubpageDetail";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return subpageMetadata("programmes", (await params).slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <SubpageDetail section="programmes" slug={(await params).slug} />; }
