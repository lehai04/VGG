import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const compiled=ts.transpileModule(readFileSync(new URL('../src/features/resources/data.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
test('explicit CMS mode retains empty categories and all supported types',async()=>{
  const previous={demo:process.env.VGG_DEMO_RESOURCES,backend:process.env.BACKEND_INTERNAL_URL};
  process.env.VGG_DEMO_RESOURCES='false';process.env.BACKEND_INTERNAL_URL='http://test.invalid';
  try {
    const loaded={exports:{}};
    const data={resources:[],categories:[{id:'empty',name:'Danh mục chưa có tài liệu'}],resourceTypes:['DIRECTIVE_DOCUMENT','EXECUTION_DOCUMENT','BROCHURE','PDF_DOCUMENT']};
    let fetched=false;
    new Function('exports','require','fetch',compiled)(loaded.exports,()=>({demoResources:[{title:'Demo'}]}),async()=>{fetched=true;return {ok:true,json:async()=>({data})};});
    assert.deepEqual(await loaded.exports.getPublicResourceCatalogue(),data);
    assert.equal(fetched,true);
  } finally {
    if(previous.demo===undefined)delete process.env.VGG_DEMO_RESOURCES;else process.env.VGG_DEMO_RESOURCES=previous.demo;
    if(previous.backend===undefined)delete process.env.BACKEND_INTERNAL_URL;else process.env.BACKEND_INTERNAL_URL=previous.backend;
  }
});

test('default demo loads real local PDFs without fetching the backend', async () => {
  const previous = process.env.VGG_DEMO_RESOURCES;
  delete process.env.VGG_DEMO_RESOURCES;
  try {
    const demoModule = { exports: {} };
    const demoCode = ts.transpileModule(readFileSync(new URL('../src/features/resources/demo-resources.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    new Function('exports', demoCode)(demoModule.exports);
    const loaded = { exports: {} };
    new Function('exports', 'require', 'fetch', compiled)(loaded.exports, () => demoModule.exports, () => { throw new Error('Demo must not call backend'); });
    const catalogue = await loaded.exports.getPublicResourceCatalogue();
    assert.ok(catalogue.resources.length >= 5);
    assert.equal(catalogue.resources[0].slug, 'thong-bao-tuyen-sinh-thac-si-2027');
    assert.equal(catalogue.resources[4].slug, '23-2021-tt-bgddt');
    for (const resource of catalogue.resources) {
      const pdf = readFileSync(new URL(`../public${resource.fileUrl}`, import.meta.url));
      assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
      assert.equal(pdf.length, resource.fileSize);
      assert.ok(catalogue.categories.some(category => category.id === resource.category.id));
    }
  } finally {
    if (previous === undefined) delete process.env.VGG_DEMO_RESOURCES;
    else process.env.VGG_DEMO_RESOURCES = previous;
  }
});
