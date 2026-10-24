import { redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const anchors = ["ho-tro-hoc-vien", "phat-trien-su-nghiep", "tai-nguyen-hoc-tap", "cuu-hoc-vien"];
  redirect(await localizedRedirectPath(anchors.includes(slug) ? `/student-success#${slug}` : "/student-success"));
}
