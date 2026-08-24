import Link from "next/link";
import { backendRequest } from "@/lib/backend-api";

type Consultation = { id: string; fullName: string; email: string; phone: string; programme: string | null; status: string; createdAt: string };
export const metadata = { title: "Lịch tư vấn" };
export default async function ConsultationsPage() {
  let consultations: Consultation[] = []; let error = "";
  try { ({ consultations } = await backendRequest<{ consultations: Consultation[] }>("/api/admin/consultations")); }
  catch (reason) { error = reason instanceof Error ? reason.message : "Không thể tải lịch tư vấn."; }
  return <div className="admin-page"><header className="admin-page__head"><div><span className="eyebrow">ADMISSIONS / CONSULTATIONS</span><h1>Lịch tư vấn</h1></div></header>{error ? <section className="admin-card"><p className="form-message">{error}</p></section> : <section className="admin-card admin-table-wrap"><table className="admin-table"><thead><tr><th>Người đăng ký</th><th>Chương trình</th><th>Trạng thái</th><th>Ngày gửi</th></tr></thead><tbody>{consultations.map((item) => <tr key={item.id}><td><Link href={`/admin/consultations/${item.id}`}><strong>{item.fullName}</strong><small>{item.email} · {item.phone}</small></Link></td><td>{item.programme || "Chưa chọn"}</td><td><span className="status-pill">{item.status}</span></td><td>{new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(item.createdAt))}</td></tr>)}</tbody></table>{consultations.length === 0 && <p>Chưa có yêu cầu tư vấn.</p>}</section>}</div>;
}
