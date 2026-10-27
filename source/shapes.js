export const C={ink:'#34323e',blue:'#4263a8',teal:'#21846e',orange:'#c66c38',purple:'#7957a4',muted:'#9297a0',paleBlue:'#dceafa',paleTeal:'#d9efe8',paleOrange:'#ffead2',palePurple:'#ece1f8'};
export function drawing(prefix){
 let n=0; const elements=[];
 const base={strokeColor:C.ink,backgroundColor:'transparent',fillStyle:'hachure',strokeWidth:2,roughness:2,opacity:100,roundness:null};
 const add=(type,props)=>{const e={...base,type,id:`${prefix}-${++n}`,seed:1000+n*71,...props};elements.push(e);return e.id;};
 const text=(x,y,value,size=26,color=C.ink,extra={})=>add('text',{x,y,text:value,fontSize:size,fontFamily:5,strokeColor:color,textAlign:'left',...extra});
 const box=(x,y,w,h,value,fill=C.paleBlue,color=C.blue,extra={})=>add('rectangle',{x,y,width:w,height:h,backgroundColor:fill,strokeColor:color,roundness:{type:3},...(value?{label:{text:value,fontSize:28,fontFamily:5,textAlign:'center',verticalAlign:'middle',strokeColor:color}}:{}),...extra});
 // Native linear elements anchor their first point at [0, 0]; upward paths keep negative local coordinates.
 const pathProps=pts=>{const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),[x,y]=pts[0];return {x,y,width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys),points:pts.map(([px,py])=>[px-x,py-y])};};
 const line=(pts,color=C.ink,extra={})=>add('line',{...pathProps(pts),strokeColor:color,...extra});
 const arrow=(pts,color=C.ink,start,end,extra={})=>add('arrow',{...pathProps(pts),strokeColor:color,endArrowhead:'arrow',startArrowhead:null,...(start?{start:{id:start}}:{}),...(end?{end:{id:end}}:{}),...extra});
 const group=(name,fn)=>{const first=elements.length;fn();for(const e of elements.slice(first))e.groupIds=[`${prefix}-${name}`];};
 const cpu=(x,y,label='CPU',s=150)=>{let core;group(label,()=>{core=line([[x+4,y+2],[x+s-4,y],[x+s,y+s-5],[x+s-3,y+s],[x,y+s-2],[x+4,y+2]],C.teal,{backgroundColor:C.paleTeal});for(let i=0;i<4;i++){const p=25+i*33;line([[x-16-(i%2)*3,y+p],[x+2,y+p+1]],C.teal);line([[x+s-1,y+p],[x+s+16+(i%2)*3,y+p-1]],C.teal);line([[x+p,y-15-(i%2)*3],[x+p+1,y+1]],C.teal);line([[x+p,y+s-1],[x+p-1,y+s+16+(i%2)*3]],C.teal);}line([[x+19,y+20],[x+s-20,y+18],[x+s-18,y+s-20],[x+18,y+s-18],[x+19,y+20]],C.teal,{strokeWidth:1.5});text(x+43,y+55,label,32,C.teal);});return core;};
 return {elements,add,text,box,line,arrow,group,cpu};
}
