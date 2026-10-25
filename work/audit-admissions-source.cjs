const fs=require('node:fs');const ts=require('typescript');const cp=require('node:child_process');
const old=cp.execFileSync('git',['show','HEAD:frontend/src/features/admissions/reference-engine.js'],{encoding:'utf8'});
const current=fs.readFileSync('frontend/src/features/admissions/reference-engine.js','utf8');
function data(source){let value; const ast=ts.createSourceFile('engine.js',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS); function walk(node){if(ts.isVariableDeclaration(node)&&node.name.getText(ast)==='DATA') value=Function('return ('+node.initializer.getText(ast)+')')();ts.forEachChild(node,walk)}walk(ast);return value;}
const before=data(old),after=data(current);require('node:assert/strict').deepEqual(after,before);
fs.writeFileSync('outputs/admissions-redesign-source-audit.json',JSON.stringify({unchangedAdmissionsData:true,programmes:after.programs.length},null,2));console.log('Admissions source DATA unchanged; programmes:',after.programs.length);
