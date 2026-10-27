import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
test('news renderer fetches private preview snapshot only when a valid token is supplied',async()=>{
  const source=readFileSync(new URL('../../frontend/src/features/news/data.ts',import.meta.url),'utf8');
  const exports={};const calls=[];
  const fetch=async(url,options)=>{calls.push({url,options});return{ok:true,json:async()=>({data:{post:{slug:'test-news',title:options.method==='POST'?'Private draft':'Live post'}}})};};
  new Function('exports','require','process','fetch',ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(exports,()=>({getDemoNewsPosts:()=>[]}),{env:{BACKEND_INTERNAL_URL:'http://backend.test'}},fetch);
  assert.equal((await exports.getNewsPost('test-news')).title,'Live post');
  assert.equal((await exports.getNewsPost('test-news','a'.repeat(64))).title,'Private draft');
  assert.equal(calls[1].url,'http://backend.test/api/public/news-preview');
  assert.deepEqual(JSON.parse(calls[1].options.body),{token:'a'.repeat(64)});
  assert.equal(calls[1].options.cache,'no-store');
  assert.equal(await exports.getNewsPost('test-news','invalid'),null);
  assert.equal(calls.length,2,'Invalid token cannot fall back to the published article');
  assert.equal(await exports.getNewsPost('different-slug','a'.repeat(64)),null);
});
