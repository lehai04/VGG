import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const root=path.resolve('frontend/src');
const out='outputs/vgg-content-audit';fs.mkdirSync(out,{recursive:true});
const modules=new Map();
function load(file){file=path.resolve(file);if(modules.has(file))return modules.get(file).exports;const record={exports:{}};modules.set(file,record);const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;new Function('require','exports','module',compiled)(name=>load(path.resolve(path.dirname(file),name+'.ts')),record.exports,record);return record.exports;}
const {programmes}=load(path.join(root,'data/programmes.ts'));
const {getProgrammeCurricula}=load(path.join(root,'data/curricula.ts'));
const site=load(path.join(root,'data/site.ts'));
const before=JSON.parse(fs.readFileSync(out+"/before-programmes.json","utf8"));const keys=["id","title","code","credits","duration","tuition","orientation","orientations","degree","studyMode"];const differences=[];for(const p of programmes.filter(p=>p.id!=="marketing")){const b=before.find(x=>x.id===p.id);for(const k of keys)if(JSON.stringify(p[k])!==JSON.stringify(b[k]))differences.push({id:p.id,key:k,before:b[k],after:p[k]});}fs.writeFileSync(out+"/preserved-programme-metadata.json",JSON.stringify({programmes:20,keys,differences},null,2));console.log(JSON.stringify({differences}));