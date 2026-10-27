"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cmsFieldLabel } from "../cms/WebsiteManager";
import { VisualImagePicker } from "../cms/VisualImagePicker";
import { SeoEditor } from "../cms/SeoEditor";
import { VersionHistory } from "../cms/VersionHistory";
import { VisualCollectionEditor } from "../cms/VisualCollectionEditor";
import { NewProgramme } from "./NewProgramme";
import { PublicationSchedule } from "./PublicationSchedule";
import styles from "./ContentWorkspace.module.css";

export type ContentPage = { id: string; title: string; path: string; locales: string[]; kind: string };
type Field = { path: string; value: string; type: "text" | "url" | "image"; section: string };
type Section = { id: string; title: string; fields: string[] };
type Workflow = { revision: string; status: "IN_REVIEW" | "APPROVED" | "CHANGES_REQUESTED"; comment: string };
type Document = { page: ContentPage & { fields: Field[]; sections: Section[]; publicOrigin: string; defaults: Record<string, unknown> }; values: Record<string,string>; revision: string | null; publishedAt: string | null; presentationConflict: boolean; workflow: Workflow | null };
type Rows = Record<string, string>[];
const programmeLists: Record<string, string> = { highlights: "pageContent.section02.highlights", audience: "pageContent.section03.audience", careers: "pageContent.section04.careers", faq: "pageContent.faq.faqs", curriculum: "cmsCurriculum" };

