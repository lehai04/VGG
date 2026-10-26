import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as model from '../../backend/dist/modules/cms/visual-model.js';
const require=createRequire(import.meta.url);
const compiled=ts.transpileModule(readFileSync(new URL('../src/shared/components/CmsPageSections.tsx',import.meta.url),'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const loaded={exports:{}};new Function('exports','require',compiled)(loaded.exports,path=>path.includes('visual-model')?model:path.endsWith('.css')?{default:{}}:path==='next/image'?{default:()=>null}:require(path));
const {CmsPageSections,CmsSlot}=loaded.exports;

test('builder versions accept legacy layouts and reject unsupported schema versions',()=>{
  const legacy=model.parseComposition('home',JSON.stringify({order:['hero'],hidden:[],added:[]}));
  assert.equal(legacy.schemaVersion,1);
  assert.equal(model.parseComposition('home',JSON.stringify({schemaVersion:99,order:['hero'],hidden:[],added:[]})),undefined);
});

test('programme collections isolate new groups and reject invalid course credits',()=>{
  const source={code:'OLD',degree:'Thạc sĩ',field:'Kinh doanh & Quản lý',orientation:'Ứng dụng',pageContent:{section02:{},section03:{}}};
  const changed=model.applyCollections(source,{'$list:cmsObjectives':JSON.stringify([{title:'Năng lực',text:'Mô tả'}]),'$list:cmsRequirements':JSON.stringify([{title:'Văn bằng',text:'Điều kiện'}])},'programme:test');
  assert.equal(changed.pageContent.section02.learningOutcomes.items[0].title,'Năng lực');
  assert.equal(changed.pageContent.section03.requirements[0].paragraphs[0],'Điều kiện');
  assert.equal(source.pageContent.section02.learningOutcomes,undefined);
  assert.equal(model.collectionSchemas('programme:test').cmsCurriculum.safeParse([{name:'Course',credits:'-1',group:'A',track:'Ứng dụng',note:''}]).success,false);
  assert.equal(model.collectionSchemas('discover').cmsCurriculum,undefined);
});
test('without an explicit structure edit, CMS preserves exact public section markup',()=>{const children=[h(CmsSlot,{slot:'hero',key:'hero'},h('section',{id:'hero'},'Banner')),h('nav',{key:'nav'},'Menu'),h(CmsSlot,{slot:'overview',key:'overview'},h('section',{id:'overview'},'Original content'))];assert.equal(renderToStaticMarkup(h(CmsPageSections,null,children)),renderToStaticMarkup(h('section',{id:'hero'},'Banner'))+'<nav>Menu</nav><section id="overview">Original content</section>');});
test('explicit ordering only moves managed sections and retains navigation',()=>{const children=[h(CmsSlot,{slot:'hero',key:'a'},h('section',null,'Banner')),h('nav',{key:'nav'},'Menu'),h(CmsSlot,{slot:'overview',key:'b'},h('section',null,'Overview'))];const html=renderToStaticMarkup(h(CmsPageSections,{layout:{order:['overview','hero'],hidden:[],added:[]}},children));assert.equal(html,'<section>Overview</section><nav>Menu</nav><section>Banner</section>');});
test('composition rejects unknown sections and duplicate custom identities',()=>{assert.equal(model.parseComposition('home',JSON.stringify({order:['not-registered'],hidden:[],added:[]})),undefined);assert.equal(model.parseComposition('home',JSON.stringify({order:['hero','hero'],hidden:[],added:[]})),undefined);});
test('leader changes use independent copies and strict list schemas',()=>{const source={leaders:[{name:'Original',role:'Role',image:'/images/original.jpg'}]};const changed=model.applyCollections(source,{'$list:leaders':JSON.stringify([{name:'New',role:'New role',image:'/images/new.jpg'}])},'discover');assert.equal(changed.leaders[0].name,'New');assert.equal(source.leaders[0].name,'Original');assert.deepEqual(model.applyCollections(source,{'$list:leaders':'[{"name":"Injected","role":"Role","unapproved":true}]'},'discover'),source);});
