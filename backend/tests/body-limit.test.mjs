import assert from "node:assert/strict";
import test from "node:test";

process.env.DATABASE_URL ||= "postgresql://vgg:vgg_local_password@localhost:5432/vgg";
process.env.STORAGE_ACCESS_KEY ||= "vgg_test_storage";
process.env.STORAGE_SECRET_KEY ||= "vgg_test_storage_password";
const { buildApp } = await import("../dist/app.js");

test("default body limit accepts 50 MiB and rejects larger requests", async () => {
  const app = await buildApp();
  try {
    // Test-only route: production does not expose an upload endpoint yet.
    app.addContentTypeParser("application/octet-stream", { parseAs: "buffer" }, (_req, body, done) => done(null, body));
    app.post("/__body-limit-test", async request => ({ size: request.body.length }));
    const limit = 50 * 1024 * 1024;
    const accepted = await app.inject({ method: "POST", url: "/__body-limit-test", headers: { "content-type": "application/octet-stream" }, payload: Buffer.alloc(limit) });
    assert.equal(accepted.statusCode, 200);
    assert.equal(accepted.json().size, limit);
    const rejected = await app.inject({ method: "POST", url: "/__body-limit-test", headers: { "content-type": "application/octet-stream", "content-length": String(limit + 1) }, payload: "x" });
    assert.equal(rejected.statusCode, 413);
    const smallRoute = await app.inject({ method: "POST", url: "/api/public/consultations", headers: { "content-type": "application/json" }, payload: JSON.stringify({ message: "x".repeat(20_000) }) });
    assert.equal(smallRoute.statusCode, 413);
  } finally {
    await app.close();
  }
});
