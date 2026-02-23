import { 
  Search, 
  Hammer, 
  GraduationCap, 
  FileCheck, 
  Library 
} from "lucide-react";
import { Agent, Department, JournalEntry, LearningNode } from "@/types";

export const departments: Department[] = [
  {
    id: '1',
    name: 'Transformer Architect Masterclass',
    progress: 2,
    icon: '🤖',
    color: 'bg-indigo-600'
  },
  {
    id: '2',
    name: 'Quantum Computing Fundamentals',
    progress: 5,
    icon: '⚛️',
    color: 'bg-purple-600'
  },
  {
    id: '3',
    name: 'Local AI App Builder',
    progress: 2,
    icon: '💻',
    color: 'bg-blue-600'
  }
];

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Scout',
    role: 'Finds papers & resources',
    status: 'idle',
    icon: Search,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: '2',
    name: 'Builder',
    role: 'Creates projects step-by-step',
    status: 'active',
    icon: Hammer,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: '3',
    name: 'Tutor',
    role: 'Explains & answers questions',
    status: 'waiting',
    icon: GraduationCap,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '4',
    name: 'Examiner',
    role: 'Tests knowledge, spots gaps',
    status: 'idle',
    icon: FileCheck,
    color: 'bg-red-100 text-red-600'
  },
  {
    id: '5',
    name: 'Curator',
    role: 'Curates your knowledge base',
    status: 'idle',
    icon: Library,
    color: 'bg-purple-100 text-purple-600'
  }
];

// Remapped for a "Constellation" layout
// Central spine with branching clusters
export const learningNodes: LearningNode[] = [
  // Foundation Cluster (Bottom Left)
  { id: '1', label: 'Linear Algebra', status: 'completed', x: 100, y: 400, mastery: 85, quizAttempts: 3 },
  { id: '2', label: 'Python', status: 'completed', x: 250, y: 450, mastery: 90, quizAttempts: 5 },
  { id: '9', label: 'Probability', status: 'completed', x: 180, y: 320, mastery: 75, quizAttempts: 2 },
  
  // PyTorch Bridge
  { id: '10', label: 'PyTorch', status: 'in-progress', x: 400, y: 380, mastery: 30, quizAttempts: 1, criticalGap: true },
  
  // Core Transformer Concepts (Center)
  { id: '3', label: 'Tensors', status: 'in-progress', x: 550, y: 300, mastery: 40, quizAttempts: 2 },
  { id: '11', label: 'Embeddings', status: 'locked', x: 650, y: 400, mastery: 0 },
  { id: '13', label: 'Positional Encoding', status: 'locked', x: 750, y: 250, mastery: 0 },
  
  // Attention Mechanism (Upper Center)
  { id: '4', label: 'Attention', status: 'locked', x: 900, y: 300, mastery: 0 },
  { id: '12', label: 'Self-Attention', status: 'locked', x: 950, y: 180, mastery: 0 },
  { id: '5', label: 'Multi-Head', status: 'locked', x: 1050, y: 350, mastery: 0 },
  
  // Architecture Blocks (Right)
  { id: '6', label: 'Encoder', status: 'locked', x: 1200, y: 280, mastery: 0 },
  { id: '14', label: 'Decoder', status: 'locked', x: 1250, y: 420, mastery: 0 },
  { id: '7', label: 'Forward Pass', status: 'locked', x: 1350, y: 200, mastery: 0 },
  { id: '15', label: 'Backpropagation', status: 'locked', x: 1400, y: 350, mastery: 0 },
  
  // The Project (Far Right / Goal)
  { id: '8', label: 'Transformer Project', status: 'locked', x: 1600, y: 300, mastery: 0 },
];

export const journalEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'Daily Briefing: Day 1',
    description: 'Foundation setting and initial roadmap planning.',
    type: 'summary',
    date: 'Today, 22 Feb',
    timestamp: '09:00 AM',
    day: 1,
    creator: { name: 'System', role: 'Orchestrator' },
    status: 'completed',
    context: {
      why: 'Daily alignment',
      how: 'Aggregated from learning path goals',
    },
    content: {
      tasks: [
        { label: 'Complete Linear Algebra Refresher', completed: true },
        { label: 'Setup PyTorch Environment', completed: false },
        { label: 'Read "Attention is All You Need" Abstract', completed: true }
      ]
    }
  },
  {
    id: '2',
    title: 'Concept Check: Matrix Multiplication',
    description: 'Quick check on dot product understanding.',
    type: 'quiz',
    date: 'Today, 22 Feb',
    timestamp: '10:30 AM',
    day: 1,
    creator: { name: 'Examiner', role: 'AI Agent' },
    status: 'pending',
    context: {
      why: 'Verify prerequisite knowledge for Attention mechanisms',
      how: 'Generated based on Linear Algebra node completion',
    },
    content: {
      quizQuestion: 'What is the shape of the resulting matrix when multiplying (3x4) and (4x2)?',
      quizOptions: ['3x2', '4x4', '3x4', 'Error'],
      tags: ['Math', 'Prerequisite']
    }
  },
  {
    id: '3',
    title: 'Resource Found: Visualizing Attention',
    description: 'Scout agent found a high-impact interactive article.',
    type: 'agent',
    date: 'Today, 22 Feb',
    timestamp: '11:15 AM',
    day: 1,
    creator: { name: 'Scout', role: 'AI Agent' },
    status: 'completed',
    context: {
      why: 'Supplementing static reading material',
      how: 'Web search for "Transformer visualization"',
      toolUsed: 'Search API'
    },
    content: {
      tags: ['Resource', 'Visualization']
    }
  },
  {
    id: '4',
    title: 'Milestone Reached: Foundation',
    description: 'You have completed the core mathematical prerequisites.',
    type: 'milestone',
    date: 'Yesterday, 21 Feb',
    timestamp: '04:00 PM',
    day: 0,
    creator: { name: 'System', role: 'Tracker' },
    status: 'completed',
    context: {
      why: 'Progress tracking',
      how: 'Node completion verification'
    }
  },
  {
    id: '5',
    title: 'Optimization Script Generated',
    description: 'Builder agent created a Python script for hyperparameter tuning.',
    type: 'agent',
    date: 'Today, 22 Feb',
    timestamp: '02:15 PM',
    day: 1,
    creator: { name: 'Builder', role: 'AI Agent' },
    status: 'completed',
    context: {
      why: 'Optimize learning rate',
      how: 'Grid search algorithm'
    },
    content: {
      codeSnippet: `def optimize_lr(model, train_loader):
  lrs = [1e-4, 1e-3, 1e-2]
  for lr in lrs:
    train(model, train_loader, lr)
    val_loss = validate(model)
    print(f"LR: {lr}, Loss: {val_loss}")`,
      tags: ['Python', 'Optimization']
    }
  }
];
