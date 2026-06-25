// ─────────────────────────────────────────────────────────────
// Attendance3DChart — a premium 3D-style horizontal bar chart.
// Each bar is drawn as an isometric prism (front + top + side
// faces) with a gradient front, soft shadow and animated growth.
// X-axis uses full subject NAMES, not codes.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Colour ramp by attendance band.
function palette(pct) {
  if (pct < 75) return { front1: '#E07A85', front2: '#C8424F', top: '#EE9BA3', side: '#9E2F3A' }
  if (pct < 85) return { front1: '#E0B566', front2: '#C8862E', top: '#EFCF92', side: '#9C6720' }
  return { front1: '#3E7FD6', front2: '#10367D', top: '#6FA0E3', side: '#0A2150' }
}

export default function Attendance3DChart({ data }) {
  const [hover, setHover] = useState(null)

  const rows = data.map((d) => ({
    name: d.title,
    pct: d.percent,
    attended: d.attended,
    conducted: d.conducted,
    code: d.code,
  }))

  // Geometry
  const ROW_H = 46          // vertical space per bar
  const BAR_H = 22          // bar thickness (front face)
  const DEPTH = 9           // 3D depth offset
  const LABEL_W = 168       // left label column width
  const PAD_R = 54          // right padding for value labels
  const TRACK_H = rows.length * ROW_H + 16
  const VIEW_W = 720
  const trackW = VIEW_W - LABEL_W - PAD_R

  // 75% threshold marker position
  const threshX = LABEL_W + (75 / 100) * trackW

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${TRACK_H}`}
        width="100%"
        height={TRACK_H}
        style={{ minWidth: 560 }}
      >
        <defs>
          {rows.map((r, i) => {
            const p = palette(r.pct)
            return (
              <linearGradient key={i} id={`front-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={p.front1} />
                <stop offset="100%" stopColor={p.front2} />
              </linearGradient>
            )
          })}
          <filter id="barShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F1B33" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* Vertical gridlines + scale */}
        {[0, 25, 50, 75, 100].map((g) => {
          const x = LABEL_W + (g / 100) * trackW
          return (
            <g key={g}>
              <line x1={x} y1={4} x2={x} y2={TRACK_H - 14}
                stroke="#EEF0F4" strokeWidth={1} />
              <text x={x} y={TRACK_H - 2} fontSize={9} fill="#94A3B8"
                textAnchor="middle">{g}%</text>
            </g>
          )
        })}

        {/* 75% threshold marker */}
        <line x1={threshX} y1={4} x2={threshX} y2={TRACK_H - 14}
          stroke="#C8424F" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.7} />
        <text x={threshX} y={11} fontSize={8.5} fill="#C8424F"
          textAnchor="middle" fontWeight="700">MIN 75%</text>

        {/* Bars */}
        {rows.map((r, i) => {
          const p = palette(r.pct)
          const y = 10 + i * ROW_H
          const fullW = (r.pct / 100) * trackW
          const isHover = hover === i

          return (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Subject NAME label */}
              <text
                x={LABEL_W - 12} y={y + BAR_H / 2 + 1}
                fontSize={11.5} fill={isHover ? '#10367D' : '#475569'}
                fontWeight={isHover ? 700 : 600}
                textAnchor="end" dominantBaseline="middle"
              >
                {r.name.length > 24 ? r.name.slice(0, 23) + '…' : r.name}
              </text>

              {/* Track groove — fully rounded */}
              <rect x={LABEL_W} y={y} width={trackW} height={BAR_H}
                rx={BAR_H / 2} fill="#F1F3F7" />

              {/* Animated 3D prism */}
              <motion.g
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                style={{ transformOrigin: `${LABEL_W}px ${y}px` }}
                filter="url(#barShadow)"
              >
                {/* Side face (right end) — rounded cap */}
                <path
                  d={`M ${LABEL_W + fullW - 6} ${y}
                      Q ${LABEL_W + fullW} ${y} ${LABEL_W + fullW + DEPTH} ${y - DEPTH + 4}
                      L ${LABEL_W + fullW + DEPTH} ${y + BAR_H - DEPTH - 4}
                      Q ${LABEL_W + fullW} ${y + BAR_H} ${LABEL_W + fullW - 6} ${y + BAR_H} Z`}
                  fill={p.side}
                />
                {/* Top face */}
                <path
                  d={`M ${LABEL_W + 8} ${y}
                      L ${LABEL_W + DEPTH + 8} ${y - DEPTH}
                      L ${LABEL_W + fullW + DEPTH - 4} ${y - DEPTH}
                      Q ${LABEL_W + fullW + DEPTH} ${y - DEPTH} ${LABEL_W + fullW} ${y} Z`}
                  fill={p.top}
                />
                {/* Front face — pill-rounded */}
                <rect
                  x={LABEL_W} y={y}
                  width={Math.max(fullW, BAR_H)} height={BAR_H}
                  rx={BAR_H / 2}
                  fill={`url(#front-${i})`}
                />
                {/* Glossy highlight strip */}
                <rect
                  x={LABEL_W + 6} y={y + 3}
                  width={Math.max(fullW - 12, 4)} height={4}
                  rx={2}
                  fill="#FFFFFF" opacity={0.32}
                />
              </motion.g>

              {/* Value label */}
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.5 }}
                x={LABEL_W + fullW + DEPTH + 8}
                y={y + BAR_H / 2 + 1}
                fontSize={12} fontWeight={800}
                fill={p.front2}
                dominantBaseline="middle"
              >
                {r.pct}%
              </motion.text>

              {/* Hover tooltip */}
              {isHover && (
                <g>
                  <rect
                    x={LABEL_W + 8} y={y - 4}
                    width={146} height={BAR_H + 8}
                    rx={6} fill="#0F1B33" opacity={0.92}
                  />
                  <text x={LABEL_W + 18} y={y + BAR_H / 2 + 1}
                    fontSize={10.5} fill="#fff" dominantBaseline="middle">
                    {r.attended}/{r.conducted} classes · {r.code}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-slate-100 pt-3">
        {[
          ['#10367D', 'Good (85%+)'],
          ['#C8862E', 'Moderate (75–85%)'],
          ['#C8424F', 'Below minimum (<75%)'],
        ].map(([c, label]) => (
          <span key={label} className="flex items-center gap-1.5 text-2xs font-medium text-slate-500">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
