import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RUNWAY_SCHEDULE } from '../../data/runwaySchedule'

// §6.2 Runway dashboard layout

const INTAKE_STEPS = [
  { id: 'risk', label: 'Family & Personal History', to: '/preview/intake/risk', status: 'complete' as const },
  { id: 'symptoms', label: 'Your Cycle & Symptoms', to: '/preview/intake/symptoms', status: 'in_progress' as const },
  { id: 'lifestyle', label: 'Lifestyle', to: '/preview/intake/lifestyle', status: 'not_started' as const },
  { id: 'goals', label: 'Goals & Concerns', to: '/preview/intake/goals', status: 'not_started' as const },
]

export default function RunwayDashboard({ daysToStart }: { daysToStart: number }) {
  const [pickedDay, setPickedDay] = useState(daysToStart)
  const focus = RUNWAY_SCHEDULE[pickedDay] ?? RUNWAY_SCHEDULE[14]
  const intakeDone = INTAKE_STEPS.filter((s) => s.status === 'complete').length

  return (
    <main className="max-w-5xl mx-auto px-6 pb-20">
      {/* Sticky top bar */}
      <div className="sticky top-10 bg-cream/95 backdrop-blur-sm z-10 pt-6 pb-4 -mx-6 px-6 border-b border-border/60 mb-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] text-slate tracking-widest uppercase">
          <span className="text-forest">Cohort 1 · June 2–4, 2026</span>
          <span className="text-coral">
            {pickedDay} day{pickedDay === 1 ? '' : 's'} until Day 1
          </span>
          <span>
            {intakeDone} of 4 intake steps complete
          </span>
        </div>
        <div className="h-[3px] bg-border/70 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-coral transition-all"
            style={{ width: `${((14 - pickedDay) / 14) * 100}%` }}
          />
        </div>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {Array.from({ length: 14 }, (_, i) => 14 - i).map((d) => (
            <button
              key={d}
              onClick={() => setPickedDay(d)}
              className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                d === pickedDay ? 'bg-forest text-cream' : 'bg-sand/60 text-slate hover:bg-sand'
              }`}
            >
              T-{d}
            </button>
          ))}
        </div>
      </div>

      <h1 className="font-display text-display-md text-forest mb-1">Good evening, Sarah.</h1>
      <p className="text-body-sm text-slate mb-8">Day {14 - pickedDay + 1} of 14 in your runway.</p>

      {/* Hero — Today's Focus */}
      <section className="mb-12">
        <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">
          Today's Focus · {focus.contentType}
        </div>
        <div className="bg-forest text-cream rounded-2xl p-7 md:p-10">
          <h2 className="font-display text-[32px] md:text-[40px] leading-tight mb-3">{focus.title}</h2>
          <p className="text-body-md text-cream/80 leading-relaxed mb-6 max-w-[620px]">{focus.body}</p>
          {focus.cta && (
            <Link
              to={focus.cta.href}
              className="inline-flex items-center gap-2 bg-coral text-cream px-6 py-3 rounded-full hover:bg-rust text-[15px]"
            >
              {focus.cta.label}
            </Link>
          )}
          {focus.reflectionPrompt && (
            <div className="mt-4 bg-cream/5 border border-cream/15 rounded-xl p-4 text-[13px] text-cream/80 italic">
              Reflection: {focus.reflectionPrompt}
            </div>
          )}
        </div>
      </section>

      {/* Intake progress */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-[24px] text-forest">Your Intake Progress</h2>
          <Link to="/preview/intake" className="text-[14px] text-forest hover:underline underline-offset-4">
            Open intake →
          </Link>
        </div>
        <div className="bg-white border border-border rounded-2xl divide-y divide-border/60">
          {INTAKE_STEPS.map((step, i) => (
            <Link
              key={step.id}
              to={step.to}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-sand/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-slate tracking-widest uppercase">0{i + 1}</span>
                <span className="text-[15px] text-forest">{step.label}</span>
              </div>
              <StatusBadge status={step.status} />
            </Link>
          ))}
        </div>
      </section>

      {/* Cohort presence */}
      <section className="mb-12">
        <div className="bg-white border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-2">Your Cohort</div>
            <div className="text-[17px] text-forest font-medium">47 of 50 women have joined Cohort 1.</div>
            <div className="text-[13px] text-slate mt-1">
              {pickedDay > 7 ? `Cohort group opens in ${pickedDay - 7} days.` : 'Cohort group is open.'}
            </div>
          </div>
          <div className="flex -space-x-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-cream flex items-center justify-center text-[10px] text-cream font-medium"
                style={{ backgroundColor: i % 3 === 0 ? '#D97757' : i % 2 === 0 ? '#2D5445' : '#6B6358' }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Kai + Resources side-by-side */}
      <section className="grid md:grid-cols-2 gap-5">
        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">Coach Kai</div>
          <div className="text-body-sm text-slate italic mb-4 leading-relaxed">
            Last message: "Hey Sarah — you're 10 days out. Quick check: did your intake feel complete? Reply if
            anything's on your mind."
          </div>
          <a
            href="https://wa.me/14155551234"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white text-[14px] px-5 py-2.5 rounded-full hover:bg-[#1ea952]"
          >
            Open WhatsApp →
          </a>
        </div>
        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">This week's resources</div>
          <ul className="space-y-2.5 text-[14px]">
            {[
              { t: 'Why your TSH alone isn\'t enough', d: '5-min read' },
              { t: 'Webinar 2: Sleep + perimenopause', d: '8-min clip' },
              { t: 'The four risk axes (plain English)', d: '6-min read' },
            ].map((r) => (
              <li key={r.t}>
                <Link to="/preview/resources" className="flex items-baseline justify-between gap-3 hover:text-forest">
                  <span className="text-slate">{r.t}</span>
                  <span className="font-mono text-[10px] text-slate/70 tracking-widest uppercase">{r.d}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

function StatusBadge({ status }: { status: 'complete' | 'in_progress' | 'not_started' }) {
  const map = {
    complete: { label: 'Complete', className: 'bg-risk-low-bg text-risk-low' },
    in_progress: { label: 'In progress', className: 'bg-risk-med-bg text-risk-med' },
    not_started: { label: 'Not started', className: 'bg-sand text-slate' },
  }
  const s = map[status]
  return (
    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${s.className}`}>{s.label}</span>
  )
}
