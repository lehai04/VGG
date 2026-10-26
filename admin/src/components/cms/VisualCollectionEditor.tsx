"use client";
import { VisualImagePicker } from "./VisualImagePicker";
import { cmsFieldLabel } from "./WebsiteManager";
import { RichTextEditor } from "./RichTextEditor";
import { CurriculumEditor } from "./CurriculumEditor";
type Item = Record<string, string>;
export function VisualCollectionEditor({
  path,
  items,
  onChange,
  disabled,
  canUpload,
}: {
  path: string;
  items: Item[];
  onChange: (items: Item[]) => void;
  disabled: boolean;
  canUpload: boolean;
}) {
  if (path === "cmsCurriculum") return <CurriculumEditor items={items} onChange={onChange} disabled={disabled} />;
  const keys =
    path === "cmsOverview" ? ["html"]
    : path === "cmsBasics" ? ["code", "degree", "field", "orientation", "credits"]
    : path === "pageContent.facts.quickFactsDetailed" ? ["label", "value", "detail"]
    : path.endsWith(".faqs") ? ["question", "answer", "hidden"]
    : path.endsWith(".careers") ? ["title", "sub", "group"]
    : path === "cmsCurriculum"
      ? ["name", "credits", "group", "track", "note"]
      : path === "leaders"
      ? ["name", "role", "image"]
      : path.endsWith(".audience")
        ? ["title", "text", "image", "alt"]
        : Object.keys(items[0] ?? { title: "", text: "" }).filter(
            (key) => key !== "id",
          );
  return (
    <fieldset disabled={disabled}>
      <legend>{cmsFieldLabel(path.split(".").at(-1) ?? path)}</legend>
      {items.map((item, index) => (
        <details key={index}>
          <summary>
            {index + 1}. {item.name || item.title || item.question || "Mục mới"}
          </summary>
          {keys.map((key) => (
            <div key={key}>
              <label>
                {(
                  {
                    name: path === "cmsCurriculum" ? "Tên học phần" : "Họ tên",
                    credits: "Số tín chỉ (0–50, có thể dùng .5)",
                    group: "Nhóm học phần / Học kỳ",
                    track: "Định hướng: Ứng dụng hoặc Nghiên cứu",
                    note: "Ghi chú",
                    role: "Chức danh",
                    image: "Ảnh đại diện",
                    title: "Tiêu đề",
                    text: "Nội dung",
                  } as Record<string, string>
                )[key] ?? cmsFieldLabel(key)}
                {key === "hidden" ? <select value={item[key] ?? "false"} onChange={(event) => onChange(items.map((row,i) => i === index ? { ...row, [key]: event.target.value } : row))}><option value="false">Hiển thị</option><option value="true">Ẩn câu hỏi</option></select> : key === "html" && !disabled ? <RichTextEditor value={item[key] ?? ""} onChange={(value) => onChange(items.map((row,i) => i === index ? { ...row, [key]: value } : row))} onImportedExcerpt={() => {}} /> : (["degree", "field", "orientation", "track"].includes(key)) ? <select value={item[key] ?? ""} onChange={(event) => onChange(items.map((row,i) => i === index ? { ...row, [key]: event.target.value } : row))}>
                  <option value="">Chọn giá trị</option>
                  {(key === "degree" ? ["Thạc sĩ", "Tiến sĩ"] : key === "field" ? ["Kinh doanh & Quản lý", "Kỹ thuật, Môi trường & Công nghệ", "Du lịch & Khách sạn", "Luật, Nhân văn & Truyền thông", "Thiết kế & Mỹ thuật Ứng dụng"] : key === "track" ? ["Ứng dụng", "Nghiên cứu"] : ["Ứng dụng", "Nghiên cứu", "Ứng dụng và nghiên cứu", "Đang cập nhật"]).map((value) => <option key={value}>{value}</option>)}
                </select> : <textarea
                  value={item[key] ?? ""}
                  onChange={(event) =>
                    onChange(
                      items.map((row, i) =>
                        i === index
                          ? { ...row, [key]: event.target.value }
                          : row,
                      ),
                    )
                  }
                />}
              </label>
              {key === "image" && (
                <VisualImagePicker
                  value={item[key] ?? ""}
                  onChange={(url) =>
                    onChange(
                      items.map((row, i) =>
                        i === index ? { ...row, [key]: url } : row,
                      ),
                    )
                  }
                  canUpload={canUpload}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            disabled={index === 0}
            onClick={() => {
              const next = [...items];
              [next[index - 1], next[index]] = [next[index], next[index - 1]];
              onChange(next);
            }}
          >
            Lên
          </button>
          <button
            type="button"
            disabled={index === items.length - 1}
            onClick={() => {
              const next = [...items];
              [next[index + 1], next[index]] = [next[index], next[index + 1]];
              onChange(next);
            }}
          >
            Xuống
          </button>
          {path !== "cmsBasics" && <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            Xóa mục
          </button>}
        </details>
      ))}
      {path !== "cmsBasics" && <button
        type="button"
        onClick={() =>
          onChange([
            ...items,
            {
              ...Object.fromEntries(keys.map((key) => [key, ""])),
              ...(path === "cmsCurriculum" ? { credits: "0", track: "Ứng dụng" } : {}),
              ...(path.endsWith(".faqs") ? { hidden: "false" } : {}),
              ...(path === "services"
                ? { id: `service-${crypto.randomUUID()}` }
                : {}),
            },
          ])
        }
      >
        Thêm mục
      </button>}
    </fieldset>
  );
}
