// ─────────────────────────────────────────────────────────────
// Document Management → Expiry Tracking.
// ─────────────────────────────────────────────────────────────
import { GlassCard, SectionTitle, Button, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import useDocuments, { selExpiry } from '../store/documentStore.js'

export default function ExpiryTracking() {
  const expiry = useDocuments(selExpiry)
  const critical = expiry.filter((e) => e.status === 'Critical')
  const warning  = expiry.filter((e) => e.status === 'Warning')
  const ok       = expiry.filter((e) => e.status === 'OK')

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Expiry Tracking</h1>
        <p className="mt-1 text-sm text-slate-500">Monitor document expiry dates and receive timely renewal reminders.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="quick-tile rounded-xl bg-red-50 p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{critical.length}</p>
          <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wide text-red-400">Critical / Expired</p>
        </div>
        <div className="quick-tile rounded-xl bg-amber-50 p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{warning.length}</p>
          <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wide text-amber-400">Expiring Soon</p>
        </div>
        <div className="quick-tile rounded-xl bg-emerald-50 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-700">{ok.length}</p>
          <p className="mt-0.5 text-2xs font-semibold uppercase tracking-wide text-emerald-400">Valid</p>
        </div>
      </div>

      {critical.length > 0 && (
        <Notice tone="error">
          {critical.length} document{critical.length !== 1 ? 's are' : ' is'} expired or expiring today. Immediate renewal required.
        </Notice>
      )}

      {critical.length > 0 && (
        <ExpirySection
          title="Critical — Expired / Expiring Today"
          docs={critical}
          borderColor="border-red-200"
          bgColor="bg-red-50/40"
          iconColor="text-red-500"
        />
      )}

      {warning.length > 0 && (
        <ExpirySection
          title="Warning — Expiring within 60 Days"
          docs={warning}
          borderColor="border-amber-200"
          bgColor="bg-amber-50/40"
          iconColor="text-amber-500"
        />
      )}

      {ok.length > 0 && (
        <ExpirySection
          title="Valid — No Action Required"
          docs={ok}
          borderColor="border-emerald-200"
          bgColor="bg-emerald-50/20"
          iconColor="text-emerald-500"
        />
      )}

      <GlassCard className="p-5">
        <SectionTitle icon="Bell" title="Notification Settings" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { label: '90-day advance reminder', desc: 'Email the document owner 90 days before expiry', on: true },
            { label: '30-day advance reminder', desc: 'Email + SMS 30 days before expiry', on: true },
            { label: '7-day urgent alert',       desc: 'Email + SMS + in-app alert 7 days before', on: true },
            { label: 'Expiry day notification',  desc: 'Immediate alert on the expiry date', on: true },
          ].map((n) => (
            <label key={n.label} className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-3.5">
              <span>
                <span className="block text-sm font-semibold text-navy">{n.label}</span>
                <span className="block text-xs text-slate-500">{n.desc}</span>
              </span>
              <span className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full ${n.on ? 'bg-blue-600' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${n.on ? 'left-4' : 'left-0.5'}`} />
              </span>
            </label>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

function ExpirySection({ title, docs, borderColor, bgColor, iconColor }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className={`border-b ${borderColor} ${bgColor} px-5 py-3`}>
        <p className="text-[13px] font-bold text-navy">{title}</p>
      </div>
      <div className="divide-y divide-slate-50">
        {docs.map((d) => (
          <div key={d.id} className="flex items-center gap-4 px-5 py-4">
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${d.status === 'Critical' ? 'bg-red-50' : d.status === 'Warning' ? 'bg-amber-50' : 'bg-emerald-50'}`}>
              <Icon name={d.status === 'Critical' ? 'AlertCircle' : d.status === 'Warning' ? 'Clock' : 'CheckCircle2'} size={18} className={iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy">{d.name}</p>
              <p className="text-xs text-slate-500">{d.issuedBy} · {d.category}</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-navy">{d.expiryDate}</p>
              <p className={`text-xs font-semibold ${d.daysLeft <= 0 ? 'text-red-600' : d.daysLeft <= 30 ? 'text-amber-600' : 'text-slate-500'}`}>
                {d.daysLeft <= 0 ? 'Expired' : `${d.daysLeft} days remaining`}
              </p>
            </div>
            <StatusBadge status={d.status} />
            <Button variant="ghost" icon="RefreshCw">Renew</Button>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
