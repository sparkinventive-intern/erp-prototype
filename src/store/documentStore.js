// ─────────────────────────────────────────────────────────────
// Document Management — Zustand store with persist.
// ─────────────────────────────────────────────────────────────
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { VERIFICATION_QUEUE, EXPIRY_ITEMS, RECENT_UPLOADS, DOC_KPI_BASE } from '../data/documentData.js'

const useDocuments = create(
  persist(
    (set, get) => ({
      queue: VERIFICATION_QUEUE,
      expiry: EXPIRY_ITEMS,
      uploads: RECENT_UPLOADS,
      totalDocs: DOC_KPI_BASE.total,

      uploadDocument: ({ docType, owner, ownerId, category, size = 'Unknown' }) =>
        set((s) => {
          const id = `DOC-${5600 + s.uploads.length}`
          const newDoc = {
            id, docType, owner, ownerId, category,
            size,
            uploadedOn: new Date().toISOString().slice(0, 10),
            status: 'Pending',
          }
          return {
            uploads: [newDoc, ...s.uploads],
            queue: [{ ...newDoc, id: `VER-${String(s.queue.length + 1).padStart(3, '0')}`, docId: id }, ...s.queue],
            totalDocs: s.totalDocs + 1,
          }
        }),

      verifyDocument: (verId) =>
        set((s) => ({
          queue: s.queue.map((d) => d.id === verId ? { ...d, status: 'Verified' } : d),
          uploads: s.uploads.map((d) => d.id === get().queue.find((q) => q.id === verId)?.docId ? { ...d, status: 'Verified' } : d),
        })),

      rejectDocument: (verId, reason = '') =>
        set((s) => ({
          queue: s.queue.map((d) => d.id === verId ? { ...d, status: 'Rejected', reason } : d),
        })),

      bulkVerify: (verIds) =>
        set((s) => ({
          queue: s.queue.map((d) => verIds.includes(d.id) ? { ...d, status: 'Verified' } : d),
        })),
    }),
    { name: 'document-store' }
  )
)

export default useDocuments
export const selQueue = (s) => s.queue
export const selExpiry = (s) => s.expiry
export const selUploads = (s) => s.uploads

export function computeDocKpis(queue, uploads, totalDocs) {
  const pending = queue.filter((d) => d.status === 'Pending').length
  const expiringSoon = 3
  return {
    total: totalDocs,
    pending,
    verifiedToday: uploads.filter((u) => u.status === 'Verified' && u.uploadedOn === new Date().toISOString().slice(0, 10)).length,
    expiringSoon,
  }
}
