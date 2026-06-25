// ─────────────────────────────────────────────────────────────
// NoticeMarquee — premium auto-scrolling notice board.
// Notices scroll vertically on a loop; hovering pauses the
// scroll and resumes on leave. Seamless (list is duplicated).
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icon, GlassCard, Badge } from './ui.jsx'

// Soft tint per notice tag.
const TAG_STYLE = {
  Examination: { bg: '#10367D', soft: '#EAF1F9' },
  Finance: { bg: '#C8862E', soft: '#FBF3E5' },
  Academic: { bg: '#1C4796', soft: '#EAF1F9' },
  Hostel: { bg: '#2E9E6B', soft: '#E7F4EE' },
  General: { bg: '#7C5CAE', soft: '#F0ECF7' },
}

function NoticeRow({ n }) {
  const style = TAG_STYLE[n.tag] || TAG_STYLE.General
  return (
    <div className="exam-card flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      {/* 3D icon block */}
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
        style={{
          background: `linear-gradient(150deg, ${style.bg}, ${style.bg}cc)`,
          boxShadow: `0 5px 12px -4px ${style.bg}88, inset 0 1px 0 rgba(255,255,255,0.35)`,
        }}
      >
        <Icon name={n.urgent ? 'BellRing' : 'Megaphone'} size={16} strokeWidth={2.3} />
      </span>

      {/* Title + meta */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-navy">{n.title}</p>
        <p className="mt-0.5 text-[11px] text-slate-400">{n.date}</p>
      </div>

      {/* Tag + urgency */}
      <div className="flex shrink-0 items-center gap-1.5">
        {n.urgent && <Badge tone="high">Urgent</Badge>}
        <span
          className="rounded-md px-2 py-0.5 text-[10px] font-bold"
          style={{ background: style.soft, color: style.bg }}
        >
          {n.tag}
        </span>
      </div>
    </div>
  )
}

export default function NoticeMarquee({ notices }) {
  const trackRef = useRef(null)
  const rafRef = useRef(0)
  const pausedRef = useRef(false)
  const offsetRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // The track holds two copies; loop point is half its height.
    const SPEED = 0.35 // px per frame — calm, premium pace

    const step = () => {
      if (!pausedRef.current) {
        offsetRef.current += SPEED
        const half = track.scrollHeight / 2
        if (offsetRef.current >= half) offsetRef.current -= half
        track.style.transform = `translateY(-${offsetRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [notices])

  return (
    <GlassCard className="overflow-hidden p-0">
      {/* Header band */}
      <div className="flex items-center justify-between brand-gradient px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Icon name="Megaphone" size={16} className="text-sky-200" strokeWidth={2.3} />
          <h2 className="text-sm font-bold text-white">Notice Board</h2>
          <span className="ml-1 flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-sky-100">
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
        <Link
          to="/notice-board"
          className="rounded-md bg-white/10 px-2 py-1 text-2xs font-semibold text-sky-100 transition hover:bg-white/20"
        >
          View all
        </Link>
      </div>

      {/* Auto-scrolling viewport */}
      <div
        className="relative h-[248px] overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        {/* Fade masks top & bottom */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-white to-transparent" />

        <div ref={trackRef} className="space-y-2.5 p-4 will-change-transform">
          {/* Two copies for a seamless loop */}
          {[...notices, ...notices].map((n, i) => (
            <NoticeRow key={`${n.id}-${i}`} n={n} />
          ))}
        </div>
      </div>

      {/* Hint footer */}
      <div className="border-t border-slate-100 px-5 py-2 text-center">
        <span className="text-[10px] font-medium text-slate-400">
          Hover to pause · auto-scrolling
        </span>
      </div>
    </GlassCard>
  )
}
