import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  redirect(await localizedRedirectPath(`/resources#${(await params).slug}`));
}
