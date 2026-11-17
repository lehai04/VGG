"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
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
  const [selected, setSelected] = useState<Set<string>>(new Set());
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
        if (!controller.signal.aborted) setItems(items);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setLoadError(error.message);
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
  }, [allSelected, selected]);

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
      <h1>Bổ sung kiến thức</h1>
      {active ? (
        <div className={styles.card}>
          <button
            type="button"
            className={styles.link}
            onClick={() => setActive(undefined)}
          >
            ← Về danh sách
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
        <div className={styles.card}>
          {loadError ? (
            <p role="alert">
              {loadError}{" "}
              <button
                type="button"
                className={styles.link}
                onClick={() => {
                  setLoadError("");
                  setAttempt((value) => value + 1);
                }}
              >
                Thử lại
              </button>
            </p>
          ) : !items ? (
            <p role="status">Đang tải danh sách…</p>
          ) : (
            <>
              <div className={styles.toolbar}>
                <span>
                  {items.length} hồ sơ · Đã chọn {selected.size}
                </span>
                <button
                  type="button"
                  className={styles.export}
                  disabled={!selected.size}
                  onClick={exportSelected}
                >
                  <Download size={17} /> Xuất Excel
                </button>
              </div>
              {items.length === 0 ? (
                <p>Chưa có hồ sơ đăng ký.</p>
              ) : (
                <div className={styles.tableScroll}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">
                          <input
                            ref={selectAll}
                            type="checkbox"
                            aria-label="Chọn tất cả hồ sơ"
                            checked={allSelected}
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
                        </th>
                        {columns.map(([key, label]) => (
                          <th scope="col" key={key}>
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((entry) => (
                        <tr key={entry.id}>
                          <td>
                            <input
                              type="checkbox"
                              aria-label={`Chọn hồ sơ của ${entry.fullName}`}
                              checked={selected.has(entry.id)}
                              onChange={(event) =>
                                selectRow(entry.id, event.target.checked)
                              }
                            />
                          </td>
                          {columns.map(([key]) => (
                            <td key={key}>
                              {key === "fullName" ? (
                                <button
                                  className={styles.link}
                                  type="button"
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
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
