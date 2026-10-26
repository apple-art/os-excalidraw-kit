import {drawing,C} from './shapes.js';
export default function(){const d=drawing('rq');d.group('runqueue',()=>{d.line([[40,58],[354,58]],C.blue);d.line([[40,158],[354,158]],C.blue);['A','B','C'].forEach((s,i)=>d.box(54+i*100,77,80,62,s,C.paleBlue,C.blue));});return {id:'03-runqueue',title:'运行队列',elements:d.elements};}
