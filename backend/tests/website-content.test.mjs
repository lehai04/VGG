import assert from 'node:assert/strict';
import test from 'node:test';
import { contentFields, applyContentPatch, safeContentUrl } from '../dist/modules/cms/content-patch.js';
test('content patches preserve structure, identifiers and source defaults', () => {
  const original = { id: 'engineering', code: '123', hero: { title: 'Original', image: '/images/a.jpg' }, cards: [{ title: 'Card' }] };
  const result = applyContentPatch(original, { id: 'changed', 'hero.title': 'Edited', 'cards.0.title': 'Changed card', 'cards.1.title': 'Injected', '__proto__.polluted': 'yes', 'hero.image': 'javascript:alert(1)' });
  assert.equal(result.id, 'engineering'); assert.equal(result.hero.title, 'Edited'); assert.equal(result.cards[0].title, 'Changed card'); assert.equal(result.cards.length, 1); assert.equal(result.hero.image, '/images/a.jpg'); assert.equal(original.hero.title, 'Original'); assert.equal({}.polluted, undefined);
  assert.ok(!contentFields(original).some(f => ['id', 'code'].includes(f.path)));
});
test('CMS URLs reject executable, protocol-relative and backslash URLs', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,x', '//evil.example', '/\\evil.example', 'http://evil.example']) assert.equal(safeContentUrl(value), false, value);
  for (const value of ['/images/a.jpg', 'https://example.edu/a.jpg', '#section', 'tel:+84912345678', 'mailto:example@example.edu']) assert.equal(safeContentUrl(value), true, value);
});
