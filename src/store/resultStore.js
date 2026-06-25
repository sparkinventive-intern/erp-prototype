// ─────────────────────────────────────────────────────────────
// Result Management store (Zustand + localStorage).
// Drives the processing workflow → publication → transcripts.
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STUDENT_RESULTS, computeGpa, isPass, PROCESSING_STEPS } from '../data/resultData.js'

const clone = (list) => list.map((r) => ({ ...r, subjects: r.subjects.map((s) => ({ ...s })) }))

// stage index into PROCESSING_STEPS. 0 = Marks Entry done (start).
const PUBLISH_STEP = 5 // "Publish Results"

export const useResults = create(
  persist(
    (set, get) => ({
      results: clone(STUDENT_RESULTS),
      stage: 0,
      gpaGenerated: false,
      published: false,

      // Advance the processing workflow one step.
      advanceStage: () =>
        set((s) => ({
          stage: Math.min(s.stage + 1, PROCESSING_STEPS.length - 1),
          gpaGenerated: s.stage + 1 >= 3 ? true : s.gpaGenerated,
        })),

      generateGpa: () => set((s) => ({ gpaGenerated: true, stage: Math.max(s.stage, 3) })),

      publish: () => set((s) => ({ published: true, stage: Math.max(s.stage, PUBLISH_STEP) })),
      unpublish: () => set({ published: false }),

      resetResults: () => {
        localStorage.removeItem('spark-results')
        window.location.reload()
      },
    }),
    {
      name: 'spark-results',
      version: 1,
      merge: (persisted, current) => ({
        ...current,
        ...(persisted || {}),
        results: persisted?.results ?? current.results,
      }),
    }
  )
)

// ── Selectors / derivations ───────────────────────────────────
export const selResults = (s) => s.results || []
export const findResult = (reg) => (s) => (s.results || []).find((r) => r.reg === reg)

// Enrich a record with computed gpa / status.
export const enrich = (r) => ({
  ...r,
  gpa: computeGpa(r.subjects),
  status: isPass(r.subjects) ? 'Pass' : 'Arrear',
  credits: r.subjects.reduce((n, s) => n + s.credits, 0),
})
