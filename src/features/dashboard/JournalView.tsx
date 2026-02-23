import { journalEntries } from "@/data/mock";
import { cn } from "@/lib/utils";
import { DailySummaryCard, QuizCard, AgentUpdateCard, JournalDetailModal } from "./JournalComponents";
import { useState } from "react";
import { JournalEntry } from "@/types";
import { AnimatePresence } from "motion/react";

export default function JournalView() {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // Group entries by date
  const groupedEntries = journalEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, typeof journalEntries>);

  return (
    <div className="w-full max-w-3xl mx-auto pb-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Journal</h2>
          <p className="text-gray-500">Daily progress, insights, and AI activity.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Filter</button>
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">New Entry</button>
        </div>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedEntries).map(([date, entries]) => (
          <div key={date} className="relative">
            {/* Date Sticky Header */}
            <div className="sticky top-0 z-10 py-4 bg-[#F9FAFB]/95 backdrop-blur-sm mb-6 flex items-center gap-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{date}</h3>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Timeline Line */}
            <div className="absolute left-8 top-12 bottom-0 w-px bg-gray-200 -z-10" />

            <div className="space-y-6 pl-0 sm:pl-4">
              {entries.map((entry) => (
                <div key={entry.id}>
                  {entry.type === 'summary' && (
                    <DailySummaryCard entry={entry} onClick={() => setSelectedEntry(entry)} />
                  )}
                  {entry.type === 'quiz' && (
                    <QuizCard entry={entry} onClick={() => setSelectedEntry(entry)} />
                  )}
                  {entry.type === 'agent' && (
                    <AgentUpdateCard entry={entry} onClick={() => setSelectedEntry(entry)} />
                  )}
                  {entry.type === 'milestone' && (
                    <AgentUpdateCard entry={entry} onClick={() => setSelectedEntry(entry)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEntry && (
          <JournalDetailModal 
            entry={selectedEntry} 
            onClose={() => setSelectedEntry(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
