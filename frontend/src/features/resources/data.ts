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
export async function getPublicResources(): Promise<PublicResource[]> {
  const backend = process.env.BACKEND_INTERNAL_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backend) return [];
  try {
    const response = await fetch(`${backend}/api/public/resources`, { cache: "no-store" });
    if (!response.ok) return [];
    const payload = (await response.json()) as { data?: { resources?: PublicResource[] } };
    return payload.data?.resources ?? [];
  } catch {
    return [];
  }
}
