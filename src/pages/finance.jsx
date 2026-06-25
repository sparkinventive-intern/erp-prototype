// Finance module — fee payment, finance ledger, scholarships.
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PageShell, GlassCard, DataTable, Badge, Icon, ProgressBar, Notice,
  Button, StatTile, Field, EmptyState,
} from '../components/ui.jsx'
import {
  FEE_SUMMARY, FEE_BREAKDOWN, PAYMENT_HISTORY, FINANCE_LEDGER, SCHOLARSHIPS,
} from '../data/portalData.js'

const inr = (n) => '₹' + n.toLocaleString('en-IN')

// ── Fee Payment ───────────────────────────────────────────────
export function FeePayment() {
  const [paid, setPaid] = useState(false)
  const [mode, setMode] = useState('UPI')
  const pct = Math.round((FEE_SUMMARY.paid / FEE_SUMMARY.totalPayable) * 100)

  return (
    <PageShell icon="CreditCard" title="Fee Payment" subtitle="View dues and pay your semester fees online">
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile icon="Wallet" label="Total Payable" value={inr(FEE_SUMMARY.totalPayable)} accent="#10367D" />
        <StatTile icon="CheckCircle2" label="Paid" value={inr(FEE_SUMMARY.paid)} accent="#2E9E6B" />
        <StatTile icon="AlertCircle" label="Balance" value={inr(FEE_SUMMARY.balance)} accent="#D14D5A" />
        <StatTile icon="CalendarClock" label="Due Date" value={FEE_SUMMARY.dueDate} accent="#C8862E" />
      </div>

      <GlassCard className="mb-6 p-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-600">Payment progress</span>
          <span className="font-bold text-navy">{pct}%</span>
        </div>
        <ProgressBar value={pct} accent="#2E9E6B" />
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <p className="mb-3 text-sm font-bold text-navy">Fee Breakdown</p>
          <DataTable
            columns={[
              { key: 'head', label: 'Fee Head' },
              { key: 'amount', label: 'Amount', align: 'right', render: (r) => inr(r.amount) },
              { key: 'status', label: 'Status', render: (r) => (
                <Badge tone={r.status === 'Paid' ? 'low' : r.status === 'Pending' ? 'high' : 'medium'}>{r.status}</Badge>
              ) },
            ]}
            rows={FEE_BREAKDOWN}
          />
        </GlassCard>

        <GlassCard className="p-5">
          <p className="mb-3 text-sm font-bold text-navy">Pay Balance</p>
          {paid ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Icon name="CheckCircle2" size={28} />
              </div>
              <p className="mt-3 text-sm font-bold text-navy">Payment Successful</p>
              <p className="mt-1 text-xs text-slate-500">{inr(FEE_SUMMARY.balance)} paid via {mode}</p>
              <p className="mt-2 text-[11px] text-slate-500">Receipt: TXN-{Math.floor(90000 + Math.random() * 9999)}</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <p className="text-[11px] text-slate-500">Amount to pay</p>
                <p className="text-2xl font-extrabold text-navy">{inr(FEE_SUMMARY.balance)}</p>
              </div>
              <Field label="Payment Mode" type="select" value={mode} onChange={(e) => setMode(e.target.value)}
                options={['UPI', 'Net Banking', 'Credit Card', 'Debit Card']} />
              <Button className="w-full justify-center" icon="Lock" onClick={() => setPaid(true)}>
                Pay {inr(FEE_SUMMARY.balance)}
              </Button>
              <p className="text-center text-[10px] text-slate-500">Secured payment gateway · prototype</p>
            </div>
          )}
        </GlassCard>
      </div>

      <GlassCard className="mt-6 p-5">
        <p className="mb-3 text-sm font-bold text-navy">Payment History</p>
        <DataTable
          columns={[
            { key: 'id', label: 'Txn ID' },
            { key: 'date', label: 'Date' },
            { key: 'desc', label: 'Description' },
            { key: 'amount', label: 'Amount', align: 'right', render: (r) => inr(r.amount) },
            { key: 'mode', label: 'Mode' },
            { key: 'status', label: 'Status', render: () => <Badge tone="low">Success</Badge> },
          ]}
          rows={PAYMENT_HISTORY}
        />
      </GlassCard>
    </PageShell>
  )
}

// ── Finance Details ───────────────────────────────────────────
export function FinanceDetails() {
  return (
    <PageShell icon="Receipt" title="Finance Details" subtitle="Complete account ledger and statement">
      <div className="mb-4"><Notice tone="info">This ledger reflects all fee demands and payments on your account.</Notice></div>
      <GlassCard className="p-5">
        <DataTable
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'particulars', label: 'Particulars' },
            { key: 'debit', label: 'Debit', align: 'right', render: (r) => r.debit ? inr(r.debit) : '—' },
            { key: 'credit', label: 'Credit', align: 'right', render: (r) => r.credit ? <span className="text-emerald-600">{inr(r.credit)}</span> : '—' },
            { key: 'balance', label: 'Balance', align: 'right', render: (r) => <b className="text-navy">{inr(r.balance)}</b> },
          ]}
          rows={FINANCE_LEDGER}
        />
        <div className="mt-4 flex justify-end">
          <div className="rounded-xl bg-slate-50 px-5 py-3 text-right">
            <p className="text-[11px] text-slate-500">Outstanding Balance</p>
            <p className="text-xl font-extrabold text-red-600">{inr(FEE_SUMMARY.balance)}</p>
          </div>
        </div>
      </GlassCard>
    </PageShell>
  )
}

// ── Scholarship Renewal ───────────────────────────────────────
export function ScholarshipRenewal() {
  const [renewed, setRenewed] = useState(null)
  return (
    <PageShell icon="HandCoins" title="Scholarship Renewal" subtitle="View and renew your scholarships">
      {SCHOLARSHIPS.length === 0 ? (
        <GlassCard className="p-5"><EmptyState icon="HandCoins" title="No scholarships" text="You have no active scholarships on record." /></GlassCard>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {SCHOLARSHIPS.map((s, i) => {
            const done = renewed === i || s.status === 'Active'
            return (
              <GlassCard key={s.name} delay={i * 0.08} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500/15 text-amber-300">
                    <Icon name="Award" size={20} />
                  </div>
                  <Badge tone={done ? 'low' : 'medium'}>{done ? 'Active' : 'Renewal Pending'}</Badge>
                </div>
                <h3 className="mt-3 text-sm font-bold text-navy">{s.name}</h3>
                <p className="mt-1 text-2xl font-extrabold text-navy">{inr(s.amount)}<span className="text-xs text-slate-500"> / year</span></p>
                <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                  <p>Criteria: <span className="text-slate-700">{s.criteria}</span></p>
                  <p>Renew before: <span className="text-slate-700">{s.renewBy}</span></p>
                </div>
                {!done && (
                  <Button className="mt-4 w-full justify-center" icon="RefreshCw" onClick={() => setRenewed(i)}>
                    Submit Renewal
                  </Button>
                )}
                {renewed === i && (
                  <p className="mt-3 text-center text-xs text-emerald-600">✓ Renewal application submitted</p>
                )}
              </GlassCard>
            )
          })}
        </div>
      )}
    </PageShell>
  )
}
