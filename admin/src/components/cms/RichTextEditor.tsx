"use client";

import { ChangeEvent, ClipboardEvent, useEffect, useRef, useState } from "react";

type Props = { value: string; onChange: (value: string) => void; onImportedExcerpt: (value: string) => void };
type UploadedImage = { url: string; srcSet: string; width: number; height: number };

const tools = [
  ["undo", "↶", "Hoàn tác"], ["redo", "↷", "Làm lại"], ["bold", "B", "In đậm"],
  ["italic", "I", "In nghiêng"], ["underline", "U", "Gạch chân"], ["strikeThrough", "S", "Gạch ngang"],
  ["insertUnorderedList", "• Danh sách", "Danh sách dấu chấm"], ["insertOrderedList", "1. Danh sách", "Danh sách số"],
  ["justifyLeft", "≡", "Căn trái"], ["justifyCenter", "≡", "Căn giữa"], ["justifyRight", "≡", "Căn phải"],
  ["removeFormat", "Tx", "Xóa định dạng rác"],
] as const;

/**
 * Làm sạch HTML: loại bỏ thuộc tính khóa chỉnh sửa (contenteditable="false"),
 * dọn sạch màu nền đen, màu chữ lỗi từ website/dark mode khác sang.
 */
function sanitizePastedHtml(doc: Document | DocumentFragment) {
  // Xóa các thẻ nguy hiểm / không phù hợp
  doc.querySelectorAll("script, style, link, meta, iframe, object, embed, noscript, form, input, button").forEach((node) => node.remove());

  doc.querySelectorAll("*").forEach((node) => {
    // 1. Xóa các sự kiện inline
    Array.from(node.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on")) node.removeAttribute(attr.name);
    });

    // 2. BẮT BUỘC xóa contenteditable để không bao giờ bị khóa chỉnh sửa
    node.removeAttribute("contenteditable");
    node.removeAttribute("tabindex");
    node.removeAttribute("aria-hidden");
    node.removeAttribute("id");

    // 3. Làm sạch inline CSS
    if (node instanceof HTMLElement) {
      const style = node.style;
      // Loại bỏ dứt điểm nền đen xì hoặc nền lạ khi copy từ web / dark mode
      style.removeProperty("background");
      style.removeProperty("background-color");
      style.removeProperty("background-image");

      // Xóa các thuộc tính chặn tương tác chuột hoặc bàn phím
      style.removeProperty("pointer-events");
      style.removeProperty("user-select");
      style.removeProperty("-webkit-user-select");
      style.removeProperty("position");
      style.removeProperty("z-index");
      style.removeProperty("opacity");

      // Đồng bộ typography
      style.removeProperty("font-family");
      style.removeProperty("font-size");
      style.removeProperty("line-height");

      const color = style.color.toLowerCase().replace(/\s+/g, "");
      if (
        color === "#000" ||
        color === "#000000" ||
        color === "rgb(0,0,0)" ||
        color === "#fff" ||
        color === "#ffffff" ||
        color === "rgb(255,255,255)"
      ) {
        style.removeProperty("color");
      }

      if (!node.getAttribute("style") || node.getAttribute("style")?.trim() === "") {
        node.removeAttribute("style");
      }
    }
  });
}

