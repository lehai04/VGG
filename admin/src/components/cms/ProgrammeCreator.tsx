"use client";
import { useState } from "react";
import { VisualImagePicker } from "./VisualImagePicker";
export function ProgrammeCreator({
  onCreated,
  disabled = false,
  canUpload = false,
}: {
  onCreated: (id: string) => void;
  disabled?: boolean;
  canUpload?: boolean;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const fields = [
    ["id", "Đường dẫn ngành (không dấu, nối bằng dấu -)"],
    ["title", "Tên ngành"],
    ["englishTitle", "Tên tiếng Anh"],
    ["code", "Mã ngành"],
    ["credits", "Số tín chỉ"],
    ["duration", "Thời gian đào tạo"],
    ["tuition", "Học phí"],
    ["studyMode", "Hình thức học"],
    ["intake", "Đợt tuyển sinh"],
    ["bannerImage", "Đường dẫn ảnh banner trong thư viện"],
    ["summary", "Giới thiệu ngắn"],
  ];
  return (
    <details className="admin-card" style={{ padding: 20, marginBottom: 20 }}>
      <summary>Thêm ngành học</summary>
      <p>
        Ngành mới được tạo ở trạng thái bản nháp. Hoàn thiện nội dung và kiểm
        tra trước khi xuất bản; ngành chỉ xuất hiện trong danh mục và form tư
        vấn sau khi xuất bản.
      </p>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError("");
          const data = new FormData(event.currentTarget);
          const input = {
            ...Object.fromEntries(data),
            credits: Number(data.get("credits")),
          };
          try {
            const response = await fetch("/api/cms/website/programmes", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(input),
            });
            const result = await response.json();
            if (!response.ok) throw Error(result.message);
            onCreated(result.data.id);
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <fieldset
          disabled={busy || disabled}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
            gap: 16,
          }}
        >
          {fields.map(([name, label]) => (
            <label key={name}>
              {label}
              <input
                style={{ display: "block", width: "100%" }}
                name={name}
                {...(name === "bannerImage" ? { value: bannerImage, onChange: (event: React.ChangeEvent<HTMLInputElement>) => setBannerImage(event.target.value) } : {})}
                type={name === "credits" ? "number" : "text"}
                min={name === "credits" ? 0 : undefined}
                max={name === "credits" ? 300 : undefined}
                pattern={name === "id" ? "[a-z0-9]+(-[a-z0-9]+)*" : undefined}
                required={!["englishTitle", "intake"].includes(name)}
              />
            </label>
          ))}
          <div style={{ gridColumn: "1 / -1" }}><VisualImagePicker value={bannerImage} onChange={setBannerImage} canUpload={canUpload} /></div>
          <label>
            Trình độ
            <select name="degree">
              <option>Thạc sĩ</option>
              <option>Tiến sĩ</option>
            </select>
          </label>
          <label>
            Nhóm ngành
            <select name="field">
              {[
                "Kinh doanh & Quản lý",
                "Kỹ thuật, Môi trường & Công nghệ",
                "Du lịch & Khách sạn",
                "Luật, Nhân văn & Truyền thông",
                "Thiết kế & Mỹ thuật Ứng dụng",
              ].map((field) => (
                <option key={field}>{field}</option>
              ))}
            </select>
          </label>
          <label>
            Định hướng
            <select name="orientation">
              <option>Ứng dụng</option>
              <option>Nghiên cứu</option>
              <option>Ứng dụng và nghiên cứu</option>
              <option>Đang cập nhật</option>
            </select>
          </label>
          <button type="submit">Tạo bản nháp ngành học</button>
        </fieldset>
      </form>
      {error && <p role="alert">{error}</p>}
    </details>
  );
}
