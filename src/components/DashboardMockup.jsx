import { motion } from 'framer-motion'
import { Icon } from './ui.jsx'

const FLOATING_CARDS = [
  { id: 'students',   label: 'Total Students',   value: '5,420',    trend: '+12%', icon: 'Users',          color: '#3b82f6', delay: 0 },
  { id: 'attendance', label: 'Avg. Attendance',  value: '92.4%',    trend: '+2.1%', icon: 'CalendarCheck',  color: '#10b981', delay: 0.15 },
  { id: 'revenue',    label: 'Fee Collection',   value: '$2.4M',    trend: '+15%', icon: 'Wallet',         color: '#F5B800', delay: 0.3 },
  { id: 'admissions', label: 'New Applications', value: '1,204',    trend: '+8%',  icon: 'UserPlus',       color: '#8b5cf6', delay: 0.45 },
  { id: 'faculty',    label: 'Active Faculty',   value: '312',      trend: '0%',   icon: 'Presentation',   color: '#06b6d4', delay: 0.6 },
]

export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[640px] aspect-[16/10] perspective-1000">
      {/* Main glassmorphic container */}
      <motion.div 
        initial={{ opacity: 0, rotateY: 12, rotateX: 8, x: 40, scale: 0.95 }}
        animate={{ opacity: 1, rotateY: -8, rotateX: 6, x: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-[2rem] border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] overflow-hidden z-10"
      >
        {/* Mockup Header (macOS style window controls) */}
        <div className="h-12 flex items-center px-5 justify-between bg-white/[0.02] border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]" />
          </div>
          <div className="w-48 h-1.5 rounded-full bg-white/10" />
        </div>

        {/* Mockup Content Grid */}
        <div className="p-6 grid grid-cols-4 gap-5 h-[calc(100%-3rem)]">
          {/* Sidebar Area */}
          <div className="col-span-1 flex flex-col gap-4 border-r border-white/5 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-[#3b82f6]/80" />
              <div className="h-3 w-16 rounded bg-white/20" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-6 rounded-md ${i === 1 ? 'bg-white/15' : 'bg-white/5'} w-full`} />
            ))}
            <div className="mt-auto h-8 rounded-lg bg-gradient-to-r from-[#3b82f6]/40 to-[#8b5cf6]/40" />
          </div>
          
          {/* Main Content Area */}
          <div className="col-span-3 flex flex-col gap-5 pl-2">
            {/* Top row mini widgets */}
            <div className="flex gap-4 h-16">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center p-3 gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-2 w-1/2 rounded-full bg-white/20" />
                    <div className="h-2 w-3/4 rounded-full bg-white/10" />
                  </div>
                </div>
              ))}
            </div>

            {/* Smooth Spline Chart Area */}
            <div className="flex-1 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-20">
                {[...Array(4)].map((_, i) => <div key={i} className="w-full h-px bg-white/20" />)}
              </div>
              
              {/* SVG Area Chart */}
              <motion.svg
                initial={{ opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 }}
                animate={{ opacity: 1, strokeDashoffset: 0 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full preserve-3d" 
                viewBox="0 0 100 50" preserveAspectRatio="none"
              >
                {/* Gradient Fill */}
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                <motion.path 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  d="M0,50 L0,35 Q10,20 20,30 T40,15 T60,25 T80,5 T100,20 L100,50 Z" 
                  fill="url(#chartGlow)" 
                />
                
                {/* Smooth Line */}
                <path 
                  d="M0,35 Q10,20 20,30 T40,15 T60,25 T80,5 T100,20" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="1.5" 
                  vectorEffect="non-scaling-stroke" 
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating KPI Cards (tuned physics and styling) */}
      {FLOATING_CARDS.map((card, idx) => {
        // Optimized positioning for a cleaner orbit-like scatter
        const positions = [
          { top: '-8%', left: '-8%' },
          { top: '12%', right: '-12%' },
          { bottom: '15%', left: '-18%' },
          { bottom: '-6%', right: '-2%' },
          { top: '55%', left: '25%', zIndex: 20 },
        ]
        
        const pos = positions[idx]

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              y: [0, -12, 0], 
              scale: 1,
              filter: 'blur(0px)'
            }}
            transition={{
              opacity: { duration: 1, delay: card.delay, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1, delay: card.delay, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 1, delay: card.delay },
              y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: card.delay }
            }}
            style={pos}
            className={`absolute flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#0C1540]/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] ${pos.zIndex ? 'z-20' : 'z-30'}`}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: `${card.color}20`, color: card.color, border: `1px solid ${card.color}40` }}>
              <Icon name={card.icon} size={18} strokeWidth={2.5} />
            </div>
            <div className="pr-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-0.5">{card.label}</p>
              <div className="flex items-baseline gap-2.5">
                <span className="text-xl font-extrabold text-white tracking-tight">{card.value}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">{card.trend}</span>
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Deep Decorative Glows behind mockup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-[#3b82f6]/20 via-[#1A2E8F]/10 to-[#8b5cf6]/20 blur-[120px] pointer-events-none -z-10" />
    </div>
  )
}
