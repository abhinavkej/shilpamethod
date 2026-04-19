import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell, H1, Lede, Mono, PrimaryButton } from '../ui'

// §1 — updated checkout form. Captures phone + WhatsApp opt-in at checkout time.
// In prod: POST /api/checkout → upserts User → creates Stripe Checkout Session
// with metadata (userId, cohortId, firstName, phoneE164, whatsappOptedIn).

const COUNTRIES = [
  { code: 'US', name: 'United States', dial: '+1', currency: 'USD', flag: '🇺🇸', price: '$149' },
  { code: 'IN', name: 'India', dial: '+91', currency: 'INR', flag: '🇮🇳', price: '₹4,999' },
]

export default function Checkout() {
  const nav = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState<'US' | 'IN'>('US')
  const [waOptIn, setWaOptIn] = useState(true)
  const [forumHealth, setForumHealth] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  const c = COUNTRIES.find((c) => c.code === country)!

  // Simple E.164-ish validation. Prod uses libphonenumber-js isPossibleNumber +
  // getNumberType to reject landlines.
  const validatePhone = () => {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 7) {
      setPhoneError(
        "That doesn't look like a valid mobile number — Coach Kai needs to be able to text you on WhatsApp."
      )
      return false
    }
    setPhoneError('')
    return true
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !email || !validatePhone()) return
    // In prod: POST /api/checkout → redirect to Stripe Checkout Session URL.
    // Here we simulate a Stripe success redirect to /welcome with a mock session id.
    nav(`/preview/welcome?session_id=mock_cs_${Date.now()}`)
  }

  return (
    <PageShell maxWidth="max-w-xl">
      <Mono className="block mb-3 text-coral">Checkout</Mono>
      <H1>Reserve your spot.</H1>
      <Lede>
        The Hormone Method · Cohort 1 · June 2–4, 2026. Three nights live with Dr. Saxena, your
        Patient Advocacy Document, and Coach Kai on WhatsApp between sessions.
      </Lede>

      <form onSubmit={submit} className="bg-white border border-border rounded-2xl p-7 md:p-8 space-y-5">
        {/* First name */}
        <label className="block">
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">
            First name <span className="text-coral">*</span>
          </div>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[16px] text-ink focus:border-forest focus:outline-none transition-colors"
          />
        </label>

        {/* Email */}
        <label className="block">
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">
            Email <span className="text-coral">*</span>
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-[16px] text-ink focus:border-forest focus:outline-none transition-colors"
          />
        </label>

        {/* Country */}
        <label className="block">
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">
            Country <span className="text-coral">*</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {COUNTRIES.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => setCountry(opt.code as 'US' | 'IN')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                  country === opt.code
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-white text-slate border-border hover:border-forest'
                }`}
              >
                <span className="text-[20px]">{opt.flag}</span>
                <div className="text-left">
                  <div className="text-[14px]">{opt.name}</div>
                  <div className={`text-[11px] ${country === opt.code ? 'text-cream/70' : 'text-slate'}`}>
                    {opt.price} {opt.currency}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </label>

        {/* Phone with country flag + dial */}
        <label className="block">
          <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-2">
            Mobile phone <span className="text-coral">*</span>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-3 bg-sand/40 border border-border rounded-xl text-[14px]">
              <span>{c.flag}</span>
              <span className="text-forest font-mono">{c.dial}</span>
            </div>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (phoneError) setPhoneError('')
              }}
              placeholder={country === 'US' ? '415 555 0123' : '98765 43210'}
              className="flex-1 bg-white border border-border rounded-xl px-4 py-3 text-[16px] text-ink focus:border-forest focus:outline-none transition-colors"
            />
          </div>
          {phoneError && (
            <p className="text-[12px] text-rust mt-2">{phoneError}</p>
          )}
          <p className="text-[11px] text-slate mt-2 italic">
            Validated with <span className="font-mono">libphonenumber-js</span>. Stored as E.164:{' '}
            <span className="font-mono text-forest">
              {phone ? c.dial + phone.replace(/\D/g, '') : '…'}
            </span>
          </p>
        </label>

        <hr className="border-border/60" />

        {/* WhatsApp opt-in (default checked) */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={waOptIn}
            onChange={(e) => setWaOptIn(e.target.checked)}
            className="mt-1 w-4 h-4 accent-coral"
          />
          <div>
            <div className="text-[14px] text-forest">
              Yes, send me WhatsApp updates from Coach Kai{' '}
              <span className="font-mono text-[10px] text-sage tracking-widest uppercase ml-1">
                Recommended
              </span>
            </div>
            <p className="text-[12px] text-slate mt-0.5">
              Short nudges between now and Day 1. Reply STOP anytime to unsubscribe.
            </p>
          </div>
        </label>

        {/* Forum Health info request (default unchecked) */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={forumHealth}
            onChange={(e) => setForumHealth(e.target.checked)}
            className="mt-1 w-4 h-4 accent-coral"
          />
          <div>
            <div className="text-[14px] text-forest">
              I'd also like info about Forum Health clinical services in my area
            </div>
          </div>
        </label>

        {/* Submit */}
        <div className="pt-2">
          <PrimaryButton type="submit">Pay {c.price} {c.currency} · secure checkout →</PrimaryButton>
          <p className="text-[11px] text-slate italic mt-3">
            On submit: POSTs to <span className="font-mono">/api/checkout</span>, upserts{' '}
            <span className="font-mono">User</span> with <span className="font-mono">phoneE164</span> +{' '}
            <span className="font-mono">whatsappOptedIn</span>, creates Stripe Checkout Session with
            metadata passthrough, redirects to Stripe-hosted page. Success → /welcome.
          </p>
        </div>
      </form>
    </PageShell>
  )
}
