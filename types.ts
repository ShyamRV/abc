export enum AgentType {
  COORDINATOR = 'Coordinator Agent',
  VENUE = 'Venue Agent',
  SPEAKER = 'Speaker Agent',
  REGISTRATION = 'Registration Agent',
  MATCHING = 'Matching Agent',
  COMMUNICATION = 'Communication Agent',
}

export enum EventStatus {
  PLANNING = 'Planning',
  CONFIRMED = 'Confirmed',
  LIVE = 'Live',
  COMPLETED = 'Completed',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface AgentTask {
  id: string;
  agent: AgentType;
  description: string;
  status: TaskStatus;
  result?: string;
  timestamp: number;
}

export interface Venue {
  id: string;
  name: string;
  capacity: number;
  cost: number;
  location: string;
  rating: number;
  image: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  topics: string[];
  avatar: string;
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  status: EventStatus;
  attendees: number;
  budget: string;
  venue?: Venue;
  speakers: Speaker[];
  tasks: AgentTask[]; // Log of agent actions for this event
  aiAnalysis?: string; // Raw thought process from Coordinator
}

export interface User {
  id: string;
  name: string;
  role: 'organizer' | 'attendee' | 'admin';
  avatar: string;
}