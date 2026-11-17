"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  ClipboardList,
  Inbox,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { cmsPath } from "@/lib/cms-path";
import { createXlsx } from "@/lib/create-xlsx";
import {
  attachmentLabels,
  educationFields,
  formatKnowledgeTuition,
  knowledgeHours,
  knowledgeSchedule,
  personalFields,
  secondEducationFields,
} from "../../../../shared/knowledge-registration";
import { adminApi, displayDate } from "./api";
import styles from "./knowledge-workspace.module.css";

const resource = "knowledge-registrations";
const formUrl = `${(process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000/vi").replace(/\/$/, "")}/admissions/bo-sung-kien-thuc`;

const columns = [
  ["fullName", "Họ và tên"],
  ["email", "Email"],
  ["phone", "Điện thoại"],
  ["graduateMajor", "Ngành tốt nghiệp"],
  ["masterProgramme", "Ngành thạc sĩ dự tuyển"],
  ["createdAt", "Ngày nộp"],
] as const;
type Entry = {
  id: string;
  courses?: string[];
  estimatedTuition?: number;
} & Record<(typeof columns)[number][0], string>;
type Detail = Entry & {
  citizenId: string;
  details: {
    [key: string]: string | number | string[] | undefined;
    courses?: string[];
    estimatedTuition?: number;
  };
  attachments: Array<{ id: string; field: string; filename: string }>;
};

function valueFor(entry: Entry, key: (typeof columns)[number][0]) {
  return key === "createdAt" ? displayDate(entry.createdAt) : entry[key];
}

function DetailFields({
  fields,
  values,
}: {
  fields: readonly (readonly [string, string, boolean])[];
  values: Record<string, unknown>;
}) {
  return (
    <dl className={styles.details}>
      {fields.map(([key, label]) => (
        <div key={key}>
          <dt>{label}</dt>
          <dd>{String(values[key] || "—")}</dd>
        </div>
      ))}
    </dl>
  );
}

