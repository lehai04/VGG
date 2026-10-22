"use client";

import { ChangeEvent, DragEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  createdAt: string;
  _count: { resources: number };
};
type Resource = {
  id: string;
  title: string;
  categoryId: string;
  resourceType: string;
  documentType: string | null;
  documentNumber: string | null;
  issueDate: string | null;
  issuingOrganization: string | null;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  category: { id: string; name: string };
};
type ResourceForm = {
  id: string;
  title: string;
  categoryId: string;
  resourceType: string;
  documentType: string;
  documentNumber: string;
  issueDate: string;
  issuingOrganization: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
};

const resourceTypes = [
  ["DIRECTIVE_DOCUMENT", "Văn bản chỉ đạo"],
  ["EXECUTION_DOCUMENT", "Văn bản thực thi"],
  ["BROCHURE", "Brochure"],
  ["PDF_DOCUMENT", "Tài liệu PDF"],
] as const;
const documentTypes = [
  ["REGULATION", "Quy chế"],
  ["RULE", "Quy định"],
  ["PROCESS", "Quy trình"],
  ["NOTICE", "Thông báo"],
  ["GUIDELINE", "Hướng dẫn"],
] as const;
const defaultForm: ResourceForm = {
  id: "",
  title: "",
  categoryId: "",
  resourceType: "DIRECTIVE_DOCUMENT",
  documentType: "",
  documentNumber: "",
  issueDate: "",
  issuingOrganization: "",
  fileName: "",
  fileUrl: "",
  fileType: "",
  fileSize: 0,
};

