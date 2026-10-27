import {drawing,C} from './shapes.js';
export default function(){
 const d=drawing('task');
 d.group('task-card',()=>{
  d.line([[65,35],[238,33],[274,66],[272,225],[68,228],[65,35]],C.blue,{backgroundColor:C.paleBlue});
  d.line([[238,34],[238,67],[273,66]],C.blue);
  d.text(91,55,'Task A',32,C.blue);
  d.line([[91,102],[243,101]],C.blue,{strokeWidth:1.6});
  d.line([[94,130],[233,128]],C.muted,{strokeWidth:1.5});
  d.line([[94,152],[207,154]],C.muted,{strokeWidth:1.5});
  d.add('ellipse',{x:96,y:187,width:13,height:13,backgroundColor:C.teal,strokeColor:C.teal,fillStyle:'solid'});
  d.text(124,177,'ready',26,C.teal);
 });
 return {id:'01-task',title:'任务卡片',elements:d.elements};
}
