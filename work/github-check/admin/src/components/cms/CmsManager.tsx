"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Item = Record<string, unknown> & { id: string; title?: string; key?: string; status?: string; updatedAt?: string };
type Field = { name: string; label: string; type?: "text" | "textarea" | "url" | "select" | "json"; required?: boolean; options?: string[] };

export function CmsManager({ endpoint, items, fields, kind }: { endpoint: string; items: Item[]; fields: Field[]; kind: string }) {
  const router = useRouter(); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const payload: Record<string, unknown> = {};
    for (const field of fields) { const raw = String(data.get(field.name) ?? ""); payload[field.name] = field.type === "json" ? JSON.parse(raw || "{}") : raw; }
    if (kind === "site") payload.published = data.get("published") === "true";
    setLoading(true); setMessage("");
    try { const response = await fetch(`/api/cms/${endpoint}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }); const result = await response.json(); if (!response.ok) throw new Error(result.message || "Không thể lưu dữ liệu."); setMessage(result.message || "Đã lưu."); form.reset(); router.refresh(); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Không thể lưu dữ liệu."); } finally { setLoading(false); }
  }
  async function archive(id: string) { if (!confirm("Chuyển mục này vào lưu trữ?")) return; const response = await fetch(`/api/cms/${endpoint}/${id}`, { method: "DELETE" }); const result = await response.json(); setMessage(result.message || "Đã cập nhật."); router.refresh(); }
  return <div className="cms-grid"><form className="admin-card form-stack" onSubmit={submit}><h2>Thêm {kind === "news" ? "bài viết" : kind === "resource" ? "tài nguyên" : "cấu hình"}</h2>{fields.map((field) => <label className="field" key={field.name}>{field.label}{field.type === "textarea" || field.type === "json" ? <textarea name={field.name} rows={field.type === "json" ? 8 : 5} required={field.required} defaultValue={field.type === "json" ? "{}" : undefined} /> : field.type === "select" ? <select name={field.name}>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input name={field.name} type={field.type || "text"} required={field.required} />}</label>)}{kind === "site" && <label className="field">Xuất bản<select name="published"><option value="false">Bản nháp</option><option value="true">Đang áp dụng</option></select></label>}<p className="form-message">{message}</p><button className="primary-button" disabled={loading}>{loading ? "ĐANG LƯU…" : "LƯU"}</button></form><section className="admin-card admin-table-wrap"><h2>Danh sách hiện tại</h2><table className="admin-table"><thead><tr><th>Tên</th><th>Trạng thái</th><th>Cập nhật</th><th /></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.title || item.key}</strong></td><td><span className="status-pill">{item.status || "CONFIG"}</span></td><td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("vi-VN") : "—"}</td><td>{kind !== "site" && <button className="text-button" type="button" onClick={() => archive(item.id)}>Lưu trữ</button>}</td></tr>)}</tbody></table>{items.length === 0 && <p>Chưa có dữ liệu.</p>}</section></div>;
}
