import {drawing,C} from './shapes.js';

// Standalone reusable components. Coordinates and text are Excalidraw-native.
export default function schedulingComponents(){
 const scenes=[];
 const add=(id,title,description,paint)=>{const d=drawing(id);d.group('component',()=>paint(d));scenes.push({id,title,description,elements:d.elements});};

 add('12-scheduler','调度器','从可运行任务中选择下一执行任务；漏斗仅表示选择功能。',d=>{
  const cards=[{x:34,y:33,s:'A',c:C.blue,f:C.paleBlue},{x:137,y:29,s:'B',c:C.orange,f:C.paleOrange},{x:240,y:35,s:'C',c:C.blue,f:C.paleBlue}];
  cards.forEach(({x,y,s,c,f})=>{
   d.line([[x+2,y],[x+73,y+2],[x+75,y+48],[x,y+47],[x+2,y]],c,{backgroundColor:f});
   d.text(x+27,y+8,s,27,c);
   d.line([[x+20,y+58],[175,119]],C.muted,{strokeWidth:1.5});
  });
  d.line([[91,116],[258,119],[205,170],[146,168],[91,116]],C.purple,{backgroundColor:C.palePurple});
  d.line([[105,124],[246,126]],C.purple,{strokeWidth:1.4});
  d.arrow([[175,177],[176,199]],C.purple);
  d.line([[136,209],[214,207],[216,253],[134,255],[136,209]],C.orange,{backgroundColor:C.paleOrange});
  d.text(163,216,'B',27,C.orange);
 });

 add('13-dispatcher','分派器','把已选任务交给 CPU 执行的抽象图标，不展开上下文切换流程。',d=>{
  d.line([[30,79],[126,77],[128,150],[32,152],[30,79]],C.blue,{backgroundColor:C.paleBlue});
  d.text(51,100,'next',25,C.blue);
  d.arrow([[141,115],[204,114]],C.orange);
  d.line([[229,66],[328,68],[330,164],[231,167],[229,66]],C.teal,{backgroundColor:C.paleTeal});
  d.line([[242,80],[316,79],[317,153],[244,154],[242,80]],C.teal,{strokeWidth:1.5});
  d.text(253,103,'CPU',27,C.teal);
  [88,116,145].forEach((y,i)=>{d.line([[216-i%2*2,y],[230,y+1]],C.teal);d.line([[329,y],[342+i%2*2,y-1]],C.teal);});
  [252,280,307].forEach((x,i)=>{d.line([[x,53-i%2*2],[x+1,67]],C.teal);d.line([[x,165],[x-1,179+i%2*2]],C.teal);});
 });

 add('14-clock','时钟与时间片','时钟或计时器组件；一个 tick 并不一定产生任务切换。',d=>{
  const cx=145,cy=133,r=86;
  d.add('ellipse',{x:cx-r,y:cy-r,width:r*2,height:r*2,strokeColor:C.blue,backgroundColor:C.paleBlue});
  for(let i=0;i<12;i++){
   const a=i*Math.PI/6-Math.PI/2,inner=i%3===0?68:73;
   d.line([[cx+inner*Math.cos(a),cy+inner*Math.sin(a)],[cx+79*Math.cos(a),cy+79*Math.sin(a)]],C.blue,{strokeWidth:1.7});
  }
  d.line([[145,82],[145,133],[184,151]],C.ink,{strokeWidth:3});
  d.add('ellipse',{x:140,y:128,width:10,height:10,backgroundColor:C.blue,strokeColor:C.blue,fillStyle:'solid'});
  d.line([[249,102],[267,102],[268,72],[290,73],[290,102],[312,102]],C.orange);
  d.text(260,121,'tick',25,C.orange);
  d.line([[259,157],[306,156]],C.orange,{strokeWidth:1.4});
 });

 add('15-mutex','互斥锁','同一时刻最多一个持有者的互斥锁图标。',d=>{
  d.line([[118,119],[118,87],[122,62],[132,46],[150,35],[171,32],[192,36],[209,48],[220,66],[224,88],[223,119]],C.ink,{roundness:{type:2},strokeWidth:3});
  d.line([[134,116],[134,88],[139,67],[151,56],[170,52],[188,57],[199,69],[205,88],[205,116]],C.ink,{roundness:{type:2},strokeWidth:1.6});
  d.line([[92,113],[250,116],[253,235],[91,237],[92,113]],C.orange,{backgroundColor:C.paleOrange});
  d.line([[104,126],[239,128]],C.orange,{strokeWidth:1.4});
  d.add('ellipse',{x:158,y:147,width:26,height:26,strokeColor:C.ink});
  d.line([[171,172],[170,201]],C.ink,{strokeWidth:4});
 });

 add('16-semaphore','计数信号量','两个可用许可的计数信号量；许可数量和语义由使用场景决定。',d=>{
  d.line([[48,39],[302,42],[305,232],[50,230],[48,39]],C.teal,{backgroundColor:C.paleTeal});
  d.text(100,60,'count = 2',25,C.teal);
  d.line([[71,103],[282,105]],C.teal,{strokeWidth:1.5});
  [118,232].forEach((cx,i)=>{
   d.add('ellipse',{x:cx-34,y:126+i*2,width:68,height:68,strokeColor:C.teal});
   d.line([[cx-17,159+i*2],[cx-5,172+i*2],[cx+19,145+i*2]],C.teal,{strokeWidth:3});
  });
 });

 add('17-priority','优先级','抽象优先级层级，没有规定具体数字方向。',d=>{
  const values=[{x:67,h:64,c:C.blue,f:C.paleBlue,s:'low'},{x:158,h:110,c:C.purple,f:C.palePurple,s:'mid'},{x:249,h:156,c:C.orange,f:C.paleOrange,s:'high'}];
  values.forEach(({x,h,c,f,s},i)=>{
   const y=210-h;
   d.line([[x+2,y],[x+65,y+2],[x+63,210],[x,208],[x+2,y]],c,{backgroundColor:f});
   d.line([[x+11,y+11],[x+54,y+12]],c,{strokeWidth:1.4});
   d.text(x+3,224+i%2*2,s,23,c);
  });
  d.arrow([[39,201],[38,52]],C.ink);
 });

 add('18-affinity','CPU 亲和性','任务的允许 CPU 集合示例；允许集合不等于实际执行位置。',d=>{
  d.line([[137,28],[218,30],[220,80],[135,81],[137,28]],C.blue,{backgroundColor:C.paleBlue});
  d.text(164,37,'A',27,C.blue);
  d.arrow([[156,90],[105,130]],C.teal);d.arrow([[199,90],[252,130]],C.teal);
  [{x:54,s:'CPU 0'},{x:207,s:'CPU 1'}].forEach(({x,s},i)=>{
   d.line([[x+2,142+i*2],[x+100,144+i*2],[x+99,206],[x,204],[x+2,142+i*2]],C.teal,{backgroundColor:C.paleTeal});
   d.text(x+12,160+i,s,23,C.teal);
   [157,183].forEach(y=>{d.line([[x-9,y],[x+1,y+1]],C.teal,{strokeWidth:1.5});d.line([[x+100,y],[x+109,y-1]],C.teal,{strokeWidth:1.5});});
  });
  d.text(84,229,'mask = {0, 1}',24,C.blue);
 });
 return scenes;
}
