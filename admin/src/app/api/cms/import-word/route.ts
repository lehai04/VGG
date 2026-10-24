import { getCurrentAdmin } from "@/lib/auth/session";
import { uploadNewsImage } from "@/lib/storage";
import mammoth from "mammoth";
import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import sharp from "sharp";

export const runtime = "nodejs";

const allowedTags = ["p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "blockquote", "a", "img", "table", "thead", "tbody", "tr", "th", "td"];

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ success: false, message: "Bạn chưa đăng nhập." }, { status: 401 });
  if (!admin.permissionCodes.includes("news.create") && !admin.permissionCodes.includes("news.update")) {
    return NextResponse.json({ success: false, message: "Bạn không có quyền biên tập Tin tức." }, { status: 403 });
  }

  const data = await request.formData();
  const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.json({ success: false, message: "Chưa chọn file Word." }, { status: 400 });
  if (!file.name.toLowerCase().endsWith(".docx")) return NextResponse.json({ success: false, message: "Chỉ hỗ trợ file Word định dạng .docx." }, { status: 415 });
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ success: false, message: "File Word không được vượt quá 10 MB." }, { status: 413 });

  const result = await mammoth.convertToHtml(
    { buffer: Buffer.from(await file.arrayBuffer()) },
    {
      styleMap: ["p[style-name='Title'] => h2:fresh", "p[style-name='Heading 1'] => h2:fresh", "p[style-name='Heading 2'] => h3:fresh", "p[style-name='Heading 3'] => h4:fresh"],
      convertImage: mammoth.images.imgElement(async (image) => {
        const buffer = Buffer.from(await image.read("base64"), "base64");
        const metadata = await sharp(buffer, { limitInputPixels: 40_000_000, failOn: "error" }).metadata();
        if (!metadata.width || !metadata.height) throw new Error("Không đọc được kích thước ảnh nhúng trong Word.");
        const imageId = crypto.randomUUID();
        const widths = [...new Set([480, 960, 1440].filter((width) => width < metadata.width!).concat(metadata.width))];
        const variants = await Promise.all(widths.map(async (width) => {
          const output = await sharp(buffer, { limitInputPixels: 40_000_000, failOn: "error" }).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toBuffer({ resolveWithObject: true });
          const uploaded = await uploadNewsImage(output.data, "news/word", "webp", `${imageId}-${output.info.width}`);
          return { ...uploaded, width: output.info.width, height: output.info.height };
        }));
        const largest = variants.reduce((best, item) => item.width > best.width ? item : best, variants[0]);
        return { src: largest.url, srcset: variants.map((item) => `${item.url} ${item.width}w`).join(", "), sizes: "(max-width: 800px) 100vw, 785px", width: String(largest.width), height: String(largest.height), alt: "" };
      }),
    },
  );
  const html = sanitizeHtml(result.value, {
    allowedTags,
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "srcset", "sizes", "width", "height", "alt"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: { a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }) },
  }).trim();
  const text = sanitizeHtml(html, { allowedTags: [] }).replace(/\s+/g, " ").trim();
  if (!text) return NextResponse.json({ success: false, message: "Không tìm thấy nội dung chữ trong file Word." }, { status: 422 });

  return NextResponse.json({
    success: true,
    data: { html, excerpt: text.slice(0, 300), warnings: result.messages.map((item) => item.message) },
    message: "Đã nhập nội dung từ Word.",
  });
}
