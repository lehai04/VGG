"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
const glyph = (symbol: string) => function Icon({ size = 18 }: { size?: number }) { return <span aria-hidden="true" style={{ fontSize: size, lineHeight: 1 }}>{symbol}</span>; };
const FileText = glyph("≡"), ImageIcon = glyph("▧"), Eye = glyph("◉"), Save = glyph("▣"), Send = glyph("↑");
import { VisualImagePicker } from "./VisualImagePicker";
import { VisualCollectionEditor } from "./VisualCollectionEditor";
import { emptyProgrammeForm, programmeFormPayload, type ProgrammeFormValues } from "@/lib/programme-form";
import styles from "./ProgrammeCreator.module.css";

type Rows = Record<string,Record<string,string>[]>;
const tabs = [{ id: "content", label: "Nội dung", Icon: FileText }, { id: "images", label: "Hình ảnh", Icon: ImageIcon }, { id: "preview", label: "Xem trước", Icon: Eye }];
const groups = [
  ["overview", "Tổng quan chương trình", "Mô tả, ảnh minh họa và nội dung giới thiệu", "cmsOverview"],
  ["facts", "Thông tin nhanh", "Trình độ, mã ngành, thời gian, tín chỉ và hình thức học", "pageContent.facts.quickFactsDetailed"],
  ["objectives", "Mục tiêu đào tạo", "Mục tiêu chung, năng lực đầu ra", "cmsObjectives"],
  ["curriculum", "Chương trình đào tạo", "Danh sách học phần, tín chỉ và ghi chú", "cmsCurriculum"],
  ["careers", "Cơ hội nghề nghiệp", "Tên lĩnh vực, mô tả và nhóm nghề nghiệp", "pageContent.section04.careers"],
  ["admission", "Tuyển sinh", "Đối tượng và điều kiện xét tuyển", "cmsRequirements"],
  ["application", "Hồ sơ và quy trình đăng ký", "Danh sách hồ sơ và các bước đăng ký", "cmsApplication"],
  ["fees", "Học phí và chính sách hỗ trợ", "Học phí, học bổng và hỗ trợ", "cmsSupport"],
  ["faq", "Câu hỏi thường gặp", "Danh sách câu hỏi và câu trả lời", "pageContent.faq.faqs"],
  ["consultation", "Đăng ký tư vấn", "Tiêu đề và thông tin kết nối form tư vấn chung", ""],
] as const;
async function api<T>(path:string, body:unknown, method="POST"):Promise<T> {
  const response=await fetch(`/api/cms/website/${path}`,{method,headers:{"content-type":"application/json"},body:JSON.stringify(body)});
  const result=await response.json();
  if(!response.ok || !result.success) throw Error(result.message || "Không thể lưu nội dung.");
  return result.data;
}
export function ProgrammeCreator({ onCreated, disabled=false, canUpload=false, canPublish=false }: {
  onCreated:(id:string)=>void; disabled?:boolean; canUpload?:boolean; canPublish?:boolean;
}) {
  const router = useRouter();
  const [form,setForm]=useState<ProgrammeFormValues>({...emptyProgrammeForm});
  const [lists,setLists]=useState<Rows>({});
  const [tab,setTab]=useState("content");
  const [expanded,setExpanded]=useState<string[]>([]);
  const [saved,setSaved]=useState<{id:string;revision:string}|null>(null);
  const [savedState,setSavedState]=useState("");
  const [published,setPublished]=useState(false);
  const [preview,setPreview]=useState("");
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [notice,setNotice]=useState("");
  const uploadTarget=useRef<HTMLDivElement>(null);
  const fingerprint=JSON.stringify({form,lists});
  const dirty=saved ? fingerprint!==savedState : fingerprint!==JSON.stringify({form:emptyProgrammeForm,lists:{}});
  useEffect(()=>{
    if(!dirty)return;
    const warn=(event:BeforeUnloadEvent)=>event.preventDefault();
    window.addEventListener("beforeunload",warn);
    return()=>window.removeEventListener("beforeunload",warn);
  },[dirty]);
  function update(key:keyof ProgrammeFormValues,value:string){setForm(current=>({...current,[key]:value}));setPreview("");setNotice("");}
  const input=(key:keyof ProgrammeFormValues,label:string,options:{required?:boolean;placeholder?:string;type?:string}={})=><label><span>{label}{options.required && <span aria-hidden="true"> *</span>}</span><input value={form[key]} disabled={busy||disabled||(key==="id"&&!!saved)} onChange={event=>update(key,event.target.value)} type={options.type??"text"} placeholder={options.placeholder} aria-required={options.required} min={options.type==="number"?0:undefined} max={options.type==="number"?300:undefined}/></label>;
  const select=(key:keyof ProgrammeFormValues,label:string,options:string[])=><label>{label}<select value={form[key]} onChange={event=>update(key,event.target.value)}>{options.map(value=><option key={value}>{value}</option>)}</select></label>;
  async function persist(){
    if(form.title.trim().length<2 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.id) || !form.bannerImage || !form.code.trim()) {
      setTab("content");setExpanded(current=>[...new Set([...current,"facts"])]);
      throw Error("Vui lòng nhập tên chuyên ngành, slug không dấu, ảnh banner và mã ngành trong Thông tin nhanh.");
    }
    const payload=programmeFormPayload(form,lists);
    const next=saved ? await api<{revision:string}>("page",{id:saved.id,locale:"vi",revision:saved.revision,values:payload.values},"PUT").then(data=>({...data,id:saved.id})) : await api<{id:string;revision:string}>("programmes",payload);
    setSaved(next);setSavedState(fingerprint);setPublished(false);setNotice("Đã lưu bản nháp. Website chính chưa thay đổi.");return next;
  }
  async function action(kind:"save"|"preview"|"publish"){
    setBusy(true);setError("");setNotice("");
    try {
      const next=!saved||dirty ? await persist() : saved;
      if(kind==="preview"){
        const data=await api<{url:string}>("preview",{id:next.id,locale:"vi"});setPreview(data.url);setTab("preview");
      } else if(kind==="publish"){
        await api("publish",{id:next.id,locale:"vi",revision:next.revision});setPublished(true);setNotice("Đã xuất bản chuyên ngành. Website chính đã nhận nội dung đã lưu.");
      } else setNotice("Đã lưu bản nháp. Website chính chưa thay đổi.");
      router.refresh();
    }catch(reason){setError((reason as Error).message);}finally{setBusy(false);}
  }
  const collection=(path:string)=><VisualCollectionEditor path={path} items={lists[path]??[]} onChange={rows=>{setLists(current=>({...current,[path]:rows}));setPreview("");setNotice("");}} disabled={busy||disabled} canUpload={canUpload}/>;
  return <details className={styles.creator}>
    <summary className={styles.launch}>Thêm chuyên ngành mới <span>＋</span></summary>
    <div className={styles.body}>
      <header className={styles.header}><div><h2>Thêm chuyên ngành mới</h2><p>Chương trình đào tạo / Chuyên ngành / Tạo mới</p></div><span className={styles.badge}>{published&&!dirty?"Đã xuất bản":dirty?"Chưa lưu":"Bản nháp"}</span></header>
      <nav className={styles.tabs} aria-label="Các bước tạo chuyên ngành">{tabs.map(({id: key,label,Icon})=><button type="button" key={key} aria-pressed={tab===key} disabled={busy||disabled} onClick={()=>key==="preview"?action("preview"):setTab(key)}><Icon size={18}/>{label}</button>)}</nav>
      {error&&<p className={styles.error} role="alert">{error}</p>}{notice&&<p className={styles.notice} role="status">{notice}</p>}
      <fieldset disabled={busy||disabled} className={styles.fields}>
        {tab==="content"&&<>
          <section className={styles.basic}><h3>Thông tin cơ bản</h3><p>Thông tin định danh và nội dung Hero của chuyên ngành.</p>
            {input("title","Tên chuyên ngành",{required:true,placeholder:"Nhập tên chuyên ngành…"})}
            {input("id","Đường dẫn (Slug)",{required:true,placeholder:"vi-du-ten-chuyen-nganh"})}
            {saved&&<small>Slug được giữ cố định sau lần lưu đầu tiên.</small>}
            {input("heroTitle","Tiêu đề chính",{placeholder:"Để trống để dùng tên chuyên ngành"})}
            <label>Mô tả ngắn<textarea value={form.summary} onChange={event=>update("summary",event.target.value)} placeholder="Nhập thông điệp giới thiệu chuyên ngành…" rows={3}/></label>
            <div className={styles.media} ref={uploadTarget}><strong>Ảnh banner *</strong><VisualImagePicker value={form.bannerImage} onChange={value=>update("bannerImage",value)} canUpload={canUpload}/>{input("bannerImage","Đường dẫn ảnh banner",{placeholder:"Chọn ảnh trong thư viện hoặc tải lên ở trên"})}</div>
          </section>
          <section className={styles.sections}><h3>Các section nội dung</h3><p>Mỗi mục tương ứng với một phần trên trang giới thiệu chuyên ngành.</p>
            {groups.map(([id,title,description,path],index)=><details key={id} open={expanded.includes(id)} className={styles.group}>
              <summary onClick={event=>{event.preventDefault();setExpanded(current=>current.includes(id)?current.filter(value=>value!==id):[...current,id]);}}><span className={styles.number}>{String(index+1).padStart(2,"0")}</span><span><strong>{title}</strong><small>{description}</small></span><span className={styles.chevron}>{expanded.includes(id)?"−":"＋"}</span></summary>
              <div className={styles.groupBody}>
                {id==="facts"&&<div className={styles.grid}>{input("code","Mã ngành",{required:true})}{input("englishTitle","Tên tiếng Anh")}{select("degree","Trình độ",["Thạc sĩ","Tiến sĩ"])}{select("field","Nhóm ngành",["Kinh doanh & Quản lý","Kỹ thuật, Môi trường & Công nghệ","Du lịch & Khách sạn","Luật, Nhân văn & Truyền thông","Thiết kế & Mỹ thuật Ứng dụng"])}{select("orientation","Định hướng",["Ứng dụng","Nghiên cứu","Ứng dụng và nghiên cứu","Đang cập nhật"])}{input("credits","Tổng số tín chỉ",{type:"number"})}{input("duration","Thời gian đào tạo")}{input("studyMode","Hình thức đào tạo")}{input("intake","Đợt tuyển sinh")}</div>}
                {id==="fees"&&input("tuition","Học phí (chỉ nhập mức đã được xác nhận)")}
                {id==="consultation"?<>{input("consultationTitle","Tiêu đề tư vấn")}<label>Mô tả<textarea value={form.consultationBody} onChange={event=>update("consultationBody",event.target.value)}/></label><p>Dùng form tư vấn, thông tin liên hệ và API tiếp nhận chung của website; không cần nhập lại footer.</p></>:collection(path)}
                {id==="admission"&&collection("pageContent.section03.audience")}
                {id==="objectives"&&collection("pageContent.section02.highlights")}
              </div>
            </details>)}
          </section>
        </>}
        {tab==="images"&&<section className={styles.basic}><h3>Hình ảnh chuyên ngành</h3><p>PNG, JPG, WebP, AVIF · tối đa 8 MB mỗi ảnh. Ảnh banner nên có tỉ lệ ngang 16:9.</p>{[["bannerImage","Ảnh banner"],["overviewImage","Ảnh tổng quan"],["careerImage","Ảnh nền cơ hội nghề nghiệp"]].map(([key,label])=><div className={styles.media} key={key}><h4>{label}</h4><VisualImagePicker value={form[key as keyof ProgrammeFormValues]||form.bannerImage} onChange={value=>update(key as keyof ProgrammeFormValues,value)} canUpload={canUpload}/>{input(key as keyof ProgrammeFormValues,"Đường dẫn ảnh")}</div>)}</section>}
        {tab==="preview"&&<section className={styles.preview}><h3>Xem trước bằng layout website thực tế</h3><p>Xem trước lưu bản nháp riêng, không xuất bản ra website chính.</p>{preview?<iframe src={preview} title="Xem trước chuyên ngành mới"/>:<p>Chọn Xem trước để tải nội dung đã nhập.</p>}</section>}
      </fieldset>
      <footer className={styles.actions}><button type="button" disabled={busy||disabled} onClick={()=>action("save")}><Save size={17}/>Lưu nháp</button><button type="button" disabled={busy||disabled} onClick={()=>action("preview")}><Eye size={17}/>Xem trước</button>{canPublish&&<button type="button" className={styles.publish} disabled={busy||disabled} onClick={()=>action("publish")}><Send size={17}/>Xuất bản</button>}</footer>
      {saved&&<button className={styles.openEditor} disabled={busy||dirty} type="button" onClick={()=>onCreated(saved.id)}>Mở chuyên ngành đã lưu trong trình chỉnh sửa trực quan →</button>}
      <p className={styles.hint}>{busy?"Đang xử lý…":"Lưu nháp giữ nội dung riêng. Chỉ Xuất bản mới cập nhật website chính."}</p>
    </div>
  </details>;
}