function labelOf(
  options: readonly (readonly [string, string])[],
  value: string | null,
) {
  return options.find(([key]) => key === value)?.[1] ?? "—";
}
function fileSize(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / 1024 ** 2).toFixed(1)} MB`;
}
function fileIcon(type: string) {
  if (type === "application/pdf") return "PDF";
  if (type.includes("word")) return "DOC";
  if (type.includes("excel") || type.includes("sheet")) return "XLS";
  if (type.startsWith("image/")) return "IMG";
  return "FILE";
}

export function ResourceManager({
  resources,
  categories,
}: {
  resources: Resource[];
  categories: Category[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"resources" | "categories">("resources");
  const [form, setForm] = useState<ResourceForm>({
    ...defaultForm,
    categoryId: categories[0]?.id ?? "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ id: "", name: "" });
  const [categoryDrawer, setCategoryDrawer] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [documentFilter, setDocumentFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<Resource | null>(null);
  const [confirming, setConfirming] = useState<{
    kind: "resource" | "category";
    id: string;
    name: string;
  } | null>(null);
  const pageSize = 10;

  const overlayOpen = drawerOpen || categoryDrawer || Boolean(preview) || Boolean(confirming);
  useEffect(() => {
    if (!overlayOpen) return;
    const mobile = window.matchMedia("(width < 1024px)");
    const previousOverflow = document.body.style.overflow;
    const syncScroll = () => {
      document.body.style.overflow = mobile.matches ? "hidden" : previousOverflow;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !mobile.matches) return;
      setDrawerOpen(false);
      setCategoryDrawer(false);
      setPreview(null);
      setConfirming(null);
    };
    syncScroll();
    mobile.addEventListener("change", syncScroll);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      mobile.removeEventListener("change", syncScroll);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [overlayOpen]);

  const filtered = useMemo(
    () =>
      resources.filter(
        (item) =>
          item.title.toLowerCase().includes(query.trim().toLowerCase()) &&
          (!categoryFilter || item.categoryId === categoryFilter) &&
          (!typeFilter || item.resourceType === typeFilter) &&
          (!documentFilter || item.documentType === documentFilter),
      ),
    [resources, query, categoryFilter, typeFilter, documentFilter],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice(
    (Math.min(page, totalPages) - 1) * pageSize,
    Math.min(page, totalPages) * pageSize,
  );
  const isDocument =
    form.resourceType === "DIRECTIVE_DOCUMENT" ||
    form.resourceType === "EXECUTION_DOCUMENT";
  const pdfOnly =
    form.resourceType === "BROCHURE" || form.resourceType === "PDF_DOCUMENT";

  function update(name: keyof ResourceForm, value: string | number) {
    setForm((current) => ({ ...current, [name]: value }));
  }
  function openCreate() {
    setForm({ ...defaultForm, categoryId: categories[0]?.id ?? "" });
    setError("");
    setDrawerOpen(true);
  }
  function openEdit(item: Resource) {
    setForm({
      id: item.id,
      title: item.title,
      categoryId: item.categoryId,
      resourceType: item.resourceType,
      documentType: item.documentType ?? "",
      documentNumber: item.documentNumber ?? "",
      issueDate: item.issueDate?.slice(0, 10) ?? "",
      issuingOrganization: item.issuingOrganization ?? "",
      fileName: item.fileName,
      fileUrl: item.fileUrl,
      fileType: item.fileType,
      fileSize: item.fileSize,
    });
    setError("");
    setDrawerOpen(true);
  }
  function resetFilters() {
    setQuery("");
    setCategoryFilter("");
    setTypeFilter("");
    setDocumentFilter("");
    setPage(1);
  }

  async function upload(file: File) {
    if (pdfOnly && file.type !== "application/pdf")
      return setError("Loại tài nguyên này chỉ chấp nhận file PDF.");
    setUploading(true);
    setError("");
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await fetch("/api/cms/upload-resource", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Tải file thất bại.");
      setForm((current) => ({
        ...current,
        fileUrl: result.data.url,
        fileName: result.data.fileName,
        fileType: result.data.fileType,
        fileSize: result.data.fileSize,
      }));
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Tải file thất bại.",
      );
    } finally {
      setUploading(false);
    }
  }
  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void upload(file);
    event.target.value = "";
  }
  function dropFile(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void upload(file);
  }

  async function submitResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!form.fileUrl || !form.fileName)
      return setError("Vui lòng tải file tài nguyên.");
    if (!form.categoryId) return setError("Vui lòng chọn danh mục.");
    setLoading(true);
    const payload = {
      locale: "vi",
      title: form.title,
      categoryId: form.categoryId,
      resourceType: form.resourceType,
      documentType:
        form.resourceType === "EXECUTION_DOCUMENT"
          ? form.documentType || null
          : null,
      documentNumber: isDocument ? form.documentNumber || null : null,
      issueDate: isDocument ? form.issueDate || null : null,
      issuingOrganization: isDocument ? form.issuingOrganization || null : null,
      fileName: form.fileName,
      fileUrl: form.fileUrl,
      fileType: form.fileType,
      fileSize: form.fileSize,
      status: "PUBLISHED",
    };
    try {
      const response = await fetch(
        `/api/cms/resources${form.id ? `/${form.id}` : ""}`,
        {
          method: form.id ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Không thể lưu tài nguyên.");
      setMessage(result.message);
      setDrawerOpen(false);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Không thể lưu tài nguyên.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function submitCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `/api/cms/resource-categories${categoryForm.id ? `/${categoryForm.id}` : ""}`,
        {
          method: categoryForm.id ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: categoryForm.name }),
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Không thể lưu danh mục.");
      setMessage(result.message);
      setCategoryDrawer(false);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Không thể lưu danh mục.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!confirming) return;
    setLoading(true);
    setError("");
    const endpoint =
      confirming.kind === "resource" ? "resources" : "resource-categories";
    try {
      const response = await fetch(`/api/cms/${endpoint}/${confirming.id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể xóa.");
      setMessage(result.message);
      setConfirming(null);
      router.refresh();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Không thể xóa.",
      );
      setConfirming(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="resource-manager">
      {(message || error) && (
        <div className={`resource-alert ${error ? "error" : "success"}`}>
          {error || message}
          <button
            type="button"
            onClick={() => {
              setError("");
              setMessage("");
            }}
          >
            ×
          </button>
        </div>
      )}
      <div className="resource-manager__primary">
        <button className="primary-button" type="button" onClick={openCreate}>
          + Thêm tài nguyên
        </button>
      </div>
      <div className="resource-tabs" role="tablist">
        <button
          className={tab === "resources" ? "active" : ""}
          onClick={() => setTab("resources")}
          type="button"
        >
          Tài nguyên <span>{resources.length}</span>
        </button>
        <button
          className={tab === "categories" ? "active" : ""}
          onClick={() => setTab("categories")}
          type="button"
        >
          Danh mục <span>{categories.length}</span>
        </button>
      </div>

      {tab === "resources" ? (
        <section className="admin-card resource-panel">
          <div className="resource-toolbar">
            <input
              aria-label="Tìm kiếm theo tên"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Tìm kiếm theo tên…"
            />
            <select
              aria-label="Lọc danh mục"
              value={categoryFilter}
              onChange={(event) => {
                setCategoryFilter(event.target.value);
                setPage(1);
              }}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              aria-label="Lọc loại tài nguyên"
              value={typeFilter}
              onChange={(event) => {
                setTypeFilter(event.target.value);
                setDocumentFilter("");
                setPage(1);
              }}
            >
              <option value="">Tất cả loại tài nguyên</option>
              {resourceTypes.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {typeFilter === "EXECUTION_DOCUMENT" && (
              <select
                aria-label="Lọc loại văn bản"
                value={documentFilter}
                onChange={(event) => setDocumentFilter(event.target.value)}
              >
                <option value="">Tất cả loại văn bản</option>
                {documentTypes.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            )}
            <button
              className="secondary-button"
              type="button"
              onClick={resetFilters}
            >
              Đặt lại
            </button>
          </div>
          <div className="resource-table-scroll">
            <table className="admin-table resource-table">
              <thead>
                <tr>
                  <th>Tên tài nguyên</th>
                  <th>Danh mục</th>
                  <th>Loại</th>
                  <th>Số văn bản</th>
                  <th>Ngày ban hành</th>
                  <th>Đơn vị ban hành</th>
                  <th>File</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                    </td>
                    <td>{item.category.name}</td>
                    <td>
                      {labelOf(resourceTypes, item.resourceType)}
                      {item.documentType && (
                        <small>
                          {labelOf(documentTypes, item.documentType)}
                        </small>
                      )}
                    </td>
                    <td>{item.documentNumber || "—"}</td>
                    <td>
                      {item.issueDate
                        ? new Date(item.issueDate).toLocaleDateString("vi-VN")
                        : "—"}
                    </td>
                    <td>{item.issuingOrganization || "—"}</td>
                    <td>
                      <span className="file-chip">
                        <b>{fileIcon(item.fileType)}</b>
                        {item.fileName}
                      </span>
                    </td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td>
                      <div className="resource-actions">
                        <button type="button" onClick={() => setPreview(item)}>
                          Xem
                        </button>
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          Tải
                        </a>
                        <button type="button" onClick={() => openEdit(item)}>
                          Sửa
                        </button>
                        <button
                          className="danger"
                          type="button"
                          onClick={() =>
                            setConfirming({
                              kind: "resource",
                              id: item.id,
                              name: item.title,
                            })
                          }
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!paged.length && (
            <div className="resource-empty">
              <b>Không tìm thấy tài nguyên</b>
              <span>Hãy thay đổi bộ lọc hoặc thêm tài nguyên mới.</span>
            </div>
          )}
          {filtered.length > pageSize && (
            <div className="resource-pagination">
              <button
                disabled={page <= 1}
                onClick={() => setPage((value) => value - 1)}
              >
                ← Trước
              </button>
              <span>
                Trang {Math.min(page, totalPages)} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((value) => value + 1)}
              >
                Sau →
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="admin-card resource-panel">
          <div className="category-head">
            <div>
              <h2>Danh mục tài nguyên</h2>
              <p>
                Quản lý các danh mục được sử dụng trong biểu mẫu tài nguyên.
              </p>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                setCategoryForm({ id: "", name: "" });
                setCategoryDrawer(true);
              }}
            >
              + Thêm danh mục
            </button>
          </div>
          <div className="resource-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên danh mục</th>
                  <th>Số tài nguyên</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{category.name}</strong>
                    </td>
                    <td>{category._count.resources}</td>
                    <td>
                      {new Date(category.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td>
                      <div className="resource-actions">
                        <button
                          type="button"
                          onClick={() => {
                            setCategoryForm({
                              id: category.id,
                              name: category.name,
                            });
                            setCategoryDrawer(true);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          className="danger"
                          type="button"
                          onClick={() =>
                            setConfirming({
                              kind: "category",
                              id: category.id,
                              name: category.name,
                            })
                          }
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!categories.length && (
            <div className="resource-empty">
              <b>Chưa có danh mục</b>
              <span>Thêm danh mục đầu tiên để bắt đầu quản lý tài nguyên.</span>
            </div>
          )}
        </section>
      )}

      {drawerOpen && (
        <div
          className="resource-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !loading)
              setDrawerOpen(false);
          }}
        >
          <aside className="resource-drawer">
            <header>
              <div>
                <span>{form.id ? "CHỈNH SỬA" : "THÊM MỚI"}</span>
                <h2>{form.id ? "Chỉnh sửa tài nguyên" : "Thêm tài nguyên"}</h2>
              </div>
              <button type="button" onClick={() => setDrawerOpen(false)}>
                ×
              </button>
            </header>
            <form onSubmit={submitResource}>
              <label className="field">
                Loại tài nguyên *
                <select
                  value={form.resourceType}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      resourceType: event.target.value,
                      documentType: "",
                      documentNumber: "",
                      issueDate: "",
                      issuingOrganization: "",
                    }))
                  }
                >
                  {resourceTypes.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                Danh mục *
                <select
                  required
                  value={form.categoryId}
                  onChange={(event) => update("categoryId", event.target.value)}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              {form.resourceType === "EXECUTION_DOCUMENT" && (
                <label className="field">
                  Loại văn bản *
                  <select
                    required
                    value={form.documentType}
                    onChange={(event) =>
                      update("documentType", event.target.value)
                    }
                  >
                    <option value="">Chọn loại văn bản</option>
                    {documentTypes.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label className="field">
                {form.resourceType === "BROCHURE"
                  ? "Tên brochure"
                  : form.resourceType === "PDF_DOCUMENT"
                    ? "Tên tài liệu"
                    : "Tên văn bản"}{" "}
                *
                <input
                  required
                  maxLength={250}
                  value={form.title}
                  onChange={(event) => update("title", event.target.value)}
                />
              </label>
              {isDocument && (
                <div className="resource-form-grid">
                  <label className="field">
                    Số văn bản *
                    <input
                      required
                      maxLength={100}
                      value={form.documentNumber}
                      onChange={(event) =>
                        update("documentNumber", event.target.value)
                      }
                    />
                  </label>
                  <label className="field">
                    Ngày ban hành *
                    <input
                      required
                      type="date"
                      value={form.issueDate}
                      onChange={(event) =>
                        update("issueDate", event.target.value)
                      }
                    />
                  </label>
                  <label className="field full">
                    Đơn vị ban hành *
                    <input
                      required
                      maxLength={250}
                      value={form.issuingOrganization}
                      onChange={(event) =>
                        update("issuingOrganization", event.target.value)
                      }
                    />
                  </label>
                </div>
              )}
              <label
                className={`resource-dropzone${uploading ? " uploading" : ""}${dragging ? " dragging" : ""}`}
                onDragEnter={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "copy";
                  setDragging(true);
                }}
                onDragLeave={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null,
                    )
                  )
                    setDragging(false);
                }}
                onDrop={dropFile}
              >
                <input
                  type="file"
                  hidden
                  disabled={uploading}
                  accept={
                    pdfOnly
                      ? ".pdf,application/pdf"
                      : ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  }
                  onChange={chooseFile}
                />
                {form.fileUrl ? (
                  <div className="uploaded-file">
                    <b>{fileIcon(form.fileType)}</b>
                    <span>
                      <strong>{form.fileName}</strong>
                      <small>{fileSize(form.fileSize)}</small>
                    </span>
                    <em>{uploading ? "Đang tải…" : "Chọn file để thay thế"}</em>
                  </div>
                ) : (
                  <div>
                    <b>⇧</b>
                    <strong>
                      {uploading
                        ? "Đang tải file…"
                        : "Kéo thả file vào đây hoặc chọn file"}
                    </strong>
                    <small>
                      {pdfOnly
                        ? "Chỉ hỗ trợ PDF"
                        : "PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG"}{" "}
                      · tối đa 10 MB
                    </small>
                  </div>
                )}
              </label>
              {form.fileUrl && (
                <button
                  className="remove-file"
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      fileName: "",
                      fileUrl: "",
                      fileType: "",
                      fileSize: 0,
                    }))
                  }
                >
                  Gỡ file
                </button>
              )}
              <p className="form-message error">{error}</p>
              <footer>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="primary-button"
                  disabled={loading || uploading}
                >
                  {loading
                    ? "ĐANG LƯU…"
                    : form.id
                      ? "Lưu thay đổi"
                      : "Thêm tài nguyên"}
                </button>
              </footer>
            </form>
          </aside>
        </div>
      )}

      {categoryDrawer && (
        <div className="resource-overlay">
          <aside className="resource-drawer category-drawer">
            <header>
              <div>
                <span>DANH MỤC</span>
                <h2>
                  {categoryForm.id ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
                </h2>
              </div>
              <button type="button" onClick={() => setCategoryDrawer(false)}>
                ×
              </button>
            </header>
            <form onSubmit={submitCategory}>
              <label className="field">
                Tên danh mục *
                <input
                  autoFocus
                  required
                  maxLength={120}
                  value={categoryForm.name}
                  onChange={(event) =>
                    setCategoryForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </label>
              <p className="form-message error">{error}</p>
              <footer>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setCategoryDrawer(false)}
                >
                  Hủy
                </button>
                <button className="primary-button" disabled={loading}>
                  {loading ? "ĐANG LƯU…" : "Lưu danh mục"}
                </button>
              </footer>
            </form>
          </aside>
        </div>
      )}

      {confirming && (
        <div className="resource-overlay">
          <div
            className="resource-confirm"
            role="alertdialog"
            aria-modal="true"
          >
            <b>!</b>
            <h2>
              {confirming.kind === "resource"
                ? "Xóa tài nguyên?"
                : "Xóa danh mục?"}
            </h2>
            <p>
              {confirming.kind === "resource"
                ? "Bạn có chắc muốn xóa tài nguyên này? Hành động này có thể không thể khôi phục."
                : `Bạn có chắc muốn xóa danh mục “${confirming.name}”?`}
            </p>
            <div>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setConfirming(null)}
              >
                Hủy
              </button>
              <button
                className="danger-button"
                disabled={loading}
                type="button"
                onClick={confirmDelete}
              >
                {loading ? "ĐANG XÓA…" : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}

      {preview && (
        <div className="resource-overlay">
          <div className="resource-preview">
            <header>
              <div>
                <span>XEM TRƯỚC</span>
                <h2>{preview.title}</h2>
              </div>
              <button type="button" onClick={() => setPreview(null)}>
                ×
              </button>
            </header>
            {preview.fileType === "application/pdf" ? (
              <iframe src={preview.fileUrl} title={preview.title} />
            ) : preview.fileType.startsWith("image/") ? (
              <Image
                src={preview.fileUrl}
                alt={preview.title}
                width={1200}
                height={900}
                unoptimized
              />
            ) : (
              <div className="resource-preview-fallback">
                <b>{fileIcon(preview.fileType)}</b>
                <h3>{preview.fileName}</h3>
                <p>Định dạng này không thể xem trực tiếp trong trình duyệt.</p>
                <a
                  className="primary-button"
                  href={preview.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  Tải file
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
