import assert from "node:assert/strict";
import test from "node:test";

process.env.DATABASE_URL ||= "postgresql://vgg:vgg_local_password@localhost:5432/vgg";
const { buildApp } = await import("../dist/app.js");

test("health endpoint starts without requiring a database connection", async () => {
  const app = await buildApp();
  const response = await app.inject({ method: "GET", url: "/health" });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { success: true, data: { status: "ok" }, message: "" });
  await app.close();
});
