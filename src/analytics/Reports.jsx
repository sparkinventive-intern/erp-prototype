import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon, EASE } from '../components/ui.jsx'
import { SectionCard } from './parts.jsx'

const REPORT_CATALOG = [
  {
    group: 'Academic',
    icon: 'GraduationCap',
    color: '#1A2E8F',
    reports: [
      { id: 'ar1', name: 'Department-wise Pass Rate Report',    desc: 'Exam results across all departments and semesters', format: 'PDF / XLSX' },
      { id: 'ar2', name: 'Attendance Summary Report',          desc: 'Monthly attendance statistics per department',       format: 'PDF / XLSX' },
      { id: 'ar3', name: 'Grade Distribution Report',          desc: 'O / A+ / A / B+ / B / Below-6 breakdown',           format: 'PDF'        },
      { id: 'ar4', name: 'Enrollment Statistics Report',       desc: '5-year enrollment trend by program and gender',      format: 'PDF / XLSX' },
    ],
  },
  {
    group: 'Financial',
    icon: 'IndianRupee',
    color: '#C99800',
    reports: [
      { id: 'fr1', name: 'Fee Collection Summary',            desc: 'Month-wise collection vs. demand for full AY',        format: 'PDF / XLSX' },
      { id: 'fr2', name: 'Defaulter List Report',             desc: 'Students with outstanding fee balances',              format: 'XLSX'       },
      { id: 'fr3', name: 'Payroll Disbursement Statement',    desc: 'Teaching + non-teaching salary month-wise',           format: 'PDF'        },
      { id: 'fr4', name: 'Annual Income & Expenditure Report',desc: 'Full-year financial summary for auditors',            format: 'PDF'        },
    ],
  },
  {
    group: 'Placements',
    icon: 'Briefcase',
    color: '#2540B4',
    reports: [
      { id: 'pr1', name: 'Placement Statistics Report',       desc: 'Company-wise offers, packages, and dept breakdown',   format: 'PDF / XLSX' },
      { id: 'pr2', name: 'Top Recruiters Summary',            desc: 'Ranked recruiter list with offer counts',             format: 'PDF'        },
    ],
  },
  {
    group: 'Infrastructure',
    icon: 'Building2',
    color: '#3055CC',
    reports: [
      { id: 'ir1', name: 'Hostel Occupancy Report',           desc: 'Room allocation and vacancies — Boys & Girls hostel', format: 'PDF / XLSX' },
      { id: 'ir2', name: 'Transport Utilization Report',      desc: 'Route-wise bus fill rates and student allocation',    format: 'PDF'        },
      { id: 'ir3', name: 'Library Usage Report',              desc: 'Daily footfall, book issues, and overdue stats',      format: 'PDF'        },
    ],
  },
  {
    group: 'Compliance',
    icon: 'ShieldCheck',
    color: '#10B981',
    reports: [
      { id: 'cr1', name: 'NAAC Self-Study Data Export',       desc: 'Key metrics formatted for NAAC criteria submission', format: 'XLSX'       },
      { id: 'cr2', name: 'NIRF Data Report',                  desc: 'Rankings data: research, placements, outreach',      format: 'XLSX'       },
      { id: 'cr3', name: 'NBA Program Report',                desc: 'NBA-accredited program performance data',             format: 'PDF'        },
    ],
  },
]

function ReportRow({ r, color }) {
  const [state, setState] = useState('idle') // idle | loading | done
  const generate = () => {
    setState('loading')
    setTimeout(() => setState('done'), 1800)
    setTimeout(() => setState('idle'), 5000)
  }
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E3E8F4] bg-white px-4 py-3.5 hover:bg-slate-50 transition-colors">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy">{r.name}</p>
        <p className="mt-0.5 text-xs text-slate-400">{r.desc}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden rounded-full border border-[#E3E8F4] px-2.5 py-0.5 text-[10px] font-bold text-slate-500 sm:block">{r.format}</span>
        <button onClick={generate} disabled={state !== 'idle'}
          className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-white transition-all disabled:opacity-60"
          style={{ background: state === 'done' ? '#10B981' : `linear-gradient(135deg, ${color}, ${color}cc)` }}>
          {state === 'loading' && <Icon name="Loader2" size={13} className="animate-spin" />}
          {state === 'done'    && <Icon name="CheckCircle2" size={13} />}
          {state === 'idle'    && <Icon name="Download" size={13} />}
          {state === 'loading' ? 'Generating…' : state === 'done' ? 'Ready' : 'Generate'}
        </button>
      </div>
    </div>
  )
}

export default function AnalyticsReports() {
  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="module-eyebrow">Analytics Reports</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">Report Center</h1>
          <p className="mt-1 text-sm text-slate-500">Generate cross-module institutional reports for management, NAAC, and NIRF</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-2.5">
          <Icon name="Info" size={14} style={{ color: '#C99800' }} />
          <span className="text-xs font-semibold text-amber-700">Reports use live data — AY 2024-25</span>
        </div>
      </div>

      <div className="space-y-5">
        {REPORT_CATALOG.map((group, gi) => (
          <motion.div key={group.group}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: gi * 0.06 }}>
            <SectionCard
              icon={group.icon}
              title={`${group.group} Reports`}
              subtitle={`${group.reports.length} report${group.reports.length > 1 ? 's' : ''} available`}
            >
              <div className="space-y-2.5">
                {group.reports.map((r) => (
                  <ReportRow key={r.id} r={r} color={group.color} />
                ))}
              </div>
            </SectionCard>
          </motion.div>
        ))}
      </div>

      {/* Bulk export */}
      <SectionCard icon="Archive" title="Bulk Export" subtitle="Download all reports as a ZIP archive">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#EBF0FB] p-4">
          <div>
            <p className="text-sm font-bold text-navy">Full Institution Report Pack</p>
            <p className="mt-0.5 text-xs text-slate-500">All 16 reports bundled — AY 2024-25 · ~4.2 MB estimated</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white brand-gradient transition-all hover:opacity-90">
            <Icon name="Archive" size={15} />
            Export All
          </button>
        </div>
      </SectionCard>
    </div>
  )
}
