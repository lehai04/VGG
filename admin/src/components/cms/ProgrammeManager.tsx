"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProgrammeCreator } from "./ProgrammeCreator";
import { WebsiteManager } from "./WebsiteManager";
import styles from "./ProgrammeManager.module.css";

export function ProgrammeManager({ pages, canEdit, canPublish, canUpload }: { pages: Parameters<typeof WebsiteManager>[0]["pages"]; canEdit: boolean; canPublish: boolean; canUpload: boolean }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  async function changeState(page: typeof pages[number], action: "hide" | "archive" | "restore") {
    const prompt = action === "restore" ? `Khôi phục “${page.title}”? Ngành nháp vẫn cần xuất bản riêng.` : `${action === "archive" ? "Chuyển vào thùng rác" : "Gỡ công khai"} “${page.title}”? Ngành sẽ biến mất khỏi website, danh mục và form tư vấn. Nội dung được giữ lại để khôi phục.`;
    if (!window.confirm(prompt)) return;
    setBusy(page.id); setMessage("");
    try {
      const response = await fetch("/api/cms/website/programmes/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: page.id, action, revision: page.stateRevision ?? null }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw Error(result.message || "Không cập nhật được trạng thái.");
      setMessage(result.message); router.refresh();
    } catch (error) { setMessage((error as Error).message); }
    finally { setBusy(""); }
  }
  const visible = pages.filter((page) => {
    const published = page.states.some((state) => state.published);
    const draft = page.states.some((state) => !state.published);
    const state = page.programmeState?.status ?? "active";
    return `${page.title} ${page.path} ${page.field ?? ""}`.toLocaleLowerCase("vi").includes(search.toLocaleLowerCase("vi")) && (status === "archived" ? state === "archived" : state !== "archived" && (status === "all" || (status === "hidden" ? state === "hidden" : state === "active" && (status === "published" ? published : draft))));
  });
  return <div className={styles.manager}>
    {canEdit && <ProgrammeCreator canUpload={canUpload} onCreated={(id) => { router.push(`/admin/programmes?id=${encodeURIComponent(id)}`); router.refresh(); }} />}
    <div className={styles.filters}><label>Tìm chuyên ngành<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tên chuyên ngành, nhóm ngành hoặc đường dẫn…" /></label><label>Trạng thái<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Tất cả (trừ thùng rác)</option><option value="draft">Có bản nháp</option><option value="published">Đã xuất bản qua CMS</option><option value="hidden">Đã ẩn</option><option value="archived">Thùng rác</option></select></label></div>
    {message && <p role="status">{message}</p>}
    <p role="status">Hiển thị {visible.length} / {pages.length} chuyên ngành</p>
    <div className={styles.grid}>{visible.map((page) => {
      const published = page.states.some((state) => state.published);
      const draft = page.states.some((state) => !state.published);
      const updated = page.states.map((state) => state.updatedAt).sort().at(-1);
      const state = page.programmeState?.status ?? "active";
      const author = [...page.states].sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.author?.fullName;
      return <article className={styles.card} key={page.id}><span className={styles.badge}>{state === "archived" ? "Trong thùng rác" : state === "hidden" ? "Đã ẩn" : published ? "Đã xuất bản qua CMS" : draft ? "Bản nháp" : "Nội dung hiện hành"}{state === "active" && published && draft ? " · Có bản nháp" : ""}</span><h2>{page.title}</h2><p>{page.degree} · {page.field}</p><code>{page.path}</code><p>{updated ? `Cập nhật: ${new Date(updated).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}${author ? ` · ${author}` : ""}` : "Đang sử dụng dữ liệu gốc của website"}</p><Link href={`/admin/programmes?id=${encodeURIComponent(page.id)}`}>{canEdit ? "Chỉnh sửa & xem trước" : "Xem nội dung & bản xem trước"} →</Link>{canPublish && <div className={styles.actions}>{state !== "active" ? <button disabled={!!busy} onClick={() => changeState(page,"restore")}>Khôi phục</button> : <button disabled={!!busy} onClick={() => changeState(page,"hide")}>Gỡ công khai</button>}{state !== "archived" && <button disabled={!!busy} onClick={() => changeState(page,"archive")}>Chuyển vào thùng rác</button>}</div>}</article>;
    })}</div>
    {!visible.length && <p>Không có chuyên ngành phù hợp với bộ lọc.</p>}
  </div>;
}
