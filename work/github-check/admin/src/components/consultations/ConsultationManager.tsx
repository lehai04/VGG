"use client";

import { useEffect, useMemo, useState } from "react";

export type Consultation = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  programme: string | null;
  status: string;
  createdAt: string;
};
type AdminStatus = "NEW" | "CONTACTING" | "COMPLETED";

const statuses: Array<{ value: AdminStatus; label: string }> = [
  { value: "NEW", label: "Chưa xử lý" },
  { value: "CONTACTING", label: "Đang xử lý" },
  { value: "COMPLETED", label: "Đã xử lý" },
];

function normalizeStatus(status: string): AdminStatus {
  if (status === "COMPLETED" || status === "CONSULTED") return "COMPLETED";
  if (status === "CONTACTING" || status === "RECEIVED") return "CONTACTING";
  return "NEW";
}

export function ConsultationManager({
  initialConsultations,
  canUpdate,
}: {
  initialConsultations: Consultation[];
  canUpdate: boolean;
}) {
  const [consultations, setConsultations] = useState(initialConsultations);
  const [updatingId, setUpdatingId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch("/api/cms/consultations", {
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          data?: { consultations?: Consultation[] };
        };
        if (active && response.ok && payload.data?.consultations)
          setConsultations(payload.data.consultations);
      } catch {
        // Giữ dữ liệu gần nhất nếu lần làm mới tạm thời mất kết nối.
      }
    };
    const timer = window.setInterval(refresh, 5000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const counts = useMemo(
    () =>
      consultations.reduce(
        (result, item) => {
          result[normalizeStatus(item.status)] += 1;
          return result;
        },
        { NEW: 0, CONTACTING: 0, COMPLETED: 0 } as Record<AdminStatus, number>,
      ),
    [consultations],
  );

  async function updateStatus(id: string, status: AdminStatus) {
    const previous = consultations;
    setUpdatingId(id);
    setMessage("");
    setConsultations((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    try {
      const response = await fetch(`/api/cms/consultations/${id}/status`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok)
        throw new Error(payload.message || "Không thể cập nhật trạng thái.");
      setMessage("Đã cập nhật trạng thái tư vấn.");
    } catch (error) {
      setConsultations(previous);
      setMessage(
        error instanceof Error
          ? error.message
          : "Không thể cập nhật trạng thái.",
      );
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <>
      <section
        className="consultation-summary"
        aria-label="Thống kê trạng thái tư vấn"
      >
        {statuses.map((status) => (
          <article
            className={`consultation-summary__item is-${status.value.toLowerCase()}`}
            key={status.value}
          >
            <span>{status.label}</span>
            <strong>{counts[status.value].toLocaleString("vi-VN")}</strong>
          </article>
        ))}
      </section>
      <p className="consultation-live-note">
        <i /> Danh sách tự cập nhật mỗi 5 giây
      </p>
      <p className="form-message consultation-update-message" role="status">
        {message}
      </p>
      <section className="admin-card admin-table-wrap">
        <table className="admin-table consultation-table">
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Chương trình quan tâm</th>
              <th>Số điện thoại</th>
              <th>Trạng thái</th>
              <th>Ngày gửi</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((item) => {
              const status = normalizeStatus(item.status);
              return (
                <tr key={item.id}>
                  <td>
                    <strong>{item.fullName}</strong>
                  </td>
                  <td>
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </td>
                  <td>{item.programme || "Chưa chọn"}</td>
                  <td>
                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                  </td>
                  <td>
                    <select
                      className={`consultation-status is-${status.toLowerCase()}`}
                      value={status}
                      disabled={!canUpdate || updatingId === item.id}
                      aria-label={`Trạng thái của ${item.fullName}`}
                      onChange={(event) =>
                        updateStatus(item.id, event.target.value as AdminStatus)
                      }
                    >
                      {statuses.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("vi-VN", {
                      dateStyle: "short",
                      timeStyle: "short",
                      timeZone: "Asia/Ho_Chi_Minh",
                    }).format(new Date(item.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {consultations.length === 0 && <p>Chưa có yêu cầu tư vấn.</p>}
      </section>
    </>
  );
}
