import assert from "node:assert/strict";
import test from "node:test";
process.env.DATABASE_URL ||= "postgresql://unused:unused@127.0.0.1:1/unused";
process.env.CMS_APP_URL = "http://localhost:3001";
const { buildApp } = await import("../dist/app.js");
const headers = { origin: process.env.CMS_APP_URL, "x-vgg-admin": "1" };
test("CMS login limits rotating accounts per IP before database/hash work", async () => {
  const app = await buildApp();
  try {
    for (let i = 0; i < 21; i++) {
      const r = await app.inject({ method: "POST", url: "/api/admin/login", remoteAddress: "198.51.100.10", headers: { ...headers, "x-forwarded-for": `203.0.113.${i+1}` }, payload: { email: `candidate${i}@example.test`, password: "" } });
      assert.equal(r.statusCode, i < 20 ? 400 : 429);
      if (i === 20) assert.ok(Number(r.headers["retry-after"]) > 0);
    }
    const other = await app.inject({ method: "POST", url: "/api/admin/login", remoteAddress: "198.51.100.11", headers, payload: { email: "other@example.test", password: "" } });
    assert.equal(other.statusCode, 400);
  } finally { await app.close(); }
});
test("CMS retains independent account quota when IP changes", async () => {
  const app = await buildApp();
  try {
    for (let i = 0; i < 6; i++) {
      const r = await app.inject({ method: "POST", url: "/api/admin/login", remoteAddress: `198.51.100.${i+1}`, headers, payload: { email: "same@example.test", password: "" } });
      assert.equal(r.statusCode, i < 5 ? 400 : 429);
    }
  } finally { await app.close(); }
});
