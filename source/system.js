import {drawing,C} from './shapes.js';

const label=(text,size=23,color=C.ink)=>({text,fontSize:size,fontFamily:5,textAlign:'center',verticalAlign:'middle',strokeColor:color});

export default function systemComponents(){
 const scenes=[];
 const make=(id,title,description,draw)=>{const d=drawing(id);d.group('component',()=>draw(d));scenes.push({id,title,description,elements:d.elements});};

 make('05-process','进程与地址空间','一个进程的虚拟地址空间。各区仅作组成示意，不表示真实地址顺序、大小或内存比例。',d=>{
  d.box(42,24,264,246,'','#ffffff',C.ink);
  d.text(108,36,'Process',27,C.blue);
  const rows=[['code',C.paleBlue,C.blue],['data',C.paleTeal,C.teal],['heap',C.paleOrange,C.orange],['stack','#f3edfa','#7950a0']];
  rows.forEach(([text,fill,color],i)=>d.box(64,83+i*43,220,35,text,fill,color,{roundness:null,label:label(text,23,color)}));
 });

 make('06-thread','线程与共享内存','同一进程内的两个线程共享地址空间，各自保有独立栈与执行上下文；这里只突出共享与独立两部分。',d=>{
  d.box(30,28,310,238,'','#ffffff',C.ink);
  d.box(53,46,264,51,'共享内存','#f3edfa','#7950a0',{label:label('共享内存',25,'#7950a0')});
  [[58,'T1',C.blue,C.paleBlue],[206,'T2',C.teal,C.paleTeal]].forEach(([x,name,color,fill])=>{
   d.line([[x+52,98],[x+52,128]],color);
   d.box(x,129,105,112,'',fill,color);
   d.text(x+34,143,name,25,color);
   d.line([[x,181],[x+105,181]],color);
   d.text(x+28,196,'栈',24,color);
  });
 });

 make('07-pcb','进程控制块 PCB','PCB 是进程管理结构的教学抽象。PID、状态、PC 和 SP 代表常见管理与上下文信息，实际组织取决于操作系统和架构。',d=>{
  d.box(67,25,242,246,'','#ffffff',C.ink,{roundness:null});
  d.box(67,25,242,48,'PCB',C.paleBlue,C.blue,{roundness:null,label:label('PCB',27,C.blue)});
  const rows=[['PID','42'],['state','ready'],['PC','0x…'],['SP','0x…']];
  rows.forEach(([key,value],i)=>{const y=87+i*43;d.text(86,y,key,23,C.ink);d.text(201,y,value,23,C.blue);if(i<3)d.line([[82,y+33],[294,y+33]],'#ced4da',{strokeWidth:1});});
 });

 make('08-multicore','多核处理器','四个执行核心的图标。逻辑 CPU、物理核心与 SMT 的区别需由所在图文另行说明。',d=>{
  d.box(32,30,310,226,'','#ffffff',C.ink,{roundness:{type:3}});
  [[57,56,'C0'],[205,56,'C1'],[57,160,'C2'],[205,160,'C3']].forEach(([x,y,name],i)=>d.box(x,y,110,68,name,i%2?C.paleTeal:C.paleBlue,i%2?C.teal:C.blue,{roundness:null,label:label(name,25,i%2?C.teal:C.blue)}));
  d.line([[167,90],[205,90]],C.ink);d.line([[167,194],[205,194]],C.ink);d.line([[186,90],[186,194]],C.ink);
  d.add('ellipse',{x:176,y:132,width:20,height:20,backgroundColor:C.paleOrange,strokeColor:C.orange});
 });

 make('09-io-device','I/O 设备','通用外设图标，可用于设备、输入输出或 I/O 等待的说明；不限定具体设备协议。',d=>{
  d.box(48,31,270,178,'','#ffffff',C.ink,{roundness:{type:3}});
  d.box(68,51,230,116,'',C.paleBlue,C.blue,{roundness:null});
  d.line([[88,118],[122,118],[122,85],[156,85],[156,139],[193,139],[193,100],[276,100]],C.blue);
  d.add('ellipse',{x:281,y:183,width:9,height:9,backgroundColor:C.teal,strokeColor:C.teal});
  d.line([[148,210],[148,240]],C.ink);d.line([[216,210],[216,240]],C.ink);d.line([[124,240],[240,240]],C.ink);
  d.text(159,174,'I/O',25,C.ink);
 });

 make('10-memory','内存条','存储组件图标。可用于 RAM，也可按上下文改作缓存；芯片数与针脚数不代表真实硬件规格。',d=>{
  d.box(29,69,320,142,'',C.paleTeal,C.teal,{roundness:null});
  for(let i=0;i<4;i++){
   d.box(49+i*74,91,54,78,'','#ffffff',C.ink,{roundness:null});
   d.line([[62+i*74,108],[91+i*74,108]],C.teal,{strokeWidth:1.5});
   d.line([[62+i*74,126],[91+i*74,126]],C.teal,{strokeWidth:1.5});
  }
  for(let i=0;i<13;i++)d.line([[48+i*23,211],[48+i*23,232]],C.orange,{strokeWidth:4});
  d.text(139,31,'RAM',27,C.teal);
 });

 make('11-interrupt','中断 IRQ','中断事件的图标。中断会触发事件处理，但并不必然引起任务切换或抢占。',d=>{
  d.add('line',{x:114,y:22,points:[[0,0],[114,0],[66,90],[116,90],[-1,235],[29,122],[-29,122],[0,0]],backgroundColor:C.paleOrange,strokeColor:C.orange,strokeWidth:2.5,roundness:null});
  d.text(245,112,'IRQ',29,C.orange);
 });

 return scenes;
}
