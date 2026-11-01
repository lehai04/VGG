import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
process.env.DATABASE_URL ||= "postgresql://unused:unused@127.0.0.1:1/unused";
const { createMediaStorage } = await import("../dist/shared/storage/minio.js");
test("MinIO S3 adapter uses signed path-style reads and streams file bytes", async () => {
  const bytes = Buffer.from("%PDF-1.7\npublic-test-document");
  const seen = [];
  const server = createServer((request, response) => {
    seen.push({ method: request.method, url: request.url, authorization: request.headers.authorization });
    response.setHeader("content-type", "application/pdf");
    response.setHeader("content-length", bytes.length);
    response.setHeader("cache-control", "public, max-age=300");
    response.end(request.method === "HEAD" ? undefined : bytes);
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const storage = createMediaStorage({ endpoint: `http://127.0.0.1:${server.address().port}`, accessKeyId: "integration-only", secretAccessKey: "integration-only-secret" });
  try {
    const metadata = await storage.statObject("public-media", "folder/test.pdf");
    assert.equal(metadata.size, bytes.length);
    assert.equal(metadata.metaData["content-type"], "application/pdf");
    const stream = await storage.getObject("public-media", "folder/test.pdf");
    const chunks = []; for await (const chunk of stream) chunks.push(chunk);
    assert.deepEqual(Buffer.concat(chunks), bytes);
    assert.deepEqual(seen.map(row => row.method), ["HEAD", "GET"]);
    assert.ok(seen.every(row => row.url.startsWith("/public-media/folder/test.pdf")));
    assert.ok(seen.every(row => row.authorization?.startsWith("AWS4-HMAC-SHA256 ")));
  } finally { storage.close(); await new Promise(resolve => server.close(resolve)); }
});
