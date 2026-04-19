import { useState } from 'react'
import { PageShell, ProgressBar, H1, PrimaryButton, Mono } from '../ui'

const SYMPTOMS = [
  'Weight gain (midsection)',
  'Fatigue that sleep doesn\'t fix',
  'Brain fog / memory',
  'Sleep disruption',
  'Mood changes / irritability',
  'Hair thinning',
  'Irregular periods',
  'Hot flashes / night sweats',
  'Joint pain / frozen shoulder',
  'Low libido',
  'New or worsening anxiety',
  'Vaginal dryness',
]

const SEVERITY = ['None', 'Mild', 'Moderate', 'Severe', 'Debilitating']

export default function IntakeSymptoms() {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [cycle, setCycle] = useState<string>('')

  return (
    <PageShell maxWidth="max-w-2xl">
      <ProgressBar value={2} total={4} />
      <Mono className="block mb-2">Step 2 · Your Cycle & Symptoms</Mono>
      <H1>Rate each symptom by how much it's affecting your daily life over the last 3 months.</H1>

      <div className="bg-white border border-border rounded-2xl p-5 space-y-5 mb-8">
        {SYMPTOMS.map((s) => (
          <div key={s}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[15px] text-forest">{s}</span>
              <span className="text-[12px] text-slate font-mono">
                {ratings[s] != null ? SEVERITY[ratings[s]] : '—'}
              </span>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((v) => {
                const active = ratings[s] === v
                return (
                  <button
                    key={v}
                    onClick={() => setRatings({ ...ratings, [s]: v })}
                    className={`flex-1 h-8 rounded-md border text-[11px] font-mono transition-colors ${
                      active
                        ? 'bg-coral text-cream border-coral'
                        : 'bg-sand/50 text-slate border-border hover:border-coral'
                    }`}
                  >
                    {v}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <div className="font-mono text-[11px] text-coral tracking-widest uppercase mb-3">Cycle status</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Regular', 'Irregular', 'Stopped <1 year', 'Stopped ≥1 year'].map((opt) => (
            <button
              key={opt}
              onClick={() => setCycle(opt)}
              className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                cycle === opt
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-white text-slate border-border hover:border-forest'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      <PrimaryButton to="/preview/intake/lifestyle">Save and continue →</PrimaryButton>
    </PageShell>
  )
}