async function request<T>(path: string, method = "GET", body?: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/cms/website/${path}`, { method, cache: "no-store", signal, headers: body ? { "content-type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) throw Error(result?.message || "Không kết nối được máy chủ. Nội dung đang nhập vẫn được giữ lại.");
  return result.data as T;
}

export function ContentWorkspace({ pages, canEdit, canPublish, canViewMedia, canUpload }: { pages: ContentPage[]; canEdit: boolean; canPublish: boolean; canViewMedia: boolean; canUpload: boolean }) {
  const [selected, setSelected] = useState<ContentPage | null>(null);
  const [addedPages, setAddedPages] = useState<ContentPage[]>([]);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const list = [...pages, ...addedPages.filter(added => !pages.some(page => page.id === added.id))].filter(page => (kind === "all" || (kind === "programme" ? page.id.startsWith("programme:") : !page.id.startsWith("programme:"))) && `${page.title} ${page.path}`.toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi")));
  return <div className={styles.root}>
    {!selected ? <>
      <header><span className={styles.eyebrow}>VGG CONTENT WORKSPACE</span><h1>Nội dung theo website</h1><p>Chọn trang hoặc chuyên ngành. Chỉnh nội dung trong cấu trúc đang có, không thay layout.</p></header>
      {canEdit && <NewProgramme canViewMedia={canViewMedia} canUpload={canUpload} onCreated={async id => { const created = await request<Document>(`page?id=${encodeURIComponent(id)}&locale=vi`); setAddedPages(previous => [...previous.filter(page => page.id !== id), created.page]); setSelected(created.page); }} />}
      <div className={styles.filters}><label>Tìm nội dung<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Tên trang, chuyên ngành hoặc đường dẫn" type="search" /></label><label>Nhóm nội dung<select value={kind} onChange={event => setKind(event.target.value)}><option value="all">Tất cả</option><option value="page">Trang và nội dung dùng chung</option><option value="programme">Chuyên ngành</option></select></label></div>
      <p>{list.length} mục</p><div className={styles.grid}>{list.map(page => <button className={styles.card} key={page.id} onClick={() => setSelected(page)}><small>{page.id.startsWith("programme:") ? "CHUYÊN NGÀNH" : "NỘI DUNG WEBSITE"}</small><h2>{page.title}</h2><p>{page.path}</p><span>Biên tập nội dung →</span></button>)}</div>{!list.length && <p role="status">Không có nội dung phù hợp.</p>}
    </> : <ContentEditor key={selected.id} page={selected} canEdit={canEdit} canPublish={canPublish} canViewMedia={canViewMedia} canUpload={canUpload} onBack={() => setSelected(null)} />}
  </div>;
}

function ContentEditor({ page, canEdit, canPublish, canViewMedia, canUpload, onBack }: { page: ContentPage; canEdit: boolean; canPublish: boolean; canViewMedia: boolean; canUpload: boolean; onBack: () => void }) {
  const [locale, setLocale] = useState(page.locales[0] ?? "vi");
  const [doc, setDoc] = useState<Document | null>(null);
  const [changes, setChanges] = useState<Record<string,string>>({});
  const [collections, setCollections] = useState<Record<string, Rows>>({});
  const [active, setActive] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [autoSave, setAutoSave] = useState(false);
  const [retry, setRetry] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const inFlight = useRef(false);
  const [reviewComment, setReviewComment] = useState("");
  const [seoDirty, setSeoDirty] = useState(false);
  const contentDirty = Object.keys(changes).length > 0 || Object.keys(collections).length > 0;
  const dirty = contentDirty || seoDirty;
  const reviewStatus = doc?.workflow?.revision === doc?.revision ? doc?.workflow?.status : undefined;
  useEffect(() => {
    const controller = new AbortController();
    request<Document>(`page?id=${encodeURIComponent(page.id)}&locale=${locale}`, "GET", undefined, controller.signal).then(value => { setDoc(value); setChanges({}); setError(""); }).catch(reason => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "Không tải được trang."); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [page.id, locale, retry]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    const guard = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest?.("a[href]");
      if (link && !window.confirm("Có thay đổi chưa lưu. Rời trang và bỏ các thay đổi này?")) { event.preventDefault(); event.stopPropagation(); }
    };
    window.addEventListener("beforeunload", warn); document.addEventListener("click", guard, true);
    return () => { window.removeEventListener("beforeunload", warn); document.removeEventListener("click", guard, true); };
  }, [dirty]);
  const save = useCallback(async () => {
    if (!doc || !canEdit || inFlight.current) return;
    inFlight.current = true; setBusy(true); setError("");
    try {
      await request<{revision:string}>("content", "PUT", { id: page.id, locale, revision: doc.revision, changes, collections });
      const fresh = await request<Document>(`page?id=${encodeURIComponent(page.id)}&locale=${locale}`);
      setDoc(fresh); setChanges({}); setCollections({}); setPreviewUrl("");
      setNotice(`Đã lưu nháp lúc ${new Date().toLocaleTimeString("vi-VN")}. Website công khai chưa thay đổi.`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Không lưu được."); setAutoSave(false); }
    finally { inFlight.current = false; setBusy(false); }
  }, [doc, canEdit, changes, collections, page.id, locale]);
  useEffect(() => {
    if (!autoSave || !contentDirty || busy || error) return;
    const timer = window.setTimeout(() => { void save(); }, 1800);
    return () => window.clearTimeout(timer);
  }, [autoSave, contentDirty, busy, error, save]);
  const groups = doc ? groupsFor(doc) : [];
  const current = groups.find(group => group.id === active) ?? groups[0];
  const collectionPath = doc && current && page.id.startsWith("programme:") ? programmeLists[current.id] : undefined;
  const editableList = collectionPath && doc && (collectionPath !== "cmsCurriculum" || Object.hasOwn(doc.page.defaults, "cmsCurriculum") || doc.values["$list:cmsCurriculum"]) ? collectionPath : undefined;
  function reload() {
    if (busy || (dirty && !window.confirm("Tải lại sẽ bỏ nội dung chưa lưu. Bạn đã sao chép phần cần giữ?"))) return;
    setLoading(true); setSeoDirty(false); setDoc(null); setChanges({}); setCollections({}); setPreviewUrl(""); setError(""); setRetry(value => value + 1);
  }
  async function preview() {
    if (!doc?.revision || dirty || inFlight.current) return;
    inFlight.current = true; setBusy(true); setError("");
    try { setPreviewUrl((await request<{url:string}>("preview", "POST", { id: page.id, locale })).url); }
    catch (reason) { setError((reason as Error).message); }
    finally { inFlight.current = false; setBusy(false); }
  }
  async function review(action: "submit" | "approve" | "request-changes") {
    if (!doc?.revision || dirty || inFlight.current) return;
    inFlight.current = true; setBusy(true); setError("");
    try {
      const result = await request<{workflow: Workflow}>("workflow", "POST", { id: page.id, locale, revision: doc.revision, action, comment: reviewComment });
      setDoc({ ...doc, workflow: result.workflow }); setReviewComment(""); setNotice("Đã cập nhật trạng thái duyệt cho phiên bản hiện tại.");
    } catch (reason) { setError((reason as Error).message); }
    finally { inFlight.current = false; setBusy(false); }
  }
  async function publish() {
    if (!doc?.revision || dirty || inFlight.current || doc.presentationConflict || !canPublish || reviewStatus !== "APPROVED") return;
    if (!window.confirm(`Xuất bản bản nháp “${page.title}” (${locale.toUpperCase()}) lên website?`)) return;
    inFlight.current = true; setBusy(true); setError("");
    try { await request("publish", "POST", { id: page.id, locale, revision: doc.revision, preservePresentation: true }); setDoc({ ...doc, publishedAt: new Date().toISOString() }); setNotice("Đã xuất bản nội dung. Cấu trúc và thiết lập banner được giữ nguyên."); }
    catch (reason) { setError((reason as Error).message); }
    finally { inFlight.current = false; setBusy(false); }
  }
  return <>
    <button className={styles.back} disabled={busy} onClick={() => { if (!dirty || window.confirm("Bỏ nội dung chưa lưu để quay lại danh sách?")) onBack(); }}>← Danh sách nội dung</button>
    <header><span className={styles.eyebrow}>BIÊN TẬP TRONG BỐ CỤC CỐ ĐỊNH</span><h1>{page.title}</h1><p>{page.path} · {doc?.publishedAt ? `Đã xuất bản: ${new Date(doc.publishedAt).toLocaleString("vi-VN")}` : "Chưa có bản xuất bản qua CMS hoặc đang dùng nội dung nguồn."}</p></header>
    <div className={styles.toolbar}><label>Ngôn ngữ<select disabled={busy || loading} value={locale} onChange={event => { if (dirty && !window.confirm("Bỏ nội dung chưa lưu để đổi ngôn ngữ?")) return; setLoading(true); setSeoDirty(false); setDoc(null); setChanges({}); setCollections({}); setActive(""); setError(""); setNotice(""); setPreviewUrl(""); setLocale(event.target.value); }}>{page.locales.map(value => <option key={value} value={value}>{value === "vi" ? "Tiếng Việt" : "English"}</option>)}</select></label><span>{busy ? "Đang xử lý…" : dirty ? "Có thay đổi chưa lưu" : "Không có thay đổi chưa lưu"}</span><button disabled={busy || loading} onClick={reload}>Tải lại</button><button disabled={!canEdit || busy || !doc || (!contentDirty && !!doc.revision)} onClick={() => void save()}>Lưu nháp</button><button disabled={busy || dirty || !doc?.revision} onClick={() => void preview()}>Tạo liên kết xem trước</button><button className={styles.primary} disabled={!canPublish || busy || dirty || !doc?.revision || doc.presentationConflict || reviewStatus !== "APPROVED"} onClick={() => void publish()}>Xuất bản</button></div>
    {doc && <section className={styles.review} aria-label="Duyệt nội dung"><h2>Trạng thái biên tập</h2><p>{reviewStatus === "APPROVED" ? "Đã duyệt phiên bản hiện tại" : reviewStatus === "IN_REVIEW" ? "Đang chờ duyệt" : reviewStatus === "CHANGES_REQUESTED" ? "Cần chỉnh sửa" : "Bản nháp chưa gửi duyệt"}</p>{doc.workflow?.comment && doc.workflow.revision === doc.revision && <p>Ý kiến: {doc.workflow.comment}</p>}<div className={styles.reviewActions}>{canEdit && <button disabled={busy || dirty || !doc.revision || reviewStatus === "IN_REVIEW" || reviewStatus === "APPROVED"} onClick={() => void review("submit")}>Gửi duyệt</button>}{canPublish && reviewStatus === "IN_REVIEW" && <><label>Ý kiến duyệt<textarea value={reviewComment} disabled={busy} onChange={event => setReviewComment(event.target.value)} maxLength={2000} /></label><button disabled={busy || dirty} onClick={() => void review("approve")}>Duyệt phiên bản này</button><button disabled={busy || dirty || !reviewComment.trim()} onClick={() => void review("request-changes")}>Yêu cầu chỉnh sửa</button></>}</div><small>Sửa và lưu nội dung tạo phiên bản mới cần duyệt lại. SEO được lưu và áp dụng riêng ở phần bên dưới.</small></section>}
    {doc && <PublicationSchedule key={`${page.id}:${locale}:${doc.publishedAt}`} id={page.id} locale={locale} revision={doc.revision} enabled={!dirty && reviewStatus === "APPROVED" && !doc.presentationConflict} busy={busy} canPublish={canPublish} onBusyChange={setBusy} />}
    {canEdit && <label className={styles.check}><input type="checkbox" checked={autoSave} disabled={loading || busy} onChange={event => setAutoSave(event.target.checked)} />Tự lưu bản nháp sau khi ngừng nhập</label>}
    {error && <p role="alert" className={styles.error}>{error}</p>}{notice && <p role="status" className={styles.notice}>{notice}</p>}
    {doc?.presentationConflict && <p role="alert" className={styles.error}>Bản nháp cũ có thay đổi cấu trúc hoặc banner so với bản công khai. Có thể sửa và lưu nội dung; xuất bản bị khóa để tránh đổi layout ngoài ý muốn.</p>}
    {previewUrl && <p className={styles.notice}><a href={previewUrl} target="_blank" rel="noopener noreferrer">Mở bản xem trước trên website thực tế ↗</a> · Liên kết có thời hạn 10 phút.</p>}
    {loading ? <p role="status">Đang tải nội dung từ backend…</p> : doc && <div className={styles.editor}><nav className={styles.sections} aria-label="Các mục nội dung">{groups.map((group,index) => <button key={group.id} aria-pressed={current?.id === group.id} onClick={() => setActive(group.id)}><span>{String(index + 1).padStart(2,"0")}</span>{group.title}<small>{group.fields.length}</small></button>)}</nav><section className={styles.form}><h2>{current?.title ?? "Chưa có trường nội dung"}</h2><p className={styles.hint}>Chỉnh nội dung trong mục hiện hữu. Danh sách được quản lý trong đúng mục, không thay vị trí hoặc kiểu hiển thị các section.</p>{editableList && <VisualCollectionEditor path={editableList} items={collections[editableList] ?? collectionRows(doc, editableList)} disabled={!canEdit || busy} canUpload={canUpload} canBrowse={canViewMedia} publicOrigin={doc.page.publicOrigin} onChange={rows => { setCollections(previous => ({ ...previous, [editableList]: rows })); setChanges(previous => Object.fromEntries(Object.entries(previous).filter(([path]) => !path.startsWith(`${editableList}.`)))); setPreviewUrl(""); }} />}{current?.fields.filter(field => !editableList || !field.path.startsWith(`${editableList}.`)).map(field => {
      const value = changes[field.path] ?? doc.values[field.path] ?? field.value;
      return <div className={styles.field} key={field.path}><label htmlFor={`field-${field.path}`}><strong>{cmsFieldLabel(field.path)}</strong></label>{field.type === "text" ? <textarea id={`field-${field.path}`} rows={value.length > 180 ? 5 : 2} disabled={!canEdit || busy} value={value} onChange={event => { const value = event.target.value; setChanges(previous => { const next = { ...previous }; if (value === (doc.values[field.path] ?? field.value)) delete next[field.path]; else next[field.path] = value; return next; }); setPreviewUrl(""); }} /> : <input id={`field-${field.path}`} disabled={!canEdit || busy} value={value} onChange={event => { setChanges(previous => ({ ...previous, [field.path]: event.target.value })); setPreviewUrl(""); }} />}<small>{field.type === "image" ? "Đường dẫn ảnh; giữ nguyên khung ảnh của website." : field.type === "url" ? "Đường dẫn nội bộ, HTTPS, email hoặc điện thoại hợp lệ." : "Nội dung hiển thị trong mục hiện hữu."}</small><code>{field.path}</code>{field.type === "image" && <VisualImagePicker value={value} disabled={!canEdit || busy} canBrowse={canViewMedia} canUpload={canUpload} publicOrigin={doc.page.publicOrigin} onChange={url => { setChanges(previous => ({ ...previous, [field.path]: url })); setPreviewUrl(""); }} />}</div>})}</section></div>}
    {doc && !["shared", "messages"].includes(page.kind) && <SeoEditor key={`seo:${page.id}:${locale}:${retry}`} id={page.id} locale={locale} title={page.title} canEdit={canEdit && !busy} canPublish={canPublish && !busy && !contentDirty} onDirtyChange={setSeoDirty} />}
    {doc && <VersionHistory key={`${page.id}:${locale}:${doc.revision}`} id={page.id} locale={locale} revision={doc.revision} disabled={busy || dirty} canRestore={canEdit} onBusyChange={setBusy} onRestored={async () => { const fresh = await request<Document>(`page?id=${encodeURIComponent(page.id)}&locale=${locale}`); setDoc(fresh); setChanges({}); setPreviewUrl(""); }} />}
  </>;
}

function groupsFor(doc: Document): Array<Omit<Section, "fields"> & {fields: Field[]}> {
  const assigned = new Set<string>();
  // Keep registry-only Discover strategy out of editable content: the renderer does not show it.
  const available = doc.page.fields.filter(field => !(doc.page.id === "discover" && field.section === "strategy")).map(field => {
    if (!doc.page.id.startsWith("programme:")) return field;
    const root = field.path.split(".")[0];
    const section = ({ cmsCurriculum: "section05", cmsObjectives: "section02", cmsRequirements: "section03", cmsApplication: "cmsApplication", cmsSupport: "cmsSupport", cmsOverview: "section01" } as Record<string,string>)[root];
    return section ? { ...field, section } : field;
  });
  const sections = doc.page.sections.filter(section => !(doc.page.id === "discover" && section.id === "strategy")).map(section => doc.page.id.startsWith("programme:") ? { ...section, fields: section.fields.filter(field => field !== "general") } : section);
  if (doc.page.id.startsWith("programme:")) sections.unshift({ id: "programme-info", title: "Thông tin danh mục ngành", fields: ["general"] });
  let order: string[] = [];
  try { order = JSON.parse(doc.values.$layout ?? "{}").order ?? []; } catch { /* Preserve source section order for invalid legacy metadata. */ }
  const sorted = [...sections].sort((a,b) => { const ai = order.indexOf(a.id); const bi = order.indexOf(b.id); return (ai < 0 ? order.length + sections.indexOf(a) : ai) - (bi < 0 ? order.length + sections.indexOf(b) : bi); });
  const groups = sorted.map(section => ({ ...section, fields: available.filter(field => { if (assigned.has(field.path) || !section.fields.includes(field.section)) return false; assigned.add(field.path); return true; }) })).filter(section => section.fields.length || (doc.page.id.startsWith("programme:") && programmeLists[section.id]));
  for (const field of available.filter(field => !assigned.has(field.path))) {
    const id = `other:${field.section}`;
    const existing = groups.find(group => group.id === id);
    if (existing) existing.fields.push(field);
    else groups.push({ id, title: cmsFieldLabel(field.section), fields: [field] });
  }
  return groups;
}



function collectionRows(doc: Document, path: string): Rows {
  let source: unknown = doc.page.defaults;
  for (const key of path.split(".")) source = source && typeof source === "object" ? (source as Record<string, unknown>)[key] : undefined;
  try { if (doc.values[`$list:${path}`]) source = JSON.parse(doc.values[`$list:${path}`]); } catch { /* Preserve source on invalid legacy value. */ }
  if (!Array.isArray(source)) return [];
  return source.map((row: Record<string, string>, index) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, doc.values[`${path}.${index}.${key}`] ?? value])));
}
