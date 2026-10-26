import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const compiled = ts.transpileModule(readFileSync(new URL('../src/lib/validation/rules.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const loaded = { exports: {} };
new Function('exports', compiled)(loaded.exports);
const { validateLoginAccount, validateUsername } = loaded.exports;

test('login accepts the existing admin account without weakening account creation', () => {
  assert.equal(validateLoginAccount('admin').isValid, true);
  assert.equal(validateLoginAccount(' admin ').isValid, true);
  assert.equal(validateUsername('admin').isValid, false);
});
test('login validates identifiers without reapplying account provisioning email policy', () => {
  for (const input of ['abc', 'lehai1235', 'admin@vlu.edu.vn', 'user@example.com']) assert.equal(validateLoginAccount(input).isValid, true, input);
  for (const input of ['', 'ab', 'admin user', 'admin<script>', 'a'.repeat(51), 'bad@email']) assert.equal(validateLoginAccount(input).isValid, false, input);
});
