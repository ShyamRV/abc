import React, { useState } from 'react';

interface Props {
  onSave: (key: string) => void;
  isOpen: boolean;
}

export const ApiKeyModal: React.FC<Props> = ({ onSave, isOpen }) => {
  const [key, setKey] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-2">Enter Gemini API Key</h2>
        <p className="text-slate-400 text-sm mb-4">
          To activate the Agent Swarm, we need a Gemini API Key. 
          This is stored locally in memory only.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="AIzaSy..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-500 outline-none mb-4"
        />
        <button
          onClick={() => onSave(key)}
          disabled={!key}
          className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Initialize Agents
        </button>
      </div>
    </div>
  );
};