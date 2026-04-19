import { Link } from 'react-router-dom'

// §7.1 Day-of-session dashboard — collapses into focused single-purpose view.
// In prod this renders when phase === 'live' AND today is a session day.

export default function LiveDashboard() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <div className="font-mono text-[10px] text-coral tracking-widest uppercase mt-6 mb-4">
        Today: Day 1 · Identify Your Story
      </div>

      {/* Hero state-machine card — "Imminent" state */}
      <div className="bg-forest text-cream rounded-2xl p-10 mb-8">
        <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-3">Imminent</div>
        <h1 className="font-display text-[48px] leading-tight mb-3">Day 1 starts in 42 minutes.</h1>
        <p className="text-body-md text-cream/75 mb-6 max-w-[520px]">
          Quiet spot · notebook · water. Shilpa joins at 7:00 PM ET sharp. Join button opens 15 minutes before.
        </p>
        <button className="bg-coral/30 text-cream/50 text-[15px] px-6 py-3 rounded-full cursor-not-allowed border border-coral/30">
          Join in 42 minutes →
        </button>
      </div>

      {/* State gallery — shows the other 4 states as small previews */}
      <div className="mb-10">
        <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">
          Preview · all 5 hero card states
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Pre-session (>1hr before)', desc: 'Countdown + "Get ready" checklist + 3-min preview' },
            { label: 'Live (window open)', desc: 'Big terra button: JOIN GOOGLE MEET' },
            { label: 'Just-ended (0–60 min after)', desc: '"What hit hardest tonight?" → saves to ReflectionEntry' },
            { label: 'Recording-ready (60+ min)', desc: 'Inline player + workbook CTA + NPS' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-border rounded-xl p-4">
              <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-1">{s.label}</div>
              <div className="text-[13px] text-slate">{s.desc}</div>
            </div>
          ))}
        </div>
        <Link to="/preview/sessions/1" className="inline-block text-[14px] text-forest hover:underline underline-offset-4 mt-4">
          Open session detail page →
        </Link>
      </div>

      <div className="text-[12px] text-slate italic leading-relaxed">
        In production, this dashboard auto-switches between all 5 states based on{' '}
        <span className="font-mono">session.startsAt</span> and <span className="font-mono">session.endsAt</span>.
        Workbook, recording, and NPS card all appear inline at the right time.
      </div>
    </main>
  )
}
