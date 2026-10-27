const esbuild=require('esbuild'),fs=require('fs'),path=require('path');
const out=path.join(__dirname,'.exporter');fs.mkdirSync(out,{recursive:true});
esbuild.buildSync({entryPoints:[path.join(__dirname,'run.js')],outdir:out,entryNames:'bundle',bundle:true,minify:true,format:'esm',conditions:['production'],nodePaths:(process.env.NODE_PATH||'').split(path.delimiter).filter(Boolean),define:{'process.env.NODE_ENV':'"production"'},logLevel:'warning'});
// Serve the official local fonts rather than using a CDN.
const pkg=path.resolve(path.dirname(require.resolve('@excalidraw/excalidraw')),'../..');
function copy(src,dst){fs.mkdirSync(dst,{recursive:true});for(const ent of fs.readdirSync(src,{withFileTypes:true})){const a=path.join(src,ent.name),b=path.join(dst,ent.name);if(ent.isDirectory())copy(a,b);else fs.copyFileSync(a,b);}}
copy(path.join(pkg,'dist/prod/fonts'),path.join(out,'fonts'));
fs.writeFileSync(path.join(out,'index.html'),'<!doctype html><meta charset="utf-8"><title>组件原生导出</title><script>window.EXCALIDRAW_ASSET_PATH="/";</script><style>body{font:18px sans-serif;padding:35px}button{font:inherit;padding:12px}</style><h1>原生组件导出</h1><button id="run">导出36个组件</button><p id="status">仅导出组件素材。</p><script type="module" src="/bundle.js"></script>');
console.log('Exporter built. Run node serve.cjs and open http://127.0.0.1:8772');
