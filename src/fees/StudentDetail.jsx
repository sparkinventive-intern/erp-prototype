// ─────────────────────────────────────────────────────────────
// Fee Management → single student fee record + payment history.
// ─────────────────────────────────────────────────────────────
import { Link, useParams, useNavigate } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Icon, ProgressBar, InfoGrid } from '../components/ui.jsx'
import { FeeStatus } from './parts.jsx'
import { useFees, findRecord, selPayments } from '../store/feeStore.js'
import { FEE_STRUCTURES } from '../data/feeData.js'

const STRUCTURE = FEE_STRUCTURES[0] // B.E CSE template for the breakdown demo

export default function StudentDetail() {
  const { roll } = useParams()
  const navigate = useNavigate()
  const rec = useFees(findRecord(roll))
  const payments = useFees(selPayments).filter((p) => p.roll === roll)

  if (!rec) {
    return (
      <div className="page-enter">
        <GlassCard className="p-10 text-center">
          <Icon name="SearchX" size={28} className="mx-auto text-slate-300" />
          <p className="mt-3 text-sm font-bold text-navy">Student “{roll}” not found</p>
          <Link to="/fees/students" className="mt-2 inline-block text-xs font-semibold text-teal-600 hover:underline">← Back to records</Link>
        </GlassCard>
      </div>
    )
  }

  const pct = Math.round((rec.paid / rec.total) * 100)

  return (
    <div className="page-enter space-y-5">
      <Link to="/fees/students" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-navy">
        <Icon name="ArrowLeft" size={14} /> Back to records
      </Link>

      <GlassCard className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl text-lg font-bold text-white shadow-elevated" style={{ background: 'linear-gradient(145deg,#0F766E,#0A4A44)' }}>
              {rec.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight text-navy">{rec.name}</h1>
                <FeeStatus status={rec.status} />
              </div>
              <p className="mt-0.5 text-sm text-slate-500">
                <span className="font-mono font-semibold text-navy">{rec.roll}</span> · {rec.dept} · Semester {rec.sem}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button icon="IndianRupee" onClick={() => navigate(`/fees/payment-entry?roll=${rec.roll}`)} disabled={rec.due === 0}>
              {rec.due === 0 ? 'Fully Paid' : 'Record Payment'}
            </Button>
            {payments[0] && (
              <Button variant="ghost" icon="Receipt" onClick={() => navigate(`/fees/receipts/${payments[0].receiptNo}`)}>Latest Receipt</Button>
            )}
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Fee breakdown */}
        <div className="space-y-6 lg:col-span-2">
          <GlassCard className="p-6">
            <SectionTitle icon="Layers" title="Fee Breakdown" action={<span className="text-2xs font-semibold text-slate-400">{STRUCTURE.name}</span>} />
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <tbody>
                  {STRUCTURE.items.map((it) => (
                    <tr key={it.label} className="border-b border-slate-100">
                      <td className="px-4 py-2.5 text-slate-600">{it.label}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-navy">₹{it.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-bold text-navy">Total Fee</td>
                    <td className="px-4 py-3 text-right font-bold text-navy">₹{rec.total.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionTitle icon="History" title="Payment History" />
            {payments.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">No payments recorded yet.</p>
            ) : (
              <div className="space-y-2.5">
                {payments.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Icon name="IndianRupee" size={17} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-navy">₹{p.amount.toLocaleString('en-IN')} · {p.mode}</p>
                      <p className="text-2xs text-slate-400">{p.date} · Ref {p.ref}</p>
                    </div>
                    <button onClick={() => navigate(`/fees/receipts/${p.receiptNo}`)}
                      className="ml-auto inline-flex items-center gap-1 rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100">
                      <Icon name="Receipt" size={13} /> {p.receiptNo}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Payment status */}
        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Wallet" title="Payment Status" />
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">{pct}% paid</span>
                <span className="font-bold text-navy">₹{rec.paid.toLocaleString('en-IN')} / ₹{rec.total.toLocaleString('en-IN')}</span>
              </div>
              <ProgressBar value={pct} accent="#0F766E" />
            </div>
            <InfoGrid cols={1} data={[
              { label: 'Total Fee', value: `₹${rec.total.toLocaleString('en-IN')}` },
              { label: 'Amount Paid', value: `₹${rec.paid.toLocaleString('en-IN')}` },
              { label: 'Balance Due', value: `₹${rec.due.toLocaleString('en-IN')}` },
              { label: 'Due Date', value: rec.dueDate },
            ]} />
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
