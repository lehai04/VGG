"use client";

import { useEffect, useState } from "react";
import { emptyProgrammeForm } from "@/lib/programme-form";
import { VisualImagePicker } from "../cms/VisualImagePicker";
import styles from "./ContentWorkspace.module.css";

export function NewProgramme({ canViewMedia, canUpload, onCreated }: { canViewMedia: boolean; canUpload: boolean; onCreated: (id: string) => Promise<void> }) {
  const [form, setForm] = useState({ ...emptyProgrammeForm });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [createdId, setCreatedId] = useState("");
  const dirty = !createdId && JSON.stringify(form) !== JSON.stringify(emptyProgrammeForm);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const field = (key: keyof typeof form, label: string, required = true) => <label>{label}<input required={required} value={form[key]} onChange={event => setForm(current => ({ ...current, [key]: event.target.value }))} maxLength={key === "id" ? 100 : 190} /></label>;
  const choice = (key: keyof typeof form, label: string, options: string[]) => <label>{label}<select value={form[key]} onChange={event => setForm(current => ({ ...current, [key]: event.target.value }))}>{options.map(value => <option key={value}>{value}</option>)}</select></label>;
  return <details className={styles.review}><summary>＋ Thêm chuyên ngành theo mẫu website</summary><p>Ngành mới dùng trang chương trình hiện có của VGG. Nhập thông tin đã xác nhận, sau đó bổ sung nội dung, xem trước và gửi duyệt trong workspace.</p>
    <form onSubmit={async event => {
      event.preventDefault(); if (busy) return; setBusy(true); setError("");
      try {
        let id = createdId;
        if (!id) {
          const { id: slug, title, englishTitle, code, degree, field, orientation, credits, duration, tuition, studyMode, intake, summary, bannerImage } = form;
          const response = await fetch("/api/cms/website/programmes", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: slug, title, englishTitle, code, degree, field, orientation, credits: Number(credits), duration, tuition, studyMode, intake, summary, bannerImage }) });
          const result = await response.json();
          if (!response.ok || !result.success) throw Error(result.message || "Không tạo được ngành.");
          id = result.data.id; setCreatedId(id);
        }
        await onCreated(id);
      } catch (reason) { setError(reason instanceof Error ? reason.message : "Không kết nối được máy chủ."); }
      finally { setBusy(false); }
    }}><fieldset disabled={busy || !!createdId} className={styles.newProgramme}>
      {field("title", "Tên chuyên ngành")}{field("id", "Slug URL (chữ thường không dấu, nối bằng dấu -)")}{field("code", "Mã ngành")}{field("englishTitle", "Tên tiếng Anh", false)}
      {choice("degree", "Trình độ", ["Thạc sĩ", "Tiến sĩ"])}{choice("field", "Nhóm ngành", ["Kinh doanh & Quản lý", "Kỹ thuật, Môi trường & Công nghệ", "Du lịch & Khách sạn", "Luật, Nhân văn & Truyền thông", "Thiết kế & Mỹ thuật Ứng dụng"])}{choice("orientation", "Định hướng", ["Đang cập nhật", "Ứng dụng", "Nghiên cứu", "Ứng dụng và nghiên cứu"])}
      <label>Tổng tín chỉ<input type="number" min="0" max="300" step="1" required value={form.credits} onChange={event => setForm(current => ({ ...current, credits: event.target.value }))} /></label>
      {field("duration", "Thời gian đào tạo")}{field("tuition", "Học phí đã xác nhận")}{field("studyMode", "Hình thức học")}{field("intake", "Đợt tuyển sinh", false)}
      <label>Mô tả ngắn<textarea maxLength={3000} value={form.summary} onChange={event => setForm(current => ({ ...current, summary: event.target.value }))} /></label>
      <div>{field("bannerImage", "Đường dẫn ảnh banner")}<VisualImagePicker disabled={busy || !!createdId} value={form.bannerImage} canBrowse={canViewMedia} canUpload={canUpload} onChange={bannerImage => setForm(current => ({ ...current, bannerImage }))} /></div>
    </fieldset>{error && <p role="alert" className={styles.error}>{error}</p>}<button disabled={busy} type="submit">{busy ? "Đang xử lý…" : createdId ? "Mở ngành vừa tạo" : "Tạo bản nháp và mở biên tập"}</button></form>
  </details>;
}
