import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const anchors: Record<string, string> = {
    "cum-nghien-cuu": "fields",
    "du-an": "du-an",
    "cong-bo": "cong-bo",
    "doi-moi-sang-tao": "goals",
    "hop-tac-doanh-nghiep": "hop-tac-doanh-nghiep",
    "doi-tac": "strategic-partners-title",
  };
  redirect(await localizedRedirectPath(anchors[slug] ? `/research#${anchors[slug]}` : "/research"));
}
