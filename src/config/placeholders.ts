/**
 * ═══════════════════════════════════════════════════════════════════
 *   THE HORMONE METHOD · BY FORUM HEALTH — ONE-STOP PLACEHOLDERS
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
  cohort1Label: 'Cohort 1 · 8 PM ET · 5:30 AM IST (next day)',
  cohort2Label: 'Cohort 2 · 11 AM ET · 8:30 PM IST',
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
  n: number
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
    youtubeId: 'azl0TeotG58',
  },
  {
    n: 2,
    speaker: 'Jocelyn',
    title: "Hormone confusion in my 40s — what's actually happening",
    durationLabel: '2:12',
    transcript:
      "My doctor said my labs were fine. My body said otherwise. I was told I was too young for perimenopause, and too 'normal' for any of the things I was feeling. That five-year gap is where most women lose themselves — and nobody gave us a map.",
    youtubeId: 'QS5NmLLyT8E',
  },
  {
    n: 3,
    speaker: 'Shilpa',
    title: 'HRT vs BHRT — the difference your doctor may not explain',
    durationLabel: '3:04',
    transcript:
      'HRT is the umbrella. BHRT — bioidentical hormone therapy — uses molecules identical to what your body produces. The fear around hormones comes largely from a 2002 study using synthetic hormones, which has been substantially reanalyzed in the 20+ years since.',
    youtubeId: 'Goi78Ru87Ws',
  },
  {
    n: 4,
    speaker: 'Shilpa',
    title: 'The one lab your OB-GYN probably skipped',
    durationLabel: '2:38',
    transcript:
      "Fasting insulin. Not just glucose — insulin. The two together give you HOMA-IR, and HOMA-IR tells you where metabolic resistance is headed years before a fasting glucose flag appears. If your doctor hasn't ordered fasting insulin, you're flying with half the instruments.",
    youtubeId: 'w9kEtrpuFsg',
  },
  {
    n: 5,
    speaker: 'Jocelyn',
    title: "What I actually did with Shilpa's framework",
    durationLabel: '1:58',
    transcript:
      "I walked into my OB-GYN with a 2-page document. Specific questions, specific labs, a specific timeline. For the first time in four years, the appointment wasn't a negotiation — it was a conversation. That's what this boot camp builds for you.",
    youtubeId: 'F2pc4EihN-I',
  },
  {
    n: 6,
    speaker: 'Shilpa',
    title: 'Frozen shoulder in perimenopause — the hormone link',
    durationLabel: '2:26',
    transcript:
      'Estrogen has direct anti-inflammatory effects on joint tissue. As it declines, synovial fluid changes and tendon flexibility decreases. Frozen shoulder affects 10–17% of perimenopausal women and is almost never connected to hormones by a conventional provider.',
    youtubeId: 'wUZ8n-2aKDM',
  },
  {
    n: 7,
    speaker: 'Shilpa',
    title: 'Why bone density loss accelerates in perimenopause',
    durationLabel: '2:55',
    transcript:
      "Estrogen is the primary protector of bone mineral density. When it drops — even before your last period — bone resorption outpaces formation. The DEXA scan most women get at 65 is a decade too late. We want a baseline in your early 40s, so we know what we're defending.",
    youtubeId: '-VlVN91Tgwk',
  },
  {
    n: 8,
    speaker: 'Shilpa',
    title: "Progesterone and the 3 AM wake-up — what's actually happening",
    durationLabel: '2:18',
    transcript:
      "Progesterone metabolizes into allopregnanolone, which modulates GABA-A receptors — the same receptors targeted by sleep medications. When progesterone falls, you lose that natural sedative. The result isn't insomnia; it's a specific 3–4 AM cortisol spike that kicks you out of deep sleep.",
    youtubeId: 'pXMHU4-VdzU',
  },
  {
    n: 9,
    speaker: 'Jocelyn',
    title: 'Brain fog in perimenopause — the day I stopped finishing sentences',
    durationLabel: '1:52',
    transcript:
      "I was in a meeting and I forgot the word 'strategy.' I stood there for ten seconds. My colleagues thought I was distracted. I knew something was wrong. That's the thing about estrogen and verbal memory — the decline is quiet, then it's not. Nobody warned me this was hormonal.",
    youtubeId: 'nT9Dh-LBkZU',
  },
  {
    n: 10,
    speaker: 'Shilpa',
    title: 'Estrogen and cardiovascular risk — the timing window matters',
    durationLabel: '3:11',
    transcript:
      "The Women's Health Initiative scared a generation of women off estrogen by reporting increased cardiovascular risk. What the headlines missed: those women were in their 60s, starting HRT a decade after menopause. The Timing Hypothesis, now supported by 20 years of data, shows estrogen started within 10 years of menopause is cardioprotective, not harmful.",
    youtubeId: 'jVhukPemG10',
  },
  {
    n: 11,
    speaker: 'Shilpa',
    title: 'SHBG — the hormone nobody explains, that changes everything',
    durationLabel: '2:34',
    transcript:
      "Sex hormone-binding globulin grabs testosterone and estrogen and makes them unavailable. You can have a 'normal' total estrogen reading and still be functionally deficient because 80% of it is bound. Oral contraceptives and oral estrogen both raise SHBG dramatically. Transdermal routes avoid this entirely.",
    youtubeId: 'xH0JnkZjZTI',
  },
  {
    n: 12,
    speaker: 'Shilpa',
    title: 'The insulin-hormone connection you have to understand',
    durationLabel: '2:47',
    transcript:
      "Insulin resistance and estrogen deficiency amplify each other. Estrogen helps cells respond to insulin; when it drops, insulin sensitivity drops too. High insulin promotes aromatization — converting androgen into estrogen in fat tissue. This is why abdominal fat increases in perimenopause, and why it's not just about calories.",
    youtubeId: 'n4SAz6s1OAQ',
  },
  {
    n: 13,
    speaker: 'Jocelyn',
    title: "What happened when I finally brought a document to my doctor",
    durationLabel: '2:08',
    transcript:
      "She actually read it. That was the thing I didn't expect — she sat there, read the first page, and said 'you've done your homework.' The conversation was completely different. She ordered every lab I asked for. That document changed the dynamic from patient-asking-for-permission to two people reviewing evidence together.",
    youtubeId: 'OpPWRbpzuTA',
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

// ─── WhatsApp / Coach Kai (member experience) ────────────────────────
// Spec: hormone_method_member_experience_prompt.pdf §4 + §4.5
// TODO(areef): Meta approves templates via your BSP (Twilio/360dialog). Paste
// the approved ContentSid (or template name) for each here after approval.
export const WHATSAPP = {
  // Coach Kai's WhatsApp Business number. Sandbox first, production on launch.
  coachKaiNumberE164Env: 'WHATSAPP_FROM_NUMBER',
  coachKaiNumberE164Display: '+1 415 555 1234', // sandbox placeholder
  deepLinkBase: 'https://wa.me/14155551234', // swap the digits on launch

  // Template IDs (env-var names, swap to Meta-approved IDs post-review)
  templateWelcomeEnv: 'WHATSAPP_TEMPLATE_WELCOME', // hormone_welcome_v1
  templateNudge24hEnv: 'WHATSAPP_TEMPLATE_NUDGE_24H', // welcome_nudge_24h_v1 — post-checkout skip-if-signed-in nudge (Slice 2)
  templateIntakeReminderEnv: 'WHATSAPP_TEMPLATE_INTAKE_REMINDER', // hormone_intake_reminder_v1
  templateSession24hEnv: 'WHATSAPP_TEMPLATE_SESSION_REMINDER_24H', // hormone_session_24h_v1
  templateSession1hEnv: 'WHATSAPP_TEMPLATE_SESSION_REMINDER_1H', // hormone_session_1h_v1
  templateSessionLiveEnv: 'WHATSAPP_TEMPLATE_SESSION_LIVE', // hormone_session_live_v1
  templateRecordingReadyEnv: 'WHATSAPP_TEMPLATE_RECORDING_READY', // hormone_recording_ready_v1
  templateReflectionEnv: 'WHATSAPP_TEMPLATE_REFLECTION_PROMPT', // hormone_reflection_v1
  templateDocumentReadyEnv: 'WHATSAPP_TEMPLATE_DOCUMENT_READY', // hormone_document_ready_v1
  templateDoctorFollowupEnv: 'WHATSAPP_TEMPLATE_DOCTOR_FOLLOWUP', // hormone_doctor_followup_v1

  // Twilio credentials (or 360dialog — adjust schema if using different BSP)
  accountSidEnv: 'WHATSAPP_ACCOUNT_SID',
  authTokenEnv: 'WHATSAPP_AUTH_TOKEN',
  webhookSecretEnv: 'WHATSAPP_WEBHOOK_SECRET',
} as const

// ─── Google Meet / Calendar (sessions) ───────────────────────────────
// Spec: §5 — service account with domain-wide delegation, impersonates
// Shilpa so events land on her calendar with her as host.
export const GOOGLE = {
  serviceAccountEmailEnv: 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  serviceAccountPrivateKeyEnv: 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
  calendarIdEnv: 'GOOGLE_CALENDAR_ID', // "primary" or dedicated
  delegateEmailEnv: 'GOOGLE_CALENDAR_DELEGATE_EMAIL', // shilpa@shilpamethod.com
  // TODO(areef): enable domain-wide delegation on shilpamethod.com Google Workspace
  // and scope https://www.googleapis.com/auth/calendar on the service account.
} as const

// ─── Cohort group (WhatsApp) ─────────────────────────────────────────
// Spec: §11 — admin pastes the invite URL after manually creating the group.
export const COHORT_GROUP = {
  inviteUrl: 'https://chat.whatsapp.com/PLACEHOLDER',
  groupNameTemplate: 'The Hormone Method · Cohort {n} · {month} {year}',
  // TODO(areef): create the WhatsApp group manually after WAITLIST triggers,
  // paste the invite URL into /admin/cohorts/[id]/group.
} as const

// ─── Post-program referral endpoints ─────────────────────────────────
// Spec: §10.3 / §10.4 — V1 is email-based, V2 integrates with Forum's CRM.
export const REFERRAL = {
  forumHealthEmailTo: 'lisa@forumhealth.com', // TODO(areef): confirm with Forum
  muktaClinicEmailTo: 'mukta@muktaclinic.in', // TODO(areef): confirm with Dr. Mukta
} as const

// ─── Post-checkout (Slice 2) — welcome moment ────────────────────────
// Spec: hormone_method_post_checkout_prompt.md.pdf §4 + §13.
// The /welcome page renders a video block if SHILPA_WELCOME_VIDEO_URL is set,
// otherwise falls back to the 4-paragraph "from Dr. Saxena" text card.
export const WELCOME = {
  // TODO(areef): record a custom 60-sec greeting, host on Vercel Blob or a CDN,
  // paste the URL in Vercel env vars. Leave blank to keep text fallback live.
  videoUrlEnv: 'SHILPA_WELCOME_VIDEO_URL',
  // Magic-link policy from §3 — two durations for two use cases.
  magicLinkWelcomeSeconds: 60 * 60 * 24, // 24h for the welcome email / WA button
  magicLinkLoginSeconds: 60 * 10, // 10 min for self-serve /login
  // Stripe session_id is treated as a single-use ephemeral auth token for
  // /api/welcome/update-phone within this window (§10.2).
  phoneEditWindowMinutes: 60,
} as const

// ─── Cron / scheduled task endpoints ─────────────────────────────────
// Spec: §12 — notifications every 5 min, document-generation nightly 2 AM,
// cohort-status update daily 9 AM.
export const CRON = {
  secretEnv: 'CRON_SECRET',
  paths: {
    notifications: '/api/cron/notifications', // every 5 min
    documentGeneration: '/api/cron/document-generation', // 2 AM daily
    cohortStatus: '/api/cron/cohort-status', // 9 AM daily
  },
} as const
