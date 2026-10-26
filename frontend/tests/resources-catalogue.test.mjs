import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const compiled=ts.transpileModule(readFileSync(new URL('../src/features/resources/data.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
test('resources default to CMS and retain empty categories and all supported types',async()=>{
  const previous={demo:process.env.VGG_DEMO_RESOURCES,backend:process.env.BACKEND_INTERNAL_URL};
  delete process.env.VGG_DEMO_RESOURCES;process.env.BACKEND_INTERNAL_URL='http://test.invalid';
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
