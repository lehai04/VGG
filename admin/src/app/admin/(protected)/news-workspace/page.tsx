import { requireAdmin } from "@/lib/auth/authorization";
import { NewsWorkspace } from "@/components/cms-next/NewsWorkspace";
export const metadata = {title:"Tin tức · CMS mới"};
export default async function Page(){const admin=await requireAdmin();const can=(permission:string)=>admin.role.code==="SUPER_ADMIN"||admin.permissionCodes.includes(permission);if(!can("news.view"))return <p role="alert">Bạn không có quyền xem tin tức.</p>;return <NewsWorkspace canDelete={can("news.delete")} canRestore={can("news.restore")} authorName={admin.fullName} canCreate={can("news.create")} canEdit={can("news.update")} canPublish={can("news.publish")} canViewMedia={can("media.view")} canUpload={can("media.upload")}/>;}
