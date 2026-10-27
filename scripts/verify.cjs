const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/catalog.js'),'utf8'),context);
const assets=context.window.OS_ASSETS;assert.equal(assets.length,24);
const ids=new Set();
for(const asset of assets){
 assert(!ids.has(asset.id));ids.add(asset.id);
 assert(['system','scheduling','frequency'].includes(asset.category));
 for(const key of ['svg','png','native'])assert(fs.existsSync(path.join(root,asset[key])),asset[key]);
 const scene=JSON.parse(fs.readFileSync(path.join(root,asset.native),'utf8'));assert.equal(scene.type,'excalidraw');assert.equal(JSON.stringify(scene.elements),JSON.stringify(asset.elements));
 const local=new Set(asset.elements.map(e=>e.id));assert.equal(local.size,asset.elements.length);
 for(const e of asset.elements){assert.notEqual(e.type,'image');if(e.containerId)assert(local.has(e.containerId));for(const bound of e.boundElements||[])assert(local.has(bound.id));}
 assert(!/<image\b/i.test(fs.readFileSync(path.join(root,asset.svg),'utf8')));
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const file=match[1].split(/[?#]/)[0];if(/^(https?:|data:)/.test(file)||file==='./')continue;assert(fs.existsSync(path.join(root,file)),file);}
assert.equal(JSON.parse(fs.readFileSync(path.join(root,'assets/os-components.excalidrawlib'),'utf8')).libraryItems.length,assets.length);
console.log(`Verified ${assets.length} components, native bindings, local resources and library.`);
