"use client";
import { useState } from "react";
import Link from "next/link";
type Row = {
  fullName: string;
  phone: string;
  email: string;
  programme: string;
  message: string;
};
export function ConsultationImport() {
  const [rows, setRows] = useState<Row[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function read(file?: File) {
    if (!file) return;
    setBusy(true);
    setRows([]);
    setErrors([]);
    setMessage("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/cms/consultations/import", {
        method: "POST",
        body,
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.message);
      setRows(result.data.rows);
      setErrors(result.data.errors);
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function confirm() {
    setBusy(true);
    try {
      const response = await fetch("/api/cms/consultations/import", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.message);
      setMessage(
        `Đã nhập ${result.data.inserted} dòng; bỏ qua ${result.data.skipped} dòng trùng.`,
      );
      setRows([]);
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details className="admin-card" style={{ padding: 20, marginBottom: 20 }}>
      <summary>Import Excel</summary>
      <p>
        Tải file mẫu, điền dữ liệu vào sheet đầu tiên. Điện thoại phải ở định
        dạng văn bản. Tối đa 500 dòng / 5 MB; file được kiểm tra trước khi nhập.
      </p>
      <Link
        href="/api/cms/consultations/import"
        prefetch={false}
        download="mau-tu-van.xlsx"
      >
        Tải file mẫu Excel
      </Link>
      <label>
        Chọn file .xlsx
        <input
          type="file"
          accept=".xlsx"
          disabled={busy}
          onChange={(e) => read(e.target.files?.[0])}
        />
      </label>
      {errors.map((error) => (
        <p key={error} role="alert">
          {error}
        </p>
      ))}
      {rows.length > 0 && (
        <>
          <p>
            {rows.length} dòng hợp lệ.{" "}
            {errors.length
              ? "Hãy sửa các dòng lỗi và tải lại file."
              : "Chưa ghi dữ liệu vào hệ thống."}
          </p>
          <div style={{ maxHeight: 300, overflow: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Điện thoại</th>
                  <th>Email</th>
                  <th>Chương trình</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.fullName}</td>
                    <td>{row.phone}</td>
                    <td>{row.email}</td>
                    <td>{row.programme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button disabled={busy || errors.length > 0} onClick={confirm}>
            Xác nhận nhập {rows.length} dòng
          </button>
          <button
            disabled={busy}
            onClick={() => {
              setRows([]);
              setErrors([]);
            }}
          >
            Hủy
          </button>
        </>
      )}
      {message && <p role="status">{message}</p>}
    </details>
  );
}
