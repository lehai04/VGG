"use client";
import { useEffect, useState } from "react";
import styles from "./ContentWorkspace.module.css";

type Schedule = { status: "PENDING" | "PUBLISHED" | "CANCELLED" | "FAILED"; dueAt: string; revision: string; error?: string };
type State = { schedule: Schedule | null; revision: string | null };
export function PublicationSchedule({ id, locale, revision, enabled, busy, canPublish, onBusyChange, news = false }: { news?:boolean; id: string; locale: string; revision: string | null; enabled: boolean; busy: boolean; canPublish: boolean; onBusyChange: (busy: boolean) => void }) {
  const endpoint=news?`/api/cms/news-workspace/${encodeURIComponent(id)}/schedule`:"/api/cms/website/schedule";
  const [state, setState] = useState<State | null>(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${endpoint}?id=${encodeURIComponent(id)}&locale=${locale}`, { cache: "no-store", signal: controller.signal }).then(async response => { const result = await response.json(); if (!response.ok || !result.success) throw Error(result.message || "Không tải được lịch."); setState(result.data); setError(""); }).catch(reason => { if (!controller.signal.aborted) setError(reason.message); });
    return () => controller.abort();
  }, [id, locale, revision, refresh, endpoint]);
  async function update(cancel: boolean) {
    if (!state || !revision || busy) return;
    onBusyChange(true); setError("");
    try {
      const response = await fetch(endpoint, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, locale, revision, scheduleRevision: state.revision, dueAt: cancel ? null : new Date(date).toISOString() }) });
      const result = await response.json(); if (!response.ok || !result.success) throw Error(result.message || "Không cập nhật được lịch.");
      setRefresh(value => value + 1);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Không cập nhật được lịch."); }
    finally { onBusyChange(false); }
  }
  return <section className={styles.review}><h2>Lịch xuất bản</h2><p>{state?.schedule ? `${({PENDING:"Đang chờ",PUBLISHED:"Đã xuất bản",CANCELLED:"Đã hủy",FAILED:"Không xuất bản được"})[state.schedule.status]} · ${new Date(state.schedule.dueAt).toLocaleString("vi-VN")}` : "Chưa đặt lịch."}</p>{state?.schedule?.error && <p role="status">{state.schedule.error}</p>}{state?.schedule?.status === "PENDING" && state.schedule.revision !== revision && <p role="alert">Bản nháp đã đổi. Lịch cũ sẽ không xuất bản phiên bản mới; cần duyệt lại và đặt lịch mới.</p>}
    {canPublish && <div className={styles.reviewActions}><label>Ngày giờ theo múi giờ trên máy<input type="datetime-local" value={date} disabled={busy} onChange={event => setDate(event.target.value)} /></label><button disabled={!enabled || busy || !date || !state} onClick={() => void update(false)}>Đặt lịch phiên bản đã duyệt</button>{state?.schedule?.status === "PENDING" && <button disabled={busy} onClick={() => void update(true)}>Hủy lịch</button>}</div>}
    <button disabled={busy} onClick={() => setRefresh(value => value + 1)}>Cập nhật trạng thái lịch</button>{error && <p role="alert" className={styles.error}>{error}</p>}<small>Lưu theo UTC. Máy chủ kiểm tra mỗi 30 giây; chỉ xuất bản đúng phiên bản đã duyệt khi đến giờ. Thay đổi nội dung hoặc mất quyền xuất bản sẽ chặn lịch cũ.</small>
  </section>;
}
