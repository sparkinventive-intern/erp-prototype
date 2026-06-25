import { useState } from 'react'
import { GlassCard, SectionTitle, Button, Field, Icon, Notice } from '../components/ui.jsx'

const TOGGLE = ({ on, onChange }) => (
  <button onClick={() => onChange(!on)}
    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${on ? 'bg-emerald-500' : 'bg-slate-200'}`}>
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`} />
  </button>
)

export default function TransportSettings() {
  const [saved, setSaved] = useState(false)
  const [gpsProvider, setGpsProvider] = useState('Google Maps Enterprise')
  const [updateInterval, setUpdateInterval] = useState('30')
  const [feeGrace, setFeeGrace] = useState('15')
  const [lateFine, setLateFine] = useState('50')
  const [maxCapacityAlert, setMaxCapacityAlert] = useState('95')
  const [serviceDueAlert, setServiceDueAlert] = useState('30')

  const [notifs, setNotifs] = useState({
    parentPickupAlert:   true,
    maintenanceDueAlert: true,
    feeReminderSMS:      true,
    gpsOfflineAlert:     true,
    dailyTripReport:     false,
  })
  const toggleNotif = (k) => setNotifs((n) => ({ ...n, [k]: !n[k] }))

  const [approvals, setApprovals] = useState({
    newRouteApproval:     true,
    feeWaiverApproval:    true,
    driverLeaveApproval:  false,
  })
  const toggleApproval = (k) => setApprovals((a) => ({ ...a, [k]: !a[k] }))

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="page-enter space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="module-eyebrow">Transport</p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight text-navy">Transport Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Configure GPS, fee policies, alerts, and approval workflows.</p>
        </div>
        <Button icon="Save" onClick={handleSave}>Save Settings</Button>
      </div>

      {saved && <Notice tone="success">Settings saved successfully.</Notice>}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* GPS Config */}
        <GlassCard className="p-5">
          <SectionTitle icon="Navigation" title="GPS Configuration" subtitle="Tracking provider and interval" />
          <div className="mt-4 space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">GPS Provider</label>
              <select value={gpsProvider} onChange={(e) => setGpsProvider(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option>Google Maps Enterprise</option>
                <option>Mapbox Telemetry</option>
                <option>Custom REST API</option>
                <option>ISRO NavIC</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Location Update Interval (seconds)</label>
              <select value={updateInterval} onChange={(e) => setUpdateInterval(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                {['10', '15', '30', '60'].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
            <Field label="Max Capacity Alert (%)" type="number" value={maxCapacityAlert} onChange={(e) => setMaxCapacityAlert(e.target.value)} />
          </div>
        </GlassCard>

        {/* Fee Policy */}
        <GlassCard className="p-5">
          <SectionTitle icon="Receipt" title="Fee Policy" subtitle="Collection rules and penalties" />
          <div className="mt-4 space-y-4">
            <Field label="Grace Period for Late Payment (days)" type="number" value={feeGrace} onChange={(e) => setFeeGrace(e.target.value)} />
            <Field label="Late Fine per Day (₹)" type="number" value={lateFine} onChange={(e) => setLateFine(e.target.value)} />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Fee Payment Modes</label>
              <div className="grid grid-cols-2 gap-2">
                {['Online Portal', 'DD / Cheque', 'Cash at Counter', 'UPI'].map((m) => (
                  <label key={m} className="flex items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-emerald-500" />
                    <span className="text-xs text-slate-600">{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Maintenance alerts */}
        <GlassCard className="p-5">
          <SectionTitle icon="Wrench" title="Maintenance Alerts" />
          <div className="mt-4 space-y-4">
            <Field label="Alert X days before service due" type="number" value={serviceDueAlert} onChange={(e) => setServiceDueAlert(e.target.value)} />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Default Service Interval</label>
              <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-[#F5B800]">
                <option>Every 5,000 km</option>
                <option>Every 3 months</option>
                <option>Every 6 months</option>
                <option>Annual only</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Default Vendor</label>
              <Field placeholder="Vendor / workshop name" />
            </div>
          </div>
        </GlassCard>

        {/* Notifications */}
        <GlassCard className="p-5">
          <SectionTitle icon="Bell" title="Notifications" />
          <div className="mt-4 space-y-3">
            {[
              { key: 'parentPickupAlert',   label: 'Parent pickup ETA alert (SMS)' },
              { key: 'maintenanceDueAlert', label: 'Maintenance due reminder' },
              { key: 'feeReminderSMS',      label: 'Fee due reminder SMS to parents' },
              { key: 'gpsOfflineAlert',     label: 'GPS device offline alert' },
              { key: 'dailyTripReport',     label: 'Daily trip report email to admin' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                <span className="text-sm text-slate-700">{label}</span>
                <TOGGLE on={notifs[key]} onChange={() => toggleNotif(key)} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Approval workflows */}
      <GlassCard className="p-5">
        <SectionTitle icon="CheckCircle" title="Approval Workflows" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { key: 'newRouteApproval',    label: 'New route creation requires HOD approval' },
            { key: 'feeWaiverApproval',   label: 'Fee waiver requires Principal approval'   },
            { key: 'driverLeaveApproval', label: 'Driver leave requires Transport Manager approval' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
              <span className="text-sm text-slate-700 max-w-[80%]">{label}</span>
              <TOGGLE on={approvals[key]} onChange={() => toggleApproval(key)} />
            </div>
          ))}
        </div>
      </GlassCard>

      <Notice tone="info">
        Changes to GPS provider or fee policy take effect from the next billing cycle. Contact system administrator for API key updates.
      </Notice>
    </div>
  )
}

