"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RichTextEditor } from "./RichTextEditor";
import { newsCategories, NewsPostItem } from "./NewsList";
import { CenterToast } from "../common/CenterToast";

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  category: "ADMISSIONS",
  authorName: "",
  excerpt: "",
  content: "",
  coverImage: "",
  coverImageAlt: "",
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  robotsIndex: "true",
  robotsFollow: "true",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogImageAlt: "",
  customJsonLd: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  status: "DRAFT",
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categoryLabel(value: string) {
  return newsCategories.find((item: readonly [string, string]) => item[0] === value)?.[1] ?? value;
}

export function NewsEditor({
  authorName,
  initialPost,
}: {
  authorName: string;
  initialPost?: NewsPostItem | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [form, setForm] = useState(() => {
    if (initialPost) {
      return {
        id: initialPost.id,
        title: initialPost.title,
        slug: initialPost.slug,
        category: initialPost.category,
        authorName: initialPost.authorName ?? initialPost.author.fullName,
        excerpt: initialPost.excerpt ?? "",
        content: initialPost.content,
        coverImage: initialPost.coverImage ?? "",
        coverImageAlt: initialPost.coverImageAlt ?? "",
        metaTitle: initialPost.metaTitle ?? "",
        metaDescription: initialPost.metaDescription ?? "",
        canonicalUrl: initialPost.canonicalUrl ?? "",
        robotsIndex: String(initialPost.robotsIndex !== false),
        robotsFollow: String(initialPost.robotsFollow !== false),
        ogTitle: initialPost.ogTitle ?? "",
        ogDescription: initialPost.ogDescription ?? "",
        ogImage: initialPost.ogImage ?? "",
        ogImageAlt: initialPost.ogImageAlt ?? "",
        customJsonLd: initialPost.customJsonLd ? JSON.stringify(initialPost.customJsonLd, null, 2) : "",
        publishedAt: initialPost.publishedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
        status: initialPost.status,
      };
    }
    return { ...emptyForm, authorName };
  });

  const [loading, setLoading] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(Boolean(editId && (!initialPost || initialPost.id !== editId)));
  const [uploadingImage, setUploadingImage] = useState(false);

  // States quản lý touched khi người dùng tương tác hoặc khi bấm Submit
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [forceValidated, setForceValidated] = useState(false);

  // Center Toast thông báo thành công ở giữa màn hình
  const [toast, setToast] = useState<{ open: boolean; title?: string; message: string; type?: "success" | "error" }>({
    open: false,
    message: "",
  });

  // Refs để cuộn tới trường lỗi đầu tiên
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Nếu có editId trên URL và chưa có initialPost tương ứng, fetch dữ liệu bài viết
  useEffect(() => {
    if (!editId || (initialPost && initialPost.id === editId)) return;
    fetch(`/api/cms/news/${editId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.post) {
          const post = data.data.post as NewsPostItem;
          setForm({
            id: post.id,
            title: post.title,
            slug: post.slug,
            category: post.category,
            authorName: post.authorName ?? post.author.fullName,
            excerpt: post.excerpt ?? "",
            content: post.content,
            coverImage: post.coverImage ?? "",
            coverImageAlt: post.coverImageAlt ?? "",
            metaTitle: post.metaTitle ?? "",
            metaDescription: post.metaDescription ?? "",
            canonicalUrl: post.canonicalUrl ?? "",
            robotsIndex: String(post.robotsIndex !== false),
            robotsFollow: String(post.robotsFollow !== false),
            ogTitle: post.ogTitle ?? "",
            ogDescription: post.ogDescription ?? "",
            ogImage: post.ogImage ?? "",
            ogImageAlt: post.ogImageAlt ?? "",
            customJsonLd: post.customJsonLd ? JSON.stringify(post.customJsonLd, null, 2) : "",
            publishedAt: post.publishedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
            status: post.status,
          });
        }
      })
      .catch(() => null)
      .finally(() => setFetchingPost(false));
  }, [editId, initialPost]);

  // Kiểm tra tính hợp lệ từng trường
  const isTitleValid = form.title.trim().length >= 5;
  const isCategoryValid = form.category.trim().length > 0;
  const isAuthorValid = form.authorName.trim().length >= 2;
  const isDateValid = form.publishedAt.trim().length > 0;
  const isExcerptValid = form.excerpt.trim().length >= 10;
  const isCoverValid = form.coverImage.trim().length > 0;
  const isContentValid = form.content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length >= 20;

  const showTitleError = (touched.title || forceValidated) && !isTitleValid;
  const showCategoryError = (touched.category || forceValidated) && !isCategoryValid;
  const showAuthorError = (touched.authorName || forceValidated) && !isAuthorValid;
  const showDateError = (touched.publishedAt || forceValidated) && !isDateValid;
  const showExcerptError = (touched.excerpt || forceValidated) && !isExcerptValid;
  const showCoverError = (touched.coverImage || forceValidated) && !isCoverValid;
  const showContentError = (touched.content || forceValidated) && !isContentValid;

  const isFormCompletelyValid =
    isTitleValid &&
    isCategoryValid &&
    isAuthorValid &&
    isDateValid &&
    isExcerptValid &&
    isCoverValid &&
    isContentValid;

  function update(name: keyof typeof emptyForm, value: string) {
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "title" && !current.id ? { slug: slugify(value) } : {}),
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function uploadCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const body = new FormData();
    body.append("file", file);
    try {
      const response = await fetch("/api/cms/upload-image", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể tải ảnh.");
      update("coverImage", result.data.url);
      setToast({
        open: true,
        type: "success",
        title: "Tải ảnh thành công!",
        message: "Ảnh đại diện đã được tải lên với tỷ lệ 16:9 chuẩn.",
      });
    } catch (error) {
      setToast({
        open: true,
        type: "error",
        title: "Lỗi tải ảnh",
        message: error instanceof Error ? error.message : "Không thể tải ảnh.",
      });
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setForceValidated(true);

    // KIỂM TRA CHƯA NHẬP ĐỦ TRƯỜNG: BÁO LỖI ĐỎ VÀ CUỘN ĐẾN TRƯỜNG ĐẦU TIÊN
    if (!isFormCompletelyValid) {
      if (!isTitleValid) {
        titleRef.current?.focus();
        titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!isCategoryValid) {
        categoryRef.current?.focus();
        categoryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!isAuthorValid) {
        authorRef.current?.focus();
        authorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!isDateValid) {
        dateRef.current?.focus();
        dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!isExcerptValid) {
        excerptRef.current?.focus();
        excerptRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!isCoverValid) {
        coverRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!isContentValid) {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      setToast({
        open: true,
        type: "error",
        title: "Chưa nhập đủ thông tin!",
        message: "Vui lòng kiểm tra và điền đầy đủ các trường báo đỏ trước khi đăng bài.",
      });
      return;
    }

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const nextStatus = submitter?.value === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

    let customJsonLd: Record<string, unknown> | null = null;
    try {
      customJsonLd = form.customJsonLd.trim() ? JSON.parse(form.customJsonLd) : null;
      if (customJsonLd !== null && (typeof customJsonLd !== "object" || Array.isArray(customJsonLd))) throw new Error("Schema phải là một đối tượng JSON.");
    } catch (error) {
      setToast({ open: true, type: "error", title: "JSON-LD không hợp lệ", message: error instanceof Error ? error.message : "Vui lòng kiểm tra JSON-LD." });
      return;
    }

    setLoading(true);
    const payload = {
      title: form.title,
      slug: form.slug,
      locale: "vi",
      category: form.category,
      authorName: form.authorName,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage || null,
      coverImageAlt: form.coverImageAlt || null,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
      canonicalUrl: form.canonicalUrl || null,
      robotsIndex: form.robotsIndex === "true",
      robotsFollow: form.robotsFollow === "true",
      ogTitle: form.ogTitle || null,
      ogDescription: form.ogDescription || null,
      ogImage: form.ogImage || null,
      ogImageAlt: form.ogImageAlt || null,
      customJsonLd,
      publishedAt: form.publishedAt,
      status: nextStatus,
    };

    try {
      const response = await fetch(`/api/cms/news${form.id ? `/${form.id}` : ""}`, {
        method: form.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể lưu bài viết.");

      // THÔNG BÁO THÀNH CÔNG Ở CHÍNH GIỮA MÀN HÌNH
      setToast({
        open: true,
        type: "success",
        title: nextStatus === "PUBLISHED" ? "Đăng bài thành công!" : "Lưu bản nháp thành công!",
        message: nextStatus === "PUBLISHED"
          ? "Bài viết đã được xuất bản công khai lên website."
          : "Bản nháp bài viết đã được lưu an toàn trong hệ thống.",
      });

      if (!form.id) {
        setForm({ ...emptyForm, authorName });
        setForceValidated(false);
        setTouched({});
      }
      router.refresh();
    } catch (error) {
      setToast({
        open: true,
        type: "error",
        title: "Lưu bài thất bại",
        message: error instanceof Error ? error.message : "Không thể lưu bài viết.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (fetchingPost) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b" }}>
        Đang tải thông tin bài viết...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* THANH ĐIỀU HƯỚNG TRÊN: QUAY LẠI VÀ TIÊU ĐỀ */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/admin/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              color: "#334155",
              fontSize: "var(--text-14)",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            ← Danh sách tin
          </Link>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.45rem", fontWeight: 800, color: "#0f172a" }}>
              {form.id ? "Chỉnh sửa bài viết" : "Đăng bài viết mới"}
            </h2>
            <span style={{ fontSize: "var(--text-14)", color: "#64748b" }}>
              {form.id ? `Mã bài viết: ${form.id}` : "Nhập đầy đủ thông tin để xuất bản bài viết lên website"}
            </span>
          </div>
        </div>

        {form.id && (
          <button
            type="button"
            onClick={() => {
              setForm({ ...emptyForm, authorName });
              setForceValidated(false);
              setTouched({});
              router.push("/admin/news/create");
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f8fafc",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              color: "#334155",
              fontSize: "var(--text-14)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Chuyển sang tạo bài mới
          </button>
        )}
      </div>

      <form className="admin-card" onSubmit={submit} style={{ padding: "28px", borderRadius: "16px" }} noValidate>
        {/* KHỐI TRÊN: XEM TRƯỚC VÀ THÔNG TIN CƠ BẢN */}
        <div className="news-compose-top" style={{ marginBottom: "28px" }}>
          {/* XEM TRƯỚC THẺ */}
          <section className="news-live-preview">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "var(--text-16)", fontWeight: 700, color: "#1e293b" }}>
                Xem trước thẻ tin tức
              </h3>
              <span style={{ fontSize: "var(--text-12)", color: "#10b981", fontWeight: 600 }}>
                Chuẩn 16:9
              </span>
            </div>

            <label className="field full">URL slug<input value={form.slug} onChange={(event) => update("slug", slugify(event.target.value))} maxLength={190} required /><small>Đường dẫn không dấu, chữ thường, dùng dấu gạch ngang.</small></label>

            <div className="news-preview-card" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <div
                className="news-preview-image"
                style={{
                  backgroundImage: form.coverImage ? `url("${form.coverImage.replaceAll('"', "")}")` : undefined,
                  aspectRatio: "16 / 9",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!form.coverImage && (
                  <span style={{ color: "#94a3b8", fontSize: "var(--text-12)", fontWeight: 600 }}>
                    1024 × 576 px
                  </span>
                )}
              </div>
              <div className="news-preview-body" style={{ padding: "16px" }}>
                <small style={{ color: "#64748b", fontSize: "var(--text-10)", display: "block", marginBottom: "6px" }}>
                  {categoryLabel(form.category)} · {form.authorName || "Tác giả"} ·{" "}
                  {form.publishedAt ? new Date(`${form.publishedAt}T00:00:00`).toLocaleDateString("vi-VN") : "Ngày đăng"}
                </small>
                <h4 style={{ margin: "0 0 8px", fontSize: "var(--text-14)", fontWeight: 700, color: "#0f172a", lineHeight: 1.35 }}>
                  {form.title || "Tiêu đề bài viết hiển thị ở đây"}
                </h4>
                <p style={{ margin: 0, fontSize: "var(--text-12)", color: "#475569", lineHeight: 1.4 }}>
                  {form.excerpt || "Nội dung tóm tắt bài viết sẽ hiển thị ở đây..."}
                </p>
              </div>
            </div>
          </section>

          {/* CÁC TRƯỜNG THÔNG TIN CƠ BẢN */}
          <div className="form-grid news-meta-form">
            {/* TIÊU ĐỀ */}
            <div className="field full">
              <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "var(--text-14)", fontWeight: 600, color: "#1e293b" }}>
                  Tiêu đề bài viết <span style={{ color: "#ef4444" }}>*</span>
                </span>
                <input
                  ref={titleRef}
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, title: true }))}
                  maxLength={250}
                  placeholder="Nhập tiêu đề bài viết (tối thiểu 5 ký tự)"
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 14px",
                    borderRadius: "8px",
                    border: showTitleError ? "1.5px solid #ef4444" : "1.5px solid #cbd5e1",
                    boxShadow: showTitleError ? "0 0 0 3px rgba(239, 68, 68, 0.15)" : undefined,
                    outline: "none",
                    fontSize: "var(--text-14)",
                    transition: "all 0.2s ease",
                  }}
                />
              </label>
              {showTitleError && (
                <span style={{ color: "#ef4444", fontSize: "var(--text-12)", fontWeight: 600, marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>⚠️</span> Vui lòng nhập tiêu đề bài viết (tối thiểu 5 ký tự).
                </span>
              )}
            </div>

            {/* CHUYÊN MỤC */}
            <div className="field full">
              <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "var(--text-14)", fontWeight: 600, color: "#1e293b" }}>
                  Tag / Chuyên mục <span style={{ color: "#ef4444" }}>*</span>
                </span>
                <select
                  ref={categoryRef}
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 14px",
                    borderRadius: "8px",
                    border: showCategoryError ? "1.5px solid #ef4444" : "1.5px solid #cbd5e1",
                    boxShadow: showCategoryError ? "0 0 0 3px rgba(239, 68, 68, 0.15)" : undefined,
                    outline: "none",
                    fontSize: "var(--text-14)",
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  {newsCategories.map((item: readonly [string, string]) => (
                    <option value={item[0]} key={item[0]}>
                      {item[1]}
                    </option>
                  ))}
                </select>
              </label>
              {showCategoryError && (
                <span style={{ color: "#ef4444", fontSize: "var(--text-12)", fontWeight: 600, marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>⚠️</span> Vui lòng chọn chuyên mục cho bài viết.
                </span>
              )}
            </div>

            {/* TÁC GIẢ */}
            <div className="field">
              <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "var(--text-14)", fontWeight: 600, color: "#1e293b" }}>
                  Tác giả / Người đăng <span style={{ color: "#ef4444" }}>*</span>
                </span>
                <input
                  ref={authorRef}
                  value={form.authorName}
                  onChange={(e) => update("authorName", e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, authorName: true }))}
                  minLength={2}
                  maxLength={120}
                  placeholder="Nhập tên tác giả"
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 14px",
                    borderRadius: "8px",
                    border: showAuthorError ? "1.5px solid #ef4444" : "1.5px solid #cbd5e1",
                    boxShadow: showAuthorError ? "0 0 0 3px rgba(239, 68, 68, 0.15)" : undefined,
                    outline: "none",
                    fontSize: "var(--text-14)",
                  }}
                />
              </label>
              {showAuthorError && (
                <span style={{ color: "#ef4444", fontSize: "var(--text-12)", fontWeight: 600, marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>⚠️</span> Vui lòng nhập tên tác giả (tối thiểu 2 ký tự).
                </span>
              )}
            </div>

            {/* NGÀY ĐĂNG */}
            <div className="field">
              <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "var(--text-14)", fontWeight: 600, color: "#1e293b" }}>
                  Ngày đăng <span style={{ color: "#ef4444" }}>*</span>
                </span>
                <input
                  ref={dateRef}
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => update("publishedAt", e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, publishedAt: true }))}
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 14px",
                    borderRadius: "8px",
                    border: showDateError ? "1.5px solid #ef4444" : "1.5px solid #cbd5e1",
                    boxShadow: showDateError ? "0 0 0 3px rgba(239, 68, 68, 0.15)" : undefined,
                    outline: "none",
                    fontSize: "var(--text-14)",
                  }}
                />
              </label>
              {showDateError && (
                <span style={{ color: "#ef4444", fontSize: "var(--text-12)", fontWeight: 600, marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>⚠️</span> Vui lòng chọn ngày đăng bài viết.
                </span>
              )}
            </div>

            {/* TÓM TẮT */}
            <div className="field full">
              <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontSize: "var(--text-14)", fontWeight: 600, color: "#1e293b" }}>
                  Nội dung tóm tắt <span style={{ color: "#ef4444" }}>*</span>
                </span>
                <textarea
                  ref={excerptRef}
                  value={form.excerpt}
                  onChange={(e) => update("excerpt", e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, excerpt: true }))}
                  rows={3}
                  minLength={10}
                  maxLength={1000}
                  placeholder="Nhập nội dung tóm tắt hiển thị trên card tin tức (tối thiểu 10 ký tự)"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: showExcerptError ? "1.5px solid #ef4444" : "1.5px solid #cbd5e1",
                    boxShadow: showExcerptError ? "0 0 0 3px rgba(239, 68, 68, 0.15)" : undefined,
                    outline: "none",
                    fontSize: "var(--text-14)",
                    lineHeight: 1.5,
                  }}
                />
              </label>
              {showExcerptError && (
                <span style={{ color: "#ef4444", fontSize: "var(--text-12)", fontWeight: 600, marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>⚠️</span> Vui lòng nhập nội dung tóm tắt (tối thiểu 10 ký tự).
                </span>
              )}
            </div>

            {/* ẢNH ĐẠI DIỆN VỚI KÍCH THƯỚC HOÀN HẢO 1024 × 576 PX */}
            <div className="field full" ref={coverRef}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "var(--text-14)", fontWeight: 600, color: "#1e293b" }}>
                  Ảnh đại diện bài viết <span style={{ color: "#ef4444" }}>*</span>
                </span>

                {/* HUY HIỆU KÍCH THƯỚC HOÀN HẢO 1024 × 576 PX THEO YÊU CẦU */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    backgroundColor: "#ecfdf5",
                    color: "#047857",
                    fontSize: "var(--text-12)",
                    fontWeight: 700,
                    border: "1.5px solid #34d399",
                    boxShadow: "0 2px 6px rgba(16, 185, 129, 0.15)",
                  }}
                >
                  <span>⭐ Kích thước hoàn hảo:</span>
                  <strong style={{ color: "#065f46" }}>1024 × 576 px</strong>
                  <span>(Tỷ lệ 16:9)</span>
                </span>
              </div>

              <div
                style={{
                  border: showCoverError ? "2px dashed #ef4444" : form.coverImage ? "1.5px solid #10b981" : "2px dashed #cbd5e1",
                  backgroundColor: showCoverError ? "#fef2f2" : "#f8fafc",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      backgroundColor: uploadingImage ? "#94a3b8" : "#db2639",
                      color: "#ffffff",
                      borderRadius: "8px",
                      fontSize: "var(--text-14)",
                      fontWeight: 700,
                      cursor: uploadingImage ? "wait" : "pointer",
                      boxShadow: "0 2px 8px rgba(219, 38, 57, 0.25)",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={uploadCover}
                      disabled={uploadingImage}
                      style={{ display: "none" }}
                    />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {uploadingImage ? "ĐANG TẢI ẢNH LÊN..." : form.coverImage ? "ĐỔI ẢNH KHÁC TỪ MÁY" : "CHỌN ẢNH TỪ MÁY"}
                  </label>

                  {form.coverImage && (
                    <span style={{ fontSize: "var(--text-14)", color: "#10b981", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      ✓ Đã có ảnh đại diện
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "var(--text-12)", color: "#64748b" }}>
                  <span>• <strong>Chuẩn tỷ lệ 16:9</strong> (Kích thước tối ưu: <strong>1024 × 576 px</strong> hoặc 1600 × 900 px).</span>
                  <span>• Đặt chủ thể ở trung tâm khung hình, tránh để chữ quá sát mép.</span>
                  <span>• Định dạng hỗ trợ: JPG, PNG, WebP hoặc AVIF (Dung lượng tối đa 8 MB).</span>
                </div>
              </div>

              {showCoverError && (
                <span style={{ color: "#ef4444", fontSize: "var(--text-12)", fontWeight: 600, marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>⚠️</span> Vui lòng tải lên ảnh đại diện cho bài viết (chuẩn 1024 × 576 px).
                </span>
              )}
              <label className="field full">Alt ảnh đại diện<input value={form.coverImageAlt} onChange={(event) => update("coverImageAlt", event.target.value)} maxLength={500} placeholder="Mô tả ngắn gọn nội dung của ảnh" /></label>
            </div>
          </div>
        </div>

        <details className="news-seo-settings" style={{ marginTop: 20, padding: 16, border: "1px solid #cbd5e1", borderRadius: 10 }}>
          <summary style={{ cursor: "pointer", fontWeight: 700 }}>Thiết lập Technical SEO</summary>
          <div className="form-grid news-meta-form" style={{ marginTop: 16 }}>
            <label className="field full">Meta title<input value={form.metaTitle} onChange={(event) => update("metaTitle", event.target.value)} maxLength={250} /></label>
            <label className="field full">Meta description<textarea value={form.metaDescription} onChange={(event) => update("metaDescription", event.target.value)} maxLength={1000} rows={3} /></label>
            <label className="field full">Canonical URL<input value={form.canonicalUrl} onChange={(event) => update("canonicalUrl", event.target.value)} maxLength={1000} placeholder="Để trống để dùng URL bài viết" /></label>
            <label className="field">Robots index<select value={form.robotsIndex} onChange={(event) => update("robotsIndex", event.target.value)}><option value="true">index</option><option value="false">noindex</option></select></label>
            <label className="field">Robots follow<select value={form.robotsFollow} onChange={(event) => update("robotsFollow", event.target.value)}><option value="true">follow</option><option value="false">nofollow</option></select></label>
            <label className="field full">OG title<input value={form.ogTitle} onChange={(event) => update("ogTitle", event.target.value)} maxLength={250} /></label>
            <label className="field full">OG description<textarea value={form.ogDescription} onChange={(event) => update("ogDescription", event.target.value)} maxLength={1000} rows={3} /></label>
            <label className="field full">OG image URL<input value={form.ogImage} onChange={(event) => update("ogImage", event.target.value)} maxLength={1000} /></label>
            <label className="field full">OG image alt<input value={form.ogImageAlt} onChange={(event) => update("ogImageAlt", event.target.value)} maxLength={500} /></label>
            <label className="field full">JSON-LD tùy chỉnh<textarea value={form.customJsonLd} onChange={(event) => update("customJsonLd", event.target.value)} rows={8} placeholder='{"@type":"..."}' /></label>
          </div>
          <small>JSON-LD phải là JSON object hợp lệ; tối đa 20 KB.</small>
        </details>

        {/* NỘI DUNG CHI TIẾT VỚI TRÌNH SOẠN THẢO */}
        <div ref={contentRef} style={{ marginTop: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <label className="rich-editor-label" style={{ fontSize: "var(--text-14)", fontWeight: 700, color: "#1e293b", margin: 0 }}>
              Nội dung chi tiết bài viết <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <span style={{ fontSize: "var(--text-12)", color: isContentValid ? "#10b981" : "#64748b" }}>
              Tối thiểu 20 ký tự
            </span>
          </div>

          <div
            style={{
              border: showContentError ? "2px solid #ef4444" : "1px solid #cbd5e1",
              borderRadius: "12px",
              boxShadow: showContentError ? "0 0 0 3px rgba(239, 68, 68, 0.15)" : undefined,
              transition: "all 0.2s ease",
            }}
          >
            <RichTextEditor
              value={form.content}
              onChange={(value) => {
                update("content", value);
              }}
              onImportedExcerpt={(value) => {
                if (!form.excerpt) update("excerpt", value);
              }}
            />
          </div>

          {showContentError && (
            <span style={{ color: "#ef4444", fontSize: "var(--text-12)", fontWeight: 600, marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span>⚠️</span> Vui lòng nhập nội dung chi tiết bài viết (tối thiểu 20 ký tự).
            </span>
          )}
        </div>

        {/* FOOTER NÚT HÀNH ĐỘNG */}
        <footer
          style={{
            marginTop: "32px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "14px",
          }}
        >
          <Link
            href="/admin/news"
            style={{
              padding: "11px 20px",
              backgroundColor: "#f1f5f9",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              fontSize: "var(--text-14)",
              fontWeight: 600,
              color: "#334155",
              textDecoration: "none",
            }}
          >
            Hủy bỏ
          </Link>

          <button
            type="submit"
            value="DRAFT"
            disabled={loading}
            style={{
              padding: "11px 22px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #cbd5e1",
              borderRadius: "10px",
              fontSize: "var(--text-14)",
              fontWeight: 700,
              color: "#1e293b",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            Lưu bản nháp (Riêng tư)
          </button>

          <button
            type="submit"
            value="PUBLISHED"
            disabled={loading}
            style={{
              padding: "11px 28px",
              backgroundColor: "#db2639",
              border: "none",
              borderRadius: "10px",
              fontSize: "var(--text-14)",
              fontWeight: 700,
              color: "#ffffff",
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 4px 14px rgba(219, 38, 57, 0.3)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
            {loading ? "ĐANG XỬ LÝ..." : form.id ? "Cập nhật bài viết" : "Đăng bài viết"}
          </button>
        </footer>
      </form>

      {/* THÔNG BÁO THÀNH CÔNG Ở CHÍNH GIỮA MÀN HÌNH */}
      <CenterToast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((p) => ({ ...p, open: false }))}
      />
    </div>
  );
}
