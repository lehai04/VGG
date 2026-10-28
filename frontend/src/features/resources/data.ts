import { demoResources } from "./demo-resources";

export type ResourceCategory = { id: string; name: string };
export type PublicResource = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  resourceType: string;
  documentType: string | null;
  documentNumber: string | null;
  issueDate: string | null;
  issuingOrganization: string | null;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  publishedAt: string | null;
  category: ResourceCategory;
};
export const resourceTypeLabels: Record<string, string> = {
  DIRECTIVE_DOCUMENT: "Văn bản chỉ đạo",
  EXECUTION_DOCUMENT: "Văn bản triển khai",
  BROCHURE: "Brochure",
  PDF_DOCUMENT: "Tài liệu PDF",
};
export const documentTypeLabels: Record<string, string> = {
  REGULATION: "Quy định",
  RULE: "Quy chế",
  PROCESS: "Quy trình",
  NOTICE: "Thông báo",
  GUIDELINE: "Hướng dẫn",
};
export type ResourceCatalogue = {
  resources: PublicResource[];
  categories: ResourceCategory[];
  resourceTypes: string[];
};
export async function getPublicResourceCatalogue(): Promise<ResourceCatalogue> {
  const empty: ResourceCatalogue = { resources: [], categories: [], resourceTypes: Object.keys(resourceTypeLabels) };
  // Demo works without a backend/database. Opt in to content resources explicitly.
  if (process.env.VGG_DEMO_RESOURCES === "true") return {
    resources: demoResources,
    categories: Array.from(new Map(demoResources.map((item) => [item.category.id, item.category])).values()),
    resourceTypes: Object.keys(resourceTypeLabels),
  };
  const backend = process.env.BACKEND_INTERNAL_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backend) return empty;
  try {
    const response = await fetch(`${backend}/api/public/resources`, { cache: "no-store" });
    if (!response.ok) return empty;
    const payload = (await response.json()) as { data?: Partial<ResourceCatalogue> };
    const resources = payload.data?.resources ?? [];
    return {
      resources,
      categories: payload.data?.categories ?? Array.from(new Map(resources.map((item) => [item.category.id,item.category])).values()),
      resourceTypes: payload.data?.resourceTypes ?? Object.keys(resourceTypeLabels),
    };
  } catch { return empty; }
}
export async function getPublicResources(): Promise<PublicResource[]> {
  return (await getPublicResourceCatalogue()).resources;
}
