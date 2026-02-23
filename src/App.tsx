/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { StatsHeader, MilestoneBanner } from '@/features/dashboard/HeaderComponents';
import LearningPathView from '@/features/dashboard/LearningPathView';
import JournalView from '@/features/dashboard/JournalView';
import { cn } from '@/lib/utils';
import { BookOpen, Map, BrainCircuit } from 'lucide-react';

type Tab = 'path' | 'journal' | 'knowledge';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('path');

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <StatsHeader />
        <MilestoneBanner />

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('path')}
            className={cn(
              "pb-3 flex items-center gap-2 text-sm font-medium transition-colors relative",
              activeTab === 'path' ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Map size={16} />
            Learning Path
            {activeTab === 'path' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('journal')}
            className={cn(
              "pb-3 flex items-center gap-2 text-sm font-medium transition-colors relative",
              activeTab === 'journal' ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <BookOpen size={16} />
            Journal
            {activeTab === 'journal' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={cn(
              "pb-3 flex items-center gap-2 text-sm font-medium transition-colors relative",
              activeTab === 'knowledge' ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <BrainCircuit size={16} />
            Knowledge
            {activeTab === 'knowledge' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
        </div>

        {/* Content Views */}
        <div className="min-h-[600px]">
          {activeTab === 'path' && <LearningPathView />}
          {activeTab === 'journal' && <JournalView />}
          {activeTab === 'knowledge' && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-2xl border border-gray-100">
              <BrainCircuit size={48} className="mb-4 opacity-20" />
              <p>Knowledge Base is empty</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
