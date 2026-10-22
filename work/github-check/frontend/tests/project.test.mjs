/**
 * Kiểm tra cấu trúc (không chạy browser): scripts Next.js, API tư vấn, đủ file page.tsx.
 * Chạy: npm test
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("package exposes a complete Next.js workflow", async () => {
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(pkg.scripts.dev, "next dev");
  assert.equal(pkg.scripts.build, "next build");
  assert.ok(pkg.scripts.check);
  assert.match(pkg.dependencies.next, /^16\./);
});
test("consultation endpoint forwards to the real backend service", async () => {
  const source = await readFile(
    new URL("../src/app/api/consultations/route.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /BACKEND_INTERNAL_URL/);
  assert.match(source, /\/api\/public\/consultations/);
  assert.match(source, /status:\s*502/);
});
test("visit analytics degrades safely when the backend is unavailable", async () => {
  const source = await readFile(
    new URL("../src/app/api/analytics/visit/route.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /try\s*{/);
  assert.match(source, /catch\s*{/);
  assert.match(source, /AbortSignal\.timeout/);
  assert.match(source, /status:\s*502/);
});
test("top-level section routes expose independently editable pages", async () => {
  for (const section of [
    "discover",
    "programmes",
    "admissions",
    "research",
    "global",
    "student-success",
    "news",
    "resources",
  ]) {
    const landing = await readFile(new URL(`../src/app/(public)/${section}/page.tsx`, import.meta.url), "utf8");
    assert.match(landing, /export default/);
  }
});
