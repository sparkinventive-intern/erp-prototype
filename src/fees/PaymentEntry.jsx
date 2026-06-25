// ─────────────────────────────────────────────────────────────
// Fee Management → Payment Entry (cash / manual payments).
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import { useFees, selRecords } from '../store/feeStore.js'

const MODES = [
  { key: 'Cash', icon: 'Banknote' },
  { key: 'Bank Transfer', icon: 'Landmark' },
  { key: 'UPI', icon: 'Smartphone' },
  { key: 'Cheque', icon: 'FileText' },
]

const today = () => new Date().toISOString().slice(0, 10)

export default function PaymentEntry() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const records = useFees(selRecords)
  const recordPayment = useFees((s) => s.recordPayment)

  const [roll, setRoll] = useState(params.get('roll') || '')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(today())
  const [mode, setMode] = useState('Cash')
  const [ref, setRef] = useState('')
  const [remarks, setRemarks] = useState('')

  const student = records.find((r) => r.roll === roll)

  const submit = (e) => {
    e.preventDefault()
    if (!student || !amount) return
    const fmtDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')
    const receiptNo = recordPayment({ roll, amount, mode, date: fmtDate, ref, remarks })
    if (receiptNo) navigate(`/fees/receipts/${receiptNo}`)
  }

  return (
    <div className="page-enter space-y-5">
      <Link to="/fees/students" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-navy">
        <Icon name="ArrowLeft" size={14} /> Back to records
      </Link>
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-teal-600">Fee Management</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Payment Entry</h1>
        <p className="mt-1 text-sm text-slate-500">Record a cash or manual payment and issue a receipt.</p>
      </div>

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Student */}
          <GlassCard className="p-6">
            <SectionTitle icon="User" title="Student Details" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Roll Number *</span>
                <select value={roll} onChange={(e) => setRoll(e.target.value)} required
                  className="focus-ring w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy hover:border-slate-400 focus:border-teal-500">
                  <option value="">Select a student…</option>
                  {records.map((r) => <option key={r.roll} value={r.roll}>{r.roll} — {r.name} ({r.dept})</option>)}
                </select>
              </label>
            </div>
            {student && (
              <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-4">
                {[['Name', student.name], ['Department', student.dept], ['Semester', student.sem], ['Balance Due', `₹${student.due.toLocaleString('en-IN')}`]].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-2xs font-medium uppercase tracking-wider text-slate-400">{k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-navy">{v}</p>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Payment */}
          <GlassCard className="p-6">
            <SectionTitle icon="IndianRupee" title="Payment Details" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Amount Paid (₹) *" type="number" placeholder="25000" required value={amount} onChange={(e) => setAmount(e.target.value)} />
              <Field label="Payment Date *" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <p className="mb-2 mt-4 text-xs font-semibold text-slate-600">Payment Mode *</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {MODES.map((m) => (
                <button type="button" key={m.key} onClick={() => setMode(m.key)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all ${
                    mode === m.key ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-500/20' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}>
                  <Icon name={m.icon} size={15} />
                  {m.key}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Reference Number" placeholder="Txn / Cheque no." value={ref} onChange={(e) => setRef(e.target.value)} />
              <Field label="Remarks" placeholder="Optional note" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </div>

            <div className="mt-5">
              <Button type="submit" icon="Check" disabled={!student || !amount}>Record Payment</Button>
            </div>
          </GlassCard>
        </div>

        {/* Help */}
        <div className="space-y-6">
          <GlassCard className="p-5">
            <SectionTitle icon="Info" title="Notes" />
            <ul className="space-y-2.5 text-sm text-slate-600">
              {['A receipt is generated automatically on recording.',
                'Partial payments are allowed — balance carries forward.',
                'Reference number is required for non-cash modes.',
                'All entries are logged for audit.'].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                  {t}
                </li>
              ))}
            </ul>
          </GlassCard>
          {student && student.due === 0 && (
            <Notice tone="success">This student has cleared all dues.</Notice>
          )}
        </div>
      </form>
    </div>
  )
}
