import { getCurrentAdmin } from "@/lib/auth/session";
import { uploadNewsImage } from "@/lib/storage";
import mammoth from "mammoth";
import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";

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
        const extension = image.contentType?.split("/")[1]?.replace("jpeg", "jpg") || "png";
        const uploaded = await uploadNewsImage(buffer, "news/word", extension);
        return { src: uploaded.url };
      }),
    },
  );
  const html = sanitizeHtml(result.value, {
    allowedTags,
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"] },
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
