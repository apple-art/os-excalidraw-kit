import task from './01-task.js';
import cpu from './02-cpu.js';
import runqueue from './03-runqueue.js';
import governor from './04-governor.js';
import system from './system.js';
import scheduling from './scheduling.js';
import frequency from './frequency.js';
export default function components(){return [task(),cpu(),runqueue(),governor(),...system(),...scheduling(),...frequency()];}
