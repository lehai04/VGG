import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const compile = path => ts.transpileModule(readFileSync(new URL(path,import.meta.url),'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const limits={exports:{}};new Function('exports',compile('../src/lib/resource-upload-limits.ts'))(limits.exports);
const route={exports:{}};
new Function('exports','require',compile('../src/app/api/cms/upload-resource/route.ts'))(route.exports,name=>{
  if(name==='@/lib/resource-upload-limits') return limits.exports;
  if(name==='@/lib/auth/session') return {getCurrentAdmin:async()=>({permissionCodes:['resources.create']})};
  if(name==='@/lib/storage') return {uploadResourceFile:async()=>({url:'/api/media/test.pdf',objectKey:'test.pdf'})};
  if(name==='next/server') return {NextResponse:{json:(body,options)=>({body,status:options?.status??200})}};
  throw Error(name);
});
function request(size,name='test.pdf',type='application/pdf'){
  const file=new File(['%PDF-1.7'],name,{type});
  Object.defineProperty(file,'size',{value:size});
  return {formData:async()=>new Map([['file',file]])};
}
test('resource upload accepts a PDF at the 100 MB boundary',async()=>{
  assert.equal((await route.exports.POST(request(100*1024*1024))).status,200);
});
test('resource upload rejects PDFs exceeding 100 MB and retains other format limits',async()=>{
  const response=await route.exports.POST(request(100*1024*1024+1));
  assert.equal(response.status,413);
  assert.match(response.body.message,/100 MB/);
  assert.equal((await route.exports.POST(request(101*1024*1024,'test.doc','application/msword'))).status,413);
});
