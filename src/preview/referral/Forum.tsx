import { useState } from 'react'
import { PageShell, H1, Mono, PrimaryButton } from '../ui'

// §10.3 Forum Health handoff — US members
export default function ForumReferral() {
  const [state, setState] = useState('')
  const [insurance, setInsurance] = useState('')
  const [topConcern, setTopConcern] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <PageShell maxWidth="max-w-xl">
        <div className="bg-forest text-cream rounded-2xl p-10 text-center">
          <div className="font-display text-[30px] mb-2">Forum Health will reach out within 48h.</div>
          <p className="text-body-sm text-cream/70 mt-2">
            They'll confirm availability in {state || 'your state'} and schedule a 15-min consult on Coach Kai's
            recommendation. No obligation.
          </p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell maxWidth="max-w-xl">
      <Mono className="block mb-2 text-coral">Forum Health · US intake</Mono>
      <H1>Forum Health was built for exactly this conversation.</H1>
      <p className="text-body-md text-slate mb-8">
        15-min consult on Coach Kai's recommendation, no obligation. Forum Health's functional-medicine-trained
        clinicians work with your existing insurance where possible.
      </p>

      <div className="space-y-5 mb-10">
        <div>
          <Mono className="block mb-2">State</Mono>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] focus:border-forest focus:outline-none"
          >
            <option value="">Select your state</option>
            <option>California</option>
            <option>New York</option>
            <option>Texas</option>
            <option>Florida</option>
            <option>Washington</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <Mono className="block mb-2">Insurance</Mono>
          <div className="flex flex-wrap gap-2">
            {['United', 'Aetna', 'BCBS', 'Cigna', 'Kaiser', 'Self-pay', 'Other'].map((ins) => (
              <button
                key={ins}
                onClick={() => setInsurance(ins)}
                className={`text-[13px] px-4 py-1.5 rounded-full border ${
                  insurance === ins
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-white text-slate border-border hover:border-forest'
                }`}
              >
                {ins}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Mono className="block mb-2">Top concern from your document</Mono>
          <textarea
            value={topConcern}
            onChange={(e) => setTopConcern(e.target.value)}
            rows={3}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] focus:border-forest focus:outline-none"
            placeholder="e.g., Clotting risk means I need transdermal estrogen options — my OB-GYN only offered oral."
          />
        </div>
      </div>

      <PrimaryButton onClick={() => setSubmitted(true)} disabled={!state}>
        Forward my info to Forum Health →
      </PrimaryButton>
      <p className="text-[12px] text-slate italic mt-3">
        In production this POSTs to <span className="font-mono">/api/forum-referral</span>, which forwards to Forum
        Health's CRM or emails Lisa for Cohort 1. Updates{' '}
        <span className="font-mono">appointmentTracker.needsForumReferral = true</span>.
      </p>
    </PageShell>
  )
}
