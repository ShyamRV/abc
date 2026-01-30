import React from 'react';
import { AgentType, Venue, Speaker } from './types';

export const MOCK_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'TechHub Downtown',
    capacity: 150,
    cost: 1200,
    location: 'San Francisco, CA',
    rating: 4.8,
    image: 'https://picsum.photos/400/200?random=1',
  },
  {
    id: 'v2',
    name: 'Innovation Loft',
    capacity: 50,
    cost: 500,
    location: 'SOMA, CA',
    rating: 4.5,
    image: 'https://picsum.photos/400/200?random=2',
  },
  {
    id: 'v3',
    name: 'Convention Center Hall B',
    capacity: 500,
    cost: 5000,
    location: 'San Jose, CA',
    rating: 4.2,
    image: 'https://picsum.photos/400/200?random=3',
  },
];

export const MOCK_SPEAKERS: Speaker[] = [
  {
    id: 's1',
    name: 'Alice Chen',
    role: 'AI Researcher',
    topics: ['Agents', 'LLMs', 'Ethics'],
    avatar: 'https://picsum.photos/100/100?random=4',
  },
  {
    id: 's2',
    name: 'David Miller',
    role: 'Systems Architect',
    topics: ['Scalability', 'Cloud', 'Rust'],
    avatar: 'https://picsum.photos/100/100?random=5',
  },
  {
    id: 's3',
    name: 'Sarah Johnson',
    role: 'Product Lead',
    topics: ['UX', 'Community', 'Growth'],
    avatar: 'https://picsum.photos/100/100?random=6',
  },
];

export const AGENT_ICONS: Record<AgentType, React.ReactNode> = {
  [AgentType.COORDINATOR]: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  [AgentType.VENUE]: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  [AgentType.SPEAKER]: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
  [AgentType.REGISTRATION]: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  [AgentType.MATCHING]: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  [AgentType.COMMUNICATION]: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

export const SAMPLE_PROMPTS = [
  "Host a hacker house for 20 AI engineers next weekend in San Francisco focused on Multi-Agent Systems.",
  "Plan a large conference for 300 people about The Future of ASI, need a high-tech venue and top-tier speakers.",
  "Organize a casual networking mixer for startup founders in New York, budget is low, focus on connections."
];