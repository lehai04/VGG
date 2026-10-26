import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
const source = new URL('../src/features/admissions/cms-template.ts', import.meta.url);
const compiled = ts.transpileModule(readFileSync(source, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
const loaded = { exports: {} };
new Function('require', 'exports', 'module', compiled)(createRequire(source), loaded.exports, loaded);
const { admissionsHtml, admissionsCopy } = loaded.exports;
const inventory = JSON.parse(readFileSync(new URL('../src/features/admissions/cms-copy.json', import.meta.url), 'utf8'));
const template = JSON.parse(readFileSync(new URL('../src/features/admissions/reference-content.json', import.meta.url), 'utf8')).html;
test('admissions CMS preserves the complete reviewed template with source defaults', () => {
  assert.equal(admissionsHtml(admissionsCopy), template);
  const ordered = [...inventory.slots].sort((a,b) => a.start-b.start);
  for (let i=1; i<ordered.length; i++) assert.ok(ordered[i-1].end <= ordered[i].start, 'Editable slots must not overlap');
  assert.ok(ordered.length > 100);
});
test('admissions CMS escapes text and attribute content without changing form structure', () => {
  const copy = structuredClone(admissionsCopy);
  const slot = inventory.slots.find(item => item.type === 'text');
  copy[slot.section][slot.key] = '<img src=x onerror=alert(1)> & "text"';
  const html = admissionsHtml(copy);
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt; &amp; &quot;text&quot;'));
  assert.ok(!html.includes('<img src=x onerror'));
  const ids = text => [...text.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(ids(html), ids(template));
});
