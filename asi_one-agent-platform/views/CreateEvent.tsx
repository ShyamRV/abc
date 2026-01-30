import React, { useState, useEffect, useRef } from 'react';
import { SAMPLE_PROMPTS, MOCK_VENUES, MOCK_SPEAKERS } from '../constants';
import { parseEventIntent, ParsedEventIntent } from '../services/geminiService';
import { AgentStatus } from '../components/AgentStatus';
import { AgentTask, TaskStatus, AgentType, EventData, EventStatus } from '../types';

interface Props {
  onCancel: () => void;
  onEventCreated: (event: EventData) => void;
}

export const CreateEvent: React.FC<Props> = ({ onCancel, onEventCreated }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedIntent, setParsedIntent] = useState<ParsedEventIntent | null>(null);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [loadingStep, setLoadingStep] = useState<string>('');
  
  const tasksRef = useRef<AgentTask[]>([]);

  // Helper to add tasks safely to state and ref
  const addTask = (task: AgentTask) => {
    tasksRef.current = [task, ...tasksRef.current];
    setTasks([...tasksRef.current]);
  };

  const updateTask = (id: string, updates: Partial<AgentTask>) => {
    tasksRef.current = tasksRef.current.map(t => t.id === id ? { ...t, ...updates } : t);
    setTasks([...tasksRef.current]);
  };

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setTasks([]);
    tasksRef.current = [];

    // 1. Coordinator receives task
    const coordTaskId = 't1';
    addTask({
      id: coordTaskId,
      agent: AgentType.COORDINATOR,
      description: 'Analyzing user intent and formulating event strategy...',
      status: TaskStatus.IN_PROGRESS,
      timestamp: Date.now()
    });

    try {
      const result = await parseEventIntent(prompt);
      
      updateTask(coordTaskId, { 
        status: TaskStatus.COMPLETED, 
        result: `Intent understood: ${result.title}. Delegating tasks.` 
      });
      
      setParsedIntent(result);
      
      // Start simulation of other agents
      simulateAgentWorkflow(result);

    } catch (e) {
      updateTask(coordTaskId, { 
        status: TaskStatus.FAILED, 
        result: 'Failed to process intent. Please verify API Key.' 
      });
      setIsProcessing(false);
    }
  };

  const simulateAgentWorkflow = async (intent: ParsedEventIntent) => {
    // 2. Venue Agent
    await new Promise(r => setTimeout(r, 800));
    const venueTaskId = 't2';
    addTask({
      id: venueTaskId,
      agent: AgentType.VENUE,
      description: `Searching for venues matching criteria: ${intent.venue_criteria}...`,
      status: TaskStatus.IN_PROGRESS,
      timestamp: Date.now()
    });

    await new Promise(r => setTimeout(r, 2000));
    const venue = MOCK_VENUES[Math.floor(Math.random() * MOCK_VENUES.length)];
    updateTask(venueTaskId, {
      status: TaskStatus.COMPLETED,
      result: `Found optimal venue: ${venue.name} ($${venue.cost})`
    });

    // 3. Speaker Agent
    await new Promise(r => setTimeout(r, 500));
    const speakerTaskId = 't3';
    addTask({
      id: speakerTaskId,
      agent: AgentType.SPEAKER,
      description: `Identifying speakers for topics: ${intent.suggested_topics.join(', ')}...`,
      status: TaskStatus.IN_PROGRESS,
      timestamp: Date.now()
    });

    await new Promise(r => setTimeout(r, 2500));
    const suggestedSpeakers = MOCK_SPEAKERS.slice(0, 2);
    updateTask(speakerTaskId, {
      status: TaskStatus.COMPLETED,
      result: `Contacted ${suggestedSpeakers.length} potential speakers.`
    });

    // 4. Registration Agent
    await new Promise(r => setTimeout(r, 500));
    const regTaskId = 't4';
    addTask({
      id: regTaskId,
      agent: AgentType.REGISTRATION,
      description: 'Setting up approval workflows and landing page...',
      status: TaskStatus.IN_PROGRESS,
      timestamp: Date.now()
    });

    await new Promise(r => setTimeout(r, 1500));
    updateTask(regTaskId, {
      status: TaskStatus.COMPLETED,
      result: 'Registration portal ready.'
    });

    setIsProcessing(false);
  };

  const handleConfirm = () => {
    if (!parsedIntent) return;
    
    // Construct final event object
    const newEvent: EventData = {
      id: Date.now().toString(),
      title: parsedIntent.title,
      description: parsedIntent.description,
      date: parsedIntent.suggested_date,
      status: EventStatus.CONFIRMED,
      attendees: 0,
      budget: parsedIntent.budget_level,
      // In a real app these would be selected by user from agent suggestions
      venue: MOCK_VENUES[0], 
      speakers: MOCK_SPEAKERS.slice(0, 2),
      tasks: tasksRef.current,
      aiAnalysis: parsedIntent.coordinator_thought
    };

    onEventCreated(newEvent);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
      {/* Left: Input & Review */}
      <div className="flex flex-col space-y-6 overflow-y-auto pr-2">
        <div>
          <h2 className="text-2xl font-bold text-white">Create New Event</h2>
          <p className="text-slate-400">Describe your event and let the Agent Swarm handle the logistics.</p>
        </div>

        {!parsedIntent ? (
          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isProcessing}
              placeholder="e.g. I want to host a Hackathon for 50 AI developers in San Francisco next month..."
              className="w-full h-40 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-500 outline-none resize-none placeholder-slate-500"
            />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {SAMPLE_PROMPTS.map((p, i) => (
                <button 
                  key={i}
                  onClick={() => setPrompt(p)}
                  className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
                >
                  Example {i + 1}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={onCancel}
                className="text-slate-400 hover:text-white font-medium px-4 py-2 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAnalyze}
                disabled={!prompt || isProcessing}
                className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-brand-500/20 transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Agents Working...
                  </>
                ) : 'Activate Swarm'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6 animate-fade-in">
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-xl font-bold text-white">{parsedIntent.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{parsedIntent.description}</p>
               </div>
               <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs font-mono uppercase">
                  {parsedIntent.budget_level} Budget
               </span>
             </div>

             <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">Date</span>
                  <span className="text-slate-200 font-medium">{parsedIntent.suggested_date}</span>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">Attendees</span>
                  <span className="text-slate-200 font-medium">~{parsedIntent.estimated_attendees}</span>
                </div>
             </div>
             
             <div>
               <h4 className="text-sm font-medium text-slate-400 mb-2">Coordinator's Strategy</h4>
               <p className="text-slate-300 text-sm italic bg-slate-900/30 p-3 rounded-lg border border-slate-800/50">
                 "{parsedIntent.coordinator_thought}"
               </p>
             </div>

             <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
               <button 
                 onClick={() => {
                    setParsedIntent(null);
                    setTasks([]);
                    tasksRef.current = [];
                 }}
                 className="text-slate-400 hover:text-white font-medium px-4 py-2"
               >
                 Refine
               </button>
               <button 
                 onClick={handleConfirm}
                 disabled={isProcessing}
                 className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium shadow-lg shadow-green-500/20 transition-all"
               >
                 Confirm Event
               </button>
             </div>
          </div>
        )}
      </div>

      {/* Right: Agent Status */}
      <div className="h-full">
        <AgentStatus tasks={tasks} />
      </div>
    </div>
  );
};