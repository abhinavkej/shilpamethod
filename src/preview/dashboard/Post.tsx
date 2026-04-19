import { useState } from 'react'
import { Link } from 'react-router-dom'

// §10.1 Post-program dashboard — appointment tracker state machine

type Outcome = null | 'doctor_supportive' | 'doctor_dismissive' | 'labs_ordered' | 'hrt_started'

export default function PostProgramDashboard() {
  const [stage, setStage] = useState<'not_booked' | 'booked' | 'past'>('not_booked')
  const [outcome, setOutcome] = useState<Outcome>(null)

  return (
    <main className="max-w-4xl mx-auto px-6 pb-20 pt-8">
      <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-3">
        Post-program · 7 days since Day 3
      </div>
      <h1 className="font-display text-display-md text-forest mb-8">What's next, Sarah?</h1>

      {/* Hero — Your Document */}
      <section className="bg-white border border-border rounded-2xl p-6 md:p-7 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-[140px] h-[180px] bg-gradient-to-br from-sand to-bone border border-border rounded-lg flex items-center justify-center shadow-sm">
            <div className="text-center">
              <div className="font-display text-[14px] text-forest">Your Hormone</div>
              <div className="font-display text-[14px] text-forest italic">Story</div>
              <div className="font-mono text-[8px] text-slate tracking-widest uppercase mt-3">PDF</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-2">Your Document</div>
            <h2 className="font-display text-[26px] text-forest mb-2">Your Patient Advocacy Document is ready.</h2>
            <div className="font-mono text-[10px] text-slate tracking-widest uppercase mb-4">
              Generated June 5, 2026 · v1
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/preview/document"
                className="bg-coral text-cream text-[15px] px-5 py-2.5 rounded-full hover:bg-rust"
              >
                Download →
              </Link>
              <Link
                to="/preview/document/share"
                className="border border-forest text-forest text-[15px] px-5 py-2.5 rounded-full hover:bg-forest hover:text-cream transition-colors"
              >
                Send to my doctor →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Have you booked? — state-machine card */}
      <section className="bg-white border border-border rounded-2xl p-6 md:p-7 mb-6">
        <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">Have you booked?</div>

        {stage === 'not_booked' && (
          <div>
            <h2 className="font-display text-[22px] text-forest mb-4">
              Have you booked your appointment yet?
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStage('booked')}
                className="bg-forest text-cream text-[14px] px-5 py-2.5 rounded-full hover:bg-ivy"
              >
                Yes, I've booked →
              </button>
              <button className="border border-border text-slate text-[14px] px-5 py-2.5 rounded-full hover:border-forest hover:text-forest">
                No — need a booking script
              </button>
              <button className="border border-border text-slate text-[14px] px-5 py-2.5 rounded-full hover:border-forest hover:text-forest">
                My doctor said no
              </button>
            </div>
          </div>
        )}

        {stage === 'booked' && (
          <div>
            <h2 className="font-display text-[22px] text-forest mb-2">
              Your appointment with your OB-GYN is on June 23, 2026.
            </h2>
            <p className="text-body-sm text-slate mb-4">
              Here's a 1-pager on how to navigate the conversation. Coach Kai will nudge you 3 days before.
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="bg-forest text-cream text-[14px] px-5 py-2.5 rounded-full hover:bg-ivy">
                Open appointment-prep guide →
              </button>
              <button
                onClick={() => setStage('past')}
                className="border border-border text-slate text-[14px] px-5 py-2.5 rounded-full hover:border-forest hover:text-forest"
              >
                (Preview) appointment happened →
              </button>
            </div>
          </div>
        )}

        {stage === 'past' && (
          <div>
            <h2 className="font-display text-[22px] text-forest mb-4">How did it go?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { v: 'doctor_supportive' as const, l: '😊 Doctor was supportive' },
                { v: 'doctor_dismissive' as const, l: '😐 Doctor was dismissive' },
                { v: 'labs_ordered' as const, l: '🧪 Labs ordered' },
                { v: 'hrt_started' as const, l: '💊 HRT started' },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setOutcome(o.v)}
                  className={`text-left px-5 py-3 rounded-xl border transition-all ${
                    outcome === o.v
                      ? 'bg-forest text-cream border-forest'
                      : 'bg-sand/40 border-border hover:border-forest'
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* What now? — conditional on outcome */}
      {outcome && (
        <section className="bg-forest text-cream rounded-2xl p-6 md:p-7 mb-6">
          <div className="font-mono text-[10px] text-coral-soft tracking-widest uppercase mb-3">What now?</div>
          {outcome === 'doctor_supportive' && (
            <>
              <h2 className="font-display text-[22px] mb-2">Great. Here's what to expect over the next 90 days.</h2>
              <p className="text-body-sm text-cream/80">
                Baseline labs + follow-up at 90 days. Coach Kai will check in at T+30 and T+60.
              </p>
            </>
          )}
          {outcome === 'doctor_dismissive' && (
            <>
              <h2 className="font-display text-[22px] mb-2">We've seen this. Here's what to do next.</h2>
              <p className="text-body-sm text-cream/80 mb-4">
                Forum Health was built for exactly this conversation. 15-min consult on Coach Kai's recommendation,
                no obligation.
              </p>
              <Link
                to="/preview/forum-referral"
                className="inline-flex bg-coral text-cream text-[14px] px-5 py-2.5 rounded-full hover:bg-rust"
              >
                See Forum Health options →
              </Link>
            </>
          )}
          {outcome === 'labs_ordered' && (
            <>
              <h2 className="font-display text-[22px] mb-2">When your labs come back, share with Coach Kai.</h2>
              <p className="text-body-sm text-cream/80">
                She'll help you read them against Dr. Saxena's framework and prep for your follow-up.
              </p>
            </>
          )}
          {outcome === 'hrt_started' && (
            <>
              <h2 className="font-display text-[22px] mb-2">What to expect in the first 90 days.</h2>
              <p className="text-body-sm text-cream/80">
                Sleep usually shifts first. Mood and energy follow. Coach Kai will check in weekly for the first month.
              </p>
            </>
          )}
        </section>
      )}

      {/* Stay connected */}
      <section className="bg-white border border-border rounded-2xl p-6 md:p-7">
        <div className="font-mono text-[10px] text-coral tracking-widest uppercase mb-3">Stay connected</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
          <a
            href="https://chat.whatsapp.com/PLACEHOLDER"
            target="_blank"
            rel="noreferrer"
            className="border border-border rounded-xl px-4 py-3 hover:border-forest hover:bg-sand/40"
          >
            💬 <span className="text-forest ml-1">Your cohort WhatsApp group</span>
          </a>
          <a
            href="https://wa.me/14155551234"
            target="_blank"
            rel="noreferrer"
            className="border border-border rounded-xl px-4 py-3 hover:border-forest hover:bg-sand/40"
          >
            🧭 <span className="text-forest ml-1">Coach Kai — always on</span>
          </a>
          <Link to="/preview/resources" className="border border-border rounded-xl px-4 py-3 hover:border-forest hover:bg-sand/40">
            🎞️ <span className="text-forest ml-1">Past session recordings</span>
          </Link>
          <button className="border border-border rounded-xl px-4 py-3 text-left hover:border-forest hover:bg-sand/40">
            📄 <span className="text-forest ml-1">Regenerate document v2 (if new labs)</span>
          </button>
        </div>
      </section>
    </main>
  )
}
