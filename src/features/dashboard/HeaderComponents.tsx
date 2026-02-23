import { Calendar, Flame, Zap } from "lucide-react";
import { motion } from "motion/react";

export function StatsHeader() {
  return (
    <div className="flex items-center gap-8 mb-8">
      <div className="flex flex-col items-center group cursor-pointer">
        <div className="text-indigo-600 mb-1 group-hover:scale-110 transition-transform">
          <Calendar size={20} />
        </div>
        <div className="text-xs font-bold text-indigo-900">Day 1</div>
        <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">of 60</div>
      </div>
      
      <div className="flex flex-col items-center group cursor-pointer">
        <div className="text-orange-500 mb-1 group-hover:scale-110 transition-transform">
          <Flame size={20} fill="currentColor" />
        </div>
        <div className="text-xs font-bold text-orange-600">0</div>
        <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Streak</div>
      </div>

      <div className="flex flex-col items-center group cursor-pointer">
        <div className="text-yellow-500 mb-1 group-hover:scale-110 transition-transform">
          <Zap size={20} fill="currentColor" />
        </div>
        <div className="text-xs font-bold text-yellow-600">0</div>
        <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">XP</div>
      </div>
    </div>
  );
}

export function MilestoneBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-indigo-50 to-white rounded-2xl border border-indigo-100 p-6 mb-8 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/50 to-transparent z-0" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Milestone: Foundation</div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-indigo-600">Progress 2%</div>
            <div className="w-24 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-[2%] rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <h1 className="text-xl font-bold text-gray-900 max-w-2xl">
            Master the transformer architecture from scratch to implement custom variations.
          </h1>
          
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 hover:gap-3">
            View Journal
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
