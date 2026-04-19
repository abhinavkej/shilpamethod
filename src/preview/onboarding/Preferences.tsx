import { useState } from 'react'
import { PageShell, ProgressBar, H1, PrimaryButton, Toggle } from '../ui'

// §3 · Step 5 — /onboarding/preferences
// On submit: POST /api/onboarding/preferences → onboardingCompletedAt = now()
export default function OnboardingPreferences() {
  const [email, setEmail] = useState(true)
  const [whatsapp, setWhatsapp] = useState(true)
  const [sms, setSms] = useState(false)

  return (
    <PageShell maxWidth="max-w-xl">
      <ProgressBar value={5} total={5} />
      <H1>How would you like to hear from us?</H1>

      <div className="bg-white border border-border rounded-2xl px-6 mb-6">
        <Toggle
          label="Email reminders for sessions and intake"
          description="Recommended — the only way to reliably reach you on Day 1 if WhatsApp hiccups."
          value={email}
          onChange={setEmail}
        />
        <Toggle
          label="WhatsApp from Coach Kai"
          description="Recommended — short nudges, reflections, Q&A between sessions."
          value={whatsapp}
          onChange={setWhatsapp}
        />
        <Toggle
          label="SMS as backup"
          description="Only fires if email and WhatsApp both fail. Off by default."
          value={sms}
          onChange={setSms}
        />
      </div>

      <p className="text-[13px] text-slate italic mb-10">You can change these anytime in Account.</p>

      <PrimaryButton to="/preview/dashboard">Take me to my dashboard →</PrimaryButton>
    </PageShell>
  )
}
