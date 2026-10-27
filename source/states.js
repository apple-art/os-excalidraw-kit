import {drawing,C} from './shapes.js';

export default function stateComponents(){
 const scenes=[];
 const make=(id,title,description,draw)=>{
  const d=drawing(id);d.group('component',()=>draw(d));
  scenes.push({id,title,description,elements:d.elements});
 };
 const task=(d,state)=>{
  d.line([[65,35],[238,33],[274,66],[272,225],[68,228],[65,35]],C.blue,{backgroundColor:C.paleBlue});
  d.line([[238,34],[238,67],[273,66]],C.blue);
  d.text(91,55,'Task A',32,C.blue);
  d.line([[91,102],[243,101]],C.blue,{strokeWidth:1.6});
  d.line([[94,130],[233,128]],C.muted,{strokeWidth:1.5});
  d.line([[94,152],[207,154]],C.muted,{strokeWidth:1.5});
  if(state==='run'){
   d.add('ellipse',{x:96,y:187,width:13,height:13,backgroundColor:C.teal,strokeColor:C.teal,fillStyle:'solid'});
   d.text(124,177,'run',26,C.teal);
  }else{
   d.line([[96,186],[96,200]],C.orange,{strokeWidth:3});
   d.line([[105,186],[105,200]],C.orange,{strokeWidth:3});
   d.text(124,177,'wait',26,C.orange);
  }
 };
 make('25-task-running','运行中任务','正在 CPU 上执行的任务状态；运行状态不代表任务已经完成。',d=>task(d,'run'));
 make('26-task-blocked','阻塞任务','等待事件或资源的任务；阻塞并不表示任务出错。',d=>task(d,'wait'));
 make('27-cpu-idle','空闲 CPU','当前没有运行普通任务的 CPU；空闲不必然表示硬件进入休眠状态。',d=>{
  const x=90,y=48,s=160,color='#78899d';
  d.line([[x+4,y+2],[x+s-4,y],[x+s,y+s-5],[x+s-3,y+s],[x,y+s-2],[x+4,y+2]],color,{backgroundColor:'#f0f5fa'});
  for(let i=0;i<4;i++){
   const p=25+i*33;
   d.line([[x-16-(i%2)*3,y+p],[x+2,y+p+1]],color);
   d.line([[x+s-1,y+p],[x+s+16+(i%2)*3,y+p-1]],color);
   d.line([[x+p,y-15-(i%2)*3],[x+p+1,y+1]],color);
   d.line([[x+p,y+s-1],[x+p-1,y+s+16+(i%2)*3]],color);
  }
  d.line([[x+19,y+20],[x+s-20,y+18],[x+s-18,y+s-20],[x+18,y+s-18],[x+19,y+20]],color,{strokeWidth:1.5});
  d.text(x+43,y+45,'CPU',32,color);d.text(x+52,y+88,'idle',26,color);
 });
 make('32-waitqueue','等待队列','等待队列中的任务等待事件或资源，与已就绪、可运行的运行队列不同。',d=>{
  d.text(53,30,'wait queue',28,C.orange);
  d.line([[40,85],[108,83],[191,85],[277,82],[353,84]],C.orange,{strokeWidth:1.6});
  [{x:55,y:105,label:'A'},{x:151,y:101,label:'B'},{x:247,y:107,label:'C'}].forEach(({x,y,label})=>{
   d.line([[x+2,y],[x+79,y+2],[x+77,y+70],[x,y+68],[x+2,y]],C.orange,{backgroundColor:C.paleOrange});
   d.text(x+27,y+17,label,32,C.orange);
  });
  d.line([[40,197],[103,199],[184,196],[274,200],[354,198]],C.orange);
  d.text(238,210,'I/O',24,C.orange);
 });
 return scenes;
}
