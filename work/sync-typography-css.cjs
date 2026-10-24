const fs=require('fs'),path=require('path'),postcss=require('postcss');
const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(p.endsWith('.css'))files.push(p);}}walk('frontend/src');walk('admin/src');
const changes=[];const scale=[10,12,14,16,18,20];const nearest=n=>scale.reduce((best,v)=>Math.abs(v-n)<Math.abs(best-n)?v:best,scale[0]);
for(const file of files){const before=fs.readFileSync(file,'utf8');const css=postcss.parse(before);css.walkAtRules('font-face',r=>r.remove());css.walkDecls(d=>{
 if(/^--(?:type-h[1-6]|font-(?:inter|body|heading|navigation|display))$/.test(d.prop)){d.remove();return;}
 if(d.prop==='font-family'&&!/mono|themify|icon/i.test(d.value))d.value='var(--font-sans)';
 if(d.prop==='font-weight'&&/^\d+$/.test(d.value)){const n=Number(d.value);d.value=String(n>=650?700:n>=550?600:n>=450?500:400);}
 if(d.prop==='font-size'){
 const m=d.value.match(/^([\d.]+)(px|rem)$/);if(m){const n=Number(m[1])*(m[2]==='rem'?16:1);if(n>0&&n<=20)d.value='var(--text-'+nearest(n)+')';}
 }
});let after=css.toString();if(after!==before){fs.writeFileSync(file,after);changes.push(file);}}
fs.writeFileSync('outputs/typography-css-changes.json',JSON.stringify(changes,null,2));console.log(changes.length+' stylesheets normalized');
