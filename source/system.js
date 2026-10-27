import {drawing,C} from './shapes.js';

export default function systemComponents(){
 const scenes=[];
 const make=(id,title,description,draw)=>{const d=drawing(id);d.group('component',()=>draw(d));scenes.push({id,title,description,elements:d.elements});};
 const panel=(d,points,color,fill)=>d.line(points,color,{backgroundColor:fill});

 make('05-process','进程与地址空间','一个进程的虚拟地址空间。各区仅作组成示意，不表示真实地址顺序、大小或内存比例。',d=>{
  panel(d,[[50,25],[302,28],[305,266],[53,263],[50,25]],C.ink,'transparent');
  d.text(103,37,'Process',29,C.blue);
  const rows=[['code',C.paleBlue,C.blue],['data',C.paleTeal,C.teal],['heap',C.paleOrange,C.orange],['stack',C.palePurple,C.purple]];
  rows.forEach(([name,fill,color],i)=>{const y=82+i*43;panel(d,[[70,y],[284,y+1],[282,y+37],[72,y+38],[70,y]],color,fill);d.text(142,y+4,name,25,color);});
 });

 make('06-thread','线程与共享内存','同一进程内的两个线程共享地址空间，各自保有独立栈与执行上下文；这里只突出共享与独立两部分。',d=>{
  panel(d,[[31,25],[339,29],[336,265],[34,261],[31,25]],C.ink,'transparent');
  panel(d,[[52,43],[319,45],[317,94],[54,92],[52,43]],C.purple,C.palePurple);
  d.text(128,52,'共享内存',25,C.purple);
  [[59,'T1',C.blue,C.paleBlue],[208,'T2',C.teal,C.paleTeal]].forEach(([x,name,color,fill],i)=>{
   d.line([[x+48,95],[x+49,119]],color);
   panel(d,[[x,120+i*2],[x+103,121],[x+101,239],[x+2,237],[x,120+i*2]],color,fill);
   d.text(x+32,133,name,28,color);
   d.line([[x+8,179],[x+94,177]],color,{strokeWidth:1.5});
   d.text(x+36,190,'栈',25,color);
  });
 });

 make('07-pcb','进程控制块 PCB','PCB 是进程管理结构的教学抽象。PID、状态、PC 和 SP 代表常见管理与上下文信息，实际组织取决于操作系统和架构。',d=>{
  panel(d,[[64,26],[298,29],[301,263],[67,265],[64,26]],C.ink,'transparent');
  panel(d,[[65,27],[299,29],[298,74],[67,73],[65,27]],C.blue,C.paleBlue);
  d.text(150,35,'PCB',30,C.blue);
  [['PID','42'],['state','ready'],['PC','0x…'],['SP','0x…']].forEach(([key,value],i)=>{
   const y=86+i*42;d.text(83,y,key,24,C.ink);d.text(199,y,value,24,C.blue);
   if(i<3)d.line([[82,y+34],[287,y+33]],C.muted,{strokeWidth:1.2});
  });
 });

 make('08-multicore','多核处理器','四个执行核心的图标。逻辑 CPU、物理核心与 SMT 的区别需由所在图文另行说明。',d=>{
  panel(d,[[37,30],[327,27],[331,251],[40,255],[37,30]],C.teal,C.paleTeal);
  [[57,50,'C0'],[210,52,'C1'],[60,158,'C2'],[208,160,'C3']].forEach(([x,y,name],i)=>{
   const color=i%2?C.teal:C.blue;
   panel(d,[[x,y],[x+99,y+2],[x+98,y+66],[x+1,y+68],[x,y]],color,i%2?C.paleTeal:C.paleBlue);
   d.text(x+26,y+17,name,28,color);
  });
  d.line([[157,85],[210,86]],C.ink,{strokeWidth:1.5});d.line([[158,192],[208,193]],C.ink,{strokeWidth:1.5});
  d.line([[184,85],[184,193]],C.ink,{strokeWidth:1.5});
  d.add('ellipse',{x:174,y:130,width:21,height:21,backgroundColor:C.paleOrange,strokeColor:C.orange});
  [78,130,184,238,286].forEach((x,i)=>{d.line([[x,14-i%2*3],[x+1,29]],C.teal);d.line([[x,253],[x-1,269+i%2*3]],C.teal);});
 });

 make('09-io-device','I/O 设备','通用外设图标，可用于设备、输入输出或 I/O 等待的说明；不限定具体设备协议。',d=>{
  panel(d,[[48,31],[315,34],[319,204],[51,208],[48,31]],C.ink,'transparent');
  panel(d,[[68,51],[296,53],[294,165],[70,162],[68,51]],C.blue,C.paleBlue);
  d.line([[88,119],[121,118],[122,87],[155,86],[157,136],[190,137],[191,101],[275,99]],C.blue);
  d.text(150,171,'I/O',27,C.ink);
  d.add('ellipse',{x:276,y:179,width:11,height:11,backgroundColor:C.teal,strokeColor:C.teal,fillStyle:'solid'});
  d.line([[146,208],[145,238],[120,240]],C.ink);d.line([[216,206],[218,239],[245,240]],C.ink);d.line([[120,240],[245,240]],C.ink);
 });

 make('10-memory','内存条','存储组件图标。可用于 RAM，也可按上下文改作缓存；芯片数与针脚数不代表真实硬件规格。',d=>{
  d.text(143,27,'RAM',29,C.teal);
  panel(d,[[29,72],[349,69],[347,206],[32,209],[29,72]],C.teal,C.paleTeal);
  for(let i=0;i<4;i++){
   const x=49+i*74,y=91+(i%2)*2;
   panel(d,[[x,y],[x+53,y+1],[x+52,y+77],[x+1,y+76],[x,y]],C.ink,'transparent');
   d.line([[x+11,y+19],[x+41,y+18]],C.teal,{strokeWidth:1.4});
   d.line([[x+11,y+39],[x+40,y+40]],C.teal,{strokeWidth:1.4});
  }
  for(let i=0;i<12;i++){const x=48+i*25;d.line([[x,208],[x+(i%2),228+(i%3)]],C.orange,{strokeWidth:3});}
 });

 make('11-interrupt','中断 IRQ','中断事件的图标。中断会触发事件处理，但并不必然引起任务切换或抢占。',d=>{
  panel(d,[[113,28],[218,25],[177,112],[225,110],[110,251],[139,144],[84,146],[113,28]],C.orange,C.paleOrange);
  d.line([[80,55],[64,47]],C.orange,{strokeWidth:1.5});d.line([[68,78],[49,79]],C.orange,{strokeWidth:1.5});
  d.text(235,117,'IRQ',30,C.orange);
 });
 return scenes;
}
