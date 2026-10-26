import {drawing,C} from './shapes.js';

const purple='#7950a0',palePurple='#f3edfa',red='#c34848',paleRed='#fceaea';
const scene=(d,id,title,description)=>({id,title,description,elements:d.elements});

function migration(){
 const d=drawing('migration');
 d.group('migration',()=>{
  d.box(43,158,88,65,'CPU 0',C.paleBlue,C.blue,{roundness:null,label:{text:'CPU 0',fontSize:21,fontFamily:5,strokeColor:C.blue}});
  d.box(244,158,88,65,'CPU 1',C.paleTeal,C.teal,{roundness:null,label:{text:'CPU 1',fontSize:21,fontFamily:5,strokeColor:C.teal}});
  d.box(43,63,88,58,'A',C.paleOrange,C.orange);
  d.line([[87,128],[87,148]],C.muted,{strokeStyle:'dashed'});
  d.arrow([[144,91],[288,91],[288,147]],C.orange);
 });
 return scene(d,'19-migration','任务迁移','任务从一个 CPU 的运行队列迁到另一个；实际迁移受有效亲和性、拓扑和调度策略约束。');
}

function utilization(){
 const d=drawing('utilization');
 d.group('utilization',()=>{
  const arc=Array.from({length:13},(_,i)=>{const a=Math.PI+i*Math.PI/12;return [180+114*Math.cos(a),190+114*Math.sin(a)];});
  d.line(arc,C.ink,{roundness:{type:2},roughness:.8});
  for(let i=0;i<=6;i++){
   const a=Math.PI+i*Math.PI/6;
   d.line([[180+98*Math.cos(a),190+98*Math.sin(a)],[180+109*Math.cos(a),190+109*Math.sin(a)]],i>=5?C.orange:C.ink);
  }
  d.line([[180,190],[236,115]],C.blue,{strokeWidth:3});
  d.add('ellipse',{x:173,y:183,width:14,height:14,backgroundColor:C.paleBlue,strokeColor:C.blue});
  d.text(57,212,'0',23,C.muted);d.text(292,212,'1',23,C.muted);d.text(157,222,'util',26,C.blue);
 });
 return scene(d,'20-utilization','CPU 利用率','CPU 忙碌程度的抽象仪表；调度器用于调频的利用率信号不一定等同于简单采样的 CPU 百分比。');
}

function frequency(){
 const d=drawing('frequency');
 d.group('frequency',()=>{
  const points=[[43,162]];
  for(let i=0;i<5;i++){const x=65+i*54;points.push([x,162],[x,99],[x+27,99],[x+27,162]);}
  points.push([335,162]);
  d.line(points,C.blue,{roughness:.75});
  d.line([[65,65],[119,65]],C.orange);d.line([[65,56],[65,74]],C.orange);d.line([[119,56],[119,74]],C.orange);
  d.text(84,25,'T',25,C.orange);d.text(123,211,'f = 1 / T',27,C.blue);
 });
 return scene(d,'21-frequency','CPU 频率','连续方波和周期 T 的抽象图标，f = 1/T；时钟频率不是实际任务性能的唯一决定因素。');
}

function driver(){
 const d=drawing('driver');
 d.group('cpufreq-driver',()=>{
  d.box(73,45,234,65,'CPUFreq driver',palePurple,purple,{label:{text:'CPUFreq driver',fontSize:23,fontFamily:5,strokeColor:purple}});
  d.line([[155,113],[155,156]],purple);d.line([[224,113],[224,156]],C.teal);
  d.box(103,161,174,67,'HW',C.paleTeal,C.teal,{roundness:null});
  for(let i=0;i<5;i++)d.line([[121+i*34,229],[121+i*34,244]],C.teal);
 });
 return scene(d,'22-cpufreq-driver','CPUFreq 驱动','软件与硬件接口之间的桥接图标；驱动将性能请求交给平台，实际频率还受硬件、温度和功耗限制。');
}

function power(){
 const d=drawing('power');
 d.group('power',()=>{
  d.box(46,80,250,119,'','#ffffff',C.ink,{roundness:{type:3}});
  d.box(299,112,18,51,'',C.paleOrange,C.orange,{roundness:null});
  [0,1,2].forEach(i=>d.box(63+i*73,98,55,81,'',i<2?C.paleTeal:'transparent',i<2?C.teal:'#c5cbd0',{roundness:null}));
  d.line([[191,38],[142,133],[181,133],[156,229],[234,112],[194,112],[222,38],[191,38]],C.orange,{backgroundColor:C.paleOrange,roughness:.85});
  d.text(121,250,'Power / W',25,C.ink);
 });
 return scene(d,'23-power','CPU 功耗','用于功率的电源图标，W 是功率单位；能耗应另用 J 等单位表示。');
}

function thermal(){
 const d=drawing('thermal');
 d.group('thermal',()=>{
  const outline=[[119,176],[119,65],[124,49],[140,43],[156,49],[161,65],[161,176],[178,193],[180,215],[166,236],[141,244],[116,236],[101,216],[103,194],[119,176]];
  d.line(outline,C.ink,{backgroundColor:'#ffffff',roundness:{type:2},roughness:.7});
  d.line([[140,97],[140,211]],red,{strokeWidth:9,roughness:.7});
  d.add('ellipse',{x:121,y:193,width:39,height:39,backgroundColor:paleRed,strokeColor:red,strokeWidth:2});
  [83,115,147].forEach(y=>d.line([[180,y],[203,y]],C.ink));
  d.line([[242,151],[235,139],[240,126],[247,113],[241,99]],C.orange,{roundness:{type:2},roughness:.65});
  d.line([[281,151],[274,139],[279,126],[286,113],[280,99]],C.orange,{roundness:{type:2},roughness:.65});
  d.text(219,191,'°C',27,red);
 });
 return scene(d,'24-thermal','温度与热约束','温度计与热流的抽象图标；热限制的阈值与性能控制方式依具体平台而异。');
}

export default function(){return [migration(),utilization(),frequency(),driver(),power(),thermal()];}
