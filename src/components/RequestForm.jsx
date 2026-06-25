import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, Field, Button, Notice, Icon } from './ui.jsx'

// Reusable "raise a request / submit a form" page body used by
// the many certificate & service pages.
export default function RequestForm({
  fields = [],
  feeLabel,
  note,
  submitText = 'Submit Request',
  successText = 'Your request has been submitted successfully.',
}) {
  const [submitted, setSubmitted] = useState(false)
  const [refId] = useState(() => 'REQ-' + Math.floor(4000 + Math.random() * 5999))

  if (submitted) {
    return (
      <GlassCard className="p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Icon name="CheckCircle2" size={32} />
          </div>
          <h3 className="mt-4 text-lg font-bold text-navy">Request Submitted</h3>
          <p className="mt-1 text-sm text-slate-500">{successText}</p>
          <p className="mt-3 rounded-lg bg-slate-50 px-4 py-2 text-sm text-navy">
            Reference ID: <span className="font-bold text-accent">{refId}</span>
          </p>
          <Button variant="ghost" className="mt-5" onClick={() => setSubmitted(false)} icon="RotateCcw">
            Submit another
          </Button>
        </motion.div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-6">
      {note && <div className="mb-5"><Notice tone="info">{note}</Notice></div>}
      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {fields.map((f) => (
          <div key={f.label} className={f.full ? 'sm:col-span-2' : ''}>
            <Field
              label={f.label}
              type={f.type || 'text'}
              options={f.options}
              placeholder={f.placeholder}
              required={f.required !== false}
            />
          </div>
        ))}
        <div className="sm:col-span-2 mt-1 flex flex-wrap items-center justify-between gap-3">
          {feeLabel ? (
            <span className="text-sm text-slate-500">
              Applicable fee: <span className="font-bold text-navy">{feeLabel}</span>
            </span>
          ) : <span />}
          <Button type="submit" icon="Send">{submitText}</Button>
        </div>
      </form>
    </GlassCard>
  )
}
