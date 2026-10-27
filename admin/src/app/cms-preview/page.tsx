import { notFound } from "next/navigation";
import { CmsPrototype } from "@/components/cms-next/CmsPrototype";
import pages from "../../../../backend/src/modules/cms/page-defaults.json";

export const metadata = { title: "Duyệt giao diện CMS mới", robots: { index: false, follow: false } };

export default function Page() {
  // A design review surface with public source content only, never a production admin.
  if (process.env.NODE_ENV === "production") notFound();
  const programmes = pages.filter((page) => page.id.startsWith("programme:"));
  const home = pages.find((page) => page.id === "home");
  return <CmsPrototype programmes={programmes.map((page) => ({ id: page.id, title: page.title, path: page.path }))}
    sourcePages={pages.filter((page) => !page.id.startsWith("programme:")).map((page) => ({ id: page.id, title: page.title, path: page.path }))}
    homeTitle={String((home?.defaults as { hero?: { title?: string } })?.hero?.title ?? "")} />;
}
