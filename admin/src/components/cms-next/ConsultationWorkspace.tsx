"use client";
import { useUnsavedChanges } from "./useUnsavedChanges";
import { useEffect, useState } from "react";
import styles from "./ContentWorkspace.module.css";

type Person = { id: string; fullName: string };
type FollowUp = {outcome: "UNDECIDED"|"INTERESTED"|"APPLIED"|"NOT_INTERESTED"|null;nextContactAt:string|null};
type Consultation = { followUp: FollowUp; id: string; fullName: string; email: string; phone: string; programme: string | null; status: string; assignedAdminId: string | null; assignedAdmin: Person | null; message: string | null; sourcePage: string | null; preferredDate: string | null; preferredTime: string | null; consultationMethod: string | null; updatedAt: string; createdAt: string; notes: {id: string; content: string; createdAt: string; admin: {fullName: string}}[]; history: {id: string; action: string; oldStatus: string | null; newStatus: string | null; createdAt: string; admin: {fullName: string} | null}[] };
const statuses: Record<string,string> = { NEW: "Mới", RECEIVED: "Đã tiếp nhận", CONTACTING: "Đang liên hệ", CONSULTED: "Đã tư vấn", COMPLETED: "Hoàn tất xử lý", UNREACHABLE: "Chưa liên lạc được", CANCELLED: "Đã hủy" };
async function api<T>(path: string, method = "GET", body?: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/cms/consultation-workspace${path}`, { method, cache: "no-store", signal, headers: body ? {"content-type":"application/json"} : undefined, body: body ? JSON.stringify(body) : undefined });
  const result = await response.json(); if (!response.ok || !result.success) throw Error(result.message || "Không tải được dữ liệu tư vấn."); return result.data;
}
export function ConsultationWorkspace({ canUpdate, canAssign,initialDue=false }: { canUpdate: boolean; canAssign: boolean;initialDue?:boolean }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ search: "", status: "ALL", assigned: "", page: 1,due:initialDue?"1":"" });
  const [data, setData] = useState<{consultations: Consultation[]; total: number} | null>(null);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    api<{consultations: Consultation[]; total: number}>(`?${new URLSearchParams({...filter,page:String(filter.page)})}`, "GET", undefined, controller.signal).then(result => { setData(result); setError(""); }).catch(reason => { if (!controller.signal.aborted) setError(reason.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [filter, retry]);
  if (selected) return <ConsultationDetail key={selected} id={selected} canUpdate={canUpdate} canAssign={canAssign} onBack={() => { setSelected(""); setLoading(true); setRetry(value => value + 1); }} />;
  return <div className={styles.root}><header><span className={styles.eyebrow}>VGG · TUYỂN SINH</span><h1>Yêu cầu tư vấn</h1><p>Tìm kiếm toàn bộ hồ sơ, phân công, ghi chú và theo dõi lịch sử xử lý.</p></header>
    <form className={styles.filters} onSubmit={event => { event.preventDefault(); setLoading(true); setFilter(current => ({...current,search,page:1})); }}><label>Tên, điện thoại, email hoặc ngành<input type="search" value={search} onChange={event => setSearch(event.target.value)} maxLength={190} /></label><label>Trạng thái<select value={filter.status} onChange={event => { setLoading(true); setFilter(current => ({...current,status:event.target.value,page:1})); }}><option value="ALL">Tất cả</option>{Object.entries(statuses).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>Phân công<select value={filter.assigned} onChange={event => { setLoading(true); setFilter(current => ({...current,assigned:event.target.value,page:1})); }}><option value="">Tất cả</option><option value="unassigned">Chưa phân công</option></select></label><label><input type="checkbox" checked={filter.due==="1"} onChange={event=>{setLoading(true);setFilter(current=>({...current,due:event.target.checked?"1":"",page:1}));}}/>Đến hạn liên hệ</label><button>Tìm kiếm</button></form>
    {error && <p role="alert" className={styles.error}>{error} Dữ liệu bên dưới có thể chưa cập nhật.</p>}<button disabled={loading} onClick={() => { setLoading(true); setRetry(value => value + 1); }}>Tải lại</button>
    {loading ? <p role="status">Đang tải…</p> : data && <><p>{data.total} hồ sơ · Trang {filter.page}/{Math.max(1,Math.ceil(data.total/25))}</p><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Người đăng ký</th><th>Ngành quan tâm</th><th>Trạng thái</th><th>Phụ trách</th><th>Chi tiết</th></tr></thead><tbody>{data.consultations.map(item => <tr key={item.id}><td><strong>{item.fullName}</strong><p>{item.phone} · {item.email}</p></td><td>{item.programme || "Chưa chọn"}</td><td>{statuses[item.status] || item.status}</td><td>{item.assignedAdmin?.fullName || "Chưa phân công"}</td><td><button onClick={() => setSelected(item.id)}>Mở hồ sơ</button></td></tr>)}</tbody></table></div>{!data.consultations.length && <p>Không có hồ sơ phù hợp.</p>}<div className={styles.reviewActions}><button disabled={filter.page<=1} onClick={() => { setLoading(true); setFilter(current => ({...current,page:current.page-1})); }}>Trang trước</button><button disabled={filter.page*25>=data.total} onClick={() => { setLoading(true); setFilter(current => ({...current,page:current.page+1})); }}>Trang sau</button></div></>}
  </div>;
}

function ConsultationDetail({id,canUpdate,canAssign,onBack}: {id:string;canUpdate:boolean;canAssign:boolean;onBack:()=>void}) {
  const [doc,setDoc]=useState<Consultation|null>(null);
  const [admins,setAdmins]=useState<Person[]>([]);
  const [status,setStatus]=useState("");
  const [assigned,setAssigned]=useState("");
  const [note,setNote]=useState("");
  const [followUp,setFollowUp]=useState<FollowUp>({outcome:null,nextContactAt:null});
  const [error,setError]=useState("");
  const [notice,setNotice]=useState("");
  const [busy,setBusy]=useState(false);
  const [retry,setRetry]=useState(0);
  const dirty=!!doc && (!!note.trim() || status!==doc.status || assigned!==(doc.assignedAdminId||"") || JSON.stringify(followUp)!==JSON.stringify(doc.followUp));
  useEffect(()=>{
    const controller=new AbortController();
    api<{consultation:Consultation}>(`/${id}`,"GET",undefined,controller.signal).then(({consultation})=>{setDoc(consultation);setStatus(consultation.status);setAssigned(consultation.assignedAdminId||"");setFollowUp(consultation.followUp);setNote("");setError("");}).catch(reason=>{if(!controller.signal.aborted)setError(reason.message);});
    if(canAssign) api<{admins:Person[]}>("/assignees","GET",undefined,controller.signal).then(result=>setAdmins(result.admins)).catch(reason=>{if(!controller.signal.aborted)setError(reason.message);});
    return()=>controller.abort();
  },[id,canAssign,retry]);
  useUnsavedChanges(dirty);
  async function save(){if(!doc||busy)return;setBusy(true);setError("");try{await api(`/${id}`,"PUT",{revision:doc.updatedAt,status,...(canAssign?{assignedAdminId:assigned||null}:{}),note,followUp});setNotice("Đã lưu cập nhật và lịch sử xử lý.");setRetry(value=>value+1);}catch(reason){setError((reason as Error).message);}finally{setBusy(false);}}
  return <div className={styles.root}><button disabled={busy} onClick={()=>{if(!dirty||window.confirm("Bỏ thay đổi chưa lưu để quay lại?"))onBack();}}>← Danh sách tư vấn</button><button disabled={busy} onClick={()=>{if(!dirty||window.confirm("Tải lại sẽ bỏ thay đổi chưa lưu. Bạn đã sao chép ghi chú cần giữ?"))setRetry(value=>value+1);}}>Tải lại hồ sơ</button>{error&&<p role="alert" className={styles.error}>{error}</p>}{notice&&<p role="status" className={styles.notice}>{notice}</p>}{doc&&<><header><h1>{doc.fullName}</h1><p>{doc.phone} · {doc.email}</p><p>Ngành: {doc.programme||"Chưa chọn"} · Nguồn: {doc.sourcePage||"Không ghi nhận"}</p><p>Hẹn tư vấn: {doc.preferredDate?new Date(doc.preferredDate).toLocaleDateString("vi-VN"):"Chưa chọn ngày"} {doc.preferredTime} · {doc.consultationMethod}</p><p>{doc.message||"Không có lời nhắn."}</p></header><section className={styles.review}><fieldset disabled={busy||!canUpdate}><legend>Xử lý hồ sơ</legend><label>Trạng thái<select value={status} onChange={event=>setStatus(event.target.value)}>{Object.entries(statuses).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>{canAssign&&<label>Người phụ trách<select value={assigned} onChange={event=>setAssigned(event.target.value)}><option value="">Chưa phân công</option>{assigned&&!admins.some(person=>person.id===assigned)&&<option value={assigned}>{doc.assignedAdmin?.fullName||"Tài khoản không còn hoạt động"}</option>}{admins.map(person=><option key={person.id} value={person.id}>{person.fullName}</option>)}</select></label>}<label>Kết quả tư vấn<select value={followUp.outcome||""} onChange={event=>setFollowUp(current=>({...current,outcome:(event.target.value||null) as FollowUp["outcome"]}))}><option value="">Chưa ghi nhận</option><option value="UNDECIDED">Chưa quyết định</option><option value="INTERESTED">Quan tâm chương trình</option><option value="APPLIED">Đã nộp hồ sơ</option><option value="NOT_INTERESTED">Không còn nhu cầu</option></select></label><label>Lần liên hệ tiếp theo (múi giờ trên máy)<input type="datetime-local" value={localDate(followUp.nextContactAt)} onChange={event=>setFollowUp(current=>({...current,nextContactAt:event.target.value?new Date(event.target.value).toISOString():null}))}/></label><label>Thêm ghi chú nội bộ<textarea maxLength={5000} value={note} onChange={event=>setNote(event.target.value)} /></label><button disabled={!dirty} onClick={()=>void save()}>Lưu xử lý</button></fieldset></section><section className={styles.review}><h2>Ghi chú nội bộ</h2>{doc.notes.map(item=><article key={item.id}><strong>{item.admin.fullName} · {new Date(item.createdAt).toLocaleString("vi-VN")}</strong><p style={{whiteSpace:"pre-wrap"}}>{item.content}</p></article>)}{!doc.notes.length&&<p>Chưa có ghi chú.</p>}</section><section className={styles.review}><h2>Lịch sử</h2>{doc.history.map(item=><p key={item.id}>{new Date(item.createdAt).toLocaleString("vi-VN")} · {item.admin?.fullName||"Website"} · {item.action==="created"?"Tiếp nhận yêu cầu":item.action==="workspace_updated"?"Cập nhật hồ sơ":item.action==="followup_updated"?"Cập nhật kết quả và lịch liên hệ":item.action} {item.newStatus&&`· ${statuses[item.oldStatus||""]||item.oldStatus||""} → ${statuses[item.newStatus]||item.newStatus}`}</p>)}</section></>}</div>;
}

function localDate(value:string|null){if(!value)return "";const date=new Date(value);return new Date(date.getTime()-date.getTimezoneOffset()*60000).toISOString().slice(0,16);}
