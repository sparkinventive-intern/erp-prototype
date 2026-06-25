// ─────────────────────────────────────────────────────────────
// Result Management → the 7-step processing stepper (shared).
// ─────────────────────────────────────────────────────────────
import { Icon } from '../components/ui.jsx'
import { PROCESSING_STEPS } from '../data/resultData.js'

export function ProcessingStepper({ stage = 0 }) {
  return (
    <div className="flex items-center">
      {PROCESSING_STEPS.map((step, i) => {
        const done = i < stage
        const active = i === stage
        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-colors ${
                done ? 'bg-emerald-500 text-white'
                : active ? 'text-white ring-4 ring-emerald-500/15'
                : 'bg-slate-100 text-slate-400'
              }`} style={active ? { background: 'linear-gradient(145deg,#047857,#064E3B)' } : undefined}>
                {done ? <Icon name="Check" size={15} strokeWidth={3} /> : i + 1}
              </span>
              <span className={`mt-1.5 max-w-[72px] text-center text-[10px] font-semibold leading-tight ${
                done || active ? 'text-navy' : 'text-slate-400'
              }`}>{step}</span>
            </div>
            {i < PROCESSING_STEPS.length - 1 && (
              <span className={`mx-1 mb-5 h-0.5 flex-1 rounded-full ${i < stage ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
