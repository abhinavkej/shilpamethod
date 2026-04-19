/**
 * ═══════════════════════════════════════════════════════════════════
 *   SHILPA METHOD — ONE-STOP PLACEHOLDERS
 * ═══════════════════════════════════════════════════════════════════
 *
 *   Hi Areef —
 *
 *   This file is the single source of truth for every editable value
 *   that appears on the marketing site. Instead of hunting through
 *   components, change anything here and it propagates site-wide.
 *
 *   Anything marked TODO(areef) needs your input before we go live
 *   with the paid backend. See HANDOFF.md at the repo root for the
 *   full briefing + env-var checklist.
 *
 *   Last updated by Claude Code on the copy-freeze pass.
 * ═══════════════════════════════════════════════════════════════════
 */

// ─── Programme / cohort dates ────────────────────────────────────────
export const PROGRAM = {
  // TODO(areef): CONFIRM FINAL DATES. Docx says April 28–30, 2026; PDF spec says June 2–4, 2026.
  displayDate: 'April 28–30, 2026',
  cohort1Label: 'Cohort 1 · 5 PM PST / 8 PM EST / 5:30 AM IST (next day)',
  cohort2Label: 'Cohort 2 · 8 AM PST / 11 AM EST / 8:30 PM IST',
  capacityPerCohort: 50,
  // Spots remaining — read live from DB once Phase-2 backend ships.
  // Until then this is a seeded static value that ticks down every 45s.
  // TODO(areef): replace with GET /api/cohort/[slug]/spots once DB is up.
  seededSpotsRemaining: 37,
} as const

// ─── Price ───────────────────────────────────────────────────────────
export const PRICE = {
  usd: '$149',
  inr: '₹4,999',
  // TODO(areef): create Stripe Products + Prices in test mode and paste IDs
  // into .env.local as STRIPE_PRICE_ID_USD / STRIPE_PRICE_ID_INR.
  stripePriceIdUsdEnv: 'STRIPE_PRICE_ID_USD',
  stripePriceIdInrEnv: 'STRIPE_PRICE_ID_INR',
} as const

// ─── Patient Advocacy Document ───────────────────────────────────────
export const DOCUMENT = {
  // TODO(areef): pick final title. Candidates on the table:
  //   · "Your Hormone Health Blueprint"
  //   · "Your Hormone Story"  ← current default
  displayName: 'Your Hormone Story',
  footerName: 'Your Hormone Story',
} as const

// ─── Contact & comms ─────────────────────────────────────────────────
export const CONTACT = {
  // TODO(areef): verify these on Resend and point MX records.
  general: 'hello@shilpamethod.com',
  coachKai: 'coachkai@shilpamethod.com',
} as const

// ─── Forum Health discount ───────────────────────────────────────────
export const FORUM_HEALTH = {
  discountUsd: '$50 off',
  // TODO(areef): create the coupon in Stripe (promotion code, fixed $50 off, USD & INR).
  // Then update checkout to pre-apply if Forum Health patient checkbox is ticked.
  stripeCouponIdEnv: 'STRIPE_FORUM_HEALTH_COUPON_ID',
} as const

// ─── Legal ───────────────────────────────────────────────────────────
export const LEGAL = {
  // TODO(areef): have counsel draft final consent language, then paste here.
  // Currently the footer shows the italic placeholder token.
  consentLanguage:
    '{{CONSENT_LANGUAGE_FINAL}} — draft pending from counsel; replace in src/config/placeholders.ts.',
  // TODO(areef): point these to real Terms / Privacy once drafted.
  termsUrl: '',
  privacyUrl: '',
  refundPolicyUrl: '',
} as const

// ─── Webinar clips ───────────────────────────────────────────────────
// Used by src/components/Clips.tsx. youtubeId is the 11-char ID from the URL.
// TODO(areef): paste the real YouTube IDs once the clips are exported.
// Playlist referenced in the PDF: PL0P26CWBMQZp25RVUHbshhy_OMdpUbabx
export interface WebinarClip {
  n: 1 | 2 | 3 | 4 | 5 | 6
  speaker: 'Shilpa' | 'Jocelyn'
  title: string
  durationLabel: string
  transcript: string
  /** 11-char YouTube video ID. Leave empty string until available; placeholder token will render. */
  youtubeId: string
}

