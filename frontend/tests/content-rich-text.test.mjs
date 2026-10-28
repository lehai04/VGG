import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as safe from '../../backend/dist/modules/content/content-patch.js';
const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(readFileSync(new URL('../src/shared/components/ContentRichText.tsx', import.meta.url), 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const loaded = { exports: {} };
new Function('exports', 'require', compiled)(loaded.exports, name => name.includes('content-patch') ? safe : require(name));
const render = html => renderToStaticMarkup(createElement(loaded.exports.ContentRichText, { html }));
test('content rich overview preserves basic formatting and safe links', () => {
  const result = render('<p>Giới thiệu <strong>ngành học</strong></p><ul><li>Mục tiêu</li></ul><a href="/admissions">Tuyển sinh</a>');
  assert.match(result, /<strong>ngành học<\/strong>/);
  assert.match(result, /<li>Mục tiêu<\/li>/);
  assert.match(result, /href="\/admissions"/);
});
test('content rich overview never executes stored scripts, styles, handlers or unsafe URLs', () => {
  const result = render('<script>alert(1)</script><p onclick="evil()" style="position:fixed">Safe &lt;script&gt;</p><a href="jav&#x61;script:evil()">Link</a><img src="https://outside.invalid/x" onerror="evil()">');
  assert.doesNotMatch(result, /onclick|onerror|style=|javascript:|alert\(1\)|<script|outside.invalid/);
  assert.match(result, /Safe &lt;script&gt;/);
});
