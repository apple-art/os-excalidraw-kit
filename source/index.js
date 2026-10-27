import task from './01-task.js';
import cpu from './02-cpu.js';
import queue from './03-runqueue.js';
import governor from './04-governor.js';
import system from './system.js';
import scheduling from './scheduling.js';
import frequency from './frequency.js';
import states from './states.js';
import hardware from './hardware.js';
import frequencyExtra from './frequency-extra.js';
export default function components(){return [task(),cpu(),queue(),governor(),...system(),...scheduling(),...frequency(),...states(),...hardware(),...frequencyExtra()].sort((a,b)=>a.id.localeCompare(b.id));}
