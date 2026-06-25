// ─────────────────────────────────────────────────────────────
// Admissions store (Zustand + localStorage).
// Drives the live admission pipeline — every officer action moves
// an applicant to the next stage and updates counts everywhere.
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ADM_APPLICATIONS } from '../data/admissionsData.js'

// Forward pipeline: which status comes next.
export const NEXT_STATUS = {
  pending: 'verification',
  verification: 'eligibility',
  eligibility: 'interview',
  interview: 'approved',
  approved: 'confirmed',
}

// Human label for the upcoming action.
export const NEXT_LABEL = {
  pending: 'Send to Verification',
  verification: 'Mark Eligible',
  eligibility: 'Move to Interview',
  interview: 'Approve',
  approved: 'Confirm Admission',
}

const STD_DOCS = ['Aadhaar', 'Marksheet', 'Transfer Certificate', 'Community Certificate']
const clone = (list) => list.map((a) => ({ ...a, docs: a.docs.map((d) => ({ ...d })) }))

export const useAdmissions = create(
  persist(
    (set, get) => ({
      applications: clone(ADM_APPLICATIONS),

      setStatus: (id, status) =>
        set((s) => ({ applications: s.applications.map((a) => (a.id === id ? { ...a, status } : a)) })),

      // Advance one step along the pipeline.
      advance: (id) =>
        set((s) => ({
          applications: s.applications.map((a) => {
            if (a.id !== id) return a
            const next = NEXT_STATUS[a.status]
            if (!next) return a
            return { ...a, status: next, ...(next === 'confirmed' ? { feePaid: true } : {}) }
          }),
        })),

      approve: (id) => get().setStatus(id, 'approved'),
      reject: (id) => get().setStatus(id, 'rejected'),
      scheduleInterview: (id) => get().setStatus(id, 'interview'),
      requestDocs: (id) => get().setStatus(id, 'pending'),

      // Verify all documents → clears the queue and moves to eligibility.
      verifyAll: (id) =>
        set((s) => ({
          applications: s.applications.map((a) =>
            a.id === id
              ? { ...a, docs: a.docs.map((d) => ({ ...d, ok: true })), missingCount: 0, status: 'eligibility' }
              : a
          ),
        })),

      // Collect admission fee → confirms the admission.
      collectFee: (id) =>
        set((s) => ({
          applications: s.applications.map((a) => (a.id === id ? { ...a, feePaid: true, status: 'confirmed' } : a)),
        })),

      // Create a brand-new application from the form.
      addApplication: (core) => {
        const seq = String(Math.floor(100 + Math.random() * 880)).padStart(3, '0')
        const id = `APP-2026-${seq}`
        const app = {
          id,
          name: core.name || 'New Applicant',
          course: core.course || 'CSE',
          gender: core.gender || '—',
          status: 'pending',
          applied: 'Just now',
          dob: core.dob || '—',
          contact: core.contact || '—',
          email: core.email || '—',
          address: core.address || '—',
          parent: core.parent || '—',
          parentContact: core.parentContact || '—',
          marks10: core.marks10 || '—',
          marks12: core.marks12 || '—',
          board: core.board || '—',
          yearPass: core.yearPass || '2025',
          meritScore: core.meritScore || '85.0',
          source: 'Website',
          feePaid: false,
          feeAmount: '₹ 85,000',
          docs: STD_DOCS.map((name) => ({ name, ok: true })),
          missingCount: 0,
        }
        set((s) => ({ applications: [app, ...s.applications] }))
        return id
      },

      resetAdmissions: () => {
        localStorage.removeItem('spark-admissions')
        window.location.reload()
      },
    }),
    {
      name: 'spark-admissions',
      version: 1,
      merge: (persisted, current) => ({
        ...current,
        ...(persisted || {}),
        applications: persisted?.applications ?? current.applications,
      }),
    }
  )
)

// ── Selectors ─────────────────────────────────────────────────
const PIPELINE = ['pending', 'verification', 'eligibility', 'interview']

export const selApplications = (s) => s.applications || []
export const findApp = (id) => (s) => (s.applications || []).find((a) => a.id === id)

// Plain derivation (NOT a selector) — call with the applications
// array so consumers select the stable array reference first.
export const computeCounts = (apps = []) => {
  const by = (st) => apps.filter((a) => a.status === st).length
  return {
    total: apps.length,
    confirmed: by('confirmed'),
    approved: by('approved'),
    rejected: by('rejected'),
    verifyQueue: apps.filter((a) => ['verification', 'pending', 'eligibility'].includes(a.status)).length,
    pipeline: apps.filter((a) => PIPELINE.includes(a.status)).length,
    interview: by('interview'),
    feePending: apps.filter((a) => ['approved', 'confirmed', 'interview'].includes(a.status) && !a.feePaid).length,
  }
}
