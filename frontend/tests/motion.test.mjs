import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/shared/components/layout/RevealOnScroll.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function setup(reduced = false) {
  let cleanup, intersect, mutate, preferenceChanged, queued;
  const active = new Set();
  const preference = { matches: reduced, addEventListener: (_, cb) => preferenceChanged = cb, removeEventListener() {} };
  class Block {
    dataset = {}; isConnected = true; parentElement = null; animations = [];
    closest(selector) { return selector === 'main' ? {} : null; }
    animate() {
      const animation = { cancel() { this.cancelled = true; this.oncancel?.(); } };
      this.animations.push(animation);
      return animation;
    }
  }
  const blocks = [new Block()];
  const context = {
    exports: {},
    require: (name) => name === 'react' ? { useEffect: (effect) => cleanup = effect() } : { usePathname: () => '/vi/research' },
    window: { IntersectionObserver: true, matchMedia: () => preference },
    document: { body: {}, querySelectorAll: () => blocks },
    HTMLElement: Block,
    getComputedStyle: () => ({ animationName: 'none' }),
    requestAnimationFrame: (fn) => { queued = fn; return 1; }, cancelAnimationFrame() {},
    IntersectionObserver: class {
      constructor(cb) { intersect = cb; }
      observe(block) { active.add(block); } unobserve(block) { active.delete(block); } disconnect() { active.clear(); }
    },
    MutationObserver: class { constructor(cb) { mutate = cb; } observe() {} disconnect() {} },
  };
  vm.runInNewContext(compiled, context);
  context.exports.RevealOnScroll();
  return { blocks, active, Block, cleanup: () => cleanup(), enter: (block) => intersect([{ target: block, isIntersecting: true }]),
    reduce: (value) => { preference.matches = value; preferenceChanged(); },
    refresh: () => { mutate(); queued(); } };
}

test('scroll motion is one-shot and releases removed filter results', () => {
  const ui = setup(); const first = ui.blocks[0];
  assert.equal(ui.active.size, 1);
  ui.enter(first);
  assert.equal(first.animations.length, 1);
  assert.equal(ui.active.size, 0);
  ui.refresh();
  assert.equal(ui.active.size, 0);
  const added = new ui.Block(); ui.blocks.push(added); ui.refresh();
  assert.ok(ui.active.has(added));
  added.isConnected = false; ui.blocks.pop(); ui.refresh();
  assert.equal(ui.active.size, 0);
  ui.cleanup();
  assert.equal(first.dataset.siteMotion, undefined);
});

test('reduced motion skips animation and cancels an active reveal immediately', () => {
  const reduced = setup(true);
  assert.equal(reduced.active.size, 0);
  assert.equal(reduced.blocks[0].dataset.siteMotion, undefined);
  reduced.cleanup();
  const ui = setup(); ui.enter(ui.blocks[0]); ui.reduce(true);
  assert.equal(ui.blocks[0].animations[0].cancelled, true);
  assert.equal(ui.active.size, 0);
  assert.equal(ui.blocks[0].dataset.siteMotion, undefined);
  ui.reduce(false);
  assert.equal(ui.active.size, 0, 'already viewed blocks must not replay');
  ui.cleanup();
});
