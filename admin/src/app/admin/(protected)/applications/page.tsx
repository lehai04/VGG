import Link from "next/link";
import { backendRequest } from "@/lib/backend-api";
import { requireAdmin } from "@/lib/auth/authorization";
type Application = { id:string; fullName:string; email:string; phone:string; programme:string|null; status:string; createdAt:string; metadata:unknown };
export const metadata = { title: "Hồ sơ đăng ký" };
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const admin=await requireAdmin();
  if(admin.role.code!=="SUPER_ADMIN"&&!admin.permissionCodes.includes("applications.view"))return <p role="alert">Bạn không có quyền xem hồ sơ đăng ký.</p>;
  const query=await searchParams;
  const search=typeof query.search==="string"?query.search.slice(0,190):"";
  const status=typeof query.status==="string"?query.status.slice(0,50):"";
  const page=Math.floor(Math.min(100000,Math.max(1,Number(query.page)||1)));
  const params=new URLSearchParams({search,status,page:String(page)});
  if(typeof query.id==="string") {
    const result=await backendRequest<{application:Application}>(`/api/admin/applications/${encodeURIComponent(query.id)}`).catch(()=>null);
    return <section className="admin-card"><Link href={`/admin/applications?${params}`}>← Danh sách đăng ký</Link>{result?<><h1>{result.application.fullName}</h1><p>{result.application.email} · {result.application.phone}</p><p>Ngành: {result.application.programme||"Chưa chọn"}</p><p>Trạng thái: {result.application.status}</p><p>Ngày gửi: {new Date(result.application.createdAt).toLocaleString("vi-VN")}</p><h2>Thông tin đã gửi</h2><pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}}>{JSON.stringify(result.application.metadata??{},null,2)}</pre></>:<p role="alert">Không tải được hồ sơ. Kiểm tra quyền, kết nối hoặc quay lại danh sách.</p>}</section>;
  }
  const data=await backendRequest<{applications:Application[];total:number;statuses:string[]}>(`/api/admin/applications?${params}`).catch(()=>null);
  return <div className="admin-page"><header className="admin-page__head"><h1>Hồ sơ đăng ký</h1></header><section className="admin-card"><form method="get"><label>Tìm tên, email, điện thoại hoặc ngành<input name="search" defaultValue={search} maxLength={190}/></label><label>Trạng thái<select name="status" defaultValue={status}><option value="">Tất cả</option>{data?.statuses.map(value=><option key={value}>{value}</option>)}</select></label><button type="submit">Tìm kiếm</button></form></section>{!data?<section className="admin-card"><p role="alert">Không tải được danh sách từ backend.</p><Link href={`/admin/applications?${params}`}>Thử lại</Link></section>:<section className="admin-card admin-table-wrap"><p>{data.total} hồ sơ · Trang {page}/{Math.max(1,Math.ceil(data.total/25))}</p><table className="admin-table"><thead><tr><th>Ứng viên</th><th>Chương trình</th><th>Trạng thái</th><th>Ngày gửi</th><th>Chi tiết</th></tr></thead><tbody>{data.applications.map(item=><tr key={item.id}><td><strong>{item.fullName}</strong><small>{item.email} · {item.phone}</small></td><td>{item.programme||"Chưa chọn"}</td><td>{item.status}</td><td>{new Date(item.createdAt).toLocaleDateString("vi-VN")}</td><td><Link href={`/admin/applications?${params}&id=${encodeURIComponent(item.id)}`}>Xem hồ sơ</Link></td></tr>)}</tbody></table>{!data.applications.length&&<p>Không có hồ sơ phù hợp.</p>}<nav aria-label="Phân trang hồ sơ">{page>1&&<Link href={`/admin/applications?${new URLSearchParams({search,status,page:String(page-1)})}`}>← Trang trước</Link>} {page*25<data.total&&<Link href={`/admin/applications?${new URLSearchParams({search,status,page:String(page+1)})}`}>Trang sau →</Link>}</nav></section>}</div>;
}
