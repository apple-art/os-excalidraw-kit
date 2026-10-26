import {drawing,C} from './shapes.js';

// Standalone reusable components. Coordinates and text are Excalidraw-native.
export default function schedulingComponents(){
 const scenes=[];
 const add=(id,title,description,paint)=>{const d=drawing(id);d.group('component',()=>paint(d));scenes.push({id,title,description,elements:d.elements});};
 const label=(text,color=C.ink,fontSize=23)=>({text,fontSize,fontFamily:5,textAlign:'center',verticalAlign:'middle',strokeColor:color});

 add('12-scheduler','调度器','从可运行任务中选择下一执行任务；漏斗仅表示选择功能。',d=>{
  ['A','B','C'].forEach((s,i)=>{
   d.box(35+i*103,30,75,49,s,i===1?C.paleOrange:C.paleBlue,i===1?C.orange:C.blue,{label:label(s,i===1?C.orange:C.blue,25)});
   d.line([[72+i*103,87],[175,119]],C.muted,{strokeWidth:1.6});
  });
  d.line([[94,119],[256,119],[205,168],[145,168],[94,119]],'#7950a0',{backgroundColor:'#f3edfa'});
  d.arrow([[175,172],[175,194]],'#7950a0');
  d.box(135,204,80,46,'B',C.paleOrange,C.orange,{label:label('B',C.orange,25)});
 });

 add('13-dispatcher','分派器','把已选任务交给 CPU 执行的抽象图标，不展开上下文切换流程。',d=>{
  d.box(30,79,95,74,'next',C.paleBlue,C.blue,{label:label('next',C.blue,24)});
  d.arrow([[140,116],[207,116]],C.orange);
  d.box(231,67,98,98,'CPU',C.paleTeal,C.teal,{roundness:null,label:label('CPU',C.teal,25)});
  [87,116,145].forEach(y=>{d.line([[221,y],[231,y]],C.teal);d.line([[329,y],[339,y]],C.teal);});
  [252,280,308].forEach(x=>{d.line([[x,57],[x,67]],C.teal);d.line([[x,165],[x,175]],C.teal);});
 });

 add('14-clock','时钟与时间片','时钟或计时器组件；一个 tick 并不一定产生任务切换。',d=>{
  const cx=154,cy=133,r=88;
  d.add('ellipse',{x:cx-r,y:cy-r,width:r*2,height:r*2,backgroundColor:'#ffffff',strokeColor:C.ink});
  for(let i=0;i<12;i++){
   const a=i*Math.PI/6-Math.PI/2;
   d.line([[cx+73*Math.cos(a),cy+73*Math.sin(a)],[cx+81*Math.cos(a),cy+81*Math.sin(a)]],C.ink,{strokeWidth:1.6});
  }
  d.line([[154,83],[154,133],[196,153]],C.blue,{strokeWidth:3});
  d.add('ellipse',{x:149,y:128,width:10,height:10,backgroundColor:C.blue,strokeColor:C.blue});
  d.line([[263,102],[280,102],[280,72],[300,72],[300,102],[320,102]],C.orange);
  d.text(271,124,'tick',24,C.orange);
 });

 add('15-mutex','互斥锁','同一时刻最多一个持有者的互斥锁图标。',d=>{
  d.line([[118,117],[118,86],[121,62],[131,45],[149,34],[171,31],[193,35],[211,47],[221,65],[224,87],[224,117]],C.ink,{roundness:{type:2},strokeWidth:3});
  d.box(91,113,160,124,'',C.paleOrange,C.orange);
  d.add('ellipse',{x:158,y:144,width:26,height:26,backgroundColor:'#ffffff',strokeColor:C.ink});
  d.line([[171,170],[171,199]],C.ink,{strokeWidth:4});
 });

 add('16-semaphore','计数信号量','两个可用许可的计数信号量；许可数量和语义由使用场景决定。',d=>{
  d.box(48,40,255,191,'','#ffffff',C.ink);
  d.text(100,62,'count = 2',25,C.teal);
  [118,232].forEach(cx=>{
   d.add('ellipse',{x:cx-35,y:123,width:70,height:70,backgroundColor:C.paleTeal,strokeColor:C.teal});
   d.line([[cx-17,158],[cx-5,171],[cx+19,143]],C.teal,{strokeWidth:3});
  });
 });

 add('17-priority','优先级','抽象优先级层级，没有规定具体数字方向。',d=>{
  const values=[{x:65,h:65,c:C.blue,f:C.paleBlue,s:'low'},{x:157,h:111,c:'#7950a0',f:'#f3edfa',s:'mid'},{x:249,h:157,c:C.orange,f:C.paleOrange,s:'high'}];
  values.forEach(v=>{d.box(v.x,209-v.h,65,v.h,'',v.f,v.c,{roundness:null});d.text(v.x+4,224,v.s,23,v.c);});
  d.arrow([[37,197],[37,52]],C.ink);
 });

 add('18-affinity','CPU 亲和性','任务的允许 CPU 集合示例；允许集合不等于实际执行位置。',d=>{
  d.box(137,28,82,52,'A',C.paleBlue,C.blue,{label:label('A',C.blue,26)});
  d.arrow([[157,88],[103,130]],C.teal);d.arrow([[197,88],[256,130]],C.teal);
  d.box(55,143,100,63,'CPU 0',C.paleTeal,C.teal,{roundness:null,label:label('CPU 0',C.teal,23)});
  d.box(207,143,100,63,'CPU 1',C.paleTeal,C.teal,{roundness:null,label:label('CPU 1',C.teal,23)});
  d.text(84,229,'mask = {0, 1}',24,C.blue);
 });
 return scenes;
}
