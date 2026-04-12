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
      'I just joined The Hormone Method — a 2-day programme with Dr. Shilpa Saxena on hormonal health. shilpamethod.com'
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.section
      id="registration"
      className="py-24 md:py-32 px-6 bg-surface-alt"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
    >
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20">
        {/* Programme Summary */}
        <motion.div variants={fadeInUp} className="lg:w-1/2">
          <div className="bg-white rounded-2xl border border-border p-8" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.04)' }}>
            <p className="text-label text-secondary uppercase mb-3">
              The Hormone Method
            </p>
            <h3 className="text-display-sm text-primary mb-2">
              March 28–29, 2026
            </h3>
            <p className="text-body-md text-secondary mb-6">
              Two days. 50 women. One physician. The answers your doctor hasn't given you.
            </p>

            <hr className="border-border mb-6" />

            <ul className="space-y-3 mb-6">
              {[
                'Live sessions with Dr. Shilpa Saxena (2 × 90 minutes)',
                'Your personalised hormonal risk profile',
                'Your Patient Advocacy Document — with PubMed citations',
                'Recommended lab panel with interpretation guide',
                "30-day access to your cohort's private community",
                'Forum Health graduate discount — 10% supplement store + complimentary intake call',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span className="text-body-sm text-secondary">{item}</span>
                </li>
              ))}
            </ul>

            <hr className="border-border mb-6" />

            <div className="text-body-md text-primary mb-1">
              <span className="font-medium">{spotsRemaining}</span> of 500 spots remaining
            </div>

            <div className="text-[48px] font-light text-primary tracking-tight mt-4">$349</div>
            <div className="text-body-sm text-secondary">
              One-time. No subscription. No upsell.
            </div>
          </div>
        </motion.div>

        {/* Form / Confirmation */}
        <motion.div variants={fadeInUp} className="lg:w-1/2 flex items-center">
          <div className="w-full">
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
                    className="w-full border border-border rounded-xl px-5 py-4 text-[16px] text-primary placeholder:text-secondary/50 focus:border-primary focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-border rounded-xl px-5 py-4 text-[16px] text-primary placeholder:text-secondary/50 focus:border-primary focus:outline-none transition-colors"
                  />
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={clinicalInterest}
                      onChange={(e) => setClinicalInterest(e.target.checked)}
                      className="mt-1 accent-primary"
                    />
                    <span className="text-body-sm text-secondary">
                      I'd also like information about Forum Health clinical services in my area.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white text-[17px] py-4 rounded-full hover:bg-accent-hover transition-colors cursor-pointer"
                  >
                    {isWaitlist
                      ? 'Join the waitlist for the next cohort'
                      : 'Reserve my spot — $349'}
                  </button>

                  <p className="text-[13px] text-secondary text-center">
                    Secure checkout. Full refund if the programme is cancelled.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary text-white rounded-2xl p-8"
                >
                  <div className="text-[36px] font-light tracking-tight mb-2">
                    You're in, {state.registrationName}.
                  </div>
                  <div className="text-[16px] opacity-80 mb-1">
                    Cohort 1 · March 28–29, 2026 · {500 - spotsRemaining} women enrolled
                  </div>
                  <p className="text-[15px] opacity-70 mt-4 leading-relaxed">
                    Dr. Kai will reach out within 24 hours to begin your pre-programme intake. Watch for an email from drkai@shilpamethod.com.
                  </p>
                  <p className="text-body-sm opacity-60 mt-3 leading-relaxed">
                    Cohort sizes are capped at 500 so Dr. Saxena can address your profile directly.
                  </p>
                  <p className="text-body-sm opacity-50 mt-4">
                    Forward this to a friend who needs this weekend.
                  </p>
                  <button
                    onClick={handleShare}
                    className="mt-4 bg-white/10 text-white text-body-sm px-6 py-2.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {copied ? 'Copied!' : 'Share with a friend'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
