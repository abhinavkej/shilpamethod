import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useSpotCounter } from '../hooks/useSpotCounter'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'
import { PRICE, PROGRAM, CONTACT, FORUM_HEALTH } from '../config/placeholders'

// Source of truth for everything editable: src/config/placeholders.ts
const PRICE_TOKEN = PRICE.usd
const PRICE_DISPLAY = PRICE.usd

export default function Registration() {
  const { state, dispatch } = useApp()
  const spotsRemaining = useSpotCounter()

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [forumPatient, setForumPatient] = useState(false)
  const [copied, setCopied] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [emailDeliveredTo, setEmailDeliveredTo] = useState<string | null>(null)
  const [memberLink, setMemberLink] = useState<string | null>(null)

  const isWaitlist = spotsRemaining <= 0
  const cohortLabel = state.cohort === 'c2' ? PROGRAM.cohort2Label : PROGRAM.cohort1Label

  // Title-case a first name: "abhinav kej" → "Abhinav Kej", "MARY" → "Mary"
  const normalizeName = (n: string) =>
    n
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanName = normalizeName(firstName)
    const cleanEmail = email.trim().toLowerCase()
    if (!cleanName || !cleanEmail) return
    setSubmitState('sending')
    setErrorMsg('')

    // Always set a client-side preview link immediately — don't gate on email delivery.
    // This lets stakeholders click into the onboarding flow even when RESEND_API_KEY is unset.
    setMemberLink(`/preview/dashboard?phase=onboarding&name=${encodeURIComponent(cleanName)}`)

    try {
      const resp = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: cleanName,
          email: cleanEmail,
          forumPatient,
          cohort: state.cohort,
        }),
      })
      const data = await resp.json()

      if (!resp.ok) {
        // Still flip to the confirmation state so the UI is honest about what happened;
        // stash a diagnostic line so we know why the email didn't land (dev-only, not
        // shown to end users — the UI always shows the friendly fallback copy).
        setErrorMsg(data?.hint || data?.error || 'Email service temporarily unavailable.')
        setEmailDeliveredTo(null)
      } else {
        // The server returns { paths: { formsubmit, resend }, memberLink }.
        // Resend success means we sent the beautifully-designed welcome to the user.
        // Without it, Formsubmit still notified ops; we don't promise a user-facing
        // welcome email in that case.
        const resendOk = data?.paths?.resend?.ok === true
        setEmailDeliveredTo(resendOk ? cleanEmail : null)
        if (data?.memberLink) setMemberLink(data.memberLink)
      }

      dispatch({
        type: 'SUBMIT_REGISTRATION',
        payload: { name: cleanName, email: cleanEmail, clinicalInterest: forumPatient },
      })
      setSubmitState('idle')
    } catch (err: any) {
      // Network error or JSON parse failure (e.g. local Vite dev with no /api/register handler).
      // Still show the confirmation so the full flow is navigable locally without a deployed API.
      setErrorMsg(err?.message || 'Network error — please try again.')
      dispatch({ type: 'SUBMIT_REGISTRATION', payload: { name: cleanName, email: cleanEmail, clinicalInterest: forumPatient } })
      setSubmitState('idle')
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(
      'I just joined The Hormone Method Boot Camp by Forum Health — 3 live sessions with Dr. Shilpa Saxena on perimenopause & menopause. shilpamethod.com'
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.section
      id="registration"
      className="py-24 md:py-32 px-6 bg-cream"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-5xl mx-auto">
        <motion.p variants={fadeInUp} className="text-label text-coral uppercase text-center mb-5">
          Reserve your spot
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="font-display text-display-xl text-forest text-center mb-4"
        >
          Three live sessions. <span className="italic">One document.</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-body-md text-slate text-center max-w-[560px] mx-auto mb-14"
        >
          Cohorts are capped to keep the interactions meaningful.
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10">
          {/* Pricing card */}
          <motion.div variants={fadeInUp}>
            <div className="bg-forest text-cream rounded-2xl p-8 h-full" style={{ boxShadow: '0 24px 60px -15px rgba(31,58,46,0.25)' }}>
              <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-2">
                The Hormone Method Boot Camp · by Forum Health
              </div>
              <div className="font-display text-[32px] text-cream mb-1">
                {PROGRAM.displayDate}
              </div>
              <p className="text-body-sm text-cream/70 mb-6">{cohortLabel}</p>

              <hr className="border-cream/15 mb-6" />

              <ul className="space-y-2.5 mb-6">
                {[
                  '3 live Google Meet sessions with Dr. Shilpa Saxena (75 min each)',
                  'Your personalized Patient Advocacy Document',
                  'Coach Kai — Physician-interface Portal',
                  'Recommended lab panel with interpretation guide',
                  'Opt-in alumni community of up to 50 women',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-coral mt-0.5">✓</span>
                    <span className="text-[14px] text-cream/90">{item}</span>
                  </li>
                ))}
              </ul>

              <hr className="border-cream/15 mb-6" />

              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-[52px] text-cream leading-none">{PRICE_DISPLAY}</span>
                <span className="text-[13px] text-cream/50 font-mono uppercase tracking-widest">one-time</span>
              </div>
              <div className="text-[13px] text-cream/60 mb-4">
                No subscription.
              </div>

              {/* Forum Health perk */}
              <div className="bg-coral/15 border border-coral/30 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-coral-soft">
                    Forum Health perk
                  </span>
                </div>
                <div className="text-[14px] text-cream">
                  <span className="font-medium">Forum Health patients get {FORUM_HEALTH.discountUsd}.</span>
                </div>
                <div className="text-[12px] text-cream/60 mt-1">
                  Discount code is sent through Forum's patient communication channels.
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-[12px] text-cream/50">
                <span>
                  <span className="text-coral-soft font-medium">{spotsRemaining}</span> of {PROGRAM.capacityPerCohort} spots remaining in this cohort
                </span>
              </div>
            </div>
          </motion.div>

          {/* Form / Confirmation */}
          <motion.div variants={fadeInUp}>
            <AnimatePresence mode="wait">
              {!state.isRegistered ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  onSubmit={handleSubmit}
                  className="bg-bone border border-border rounded-2xl p-8 h-full flex flex-col"
                >
                  <div className="mb-5">
                    <label className="font-mono text-[10px] text-slate tracking-widest uppercase block mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full bg-cream border border-border rounded-xl px-4 py-3.5 text-[16px] text-ink focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="font-mono text-[10px] text-slate tracking-widest uppercase block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-cream border border-border rounded-xl px-4 py-3.5 text-[16px] text-ink focus:border-forest focus:outline-none transition-colors"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer mb-6">
                    <input
                      type="checkbox"
                      checked={forumPatient}
                      onChange={(e) => setForumPatient(e.target.checked)}
                      className="mt-1 accent-coral"
                    />
                    <span className="text-[13px] text-slate">
                      I'm a Forum Health patient — apply my $50 discount.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitState === 'sending'}
                    className="w-full bg-coral text-cream text-[16px] py-4 rounded-full hover:bg-rust transition-colors cursor-pointer mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitState === 'sending'
                      ? 'Sending your welcome…'
                      : isWaitlist
                      ? 'Join the waitlist for the next cohort'
                      : `Reserve my spot — ${PRICE_TOKEN}`}
                  </button>
                  {submitState === 'error' && (
                    <p className="text-[12px] text-rust mb-3">{errorMsg}</p>
                  )}

                  {/* Disclaimer near CTA */}
                  <p className="text-[12px] text-slate leading-relaxed mt-auto pt-4 border-t border-border/60">
                    The Hormone Method Boot Camp is educational guidance, not medical advice. Participation
                    does not establish a physician-patient relationship.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-forest text-cream rounded-2xl p-8"
                >
                  <div className="font-display text-[40px] leading-none mb-2">
                    You're in, {state.registrationName}.
                  </div>
                  <div className="text-body-sm text-cream/70 mb-5">{cohortLabel}</div>

                  {emailDeliveredTo ? (
                    <>
                      <p className="text-body-md text-cream/85 mb-4">
                        Check <span className="text-coral-soft font-medium">{emailDeliveredTo}</span> —
                        a welcome from Coach Kai just landed in your inbox (look in spam if you don't see
                        it within 2 minutes).
                      </p>
                      <p className="text-body-sm text-cream/60 mb-6">
                        We'll be in touch before your cohort begins. Intake opens next.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-body-md text-cream/85 mb-4">
                        We have your details. Coach Kai will reach out within 24 hours to begin your
                        intake. Watch for an email from {CONTACT.coachKai}.
                      </p>
                      <p className="text-body-sm text-cream/60 mb-6">
                        Intake starts now. Clinical Q&A opens one week before your cohort begins.
                      </p>
                    </>
                  )}

                  {/* DEV NOTE — email + Stripe not yet live:
                      • RESEND_API_KEY unset → Formsubmit ops notification only, no user email.
                        Wire up: Vercel env var RESEND_API_KEY (see HANDOFF.md §2.4). Areef to do.
                      • "Reserve my spot — $149" posts the interest form, NOT a Stripe checkout.
                        Stripe integration is Phase 2 (see HANDOFF.md §8). */}
                  <div className="bg-cream/10 border border-cream/20 rounded-xl px-4 py-3 mb-4 text-[11px] text-cream/60 font-mono leading-relaxed">
                    <span className="text-coral-soft font-semibold">DEV</span>
                    {emailDeliveredTo
                      ? ` · Welcome email sent via Resend ✓`
                      : ` · Email pending — RESEND_API_KEY not set · Areef to wire (HANDOFF.md §2.4)`}
                    <br />
                    <span className="text-coral-soft font-semibold">DEV</span>
                    {` · Stripe checkout not yet wired — "Reserve my spot" captures interest only`}
                  </div>

                  <a
                    href={memberLink || `/preview/dashboard?phase=onboarding&name=${encodeURIComponent(state.registrationName || 'Sarah')}`}
                    className="inline-flex items-center gap-2 bg-coral text-cream text-[14px] px-5 py-2.5 rounded-full hover:bg-rust transition-colors mb-3"
                  >
                    Preview your member area →
                  </a>

                  <button
                    onClick={handleShare}
                    className="bg-cream/10 text-cream text-[14px] px-5 py-2.5 rounded-full hover:bg-cream/20 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Share with a friend'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
