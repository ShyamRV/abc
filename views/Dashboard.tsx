import React from 'react';
import { EventData, EventStatus } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  events: EventData[];
  onCreateClick: () => void;
  onEventClick: (event: EventData) => void;
}

const DATA = [
  { name: 'Jan', attendees: 40 },
  { name: 'Feb', attendees: 30 },
  { name: 'Mar', attendees: 20 },
  { name: 'Apr', attendees: 27 },
  { name: 'May', attendees: 18 },
  { name: 'Jun', attendees: 23 },
  { name: 'Jul', attendees: 34 },
];

export const Dashboard: React.FC<Props> = ({ events, onCreateClick, onEventClick }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Organizer Dashboard</h1>
          <p className="text-slate-400 mt-2">Monitor your autonomous agent fleet and event performance.</p>
        </div>
        <button 
          onClick={onCreateClick}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-brand-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Attendees</h3>
          <p className="text-4xl font-bold text-white mt-2">1,284</p>
          <div className="mt-4 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="attendees" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Agents</h3>
          <p className="text-4xl font-bold text-white mt-2">12</p>
          <div className="mt-4 flex gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">System load: Normal</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Community Score</h3>
          <p className="text-4xl font-bold text-white mt-2">94.2</p>
          <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +2.4% this week
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Recent Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div 
              key={event.id}
              onClick={() => onEventClick(event)}
              className="group cursor-pointer bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-brand-500 transition-colors"
            >
              <div className="h-32 bg-slate-700 relative">
                 {/* Placeholder for event cover */}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                 <div className="absolute bottom-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${event.status === EventStatus.CONFIRMED ? 'bg-green-500/20 text-green-400' : 'bg-brand-500/20 text-brand-400'}`}>
                      {event.status}
                    </span>
                 </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors truncate">{event.title}</h3>
                <p className="text-slate-400 text-sm mt-1 line-clamp-2">{event.description}</p>
                <div className="mt-4 flex justify-between items-center text-sm text-slate-500">
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
                    {event.attendees}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
              No events found. Start by creating one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};