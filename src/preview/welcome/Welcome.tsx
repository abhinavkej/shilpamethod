import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// §4 — /welcome page. The most important page in the application.
// Single-purpose: convert the moment of payment into the moment of belonging.
// No CTA button. Intentionally quiet. The exit is her phone notification.

type State = 'processing' | 'ready' | 'edit'
type Media = 'video' | 'text'

const DEMO_NAME = 'Sarah'
const DEMO_EMAIL = 'sarah.chen@gmail.com'
const DEMO_PHONE = '+14155550123'

export default function Welcome() {
  const [params, setParams] = useSearchParams()
  const state = (params.get('state') || 'ready') as State
  const media = (params.get('media') || 'text') as Media
  const waOptedIn = params.get('wa') !== 'off'

  const setState = (s: State) => {
    const p = new URLSearchParams(params)
    p.set('state', s)
    setParams(p, { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Preview-only controls so stakeholders can flip between states.
          In production, state is driven by webhook status + time-since-payment. */}
      <StateSwitcher active={state} media={media} wa={waOptedIn} />

      <div className="flex-1 flex items-center justify-center px-6 py-14">
        <AnimatePresence mode="wait">
          {state === 'processing' && <ProcessingView key="processing" onReady={() => setState('ready')} />}
          {state === 'ready' && (
            <ReadyView key="ready" media={media} waOptedIn={waOptedIn} onEditPhone={() => setState('edit')} />
          )}
          {state === 'edit' && <EditPhoneModal key="edit" onClose={() => setState('ready')} />}
        </AnimatePresence>
      </div>

      {/* Quiet footer with a link to the email + WA mocks for stakeholder preview */}
      <div className="text-center pb-6">
        <Link
          to="/preview/welcome/mocks"
          className="font-mono text-[10px] text-slate/60 hover:text-slate tracking-widest uppercase"
        >
          (preview) see the email + WhatsApp that just went out →
        </Link>
      </div>
    </div>
  )
}

// ───────────────── Processing state ─────────────────
function ProcessingView({ onReady }: { onReady: () => void }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    // In prod: poll /api/welcome/status?session_id=xxx every 1s, max 30s.
    // Here: auto-advance at 3s for demo; give a "taking longer" state at 10s.
    const t = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  if (elapsed > 10) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-md text-center"
      >
        <h1 className="font-display text-[34px] text-forest mb-4 leading-tight">
          Something's taking longer than expected.
        </h1>
        <p className="text-body-md text-slate mb-2">Your payment went through, but our system is catching up.</p>
        <p className="text-body-md text-slate mb-6">Check your email in 5 minutes — your welcome message will be there.</p>
        <button
          onClick={() => location.reload()}
          className="border border-border text-forest text-[14px] px-5 py-2.5 rounded-full hover:border-forest"
        >
          Reload
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md text-center"
    >
      <div className="inline-block mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-full border-[3px] border-border border-t-coral"
        />
      </div>
      <p className="text-body-md text-slate">Just a moment — confirming your enrollment.</p>
      <button
        onClick={onReady}
        className="font-mono text-[10px] text-coral/70 tracking-widest uppercase mt-6 hover:text-coral underline underline-offset-4"
      >
        (preview) skip to ready →
      </button>
    </motion.div>
  )
}

// ───────────────── Ready state ─────────────────
function ReadyView({
  media,
  waOptedIn,
  onEditPhone,
}: {
  media: Media
  waOptedIn: boolean
  onEditPhone: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl w-full"
    >
      {/* Mono kicker */}
      <p className="font-mono text-[11px] text-coral tracking-widest uppercase text-center mb-6">
        The Hormone Method · Cohort 1 · June 2–4, 2026
      </p>

      {/* Headline — Cormorant 56px/40px, weight 300 */}
      <h1 className="font-display text-[44px] md:text-[56px] font-light text-forest leading-[1.05] text-center mb-5">
        You're in, {DEMO_NAME}.
      </h1>

      {/* Subhead */}
      <p className="text-body-md text-slate max-w-md mx-auto text-center leading-relaxed mb-10">
        A few small things, then we're going to leave you alone for a minute.
        <br />
        Your phone should be lighting up any second now.
      </p>

      {/* Video OR text fallback */}
      {media === 'video' ? (
        <div className="max-w-md mx-auto mb-10">
          <div
            className="aspect-video rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 70%, #D97757 0%, transparent 50%), linear-gradient(135deg, #1F3A2E, #2D5445)',
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center">
                <span className="text-forest text-[20px] ml-1">▶</span>
              </div>
            </div>
          </div>
          <p className="font-mono text-[10px] text-slate tracking-widest uppercase text-center mt-3">
            60 seconds with Dr. Saxena
          </p>
        </div>
      ) : (
        <div className="max-w-md mx-auto mb-10 bg-white border border-border rounded-2xl p-6 md:p-8 text-body-sm text-slate leading-relaxed space-y-3">
          <p>Hi — I'm Shilpa.</p>
          <p>
            I want you to know what you just signed up for. Three nights together in June. Tuesday,
            Wednesday, Thursday, 7 to 8:15pm Eastern. Real-time, on Google Meet. No replays-only
            nonsense — though we will send you the recordings.
          </p>
          <p>
            Between now and then, my colleague Coach Kai will be in touch on WhatsApp. She's not me
            — she's an AI assistant trained on how I think about hormonal health. She's there to
            help you prepare and to answer questions in between sessions.
          </p>
          <p>
            Open the WhatsApp message she just sent you. That's where the program actually lives. The
            website is the home base, but the conversation is over there.
          </p>
          <p className="text-forest italic mt-4">— Dr. Shilpa P. Saxena, MD</p>
        </div>
      )}

      {/* Status indicator — two checkmarks fading in 800ms apart */}
      <div className="max-w-md mx-auto mb-8 bg-white border border-border rounded-2xl p-5 space-y-3">
        <StatusRow
          delayMs={0}
          ok
          label={`Welcome email sent to ${maskEmail(DEMO_EMAIL)}`}
        />
        {waOptedIn ? (
          <StatusRow
            delayMs={800}
            ok
            label={`WhatsApp from Coach Kai sent to ${maskPhone(DEMO_PHONE)}`}
          />
        ) : (
          <div className="flex items-center gap-3 text-slate/60">
            <span className="w-5 h-5 rounded-full border border-slate/30 flex items-center justify-center text-[10px]">
              ○
            </span>
            <span className="text-[14px]">
              WhatsApp not enabled —{' '}
              <Link to="/preview/account" className="text-coral underline underline-offset-4 hover:text-rust">
                opt in to add it later
              </Link>
            </span>
          </div>
        )}
      </div>

      {/* Phone-correction affordance (visible within 1 hour of payment) */}
      <div className="text-center mb-8">
        <button
          onClick={onEditPhone}
          className="font-mono text-[11px] text-slate tracking-widest uppercase hover:text-forest"
        >
          Wrong number? Edit it →
        </button>
      </div>

      {/* Footer — the implicit exit */}
      <p className="text-center text-[14px] text-slate italic">
        You can close this tab. We'll see you on your phone.
      </p>
    </motion.div>
  )
}

