"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { newsCategories } from "./NewsManager";
export { newsCategories };
import { NewsPostModal } from "./NewsPostModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { CenterToast } from "../common/CenterToast";

export type NewsPostItem = {
  id: string;
  slug: string;
  locale: string;
  category: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  coverImageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  ogImageAlt?: string | null;
  customJsonLd?: Record<string, unknown> | null;
  status: string;
  publishedAt: string | null;
  authorName: string | null;
  updatedAt: string;
  author: { fullName: string };
};

export function NewsList({ posts: initialPosts }: { posts: NewsPostItem[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState<NewsPostItem[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [previewPost, setPreviewPost] = useState<NewsPostItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id?: string; count: number; title?: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Center toast
  const [toast, setToast] = useState<{ open: boolean; title?: string; message: string; type?: "success" | "error" }>({
    open: false,
    message: "",
  });

  const categoryLabel = (code: string) => {
    return newsCategories.find(([key]) => key === code)?.[1] ?? code;
  };

  // Đếm bài viết theo từng danh mục
  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = { ALL: posts.length };
    newsCategories.forEach(([val]) => {
      counts[val] = 0;
    });
    posts.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [posts]);

  // Danh sách đã lọc
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory = selectedCategory === "ALL" || post.category === selectedCategory;
      const matchStatus = statusFilter === "ALL" || post.status === statusFilter;
      const matchQuery =
        !query.trim() ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        (post.authorName && post.authorName.toLowerCase().includes(query.toLowerCase())) ||
        post.author.fullName.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchStatus && matchQuery;
    });
  }, [posts, selectedCategory, statusFilter, query]);

  // Xử lý chọn dòng
  const isAllSelected = filteredPosts.length > 0 && selectedIds.length === filteredPosts.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPosts.map((p) => p.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Xử lý xóa vĩnh viễn 1 bài
  const triggerDeleteOne = (post: NewsPostItem) => {
    setDeleteTarget({
      id: post.id,
      count: 1,
      title: post.title,
    });
  };

  // Xử lý xóa vĩnh viễn các bài đã chọn
  const triggerDeleteBulk = () => {
    if (selectedIds.length === 0) return;
    const targetTitle = selectedIds.length === 1
      ? posts.find((p) => p.id === selectedIds[0])?.title
      : undefined;

    setDeleteTarget({
      count: selectedIds.length,
      title: targetTitle,
    });
  };

  // Xác nhận xóa vĩnh viễn
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      if (deleteTarget.count === 1 && deleteTarget.id) {
        // Xóa 1 bài vĩnh viễn
        const res = await fetch(`/api/cms/news/${deleteTarget.id}?permanent=true`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Không thể xóa bài viết.");

        setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setSelectedIds((prev) => prev.filter((id) => id !== deleteTarget.id));
        setToast({
          open: true,
          type: "success",
          title: "Xóa thành công!",
          message: "Đã xóa vĩnh viễn bài viết khỏi cơ sở dữ liệu.",
        });
      } else if (deleteTarget.count > 1 || (deleteTarget.count === 1 && selectedIds.length === 1)) {
        // Xóa nhiều bài vĩnh viễn
        const idsToDelete = deleteTarget.id ? [deleteTarget.id] : selectedIds;
        const res = await fetch("/api/cms/news/bulk-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: idsToDelete, permanent: true }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Không thể xóa các bài viết.");

        setPosts((prev) => prev.filter((p) => !idsToDelete.includes(p.id)));
        setSelectedIds([]);
        setToast({
          open: true,
          type: "success",
          title: "Xóa thành công!",
          message: `Đã xóa vĩnh viễn ${idsToDelete.length} bài viết đã chọn.`,
        });
      }

      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      setToast({
        open: true,
        type: "error",
        title: "Lỗi xóa bài viết",
        message: err instanceof Error ? err.message : "Đã có lỗi xảy ra khi xóa bài viết.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* THANH ĐIỀU HƯỚNG TRÊN CÙNG: TIÊU ĐỀ + NÚT ĐĂNG TIN */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "1.45rem", fontWeight: 800, color: "#0f172a" }}>
            Danh sách Tin tức &amp; Sự kiện
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "var(--text-14)", color: "#64748b" }}>
            Quản lý, tìm kiếm, xem trước và chỉnh sửa tất cả bài viết trên hệ thống.
          </p>
        </div>

        <Link
          href="/admin/news/create"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            backgroundColor: "#db2639",
            color: "#ffffff",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "var(--text-14)",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(219, 38, 57, 0.28)",
            transition: "all 0.2s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Đăng bài mới
        </Link>
      </div>

      {/* DẢI TABS LỌC THEO TAG (CHUYÊN MỤC) */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
          scrollbarWidth: "none",
        }}
      >
        <button
          type="button"
          onClick={() => setSelectedCategory("ALL")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            borderRadius: "999px",
            border: selectedCategory === "ALL" ? "1.5px solid #db2639" : "1px solid #cbd5e1",
            backgroundColor: selectedCategory === "ALL" ? "#db2639" : "#ffffff",
            color: selectedCategory === "ALL" ? "#ffffff" : "#475569",
            fontSize: "var(--text-14)",
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: selectedCategory === "ALL" ? "0 4px 12px rgba(219, 38, 57, 0.25)" : "none",
            transition: "all 0.2s ease",
          }}
        >
          <span>Tất cả</span>
          <span
            style={{
              padding: "1px 7px",
              borderRadius: "999px",
              fontSize: "var(--text-12)",
              backgroundColor: selectedCategory === "ALL" ? "rgba(255,255,255,0.25)" : "#f1f5f9",
              color: selectedCategory === "ALL" ? "#ffffff" : "#64748b",
            }}
          >
            {countsByCategory.ALL}
          </span>
        </button>

        {newsCategories.map(([val, label]) => {
          const isSelected = selectedCategory === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => setSelectedCategory(val)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "999px",
                border: isSelected ? "1.5px solid #db2639" : "1px solid #cbd5e1",
                backgroundColor: isSelected ? "#db2639" : "#ffffff",
                color: isSelected ? "#ffffff" : "#475569",
                fontSize: "var(--text-14)",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: isSelected ? "0 4px 12px rgba(219, 38, 57, 0.25)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              <span>{label}</span>
              <span
                style={{
                  padding: "1px 7px",
                  borderRadius: "999px",
                  fontSize: "var(--text-12)",
                  backgroundColor: isSelected ? "rgba(255,255,255,0.25)" : "#f1f5f9",
                  color: isSelected ? "#ffffff" : "#64748b",
                }}
              >
                {countsByCategory[val] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* THANH TÌM KIẾM VÀ BỘ LỌC TRẠNG THÁI */}
      <div
        className="admin-card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          padding: "14px 20px",
          borderRadius: "14px",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 300px", maxWidth: "450px" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.5"
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tiêu đề bài viết hoặc người đăng..."
            style={{
              width: "100%",
              height: "42px",
              paddingLeft: "38px",
              paddingRight: "14px",
              borderRadius: "8px",
              border: "1.5px solid #cbd5e1",
              fontSize: "var(--text-14)",
              color: "#0f172a",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "var(--text-14)", color: "#64748b", fontWeight: 600 }}>Quyền riêng tư:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              height: "42px",
              padding: "0 14px",
              borderRadius: "8px",
              border: "1.5px solid #cbd5e1",
              fontSize: "var(--text-14)",
              color: "#0f172a",
              backgroundColor: "#ffffff",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PUBLISHED">Công khai (Đã đăng)</option>
            <option value="DRAFT">Bản nháp (Riêng tư)</option>
            <option value="ARCHIVED">Lưu trữ</option>
          </select>
        </div>
      </div>

      {/* THANH CÔNG CỤ THAO TÁC HÀNG LOẠT KHI CÓ CHECKBOX ĐƯỢC CHỌN */}
      {selectedIds.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            backgroundColor: "#fff1f2",
            border: "1.5px solid #fecdd3",
            borderRadius: "12px",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "var(--text-14)", fontWeight: 700, color: "#9f1239" }}>
              Đã chọn {selectedIds.length} bài viết
            </span>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              style={{
                background: "none",
                border: "none",
                fontSize: "var(--text-14)",
                color: "#64748b",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Bỏ chọn tất cả
            </button>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {selectedIds.length === 1 && (
              <Link
                href={`/admin/news/create?id=${selectedIds[0]}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "var(--text-14)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Chỉnh sửa bài này
              </Link>
            )}

            <button
              type="button"
              onClick={triggerDeleteBulk}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                backgroundColor: "#dc2626",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "var(--text-14)",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(220, 38, 38, 0.25)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              {selectedIds.length > 1 ? `Xóa ${selectedIds.length} bài đã chọn` : "Xóa vĩnh viễn"}
            </button>
          </div>
        </div>
      )}

      {/* BẢNG DANH SÁCH BÀI VIẾT */}
      <div
        className="admin-card"
        style={{
          padding: 0,
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "var(--text-14)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8fafc",
                  borderBottom: "1.5px solid #e2e8f0",
                  color: "#475569",
                  fontSize: "var(--text-12)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                <th style={{ width: "42px", padding: "14px 16px", textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isSomeSelected;
                    }}
                    onChange={toggleSelectAll}
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                    aria-label="Chọn tất cả"
                  />
                </th>
                <th style={{ width: "90px", padding: "14px 12px" }}>Ảnh</th>
                <th style={{ padding: "14px 16px" }}>Tiêu đề bài đăng</th>
                <th style={{ width: "145px", padding: "14px 12px" }}>Tag / Chuyên mục</th>
                <th style={{ width: "140px", padding: "14px 12px" }}>Người đăng</th>
                <th style={{ width: "115px", padding: "14px 12px" }}>Ngày đăng</th>
                <th style={{ width: "125px", padding: "14px 12px" }}>Quyền riêng tư</th>
                <th style={{ width: "135px", padding: "14px 16px", textAlign: "center" }}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "48px 20px", textAlign: "center", color: "#64748b" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <strong style={{ fontSize: "var(--text-16)", color: "#1e293b" }}>Không tìm thấy bài viết nào</strong>
                      <span style={{ fontSize: "var(--text-14)" }}>Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn tag chuyên mục khác.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => {
                  const isSelected = selectedIds.includes(post.id);
                  const isPublished = post.status === "PUBLISHED";
                  const isDraft = post.status === "DRAFT";
                  const dateStr = post.publishedAt
                    ? new Date(`${post.publishedAt}T00:00:00`).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Chưa chọn";

                  return (
                    <tr
                      key={post.id}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        backgroundColor: isSelected ? "#fef2f2" : "#ffffff",
                        transition: "background-color 0.15s ease",
                      }}
                    >
                      {/* Checkbox chọn hàng */}
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(post.id)}
                          style={{ width: "16px", height: "16px", cursor: "pointer" }}
                          aria-label={`Chọn bài ${post.title}`}
                        />
                      </td>

                      {/* Thumbnail nhỏ 16:9 */}
                      <td style={{ padding: "12px" }}>
                        <div
                          style={{
                            width: "76px",
                            height: "44px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            backgroundColor: "#f1f5f9",
                            backgroundImage: post.coverImage ? `url("${post.coverImage.replaceAll('"', "")}")` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                      </td>

                      {/* Tiêu đề bài đăng */}
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          <strong
                            onClick={() => setPreviewPost(post)}
                            style={{
                              color: "#0f172a",
                              fontSize: "var(--text-14)",
                              fontWeight: 700,
                              cursor: "pointer",
                              lineHeight: 1.4,
                            }}
                          >
                            {post.title}
                          </strong>
                          <span style={{ fontSize: "var(--text-12)", color: "#64748b" }}>
                            /{post.slug}
                          </span>
                        </div>
                      </td>

                      {/* Tag / Chuyên mục */}
                      <td style={{ padding: "14px 12px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "var(--text-12)",
                            fontWeight: 700,
                            backgroundColor: "#fee2e2",
                            color: "#b91c1c",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {categoryLabel(post.category)}
                        </span>
                      </td>

                      {/* Người đăng */}
                      <td style={{ padding: "14px 12px", color: "#334155", fontWeight: 500 }}>
                        {post.authorName || post.author.fullName}
                      </td>

                      {/* Ngày đăng */}
                      <td style={{ padding: "14px 12px", color: "#64748b", whiteSpace: "nowrap" }}>
                        {dateStr}
                      </td>

                      {/* Quyền riêng tư (Trạng thái) */}
                      <td style={{ padding: "14px 12px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontSize: "var(--text-12)",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            backgroundColor: isPublished ? "#dcfce7" : isDraft ? "#fef3c7" : "#f1f5f9",
                            color: isPublished ? "#15803d" : isDraft ? "#b45309" : "#64748b",
                          }}
                        >
                          {isPublished ? "✓ Công khai" : isDraft ? "Bản nháp" : "Lưu trữ"}
                        </span>
                      </td>

                      {/* Cụm chức năng (Actions) với Icon tối ưu */}
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          {/* Xem chi tiết */}
                          <button
                            type="button"
                            onClick={() => setPreviewPost(post)}
                            title="Xem chi tiết bài viết"
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "6px",
                              border: "1px solid #cbd5e1",
                              backgroundColor: "#ffffff",
                              color: "#2563eb",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>

                          {/* Chỉnh sửa */}
                          <Link
                            href={`/admin/news/create?id=${post.id}`}
                            title="Chỉnh sửa bài viết"
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "6px",
                              border: "1px solid #cbd5e1",
                              backgroundColor: "#ffffff",
                              color: "#d97706",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textDecoration: "none",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </Link>

                          {/* Xóa vĩnh viễn */}
                          <button
                            type="button"
                            onClick={() => triggerDeleteOne(post)}
                            title="Xóa vĩnh viễn bài viết"
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "6px",
                              border: "1px solid #fecdd3",
                              backgroundColor: "#ffffff",
                              color: "#dc2626",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL XEM CHI TIẾT */}
      <NewsPostModal
        open={Boolean(previewPost)}
        post={previewPost}
        categoryLabel={categoryLabel}
        onClose={() => setPreviewPost(null)}
        onEdit={(post) => router.push(`/admin/news/create?id=${post.id}`)}
      />

      {/* MODAL XÁC NHẬN XÓA VĨNH VIỄN */}
      <DeleteConfirmModal
        open={Boolean(deleteTarget)}
        count={deleteTarget?.count ?? 1}
        postTitle={deleteTarget?.title}
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* THÔNG BÁO THÀNH CÔNG Ở GIỮA MÀN HÌNH */}
      <CenterToast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
