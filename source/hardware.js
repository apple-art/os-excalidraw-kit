import {drawing,C} from './shapes.js';

export default function hardwareComponents(){
 const scenes=[];
 const make=(id,title,description,paint)=>{const d=drawing(id);d.group('component',()=>paint(d));scenes.push({id,title,description,elements:d.elements});};
 const chip=(d,x,y,s,name,color,fill)=>{
  const q=s/160;
  d.line([[x+4*q,y+2*q],[x+s-4*q,y],[x+s,y+s-5*q],[x+s-3*q,y+s],[x,y+s-2*q],[x+4*q,y+2*q]],color,{backgroundColor:fill});
  for(let i=0;i<4;i++){
   const p=s*(0.17+i*0.22),pin=s*0.10;
   d.line([[x-pin-(i%2)*2*q,y+p],[x+2*q,y+p+q]],color);
   d.line([[x+s-q,y+p],[x+s+pin+(i%2)*2*q,y+p-q]],color);
   d.line([[x+p,y-pin-(i%2)*2*q],[x+p+q,y+q]],color);
   d.line([[x+p,y+s-q],[x+p-q,y+s+pin+(i%2)*2*q]],color);
  }
  d.line([[x+19*q,y+20*q],[x+s-20*q,y+18*q],[x+s-18*q,y+s-20*q],[x+18*q,y+s-18*q],[x+19*q,y+20*q]],color,{strokeWidth:1.5});
  d.text(x+(name==='big'?0.34:0.23)*s,y+0.39*s,name,name==='big'?30:25,color);
 };

 make('28-big-core','大核','大核的教学示意，尺寸用于表达相对计算能力或容量概念，不代表真实晶粒大小，也不指定 ISA。',d=>{
  chip(d,90,48,160,'big',C.blue,C.paleBlue);
 });
 make('29-little-core','小核','小核的教学示意，尺寸用于表达相对计算能力或容量概念，不代表真实晶粒大小，也不指定 ISA。',d=>{
  chip(d,112,71,115,'little',C.teal,C.paleTeal);
 });
 make('30-cpu-cluster','CPU 簇','四个核心组成一个簇的示意；簇的核心数量和组织方式依平台而异。',d=>{
  d.line([[38,31],[330,34],[333,261],[41,258],[38,31]],C.purple,{backgroundColor:C.palePurple});
  d.text(135,43,'cluster',27,C.purple);
  d.line([[60,82],[308,84]],C.purple,{strokeWidth:1.5});
  [[65,99,'C0'],[205,101,'C1'],[67,176,'C2'],[207,178,'C3']].forEach(([x,y,name],i)=>{
   const color=i%2?C.teal:C.blue,fill=i%2?C.paleTeal:C.paleBlue;
   d.line([[x+2,y],[x+99,y+2],[x+98,y+61],[x,y+60],[x+2,y]],color,{backgroundColor:fill});
   d.line([[x+10,y+9],[x+90,y+10]],color,{strokeWidth:1.4});
   d.text(x+31,y+18,name,25,color);
  });
 });
 make('31-shared-cache','共享缓存','可由多个核心共享的缓存示意；缓存是否共享及其实际层级依平台而定。',d=>{
  d.text(136,32,'cache',29,C.purple);
  d.line([[40,79],[327,82],[329,209],[43,211],[40,79]],C.purple,{backgroundColor:C.palePurple});
  for(let i=0;i<4;i++){
   const x=55+i*66,y=96+(i%2)*2;
   d.line([[x,y],[x+53,y+1],[x+52,y+96],[x+1,y+95],[x,y]],C.purple,{backgroundColor:C.paleBlue});
   d.line([[x+8,y+30],[x+45,y+31]],C.purple,{strokeWidth:1.4});
   d.line([[x+8,y+63],[x+45,y+62]],C.purple,{strokeWidth:1.4});
  }
  d.line([[109,210],[108,235],[92,235]],C.teal);
  d.line([[260,210],[261,235],[277,235]],C.teal);
 });
 return scenes;
}