export function RichTextEditor({ value, onChange, onImportedExcerpt }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const isInternalChangeRef = useRef(false);
  const [importing, setImporting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notice, setNotice] = useState("");
  const characterCount = value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").length;

  useEffect(() => {
    if (!editorRef.current) return;
    // Nếu thay đổi xuất phát từ chính thao tác gõ của người dùng thì KHÔNG gán đè innerHTML
    // để tránh phá hủy vị trí con trỏ (Caret) và bộ gõ tiếng Việt IME
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      return;
    }
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  function run(command: string, argument?: string) {
    isInternalChangeRef.current = true;
    editorRef.current?.focus();
    if (command === "removeFormat") {
      document.execCommand("removeFormat", false);
      // Dọn dẹp bổ sung: loại bỏ style bẩn ở thẻ bao quanh vùng chọn
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let node: Node | null = range.commonAncestorContainer;
        if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
        while (node && node !== editorRef.current && editorRef.current?.contains(node)) {
          if (node instanceof HTMLElement) {
            node.removeAttribute("style");
            node.removeAttribute("class");
            node.removeAttribute("contenteditable");
          }
          node = node.parentElement;
        }
      }
      setNotice("Đã xóa định dạng rác và đưa về văn bản chuẩn.");
    } else {
      document.execCommand(command, false, argument);
    }
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
      const imported = new DOMParser().parseFromString(result.data.html as string, "text/html");
      imported.querySelectorAll("img").forEach((image) => { image.alt = imageAlt(image.alt); });
      isInternalChangeRef.current = false;
      onChange(imported.body.innerHTML);
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
    return result.data as UploadedImage;
  }

  function imageAlt(current: string, filename = "") {
    if (current.trim()) return current.trim();
    return window.prompt("Nhập Alt Text mô tả ảnh (bắt buộc)", filename.replace(/\.[^.]+$/, ""))?.trim() || "Ảnh minh họa";
  }

  async function uploadClipboardImage(file: File) {
    setUploadingImage(true); setNotice("Đang tải ảnh vừa dán lên kho nội bộ…");
    try {
      const uploaded = await uploadImageFile(file);
      run("insertImage", uploaded.url);
      const image = editorRef.current?.querySelector(`img[src="${CSS.escape(uploaded.url)}"]`);
      image?.setAttribute("alt", imageAlt("", file.name));
      image?.setAttribute("srcset", uploaded.srcSet);
      image?.setAttribute("sizes", "(max-width: 800px) 100vw, 785px");
      image?.setAttribute("width", String(uploaded.width));
      image?.setAttribute("height", String(uploaded.height));
      onChange(editorRef.current?.innerHTML ?? "");
      setNotice("Đã tải và chèn ảnh từ clipboard.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Không thể tải ảnh vừa dán."); }
    finally { setUploadingImage(false); }
  }

  async function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const html = event.clipboardData.getData("text/html");
    const images = Array.from(event.clipboardData.files).filter((file) => file.type.startsWith("image/"));
    
    // Trường hợp paste file ảnh trực tiếp
    if (images.length > 0 && !html) {
      event.preventDefault();
      void uploadClipboardImage(images[0]);
      return;
    }

    // Trường hợp paste văn bản thuần không có HTML
    if (!html) {
      isInternalChangeRef.current = true;
      window.setTimeout(() => {
        isInternalChangeRef.current = true;
        onChange(editorRef.current?.innerHTML ?? "");
      }, 0);
      return;
    }

    event.preventDefault();
    const selection = window.getSelection();
    const savedRange = selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
    const documentFragment = new DOMParser().parseFromString(html, "text/html");
    
    // Làm sạch triệt để HTML dán vào (xóa nền đen, xóa contenteditable="false", xóa style khóa chuột)
    sanitizePastedHtml(documentFragment);

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
          const uploaded = await uploadImageFile(clipboardFile);
          image.setAttribute("src", uploaded.url);
          image.setAttribute("srcset", uploaded.srcSet);
          image.setAttribute("sizes", "(max-width: 800px) 100vw, 785px");
          image.setAttribute("width", String(uploaded.width));
          image.setAttribute("height", String(uploaded.height));
          image.setAttribute("alt", imageAlt(image.getAttribute("alt") ?? "", clipboardFile.name));
          continue;
        }
        const source = image.getAttribute("src") ?? "";
        if (source.startsWith("data:image/")) {
          const blob = await (await fetch(source)).blob();
          const extension = blob.type.split("/")[1] || "png";
          const uploaded = await uploadImageFile(new File([blob], `clipboard.${extension}`, { type: blob.type }));
          image.setAttribute("src", uploaded.url);
          image.setAttribute("srcset", uploaded.srcSet);
          image.setAttribute("sizes", "(max-width: 800px) 100vw, 785px");
          image.setAttribute("width", String(uploaded.width));
          image.setAttribute("height", String(uploaded.height));
        }
        image.setAttribute("alt", imageAlt(image.getAttribute("alt") ?? ""));
      }
      for (let index = pastedImages.length; index < images.length; index += 1) {
        const image = documentFragment.createElement("img");
        const uploaded = await uploadImageFile(images[index]);
        image.src = uploaded.url;
        image.setAttribute("srcset", uploaded.srcSet);
        image.setAttribute("sizes", "(max-width: 800px) 100vw, 785px");
        image.width = uploaded.width;
        image.height = uploaded.height;
        image.alt = imageAlt("", images[index].name);
        documentFragment.body.append(image);
      }

      isInternalChangeRef.current = true;
      editorRef.current?.focus();
      if (savedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
      }
      document.execCommand("insertHTML", false, documentFragment.body.innerHTML);
      onChange(editorRef.current?.innerHTML ?? "");
      setNotice(images.length || pastedImages.some((image) => image.src.startsWith("data:")) ? "Đã dán nội dung và lưu ảnh vào kho nội bộ." : "Đã dán nội dung và tự động chuẩn hóa định dạng sạch sẽ.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Không thể xử lý nội dung vừa dán.");
    } finally {
      setUploadingImage(false);
    }
  }

  return (
    <div className="rich-editor">
      <div className="rich-editor__toolbar">
        <select aria-label="Kiểu đoạn" defaultValue="p" onChange={(event) => run("formatBlock", event.target.value)}>
          <option value="p">Đoạn văn</option>
          <option value="h2">Tiêu đề 2</option>
          <option value="h3">Tiêu đề 3</option>
          <option value="blockquote">Trích dẫn</option>
        </select>
        {tools.map(([command, label, title]) => (
          <button key={command} type="button" title={title} onMouseDown={(event) => { event.preventDefault(); run(command); }}>
            {label}
          </button>
        ))}
        <button type="button" title="Chèn liên kết" onClick={() => { const url = window.prompt("Nhập liên kết https://…"); if (url) run("createLink", url); }}>
          🔗
        </button>
        <button className="word-import-button" type="button" disabled={importing} onClick={() => fileRef.current?.click()}>
          {importing ? "ĐANG NHẬP…" : "↑ IMPORT WORD"}
        </button>
        <input ref={fileRef} type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden onChange={importWord} />
      </div>
      <div
        ref={editorRef}
        className="rich-editor__surface"
        contentEditable={true}
        suppressContentEditableWarning
        data-placeholder="Bắt đầu soạn nội dung bài viết…"
        onPaste={handlePaste}
        onInput={(event) => {
          isInternalChangeRef.current = true;
          onChange(event.currentTarget.innerHTML);
        }}
        onClick={(event) => {
          if (event.target === editorRef.current) {
            editorRef.current.focus();
          }
        }}
      />
      <div className="rich-editor__status">
        <span>{notice || "Hỗ trợ dán ảnh, gõ phím mượt mà, cuộn nội dung độc lập và import Word .docx"}</span>
        <span>{uploadingImage ? "Đang tải ảnh…" : `${characterCount} ký tự`}</span>
      </div>
    </div>
  );
}
