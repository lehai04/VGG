"use client";
import { useState } from "react";
import { VisualImagePicker } from "./VisualImagePicker";
export function VisualBannerEditor({
  value,
  onSave,
  onDirtyChange,
  disabled,
  canUpload,
}: {
  value?: string;
  onSave: (section: string, values: Record<string, string>) => Promise<void>;
  onDirtyChange: (dirty: boolean) => void;
  disabled: boolean;
  canUpload: boolean;
}) {
  const initial = () => {
    try {
      return JSON.parse(value ?? "") as {
        kind: "image" | "video";
        src: string;
        poster?: string;
        alt: string;
      };
    } catch {
      return { kind: "image" as "image" | "video", src: "", alt: "" };
    }
  };
  const [banner, setBannerState] = useState(initial);
  function setBanner(next: ReturnType<typeof initial>) {
    setBannerState(next);
    onDirtyChange(true);
  }
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      const form = new FormData();
      form.set("file", file);
      const response = await fetch("/api/cms/upload-video", {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.message);
      setBanner({ ...banner, kind: "video", src: result.data.url });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details>
      <summary>Media banner · ảnh / video</summary>
      <fieldset disabled={disabled || busy}>
        <p>
          Khuyến nghị 1920 × 1080 px, tỉ lệ 16:9. Ảnh tối đa 8 MB; video
          MP4/WebM tối đa 20 MB.
        </p>
        <label>
          Loại media
          <select
            value={banner.kind}
            onChange={(e) =>
              setBanner({
                ...banner,
                kind: e.target.value as "image" | "video",
                src: "",
              })
            }
          >
            <option value="image">Hình ảnh</option>
            <option value="video">Video</option>
          </select>
        </label>
        {banner.kind === "image" ? (
          <VisualImagePicker
            value={banner.src}
            onChange={(src) => setBanner({ ...banner, src })}
            canUpload={canUpload}
          />
        ) : (
          canUpload && (
            <input
              aria-label="Tải video banner"
              type="file"
              accept="video/mp4,video/webm"
              onChange={(e) => upload(e.target.files?.[0])}
            />
          )
        )}
        <label>
          Đường dẫn media
          <input
            value={banner.src}
            onChange={(e) => setBanner({ ...banner, src: e.target.value })}
          />
        </label>
        <label>
          Mô tả ảnh
          <input
            value={banner.alt}
            onChange={(e) => setBanner({ ...banner, alt: e.target.value })}
          />
        </label>
        <button
          onClick={async () => {
            try {
              await onSave("banner", { $banner: JSON.stringify(banner) });
              onDirtyChange(false);
              setError("Đã lưu banner vào bản nháp.");
            } catch {
              setError("Chưa lưu được banner.");
            }
          }}
        >
          Lưu banner
        </button>
        <button
          onClick={() => {
            setBannerState(initial());
            onDirtyChange(false);
          }}
        >
          Hủy banner
        </button>
      </fieldset>
      {error && <p role="status">{error}</p>}
    </details>
  );
}
