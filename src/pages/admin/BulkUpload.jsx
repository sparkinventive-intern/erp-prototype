// ─────────────────────────────────────────────────────────────
// Admin · Bulk Excel Upload — drag-drop a sheet, preview parsed
// rows, validate, then commit to the ERP store in one action.
// (Parsing is mocked — a real build would use SheetJS.)
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PageShell, GlassCard, SectionTitle, Icon, Button, DataTable, Badge, Notice,
} from '../../components/ui.jsx'
import { useErp } from '../../store/erpStore.js'

// A mock parsed sheet — what "reading the Excel file" would yield.
const MOCK_SHEET = [
  { name: 'Nikhil Raj', email: 'nikhil.raj@sparkerp.edu', role: 'Student', dept: 'CSE' },
  { name: 'Sara Pillai', email: 'sara.pillai@sparkerp.edu', role: 'Student', dept: 'IT' },
  { name: 'Arjun Das', email: 'arjun.das@sparkerp.edu', role: 'Student', dept: 'ECE' },
  { name: 'Tara Menon', email: 'invalid-email', role: 'Student', dept: 'CSE' },
  { name: 'Dev Anand', email: 'dev.anand@sparkerp.edu', role: 'Staff', dept: 'MECH' },
  { name: '', email: 'missing.name@sparkerp.edu', role: 'Student', dept: 'CSE' },
  { name: 'Riya Kapoor', email: 'riya.kapoor@sparkerp.edu', role: 'Student', dept: 'MGMT' },
]

const validateRow = (r) => {
  if (!r.name?.trim()) return 'Missing name'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email || '')) return 'Invalid email'
  return null
}

export default function BulkUpload() {
  const addUsersBulk = useErp((s) => s.addUsersBulk)
  const [stage, setStage] = useState('idle') // idle | preview | done
  const [rows, setRows] = useState([])
  const [drag, setDrag] = useState(false)
  const [fileName, setFileName] = useState('')
  const [imported, setImported] = useState(0)

  function parseFile(name = 'students_bulk_import.xlsx') {
    setFileName(name)
    const parsed = MOCK_SHEET.map((r, i) => ({ ...r, row: i + 2, error: validateRow(r) }))
    setRows(parsed)
    setStage('preview')
  }

  const valid = rows.filter((r) => !r.error)
  const invalid = rows.filter((r) => r.error)

  function commit() {
    addUsersBulk(valid.map(({ name, email, role, dept }) => ({ name, email, role, dept })))
    setImported(valid.length)
    setStage('done')
  }

  return (
    <PageShell
      icon="FileUp"
      title="Bulk Excel Upload"
      subtitle="Import multiple Student or Staff accounts from a spreadsheet"
      action={stage === 'preview' && <Button variant="ghost" icon="X" onClick={() => setStage('idle')}>Cancel</Button>}
    >
      {/* IDLE — dropzone */}
      {stage === 'idle' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-6 lg:col-span-2">
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); parseFile(e.dataTransfer.files[0]?.name) }}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-14 text-center transition ${
                drag ? 'border-accent bg-sky-50' : 'border-slate-300 bg-slate-50'
              }`}
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl brand-gradient text-white">
                <Icon name="UploadCloud" size={30} />
              </div>
              <p className="mt-4 text-sm font-bold text-navy">Drag & drop your Excel file here</p>
              <p className="mt-1 text-xs text-slate-500">Supports .xlsx and .csv · or browse below</p>
              <label className="mt-4">
                <input type="file" accept=".xlsx,.csv" className="hidden"
                  onChange={(e) => parseFile(e.target.files[0]?.name)} />
                <span className="inline-flex cursor-pointer items-center gap-2 rounded-lg brand-gradient px-4 py-2 text-sm font-semibold text-white">
                  <Icon name="FolderOpen" size={16} /> Browse Files
                </span>
              </label>
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <SectionTitle icon="Info" title="File Format" />
            <p className="text-xs text-slate-500">Your sheet should contain these columns:</p>
            <div className="mt-2 space-y-1.5">
              {['name', 'email', 'role', 'dept'].map((c) => (
                <div key={c} className="flex items-center gap-2 rounded-md bg-slate-50 px-2.5 py-1.5 text-xs">
                  <Icon name="Columns3" size={13} className="text-accent" />
                  <code className="font-semibold text-navy">{c}</code>
                </div>
              ))}
            </div>
            <Notice tone="info"><span className="text-xs">Rows with errors are skipped automatically; valid rows are imported.</span></Notice>
          </GlassCard>
        </div>
      )}

      {/* PREVIEW */}
      {stage === 'preview' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <GlassCard className="p-4"><p className="text-xs text-slate-500">Total Rows</p><p className="text-2xl font-bold text-navy">{rows.length}</p></GlassCard>
            <GlassCard className="p-4"><p className="text-xs text-slate-500">Valid</p><p className="text-2xl font-bold text-emerald-600">{valid.length}</p></GlassCard>
            <GlassCard className="p-4"><p className="text-xs text-slate-500">Errors</p><p className="text-2xl font-bold text-red-600">{invalid.length}</p></GlassCard>
          </div>
          {invalid.length > 0 && (
            <div className="mb-4"><Notice tone="warn">{invalid.length} row(s) have validation errors and will be skipped on import.</Notice></div>
          )}
          <GlassCard className="p-5">
            <SectionTitle icon="Table" title={`Preview — ${fileName}`} />
            <DataTable
              columns={[
                { key: 'row', label: 'Row' },
                { key: 'name', label: 'Name', render: (r) => r.name || <span className="text-red-600">—</span> },
                { key: 'email', label: 'Email' },
                { key: 'role', label: 'Role' },
                { key: 'dept', label: 'Dept' },
                { key: 'error', label: 'Validation', render: (r) => r.error
                  ? <Badge tone="high">{r.error}</Badge>
                  : <Badge tone="low">Valid</Badge> },
              ]}
              rows={rows}
            />
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="ghost" icon="RotateCcw" onClick={() => setStage('idle')}>Choose Another</Button>
              <Button icon="DatabaseZap" disabled={valid.length === 0} onClick={commit}>
                Import {valid.length} Account{valid.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* DONE */}
      {stage === 'done' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <GlassCard className="p-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Icon name="CheckCircle2" size={32} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-navy">Bulk Import Complete</h3>
            <p className="mt-1 text-sm text-slate-500">
              {imported} account(s) created from <b>{fileName}</b>. {invalid.length > 0 && `${invalid.length} invalid row(s) skipped.`}
            </p>
            <div className="mt-5 flex justify-center">
              <Button variant="ghost" icon="Upload" onClick={() => { setStage('idle'); setRows([]) }}>Upload Another File</Button>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </PageShell>
  )
}
