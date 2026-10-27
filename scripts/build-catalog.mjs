import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'assets');
const meta=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));
const items=meta.map(item=>({...item,elements:JSON.parse(fs.readFileSync(path.join(root,item.native.split(/[?#]/)[0]),'utf8')).elements}));
for(const item of items){if(!Array.isArray(item.elements)||item.elements.some(e=>e.type==='image'))throw Error('Expected native vector elements: '+item.id);}
fs.writeFileSync(path.join(dir,'catalog.js'),'window.OS_ASSETS = '+JSON.stringify(items).replace(/</g,'\\u003c')+';\n');
fs.writeFileSync(path.join(dir,'os-components.excalidrawlib'),JSON.stringify({type:'excalidrawlib',version:2,source:'https://excalidraw.com',libraryItems:items.map(item=>({id:item.id,status:'unpublished',created:0,elements:item.elements}))},null,2));
console.log(`Updated catalog and library: ${items.length} components.`);
