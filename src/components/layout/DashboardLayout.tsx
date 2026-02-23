import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutGrid, 
  Settings, 
  LogOut, 
  Plus,
  ChevronRight,
  Moon,
  User,
  PanelRightClose,
  PanelRightOpen,
  MessageSquare
} from 'lucide-react';
import { departments, agents } from '@/data/mock';
import { motion, AnimatePresence } from "motion/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#F9FAFB] overflow-hidden">
      {/* Left Sidebar - Departments */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-900">
            <span className="text-indigo-600">Scholar</span>Sync
          </div>
        </div>

        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Campus</h3>
          <h2 className="text-sm font-bold text-gray-900 px-2 mb-4">Departments</h2>
          
          <div className="space-y-2">
            {departments.map((dept) => (
              <button 
                key={dept.id}
                className={cn(
                  "w-full p-3 rounded-xl flex items-start gap-3 transition-all text-left group",
                  dept.id === '1' ? "bg-indigo-50 border border-indigo-100" : "hover:bg-gray-50"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-lg shadow-sm",
                  dept.id === '1' ? "bg-indigo-600 text-white" : "bg-gray-900 text-white"
                )}>
                  {dept.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "text-xs font-semibold truncate",
                    dept.id === '1' ? "text-indigo-900" : "text-gray-700"
                  )}>
                    {dept.name}
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={cn("h-1 rounded-full", dept.color)} 
                      style={{ width: `${dept.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-gray-400">{dept.progress}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button className="w-full mt-4 p-3 rounded-xl border border-dashed border-gray-300 flex items-center justify-center gap-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
            <Plus size={16} />
            New Department
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-900">ScholarSync</span>
            <ChevronRight size={14} />
            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md font-medium text-xs">
              Transformer Architect Masterclass
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
              title={isRightSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              {isRightSidebarOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
            </button>
            <div className="w-px h-6 bg-gray-200" />
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Moon size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium text-sm shadow-md shadow-indigo-200">
              P
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F9FAFB]">
          {children}
        </div>
      </main>

      {/* Right Sidebar - AI Crew (Collapsible) */}
      <AnimatePresence initial={false}>
        {isRightSidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white border-l border-gray-100 flex flex-col flex-shrink-0 z-20 overflow-hidden"
          >
            <div className="w-80 p-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">AI Crew</h3>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Your Agents</h2>

              <div className="space-y-3">
                {agents.map((agent) => (
                  <div 
                    key={agent.id}
                    className="p-3 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow cursor-pointer group flex items-start gap-3"
                  >
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", agent.color)}>
                      <agent.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-sm font-bold text-gray-900">{agent.name}</h4>
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          agent.status === 'active' ? "bg-green-500 animate-pulse" : 
                          agent.status === 'waiting' ? "bg-yellow-400" : "bg-gray-200"
                        )} />
                      </div>
                      <p className="text-xs text-gray-500 leading-tight">{agent.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Dept Mastery</h3>
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">0%</div>
                  <div className="text-xs text-red-500 flex items-center gap-1 font-medium">
                    ⚠️ 15 concepts need attention
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-4">AI Recommends</h3>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="text-sm font-bold text-gray-900 mb-1">Practice: Linear Algebra</div>
                  <div className="text-xs text-gray-500">
                    Mastery 0% — targeted drill ready
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Action Button for Chat */}
            <div className="mt-auto p-6 flex justify-end">
              <button className="w-12 h-12 bg-indigo-600 rounded-full shadow-lg shadow-indigo-300 flex items-center justify-center text-white hover:scale-105 transition-transform">
                <MessageSquare size={20} />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
