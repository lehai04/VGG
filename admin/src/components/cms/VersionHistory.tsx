"use client";
import { useState } from "react";
type Version = { id: string; title: string; createdAt: string; author: { fullName: string } };
type History = { versions: Version[]; total: number; page: number; pageSize: number };
export function VersionHistory({ id, locale, revision, disabled, canRestore, onRestored, onBusyChange }: {
  id: string; locale: string; revision: string | null; disabled: boolean; canRestore: boolean;
  onRestored: () => Promise<void>;
  onBusyChange: (busy: boolean) => void;
}) {
  const [history,setHistory]=useState<History|null>(null);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  async function load(page=1) {
    setBusy(true);setMessage("");
    try {
      const response=await fetch(`/api/cms/website/history?id=${encodeURIComponent(id)}&locale=${locale}&page=${page}`,{cache:"no-store"});
      const data=await response.json();
      if(!response.ok||!data.success)throw Error(data.message||"Không tải được lịch sử.");
      setHistory(data.data as History);
    }catch(error){setMessage((error as Error).message);}finally{setBusy(false);}
  }
  async function restore(versionId:string){
    if(!window.confirm("Khôi phục phiên bản này vào bản nháp? Website chính giữ nguyên cho tới khi bạn xuất bản."))return;
    setBusy(true);onBusyChange(true);setMessage("");
    try {
      const response=await fetch("/api/cms/website/history/restore",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id,locale,revision,versionId})});
      const data=await response.json();
      if(!response.ok||!data.success)throw Error(data.message||"Không khôi phục được phiên bản.");
      await onRestored();setMessage("Đã khôi phục vào bản nháp. Hãy xem trước rồi xuất bản để áp dụng lên website.");
    }catch(error){setMessage((error as Error).message);}finally{setBusy(false);onBusyChange(false);}
  }
  return <details style={{border:"1px solid #dce4ef",borderRadius:12,padding:18,marginTop:20,background:"white"}} onToggle={event=>{if(event.currentTarget.open&&!history&&!busy)void load();}}>
    <summary style={{cursor:"pointer",fontWeight:600}}>Lịch sử xuất bản & khôi phục</summary>
    <p>Mỗi lần xuất bản lưu một snapshot nội dung CMS. Khôi phục chỉ thay bản nháp; không tự xuất bản hay khôi phục file media đã xóa.</p>
    <button type="button" disabled={busy} onClick={()=>load()}>Tải lại lịch sử</button>
    {message&&<p role="status">{message}</p>}
    {busy&&<p role="status">Đang xử lý…</p>}
    {history?.versions.map(version=><article key={version.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap",borderTop:"1px solid #e5eaf1",padding:"16px 0"}}>
      <div><strong style={{fontSize:14}}>{version.title}</strong><p style={{margin:"5px 0",fontSize:13}}>{new Date(version.createdAt).toLocaleString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh"})} · {version.author.fullName}</p></div>
      {canRestore&&<button type="button" disabled={busy||disabled} onClick={()=>restore(version.id)}>Khôi phục vào nháp</button>}
    </article>)}
    {history&&!history.total&&<p>Chưa có snapshot. Các lần xuất bản tiếp theo sẽ được ghi lại; bản công khai hiện tại được giữ làm mốc khi xuất bản lần đầu sau nâng cấp.</p>}
    {disabled&&canRestore&&<p>Lưu hoặc hủy thay đổi đang nhập trước khi khôi phục phiên bản.</p>}
    {history&&history.total>history.pageSize&&<nav aria-label="Phân trang lịch sử"><button disabled={busy||history.page<=1} onClick={()=>load(history.page-1)}>Trước</button><span> {history.page} / {Math.ceil(history.total/history.pageSize)} </span><button disabled={busy||history.page*history.pageSize>=history.total} onClick={()=>load(history.page+1)}>Sau</button></nav>}
  </details>;
}
