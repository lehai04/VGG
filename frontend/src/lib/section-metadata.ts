import { findGroup } from "@/data/site";

export function sectionMetadata(section: string) {
  const group = findGroup(section);
  if (!group) return {};
  const title = group.vi;
  const description = group.intro;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" as const },
    twitter: { card: "summary" as const, title, description },
  };
}
