import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StructuralPreview from './StructuralPreview'

// §2 — First-time onboarding dashboard. Three inline steps, NOT separate routes.
// URL stays /dashboard throughout. State advances on client; persistence is just a
// stub here, but in prod each step POSTs to /api/onboarding/timezone and /preferences.

type Step = 'greeting' | 'tz' | 'notif' | 'done'

const COMMON_TZ = [
  { id: 'America/New_York', label: 'New York, USA' },
  { id: 'America/Chicago', label: 'Chicago, USA' },
  { id: 'America/Denver', label: 'Denver, USA' },
  { id: 'America/Los_Angeles', label: 'Los Angeles, USA' },
  { id: 'America/Anchorage', label: 'Anchorage, USA' },
  { id: 'Pacific/Honolulu', label: 'Honolulu, USA' },
  { id: 'Europe/London', label: 'London, UK' },
  { id: 'Europe/Paris', label: 'Paris, FR' },
  { id: 'Asia/Dubai', label: 'Dubai, UAE' },
  { id: 'Asia/Kolkata', label: 'Kolkata, India' },
  { id: 'Australia/Sydney', label: 'Sydney, AU' },
]

export default function OnboardingDashboard({
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

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      {/* Active card, max-w-xl */}
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 'greeting' && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <GreetingStep firstName={firstName} cohortName={cohortName} onContinue={() => setStep('tz')} />
            </motion.div>
          )}
          {step === 'tz' && (
            <motion.div
              key="tz"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <TimezoneStep onContinue={() => setStep('notif')} />
            </motion.div>
          )}
          {step === 'notif' && (
            <motion.div
              key="notif"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <NotificationsStep
                whatsappOptedInAtCheckout={whatsappOptedInAtCheckout}
                onComplete={() => {
                  setStep('done')
                  onComplete?.()
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Faded structural preview of the dashboard below */}
      <div className="opacity-25 pointer-events-none select-none filter blur-[1px]">
        <StructuralPreview />
      </div>
    </div>
  )
}

// ───────────────── Step 1: greeting ─────────────────
function GreetingStep({
  firstName,
  cohortName,
  onContinue,
}: {
  firstName: string
  cohortName: string
  onContinue: () => void
}) {
  const sessionDateStr = 'June 2'
  return (
    <div className="bg-white border border-border rounded-2xl p-8 md:p-10">
      <p className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">
        Welcome to the program
      </p>
      <h1 className="font-display text-[40px] md:text-[44px] text-forest leading-[1.05] mb-4">
        Hi, {firstName}.
      </h1>
      <p className="text-body-md text-slate leading-relaxed mb-6">
        We're going to spend the next two weeks getting you ready, then three nights together starting {sessionDateStr}. Before any of that — two quick things to set up. Takes about 60 seconds.
      </p>

      {/* Optional Shilpa video placeholder — TODO(areef): NEXT_PUBLIC_SHILPA_DASHBOARD_VIDEO_URL */}
      <div
        className="relative aspect-video bg-gradient-to-br from-forest to-ivy rounded-xl overflow-hidden mb-6 flex items-center justify-center"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 80%, #D97757 0%, transparent 50%), linear-gradient(135deg, #1F3A2E, #2D5445)',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center">
            <span className="text-forest text-[20px] ml-1">▶</span>
          </div>
          <div className="font-mono text-[10px] text-cream/80 tracking-widest uppercase">
            60 seconds with Dr. Saxena
          </div>
        </div>
      </div>

      <p className="text-[13px] text-slate italic mb-5">
        {cohortName} · {sessionDateStr} at 7:00 PM ET
      </p>

      <button
        onClick={onContinue}
        className="w-full bg-coral text-cream text-[15px] py-4 rounded-full hover:bg-rust transition-colors"
      >
        Let's go →
      </button>
    </div>
  )
}

// ───────────────── Step 2: time zone ─────────────────
function TimezoneStep({ onContinue }: { onContinue: () => void }) {
  const [detected, setDetected] = useState('America/New_York')
  const [selected, setSelected] = useState('America/New_York')
  const [dropdown, setDropdown] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      setDetected(tz)
      setSelected(tz)
    } catch {
      /* keep default */
    }
  }, [])

  const pretty = (tz: string) => {
    const match = COMMON_TZ.find((t) => t.id === tz)
    if (match) return match.label
    return tz.split('/').pop()!.replace(/_/g, ' ')
  }

  // Computed local time for Day 1 at 7 PM ET = 23:00 UTC on June 2 2026
  const day1Utc = new Date('2026-06-02T23:00:00Z')
  const localDay1 = day1Utc.toLocaleString('en-US', {
    timeZone: selected,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const save = async () => {
    setSaving(true)
    // In prod: POST /api/onboarding/timezone
    await new Promise((r) => setTimeout(r, 500))
    onContinue()
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-8 md:p-10">
      <p className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Step 1 of 2</p>
      <h2 className="font-display text-[32px] text-forest mb-3 leading-tight">
        What time zone are you in?
      </h2>
      <p className="text-body-sm text-slate leading-relaxed mb-6">
        Sessions run 7:00–8:15 PM Eastern. We'll always show times in your local zone so you don't
        have to do math at 6:55 PM.
      </p>

      <div className="bg-cream border border-border rounded-xl p-5 mb-6">
        <p className="font-mono text-[10px] text-slate tracking-widest uppercase mb-1">Detected</p>
        <p className="font-display text-[22px] text-forest leading-tight">{pretty(selected)}</p>
        <p className="text-[13px] text-slate mt-2">
          For you, Day 1 is <span className="text-forest font-medium">{localDay1}</span>.
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-coral text-cream text-[15px] py-4 rounded-full hover:bg-rust transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : "Yes, that's right →"}
        </button>

        {!dropdown ? (
          <button
            onClick={() => setDropdown(true)}
            className="w-full text-slate text-[13px] py-2 hover:text-forest transition-colors"
          >
            That's not me — change time zone
          </button>
        ) : (
          <div className="pt-2">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[14px] text-forest focus:border-forest focus:outline-none"
            >
              {COMMON_TZ.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setDropdown(false)
                setSelected(detected)
              }}
              className="text-[12px] text-slate hover:text-forest mt-2 underline underline-offset-4"
            >
              Reset to detected
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ───────────────── Step 3: notifications ─────────────────
function NotificationsStep({
  whatsappOptedInAtCheckout,
  onComplete,
}: {
  whatsappOptedInAtCheckout: boolean
  onComplete: () => void
}) {
  const [prefs, setPrefs] = useState({
    email: true,
    whatsapp: whatsappOptedInAtCheckout,
    sms: false,
  })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    // In prod: POST /api/onboarding/preferences — sets onboardingCompletedAt + syncs whatsappOptedIn
    await new Promise((r) => setTimeout(r, 700))
    onComplete()
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-8 md:p-10">
      <p className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">Step 2 of 2</p>
      <h2 className="font-display text-[32px] text-forest mb-3 leading-tight">
        How should we reach you?
      </h2>
      <p className="text-body-sm text-slate leading-relaxed mb-6">
        Coach Kai will send short nudges between now and Day 1. You can change any of this anytime in
        Account.
      </p>

      <div className="space-y-3 mb-6">
        <Toggle
          label="Email"
          sublabel="Session reminders, intake nudges, your Patient Advocacy Document"
          checked={prefs.email}
          onChange={(v) => setPrefs({ ...prefs, email: v })}
          recommended
        />
        <Toggle
          label="WhatsApp from Coach Kai"
          sublabel={
            whatsappOptedInAtCheckout
              ? 'Short messages, never spam'
              : "You haven't enabled this yet — turn on to receive Kai's messages"
          }
          checked={prefs.whatsapp}
          onChange={(v) => setPrefs({ ...prefs, whatsapp: v })}
          recommended={whatsappOptedInAtCheckout}
        />
        <Toggle
          label="SMS as backup"
          sublabel="Only for time-sensitive reminders if WhatsApp doesn't deliver"
          checked={prefs.sms}
          onChange={(v) => setPrefs({ ...prefs, sms: v })}
        />
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="w-full bg-coral text-cream text-[15px] py-4 rounded-full hover:bg-rust transition-colors disabled:opacity-50"
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
        className="mt-1 w-4 h-4 accent-coral"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-forest">{label}</span>
          {recommended && (
            <span className="font-mono text-[9px] text-sage tracking-widest uppercase">
              Recommended
            </span>
          )}
        </div>
        <p className="text-[12px] text-slate mt-0.5 leading-relaxed">{sublabel}</p>
      </div>
    </label>
  )
}
