import React from 'react';
import { EventData, EventStatus } from '../types';
import { AgentStatus } from '../components/AgentStatus';

interface Props {
  event: EventData;
  onBack: () => void;
}

export const EventDetails: React.FC<Props> = ({ event, onBack }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div className="relative rounded-2xl overflow-hidden h-64 bg-slate-800 border border-slate-700">
             {event.venue?.image && (
               <img src={event.venue.image} alt="Venue" className="w-full h-full object-cover opacity-50" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
             <div className="absolute bottom-6 left-6 right-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-bold text-white">{event.title}</h1>
                    <div className="flex items-center gap-4 mt-2 text-slate-300">
                       <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {event.date}
                       </span>
                       <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {event.attendees} Registered
                       </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                    {event.status}
                  </span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Venue Card */}
             <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
               <h3 className="text-slate-200 font-semibold mb-3 flex items-center gap-2">
                 <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                 </svg>
                 Venue
               </h3>
               {event.venue ? (
                 <div>
                   <div className="text-lg font-medium text-white">{event.venue.name}</div>
                   <div className="text-slate-400 text-sm">{event.venue.location}</div>
                   <div className="mt-2 flex gap-2 text-xs text-slate-500">
                     <span className="bg-slate-900 px-2 py-1 rounded">Capacity: {event.venue.capacity}</span>
                     <span className="bg-slate-900 px-2 py-1 rounded">Cost: ${event.venue.cost}</span>
                   </div>
                 </div>
               ) : (
                 <div className="text-slate-500 italic">Venue Agent searching...</div>
               )}
             </div>

             {/* Speakers Card */}
             <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
               <h3 className="text-slate-200 font-semibold mb-3 flex items-center gap-2">
                 <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                 </svg>
                 Speakers
               </h3>
               <div className="space-y-3">
                 {event.speakers.map(s => (
                   <div key={s.id} className="flex items-center gap-3">
                     <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full bg-slate-700" />
                     <div>
                       <div className="text-white text-sm font-medium">{s.name}</div>
                       <div className="text-slate-500 text-xs">{s.role}</div>
                     </div>
                   </div>
                 ))}
                 {event.speakers.length === 0 && (
                    <div className="text-slate-500 italic">Speaker Agent contacting...</div>
                 )}
               </div>
             </div>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
             <h3 className="text-slate-200 font-semibold mb-2">Description</h3>
             <p className="text-slate-400 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Sidebar Logs */}
        <div className="w-full lg:w-96 h-[600px]">
          <AgentStatus tasks={event.tasks || []} />
        </div>
      </div>
    </div>
  );
};