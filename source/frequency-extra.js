import {drawing,C} from './shapes.js';

const scene=(d,id,title,description)=>({id,title,description,elements:d.elements});

function levels(){
 const d=drawing('frequency-levels');
 d.group('levels',()=>{
  d.line([[48,214],[48,181],[111,182],[111,141],[175,140],[175,99],[240,100],[240,214],[48,214]],C.blue,{backgroundColor:C.paleBlue});
  d.line([[48,181],[111,182],[111,141],[175,140],[175,99],[240,100]],C.blue);
  d.line([[264,72],[266,207]],C.purple);
  d.line([[255,100],[277,100]],C.purple);d.line([[255,141],[277,141]],C.purple);d.line([[255,182],[277,182]],C.purple);
  d.line([[252,129],[280,130],[282,151],[253,151],[252,129]],C.purple,{backgroundColor:C.palePurple});
  d.text(80,231,'levels',27,C.blue);
 });
 return scene(d,'33-frequency-levels','频率档位','以阶梯和拨杆表示可选择的频率档位；可用档位及选择方式依平台而异。');
}

function cap(){
 const d=drawing('frequency-cap');
 d.group('cap',()=>{
  d.line([[83,218],[83,64]],C.blue);
  d.line([[99,204],[145,204],[145,174],[190,174],[190,144],[235,144],[235,114],[277,114]],C.blue);
  d.line([[99,204],[145,204],[145,174],[190,174],[190,144],[235,144],[235,114],[277,114],[277,219],[99,219],[99,204]],C.blue,{backgroundColor:C.paleBlue});
  d.line([[70,114],[284,116]],C.orange,{strokeWidth:3});
  d.line([[70,105],[70,123]],C.orange);d.line([[284,107],[284,125]],C.orange);
  d.text(143,62,'cap',28,C.orange);
  d.text(56,228,'f',27,C.blue);
 });
 return scene(d,'34-frequency-cap','频率上限','横线表示频率上限；实际可用频率和限制的作用范围取决于平台与配置。');
}

function domain(){
 const d=drawing('frequency-domain');
 d.group('domain',()=>{
  d.line([[35,49],[324,52],[326,230],[36,227],[35,49]],C.purple,{strokeStyle:'dashed'});
  d.text(141,60,'f',29,C.purple);
  d.line([[105,105],[253,106]],C.purple,{strokeWidth:1.5});
  d.line([[105,106],[105,127]],C.purple);d.line([[253,106],[253,127]],C.purple);
  [[60,137],[208,137]].forEach(([x,y],i)=>{
   const color=i?C.blue:C.teal,fill=i?C.paleBlue:C.paleTeal;
   d.line([[x+2,y],[x+91,y+2],[x+92,y+70],[x,y+68],[x+2,y]],color,{backgroundColor:fill});
   d.text(x+18,y+19,'CPU',26,color);
   [19,46,73].forEach((p,j)=>{
    d.line([[x+p,y-10-(j%2)*2],[x+p,y]],color);
    d.line([[x+p,y+70],[x+p+1,y+80+(j%2)*2]],color);
   });
  });
 });
 return scene(d,'35-frequency-domain','共享调频域','虚线包围共享调频策略的 CPU；调频域依平台而异，共享策略不保证各核心实际频率完全一致。');
}

function throttle(){
 const d=drawing('thermal-throttle');
 d.group('throttle',()=>{
  d.line([[52,151],[51,75],[56,62],[67,56],[78,59],[85,70],[86,151],[96,160],[99,174],[94,187],[83,195],[69,198],[56,193],[46,183],[43,171],[46,159],[52,151]],C.orange,{roundness:{type:2}});
  d.line([[69,99],[69,174]],C.orange,{strokeWidth:7});
  d.add('ellipse',{x:56,y:164,width:27,height:27,backgroundColor:C.paleOrange,strokeColor:C.orange});
  d.line([[151,78],[284,80],[286,198],[150,196],[151,78]],C.teal,{backgroundColor:C.paleTeal});
  d.line([[166,92],[270,93],[270,182],[165,181],[166,92]],C.teal,{strokeWidth:1.5});
  d.text(179,111,'CPU',30,C.teal);
  [177,208,239,267].forEach((x,i)=>{
   d.line([[x,65-(i%2)*2],[x,78]],C.teal);
   d.line([[x,198],[x+1,211+(i%2)*2]],C.teal);
  });
  d.text(181,223,'f',27,C.blue);
  d.arrow([[232,219],[232,250]],C.blue);
 });
 return scene(d,'36-thermal-throttle','热限频','温度升高时平台可能限制 CPU 频率或性能；触发条件和具体控制方式因平台而异。');
}

export default function(){return [levels(),cap(),domain(),throttle()];}
