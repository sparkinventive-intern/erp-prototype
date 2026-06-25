// ─────────────────────────────────────────────────────────────
// Document Management → Upload Center.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'
import useDocuments from '../store/documentStore.js'

const ACCEPTED_TYPES = [
  { ext: 'PDF', icon: 'FileText', color: '#EF4444' },
  { ext: 'DOCX', icon: 'FileText', color: '#3B82F6' },
  { ext: 'JPG', icon: 'Image', color: '#F59E0B' },
  { ext: 'PNG', icon: 'Image', color: '#F59E0B' },
  { ext: 'ZIP', icon: 'Archive', color: '#8B5CF6' },
]

const CATEGORIES = ['student', 'faculty', 'admin', 'financial', 'accreditation', 'placement']

export default function UploadCenter() {
  const uploadDocument = useDocuments((s) => s.uploadDocument)
  const [dragging, setDragging] = useState(false)
  const [form, setForm] = useState({ docType: '', owner: '', ownerId: '', category: 'student', size: '' })
  const [success, setSuccess] = useState(false)
  const [fileName, setFileName] = useState('')

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer?.files?.[0]
    if (file) {
      setFileName(file.name)
      const sizeKB = Math.round(file.size / 1024)
      setForm((f) => ({
        ...f,
        docType: f.docType || file.name.replace(/\.[^.]+$/, ''),
        size: sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`,
      }))
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const sizeKB = Math.round(file.size / 1024)
    setForm((f) => ({
      ...f,
      docType: f.docType || file.name.replace(/\.[^.]+$/, ''),
      size: sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.docType.trim() || !form.owner.trim()) return
    uploadDocument({ ...form })
    setSuccess(true)
    setForm({ docType: '', owner: '', ownerId: '', category: 'student', size: '' })
    setFileName('')
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <div className="page-enter space-y-5">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-widest text-blue-600">Documents</p>
        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Upload Center</h1>
        <p className="mt-1 text-sm text-slate-500">Upload new documents to the central repository. Supported formats: PDF, DOCX, JPG, PNG, ZIP.</p>
      </div>

      {success && <Notice tone="success">Document uploaded successfully and added to the verification queue.</Notice>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <GlassCard className="p-6">
            <SectionTitle icon="Upload" title="Upload Document" />

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-12 transition-colors ${
                dragging ? 'border-blue-400 bg-blue-50/60' : 'border-slate-300 bg-slate-50/60 hover:border-blue-300 hover:bg-blue-50/30'
              }`}>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50">
                <Icon name="Upload" size={26} className="text-blue-600" />
              </div>
              <p className="mt-3 text-sm font-bold text-navy">Drag & Drop your file here</p>
              <p className="mt-1 text-xs text-slate-400">or click to browse</p>
              {fileName && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-800">
                  <Icon name="FileText" size={14} />
                  {fileName}
                </div>
              )}
              <label className="mt-4 cursor-pointer">
                <input type="file" className="sr-only" accept=".pdf,.docx,.jpg,.png,.zip" onChange={handleFileChange} />
                <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
                  Browse Files
                </span>
              </label>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Document Type / Name" value={form.docType} onChange={(e) => setForm({ ...form, docType: e.target.value })} placeholder="e.g. Aadhaar Card" required />
              <Field label="Owner Name" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="e.g. Arjun Kumar" required />
              <Field label="Owner ID (Reg/Emp No)" value={form.ownerId} onChange={(e) => setForm({ ...form, ownerId: e.target.value })} placeholder="e.g. CS21001" />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="focus-ring rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-navy capitalize">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" icon="Upload">Upload Document</Button>
              </div>
            </form>
          </GlassCard>
        </div>

        <div className="space-y-5">
          <GlassCard className="p-5">
            <SectionTitle icon="Info" title="Supported Formats" />
            <div className="mt-3 space-y-2.5">
              {ACCEPTED_TYPES.map((t) => (
                <div key={t.ext} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: t.color + '18' }}>
                    <Icon name={t.icon} size={15} style={{ color: t.color }} />
                  </div>
                  <p className="text-sm font-semibold text-navy">.{t.ext}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <SectionTitle icon="CheckCircle" title="Upload Guidelines" />
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              {[
                'Max file size: 25 MB per document',
                'Scanned documents must be legible',
                'PDFs should not be password-protected',
                'Photos should be taken in good lighting',
                'All documents go to verification queue',
                'Verified documents cannot be deleted',
              ].map((g) => (
                <li key={g} className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={13} className="mt-0.5 shrink-0 text-blue-500" />
                  {g}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