export function KnowledgeWorkspace() {
  const [items, setItems] = useState<Entry[]>();
  const [loadError, setLoadError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteNotice, setDeleteNotice] = useState("");
  const [active, setActive] = useState<Entry>();
  const [detail, setDetail] = useState<Detail>();
  const [detailError, setDetailError] = useState("");
  const selectAll = useRef<HTMLInputElement>(null);
  const allSelected =
    (items?.length ?? 0) > 0 && selected.size === items?.length;

  useEffect(() => {
    const controller = new AbortController();
    adminApi<{ items: Entry[] }>(resource, "GET", undefined, controller.signal)
      .then(({ items }) => {
        if (controller.signal.aborted) return;
        setItems(items);
        const ids = new Set(items.map(({ id }) => id));
        setSelected(
          (current) => new Set([...current].filter((id) => ids.has(id))),
        );
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setLoadError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (!active) return;
    const controller = new AbortController();
    adminApi<{ item: Detail }>(
      `${resource}/${active.id}`,
      "GET",
      undefined,
      controller.signal,
    )
      .then(({ item }) => {
        if (!controller.signal.aborted) setDetail(item);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setDetailError(error.message);
      });
    return () => controller.abort();
  }, [active]);

  useEffect(() => {
    if (selectAll.current)
      selectAll.current.indeterminate = !allSelected && selected.size > 0;
  }, [active, allSelected, selected]);

  function refresh() {
    setLoadError("");
    setLoading(true);
    setAttempt((value) => value + 1);
  }

  function showDetail(entry: Entry) {
    setDetail(undefined);
    setDetailError("");
    setActive(entry);
  }

  function selectRow(id: string, checked: boolean) {
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function deleteSelected() {
    if (!selected.size || loading || deleting) return;
    const ids = [...selected];
    if (!window.confirm(`Xóa vĩnh viễn ${ids.length} hồ sơ đã chọn và các tệp đính kèm?`)) return;

    setDeleting(true);
    setDeleteError("");
    setDeleteNotice("");
    try {
      const { count } = await adminApi<{ count: number }>(resource, "DELETE", { ids });
      setItems((current) => current?.filter((entry) => !selected.has(entry.id)));
      setSelected(new Set());
      setDeleteNotice(count > 0 ? `Đã xóa ${count} hồ sơ.` : "Các hồ sơ đã chọn không còn trong danh sách.");
      refresh();
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Vui lòng thử lại.");
    } finally {
      setDeleting(false);
    }
  }

  function exportSelected() {
    const rows = (items ?? []).filter((entry) => selected.has(entry.id));
    if (!rows.length) return;
    const workbook = createXlsx(
      [
        {
          values: [
            ...columns.map(([, label]) => label),
            "Học phần đã đăng ký",
            "Học phí tạm tính",
          ],
          style: 2,
        },
        ...rows.map((entry) => ({
          values: [
            ...columns.map(([key]) => valueFor(entry, key)),
            entry.courses?.join("; "),
            entry.estimatedTuition,
          ],
        })),
      ],
      {
        name: "Bổ sung kiến thức",
        frozenRows: 1,
        mergeTitle: false,
        widths: [30, 34, 18, 32, 36, 24, 66, 23],
        vndColumn: columns.length + 1,
      },
    );
    const url = URL.createObjectURL(workbook);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Danh sách đăng ký bổ sung kiến thức.xlsx";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section className={styles.workspace}>
      <header className={styles.heading}>
        <div className={styles.titleGroup}>
          <span className={styles.titleIcon}>
            <ClipboardList size={24} aria-hidden="true" />
          </span>
          <div>
            <h1>Bổ sung kiến thức</h1>
            <p>
              Quản lý hồ sơ đăng ký học bổ sung kiến thức từ website Tuyển sinh.
            </p>
          </div>
        </div>
        <a
          className={styles.formLink}
          href={formUrl}
          target="_blank"
          rel="noreferrer"
        >
          Mở biểu mẫu <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>
      {active ? (
        <div className={styles.card}>
          <button
            type="button"
            className={styles.link}
            onClick={() => setActive(undefined)}
          >
            <ArrowLeft size={16} aria-hidden="true" /> Về danh sách
          </button>
          <h2>{active.fullName}</h2>
          {detailError ? (
            <p role="alert">{detailError}</p>
          ) : !detail ? (
            <p role="status">Đang tải hồ sơ…</p>
          ) : (
            <>
              <p>Ngày nộp {displayDate(detail.createdAt)}</p>
              <h3>Thông tin cá nhân và liên lạc</h3>
              <DetailFields
                fields={personalFields}
                values={{ ...detail.details, ...detail }}
              />
              <h3>Văn bằng đại học thứ nhất</h3>
              <DetailFields
                fields={educationFields}
                values={{ ...detail.details, ...detail }}
              />
              {(secondEducationFields.some(([key]) => detail.details[key]) ||
                detail.attachments.some(({ field }) =>
                  field.startsWith("second"),
                )) && (
                <>
                  <h3>Văn bằng đại học thứ hai</h3>
                  <DetailFields
                    fields={secondEducationFields}
                    values={detail.details}
                  />
                </>
              )}
              <h3>Tệp đính kèm</h3>
              <ul className={styles.files}>
                {detail.attachments.map((file) => (
                  <li key={file.id}>
                    <a
                      className={styles.link}
                      href={cmsPath(`/api/admin/${resource}/file/${file.id}`)}
                    >
                      {attachmentLabels[file.field]} ({file.filename})
                    </a>
                  </li>
                ))}
              </ul>
              <h3>Buổi học</h3>
              <p>
                {knowledgeSchedule} · {knowledgeHours}
              </p>
              {detail.details.courses && (
                <>
                  <h3>Học phần đã đăng ký</h3>
                  {detail.details.courses.length ? (
                    <ul className={styles.files}>
                      {detail.details.courses.map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Chưa chọn học phần.</p>
                  )}
                  {typeof detail.details.estimatedTuition === "number" && (
                    <p>
                      Học phí tạm tính{" "}
                      {formatKnowledgeTuition(detail.details.estimatedTuition)}
                    </p>
                  )}
                </>
              )}
              <h3>Ghi chú bổ sung</h3>
              <p className={styles.note}>{detail.details.note || "—"}</p>
            </>
          )}
        </div>
      ) : (
        <section
          className={styles.listCard}
          aria-labelledby="knowledge-list-heading"
          aria-busy={loading || deleting}
        >
          <header className={styles.listHeader}>
            <div className={styles.listTitle}>
              <h2 id="knowledge-list-heading">Danh sách hồ sơ</h2>
              {items && (
                <span className={styles.count}>{items.length} hồ sơ</span>
              )}
            </div>
            <div className={styles.listActions}>
              <button
                type="button"
                className={styles.refresh}
                disabled={loading || deleting}
                onClick={refresh}
              >
                <RefreshCw size={16} aria-hidden="true" /> Làm mới
              </button>
              {!!items?.length && (
                <>
                  <button
                    type="button"
                    className={styles.export}
                    disabled={!selected.size || loading || deleting}
                    onClick={exportSelected}
                  >
                    <ArrowDownToLine size={17} aria-hidden="true" /> Xuất Excel
                  </button>
                  <button
                    type="button"
                    className={styles.delete}
                    disabled={!selected.size || loading || deleting}
                    onClick={deleteSelected}
                  >
                    <Trash2 size={17} aria-hidden="true" /> {deleting ? "Đang xóa…" : "Xóa đã chọn"}
                  </button>
                </>
              )}
            </div>
          </header>
          {deleteNotice && <p className={styles.selection} role="status">{deleteNotice}</p>}
          {deleteError && <p className={styles.selection} role="alert">Không thể xóa hồ sơ. {deleteError}</p>}
          {loadError ? (
            <div className={styles.empty} role="alert">
              <h3>Không tải được danh sách</h3>
              <p>{loadError}</p>
            </div>
          ) : !items ? (
            <p className={styles.empty} role="status">
              Đang tải danh sách…
            </p>
          ) : items.length === 0 ? (
            <div className={styles.empty} role="status">
              <span className={styles.emptyIcon}>
                <Inbox size={30} aria-hidden="true" />
              </span>
              <h3>Chưa có hồ sơ đăng ký</h3>
              <p>
                Hồ sơ sẽ xuất hiện tại đây sau khi ứng viên gửi biểu mẫu thành
                công.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.selection} role="status">
                {selected.size
                  ? `Đã chọn ${selected.size} hồ sơ`
                  : "Chọn hồ sơ để xuất Excel hoặc xóa."}
              </div>
              <div className={styles.tableScroll}>
                <table role="table" aria-labelledby="knowledge-list-heading">
                  <thead role="rowgroup">
                    <tr role="row">
                      <th scope="col" role="columnheader">
                        <label className={styles.selectAllLabel}>
                          <input
                            ref={selectAll}
                            type="checkbox"
                            aria-label="Chọn tất cả hồ sơ"
                            checked={allSelected}
                            disabled={deleting}
                            onChange={(event) =>
                              setSelected(
                                new Set(
                                  event.target.checked
                                    ? items.map((entry) => entry.id)
                                    : [],
                                ),
                              )
                            }
                          />
                          <span aria-hidden="true">Chọn tất cả</span>
                        </label>
                      </th>
                      {columns.map(([key, label]) => (
                        <th scope="col" role="columnheader" key={key}>
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {items.map((entry) => (
                      <tr key={entry.id} role="row">
                        <td role="cell">
                          <input
                            type="checkbox"
                            aria-label={`Chọn hồ sơ của ${entry.fullName}`}
                            checked={selected.has(entry.id)}
                            disabled={deleting}
                            onChange={(event) =>
                              selectRow(entry.id, event.target.checked)
                            }
                          />
                        </td>
                        {columns.map(([key, label]) => (
                          <td key={key} data-label={label} role="cell">
                            {key === "fullName" ? (
                              <button
                                className={styles.link}
                                type="button"
                                disabled={deleting}
                                onClick={() => showDetail(entry)}
                              >
                                {entry.fullName}
                              </button>
                            ) : (
                              valueFor(entry, key)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      )}
    </section>
  );
}
