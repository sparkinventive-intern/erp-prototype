// ─────────────────────────────────────────────────────────────
// Spark ERP — global state store (Zustand + localStorage).
// Holds all CRUD data: users, marks, bookings, requests,
// notifications and the audit log. Persists across refreshes.
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const now = () => new Date().toISOString()
const id = (p) => `${p}-${Math.floor(1000 + Math.random() * 8999)}`

// Seed data ----------------------------------------------------
const SEED_USERS = [
  { id: 'RA22-0142', name: 'Aarav Mehta', role: 'Student', dept: 'CSE', email: 'aarav.mehta@sparkerp.edu', status: 'Active', modules: ['Hostel', 'Transport', 'AI Assistant', 'Certificates'] },
  { id: 'RA22-0098', name: 'Diya Sharma', role: 'Student', dept: 'CSE', email: 'diya.sharma@sparkerp.edu', status: 'Active', modules: ['AI Assistant', 'Certificates', 'Placement'] },
  { id: 'RA22-0231', name: 'Karan Singh', role: 'Student', dept: 'IT', email: 'karan.singh@sparkerp.edu', status: 'Active', modules: ['Hostel', 'AI Assistant'] },
  { id: 'FAC-0214', name: 'Dr. Priya Nair', role: 'Staff', dept: 'CSE', email: 'priya.nair@sparkerp.edu', status: 'Active', modules: ['Attendance', 'Marks', 'Analytics', 'AI Faculty Assistant'] },
  { id: 'FAC-0188', name: 'Dr. S. Kumar', role: 'Staff', dept: 'CSE', email: 's.kumar@sparkerp.edu', status: 'Active', modules: ['Attendance', 'Marks', 'Workflow Automation'] },
  { id: 'ADM-0007', name: 'Rajiv Menon', role: 'Admin', dept: 'Registrar', email: 'rajiv.menon@sparkerp.edu', status: 'Active', modules: ['User Management', 'Finance', 'Access Control'] },
]

const SEED_MARKS = [
  { id: 'M-1', student: 'Aarav Mehta', course: 'Computer Networks', ct1: 14, ct2: 11, assignment: 8 },
  { id: 'M-2', student: 'Diya Sharma', course: 'Computer Networks', ct1: 22, ct2: 23, assignment: 9 },
  { id: 'M-3', student: 'Karan Singh', course: 'Computer Networks', ct1: 9, ct2: 8, assignment: 4 },
]

const SEED_ASSIGNMENTS = [
  { id: 'A-1', title: 'DBMS Assignment 4', course: 'DBMS', due: '2026-05-25', status: 'Pending' },
  { id: 'A-2', title: 'CN Lab Record', course: 'Computer Networks', due: '2026-05-28', status: 'Pending' },
]

const SEED_NOTIFS = [
  { id: 'N-1', text: 'Exam hall tickets for June 2026 released.', time: now(), unread: true },
  { id: 'N-2', text: 'Fee balance of ₹65,000 due on 15 Jun 2026.', time: now(), unread: true },
]

// Store --------------------------------------------------------
export const useErp = create(
  persist(
    (set, get) => ({
      users: SEED_USERS,
      marks: SEED_MARKS,
      assignments: SEED_ASSIGNMENTS,
      bookings: [],
      requests: [],
      notifications: SEED_NOTIFS,
      audit: [{ id: id('AUD'), action: 'System initialised', actor: 'Spark ERP', time: now() }],

      // ── audit helper ──
      log: (action, actor = 'Current User') =>
        set((s) => ({
          audit: [{ id: id('AUD'), action, actor, time: now() }, ...s.audit].slice(0, 200),
        })),

      // ── notifications ──
      pushNotif: (text) =>
        set((s) => ({
          notifications: [{ id: id('N'), text, time: now(), unread: true }, ...s.notifications].slice(0, 50),
        })),
      markAllRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, unread: false })) })),

      // ── users CRUD ──
      addUser: (user) => {
        const u = { id: user.id || id(user.role === 'Staff' ? 'FAC' : 'RA22'), status: 'Active', modules: [], ...user }
        set((s) => ({ users: [u, ...s.users] }))
        get().log(`Created ${u.role} account: ${u.name} (${u.id})`)
        get().pushNotif(`New ${u.role.toLowerCase()} account created: ${u.name}`)
        return u
      },
      addUsersBulk: (list) => {
        const mapped = list.map((u) => ({
          id: u.id || id(u.role === 'Staff' ? 'FAC' : 'RA22'),
          status: 'Active', modules: [], ...u,
        }))
        set((s) => ({ users: [...mapped, ...s.users] }))
        get().log(`Bulk import: ${mapped.length} accounts created`)
        get().pushNotif(`Bulk upload complete — ${mapped.length} accounts added`)
      },
      updateUser: (uid, patch) => {
        set((s) => ({ users: s.users.map((u) => (u.id === uid ? { ...u, ...patch } : u)) }))
        get().log(`Updated account: ${uid}`)
      },
      deleteUser: (uid) => {
        const u = get().users.find((x) => x.id === uid)
        set((s) => ({ users: s.users.filter((x) => x.id !== uid) }))
        get().log(`Deleted account: ${u ? u.name : uid}`)
      },

      // ── marks CRUD ──
      updateMark: (mid, patch) => {
        set((s) => ({ marks: s.marks.map((m) => (m.id === mid ? { ...m, ...patch } : m)) }))
        get().log(`Updated internal marks: ${mid}`)
      },

      // ── assignments ──
      submitAssignment: (aid) => {
        set((s) => ({
          assignments: s.assignments.map((a) => (a.id === aid ? { ...a, status: 'Submitted' } : a)),
        }))
        const a = get().assignments.find((x) => x.id === aid)
        get().log(`Submitted assignment: ${a ? a.title : aid}`)
        get().pushNotif(`Assignment submitted: ${a ? a.title : aid}`)
      },

      // ── bookings ──
      addBooking: (booking) => {
        const b = { id: id('BK'), time: now(), status: 'Confirmed', ...booking }
        set((s) => ({ bookings: [b, ...s.bookings] }))
        get().log(`Booking created: ${b.type} — ${b.detail}`)
        get().pushNotif(`${b.type} booking confirmed`)
        return b
      },

      // ── service requests ──
      addRequest: (req) => {
        const r = { id: id('REQ'), time: now(), status: 'Processing', ...req }
        set((s) => ({ requests: [r, ...s.requests] }))
        get().log(`Service request raised: ${r.type}`)
        get().pushNotif(`Request submitted: ${r.type} (${r.id})`)
        return r
      },

      resetAll: () => {
        localStorage.removeItem('spark-erp')
        window.location.reload()
      },
    }),
    {
      name: 'spark-erp',
      version: 2,
      // Guard against stale/older persisted shapes — always merge
      // defaults so no array is ever undefined at runtime.
      merge: (persisted, current) => ({
        ...current,
        ...(persisted || {}),
        users: persisted?.users ?? current.users,
        marks: persisted?.marks ?? current.marks,
        assignments: persisted?.assignments ?? current.assignments,
        bookings: persisted?.bookings ?? current.bookings,
        requests: persisted?.requests ?? current.requests,
        notifications: persisted?.notifications ?? current.notifications,
        audit: persisted?.audit ?? current.audit,
      }),
    }
  )
)

// Selectors (defensive — tolerate undefined during hydration)
export const studentsOnly = (s) => (s.users || []).filter((u) => u.role === 'Student')
export const staffOnly = (s) => (s.users || []).filter((u) => u.role === 'Staff')
export const unreadCount = (s) => (s.notifications || []).filter((n) => n.unread).length
