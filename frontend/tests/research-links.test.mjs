import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/features/research/links.ts", import.meta.url), "utf8");
const exports = {};
new Function(
  "exports",
  ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
)(exports);

test("research links preserve the source URL and keep content articles attached to their own slug", () => {
  assert.equal(
    exports.researchPostHref("https://www.vlu.edu.vn/projects/du-an-1"),
    "https://www.vlu.edu.vn/projects/du-an-1",
  );
  assert.equal(exports.researchPostHref("cong-bo-moi"), "/news/cong-bo-moi");
  assert.equal(exports.researchPostHref("du-an-moi"), "/news/du-an-moi");
});
