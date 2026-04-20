import { useState, useEffect } from 'react'

// §2 Slice 3.1 — OnboardingFlow. Three inline steps, no skeleton behind them.
// Card sits on cream page, vertically positioned at ~40% from top of content area.
// Design tokens: text-coral (kicker), font-display text-forest (headline),
// text-slate (body), bg-coral text-cream (CTA button), rounded-xl, border-border.

type Step = 'greeting' | 'tz' | 'notif'

const COMMON_TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
  'Asia/Kolkata',
  'Asia/Dubai',
  'Europe/London',
  'Europe/Paris',
  'Australia/Sydney',
]

function prettyTzLabel(tz: string) {
  return tz.split('/').pop()!.replace(/_/g, ' ')
}

export default function OnboardingFlow({
  firstName = 'Sarah',
  cohortName = 'Cohort 1 · June 2–4',
  whatsappOptedInAtCheckout = true,
  onComplete,
}: {
  firstName?: string
  cohortName?: string
  whatsappOptedInAtCheckout?: boolean
  onComplete?: () => void
}) {
  const [step, setStep] = useState<Step>('greeting')
  const [timezone, setTimezone] = useState('America/New_York')
  const [prefs, setPrefs] = useState({
    email: true,
    whatsapp: whatsappOptedInAtCheckout,
    sms: false,
  })

  // Session Day 1 = June 2 2026 7 PM ET = 23:00 UTC
  const day1Utc = new Date('2026-06-02T23:00:00Z')

  return (
    <div className="flex items-start justify-center min-h-[calc(100vh-220px)] pt-12 px-6">
      <div className="w-full max-w-xl">
        {step === 'greeting' && (
          <StepGreeting
            firstName={firstName}
            cohortName={cohortName}
            day1Utc={day1Utc}
            onContinue={() => setStep('tz')}
          />
        )}
        {step === 'tz' && (
          <StepTimezone
            value={timezone}
            onChange={setTimezone}
            day1Utc={day1Utc}
            onContinue={() => setStep('notif')}
          />
        )}
        {step === 'notif' && (
          <StepNotifications
            prefs={prefs}
            onChange={setPrefs}
            whatsappOptedInAtCheckout={whatsappOptedInAtCheckout}
            onComplete={() => onComplete?.()}
          />
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Step 1 — Greeting
// ─────────────────────────────────────────────
function StepGreeting({
  firstName,
  cohortName,
  day1Utc,
  onContinue,
}: {
  firstName: string
  cohortName: string
  day1Utc: Date
  onContinue: () => void
}) {
  const sessionDateStr = day1Utc.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'America/New_York' })

  return (
    <div className="bg-white border border-border rounded-xl p-10">
      <p className="font-mono text-xs tracking-widest text-coral uppercase mb-4">
        Welcome to the program
      </p>
      <h1 className="font-display text-4xl font-light text-forest mb-3 leading-tight">
        Hi, {firstName}.
      </h1>
      <p className="text-slate text-base leading-relaxed mb-8">
        We're going to spend the next two weeks getting you ready, then three nights
        together starting {sessionDateStr}. Before any of that — two quick things to
        set up. Takes about 60 seconds.
      </p>
      <p className="text-[13px] text-slate/70 italic mb-6">
        {cohortName} · {sessionDateStr} at 7:00 PM ET
      </p>
      <button
        onClick={onContinue}
        className="w-full bg-coral text-cream rounded-full py-4 px-8 font-medium hover:bg-rust transition-colors"
      >
        Let's go →
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────
// Step 2 — Time zone
// ─────────────────────────────────────────────
function StepTimezone({
  value,
  onChange,
  day1Utc,
  onContinue,
}: {
  value: string
  onChange: (tz: string) => void
  day1Utc: Date
  onContinue: () => void
}) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
      onChange(detected)
    } catch {
      // keep default
    }
  }, [])

  const localStartTime = day1Utc.toLocaleString('en-US', {
    timeZone: value,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const localStartDate = day1Utc.toLocaleDateString('en-US', {
    timeZone: value,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 400))
    onContinue()
  }

  return (
    <div className="bg-white border border-border rounded-xl p-10">
      <p className="font-mono text-xs tracking-widest text-coral uppercase mb-4">
        Step 1 of 2
      </p>
      <h2 className="font-display text-3xl font-light text-forest mb-3 leading-tight">
        What time zone are you in?
      </h2>
      <p className="text-slate text-sm leading-relaxed mb-6">
        Sessions run 7:00–8:15 PM Eastern. We'll always show times in your local zone so you
        don't have to do math at 6:55 PM.
      </p>

      <div className="bg-cream rounded-xl p-5 mb-6">
        <p className="font-mono text-[10px] tracking-widest text-slate/60 uppercase mb-2">
          Detected
        </p>
        <p className="font-display text-2xl font-light text-forest">{prettyTzLabel(value)}</p>
        <p className="text-sm text-slate mt-2">
          For you, Day 1 is{' '}
          <strong className="text-forest">
            {localStartDate} at {localStartTime}
          </strong>
          .
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-coral text-cream rounded-full py-4 px-8 font-medium hover:bg-rust transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : "Yes, that's right →"}
        </button>

        {!showDropdown ? (
          <button
            onClick={() => setShowDropdown(true)}
            className="w-full text-slate text-sm py-2 hover:text-forest transition-colors"
          >
            That's not me — change time zone
          </button>
        ) : (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm text-forest focus:border-forest focus:outline-none"
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {prettyTzLabel(tz)} ({tz})
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Step 3 — Notification preferences
// ─────────────────────────────────────────────
function StepNotifications({
  prefs,
  onChange,
  whatsappOptedInAtCheckout,
  onComplete,
}: {
  prefs: { email: boolean; whatsapp: boolean; sms: boolean }
  onChange: (p: typeof prefs) => void
  whatsappOptedInAtCheckout: boolean
  onComplete: () => void
}) {
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    onComplete()
  }

  return (
    <div className="bg-white border border-border rounded-xl p-10">
      <p className="font-mono text-xs tracking-widest text-coral uppercase mb-4">
        Step 2 of 2
      </p>
      <h2 className="font-display text-3xl font-light text-forest mb-3 leading-tight">
        How should we reach you?
      </h2>
      <p className="text-slate text-sm leading-relaxed mb-6">
        Coach Kai will send short nudges between now and Day 1. You can change any of this
        anytime in Account.
      </p>

      <div className="space-y-3 mb-8">
        <Toggle
          label="Email"
          sublabel="Session reminders, intake nudges, your Patient Advocacy Document"
          checked={prefs.email}
          onChange={(v) => onChange({ ...prefs, email: v })}
          recommended
        />
        <Toggle
          label="WhatsApp from Coach Kai"
          sublabel={
            whatsappOptedInAtCheckout
              ? 'Short messages, never spam'
              : "Turn on to receive Kai's messages"
          }
          checked={prefs.whatsapp}
          onChange={(v) => onChange({ ...prefs, whatsapp: v })}
          recommended={whatsappOptedInAtCheckout}
        />
        <Toggle
          label="SMS as backup"
          sublabel="Only for time-sensitive reminders if WhatsApp doesn't deliver"
          checked={prefs.sms}
          onChange={(v) => onChange({ ...prefs, sms: v })}
        />
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="w-full bg-coral text-cream rounded-full py-4 px-8 font-medium hover:bg-rust transition-colors disabled:opacity-50"
      >
        {saving ? 'Setting up your dashboard…' : 'Take me to my dashboard →'}
      </button>
    </div>
  )
}

function Toggle({
  label,
  sublabel,
  checked,
  onChange,
  recommended,
}: {
  label: string
  sublabel: string
  checked: boolean
  onChange: (v: boolean) => void
  recommended?: boolean
}) {
  return (
    <label
      className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
        checked ? 'border-forest bg-sand/40' : 'border-border bg-white hover:bg-sand/30'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 accent-coral cursor-pointer"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-forest text-sm">{label}</span>
          {recommended && (
            <span className="font-mono text-[10px] text-sage uppercase tracking-widest">
              Recommended
            </span>
          )}
        </div>
        <p className="text-xs text-slate mt-0.5 leading-relaxed">{sublabel}</p>
      </div>
    </label>
  )
}
