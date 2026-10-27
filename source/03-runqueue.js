import {drawing,C} from './shapes.js';
export default function(){
 const d=drawing('rq');
 d.group('runqueue',()=>{
  d.text(53,30,'run queue',28,C.blue);
  d.line([[40,85],[108,83],[191,85],[277,82],[353,84]],C.blue,{strokeWidth:1.6});
  const cards=[{x:55,y:105,label:'A',fill:C.paleBlue},{x:151,y:101,label:'B',fill:C.paleTeal},{x:247,y:107,label:'C',fill:C.paleOrange}];
  cards.forEach(({x,y,label,fill},i)=>{
   const color=[C.blue,C.teal,C.orange][i];
   d.line([[x+2,y],[x+79,y+2],[x+77,y+70],[x,y+68],[x+2,y]],color,{backgroundColor:fill});
   d.text(x+27,y+17,label,32,color);
  });
  d.line([[40,197],[103,199],[184,196],[274,200],[354,198]],C.blue);
 });
 return {id:'03-runqueue',title:'运行队列',elements:d.elements};
}
