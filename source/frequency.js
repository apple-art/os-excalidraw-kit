import {drawing,C} from './shapes.js';

const red='#c34848',paleRed='#fceaea';
const scene=(d,id,title,description)=>({id,title,description,elements:d.elements});

function migration(){
 const d=drawing('migration');
 d.group('migration',()=>{
  d.line([[42,164],[136,162],[138,226],[44,229],[42,164]],C.blue,{backgroundColor:C.paleBlue});
  d.line([[231,162],[326,165],[324,229],[229,226],[231,162]],C.teal,{backgroundColor:C.paleTeal});
  d.text(54,181,'CPU 0',25,C.blue);d.text(242,181,'CPU 1',25,C.teal);
  d.line([[52,48],[121,50],[119,109],[50,107],[52,48]],C.orange,{backgroundColor:C.paleOrange});
  d.text(77,62,'A',30,C.orange);
  d.line([[86,117],[87,153]],C.muted,{strokeStyle:'dashed'});
  d.arrow([[133,77],[205,76],[278,78],[278,150]],C.orange);
  d.line([[151,68],[195,67]],C.orange,{strokeWidth:1.5});
 });
 return scene(d,'19-migration','任务迁移','任务从一个 CPU 的运行队列迁到另一个；实际迁移受有效亲和性、拓扑和调度策略约束。');
}

function utilization(){
 const d=drawing('utilization');
 d.group('utilization',()=>{
  const arc=Array.from({length:15},(_,i)=>{const a=Math.PI+i*Math.PI/14;return [180+114*Math.cos(a),190+114*Math.sin(a)];});
  d.line(arc,C.ink,{roundness:{type:2}});
  d.line([[70,198],[292,197]],C.ink,{strokeWidth:1.5});
  for(let i=0;i<=6;i++){
   const a=Math.PI+i*Math.PI/6;
   d.line([[180+96*Math.cos(a),190+96*Math.sin(a)],[180+108*Math.cos(a),190+108*Math.sin(a)]],i>=5?C.orange:C.ink);
  }
  d.line([[178,185],[226,114],[184,190],[178,185]],C.blue,{backgroundColor:C.paleBlue});
  d.add('ellipse',{x:172,y:181,width:17,height:17,backgroundColor:C.paleBlue,strokeColor:C.blue});
  d.text(59,210,'0',25,C.muted);d.text(291,210,'1',25,C.muted);d.text(154,220,'util',27,C.blue);
 });
 return scene(d,'20-utilization','CPU 利用率','CPU 忙碌程度的抽象仪表；调度器用于调频的利用率信号不一定等同于简单采样的 CPU 百分比。');
}

function frequency(){
 const d=drawing('frequency');
 d.group('frequency',()=>{
  const points=[[39,163]];
  for(let i=0;i<5;i++){const x=63+i*55;points.push([x,163],[x,98],[x+28,98],[x+28,163]);}
  points.push([338,163]);
  d.line(points,C.blue);
  d.line([[63,65],[118,65]],C.orange);
  d.line([[63,56],[63,74]],C.orange);d.line([[118,56],[118,74]],C.orange);
  d.text(82,25,'T',27,C.orange);
  d.text(122,208,'f = 1 / T',28,C.blue);
  d.line([[112,245],[245,247]],C.blue,{strokeWidth:1.5});
 });
 return scene(d,'21-frequency','CPU 频率','连续方波和周期 T 的抽象图标，f = 1/T；时钟频率不是实际任务性能的唯一决定因素。');
}

function driver(){
 const d=drawing('driver');
 d.group('cpufreq-driver',()=>{
  d.line([[53,42],[307,45],[305,109],[56,107],[53,42]],C.purple,{backgroundColor:C.palePurple});
  d.text(74,59,'CPUFreq driver',26,C.purple);
  d.line([[132,112],[134,133],[154,145]],C.purple);
  d.line([[226,113],[224,133],[204,145]],C.teal);
  d.line([[100,151],[260,153],[262,221],[99,219],[100,151]],C.teal,{backgroundColor:C.paleTeal});
  d.line([[112,162],[248,163],[249,209],[113,208],[112,162]],C.teal,{strokeWidth:1.5});
  d.text(157,171,'HW',29,C.teal);
  [119,150,181,212,242].forEach((x,i)=>d.line([[x,222],[x+(i%2?1:-1),239]],C.teal));
 });
 return scene(d,'22-cpufreq-driver','CPUFreq 驱动','软件与硬件接口之间的桥接图标；驱动将性能请求交给平台，实际频率还受硬件、温度和功耗限制。');
}

function power(){
 const d=drawing('power');
 d.group('power',()=>{
  d.line([[45,77],[296,80],[298,194],[48,198],[45,77]],C.ink);
  d.line([[299,108],[319,110],[318,162],[299,163]],C.ink);
  d.line([[61,95],[113,96],[112,179],[63,180],[61,95]],C.teal,{backgroundColor:C.paleTeal});
  d.line([[123,96],[175,95],[176,179],[124,180],[123,96]],C.teal,{backgroundColor:C.paleTeal});
  d.line([[187,96],[239,97],[238,179],[188,180],[187,96]],C.teal,{backgroundColor:C.paleTeal});
  d.line([[250,97],[280,98],[281,178],[251,179],[250,97]],C.muted);
  d.line([[187,38],[143,134],[180,133],[157,229],[232,111],[194,111],[219,39],[187,38]],C.orange,{backgroundColor:C.paleOrange});
  d.text(119,240,'Power / W',26,C.ink);
 });
 return scene(d,'23-power','CPU 功耗','用于功率的电源图标，W 是功率单位；能耗应另用 J 等单位表示。');
}

function thermal(){
 const d=drawing('thermal');
 d.group('thermal',()=>{
  const outline=[[119,176],[118,66],[122,52],[132,44],[144,42],[155,47],[161,60],[162,176],[174,187],[180,202],[178,219],[167,234],[151,243],[134,243],[118,236],[106,224],[101,209],[104,192],[119,176]];
  d.line(outline,C.ink,{roundness:{type:2}});
  d.line([[140,95],[140,208]],red,{strokeWidth:8});
  d.add('ellipse',{x:121,y:193,width:39,height:39,backgroundColor:paleRed,strokeColor:red});
  [82,114,146].forEach((y,i)=>d.line([[178,y],[201+(i%2)*3,y+1]],C.ink));
  d.line([[238,153],[232,140],[238,126],[245,112],[239,98]],C.orange,{roundness:{type:2}});
  d.line([[278,152],[272,139],[278,125],[284,111],[279,97]],C.orange,{roundness:{type:2}});
  d.text(220,190,'°C',28,red);
 });
 return scene(d,'24-thermal','温度与热约束','温度计与热流的抽象图标；热限制的阈值与性能控制方式依具体平台而异。');
}

export default function(){return [migration(),utilization(),frequency(),driver(),power(),thermal()];}
