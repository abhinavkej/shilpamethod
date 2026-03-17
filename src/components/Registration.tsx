import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useSpotCounter } from '../hooks/useSpotCounter'
import { fadeInUp, staggerContainer, viewportConfig } from '../lib/motion'

export default function Registration() {
  const { state, dispatch } = useApp()
  const spotsRemaining = useSpotCounter()

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [clinicalInterest, setClinicalInterest] = useState(false)
  const [copied, setCopied] = useState(false)

  const isWaitlist = spotsRemaining <= 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !email) return

    dispatch({
      type: 'SUBMIT_REGISTRATION',
      payload: {
        name: firstName,
        email,
        clinicalInterest,
      },
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(
      'I just joined The Hormone Method — a 2-day program with Dr. Shilpa Saxena & Dr. Tara Scott on hormonal health. shilpamethod.com'
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.section
      id="registration"
      className="py-12 md:py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Program Summary */}
        <motion.div variants={fadeInUp} className="lg:w-1/2">
          <div className="bg-white rounded-2xl border border-border p-7">
            <div className="font-mono text-[11px] text-gold tracking-[1.5px] mb-2">
              THE HORMONE METHOD
            </div>
            <div className="font-display text-[32px] font-light text-deep mb-1">
              March 28–29, 2026
            </div>
            <p className="font-body text-[16px] text-muted mb-5">
              Two days. 50 women. Two physicians. The answers your doctor hasn't given you.
            </p>

            <hr className="border-border border-t-[0.5px] mb-5" />

            <ul className="space-y-3 mb-5">
              {[
                'Live sessions with Dr. Shilpa Saxena & Dr. Tara Scott (2 × 90 minutes)',
                'Your personalized hormonal risk profile',
                'Your Patient Advocacy Document — with PubMed citations',
                'Recommended lab panel with interpretation guide',
                "30-day access to your cohort's private community",
                'Forum Health graduate discount — 10% supplement store + complimentary intake call',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
                  <span className="font-body text-[15px] text-muted">{item}</span>
                </li>
              ))}
            </ul>

            <hr className="border-border border-t-[0.5px] mb-5" />

            <div className="font-body text-[16px] text-deep mb-1">
              <span className="font-medium">{spotsRemaining}</span> of 500 spots remaining
            </div>

            <div className="font-display text-[48px] font-light text-deep mt-4">$349</div>
            <div className="font-body text-[13px] text-warm">
              One-time. No subscription. No upsell.
            </div>
          </div>
        </motion.div>

        {/* Form / Confirmation */}
        <motion.div variants={fadeInUp} className="lg:w-1/2">
          <AnimatePresence mode="wait">
            {!state.isRegistered ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full border border-border rounded-[10px] px-[18px] py-[14px] font-body text-[16px] text-deep placeholder:text-warm/60 focus:border-sage focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-border rounded-[10px] px-[18px] py-[14px] font-body text-[16px] text-deep placeholder:text-warm/60 focus:border-sage focus:outline-none transition-colors"
                />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clinicalInterest}
                    onChange={(e) => setClinicalInterest(e.target.checked)}
                    className="mt-1 accent-sage"
                  />
                  <span className="font-body text-[14px] text-muted">
                    I'd also like information about Forum Health clinical services in my area.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-terra text-white font-body text-[17px] py-4 rounded-full hover:bg-terra/90 transition-colors cursor-pointer"
                >
                  {isWaitlist
                    ? 'Join the waitlist for the next cohort →'
                    : 'Reserve my spot — $349 →'}
                </button>

                <p className="font-body text-[13px] text-warm text-center">
                  Secure checkout. Full refund if the program is cancelled.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-deep text-white rounded-2xl p-8"
              >
                <div className="font-display text-[36px] font-light mb-2">
                  You're in, {state.registrationName}.
                </div>
                <div className="font-body text-[16px] opacity-80 mb-1">
                  Cohort 1 &middot; March 28–29, 2026 &middot; {500 - spotsRemaining} women enrolled
                </div>
                <p className="font-body text-[15px] opacity-70 mt-4 leading-[1.7]">
                  Dr. Kai will reach out within 24 hours to begin your pre-program intake. Watch for
                  an email from drkai@shilpamethod.com. You'll work with both Dr. Saxena and Dr. Scott
                  across the weekend.
                </p>
                <p className="font-body text-[14px] opacity-60 mt-3 leading-[1.6]">
                  Cohort sizes are capped at 500 so both physicians can address your profile directly.
                </p>
                <p className="font-body text-[14px] opacity-50 mt-4">
                  Forward this to a friend who needs this weekend.
                </p>
                <button
                  onClick={handleShare}
                  className="mt-4 bg-white/10 text-white font-body text-[14px] px-6 py-2.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {copied ? 'Copied!' : 'Share with a friend →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  )
}
