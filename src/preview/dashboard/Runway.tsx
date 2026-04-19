import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { RUNWAY_SCHEDULE } from '../../data/runwaySchedule'

// §3 — Runway dashboard structural shell. Hero card is intake-focused until
// the intake is complete, then switches to "Today's Focus" from RUNWAY_SCHEDULE
// (Slice 5 content engine). Everything else is structural per §3.1–§3.7.

const INTAKE_STEPS = [
  { id: 'risk', label: 'Family & Personal History', to: '/preview/intake/risk', status: 'complete' as const },
  { id: 'symptoms', label: 'Your Cycle & Symptoms', to: '/preview/intake/symptoms', status: 'in_progress' as const },
  { id: 'lifestyle', label: 'Lifestyle', to: '/preview/intake/lifestyle', status: 'not_started' as const },
  { id: 'goals', label: 'Goals & Concerns', to: '/preview/intake/goals', status: 'not_started' as const },
]

export default function RunwayDashboard({
  daysToStart,
  intakeComplete,
}: {
  daysToStart: number
  intakeComplete: boolean
}) {
  const [pickedDay, setPickedDay] = useState(daysToStart)
  const [params, setParams] = useSearchParams()
  const nav = useNavigate()

  const focus = RUNWAY_SCHEDULE[pickedDay] ?? RUNWAY_SCHEDULE[14]
  const intakeDone = INTAKE_STEPS.filter((s) => s.status === 'complete').length

  const toggleIntake = () => {
    const p = new URLSearchParams(params)
    p.set('intake', intakeComplete ? 'incomplete' : 'complete')
    p.set('phase', 'runway')
    setParams(p, { replace: true })
  }

  return (
    <main className="max-w-5xl mx-auto px-6 pb-20">
      {/* §3.1 Top bar — cohort context + 14-day progress */}
      <div className="sticky top-[96px] bg-cream/95 backdrop-blur-sm z-30 pt-6 pb-4 -mx-6 px-6 border-b border-border/60 mb-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] text-slate tracking-widest uppercase">
          <span className="text-forest">Cohort 1 · June 2–4, 2026</span>
          <span className="text-coral">
            {pickedDay} day{pickedDay === 1 ? '' : 's'} until Day 1
          </span>
          <span>
            intake: {intakeComplete ? 'complete' : `${intakeDone} of 4`}
          </span>
          <button
            onClick={toggleIntake}
            className="ml-auto font-mono text-[9px] text-coral/80 hover:text-coral underline underline-offset-4"
          >
            {intakeComplete ? '(preview: mark incomplete)' : '(preview: mark complete)'}
          </button>
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

      {/* §3.2 Hero card — intake-focused until complete, then daily Focus */}
      {!intakeComplete ? (
        <section className="mb-10">
          <div className="bg-white border border-border rounded-2xl p-8 md:p-10">
            <p className="font-mono text-[11px] text-coral tracking-widest uppercase mb-4">
              Your first step
            </p>
            <h2 className="font-display text-[32px] md:text-[40px] text-forest leading-tight mb-3">
              {intakeDone > 0 ? 'Finish your intake' : 'Start with your intake'}
            </h2>
            <p className="text-body-md text-slate mb-6 max-w-[560px] leading-relaxed">
              This is what Dr. Saxena reads before your cohort begins. Your specific symptoms,
              history, and goals shape what she emphasizes during the live sessions and what goes
              into your Patient Advocacy Document.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link
                to="/preview/intake"
                className="bg-coral text-cream px-6 py-3 rounded-full hover:bg-rust text-[15px] inline-flex items-center gap-2"
              >
                {intakeDone > 0 ? 'Continue intake →' : 'Start your intake →'}
              </Link>
              <span className="font-mono text-[10px] text-slate tracking-widest uppercase">
                10 minutes · any device · you can pause anytime
              </span>
            </div>
          </div>
        </section>
      ) : (
        <section className="mb-10">
          <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">
            Today's Focus · {focus.contentType}
          </div>
          <div className="bg-forest text-cream rounded-2xl p-8 md:p-10">
            <h2 className="font-display text-[32px] md:text-[40px] leading-tight mb-3">
              {focus.title}
            </h2>
            <p className="text-body-md text-cream/80 leading-relaxed mb-6 max-w-[620px]">
              {focus.body}
            </p>
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
          <p className="text-[11px] text-slate italic mt-3">
            Daily content engine (Slice 5) — swap via T-day chips above.
          </p>
        </section>
      )}

      {/* §3.3 Sessions strip — three cards */}
      <section className="mb-10">
        <h3 className="font-display text-[24px] text-forest mb-4">Your three sessions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { d: 1, date: 'Tue Jun 2', time: '7:00–8:15 PM ET', title: 'Identify Your Story' },
            { d: 2, date: 'Wed Jun 3', time: '7:00–8:15 PM ET', title: 'Understand Your Numbers' },
            { d: 3, date: 'Thu Jun 4', time: '7:00–8:15 PM ET', title: 'Build Your Playbook' },
          ].map((s) => (
            <Link
              key={s.d}
              to={`/preview/sessions/${s.d}`}
              className="bg-white border border-border rounded-2xl p-5 hover:border-coral transition-colors group"
            >
              <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">
                Day {s.d} · {s.date}
              </div>
              <h4 className="font-display text-[18px] text-forest group-hover:text-coral transition-colors mb-2 leading-tight">
                {s.title}
              </h4>
              <div className="font-mono text-[10px] text-slate tracking-widest uppercase">
                {s.time}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* §3.4 + §3.5 Kai + Cohort side-by-side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center flex-none text-[16px]">
              ✨
            </div>
            <div className="flex-1">
              <h4 className="font-display text-[18px] text-forest mb-1">Coach Kai</h4>
              <p className="text-body-sm text-slate mb-4 leading-relaxed">
                Your guide on WhatsApp. Ask questions anytime — about your intake, the sessions,
                anything.
              </p>
              <a
                href="https://wa.me/14155551234"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-cream border border-border text-forest text-[13px] px-4 py-2 rounded-full hover:border-forest transition-colors"
              >
                Open WhatsApp →
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex -space-x-2 flex-none">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white"
                  style={{ backgroundColor: ['#D97757', '#2D5445', '#6B6358', '#EFE7D4'][i] }}
                />
              ))}
              <div className="w-9 h-9 rounded-full bg-cream border-2 border-white flex items-center justify-center text-[11px] text-slate font-medium">
                +43
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-display text-[18px] text-forest mb-1">Your cohort</h4>
              <p className="text-body-sm text-slate mb-2 leading-relaxed">
                You're one of 47 women in Cohort 1.
              </p>
              {pickedDay > 7 ? (
                <div className="font-mono text-[10px] text-slate tracking-widest uppercase">
                  Group opens in {pickedDay - 7} day{pickedDay - 7 === 1 ? '' : 's'}
                </div>
              ) : (
                <div className="font-mono text-[10px] text-sage tracking-widest uppercase">
                  Group open — details coming soon
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* §3.6 Resources teaser */}
      <section className="mb-10">
        <div className="bg-white border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display text-[18px] text-forest">Primer content</h4>
            <Link
              to="/preview/resources"
              className="font-mono text-[10px] text-slate tracking-widest uppercase hover:text-forest inline-flex items-center gap-1"
            >
              See all →
            </Link>
          </div>
          <div className="divide-y divide-border/60">
            {[
              { t: "Why your TSH alone isn't enough", d: '5 min read' },
              { t: 'Understanding perimenopause', d: '60 min watch' },
              { t: 'The four risk axes', d: '3 min read' },
            ].map((r) => (
              <div key={r.t} className="flex items-center justify-between py-3">
                <span className="text-[14px] text-forest">{r.t}</span>
                <span className="font-mono text-[10px] text-slate tracking-widest uppercase">
                  {r.d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostics / exits for the prototype */}
      <div className="text-[11px] text-slate italic">
        Structural shell per Slice 3 spec. Live dashboard + post-program are{' '}
        <button
          onClick={() => nav('/preview/dashboard?phase=live')}
          className="text-coral underline underline-offset-4"
        >
          also wired
        </button>
        .
      </div>
    </main>
  )
}
