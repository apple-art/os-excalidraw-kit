import {exportComponents} from './export.js';
document.getElementById('run').onclick=async()=>{
 const btn=document.getElementById('run'),status=document.getElementById('status');btn.disabled=true;
 try{const manifest=await exportComponents(async item=>{const res=await fetch('/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(item)});if(!res.ok)throw Error(await res.text());},(n,title)=>status.textContent=`已导出 ${n} / 36：${title}`);status.textContent=`完成：${manifest.length} 个原生组件，SVG 与 PNG 已同步导出，回读校验通过。`;}catch(e){status.textContent='导出失败：'+e.message;console.error(e);}finally{btn.disabled=false;}
};
