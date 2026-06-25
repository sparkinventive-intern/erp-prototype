// Staff portal — Teaching Schedule & Timetable Management (shared grid).
import {
  PageShell, GlassCard, SectionTitle, Badge, Icon, Button,
} from '../../components/ui.jsx'
import { TT_SLOTS, TT_DAYS, PERIODS, MY_COURSES } from '../../data/staffData.js'

const TYPE_STYLE = {
  T: 'bg-sky-50 border-sky-200 text-navy',
  P: 'bg-teal-50 border-teal-200 text-teal-700',
  M: 'bg-amber-50 border-amber-200 text-amber-700',
}

function TimetableGrid() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="w-14 rounded-lg bg-[#0C1540] p-2 text-2xs font-bold uppercase text-white">Day</th>
            {PERIODS.map((p) => (
              <th key={p.p} className="rounded-lg bg-[#0C1540] p-2 text-center text-2xs font-semibold text-white">
                <div>P{p.p}</div>
                <div className="font-normal text-white/60">{p.time}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TT_DAYS.map((day) => (
            <tr key={day}>
              <td className="rounded-lg bg-[#EBF0FB] p-2 text-center text-xs font-bold text-navy">{day}</td>
              {PERIODS.map((p) => {
                const slot = TT_SLOTS[day]?.[p.p]
                if (!slot) return <td key={p.p} className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-2" />
                return (
                  <td key={p.p} className={`rounded-lg border p-1.5 text-center ${TYPE_STYLE[slot.type]}`}>
                    <div className="text-2xs font-bold leading-tight">{slot.s}</div>
                    <div className="text-[10px] opacity-70">{slot.sec}</div>
                    <div className="text-[10px] opacity-60">{slot.room}</div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600">
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-sky-200 bg-sky-50" /> Theory</span>
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-teal-200 bg-teal-50" /> Lab / Practical</span>
      <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-amber-200 bg-amber-50" /> Meeting / Mentoring</span>
    </div>
  )
}

// ── Teaching Schedule (read-only view) ─────────────────────────
export function TeachingSchedule() {
  const today = 'Wed'
  const todays = PERIODS.map((p) => ({ ...p, slot: TT_SLOTS[today]?.[p.p] })).filter((x) => x.slot)
  return (
    <PageShell icon="CalendarDays" title="Teaching Schedule" subtitle="Weekly timetable — Even Semester 2024-25"
      action={<Button variant="ghost" icon="Printer">Print</Button>}>
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="CalendarDays" title="Weekly Timetable" />
          <div className="mt-4"><TimetableGrid /></div>
          <Legend />
        </GlassCard>
        <GlassCard className="p-5">
          <SectionTitle icon="CalendarClock" title="Today's Classes (Wed)" />
          <div className="mt-4 space-y-3">
            {todays.map((x) => (
              <div key={x.p} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sky-50 text-navy">
                  <Icon name={x.slot.type === 'P' ? 'FlaskConical' : 'BookOpen'} size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-navy">{x.slot.s}</p>
                  <p className="text-xs text-slate-500">{x.slot.sec} · {x.slot.room}</p>
                </div>
                <span className="text-2xs font-semibold text-slate-400">{x.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Timetable Management (editable framing) ────────────────────
export function TimetableManagement() {
  return (
    <PageShell icon="CalendarCog" title="Timetable Management" subtitle="Manage class & lab slots"
      action={<Button icon="Save">Publish Timetable</Button>}>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {MY_COURSES.filter((c) => c.type === 'Theory').map((c, i) => (
          <GlassCard key={c.code} hover delay={i * 0.05} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-navy">{c.short}</p>
              <Badge tone="low">{c.hrs}h/wk</Badge>
            </div>
            <p className="mt-1 text-xs text-slate-500">{c.section} · {c.room}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-5">
        <SectionTitle icon="CalendarCog" title="Slot Allocation Grid" action={<Button variant="ghost" icon="Plus" className="!py-1">Add Slot</Button>} />
        <div className="mt-4"><TimetableGrid /></div>
        <Legend />
        <div className="mt-4 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-navy">
          <Icon name="Info" size={14} className="mr-1 inline" />
          Slot changes require HoD approval before publishing to students.
        </div>
      </GlassCard>
    </PageShell>
  )
}
