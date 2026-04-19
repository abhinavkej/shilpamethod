import { Link } from 'react-router-dom'

// ───────────────────────────────────────────────────────────────────────
// Navigation hub for the full member-experience prototype.
// Use this to jump between phases without needing to complete them in order.
// ───────────────────────────────────────────────────────────────────────

const phases: Array<{
  phase: string
  label: string
  blurb: string
  links: Array<{ to: string; label: string }>
}> = [
  {
    phase: '1',
    label: 'Onboarding · ~5 min',
    blurb: '5-step post-payment flow. WhatsApp opt-in, phone, timezone, preferences.',
    links: [
      { to: '/preview/onboarding/welcome', label: '/onboarding/welcome' },
      { to: '/preview/onboarding/phone', label: '/onboarding/phone' },
      { to: '/preview/onboarding/whatsapp', label: '/onboarding/whatsapp' },
      { to: '/preview/onboarding/timezone', label: '/onboarding/timezone' },
      { to: '/preview/onboarding/preferences', label: '/onboarding/preferences' },
    ],
  },
  {
    phase: '2',
    label: 'Runway · T-14 → T-1',
    blurb: '14-day pre-program dashboard with Today\'s Focus, intake nudges, cohort teaser.',
    links: [
      { to: '/preview/dashboard?phase=runway&days=10', label: '/dashboard (runway)' },
      { to: '/preview/intake', label: '/intake overview' },
      { to: '/preview/intake/risk', label: '/intake/risk' },
      { to: '/preview/intake/symptoms', label: '/intake/symptoms' },
      { to: '/preview/intake/lifestyle', label: '/intake/lifestyle' },
      { to: '/preview/intake/goals', label: '/intake/goals' },
    ],
  },
  {
    phase: '3',
    label: 'Live program · Day 1/2/3',
    blurb: 'Day-of dashboard + session detail. 5-state hero card (pre / imminent / live / just-ended / recording).',
    links: [
      { to: '/preview/dashboard?phase=live', label: '/dashboard (live)' },
      { to: '/preview/sessions/1', label: '/sessions/1' },
      { to: '/preview/sessions/2', label: '/sessions/2' },
      { to: '/preview/sessions/3', label: '/sessions/3' },
    ],
  },
  {
    phase: '4',
    label: 'Patient Advocacy Document',
    blurb: 'Generated T+1 hour after Day 3. Inline PDF + download + tokenized doctor share.',
    links: [
      { to: '/preview/document?state=locked', label: '/document (locked)' },
      { to: '/preview/document', label: '/document (ready)' },
      { to: '/preview/document/share', label: '/document/share (doctor email)' },
    ],
  },
  {
    phase: '5',
    label: 'Post-program · T+1 → T+90',
    blurb: 'Appointment tracker state machine, Forum / Mukta routing, continuation options.',
    links: [
      { to: '/preview/dashboard?phase=post', label: '/dashboard (post)' },
      { to: '/preview/forum-referral', label: '/forum-referral (US)' },
      { to: '/preview/mukta-referral', label: '/mukta-referral (India)' },
    ],
  },
  {
    phase: '6',
    label: 'Member extras',
    blurb: 'Community directory (privacy-gated), resources grid, account settings.',
    links: [
      { to: '/preview/community', label: '/community' },
      { to: '/preview/resources', label: '/resources' },
      { to: '/preview/account', label: '/account' },
    ],
  },
  {
    phase: '7',
    label: 'Admin',
    blurb: 'Cohort editor, user deep-dive, live-session control panel, post-program tracking.',
    links: [
      { to: '/preview/admin', label: '/admin' },
      { to: '/preview/admin/cohorts/june-2026', label: '/admin/cohorts/june-2026' },
      { to: '/preview/admin/users/sarah-chen', label: '/admin/users/sarah-chen' },
      { to: '/preview/admin/live-session/day-1', label: '/admin/live-session/day-1' },
      { to: '/preview/admin/post-program', label: '/admin/post-program' },
    ],
  },
]

export default function PreviewIndex() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-14">
        <p className="font-mono text-[10px] text-coral tracking-widest uppercase mb-4">
          The Shilpa Method · Member experience prototype
        </p>
        <h1 className="font-display text-display-lg text-forest mb-4">
          Every screen, every phase, every state — clickable.
        </h1>
        <p className="text-body-md text-slate max-w-[640px] leading-relaxed">
          Built to the exact spec in{' '}
          <span className="font-mono text-[13px] bg-sand/70 px-2 py-0.5 rounded">
            hormone_method_member_experience_prompt.pdf
          </span>
          . Client-side mocks with local state — no backend required. See{' '}
          <span className="font-mono text-[13px] bg-sand/70 px-2 py-0.5 rounded">MEMBER_HANDOFF.md</span>{' '}
          at repo root for the env vars, templates, and service accounts Areef needs to lift this
          into the real Next.js member app.
        </p>
      </div>

      <div className="grid gap-5">
        {phases.map((phase) => (
          <section
            key={phase.phase}
            className="bg-white border border-border rounded-2xl p-6 md:p-7"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display text-[34px] text-coral/60 leading-none">
                0{phase.phase}
              </span>
              <h2 className="font-display text-[22px] text-forest">{phase.label}</h2>
            </div>
            <p className="text-body-sm text-slate mb-4 ml-[52px]">{phase.blurb}</p>
            <div className="flex flex-wrap gap-2 ml-[52px]">
              {phase.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-mono text-[12px] text-forest bg-sand/60 hover:bg-sand px-3 py-1.5 rounded-full border border-border/60"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-block font-mono text-[12px] text-slate hover:text-forest tracking-widest uppercase"
        >
          ← Back to marketing site
        </Link>
      </div>
    </main>
  )
}
