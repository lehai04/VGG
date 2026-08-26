"use client";

export default function ResourcesError({ reset }: { error: Error; reset: () => void }) {
  return <div className="admin-page"><header className="admin-page__head"><div><span className="eyebrow">CMS / RESOURCES</span><h1>Tài nguyên</h1><p>Quản lý tài nguyên và tài liệu của website</p></div></header><section className="admin-card resource-error-state"><b>Không thể tải dữ liệu tài nguyên</b><p>Kiểm tra kết nối Backend và thử lại.</p><button className="primary-button" type="button" onClick={reset}>Thử lại</button></section></div>;
}