function StatusRow({ delayMs, ok, label }: { delayMs: number; ok: boolean; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delayMs / 1000 }}
      className="flex items-center gap-3"
    >
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: delayMs / 1000 + 0.1 }}
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
          ok ? 'bg-sage text-cream' : 'bg-border text-slate'
        }`}
      >
        ✓
      </motion.span>
      <span className="text-[14px] text-forest">{label}</span>
    </motion.div>
  )
}

// ───────────────── Edit phone modal ─────────────────
function EditPhoneModal({ onClose }: { onClose: () => void }) {
  const [newPhone, setNewPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  const save = async () => {
    if (!newPhone) return
    setSaving(true)
    // Prod: POST /api/welcome/update-phone with sessionId as proxy auth.
    await new Promise((r) => setTimeout(r, 900))
    setSaving(false)
    setDone(true)
    setTimeout(onClose, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-forest/20 backdrop-blur-sm flex items-center justify-center px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-7 max-w-md w-full"
      >
        {!done ? (
          <>
            <h2 className="font-display text-[26px] text-forest mb-2">Update your phone</h2>
            <p className="text-body-sm text-slate mb-5">
              We'll send Coach Kai's welcome message again to the corrected number.
            </p>
            <div className="flex gap-2 mb-5">
              <div className="flex items-center gap-2 px-3 py-3 bg-sand/40 border border-border rounded-xl text-[14px]">
                <span>🇺🇸</span>
                <span className="text-forest font-mono">+1</span>
              </div>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="415 555 0123"
                className="flex-1 bg-white border border-border rounded-xl px-4 py-3 text-[15px] focus:border-forest focus:outline-none"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={save}
                disabled={!newPhone || saving}
                className="flex-1 bg-coral text-cream text-[15px] py-3 rounded-full hover:bg-rust transition-colors disabled:opacity-50"
              >
                {saving ? 'Updating…' : 'Update and resend'}
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 text-[14px] text-slate hover:text-forest"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-[40px] mb-3">✓</div>
            <div className="font-display text-[22px] text-forest mb-1">New number saved.</div>
            <div className="text-body-sm text-slate">Coach Kai is resending the welcome message.</div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ───────────────── Utilities ─────────────────
function maskEmail(e: string) {
  const [local, domain] = e.split('@')
  return `${local[0]}${'*'.repeat(Math.max(1, local.length - 1))}@${domain}`
}
function maskPhone(p: string) {
  // +14155550123 → +1 415 ••• ••23
  if (p.startsWith('+1') && p.length >= 12) {
    return `+1 ${p.slice(2, 5)} ••• ••${p.slice(-2)}`
  }
  return p.slice(0, 3) + ' ••• ' + p.slice(-2)
}

// ───────────────── Preview-only state switcher ─────────────────
function StateSwitcher({
  active,
  media,
  wa,
}: {
  active: State
  media: Media
  wa: boolean
}) {
  const setParam = (key: string, value: string) => {
    const p = new URLSearchParams(location.search)
    p.set(key, value)
    history.replaceState(null, '', `?${p.toString()}`)
    // Force a re-read
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  const chip = (label: string, onClick: () => void, on: boolean) => (
    <button
      onClick={onClick}
      className={`font-mono text-[10px] px-2 py-1 rounded-full uppercase tracking-widest ${
        on ? 'bg-forest text-cream' : 'bg-white text-slate hover:bg-sand border border-border'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="max-w-5xl mx-auto px-6 pt-4">
      <div className="bg-sand/60 border border-border rounded-full px-3 py-1.5 w-fit flex flex-wrap gap-1 text-[12px]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-coral px-2">Preview state</span>
        {chip('Processing', () => setParam('state', 'processing'), active === 'processing')}
        {chip('Ready', () => setParam('state', 'ready'), active === 'ready')}
        {chip('Edit phone', () => setParam('state', 'edit'), active === 'edit')}
        <span className="w-px bg-border mx-1" />
        {chip('Text', () => setParam('media', 'text'), media === 'text')}
        {chip('Video', () => setParam('media', 'video'), media === 'video')}
        <span className="w-px bg-border mx-1" />
        {chip('WA on', () => setParam('wa', 'on'), wa)}
        {chip('WA off', () => setParam('wa', 'off'), !wa)}
      </div>
    </div>
  )
}
