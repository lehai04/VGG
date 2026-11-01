import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";

/** Only called after the route has allowed a known local document or /api/media key. */
export async function resourceUpstream(source: string): Promise<Response> {
  if (source.startsWith("/api/media/")) {
    let key: string;
    try { key = decodeURIComponent(source.slice("/api/media/".length)); }
    catch { return new Response(null, { status: 403 }); }
    if (!key || /[\\?#\u0000-\u001f]/.test(key) || key.split("/").some(part => part === "." || part === "..")) {
      return new Response(null, { status: 403 });
    }
    const backend = process.env.BACKEND_INTERNAL_URL;
    if (!backend) return new Response(null, { status: 503 });
    return fetch(`${backend.replace(/\/$/, "")}/api/public/media/${key.split("/").map(encodeURIComponent).join("/")}`, {
      cache: "no-store", redirect: "error", signal: AbortSignal.timeout(10000),
    });
  }
  if (!source.startsWith("/documents/demo/")) return new Response(null, { status: 403 });
  const filename = source.slice("/documents/demo/".length);
  if (!/^[a-zA-Z0-9_-]+\.pdf$/.test(filename)) return new Response(null, { status: 403 });
  // A fixed directory keeps Next.js file tracing bounded to the public PDF files.
  const file = join(process.cwd(), "public/documents/demo", filename);
  try {
    const info = await stat(file);
    if (!info.isFile()) return new Response(null, { status: 404 });
    const stream = Readable.toWeb(createReadStream(file)) as ReadableStream<Uint8Array>;
    return new Response(stream, { headers: { "content-length": String(info.size) } });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Response(null, { status: 404 });
    throw error;
  }
}
