"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WebsiteManager.module.css";
import Image from "next/image";

type Field = {
  path: string;
  value: string;
  type: "text" | "image" | "url";
  section: string;
};
type Page = {
  id: string;
  title: string;
  path: string;
  kind: string;
  programmeState?: { status: "active" | "hidden" | "archived" };
  stateRevision?: string | null;
  field?: string;
  degree?: string;
  locales: string[];
  states: Array<{
    key: string;
    locale: string;
    published: boolean;
    updatedAt: string;
    author?: { fullName: string };
  }>;
};
type Document = {
  page: { id: string; title: string; path: string; fields: Field[] };
  values: Record<string, string>;
  revision: string | null;
  publishedAt: string | null;
};
type Media = { url: string; title: string; source?: string; usages: string[] };
const names: Record<string, string> = {
  cmsOverview: "Tổng quan có định dạng",
  html: "Nội dung có định dạng",
  cmsBasics: "Thông tin định danh và nhóm ngành",
  cmsCurriculum: "Bảng học phần",
  cmsObjectives: "Mục tiêu và chuẩn đầu ra",
  cmsRequirements: "Điều kiện dự tuyển",
  cmsApplication: "Hồ sơ và các bước đăng ký",
  cmsSupport: "Học bổng và chính sách hỗ trợ",
  quickFactsDetailed: "Thông tin nhanh",
  highlights: "Điểm nổi bật",
  goals: "Mục tiêu nghiên cứu",
  goalsHeading: "Tiêu đề mục tiêu",
  fieldsHeading: "Tiêu đề lĩnh vực",
  partnersHeading: "Tiêu đề đối tác",
  researchFields: "Lĩnh vực nghiên cứu",
  partners: "Đối tác",
  services: "Dịch vụ người học",
  learning: "Học tập và phát triển",
  community: "Cộng đồng",
  experience: "Trải nghiệm",
  moments: "Khoảnh khắc",
  programmeSearch: "Tìm kiếm chương trình",
  programmeCatalog: "Danh mục chương trình",
  ProgrammesPage: "Trang danh mục",
  ProgrammeDirectory: "Danh mục ngành",
  heroLead: "Giới thiệu banner",
  heroTitle: "Tiêu đề banner",
  heroSlogan: "Thông điệp banner",
  formIntro: "Giới thiệu form tư vấn",
  titleLines: "Các dòng tiêu đề",
  headingLines: "Các dòng đề mục",
  sub: "Mô tả",
  group: "Nhóm nội dung",
  logo: "Logo",
  pageContent: "Nội dung trang",
  hero: "Banner",
  section01: "01 · Tổng quan",
  section02: "02 · Điểm nổi bật",
  section03: "03 · Đối tượng",
  section04: "04 · Nghề nghiệp",
  section05: "05 · Chương trình",
  section06: "06 · Tuyển sinh",
  section07: "07 · Học phí",
  section08: "08 · Câu hỏi thường gặp",
  consultation: "Tư vấn",
  facts: "Thông tin tóm tắt",
  title: "Tiêu đề",
  text: "Nội dung",
  intro: "Giới thiệu",
  heading: "Tiêu đề",
  description: "Mô tả",
  image: "Hình ảnh",
  alt: "Mô tả ảnh",
  href: "Liên kết",
  label: "Nhãn",
  name: "Tên",
  role: "Chức vụ",
  leaders: "Đội ngũ lãnh đạo",
  introduction: "Giới thiệu",
  vision: "Tầm nhìn",
  mission: "Sứ mệnh",
  philosophy: "Triết lý giáo dục",
  values: "Giá trị cốt lõi",
  benefits: "Lợi thế",
  strategy: "Định hướng 2030",
  leadership: "Giới thiệu lãnh đạo",
  closing: "Lời mời",
  navigation: "Điều hướng chung",
  common: "Nhãn dùng chung",
  general: "Thông tin chung",
  englishTitle: "Tên tiếng Anh",
  duration: "Thời gian đào tạo",
  studyMode: "Hình thức đào tạo",
  intake: "Kỳ tuyển sinh",
  summary: "Giới thiệu ngắn",
  schedule: "Lịch học",
  tuition: "Học phí",
  overviewTitle: "Tiêu đề tổng quan",
  headline: "Thông điệp chính",
  overview: "Nội dung tổng quan",
  overviewImage: "Ảnh tổng quan",
  imageFallback: "Ảnh dự phòng",
  imageAlt: "Mô tả ảnh",
  heroImage: "Ảnh banner",
  kicker: "Dòng giới thiệu",
  subtitle: "Tiêu đề phụ",
  ribbonTitle: "Thông điệp nổi bật",
  tags: "Các nhãn nội dung",
  focusAreas: "Các hướng chuyên môn",
  audience: "Các nhóm người học",
  careers: "Cơ hội nghề nghiệp",
  faqs: "Câu hỏi thường gặp",
  question: "Câu hỏi",
  answer: "Trả lời",
  notices: "02 · Thông báo và lịch tuyển sinh",
  conditions: "03 · Điều kiện tuyển sinh",
  fees: "Học phí và học bổng",
  documents: "05 · Hồ sơ dự tuyển",
  process: "06 · Quy trình",
  faq: "07 · Câu hỏi thường gặp",
  "consultation-section": "08 · Đăng ký tư vấn",
  media: "Ảnh và mô tả ảnh",
  actions: "Các nút liên kết",
  "thong-bao-lich-tuyen-sinh": "02 · Thông báo và lịch tuyển sinh",
  "dieu-kien-phuong-thuc": "03 · Điều kiện và phương thức",
  "hoc-phi-hoc-bong": "04 · Học phí và học bổng",
  "ho-so-du-tuyen": "05 · Hồ sơ dự tuyển",
  "quy-trinh-tuyen-sinh": "06 · Quy trình tuyển sinh",
  "cau-hoi-thuong-gap": "07 · Câu hỏi thường gặp",
  "tu-van": "08 · Đăng ký tư vấn",
  interactive: "Nội dung tương tác",
  masterFaq: "FAQ · Thạc sĩ",
  doctorFaq: "FAQ · Tiến sĩ",
  masterProcess: "Quy trình · Thạc sĩ",
  doctorProcess: "Quy trình · Tiến sĩ",
  detail: "Tiêu đề chi tiết",
  items: "Các nội dung",
  action: "Nhãn nút thao tác",
};
export const cmsFieldLabel = (value: string) =>
  value
    .split(".")
    .filter((v) => v !== "pageContent")
    .map((v) =>
      /^\d+$/.test(v)
        ? `Mục ${Number(v) + 1}`
        : (names[v] ?? v.replace(/([a-z])([A-Z])/g, "$1 $2")),
    )
    .join(" / ");
