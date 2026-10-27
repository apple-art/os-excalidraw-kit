import {drawing,C} from './shapes.js';
export default function(){
 const d=drawing('gov');
 d.group('governor',()=>{
  d.line([[58,33],[294,36],[298,233],[61,230],[58,33]],C.purple,{backgroundColor:C.palePurple});
  d.text(94,49,'governor',29,C.purple);
  d.line([[83,96],[272,98]],C.purple,{strokeWidth:1.5});
  [125,163,201].forEach((y,i)=>{
   d.line([[89,y],[267,y+(i%2?2:-1)]],C.purple,{strokeWidth:1.8});
   const x=[135,222,181][i];
   d.line([[x-9,y-12],[x+9,y-11],[x+10,y+12],[x-8,y+11],[x-9,y-12]],C.purple,{backgroundColor:'#fffefa',fillStyle:'solid'});
  });
 });
 return {id:'04-governor',title:'调频 governor',elements:d.elements};
}
