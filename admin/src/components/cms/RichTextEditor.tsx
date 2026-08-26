"use client";

import { ChangeEvent, ClipboardEvent, useEffect, useRef, useState } from "react";

type Props = { value: string; onChange: (value: string) => void; onImportedExcerpt: (value: string) => void };

const tools = [
  ["undo", "↶", "Hoàn tác"], ["redo", "↷", "Làm lại"], ["bold", "B", "In đậm"],
  ["italic", "I", "In nghiêng"], ["underline", "U", "Gạch chân"], ["strikeThrough", "S", "Gạch ngang"],
  ["insertUnorderedList", "• Danh sách", "Danh sách dấu chấm"], ["insertOrderedList", "1. Danh sách", "Danh sách số"],
  ["justifyLeft", "≡", "Căn trái"], ["justifyCenter", "≡", "Căn giữa"], ["justifyRight", "≡", "Căn phải"],
  ["removeFormat", "Tx", "Xóa định dạng"],
] as const;

export function RichTextEditor({ value, onChange, onImportedExcerpt }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notice, setNotice] = useState("");
  const characterCount = value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").length;

  useEffect(() => { if (editorRef.current && editorRef.current.innerHTML !== value) editorRef.current.innerHTML = value; }, [value]);

  function run(command: string, argument?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, argument);
    onChange(editorRef.current?.innerHTML ?? "");
  }

  async function importWord(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImporting(true); setNotice("");
    const body = new FormData(); body.append("file", file);
    try {
      const response = await fetch("/api/cms/import-word", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể nhập file Word.");
      onChange(result.data.html);
      onImportedExcerpt(result.data.excerpt);
      setNotice(result.data.warnings?.length ? `Đã nhập Word; có ${result.data.warnings.length} cảnh báo định dạng.` : "Đã nhập nội dung Word thành công.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Không thể nhập file Word."); }
    finally { setImporting(false); event.target.value = ""; }
  }

  async function uploadClipboardImage(file: File) {
    setUploadingImage(true); setNotice("Đang tải ảnh vừa dán lên Cloudinary…");
    const body = new FormData(); body.append("file", file);
    try {
      const response = await fetch("/api/cms/upload-image", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể tải ảnh vừa dán.");
      run("insertImage", result.data.url);
      setNotice("Đã tải và chèn ảnh từ clipboard.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Không thể tải ảnh vừa dán."); }
    finally { setUploadingImage(false); }
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const html = event.clipboardData.getData("text/html");
    const image = Array.from(event.clipboardData.files).find((file) => file.type.startsWith("image/"));
    if (image && !html) {
      event.preventDefault();
      void uploadClipboardImage(image);
      return;
    }
    window.setTimeout(() => {
      onChange(editorRef.current?.innerHTML ?? "");
      setNotice(html ? "Đã dán nội dung và giữ định dạng từ trang nguồn." : "Đã dán nội dung.");
    }, 0);
  }

  return <div className="rich-editor">
    <div className="rich-editor__toolbar">
      <select aria-label="Kiểu đoạn" defaultValue="p" onChange={(event) => run("formatBlock", event.target.value)}>
        <option value="p">Đoạn văn</option><option value="h2">Tiêu đề 2</option><option value="h3">Tiêu đề 3</option><option value="blockquote">Trích dẫn</option>
      </select>
      {tools.map(([command, label, title]) => <button key={command} type="button" title={title} onMouseDown={(event) => { event.preventDefault(); run(command); }}>{label}</button>)}
      <button type="button" title="Chèn liên kết" onClick={() => { const url = window.prompt("Nhập liên kết https://…"); if (url) run("createLink", url); }}>🔗</button>
      <button className="word-import-button" type="button" disabled={importing} onClick={() => fileRef.current?.click()}>{importing ? "ĐANG NHẬP…" : "↑ IMPORT WORD"}</button>
      <input ref={fileRef} type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden onChange={importWord} />
    </div>
    <div ref={editorRef} className="rich-editor__surface" contentEditable suppressContentEditableWarning data-placeholder="Bắt đầu soạn nội dung bài viết…" onPaste={handlePaste} onInput={(event) => onChange(event.currentTarget.innerHTML)} />
    <div className="rich-editor__status"><span>{notice || "Hỗ trợ dán ảnh, định dạng và import Word .docx tối đa 10 MB"}</span><span>{uploadingImage ? "Đang tải ảnh…" : `${characterCount} ký tự`}</span></div>
  </div>;
}
