"use client";
import { useEffect, useRef, useState } from "react";
import { WebsiteManager, cmsFieldLabel } from "./WebsiteManager";
import { DevicePreview } from "./DevicePreview";
import { SeoEditor } from "./SeoEditor";
import { RichTextEditor } from "./RichTextEditor";
import { VersionHistory } from "./VersionHistory";
import styles from "./VisualWebsiteManager.module.css";
import { VisualImagePicker } from "./VisualImagePicker";
import { VisualLists } from "./VisualLists";
import { VisualStructureEditor } from "./VisualStructureEditor";
import { VisualBannerEditor } from "./VisualBannerEditor";
type Props = Parameters<typeof WebsiteManager>[0];
type Field = { path: string; value: string; type: string; section: string };
type Document = {
  page: {
    fields: Field[];
    path: string;
    publicOrigin?: string;
    sections?: Array<{ id: string; title: string }>;
    collections?: string[];
    defaults?: Record<string, unknown>;
  };
  values: Record<string, string>;
  revision: string | null;
};
type Session = { url: string; origin: string; channel: string };
async function request<T>(
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
  const result = await response.json();
  if (!response.ok || !result.success)
    throw Error(result.message || "Không thể kết nối CMS.");
  return result.data;
}
export function VisualWebsiteManager(props: Props) {
  const [id, setId] = useState(props.pages[0]?.id ?? "home");
  const [locale, setLocale] = useState("vi");
  const [doc, setDoc] = useState<Document | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [session, setSession] = useState<Session | null>(null);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [panel, setPanel] = useState<"edit" | "preview">("edit");
  const [notice, setNotice] = useState("");
  const [extraDirty, setExtraDirty] = useState<Record<string, boolean>>({});
  const frame = useRef<HTMLIFrameElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);
  const focusSelection = useRef(false);
  const beforeInput = useRef("");
  const scrollY = useRef(0);
  function selectPage(nextId: string, nextLocale = locale) {
    scrollY.current = 0;
    setDoc(null);
    setSession(null);
    setError("");
    setNotice("");
    setExtraDirty({});
    setId(nextId);
    setLocale(nextLocale);
  }
  useEffect(() => {
    let active = true;
    request<Document>(`page?id=${encodeURIComponent(id)}&locale=${locale}`)
      .then((data) => {
        if (active) {
          setDoc(data);
          setValues(data.values);
          setSelected(data.page.fields[0]?.path ?? "");
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [id, locale]);
  useEffect(() => {
    if (!doc) return;
    let active = true;
    const timer = setTimeout(() => {
      (props.canEdit
        ? request<Session>("editor-session", "POST", { id, locale, values })
        : doc.revision
          ? request<{ url: string }>("preview", "POST", { id, locale }).then(
              (result) => ({
                ...result,
                origin: new URL(result.url).origin,
                channel: "",
              }),
            )
          : Promise.resolve({
              url: `${doc.page.publicOrigin ?? ""}/${locale}${doc.page.path === "/" ? "" : doc.page.path}`,
              origin: new URL(doc.page.publicOrigin ?? window.location.origin)
                .origin,
              channel: "",
            })
      )
        .then((data) => {
          if (active) setSession(data);
        })
        .catch((e) => {
          if (active) setError(e.message);
        });
    }, 1000);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [doc, id, locale, values, props.canEdit]);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        !session ||
        event.origin !== session.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.channel !== session.channel
      )
        return;
      if (event.data?.type === "vgg-cms-scroll") {
        if (Number.isFinite(event.data.y)) scrollY.current = event.data.y;
        return;
      }
      if (event.data?.type === "vgg-cms-ready") {
        frame.current?.contentWindow?.postMessage(
          {
            type: "vgg-cms-restore",
            channel: session.channel,
            y: scrollY.current,
            path: selected,
          },
          session.origin,
        );
        return;
      }
      if (event.data?.type !== "vgg-cms-select") return;
      if (doc?.page.fields.some((field) => field.path === event.data.path)) {
        focusSelection.current = true;
        setSelected(event.data.path);
        setPanel("edit");
      }
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [session, doc, selected]);
  useEffect(() => {
    if (focusSelection.current && panel === "edit") {
      contentInput.current?.focus({ preventScroll: true });
      focusSelection.current = false;
    }
  }, [selected, panel]);
  useEffect(() => {
    if (!session) return;
    frame.current?.contentWindow?.postMessage(
      { type: "vgg-cms-highlight", channel: session.channel, path: selected },
      session.origin,
    );
  }, [session, selected]);
  const field = doc?.page.fields.find((item) => item.path === selected);
  const section = field?.section;
  const fields =
    doc?.page.fields.filter((item) => item.section === section) ?? [];
  const fingerprint = (input: Record<string, string>) =>
    JSON.stringify(
      Object.keys(input)
        .sort()
        .map((key) => [key, input[key]]),
    );
  const dirty =
    fingerprint(values) !== fingerprint(doc?.values ?? {}) ||
    Object.values(extraDirty).some(Boolean);
  async function save() {
    if (!doc) return;
    setBusy(true);
    setError("");
    try {
      const merged = { ...doc.values };
      for (const item of fields) {
        if (Object.hasOwn(values, item.path))
          merged[item.path] = values[item.path];
        else delete merged[item.path];
      }
      const selectedValues = Object.fromEntries(
        fields
          .filter((item) => Object.hasOwn(merged, item.path))
          .map((item) => [item.path, merged[item.path]]),
      );
      const result = await request<{
        revision: string;
        values: Record<string, string>;
      }>("section", "PATCH", {
        id,
        locale,
        section,
        revision: doc.revision,
        values: selectedValues,
      });
      setDoc({ ...doc, values: result.values, revision: result.revision });
      setNotice("Đã lưu bản nháp của nhóm đang chọn.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function saveList(section: string, patch: Record<string, string>) {
    if (!doc) return;
    setBusy(true);
    setError("");
    try {
      const result = await request<{
        revision: string;
        values: Record<string, string>;
      }>("section", "PATCH", {
        id,
        locale,
        section,
        revision: doc.revision,
        values: patch,
      });
      const fresh = await request<Document>(
        `page?id=${encodeURIComponent(id)}&locale=${locale}`,
      );
      setDoc({ ...fresh, revision: result.revision, values: result.values });
      setValues((current) => {
        const next = { ...current, ...patch };
        const prefix =
          (section.startsWith("list:") ? section.slice(5) : "$no-fields") + ".";
        for (const path of Object.keys(next))
          if (path.startsWith(prefix)) delete next[path];
        return next;
      });
    } catch (e) {
      setError((e as Error).message);
      throw e;
    } finally {
      setBusy(false);
    }
  }
  async function publish() {
    if (!doc?.revision || dirty) return;
    setBusy(true);
    try {
      await request("publish", "POST", { id, locale, revision: doc.revision });
      setError("");
      setNotice("Đã xuất bản nội dung đã lưu.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={styles.manager}>
      <div className={styles.bar}>
        <strong>Chỉnh sửa trực quan</strong>
        <label>
          Trang đang chỉnh sửa
          <select
            aria-label="Trang"
            disabled={busy}
            value={id}
            onChange={(e) => {
              if (!dirty || window.confirm("Bỏ các thay đổi chưa lưu?"))
                selectPage(e.target.value);
            }}
          >
            {props.pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ngôn ngữ
          <select
            aria-label="Ngôn ngữ"
            disabled={busy}
            value={locale}
            onChange={(e) => {
              if (!dirty || window.confirm("Bỏ các thay đổi chưa lưu?"))
                selectPage(id, e.target.value);
            }}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </label>
        <button
          className={styles.publish}
          disabled={busy || dirty || !doc?.revision || !props.canPublish}
          onClick={publish}
        >
          Xuất bản
        </button>
      </div>
      <div className={styles.statusLine}>
        <span className={styles.status} data-dirty={dirty}>
          {!doc
            ? "Đang tải nội dung"
            : dirty
              ? "Có thay đổi chưa lưu"
              : doc.revision
                ? "Bản nháp đã lưu"
                : "Nội dung hiện tại"}
        </span>
        <small>
          {props.canEdit
            ? "Lưu từng nhóm trước khi xuất bản."
            : "Bạn đang có quyền xem nội dung."}
        </small>
      </div>
      {(error || notice) && (
        <p className={styles.notice} role={error ? "alert" : "status"}>
          {error || notice}
        </p>
      )}
      <div
        className={styles.workspaceTabs}
        role="group"
        aria-label="Chế độ làm việc"
      >
        <button
          aria-pressed={panel === "edit"}
          onClick={() => setPanel("edit")}
          type="button"
        >
          Chỉnh sửa nội dung
        </button>
        <button
          aria-pressed={panel === "preview"}
          onClick={() => setPanel("preview")}
          type="button"
        >
          Xem trước website
        </button>
      </div>
      <div className={styles.studio} data-panel={panel}>
        <DevicePreview src={session?.url} frameRef={frame} />
        <aside
          className={styles.inspector}
          aria-label="Bảng chỉnh sửa nội dung"
        >
          <header className={styles.inspectorHeader}>
            <h2>Nội dung được phép sửa</h2>
            <p>Chọn nhóm và trường cần cập nhật.</p>
          </header>
          <label>
            Nhóm nội dung
            <select
              aria-label="Section"
              value={section ?? ""}
              onChange={(event) =>
                setSelected(
                  doc?.page.fields.find(
                    (item) => item.section === event.target.value,
                  )?.path ?? "",
                )
              }
            >
              {[...new Set(doc?.page.fields.map((item) => item.section))].map(
                (group, index) => (
                  <option value={group} key={group}>
                    Section {index + 1} ·{" "}
                    {doc?.page.sections?.find((item) => item.id === group)
                      ?.title ??
                      cmsFieldLabel(group).replace(/^\d+\s*·\s*/, "")}
                  </option>
                ),
              )}
            </select>
          </label>
          <label>
            Trường nội dung
            <select
              aria-label="Khối nội dung"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {doc?.page.fields
                .filter((item) => item.section === section)
                .map((item) => (
                  <option key={item.path} value={item.path}>
                    {cmsFieldLabel(item.path)}
                  </option>
                ))}
            </select>
          </label>
          {field && (
            <>
              <div className={styles.fieldHeading}>
                <span>
                  {cmsFieldLabel(field.path.split(".").slice(-2).join("."))}
                </span>
                <span className={styles.fieldType}>
                  {field.type === "image"
                    ? "Hình ảnh"
                    : field.type === "url"
                      ? "Liên kết"
                      : "Văn bản"}
                </span>
              </div>
              {field.path === "cmsOverview.0.html" && props.canEdit && !busy ? <RichTextEditor value={values[field.path] ?? field.value} onChange={(value) => setValues((current) => ({ ...current, [field.path]: value }))} onImportedExcerpt={() => {}} /> : <textarea
                ref={contentInput}
                aria-label="Nội dung được chọn"
                onFocus={() => { beforeInput.current = values[field.path] ?? field.value; }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setValues((current) => ({ ...current, [field.path]: beforeInput.current }));
                    event.currentTarget.blur();
                  } else if (event.key === "Enter" && !event.shiftKey && /(?:title|heading|\.text)$/i.test(field.path)) {
                    event.preventDefault();
                    event.currentTarget.blur();
                  }
                }}
                rows={field.type === "text" ? 8 : 3}
                disabled={!props.canEdit || busy}
                maxLength={20000}
                value={values[field.path] ?? field.value}
                onChange={(e) => {
                  setNotice("");
                  setValues({ ...values, [field.path]: e.target.value });
                }}
              />}
              {field.path.endsWith(".text") && doc?.page.fields.filter((item) => item.path === field.path.replace(/\.text$/, ".href") && item.type === "url").map((link) => (
                <label key={link.path}>Liên kết của nút
                  <input type="text" disabled={!props.canEdit || busy} value={values[link.path] ?? link.value} onChange={(event) => setValues((current) => ({ ...current, [link.path]: event.target.value }))} />
                </label>
              ))}
              <div className={styles.fieldMeta}>
                <span>
                  {field.type === "text"
                    ? "Giữ nội dung rõ ràng, tự nhiên."
                    : "Dùng đường dẫn hợp lệ từ thư viện hoặc website."}
                </span>
                <span>
                  {(values[field.path] ?? field.value).length.toLocaleString(
                    "vi-VN",
                  )}{" "}
                  ký tự
                </span>
              </div>
              {field.type === "image" && props.canEdit && (
                <VisualImagePicker
                  value={values[field.path] ?? field.value}
                  canUpload={props.canUpload}
                  onChange={(url) =>
                    setValues({ ...values, [field.path]: url })
                  }
                />
              )}
              <small>
                {fields.length} trường trong nhóm · chỉ lưu nhóm đang chọn
              </small>
              <div className={styles.actions}>
                <button disabled={busy || !props.canEdit} onClick={save}>
                  Lưu nhóm này
                </button>
                <button
                  disabled={busy}
                  onClick={() => {
                    const next = { ...values };
                    for (const item of fields) {
                      if (Object.hasOwn(doc!.values, item.path))
                        next[item.path] = doc!.values[item.path];
                      else delete next[item.path];
                    }
                    setValues(next);
                  }}
                >
                  Hủy thay đổi nhóm
                </button>
              </div>
              <details>
                <summary>Thông tin trường</summary>
                <small className={styles.sourcePath}>{field.path}</small>
              </details>
            </>
          )}
          {dirty && (
            <p>Có thay đổi chưa lưu. Nội dung công khai chưa thay đổi.</p>
          )}
          {doc?.page.collections && (
            <VisualLists
              key={id + locale}
              paths={doc.page.collections}
              onDirtyChange={(flag) =>
                setExtraDirty((current) => ({ ...current, lists: flag }))
              }
              canUpload={props.canUpload}
              defaults={doc.page.defaults ?? {}}
              values={doc.values}
              onSave={saveList}
              disabled={busy || !props.canEdit}
            />
          )}
          {doc?.page.sections &&
            ([
              "home",
              "discover",
              "research",
              "student-success",
              "catalogue",
              "admissions",
            ].includes(id) ||
              id.startsWith("programme:")) && (
              <VisualStructureEditor
                key={"layout" + id + locale}
                sections={doc.page.sections}
                onDirtyChange={(flag) =>
                  setExtraDirty((current) => ({ ...current, structure: flag }))
                }
                value={doc.values.$layout}
                onSave={saveList}
                disabled={busy || !props.canEdit}
              />
            )}
          {doc && ["home", "discover"].includes(id) && (
            <VisualBannerEditor
              key={"banner" + id + locale}
              value={doc.values.$banner}
              onDirtyChange={(flag) =>
                setExtraDirty((current) => ({ ...current, banner: flag }))
              }
              onSave={saveList}
              disabled={busy || !props.canEdit}
              canUpload={props.canUpload}
            />
          )}
        </aside>
      </div>
      {doc && <VersionHistory key={`history:${id}:${locale}`} id={id} locale={locale} revision={doc.revision} disabled={busy||dirty} canRestore={props.canEdit} onBusyChange={setBusy} onRestored={async()=>{
        const fresh=await request<Document>(`page?id=${encodeURIComponent(id)}&locale=${locale}`);
        setDoc(fresh);setValues(fresh.values);setExtraDirty({});setSelected(fresh.page.fields[0]?.path??"");setNotice("Đã khôi phục bản nháp. Website chính chưa thay đổi.");
      }} />}
      {!["shared", "messages"].includes(
        props.pages.find((page) => page.id === id)?.kind ?? "",
      ) && (
        <SeoEditor
          key={`seo:${id}:${locale}`}
          id={id}
          locale={locale}
          title={props.pages.find((page) => page.id === id)?.title ?? ""}
          canEdit={props.canEdit}
          canPublish={props.canPublish}
          onDirtyChange={(flag) =>
            setExtraDirty((current) => ({ ...current, seo: flag }))
          }
        />
      )}
      <p className={styles.scopeNote}>
        Bố cục và kiểu trình bày được giữ nguyên khi sửa chữ/ảnh. Thêm, ẩn hoặc
        sắp xếp section là thao tác riêng trong mục Cấu trúc.
      </p>
      <details className={styles.advanced}>
        <summary>Công cụ nâng cao · sửa theo trường và thư viện ảnh</summary>
        <WebsiteManager {...props} />
      </details>
    </div>
  );
}
