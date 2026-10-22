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

  async function uploadImageFile(file: File) {
    const body = new FormData(); body.append("file", file);
    const response = await fetch("/api/cms/upload-image", { method: "POST", body });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Không thể tải ảnh vừa dán.");
    return result.data.url as string;
  }

  async function uploadClipboardImage(file: File) {
    setUploadingImage(true); setNotice("Đang tải ảnh vừa dán lên kho nội bộ…");
    try {
      run("insertImage", await uploadImageFile(file));
      setNotice("Đã tải và chèn ảnh từ clipboard.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Không thể tải ảnh vừa dán."); }
    finally { setUploadingImage(false); }
  }

  async function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const html = event.clipboardData.getData("text/html");
    const images = Array.from(event.clipboardData.files).filter((file) => file.type.startsWith("image/"));
    if (images.length > 0 && !html) {
      event.preventDefault();
      void uploadClipboardImage(images[0]);
      return;
    }
    if (!html) {
      window.setTimeout(() => onChange(editorRef.current?.innerHTML ?? ""), 0);
      return;
    }

    event.preventDefault();
    const selection = window.getSelection();
    const savedRange = selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
    const documentFragment = new DOMParser().parseFromString(html, "text/html");
    documentFragment.querySelectorAll("script, style, link, meta, iframe, object, embed").forEach((node) => node.remove());
    documentFragment.querySelectorAll("*").forEach((node) => {
      Array.from(node.attributes).forEach((attribute) => {
        if (attribute.name.toLowerCase().startsWith("on")) node.removeAttribute(attribute.name);
      });
    });

    const pastedImages = Array.from(documentFragment.querySelectorAll("img"));
    pastedImages.forEach((image) => {
      const srcset = image.getAttribute("srcset")?.split(",")[0]?.trim().split(/\s+/)[0];
      const source = image.getAttribute("src") || image.getAttribute("data-src") || image.getAttribute("data-original") || image.getAttribute("data-lazy-src") || srcset;
      if (source) image.setAttribute("src", source);
      ["srcset", "data-src", "data-original", "data-lazy-src", "loading"].forEach((name) => image.removeAttribute(name));
    });

    setUploadingImage(true);
    setNotice("Đang xử lý nội dung và tải ảnh vừa dán…");
    try {
      for (let index = 0; index < pastedImages.length; index += 1) {
        const image = pastedImages[index];
        const clipboardFile = images[index];
        if (clipboardFile) {
          image.setAttribute("src", await uploadImageFile(clipboardFile));
          continue;
        }
        const source = image.getAttribute("src") ?? "";
        if (source.startsWith("data:image/")) {
          const blob = await (await fetch(source)).blob();
          const extension = blob.type.split("/")[1] || "png";
          image.setAttribute("src", await uploadImageFile(new File([blob], `clipboard.${extension}`, { type: blob.type })));
        }
      }
      for (let index = pastedImages.length; index < images.length; index += 1) {
        const image = documentFragment.createElement("img");
        image.src = await uploadImageFile(images[index]);
        image.alt = "Ảnh trong nội dung bài viết";
        documentFragment.body.append(image);
      }

      editorRef.current?.focus();
      if (savedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
      }
      document.execCommand("insertHTML", false, documentFragment.body.innerHTML);
      onChange(editorRef.current?.innerHTML ?? "");
      setNotice(images.length || pastedImages.some((image) => image.src.startsWith("data:")) ? "Đã dán nội dung và lưu ảnh vào kho nội bộ." : "Đã dán nội dung và giữ các định dạng được hỗ trợ.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Không thể xử lý nội dung vừa dán.");
    } finally {
      setUploadingImage(false);
    }
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
