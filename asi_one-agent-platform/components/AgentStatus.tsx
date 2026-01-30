import React from 'react';
import { AgentTask, TaskStatus, AgentType } from '../types';
import { AGENT_ICONS } from '../constants';

interface Props {
  tasks: AgentTask[];
}

export const AgentStatus: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 h-full overflow-hidden flex flex-col">
      <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Agent Swarm Activity
      </h3>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {tasks.length === 0 && (
          <div className="text-slate-500 text-sm text-center italic py-10">
            Waiting for coordinator instructions...
          </div>
        )}
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`flex gap-3 p-3 rounded-lg border text-sm transition-all duration-500 ${
              task.status === TaskStatus.COMPLETED ? 'bg-slate-900/50 border-slate-700/50 opacity-75' :
              task.status === TaskStatus.IN_PROGRESS ? 'bg-brand-900/20 border-brand-500/30 animate-pulse' :
              'bg-slate-900 border-slate-800'
            }`}
          >
            <div className={`mt-0.5 text-slate-400 ${task.status === TaskStatus.IN_PROGRESS ? 'text-brand-400' : ''}`}>
              {AGENT_ICONS[task.agent]}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="font-medium text-slate-200">{task.agent}</span>
                <span className="text-xs font-mono text-slate-500">
                  {new Date(task.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}
                </span>
              </div>
              <p className="text-slate-400 mt-1">{task.description}</p>
              {task.result && (
                <div className="mt-2 text-green-400 text-xs bg-green-900/20 p-2 rounded border border-green-900/30 font-mono">
                  {'>'} {task.result}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};