const label = cmsFieldLabel;
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
  const result = await response.json();
  if (!response.ok || !result.success)
    throw new Error(result.message || "Không thể kết nối máy chủ.");
  return result.data;
}
export function WebsiteManager({
  pages: initialPages,
  canEdit,
  canPublish,
  canUpload,
}: {
  pages: Page[];
  canEdit: boolean;
  canPublish: boolean;
  canUpload: boolean;
}) {
  const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [locale, setLocale] = useState("vi");
  const [document, setDocument] = useState<Document | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [fieldSearch, setFieldSearch] = useState("");
  const [media, setMedia] = useState<Media[] | null>(null);
  const [mediaField, setMediaField] = useState<string | null>(null);
  const [mediaSearch, setMediaSearch] = useState("");
  const [mediaLimit, setMediaLimit] = useState(48);
  const [selectedAsset, setSelectedAsset] = useState<Media | null>(null);
  const [assetTitle, setAssetTitle] = useState("");
  const [assetSource, setAssetSource] = useState("");
  const [assetMessage, setAssetMessage] = useState("");
  const mediaDialog = useRef<HTMLDialogElement>(null);
  const generation = useRef(0);
  useEffect(() => {
    if (media && !mediaDialog.current?.open) mediaDialog.current?.showModal();
  }, [media]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  async function open(id: string, nextLocale = locale) {
    if (dirty && !window.confirm("Bỏ các thay đổi chưa lưu để mở trang khác?"))
      return;
    const request = ++generation.current;
    setBusy(true);
    setMessage("");
    setPreviewUrl("");
    try {
      const next = await api<Document>(
        `page?id=${encodeURIComponent(id)}&locale=${nextLocale}`,
      );
      if (request !== generation.current) return;
      setDocument(next);
      setValues(next.values);
      setDirty(false);
      setLocale(nextLocale);
      setFieldSearch("");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Không thể mở trang.",
      );
    } finally {
      if (request === generation.current) setBusy(false);
    }
  }
  const change = (path: string, value: string) => {
    setPreviewUrl("");
    setValues((current) => ({ ...current, [path]: value }));
    setDirty(true);
  };
  async function action(kind: "save" | "publish" | "preview" | "discard") {
    if (!document) return;
    if (
      kind === "discard" &&
      !window.confirm("Bỏ bản nháp? Nội dung đã xuất bản được giữ nguyên.")
    )
      return;
    setBusy(true);
    setMessage("");
    try {
      const body = {
        id: document.page.id,
        locale,
        revision: document.revision,
      };
      if (kind === "save") {
        const result = await api<{ revision: string }>("page", "PUT", {
          ...body,
          values,
        });
        setDocument({
          ...document,
          revision: result.revision,
          values: { ...values },
        });
        setDirty(false);
        setMessage("Đã lưu bản nháp. Website công khai chưa thay đổi.");
      } else if (kind === "preview") {
        const result = await api<{ url: string }>("preview", "POST", body);
        setPreviewUrl(result.url);
        window.open(result.url, "_blank", "noopener,noreferrer");
        setMessage("Đã mở bản xem trước, liên kết hết hạn sau 10 phút.");
      } else if (kind === "publish") {
        await api("publish", "POST", body);
        setMessage("Đã xuất bản. Tải lại trang công khai để xem nội dung mới.");
        const next = await api<Document>(
          `page?id=${encodeURIComponent(document.page.id)}&locale=${locale}`,
        );
        setDocument(next);
      } else {
        await api("page", "DELETE", body);
        const next = await api<Document>(
          `page?id=${encodeURIComponent(body.id)}&locale=${locale}`,
        );
        setDocument(next);
        setValues(next.values);
        setDirty(false);
        setMessage("Đã bỏ bản nháp.");
      }
      const result = await api<{ pages: Page[] }>("pages");
      setPages(result.pages.filter((page) => initialPages.some((allowed) => allowed.id === page.id)));
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Không thể thực hiện thao tác.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function chooseImage(path: string) {
    setMediaSearch("");
    setMediaLimit(48);
    setSelectedAsset(null);
    setAssetMessage("");
    setBusy(true);
    setMessage("");
    try {
      const result = await api<{ media: Media[] }>("media");
      setMedia(result.media);
      setMediaField(path);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Không thể mở kho ảnh.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function upload(file: File | undefined, path: string) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setMessage("Ảnh tối đa 8 MB.");
      return;
    }
    setBusy(true);
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/cms/upload-image", {
        method: "POST",
        body,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      await api("media", "POST", { url: result.data.url, title: file.name });
      change(path, result.data.url);
      setMessage(
        "Đã tải ảnh. Hãy lưu bản nháp và xem trước trước khi xuất bản.",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể tải ảnh.");
    } finally {
      setBusy(false);
    }
  }
  async function saveAsset() {
    if (!selectedAsset) return;
    setBusy(true);
    setAssetMessage("");
    try {
      await api("media", "POST", {
        url: selectedAsset.url,
        title: assetTitle,
        source: assetSource,
      });
      setMedia(
        (current) =>
          current?.map((item) =>
            item.url === selectedAsset.url
              ? { ...item, title: assetTitle, source: assetSource }
              : item,
          ) ?? null,
      );
      setAssetMessage(
        "Đã lưu tên và nguồn ảnh trong thư viện. Alt text hiển thị được sửa ở trường mô tả ảnh của từng trang.",
      );
    } catch (error) {
      setAssetMessage(
        error instanceof Error ? error.message : "Không thể lưu thông tin ảnh.",
      );
    } finally {
      setBusy(false);
    }
  }
  const visible = pages.filter(
    (p) =>
      p.locales.includes(locale) &&
      `${p.title} ${p.path}`
        .toLocaleLowerCase("vi")
        .includes(search.toLocaleLowerCase("vi")) &&
      (status === "all" ||
        p.states.some(
          (s) =>
            s.locale === locale &&
            (status === "published" ? s.published : !s.published),
        )),
  );
  const groups = document
    ? [...new Set(document.page.fields.map((f) => f.section))]
    : [];
  return (
    <div className={styles.manager}>
      {previewUrl && (
        <p>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Mở bản xem trước đã tạo →
          </a>
        </p>
      )}
      <div className={styles.actions}>
        <button
          type="button"
          disabled={busy}
          onClick={() => void chooseImage("")}
        >
          Thư viện ảnh
        </button>
        <a href="/admin/resources">Tài liệu / PDF</a>
      </div>
      <div className={styles.stats} aria-label="Thống kê nội dung">
        <div>
          <strong>{pages.length}</strong>
          <span>Trang / nhóm nội dung</span>
        </div>
        <div>
          <strong>
            {pages.filter((p) => p.states.some((s) => s.published)).length}
          </strong>
          <span>Đã xuất bản qua CMS</span>
        </div>
        <div>
          <strong>
            {pages.filter((p) => p.states.some((s) => !s.published)).length}
          </strong>
          <span>Có bản nháp đã lưu</span>
        </div>
      </div>
      <p role="status" aria-live="polite" className={styles.message}>
        {message}
      </p>
      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <label>
            Ngôn ngữ
            <select
              value={locale}
              disabled={busy}
              onChange={(e) => {
                if (document) {
                  const selected =
                    pages.find(
                      (page) =>
                        page.id === document.page.id &&
                        page.locales.includes(e.target.value),
                    ) ??
                    pages.find((page) => page.locales.includes(e.target.value));
                  if (selected) void open(selected.id, e.target.value);
                } else setLocale(e.target.value);
              }}
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </label>
          <label>
            Tìm trang
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tên hoặc đường dẫn…"
            />
          </label>
          <label>
            Trạng thái
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="draft">Có bản nháp</option>
              <option value="published">Đã xuất bản qua CMS</option>
            </select>
          </label>
          <nav aria-label="Danh sách trang" className={styles.pages}>
            {visible.map((p) => (
              <button
                key={p.id}
                disabled={busy}
                type="button"
                aria-pressed={document?.page.id === p.id}
                onClick={() => void open(p.id)}
              >
                <strong>{p.title}</strong>
                <small>
                  {p.kind === "messages"
                    ? "Dùng chung trên toàn website"
                    : p.path}
                </small>
                <small>
                  {p.states
                    .filter((s) => s.locale === locale)
                    .map(
                      (s) =>
                        `${s.published ? "Xuất bản" : "Nháp"} · ${new Date(s.updatedAt).toLocaleString("vi-VN")}`,
                    )
                    .join(" / ") || "Đang dùng nội dung gốc"}
                </small>
              </button>
            ))}
          </nav>
        </aside>
        <section className={styles.editor} aria-busy={busy}>
          {!document ? (
            <div className={styles.empty}>
              <h2>Chọn trang để chỉnh sửa</h2>
              <p>
                Các trường lấy từ nội dung thực tế. Chưa xuất bản qua CMS nghĩa
                là website đang dùng nội dung gốc.
              </p>
              <p>
                Ảnh và văn bản được giữ trong bố cục hiện có; mã ngành, cấu trúc
                chương trình và logic biểu mẫu được bảo vệ.
              </p>
              <a href="/admin/news">Quản lý tin tức</a> ·{" "}
              <a href="/admin/resources">Quản lý tài liệu / PDF</a>
            </div>
          ) : (
            <>
              <header className={styles.editorHead}>
                <h2>{document.page.title}</h2>
                <p>
                  {locale.toUpperCase()} · {document.page.path}{" "}
                  {document.page.id.startsWith("shared:") &&
                    "· Thay đổi áp dụng cho tất cả trang sử dụng nhãn này."}
                </p>
                <p>
                  {dirty
                    ? "Có thay đổi chưa lưu"
                    : "Không có thay đổi chưa lưu"}{" "}
                  ·{" "}
                  {document.publishedAt
                    ? `Xuất bản gần nhất: ${new Date(document.publishedAt).toLocaleString("vi-VN")}`
                    : "Đang dùng nội dung gốc"}
                </p>
                <div className={styles.actions}>
                  <button
                    type="button"
                    disabled={busy || !canEdit || !dirty}
                    onClick={() => void action("save")}
                  >
                    Lưu bản nháp
                  </button>
                  <button
                    type="button"
                    disabled={busy || dirty || !document.revision}
                    onClick={() => void action("preview")}
                  >
                    Xem trước
                  </button>
                  <button
                    className={styles.publish}
                    type="button"
                    disabled={
                      busy || dirty || !document.revision || !canPublish
                    }
                    onClick={() => void action("publish")}
                  >
                    Xuất bản
                  </button>
                  <button
                    type="button"
                    disabled={busy || !document.revision || !canEdit}
                    onClick={() => void action("discard")}
                  >
                    Bỏ bản nháp
                  </button>
                  <button
                    type="button"
                    disabled={busy || !dirty}
                    onClick={() => {
                      setValues(document.values);
                      setDirty(false);
                      setMessage("Đã hủy các thay đổi chưa lưu.");
                    }}
                  >
                    Hủy thay đổi chưa lưu
                  </button>
                </div>
                <label>
                  Tìm nội dung trong trang
                  <input
                    type="search"
                    value={fieldSearch}
                    onChange={(e) => setFieldSearch(e.target.value)}
                    placeholder="Từ khóa, tiêu đề hoặc mô tả…"
                  />
                </label>
              </header>
              {groups.map((group) => {
                const fields = document.page.fields.filter(
                  (f) =>
                    f.section === group &&
                    `${label(f.path)} ${values[f.path] ?? f.value}`
                      .toLowerCase()
                      .includes(fieldSearch.toLowerCase()),
                );
                return fields.length ? (
                  <details
                    className={styles.group}
                    key={group}
                    open={fieldSearch ? true : undefined}
                  >
                    <summary>
                      {label(group)} <small>({fields.length} trường)</small>
                    </summary>
                    <div className={styles.fields}>
                      {fields.map((f) => (
                        <div className={styles.field} key={f.path}>
                          <label htmlFor={`cms-${f.path}`}>
                            {/\.(text|url|image)_\d+$/.test(f.path)
                              ? `${label(f.section)} / ${f.value.trim().slice(0, 90)}`
                              : label(f.path)}
                          </label>
                          {f.type === "text" ? (
                            <textarea
                              id={`cms-${f.path}`}
                              rows={
                                (values[f.path] ?? f.value).length > 160 ? 4 : 2
                              }
                              maxLength={20000}
                              disabled={!canEdit || busy}
                              value={values[f.path] ?? f.value}
                              onChange={(e) => change(f.path, e.target.value)}
                            />
                          ) : (
                            <input
                              id={`cms-${f.path}`}
                              disabled={!canEdit || busy}
                              value={values[f.path] ?? f.value}
                              onChange={(e) => change(f.path, e.target.value)}
                            />
                          )}
                          {f.type === "image" && (
                            <>
                              <Image
                                unoptimized
                                width={280}
                                height={160}
                                className={styles.preview}
                                src={values[f.path] ?? f.value}
                                alt="Ảnh đang chọn"
                              />
                              <div className={styles.actions}>
                                <button
                                  type="button"
                                  disabled={!canEdit || busy}
                                  onClick={() => void chooseImage(f.path)}
                                >
                                  Chọn ảnh có sẵn
                                </button>
                                {canUpload && canEdit && (
                                  <label className={styles.upload}>
                                    Tải ảnh mới
                                    <input
                                      type="file"
                                      accept="image/jpeg,image/png,image/webp,image/avif"
                                      disabled={busy}
                                      onChange={(e) =>
                                        void upload(e.target.files?.[0], f.path)
                                      }
                                    />
                                  </label>
                                )}
                              </div>
                            </>
                          )}
                          <button
                            className={styles.reset}
                            type="button"
                            disabled={!canEdit || busy || !(f.path in values)}
                            onClick={() => {
                              setValues((current) => {
                                const next = { ...current };
                                delete next[f.path];
                                return next;
                              });
                              setDirty(true);
                            }}
                          >
                            Dùng nội dung gốc
                          </button>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : null;
              })}
            </>
          )}
        </section>
      </div>
      {media && (
        <div className={styles.backdrop}>
          <dialog
            ref={mediaDialog}
            aria-label="Thư viện ảnh"
            className={styles.library}
            onCancel={() => {
              setMedia(null);
              setMediaField(null);
            }}
          >
            <button
              autoFocus
              type="button"
              onClick={() => {
                setMedia(null);
                setMediaField(null);
              }}
            >
              Đóng thư viện
            </button>
            <h2>Thư viện ảnh hiện có</h2>
            <p>
              Ảnh đang được dùng được giữ lại trong kho. PDF quản lý tại mục Tài
              nguyên.
            </p>
            <label>
              Tìm ảnh theo tên, đường dẫn hoặc nơi sử dụng
              <input
                type="search"
                value={mediaSearch}
                onChange={(event) => {
                  setMediaSearch(event.target.value);
                  setMediaLimit(48);
                }}
              />
            </label>
            <p>
              {media.length} ảnh trong dự án, kho nội bộ và các nguồn đang dùng.
              Kho ảnh không có chức năng xóa tệp để bảo vệ nội dung hiện có.
            </p>
            {!mediaField && selectedAsset && (
              <div className={styles.field}>
                <h3>Thông tin ảnh</h3>
                <Image
                  unoptimized
                  width={280}
                  height={160}
                  className={styles.preview}
                  src={selectedAsset.url}
                  alt={assetTitle}
                />
                <p>{selectedAsset.url}</p>
                <label>
                  Tên ảnh
                  <input
                    maxLength={250}
                    disabled={!canUpload || busy}
                    value={assetTitle}
                    onChange={(event) => setAssetTitle(event.target.value)}
                  />
                </label>
                <label>
                  Nguồn ảnh
                  <input
                    maxLength={1000}
                    disabled={!canUpload || busy}
                    value={assetSource}
                    onChange={(event) => setAssetSource(event.target.value)}
                  />
                </label>
                <button
                  type="button"
                  disabled={!canUpload || busy || !assetTitle.trim()}
                  onClick={() => void saveAsset()}
                >
                  Lưu thông tin ảnh
                </button>
                <p role="status">{assetMessage}</p>
              </div>
            )}
            <div className={styles.mediaGrid}>
              {media
                .filter((item) =>
                  `${item.title} ${item.url} ${item.usages.join(" ")}`
                    .toLocaleLowerCase("vi")
                    .includes(mediaSearch.toLocaleLowerCase("vi")),
                )
                .slice(0, mediaLimit)
                .map((item) => (
                  <button
                    type="button"
                    key={item.url}
                    onClick={() => {
                      if (mediaField) {
                        change(mediaField, item.url);
                        setMedia(null);
                        setMediaField(null);
                      } else {
                        setSelectedAsset(item);
                        setAssetTitle(item.title);
                        setAssetSource(item.source ?? "");
                        setAssetMessage("");
                      }
                    }}
                  >
                    <Image
                      unoptimized
                      width={280}
                      height={140}
                      src={item.url}
                      alt={item.title}
                      loading="lazy"
                    />
                    <strong>{item.title}</strong>
                    <small>
                      {item.url.startsWith("/images/")
                        ? "Ảnh trong dự án"
                        : item.url.startsWith("/api/media/")
                          ? "Kho nội bộ / API"
                          : "Ảnh từ URL ngoài"}
                    </small>
                    {item.source && <small>Nguồn: {item.source}</small>}
                    <small>
                      {item.usages.length
                        ? `Đang dùng: ${item.usages.join(", ")}`
                        : "Chưa dùng trên trang CMS"}
                    </small>
                  </button>
                ))}
            </div>
            {media.length > mediaLimit && (
              <button
                type="button"
                onClick={() => setMediaLimit((count) => count + 48)}
              >
                Xem thêm ảnh
              </button>
            )}
          </dialog>
        </div>
      )}
    </div>
  );
}
