import test from "node:test";
import assert from "node:assert/strict";
import { publicSiteOrigin, siteIsIndexable } from "../src/lib/public-site.ts";
import { resourceUpstream } from "../src/lib/resource-upstream.ts";
import { fileURLToPath } from "node:url";

test("deployment origin normalizes slash and rejects paths, credentials and unsafe schemes", () => {
  const previous = process.env.PUBLIC_APP_URL;
  try {
    process.env.PUBLIC_APP_URL = "https://staging.example.test/";
    assert.equal(publicSiteOrigin(), "https://staging.example.test");
    for (const value of ["https://user:password@example.test", "https://example.test/site", "javascript:alert(1)", "https://example.test?x=1"]) {
      process.env.PUBLIC_APP_URL = value; assert.throws(publicSiteOrigin);
    }
  } finally { if (previous === undefined) delete process.env.PUBLIC_APP_URL; else process.env.PUBLIC_APP_URL = previous; }
});
test("staging indexing is an explicit runtime setting", () => {
  const previous = process.env.SITE_INDEXABLE;
  try { process.env.SITE_INDEXABLE = "false"; assert.equal(siteIsIndexable(), false); process.env.SITE_INDEXABLE = "true"; assert.equal(siteIsIndexable(), true); }
  finally { if (previous === undefined) delete process.env.SITE_INDEXABLE; else process.env.SITE_INDEXABLE = previous; }
});
test("local documents stream without any HTTP listener and reject directory escape", async () => {
  const previous = process.cwd();
  process.chdir(fileURLToPath(new URL("../", import.meta.url)));
  try {
    const response = await resourceUpstream("/documents/demo/thong-bao-tuyen-sinh-thac-si-2027.pdf");
    assert.equal(response.status, 200);
    const bytes = Buffer.from(await response.arrayBuffer()); assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
    assert.equal((await resourceUpstream("/documents/demo/missing-test.pdf")).status, 404);
    assert.equal((await resourceUpstream("/documents/demo/../outside.pdf")).status, 403);
  } finally { process.chdir(previous); }
});
test("MinIO documents go directly to the configured backend, never localhost port 3000", async () => {
  const previous = process.env.BACKEND_INTERNAL_URL; const originalFetch = globalThis.fetch;
  try {
    process.env.BACKEND_INTERNAL_URL = "http://backend:4400/";
    globalThis.fetch = async (url, options) => { assert.equal(url, "http://backend:4400/api/public/media/folder/test.pdf"); assert.equal(options.redirect, "error"); assert.ok(options.signal); return new Response("test"); };
    assert.equal(await (await resourceUpstream("/api/media/folder/test.pdf")).text(), "test");
    for (const source of ["/api/media/%2e%2e/secret", "/api/media/a?query=1", "/api/media/%ZZ"]) {
      assert.equal((await resourceUpstream(source)).status, 403);
    }
    delete process.env.BACKEND_INTERNAL_URL; assert.equal((await resourceUpstream("/api/media/test.pdf")).status, 503);
  } finally { globalThis.fetch = originalFetch; if (previous === undefined) delete process.env.BACKEND_INTERNAL_URL; else process.env.BACKEND_INTERNAL_URL = previous; }
});
