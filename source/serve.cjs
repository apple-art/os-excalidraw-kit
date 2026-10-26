const http=require('http'),fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'../assets'),app=path.join(__dirname,'.exporter');const meta=new Map(JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8')).map(item=>[item.id,item]));
http.createServer(async(req,res)=>{try{
 if(req.method==='POST'&&req.url==='/save'){
  let body='';for await(const chunk of req){body+=chunk;if(body.length>12000000)throw Error('Oversize');}
  const data=JSON.parse(body);if(!/^(0[1-9]|1[0-9]|2[0-4])-[a-z-]+$/.test(data.id))throw Error('Invalid component ID');
  const doc=JSON.parse(data.json);if(doc.type!=='excalidraw'||doc.elements.some(e=>e.type==='image'))throw Error('Native shapes required');
  for(const [ext,value]of [['excalidraw',data.json],['svg',data.svg]])fs.writeFileSync(path.join(root,`${data.id}.${ext}`),value);
  fs.writeFileSync(path.join(root,`${data.id}.png`),Buffer.from(data.png,'base64'));meta.set(data.id,{...meta.get(data.id),id:data.id,title:data.title,description:data.description||meta.get(data.id)?.description,elements:data.elements});
  fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify([...meta.values()],null,2));res.writeHead(200);res.end('ok');console.log('Saved',data.id);return;
 }
 const url=new URL(req.url,'http://localhost');const rel=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname),target=path.resolve(app,'.'+rel);
 if(!target.startsWith(app+path.sep)||!fs.existsSync(target)){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.woff2':'font/woff2'}[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(target).pipe(res);
 }catch(e){res.writeHead(500);res.end(String(e));}}).listen(8772,'127.0.0.1',()=>console.log('http://127.0.0.1:8772'));
