"use client";
import { cmsFetch } from "@/lib/cms-fetch";
import { useUnsavedChanges } from "./useUnsavedChanges";
import {
  Search,
  RefreshCw,
  ArrowUpRight,
  Save,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./ContentWorkspace.module.css";

type Person = { id: string; fullName: string };
type FollowUp = {
  outcome: "UNDECIDED" | "INTERESTED" | "APPLIED" | "NOT_INTERESTED" | null;
  nextContactAt: string | null;
};
type Consultation = {
  followUp: FollowUp;
  id: string;
  fullName: string;
  email: string;
  phone: string;
  programme: string | null;
  status: string;
  assignedAdminId: string | null;
  assignedAdmin: Person | null;
  message: string | null;
  sourcePage: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  consultationMethod: string | null;
  updatedAt: string;
  createdAt: string;
  notes: {
    id: string;
    content: string;
    createdAt: string;
    admin: { fullName: string };
  }[];
  history: {
    id: string;
    action: string;
    oldStatus: string | null;
    newStatus: string | null;
    createdAt: string;
    admin: { fullName: string } | null;
  }[];
};
const statuses: Record<string, string> = {
  NEW: "Mới",
  RECEIVED: "Đã tiếp nhận",
  CONTACTING: "Đang liên hệ",
  CONSULTED: "Đã tư vấn",
  COMPLETED: "Hoàn tất xử lý",
  UNREACHABLE: "Chưa liên lạc được",
  CANCELLED: "Đã hủy",
};
const xmlEscape = (value: unknown) =>
  String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/[&<>"']/g, (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
    );

function createXlsx(rows: { values: unknown[]; style?: number; height?: number }[]) {
  const columnName = (index: number) => {
    let name = "";
    for (let value = index + 1; value; value = Math.floor((value - 1) / 26))
      name = String.fromCharCode(65 + ((value - 1) % 26)) + name;
    return name;
  };
  const sheetRows = rows
    .map(
      ({ values, style, height }, rowIndex) =>
        `<row r="${rowIndex + 1}"${height ? ` ht="${height}" customHeight="1"` : ""}>${values
          .map(
            (value, columnIndex) =>
              `<c r="${columnName(columnIndex)}${rowIndex + 1}"${style ? ` s="${style}"` : ""} t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`,
          )
          .join("")}</row>`,
    )
    .join("");
  const files = [
    {
      name: "[Content_Types].xml",
      content:
        '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>',
    },
    {
      name: "_rels/.rels",
      content:
        '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    },
    {
      name: "xl/workbook.xml",
      content:
        '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Danh sach tu van" sheetId="1" r:id="rId1"/></sheets></workbook>',
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      content:
        '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
    },
    {
      name: "xl/worksheets/sheet1.xml",
      content: `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:K${rows.length}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="3" topLeftCell="A4" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols><col min="1" max="1" width="8" customWidth="1"/><col min="2" max="2" width="16" customWidth="1"/><col min="3" max="3" width="22" customWidth="1"/><col min="4" max="4" width="20" customWidth="1"/><col min="5" max="5" width="34" customWidth="1"/><col min="6" max="6" width="36" customWidth="1"/><col min="7" max="7" width="20" customWidth="1"/><col min="8" max="8" width="20" customWidth="1"/><col min="9" max="9" width="24" customWidth="1"/><col min="10" max="10" width="27" customWidth="1"/><col min="11" max="11" width="48" customWidth="1"/></cols><sheetData>${sheetRows}</sheetData><mergeCells count="1"><mergeCell ref="A1:K1"/></mergeCells></worksheet>`,
    },
    {
      name: "xl/styles.xml",
      content:
        '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><color theme="1"/><name val="Arial"/></font><font><b/><sz val="14"/><color rgb="FF000000"/><name val="Arial"/></font><font><b/><sz val="11"/><color rgb="FF000000"/><name val="Arial"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF9CC2E5"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FF000000"/></left><right style="thin"><color rgb="FF000000"/></right><top style="thin"><color rgb="FF000000"/></top><bottom style="thin"><color rgb="FF000000"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>',
    },
  ];
  const encoder = new TextEncoder();
  const crc32 = (bytes: Uint8Array) => {
    let crc = 0xffffffff;
    for (const byte of bytes) {
      crc ^= byte;
      for (let bit = 0; bit < 8; bit++)
        crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
    return (crc ^ 0xffffffff) >>> 0;
  };
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name);
    const content = encoder.encode(file.content);
    const checksum = crc32(content);
    const local = new Uint8Array(30 + name.length);
    const localView = new DataView(local.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint32(14, checksum, true);
    localView.setUint32(18, content.length, true);
    localView.setUint32(22, content.length, true);
    localView.setUint16(26, name.length, true);
    local.set(name, 30);
    localParts.push(local, content);

    const central = new Uint8Array(46 + name.length);
    const centralView = new DataView(central.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint32(16, checksum, true);
    centralView.setUint32(20, content.length, true);
    centralView.setUint32(24, content.length, true);
    centralView.setUint16(28, name.length, true);
    centralView.setUint32(42, offset, true);
    central.set(name, 46);
    centralParts.push(central);
    offset += local.length + content.length;
  }
  const centralSize = centralParts.reduce((size, part) => size + part.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);
  const blobParts = [...localParts, ...centralParts, end].map(
    (part) =>
      part.buffer.slice(
        part.byteOffset,
        part.byteOffset + part.byteLength,
      ) as ArrayBuffer,
  );
  return new Blob(blobParts, {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}
async function api<T>(
  path: string,
  method = "GET",
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const response = await cmsFetch(`/api/cms/consultation-workspace${path}`, {
    method,
    cache: "no-store",
    signal,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json();
  if (!response.ok || !result.success)
    throw Error(result.message || "Không tải được dữ liệu tư vấn.");
  return result.data;
}
export function ConsultationWorkspace({
  canUpdate,
  canAssign,
  initialDue = false,
}: {
  canUpdate: boolean;
  canAssign: boolean;
  initialDue?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    search: "",
    status: "ALL",
    assigned: "",
    page: 1,
    due: initialDue ? "1" : "",
  });
  const [data, setData] = useState<{
    consultations: Consultation[];
    total: number;
  } | null>(null);
  const [selected, setSelected] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    setSelectedIds(new Set());
  }, [filter]);
  const visibleIds = data?.consultations.map((item) => item.id) ?? [];
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));

  function toggleVisibleSelection() {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allVisibleSelected) visibleIds.forEach((id) => next.delete(id));
      else visibleIds.forEach((id) => next.add(id));
      return next;
    });
  }

  function exportSelected() {
    const items = (data?.consultations ?? []).filter((item) =>
      selectedIds.has(item.id),
    );
    if (!items.length) return;
    const formatVietnameseDate = (date: string) =>
      new Date(date).toLocaleDateString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      });
    const formatVietnameseDateTime = (date: string | null) =>
      date
        ? new Date(date).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          })
        : "";
    const outcomes: Record<string, string> = {
      UNDECIDED: "Chưa quyết định",
      INTERESTED: "Quan tâm chương trình",
      APPLIED: "Đã nộp hồ sơ",
      NOT_INTERESTED: "Không còn nhu cầu",
    };
    const columns = [
      "STT",
      "NGÀY ĐĂNG KÝ",
      "HỌ TÊN",
      "SỐ ĐIỆN THOẠI",
      "EMAIL",
      "NGÀNH QUAN TÂM",
      "TRẠNG THÁI",
      "PHỤ TRÁCH",
      "KẾT QUẢ TƯ VẤN",
      "LẦN LIÊN HỆ TIẾP THEO",
      "GHI CHÚ NỘI BỘ",
    ];
    const blob = createXlsx([
      { values: ["DANH SÁCH TƯ VẤN"], style: 1, height: 28 },
      { values: [], height: 9 },
      { values: columns, style: 2, height: 24 },
      ...items.map((item, index) => ({
        values: [
          index + 1,
          formatVietnameseDate(item.createdAt),
          item.fullName,
          item.phone,
          item.email,
          item.programme || "",
          statuses[item.status] || item.status,
          item.assignedAdmin?.fullName || "",
          item.followUp?.outcome
            ? outcomes[item.followUp.outcome] || item.followUp.outcome
            : "Chưa ghi nhận",
          formatVietnameseDateTime(item.followUp?.nextContactAt || null),
          (item.notes || [])
            .map((note) => note.content)
            .join("\n"),
        ],
        style: 3,
        height: Math.min(
          120,
          Math.max(
            22,
            18 *
              Math.max(
                1,
                (item.notes || []).reduce(
                  (lineCount, note) =>
                    lineCount + note.content.split("\n").length,
                  0,
                ),
              ),
          ),
        ),
      })),
    ]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const exportedAt = new Date();
    const dateStamp = `${String(exportedAt.getDate()).padStart(2, "0")}${String(exportedAt.getMonth() + 1).padStart(2, "0")}${exportedAt.getFullYear()}`;
    link.download = `DANH SÁCH TƯ VẤN_${dateStamp}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function deleteSelected() {
    if (!selectedIds.size || deleting) return;
    const count = selectedIds.size;
    if (!window.confirm(`Xóa ${count} hồ sơ tư vấn đã chọn? Thao tác này không thể hoàn tác.`)) return;
    setDeleting(true);
    setError("");
    setNotice("");
    try {
      const result = await api<{ deleted: number }>("/bulk", "DELETE", {
        ids: [...selectedIds],
      });
      setSelectedIds(new Set());
      setLoading(true);
      setRetry((value) => value + 1);
      setError("");
      setNotice(`Đã xóa ${result.deleted} hồ sơ tư vấn.`);
      if (result.deleted < count)
        setError(`Đã xóa ${result.deleted} trong ${count} hồ sơ đã chọn.`);
    } catch (reason) {
      setError((reason as Error).message);
    } finally {
      setDeleting(false);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    api<{ consultations: Consultation[]; total: number }>(
      `?${new URLSearchParams({ ...filter, page: String(filter.page) })}`,
      "GET",
      undefined,
      controller.signal,
    )
      .then((result) => {
        setData(result);
        setError("");
      })
      .catch((reason) => {
        if (!controller.signal.aborted) setError(reason.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [filter, retry]);
  if (selected)
    return (
      <ConsultationDetail
        key={selected}
        id={selected}
        canUpdate={canUpdate}
        canAssign={canAssign}
        onBack={() => {
          setSelected("");
          setLoading(true);
          setRetry((value) => value + 1);
        }}
      />
    );
  return (
    <div className={styles.root}>
      <header>
        <span className={styles.eyebrow}>VGG · TUYỂN SINH</span>
        <h1>Lịch tư vấn</h1>
        <p>
          Tìm kiếm toàn bộ hồ sơ, phân công, ghi chú và theo dõi lịch sử xử lý.
        </p>
      </header>
      <form
        className={styles.filters}
        onSubmit={(event) => {
          event.preventDefault();
          setLoading(true);
          setFilter((current) => ({ ...current, search, page: 1 }));
        }}
      >
        <label className={styles.searchField}>
          Tìm hồ sơ
          <input
            placeholder="Tên, điện thoại, email hoặc ngành…"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            maxLength={190}
          />
        </label>
        <label>
          Trạng thái
          <select
            value={filter.status}
            onChange={(event) => {
              setLoading(true);
              setFilter((current) => ({
                ...current,
                status: event.target.value,
                page: 1,
              }));
            }}
          >
            <option value="ALL">Tất cả</option>
            {Object.entries(statuses).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Phân công
          <select
            value={filter.assigned}
            onChange={(event) => {
              setLoading(true);
              setFilter((current) => ({
                ...current,
                assigned: event.target.value,
                page: 1,
              }));
            }}
          >
            <option value="">Tất cả</option>
            <option value="unassigned">Chưa phân công</option>
          </select>
        </label>
        <label className={styles.dueFilter}>
          <input
            type="checkbox"
            checked={filter.due === "1"}
            onChange={(event) => {
              setLoading(true);
              setFilter((current) => ({
                ...current,
                due: event.target.checked ? "1" : "",
                page: 1,
              }));
            }}
          />
          Đến hạn liên hệ
        </label>
        <button
          className="cms-button cms-button--primary"
          type="submit"
          disabled={loading}
        >
          <Search size={17} aria-hidden="true" />
          Tìm kiếm
        </button>
      </form>
      {error && (
        <p role="alert" className={styles.error}>
          {error} Dữ liệu bên dưới có thể chưa cập nhật.
        </p>
      )}
      {notice && (
        <p role="status" style={{ color: "#267047" }}>
          {notice}
        </p>
      )}
      <div className={styles.listToolbar}>
        <span>Danh sách yêu cầu tư vấn</span>
        <div className={styles.selectionActions}>
          <span>{selectedIds.size} đã chọn</span>
          <button disabled={!selectedIds.size || loading} onClick={exportSelected}>
            <Download size={16} aria-hidden="true" /> Xuất Excel
          </button>
          {canAssign && (
            <button
              className={styles.dangerButton}
              disabled={!selectedIds.size || deleting || loading}
              onClick={() => void deleteSelected()}
            >
              <Trash2 size={16} aria-hidden="true" />
              {deleting ? "Đang xóa…" : "Xóa đã chọn"}
            </button>
          )}
          <button
            className="cms-button cms-button--secondary"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              setRetry((value) => value + 1);
            }}
          >
            <RefreshCw size={16} aria-hidden="true" />
            {loading ? "Đang tải…" : "Tải lại"}
          </button>
        </div>
      </div>
      {loading ? (
        <p role="status">Đang tải…</p>
      ) : (
        data && (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        aria-label="Chọn tất cả hồ sơ trên trang này"
                        type="checkbox"
                        checked={allVisibleSelected}
                        onChange={toggleVisibleSelection}
                      />
                    </th>
                    <th>Người đăng ký</th>
                    <th>Ngành quan tâm</th>
                    <th>Trạng thái</th>
                    <th>Phụ trách</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {data.consultations.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          aria-label={`Chọn hồ sơ ${item.fullName}`}
                          type="checkbox"
                          checked={selectedIds.has(item.id)}
                          onChange={() =>
                            setSelectedIds((current) => {
                              const next = new Set(current);
                              if (next.has(item.id)) next.delete(item.id);
                              else next.add(item.id);
                              return next;
                            })
                          }
                        />
                      </td>
                      <td>
                        <strong>{item.fullName}</strong>
                        <p>
                          {item.phone} · {item.email}
                        </p>
                      </td>
                      <td>{item.programme || "Chưa chọn"}</td>
                      <td>{statuses[item.status] || item.status}</td>
                      <td>
                        {item.assignedAdmin?.fullName || "Chưa phân công"}
                      </td>
                      <td>
                        <button
                          className="cms-button cms-button--soft"
                          onClick={() => setSelected(item.id)}
                        >
                          Mở hồ sơ
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!data.consultations.length && <p>Không có hồ sơ phù hợp.</p>}
            <ConsultationPagination
              total={data.total}
              page={filter.page}
              onChange={(page) => {
                setLoading(true);
                setFilter((current) => ({ ...current, page }));
              }}
            />
          </>
        )
      )}
    </div>
  );
}

function ConsultationPagination({
  total,
  page,
  onChange,
}: {
  total: number;
  page: number;
  onChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / 25));
  const visible = [...new Set([1, page - 1, page, page + 1, pages])]
    .filter((number) => number >= 1 && number <= pages)
    .sort((a, b) => a - b);
  return (
    <nav className={styles.pagination} aria-label="Phân trang lịch tư vấn">
      <div className={styles.pageSummary} aria-live="polite">
        {total ? (
          <>
            Hiển thị{" "}
            <strong>
              {(page - 1) * 25 + 1}–{Math.min(page * 25, total)}
            </strong>{" "}
            trong <strong>{total}</strong> hồ sơ
          </>
        ) : (
          "Chưa có yêu cầu tư vấn"
        )}
        <small>25 hồ sơ / trang</small>
      </div>
      <div className={styles.pageControls}>
        <button
          type="button"
          disabled={page <= 1 || !total}
          onClick={() => onChange(1)}
          aria-label="Trang đầu"
          title="Trang đầu"
        >
          <ChevronsLeft size={17} />
        </button>
        <button
          type="button"
          disabled={page <= 1 || !total}
          onClick={() => onChange(page - 1)}
          aria-label="Trang trước"
        >
          <ChevronLeft size={17} />
          <span>Trước</span>
        </button>
        {visible.map((number, index) => (
          <span className={styles.pageItem} key={number}>
            {index > 0 && number - visible[index - 1] > 1 && (
              <span className={styles.pageEllipsis} aria-hidden="true">
                …
              </span>
            )}
            <button
              type="button"
              aria-label={`Trang ${number}`}
              aria-current={page === number ? "page" : undefined}
              disabled={!total}
              onClick={() => {
                if (number !== page) onChange(number);
              }}
            >
              {number}
            </button>
          </span>
        ))}
        <button
          type="button"
          disabled={page >= pages || !total}
          onClick={() => onChange(page + 1)}
          aria-label="Trang sau"
        >
          <span>Sau</span>
          <ChevronRight size={17} />
        </button>
        <button
          type="button"
          disabled={page >= pages || !total}
          onClick={() => onChange(pages)}
          aria-label="Trang cuối"
          title="Trang cuối"
        >
          <ChevronsRight size={17} />
        </button>
      </div>
    </nav>
  );
}

function ConsultationDetail({
  id,
  canUpdate,
  canAssign,
  onBack,
}: {
  id: string;
  canUpdate: boolean;
  canAssign: boolean;
  onBack: () => void;
}) {
  const [doc, setDoc] = useState<Consultation | null>(null);
  const [admins, setAdmins] = useState<Person[]>([]);
  const [status, setStatus] = useState("");
  const [assigned, setAssigned] = useState("");
  const [note, setNote] = useState("");
  const [followUp, setFollowUp] = useState<FollowUp>({
    outcome: null,
    nextContactAt: null,
  });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  const dirty =
    !!doc &&
    (!!note.trim() ||
      status !== doc.status ||
      assigned !== (doc.assignedAdminId || "") ||
      JSON.stringify(followUp) !== JSON.stringify(doc.followUp));
  useEffect(() => {
    const controller = new AbortController();
    api<{ consultation: Consultation }>(
      `/${id}`,
      "GET",
      undefined,
      controller.signal,
    )
      .then(({ consultation }) => {
        setDoc(consultation);
        setStatus(consultation.status);
        setAssigned(consultation.assignedAdminId || "");
        setFollowUp(consultation.followUp);
        setNote("");
        setError("");
      })
      .catch((reason) => {
        if (!controller.signal.aborted) setError(reason.message);
      });
    if (canAssign)
      api<{ admins: Person[] }>(
        "/assignees",
        "GET",
        undefined,
        controller.signal,
      )
        .then((result) => setAdmins(result.admins))
        .catch((reason) => {
          if (!controller.signal.aborted) setError(reason.message);
        });
    return () => controller.abort();
  }, [id, canAssign, retry]);
  useUnsavedChanges(dirty);
  async function save() {
    if (!doc || busy) return;
    setBusy(true);
    setError("");
    try {
      await api(`/${id}`, "PATCH", {
        revision: doc.updatedAt,
        status,
        ...(canAssign ? { assignedAdminId: assigned || null } : {}),
        note,
        followUp,
      });
      setNotice("Đã lưu cập nhật và lịch sử xử lý.");
      setRetry((value) => value + 1);
    } catch (reason) {
      setError((reason as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={styles.root}>
      <button
        disabled={busy}
        onClick={() => {
          if (!dirty || window.confirm("Bỏ thay đổi chưa lưu để quay lại?"))
            onBack();
        }}
      >
        ← Danh sách tư vấn
      </button>
      <button
        disabled={busy}
        onClick={() => {
          if (
            !dirty ||
            window.confirm(
              "Tải lại sẽ bỏ thay đổi chưa lưu. Bạn đã sao chép ghi chú cần giữ?",
            )
          )
            setRetry((value) => value + 1);
        }}
      >
        Tải lại hồ sơ
      </button>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className={styles.notice}>
          {notice}
        </p>
      )}
      {doc && (
        <>
          <header>
            <h1>{doc.fullName}</h1>
            <p>
              {doc.phone} · {doc.email}
            </p>
            <p>
              Ngành: {doc.programme || "Chưa chọn"} · Nguồn:{" "}
              {doc.sourcePage || "Không ghi nhận"}
            </p>
            <p>
              Hẹn tư vấn:{" "}
              {doc.preferredDate
                ? new Date(doc.preferredDate).toLocaleDateString("vi-VN")
                : "Chưa chọn ngày"}{" "}
              {doc.preferredTime} · {doc.consultationMethod}
            </p>
            <p>{doc.message || "Không có lời nhắn."}</p>
          </header>
          <section className={styles.review}>
            <fieldset disabled={busy || !canUpdate}>
              <legend>Xử lý hồ sơ</legend>
              <label>
                Trạng thái
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  {Object.entries(statuses).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              {canAssign && (
                <label>
                  Người phụ trách
                  <select
                    value={assigned}
                    onChange={(event) => setAssigned(event.target.value)}
                  >
                    <option value="">Chưa phân công</option>
                    {assigned &&
                      !admins.some((person) => person.id === assigned) && (
                        <option value={assigned}>
                          {doc.assignedAdmin?.fullName ||
                            "Tài khoản không còn hoạt động"}
                        </option>
                      )}
                    {admins.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.fullName}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label>
                Kết quả tư vấn
                <select
                  value={followUp.outcome || ""}
                  onChange={(event) =>
                    setFollowUp((current) => ({
                      ...current,
                      outcome: (event.target.value ||
                        null) as FollowUp["outcome"],
                    }))
                  }
                >
                  <option value="">Chưa ghi nhận</option>
                  <option value="UNDECIDED">Chưa quyết định</option>
                  <option value="INTERESTED">Quan tâm chương trình</option>
                  <option value="APPLIED">Đã nộp hồ sơ</option>
                  <option value="NOT_INTERESTED">Không còn nhu cầu</option>
                </select>
              </label>
              <label>
                Lần liên hệ tiếp theo (múi giờ trên máy)
                <input
                  type="datetime-local"
                  value={localDate(followUp.nextContactAt)}
                  onChange={(event) =>
                    setFollowUp((current) => ({
                      ...current,
                      nextContactAt: event.target.value
                        ? new Date(event.target.value).toISOString()
                        : null,
                    }))
                  }
                />
              </label>
              <label>
                Thêm ghi chú nội bộ
                <textarea
                  maxLength={5000}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </label>
              <button
                className="cms-button cms-button--primary"
                disabled={!dirty}
                onClick={() => void save()}
              >
                <Save size={16} aria-hidden="true" />
                {busy ? "Đang lưu…" : "Lưu xử lý"}
              </button>
            </fieldset>
          </section>
          <section className={styles.review}>
            <h2>Ghi chú nội bộ</h2>
            {doc.notes.map((item) => (
              <article key={item.id}>
                <strong>
                  {item.admin.fullName} ·{" "}
                  {new Date(item.createdAt).toLocaleString("vi-VN")}
                </strong>
                <p style={{ whiteSpace: "pre-wrap" }}>{item.content}</p>
              </article>
            ))}
            {!doc.notes.length && <p>Chưa có ghi chú.</p>}
          </section>
          <section className={styles.review}>
            <h2>Lịch sử</h2>
            {doc.history.map((item) => (
              <p key={item.id}>
                {new Date(item.createdAt).toLocaleString("vi-VN")} ·{" "}
                {item.admin?.fullName || "Website"} ·{" "}
                {item.action === "created"
                  ? "Tiếp nhận yêu cầu"
                  : item.action === "workspace_updated"
                    ? "Cập nhật hồ sơ"
                    : item.action === "followup_updated"
                      ? "Cập nhật kết quả và lịch liên hệ"
                      : item.action}{" "}
                {item.newStatus &&
                  `· ${statuses[item.oldStatus || ""] || item.oldStatus || ""} → ${statuses[item.newStatus] || item.newStatus}`}
              </p>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

function localDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}