export const WEBINAR_CLIPS: WebinarClip[] = [
  {
    n: 1,
    speaker: 'Shilpa',
    title: 'Why perimenopause sleep breaks first',
    durationLabel: '1:47',
    transcript:
      "Progesterone is your primary sleep hormone. As it declines in perimenopause, the architecture of your sleep changes — you fall asleep, but you can't stay there. The 3 AM wake-up is a hormonal signature, not anxiety.",
    youtubeId: '', // TODO(areef)
  },
  {
    n: 2,
    speaker: 'Jocelyn',
    title: "Hormone confusion in my 40s — what's actually happening",
    durationLabel: '2:12',
    transcript:
      "My doctor said my labs were fine. My body said otherwise. I was told I was too young for perimenopause, and too 'normal' for any of the things I was feeling. That five-year gap is where most women lose themselves — and nobody gave us a map.",
    youtubeId: '', // TODO(areef)
  },
  {
    n: 3,
    speaker: 'Shilpa',
    title: 'HRT vs BHRT — the difference your doctor may not explain',
    durationLabel: '3:04',
    transcript:
      'HRT is the umbrella. BHRT — bioidentical hormone therapy — uses molecules identical to what your body produces. The fear around hormones comes largely from a 2002 study using synthetic hormones, which has been substantially reanalyzed in the 20+ years since.',
    youtubeId: '', // TODO(areef)
  },
  {
    n: 4,
    speaker: 'Shilpa',
    title: 'The one lab your OB-GYN probably skipped',
    durationLabel: '2:38',
    transcript:
      "Fasting insulin. Not just glucose — insulin. The two together give you HOMA-IR, and HOMA-IR tells you where metabolic resistance is headed years before a fasting glucose flag appears. If your doctor hasn't ordered fasting insulin, you're flying with half the instruments.",
    youtubeId: '', // TODO(areef)
  },
  {
    n: 5,
    speaker: 'Jocelyn',
    title: "What I actually did with Shilpa's framework",
    durationLabel: '1:58',
    transcript:
      "I walked into my OB-GYN with a 2-page document. Specific questions, specific labs, a specific timeline. For the first time in four years, the appointment wasn't a negotiation — it was a conversation. That's what this boot camp builds for you.",
    youtubeId: '', // TODO(areef)
  },
  {
    n: 6,
    speaker: 'Shilpa',
    title: 'Frozen shoulder in perimenopause — the hormone link',
    durationLabel: '2:26',
    transcript:
      'Estrogen has direct anti-inflammatory effects on joint tissue. As it declines, synovial fluid changes and tendon flexibility decreases. Frozen shoulder affects 10–17% of perimenopausal women and is almost never connected to hormones by a conventional provider.',
    youtubeId: '', // TODO(areef)
  },
]

// ─── Shilpa headshot ─────────────────────────────────────────────────
// Currently hotlinks the Forum Health marketing image. TODO(areef): host
// on Vercel Blob or /public once we get a higher-res asset from Shilpa.
export const SHILPA_HEADSHOT_URL =
  'https://forumhealth.com/wp-content/uploads/2019/05/Shilpa-Saxena-1-scaled-e1699545138555-768x768.webp'

// ─── Registration destination ────────────────────────────────────────
// The current landing form calls a stub dispatch. Once Phase-2 ships,
// the Reserve button should POST /api/checkout and redirect to Stripe.
// TODO(areef): replace the handleSubmit stub in Registration.tsx with
// the Stripe Checkout call per PDF §8 / §10.
export const CHECKOUT = {
  apiEndpoint: '/api/checkout', // not live yet
  stripeSuccessPath: '/welcome', // Phase 2
  stripeCancelPath: '/checkout', // Phase 2
} as const
