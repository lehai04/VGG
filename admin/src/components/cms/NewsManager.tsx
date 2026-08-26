"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "./RichTextEditor";

export const newsCategories = [
  ["ADMISSIONS", "Tuyển sinh"],
  ["VAN_LANG_UNIVERSITY", "Trường Đại học Văn Lang"],
  ["UNIVERSITY_EVENT", "Sự kiện trường"],
  ["VAN_LANG_LIFE", "Đời sống Văn Lang"],
  ["INTERNATIONAL_COOPERATION", "Hợp tác quốc tế"],
] as const;

type NewsPost = {
  id: string;
  slug: string;
  locale: string;
  category: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: string;
  publishedAt: string | null;
  authorName: string | null;
  updatedAt: string;
  author: { fullName: string };
};

const emptyForm = { id: "", title: "", slug: "", category: "ADMISSIONS", authorName: "", excerpt: "", content: "", coverImage: "", publishedAt: new Date().toISOString().slice(0, 10), status: "DRAFT" };

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function categoryLabel(value: string) {
  return newsCategories.find(([key]) => key === value)?.[1] ?? value;
}

export function NewsManager({ posts, authorName }: { posts: NewsPost[]; authorName: string }) {
  const router = useRouter();
  const [form, setForm] = useState(() => ({ ...emptyForm, authorName }));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const filtered = useMemo(() => posts.filter((post) => (statusFilter === "ALL" || post.status === statusFilter) && post.title.toLowerCase().includes(query.toLowerCase())), [posts, query, statusFilter]);

  function update(name: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [name]: value, ...(name === "title" && !current.id ? { slug: slugify(value) } : {}) }));
  }

  function edit(post: NewsPost) {
    setForm({ id: post.id, title: post.title, slug: post.slug, category: post.category, authorName: post.authorName ?? post.author.fullName, excerpt: post.excerpt ?? "", content: post.content, coverImage: post.coverImage ?? "", publishedAt: post.publishedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10), status: post.status === "ARCHIVED" ? "DRAFT" : post.status });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const nextStatus = submitter?.value === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
    setLoading(true); setMessage("");
    const payload = { title: form.title, slug: form.slug, locale: "vi", category: form.category, authorName: form.authorName, excerpt: form.excerpt, content: form.content, coverImage: form.coverImage || null, publishedAt: form.publishedAt, status: nextStatus };
    try {
      const response = await fetch(`/api/cms/news${form.id ? `/${form.id}` : ""}`, { method: form.id ? "PUT" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể lưu bài viết.");
      setMessage(nextStatus === "PUBLISHED" ? "Bài viết đã được xuất bản." : "Đã lưu bản nháp.");
      setForm({ ...emptyForm, authorName }); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Không thể lưu bài viết."); }
    finally { setLoading(false); }
  }

  async function archive(id: string) {
    if (!confirm("Chuyển bài viết này vào lưu trữ?")) return;
    const response = await fetch(`/api/cms/news/${id}`, { method: "DELETE" });
    const result = await response.json(); setMessage(result.message || "Đã cập nhật."); router.refresh();
  }

  async function uploadCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingImage(true); setMessage("");
    const body = new FormData(); body.append("file", file);
    try {
      const response = await fetch("/api/cms/upload-image", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể tải ảnh.");
      update("coverImage", result.data.url);
      setMessage("Đã tải ảnh đại diện.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Không thể tải ảnh."); }
    finally { setUploadingImage(false); event.target.value = ""; }
  }

  return (
    <div className="news-admin-layout">
      <form className="admin-card news-editor" onSubmit={submit}>
        <header><div><span className="eyebrow">TRÌNH BIÊN TẬP</span><h2>{form.id ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</h2></div>{form.id && <button className="text-button" type="button" onClick={() => setForm({ ...emptyForm, authorName })}>Tạo bài mới</button>}</header>
        <div className="news-compose-top">
          <section className="news-live-preview">
            <h3>Xem trước thẻ</h3>
            <div className="news-preview-card">
              <div className="news-preview-image" style={{ backgroundImage: form.coverImage ? `url("${form.coverImage.replaceAll('"', '')}")` : undefined }}><span>{form.coverImage ? "" : "ẢNH ĐẠI DIỆN"}</span></div>
              <div className="news-preview-body"><small>{categoryLabel(form.category)} · {form.authorName || "Chưa nhập tác giả"} · {form.publishedAt ? new Date(`${form.publishedAt}T00:00:00`).toLocaleDateString("vi-VN") : "Chưa chọn ngày"}</small><h4>{form.title || "Tiêu đề bài viết sẽ hiển thị tại đây"}</h4><p>{form.excerpt || "Nội dung tóm tắt sẽ xuất hiện trên thẻ tin tức."}</p></div>
            </div>
          </section>
          <div className="form-grid news-meta-form">
            <label className="field full">Tiêu đề *<input value={form.title} onChange={(event) => update("title", event.target.value)} maxLength={250} required placeholder="Nhập tiêu đề bài viết" /></label>
            <label className="field full">Chuyên mục *<select value={form.category} onChange={(event) => update("category", event.target.value)}>{newsCategories.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label className="field">Tác giả *<input value={form.authorName} onChange={(event) => update("authorName", event.target.value)} minLength={2} maxLength={120} required placeholder="Nhập tên tác giả" /></label>
            <label className="field">Ngày đăng *<input type="date" value={form.publishedAt} onChange={(event) => update("publishedAt", event.target.value)} required /></label>
            <label className="field full">Nội dung tóm tắt *<textarea value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} rows={4} minLength={10} maxLength={1000} required placeholder="Nội dung ngắn hiển thị trên thẻ và trang danh sách" /></label>
            <label className="field full">Ảnh đại diện
              <span className="cover-upload-control"><input type="file" accept="image/jpeg,image/png,image/webp,image/avif,.avif" onChange={uploadCover} disabled={uploadingImage} /><b>{uploadingImage ? "ĐANG TẢI ẢNH…" : form.coverImage ? "ĐỔI ẢNH TỪ MÁY" : "CHỌN ẢNH TỪ MÁY"}</b><small>JPG, PNG, WebP hoặc AVIF · tối đa 8 MB</small></span>
            </label>
          </div>
        </div>
        <label className="rich-editor-label">Nội dung chi tiết *</label>
        <RichTextEditor value={form.content} onChange={(value) => update("content", value)} onImportedExcerpt={(value) => { if (!form.excerpt) update("excerpt", value); }} />
        <p className={`form-message${message.startsWith("Đã") || message.includes("xuất bản") ? " success" : ""}`}>{message}</p>
        <footer><button className="secondary-button" disabled={loading} type="submit" value="DRAFT">Lưu bản nháp</button><button className="primary-button" disabled={loading} type="submit" value="PUBLISHED">{loading ? "ĐANG LƯU…" : "Đăng bài"}</button></footer>
      </form>

      <section className="admin-card news-library">
        <header><div><span className="eyebrow">THƯ VIỆN NỘI DUNG</span><h2>Tất cả bài viết</h2></div><strong>{filtered.length} bài</strong></header>
        <div className="news-toolbar"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tiêu đề…" /><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="ALL">Mọi trạng thái</option><option value="DRAFT">Bản nháp</option><option value="PUBLISHED">Đã đăng</option><option value="ARCHIVED">Lưu trữ</option></select></div>
        <div className="news-admin-list">
          {filtered.map((post) => <article key={post.id}>
            <div className="news-admin-thumb" style={{ backgroundImage: post.coverImage ? `url("${post.coverImage.replaceAll('"', '')}")` : undefined }} />
            <div><p>{categoryLabel(post.category)} · {post.authorName ?? post.author.fullName}</p><h3>{post.title}</h3><span>Cập nhật {new Date(post.updatedAt).toLocaleDateString("vi-VN")}</span></div>
            <span className={`status-pill ${post.status.toLowerCase()}`}>{post.status === "PUBLISHED" ? "Đã đăng" : post.status === "DRAFT" ? "Bản nháp" : "Lưu trữ"}</span>
            <div className="news-row-actions"><button type="button" onClick={() => edit(post)}>Chỉnh sửa</button>{post.status !== "ARCHIVED" && <button type="button" onClick={() => archive(post.id)}>Lưu trữ</button>}</div>
          </article>)}
          {!filtered.length && <p>Không có bài viết phù hợp.</p>}
        </div>
      </section>
    </div>
  );
}
