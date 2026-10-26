"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./VisualWebsiteManager.module.css";
const devices = [
  { id: "auto", label: "Vừa khung", width: 0, height: 1400 },
  { id: "desktop", label: "Desktop", width: 1440, height: 1400 },
  { id: "tablet", label: "Tablet", width: 820, height: 1180 },
  { id: "phone", label: "Điện thoại", width: 390, height: 844 },
] as const;
export function DevicePreview({
  src,
  frameRef,
}: {
  src?: string;
  frameRef: RefObject<HTMLIFrameElement | null>;
}) {
  const [device, setDevice] = useState<string>("auto");
  const [width, setWidth] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) =>
      setWidth(Math.floor(entries[0].contentRect.width)),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const current = devices.find((item) => item.id === device)!;
  const scale = current.width && width ? Math.min(1, width / current.width) : 1;
  return (
    <section className={styles.preview} aria-label="Bản xem trước website">
      <header className={styles.previewHeader}>
        <div>
          <span className={styles.eyebrow}>LIVE PREVIEW</span>
          <strong>Giao diện website thực tế</strong>
        </div>
        <span className={styles.previewSize}>
          {current.width
            ? `${current.width} × ${current.height}`
            : "Co giãn theo khung"}
        </span>
      </header>
      <div
        className={styles.devices}
        role="group"
        aria-label="Kích thước bản xem trước"
      >
        {devices.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={device === item.id}
            onClick={() => setDevice(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div ref={stage} className={styles.previewStage}>
        <div
          className={styles.canvas}
          style={{
            height: Math.round(current.height * scale),
            width: current.width ? Math.round(current.width * scale) : "100%",
          }}
        >
          {src ? (
            <iframe
              ref={frameRef}
              src={src}
              title="Trang web thực tế · bản chỉnh sửa riêng"
              style={{
                width: current.width || "100%",
                height: current.height,
                transform: `scale(${scale})`,
              }}
            />
          ) : (
            <div className={styles.loading} role="status">
              Đang chuẩn bị bản xem trước…
            </div>
          )}
        </div>
      </div>
      <p className={styles.previewNote}>
        Bản xem trước riêng. Click vào nội dung có viền xanh khi rê chuột để sửa;
        website chính chỉ cập nhật sau khi xuất bản.
      </p>
    </section>
  );
}
