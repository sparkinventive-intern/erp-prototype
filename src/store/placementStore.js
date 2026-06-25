// ─────────────────────────────────────────────────────────────
// Placement Management — Zustand store with persist.
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { COMPANIES, STUDENTS, DRIVES, OFFERS, PLACEMENT_KPI_BASE } from '../data/placementData.js'

const usePlacement = create(
  persist(
    (set, get) => ({
      companies: COMPANIES,
      students: STUDENTS,
      drives: DRIVES,
      offers: OFFERS,

      addCompany: (data) =>
        set((s) => ({
          companies: [...s.companies, {
            id: `C${String(s.companies.length + 1).padStart(3, '0')}`,
            drives: 0, offers: 0, status: 'Upcoming',
            ...data,
          }],
        })),

      updateCompanyStatus: (id, status) =>
        set((s) => ({
          companies: s.companies.map((c) => c.id === id ? { ...c, status } : c),
        })),

      addDrive: (data) =>
        set((s) => ({
          drives: [...s.drives, {
            id: `DRIVE-${String(s.drives.length + 1).padStart(3, '0')}`,
            registered: 0, appeared: 0, qualified: 0, selected: 0,
            status: 'Open',
            ...data,
          }],
        })),

      updateDriveStatus: (id, status) =>
        set((s) => ({
          drives: s.drives.map((d) => d.id === id ? { ...d, status } : d),
        })),

      registerStudentForDrive: (driveId) =>
        set((s) => ({
          drives: s.drives.map((d) =>
            d.id === driveId ? { ...d, registered: d.registered + 1 } : d),
        })),

      recordOffer: ({ studentReg, studentName, company, packageLPA, role, date }) =>
        set((s) => {
          const offerId = `OFF-${String(s.offers.length + 1).padStart(3, '0')}`
          return {
            offers: [...s.offers, {
              id: offerId, student: studentReg, studentName,
              company, packageLPA, role, date, status: 'Pending',
            }],
            students: s.students.map((st) =>
              st.reg === studentReg
                ? { ...st, status: 'Offer Pending', company, packageLPA }
                : st
            ),
          }
        }),

      acceptOffer: (offerId) =>
        set((s) => {
          const offer = s.offers.find((o) => o.id === offerId)
          return {
            offers: s.offers.map((o) => o.id === offerId ? { ...o, status: 'Accepted' } : o),
            students: offer
              ? s.students.map((st) =>
                  st.reg === offer.student ? { ...st, status: 'Placed' } : st)
              : s.students,
          }
        }),

      declineOffer: (offerId) =>
        set((s) => ({
          offers: s.offers.map((o) => o.id === offerId ? { ...o, status: 'Declined' } : o),
        })),

      updateStudentStatus: (reg, status) =>
        set((s) => ({
          students: s.students.map((st) => st.reg === reg ? { ...st, status } : st),
        })),
    }),
    { name: 'placement-store' }
  )
)

export default usePlacement
export const selStudents = (s) => s.students
export const selCompanies = (s) => s.companies
export const selDrives = (s) => s.drives
export const selOffers = (s) => s.offers

export function computePlacementKpis(students, offers) {
  const placed = students.filter((s) => s.status === 'Placed').length
  const eligible = students.filter((s) => s.eligible).length
  const packages = offers.filter((o) => o.packageLPA).map((o) => o.packageLPA)
  const highestLPA = packages.length ? Math.max(...packages) : PLACEMENT_KPI_BASE.highestLPA
  const avgLPA = packages.length ? (packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(1) : PLACEMENT_KPI_BASE.averageLPA
  return {
    registered: PLACEMENT_KPI_BASE.registered - STUDENTS.length + students.length,
    eligible:   PLACEMENT_KPI_BASE.eligible - STUDENTS.filter((s) => s.eligible).length + eligible,
    placed:     PLACEMENT_KPI_BASE.placed - STUDENTS.filter((s) => s.status === 'Placed').length + placed,
    rate:       (((PLACEMENT_KPI_BASE.placed - STUDENTS.filter((s) => s.status === 'Placed').length + placed) /
                  (PLACEMENT_KPI_BASE.eligible - STUDENTS.filter((s) => s.eligible).length + eligible)) * 100).toFixed(1),
    companies:  PLACEMENT_KPI_BASE.companies,
    offers:     PLACEMENT_KPI_BASE.offers - OFFERS.length + offers.length,
    highestLPA,
    avgLPA,
  }
}
