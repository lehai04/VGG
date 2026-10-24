import fs from 'node:fs';
const out='outputs/vgg-content-audit';
const inventory=JSON.parse(fs.readFileSync(out+'/repository-audit.json','utf8'));
const routes=[...inventory.routes,'/sitemap.xml','/robots.txt','/missing-page-audit'];
fs.mkdirSync(out+'/http-pages',{recursive:true});
let cursor=0;const results=[];
async function check(route){
 let url='http://localhost:3000/vi'+(route==='/'?'':route);const chain=[];
 try{
  for(let n=0;n<8;n++){
   const response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(30000)});
   const location=response.headers.get('location');chain.push({url,status:response.status,location});
   if(location&&response.status>=300&&response.status<400){const next=new URL(location,url);if(next.origin!=='http://localhost:3000'){results.push({route,chain,external:next.href});return;}url=next.href;continue;}
   const html=await response.text();const file=encodeURIComponent(route==='/'?'home':route)+'.html';
   fs.writeFileSync(out+'/http-pages/'+file,html);results.push({route,status:response.status,finalUrl:url,chain,file});return;
  }
  results.push({route,error:'redirect limit',chain});
 }catch(error){results.push({route,error:error.message,chain});}
}
await Promise.all(Array.from({length:4},async()=>{while(cursor<routes.length){const route=routes[cursor++];await check(route);if(results.length%10===0)console.log(`Checked ${results.length}/${routes.length} routes`);}}));
results.sort((a,b)=>a.route.localeCompare(b.route));fs.writeFileSync(out+'/http-route-results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify({checked:results.length,errors:results.filter(r=>r.error||r.status>=400).map(({route,status,error})=>({route,status,error}))},null,2));
