import { useState } from 'react'
import { PageShell, H1, Mono, PrimaryButton } from '../ui'

// §10.4 Mukta handoff — India members
export default function MuktaReferral() {
  const [city, setCity] = useState('')
  const [topConcern, setTopConcern] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <PageShell maxWidth="max-w-xl">
        <div className="bg-forest text-cream rounded-2xl p-10 text-center">
          <div className="font-display text-[30px] mb-2">Dr. Mukta's team will be in touch shortly.</div>
          <p className="text-body-sm text-cream/70 mt-2">
            Dr. Mukta's clinic in Pune handles India referrals. They'll reach you on WhatsApp within 48 hours.
          </p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell maxWidth="max-w-xl">
      <Mono className="block mb-2 text-coral">Dr. Mukta · India intake</Mono>
      <H1>For India members.</H1>
      <p className="text-body-md text-slate mb-8">
        Dr. Mukta's clinic in Pune handles referrals for India-based members. 15-min consult on Coach Kai's
        recommendation, no obligation.
      </p>

      <div className="space-y-5 mb-10">
        <div>
          <Mono className="block mb-2">City</Mono>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Mumbai / Delhi / Bangalore / Pune / Other"
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] focus:border-forest focus:outline-none"
          />
        </div>
        <div>
          <Mono className="block mb-2">Top concern from your document</Mono>
          <textarea
            value={topConcern}
            onChange={(e) => setTopConcern(e.target.value)}
            rows={3}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[15px] focus:border-forest focus:outline-none"
          />
        </div>
      </div>

      <PrimaryButton onClick={() => setSubmitted(true)} disabled={!city}>
        Forward my info →
      </PrimaryButton>
    </PageShell>
  )
}
