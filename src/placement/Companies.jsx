// ─────────────────────────────────────────────────────────────
// Placement Management → Companies.
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon } from '../components/ui.jsx'
import { StatusBadge, CompanyLogo } from './parts.jsx'
import usePlacement, { selCompanies } from '../store/placementStore.js'

export default function Companies() {
  const companies = usePlacement(selCompanies)
  const addCompany = usePlacement((s) => s.addCompany)
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name: '', industry: '', packageLPA: '', roles: '', depts: '' })

  const filtered = companies.filter((c) =>
    !query || c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.industry.toLowerCase().includes(query.toLowerCase()))

  function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    addCompany({
      name: form.name, industry: form.industry,
      packageLPA: parseFloat(form.packageLPA) || 0,
      roles: form.roles.split(',').map((r) => r.trim()).filter(Boolean),
      depts: form.depts.split(',').map((d) => d.trim()).filter(Boolean),
      logo: form.name.slice(0, 2).toUpperCase(),
    })
    setForm({ name: '', industry: '', packageLPA: '', roles: '', depts: '' })
    setShowForm(false)
  }

  return (
    <div className="page-enter space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-widest text-indigo-600">Placement</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Company Directory</h1>
          <p className="mt-1 text-sm text-slate-500">{companies.length} companies · {companies.filter((c) => c.status === 'Active').length} active this season</p>
        </div>
        <Button icon="Plus" onClick={() => setShowForm(!showForm)}>Add Company</Button>
      </div>

      {showForm && (
        <GlassCard className="p-5">
          <SectionTitle icon="Building2" title="Register New Company" />
          <form onSubmit={handleAdd} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Company Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Freshworks" required />
            <Field label="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="e.g. SaaS" />
            <Field label="Package (LPA)" type="number" value={form.packageLPA} onChange={(e) => setForm({ ...form, packageLPA: e.target.value })} placeholder="e.g. 6.5" />
            <Field label="Job Roles (comma-separated)" value={form.roles} onChange={(e) => setForm({ ...form, roles: e.target.value })} placeholder="Software Engineer, QA" />
            <Field label="Eligible Depts (comma-separated)" value={form.depts} onChange={(e) => setForm({ ...form, depts: e.target.value })} placeholder="CSE, IT, ECE" />
            <div className="flex items-end gap-2">
              <Button type="submit" icon="Save">Save</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </GlassCard>
      )}

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search companies…"
            className="focus-ring w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-navy placeholder:text-slate-400" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <GlassCard key={c.id} className={`p-5 cursor-pointer transition-all hover:shadow-float ${selected === c.id ? 'ring-2 ring-indigo-400' : ''}`}
            onClick={() => setSelected(selected === c.id ? null : c.id)}>
            <div className="flex items-start gap-3">
              <CompanyLogo letters={c.logo} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[15px] font-bold text-navy">{c.name}</p>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-xs text-slate-500">{c.industry}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">
              <div className="text-center">
                <p className="text-base font-bold text-navy">₹{c.packageLPA}L</p>
                <p className="text-2xs text-slate-400">Package</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-navy">{c.drives}</p>
                <p className="text-2xs text-slate-400">Drives</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-navy">{c.offers}</p>
                <p className="text-2xs text-slate-400">Offers</p>
              </div>
            </div>
            {selected === c.id && (
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-2xs font-semibold uppercase tracking-wide text-slate-400">Job Roles</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {c.roles.map((r) => (
                      <span key={r} className="rounded-full bg-indigo-50 px-2 py-0.5 text-2xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100">{r}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-2xs font-semibold uppercase tracking-wide text-slate-400">Eligible Departments</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {c.depts.map((d) => (
                      <span key={d} className="rounded-full bg-slate-100 px-2 py-0.5 text-2xs font-medium text-slate-600">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
