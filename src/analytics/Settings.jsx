import { useState } from 'react'
import { Icon } from '../components/ui.jsx'
import { SectionCard } from './parts.jsx'

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)}
      className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${on ? 'bg-[#1A2E8F]' : 'bg-slate-200'}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  )
}

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E3E8F4] bg-white px-4 py-3.5">
      <div>
        <p className="text-sm font-semibold text-navy">{label}</p>
        {desc && <p className="mt-0.5 text-xs text-slate-400">{desc}</p>}
      </div>
      {children}
    </div>
  )
}

export default function AnalyticsSettings() {
  const [refreshInterval, setRefreshInterval] = useState('5min')
  const [defaultChart, setDefaultChart]       = useState('area')
  const [academicYear, setAcademicYear]       = useState('2024-25')

  const [notifs, setNotifs] = useState({
    passRateAlert:   true,
    feeDefaultAlert: true,
    placementUpdate: true,
    hostelAlert:     false,
    monthlyDigest:   true,
  })
  const [access, setAccess] = useState({
    principalView: true,
    hodView:       true,
    staffView:     false,
    studentView:   false,
  })

  const toggle = (key) => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))
  const toggleAccess = (key) => setAccess((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="page-enter space-y-6">
      <div>
        <p className="module-eyebrow">Analytics Settings</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">Analytics Configuration</h1>
        <p className="mt-1 text-sm text-slate-500">Data refresh, chart preferences, and access control</p>
      </div>

      {/* Data settings */}
      <SectionCard icon="Database" title="Data Configuration" subtitle="Refresh frequency and academic year">
        <div className="space-y-3">
          <SettingRow label="Academic Year" desc="Data displayed across all analytics pages">
            <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}
              className="rounded-lg border border-[#E3E8F4] bg-white px-3 py-1.5 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-[#F5B800]/30 focus:border-[#F5B800]">
              <option>2024-25</option>
              <option>2023-24</option>
              <option>2022-23</option>
            </select>
          </SettingRow>
          <SettingRow label="Data Refresh Interval" desc="How often live data is pulled from modules">
            <select value={refreshInterval} onChange={(e) => setRefreshInterval(e.target.value)}
              className="rounded-lg border border-[#E3E8F4] bg-white px-3 py-1.5 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-[#F5B800]/30 focus:border-[#F5B800]">
              <option value="1min">Every 1 minute</option>
              <option value="5min">Every 5 minutes</option>
              <option value="15min">Every 15 minutes</option>
              <option value="1hr">Every 1 hour</option>
              <option value="manual">Manual only</option>
            </select>
          </SettingRow>
          <SettingRow label="Default Chart Type" desc="Preferred chart style for trend data">
            <select value={defaultChart} onChange={(e) => setDefaultChart(e.target.value)}
              className="rounded-lg border border-[#E3E8F4] bg-white px-3 py-1.5 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-[#F5B800]/30 focus:border-[#F5B800]">
              <option value="area">Area Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
            </select>
          </SettingRow>
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard icon="Bell" title="Alert Notifications" subtitle="Automated alerts for key thresholds">
        <div className="space-y-3">
          {[
            { key: 'passRateAlert',   label: 'Pass Rate Drop Alert',       desc: 'Notify when dept pass rate falls below 85%'      },
            { key: 'feeDefaultAlert', label: 'Fee Default Alert',          desc: 'Alert when monthly collection falls below 80%'   },
            { key: 'placementUpdate', label: 'Placement Milestone Update', desc: 'Notify when placement rate crosses 90%'          },
            { key: 'hostelAlert',     label: 'Hostel Capacity Alert',      desc: 'Alert when occupancy exceeds 95%'                },
            { key: 'monthlyDigest',   label: 'Monthly Analytics Digest',   desc: 'Email digest of key metrics every month'        },
          ].map((n) => (
            <SettingRow key={n.key} label={n.label} desc={n.desc}>
              <Toggle on={notifs[n.key]} onChange={() => toggle(n.key)} />
            </SettingRow>
          ))}
        </div>
      </SectionCard>

      {/* Access control */}
      <SectionCard icon="ShieldCheck" title="Dashboard Access Control" subtitle="Who can view analytics pages">
        <div className="space-y-3">
          {[
            { key: 'principalView', label: 'Principal / Director', desc: 'Full access to all analytics pages'         },
            { key: 'hodView',       label: 'Head of Department',   desc: 'Access to own department data only'        },
            { key: 'staffView',     label: 'Teaching Staff',       desc: 'Limited to academic analytics'             },
            { key: 'studentView',   label: 'Students',             desc: 'Access to own performance data only'       },
          ].map((a) => (
            <SettingRow key={a.key} label={a.label} desc={a.desc}>
              <Toggle on={access[a.key]} onChange={() => toggleAccess(a.key)} />
            </SettingRow>
          ))}
        </div>
      </SectionCard>

      {/* Data export */}
      <SectionCard icon="Download" title="Data Export Preferences" subtitle="Format and delivery options for report exports">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'PDF Reports',   desc: 'Formatted printable reports', icon: 'FileText', active: true  },
            { label: 'Excel Sheets',  desc: 'Raw data for further analysis', icon: 'Sheet',  active: true  },
            { label: 'Email Delivery',desc: 'Reports emailed automatically', icon: 'Mail',   active: false },
          ].map((opt) => (
            <div key={opt.label} className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
              opt.active ? 'border-[#1A2E8F] bg-[#EBF0FB]' : 'border-[#E3E8F4] bg-white'
            }`}>
              <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${opt.active ? 'bg-[#1A2E8F] text-white' : 'bg-slate-100 text-slate-400'}`}>
                <Icon name={opt.icon} size={16} strokeWidth={2.2} />
              </div>
              <div>
                <p className={`text-sm font-bold ${opt.active ? 'text-navy' : 'text-slate-500'}`}>{opt.label}</p>
                <p className="text-xs text-slate-400">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Save */}
      <div className="flex justify-end gap-3 pt-2">
        <button className="rounded-xl border border-[#E3E8F4] bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
          Reset Defaults
        </button>
        <button className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white brand-gradient hover:opacity-90 transition-all">
          <Icon name="Save" size={15} />
          Save Settings
        </button>
      </div>
    </div>
  )
}
