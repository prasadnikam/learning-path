import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion, AnimatePresence } from "motion/react";
import { learningNodes } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Lock, Check, Zap, MousePointer2, Minus, Plus, Maximize, Sun, Moon, X, AlertTriangle, RotateCcw } from "lucide-react";
import { useState } from "react";

// Define connections between nodes (adjacency list)
const connections = [
  { from: '1', to: '10' }, // Linear Algebra -> PyTorch
  { from: '2', to: '10' }, // Python -> PyTorch
  { from: '9', to: '10' }, // Probability -> PyTorch
  { from: '10', to: '3' }, // PyTorch -> Tensors
  { from: '3', to: '11' }, // Tensors -> Embeddings
  { from: '3', to: '13' }, // Tensors -> Positional Encoding
  { from: '11', to: '4' }, // Embeddings -> Attention
  { from: '13', to: '4' }, // Positional -> Attention
  { from: '4', to: '12' }, // Attention -> Self-Attention
  { from: '4', to: '5' },  // Attention -> Multi-Head
  { from: '5', to: '6' },  // Multi-Head -> Encoder
  { from: '12', to: '6' }, // Self-Attention -> Encoder
  { from: '6', to: '14' }, // Encoder -> Decoder
  { from: '6', to: '7' },  // Encoder -> Forward Pass
  { from: '7', to: '15' }, // Forward Pass -> Backprop
  { from: '14', to: '8' }, // Decoder -> Project
  { from: '15', to: '8' }, // Backprop -> Project
];

