const fs=require('fs'),path=require('path'),ts=require('typescript');let count=0;const files=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(p.endsWith('.tsx'))files.push(p);}}walk('frontend/src');
for(const f of files){let s=fs.readFileSync(f,'utf8');const ast=ts.createSourceFile(f,s,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const edits=[];
function visit(n,inHeading=false){const heading=inHeading||(ts.isJsxElement(n)&&/^h[1-6]$/.test(n.openingElement.tagName.getText(ast)));if(heading&&ts.isJsxSelfClosingElement(n)&&n.tagName.getText(ast)==='br'){edits.push([n.getStart(ast),n.end,ts.isJsxElement(n.parent)||ts.isJsxFragment(n.parent)?'{" "}':'" "']);return;}ts.forEachChild(n,c=>visit(c,heading));}visit(ast);
for(const [a,b,replacement]of edits.sort((a,b)=>b[0]-a[0]))s=s.slice(0,a)+replacement+s.slice(b);if(edits.length){fs.writeFileSync(f,s);count+=edits.length;}}
console.log('Removed '+count+' forced heading breaks');
