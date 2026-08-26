import { redirect } from "next/navigation";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { redirect(`/student-success#${(await params).slug}`); }
