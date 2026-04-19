import { useState } from 'react'
import { PageShell, H1, Mono, Toggle } from '../ui'

// §7.11 — /account
export default function Account() {
  const [email, setEmail] = useState(true)
  const [whatsapp, setWhatsapp] = useState(true)
  const [sms, setSms] = useState(false)

  return (
    <PageShell maxWidth="max-w-2xl">
      <Mono className="block mb-2 text-coral">Account</Mono>
      <H1>Your settings.</H1>

      <section className="mb-10">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Profile</div>
        <div className="bg-white border border-border rounded-2xl p-5 space-y-4">
          <Field label="First name" value="Sarah" />
          <Field label="Last name" value="Chen" />
          <Field label="Email (primary identifier)" value="test+member@shilpamethod.com" disabled />
          <Field label="Phone (E.164)" value="+14155550123" />
          <Field label="Country" value="US" />
          <Field label="Age range" value="45-49" />
          <Field label="Time zone" value="America/New_York" />
        </div>
      </section>

      <section className="mb-10">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Notifications</div>
        <div className="bg-white border border-border rounded-2xl px-5">
          <Toggle label="Email reminders" value={email} onChange={setEmail} />
          <Toggle label="WhatsApp from Coach Kai" value={whatsapp} onChange={setWhatsapp} />
          <Toggle label="SMS as backup" value={sms} onChange={setSms} />
        </div>
      </section>

      <section className="mb-10">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Refund</div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <p className="text-[14px] text-slate mb-3">
            Full refund if requested more than 24 hours before Day 1. Within 24 hours, you may transfer to the next
            cohort.
          </p>
          <button className="border border-border text-slate text-[13px] px-4 py-2 rounded-full hover:border-forest hover:text-forest">
            Request refund
          </button>
        </div>
      </section>

      <section>
        <button className="text-[14px] text-slate hover:text-forest">Sign out</button>
      </section>
    </PageShell>
  )
}

function Field({ label, value, disabled }: { label: string; value: string; disabled?: boolean }) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-1">{label}</div>
      <input
        defaultValue={value}
        disabled={disabled}
        className="w-full bg-sand/30 border border-border rounded-lg px-3 py-2 text-[14px] text-forest disabled:opacity-70 focus:border-forest focus:bg-white focus:outline-none"
      />
    </label>
  )
}
