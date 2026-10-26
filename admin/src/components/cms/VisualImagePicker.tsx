"use client";
import { useState } from "react";
import Image from "next/image";
type Asset = { url: string; title: string };
export function VisualImagePicker({
  value,
  onChange,
  canUpload,
}: {
  value: string;
  onChange: (url: string) => void;
  canUpload: boolean;
}) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  async function library() {
    setOpened(true);
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/cms/website/media", {
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.message);
      setAssets(result.data.media ?? []);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setError("Ảnh tối đa 8 MB.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/cms/upload-image", {
        method: "POST",
        body,
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.message);
      onChange(result.data.url);
      setOpened(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      {value && (/^\/(?!\/)/.test(value) || value.startsWith("https://")) && <Image unoptimized src={value} alt="Ảnh đang chọn" width={320} height={180} style={{ display: "block", width: "100%", maxWidth: 320, height: "auto", maxHeight: 180, objectFit: "cover", borderRadius: 10, marginBottom: 12 }} />}
      <button type="button" onClick={library} disabled={busy}>
        Chọn ảnh từ thư viện
      </button>
      {canUpload && (
        <label>
          Tải ảnh từ máy (JPG/PNG/WebP/AVIF, tối đa 8 MB)
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            disabled={busy}
            onChange={(event) => upload(event.target.files?.[0])}
          />
        </label>
      )}
      {error && <p role="alert">{error}</p>}
      {opened && (
        <div role="dialog" aria-label="Thư viện ảnh">
          <button type="button" onClick={() => setOpened(false)}>
            Đóng thư viện
          </button>
          <label>
            Tìm ảnh
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tên hoặc đường dẫn ảnh…"
            />
          </label>
          {busy ? (
            <p>Đang tải…</p>
          ) : (
            assets
              .filter((asset) =>
                `${asset.title} ${asset.url}`
                  .toLocaleLowerCase("vi")
                  .includes(search.toLocaleLowerCase("vi")),
              )
              .map((asset) => (
                <button
                  key={asset.url}
                  type="button"
                  aria-pressed={asset.url === value}
                  onClick={() => {
                    onChange(asset.url);
                    setOpened(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    marginTop: 6,
                  }}
                >
                  {asset.title}
                </button>
              ))
          )}
        </div>
      )}
    </div>
  );
}
