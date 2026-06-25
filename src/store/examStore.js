// ─────────────────────────────────────────────────────────────
// Examination store (Zustand + localStorage).
// Drives the full exam lifecycle: create → schedule → rooms →
// hall tickets → marks → publish → analytics.
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EXAM_SEED, EXAM_KPI_BASE } from '../data/examData.js'

const clone = (list) => list.map((e) => ({ ...e }))

export const useExams = create(
  persist(
    (set, get) => ({
      exams: clone(EXAM_SEED),
      marks: {},               // { [examCode]: { [reg]: mark } }
      roomsAssigned: {},       // { [examCode]: true }
      hallTicketsDone: false,
      seq: EXAM_SEED.length,

      // Create one or more exams from selected subjects (Scheduled).
      createExam: ({ name, type, dept = 'CSE', subjects, startDate = '05 Jul', time = '9 AM' }) => {
        const start = get().seq
        const created = subjects.map((subject, i) => ({
          code: `EXM${String(start + i + 1).padStart(3, '0')}`,
          subject, dept, date: startDate, time,
          status: 'Scheduled', type, examName: name,
        }))
        set((s) => ({ exams: [...created, ...s.exams], seq: s.seq + subjects.length }))
        return created.map((e) => e.code)
      },

      assignRooms: (code) =>
        set((s) => ({ roomsAssigned: { ...s.roomsAssigned, [code]: true } })),

      generateHallTickets: () => set({ hallTicketsDone: true }),

      // Save marks → moves a Completed exam to Results Pending.
      saveMarks: (code, marksObj) =>
        set((s) => ({
          marks: { ...s.marks, [code]: marksObj },
          exams: s.exams.map((e) => (e.code === code && e.status === 'Completed' ? { ...e, status: 'ResultsPending' } : e)),
        })),

      publishResults: (code) =>
        set((s) => ({ exams: s.exams.map((e) => (e.code === code ? { ...e, status: 'Published' } : e)) })),

      resetExams: () => {
        localStorage.removeItem('spark-exams')
        window.location.reload()
      },
    }),
    {
      name: 'spark-exams',
      version: 1,
      merge: (persisted, current) => ({
        ...current,
        ...(persisted || {}),
        exams: persisted?.exams ?? current.exams,
        marks: persisted?.marks ?? current.marks,
        roomsAssigned: persisted?.roomsAssigned ?? current.roomsAssigned,
      }),
    }
  )
)

// ── Selectors / derivations ───────────────────────────────────
export const selExams = (s) => s.exams || []
export const findExam = (code) => (s) => (s.exams || []).find((e) => e.code === code)

const COMPLETED = ['Completed', 'ResultsPending', 'Published']

export const computeExamKpis = (exams = []) => ({
  total: EXAM_KPI_BASE.total + exams.length,
  upcoming: EXAM_KPI_BASE.upcoming + exams.filter((e) => e.status === 'Scheduled').length,
  completed: EXAM_KPI_BASE.completed + exams.filter((e) => COMPLETED.includes(e.status)).length,
  resultsPending: EXAM_KPI_BASE.resultsPending + exams.filter((e) => e.status === 'ResultsPending').length,
})

export const examCounts = (exams = []) => ({
  scheduled: exams.filter((e) => e.status === 'Scheduled').length,
  resultsPending: exams.filter((e) => e.status === 'ResultsPending').length,
  markable: exams.filter((e) => ['Completed', 'ResultsPending'].includes(e.status)).length,
})
