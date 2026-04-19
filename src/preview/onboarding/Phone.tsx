import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell, ProgressBar, H1, Lede, PrimaryButton, TextInput } from '../ui'

// §3 · Step 2 — /onboarding/phone
// Prod: POST /api/onboarding/phone → triggers hormone_welcome_v1 WhatsApp template
export default function OnboardingPhone() {
  const nav = useNavigate()
  const [country, setCountry] = useState('+1')
  const [phone, setPhone] = useState('')

  const valid = phone.replace(/\D/g, '').length >= 10

  return (
    <PageShell maxWidth="max-w-xl">
      <ProgressBar value={2} total={5} />
      <H1>What number should we reach you on?</H1>
      <Lede>
        This is how Coach Kai will be in touch — short, useful nudges on WhatsApp, never spam. You
        can adjust frequency anytime.
      </Lede>

      <div className="flex gap-3 mb-4">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-white border border-border rounded-xl px-3 py-3 text-[15px] text-ink focus:border-forest focus:outline-none"
        >
          <option value="+1">🇺🇸 +1</option>
          <option value="+91">🇮🇳 +91</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+61">🇦🇺 +61</option>
        </select>
        <div className="flex-1">
          <TextInput
            label="Phone number"
            placeholder="555 123 4567"
            value={phone}
            onChange={setPhone}
            type="tel"
          />
        </div>
      </div>

      <div className="text-[12px] text-slate italic mb-10">
        Validated with <span className="font-mono">libphonenumber-js</span>. Stored as E.164:{' '}
        <span className="font-mono text-forest">{valid ? country + phone.replace(/\D/g, '') : '…'}</span>
      </div>

      <PrimaryButton disabled={!valid} onClick={() => nav('/preview/onboarding/whatsapp')}>
        Continue →
      </PrimaryButton>
    </PageShell>
  )
}
