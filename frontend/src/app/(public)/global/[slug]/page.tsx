import { redirect } from "next/navigation";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { redirect(`/research#${(await params).slug}`); }
