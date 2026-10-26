"use client";
import { useState } from "react";
type Section = { id: string; title: string };
type Layout = {
  order: string[];
  hidden: string[];
  added: Array<{
    id: string;
    template: "text" | "text-image" | "cards" | "faq";
    title: string;
    body: string;
    image?: string;
    alt?: string;
    items: Array<{ title: string; text: string }>;
  }>;
};
export function VisualStructureEditor({
  sections,
  value,
  onSave,
  onDirtyChange,
  disabled,
}: {
  sections: Section[];
  value?: string;
  onSave: (section: string, values: Record<string, string>) => Promise<void>;
  onDirtyChange: (dirty: boolean) => void;
  disabled: boolean;
}) {
  const initial = (): Layout => {
    try {
      if (value) return JSON.parse(value);
    } catch {}
    return { order: sections.map((item) => item.id), hidden: [], added: [] };
  };
  const [layout, setLayoutState] = useState<Layout>(initial);
  function setLayout(next: Layout) {
    setLayoutState(next);
    onDirtyChange(true);
  }
  const [error, setError] = useState("");
  const order = [
    ...layout.order,
    ...sections.map((s) => s.id),
    ...layout.added.map((s) => s.id),
  ].filter((id, index, all) => all.indexOf(id) === index);
  return (
    <details>
      <summary>Thứ tự và cấu trúc section</summary>
      <p>
        Chỉ dùng thao tác này khi muốn thay đổi bố cục. Xóa sẽ ẩn khối và có thể
        khôi phục.
      </p>
      {order.map((id, index) => {
        const custom = layout.added.find((s) => s.id === id);
        const hidden = layout.hidden.includes(id);
        return (
          <fieldset key={id} disabled={disabled}>
            <legend>
              {index + 1}.{" "}
              {custom?.title ?? sections.find((s) => s.id === id)?.title ?? id}
            </legend>
            <button
              disabled={index === 0}
              onClick={() => {
                const next = [...order];
                [next[index - 1], next[index]] = [next[index], next[index - 1]];
                setLayout({ ...layout, order: next });
              }}
            >
              Lên
            </button>
            <button
              disabled={index === order.length - 1}
              onClick={() => {
                const next = [...order];
                [next[index + 1], next[index]] = [next[index], next[index + 1]];
                setLayout({ ...layout, order: next });
              }}
            >
              Xuống
            </button>
            <button
              onClick={() =>
                setLayout({
                  ...layout,
                  hidden: hidden
                    ? layout.hidden.filter((key) => key !== id)
                    : [...layout.hidden, id],
                })
              }
            >
              {hidden ? "Khôi phục" : "Ẩn section"}
            </button>
            {custom && (
              <>
                <label>
                  Tiêu đề
                  <input
                    value={custom.title}
                    onChange={(e) =>
                      setLayout({
                        ...layout,
                        added: layout.added.map((s) =>
                          s.id === id ? { ...s, title: e.target.value } : s,
                        ),
                      })
                    }
                  />
                </label>
                <label>
                  Nội dung
                  <textarea
                    value={custom.body}
                    onChange={(e) =>
                      setLayout({
                        ...layout,
                        added: layout.added.map((s) =>
                          s.id === id ? { ...s, body: e.target.value } : s,
                        ),
                      })
                    }
                  />
                </label>
              </>
            )}
          </fieldset>
        );
      })}
      <button
        disabled={disabled}
        onClick={() => {
          const id = `custom-${crypto.randomUUID()}`;
          setLayout({
            ...layout,
            order: [...order, id],
            added: [
              ...layout.added,
              {
                id,
                template: "text",
                title: "Section mới",
                body: "",
                items: [],
              },
            ],
          });
        }}
      >
        Thêm section văn bản
      </button>
      <button
        disabled={disabled}
        onClick={async () => {
          try {
            await onSave("structure", {
              $layout: JSON.stringify({ ...layout, order }),
            });
            onDirtyChange(false);
            setError("Đã lưu cấu trúc vào bản nháp.");
          } catch {
            setError(
              "Chưa lưu được cấu trúc. Các thay đổi vẫn được giữ ở đây.",
            );
          }
        }}
      >
        Lưu cấu trúc
      </button>
      <button
        disabled={disabled}
        onClick={() => {
          setLayoutState(initial());
          onDirtyChange(false);
        }}
      >
        Hủy cấu trúc
      </button>
      {error && <p role="status">{error}</p>}
    </details>
  );
}
