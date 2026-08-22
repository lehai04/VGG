import { SubpageDetail, subpageMetadata } from "@/components/sections/SubpageDetail";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return subpageMetadata("admissions", (await params).slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <SubpageDetail section="admissions" slug={(await params).slug} />; }
