import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../scripts/check-runtime.mjs", import.meta.url));
function check(cmsUrl) {
  const env = { ...process.env, NODE_ENV: "production", DATABASE_URL: "postgresql://unused:unused@127.0.0.1:1/unused" };
  delete env.STORAGE_ACCESS_KEY;
  delete env.STORAGE_SECRET_KEY;
  delete env.CMS_APP_URL;
  if (cmsUrl !== undefined) env.CMS_APP_URL = cmsUrl;
  return spawnSync(process.execPath, [script, "backend"], { env, encoding: "utf8", timeout: 60000 });
}

test("service preflight rejects the missing CMS origin behind the login failure", () => {
  const result = check();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Missing CMS_APP_URL/);
});

test("production preflight rejects an HTTP origin", () => {
  const result = check("http://localhost:3001");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /must use HTTPS/);
});

test("packaged backend boots with generated client and dependencies without contacting DB", () => {
  const result = check("https://sdh.vlu.edu.vn/cms");
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Runtime check passed/);
  assert.match(result.stderr, /uploads will return 503/);
});
