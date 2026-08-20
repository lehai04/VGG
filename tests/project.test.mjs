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
test("consultation endpoint validates input before forwarding", async () => {
  const source = await readFile(
    new URL("../app/api/consultations/route.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /validateConsultation/);
  assert.match(source, /status:\s*429/);
  assert.match(source, /CONSULTATION_WEBHOOK_URL/);
});
test("top-level section routes are separated for independent editing", async () => {
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
    const landing = await readFile(new URL(`../app/${section}/page.tsx`, import.meta.url), "utf8");
    assert.match(landing, /SectionLanding/);
  }
});
