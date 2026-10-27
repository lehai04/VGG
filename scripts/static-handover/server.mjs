// Dependency-free static preview server. No build or npm install required.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'site');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.webm':'video/webm','.mp4':'video/mp4','.pdf':'application/pdf','.json':'application/json'};
const types = JSON.parse(fs.readFileSync(new URL('./content-types.json', import.meta.url), 'utf8'));
const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || '127.0.0.1';
http.createServer((req,res)=>{
  if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405,{'Allow':'GET, HEAD'});return res.end('Static review copy: writes are disabled.');}
  let pathname;
  try {pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400);return res.end();}
  let file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}
  try {
    if(fs.statSync(file).isDirectory()){
      if(!pathname.endsWith('/')){res.writeHead(302,{'Location':pathname+'/'});return res.end();}
      file=path.join(file,'index.html');
    }
    const stat=fs.statSync(file);
    if(!stat.isFile())throw Error('Not a file');
    const local='/'+path.relative(root,file).split(path.sep).join('/');
    const headers={'Content-Type':types[local]||mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
    let start=0,end=stat.size-1,status=200;
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match || (!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
      start=match[1]?Number(match[1]):Math.max(0,stat.size-Number(match[2]));
      end=match[1]&&match[2]?Math.min(Number(match[2]),stat.size-1):stat.size-1;
      if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length']=Math.max(0,end-start+1);
    res.writeHead(status,headers);
    if(req.method==='HEAD'||!stat.size)return res.end();
    fs.createReadStream(file,{start,end}).on('error',()=>res.destroy()).pipe(res);
  } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Trang không có trong bản tĩnh. Xem /page-index.html');}
}).listen(port,host,()=>console.log(`VGG static review: http://${host}:${port}\nNo Docker, build, npm install or database required. Ctrl+C to stop.`));