export default function LearningPathView() {
  const [isDark, setIsDark] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = learningNodes.find(n => n.id === selectedNodeId);

  return (
    <div className={cn(
      "w-full h-[600px] rounded-2xl border relative overflow-hidden flex flex-col shadow-2xl transition-colors duration-500",
      isDark ? "bg-[#0B0F19] border-indigo-900/30" : "bg-white border-gray-200"
    )}>
      
      {/* Immersive Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start pointer-events-none">
        <div>
          <h2 className={cn("font-bold text-xl flex items-center gap-2 transition-colors", isDark ? "text-white" : "text-gray-900")}>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Neural Constellation
          </h2>
          <p className={cn("text-xs font-mono mt-1 tracking-wide transition-colors", isDark ? "text-indigo-300/60" : "text-gray-500")}>
            INTERACTIVE KNOWLEDGE GRAPH • V2.4
          </p>
        </div>
        
        <div className="pointer-events-auto flex gap-2">
           <button 
             onClick={() => setIsDark(!isDark)}
             className={cn(
               "p-2 rounded-full border backdrop-blur-md transition-all",
               isDark ? "bg-indigo-950/50 border-indigo-800 text-indigo-300 hover:bg-indigo-900" : "bg-white/80 border-gray-200 text-gray-600 hover:bg-gray-50"
             )}
           >
             {isDark ? <Sun size={16} /> : <Moon size={16} />}
           </button>
        </div>
      </div>

      {/* Mastery Card Overlay */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="absolute top-24 left-6 z-30 w-80 pointer-events-auto"
          >
            <div className={cn(
              "rounded-2xl p-5 shadow-2xl border backdrop-blur-xl",
              isDark ? "bg-[#0B0F19]/90 border-indigo-500/30 text-white" : "bg-white/95 border-gray-200 text-gray-900"
            )}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">{selectedNode.label}</h3>
                <button 
                  onClick={() => setSelectedNodeId(null)}
                  className={cn("p-1 rounded-full hover:bg-black/5 transition-colors", isDark ? "hover:bg-white/10" : "")}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium opacity-70">Mastery</span>
                  <span className={cn(
                    "text-sm font-bold",
                    selectedNode.criticalGap ? "text-red-500" : "text-indigo-500"
                  )}>
                    {selectedNode.mastery}% {selectedNode.criticalGap && "· Critical Gap"}
                  </span>
                </div>
                <div className={cn("h-2 w-full rounded-full overflow-hidden", isDark ? "bg-gray-800" : "bg-gray-100")}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedNode.mastery}%` }}
                    className={cn(
                      "h-full rounded-full",
                      selectedNode.criticalGap ? "bg-red-500" : "bg-indigo-500"
                    )}
                  />
                </div>
              </div>

              <div className={cn(
                "p-4 rounded-xl mb-4 border",
                isDark ? "bg-indigo-900/20 border-indigo-500/20" : "bg-indigo-50 border-indigo-100"
              )}>
                <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Quiz Attempts</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {selectedNode.quizAttempts || 0}
                  <span className="text-xs font-normal opacity-50">times</span>
                </div>
              </div>

              {selectedNode.criticalGap && (
                <div className={cn(
                  "p-4 rounded-xl border flex items-start gap-3",
                  isDark ? "bg-red-900/20 border-red-500/30 text-red-200" : "bg-red-50 border-red-100 text-red-700"
                )}>
                  <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1">Needs Attention</div>
                    <p className="text-sm opacity-90">AI has targeted practice scheduled for this concept.</p>
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex gap-2">
                 <button className={cn(
                   "flex-1 py-2 rounded-lg text-sm font-bold transition-colors",
                   isDark ? "bg-indigo-600 hover:bg-indigo-500 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                 )}>
                   Start Quiz
                 </button>
                 <button className={cn(
                   "p-2 rounded-lg border transition-colors",
                   isDark ? "border-indigo-700 hover:bg-indigo-900 text-indigo-300" : "border-gray-200 hover:bg-gray-50 text-gray-600"
                 )}>
                   <RotateCcw size={18} />
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graph Area */}
      <TransformWrapper
        initialScale={0.8}
        minScale={0.4}
        maxScale={2}
        centerOnInit={true}
        limitToBounds={false}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Controls */}
            <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 pointer-events-auto">
              <button onClick={() => zoomIn()} className={cn("p-2 rounded-lg border backdrop-blur-sm transition-colors", isDark ? "bg-indigo-900/80 text-indigo-200 hover:bg-indigo-800 border-indigo-700/50" : "bg-white/80 text-gray-700 hover:bg-gray-50 border-gray-200")}>
                <Plus size={18} />
              </button>
              <button onClick={() => zoomOut()} className={cn("p-2 rounded-lg border backdrop-blur-sm transition-colors", isDark ? "bg-indigo-900/80 text-indigo-200 hover:bg-indigo-800 border-indigo-700/50" : "bg-white/80 text-gray-700 hover:bg-gray-50 border-gray-200")}>
                <Minus size={18} />
              </button>
              <button onClick={() => resetTransform()} className={cn("p-2 rounded-lg border backdrop-blur-sm transition-colors", isDark ? "bg-indigo-900/80 text-indigo-200 hover:bg-indigo-800 border-indigo-700/50" : "bg-white/80 text-gray-700 hover:bg-gray-50 border-gray-200")}>
                <Maximize size={18} />
              </button>
            </div>

            <TransformComponent wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing" contentClass="!w-full !h-full">
              <div className={cn(
                "relative w-[2000px] h-[1000px] transition-colors duration-500",
                isDark ? "bg-[radial-gradient(circle_at_center,#1e1b4b_0%,#0B0F19_100%)]" : "bg-[radial-gradient(circle_at_center,#f3f4f6_0%,#ffffff_100%)]"
              )}>
                
                {/* Background Grid Effects */}
                <div className="absolute inset-0 opacity-20" 
                  style={{ 
                    backgroundImage: `linear-gradient(${isDark ? '#4f46e5' : '#cbd5e1'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#4f46e5' : '#cbd5e1'} 1px, transparent 1px)`, 
                    backgroundSize: '40px 40px' 
                  }} 
                />
                
                {/* Connections (SVG Layer) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  <defs>
                    <linearGradient id="gradient-line-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="gradient-line-light" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {connections.map((conn, i) => {
                    const startNode = learningNodes.find(n => n.id === conn.from);
                    const endNode = learningNodes.find(n => n.id === conn.to);
                    if (!startNode || !endNode) return null;

                    const isActive = startNode.status === 'completed' || startNode.status === 'in-progress';

                    return (
                      <g key={`${conn.from}-${conn.to}`}>
                        {/* Base Line */}
                        <motion.path
                          d={`M ${startNode.x + 40} ${startNode.y + 40} C ${startNode.x + 100} ${startNode.y + 40}, ${endNode.x - 60} ${endNode.y + 40}, ${endNode.x + 40} ${endNode.y + 40}`}
                          stroke={isActive ? (isDark ? "url(#gradient-line-dark)" : "url(#gradient-line-light)") : (isDark ? "#1e293b" : "#e2e8f0")}
                          strokeWidth={isActive ? 2 : 1}
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                        />
                        
                        {/* Animated Pulse for active connections */}
                        {isActive && (
                          <motion.circle r="3" fill={isDark ? "#a5b4fc" : "#6366f1"}>
                            <animateMotion 
                              dur={`${2 + (i % 3)}s`} 
                              repeatCount="indefinite"
                              path={`M ${startNode.x + 40} ${startNode.y + 40} C ${startNode.x + 100} ${startNode.y + 40}, ${endNode.x - 60} ${endNode.y + 40}, ${endNode.x + 40} ${endNode.y + 40}`}
                            />
                          </motion.circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Nodes */}
                {learningNodes.map((node) => (
                  <motion.div
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 * parseInt(node.id) }}
                    className="absolute"
                    style={{ left: node.x, top: node.y }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNodeId(node.id);
                    }}
                  >
                    <div className="relative group w-20 h-20 flex items-center justify-center cursor-pointer">
                      
                      {/* Selection Ring */}
                      {selectedNodeId === node.id && (
                        <motion.div 
                          layoutId="selection-ring"
                          className={cn("absolute -inset-4 rounded-full border-2", isDark ? "border-white/50" : "border-indigo-600/50")}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Status Rings/Glows */}
                      {node.status === 'in-progress' && (
                        <>
                          <div className={cn("absolute inset-0 rounded-full animate-ping", isDark ? "bg-indigo-500/20" : "bg-indigo-500/10")} />
                          <div className={cn("absolute -inset-2 rounded-full border border-dashed animate-[spin_10s_linear_infinite]", isDark ? "border-indigo-500/30" : "border-indigo-500/20")} />
                        </>
                      )}
                      
                      {node.status === 'completed' && (
                         <div className={cn("absolute inset-0 rounded-full blur-xl transition-all duration-500", isDark ? "bg-indigo-500/10 group-hover:bg-indigo-500/30" : "bg-indigo-200/30 group-hover:bg-indigo-300/40")} />
                      )}

                      {/* Node Core */}
                      <div className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-all duration-300 z-10 relative",
                        isDark ? (
                          node.status === 'completed' ? "bg-indigo-950/80 border-indigo-400 text-indigo-100 shadow-[0_0_15px_rgba(99,102,241,0.5)]" :
                          node.status === 'in-progress' ? "bg-indigo-900/90 border-orange-400 text-white shadow-[0_0_20px_rgba(251,146,60,0.6)]" :
                          "bg-slate-900/80 border-slate-700 text-slate-500"
                        ) : (
                          node.status === 'completed' ? "bg-white border-indigo-500 text-indigo-600 shadow-lg shadow-indigo-100" :
                          node.status === 'in-progress' ? "bg-white border-orange-400 text-orange-500 shadow-lg shadow-orange-100" :
                          "bg-gray-50 border-gray-200 text-gray-300"
                        )
                      )}>
                        {node.status === 'completed' ? <Check size={20} /> :
                         node.status === 'locked' ? <Lock size={18} /> :
                         <Zap size={20} className="text-orange-400 fill-orange-400" />}
                      </div>

                      {/* Label */}
                      <div className={cn(
                        "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all border",
                        isDark ? (
                          node.status === 'locked' ? "bg-slate-900/50 border-slate-800 text-slate-500" :
                          "bg-indigo-950/80 border-indigo-500/50 text-indigo-200 shadow-lg backdrop-blur-sm"
                        ) : (
                          node.status === 'locked' ? "bg-gray-100 border-gray-200 text-gray-400" :
                          "bg-white border-indigo-100 text-indigo-900 shadow-md"
                        )
                      )}>
                        {node.label}
                      </div>

                      {/* Mastery Badge */}
                      {node.mastery > 0 && (
                        <div className={cn(
                          "absolute -top-2 -right-2 w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-bold z-20 shadow-lg",
                          isDark ? "bg-slate-900 border-indigo-500 text-indigo-300" : "bg-white border-indigo-200 text-indigo-600"
                        )}>
                          {node.mastery}%
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
