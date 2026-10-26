"use client";
import { useState } from "react";
type Section = { id: string; title: string };
type Layout = {
  schemaVersion?: 1;
  order: string[];
  hidden: string[];
  added: Array<{
    schemaVersion?: 1;
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
    return { schemaVersion: 1, order: sections.map((item) => item.id), hidden: [], added: [] };
  };
  const [layout, setLayoutState] = useState<Layout>(initial);
  function setLayout(next: Layout) {
    setLayoutState(next);
    onDirtyChange(true);
  }
  const [error, setError] = useState("");
  const [dragged, setDragged] = useState<string|null>(null);
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
          <fieldset key={id} disabled={disabled} onDragOver={event=>{if(dragged&&!disabled)event.preventDefault();}} onDrop={event=>{
            event.preventDefault();
            if(!dragged||dragged===id||disabled)return;
            const next=order.filter(key=>key!==dragged);next.splice(next.indexOf(id),0,dragged);setLayout({...layout,order:next});setDragged(null);
          }}>
            <legend>
              {index + 1}.{" "}
              {custom?.title ?? sections.find((s) => s.id === id)?.title ?? id}
            </legend>
            <button type="button" draggable={!disabled} onDragStart={event=>{event.dataTransfer.setData("text/plain",id);event.dataTransfer.effectAllowed="move";setDragged(id);}} onDragEnd={()=>setDragged(null)} title="Kéo đến section khác; hoặc dùng nút Lên/Xuống">Kéo sắp xếp ↕</button>
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
                <button type="button" disabled={layout.added.length>=20} onClick={()=>{
                  const copyId=`custom-${crypto.randomUUID()}`;
                  const next=[...order];next.splice(index+1,0,copyId);
                  setLayout({...layout,order:next,added:[...layout.added,{...structuredClone(custom),id:copyId,title:`${custom.title.slice(0,180)} (bản sao)`}]});
                }}>Sao chép khối</button>
                <button type="button" onClick={()=>{
                  if(!window.confirm("Xóa khối tự thêm khỏi bản nháp cấu trúc? Bản công khai chưa thay đổi cho tới khi xuất bản."))return;
                  setLayout({...layout,order:order.filter(key=>key!==id),hidden:layout.hidden.filter(key=>key!==id),added:layout.added.filter(item=>item.id!==id)});
                }}>Xóa khối tự thêm</button>
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
                schemaVersion: 1,
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
              $layout: JSON.stringify({ ...layout, schemaVersion: 1, order, added: layout.added.map(item=>({...item,schemaVersion:1})) }),
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
