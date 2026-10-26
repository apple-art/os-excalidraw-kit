import {convertToExcalidrawElements,serializeAsJSON,exportToSvg,exportToBlob,loadFromBlob} from '@excalidraw/excalidraw';
import components from './index.js';
// The native scene is the source of every export. Each shape remains editable.
export async function exportComponents(write,report=()=>{}){
 const state={viewBackgroundColor:'#ffffff',exportBackground:false,exportWithDarkMode:false,gridSize:null};
 const manifest=[];
 for(const scene of components()){
  const elements=convertToExcalidrawElements(scene.elements,{regenerateIds:false});
  const json=serializeAsJSON(elements,state,{},'local');
  const restored=await loadFromBlob(new Blob([json],{type:'application/vnd.excalidraw+json'}),null,null);
  if(restored.elements.length!==elements.length)throw Error('Round trip changed element count: '+scene.id);
  const svg=await exportToSvg({elements:restored.elements,appState:state,files:{},exportPadding:35});
  const blob=await exportToBlob({elements:restored.elements,appState:{...state,exportBackground:true},files:{},exportPadding:35,mimeType:'image/png',getDimensions:(w,h)=>({width:w*1.5,height:h*1.5,scale:1.5})});
  const png=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.onerror=reject;reader.readAsDataURL(blob);});
  const item={id:scene.id,title:scene.title,description:scene.description||'',elements:elements.length};
  await write({...item,json,svg:svg.outerHTML,png});manifest.push(item);report(manifest.length,scene.title);
 }
 return manifest;
}
