import { SubpageDetail, subpageMetadata } from "@/components/sections/SubpageDetail";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return subpageMetadata("student-success", (await params).slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <SubpageDetail section="student-success" slug={(await params).slug} />; }
