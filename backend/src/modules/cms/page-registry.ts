import source from "./page-defaults.json" with { type: "json" };
import { prisma } from "../../shared/database/prisma.js";
export type CmsPageDefinition = {
  id: string;
  path: string;
  title: string;
  kind: string;
  locales: string[];
  defaults: Record<string, unknown>;
};
export const sourcePages = source as unknown as CmsPageDefinition[];
export async function pageDefinitions() {
  const rows = await prisma.siteContent.findMany({
    where: { section: "cms-programme" },
  });
  return [
    ...sourcePages,
    ...rows.flatMap((row) => {
      const page = row.value as unknown as CmsPageDefinition;
      return page?.id?.startsWith("programme:") &&
        !sourcePages.some((p) => p.id === page.id)
        ? [page]
        : [];
    }),
  ];
}
export async function pageDefinition(id: string, locale: string) {
  return (await pageDefinitions()).find(
    (p) => p.id === id && p.locales.includes(locale),
  );
}
