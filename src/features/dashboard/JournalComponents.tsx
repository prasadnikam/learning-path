import { JournalEntry } from "@/types";
import { cn } from "@/lib/utils";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  User, 
  Bot, 
  FileText, 
  Code, 
  HelpCircle,
  MoreHorizontal,
  Share2,
  Heart,
  MessageCircle,
  X,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JournalCardProps {
  entry: JournalEntry;
  onClick: () => void;
}

export function DailySummaryCard({ entry, onClick }: JournalCardProps) {
  const completedTasks = entry.content?.tasks?.filter(t => t.completed).length || 0;
  const totalTasks = entry.content?.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 cursor-pointer hover:shadow-md transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Daily Briefing</div>
          <h3 className="text-lg font-bold text-gray-900">{entry.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock size={14} />
          {entry.timestamp}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="#e0e7ff" strokeWidth="4" fill="none" />
            <circle 
              cx="32" cy="32" r="28" 
              stroke="#6366f1" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray={175} 
              strokeDashoffset={175 - (175 * progress) / 100} 
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-xs font-bold text-indigo-600">{Math.round(progress)}%</span>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{entry.description}</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md">
              {completedTasks} Done
            </span>
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
              {totalTasks - completedTasks} Remaining
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {entry.content?.tasks?.slice(0, 2).map((task, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
            {task.completed ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
            <span className={task.completed ? "line-through text-gray-400" : ""}>{task.label}</span>
          </div>
        ))}
        {(entry.content?.tasks?.length || 0) > 2 && (
          <div className="text-xs text-gray-400 pl-6">+ {(entry.content?.tasks?.length || 0) - 2} more tasks</div>
        )}
      </div>
    </motion.div>
  );
}

export function QuizCard({ entry, onClick }: JournalCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
          <HelpCircle size={20} />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">{entry.creator.name}</div>
          <div className="text-xs text-gray-500">{entry.timestamp} • Quiz</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900 mb-2">{entry.title}</h3>
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
          "{entry.content?.quizQuestion}"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {entry.content?.quizOptions?.map((opt, i) => (
          <div key={i} className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-colors text-center">
            {opt}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex gap-2">
          {entry.content?.tags?.map(tag => (
            <span key={tag} className="text-[10px] font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">#{tag}</span>
          ))}
        </div>
        <button className="text-xs font-bold text-indigo-600 hover:underline">Take Quiz →</button>
      </div>
    </motion.div>
  );
}

export function AgentUpdateCard({ entry, onClick }: JournalCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <Bot size={20} />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">{entry.creator.name}</div>
          <div className="text-xs text-gray-500">{entry.timestamp} • Agent Action</div>
        </div>
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-2">{entry.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{entry.description}</p>

      {entry.content?.codeSnippet && (
        <div className="bg-slate-900 rounded-lg p-3 mb-4 overflow-x-auto">
          <code className="text-xs font-mono text-green-400">
            {entry.content.codeSnippet}
          </code>
        </div>
      )}

      <div className="flex items-center gap-4 text-gray-400">
        <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
          <Heart size={16} />
          <span className="text-xs">Save</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
          <Share2 size={16} />
          <span className="text-xs">Share</span>
        </button>
      </div>
    </motion.div>
  );
}

export function JournalDetailModal({ entry, onClose }: { entry: JournalEntry; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/20 backdrop-blur-sm">
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-[600px] h-full bg-white shadow-2xl overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-900">Journal</span>
              <ChevronRight size={14} />
              <span>Details</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-full tracking-wide">
                {entry.type}
              </div>
              <span className="text-sm text-gray-500">{entry.date} • {entry.timestamp}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{entry.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{entry.description}</p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Creator</div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                  {entry.creator.name[0]}
                </div>
                <span className="font-medium text-gray-900">{entry.creator.name}</span>
                <span className="text-xs text-gray-400">({entry.creator.role})</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  entry.status === 'completed' ? "bg-green-500" : 
                  entry.status === 'pending' ? "bg-yellow-500" : "bg-red-500"
                )} />
                <span className="font-medium text-gray-900 capitalize">{entry.status}</span>
              </div>
            </div>
          </div>

          {/* Context Section */}
          {entry.context && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Context</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Why was this created?</div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{entry.context.why}</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">How was it generated?</div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{entry.context.how}</p>
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          {entry.content && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Content Details</h3>
              
              {entry.content.tasks && (
                <div className="space-y-2">
                  {entry.content.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      {task.completed ? <CheckCircle2 className="text-green-500" size={20} /> : <Circle className="text-gray-300" size={20} />}
                      <span className={cn("text-sm font-medium", task.completed ? "text-gray-900" : "text-gray-600")}>{task.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {entry.content.quizQuestion && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                  <h4 className="font-bold text-indigo-900 mb-4">Quiz Preview</h4>
                  <p className="text-lg font-medium text-indigo-800 mb-6">{entry.content.quizQuestion}</p>
                  <div className="space-y-2">
                    {entry.content.quizOptions?.map((opt, i) => (
                      <div key={i} className="p-3 bg-white rounded-lg border border-indigo-100 text-indigo-700 font-medium text-center shadow-sm">
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {entry.content.codeSnippet && (
                <div className="bg-slate-900 rounded-xl p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Code Snippet</span>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                    </div>
                  </div>
                  <pre className="font-mono text-sm text-green-400 overflow-x-auto">
                    <code>{entry.content.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
