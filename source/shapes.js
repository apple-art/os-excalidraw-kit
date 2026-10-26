export const C={ink:'#29323c',blue:'#1971c2',teal:'#087f5b',orange:'#d16b23',muted:'#707b84',paleBlue:'#e7f1fd',paleTeal:'#e6f4ee',paleOrange:'#fff0df'};
export function drawing(prefix){
 let n=0;const elements=[];const base={strokeColor:C.ink,backgroundColor:'transparent',fillStyle:'solid',strokeWidth:2,roughness:1,opacity:100,roundness:null};
 const add=(type,props)=>{const e={...base,type,id:`${prefix}-${++n}`,seed:1000+n*71,...props};elements.push(e);return e.id;};
 const text=(x,y,value,size=25,color=C.ink,extra={})=>add('text',{x,y,text:value,fontSize:size,fontFamily:5,strokeColor:color,textAlign:'left',...extra});
 const box=(x,y,w,h,value,fill=C.paleBlue,color=C.blue,extra={})=>add('rectangle',{x,y,width:w,height:h,backgroundColor:fill,strokeColor:color,roundness:{type:3},...(value?{label:{text:value,fontSize:26,fontFamily:5,textAlign:'center',verticalAlign:'middle',strokeColor:color}}:{}),...extra});
 const line=(pts,color=C.ink,extra={})=>add('line',{x:pts[0][0],y:pts[0][1],points:pts.map(([x,y])=>[x-pts[0][0],y-pts[0][1]]),strokeColor:color,...extra});
 const arrow=(pts,color=C.ink,start,end,extra={})=>add('arrow',{x:pts[0][0],y:pts[0][1],points:pts.map(([x,y])=>[x-pts[0][0],y-pts[0][1]]),strokeColor:color,endArrowhead:'arrow',startArrowhead:null,...(start?{start:{id:start}}:{}),...(end?{end:{id:end}}:{}),...extra});
 const group=(name,fn)=>{const first=elements.length;fn();for(const e of elements.slice(first))e.groupIds=[`${prefix}-${name}`];};
 const cpu=(x,y,label='CPU',s=120)=>{let core;group(label,()=>{core=box(x,y,s,s,label,C.paleTeal,C.teal,{roundness:null});for(let i=1;i<5;i++){let p=s*i/5;line([[x-12,y+p],[x,y+p]],C.teal);line([[x+s,y+p],[x+s+12,y+p]],C.teal);line([[x+p,y-12],[x+p,y]],C.teal);line([[x+p,y+s],[x+p,y+s+12]],C.teal);}});return core;};
 return {elements,add,text,box,line,arrow,group,cpu};
}
