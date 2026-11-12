"use client";
import { useWebsiteCopy } from "@/i18n/components/WebsiteCopy";
import { useLocale } from "@/i18n/components/LocaleProvider";
import { EmptyContent } from "@/shared/components/EmptyContent";
import { Fragment, type FormEvent, useEffect, useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Search,
  X,
} from "lucide-react";
import type { PublicResource, ResourceCatalogue } from "../data";
import { documentTypeLabels, resourceTypeLabels } from "../data";
import styles from "./ResourcesLanding.module.css";

const formatSize = (bytes: number) =>
  bytes >= 1048576
    ? `${(bytes / 1048576).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
const ITEMS_PER_PAGE = 5;

function FileName({ name }: { name: string }) {
  const parts = name.split(/(?<=[._-])/u);
  return parts.map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <wbr />}
      {part}
    </Fragment>
  ));
}

export function ResourcesExplorer({ resources, categories, resourceTypes: types }: ResourceCatalogue) {
  const t = useWebsiteCopy();
  const { locale } = useLocale();
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [preview, setPreview] = useState<PublicResource | null>(null);
  useEffect(() => {
    if (!preview) return;
    const mobile = window.matchMedia("(width < 1024px)");
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    const syncScroll = () => {
      document.body.style.overflow = mobile.matches ? "hidden" : previousOverflow;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobile.matches) setPreview(null);
    };
    syncScroll();
    if (mobile.matches) document.querySelector<HTMLButtonElement>('[role="dialog"] button')?.focus();
    mobile.addEventListener("change", syncScroll);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      mobile.removeEventListener("change", syncScroll);
      document.removeEventListener("keydown", closeOnEscape);
      if (mobile.matches) trigger?.focus();
    };
  }, [preview]);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const keyword = appliedQuery.trim().toLocaleLowerCase("vi");
    return resources.filter((item) => {
      const haystack = [
        item.title,
        item.description,
        item.documentNumber,
        item.issuingOrganization,
        item.fileName,
        t(item.title),
        t(item.description),
        t(item.issuingOrganization),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("vi");
      return (
        (!keyword || haystack.includes(keyword)) &&
        (category === "ALL" || item.category.id === category) &&
        (type === "ALL" || item.resourceType === type)
      );
    });
  }, [resources, appliedQuery, category, type, t]);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visibleResources = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const fileEndpoint = (item: PublicResource, download = false) =>
    `/api/resources/file?url=${encodeURIComponent(item.fileUrl)}&name=${encodeURIComponent(item.fileName)}${download ? "&download=1" : ""}`;
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedQuery(query);
    setPage(1);
  }
  return (
    <>
      <section className={styles.explorer} aria-labelledby="resource-heading">
        <header className={styles.intro}>
          <div>
            <p>{t("THƯ VIỆN TÀI LIỆU")}</p>
            <h2 id="resource-heading">{t("Tra cứu tài nguyên")}</h2>
          </div>
          <span>{t("Tra cứu văn bản và tài liệu phục vụ học tập, nghiên cứu.")}</span>
        </header>
        <form className={styles.filters} onSubmit={search}>
          <label className={styles.search}>
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder={t("Tìm theo tên, số văn bản hoặc đơn vị ban hành...")}
            />
          </label>
          <label className={styles.selectWrap}>
            <span>{t("Danh mục")}</span>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              aria-label={t("Lọc theo danh mục")}
            >
              <option value="ALL">{t("Tất cả danh mục")}</option>
              {categories.map((item) => (
                <option value={item.id} key={item.id}>
                  {t(item.name)}
                </option>
              ))}
            </select>
            <ChevronDown />
          </label>
          <label className={styles.selectWrap}>
            <span>{t("Loại tài nguyên")}</span>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
              aria-label={t("Lọc theo loại tài nguyên")}
            >
              <option value="ALL">{t("Tất cả loại tài nguyên")}</option>
              {types.map((item) => (
                <option value={item} key={item}>
                  {t(resourceTypeLabels[item] ?? item)}
                </option>
              ))}
            </select>
            <ChevronDown />
          </label>
          <button className={styles.searchButton} type="submit">
            <Search />
            {t("Tìm kiếm")}
          </button>
        </form>
        <div className={styles.resultBar}>
          <b>{filtered.length} {locale === "en" ? (filtered.length === 1 ? "document" : "documents") : "tài liệu"}</b>
          <span>
            {t(appliedQuery || category !== "ALL" || type !== "ALL"
              ? "Kết quả phù hợp với bộ lọc"
              : "Tài liệu mới cập nhật")}
          </span>
        </div>
        {filtered.length ? (
          <div className={styles.list}>
            {visibleResources.map((item) => (
              <article className={styles.card} key={item.id}>
                <div className={styles.fileIcon}>
                  <FileText />
                  <span>{item.fileType.split("/").pop()?.toUpperCase() || "FILE"}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.badges}>
                    <span>{t(item.category.name)}</span>
                    <i>{t(resourceTypeLabels[item.resourceType] ?? item.resourceType)}</i>
                    {item.documentType && (
                      <i>{t(documentTypeLabels[item.documentType] ?? item.documentType)}</i>
                    )}
                  </div>
                  <h3 className="type-card-title">{t(item.title)}</h3>
                  {item.description && <p>{t(item.description)}</p>}
                  <dl>
                    {item.documentNumber && (
                      <div>
                        <dt>{t("Số văn bản")}</dt>
                        <dd>{t(item.documentNumber)}</dd>
                      </div>
                    )}
                    <div>
                      <CalendarDays />
                      <dt>{t("Ngày ban hành")}</dt>
                      <dd>{item.issueDate ? new Date(item.issueDate).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN") : t("Đang cập nhật")}</dd>
                    </div>
                    {item.issuingOrganization && (
                      <div>
                        <Building2 />
                        <dt>{t("Đơn vị ban hành")}</dt>
                        <dd>{t(item.issuingOrganization)}</dd>
                      </div>
                    )}
                    <div>
                      <dt>{t("Tệp")}</dt>
                      <dd>
                        <FileName name={t(item.fileName)} /> · {formatSize(item.fileSize)}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className={styles.actions}>
                  <button type="button" onClick={() => setPreview(item)}>
                    <Eye />
                    {t("Xem trước")}
                  </button>
                  <a href={fileEndpoint(item, true)}>
                    <Download />
                    {t("Tải xuống")}
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyContent
            title={t("Không tìm thấy tài liệu")}
            description={t(appliedQuery || category !== "ALL" || type !== "ALL"
              ? 'Hãy thử từ khóa khác hoặc chọn “Tất cả” để xem những tài liệu mới nhất.'
              : 'Tài liệu đang được cập nhật. Vui lòng quay lại sau để xem những tài nguyên mới nhất.')}
            actionLabel={appliedQuery || category !== "ALL" || type !== "ALL" ? t("Xem tất cả tài liệu") : undefined}
            onReset={() => {
              setQuery("");
              setAppliedQuery("");
              setCategory("ALL");
              setType("ALL");
              setPage(1);
            }}
          />
        )}
        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label={t("Phân trang tài nguyên")}>
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              ‹ <span>{t("Trước")}</span>
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                type="button"
                className={pageNumber === page ? styles.activePage : undefined}
                aria-current={pageNumber === page ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
                key={pageNumber}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            >
              <span>{t("Sau")}</span> ›
            </button>
          </nav>
        )}
      </section>
      {preview && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={() => setPreview(null)}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={`${t("Xem trước")} ${t(preview.title)}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <header>
              <div>
                <span>{t("XEM TRƯỚC TÀI LIỆU")}</span>
                <h2>{t(preview.title)}</h2>
              </div>
              <button onClick={() => setPreview(null)} aria-label={t("Đóng")}>
                <X />
              </button>
            </header>
            <div className={styles.previewFrame}>
              {preview.fileType.includes("pdf") || preview.fileType.startsWith("image/") ? (
                <iframe src={fileEndpoint(preview)} title={t(preview.title)} />
              ) : (
                <div>
                  <FileText />
                  <p>{t("Trình duyệt không hỗ trợ xem trước định dạng này.")}</p>
                  <a href={fileEndpoint(preview, true)}>{t("Mở hoặc tải tài liệu")}</a>
                </div>
              )}
            </div>
            <footer>
              <span>
                <FileName name={t(preview.fileName)} /> · {formatSize(preview.fileSize)}
              </span>
              <a href={fileEndpoint(preview, true)}>
                <Download />
                {t("Tải xuống")}
              </a>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
