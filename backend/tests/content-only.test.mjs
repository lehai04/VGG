import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeContentOnly, mergeContentLists, hasPresentationChanges } from '../dist/modules/cms/content-only.js';

test('content edits preserve existing layout, banner, collections and unrelated patches', () => {
  const base = { $layout: '{"order":["hero"]}', $banner: '{"position":"left"}', title: 'Old', description: 'Keep' };
  const next = mergeContentOnly('home', {title:'Source',description:'Source'}, base, {title:'New'});
  assert.deepEqual(next, {...base,title:'New'});
  assert.equal(base.title,'Old');
});
test('content endpoint rejects injected layout, identity and unknown fields', () => {
  for (const changes of [{ $layout:'{}' },{id:'new-id'},{unknown:'text'},{constructor:'x'}])
    assert.throws(() => mergeContentOnly('home',{id:'home',title:'Title'},{},changes),/CONTENT_FIELD_INVALID/);
});
test('content endpoint rejects unsafe URLs and accepts incomplete text drafts', () => {
  assert.throws(() => mergeContentOnly('home',{href:'/admissions'},{},{href:'javascript:alert(1)'}));
  assert.deepEqual(mergeContentOnly('home',{title:'Title'},{},{title:''}),{title:''});
});
test('new publishing flow detects inherited draft presentation changes', () => {
  assert.equal(hasPresentationChanges({$layout:'a'},{$layout:'a'}),false);
  assert.equal(hasPresentationChanges({$layout:'a'},{}),true);
  assert.equal(hasPresentationChanges({$banner:'b'},{$banner:'a'}),true);
  assert.equal(hasPresentationChanges({title:'new'},{title:'old'}),false);
});

test('list edits preserve presentation and remove stale index patches', () => {
  const baseline = { $layout: 'keep', title: 'Keep', 'pageContent.faq.faqs.0.answer': 'Old answer' };
  const rows = [{question:'New question',answer:'New answer'}];
  const next = mergeContentLists('programme:test', baseline, {'pageContent.faq.faqs':rows});
  assert.equal(next.$layout, 'keep');
  assert.equal(next.title, 'Keep');
  assert.equal(next['pageContent.faq.faqs.0.answer'], undefined);
  assert.deepEqual(JSON.parse(next['$list:pageContent.faq.faqs']), rows);
  assert.equal(baseline['pageContent.faq.faqs.0.answer'], 'Old answer');
});

test('list edits reject composition, arbitrary lists, unsafe images and invalid courses', () => {
  for (const changes of [{$layout: []}, {cmsBasics: []}, {'pageContent.section03.audience':[{title:'Title',text:'Text',image:'javascript:alert(1)'}]}, {cmsCurriculum:[{name:'Course',credits:'999',group:'Group',track:'Ứng dụng',note:''}]}])
    assert.throws(() => mergeContentLists('programme:test', {}, changes), /CONTENT_FIELD_INVALID/);
  assert.throws(() => mergeContentLists('home', {}, {'pageContent.faq.faqs':[]}), /CONTENT_FIELD_INVALID/);
});

test('leaf edits cannot bypass curriculum validation', () => {
  const defaults={cmsCurriculum:[{name:'Course',credits:'3',group:'Group',track:'Ứng dụng',note:''}]};
  assert.throws(()=>mergeContentOnly('programme:test',defaults,{}, {'cmsCurriculum.0.credits':'999'}),/CONTENT_FIELD_INVALID/);
  assert.equal(mergeContentOnly('programme:test',defaults,{}, {'cmsCurriculum.0.credits':'4'})['cmsCurriculum.0.credits'],'4');
});
