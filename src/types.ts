import { LucideIcon } from "lucide-react";

export interface Department {
  id: string;
  name: string;
  progress: number;
  icon: string; // URL or identifier
  color: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'waiting';
  icon: LucideIcon;
  color: string;
}

export interface LearningNode {
  id: string;
  label: string;
  status: 'completed' | 'in-progress' | 'locked';
  x: number;
  y: number;
  mastery: number;
  quizAttempts?: number;
  criticalGap?: boolean;
}

export interface JournalEntry {
  id: string;
  title: string;
  description: string;
  type: 'milestone' | 'quiz' | 'agent' | 'study' | 'upload' | 'summary';
  date: string;
  timestamp: string;
  day: number;
  creator: {
    name: string;
    role: string;
    avatar?: string;
  };
  context?: {
    why: string;
    how: string;
    toolUsed?: string;
  };
  content?: {
    quizQuestion?: string;
    quizOptions?: string[];
    codeSnippet?: string;
    tags?: string[];
    tasks?: { label: string; completed: boolean }[];
  };
  status: 'completed' | 'pending' | 'failed';
}
