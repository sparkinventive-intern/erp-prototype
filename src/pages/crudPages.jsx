// ─────────────────────────────────────────────────────────────
// Working CRUD pages backed by the ERP store.
//   Admin   · User Management (students / staff)
//   Staff   · Internal Marks Entry
//   Super   · Audit Log
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PageShell, GlassCard, SectionTitle, DataTable, Badge, Icon, Button, Field, Notice,
} from '../components/ui.jsx'
import { useErp } from '../store/erpStore.js'

// ── shared modal ──────────────────────────────────────────────
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="surface w-full max-w-md rounded-xl p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-navy">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-navy"><Icon name="X" size={18} /></button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

// ── Admin · User Management ───────────────────────────────────
function UserManagement({ roleFilter, title, icon }) {
  const users = useErp((s) => s.users)
  const addUser = useErp((s) => s.addUser)
  const updateUser = useErp((s) => s.updateUser)
  const deleteUser = useErp((s) => s.deleteUser)

  const [modal, setModal] = useState(null) // {mode:'add'|'edit', user}
  const [form, setForm] = useState({ name: '', email: '', dept: 'CSE', status: 'Active' })
  const list = users.filter((u) => u.role === roleFilter)

  const openAdd = () => { setForm({ name: '', email: '', dept: 'CSE', status: 'Active' }); setModal({ mode: 'add' }) }
  const openEdit = (u) => { setForm({ name: u.name, email: u.email, dept: u.dept, status: u.status }); setModal({ mode: 'edit', user: u }) }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  function save() {
    if (!form.name.trim() || !form.email.trim()) return
    if (modal.mode === 'add') addUser({ ...form, role: roleFilter })
    else updateUser(modal.user.id, form)
    setModal(null)
  }

  return (
    <PageShell
      icon={icon}
      title={title}
      subtitle={`${list.length} ${roleFilter.toLowerCase()} account(s) · live records`}
      action={<Button icon="UserPlus" onClick={openAdd}>Add {roleFilter}</Button>}
    >
      <GlassCard className="p-5">
        <SectionTitle icon="Table" title={`${roleFilter} Records`} />
        <DataTable
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'dept', label: 'Dept' },
            { key: 'status', label: 'Status', render: (u) => <Badge tone={u.status === 'Active' ? 'low' : 'medium'}>{u.status}</Badge> },
            { key: 'modules', label: 'Modules', render: (u) => <span className="text-xs text-slate-500">{u.modules?.length || 0} enabled</span> },
            { key: 'actions', label: '', align: 'right', render: (u) => (
              <div className="flex justify-end gap-1">
                <button onClick={() => openEdit(u)} className="grid h-7 w-7 place-items-center rounded-md text-slate-500 hover:bg-sky-50 hover:text-navy" title="Edit">
                  <Icon name="Pencil" size={14} />
                </button>
                <button onClick={() => deleteUser(u.id)} className="grid h-7 w-7 place-items-center rounded-md text-slate-500 hover:bg-red-50 hover:text-red-600" title="Delete">
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            ) },
          ]}
          rows={list}
          empty={`No ${roleFilter.toLowerCase()} accounts yet — add one above.`}
        />
      </GlassCard>

      <AnimatePresence>
        {modal && (
          <Modal title={modal.mode === 'add' ? `Add ${roleFilter}` : `Edit ${roleFilter}`} onClose={() => setModal(null)}>
            <div className="space-y-3">
              <Field label="Full Name *" value={form.name} onChange={set('name')} placeholder="Enter name" />
              <Field label="Email *" type="email" value={form.email} onChange={set('email')} placeholder="name@sparkerp.edu" />
              <Field label="Department" type="select" value={form.dept} onChange={set('dept')}
                options={['CSE', 'ECE', 'MECH', 'CIVIL', 'IT', 'BIO', 'MGMT', 'Registrar']} />
              <Field label="Status" type="select" value={form.status} onChange={set('status')}
                options={['Active', 'Inactive', 'Suspended']} />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button>
              <Button icon="Check" onClick={save}>{modal.mode === 'add' ? 'Create' : 'Save'}</Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

export const StudentManagement = () =>
  <UserManagement roleFilter="Student" title="Student Management" icon="Users" />
export const StaffManagement = () =>
  <UserManagement roleFilter="Staff" title="Staff Management" icon="UserCog" />

// ── Staff · Internal Marks Entry ──────────────────────────────
export function MarksEntry() {
  const marks = useErp((s) => s.marks)
  const updateMark = useErp((s) => s.updateMark)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ ct1: 0, ct2: 0, assignment: 0 })

  const openEdit = (m) => { setForm({ ct1: m.ct1, ct2: m.ct2, assignment: m.assignment }); setEdit(m) }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: Number(e.target.value) }))
  const total = (m) => m.ct1 + m.ct2 + m.assignment

  function save() {
    updateMark(edit.id, form)
    setEdit(null)
  }

  return (
    <PageShell
      icon="ClipboardEdit"
      title="Internal Marks Entry"
      subtitle="Enter and update continuous-assessment marks · changes persist live"
    >
      <div className="mb-4"><Notice tone="info">Marks are out of 50 (CT-1 25 · CT-2 25 · Assignment 10). Click a row to edit.</Notice></div>
      <GlassCard className="p-5">
        <SectionTitle icon="Table" title="Computer Networks — Section C1" />
        <DataTable
          columns={[
            { key: 'student', label: 'Student' },
            { key: 'ct1', label: 'CT-1', align: 'right' },
            { key: 'ct2', label: 'CT-2', align: 'right' },
            { key: 'assignment', label: 'Assignment', align: 'right' },
            { key: 'total', label: 'Total', align: 'right', render: (m) => <b className="text-navy">{total(m)}/60</b> },
            { key: 'actions', label: '', align: 'right', render: (m) => (
              <button onClick={() => openEdit(m)} className="rounded-md bg-sky-50 px-2.5 py-1 text-xs font-semibold text-navy hover:bg-sky-100">
                Edit
              </button>
            ) },
          ]}
          rows={marks}
        />
      </GlassCard>

      <AnimatePresence>
        {edit && (
          <Modal title={`Edit Marks — ${edit.student}`} onClose={() => setEdit(null)}>
            <div className="grid grid-cols-3 gap-3">
              <Field label="CT-1" type="number" value={form.ct1} onChange={set('ct1')} />
              <Field label="CT-2" type="number" value={form.ct2} onChange={set('ct2')} />
              <Field label="Assignment" type="number" value={form.assignment} onChange={set('assignment')} />
            </div>
            <p className="mt-3 text-sm text-slate-500">
              New total: <b className="text-navy">{form.ct1 + form.ct2 + form.assignment}/60</b>
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEdit(null)}>Cancel</Button>
              <Button icon="Check" onClick={save}>Save Marks</Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

// ── Super Admin · Audit Log ───────────────────────────────────
export function AuditLog() {
  const audit = useErp((s) => s.audit)
  const resetAll = useErp((s) => s.resetAll)

  return (
    <PageShell
      icon="ScrollText"
      title="Audit Log"
      subtitle={`${audit.length} recorded action(s) · every CRUD operation is logged`}
      action={<Button variant="danger" icon="RotateCcw" onClick={resetAll}>Reset Demo Data</Button>}
    >
      <GlassCard className="p-5">
        <SectionTitle icon="History" title="System Activity" />
        <div className="space-y-2">
          {audit.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.4) }}
              className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-sky-50 text-navy">
                <Icon name="Activity" size={15} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-700">{a.action}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  {a.actor} · {new Date(a.time).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  )
}
