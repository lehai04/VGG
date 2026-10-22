import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(await localizedRedirectPath(`/research#${slug}`));
}
