import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { StatusBadge } from './parts.jsx'
import { MAINTENANCE_RECORDS, BUSES } from '../data/transportData.js'

export default function TransportMaintenance() {
  const [records, setRecords] = useState(MAINTENANCE_RECORDS)
  const [form, setForm] = useState({ bus: '', type: '', date: '', cost: '', vendor: '', nextDue: '' })
  const [saved, setSaved] = useState(false)

  const overdue = records.filter((m) => m.status === 'Overdue')
  const scheduled = records.filter((m) => m.status === 'Scheduled')
  const completed = records.filter((m) => m.status === 'Completed')

  function logService() {
    if (!form.bus || !form.type || !form.date) return
    setRecords((r) => [...r, {
      id: `M${String(r.length + 1).padStart(3, '0')}`,
      bus: form.bus, type: form.type, date: form.date,
      cost: Number(form.cost) || 0, vendor: form.vendor,
      nextDue: form.nextDue, status: 'Completed',
    }])
    setSaved(true)
    setForm({ bus: '', type: '', date: '', cost: '', vendor: '', nextDue: '' })
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Maintenance</h1>
          <p className="mt-1 text-sm text-slate-500">Track service intervals, repairs, and upcoming maintenance for all buses.</p>
        </div>
        <Button icon="Wrench">Schedule Service</Button>
      </div>

      {overdue.length > 0 && (
        <Notice tone="warning">
          {overdue.length} bus(es) have overdue maintenance: {overdue.map((m) => m.bus).join(', ')}. Schedule service immediately.
        </Notice>
      )}

      {saved && <Notice tone="success">Maintenance record logged successfully.</Notice>}

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Records',      value: records.length },
          { label: 'Scheduled',          value: scheduled.length, color: 'text-amber-600' },
          { label: 'Overdue',            value: overdue.length,   color: 'text-red-600'   },
          { label: 'Completed (yr)',      value: completed.length, color: 'text-emerald-600' },
        ].map((s) => (
          <GlassCard key={s.label} className="p-4 text-center">
            <p className={`text-xl font-bold ${s.color ?? 'text-navy'}`}>{s.value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Log form */}
        <GlassCard className="p-5 lg:col-span-1">
          <SectionTitle icon="PlusCircle" title="Log Service / Repair" />
          <div className="mt-4 space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Bus</label>
              <select value={form.bus} onChange={(e) => setForm((f) => ({ ...f, bus: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option value="">Select bus…</option>
                {BUSES.map((b) => <option key={b.no} value={b.no}>{b.no} — {b.model}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Service Type</label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option value="">Select type…</option>
                {['Oil Change', 'Tyre Replacement', 'Engine Overhaul', 'Brake Service', 'AC Repair', 'Battery Replacement', 'Full Service'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <Field label="Service Date" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            <Field label="Cost (₹)" type="number" placeholder="e.g. 12000" value={form.cost} onChange={(e) => setForm((f) => ({ ...f, cost: e.target.value }))} />
            <Field label="Vendor / Workshop" placeholder="Workshop name" value={form.vendor} onChange={(e) => setForm((f) => ({ ...f, vendor: e.target.value }))} />
            <Field label="Next Due Date" type="date" value={form.nextDue} onChange={(e) => setForm((f) => ({ ...f, nextDue: e.target.value }))} />
            <Button icon="Save" className="w-full justify-center" onClick={logService} disabled={!form.bus || !form.type || !form.date}>
              Log Record
            </Button>
          </div>
        </GlassCard>

        {/* Records table */}
        <GlassCard className="overflow-hidden p-0 lg:col-span-2">
          <div className="border-b border-slate-100 px-5 py-4">
            <SectionTitle icon="ClipboardList" title="Maintenance Records" subtitle={`${records.length} total`} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  {['ID', 'Bus', 'Type', 'Date', 'Cost (₹)', 'Vendor', 'Next Due', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((m) => (
                  <tr key={m.id} className={`border-b border-slate-50 hover:bg-emerald-50/20 ${m.status === 'Overdue' ? 'bg-red-50/20' : ''}`}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-emerald-700">{m.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-navy">{m.bus}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{m.type}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{m.date}</td>
                    <td className="px-4 py-3 font-mono text-xs text-navy">{m.cost.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{m.vendor}</td>
                    <td className={`px-4 py-3 text-xs font-semibold whitespace-nowrap ${m.status === 'Overdue' ? 'text-red-600' : 'text-slate-600'}`}>{m.nextDue}</td>
                    <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-100 px-4 py-3">
            <p className="text-xs text-slate-500">
              Total maintenance cost: ₹{records.reduce((s, m) => s + m.cost, 0).toLocaleString('en-IN')}
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

