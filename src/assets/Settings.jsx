import { useState } from 'react'
import { GlassCard, SectionTitle, Button } from '../components/ui.jsx'
import { ASSET_CATEGORIES } from '../data/assetsData.js'

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${value ? 'bg-[#1A2E8F]' : 'bg-slate-200'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function AssetSettings() {
  const [depreciation, setDepreciation] = useState('Written Down Value')
  const [auditFreq, setAuditFreq] = useState('Annual')
  const [autoAlerts, setAutoAlerts] = useState(true)
  const [qrEnabled, setQrEnabled] = useState(true)
  const [barcode, setBarcode] = useState(false)

  return (
    <div className="page-enter space-y-6">
      <div className="page-hero px-6 py-5">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F5B800' }}>Asset Management</p>
            <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-white">Settings</h1>
            <p className="mt-1 text-sm text-white/70">Configure depreciation, tagging, audit, and category rules</p>
          </div>
          <Button variant="gold" icon="Save" size="sm">Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle icon="TrendingDown" title="Depreciation Settings" subtitle="Accounting method for assets" />
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-semibold text-navy">Depreciation Method</label>
              <select value={depreciation} onChange={(e) => setDepreciation(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option>Written Down Value</option>
                <option>Straight Line Method</option>
              </select>
              <p className="mt-1 text-[11px] text-slate-400">As per Companies Act 2013 Schedule II</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-navy">Physical Audit Frequency</label>
              <select value={auditFreq} onChange={(e) => setAuditFreq(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#E3E8F4] bg-white py-2 px-3 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option>Annual</option>
                <option>Half-yearly</option>
                <option>Quarterly</option>
              </select>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon="Tag" title="Asset Tagging" subtitle="QR code and barcode configuration" />
          <div className="mt-4 space-y-4">
            {[
              { label: 'QR Code Tagging',       val: qrEnabled,  set: setQrEnabled,  desc: 'Generate QR codes for new assets' },
              { label: 'Barcode Scanning',       val: barcode,    set: setBarcode,    desc: 'Enable barcode scanner for mobile app' },
              { label: 'Maintenance Alerts',     val: autoAlerts, set: setAutoAlerts, desc: 'Email alerts when maintenance is due' },
            ].map((t) => (
              <div key={t.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-navy">{t.label}</p>
                  <p className="text-[11px] text-slate-400">{t.desc}</p>
                </div>
                <Toggle value={t.val} onChange={t.set} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="LayoutGrid" title="Asset Categories" subtitle="Depreciation rates per category" />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E3E8F4]">
                  {['Category', 'Total Assets', 'Gross Value', 'Depreciation Rate', 'Useful Life'].map((h) => (
                    <th key={h} className="pb-2 pr-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { ...ASSET_CATEGORIES[0], rate: '33.33%', life: '3 years'  },
                  { ...ASSET_CATEGORIES[1], rate: '15%',    life: '15 years' },
                  { ...ASSET_CATEGORIES[2], rate: '10%',    life: '10 years' },
                  { ...ASSET_CATEGORIES[3], rate: '10%',    life: '10 years' },
                  { ...ASSET_CATEGORIES[4], rate: '20%',    life: '5 years'  },
                  { ...ASSET_CATEGORIES[5], rate: '15%',    life: '7 years'  },
                  { ...ASSET_CATEGORIES[6], rate: '20%',    life: '8 years'  },
                  { ...ASSET_CATEGORIES[7], rate: '10%',    life: '10 years' },
                ].map((c) => (
                  <tr key={c.cat} className="border-b border-[#F4F6FC] hover:bg-[#F6F8FD]">
                    <td className="py-2.5 pr-4 text-xs font-semibold text-navy">{c.cat}</td>
                    <td className="py-2.5 pr-4 text-xs text-slate-600">{c.count.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-navy">₹{(c.value / 10000000).toFixed(2)} Cr</td>
                    <td className="py-2.5 pr-4 text-xs font-bold text-[#1A2E8F]">{c.rate}</td>
                    <td className="py-2.5 pr-4 text-xs text-slate-500">{c.life}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
