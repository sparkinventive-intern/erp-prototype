import CountUp from 'react-countup'
import { motion } from 'framer-motion'

const METRICS = [
  { label: 'Total Students', value: 5420, suffix: '+' },
  { label: 'Faculty Members', value: 312, suffix: '' },
  { label: 'Departments', value: 18, suffix: '' },
  { label: 'Avg. Attendance', value: 92, suffix: '%' },
  { label: 'Placement Rate', value: 73, suffix: '%' },
  { label: 'Daily Transactions', value: 1240, suffix: '+' },
]

export default function MetricsMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#0C1540]/50 backdrop-blur-md py-4 z-20">
      {/* Left/Right fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0C1540] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0C1540] to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {/* We duplicate the metrics twice to create an infinite loop */}
        {[...METRICS, ...METRICS].map((metric, i) => (
          <div key={i} className="flex items-center px-8 sm:px-12 border-r border-white/10 last:border-0">
            <span className="text-[#F5B800] text-xl font-bold tracking-tight">
              <CountUp end={metric.value} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
              {metric.suffix}
            </span>
            <span className="ml-3 text-xs font-semibold uppercase tracking-widest text-white/60">
              {metric.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
