// ─────────────────────────────────────────────────────────────
// Fee Management store (Zustand + localStorage).
// Holds student fee records + payment transactions, and drives
// the live finance KPIs. Every payment updates dues, status,
// receipts and the dashboard at once.
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FEE_RECORDS, KPI_BASE } from '../data/feeData.js'

const clone = (list) => list.map((r) => ({ ...r }))
const statusOf = (paid, total) => (paid >= total ? 'Paid' : paid > 0 ? 'Partial' : 'Pending')

// A couple of historic payments so the Receipts page isn't empty.
const SEED_PAYMENTS = [
  { id: 'P-1', receiptNo: 'RC202600118', roll: '22AI056', name: 'Priya Sundaram', amount: 40000, mode: 'UPI', date: '12-Jun-2026', ref: 'UPI-8842190', remarks: 'Sem 6 part payment' },
  { id: 'P-2', receiptNo: 'RC202600121', roll: '22CV021', name: 'Karthik Raja', amount: 45000, mode: 'Bank Transfer', date: '18-Jun-2026', ref: 'NEFT-0099231', remarks: '' },
]

export const useFees = create(
  persist(
    (set, get) => ({
      records: clone(FEE_RECORDS),
      payments: SEED_PAYMENTS,
      lastReceipt: null,

      // Record a payment against a student → updates the record,
      // creates a payment + receipt, returns the receipt number.
      recordPayment: ({ roll, amount, mode, date, ref, remarks }) => {
        const amt = Number(amount) || 0
        const rec = get().records.find((r) => r.roll === roll)
        if (!rec) return null
        const seq = String(122 + get().payments.length + 1).padStart(5, '0')
        const receiptNo = `RC2026${seq}`
        const newPaid = Math.min(rec.total, rec.paid + amt)
        set((s) => ({
          records: s.records.map((r) =>
            r.roll === roll ? { ...r, paid: newPaid, due: r.total - newPaid, status: statusOf(newPaid, r.total) } : r
          ),
          payments: [
            { id: `P-${Date.now()}`, receiptNo, roll, name: rec.name, amount: amt,
              mode: mode || 'Cash', date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
              ref: ref || '—', remarks: remarks || '' },
            ...s.payments,
          ],
          lastReceipt: receiptNo,
        }))
        return receiptNo
      },

      resetFees: () => {
        localStorage.removeItem('spark-fees')
        window.location.reload()
      },
    }),
    {
      name: 'spark-fees',
      version: 1,
      merge: (persisted, current) => ({
        ...current,
        ...(persisted || {}),
        records: persisted?.records ?? current.records,
        payments: persisted?.payments ?? current.payments,
      }),
    }
  )
)

// ── Selectors / derivations ───────────────────────────────────
export const selRecords = (s) => s.records || []
export const selPayments = (s) => s.payments || []
export const findRecord = (roll) => (s) => (s.records || []).find((r) => r.roll === roll)
export const findReceipt = (no) => (s) => (s.payments || []).find((p) => p.receiptNo === no)

const sum = (arr, f) => arr.reduce((n, x) => n + f(x), 0)

export const computeKpis = (records = []) => ({
  collection: KPI_BASE.collection + sum(records, (r) => r.paid),
  pending: KPI_BASE.pending + sum(records, (r) => r.due),
  paidStudents: KPI_BASE.paidStudents + records.filter((r) => r.status === 'Paid').length,
  defaulters: KPI_BASE.defaulters + records.filter((r) => r.due > 0).length,
})
