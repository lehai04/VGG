import { ResourceManager } from "@/components/cms/ResourceManager";
import { backendRequest } from "@/lib/backend-api";
export const metadata = { title: "Quản lý tài nguyên" };
type Resource = { id: string; title: string; categoryId: string; resourceType: string; documentType: string | null; documentNumber: string | null; issueDate: string | null; issuingOrganization: string | null; fileName: string; fileUrl: string; fileType: string; fileSize: number; createdAt: string; category: { id: string; name: string } };
type Category = { id: string; name: string; createdAt: string; _count: { resources: number } };

export default async function ResourcesPage() {
  const [{ resources }, { categories }] = await Promise.all([
    backendRequest<{ resources: Resource[] }>("/api/admin/resources?limit=100"),
    backendRequest<{ categories: Category[] }>("/api/admin/resource-categories"),
  ]);
  return <div className="admin-page resource-admin-page"><header className="admin-page__head"><div><span className="eyebrow">CMS / RESOURCES</span><h1>Tài nguyên</h1><p>Quản lý tài nguyên và tài liệu của website</p></div></header><ResourceManager resources={resources} categories={categories}/></div>;
}
