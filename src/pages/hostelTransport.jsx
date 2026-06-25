// Hostel & Transport module.
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  PageShell, GlassCard, InfoGrid, DataTable, Icon, Notice, Button, Badge, SectionTitle,
} from '../components/ui.jsx'
import {
  HOSTEL, HOSTEL_BLOCKS, TRANSPORT, TRANSPORT_ROUTES,
} from '../data/portalData.js'

const inr = (n) => '₹' + n.toLocaleString('en-IN')

// ── Hostel Details ────────────────────────────────────────────
export function HostelDetails() {
  return (
    <PageShell icon="Building2" title="Hostel Details" subtitle="Your current hostel allotment">
      {!HOSTEL.feePaid && (
        <div className="mb-4"><Notice tone="warn">Your hostel fee is pending. Please clear it from the Fee Payment page.</Notice></div>
      )}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center p-6 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl brand-gradient">
            <Icon name="BedDouble" size={28} className="text-navy" />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-navy">{HOSTEL.roomNo}</p>
          <p className="text-xs text-slate-500">{HOSTEL.block}</p>
          <span className="mt-2 rounded-full bg-sky-100 px-3 py-0.5 text-[11px] font-semibold text-accent">
            {HOSTEL.roomType}
          </span>
        </GlassCard>
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Info" title="Allotment Information" />
          <InfoGrid data={[
            { label: 'Block', value: HOSTEL.block },
            { label: 'Room Number', value: HOSTEL.roomNo },
            { label: 'Room Type', value: HOSTEL.roomType },
            { label: 'Floor', value: HOSTEL.floor },
            { label: 'Warden', value: HOSTEL.warden },
            { label: 'Mess Type', value: HOSTEL.messType },
            { label: 'Roommates', value: HOSTEL.roommates.join(', ') },
            { label: 'Fee Status', value: HOSTEL.feePaid ? 'Paid' : 'Pending' },
          ]} />
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Hostel Booking ────────────────────────────────────────────
export function HostelBooking() {
  const [booked, setBooked] = useState(null)
  return (
    <PageShell icon="BedDouble" title="Hostel Booking" subtitle="Book or change your hostel room for the next term">
      <div className="mb-4"><Notice tone="info">Select an available block. Allotment is confirmed after fee payment.</Notice></div>
      <div className="grid gap-4 sm:grid-cols-2">
        {HOSTEL_BLOCKS.map((b, i) => (
          <GlassCard key={b.name} delay={i * 0.07} className="p-5">
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-navy">
                <Icon name="Building2" size={20} />
              </div>
              <Badge tone={b.vacancy < 5 ? 'high' : b.vacancy < 12 ? 'medium' : 'low'}>
                {b.vacancy} beds left
              </Badge>
            </div>
            <h3 className="mt-3 text-sm font-bold text-navy">{b.name}</h3>
            <p className="text-xs text-slate-500">{b.type}</p>
            <p className="mt-2 text-xl font-extrabold text-navy">{inr(b.fee)}<span className="text-xs text-slate-500"> / year</span></p>
            <Button
              className="mt-3 w-full justify-center"
              variant={booked === i ? 'ghost' : 'primary'}
              icon={booked === i ? 'Check' : 'BedDouble'}
              onClick={() => setBooked(i)}
            >
              {booked === i ? 'Booking Requested' : 'Book This Block'}
            </Button>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  )
}

// ── Transport Details ─────────────────────────────────────────
export function TransportDetails() {
  return (
    <PageShell icon="Bus" title="Transport Details" subtitle="Your current bus route allotment">
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center p-6 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl brand-gradient">
            <Icon name="Bus" size={28} className="text-navy" />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-navy">{TRANSPORT.routeNo}</p>
          <p className="text-xs text-slate-500">{TRANSPORT.busNo}</p>
          <span className="mt-2 rounded-full bg-emerald-50 px-3 py-0.5 text-[11px] font-semibold text-emerald-600">
            Fee Paid
          </span>
        </GlassCard>
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle icon="Info" title="Route Information" />
          <InfoGrid data={[
            { label: 'Route Number', value: TRANSPORT.routeNo },
            { label: 'Bus Number', value: TRANSPORT.busNo },
            { label: 'Boarding Point', value: TRANSPORT.boardingPoint },
            { label: 'Driver', value: TRANSPORT.driver },
            { label: 'Pickup Time', value: TRANSPORT.pickupTime },
            { label: 'Drop Time', value: TRANSPORT.dropTime },
          ]} />
        </GlassCard>
      </div>
    </PageShell>
  )
}

// ── Transport Booking ─────────────────────────────────────────
export function TransportBooking() {
  const [booked, setBooked] = useState(null)
  return (
    <PageShell icon="MapPin" title="Transport Booking" subtitle="Book or change your bus route">
      <div className="mb-4"><Notice tone="info">Choose a route with available seats. Confirmation follows transport fee payment.</Notice></div>
      <GlassCard className="p-5">
        <DataTable
          columns={[
            { key: 'route', label: 'Route' },
            { key: 'area', label: 'Coverage Area' },
            { key: 'seats', label: 'Seats Left', render: (r) => (
              <Badge tone={r.seats < 5 ? 'high' : r.seats < 10 ? 'medium' : 'low'}>{r.seats}</Badge>
            ) },
            { key: 'fee', label: 'Annual Fee', align: 'right', render: (r) => inr(r.fee) },
            { key: 'action', label: '', align: 'right', render: (r) => {
              const i = TRANSPORT_ROUTES.indexOf(r)
              return (
                <button
                  onClick={() => setBooked(i)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    booked === i
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'brand-gradient text-white'
                  }`}
                >
                  {booked === i ? 'Requested' : 'Book'}
                </button>
              )
            } },
          ]}
          rows={TRANSPORT_ROUTES}
        />
      </GlassCard>
    </PageShell>
  )
}
