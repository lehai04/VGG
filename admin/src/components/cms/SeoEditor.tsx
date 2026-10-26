"use client";
import { useEffect, useState } from "react";
import styles from "./SeoEditor.module.css";
type Values = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  [key: string]: unknown;
};
type Document = {
  values: Values;
  revision: string | null;
  publishedAt: string | null;
  path: string;
  origin: string;
};
async function api<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const response = await fetch(`/api/cms/website/${path}`, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok || !data.success)
    throw Error(data.message || "Chưa lưu được SEO.");
  return data.data;
}
export function SeoEditor({
  id,
  locale,
  title,
  canEdit,
  canPublish,
  onDirtyChange,
}: {
  id: string;
  locale: string;
  title: string;
  canEdit: boolean;
  canPublish: boolean;
  onDirtyChange: (dirty: boolean) => void;
}) {
  const [doc, setDoc] = useState<Document | null>(null);
  const [values, setValues] = useState<Values>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let active = true;
    api<Document>(`seo?id=${encodeURIComponent(id)}&locale=${locale}`)
      .then((result) => {
        if (active) {
          setDoc(result);
          setValues(result.values);
        }
      })
      .catch((error) => {
        if (active) setMessage(error.message);
      });
    return () => {
      active = false;
    };
  }, [id, locale]);
  const dirty = JSON.stringify(values) !== JSON.stringify(doc?.values ?? {});
  function change(key: string, value: string | boolean) {
    const next = { ...values, [key]: value };
    setValues(next);
    onDirtyChange(JSON.stringify(next) !== JSON.stringify(doc?.values ?? {}));
  }
  async function save() {
    if (!doc) return;
    setBusy(true);
    setMessage("");
    try {
      const result = await api<{ revision: string }>("seo", "PUT", {
        id,
        locale,
        values,
        revision: doc.revision,
      });
      setDoc({ ...doc, values, revision: result.revision });
      onDirtyChange(false);
      setMessage("Đã lưu bản nháp SEO. Website chính chưa thay đổi.");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function publish() {
    if (!doc?.revision || dirty) return;
    setBusy(true);
    try {
      await api("seo/publish", "POST", { id, locale, revision: doc.revision });
      setDoc({ ...doc, publishedAt: new Date().toISOString() });
      setMessage("Đã áp dụng SEO cho trang và ngôn ngữ đang chọn.");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const url = doc
    ? `${doc.origin.replace(/\/$/, "")}/${locale}${doc.path === "/" ? "" : doc.path}`
    : "";
  const canonicalPreview = (() => {
    try {
      return new URL(values.canonicalUrl || url, doc?.origin).href;
    } catch {
      return values.canonicalUrl || url;
    }
  })();
  return (
    <details className={styles.editor}>
      <summary>
        <span>SEO &amp; chia sẻ mạng xã hội</span>
        <small>
          {dirty
            ? "Chưa lưu"
            : doc?.publishedAt
              ? "Đã có cấu hình công khai"
              : "Thiết lập cho trang này"}
        </small>
      </summary>
      <p>
        SEO được lưu và áp dụng riêng cho từng trang/ngôn ngữ. Bản nháp không
        thay đổi nội dung đang công khai.
      </p>
      {message && (
        <p role="status" className={styles.notice}>
          {message}
        </p>
      )}
      {doc ? (
        <div className={styles.grid}>
          <div className={styles.fields}>
            <fieldset disabled={!canEdit || busy}>
              <legend>Thông tin tìm kiếm</legend>
              <label>
                Tiêu đề SEO
                <input
                  aria-label="Tiêu đề SEO"
                  maxLength={250}
                  value={values.metaTitle ?? ""}
                  placeholder={title}
                  onChange={(e) => change("metaTitle", e.target.value)}
                />
                <small>
                  {(values.metaTitle ?? "").length}/250 ký tự · viết rõ ràng và
                  riêng cho trang.
                </small>
              </label>
              <label>
                Mô tả SEO
                <textarea
                  aria-label="Mô tả SEO"
                  rows={4}
                  maxLength={1000}
                  value={values.metaDescription ?? ""}
                  placeholder="Tóm tắt chương trình, lợi ích và thông tin chính của trang."
                  onChange={(e) => change("metaDescription", e.target.value)}
                />
                <small>
                  {(values.metaDescription ?? "").length}/1.000 ký tự · kết quả
                  thực tế có thể được rút gọn theo thiết bị.
                </small>
              </label>
              <label>
                Đường dẫn chuẩn (canonical)
                <input
                  aria-label="Đường dẫn chuẩn (canonical)"
                  inputMode="url"
                  maxLength={1000}
                  value={values.canonicalUrl ?? ""}
                  placeholder={url}
                  onChange={(e) => change("canonicalUrl", e.target.value)}
                />
                <small>
                  Để trống để dùng URL mặc định. Chỉ dùng địa chỉ thuộc website
                  này.
                </small>
              </label>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={values.robotsIndex !== false}
                  onChange={(e) => change("robotsIndex", e.target.checked)}
                />
                Cho phép công cụ tìm kiếm lập chỉ mục
              </label>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={values.robotsFollow !== false}
                  onChange={(e) => change("robotsFollow", e.target.checked)}
                />
                Cho phép theo các liên kết trên trang
              </label>
            </fieldset>
            <details>
              <summary>Hình ảnh và nội dung khi chia sẻ</summary>
              <fieldset disabled={!canEdit || busy}>
                <legend>Open Graph</legend>
                {[
                  ["ogTitle", "Tiêu đề chia sẻ"],
                  ["ogDescription", "Mô tả chia sẻ"],
                  ["ogImage", "Đường dẫn ảnh chia sẻ"],
                  ["ogImageAlt", "Mô tả ảnh chia sẻ"],
                ].map(([key, label]) => (
                  <label key={key}>
                    {label}
                    <input
                      value={String(values[key] ?? "")}
                      maxLength={
                        key === "ogTitle"
                          ? 250
                          : key === "ogImageAlt"
                            ? 500
                            : 1000
                      }
                      onChange={(e) => change(key, e.target.value)}
                    />
                  </label>
                ))}
                <small>
                  Để trống tiêu đề/mô tả chia sẻ để dùng thông tin SEO. Ảnh dùng
                  đường dẫn trên website hoặc kho media nội bộ.
                </small>
              </fieldset>
            </details>
            <div className={styles.actions}>
              <button
                type="button"
                disabled={!canEdit || !dirty || busy}
                onClick={save}
              >
                Lưu nháp SEO
              </button>
              <button
                type="button"
                disabled={!dirty || busy}
                onClick={() => {
                  setValues(doc.values);
                  onDirtyChange(false);
                  setMessage("Đã hủy thay đổi SEO chưa lưu.");
                }}
              >
                Hủy sửa SEO
              </button>
              <button
                type="button"
                disabled={!canPublish || dirty || !doc.revision || busy}
                onClick={publish}
              >
                Áp dụng SEO
              </button>
            </div>
          </div>
          <aside className={styles.result}>
            <span className={styles.caption}>XEM TRƯỚC KẾT QUẢ TÌM KIẾM</span>
            <div className={styles.searchUrl}>{canonicalPreview}</div>
            <h3>{values.metaTitle || title}</h3>
            <p>
              {values.metaDescription ||
                "Mô tả ngắn của trang sẽ được hiển thị tại đây."}
            </p>
            <small>
              Minh họa cách trình bày; công cụ tìm kiếm có thể chọn tiêu đề và
              đoạn mô tả khác.
            </small>
            <a
              href="https://developers.google.com/search/docs/appearance/title-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hướng dẫn tiêu đề của Google ↗
            </a>
          </aside>
        </div>
      ) : (
        <p>Đang tải cấu hình SEO…</p>
      )}
    </details>
  );
}
